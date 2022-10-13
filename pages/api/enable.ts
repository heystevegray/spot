import { NextApiResponse, NextApiRequest } from 'next';
import fs from 'fs';
import path from 'path';
import { Gpio } from 'onoff'; // include onoff to interact with the GPIO

const player = require('play-sound')()

const filePath = 'data.json';
const fullFilePath = path.join('public', filePath);

const pollInterval = 250;
const motionPin = 14;
const isLinux = process.platform === 'linux';
// use GPIO pin 4, and specify that it is output
const SENSOR: Gpio | undefined = isLinux ? new Gpio(motionPin, 'in') : undefined;
let monitor: NodeJS.Timer | undefined = undefined;

let isPlaying = false;
let audio: { kill: () => void; } | undefined = undefined

type ResponseData = {
    message: string;
    success: boolean
};

type Config = {
    enabled: boolean;
};

const playSound = () => {
    const soundFile = path.join('public', 'sounds', 'Mark_Hamill_Joker.wav');

    try {
        audio = player.play(soundFile, function (err: { killed: any; }) {
            if (err && !err.killed) {
                console.log("Audio was killed");
            }

            // Reset the playing status
            isPlaying = false
        })
    } catch (error) {
        console.log(error)
        // Reset the playing status
        isPlaying = false
    }

};

const detectMotion = () => {
    try {
        if (isLinux && SENSOR) {
            if (!isPlaying) {
                // Check the pin state 1 = on

                if (SENSOR.readSync() === 1) {
                    console.log('Motion Detected!!!!');
                    isPlaying = true;
                    playSound();
                } else {
                    console.log('Watching...');
                }

            } else {
                console.log('Sound is playing...');
            }
        } else {
            console.log(`Current platform is "${process.platform}". GPIO will only work on linux.`);
        }
    } catch (error) {
        console.log('detectMotion', { error });
    }
};

const startSpotting = (): ResponseData => {
    if (Gpio?.accessible) {
        console.log(`GPIO accessible: ${Gpio?.accessible}`);
        monitor = setInterval(detectMotion, pollInterval);
        console.log(`Started interval ${monitor}`);
        return { message: `Started interval ${monitor}`, success: true }
    }

    console.log("Damn. GPIO is not accessible.");
    return { message: `Damn. GPIO is not accessible. SENSOR: ${JSON.stringify(SENSOR)}`, success: false }


};

const stopSpotting = (): ResponseData => {
    if (monitor) {
        clearInterval(monitor);
        console.log(`Stopped interval ${monitor}`);

        // Kill audio
        audio?.kill()

        return {
            message: `Stopped interval ${monitor}`, success: true
        }
    }

    if (SENSOR) {
        SENSOR.unexport(); // Unexport GPIO to free resources
    }

    return { message: `Nothing was spotting`, success: true }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    let response: ResponseData = { message: '', success: false }
    try {
        if (req.method === 'POST') {
            try {
                const body = req.body as Config;

                if (body?.enabled) {
                    response = startSpotting();
                } else {
                    response = stopSpotting();
                }

                fs.promises.writeFile(fullFilePath, JSON.stringify(body));
                res.status(200).send(response);
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: `Failed to write to ${fullFilePath}`, success: false });
            }
        }

        if (req.method === 'GET') {
            const message = await fs.promises.readFile(fullFilePath, 'utf8');
            res.status(200).send({ message, success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', success: false });
    }
}
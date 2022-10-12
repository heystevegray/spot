import { NextApiResponse, NextApiRequest } from 'next';
import fs from 'fs';
import path from 'path';
import sound from 'sound-play';
import { Gpio } from 'onoff'; // include onoff to interact with the GPIO

const filePath = 'data.json';
const fullFilePath = path.join('public', filePath);

const pollInterval = 250;
const motionPin = 14;
const isLinux = process.platform === 'linux';
// use GPIO pin 4, and specify that it is output
const SENSOR: Gpio | undefined = isLinux ? new Gpio(motionPin, 'in') : undefined;
let monitor: NodeJS.Timer | undefined = undefined;

type ResponseData = {
    message: string;
};

type Config = {
    enabled: boolean;
};

const playSound = () => {
    const soundFile = path.join('public', 'sounds', 'Mark_Hamill_Joker.wav');
    sound.play(soundFile);
};

const detectMotion = () => {
    if (isLinux && SENSOR) {
        // Check the pin state 1 = on
        try {
            if (SENSOR.readSync() === 1) {
                console.log('Motion Detected!!!!');
                playSound();
            } else {
                console.log('Watching...');
            }
        } catch (error) {
            console.log('detectMotion', { error });
        }
    } else {
        console.log(`Current platform is "${process.platform}". GPIO will only work on linux.`);
    }
};

const startSpotting = () => {
    try {
        console.log(`GPIO accessible: ${Gpio?.accessible}`);
    } catch (error) {
        console.log({ error });
    }
    monitor = setInterval(detectMotion, pollInterval);
    console.log(`Started interval ${monitor}`);
};

const stopSpotting = () => {
    if (monitor) {
        clearInterval(monitor);
        console.log(`Stopped interval ${monitor}`);
    }

    if (SENSOR) {
        SENSOR.unexport(); // Unexport GPIO to free resources
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        if (req.method === 'POST') {
            try {
                const body = req.body as Config;

                if (body?.enabled) {
                    startSpotting();
                } else {
                    stopSpotting();
                }

                fs.promises.writeFile(fullFilePath, JSON.stringify(body));
                res.status(200).send({ message: 'success' });
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: `Failed to write to ${fullFilePath}` });
            }
        }

        if (req.method === 'GET') {
            const message = await fs.promises.readFile(fullFilePath, 'utf8');
            res.status(200).send({ message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong' });
    }
}

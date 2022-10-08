import { NextApiResponse, NextApiRequest } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = 'data.json';
const fullFilePath = path.join(__dirname, filePath);

type ResponseData = {
    message: string;
};

type Config = {
    enabled: boolean;
};

const pollInterval = 250;
let monitor: NodeJS.Timer | undefined = undefined;

const detectMotion = () => {
    console.log('reading...');
};

const start = () => {
    monitor = setInterval(detectMotion, pollInterval);
    console.log(`Started interval ${monitor}`);
};

const stop = () => {
    if (monitor) {
        clearInterval(monitor);
        console.log(`Stopped interval ${monitor}`);
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        if (req.method === 'POST') {
            const body = req.body as Config;

            console.log({ body, enabled: body?.enabled });

            if (body?.enabled) {
                start();
                console.log('starting...');
            } else {
                stop();
                console.log('stopping...');
            }

            try {
                fs.promises.writeFile(fullFilePath, JSON.stringify(body));
                console.log(`Successfully wrote to ${fullFilePath}`);
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

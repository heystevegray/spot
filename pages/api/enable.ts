import { NextApiResponse, NextApiRequest } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = 'data.json';
const fullFilePath = path.join(__dirname, filePath);

type ResponseData = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        if (req.method === 'POST') {
            const body = req.body;
            console.log({ body });
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

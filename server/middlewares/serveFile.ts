import * as express from 'express';

export default function sendFile(filePath: string): express.Handler {

	return (req, res) => {
		return res.status(200).sendFile(filePath);
	};
}

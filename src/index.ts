import { createWorker } from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';

const SOURCE_IMAGE_PATH = path.join(process.cwd(), 'images', 'eng_bw.png');

function writeFile(text: string): void {
	const TARGET_FILE_PATH = path.join(
		process.cwd(),
		'texts',
		`${Date.now()}.txt`,
	);
	if (!fs.existsSync('texts')) {
		fs.mkdirSync('texts');
	}
	fs.writeFileSync(TARGET_FILE_PATH, text);
	console.log(`Text saved at ${TARGET_FILE_PATH}.`);
}

async function CharacterRecognition(): Promise<void> {
	console.log('OCR process running...');
	try {
		const worker = await createWorker('eng');
		const ret = await worker.recognize(SOURCE_IMAGE_PATH);
		writeFile(ret.data.text);
		await worker.terminate();
	} catch (error) {
		console.error('error processing the image.\n', error);
	}
	console.log('OCR process ended!');
}

CharacterRecognition();

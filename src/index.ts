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
}

async function CharacterRecognition(): Promise<void> {
	const worker = await createWorker('eng');
	const ret = await worker.recognize(SOURCE_IMAGE_PATH);
	writeFile(ret.data.text);
	await worker.terminate();
}

CharacterRecognition();

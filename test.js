import { createWriteStream } from 'node:fs';
import { resolve as _resolve } from 'node:path';
import Axios from 'axios';

async function downloadImage() {
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  const path = _resolve('.', 'code.jpg');
  const writer = createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

downloadImage();

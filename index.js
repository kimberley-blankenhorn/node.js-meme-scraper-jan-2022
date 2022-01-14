import { createWriteStream } from 'node:fs';
import { resolve as _resolve } from 'node:path';
import Axios from 'axios';
import { load } from 'cheerio';
import request from 'request';

// Pull the information from this site:
const URL = 'https://memegen-link-examples-upleveled.netlify.app/';
async function downloadImage(url, index) {
  // Rename the images to have the Zero in front
  // Need to adjust it to take the zero off in front of 10 with slice
  const path = _resolve('./memes', '0' + [index + 1] + '.jpg');
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
request(URL, function (err, resp, html) {
  // If there is no error
  if (!err) {
    // The URL Data
    const $ = load(html);

    // Save embeded urls
    // const returnInfo = [];
    const imgUrls = [];
    for (let i = 0; i < 10; i++) {
      imgUrls.push($('img', html)[i].attribs.src);
    }
    imgUrls.forEach(downloadImage);
    console.log(imgUrls);

    // Treverse the webpage and select the media elements
    $('img').each(function (i, element) {
      const temp = $(this).attr('src'); // Create a reference for the image
      imgUrls.push(temp); // Add the URL address to the return info array
    });

    try {
      console.log(imgUrls[10]);
    } catch (e) {
      // Output the error
      console.log('Error in the output process: ' + e);
    }
  } else {
    // There was an error with our request
    console.log('Error in webscrape process: ' + err);
  }
});

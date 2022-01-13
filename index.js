import { load } from 'cheerio';
import fs from 'fs';
import request from 'request';

const URL = 'https://memegen-link-examples-upleveled.netlify.app/';

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
    console.log(imgUrls);

    // Treverse the webpage and select the media elements
    $('img').each(function (i, element) {
      const temp = $(this).attr('src'); //Create a reference for the image
      imgUrls.push(temp); //Add the URL address to the return info array
    });
    // fs.writeFile(
    //   './memes/memes.json',
    //   JSON.stringify(imgUrls, null, 2),
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('Successfully written data to file');
    //   },
    // );
//     const fs = require('fs');
// const client = require('https');

function downloadImage(, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

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

// import $ from 'cheerio';
// import rp from 'request-promise';

// const url = 'https://memegen-link-examples-upleveled.netlify.app/';

// rp(url)
//   .then(function (html) {
//     //success!
//     console.log(html);
//     // console.log($(' a > img', html).length);
//     console.log($(' a > img'));
//     const imgUrls = [];
//     for (let i = 0; i > 1; i++) {
//       imgUrls.push($('a > img', html)[i].attribs.href);
//     }
//     console.log(imgUrls);
//   })
//   .catch(function (err) {
//     //handle error
//   });

// let memes = [

// console.table(memes);

require("dotenv").config();
const vindexer = require("video-indexer");
const Vindexer = new vindexer(process.env.apiKey);
const fs = require('fs');

// Upload video via a URL and generate intelligent insights. If no URL is specified, the file should be passed as a multipart/form body content.
Vindexer.uploadVideo({
    // Optional
    videoUrl: "http_://_video_url_dot_/DB2017Intro.mp4",
    name: 'Desert Bus 2017 Intro Video',
    privacy: 'Private', 
    language: 'English', 
    externalId: 'DBTestCountdownToLaunchIntroVideo1234',
    description: 'DB2017 - Countdown To Launch intro video',
    partition: 'demos'
}).then(function(result){ 
    console.log (result.body);
    setInterval(checkProgress(result.body), 5000);
});

function checkProgress(videoID) {
    Vindexer.getProcessingState(videoID).then(function(result) {
        console.log(result.body);
    });
}

// Get full insights from previously-processed video
// Vindexer.getBreakdown("your_video_id").then(function(result) { 
//     console.log (result.body); 
//     fs.writeFile(__dirname+'/insights/json', result.body, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//     });
// });
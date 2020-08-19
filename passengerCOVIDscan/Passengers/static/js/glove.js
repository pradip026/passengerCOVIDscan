'use strict';

let intervalID;
let id;
let canvasDownload = document.createElement('canvas');
let canvasDownloadContext = canvasDownload.getContext('2d');
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');


function writeToCanvasDownload(img) {
    canvasDownload.width = img.width;
    canvasDownload.height = img.height;
    canvasDownloadContext.clearRect(0, 0, canvasDownload.width, canvasDownload.height);
    canvasDownloadContext.drawImage(img, 0, 0, img.width, img.height)
}

function writeTOCanvas(img){
    const cords = calculateLocationInCanvas(canvas.width, canvas.height, img.width, img.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, cords[0], cords[1], cords[2], cords[3]);

}

function writeTOCanvasVideo(video) {
    if (video && !video.paused) {
        writeTOCanvas(video);
        intervalID = setTimeout(() => {
            return writeTOCanvasVideo(video);
        }, 100);
    }
    return;
}

function setup() {
    let videoTemp = document.createElement('video');
    videoTemp.width = 640;
    videoTemp.height = 360;
    videoTemp.setAttribute("style", "display: none;");
    videoTemp.setAttribute('muted','');
    videoTemp.setAttribute('autoplay', '');
    videoTemp.setAttribute("id", "video");
    document.body.appendChild(videoTemp);
    writeTOCanvasVideo(video)
}
setup();

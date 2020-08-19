'use strict';

//initiate the time
var videoElement = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');
var video= document.querySelector('#video');
const width = 640;
const height = 360;


navigator.mediaDevices.enumerateDevices()
  .then(gotDevices).catch(handleError);

async function startVideo(){
    return new Promise((resolve =>{
        resolve(getStream());
    } ));
}

function stopVideo(){
    if (videoElement.srcObject) {
        videoElement.pause();
        videoElement.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        videoElement.srcObject = null;
        clearTimeout(id);
        clearTimeout(intervalID);
        return true;
    } else {
        return false;
    }
}

videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {

  for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'videoinput') {
          option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
          videoSelect.appendChild(option);
      } else {
          console.log('Found one other kind of source/device: ', deviceInfo);
      }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  var widthVideo = function(){
      return width;
  };
   var heightVideo = function(){
       return height;
  };
  var constraints = {
    video: {
      deviceId: {exact: videoSelect.value},
        width:widthVideo(),
        height:heightVideo()
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);

}

function gotStream(stream, resolve) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  videoElement.onloadeddata = ()=>{
      videoElement.play();
      return writeTOCanvasVideo(videoElement)
  }
}

function handleError(error, resolve) {
  $(".message").html(error);
}

function calculateLocationInCanvas(canvasWidth, canvasHeight, imgWidth, imgHeight) {
    let x, y, newHeight, newWidth;
    if (imgWidth <= canvasWidth) {
        if (imgHeight <= canvasHeight) {
            if (imgHeight / imgWidth <= canvasHeight / canvasWidth) {
                x = 0;
                newWidth = canvasWidth;
                newHeight = imgHeight * canvasWidth / imgWidth;
                y = (canvasHeight - newHeight) / 2 ;
            } else {
                y = 0;
                newHeight = canvasHeight;
                newWidth = imgWidth * canvasHeight / imgHeight;
                x = (canvasWidth - newWidth)/2;
            }
            return [x, y, newWidth, newHeight]
        } else {
            newWidth = imgWidth * canvasHeight / imgHeight;
            x = (canvasWidth - newWidth) / 2;
            return [x, 0, newWidth, canvasHeight]
        }

    } else {
        if (imgHeight <= canvasHeight) {
            newHeight = imgHeight * canvasWidth / imgWidth;
            y = (canvasHeight - newHeight) / 2;
            return [0, y, canvasWidth, newHeight]
        } else {
            if (imgHeight/imgWidth <= canvasHeight/canvasWidth) {
                newHeight = imgHeight * canvasWidth / imgWidth;
                y = (canvasHeight - newHeight) / 2;
                return [0, y, canvasWidth, newHeight];
            } else {
                newWidth = imgWidth * canvasHeight / imgHeight;
                x = (canvasWidth - newWidth) / 2;
                return [x, 0, newWidth, canvasHeight]
            }
        }
    }
}



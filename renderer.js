// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const {desktopCapturer} = require('electron')
const gifshot = require('gifshot')


if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}









// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // First get ahold of the legacy getUserMedia, if present
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

/// capture sources!!!
desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {

  //var pttrn = / ^Entire\sScreen$ | ^Screen\s\d*/
console.log("getsources")
  if (error) throw error
  for (let i = 0; i <  sources.length; ++i) {
    if (sources[i].name === 'Hello World!') {   // /^Entire\sScreen$/ | /^Screen\s\d*/
      // navigator.webkitGetUserMedia({
      //   audio: false,
      //   video: {
      //     mandatory: {
      //       chromeMediaSource: 'desktop',
      //       chromeMediaSourceId: sources[i].id,
      //       minWidth: 1280,
      //       maxWidth: 1280,
      //       minHeight: 720,
      //       maxHeight: 720
      //     }
      //   }
      // }, handleStream, handleError)

      var promise = navigator.mediaDevices.getUserMedia(
            { audio: false,       video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              maxWidth: 1920,
              maxHeight: 1080,
              maxFrameRate: 10,
              minAspectRatio: 1.77,
              chromeMediaSourceId: sources[i].id         
                       }
              }
            }
          )
          .then(function(stream) {

            var video = document.querySelector('video');
            // Older browsers may not have srcObject
            if ("srcObject" in video) {
              video.srcObject = stream;
            } else {
              // Avoid using this in new browsers, as it is going away.
              video.src = URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function(e) {
              video.play();
            };
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
          });
      console.log('Promise is made')
      return
    }
    else {      console.log('Sources that aren\'t the desired screen/window' + sources[i].name)
    }
  }
})




function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }


function handleStream (stream) {
  document.querySelector('video').src = URL.createObjectURL(stream)
  //gifshot.takeSnapShot()
  console.log("handleStream")
}

function handleError (e) {
  console.log(e)
}



//handleStream("big_buck_bunny.mp4")
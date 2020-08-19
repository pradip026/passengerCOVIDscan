$('#startButtonBadge').click(()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    startVideo().then(()=>{

        const date1 = new Date();
        id = setInterval(function () {
            const date2 = new Date();
            const dataUrl = canvas.toDataURL('image/jpg');
            makeRequest(dataUrl, 'POST', '/badge/', 'badge', false);
            if(date2 - date1 > 10000){
                stopVideo();
            }
        }, 200);

    });

});

$('#startButtonPpe').click(()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    startVideo().then(()=>{

        const date1 = new Date();
        id = setInterval(function () {
            const date2 = new Date();
            const dataUrl = canvas.toDataURL('image/jpg');
            makeRequest(dataUrl, 'POST', '/predict_ppe/', 'ppe', false);
            if(date2 - date1 > 10000){
                stopVideo();
            }
        }, 200);
    });

});

$('#startButtonGlove').click(()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    startVideo().then(()=>{

        const date1 = new Date();
        id = setInterval(function () {
            const date2 = new Date();
            const dataUrl = canvas.toDataURL('image/jpg');
            makeRequest(dataUrl, 'POST', '/predict_glove/', 'glove', false);
            if(date2 - date1 > 10000){
                stopVideo();
            }
        }, 200);
    });

});

$('#stopButton').click(() =>{
   stopVideo();
});

$('#formid input[name="files"]').change(function () {
    validateShowFiles();
});

$(".badge-image").click(
    (item) => {
        contentImg = new Image();
        contentImg.src = item.currentTarget.src;

        contentImg.onload = function() {
            canvas = document.getElementById('canvas');
            // canvas.width = contentImg.width;
            // canvas.height = contentImg.height;
            context = canvas.getContext('2d');
            context.drawImage(contentImg, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpg');
            makeRequest(dataUrl, 'POST', '/badge/', 'badge');
        }
});
$(".ppe-image").click(
    (item) => {
        contentImg = new Image();
        contentImg.src = item.currentTarget.src;

        contentImg.onload = function() {
            canvas = document.getElementById('canvas');
            // canvas.width = contentImg.width;
            // canvas.height = contentImg.height;
            context = canvas.getContext('2d');
            context.drawImage(contentImg, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpg');
            makeRequest(dataUrl, 'POST', '/predict_ppe/', 'ppe');
        }
});

$(".glove-image").click(
    (item) => {
        contentImg = new Image();
        contentImg.src = item.currentTarget.src;

        contentImg.onload = function() {
            canvas = document.getElementById('canvas');
            // canvas.width = contentImg.width;
            // canvas.height = contentImg.height;
            context = canvas.getContext('2d');
            context.drawImage(contentImg, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpg');
            makeRequest(dataUrl, 'POST', '/predict_glove/', 'glove');
        }
});


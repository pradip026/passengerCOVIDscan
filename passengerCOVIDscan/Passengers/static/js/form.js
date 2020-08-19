$(function () {
    $("#results").hide();
});

const badge_results = $('#badge_results');
const ppe_results = $('#ppe_results');
const glove_results = $('#glove_results');

let results = $('#results')
let contentImg = new Image();
const URL = window.webkitURL || window.URL;


function getCookie(c_name) {
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}



function makeRequest(img, method, url, type, demo=true) {
    let results;
    let callbackonsuccess;
    if(type === 'badge'){
        results = badge_results;
        callbackonsuccess = badgeSuccess;
    }
    else if(type === 'ppe'){
        results = ppe_results;
        callbackonsuccess = ppeSuccess;
    }
    else if(type === 'glove'){
        callbackonsuccess = gloveSuccess;
    }
    $.ajax({
            type: method,
            url: url,
            dataType: 'json',
            data: JSON.stringify({
                'image': img
            }),
            contentType: 'application/json;charset=UTF-8',
            cache: false,
            beforeSend: function(){
                results.show();
                results.children('p').html('Loading..');
                if(demo) $('html, body').animate({scrollTop: results.offset().top - 300 }, 500);
            },
            complete: function () {
                results.children('h1').html('Results');
            },
            processData: false,
            success: function(data) {
                $('.message').text("");
                callbackonsuccess(data, results, demo);
                // if(demo)badgeDemoSuccess(data, results);
                // else badgeSuccess(data, results);
            }
        });
}

function badgeSuccess(data, results, demo = true) {
    if(data.status === 1) {
        results.children('p').html("");
        const items = JSON.parse(data.data);
        console.log(items);
        for(let i = 0; i<items.length; i++){
            const item = items[i];
            results.children('p').append("<br><b>Code: </b>"+item.code+", <b>Type: </b>"+item.type);
        }
        if(!demo){
                results.children('p').append("<div class=\"row\">\n" +
                "                                <div class=\"text-center\">Proceed to net step <br>\n" +
                "                                    <a href=\"/ppe_scan\" class=\"g-width-150--xs text-uppercase s-btn s-btn--xs s-btn--primary-brd g-radius--50 g-margin-t-20--xs\">PPE scan</a>\n" +
                "                                </div>\n" +
                "                            </div>");
            stopVideo();
        }
    }
    else if(data.status === 0){
        results.children('p').html(data.data);
    }
    else{
       results.children('p').html("Something went wrong!");
    }
}

function ppeSuccess(data, results, demo = true) {
    if(data.status === 1) {
        results.children('p').html("");
        const items = data.data;
        let clas;
        if(items['class'] === "0")clas = 'Mask Found';
        else clas = "No Mask";
        const score = parseFloat(items['score']).toFixed(4);
        console.log(items);
        results.children('p').append("<b>Prediction: </b>"+clas+", <b>Score: </b>"+score);
        console.log(results);
        if(!demo && items['class'] === "0"){
            results.children('p').append("<div class=\"row\">\n" +
                "                <div class=\"text-center\">Proceed to next step <br>\n" +
                "                    <a href=\"/glove_scan\" class=\"g-width-150--xs text-uppercase s-btn s-btn--xs s-btn--primary-brd g-radius--50 g-margin-t-20--xs\">X-ray scan</a>\n" +
                "                </div>\n" +
                "            </div>");

            stopVideo();
        }

    }
    else if(data.status === 0){
        results.children('p').html(data.data);
    }
    else{
       results.children('p').html("Something went wrong!");
    }
}



function gloveSuccess(data, results, demo = true) {
    if(data.status === 1) {
        results.children('p').html("");
        const items = data.data;
        let clas;
        if(items['class'] === "0")clas = 'glove Found';
        else clas = "No glove";
        const score = parseFloat(items['score']).toFixed(4);
        console.log(items);
        results.children('p').append("<b>Prediction: </b>"+clas+", <b>Score: </b>"+score);
        console.log(results);
        if(!demo && items['class'] === "0"){
            results.children('p').append("<div class=\"row\">\n" +
                "                <div class=\"text-center\">Proceed to next step <br>\n" +
                "                    <a href=\"/glove_scan\" class=\"g-width-150--xs text-uppercase s-btn s-btn--xs s-btn--primary-brd g-radius--50 g-margin-t-20--xs\">glove scan</a>\n" +
                "                </div>\n" +
                "            </div>");

            stopVideo();
        }

    }
    else if(data.status === 0){
        results.children('p').html(data.data);
    }
    else{
       results.children('p').html("Something went wrong!");
    }
}
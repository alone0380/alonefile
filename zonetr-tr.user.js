// ==UserScript==
// @name         TurkeyZone Bot 0.1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Türkiye için özel PixelBOT
// @author       Battal51280
// @match        http://pixelzone.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();
var imageBot = {};

var colors = {
    "rgb(38, 38, 38)": 0,
    "rgb(0, 0, 0)": 1,
    "rgb(128, 128, 128)": 2,
    "rgb(255, 255, 255)": 3,
    "rgb(153, 98, 61)": 4,
    "rgb(255, 163, 200)": 5,
    "rgb(207, 115, 230)": 6,
    "rgb(128, 0, 128)": 7,
    "rgb(229, 0, 0)": 8,
    "rgb(229, 137, 0)": 9,
    "rgb(229, 229, 0)": 10,
    "rgb(150, 230, 70)": 11,
    "rgb(0, 190, 0)": 12,
    "rgb(0, 230, 230)": 13,
    "rgb(0, 136, 204)": 14,
    "rgb(0, 0, 230)": 15
}
//Object.keys(colors)

//Functions
imageBot.createInput = function(id, placeholder, style) {
    var myInput = document.createElement("input");
    if (id) {
        myInput.id = id;
    }
    if (placeholder) {
        myInput.placeholder = placeholder;
    }
    if (style) {
        myInput.style = style;
    }
    imageBot.div.appendChild(myInput);
};

//Image Drawer
function drawImg() {

    imageBot.sx = parseInt(document.getElementById("isx").value);
    imageBot.sy = parseInt(document.getElementById("isy").value);
    imageBot.fx = imageBot.sx + copier.canvas.width;
    imageBot.fy = imageBot.sy + copier.canvas.height;

    imageBot.dx = imageBot.sx;
    imageBot.dy = imageBot.sy;

    imageBot.interval = setInterval(function() {
		imageBot.dx = Math.floor(Math.random() * (imageBot.fx - imageBot.sx - 1) + imageBot.sx);
		imageBot.dy = Math.floor(Math.random() * (imageBot.fy - imageBot.sy - 1) + imageBot.sy);
        if (canPlace) {
            if (imageBot.dy >= imageBot.fy) {
                if (imageBot.loopcheckbox.checked) {
                    imageBot.dx = imageBot.sx;
                    imageBot.dy = imageBot.sy;
                } else {
                    imageBot.startButton.style.backgroundColor = "#f44336";
                    imageBot.startButton.innerHTML = "Start";
                    clearInterval(imageBot.interval);
                    imageBot.pos.innerHTML = "bot not started";
                }
            } else if (imageBot.dx >= imageBot.fx) {
                imageBot.dx = imageBot.sx;
                imageBot.dy += 1;
                imageBot.pos.innerHTML = "x: " + imageBot.dx + ", y: " + imageBot.dy;
            } else {
                var pixelArray = copier.canvas.getContext('2d').getImageData(imageBot.dx - imageBot.sx, imageBot.dy - imageBot.sy, 1, 1).data
                var rgb = "rgb(" + pixelArray[0] + ", " + pixelArray[1] + ", " + pixelArray[2] + ")";
                currentColor = rgb
                currentColorVal = colors[rgb]
                console.log(currentColor, currentColorVal)
                placePixel(imageBot.dx, imageBot.dy, rgb)
                imageBot.dx += 1;
                imageBot.pos.innerHTML = "x: " + imageBot.dx + ", y: " + imageBot.dy;
            }
        }
    }, 100);
}

//UI
imageBot.div = document.createElement("div");
imageBot.div.id = "imageBotDiv";
imageBot.div.style = "background-color: #262626; z-index: 3; border: none; font-size: 15px; color: white; position: absolute; margin: -500px 0px 0px 10px; width: 105px; height: 80px;";
document.body.appendChild(imageBot.div);

imageBot.file = document.createElement("input");
imageBot.file.style = "background-color: #262626; border: none; color: white; position: absolute; width: 104px; height: 20px;";
imageBot.file.type = "file";
imageBot.file.onchange = function() {
    copier = {};
    copier.img = new Image();
    copier.img.onload = function() {
        copier.canvas = document.createElement('canvas');
        copier.canvas.width = this.width;
        copier.canvas.height = this.height;
        copier.ctx = copier.canvas.getContext('2d');
        copier.ctx.drawImage(copier.img, 0, 0, copier.canvas.width, copier.canvas.height);
    };

    var filesSelected = imageBot.file.files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            copier.img.src = fileLoadedEvent.target.result;
            console.log(fileLoadedEvent.target.result);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};
imageBot.div.appendChild(imageBot.file);

imageBot.createInput("isx", "Start X", "background-color: #262626; border: none; color: white; position: absolute; margin-top: 20px; width: 52px; height: 20px;");
imageBot.createInput("isy", "Start Y", "background-color: #262626; border: none; color: white; position: absolute; margin-top: 20px; margin-left: 52px; width: 52px; height: 20px;");

imageBot.startButton = document.createElement("button");
imageBot.startButton.style = "background-color: #f44336; border: none; color: white; position: absolute; margin-top: 40px; width: 54px; height: 20px;";
imageBot.startButton.onclick = function() {
    switch (imageBot.startButton.innerHTML) {
        case "Start":
            imageBot.startButton.style = "background-color: #4CAF50; border: none; color: white; position: absolute; margin-top: 40px; width: 54px; height: 20px;";
            imageBot.startButton.innerHTML = "Stop";
            drawImg();
            break;
        case "Stop":
            imageBot.startButton.style = "background-color: #f44336; border: none; color: white; position: absolute; margin-top: 40px; width: 54px; height: 20px;";
            imageBot.startButton.innerHTML = "Start";
            clearInterval(imageBot.interval);
            imageBot.pos.innerHTML = "bot not started";
            break;
    }
};
imageBot.startButton.innerHTML = "Start";
imageBot.div.appendChild(imageBot.startButton);

imageBot.loopcheckbox = document.createElement("input");
imageBot.loopcheckbox.style = "position: absolute; margin-top: 41px; margin-left: 54px; width: 20px; height: 20px;";
imageBot.loopcheckbox.type = "checkbox";
imageBot.div.appendChild(imageBot.loopcheckbox);

imageBot.looptext = document.createElement("label");
imageBot.looptext.for = "isloopimage";
imageBot.looptext.innerHTML = "Loop";
imageBot.looptext.style = "background-color: #262626; border: none; color: white; position: absolute; margin-top: 40px; margin-left: 73px; width: auto; height: 20px;";
imageBot.div.appendChild(imageBot.looptext);

imageBot.pos = document.createElement("p");
imageBot.pos.style = "background-color: #262626; border: none; color: white; position: absolute; margin-top: 60px; width: 104px; height: 20px;";
imageBot.pos.innerHTML = "bot not started";
imageBot.div.appendChild(imageBot.pos);

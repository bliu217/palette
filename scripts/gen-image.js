import { selectedPalette } from "./palette.js";
import { saveAs } from './FileSaver.js';


const downloadButton = document.getElementById('download-button');

export function download() {
    downloadButton.addEventListener('click', () => {
        generatePalette();
    });
}

function generatePalette() {
    let colours = selectedPalette.colours;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    let startY = 0;

    canvas.width = 90;
    canvas.height = 128;
    colours.forEach(colour => {
        ctx.fillStyle = colour;
        ctx.fillRect(0, startY, 90, 32);
        startY += 32;
    });

    canvas.toBlob(function (blob) {
        saveAs(blob, "created-palette.png");
    });
}
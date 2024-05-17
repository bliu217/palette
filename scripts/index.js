import {
    selectedPalette,
    paletteCollection,
    selectPalette,
    removePalette,
    addPalette,
    savePalette
} from "./palette.js";
import {
    changeColourWithBox,
    eyeDropper,
    compatibilityCheck,
    changeColour,
    colorPicker,
    generatePicker
} from "./picker.js";
import { getInputs, rgbToHex } from "./hex.js";
import { enableDarkMode } from "./dark-mode.js";

const changeFunctionButton = document.getElementById('change-function-button');
const saveButton = document.getElementById('save-button');
const addButton = document.getElementById('add-button');
const eyeDropperButton = document.getElementById('eyedropper-button');
const currentPaletteDisplay = document.getElementById('current-palette');
const collection = document.getElementById('palette-collection');
const functionDiv = document.getElementById('picker');
const clipboardMessage = document.getElementById('clipboardMessage');

let useHex = false;

export let selectedColourContainer = {};

compatibilityCheck();

eyeDropperButton.addEventListener('click', () => {
    eyeDropper.open().then((result) => {
        const colour = result.sRGBHex;
        changeColour(colour);
    });
});

changeFunctionButton.addEventListener('click', () => {
    useHex = !useHex;
    changeFunctionButton.innerHTML =
        (useHex) ? '<img src="assets/palette.png">' : '<img src="assets/hashtag.png">';

    if (useHex) {
        document.querySelector('.IroColorPicker').remove();
        hexFunction();
        getInputs();
    } else {
        document.getElementById('hexFunction').remove();
        generatePicker();
    }

});

saveButton.addEventListener('click', () => {
    let colours = getCurrentColours();
    savePalette(colours);
    renderCollection();
});

addButton.addEventListener('click', () => {
    let colours = getCurrentColours();
    addPalette(colours);
    renderCollection();
});

function copyToClipboard() {
    let allColours = document.getElementById('palette-collection').querySelectorAll('.palette-colour');
    allColours.forEach((container) => {
        let thisColour = splitRGBtoHex(container.style.backgroundColor);

        container.addEventListener('click', async () => {
            navigator.clipboard.writeText(thisColour.substring(1));

            opacityAnimation();
        });

    });
}

async function opacityAnimation() {
    clipboardMessage.style.opacity = 1;
    await new Promise(r => setTimeout(r, 500));
    let id = null;
    let opacity = 1;
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
        if (opacity <= 0) {
            clipboardMessage.style.opacity = 0;
            clearInterval(id);
        } else {
            opacity -= 0.01;
            clipboardMessage.style.opacity = opacity;
        }
    }
    console.log(id);
}

enableDarkMode();
renderCollection();
renderSelectedPalette();


function hexFunction() {
    functionDiv.innerHTML =
        `
        <div id="hexFunction">
            <div id="hexSection">
                <p>Hex: </p>
                <p id="hash">#</p>
                <input class="cV" maxlength = "6" id="hexV" type="text" placeholder="hex">
            </div>
            <div>or</div>
            <div id="rgbSection">
                <p>RGB: </p>
                <div id="rgbDiv">
                    <input class="rgbV cV" maxlength = "3" id="redV" type="text" placeholder="R">
                    <input class="rgbV cV" maxlength = "3" id="greenV" type="text" placeholder="G">
                    <input class="rgbV cV" maxlength = "3" id="blueV" type="text" placeholder="B">
                </div>
            </div>
            <p style="font-weight: 500; font-style: italic;">*must enter valid values to work!<p>
        </div>
        `;
}

function renderSelectedPalette() {
    currentPaletteDisplay.innerHTML = renderPalette(selectedPalette);
    selectColour();

}

function selectColour() {
    let currentColours = currentPaletteDisplay.querySelectorAll('.palette-colour');
    currentColours
        .forEach((container, index) => {
            container.addEventListener('click', () => {
                scaleContainer(index);
            });
        });
}

function scaleContainer(index) {
    let currentColours = currentPaletteDisplay.querySelectorAll('.palette-colour');

    currentColours.forEach((colour, colourIndex) => {
        if (colourIndex === index) {
            selectedColourContainer =
            {
                container: colour,
                index: colourIndex
            };
            colour.style.transform = "scale(1.2)";
            colour.style.zIndex = "2";
        } else {
            colour.style.transform = "scale(1)";
            colour.style.zIndex = "1";
        }
    });
}

function renderCollection() {
    collection.innerHTML = '';
    let totalHTML = '';
    paletteCollection.forEach((palette, index) => {
        let tempHTML = renderPalette(palette);
        totalHTML += `
            <div class="created-palette js-palette-id-${index}">
                <div class="edit-row js-edit" data-palette-id="id-${index}">edit</div>
                <div class="palette-container">
                    ${tempHTML}
                </div>
                <div class="delete-row js-delete" data-palette-id="id-${index}">x</div>
            </div>
            `;
    });

    collection.innerHTML = totalHTML;
    paletteFunctions();
    copyToClipboard();
}

function renderPalette(palette) {
    let tempHTML = '';

    palette.colours.forEach((colour) => {
        tempHTML += `
        <div class="palette-colour" style="background-color: ${colour};">
            <div class="colour-desc">${colour}</div>
        </div>
        `
    });

    return tempHTML;
}

function getCurrentColours() {
    let colourDisplays = currentPaletteDisplay.querySelectorAll('.palette-colour');
    let colours = [];
    colourDisplays.forEach((colour) => {
        let hexString = splitRGBtoHex(colour.style.backgroundColor);
        colours.push(hexString);
    });
    return colours;
}

function splitRGBtoHex(value) {
    let rgb = value.replace(/[^\d,]/g, '').split(',');
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);
    return rgbToHex(r, g, b).toUpperCase();
}


function paletteFunctions() {
    document.querySelectorAll('.js-delete')
        .forEach((link, index) => {
            link.addEventListener('click', () => {
                const container = document.querySelector(`.js-palette-${link.dataset.paletteId}`);
                if (container) {
                    container.remove();
                }
                // console.log('clicked: ', link);
                removePalette(index);

                renderCollection();

            });
        });

    document.querySelectorAll('.js-edit')
        .forEach((link, index) => {
            link.addEventListener('click', () => {
                selectPalette(index);
                renderSelectedPalette();
            });

        });
}


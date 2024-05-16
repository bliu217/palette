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

const changeFunctionButton = document.getElementById('change-function-button');
const saveButton = document.getElementById('save-button');
const addButton = document.getElementById('add-button');
const eyeDropperButton = document.getElementById('eyedropper-button');
const currentPaletteDisplay = document.getElementById('current-palette');
const collection = document.getElementById('palette-collection');
const functionDiv = document.getElementById('picker');

let useHex = false;
let boot = true;

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
        // console.log('removed: ', colorPicker);
        document.querySelector('.IroColorPicker').remove();
    } else {
        if (boot) {
            document.querySelector('.editor-el').innerHTML += `<div id="picker"></div>`;
            boot = false;
        }
        generatePicker();
        // changeColourWithBox();
        // console.log('added: ', colorPicker);
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

renderCollection();
renderSelectedPalette();


function changeSelectedColour() {
    // changeColourWithBox();
}


function renderSelectedPalette() {
    currentPaletteDisplay.innerHTML = renderPalette(selectedPalette);
    selectColour();
    changeSelectedColour();

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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getCurrentColours() {
    let colourDisplays = currentPaletteDisplay.querySelectorAll('.palette-colour');
    let colours = [];
    colourDisplays.forEach((colour) => {
        let rgb = colour.style.backgroundColor.replace(/[^\d,]/g, '').split(',');
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);
        colours.push(rgbToHex(r, g, b).toUpperCase());
    });
    return colours;
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

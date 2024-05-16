import { selectedColourContainer } from "./index.js";

let defaultPalette = [
    {
        selected: false,
        colours: ['#7469B6', '#AD88C6', '#E1AFD1', '#FFE6E6']
    },
    {
        selected: false,
        colours: ['#7469B6', '#38B000', '#007200', '#004B23']
    },
    {
        selected: false,
        colours: ['#70E000', '#38B000', '#007200', '#004B23']
    },
    {
        selected: false,
        colours: ['#70E000', '#38B000', '#007200', '#004B23']
    }
];

export let paletteCollection = JSON.parse(localStorage.getItem('collection')) || [].concat(defaultPalette);
export let selectedPalette = paletteCollection[0];



export function selectPalette(inputIndex) {
    selectedPalette = paletteCollection[inputIndex];
    paletteCollection.forEach((palette, index) => {
        (index === inputIndex) ? palette.selected = true : palette.selected = false;
    });
    // console.log(paletteCollection);
}

export function addPalette(arr) {
    paletteCollection.push({
        selected: false,
        colours: arr
    });
    // console.log('Size (other): ' + paletteCollection.length);
    localStorage.setItem('collection', JSON.stringify(paletteCollection));
}

export function savePalette(arr) {
    let savedPalette =
    {
        selected: false,
        colours: arr
    };
    let index = paletteCollection.indexOf(selectedPalette);
    paletteCollection.splice(index, 1, savedPalette);
    localStorage.setItem('collection', JSON.stringify(paletteCollection));
}

export function removePalette(inputIndex) {
    // console.log('Inputed ID: ', inputIndex);

    paletteCollection.splice(inputIndex, 1);
    if (paletteCollection.length === 0) {
        localStorage.removeItem('collection');
    } else {
        localStorage.setItem('collection', JSON.stringify(paletteCollection));
    }

    // console.log('After: ', paletteCollection);
}
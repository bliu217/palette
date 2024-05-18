let defaultPalette = [
    {
        selected: false,
        colours: ['#FFE6E6', '#E1AFD1', '#AD88C6', '#7469B6']
    },
    {
        selected: false,
        colours: ['#32F3FF', '#27A9B2', '#196C72', '#0F3B3D']
    },
    {
        selected: false,
        colours: ['#FF6161', '#A63838', '#623232', '#402424']
    },
    {
        selected: false,
        colours: ['#3CF893', '#37C87A', '#2C995E', '#247047']
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
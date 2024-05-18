import { selectedColourContainer } from "./index.js";
export let eyeDropper = new EyeDropper();
export let colorPicker = generatePicker();

export function generatePicker() {
    return new iro.ColorPicker('#picker', {
        width: 180,
        boxHeight: 140,
        sliderSize: 10,
        color: '#f00',
        layout: [
            {
                component: iro.ui.Box,
            },
            {
                component: iro.ui.Slider,
                options: {
                    id: 'hue-slider',
                    sliderType: 'hue'
                }
            }
        ]
    }).on('color:change', function (color) {
        changeColour(color.hexString);
    });
}

export function regenPicker() {
    return new iro.ColorPicker('#picker', {
        width: 180,
        boxHeight: 140,
        sliderSize: 10,
        color: selectedColourContainer.container.style.backgroundColor,
        layout: [
            {
                component: iro.ui.Box,
            },
            {
                component: iro.ui.Slider,
                options: {
                    id: 'hue-slider',
                    sliderType: 'hue'
                }
            }
        ]
    }).on('color:change', function (color) {
        changeColour(color.hexString);
    });
}


export function compatibilityCheck() {
    if (window.EyeDropper == undefined) {
        console.error('EyeDropper API is not supported on this platform');
    }
}

export function changeColour(colourString) {
    if (selectedColourContainer.container) {
        selectedColourContainer.container.style.backgroundColor = colourString;
        selectedColourContainer.container.querySelector('.colour-desc').innerHTML = colourString.toUpperCase();
    }
}

function setPickerColour() {
    colorPicker.color = selectedColourContainer.container.style.backgroundColor;
}


import { changeColour } from "./picker.js";

let Reg_Exp = /^#[0-9A-F]{6}$/i;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getInputs() {
    const hexValue = document.getElementById('hexV');
    const rgbValues = document.querySelectorAll('.rgbV');
    const redValue = document.getElementById('redV');
    const greenValue = document.getElementById('greenV');
    const blueValue = document.getElementById('blueV');

    rgbValues.forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.code === 'Enter') {
                let r = parseInt(redValue.value);
                let g = parseInt(greenValue.value);
                let b = parseInt(blueValue.value);

                if (validRGB(r) && validRGB(g) && validRGB(b)) {
                    changeColour(rgbToHex(r, g, b));
                }
            }
        });
    });

    hexValue.addEventListener("keydown", (event) => {
        if (event.code === 'Enter') {
            let hexString = `#${hexValue.value}`;
            if (validHex(hexString)) {
                changeColour(hexString);
            }
        }
    });
}

function validHex(value) {
    return Reg_Exp.test(value);
}

function validRGB(value) {
    if (0 <= value <= 255) {
        return true
    } else {
        return false
    }
}
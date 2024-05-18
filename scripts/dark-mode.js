const darkModeSwitch = document.getElementById('dark-mode-switch');
const logoEl = document.getElementById('logo-el');
const tools = document.querySelectorAll('.dm-tool');
const toolContainer = document.querySelector('.tool-container');
let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

export function enableDarkMode() {
    darkModeSwitch.checked = darkMode;

    switchMode();
    darkModeSwitch.addEventListener('change', () => {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        switchMode();
    });
}

function switchMode() {
    if (darkMode) {
        document.body.style.backgroundColor = "#3B3B3B";
        document.body.style.color = "#DFDFDF";
        document.getElementById('github-link').style.color = "#DFDFDF";
        document.querySelector('.header-el').style.backgroundColor = "#2B2B2B";
        logoEl.innerHTML = `
        <img src="assets/dark-full.png">
        `;
        changeToolsDark();
        changeScroll();
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        document.getElementById('github-link').style.color = "#464646";
        document.querySelector('.header-el').style.backgroundColor = "white";
        logoEl.innerHTML = `
        <img src="assets/logo-full.png">
        `;
        changeToolsLight();
        changeScroll();

    }
}

function changeToolsDark() {
    toolContainer.style.backgroundColor = "#2B2B2B"
    tools.forEach((tool) => {
        let img = tool.querySelector('img');
        img.style.filter = "invert(1)"
        tool.style.backgroundColor = "#2B2B2B";
    });
}

function changeToolsLight() {
    toolContainer.style.backgroundColor = "#F5F5F5"
    tools.forEach((tool) => {
        let img = tool.querySelector('img');
        img.style.filter = "invert(0)"
        tool.style.backgroundColor = "#F5F5F5";
    });
}

function changeScroll() {
    const collection = document.getElementById('palette-collection')
    let isScrollbar = window.scrollbars.visible;
    if (isScrollbar) {
        if (darkMode) {
            collection.classList.add("scrollbar-dark");
        } else {
            collection.classList.remove("scrollbar-dark");
        }
    }
}
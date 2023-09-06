// Variaveis globais


// Funcoes


// Alterar darkmode

document.addEventListener("DOMContentLoaded", function () {

    const themeCheckbox = document.querySelector("#themeCheckbox");

    const htmlElement = document.querySelector("html");

    const savedTheme = localStorage.getItem("data-theme");


    if (savedTheme) {

        themeCheckbox.checked = savedTheme === "dark";

        htmlElement.setAttribute("data-theme", savedTheme);

    }


    themeCheckbox.addEventListener("change", function () {


        const newTheme = themeCheckbox.checked ? "dark" : "light";
        

        htmlElement.setAttribute("data-theme", newTheme);

        localStorage.setItem("data-theme", newTheme);


    });
    
});







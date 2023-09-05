// Variaveis globais


// Funcoes

// Alterar darkmode

document.addEventListener("DOMContentLoaded", function () {

    const themeCheckbox = document.querySelector("#themeCheckbox");
    const htmlElement = document.querySelector("html");

    // Verifique se o tema está definido no Local Storage e atualize o estado do checkbox
    const savedTheme = localStorage.getItem("data-theme");
    if (savedTheme) {
        themeCheckbox.checked = savedTheme === "dark";
        htmlElement.setAttribute("data-theme", savedTheme);
    }

    // Adicione um evento de mudança ao checkbox
    themeCheckbox.addEventListener("change", function () {
        const newTheme = themeCheckbox.checked ? "dark" : "light";
        htmlElement.setAttribute("data-theme", newTheme);

        // Salve o tema atual no Local Storage
        localStorage.setItem("data-theme", newTheme);
    });
    
});

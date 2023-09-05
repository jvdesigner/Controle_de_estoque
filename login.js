// variaveis globais

const txtEmail = document.getElementById('txt-Email');
const txtSenha = document.getElementById('txt-Senha');

const iconOlhoAberto = document.getElementById('olhoaberto');
const iconOlhoFechado = document.getElementById('olhofechado');


// funcoes

// Visibilidade da senha

iconOlhoAberto.addEventListener("click",  ()=> {

    iconOlhoFechado.style.display="flex";

    iconOlhoAberto.style.display="none";

    txtSenha.type="password";



});

iconOlhoFechado.addEventListener("click",  ()=> {

    iconOlhoAberto.style.display="flex";
    
    iconOlhoFechado.style.display="none";

    txtSenha.type="text";


});

    



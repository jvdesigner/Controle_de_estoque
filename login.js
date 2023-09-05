// variaveis globais

const txtEmail = document.getElementById('txt-Email');
const txtSenha = document.getElementById('txt-Senha');

const txtvalidaremail = document.getElementById('txtvalidaremail');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validação de email


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

// Validar campo do email

txtEmail.addEventListener("keyup", ()=> {
    if (emailRegex.test(txtEmail.value)) {

        txtEmail.classList.remove("input-primary");
        txtEmail.classList.remove("input-error");

        txtvalidaremail.classList.remove("text-error");
        txtEmail.classList.add("input-success");

        txtvalidaremail.classList.add("text-success");

        txtvalidaremail.textContent = "Email válido!";
        txtvalidaremail.style.display="flex";

    } else {

        txtEmail.classList.remove("input-primary");
        txtEmail.classList.remove("input-success");

        txtEmail.classList.add("input-error");

        txtvalidaremail.classList.remove("text-success");
        txtvalidaremail.classList.add("text-error");

        txtvalidaremail.textContent = "Email Inválido!";
        txtvalidaremail.style.display="flex";
    }
});

txtEmail.addEventListener("blur", ()=> {

    if (txtEmail.value === "") {
    
    txtvalidaremail.style.display="none";

    txtEmail.classList.add("input-primary");
    txtEmail.classList.remove("input-error");
    txtEmail.classList.remove("input-success");

    }




})

    



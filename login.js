
// variaveis globais


const txtEmail = document.getElementById('txt-Email');
const txtSenha = document.getElementById('txt-Senha');

if(txtEmail){txtEmail.value="nogueirajva@gmail.com"};
if(txtSenha){txtSenha.value="123456jv";}; 

const txtvalidaremail = document.getElementById('txtvalidaremail');
const txtvalidarsenha = document.getElementById('txtvalidarsenha');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validação de email
const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/; // Expressão regular para validação de senha


const iconOlhoAberto = document.getElementById('olhoaberto');
const iconOlhoFechado = document.getElementById('olhofechado');




// ----------------------------------------------------------------------------------------------------------------


// funcoes








// ----------------------------------------------------------------------------------------------------------------



// Visibilidade da senha



if(iconOlhoAberto){

    iconOlhoAberto.addEventListener("click",  ()=> {

        iconOlhoFechado.style.display="flex";
    
        iconOlhoAberto.style.display="none";
    
        txtSenha.type="password";
    
    
    
    });
};



// ----------------------------------------------------------------------------------------------------------------



if(iconOlhoFechado){

    iconOlhoFechado.addEventListener("click",  ()=> {

        iconOlhoAberto.style.display="flex";
        
        iconOlhoFechado.style.display="none";

        txtSenha.type="text";


    });

}


// ----------------------------------------------------------------------------------------------------------------




// Validar campo do email


if(txtEmail){

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

}


// ----------------------------------------------------------------------------------------------------------------


if(txtEmail){


    txtEmail.addEventListener("blur", ()=> {

        if (txtEmail.value === "") {
        
        txtvalidaremail.style.display="none";

        txtEmail.classList.add("input-primary");
        txtEmail.classList.remove("input-error");
        txtEmail.classList.remove("input-success");

        }




    });

}


// ----------------------------------------------------------------------------------------------------------------



// Validar campo do senha

if(txtSenha){


    txtSenha.addEventListener("keyup", ()=> {

        if (senhaRegex.test(txtSenha.value)) {

            txtSenha.classList.remove("input-primary");
            txtSenha.classList.remove("input-error");

            txtvalidarsenha.classList.remove("text-error");
            txtSenha.classList.add("input-success");

            txtvalidarsenha.classList.add("text-success");

            txtvalidarsenha.textContent = "Senha válida!";
            txtvalidarsenha.style.display="flex";

        } else {

            txtSenha.classList.remove("input-primary");
            txtSenha.classList.remove("input-success");

            txtSenha.classList.add("input-error");

            txtvalidarsenha.classList.remove("text-success");
            txtvalidarsenha.classList.add("text-error");

            txtvalidarsenha.textContent = "Sua senha deve conter no mínimo 6 caracteres com numeros e letras";
            txtvalidarsenha.style.display="flex";
        }
    });

}


// ----------------------------------------------------------------------------------------------------------------

if(txtSenha){

    txtSenha.addEventListener("blur", ()=> {

        if (txtSenha.value === "") {
        
        txtvalidarsenha.style.display="none";

        txtSenha.classList.add("input-primary");
        txtSenha.classList.remove("input-error");
        txtSenha.classList.remove("input-success");

        }




    });

}


// ----------------------------------------------------------------------------------------------------------------






    




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { getAuth , onAuthStateChanged , updatePassword,signOut   } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHIvLMMn7BxwZS8X3ruSIJ7aUnq7phTiw",
    authDomain: "controle-de-estoque-2.firebaseapp.com",
    projectId: "controle-de-estoque-2",
    storageBucket: "controle-de-estoque-2.appspot.com",
    messagingSenderId: "62421934587",
    appId: "1:62421934587:web:2107381b122bcce6b6ab5e"
  };
  
const app = initializeApp(firebaseConfig);
  
const auth =getAuth(app);


let uid = "";
let email = "";
let photoURL = "";


onAuthStateChanged(auth, (user) => {

    if (user) {
    
    uid = user.uid;
    email = user.email;
    photoURL = user.photoURL;

    console.log(uid + " | " + email + " | " + photoURL);

    document.getElementById('imgUser').src = photoURL;


    }

})


const txtSenha = document.getElementById('txt-Senha');
const txtSenha2 = document.getElementById('txt-Senha2');

if(txtSenha){txtSenha.value=''};
if(txtSenha2){txtSenha2.value=''};

const txtvalidarsenha2 = document.getElementById('txtvalidarsenha2');
const txtvalidarsenha = document.getElementById('txtvalidarsenha');

const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/; // Expressão regular para validação de senha

const iconOlhoAberto2 = document.getElementById('olhoaberto2');
const iconOlhoFechado2 = document.getElementById('olhofechado2');

const btnExcluirConta = document.getElementById('btnExcluirConta');




// ----------------------------------------------------------------------------------------------------------------



// Visibilidade da senha



if(iconOlhoAberto2){

    iconOlhoAberto2.addEventListener("click",  ()=> {

        iconOlhoFechado2.style.display="flex";
    
        iconOlhoAberto2.style.display="none";
    
        txtSenha2.type="password";
    
    
    
    });
};



// ----------------------------------------------------------------------------------------------------------------



if(iconOlhoFechado2){

    iconOlhoFechado2.addEventListener("click",  ()=> {

        iconOlhoAberto2.style.display="flex";
        
        iconOlhoFechado2.style.display="none";

        txtSenha2.type="text";


    });

}


// ----------------------------------------------------------------------------------------------------------------




// ----------------------------------------------------------------------------------------------------------------





// Validar campo do senha

if(txtSenha2){


    txtSenha2.addEventListener("keyup", ()=> {

        if (senhaRegex.test(txtSenha2.value)) {

            txtSenha2.classList.remove("input-primary");
            txtSenha2.classList.remove("input-error");

            txtvalidarsenha2.classList.remove("text-error");
            txtSenha2.classList.add("input-success");

            txtvalidarsenha2.classList.add("text-success");

            txtvalidarsenha2.textContent = "Senha válida!";
            txtvalidarsenha2.style.display="flex";

        } else {

            txtSenha2.classList.remove("input-primary");
            txtSenha2.classList.remove("input-success");

            txtSenha2.classList.add("input-error");

            txtvalidarsenha2.classList.remove("text-success");
            txtvalidarsenha2.classList.add("text-error");

            txtvalidarsenha2.textContent = "Mínimo 6 caracteres , numeros e letras";
            txtvalidarsenha2.style.display="flex";
        };;
        
        if (txtSenha2.value!==txtSenha.value) {


            txtSenha2.classList.remove("input-primary");
            txtSenha2.classList.remove("input-success");

            txtSenha2.classList.add("input-error");

            txtvalidarsenha2.classList.remove("text-success");
            txtvalidarsenha2.classList.add("text-error");

            txtvalidarsenha2.textContent = "Sua senha esta diferente da anterior";
            txtvalidarsenha2.style.display="flex";

        } 
        
        
        
    });

}

if(txtSenha){


    txtSenha.addEventListener("keyup", ()=> {
        
        if (txtSenha2.value==txtSenha.value) {


            txtSenha2.classList.remove("input-primary");
            txtSenha2.classList.remove("input-error");

            txtvalidarsenha2.classList.remove("text-error");
            txtSenha2.classList.add("input-success");

            txtvalidarsenha2.classList.add("text-success");

            txtvalidarsenha2.textContent = "Senha válida!";
            txtvalidarsenha2.style.display="flex";

        } 
        
        
        
    });

}


// ----------------------------------------------------------------------------------------------------------------

if(txtSenha2){

    txtSenha2.addEventListener("blur", ()=> {

        if (txtSenha2.value === "") {
        
        txtvalidarsenha2.style.display="none";

        txtSenha2.classList.add("input-primary");
        txtSenha2.classList.remove("input-error");
        txtSenha2.classList.remove("input-success");

        }




    });

}


// ----------------------------------------------------------------------------------------------------------------


function deslogarUsuario(){

    signOut(auth)
    .then(() => {
  
      //alert('Usuário deslogado com sucesso');
      console.log("Usuário deslogado com sucesso");
      
      window.location.href = "login.html";
  
      
    })
    .catch((error) => {
      // Lidar com erros, se houver
      console.error("Erro ao deslogar o usuário:", error);
    });
  
  
};

// Apresentar alerta

// vCor = alert-success | alert-warning | alert-error



function mostrarAlerta(vMensagem,vCor){

    objalert02.classList.remove("alert-success");
    objalert02.classList.remove("alert-warning");
    objalert02.classList.remove("alert-error");

    svgAlert.style.display="none";
    svgOk.style.display="none";

    txtobjalert02.innerText=vMensagem;

    window.scrollTo({top: 0,behavior: 'smooth'});

    switch (vCor) {

        case "alert-success":

            objalert02.classList.add("alert-success");

            svgOk.style.display="flex";
          
        break;

        case "alert-warning":

            objalert02.classList.add("alert-warning");

            svgAlert.style.display="flex";
          
        break;
       
        default:

            objalert02.classList.add("alert-error");

            svgAlert.style.display="flex";
        
    };


    objalert02.style.display="flex";

    setTimeout(function() {
        objalert02.style.display = "none";
    }, 4000);
    

};


// atualizar senha

const btnSalvar = document.getElementById('btnSalvar');



function AlterarSenha(){

    if( (txtSenha.value == txtSenha2.value) && ( senhaRegex.test(txtSenha.value) ) &&  ( txtSenha.value !="" ) && ( txtSenha2.value !="" ) ){


        onAuthStateChanged(auth, (user) => {

            updatePassword(user, txtSenha.value).then(() => {

                mostrarAlerta('Senha alterada com sucesso','alert-success');

                if(txtSenha){txtSenha.value=''};
                if(txtSenha2){txtSenha2.value=''};

                txtvalidarsenha2.style.display="none";
                txtvalidarsenha.style.display="none";

                txtSenha2.classList.add("input-primary");
                txtSenha2.classList.remove("input-error");
                txtSenha2.classList.remove("input-success");

                txtSenha.classList.add("input-primary");
                txtSenha.classList.remove("input-error");
                txtSenha.classList.remove("input-success");



            }).catch((error) => {

                mostrarAlerta('Tempo expirado: entre novamente na conta','alert-warning');

                deslogarUsuario()

                // vCor = alert-success | alert-warning | alert-error


            });

        });








    }



};





btnSalvar.addEventListener('click',()=>{

    AlterarSenha();


});

btnExcluirConta.addEventListener('click',()=>{

    const user = auth.currentUser;

    deleteUser(user).then(() => {
   
        mostrarAlerta('Sua conta foi excluida com sucesso','alert-success');

        window.location.href="index.html";


    }).catch((error) => {
        
        mostrarAlerta(error.message,'alert-warning');


    });


});


//





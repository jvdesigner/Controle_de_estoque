// import

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged    } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";



// variáveis

const firebaseConfig = {
  apiKey: "AIzaSyCHIvLMMn7BxwZS8X3ruSIJ7aUnq7phTiw",
  authDomain: "controle-de-estoque-2.firebaseapp.com",
  projectId: "controle-de-estoque-2",
  storageBucket: "controle-de-estoque-2.appspot.com",
  messagingSenderId: "62421934587",
  appId: "1:62421934587:web:2107381b122bcce6b6ab5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const btnEntrar = document.getElementById('btnEntrar');

const objalert01 = document.getElementById('objalert01');
const txtobjalert01 = document.getElementById('txtobjalert01');

const objloading = document.getElementById('objloading');



let user=""; // Dados do usuario


// Funcoes

function showloading(){objloading.style.display="flex";};
function hideloading(){objloading.style.display="none";};


// Fazer login


btnEntrar.addEventListener('click',()=>{

    if(senhaRegex.test(txtSenha.value)&&emailRegex.test(txtEmail.value)){
  
          signInWithEmailAndPassword(auth, txtEmail.value, txtSenha.value)
          .then((userCredential) => {
            
            user = userCredential.user;

            user.providerData.forEach((profile) => {
                console.log("UID: " + user.uid);
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
              });

            
              

          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;


              switch (errorMessage) {

                case "Firebase: Error (auth/user-not-found).":

                    objalert01.classList.remove("input-error");
                    objalert01.classList.add("alert-warning");

                    objalert01.style.display="flex";
                    txtobjalert01.textContent="Usuário não encontrado";

                    setTimeout(function() {objalert01.style.display="none";}, 4000);

                    break;

                case "Firebase: Error (auth/wrong-password).":

                    objalert01.classList.remove("input-error");
                    objalert01.classList.add("alert-warning");

                    objalert01.style.display="flex";
                    txtobjalert01.textContent="Senha Incorreta";

                    setTimeout(function() {objalert01.style.display="none";}, 4000);

                    break;

                
                default:

                    objalert01.classList.remove("input-warning");
                    objalert01.classList.add("alert-error");

                    objalert01.style.display="flex";
                    txtobjalert01.textContent=errorCode + " - " + errorMessage;

                    setTimeout(function() {objalert01.style.display="none";}, 4000);
       
            }
  
          })
          
          
        
        }
  
  });


// Saber se o usuario esta logado

function usuarioLogado(){
   
    if (auth.currentUser) {
     
     return true

    } else {
     
     return false

    }
 
 };


 

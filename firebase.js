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

let user=""; // Dados do usuario


// Funcoes



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
                    alert('Usuário não encontrado');
                    break;
                case "Firebase: Error (auth/wrong-password).":
                    alert('Senha Incorreta');
                    break;
                // Outros casos
                default:
                    alert(errorCode + " - " + errorMessage);
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
 

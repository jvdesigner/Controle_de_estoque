
// import

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { 

  getAuth,
  onAuthStateChanged,

} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


// -----------------------------------------------------------------------------------------------------------



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

let auth =getAuth(app);

const formAlterarPerfil = document.getElementById('formAlterarPerfil');

const imgUserPerfil2 = document.getElementById('imgUser');

const imgUserPerfil = document.getElementById('imgUserPerfil');

const inputObjImgPerfil = document.getElementById('inputObjImgPerfil');

const txtEmail = document.getElementById('txt-Email');

const inputNamePerfil = document.getElementById('inputNamePerfil');

const btnsalvarPerfil = document.getElementById('btnsalvarPerfil');

let SignInProvider        = ""    ;
let ProviderSpecificUID   = ""           ;
let nameUser              =  ""  ;
let emailUser             = ""         ;
let PhotoURL              = ""      ;



function recuperarDadosUsuario(){

    onAuthStateChanged(auth, (user) => {

    if (user !== null) {

        user.providerData.forEach((profile) => {

            SignInProvider        = profile.providerId    ;
            ProviderSpecificUID   = profile.uid           ;
            nameUser              =  profile.displayName  ;
            emailUser             = profile.email         ;
            PhotoURL              = profile.photoURL      ;

            
        });

        if(imgUserPerfil&&PhotoURL){imgUserPerfil.src=PhotoURL}; 

        if(imgUserPerfil2&&PhotoURL){imgUserPerfil2.src=PhotoURL}; 



        if(txtEmail){txtEmail.value=emailUser}; 

        if(inputNamePerfil){inputNamePerfil.value=nameUser}; 
    
    }

    else

    {alert('Usuário nao encontrado para mostrar as informações')}

    });


};

recuperarDadosUsuario();

inputObjImgPerfil.addEventListener("change", function() {

    const file = inputObjImgPerfil.files[0];

    if (file) {
        // Cria um objeto URL para a imagem selecionada
        const url = URL.createObjectURL(file);

        // Define a URL como a origem da imagem no elemento <img>
        imgUserPerfil.src = url;

        // Libera o objeto URL após a exibição da imagem
        //URL.revokeObjectURL(url);
    } else {
        // Limpa o elemento <img> se nenhum arquivo for selecionado
        imgUserPerfil.src = "";
    }
});






// btneditarPerfil.addEventListener('click', ()=>{
//     formMostrarPerfil.style.display="none";
//     formAlterarPerfil.style.display="none";

//     formAlterarPerfil.style.display="flex";
// });



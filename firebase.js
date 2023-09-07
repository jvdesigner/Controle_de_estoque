// import

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { 

  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut ,
  createUserWithEmailAndPassword,
  GoogleAuthProvider ,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence   ,
  sendPasswordResetEmail ,
  getRedirectResult 

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

const btnEntrar = document.getElementById('btnEntrar');

const btnSairConta = document.getElementById('btnSairConta');

const btnCadastrar = document.getElementById('btnCadastrar');

const objalert01 = document.getElementById('objalert01');

const txtobjalert01 = document.getElementById('txtobjalert01');

const objloading = document.getElementById('objloading');

const btnRecuperarSenha = document.getElementById('btnRecuperarSenha');

const btnEntrarGoogle = document.getElementById('btnEntrarGoogle');

const provider = new GoogleAuthProvider();

const imgUser = document.getElementById("imgUser"); // imagem do usuario

const imgUserPerfil = document.getElementById("imgUserPerfil"); // imagem do usuario

let imgUsuario = "";

let SignInProvider        = ""    ;
let ProviderSpecificUID   = ""    ;
let nameUser              = ""    ;
let emailUser             = ""    ;
let PhotoURL              = ""    ;

// -----------------------------------------------------------------------------------------------------------


//  -- Funcoes --

if (window.location.href.includes("perfilUsuario.html")) {

  function mostrarPerfilUsuario(){

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
      
      }

      else

      {alert('Usuário nao encontrado para mostrar as informações')}

    });




  };

  mostrarPerfilUsuario()

};



// -----------------------------------------------------------------------------------------------------------


// Criar conta

if(btnCadastrar){

  btnCadastrar.addEventListener('click',()=>{

    if( senhaRegex.test( txtSenha.value ) && emailRegex.test( txtEmail.value ) ) {
      
      CriarLoginSenha() 

    }

  });


}





// -----------------------------------------------------------------------------------------------------------



function  CriarLoginSenha(){

  salvarLocalmenteCriarConta()
  
  .then((userCredential) => {
    
    let user = userCredential.user;

      user.providerData.forEach((profile) => {
        
      console.log("UID: " + user.uid);
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);

      imgUsuario=profile.photoURL;
      


    });

              objalert01.classList.remove("input-error");
              objalert01.classList.remove("alert-warning");
              objalert01.classList.add("alert-success");

              objalert01.style.display="flex";
              txtobjalert01.textContent="Usuário cadastrado com sucesso";

              setTimeout(function() {
                
                objalert01.style.display="none";
                
                window.location.href = "login.html";
              
              }, 4000);


              
              window.location.href = "home.html";

              if(imgUser&&imgUsuario){imgUser.src=imgUsuario}; 

    

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

        case "Firebase: Error (auth/email-already-in-use).":

            objalert01.classList.remove("input-error");
            objalert01.classList.add("alert-warning");

            objalert01.style.display="flex";
            txtobjalert01.textContent="Email já cadastrado";

            setTimeout(function() {objalert01.style.display="none";}, 4000);

            break;

        
        default:

          console.log("Erro Encontrado: " + errorCode + " - " + errorMessage);



      }

  });
  
  

}




// -----------------------------------------------------------------------------------------------------------



// Autenticar com o Google



if(btnEntrarGoogle){


  btnEntrarGoogle.addEventListener('click',()=>{

    signInWithPopup(auth, provider)

  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential.accessToken;

    const user = result.user;

    console.log('credencial: ' + credential);
    console.log('token: ' + token);

    console.log(JSON.stringify(user));

        user.providerData.forEach((profile) => {
        console.log("UID: " + user.uid);
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);

        imgUsuario=profile.photoURL;

        })

    window.location.href = "home.html";

    
   
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    


    console.log('Codigo: ' + errorCode);
    console.log('Mensagem: ' + errorMessage);

   
  });

  });


}







// -----------------------------------------------------------------------------------------------------------


// Redefinicao de senha

function redefinirSenha(){

  sendPasswordResetEmail(auth, txtEmail.value)
  .then(() => {
    
              objalert01.classList.remove("input-error");
              objalert01.classList.remove("alert-warning");
              objalert01.classList.add("alert-success");

              objalert01.style.display="flex";
              txtobjalert01.textContent="Verifique seu email para alterar a senha";

              setTimeout(function() {
                
                objalert01.style.display="none";
                
                window.location.href = "login.html";
              
              }, 4000);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;


    switch (errorMessage) {

      case "Firebase: Error (auth/user-not-found).":

          objalert01.classList.remove("alert-success");  
          objalert01.classList.remove("input-error");
          objalert01.classList.add("alert-warning");

          objalert01.style.display="flex";
          txtobjalert01.textContent="Usuário não encontrado";

          setTimeout(function() {objalert01.style.display="none";}, 4000);

          break;

      
      default:

          objalert01.classList.remove("alert-success");      
          objalert01.classList.remove("input-warning");
          objalert01.classList.add("alert-error");

          objalert01.style.display="flex";
          txtobjalert01.textContent=errorCode + " - " + errorMessage;

          console.log("Erro Encontrado: " + errorCode + " - " + errorMessage);

          setTimeout(function() {objalert01.style.display="none";}, 4000);

    }




  });


};


if(btnRecuperarSenha){

  btnRecuperarSenha.addEventListener('click',()=>{

    if( emailRegex.test( txtEmail.value ) ) {
      
      redefinirSenha() 

    }

  });


}



// -----------------------------------------------------------------------------------------------------------


// Funcao de controlar mensagem de carregando

function showloading(){objloading.style.display="flex";};
function hideloading(){objloading.style.display="none";};


// -----------------------------------------------------------------------------------------------------------


// Fazer login

if(btnEntrar){

  btnEntrar.addEventListener('click',()=>{

    if( senhaRegex.test( txtSenha.value ) && emailRegex.test( txtEmail.value ) ) {
      
      verificarLoginSenha() 

    }

  });


}





// -----------------------------------------------------------------------------------------------------------


  // Login Autenticando com firebase

  function  verificarLoginSenha(){

    salvarLocalmente()
    
    .then((userCredential) => {
      
      let user = userCredential.user;

        user.providerData.forEach((profile) => {
        console.log("UID: " + user.uid);
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);

        imgUsuario=profile.photoURL;

      });

      //alert('Usuário logado com sucesso!');

      

      window.location.href = "home.html";

      

      

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

            console.log("Erro Encontrado: " + errorCode + " - " + errorMessage);


 
        }

    });
    
    
  
  }

  
// -----------------------------------------------------------------------------------------------------------


// antes de realizar o login, salvar localmente

function salvarLocalmente(){

  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      
      return signInWithEmailAndPassword(auth, txtEmail.value, txtSenha.value);

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

          console.log("Falha ao salvar localmente: " + errorCode + " - " + errorMessage);



      }

  });

}


// -----------------------------------------------------------------------------------------------------------


// antes de criar conta, salvar localmente

function salvarLocalmenteCriarConta(){

  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      
      return createUserWithEmailAndPassword(auth, txtEmail.value, txtSenha.value);

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

        case "Firebase: Error (auth/email-already-in-use).":

            objalert01.classList.remove("input-error");
            objalert01.classList.add("alert-warning");

            objalert01.style.display="flex";
            txtobjalert01.textContent="Email já cadastrado";

            setTimeout(function() {objalert01.style.display="none";}, 4000);

            break;

        
        default:

          console.log("Falha ao salvar localmente: " + errorCode + " - " + errorMessage);



      }

  });

}


// -----------------------------------------------------------------------------------------------------------



// Deslogar usuario

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


if(btnSairConta){

  btnSairConta.addEventListener('click',()=>{

    deslogarUsuario()

  });


}



// -----------------------------------------------------------------------------------------------------------


// Verificar se o usuario esta logado


function verificarDadosUsuarioLogado(){

  onAuthStateChanged(auth, (user) => {

    

      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);

          imgUsuario=profile.photoURL;
          
        });
        if(imgUser&&imgUsuario){imgUser.src=imgUsuario}; 

        if (window.location.pathname.includes("login.html")) {
          window.location.href = "home.html";
      }
        
        
        return true
      }

      else

      {return false}//alert('usuario deslogado')}

    })


}





// -----------------------------------------------------------------------------------------------------------

// chamando funcoes

//deslogarUsuario();

verificarDadosUsuarioLogado()














 

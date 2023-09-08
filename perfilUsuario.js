

// import



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { 

  getAuth,
  onAuthStateChanged,
  updateProfile ,
  updateEmail ,
  signOut
  

} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

import { getStorage, ref,uploadBytes ,getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";



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

const storage = getStorage();

const formAlterarPerfil = document.getElementById('formAlterarPerfil');


const imgUserPerfil2 = document.getElementById('imgUser');

const imgUserPerfil = document.getElementById('imgUserPerfil');

const inputObjImgPerfil = document.getElementById('inputObjImgPerfil');


const txtEmail = document.getElementById('txt-Email');




const btnsalvarPerfil = document.getElementById('btnsalvarPerfil');


const objalert02 = document.getElementById('objalert02');

const svgAlert = document.getElementById('svgAlert');

const svgOk = document.getElementById('svgOk');

const txtobjalert02 = document.getElementById('txtobjalert02');


const inputNamePerfil = document.getElementById('inputNamePerfil');

const obrigatorioNome = document.getElementById('obrigatorioNome');




let SignInProvider        = ""  ;
let ProviderSpecificUID   = ""  ;
let nameUser              = ""  ;
let emailUser             = ""  ;
let PhotoURL              = ""  ;


// -----------------------------------------------------------------------------------------------------------


// Consultar dados do usuario



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

    // else

    // {alert('Usuário nao encontrado para mostrar as informações')}

    });


};



// -----------------------------------------------------------------------------------------------------------


// Apresentar imagem



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



// -----------------------------------------------------------------------------------------------------------


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

//mostrarAlerta("Preencha todos os campos","alert-warning");



// -----------------------------------------------------------------------------------------------------------


// Verificar Campos obrigatorios


// Campo nome

function verificarCampoObrigatorio(vCampo,vtxtMsg){

    let resultado = true;

    if(vCampo){

        if(vCampo.value==''){

            vCampo.classList.remove("input-primary");
            vCampo.classList.remove("input-success");

            vCampo.classList.add("input-error");

            vtxtMsg.classList.remove("text-success");
            vtxtMsg.classList.add("text-error");

            vtxtMsg.textContent = "Campo Obrigatorio";
            vtxtMsg.style.display="flex";

            resultado = false;

        }

        else
        {
            vCampo.classList.remove("input-primary");
            vCampo.classList.remove("input-error");

            vCampo.classList.add("input-success");
            vtxtMsg.style.display="none";
            resultado = true;
        }

        

    }

    return resultado;
    
};


if(inputNamePerfil){

    inputNamePerfil.addEventListener("keyup", ()=> {


        verificarCampoObrigatorio(inputNamePerfil,obrigatorioNome)

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



// -----------------------------------------------------------------------------------------------------------




//btnsalvarPerfil Salvar Perfil


btnsalvarPerfil.addEventListener("click", async ()=> {


if( inputNamePerfil.value !=='' && txtEmail.value !=='' ){

    let imgUsuariosave = ""; // v imagem do usuario

    const file = inputObjImgPerfil.files[0]; //  imagem do usuario

    if (file) { 

        const storageRef = ref(storage, file.name);

        uploadBytes(storageRef, file)

        await getDownloadURL(storageRef).then((url) => {imgUsuariosave=url})


     } else { imgUsuariosave = PhotoURL };

    // Salvar imagem e nome email

    updateEmail(auth.currentUser, txtEmail.value).then(() => {

        //mostrarAlerta('Email atualizado com sucesso','alert-success');

    }).catch((error) => {

    
        mostrarAlerta('Tempo expirado: Faça login novamente','alert-error');

        deslogarUsuario();



    });

    updateProfile(auth.currentUser, {

         displayName: inputNamePerfil.value , photoURL: imgUsuariosave

       }).then(() => {

         mostrarAlerta('Dados atualizados com sucesso','alert-success');

         setTimeout(function() {
             window.location.href = "perfilUsuario.html";
         }, 2000);
        
        


       }).catch((error) => {


         mostrarAlerta('Erro ao tentar salvar o nome e foto','alert-error');


     });

    


};


});



// -----------------------------------------------------------------------------------------------------------


// Ao carregar a pagina 


recuperarDadosUsuario();


//

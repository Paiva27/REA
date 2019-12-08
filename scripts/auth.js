// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
      var x = document.getElementsByClassName("btn-small blue-grey z-depth-0");
    for(var i = 0; i < x.length;i++){
      x[i].style = "display:block;"
    }
    });
    
    document.getElementById('usuario-logado').value = "sim";
    document.getElementById('botaoProcura').disabled = false;
    db.collection('users').onSnapshot(snapshot => {
      setupUsers(snapshot.docs);
    }, err => console.log(err.message));
  } else {
   setupUI();
   setupUsers([]);
  }
});




// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      nome: signupForm['signup-name'].value,
      maiorPontuacaoFacil: 0,
      ultimaPontuacaoFacil: 0,
      maiorPontuacaoMedio: 0,
      ultimaPontuacaoMedio: 0,
      maiorPontuacaoDificil: 0,
      ultimaPontuacaoDificil: 0,
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  document.getElementById('usuario-logado').value = "nao";
  document.getElementById('botaoProcura').disabled = true;
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});

const cidadeSelec = document.querySelector('#nivel-form');
cidadeSelec.addEventListener('submit', (e) => {
  e.preventDefault();
  const nivel = cidadeSelec['nivel-select'].value;
  document.getElementById("nivel").value = nivel;
  op1 = document.getElementById("op1").checked;
  op2 = document.getElementById("op2").checked;
  op3 = document.getElementById("op3").checked;
  op4 = document.getElementById("op4").checked;
  document.getElementById("soma").value = op1;
  document.getElementById("sub").value = op2;
  document.getElementById("mult").value = op3;
  document.getElementById("divisao").value = op4;
  console.log(nivel,op1,op2,op3,op4);
  document.getElementById("nivel").value = nivel;
  db.collection('users').onSnapshot(snapshot => {
    setupRanking(snapshot.docs);
  });
  document.getElementById("div-inicio").style = "display:none;";
  document.getElementById("div-display").style = "display:block";
  
});




const pesquisaSelect = document.querySelector('#select-procura');
pesquisaSelect.addEventListener('submit', (e) => {
  e.preventDefault();
  const pesquisa = pesquisaSelect['signup-profissa'].value;
  cidade = document.getElementById("cidade-atual").value;
  console.log(pesquisa);
  console.log(cidade);
  db.collection('users').onSnapshot(snapshot => {
    setupUsersByArea(snapshot.docs,cidade,pesquisa);
  });
});

function updateUser(maiorPontuacao,ultimaPontuacao,nivel){ 
  var user = firebase.auth().currentUser;
  db.collection('users').doc(user.uid).get().then(doc => {
      if(nivel == 1){
        db.collection('users').doc(user.uid).update({
          ultimaPontuacaoFacil: ultimaPontuacao,
        });
      var maiorPt = doc.data().maiorPontuacaoFacil;
      var nome = doc.data().nome;
      console.log(maiorPt,maiorPontuacao);
      if(maiorPt < maiorPontuacao){
        console.log("Pass");
        db.collection('users').doc(user.uid).update({
          maiorPontuacaoFacil: maiorPontuacao,
        });
        setupUI(user);
      }
    }else if(nivel == 2){
      db.collection('users').doc(user.uid).update({
        ultimaPontuacaoMedio: ultimaPontuacao,
      });
      var maiorPt = doc.data().maiorPontuacaoMedio;
      var nome = doc.data().nome;
      console.log(maiorPt,maiorPontuacao);
      if(maiorPt < maiorPontuacao){
        console.log("Pass");
        db.collection('users').doc(user.uid).update({
          maiorPontuacaoMedio: maiorPontuacao,
        });
        setupUI(user);
      }
      }else if(nivel == 3){
        db.collection('users').doc(user.uid).update({
          ultimaPontuacaoDificil: ultimaPontuacao,
        });
        var maiorPt = doc.data().maiorPontuacaoDificil;
      var nome = doc.data().nome;
      console.log(maiorPt,maiorPontuacao);
      if(maiorPt < maiorPontuacao){
        console.log("Pass");
        db.collection('users').doc(user.uid).update({
          maiorPontuacaoDificil: maiorPontuacao,
        });
        setupUI(user);
      }
    }
      db.collection('ranking').doc(nome).set({
        nome: nome,
        pontuacao: ultimaPontuacao
      });
  });
  setupUI(user);
  }



/*const updateUserSelect = document.querySelector('#update-user');
updateUserSelect.addEventListener('submit', (e) => {
  e.preventDefault();
 
  console.log(cred.user.uid);
  })*/




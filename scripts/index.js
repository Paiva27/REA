// DOM elements

const guideList = document.querySelector('.guides');
const usersList = document.querySelector('.users');
const usersListByCity = document.querySelector('.usersbc');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const pontuacaoDivFacil = document.querySelector('.pontuacaoFacil');
const pontuacaoDivMedio = document.querySelector('.pontuacaoMedio');
const pontuacaoDivDificil = document.querySelector('.pontuacaoDificil');
const adminItems = document.querySelectorAll('.admin');

var pontuacao;
var res;
var maiorPontuacaoGlobal;
const vetorPorcentagens = ["75%","67%","60%","52%","45%","37%","30%","22%","15%","10%"];
var iterador;
const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div><h5>Nome : ${doc.data().nome}</h5></div>
        <div><h5>Email : ${user.email}</h5></div><br>
        <div class ="row">
        <div class ="col s4">
        <div align="center"><h6>Facil :</h6></div>
     <div align="center"><h6>Maior Pontuação: ${doc.data().maiorPontuacaoFacil}</h6></div>
     <div align="center"><h7>Última Pontuação: ${doc.data().ultimaPontuacaoFacil}</h7></div><br>
     </div>
     <div class ="col s4">
     <div align="center"><h6>Medio :</h6></div>
     <div align="center"><h6>Maior Pontuação: ${doc.data().maiorPontuacaoMedio}</h6></div>
     <div align="center"><h7>Última Pontuação: ${doc.data().ultimaPontuacaoMedio}</h7></div><br>
     </div>
     <div class ="col s4">
     <div align="center"><h6>Dificil :</h6></div>
     <div align="center"><h6>Maior Pontuação: ${doc.data().maiorPontuacaoDificil}</h6></div>
     <div align="center"><h7>Última Pontuação: ${doc.data().ultimaPontuacaoDificil}</h7></div><br>
     </div>
      </div>
      `;
      accountDetails.innerHTML = html;
    });
    db.collection('users').onSnapshot(snapshot => {
      setupRanking(snapshot.docs);
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

    
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};


// setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.nome} </div>
          <div class="collapsible-body white"> ${guide.bio} </div>
        </li>
      `;
      html += li;
    });
    
    guideList.innerHTML = html
  }
  
};



function populateRespostas(operador,document){
  var min = 0;
  var max = 10
if(operador == "/"){
  num1 = Math.floor(Math.random() * (+max - +min)) + +min;
  num2 = Math.floor(Math.random() * (+max - +min)) + +min;    
  while((num1 % num2 != 0) || (num2 == 0)){
    console.log(num1,num2);
    num2 = Math.floor(Math.random() * (+max - +min)) + +min;
  } 
}else{

  num1 = Math.floor(Math.random() * (+max - +min)) + +min;
  num2 = Math.floor(Math.random() * (+max - +min)) + +min;  
}

span = document.getElementById("equacao");
span.innerHTML =`<div class="row">
<div class="col s1">
    <h2></h2>
  </div>
  <div class="col s2">
      <h2></h2>
    </div>
<div class="col s2">
<div class="card-panel teal">
  <span class="white-text"><h5>${num1}</h5>
  </span>
</div>
</div>
<div class="col s2">
  <h2>${operador}</h2>
</div>
<div class="col s2">
  <div class="card-panel teal">
    <span class="white-text"><h5>${num2}</h5>
    </span>
  </div>
</div>
<div class="col s2">
    <h2></h2>
  </div>
</div>`;
if(operador == "+")result = num1 + num2;
if(operador == "-")result = num1 - num2;
if(operador == "x")result = num1 * num2;
if(operador == "/")result = num1 / num2;
var minOp = 1;
var maxOp = 5;
localResult = Math.floor(Math.random() * (+maxOp - +minOp)) + +minOp;


document.getElementById("res").value = result;
res = result;
var btn1,btn2,btn3,btn4;
var respostas = [];
if(localResult == 1){
  btn1 = (result).toString();
  respostas.push(btn1);
  
  btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  while(respostas.includes(btn2)== true){
    //btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
    btn2 -= 1;
  }
  respostas.push(btn2);
  
  btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  while(respostas.includes(btn3)== true){
   // btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
   btn3 -= 1;
  }
  respostas.push(btn3);
  
  btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  while(respostas.includes(btn4)== true){
   // btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  btn4 -= 1;
}
respostas.push(btn4);


document.getElementById('op1-btn').innerHTML = btn1
document.getElementById('op2-btn').innerHTML = btn2
document.getElementById('op3-btn').innerHTML = btn3
document.getElementById('op4-btn').innerHTML = btn4

}else if(localResult == 2){

  btn1 = (result).toString();
  respostas.push(btn1);
  
  btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  while(respostas.includes(btn2)== true){
    //btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
    btn2 -= 1;
  }
  respostas.push(btn2);
  
  btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  while(respostas.includes(btn3)== true){
   // btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
   btn3 -= 1;
  }
  respostas.push(btn3);
  
  btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  while(respostas.includes(btn4)== true){
   // btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  btn4 -= 1;
}
respostas.push(btn4);


document.getElementById('op1-btn').innerHTML = btn2
document.getElementById('op2-btn').innerHTML = btn1
document.getElementById('op3-btn').innerHTML = btn3
document.getElementById('op4-btn').innerHTML = btn4

}else if(localResult == 3){

  btn1 = (result).toString();
respostas.push(btn1);

btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
while(respostas.includes(btn2)== true){
  //btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  btn2 -= 1;
}
respostas.push(btn2);

btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
while(respostas.includes(btn3)== true){
 // btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
 btn3 -= 1;
}
respostas.push(btn3);

btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
while(respostas.includes(btn4)== true){
 // btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
btn4 -= 1;
}
respostas.push(btn4);

document.getElementById('op1-btn').innerHTML = btn3
document.getElementById('op2-btn').innerHTML = btn2
document.getElementById('op3-btn').innerHTML = btn1
document.getElementById('op4-btn').innerHTML = btn4

}else if(localResult == 4){

  btn1 = (result).toString();
respostas.push(btn1);

btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
while(respostas.includes(btn2)== true){
  //btn2 = (op1 - (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
  btn2 -= 1;
}
respostas.push(btn2);

btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
while(respostas.includes(btn3)== true){
 // btn3 = (op1 * (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
 btn3 -= 1;
}
respostas.push(btn3);

btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
while(respostas.includes(btn4)== true){
 // btn4 = (op1 + (Math.floor(Math.random() * (+max - +min)) + +min)).toString();
btn4 -= 1;
}
respostas.push(btn4);


document.getElementById('op1-btn').innerHTML = btn4
document.getElementById('op2-btn').innerHTML = btn2
document.getElementById('op3-btn').innerHTML = btn3
document.getElementById('op4-btn').innerHTML = btn1
}
}



function populateGame(){

nivel = document.getElementById("nivel").value;
soma = document.getElementById("soma").value;
sub = document.getElementById("sub").value;
mult = document.getElementById("mult").value;
divisao = document.getElementById("divisao").value;

var minOp = 1;
var maxOp = 5;
var operador = "0";

opAritmetico = Math.floor(Math.random() * (+maxOp - +minOp)) + +minOp; 

while(operador === "0"){
  if(opAritmetico == 1){ 
    if(soma == true)operador ="+";
    else opAritmetico = Math.floor(Math.random() * (+maxOp - +minOp)) + +minOp;
  }else if(opAritmetico == 2){
   if(sub == true)operador ="-";
   else opAritmetico = Math.floor(Math.random() * (+maxOp - +minOp)) + +minOp;
  }else if(opAritmetico == 3){
   if(mult == true)operador ="x";
   else opAritmetico = Math.floor(Math.random() * (+maxOp - +minOp)) + +minOp;
  }else if(opAritmetico == 4){
   if(divisao == true)operador ="/";
   else opAritmetico = Math.floor(Math.random() * (+maxOp - +minOp)) + +minOp;
  }
}

if(nivel == 1){
 populateRespostas(operador,document);

}else if(nivel ==2 ){ 

 populateRespostas(operador,document);

}else if(nivel == 3 ){

  populateRespostas(operador,document);

}else if(nivel == 4){
  populateRespostas(operador,document);
}



}
$("#op1-btn").click( function(){
 
  if(document.getElementById('op1-btn').innerText === (document.getElementById('res').value).toString() ){
    pontuacao++;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao;
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }else{
    pontuacao--;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao;
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }
  populateGame();
});

$("#op2-btn").click( function(){
  if(document.getElementById('op2-btn').innerText === (document.getElementById('res').value).toString() ){
    pontuacao++;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao; 
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }else{
    pontuacao--;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao;
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }
  populateGame();
});

$("#op3-btn").click( function(){
  if(document.getElementById('op3-btn').innerText === (document.getElementById('res').value).toString() ){
    pontuacao++;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao; 
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }else{
    pontuacao--;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao;
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }
  populateGame();
});

$("#op4-btn").click( function(){
  if(document.getElementById('op4-btn').innerText === (document.getElementById('res').value).toString() ){
    pontuacao++;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao; 
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }else{
    pontuacao--;
    span = document.getElementById("labelCard");
    span.innerHTML ="Pontuação : "+pontuacao;
    var index = Math.floor(pontuacao /iterador);
    if(index < 10){
      document.getElementById("rocket").style.top =vetorPorcentagens[index];
      console.log(vetorPorcentagens[index]);
      }
  }
  populateGame();
});


$("#startClock").click( function(){
  span = document.getElementById("labelCard");
  span.innerHTML ="Pontuação : 0";
  document.getElementById("botoesRespostas").style = "display:block";
  document.getElementById("startClock").style = "display:none";
  pontuacao = 0;
  populateGame();
  nivel = document.getElementById("nivel").value;
  var counter = 90;
  var minuts;
  var seconds;
  setInterval(function() {
    counter--;
    minuts = Math.floor((counter %(60 * 60)) / 60);
    seconds = Math.floor((counter % 60));
     if (counter >= 0) {
        span = document.getElementById("count");
        span.innerHTML ="Tempo: "+ minuts +":"+ seconds;
     }
     if (counter === 0) {
       if(document.getElementById("nivel").value == 4){
        alert('Pontuação : ' + pontuacao + '  ,porém não será contabilizada no ranking pois está no modo teste');
        clearInterval(counter);
        span = document.getElementById("labelCard");
        span.innerHTML ="Resolva no menor tempo possível";
        document.getElementById("botoesRespostas").style = "display:none";
        document.getElementById("startClock").style = "display:inline-block";
        document.getElementById("startClock").classList = "btn waves-effect waves-light center-align";
        document.getElementById("rocket").style.top = "75%";
       }else{
        alert('Pontuação : ' + pontuacao);
        clearInterval(counter);
        span = document.getElementById("labelCard");
        span.innerHTML ="Resolva no menor tempo possível";
        document.getElementById("botoesRespostas").style = "display:none";
        document.getElementById("startClock").style = "display:inline-block";
        document.getElementById("startClock").classList = "btn waves-effect waves-light center-align";
        updateUser(pontuacao,pontuacao,document.getElementById("nivel").value);
        document.getElementById("rocket").style.top = "75%";
      }
    }
    }, 1000);
});

const setupRanking = (data) => {
  if (data.length) {
    let html = `<h4>Fácil :</h4>`;
    var usuarios = [];
    var rankingUsuarios = [];
    var i = 0;

    data.forEach(doc => {
      const user = doc.data();
          if(user.maiorPontuacaoFacil >= 0){
          usuarios[i] = user.nome;
          usuarios[i+1] = user.maiorPontuacaoFacil;
          i += 2 ;
        }
    });
    var j = 0 ;
    var maiorPontuação = -1;
    var indexMaiorPontuação = 0;
    var nomesJaForam = [];
    var aux = -1;
    var numElementos = 4;
    while(numElementos >= 0){
      maiorPontuação = -1;
      j = 0;
      while (j < i){
          if((usuarios[j+1] > maiorPontuação)&&(!nomesJaForam.includes(usuarios[j]))){
            maiorPontuação = usuarios[j+1];
            aux = j;
          }
        j +=2 ;
      }
    rankingUsuarios[indexMaiorPontuação] =usuarios[aux];
    rankingUsuarios[indexMaiorPontuação+1] =usuarios[aux+1];
    nomesJaForam[numElementos] = usuarios[aux];
    html += `<p class="flow-text"> ${rankingUsuarios[indexMaiorPontuação]} : ${rankingUsuarios[indexMaiorPontuação+1]} </p>`;
    indexMaiorPontuação += 2;
    numElementos--;
    }
   pontuacaoDivFacil.innerHTML = html;
    if(document.getElementById("nivel").value ==1 ){
    console.log(rankingUsuarios[1]);
   maiorPontuacaoGlobal = rankingUsuarios[1];
   iterador = maiorPontuacaoGlobal / 10;
  }

  } 

  if (data.length) {
    let html = `<h4>Médio :</h4>`;
    var usuarios = [];
    var rankingUsuarios = [];
    var i = 0;

    data.forEach(doc => {
      const user = doc.data();
          if(user.maiorPontuacaoMedio >= 0){
          usuarios[i] = user.nome;
          usuarios[i+1] = user.maiorPontuacaoMedio;
          i += 2 ;
        }
    });
    var j = 0 ;
    var maiorPontuação = -1;
    var indexMaiorPontuação = 0;
    var nomesJaForam = [];
    var aux = -1;
    var numElementos = 4;
    while(numElementos >= 0){
      maiorPontuação = -1;
      j = 0;
      while (j < i){
          if((usuarios[j+1] > maiorPontuação)&&(!nomesJaForam.includes(usuarios[j]))){
            maiorPontuação = usuarios[j+1];
            aux = j;
          }
        j +=2 ;
      }
    rankingUsuarios[indexMaiorPontuação] =usuarios[aux];
    rankingUsuarios[indexMaiorPontuação+1] =usuarios[aux+1];
    nomesJaForam[numElementos] = usuarios[aux];
    html += `<p class="flow-text"> ${rankingUsuarios[indexMaiorPontuação]} : ${rankingUsuarios[indexMaiorPontuação+1]} </p>`;
    indexMaiorPontuação += 2;
    numElementos--;
    }
   pontuacaoDivMedio.innerHTML = html;
   if(document.getElementById("nivel").value == 2){
    maiorPontuacaoGlobal = rankingUsuarios[1];
    iterador = maiorPontuacaoGlobal / 10;
   }
  } 

  if (data.length) {
    let html = `<h4>Difícil :</h4>`;
    var usuarios = [];
    var rankingUsuarios = [];
    var i = 0;

    data.forEach(doc => {
      const user = doc.data();
          if(user.maiorPontuacaoDificil >= 0){
          usuarios[i] = user.nome;
          usuarios[i+1] = user.maiorPontuacaoDificil;
          i += 2 ;
        }
    });
    var j = 0 ;
    var maiorPontuação = -1;
    var indexMaiorPontuação = 0;
    var nomesJaForam = [];
    var aux = -1;
    var numElementos = 4;
    while(numElementos >= 0){
      maiorPontuação = -1;
      j = 0;
      while (j < i){
          if((usuarios[j+1] > maiorPontuação)&&(!nomesJaForam.includes(usuarios[j]))){
            maiorPontuação = usuarios[j+1];
            aux = j;
          }
        j +=2 ;
      }
    rankingUsuarios[indexMaiorPontuação] =usuarios[aux];
    rankingUsuarios[indexMaiorPontuação+1] =usuarios[aux+1];
    nomesJaForam[numElementos] = usuarios[aux];
    html += `<p class="flow-text"> ${rankingUsuarios[indexMaiorPontuação]} : ${rankingUsuarios[indexMaiorPontuação+1]} </p>`;
    indexMaiorPontuação += 2;
    numElementos--;
    }
   pontuacaoDivDificil.innerHTML = html;
   if(document.getElementById("nivel").value == 3){
    maiorPontuacaoGlobal = rankingUsuarios[1];
    iterador = maiorPontuacaoGlobal / 10;
   }
  } 

}



function checarLogado(){
  var user = firebase.auth().currentUser;
  console.log(user);
  var x = document.getElementsByClassName("btn-small blue-grey z-depth-0");
  if(user === null){
   
    for(var i = 0; i < x.length;i++){
      x[i].style = "display:none"
    }
  }else{
  }
}


var escolha_op = document.getElementById("escolha-op");
var nvSum = document.getElementById("op1");
var nvSub = document.getElementById("op2");
var nvMul = document.getElementById("op3");
var nvDiv = document.getElementById("op4");
var comeco = document.getElementById("comeco");
var comeco_barra = document.getElementById("comeco_barra");
document.getElementById("nivel-select").onchange = function(){
if(this.selectedIndex == 1){
  nvSub.checked = 1;
  nvSum.checked = 1;
  nvMul.checked = 0;
  nvDiv.checked = 0;
  nvSub.disabled = true;
  nvSum.disabled = true;
  nvMul.disabled = true;
  nvDiv.disabled = true;
  escolha_op.innerHTML="Operadores:";
  comeco.className="card green lighten-1 z-depth-5";
  comeco_barra.className="card green lighten-1 z-depth-5";
}else if(this.selectedIndex == 2){
  nvSub.checked = 1;
  nvSum.checked = 1;
  nvMul.checked = 1;
  nvDiv.checked = 0;
  nvSub.disabled = true;
  nvSum.disabled = true;
  nvMul.disabled = true;
  nvDiv.disabled = true;
  escolha_op.innerHTML="Operadores:";
  comeco.className="card yellow darken-3 z-depth-5";
  comeco_barra.className="card yellow darken-3 z-depth-5";
}else if(this.selectedIndex == 3){
  nvSub.checked = 1;
  nvSum.checked = 1;
  nvMul.checked = 1;
  nvDiv.checked = 1;
  nvSub.disabled = true;
  nvSum.disabled = true;
  nvMul.disabled = true;
  nvDiv.disabled = true; 
  escolha_op.innerHTML="Operadores:";
  comeco.className="card red lighten-1 z-depth-5";
  comeco_barra.className="card red lighten-1 z-depth-5";
  }else if(this.selectedIndex == 4){
  nvSub.checked = 1;
  nvSum.checked = 1;
  nvMul.checked = 1;
  nvDiv.checked = 1;
  nvSub.disabled = false;
  nvSum.disabled = false;
  nvMul.disabled = false;
  nvDiv.disabled = false;
  escolha_op.innerHTML="Escolha os operadores:";
  comeco.className="card cyan lighten-1 z-depth-5";
  comeco_barra.className="card cyan lighten-1 z-depth-5";
  }
}



function home(){
  document.getElementById("div-inicio").style = "display:block;";
  document.getElementById("div-display").style = "display:none";
  document.getElementById("nivel").value = "";
 
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

  var elems = document.querySelectorAll('.select');
  M.FormSelect.init(elems);

  M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: true });

});

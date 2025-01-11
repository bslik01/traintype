const id1=document.getElementById("idaccueil");
const id2=document.getElementById("idexercer");
const id3=document.getElementById("iddefis");
const id4=document.getElementById("idclassement");
const id5=document.getElementById("idhistorique");
const id6=document.getElementById("idaide");
const global=document.getElementById("idglobe");
//Interface section accueil
id1.addEventListener("click", function(){

//   const tittle=document.createElement("h1");
//   const tittle_text=document.createTextNode("BIENVENUE DANS L'ACCUEIL");
//   tittle.appendChild(tittle_text);
//   global.appendChild(tittle);
global.textContent = "BIENVENUE DANS L'ACCUEIL";
global.className +=' '+'mef';
});
id2.addEventListener("click", function(){ 
    global.textContent = "BIENVENUE DANS S'EXERCER"; 
    global.className +=' '+'mef';
});

id3.addEventListener("click", function(){ 
    global.textContent = "BIENVENUE DANS DEFIS"; 
    global.className +=' '+'mef';
});
id4.addEventListener("click", function(){ 
    global.textContent = "BIENVENUE DANS CLASSEMENT"; 
    global.className +=' '+'mef';
});
id5.addEventListener("click", function(){ 
    global.textContent = "BIENVENUE DANS HISTORIQUE"; 
    global.className +=' '+'mef';
 });
 id6.addEventListener("click", function(){ 
    global.textContent = "BIENVENUE DANS AIDE"; 
    global.className +=' '+'mef';
 });

   
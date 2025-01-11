//declaration des variables contenant l'id de chaque boutton sur le menu
const id1=document.getElementById("idaccueil");
const id2=document.getElementById("idexercer");
const id3=document.getElementById("iddefis");
const id4=document.getElementById("idclassement");
const id5=document.getElementById("idhistorique");
const id6=document.getElementById("idaide");
const id7=document.getElementById("exopred");
const global=document.getElementById("idglobe");
const exo=document.getElementById("idexercice");

//Interface section accueil
id1.addEventListener("click", function(){

//   const tittle=document.createElement("h1");
//   const tittle_text=document.createTextNode("BIENVENUE DANS L'ACCUEIL");
//   tittle.appendChild(tittle_text);
//   global.appendChild(tittle);
global.innerHTML = `<h1>BIENVENUE DANS L'ACCUEIL</h1>
<header>
    <h1 class="t">Train Type</h1> 
    </header>
    <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../images/image3.jpg" class="d-block w-100" alt="..."
            height="400px;
            width=500px;>
          </div>
          <div class="carousel-item">
            <img src="../images/image1.jpg" class="d-block w-100" alt="..."
            height=400px
            width=500px >
          </div>
        </div>
      </div>`;
global.className +=' '+'mef';
});
//interface section s'exercer
id2.addEventListener("click", function(){ 
    global.className +=' '+'mef';
    global.innerHTML=`<h1>BIENVENUE DANS S'EXERCER</h1>
    <div class="exo">
        <div class="image-exo">
            <img src="../images/illustration1.jpg" alt="exercice predefini">
        </div>
        <div class="bloc-exo">
            <h3 class="titre-exo">Exercice Predefini</h3>
            <p class="description-exo">Entrainez vous avec des exercices selectionnés avec soin pour vous.</p>
        </div>
    </div>
       
    <div class="exo">
        <div class="image-exo">
            <img src="../images/illustration2.jpg" alt="exercice personnalise">
        </div>
        <div class="bloc-exo">
            <h3 class="titre-exo">Exercice Personnalisé</h3>
            <p class="description-exo">Choisissez vos propres textes pour vous entrainer.</p>
                
        </div>
       
    </div>
  </div>`;
});
//Interface section defis
id3.addEventListener("click", function(){ 
    global.innerHTML= `<h1>BIENVENUE DANS DEFIS</h1>`; 
    global.className +=' '+'mef';
});
//Interface section classement
id4.addEventListener("click", function(){ 
    global.innerHTML =`<h1>BIENVENUE DANS CLASSEMENT</h1>`; 
    global.className +=' '+'mef';
});
//Interface section historique
id5.addEventListener("click", function(){ 
    global.innerHTML =`<h1>BIENVENUE DANS HISTORIQUE</h1>`; 
    global.className +=' '+'mef';
 });
 //Interface section aide
 id6.addEventListener("click", function(){ 
    global.innerHTML =`<h1 class="mef">BIENVENUE DANS AIDE</h1>
    <div class="aide">
    <h2 class="conseil">CONSEIL</h2>
    <br>
    <P>Pour ameliorer votre vitesse de saisie vous pouvez:</P>
    <ul>
      <ol>1-Pour ciommencer, il est esssentiel de maintenir une bonne posture devant l'ecran, <br>
          en gardant le dos droit et les bras à la bonne hauteur;</ol>
      <ol>2-Adoptez une position correcte de la main et les doigts entre chaque frappe;</ol>
      <ol>3-Utiliser vos mains pour accelerer la saisie;</ol>
      <ol>4-Maitriser toutes les touches du clavier; </ol>
      <ol>5-Eviter de trop regarder le clavier;</ol>
    </ul>
  </div>`; 
    //global.className +=' '+'';
 });
 id7.addEventListener("click", function(){ 
    global.textContent = "EXERCICE PREDEFINIS"; 
    global.className +=' '+'mefe';
 });

   
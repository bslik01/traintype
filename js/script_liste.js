
//fonction qui permet de charger le fichier
const liste=document.getElementById('listeExercices');


function loadfromFile(){
    $(document).ready(function(){
        $.ajax({
            url:"../data/exercice.json",
            method:"GET",
            dataType:"json",
        })

        .done(function(res){
            res.forEach(niv =>{
                const text=niv.exo;
                const niveauText=niv.niveau;
                text.forEach(elt =>{
                    const divliste=document.createElement('div');
                    const listecontent=document.createElement('div');
                    const title=document.createElement('h5');
                    const niveau=document.createElement('span');
                    title.textContent=elt.titre;
                    listecontent.textContent=elt.texte;
                    niveau.textContent=niveauText;
                    niveau.className="badge bg-secondary";
                    listecontent.className="mb-1";
                    divliste.appendChild(title);
                    divliste.appendChild(listecontent);
                    divliste.appendChild(niveau);
                    divliste.className="rounded border p-4 mb-3";
                    liste.appendChild(divliste);
                    
                });
            });
            
        });
    })
}

loadfromFile();
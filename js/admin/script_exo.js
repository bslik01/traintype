
//fonction qui slectionne alétoirement l'index du texte

function randomText(data){ 
    const exoList = data[0].exo;/*exemple pour le niveau debutant doit varier en fonction niveau*/
    const randomIndex = Math.floor(Math.random() * exoList.length);
    return randomIndex;
}


function exoText(index,data){

    const exoT=data[0].exo;//qui va varier en fonction du niveau
    let selectext=exoT[index].texte;
    let time=exoT[index].temps;

    const startbtn=document.createElement('button');
    const divtxt=document.createElement('div');
    const txt=document.createElement('div');
    const typezone=document.createElement('textarea');
    const lignes=selectext.split(".");

    startbtn.textContent="Start";
    document.body.appendChild(startbtn);

    startbtn.addEventListener('click',()=>{
    
        typezone.style.height="40vh";
        typezone.style.width="80vh";
        typezone.style.border="solid 1px";
        typezone.style.borderRadius="20px";
        
    
        divtxt.style.width="80vh";
        divtxt.style.height="30vh";
        
        txt.appendChild(typezone);
        document.body.appendChild(divtxt);
        document.body.appendChild(txt);
    
        typezone.addEventListener('input', ()=>{
            const type=typezone.value;
            let  verif=true;
            
            //bloquage de la saisie si on ne saisit pas le bon caractere
            for (let i=0; i<selectext.length; i++){
                if(i<type.length){
                    if(type[i] == selectext[i]){
                        
                        typezone.setSelectionRange(i+1, i+1);
                    } else{
                        verif=false;
                        break;
                    }
                }
            }
            typezone.value = type.substring(0, verif ? type.length : type.length - 1);
        });
    });

}


function texte(){
    $(document).ready(function(){
        $.ajax({
            url:"../../data/exercice.json",
            method:"GET",
            dataType:"json",
        })

        .done(function(res){
            let index=randomText(res);
            exoText(index,res);
            
            
        });
    })
}


texte();
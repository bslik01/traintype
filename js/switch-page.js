
function menu_d() {
    $("#contenu2").load("../pages/add-exercice.html");
    $("#contenu3").load("../pages/add-person.html");
    $("#contenu4").load("../pages/list-exo.html");
    $("#contenu5").load("../pages/list-person.html");
}

document.addEventListener('DOMContentLoaded', function() {
    menu_d();
    $('head').append('<link rel="stylesheet" href="../vendor/bootstrap/css/bootstrap.min.css" type="text/css" />');
    // $('body').append('<script type="text/javascript" src="../js/script_liste.js"></script>');
});


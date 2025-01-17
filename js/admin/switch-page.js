
function menu_admin() {
    $("#contenu2").load("../../pages/admin/add-exercice.html");
    $("#contenu3").load("../../pages/admin/add-person.html");
    $("#contenu4").load("../../pages/admin/list-exo.html");
    $("#contenu5").load("../../pages/admin/list-person.html");
}

document.addEventListener('DOMContentLoaded', function() {
    menu_admin();
    $('head').append('<link rel="stylesheet" href="../../vendor/bootstrap/css/bootstrap.min.css" type="text/css" />');
});


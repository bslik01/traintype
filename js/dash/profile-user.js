document.getElementById('openModal').onclick = function() {
    $('#myModal').modal('show');
}


function logout() {
    alert("Vous etes deconnectes");
    $('#myModal').modal('hide');
}
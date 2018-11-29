
function logout(){
    localStorage.removeItem('usuario');
    window.location = "../index.html";
}

$(document).ready(function(){
    
    if(localStorage.getItem('usuario')==null){
        window.location = "../index.html";
    }

    $('#logout').click(function(e){
        logout();
    });
});
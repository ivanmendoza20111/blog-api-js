function go_registrarse(){
    window.location = "./pages/registrarte.html";
}

function login(){
    var email = $('#usuario').val();
    var pass = $('#contrasena').val();

    if(email == ''){
        alert('Debe Ingresar un email');
        return;
    }

    if(pass == ''){
        alert('Debe ingresar una Contraseña');
        return;
    }

    var data ={
        email:email,
        password: pass
    };

    fetch("http://68.183.27.173:8080/login", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(function(response){
            console.log(response);
            localStorage.setItem('usuario',JSON.stringify(response));
            window.location = "./pages/menu.html";
        })
        .catch(error => console.error('Error:', error));
}

$(document).ready(function(e){

    if(localStorage.getItem('usuario')!=null){
        window.location = "./pages/menu.html";
    }

    $('#btnLogin').click(function(){
        login();
    });
});

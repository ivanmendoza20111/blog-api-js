
/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getuser(){
    var id = getParameterByName('id');
    let token = JSON.parse(localStorage.getItem('usuario')).token;

    fetch("http://68.183.27.173:8080/users/"+id, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer '+token
        },
      }).then(res => res.json())
      .then(function(response){
        console.log(response);
        let date = new Date(response.createdAt).toLocaleDateString('es-RD');
        let email = response.email;
        let name = response.name;
        let posts = response.posts;

        let resultado = `<div class="card text-center">
                    <div class="card-header">
                    Usuario
                    </div>
                    <div class="card-body">
                    <h5 class="card-title">Nombre: ${name}</h5>
                     <p class="card-text">Email: ${email}</p>
                     <p class="card-text">Total de Posts: ${posts}</p>
                    </div>
                    <div class="card-footer text-muted">
                    Creado: ${date}
                    </div>
            </div>`
         $('#user').html(resultado);  
         
      })
      .catch(error => console.error('Error:', error));  
}

function logout(){
    localStorage.removeItem('usuario');
    window.location = "../index.html";
}

$(document).ready(function(e){

    if(localStorage.getItem('usuario')==null){
        window.location = "../index.html";
    }

    getuser();

    $('#logout').click(function(e){
        logout();
    });

    $('#crearPost').click(function(e){
        window.location = 'crear_post.html';
    });

});
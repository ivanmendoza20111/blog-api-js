
function logout(){
    localStorage.removeItem('usuario');
    window.location = "../index.html";
}

function post(){

    let token = JSON.parse(localStorage.getItem('usuario')).token;
    
    fetch("http://68.183.27.173:8080/post", {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer '+token
        },
      }).then(res => res.json())
      .then(function(response){
        let resultado='';
        for (var i in response) {
            if (response.hasOwnProperty(i)) {
                let title = response[i].title;
                let body = maximo(response[i].body,300);
                let id = response[i].id;
                let userId = response[i].userId;
                var email = '';
                var nombre = '';

                fetch("http://68.183.27.173:8080/users/"+userId, {
                    method: 'GET',
                    headers: {
                        'Authorization' : 'Bearer '+token
                    },
                }).then(res => res.json())
                .then(function(response){    
                    email = response.email;
                    nombre = response.name;
                })
                .catch(error => console.log('Error ',error));

                resultado +=`
                <div class="row mb-12">
                    <div class="col-md-12">
                        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                            <div class="card-body d-flex flex-column align-items-start">
                            <h3 class="mb-0">
                                <a class="text-dark" href="#">`+title+`</a>
                            </h3>
                            
                            <p>By:<a href="perfil.html?userId="`+userId+`><strong class="d-inline-block mb-2 text-primary">`+nombre+'('+email+')'+`</strong></a></p>
                            <div class="mb-1 text-muted">Nov 12</div>
                            <p class="card-text mb-auto">`+body+`</p>
                            <a href="post.html?id="`+id+`>Continuar Leyendo</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
          }

          $('#post').html(resultado);
          console.log(response);
      })
      .catch(error => console.error('Error:', error));
}

function maximo(texto='', limite=200){
    
    if(texto.length>=limite){
        texto =texto.substring(0,limite)+"...";
    }

    return texto;
   }

$(document).ready(function(){

    
    if(localStorage.getItem('usuario')==null){
        window.location = "../index.html";
    }

    post();

    $('#logout').click(function(e){
        logout();
    });
});

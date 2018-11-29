
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
                let body = maximo(response[i].body,250);
                let id = response[i].id;
                let userId = response[i].userId;
                var email = response[i].userEmail;
                var username = response[i].userName;
                var totalLikes = response[i].likes;
                var like = response[i].liked;
                var createdAt = new Date(response[i].createdAt).toLocaleDateString('es-RD');;
                var comment = response[i].comments;
                var views = response[i].views;
                var tags = response[i].tags;


                if(like){
                    like = `<div class="float-right">
                                <i style="color:#fd7e14;" class="fas fa-star"></i>
                        </div>`;
                }else{
                    like = `<div class="float-right" >
                                <i class="fas fa-star"></i>
                            </div>`;
                }

                resultado +=`
                <div class="row mb-12">
                    <div class="col-md-12">
                        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                            <div class="card-body d-flex flex-column align-items-start">
                                <h3 class="mb-0">
                                    <a class="text-dark" href="post.html?id=${id}">${title} </a>  <span style="cursor:pointer;" class="like" data-id="${id}" data-like="${response[i].liked}">&nbsp; ${like}</span>
                                </h3>`;

                                resultado +=`
                                        <div class='float-right'>
                                            <a href="#">${tags.join(',')}</a>
                                        </div>`;

                            resultado+=`
                                <p>By: <a href="perfil.html?userId=${userId}"><strong class="d-inline-block mb-2 text-primary">${username}(${email})</strong></a></p>
                                
                                <div class="mb-1 text-muted">${createdAt}</div>
                                
                                    <p class="card-text mb-auto">${body}</p>
                                   <p> <a href="post.html?id=${id}">Continuar Leyendo</a> &nbsp; <i style="color:#e64980;" class="far fa-comments"></i> Comentarios (${comment}) &nbsp; <i class="far fa-eye"></i> Visitas (${views}) &nbsp;  <i style="color:#fd7e14;" class="fas fa-star"></i> Likes (<span id="totalLikes${id}">${totalLikes}</span>)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
          }

          $('#post').html(resultado);
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

    $(document).on('click','.like',function(e){
        let token = JSON.parse(localStorage.getItem('usuario')).token;
        let id = $(this).data('id');
        let like = $(this).data('like');
        let method = '';
        
        if(like){
            method = 'DELETE';
        }else{
            method = 'PUT';
        }

        fetch("http://68.183.27.173:8080/post/"+id+'/like', {
            method: method, 
            headers:{
                'Authorization' : 'Bearer '+token
            }
          }).then(function(response){
            $(this).css("color",'');
          })
          .catch(error => console.error('Error:', error));
    });

    $('#crearPost').click(function(e){
        window.location = 'crear_post.html';
    })
});

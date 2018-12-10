
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

function logout(){
    localStorage.removeItem('usuario');
    window.location = "../index.html";
}

function getPost(){
    var id = getParameterByName('id');
    let token = JSON.parse(localStorage.getItem('usuario')).token;
    
    fetch("http://68.183.27.173:8080/post/"+id, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer '+token
        },
      }).then(res => res.json())
      .then(function(response){
          console.log(response);
        let date = new Date(response.createdAt).toLocaleDateString('es-RD');
        let like = response.liked;

        if(like){
            like = `<div class="float-right">
                        <i style="color:#fd7e14;" class="fas fa-star"></i>
                </div>`;
        }else{
            like = `<div class="float-right" >
                        <i class="fas fa-star"></i>
                    </div>`;
        }

        let resultado = `
        <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h1>${response.title} <span style="cursor:pointer;" class="like" data-id="${response.id}" data-like="${response.liked}">&nbsp; ${like}</span></h1>
                <div class="pull-right">
                    <span class="label label-default">Autor:<a href='user.html?id=${response.userId}'> ${response.userName}</a></span> 
                    <span class="badge">Posted ${date}</span>  
                    <span class="badge">Tags: ${response.tags.join(',')}</span>  
                    <i style="color:#e64980;" class="far fa-comments"></i> Comentarios (${response.comments}) &nbsp; <i class="far fa-eye"></i> Visitas (${response.views}) &nbsp;  <i style="color:#fd7e14;" class="fas fa-star"></i> Likes (<span >${response.likes}</span>)
                    <hr>
                    <p>${response.body}</p>
                </div>
            </div>
         </div>
         </div>`
         $('#post').html(resultado);  
         getComentarios();
      })
      .catch(error => console.error('Error:', error));     
}

function getComentarios(){
    var id = getParameterByName('id');
    let token = JSON.parse(localStorage.getItem('usuario')).token;
    
    fetch("http://68.183.27.173:8080/post/"+id+'/comment', {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer '+token
        },
      }).then(res => res.json())
      .then(function(response){
        let resultado = '<br>';
        for (var i in response) {
            if (response.hasOwnProperty(i)) {
                console.log(response);
                let date = new Date(response[i].createdAt).toLocaleDateString('es-RD');
        
                resultado += `
                <div class="container">
                <div class="row">
                <div class="col-sm-8">
                    <div class="panel panel-white post panel-shadow">
                        <div class="post-heading">
                            <div class="pull-left meta">
                                <div class="title h5">
                                    <a href="user.html?id=${response[i].userId}"><b>${response[i].userName}:</b></a>
                                </div>
                                <h6 class="text-muted time">${date}</h6>
                            </div>
                        </div> 
                        <div class="post-description"> 
                            <p>${response[i].body}</p>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
            </div>`;
            }    
        }
         $('#comentarios').html(resultado);  
         
      })
      .catch(error => console.error('Error:', error));  
}

function setComentarios(){
    let token = JSON.parse(localStorage.getItem('usuario')).token;
    let id = getParameterByName('id');
    let body = $('#comment').val();

    data = {
        body:body
    };

    fetch("http://68.183.27.173:8080/post/"+id+"/comment", {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Authorization' : 'Bearer '+token
        }
      }).then(function(response){
        getComentarios();
        $('#comment').val('');
      })
      .catch(error => console.error('Error:', error));
}


$(document).ready(function(){
    
    if(localStorage.getItem('usuario')==null){
        window.location = "../index.html";
    }

    getPost();

    $('#logout').click(function(e){
        logout();
    });

    $('#crearPost').click(function(e){
        window.location = 'crear_post.html';
    });

    $('#btnComment').click(function(e){
        setComentarios();
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
            getPost();
          })
          .catch(error => console.error('Error:', error));
    });
});
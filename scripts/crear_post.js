
function logout(){
    localStorage.removeItem('usuario');
    window.location = "../index.html";
}

function guardarPost(){
    let token = JSON.parse(localStorage.getItem('usuario')).token;
    let title = $('#titulo').val().trim();
    let body = $('#texto').val().trim();
    let tags = [$('#tags').val()];

    if(title == '')
        return;

    if(body == '')
        return;

    var data = {
        title:title,
        body:body,
        tags:tags
    };

    if(title!= ''){
        if(body!=''){
            fetch("http://68.183.27.173:8080/post", {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
                'Authorization' : 'Bearer '+token
            }
          }).then(function(response){
            window.location = 'menu.html';
          })
          .catch(error => console.error('Error:', error));
        }else{
            alert('Debe ingresar un Texto para continuar.');
        }
    }else{
        alert('Debe ingresar un Titulo para continuar.');
    }
}

$(document).ready(function(){

    if(localStorage.getItem('usuario')==null){
        window.location = "../index.html";
    }

    $('#logout').click(function(e){
        logout();
    });

    $('#btnGuardarPost').click(function(e){
        guardarPost();
    });

    $('#btnCancelar').click(function(e){
        window.location="menu.html";
    });

    //tags
    function onAddTag(tag) {
        alert("Added a tag: " + tag);
    }
    function onRemoveTag(tag) {
        alert("Removed a tag: " + tag);
    }
    function onChangeTag(input,tag) {
        alert("Changed a tag: " + tag);
    }
    $(function() {
        $('#tags').tagsInput({
            width: 'auto',
            height:'auto',
            'defaultText':'Add a tag', 
        });
    });

});
function wsConnect(token) {
    // console.log("WS- connect ", token);
    var websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);
    websocket.onopen = function (evt) {
        // console.log(evt)
    };
    websocket.onclose = function (evt) {
        // console.log(evt)
    };
    websocket.onerror = function (evt) {
        console.log(evt)
    };

    websocket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        console.log(data);
        switch (data.type) {
            case "likes":
                $('#articulo-like-' + data.postId).text(data.likes);
                break;
            case "view-post":
                // TODO: cambias likes por views
                $('#articulo-view-' + data.postId).text(data.views);
                break;
            case "new-comment":
                // TODO: cambias likes por views
                $("#articulo-comment-"+data.postId).html(data.comments);
                loadcomments(data.postId,$("articulo-coments-content-"+postId));
                break;

        }
    };
}

$(document).ready(function(e){
    let token = JSON.parse(localStorage.getItem('usuario')).token;
    wsConnect(token);
});
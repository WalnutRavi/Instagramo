const firebaseConfig = {
   apiKey: "AIzaSyDLOw6YHwFL1h6P0jqNn0hOtxRW5m4v810",
   authDomain: "instagramo-dfaa2.firebaseapp.com",
   databaseURL: "https://instagramo-dfaa2-default-rtdb.firebaseio.com",
   projectId: "instagramo-dfaa2",
   storageBucket: "instagramo-dfaa2.appspot.com",
   messagingSenderId: "127541173707",
   appId: "1:127541173707:web:0e448358cde43f73872a4e"
};
firebase.initializeApp(firebaseConfig)
roomName = localStorage.getItem("roomName");
userName = localStorage.getItem("userName");


function send(){
   msg = document.getElementById("msg").value;
   firebase.database().ref("/rooms" + roomName).push({
   name:userName,
   message:msg,
   like: 0
   })
   document.getElementById("msg").value = ""
}


function getData() {
   firebase.database().ref("/rooms" + roomName).on('value', function (snapshot) {
       document.getElementById("output").innerHTML = "";
       snapshot.forEach(function (childSnapshot) {
           childKey = childSnapshot.key;
           childData = childSnapshot.val();
           if(childKey != "purpose") {
               firebaseMessageId = childKey;
               messageData = childData;
               //Início do código
               name = messageData["name"];
               message = messageData["message"]
               like = messageData["like"];
               nameWithTag = "<h4>" + name + "<img class = 'user_tick' src = ''> </h4>";
               messageWithTag = "<h4 class = 'message_h4'>" + message + "</h4>";
               likeButton = "<button class = 'btn btn-danger' id = "+firebaseMessageId+" value = "+like+" onclick = 'updateLike(this.id)'>";
               spanWithTag = "<span class = 'glyphicon glyphicon-thumbs-up' >Like: " + like + "</span></button>";
               row = nameWithTag + messageWithTag + likeButton + spanWithTag;
               document.getElementById("output").innerHTML += row;
               //Fim do código
           }
       });
   });
}
getData();


function updateLike(messageId){
   btn_id = messageId;
   likes = document.getElementById(btn_id).value;
   updateLikes = Number(likes) + 1;
   firebase.database().ref("/rooms" + roomName).child(messageId).update({
       like: updateLikes
   })
}
function logout() {
   localStorage.removeItem("userName");
   localStorage.removeItem("roomName");
   window.location = "index.html";
 }

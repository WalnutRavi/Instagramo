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
//ADICIONE SEUS LINKS FIREBASE

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/rooms").child(roomName).update({
    purpose: "adicionar nome de sala"
  });

  localStorage.setItem("roomName", roomName);

  //window.location = "instagramoPage.html";
}

function getData() {
  firebase.database().ref("/rooms").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "instagramopage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}

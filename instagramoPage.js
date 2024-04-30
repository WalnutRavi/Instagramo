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
function send() {
    msg=document.getElementById("msg").value ;
    firebase.database().ref(roomName).push({
        name:userName,
        message:msg,
        like:0
    })
    document.getElementById("msg").value=""
}
function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";
  }
  
$(document).ready(function(){
     // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAGDoMksu4ysFYvKZ0DAvALL3oHbNXkSnk",
    authDomain: "oxuaz-7c33e.firebaseapp.com",
    databaseURL: "https://oxuaz-7c33e.firebaseio.com",
    projectId: "oxuaz-7c33e",
    storageBucket: "oxuaz-7c33e.appspot.com",
    messagingSenderId: "889533676685",
    appId: "1:889533676685:web:7962a304e511ff517536c4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  $("#loginBtn").click(function(){

    var email = $("#email").val()
    var password = $("#password").val()
    
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(){
        window.location.href = "adminpanel.html";

    }).catch(function(error){
        alert(error.message)
    })
  })

})
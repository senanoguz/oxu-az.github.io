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
 var current_user = "";
 firebase.auth().onAuthStateChanged(function(user){
   if(user){
     $("body").css("display","block")
    current_user = user.email;
     $(".user-text").text(user.email);
     
 
     $("#logout").click(function(){
      firebase.auth().signOut()
      .then(function(){
        window.location.href = "login.html"
      })
     })
     
   }else{
 
     alert("Admin Panele girmek selahiyetine malik deyilsiniz")
     window.location.href = "login.html"
   }
   
 })
 $("#registerBtn").click(function(){
     var email = $("#email").val()
     var password = $("#password").val()

     firebase.auth().createUserWithEmailAndPassword(email,password)
     .then(function(){


            window.location.href = "index.html";
    
        })

     }).catch(function(){
         alert(error.message)
     })
 })

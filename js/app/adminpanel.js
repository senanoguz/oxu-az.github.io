$(document).ready(function () {

  var firebaseConfig = {
    apiKey: "AIzaSyAGDoMksu4ysFYvKZ0DAvALL3oHbNXkSnk",
    authDomain: "oxuaz-7c33e.firebaseapp.com",
    databaseURL: "https://oxuaz-7c33e.firebaseio.com",
    projectId: "oxuaz-7c33e",
    storageBucket: "oxuaz-7c33e.appspot.com",
    messagingSenderId: "889533676685",
    appId: "1:889533676685:web:7962a304e511ff517536c4"
  };
  firebase.initializeApp(firebaseConfig);

  var current_user = "";
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("body").css("display", "block")
      current_user = user.email;
      $(".user-text").text(user.email);


      $("#logout").click(function () {
        firebase.auth().signOut()
          .then(function () {
            window.location.href = "login.html"
          })
      })

    } else {

      alert("Admin Panele girmek selahiyetine malik deyilsiniz")
      window.location.href = "login.html"
    }

  })


  // $(".sendToFireBase").click(function(){
  //   var title = $("#title").val();

  // firebase.database().ref().child("users").child(current_user).child("title").push({
  //   title: title,
  //   completed: false
  // });

  // $("#title").val('');

  //  })

  // var titleRef = firebase.database().ref().child("users/" + current_user).child("title"); 
  // titleRef.on("value",function(snapshot){

  //   var $parent = $(".todoList").children("tbody");
  //   $parent.html("");
  //    snapshot.forEach(function(item){

  //  var title_elem = `<td> ${item.val().title} </td>`;
  //  var completed = item.val().completed() == true ? "checked" : ""
  //  var completed_elem = `<td><input type='checkbox' class=' ${completed} /> </td>`;
  //  var removeBtn_elem = `<td><button class='btn btn-danger btn-block removeBtn'>Sil</button</td>`
  //      $parent.append(`<tr><td>${title_elem} ${completed_elem} ${removeBtn_elem}</td></tr>`)
  //    })
  // })



  var posts = firebase.database().ref('/news')

  $(".sendToFireBase").click(function () {

    var title = $("#title").val();
    var img = $("#img").val();
    var textarea = $("#textarea").val();
    var dateandtime = Date.now();

    posts.push(
      {
        img: img,
        title: title,
        textarea: textarea,
        dateandtime: dateandtime,
        completed: false
      }
    ).then(function () {
      console.log('success')
    })
      .catch(function () {
        console.log('error')
      });

    $("#title").val('');
    $("#img").val('');
    $("#textarea").val('');

  })



  posts.on('value', function (res) {
    var data = res.val()
    var mykey = "";
    $('tbody').empty()
    $('.imgs').empty()
    $('.textarea').empty()
    Object.keys(data).reverse().map(key => {

      var tr = $('<tr>')
      tr.attr('data-id',key)
      var completed = data[key].completed === true ? "checked" : ""
      var td1 = $('<td>').html(`<textarea class='titleedit'> ${data[key].title} </textarea><button style='width:30%' class='btn btn-warning btn-block editBtn'>Edit</button>`)
      var edit = $('<td>').html(`<textarea class='textareaedit'> ${data[key].textarea} </textarea><button class='btn btn-warning btn-block editBtn'>Edit</button>`)
      var td2 = $('<td>').html(`<input type='checkbox' class='switchery-plugin'${completed} />`)
      var td3 = $('<td>').html(`<button class='btn btn-danger btn-block removeBtn' style='margin-top:60%;'>Delete</button>`)
      td3.on('click', function () {
        posts.child(key).remove()
      })


      var link = data[key].img
      var img = $("<img>").css("max-height","250px").css("max-width","300px")
      img.attr('src', link);
      $('.imgs').append(img)
      td1.append(img)
      tr.append(td1)
      tr.append(edit)
      tr.append(td2)
      tr.append(td3)

      $('tbody').append(tr)


      console.log(data[key])
    })
    console.log()

    $(".switchery-plugin").each(function () {
      new Switchery(this)
    })
    $('.editBtn').on('click', function () {
      alert("salam")
    
      
    })
    $("body").on("change", ".switchery-plugin", function () {
      var $completed = $(this).prop("checked");
      var id = $(this).closest('tr').attr('data-id')
      posts.child(id).update({
        completed: $completed
      })
     
    })
  })






})




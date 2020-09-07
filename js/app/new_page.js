$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyAGDoMksu4ysFYvKZ0DAvALL3oHbNXkSnk",
        authDomain: "oxuaz-7c33e.firebaseapp.com",
        databaseURL: "https://oxuaz-7c33e.firebaseio.com",
        projectId: "oxuaz-7c33e",
        storageBucket: "oxuaz-7c33e.appspot.com",
        messagingSenderId: "889533676685",
        appId: "1:889533676685:web:7962a304e511ff517536c4"
      };
    firebase.initializeApp(config);
    var 
    var news = firebase.database().ref('/news')
    news.on('value',function(res){
        $("#news").empty()
        var data = res.val()
        Object.keys(data).map(key=>{
            var item = data[key]
            console.log(item)

            var div = $("<div>");
            div.addClass("rightdesign")
            div.css("width","18rem");
            var a = $("<a>");
            a.attr('href',`new_page.html?id=${key}`)
            var img = $("<img>")
            img.addClass("card-img-top");
            img.attr("src",item.img) 
            div2 = $("<div>");
            div2.addClass("card-body");
            var h5 = $("<h5>");
            h5.addClass("card-title");
            h5.text(item.title)

            div.append(a)
            a.append(img)
            a.append(div2)
            div2.append(h5)
            
            $("#news").append(div)

        })
      
    })
   
   
  
  })
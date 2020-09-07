

$(document).ready(function () {
  var counter = 0
  

  $('#loader').css("display", "none")
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
  var news = firebase.database().ref('/news')
  loadMore()
  var footernote = firebase.database().ref('/footernote')
  footernote.on('value', function (res) {

    var data = res.val()
    $(".footernote").empty()
    Object.keys(data).map(key => {

      var item = data[key]
      var footertext = $(".footernote")
      footertext.append(item.footernote)

      $(".footernote").append(footertext)


    })
  })

  var slider = firebase.database().ref('/slider')
  slider.on('value', function (res) {
    $('#loader').css("display", "none")

    var data = res.val()

    Object.keys(data).map(key => {

      var item = data[key]

      var sl1 = $(".sl1")
      var sl2 = $(".sl2")
      var sl3 = $(".sl3")

      var sl1img = $("<img>").css("max-width", "620px").css("max-height", "460px")

      var sl2img = $("<img>").css("max-width", "620x").css("max-height", "460px")
      var sl3img = $("<img>").css("max-width", "620px").css("max-height", "460px")
      sl1img.addClass("d-block w-100")
      sl2img.addClass("d-block w-100")
      sl3img.addClass("d-block w-100")
      $('.slidermovzu1').text(item.slidermovzu1)
      $('.slidermovzu2').text(item.slidermovzu2)
      $('.slidermovzu3').text(item.slidermovzu3)


      sl1img.attr("src", item.sl1)
      sl2img.attr("src", item.sl2)
      sl3img.attr("src", item.sl3)

      sl1.append(sl1img)
      sl2.append(sl2img)
      sl3.append(sl3img)

    })
  })
  var reklamlar = firebase.database().ref('/reklamlar')
  reklamlar.on('value', function (res) {

    var data = res.val()


    Object.keys(data).map(key => {

      var item = data[key]
      var ustr = $(".ustreklam")
      var sagr = $(".solreklam")
      var solr = $(".sagreklam")
      var ortar = $(".ortareklam")
      var ustrimg = $("<img>").css("width", "100%").css("max-height", "150px")
      var sagrimg = $("<img>").css("max-width", "160px").css("max-height", "600px")
      var solrimg = $("<img>").css("max-width", "160px").css("max-height", "600px")
      var ortarimg = $("<img>").css("max-width", "300px").css("max-height", "460px")

      ustrimg.attr("src", item.reklamust)
      sagrimg.attr("src", item.reklamsag)
      solrimg.attr("src", item.reklamsol)
      ortarimg.attr("src", item.reklamorta)
      ustr.append(ustrimg)
      sagr.append(sagrimg)
      solr.append(solrimg)
      ortar.append(ortarimg)



    })
  })
  var bolmeler = firebase.database().ref('/bolmeler')
  bolmeler.on('value', function (res) {

    var data = res.val()
    $(".footerul").empty()
    Object.keys(data).map(key => {

      var item = data[key]
      var menuup = $(".footerul")
      var menuuptext = $("<a>")


      menuuptext.attr("href", item.linki)
      menuuptext.text(item.bolme)
      menuup.append(menuuptext)

    })
  })
  var bolmeler = firebase.database().ref('/newscategory')
  bolmeler.on('value', function (res) {

    var data = res.val()
    $(".mynav").empty()
    Object.keys(data).map(key => {

      var item = data[key]
      var menuup = $(".mynav")

      if (item.completed === true) {
        var menuuptext = $("<a>")
        menuuptext.addClass('nav-i')
        menuuptext.attr("href", item.newscatlinki)
        menuuptext.text(item.newscat)
        menuup.append(menuuptext)
      }

    })
  })

  var bolmeler = firebase.database().ref('/bolmeler')
  bolmeler.on('value', function (res) {

    var data = res.val()
    $(".menuup").empty()
    Object.keys(data).map(key => {

      var item = data[key]
      var menuup = $(".menuup")

      var menuuptext = $("<a>")

      menuuptext.attr("href", item.linki)
      menuuptext.text(item.bolme)
      menuup.append(menuuptext)

    })
  })

  function getDate(datetime) {
    var date = new Date(datetime);
    var month = new Array();
    month[0] = "Yanvar";
    month[1] = "Fevral";
    month[2] = "Mart";
    month[3] = "Aprel";
    month[4] = "May";
    month[5] = "Iyun";
    month[6] = "Iyul";
    month[7] = "Avqust";
    month[8] = "Sentyabr";
    month[9] = "Okt";
    month[10] = "Noy";
    month[11] = "Dek";
    var ay = month[date.getMonth()];

    var ayingunu = date.getDate()
    var saat = date.getHours();
    var deqiqe = date.getMinutes();
    return {
      ay: ay,
      ayingunu: ayingunu,
      saat: saat,
      deqiqe: deqiqe
    }
  }

  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      //$(window).unbind('scroll');
        loadMore()
    }
  });



  function loadMore() {
    console.log('load more')
    counter += 6
    var recentNews = news.limitToLast(counter)
    recentNews.on('value', function (res) {
      $("#news").empty()
      var data = res.val()
      Object.keys(data).reverse().map(key => {
        var item = data[key]

        var date = getDate(item.dateandtime)


        if (item.completed === true) {

          var div = $("<div>");
          div.addClass("rightdesign").css("margin-top", "20px")
          div.css("width", "18rem").css("border", "1px solid black").css("border-radius", "50px 50px 50px 50px");
          var a = $("<a>");
          // a.attr('href',`new_page.html?id=${key}`)
          a.attr('href', `#`)
          var img = $("<img>")
          img.addClass("card-img-top").css("border-radius", "50px 50px 0px 0px").css("min-height", "200px");
          img.attr("src", item.img)
          div2 = $("<div>");
          div2.addClass("card-body");
          var h5 = $("<h5>");
          h5.addClass("card-title");


          h5.text(item.title)
          var div3 = $("<div>")
          var br = $("<br>")
          var h3 = $("<h5>")
          var h2 = $("<h5>")
          h5.append(br);
          h3.addClass("tarix")
          h3.html(`${date.ayingunu} ${date.ay} `)
          h5.append(br);
          h2.addClass("tarix2")
          h2.html(`${date.saat}: ${date.deqiqe}`)

          div.append(a)

          a.append(img)
          a.append(div2)
          div2.append(h3)
          div2.append(h2)
          div2.append(h5)
          div.append(div3)
          $("#news").append(div)


        }




        $(a).on('click', function () {
          $("#news").empty()

          var div = $("<div>");
          div.addClass("col-md-6")
          div.css("width", "w100").css("position", "relative").css("right", "200px");
          var img = $("<img>")

          img.css("width", "540px").css("height", "372px").css("margin-bottom", "20px")
          img.attr("src", item.img)
          img.addClass("news-img")
          var h1 = $("<h1>")
          h1.addClass("news_top")
          h1.append(item.title)
          var p = $("<p>")
          p.append(item.textarea)
          p.addClass("news")
          div.append(img)
          div.append(h1)
          div.append(p)
          $("#news").append(div)
          $(".footer").css("margin-top", "500px")

        })
      })

    })
  }



})


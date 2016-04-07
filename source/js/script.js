(function() {

  var dataTopMenu = {
    menu: $(".top-menu"),
    menuContainer: $(".top-menu__list"),
    classIndexMenu: "top-menu--index",
    header: $(".page-header"),
    classIndexHeader: "page-header--scrolled",
    menuFooter: $("footer-menu"),
    call: $("call")
  };

  $(".index-slider__list").slick({
    slidesToShow: 1,
    arrows: false,
    infinite: false,
    focusOnSelect: true,
    dots: true
  })

  function toInitChangeTopMenu(data) {
    var body = $(".page"),
        classIndexPage = "page--index";

    function toChangeHeader(event) {
      var data = (event.data !== undefined) ? event.data : event,
        screenHeight = $(window).height(),
        screenWidth = $(window).width(),
        screenHeightChange;

      // 40px is a distance free zone.
      // 190px is a fixed height of top.
      // 109px is a magic number.
      // To do: think about it.
      screenHeightChange = screenHeight - 190 - data["call"].height() - data["menuFooter"].height() - 40 - 109;

      if ($(this).scrollTop() > screenHeightChange) {
        if (body.hasClass(classIndexPage)) {
          data["menu"].removeClass(data["classIndexMenu"]);
        }
        data["header"].addClass(data["classIndexHeader"]);
      } else {
        if (body.hasClass(classIndexPage)) {
          data["menu"].addClass(data["classIndexMenu"]);
        }
        data["header"].removeClass(data["classIndexHeader"]);
      }
    }

    function toHandleWideSubmenu() {
      var menu = data["menuContainer"],
          count = menu.children().length;

      for (var i = count; i--;) {
        var item = menu.children().eq(i),
            submenu = item.find(".top-menu__fall");

        if (submenu.length && submenu.children().length > 4) {
          submenu.get(0).classList.add("top-menu__fall--two-col");
        };
      };

    }

    toHandleWideSubmenu();
    $(window).on("scroll", data, toChangeHeader);
  }

  toInitChangeTopMenu(dataTopMenu);

  // foot menu
  function toHandleWideFooterSubmenu() {
    var menu = $(".footer-menu__list"),
        count = menu.children().length;

    for (var i = count; i--;) {
      var item = menu.children().eq(i),
          submenu = item.find(".footer-menu__fall");

      if (submenu.length && submenu.children().length > 8) {
        submenu.parent().get(0).classList.add("footer-menu__fall-decor--two-col");
      }
    };
  }

  toHandleWideFooterSubmenu();

  function footMenuStop(){
    var docH = $(document).height();
    var scrollH = $(document).scrollTop();
    var winH = $(window).height();
    var point = docH - 140;
    point = point - winH;

    if( scrollH >= point){
      $(".footer-menu").addClass("footer-menu--stop");
    }else{
      $(".footer-menu").removeClass("footer-menu--stop");
    }
  }

  $(window).scroll(footMenuStop);
  $(window).load(footMenuStop);
  $(window).resize(footMenuStop);



  // search

  if( $(".search__input").size() ) {
    if( $(".search.search--wide").size()  ) {
      // nothing
    }else {
      $(".search__input").bind("focus", function () {
        $(".search").addClass("search--width");
      });

      $(".search__input").bind("blur", function () {
        $(".search").removeClass("search--width");
      });
    }
  }

  //scrolltop btn > 768

  if ($(window).width() > 785) {

    $(document).scroll(function () {
      var pos = $(window).scrollTop();
      var winH = $(window).height();

      if (pos > (2 * winH)) {
        $(".scrolltop").show();

      }
      else {
        $(".scrolltop").hide();
      }

    });

    $(".scrolltop").bind("click", function () {
      $("body, html").animate({
        scrollTop: 0
      }, 1000);

    });

  } else{


  //up btn < 768

  $(".foot-menu__up").bind("click", function () {
    $("body, html").animate({
      scrollTop: 0
    }, 1000);

  });

  }

  // Submit & validation ------------------------

  if( $(".feedback").size() ) {

    var bcForm = $(".feedback");
    var field = {
      name : false,
      tel : false,
      email : false
    };

    bcForm.find(".control__input--name").bind("blur", function () {
      if ($(this).val().match(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g) || $(this).val().replace(/[\s\-\.]+/g, "").length < 2 || $(this).val().match(/^[\s\-\.]+$/g)) {
        $(".control__input--name").addClass("control__input--false");
        field.name = false;
        $(this).parents(".feedback__block").find(".feedback__correctness").addClass("feedback__correctness--active");
        $(this).parents(".control").removeClass("control--well");
      }else{
        $(this).parents(".feedback__block").find(".feedback__correctness").removeClass("feedback__correctness--active");
        $(".control__input--name").removeClass("control__input--false");
        $(this).parents(".control").addClass("control--well");
        field.name = true;
      }
      submitOn();
    });

    bcForm.find(".control__input--name").bind("keyup", function () {
      if ($(this).val().match(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g)) {
        var newVal = $(this).val().replace(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g, "");
        $(this).val( newVal );
      }
    });

    bcForm.find(".control__input--tel").bind("blur", function () {
      if ($(this).val().match(/[^0-9\+\s\-]/g) || $(this).val().replace(/[\s\-\+]+/g, "").length > 11 || $(this).val().replace(/[\s\-\+]+/g, "").length < 6 || $(this).val().match(/^[\s\-\+]+$/g)) {
        $(".control__input--tel").addClass("control__input--false");
        field.tel = false;
        $(this).parents(".feedback__block").find(".feedback__correctness").addClass("feedback__correctness--active");
        $(this).parents(".control").removeClass("control--well");
      }
      else{
        $(this).parents(".feedback__block").find(".feedback__correctness").removeClass("feedback__correctness--active");
        $(".control__input--tel").removeClass("control__input--false");
        $(this).parents(".control").addClass("control--well");
        field.tel = true;
      }
      submitOn();
    });

    bcForm.find(".control__input--tel").bind("keyup", function () {
      if ($(this).val().match(/[^0-9\+\s\-]/g)) {
        var newVal = $(this).val().replace(/[^0-9\+\s\-]/g, "");
        $(this).val( newVal );
      }
    });

    bcForm.find(".control__input--email").bind("blur", function () {
      if (!isValidEmail($(this).val())){
        $(".control__input--email").addClass("control__input--false");
        field.email = false;
        $(this).parents(".feedback__block").find(".feedback__correctness").addClass("feedback__correctness--active");
        $(this).parents(".control").removeClass("control--well");
      }
      else{
        $(this).parents(".feedback__block").find(".feedback__correctness").removeClass("feedback__correctness--active");
        $(".control__input--email").removeClass("control__input--false");
        $(this).parents(".control").addClass("control--well");
        field.email = true;
      }
      submitOn();
    });

    function isValidEmail(email) {
      var pattern = new RegExp(/^[a-z0-9\+_-]+(\.[a-z0-9_\+-]+)*@[a-z0-9_-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i);
      return ( pattern.test(email) );
    }

    function submitOn(){
      if( field.name == true && field.tel == true && field.email == true){
        $(".feedback__btn").removeClass("feedback__btn--disabled").removeAttr("disabled");
      }else{
        $(".feedback__btn").addClass("feedback__btn--disabled").attr("disabled");
      }
    }

    bcForm.on("submit", function() {
      $(".feedback").hide();
      $(".thanksgiving").show();
    })


  }

})();
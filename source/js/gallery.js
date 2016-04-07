(function() {
if ( $(".gallery-slider").size()){

  $(".gallery__link").bind("click",function(){

    $(".dark-cover").show();
    $('body').addClass('page--dark-cover');
    $(".gallery-slider").show().slick({
      centerMode: true,
      centerPadding: "480px",
      slidesToShow: 1,
      dots: false,
      infinite: false,
      arrows: false,
      focusOnSelect: true,
      // variableWidth: true
      responsive: [
        {
          breakpoint: 1840,
          settings: {
            centerPadding: "440px"
          }
        },
        {
          breakpoint: 1680,
          settings: {
            centerPadding: "400px"
          }
        },
        {
          breakpoint: 1520,
          settings: {
            centerPadding: "360px"
          }
        },
        {
          breakpoint: 1360,
          settings: {
            centerPadding: "320px"
          }
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: "260px"
          }
        },
        {
          breakpoint: 1120,
          settings: {
            centerPadding: "240px"
          }
        },
        {
          breakpoint: 1060,
          settings: {
            centerPadding: "220px"
          }
        },
        {
          breakpoint: 1000,
          settings: {
            centerPadding: "200px",
            variableWidth: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerPadding: 0,
            variableWidth: false
          }
        }
      ]
    });
  });

  $(".gallery-slider").on("beforeChange", function(event, slick, direction){
    var slides = $(".slick-slide");
    if ($(window).width() < 1000) {
      setTimeout(function() {
        slides.removeClass("gallery-slider__item--visible");
        slides.parent().find(".slick-current").prev().addClass("gallery-slider__item--visible");
      }, 300);
    }
  });

  $(".dark-cover__close").bind("click",function(){

    $(".dark-cover").hide();
    $(".gallery-slider").hide();
    $('body').removeClass('page--dark-cover');

  });

  $(window).bind("keydown", function(event) {
    if (event.keyCode == 27) {
        $(".dark-cover").hide();
        $(".gallery-slider").hide()
    }
  });

}
})();
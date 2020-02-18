$(document).ready(function(){
    "use strict";
    
    //------- Initialising Slick Slider
    $('.item-slider').slick({
      arrows: false,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      slidesToShow: 4,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
    });
    
    //------- Custom Arrows click functionality
    $(document).on('click', '.prevSlide', function(){
      $('.item-slider').slick('slickPrev');
    });
    
    $(document).on('click', '.nextSlide', function(){
      $('.item-slider').slick('slickNext');
    });
    
    //------- Click to filter slides according to user's choice
    
    $(document).on('click', '.filter-option li a', function(){
        $('.filter-option li a').removeClass('active');
          $(this).addClass('active');
  
          var cat = $(this).attr('data-category');
  
          if(cat !== 'all'){
            $('.item-slider').slick('slickUnfilter');
  
            $('.item-slider li').each(function(){
              $(this).removeClass('slide-shown');
            });
  
            $('.item-slider li[data-match='+ cat +']').addClass('slide-shown');
  
            $('.item-slider').slick('slickFilter', '.slide-shown');
          }
      
          else{
            $('.item-slider li').each(function(){
              $(this).removeClass('slide-shown');
            });
            $('.item-slider').slick('slickUnfilter');
          }
        });
    
  });



  (function($) {
    $.fn.menumaker = function(options) {  
     var cssmenu = $(this), settings = $.extend({
       format: "dropdown",
       sticky: false
     }, options);
     return this.each(function() {
       $(this).find(".button").on('click', function(){
         $(this).toggleClass('menu-opened');
         var mainmenu = $(this).next('ul');
         if (mainmenu.hasClass('open')) { 
           mainmenu.slideToggle().removeClass('open');
         }
         else {
           mainmenu.slideToggle().addClass('open');
           if (settings.format === "dropdown") {
             mainmenu.find('ul').show();
           }
         }
       });
       cssmenu.find('li ul').parent().addClass('has-sub');
    multiTg = function() {
         cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
         cssmenu.find('.submenu-button').on('click', function() {
           $(this).toggleClass('submenu-opened');
           if ($(this).siblings('ul').hasClass('open')) {
             $(this).siblings('ul').removeClass('open').slideToggle();
           }
           else {
             $(this).siblings('ul').addClass('open').slideToggle();
           }
         });
       };
       if (settings.format === 'multitoggle') multiTg();
       else cssmenu.addClass('dropdown');
       if (settings.sticky === true) cssmenu.css('position', 'fixed');
    resizeFix = function() {
      var mediasize = 1000;
         if ($( window ).width() > mediasize) {
           cssmenu.find('ul').show();
         }
         if ($(window).width() <= mediasize) {
           cssmenu.find('ul').hide().removeClass('open');
         }
       };
       resizeFix();
       return $(window).on('resize', resizeFix);
     });
      };
    })(jQuery);
    
    (function($){
    $(document).ready(function(){
    $("#cssmenu").menumaker({
       format: "multitoggle"
    });
    });
    })(jQuery);



    $('#toggle').click(function() {
      $('.circle-loader').toggleClass('load-complete');
      $('.checkmark').toggle();
    });
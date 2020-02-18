'use strict';
jQuery(document).ready(function ($) {
  //console.log('hewdhj');

  /*-------------- Global Variables --------------*/
  var breakpoints = {
    xs: 480,
    xsMin: 479,
    sm: 480,
    smMin: 479,
    md: 992,
    mdMin: 991,
    lg: 1200,
    lgMin: 1159
  };
  var wWidth = $(window).width();

  /*-------------- Resize end event --------------*/
  //http://stackoverflow.com/questions/5489946/jquery-how-to-wait-for-the-end-of-resize-event-and-only-then-perform-an-ac
  //https://learn.jquery.com/events/introduction-to-custom-events/

  var rtime;
  var timeout = false;
  var delta = 200;
  $(window).on('resize', function() {
      rtime = new Date();
      if (timeout === false) {
          timeout = true;
          setTimeout(resizeend, delta);
      }
  });

  function resizeend() {
      if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
      } else {
          timeout = false;
          $(document).trigger( "threedResizeEnd");
      }
  }

  $(window).on('threedResizeEnd', function(){
    wWidth = $(window).width();
  });

  /*-------------- price plan isotope --------------*/
  if($('.isotope-menu').length){
    $('.isotope-menu a').on('click ', function() {
       $(this).closest('.isotope-menu').find('a').removeClass('active');
       $(this).addClass('active');
    });
    var $container = jQuery('.product-col-3');
    $container.isotope({
      itemSelector: '.product-wrapper',
       animationOptions: {
         duration: 750,
         easing: 'linear',
         queue: false
       }
    });
    $('.isotope-menu a').on('click', function(e) {
       e.preventDefault();
       var filterValue = $(this).attr('data-filter');
       $container.isotope({
         filter: filterValue
       });
    });
  }

  /*------------------------ client slider ----------------------------*/
  if($('.company-logos').length){
    $('.company-logos').owlCarousel({
      items:4,
      itemsDesktopSmall: [979 , 3],
      itemsTablet: [768,2],
      itemsMobile: [479 ,1]
    });
  }

  /*------------------------ Single Post Like ----------------------------*/
  $('.threed-like-post').on('click',function(){
    var post_id = $(this).data('src');
    var data={
      action: "postLike",
      post_id: post_id
    };

    $.post(sitesettings.ajaxurl, data,function(res){
      var like_obj = JSON.parse(res);
      $('.like_count').html(like_obj.total);
      if(like_obj.flag=='0')
      {
        $('.threed-like-post').addClass('liked');
      }
      else
      {
        $('.threed-like-post').removeClass('liked');
      }
    });
  });

  /*------------------------ Post Comment Like ----------------------------*/
  $('.threed-like-comments').on('click',function(){
    var _self = $(this);
    var comment_id = _self.data('src');
    var data = {
      action: 'commentLike',
      comment_id: comment_id
    };

    $.post(sitesettings.ajaxurl,data,function(res)
    {
      var like_obj = JSON.parse(res);
      _self.next().html(like_obj.total);
      if(like_obj.flag=='0')
      {

        _self.addClass('liked');
      }
      else
      {
        _self.removeClass('liked');
      }
    });
  });

  /*-------------------------- tooltip -------------------------*/
  $('[data-toggle="tooltip"]').tooltip()

  /*-------------------------- nav menu -------------------------*/
  var mobilenav = {
    ham: $('.hamburger'),
    toggleHam: function (e) {
      e.toggleClass('is-active')
    },
    toggleNav: function () {
      $('.navbar-wrapper').toggleClass('open-nav');
      $('body').toggleClass('overflow-body');
    },
    onClick: function () {
      mobilenav.toggleHam($(this));
      mobilenav.toggleNav();
    }
  }
  mobilenav.ham.on('click', mobilenav.onClick);

  /*-------------------------- Dropdown Button in navigation -------------------------*/
  $('.menu-item-has-children , .page_item_has_children').prepend('<span class="mobile-dropdown"><i class="fa fa-chevron-down"></i></span>');

  /*-------------------------- Submenu dropdown button -------------------------*/
  if($('.mobile-dropdown').length){
    $('.mobile-dropdown').on('click', function () {
      $(this).closest('.menu-item-has-children').find(' > .sub-menu').toggleClass('open-sub-menu');
       $(this).closest('.page_item_has_children').find(' > .children').toggleClass('open-sub-menu');
    });
  }

  /* --------------- service section height match & animate -----------------*/
  var serviceSection = {
    large: $('.service-type-1'),
    small: $('.service-type-2 , .service-type-3'),
    matchHeight: function (cb) {
      if (wWidth >= breakpoints.lgMin) {
        var serviceHeight = serviceSection.large.outerHeight() / 2;
        serviceSection.small.css('height', serviceHeight);
      }
      else{
        serviceSection.small.css('height', '');
        var service2Height = $('.service-type-2 .service-info').outerHeight();
        $('.service-image').css('height', service2Height);
      }
      if(cb && typeof cb === 'function'){
        cb();
      }
    },
    animate: function () {
      $('.service-type-3').waypoint(function() {
        $('.service-type-3 .service-info').addClass('goforit');
      }, { offset: '70%' });
    },
    onLoad: function () {
      if (wWidth >= breakpoints.mdMin) {
        serviceSection.matchHeight(serviceSection.animate);
      }else{
        serviceSection.matchHeight();
      }
    },
    onResize: function () {
      serviceSection.matchHeight();
    }
  };

  if(serviceSection.large.length && serviceSection.small.length){
    $(window).on('load', serviceSection.onLoad);
    $(window).on('threedResizeEnd', serviceSection.onResize);
  }
  /*------------ service tyoe other -------------*/

  /*------------- gallery post formant ------------*/
  if($('.gallery_post_format').length){
    $('.gallery_post_format').owlCarousel({
      center : true,
      loop : true,
      itemsDesktop : [1199,1],
      itemsDesktopSmall : [991,1],
      itemsTablet: [767,3],
      itemsTabletSmall: [650,1],
      itemsMobile : [479,1],
      singleItem : true,
      dotsEach : true
    });
  }

  /*--------------------ASK A QUOTE FORM AJAX SUBMISSION-------------------------*/
  function ajaxSubmit(form) {
    var data = {
      action: "askQuote",
      dataType:"JSON",
      message_name: $("#message_name").val(),
      message_email: $("#message_email").val(),
      message_phno: $("#message_phno").val(),
      message_company: $("#message_company").val(),
      message_text: $("#message_text").val(),
      to_email: $("#to_email").val(),
      post_id: $("#post_id").val(),
      submitted: $("#submitted").val()
    };

    var button = $(form).find('#submit');

    var or_txt = button.val();
    console.log(or_txt);
    button.prop('disabled', true).val('Sending');

    $.post(sitesettings.ajaxurl, data, function (res) {
        var resultObj = $.parseJSON(res);
        if(resultObj.result === 'success'){
            $('#success').modal('show');
        }else{
            $('#error').modal('show');
        }
        button.prop('disabled', false).val('Sent');

        setTimeout(function () {
          button.val(or_txt);
        }, 1000);
    });
  }
  $('#ask_quote').validate({
    rules: {
      message_name: {
        required: true,
        minlength: 2
      },

      message_email: {
        required: true,
        email: true
      }
    },

    messages: {
      message_name: "Please fill the required field(Name)",
      message_email: "Please enter a valid email address."
    },

    errorElement: "div",
    errorPlacement: function(error, element) {
      element.after(error);
    },
    submitHandler: ajaxSubmit
  });

  $('.woocommerce-billing-fields .form-row').each(function () {
    var element = jQuery(this);
    var text = element.children('label').text();
    element.children('input').attr('placeholder', text)
  });

  /*------------- cart button------------*/
  $('.add_to_cart_button').on('click',function(){
      var data={action:"cartMenuUpdate"};
      $.post(sitesettings.ajaxurl,data,function(res){
          if($('.item-count').hasClass("display_none"))
          {
            $('.item-count').removeClass("display_none")
          }
          var res=$('.item-count').html();
          res=parseInt(res)+1;
          $('.item-count').html(res);
          var datainner={action:"cartMenuTextUpdate"};
          $.post(sitesettings.ajaxurl,datainner,function(res_amount)
          {
              $('.cart-amount').html(res_amount);
          });

      });
  });

  /*-------------- sticky menu ----------------*/
  var navbar = {
    el: $('.header_area .top_header'),
    height: $('.header_area .top_header').outerHeight()
  };

  $(window).on('scroll', function()
  {
    if($('.sticky-menu').length)
    {
      if ($(window).scrollTop() > navbar.height)
      {
        navbar.el.addClass('sticky-menu-add');
      }
      else
      {
        if(navbar.el.hasClass('sticky-menu-add'))
        {
          navbar.el.removeClass('sticky-menu-add');
        }
      }
    }
  });

  /*-------------- comment form validation --------------------*/
  if($('#commentform').length){
    $('#commentform').validate({
      rules: {
        author: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        comment: {
          required: true,
        }
      },
      messages: {
        author: "Please fill the required field(Name)",
        email: "Please enter a valid email address.",
        comment: "Please fill the required field(Comment)"
      },
      errorElement: "div",
      errorPlacement: function(error, element) {
        element.after(error);
      }
    });
  }

  if($('.owl-carousel-portfolio').length){
    $('.owl-carousel-portfolio').owlCarousel({
      items:1,
      itemsDesktop : [1199,1],
      itemsDesktopSmall: [979 , 1],
      itemsTablet: [768,1],
      itemsMobile: [479 ,1]
    });
  }
  if($('.owl-portfolio-other').length){
    $('.owl-portfolio-other').owlCarousel({
      items:4,
      itemsDesktopSmall: [979 , 3],
      itemsTablet: [768,2],
      itemsMobile: [479 ,1]
    });
  }

  $('.other-member-slider').owlCarousel({
      items: 4,
      autoplay: true,
      pagination: false,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [991,3],
      itemsTablet: [767,3],
      itemsTabletSmall: [650,2],
      itemsMobile : [479,1],
      navigation: true,
      navigationText: ["<i class='fa fa-angle-left'>","<i class='fa fa-angle-right'>"]
    });

   /*--------------- Waypoint -- Animation on scroll  ------------------*/
   var animateClass = 'animated' + ' ';
  function wayPoint() {
    /*------ section Heading-----*/
    $('.section-heading').waypoint(function() {
      $(this).addClass('goforit');
    }, { offset: '70%' });
    $('.animation-print').waypoint(function() {
      $(this).addClass('goforprintAnimation');
    }, { offset: '70%' });
  }
  if (wWidth >= breakpoints.md) { wayPoint(); }

  /*--------------- Go to top button  ------------------*/
  var goup = {
    button: $('.scrollToTop'),
    pageHeight: $('body').height(),
    isShown: false,
    onScroll: function () {
      var check = $('body').scrollTop() > (goup.pageHeight / 2);
      if(check && !goup.isShown){
        goup.button.fadeIn();
        goup.isShown = true;
      }else if(!check && goup.isShown){
        goup.button.fadeOut();
        goup.isShown = false;
      }
    },
    onClick: function () {
      $('html, body').animate({scrollTop: 0});
    }
  }
  if(goup.button.length && wWidth > breakpoints.md){
    $(window).on('scroll', goup.onScroll);
    goup.button.on('click', goup.onClick);
  }

  /*---------- Loader -------------*/
  var hideLoader = function ()
  {
    $('body').removeClass('threed-loading');
    $('.loader-wrapper').fadeOut();
  };
  if($('.threed-loading').length)
  {
    $(window).on('load', hideLoader);
  }

  $('.entry-content').find('img.alignleft, img.alignright').parents('p').css('clear', 'both');
});

function threedShare(sociallink){
  switch(sociallink){
    case 'twitter':
            window.open( 'http://twitter.com/intent/tweet?text='+jQuery(".title-content h2").text() +' '+window.location,
            "twitterWindow",
            "width=650,height=350" );
            break;
    case 'fb':    window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
            'facebookWindow',
            'width=650,height=350');
            break;
    case 'pinterest':
            window.open( 'http://pinterest.com/pin/create/bookmarklet/?media='+ jQuery('.begin-content img').first().attr('src') + '&description='+jQuery('.title-content h2').text()+' '+encodeURIComponent(location.href),
            'pinterestWindow',
            'width=750,height=430, resizable=1');
            break;
    case 'gp'   :
            window.open( 'https://plus.google.com/share?url='+encodeURIComponent(location.href),
            'googleWindow',
            'width=500,height=500');
            break;
    case 'linkedin' :
            window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(location.href)+'&title='+jQuery("h1").text(),
            'linkedinWindow',
            'width=650,height=450, resizable=1');
            break;
  }
  return false;
}

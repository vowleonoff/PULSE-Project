const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
  responsive: {
    376: {
      autoplay: true,
    },
    992: {
      autoplay: false,
    },
  }
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

$(document).ready(function(){

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  
  function toggleSlide(item) {
    $(item).each(function(i){
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');


  // modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function (){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
      $('.overlay, #order').fadeIn('slow');
    })
  });

  // form validation

  function validateForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефон",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Правильный формат почты - name@domain.com"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');


  // masked input

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  //mailer

  $('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) { // Чтобы не отправлять пустые инпуты
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut(); // закрытие окон после исполнения команды
      $('.overlay, #thanks').fadeIn('slow'); // появление спасибо

      $('form').trigger('reset');
    });
    return false;
  });

  // pageup
  $(window).scroll(function() {
    if ($(this). scrollTop() > 1200) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  // smooth scroll
  $("a[href^='#']").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  // wow.js animation
  new WOW().init();

});
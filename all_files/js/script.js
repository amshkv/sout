$(document).ready(function() {
  $('.clients__list').slick({
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $('.header__button').click(function() {
    $('.modal--offer')
      .addClass('active')
      .hide()
      .fadeIn(300);
  });

  $('.modal__close').click(function() {
    $('.modal').fadeOut(300, function() {
      $('.modal').removeClass('active');
    });
  });

  $(document).mouseup(function(e) {
    // событие клика по веб-документу
    var div = $('.modal__inner'); // тут указываем элемента
    if (
      !div.is(e.target) &&
      div.has(e.target).length === 0 &&
      div.is(':visible')
    ) {
      // и не по его дочерним элементам
      $('.modal').fadeOut(300, function() {
        $('.modal').removeClass('active');
      });
    }
  });

  $('.form__input').on('change keyup input click', function() {
    var field = $(this).val();
    var fieldtrim = $.trim(field);
    if (fieldtrim == '') {
      $(this).removeClass('active');
      $(this).val('');
    } else {
      $(this).addClass('active');
    }
  });

  $('#file').on('change', function() {
    if ($(this).val()) {
      $('.form__file-upload').addClass('active');
      $('.form__file-upload-title').text(this.files[0].name);
    } else {
      $('.form__file-upload').removeClass('active');
      $('.form__file-upload-title').text('Выбрать файл');
    }
  });

  $('.form__phone').mask('+7 (999) 999 9999');

  $('.form').submit(function(event) {
    event.preventDefault();

    var $form = $(this),
      $title = $form.attr('data-title'),
      $goal = $form.attr('data-goal'),
      $name = $form.find('.form__name').val(),
      $phone = $form.find('.form__phone').val(),
      $email = $form.find('.form__email').val(),
      $is_agreed = $form.find('.agreement-check').is(':checked'),
      $question = $form.find('.form__question').val(),
      $file_data = $('.form__file').prop('files')[0],
      $form_data = new FormData();

    if ($email) {
      if (!validateEmail($email)) {
        $form
          .find('.form__email')
          .parent()
          .addClass('error');
        return;
      } else {
        $form
          .find('.form__email')
          .parent()
          .removeClass('error');
      }
    }

    $form_data.append('title', $title);
    $form_data.append('name', $name);
    $form_data.append('phone', $phone);
    $form_data.append('email', $email);
    $form_data.append('agreement', $is_agreed);
    $form_data.append('question', $question);

    // $form_data.append('file', $file_data);

    var sendAjaxRequest = function() {
      $.ajax({
        method: 'post',
        url: $form.attr('action'),
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: $form_data,

        success: function() {
          $('.modal')
            .removeClass('active')
            .hide();

          if ($form.hasClass('download-pdf__form')) {
            $('.modal--download-pdf')
              .addClass('active')
              .hide()
              .fadeIn(300);
          } else {
            $('.modal--final')
              .addClass('active')
              .hide()
              .fadeIn(300);
          }

          yaCount($goal);
        }
      });
    };
    if (
      $form.data('aggregatable') &&
      window.aggregate &&
      typeof window.aggregate === 'function'
    ) {
      aggregate($form).finally(sendAjaxRequest);
    } else {
      sendAjaxRequest();
    }
  });
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function yaCount(goal) {
  console.log(goal);
  // yaCounter49126330.reachGoal(goal);
}

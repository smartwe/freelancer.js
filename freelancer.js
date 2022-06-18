/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

jQuery(document).ready(function($) {
    $("#btn-reset").on('click', function(event) {
        event.preventDefault();
        $('.map-img').addClass('hidden');
        $('#total_time').html('0');
    });
    $.post('/api/stage_start', function(data, textStatus, xhr) {
        /*optional stuff to do after success */
    });
    $('area').on('click', function(event) {
        event.preventDefault();
        var _id = $(this).data('id');
        var _val = $('#'+_id).html();
        var _total_time = 0;

        $('.map-img-'+_id).toggleClass('hidden');
        
        $('.map-img').not('.hidden').each(function(index, el) {
            console.log();
            _total_time += Number($(this).data('value'));
        });
        $('#total_time').html(_total_time);
        console.log(_total_time);
    });

    $('#btn-next').on('click', function(event) {
        event.preventDefault();
        var total_time = Number($('#total_time').html());
        console.log(total_time);
        $.ajax({
          url: '/api/check_answer',
          type: 'POST',
          dataType: 'JSON',
          data: {
            user_answer: total_time
          },
          success: function(data, textStatus, xhr) {
            //called when successful
            // console.log(jQuery.parseJSON(textStatus));
            console.log(data);
            if (data.stage == 'end') {
                alert('끝났습니다. 인적사항을 입력해 주세요.');
                $('#contact').removeClass('hidden')
                window.location.href = '#contact';
                return false;
            }
            window.location.href = '/q/index/' + (Number(data.stage) + 1);
            /*
            switch(data.code) {
                case 1:
                    break;
                case 0:
                    
                    break;
            }
            */
            // var result = $.parseJSON(textStatus);
            // console.log(result);
            // alert(result['desc']);
          },
          error: function(xhr, textStatus, errorThrown) {
            //called when there is an error
            console.info(xhr);
          }
        });
        
    });

    $('.sex button').on('click', function(event) {
        event.preventDefault();
        $('#sex').val($(this).val());
    });

    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        console.log($('#school').val());
var nm = $('#name').val();
var sc = $('#school').val();
var sx = $('#sex').val();
if (nm.length < 1 || sc.length < 1 || sx.length < 1) {
    alert('정보를 잘 입력해 주세요.');
    return false;
}
        $.ajax({
          url: '/api/insert_data',
          type: 'POST',
          dataType: 'JSON',
            data: {
                data: {
                    name: $('#name').val(),
                    school: $('#school').val(),
                    sex: $('#sex').val()
                }
            },
          success: function(data, textStatus, xhr) {
            //called when successful
            // console.log(jQuery.parseJSON(textStatus));
            console.log(data);
            if (data.code == 0) {
                alert('비정상 접근으로 에러가 발생했습니다.');
            } else {
                alert('수고하셨습니다.');
            }
            /*
            switch(data.code) {
                case 1:
                    break;
                case 0:
                    
                    break;
            }
            */
            // var result = $.parseJSON(textStatus);
            // console.log(result);
            // alert(result['desc']);
          },
          error: function(xhr, textStatus, errorThrown) {
            //called when there is an error
            console.info(xhr);
          }
        });
    });
});
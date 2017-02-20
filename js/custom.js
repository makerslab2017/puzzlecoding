//모바일 GNB스크립트//
jQuery(document).ready(function() {
  $('#Gnb-downMenu1 span').click(function() {
    $('#Gnb-downMenu1').children('li').toggle()
  })
  $('#Gnb-downMenu2 span').click(function() {
    $('#Gnb-downMenu2').children('li').toggle()
  })
  $('#Gnb-downMenu3 span').click(function() {
    $('#Gnb-downMenu3').children('li').toggle()
  })
    });
jQuery(document).ready(function() {
    $("#gnb-nav-btn").on("click", function() {
      $("#Gnb-frame").addClass("gnb-active");
      $(this).hide();
    });
    $("#gnb-nav-close").on("click", function() {
      $("#Gnb-frame").removeClass("gnb-active");
      $("#gnb-nav-btn").show();
    });
  });
//GNB스크립트//
$(function(){
  $(".zeta-menu li").hover(function() {
    $('ul:first', this).show();
  }, function() {
    $('ul:first', this).hide();
  });
  $(".zeta-menu ul li:has(ul)").find("a:first").append("<p style='float:right;margin:-3px'>&#9656;</p>");
})
//텍스트 입력기 html,text 선택스크립트//
$(function() {
  $(".flex-box-inner span").click(function() {
    if ($(this).hasClass('text-active')) {} else {
      $(".flex-box-inner span").removeClass("text-active");
      $(this).addClass("text-active");
    }
  });
});
//리플 기능 스크립트//
$(function() {
  $(".show-reply").click(function() {
    if ($(this).hasClass('active')) {
      $(".reply").addClass('hidden');
      $(".close-reply").addClass('hidden');
      $(".open-reply").removeClass('hidden');
      $(this).removeClass("active");
    } else {
      $(".open-reply").addClass('hidden');
      $(".close-reply").removeClass('hidden');
      $(".reply").removeClass("hidden");
      $(this).addClass("active");
    }
  });
  $(".reply-colum-2 img").click(function() {
    $(".re-reply").show();
  });
});
//검색 버튼 스크립트//
jQuery(document).ready(function() {
  $(".search_button").on("click", function() {
    if ($(this).hasClass("active")) {
      // $(this).removeClass("active");
      // $(".search-span").removeClass("active");
      // $(".search_wrap").removeClass("active");
      // $("input").removeClass("active");
    } else {
      $(this).addClass("active");
      $(".search_wrap").addClass("active");
      $("input").addClass("active");
      $(".search-span").addClass("active");
    }
  });
});
//
// jQuery(document).ready(function() {
//   $("body").on("click", function() {
// if ($(".search_button").hasClass("active")){
//        $("span").removeClass("active");
//      $(".search-span").removeClass("active");
//        $(".search_wrap").removeClass("active");
//           $(".search_button").removeClass("active");
//      $("input").removeClass("active");
//    }
//   });
// });
//차시 버튼 스크립트//
$(function() {
  $(".chasi ul li").click(function() {
    if ($(this).hasClass('active')) {} else {
      $(".chasi ul li").removeClass("chasi-active");
      $(this).addClass('chasi-active');
    }
  });
});

//차시 페이지 스크립트 //
$(document).ready(function() {
  $("#page_01").show();
  $("#page_02").hide();
  $("#page_03").hide();
  $("#page_04").hide();
  $("#page_05").hide();
  $("#page_06").hide();
  $("#page_07").hide();
  $("#page_08").hide();

  $(".chasi-btn-01").click(function() {
    $("#page_01").show();
    $("#page_02").hide();
    $("#page_03").hide();
    $("#page_04").hide();
    $("#page_05").hide();
    $("#page_06").hide();
    $("#page_07").hide();
    $("#page_08").hide();
  });

  $(".chasi-btn-02").click(function() {
    $("#page_01").hide();
    $("#page_02").show();
    $("#page_03").hide();
    $("#page_04").hide();
    $("#page_05").hide();
    $("#page_06").hide();
    $("#page_07").hide();
    $("#page_08").hide();
  });
});

//진도 현황//
$(document).ready(function() {
  $(".current-playing").hide();

  $(".progress-org li").click(function() {
    $(".ready-playing").show();
    $(".ready-playing", this).hide();
    $(".current-playing").hide();
    $(".current-playing", this).show();
  });
});
//진도 현황-반선택//
$(function() {
  $(".class-name").click(function() {
    if ($(this).hasClass('active')) {} else {
      $(".class-name").removeClass("chasi-active");
      $(this).addClass('chasi-active');
    }
  });
});
// //
$(document).ready(function() {

  $("div.select > a").click(function() {
    $(this).next("ul").toggle();
    return false;
  });

  $("div.select > ul > li").click(function() {
    $(this).parent().hide() //.parent("div.select").children("a").text($(this).text());
    //    $(this).prependTo($(this).parent());
  });
});
//메인슬라이더
$(document).ready(function() {
  $('.slider1').bxSlider({slideWidth: 180, minSlides: 1, maxSlides: 4, slideMargin: 20, moveSlides:1 ,auto:true});

});
//갤러리 드랍다운//
$(document).ready(function() {
  $('.select-label').click(function() {
    $('.dropdown').toggleClass('active');
    $('.dropdown-list li').toggleClass('show');
  });
  $('.dropdown-list li').click(function() {
    $('.select-label').text($(this).text());
    $('.dropdown').removeClass('active');
      $('.dropdown-list li').toggleClass('show');
  });
});
//드랍다운,검색버튼 이외의 버튼을 눌렀을때 disable
$(document).click(function(e) {
    var target = e.target;
    if (!$(target).is('span')) {
        $('.dropdown').removeClass('active');
        $('.dropdown ul li').removeClass('show');
    }
    if (!$(target).is('span')) {
        $('.select ul').hide();
    }
    if ($(target).is('i')||$(target).is('input')){
    }else{
        $('.flex-box-inner span').removeClass('active');
        $('.search_wrap').removeClass('active');
        $('.search-span').removeClass('active');
        $('.search_wrap input').removeClass('active');
        $('.search_button').removeClass('active');
    }
});

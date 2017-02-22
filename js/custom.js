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

function show_progress_page(page_no)
{
    $("[id^=page_0]").hide();
    $("#page_0" + page_no).show();
}

//차시 페이지 스크립트 //
$(document).ready(function() {
  show_progress_page(1);

  $(".chasi-btn-01").click(function() {
    show_progress_page(1);
  });

  $(".chasi-btn-02").click(function() {
    show_progress_page(2);
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
    loadStage(this);
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
// bseo - menu navigation
$(document).ready(function() {
  $('.zeta-menu-bar a img').click(function() {
    window.location = './index.html';
  });
  $('.gnb-info').click(function() {
    window.location = './about-coding-puzzle.html';
  });
  $('.gnb-education').click(function() {
    window.location = './introduce.html';
  });
  $('.gnb-edu').click(function() {
    window.location = './studying.html';
  });
  $('.gnb-edu-progress').click(function() {
    window.location = './progress-status.html';
  });
  $('.gnb-1hour').click(function() {
    window.location = './1hour-coding-game.html';
  });
  $('.gnb-1hour').click(function() {
    window.location = './1hour-coding-game.html';
  });
  $('.gnb-1hour-try').click(function() {
    window.location = './coding-game.html';
  });
  $('.page-map-editor, .gnb-puzzle').click(function() {
    window.location = './puzzle-intro.html';
  });
  $('.gnb-board').click(function() {
    window.location = './board-list.html';
  });  
  $('.gnb-qa').click(function() {
    window.location = './board-list.html';
  });  

});

$.threedbot = function(module) {
  return { 
      TOTAL_MEMORY: 268435456,
      errorhandler: null, compatibilitycheck: null,
      splashStyle: "Light",
      backgroundColor: "#222C36",
      dataUrl:  "./" + module + "/Release/webbuild.data",
      codeUrl:  "./" + module + "/Release/webbuild.js",
      memUrl:   "./" + module + "/Release/webbuild.mem",
      asmUrl:   "./" + module + "/Release/webbuild.asm.js",
      dynamicLoading: false,
      startTime: null,
      stage: 'stage',
      nextObj: null
  };
}
Module = $.threedbot('per_stage');

function load_stage(stage) {
  if (stage == 'latest') {
    var stageData = localStorage.getItem('latestEditedStage');
    Module.SendMessage('Level', 'setLevelWithString', stageData);
  } else {
    Module.SendMessage("Level", 'setLevelWithTransition', '/puzzlecoding/stage/' + stage + '.json');
  }
}

function loadStage(obj) {
  Module.stage = $(obj).attr('data-stage');
  Module.nextObj = $(obj).next()[0];
  
  if (Module.dynamicLoading === false) {
    $.ajax({ url: "./per_stage/Release/UnityLoader.js", dataType: "script", cache: false}).done( function() {
      Module.dynamicLoading = true;
      $.extend(Module, {
        OnMissionComplete: function() {            
          if (Module.nextObj == null) return;
          setTimeout( function() {  loadStage(Module.nextObj); }, 4000);
        },
        onRuntimeInitialized: function() {
          console.log("STARTED");
          Module.startTime = new Date().getTime();
        },
        OnReady: function() {
          console.log("DONE " + (new Date().getTime() - Module.startTime) + " ms") ;
          setTimeout( function() {  loadStage(obj); }, 3000);
        }
      });
    });
  } else {
    load_stage(Module.stage);
  }  
}
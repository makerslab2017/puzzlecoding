//FOUC 스크립트
$(function(){
  $('html').removeClass('no-js');
});
$(document).ready(function() {
    
    $('body').hide();
    $(window).load(function(){
        $('body').show();
        loadModule();
    });
});
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
  $(".text-html .flex-box-inner span").click(function() {
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
      $('.flex-box-inner span').addClass("active");
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
function show_progress_page(page_no)
{
    $("[id^=page_0]").hide();
    $("#page_0" + page_no).show();
    $('.slidePage').empty();
    var unityContainer = $("#page_0" + page_no + " .unityContainer");
    if (unityContainer == null) return;
    if ( unityContainer.find('.emscripten').length > 0) return;
    Module.unityContainer.detach();
    unityContainer.empty().append(Module.unityContainer);
    Module.unityContainer.show();
}



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
    if ($(this).hasClass('active')) {

    } else {
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
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 50,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  });
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
// bseo -
$.threedbot = function(module) {
  return { 
      TOTAL_MEMORY: 402653184, //268435456,
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
      moduleName: module,
      unityContainer: null,
      obj: null,
      nextObj: null
  };
}

var currentPageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
var moduleName = null;
if (currentPageName.startsWith("studying.html")) {
  moduleName = "per_stage";
} else if (currentPageName.startsWith("coding-game.html")) {
  moduleName = "all_in_one";
} else if (currentPageName.startsWith("puzzle-game.html")) {
  moduleName = "editor";
}
var Module = null;
if (moduleName != null) {
  Module = $.threedbot(moduleName);
}
  
function loadStage(obj) {
  if (obj == null) return;
  $(".ready-playing", obj).hide();
  $(".current-playing", obj).show();
  Module.obj = $(obj);
  Module.stage = $(obj).attr('data-stage');
  console.log(Module.stage);
  Module.nextObj = $(obj).next()[0];

  $.get('./stage/' + Module.stage + '.html', function(data) {
    $('.slidePage').empty().append(data);
  });

  if (Module.stage != 'latest' && Module.stage != 'puzzleLatest') {
    Module.SendMessage("Level", 'setLevelWithTransition', './stage/' + Module.stage + '.json');
    return;
  }
  var stageData = localStorage.getItem('latestEditedStage');
  if (stageData == null) return;
  Module.SendMessage('Level', 'setLevelWithString', stageData);
}

function loadModule() {
  if (Module == null) return;
  if (Module.dynamicLoading === true) return;

  // Module is not loaded yet. Please load it first.
  Module.dynamicLoading = true;
  $.ajax({  url: "./" + Module.moduleName + "/Release/UnityLoader.js", 
            dataType: "script", 
            cache: false})
  .done( function() {
    $.extend(Module, {
      OnMissionComplete: function() {  
        if (Module.obj == null) return;
        $(".ready-playing", Module.obj[0]).show();
        $(".current-playing", Module.obj[0]).hide();
        var src = Module.obj.find(".ready-playing").attr('src');
        $(".ready-playing", Module.obj[0]).attr('src', src.replace('.png', '-clear.png'));
        if (Module.nextObj == null) return;
        setTimeout( function() {  loadStage(Module.nextObj); }, 4000);
      },
      onRuntimeInitialized: function() {
        Module.startTime = new Date().getTime();
        setTimeout(function() 
          {
            if (Module.moduleName == 'editor') {
              var puzzle_stage = localStorage.getItem('PuzzleByEditor');
              if (puzzle_stage == null) return;
              if (puzzle_stage == 'puzzleLatest') {
                var stageData = localStorage.getItem('latestEditedStage');
                if (stageData == null) return;
                Module.SendMessage('UI', 'Load', stageData);
                return;
              }
              $.get( './stage/' + puzzle_stage + '.json', function(data) {
                Module.SendMessage('UI', 'Load', JSON.stringify(data));
              });
            }
        }, 5000);
      },
      OnReady: function() {
        if (Module.moduleName === 'per_stage') {
          Module.unityContainer = $('#page_01 .template');
        }
      },
      OnCustomizingComplete: function(name, data) {
        localStorage.setItem('latestCustomizedRobotInfo', data);
      },
      OnEditComplete: function(name, data) {
        localStorage.setItem('latestEditedStage', data);
      }
    });
  });
}

//차시 페이지 스크립트 //
$(document).ready(function() {
  $.ajaxSetup({cache: false});
  if (moduleName == null) return;
  show_progress_page(1);
  $(".chasi ul li").click(function() {
    if ($(this).hasClass('chasi-active')) {
      
    } else {
      $(".chasi ul li").removeClass("chasi-active");
      $(this).addClass('chasi-active');
    }
    show_progress_page($(this).attr('data').match(/\d+/)[0]);
  });
});
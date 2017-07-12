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
	
    console.log( "show_progress_page: " + page_no);
    console.log(Module.unityContainer);
    var unityContainer = $("#page_0" + page_no + " .unityContainer");
    if (unityContainer == null) return;
    //if ( unityContainer.find('#gameContainer').length > 0) return;
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

var currentPageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
var moduleName = null;
if (currentPageName.startsWith("studying") ) {
  moduleName = "per_stage";
} else if (currentPageName.startsWith("coding-game.html")) {
  moduleName = "all_in_one";
} else if (currentPageName.startsWith("puzzle-game.html")) {
  moduleName = "editor";
}

Module = null;

//초급,중급과정 시작 시, 1차시부터 마지막차시 까지 화면에 표시되는것을 막고 기본값인 1차시를 보여준다.
$(document).ready(function() {
	if(currentPageName.startsWith("studying")){
		$("[id^=page_0]").hide();
		$("#page_01").show();
	}
});

function loadStage(obj) {
  if (obj == null) return;
  if(Module.missionCompleteProcess == true) return;
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
    if (Module.robotLoaded == false) {
      Module.SendMessage("UI", 'BotInfoTest', './stage/BotInfo2.json');
      Module.robotLoaded = true;
    }
    return;
  }
  var stageData = localStorage.getItem('latestEditedStage');
  if (stageData == null) return;
  Module.SendMessage('Level', 'setLevelWithString', stageData);
}

function loadModule() {
  if (Module !== null && Module.dynamicLoading === true) return;

  // Module is not loaded yet. Please load it first.
  $.ajax({  url: "./" + moduleName + "/Build/UnityLoader.js", 
            dataType: "script", 
            cache: false})
  .done( function() {
    Module = UnityLoader.instantiate("gameContainer", "./" + moduleName + "/Build/" + moduleName + ".json");
    $.extend(Module, {
      dynamicLoading : true,
      startTime : null,
      stage :'stage',
      moduleName : moduleName,
      unityContainer : null,
      obj : null,
      nextObj : null,
      robotLoaded : false,
	  missionCompleteProcess : false,
      OnMissionComplete: function() {
        if (Module.obj == null) return;
		missionCompleteProcess = true;
        $(".ready-playing", Module.obj[0]).show();
        $(".current-playing", Module.obj[0]).hide();
        var src = Module.obj.find(".ready-playing").attr('src');
        $(".ready-playing", Module.obj[0]).attr('src', src.replace('.png', '-clear.png'));
		missionCompleteProcess = false;
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
                $('.making-puzzle input').val('가장 최근 편집된 퍼즐');
                var stageData = localStorage.getItem('latestEditedStage');
                if (stageData == null) return;
                Module.SendMessage('UI', 'Load', stageData);
                return;
              }
              $('.making-puzzle input').val(puzzle_stage);
              $.get( './stage/' + puzzle_stage + '.json', function(data) {
                Module.SendMessage('UI', 'Load', JSON.stringify(data));
              });
            }
        }, 10000);
      },
      OnReady: function() {
        if (Module.moduleName === 'per_stage') {
          Module.unityContainer = $('#page_01 .webgl-content');
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
  //show_progress_page(1);
  $(".chasi ul li").click(function() {
    if ($(this).hasClass('chasi-active')) {
      
    } else {
      $(".chasi ul li").removeClass("chasi-active");
      $(this).addClass('chasi-active');
    }
    show_progress_page($(this).attr('data').match(/\d+/)[0]);
  });
});

function displayText(){

	var val =Math.floor(Math.random() * 4);
	//랜덤 텍스트 배열
	var textArr = new Array("한단계 높은 타일로 이동하거나, 낮은 타일로 이동할 때는 모두 점프 명령어를 사용해야 합니다.", "남은 오염타일이나 시추기 로봇이 있으면 귀환할 수 없어요.", "출발 타일에 따라 달라지는 로봇의 방향을 잘 확인해 주세요.", "배치한 명령어가 로봇을 어디 까지 움직일지 잘 모를 때에는 일단 플레이 버튼을 눌러보세요.");
	var myText = textArr[val];

	var div = document.getElementById("gameText");
	div.textContent = myText;

}
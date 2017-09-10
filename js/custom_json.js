
var	missionCompleteProcess = false;
var gamePlayingProcess = false;
var onUnityLoad = false;

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




Module = null;
var course_info = null;

var moduleName = null;

var currentPageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
if (currentPageName.startsWith("studying") )        moduleName = "per_stage";
if (currentPageName.startsWith("coding-game.html")) moduleName = "all_in_one";
if (currentPageName.startsWith("puzzle-game.html")) moduleName = "editor";

function loadModule() 
{
  if (Module !== null && Module.dynamicLoading === true) return;

  if (moduleName == null) return;

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
      obj : null,
      robotLoaded : false,
      OnMissionComplete: function() {
        if (Module.obj == null) return;
		    missionCompleteProcess = true;
        $(".stage-progress", Module.obj[0]).attr('src', 'img/normal-clear.png');
		    missionCompleteProcess = false;
        
        // move to a next mission
        var $next = $('.progress-org img[src="img/normal.png"]').first();
        if ($next) {
            $next.attr('src', 'img/current-status.png');
            course.loadStage($next.parent()[0]);
        }
      },
      onRuntimeInitialized: function() {
        Module.startTime = new Date().getTime();
        setTimeout(function() {
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
          onUnityLoad = true;
          if (Module.obj == null) return;

          // just in case if someone clicked one of stages already, load it generously.
          if ( $(Module.obj).attr('src') === 'img/current-status.png')
            course.loadStage(Module.obj);
        }
      },
      OnPuzzleReady: function() {
        onUnityLoad = true;
      },
      OnPuzzlePrepare: function() {
        onUnityLoad = false;
      },
      OnCustomizingComplete: function(name, data) {
        localStorage.setItem('latestCustomizedRobotInfo', data);
      },
      OnEditComplete: function(name, data) {
        localStorage.setItem('latestEditedStage', data);
      },
      OnGamePlaying: function() {
        gamePlayingProcess = true;
      },
      OnGameStop: function() {
        gamePlayingProcess = false;
      },
      SendPuzzleInfo: function() {
        Module.SendMessage("GameManager","getStageInfo", Module.stage);
      }
    }); // end of $.extend
  }); // end of $.ajax done function callback
} // end of loadModule()

const course = {
  info: null,
  buildCourseInfo: (info) => {
      $('#course_text').text( info.title );
      $('#course_info .status-page-title').text( info.title);
      $('#course_info .intro-element-title').text( info.introduction );
      $('#course_info .lh2').text( info.description );
  },
  buildLesson: (target, key, value) => {
      $("<li/>", {
          html : '<div class="chasi-child"><img src="img/chasi-1.png" alt="차시이미지" class="unselected"><img src="img/chasi-2.png" alt="차시이미지" class="selected"></div>' + value.title
      }).attr({"data": key}).appendTo(target);
  },
  buildStages: (target, lesson) => {
      $('<h2/>', { html: lesson.title }).appendTo(target);
      $('<h3/>', { html: lesson.description }).appendTo(target);
      $('<div/>', {class: 'progress-wrapper'}).appendTo(target);
      $('<ul/>', {class: 'progress-org'}).appendTo(target + ' .progress-wrapper');
      $.each(lesson.stages, (key, value)=> {
          $("<li/>", {
              html: '<img src="img/normal.png" alt="진도현황-1" class="stage-progress">'
          }).attr({"data-stage": value }).appendTo(target + ' .progress-org');
      });

      $(".progress-org li").on('click', function() {
          if(missionCompleteProcess == false && gamePlayingProcess == false)
          {
              $('.progress-org img[src="img/current-status.png"]').attr('src', 'img/normal.png');                
              $(".stage-progress", this).attr('src', 'img/current-status.png');
              course.loadStage(this);
          }
      } );
  },
  loadStage: (obj) => {
      if (obj == null) return;
      if(Module.missionCompleteProcess == true) return;

      
      Module.obj = $(obj);
      Module.stage = $(obj).attr('data-stage');
      console.log(Module.stage);
      
      $.get('./stage/' + Module.stage + '.html', function(data) {
          $('.slidePage').empty().append(data);
          $('.chasi-info-prev').on('click', function() { $('.carousel').carousel('prev');});
          $('.chasi-info-next').on('click', function() { $('.carousel').carousel('next');});
          $('.carousel-indicators > li').on('click', function() { 
              $('.carousel').carousel( $(this).parent('.carousel-indicators').find('li').index( $(this) ) );
          });
        
          if ($('.carousel-indicators > li:visible').length == 1) {
              $('.carousel-indicators').empty();
          }
          course.displayHelpRandomly();
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
  },
  showLesson: (lesson) => {
      $('.chasi-progress').empty();
      $('.slidePage').empty();
      course.buildStages('.chasi-progress', lesson);
  },
  displayHelpRandomly: () => {
      //랜덤 텍스트 배열
      var textArr = [
              "한단계 높은 타일로 이동하거나, 낮은 타일로 이동할 때는 모두 점프 명령어를 사용해야 합니다.", 
              "남은 오염타일이나 시추기 로봇이 있으면 귀환할 수 없어요.", 
              "출발 타일에 따라 달라지는 로봇의 방향을 잘 확인해 주세요.", 
              "배치한 명령어가 로봇을 어디 까지 움직일지 잘 모를 때에는 일단 플레이 버튼을 눌러보세요."
      ];
      var myText = textArr[Math.floor(Math.random() * textArr.length)];
  
      $('.gameTextRandom').html(myText);
  },
  loadCourse: (course_id) => {
      $.getJSON( course_id, course.loadCourseData ).error(function() {
        $.getJSON( 'https://me5w1vvmz1.execute-api.us-east-1.amazonaws.com/test/courses/' + course_id, course.loadCourseData);
      });
  },
  loadCourseData: (data) => {
    course_info = data;
    course.buildCourseInfo(course_info);    
    $.each( course_info.lessons, (key, value)=> {
        course.buildLesson('.chasi ul', key, value);
        course.buildStages('.chasi-progress', value);
    });
    var firstLesson;
    for (var key in course_info.lessons) {
      if (course_info.lessons.hasOwnProperty(key)) {
        course.showLesson(course_info.lessons[key]);
        break;
      }
    }
    $(".chasi ul li").first().addClass('chasi-active');

    $(".chasi ul li").click(function() {
      // if(onUnityLoad ==false) return;
        if ($(this).hasClass('chasi-active') == false) {
            $(".chasi ul li").removeClass("chasi-active");
            $(this).addClass('chasi-active');
        }	
        course.showLesson(course_info.lessons[$(this).attr('data')] );
    });
  },
  parseInput: () => {
    console.log(document.location.search);
    queries = {};
    $.each(document.location.search.substr(1).split('&'), function(c,q){
      var i = q.split('=');
      if (i.length === 2) {
        queries[i[0].toString()] = i[1].toString();
      }
    });
    if (queries.hasOwnProperty('course')) 
      course.loadCourse( queries.course );
    else 
      course.loadCourse( 'courses/elementary.json');

    // you may want to load from course id
    //course.loadCourse( 'c4924670-9537-11e7-963b-93073b4ef4e7' );
  }
};

//차시 페이지 스크립트 //
$(document).ready(function() {
  $.ajaxSetup({cache: false});
  if (moduleName == null) return;

  course.parseInput();    
});
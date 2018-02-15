
var	missionCompleteProcess = false;
var gamePlayingProcess = false;
var onUnityLoad = false;

function configureMenu()
{ 
  // configure zeta menu bar and dropdown menus.
  /*$(".zeta-menu li").hover(function() {
    $('ul:first', this).show();
  }, function() {
    $('ul:first', this).hide();
  });*/
  $(".zeta-menu ul li:has(ul)").find("a:first").append("<p style='float:right;margin:-3px'>&#9656;</p>");

  //모바일 GNB스크립트//
  $('#Gnb-downMenu1 span').click(function() {
    $('#Gnb-downMenu1').children('li').toggle();
    switch (puzzleAPI.user_type) {
      case 'student':
        $('#Gnb-downMenu1 .for-educator').hide();
        $('#Gnb-downMenu1 .for-student').show();
        break;
      case 'educator':
        $('#Gnb-downMenu1 .for-student').hide();
        $('#Gnb-downMenu1 .for-educator').show();        
        break;
      
      default:
        $('.not-for-non-member').hide();
        $('#Gnb-downMenu1 .for-student').show();
        $('#Gnb-downMenu1 .for-educator').show();  
        break;
    }    
  });
  $('#Gnb-downMenu2 span').click(function() {
    $('#Gnb-downMenu2').children('li').toggle()
  });
  $('#Gnb-downMenu3 span').click(function() {
    $('#Gnb-downMenu3').children('li').toggle()
  });
  $("#gnb-nav-btn").on("click", function() {
    $("#Gnb-frame").addClass("gnb-active");
    $(this).hide();
  });
  $("#gnb-nav-close").on("click", function() {
    $("#Gnb-frame").removeClass("gnb-active");
    $("#gnb-nav-btn").show();
  });

  $(".text-html .flex-box-inner span").click(function() {
    if ($(this).hasClass('text-active')) {} else {
      $(".flex-box-inner span").removeClass("text-active");
      $(this).addClass("text-active");
    }
  });

}


//Main Script
$(function(){
  $('html').removeClass('no-js');
});
$(document).ready(function() {
  $('body').hide();
  $.get('header.html', function(data) {
    $('body').prepend(data);
    puzzleAPI.currentUser();
    puzzleAPI.refreshPage();  
    configureMenu();
    $.get('footer.html', function(data) {
      $('footer').html(data);
      $('body').show();
    })
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
$(document).ready(function() {
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

$(function() {
  $(".class-name").click(function() {
    if ($(this).hasClass('active')) {
    } 
    else {
      $(".class-name").removeClass("chasi-active");
      $(this).addClass('chasi-active');      
    }
  });
});

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

$(document).ready(function() {
	
	//IsMobile Plugin
	$.extend({
		IsMobile: (function () {
			var mobileArr= new Array("iPhone", "iPod","iPad", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson"),
				navg;
			var check= (function () {
				$.support.touch = 'ontouchend' in document;
				for(var txt in mobileArr){
				    if(navigator.userAgent.match(mobileArr[txt]) != null){
				    	navg= mobileArr[txt];
				    	return true;
				        break;
				    }
				}
				return false;
			})();
			return {
		    	is: check,
		    	nav: navg,
		    	SetEvt: function (pc,mobile) {
		    		return check ? mobile : pc;
		    	},
		    	click: check ? 'touchend' : 'click'
		    };
		})(),
		isBrowserCheck: function() {
			var agt = navigator.userAgent.toLowerCase();
			if (agt.indexOf("edge") != -1) return 'Edge';
			if (agt.indexOf("chrome") != -1) return 'Chrome';
			if (agt.indexOf("opera") != -1) return 'Opera';
			if (agt.indexOf("staroffice") != -1) return 'Star Office';
			if (agt.indexOf("webtv") != -1) return 'WebTV';
			if (agt.indexOf("beonex") != -1) return 'Beonex';
			if (agt.indexOf("chimera") != -1) return 'Chimera';
			if (agt.indexOf("netpositive") != -1) return 'NetPositive';
			if (agt.indexOf("phoenix") != -1) return 'Phoenix';
			if (agt.indexOf("firefox") != -1) return 'Firefox';
			if (agt.indexOf("safari") != -1) return 'Safari';
			if (agt.indexOf("skipstone") != -1) return 'SkipStone';
			if (agt.indexOf("netscape") != -1) return 'Netscape';
			if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
			
			if (agt.indexOf("msie") != -1) { // 익스플로러 일 경우 
				var rv = -1;
				if (navigator.appName == 'Microsoft Internet Explorer') {
					var ua = navigator.userAgent;
					var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
				} return 'Internet Explorer '+rv; 
			}
		}
	});
	
  //window.onload = function(){    
  var bannerLeft=0;
  var first=1;
  var last;
  var imgCnt=0;
  var $img = $(".banner_wrapper img");
  var $first;
  var $last;

  $img.each(function(){   // 5px 간격으로 배너 처음 위치 시킴
    $(this).css("left",bannerLeft);
    bannerLeft += $(this).width() + 17;
    $(this).attr("id", "banner"+(++imgCnt));  // img에 id 속성 추가
  });

  $img.each(function(){
    if( imgCnt >7 ){
      $(this).css("position","absolute");
    }    
    else{
      $(this).css("position","relative");
      bannerLeft =0;
      $(this).css("left",bannerLeft);
      bannerLeft += 17;
    }
  });
  
  if( imgCnt > 7){                //배너 8개 이상이면 이동시킴

      last = imgCnt;
      
      setInterval(function() {
          $img.each(function(){
              $(this).css("left", $(this).position().left - 1); // 1px씩 왼쪽으로 이동
          });
          $first = $("#banner"+first);
          $last = $("#banner"+last);          
          if($first.position().left < -200) {    // 제일 앞에 배너 제일 뒤로 옮김
              $first.css("left", $last.position().left + $last.width()+17 );
              first++;
              last++;
              if(last > imgCnt) { last=1; }   
              if(first > imgCnt) { first=1; }
          }
      }, 50);   //여기 값을 조정하면 속도를 조정할 수 있다.(위에 1px 이동하는 부분도 조정하면 깔끔하게 변경가능하다   
  }
});


//출처: http://ssamlee.tistory.com/13 [쌈리군's life story]

//갤러리 드랍다운//
/*
$(document).ready(function() {
  $('.select-label').click(function() {
    
  });
  $('.dropdown-list li').click(function() {
    $('.select-label').text($(this).text());
    $('.dropdown').removeClass('active');
      $('.dropdown-list li').toggleClass('show');
  });
});*/

$(document).on('click', '.select-label', function() {
  $('.dropdown').toggleClass('active');
  $('.dropdown-list li').toggleClass('show');
});

$(document).on('click', '.dropdown-list li', function() {
  $('.select-label').text($(this).text());
  $('.dropdown').removeClass('active');
  $('.dropdown-list li').toggleClass('show');
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


//
// CODINGPUZZLE SPECIFIC JAVASCRIPT OBJECTS
//
//

Module = null;

var moduleName = null;

var currentPageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
if (currentPageName.startsWith("studying") )    moduleName = "per_stage";
if (currentPageName.startsWith("coding-game"))  moduleName = "all_in_one";
if (currentPageName.startsWith("puzzle-game"))  moduleName = "editor";
if (currentPageName.startsWith("puzzle-view"))  moduleName = "per_stage";

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
      moduleName : moduleName,
      robotLoaded : false,
      OnMissionComplete: function() {
        
        if (currentPageName.startsWith("puzzle-view")) {
          current_puzzle_id = localStorage.getItem('currentPuzzleId');
          if (current_puzzle_id == null) return;
          puzzleAPI.recordPuzzleLog(current_puzzle_id, ()=> {
            $('#n-completed-users').text( parseInt($('#n-completed-users').text()) + 1 );
          }, "completed");
          return;
        }

        if (course.current_puzzle_id == null) return;
        missionCompleteProcess = true;
        
        $(".progress-org li[data-stage=" + course.current_puzzle_id +"]").children('.stage-progress').attr('src', 'img/normal-clear.png');
        if (course.progress_info == null) {
          course.progress_info = {};  
        }
        course.progress_info[course.current_puzzle_id] = "completed";
        if (currentPageName.startsWith("studying")) {
          puzzleAPI.recordProgress();
        }
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
              var stageData = localStorage.getItem('latestEditedPuzzle');
              if (stageData == null) return;
              Module.loadPuzzleData(JSON.stringify(stageData));
              return;
            }
            $('.making-puzzle input').val(puzzle_stage);
            $.get( 'puzzles/' + puzzle_stage + '.json', function(data) {
              Module.loadPuzzleData(JSON.stringify(data));
            });
          }
        }, 10000);
      },
      OnReadyPostprocess: ()=> {
        var puzzle_id = localStorage.getItem("currentPuzzleId");
        if (puzzle_id == null) return;
        Module.loadPuzzle( puzzle_id);
      },
      OnReady: function() {
        if (Module.moduleName === 'per_stage') { 
          onUnityLoad = true;
          Module.OnReadyPostprocess();
          if (course.current_puzzle_id == null) return;

          // just in case if someone clicked one of stages already, load it generously.
          var obj = $("li[data-stage=" + course.current_puzzle_id +"]");
          if (obj.children(".stage-progress").attr('src') === 'img/current-status.png')
            course.loadStage(obj[0]);
          return;
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
        localStorage.setItem('latestEditedPuzzle', data); //by editor
      },
      OnGamePlaying: function() {
        gamePlayingProcess = true;
      },
      OnGameStop: function() {
        gamePlayingProcess = false;
      },
      OnLoad: function(name) {
        localStorage.getItem('latestEditedPuzzle');
      },
      SendPuzzleInfo: function() {
        if (currentPageName.startsWith("studying")) {
          Module.SendMessage("GameManager","getStageInfo", course.current_puzzle_id);
          return;
        } 
        if (currentPageName.startsWith("puzzle-view")) {
          if (localStorage.getItem('currentPuzzleId') == null) return;
          Module.SendMessage("GameManager","getStageInfo", 
                  localStorage.getItem('currentPuzzleId'));
          return;
        }
      },
      loadPuzzle: (puzzle_id) => {
        $.getJSON( 'puzzles/' + puzzle_id + '.json', (data)=> {
          Module.SendMessage('Level', 'setLevelWithTransition', 'puzzles/' + puzzle_id + '.json');
          course.current_puzzle_id = puzzle_id;
        }).error(function() {
          $.ajax( { type: 'GET', url: puzzleAPI.apiUrl + 'puzzles/' + puzzle_id + '?type=all',
              success: (data)=> {
                course.current_puzzle_id = puzzle_id;
                Module.loadPuzzleData(data);
              }
            });
        });
      },
      loadPuzzleData: (puzzle_data) => {
        missionCompleteProcess = false;
        if (puzzle_data == null) return;
        Module.SendMessage('Level', 'setLevelWithString', JSON.stringify(puzzle_data));
      },
      loadRobot: (robot_id) => {
        if (robot_id == null) {
          Module.SendMessage("UI", 'BotInfoTest', robot_id ? robot_id : 'puzzles/BotInfo2.json');
        }
        Module.robotLoaded = true;
      }
    }); // end of $.extend
  }); // end of $.ajax done function callback
} // end of loadModule()

const course = {
  id: null,
  info: null,
  current_puzzle_id: null,
  progress_info: null,
  buildCourseInfo: (info) => {
    course.info = info;
    $('#course_text').text( info.title );
    $('#subpage-top-wrap .status-page-title').text( info.title);
    $('#subpage-top-wrap .intro-element-title').text( info.introduction );
    $('#course_info .lh2').text( info.description );      
  },
  buildLesson: (target, key, value) => {
      $("<li/>", {
          html : '<div class="chasi-child"><img alt="단원이미지" ></div><div>' + value.title + '</div>'
      }).attr({"data": key}).appendTo(target);
  },
  buildStages: (target, lesson) => {
    $('<h2/>', { html: lesson.title }).appendTo(target);
    $('<h3/>', { html: lesson.description }).appendTo(target);
    $('<div/>', {class: 'progress-wrapper'}).appendTo(target);
    $('<ul/>', {class: 'progress-org'}).appendTo(target + ' .progress-wrapper');
    $.each(lesson.stages, (key, value)=> {
      var src = "img/normal.png";
      if (course.progress_info && course.progress_info.hasOwnProperty(value)) {
        if (course.progress_info[value] == "completed")
          src = "img/normal-clear.png";
      }
      $("<li/>", {
          html: '<img src="' + src + '" alt="진도현황-1" class="stage-progress">'
      }).attr({"data-stage": value }).appendTo(target + ' .progress-org');
    });
  },
  loadStage: (obj) => {
      if (obj == null) return;
      if(missionCompleteProcess == true) return;

      course.current_puzzle_id = $(obj).attr('data-stage');
      console.log(course.current_puzzle_id);
      
      $.get('puzzles/' + course.current_puzzle_id + '.html', function(data) {
          $('.slidePage').empty().append(data);
          if ($('.carousel-indicators > li:visible').length <= 1) {
            $('.carousel-indicators').empty();
            $('.chasi-info-prev').hide();
            $('.chasi-info-next').hide();
          }
          course.displayHelpRandomly();
          
      });
      
      if (course.current_puzzle_id && course.current_puzzle_id != 'latest' && course.current_puzzle_id != 'puzzleLatest') {
        if (Module) {
          Module.loadPuzzle(course.current_puzzle_id);
          if (Module.robotLoaded == false)
            Module.loadRobot();
          return;
        }
      }
      var stageData = localStorage.getItem('latestEditedStage');
      if (stageData == null) return;
      if (Module) Module.loadPuzzleData(stageData);
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
      // character info array
      var characters = [ "img/character.png", "img/character-2.png" ];

      var myText = textArr[Math.floor(Math.random() * textArr.length)];
      var mySrc = characters[Math.floor(Math.random() * 2)];

      $('.chasi-info-character').find("img").attr('src', mySrc);
      $('#characterImg').attr('src', mySrc );  
      $('.gameTextRandom').html(myText);
  },
  loadCourse: (course_id) => {
    course.id = course_id;
    $.getJSON( 'courses/' + course_id, course.loadCourseData ).error(function() {
      $.getJSON( puzzleAPI.apiUrl + 'courses/' + course_id, course.loadCourseData);
    });
  },
  postloadCourseData: (course_info) => {
    $('.chasi ul').empty();
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
  },
  loadCourseData: (course_info) => {
    course.buildCourseInfo(course_info);

    if (course.id == null) return;
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser == null) {
      course.postloadCourseData(course_info);
      return;
    }
    // fetch progress information
    $.ajax( { type: 'GET', url: puzzleAPI.apiUrl + 'progress/' + course.id,
      headers: { 'Authorization' : puzzleAPI.token },
      success: (data) => {
        course.progress_info = data.progress;
        course.postloadCourseData(course_info);
      },
      fail: (err) => {
        course.progress_info = {};
      }
    });
  }
};

//차시 페이지 스크립트 //
$(document).ready(function() {
  $.ajaxSetup({cache: false});
  if (moduleName == null) return;

  if (currentPageName.startsWith("studying") ) {
    course_id = puzzleAPI.parseInput('course');
    if (course_id) course.loadCourse( course_id);
    else course.loadCourse( 'elementary');
  }
  if (currentPageName.startsWith("puzzle-view")) {
    puzzle_id = puzzleAPI.parseInput('puzzle');
    if (puzzle_id == null) {
      localStorage.removeItem( "currentPuzzleId" );
      return;
    }
    localStorage.setItem( "currentPuzzleId", puzzle_id);
    $.getJSON( 'puzzles/' + puzzle_id +'.json', (data)=> {
      $('#puzzle-title').text( puzzle_id );
      $('#puzzle-owner').text( '관리자' );
    } ).error(function() {
      $.ajax( { type: 'GET', url: puzzleAPI.apiUrl + 'puzzles/' + puzzle_id + '?type=info',
        processData: false,
        success: (data)=> {
          $('#puzzle-title').text( data.title );
          
          if (data.description != null && data.description.length > 0) {
            $('#puzzle-description').html( DOMPurify.sanitize( data.description ) );
          }
          else 
            $('#puzzle-description').html( "" );

          $('#puzzle-owner').text( data.owner );
          $('#puzzle-date').text( new Date(data.timestamp).toLocaleString() );
          $('#n-completed-users').text(data.n_solved);

          $.ajax( { type: 'GET', url: puzzleAPI.apiUrl + 'puzzles/' + puzzle_id + '?type=thumbnail', 
            processData: false,
            contentType: 'image/png'
          }).done(function(data) {
            $('#puzzle-thumbnail').attr('src', 'https://codingpuzzle.org/puzzles/thumbnails/' + puzzle_id);
          }).fail(function() {             
          }).always(function() {
            moduleName = "per_stage";
            if (Module == null) loadModule();
          });
        }
      });
    });
  }
});



/* following two functions are necessary to enable or disable keyboard focus to unity webbuild.
 * otherwise, all keyboard inputs are delivered to unity NOT any web elements.
 */
$(document).on('click', ':not(canvas)', function(e) {  
  e.stopPropagation();
  if (Module == null) return;
  Module.SendMessage("UI", "ToggleInput", 0);
});
$(document).on('click', 'canvas', function(e) {  
  e.stopPropagation();
  if (Module == null) return;
  Module.SendMessage("UI", "ToggleInput", 1);
});

$(document).on('click', '.puzzlecoding button', function() {
  window.location.href = '_sign_' + $(this).attr('data-type') + '.html';
});

$(document).on('click', ".chasi ul li", function(e) {  
	var body= $('body'),
		fixedPopup= $('#fixed-popup'),
		target= fixedPopup.find('.target'),
		isMobile= $.IsMobile.is,
		isBrowser= $.isBrowserCheck(),
		closeBtn= fixedPopup.find('.btn');
	
	closeBtn.on('click', function(e) {
		body[0].style.overflow= 'visible';
		fixedPopup[0].style.display= 'none';
	});
	if(isMobile) {
		popUp('모바일 혹은 테블릿');
		return;
	}
	if(isBrowser !== 'Chrome') {
		popUp('크롬이외의 브라우저');
		return;
	}
	function popUp( str ) {
		body[0].style.overflow= 'hidden';
		target[0].innerHTML= str;
		fixedPopup[0].style.display= 'block';
	}

  if ($(this).hasClass('chasi-active') == true) return;

  /* BUG fix : BY beomjoo90 2018.1.18
   * after completing all stages, user couldn't direct to any completed lessons.
   * To solve this bug, I examined whether a previous lesson was completed when a user click a lesson.
   */
  var $prev = $(this).prev();
  if ($prev.length > 0) {
    var lesson = $prev.attr('data');
    var stages = course.info.lessons[lesson].stages;
    for (i=0; i< stages.length; i++) {
      if (!course.progress_info.hasOwnProperty(stages[i]) || course.progress_info[stages[i]] !== "completed") {
        swal("이전 단원의 모든 미션을 완수해야 다음 단원으로 넘어갈 수 있습니다.");
        return;
      }
    }
  }
  
  $(".chasi ul li").removeClass("chasi-active");
  $(e.currentTarget).addClass('chasi-active');
  course.showLesson(course.info.lessons[$(e.currentTarget).attr('data')] );  
});

$(document).on('click', ".progress-org li", function(e) {
  if (Module == null) loadModule();
  if(missionCompleteProcess == false && gamePlayingProcess == false)
  {
      $('.progress-org img[src="img/current-status.png"]').attr('src', 'img/normal.png');
      $(e.currentTarget).children(".stage-progress").attr('src', 'img/current-status.png');
      console.log(e.currentTarget);
      course.loadStage(e.currentTarget);
  }
});

$(document).on('click', '.chasi-info-prev', function() { $('.carousel').carousel('prev');});
$(document).on('click', '.chasi-info-next', function() { $('.carousel').carousel('next');});
$(document).on('click', '.carousel-indicators > li', function() { 
    $('.carousel').carousel( $(this).parent('.carousel-indicators').find('li').index( $(this) ) );
});


AWSCognito.config.region = CognitoConfig.region;
AWSCognito.config.update({accessKeyId: 'null', secretAccessKey: 'null'});
const puzzleAPI = {
  apiUrl: 'https://me5w1vvmz1.execute-api.us-east-1.amazonaws.com/test/',  
  cognitoUser: null,
  credentials: null,
  user_type: null,
  userPool : new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool( {
    UserPoolId: CognitoConfig.userPoolId, ClientId: CognitoConfig.appClientId 
  }),
  token: null,
  checkAvailability: (candidate_id) => {
    $.ajax( { type: 'GET', url: puzzleAPI.apiUrl + 'users/' + candidate_id,
      processData: false,
      success: (data)=> {
        console.log(data);
        $('#checkbox_available_id').html( 
          data["is_available"] == true ? "<i class='material-icons'>check</i>" : ""
        );
      }
    });
  },
  parseInput: ( key ) => {
    queries = {};
    $.each(document.location.search.substr(1).split('&'), function(c,q){
      var i = q.split('=');
      if (i.length === 2) {
        queries[i[0].toString()] = i[1].toString();
      }
    });
    if (queries.hasOwnProperty(key)) 
      return queries[key];      
    return null;
  },
  signUp: (userId, userPhoneNumber, userPasswd, email, type='educator', course_id = '') => {
    if (userId == null || userPhoneNumber == null || userPasswd == null || email == null) {
      swal('등록 요청이 잘못되었습니다. 다시 확인해보세요.');
      return;
    }        
    var attributeList = [ 
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute( { Name: 'email', Value: email } ),
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute( { Name: 'phone_number', Value: userPhoneNumber } ),
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute( { Name: 'custom:role', Value: type } ),
      new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute( { Name: 'custom:ReferredClassId', Value: course_id })
    ];        
    puzzleAPI.userPool.signUp(userId, userPasswd, attributeList, null, function(err, result) {
        if (err) {
          swal(err);
          return;
        }
        puzzleAPI.cognitoUser = result.user;
        if (type == 'educator')
          $('#confirm_admission').css('visibility', 'visible');
        else 
          window.location.href = 'index.html';
    });
  },
  confirm: (activateCode) => {
    if (puzzleAPI.cognitoUser == null) {
      swal("등록이 완료되지 않았습니다.");
      return;
    }
    puzzleAPI.cognitoUser.confirmRegistration(activateCode, true, function(err, result) {
      if (err) {
        swal('인증번호가 틀렸습니다. 다시 입력하세요.');
        return;
      }
      window.location.href = 'index.html';
    });
  },
  login: (userId, userPasswd)=> {
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser != null) return;
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(
      { Username: userId, Password: userPasswd } );
    puzzleAPI.cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser( {Username: userId, Pool: puzzleAPI.userPool} );
    puzzleAPI.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        puzzleAPI.currentUser();
            
        $('#Gnb-profile-info span:nth-child(1)').text( puzzleAPI.cognitoUser.getUsername());
        $('#Gnb-menu .login img').attr('src', puzzleAPI.cognitoUser ? 'img/logout.png' : 'img/login.png');
        if (currentPageName.startsWith("studying")) {
          puzzleAPI.refreshPage();
          course_id = puzzleAPI.parseInput('course');
          if (course_id) course.loadCourse( course_id);
          else course.loadCourse( 'elementary');
        }
      },
      onFailure: function(result) {
        puzzleAPI.cognitoUser = null;
        puzzleAPI.token = null;
        puzzleAPI.user_type = null;
        swal('잘못된 사용자 아이디이거나 틀린 비밀번호입니다.');
      },
      mfaRequired: function(codeDeliveryDetails) {
        var verificationCode = prompt('Please input verification code', '');
        puzzleAPI.cognitoUser.sendMFACode(verificationCode, this);
      }
    });
  },
  forgot: (userId) => {
    puzzleAPI.cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser( {Username: userId, Pool: puzzleAPI.userPool} );
    puzzleAPI.cognitoUser.forgotPassword( {
      onSuccess: function(result) {
        console.log('call result: ' + result);
      },
      onFailure: function(err) {
        puzzleAPI.cognitoUser = null;
        puzzleAPI.token = null;
        swal(err);
      },
      inputVerificationCode() {
        var verificationCode = prompt('Please enter your verification code ', '');
        var newPassword = prompt('Enter new Password ', '' );
        puzzleAPI.cognitoUser.confirmPassword(verificationCode, newPassword, this);
      }
    });
  },
  
  currentUser: () => {
    puzzleAPI.cognitoUser = puzzleAPI.userPool.getCurrentUser();
    if (puzzleAPI.cognitoUser == null) {      
      return;
    }
    
    puzzleAPI.cognitoUser.getSession(function(err, session) {
      if (err || session.isValid() == false) return;

      puzzleAPI.token = session.getIdToken().getJwtToken();
      login_addr = "cognito-idp." + CognitoConfig.region + '.amazonaws.com/' + CognitoConfig.userPoolId + "'";
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: CognitoConfig.userPoolId,
        Logins: {
          login_addr : puzzleAPI.token
        }
      });
      puzzleAPI.credentials = AWS.config.credentials;
      if (puzzleAPI.user_type == null) {
        puzzleAPI.cognitoUser.getUserAttributes((err,res)=> {
          if (err) {
            swal('사용자의 추가 정보를 찾을 수 없습니다.');
            return;
          }
          for (i=0; i< res.length;i++) {
            if (res[i].getName() != "custom:role") continue;
            puzzleAPI.user_type = res[i].getValue();
            puzzleAPI.refreshPage();
            break;
          }
        });
      }
      
    });
  },
  deletePuzzle: (puzzle_id) => {
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser == null) return;
    
    $.ajax( { type: 'DELETE', url: puzzleAPI.apiUrl + 'puzzles/' + puzzle_id,
      headers: {
        'Authorization' : puzzleAPI.token
      },
      processData: false,
      success: (data)=> {
        if (currentPageName.startsWith("gallery")) {
          $('div:has(> #' + puzzle_id + ')').detach();
          $('.gallery').remove('div:has(> #' + puzzle_id + ')');
        }
      }
    });
  },
  logout: () => {
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser) {
      puzzleAPI.recordProgress(false);
      
      if (puzzleAPI.credentials) {
        puzzleAPI.credentials.clearCachedId();
        puzzleAPI.credentials = new AWS.CognitoIdentityCredentials( {
          IdentityPoolId: CognitoConfig.userPoolId
        });
        AWS.config.credentials = puzzleAPI.credentials;
      }
      puzzleAPI.cognitoUser.signOut();
    }
    puzzleAPI.cognitoUser = null;
    puzzleAPI.user_type = null;    
    puzzleAPI.token = null;
    course.progress_info = null;
        
    puzzleAPI.refreshPage();
    course_id = puzzleAPI.parseInput('course');
    if (course_id) course.loadCourse( course_id);
    else course.loadCourse( 'elementary');
  },
  fetchProgress: () => {
    if (course.id == null) return;
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser == null) return;
    $.ajax( { type: 'GET', url: puzzleAPI.apiUrl + 'progress/' + course_id,
      headers: { 'Authorization' : puzzleAPI.token },
      success: (data) => {
        course.progress_info = data.progress;
      },
      fail: (err) => {
        course.progress_info = null;
      }
    });
  },
  recordProgress: (async=true) => {
    if (course.id == null || course.progress_info == null) return;
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser == null) return;
    $.ajax( { type: 'POST', url: puzzleAPI.apiUrl + 'progress/' + course.id,
      async: async,
      headers: {
        'Authorization' : puzzleAPI.token
      },
      data: JSON.stringify({ 
        progress: course.progress_info
      }),
      success: (data) => {
        console.log(data);
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  recordPuzzleLog: (current_puzzle_id, callback, action='completed') => {
    puzzleAPI.currentUser();
    if (puzzleAPI.cognitoUser == null || current_puzzle_id == null) return;
    $.ajax( { type: 'PUT', 
      url: puzzleAPI.apiUrl + 'puzzles/' + current_puzzle_id + '?action=' + action,
      headers: {
        'Authorization' : puzzleAPI.token
      },
      success: (data) => {
        console.log(data);
        callback();        
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },
  refreshPage: () => {

    // refresh mobile profile info
    $('#Gnb-profile-info span:nth-child(1)')
    .text(puzzleAPI.cognitoUser ? puzzleAPI.cognitoUser.username : "");
    $('#Gnb-menu .login img')
    .attr('src', puzzleAPI.cognitoUser ? 'img/logout.png' : 'img/login.png');
    
    $('#log-toggle').on('click', function(e) {
    	$('#gnb-wrapper').toggleClass('open');
    });
    // refresh user login tool bars
    if (puzzleAPI.cognitoUser) {
//      $('.menu-user').hide();
//      $('.menu-user-password, .menu-user-id').hide();
      $('.menu-login').html('<a req="logout">로그아웃</a>').show();
      $('.menu-login-userid').html( puzzleAPI.cognitoUser.username).show();
    } else {
//      $('.menu-user').hide();
//      $('.menu-user-password, .menu-user-id').hide();
      $('.menu-signup').show();
      $('.menu-login').html('<a req="login">로그인</a>').show();
      
    }    

    // display different information for different user type
    if (currentPageName.startsWith("index.html") || currentPageName.startsWith("") ) {
      switch (puzzleAPI.user_type) {
        case "student":
          $('.for-non-member, .for-educator').hide();
          $('.for-student').show();
          
          break;

        case "educator":
          $('.for-non-member, .for-student').hide();
          $('.for-educator').show();
          break;
        
        default:
          $('.for-student').show();
          $('.for-educator').show();
          $('.for-non-member').show();
      }
    }
    



  }
};

(function($){
  $.fn.extend({
    donetyping: function(callback,timeout){
      timeout = timeout || 1e3; // 1 second default timeout
      var timeoutReference,
        doneTyping = function(el){
            if (!timeoutReference) return;
            timeoutReference = null;
            callback.call(el);
        };
      return this.each(function(i,el) {
        var $el = $(el);
        $el.is(':input') && $el.on('keyup keypress paste',function(e){
          if (e.type=='keyup' && e.keyCode!=8) return;
          
          if (timeoutReference) clearTimeout(timeoutReference);
          timeoutReference = setTimeout(function(){
              doneTyping(el);
          }, timeout);
        }).on('blur',function(){
          doneTyping(el);
        });
      });
    }
  });
})(jQuery);

$(document).on('click', '.menu-login a', function(e){
  switch ($(e.currentTarget).attr('req')) {
    case "logout":
      puzzleAPI.logout();
      break;
    case "login":
      if ($('.menu-user-id').css('display') == 'none') {
        $('.menu-user-id, .menu-user-password').show();
        $('.menu-user-id').focus();
        break;
      }
      if ($('.menu-user-id input').val() == "") {
//        $('.menu-user-id, .menu-user-password').hide();
    	  alert('아이디를 입력해 주십시오');
        return;
      }
      puzzleAPI.login( $('.menu-user-id input').val(), $('.menu-user-password input').val());
      break;
  }
});

$(document).keyup(function(e) {
  // allow users to automatic login trial after pressing an "enter" key after typing password
  if ( $('input[name="menu-user-password"]:focus') && e.keyCode === 13 ) {
    puzzleAPI.login( $('.menu-user-id input').val(), $('.menu-user-password input').val());
    e.preventDefault();
    return false;
  }
});

$(document).on('click', '#Gnb-menu .login img', function(e) {
  if ($(e.currentTarget).attr('src') == 'img/login.png') {

  } else {
    puzzleAPI.logout();
  }
});

$(document).ready(function() {
  puzzleAPI.currentUser();
  puzzleAPI.refreshPage();

  $('#check_admission').on('click', function() {
    var pwd = $('#register_input_password').val();
    var confirm_pwd = $('#confirm_input_password').val();
    if (pwd.length == 0 || pwd != confirm_pwd) {
      swal('비밀번호를 적지 않거나 비밀번호 확인이 틀림니다.')
      $('#confirm_input_password').val('');
      $('#register_input_password').val('').focus();
      return;
    }
    if (pwd.length <= 7) {
      swal('비밀번호는 최소 8자리 이상을 입력해야 합니다.')
      $('#confirm_input_password').val('');
      $('#register_input_password').val('').focus();
      return;
    }
    if (pwd.match(/[0-9]/g) != null && pwd.match(/[a-z]/g) != null ) {
      puzzleAPI.signUp($('#register_input_id').val(), "+821059177477", pwd, $('#register_input_email').val() );
      return;
    }    
  });    

  $('#register_final_request').on('click', function() {
    puzzleAPI.confirm($('#confirmation_number').val());
  });

  $('#register_final_request_student').on('click', function() {
    var pwd = $('#register_input_password').val();
    var confirm_pwd = $('#confirm_input_password').val();
    if (pwd.length == 0 || pwd != confirm_pwd) {
      swal('비밀번호를 적지 않거나 비밀번호 확인이 틀림니다.')
      $('#confirm_input_password').val('');
      $('#register_input_password').val('').focus();
      return;
    }
    if (pwd.length <= 7) {
      swal('비밀번호는 최소 8자리 이상을 입력해야 합니다.')
      $('#confirm_input_password').val('');
      $('#register_input_password').val('').focus();
      return;
    }
    if (pwd.match(/[0-9]/g) != null && pwd.match(/[a-z]/g) != null ) {
      puzzleAPI.signUp($('#register_input_id').val(), "+821059177477", $('#register_input_password').val(), $('#register_input_email').val(), 'student' );
      return;
    }
    swal('비밀번호는 영문 소문자와 숫자가 반드시 포함되어 있어야 합니다.');
    $('#confirm_input_password').val('');
    $('#register_input_password').val('').focus();    
  });

  $('#register_input_id').donetyping(()=> {
    puzzleAPI.checkAvailability($('#register_input_id').val());
  });
});

$(document).on('click', '.main-progress-status', function(e) {
  puzzleAPI.currentUser();
  if (puzzleAPI.cognitoUser) {
    window.location.href = "progress-status.html";
    return;
  }
  swal('본 메뉴는 교육자로 등록한 사용자만 이용할 수 있습니다.', { 
    buttons: {
      cancel: '진도현황 예시페이지 이동',
      catch: {
        text: '등록페이지 이동',
        value: 'catch'
      }
    }
  }).then( (value) => {
    if (value == null) window.location.href = "progress-status.html";
    if (value == "catch") window.location.href = "_sign_educator.html";
  });
});

$(document).on('click', '.main-puzzle-intro', function(e) {
  puzzleAPI.currentUser();
  if (puzzleAPI.cognitoUser) {
    window.location.href = "puzzle-intro.html";
    return;
  }

  swal('등록하지 않은 사용자는 퍼즐만들기 및 풀어보기를 일부 체험할 수 있으나 자신이 만든 퍼즐 정보를 저장할 수는 없습니다.', 
    { buttons: {
      cancel: '퍼즐만들기 간이 체험하기',
      catch: {
        text: '등록페이지 이동',
        value: 'catch'
      }
    }
  }).then( (value) => {
    if (value == null) window.location.href = "puzzle-intro.html";
    if (value == "catch") window.location.href = "_signUp.html";
  });
});

$(window).unload(function() {
  if (currentPageName.startsWith("studying")) {
    localStorage.removeItem("currentPuzzleId");
    puzzleAPI.recordProgress(false);
  }
})
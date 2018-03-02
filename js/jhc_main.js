$(document).ready(function() {
	var countArea= $('#count-print-area'),
		countUl= countArea.find('.count-wrap'),
		visitCount= countUl[0].dataset.count,
		countList= countUl.find('li'),
		countData= countList.find('h1'),
		len= countData.length-1,
		countVal;
	$.ajax({
		url: 'counts.json',
		dataType: 'JSON',
		success: function(data) {
			countVal = data.counts;
			$.each(countData, function(i,v) {
				if( i === 0 ) {
					this.dataset.count= Number(visitCount) + Number(countVal[i]);
				} else {
					this.dataset.count= countVal[i];					
				}				
				if( len === 0 ) {
					countUp();
				}
				len--;
			});
		}
	});
	
	function countUp() {
		countData.each(function(i,v) {
			  var $this = $(this),
						countTo = this.dataset.count;
				$({ countNum: $this.text()}).animate({
			    countNum: countTo
			  },
			  
			  {
			    duration: 6000,
			    easing:'linear',
			    step: function() {
			      $this.text(Math.floor(this.countNum));
			    },
			    complete: function() {
			      $this.text(this.countNum);
			    }
			  });  
		});
	}
	var popupArea= $('#popup-area'),
	popCheck= $('#popup-form'),
	popCloseBtn= popupArea.find('.close-btn'),
	result = getCookie('popup'),
	popdefault;

	if (result == 'end') {
		popupArea[0].innerHTML='';
		return false;
	}
	else {
		popupArea[0].style.display= 'block';
	}

	popCloseBtn.on('click', function(e) {
		popupArea[0].innerHTML='';
	});
	popCheck.on('change', function(){
		setCookie( "popup", "end" , 1);
		popupArea[0].innerHTML='';
	});

	function setCookie(cname, value, expire) {
		var todayValue = new Date();
		// 오늘 날짜를 변수에 저장

		todayValue.setDate(todayValue.getDate() + expire);
		document.cookie = cname + "=" + encodeURI(value) + "; expires=" + todayValue.toGMTString() + "; path=/;";
	}
	function getCookie(name) { 
		 var cookieName = name + "=";
		 var x = 0;
		 while ( x <= document.cookie.length ) { 
				var y = (x+cookieName.length); 
				if ( document.cookie.substring( x, y ) == cookieName) { 
					 if ((lastChrCookie=document.cookie.indexOf(";", y)) == -1) 
							lastChrCookie = document.cookie.length;
					 return decodeURI(document.cookie.substring(y, lastChrCookie));
				}
				x = document.cookie.indexOf(" ", x ) + 1; 
				if ( x == 0 )
					 break; 
				} 
		 return "";
	}
});
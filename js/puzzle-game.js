$(function() {
	var body= $('body'),
		makingPuzzleGame= $('.making-puzzle-game'),
		makingBtn= makingPuzzleGame.find('.main-about-coding-button'),
		flexBox= makingPuzzleGame.find('.flex-box'),
		fixedPopup= $('#fixed-popup'),
		target= fixedPopup.find('.target'),
		isMobile= $.IsMobile.is,
		isBrowser= $.isBrowserCheck(),
		closeBtn= fixedPopup.find('.btn');
	
	closeBtn.on('click', function(e) {
		console.dir(fixedPopup[0].style.display);
		body[0].style.overflow= 'visible';
		fixedPopup[0].style.display= 'none';
	});
	
	makingBtn.on('click', function(e) {
		if(isMobile) {
			popUp('모바일 혹은 테블릿');
			return;
		}
		if(isBrowser !== 'Chrome') {
			popUp('크롬이외의 브라우저');
			return;
		}
	});
	
	
	function popUp( str ) {
		body[0].style.overflow= 'hidden';
		target[0].innerHTML= str;
		fixedPopup[0].style.display= 'block';
		flexBox.remove();
	}
});
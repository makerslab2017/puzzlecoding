$(function() {
	var countArea= $('#count-print-area'),
		countUl= countArea.find('.count-wrap'),
		countList= countUl.find('li'),
		countData= countList.find('h1'),
		len= countData.length-1,
		countVal;
	$.ajax({
		url: 'admin/js/count.json',
		dataType: 'JSON',
		async: false,
		success: function(data) {
			countVal= data.count;
		}
	});
	$.each( countData, function(i,v) {
		this.dataset.count= countVal[i];
		if( len === 0 ) {
			countUp();
		}
		len--;
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
	
});
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
					if ( i === 2)
						this.dataset.count= '-';
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
				if (countTo === '-') {
					$this.text(countTo);
					return;
				}
			  
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
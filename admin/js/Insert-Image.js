$(function(){

	//	imgFile-->
		var imgobj= {
			node: $('#iia00'),
			ext: ['gif','jpg','jpeg','svg','png'],
			foldername: 'banner',
			singleCtg: true,
			thumbLen: 2400,
			url: 'Image_upload.php',
			staticName: 'banner_image',
			multiple: true
		}
		var imgUpload= function(){}
		imgUpload.prototype= new $.FileUpload();
		var $imgUpload= new imgUpload();
		$imgUpload.init(imgobj);
		$imgUpload.run();
	//	<--imgFile
	
		
		
	
	//	countSet-->	
	var imageWrap2= $('#insert-image-wrap2'),
		setform= $('#setform'),
		formBtnArea= setform.find('.btn-area'),
		formBtn= formBtnArea.find('.btn'),
		formData= setform.find('.data'),
		result= imageWrap2.find('.result'),
		noticeDebounce= $.noticeFadeout();
	
	function popUpOnOff () {
		var countVal;
		$.ajax({
			url: 'js/count.json',
			dataType: 'JSON',
			async: false,
			success: function(data) {
				countVal= data.count;
			}
		});
		$.each( formData, function(i,v) {
			this.value= countVal[i];
		});
		formBtn.on('click', function(e){
			var arr= [];
			$.each( formData, function(i,v) {
				arr[i]= this.value;
			});
			jsonEnc(arr);
		});
		function jsonEnc ( val ) {
			var obj= {
					url: 'setcount.php',
					formdata: {
						count: val
					},
					complete: function(){
						noticeDebounce(result, '<span>수정 되었습니다. </span>');
					}
			}
			result.AjaxPrint(obj);
		}
	}
	popUpOnOff();
	//	<--countSet
});
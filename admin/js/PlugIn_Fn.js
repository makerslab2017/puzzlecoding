$(function(){

	$.fn.extend({
		clickbindtouch: function (obj) {
			var method= obj.evt || 'on',
				namespace= obj.namespace || '',
				selector= obj.selector || undefined,
				callback= ( typeof obj=== 'function' ) ? obj : obj.callback || undefined;
			var way,end,timestamp,startTerm,endTerm,orgopacity;
			
			$.support.toucheventreadyTo= true;
			var handler= {};
				handler['touchstart'+ namespace]= function (e) {
//					e.preventDefault();
//					e.stopPropagation();
					var self= this;
					orgopacity= (self.style && $(self).css('opacity')) || 1;
					way= 0;
					end= undefined;
					clearTimeout(endTerm);
//					startTerm= setTimeout (function () {
//						if( $.support.toucheventready=== true  
//							    && $.support.toucheventreadyTo=== true) 
//						{
//							$(self).css({'opacity':'0.5'});
//						}
//					},30);
				},
				handler['touchmove'+ namespace]= function (e) {
					way= e.touches[0].clientX-end;
					end= e.touches[0].clientX;
					$.support.toucheventreadyTo= null;
//					$.support.toucheventready= null;
//					$(this).css({'opacity': orgopacity});
				},
				handler['touchend'+ namespace]= function (e) {
//					e.preventDefault();
//					e.stopPropagation();
					var speed= Math.abs(way),
						time= speed > 12 ? 1200 : (speed*100); 
//					clearTimeout(startTerm);
//					$(this).css({'opacity': orgopacity});
					if ( $.support.toucheventready=== true 
						 && $.support.toucheventreadyTo=== true ) 
					{
						callback.call(this,e);
					}
					if( end === undefined || speed < 0.3 ) {
						$.support.toucheventreadyTo= true;
					} else {
						endTerm= setTimeout(function () {
							$.support.toucheventreadyTo= true;
//							$.support.toucheventready= true;
							clearTimeout(endTerm);
						},time)
					}
					e.preventDefault();
				}
			
			var clickhandler= {}
				clickhandler['click'+ namespace]= function (e) {
				callback.call(this,e);
				}
			this[method]($.IsMobile.SetEvt(clickhandler,handler),selector);
		},
		AjaxPrintInit: function (obj,async,syncprint) {
			var that= this,
				asyncVal= 
					async=== undefined ? 
					(obj.async=== undefined ? true : obj.async) : async,
				
				url= (typeof obj==='string') ? obj : obj.url,
				type= obj.type || 'POST';
			var ajaxoption= {};
			ajaxoption= {
				url: url,
				type: "POST",
				async: asyncVal,
				data: obj.formdata,
				cache: false,
				error: function(request,status,error){
					that.html("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			}
			return ajaxoption;
		},
		AjaxPrint: function (obj,async,syncprint) {
			var that= this,
				loadWidth= obj.width || 150,
				syncprint= 
					syncprint=== undefined ? 
					( obj.syncprint=== undefined ? true : obj.syncprint ) : syncprint,
				ajaxoption= this.AjaxPrintInit(obj,async,syncprint);
			$.extend(ajaxoption,{
				beforeSend: function(jqXHR, settings){
					that.loading=setTimeout(function(){
						that.loadingAni(0.4,loadWidth);
					},100);
				},
				complete: function(){
					clearTimeout(that.loading);
					delete that.loading;
				},
				success: function(data){
					that.html('');
					(/*!asyncVal && (typeof obj=== 'object') && */!syncprint) ? (obj.result= data) : that.html(data);
					if(obj.complete) obj.complete(data);
				}
			});
			$.ajax(ajaxoption).done(function () {
				if(obj.done) obj.done();
			});
			return this;
		},
		AjaxPrintXHR: function (obj,async,syncprint) {
			var that= this,
				ajaxoption= this.AjaxPrintInit(obj,async,syncprint),
				prog= /*obj.prog*/this,
				progbar= prog.find('.bar'),
				progper= prog.find('.per'),
				bytelength= obj.xhrlength,
				xhrtype= obj.xhrtype,
				formdataFile= obj.formdataFile;
			function progress (xhr) {
				var xhr= xhr[xhrtype] || xhr;
				xhr.addEventListener("progress", function(e){
					var total= bytelength || e.total;
					var percentComplete = (e.loaded / total)*100;
					//Do something with upload progress
					progper.html(parseInt(percentComplete)+"%");
					progbar.stop().animate({
						'width' : parseInt(percentComplete)+"%"
					});
				},false);
			}
			if( formdataFile ) {
				ajaxoption.processData= false,
				ajaxoption.contentType= false;
			};
			$.extend(ajaxoption, {
				xhr: function(){
					prog.show();
					progbar.css({'width': '0%'});
					progper.html("0%");
					var xhr = new window.XMLHttpRequest();
					progress(xhr);
					return xhr;
				},
				success: function(data){
					obj.result= data;
					if(obj.complete) obj.complete(data);
				}
			});
			$.ajax(ajaxoption).done(function () {
				if(obj.done) obj.done();
			});
		},
		noticeFadeout: function() {
			var self= this,
				delay;
			return function ( msg, method ) {
				method= method || 'html';
				self.stop()[method](msg).show();
				clearTimeout(delay);
				delay= setTimeout(function() {
					self.fadeOut(function(){
						$(this).stop().html('').show();
					});
				},2000);
			}
		},
		OnToggle: function (OnFunc, OffFunc, addClass) {
			addClass= addClass ? addClass : 'on';
			$(this).clickbindtouch(function(){
				$(this).toggleClass(addClass,function() {
					if($(this).hasClass(addClass)){
						OnFunc.call(this);
					}else{
						OffFunc.call(this);
					}
				});
			})
		},
		clickOff: function (sel,OnFunc,OffFunc,namespace) {
			if(!namespace) {
				namespace= OffFunc;
				OffFunc= OnFunc;
				OnFunc= sel;
				sel=''
			}
    		$(this).on($.IsMobile.SetEvt('mousedown','touchstart'), sel, function(e){
		    	var that= this,
		    		offnamespace= $.IsMobile.SetEvt('mouseup','touchend') + '.' + namespace;
		    	OnFunc.call(this,e);
		    	$(document).on( offnamespace, function(e) {
		    		OffFunc.call(that,e);
		    		$(this).off(offnamespace);
		    	})
		    });
    	},
		SVGani: function (func,obj,inf) {
			new SVGanimation(this,func,obj,inf);
			return this;
		},
		
	    loadingAni: function(fill,w){
	    	var width=w,
	    		r=w/2.5,
	    		xy=w/2,
	    		dur= w/30,
	    		st= (w/15 < 2.5) ? 2.5 : (w/15);
	    	var txt= '<div id="loadingSVGarea"><svg id="loadingSVG" width="'+w+'" height="'+w+'"><circle class="loadCircle" r="'+r+'" cx="'+xy+'" cy="'+xy+'" stroke-width="'+st+'px"/></svg></div>';	    	
	    	this[0].innerHTML= (txt);
	    	var $node= this.find('.loadCircle');
			var pi= Math.PI*($node[0].r.baseVal.value*2);
	    	var piFill= pi*fill;
	    	var piTerm= r*3;
	    	$node[0].style.strokeDasharray= piFill+' '+(pi+piTerm-piFill)
	    	var Animation= function (y) {
	    		$node[0].style.strokeDashoffset= -y;
		    }
	    	$node.SVGani(Animation,{x:0,y:pi+piTerm,dur:dur},true);
	    	return this;
		}
	});


	//SVG animation-->    
    function SVGanimation (node,func,obj,inf) {
    	this.func= func,
    	this.obj= obj,
    	this.inf= inf,
    	this.init(node);
    }
    SVGanimation.prototype.init= function (node) {
    	this.node= node,
    	this.x= this.obj.x,
    	this.y= this.obj.y,
    	this.dur= (this.x > this.y)?-(this.obj.dur):this.obj.dur,
    	this.requestID= undefined;    	
		this.reqAni();
    },
    SVGanimation.prototype.Animation= function () {
    	var y= (this.obj.x += this.dur);   
    	this.func(y);
    	return y;
    },
    SVGanimation.prototype.reqAniStop= function () {
    	if (this.requestID) {
    		window.cancelAFrame(this.requestID);
    		this.requestID= undefined;
    	}
    },
    SVGanimation.prototype.reqAni= function () {
    	var $this= this;
		var y= this.Animation();
		this.requestID= window.requestAFrame(function(){
			$this.reqAni();
		});
		if(this.dur<0 ? (y<this.obj.y) : (y>this.obj.y)) {
			if(!this.inf){
				window.cancelAnimationFrame($this.requestID);
				$this.requestID= undefined;
			}
			this.obj.x= this.x;
		}
    }

	//<--SVGanimation

	//requestAnimationFrame Cross Browsing-->
    window.requestAFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                // if all else fails, use setTimeout
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
                };
    })();
    // handle multiple browsers for cancelAnimationFrame()
    window.cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                function (id) {
                    window.clearTimeout(id);
                };
    })();
	//-->requestAnimationFrame Cross Browsing


});
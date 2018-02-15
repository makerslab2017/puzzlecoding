$(function(){
$.extend(Date.prototype, {
	YYYYMMDD_HHMMSS: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }
        return this.getFullYear() +
               pad2(this.getMonth() + 1) + 
               pad2(this.getDate()) + '_' +
               pad2(this.getHours()) +
               pad2(this.getMinutes()) +
               pad2(this.getSeconds());
    }
});
//animate add method
$.extend(true, jQuery.Tween.propHooks, {
	transformX: {
		get: function(tween) {
	        return $(tween.elem).css("transform");
	    },
	    set: function(tween) {
	        $(tween.elem).css("transform", "translateX(" + (tween.pos * tween.end) + "px)");
	    }	
	},
	transformY: {
		get: function(tween) {
	        return $(tween.elem).css("transform");
	    },
	    set: function(tween) {
	        $(tween.elem).css("transform", "translateY(" + (tween.pos * tween.end) + "px)");
	    }
	},
	rotate: {
		get: function(tween) {
	        return 90;//$(tween.elem).css("transform");
	    },
	    set: function(tween) {
	        $(tween.elem).css("transform", "rotate(" + (tween.pos * tween.end) + "deg)");
	    }
	}
});
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
	MediaQuery: function (width,func1,func2) {
		var that=this;
		if (window.matchMedia("(max-width: "+width+"px)").matches) {
			func1.call(that);
			$(window).on('resize', function(){
				if (this.innerWidth<width){
					func1.call(that);
				}else{
					func2.call(that);
				}
			});
		 } else {
			func2.call(that);
			$(window).on('resize', function(){
				if (this.innerWidth<width){
					func1.call(that);
				}else{
					func2.call(that);
				}
			});
		}
	},
	noticeFadeout: function() {
		var self= this,
			delay;
		return function ( elem, msg, method ) {
			method= method || 'html';
			elem.stop()[method](msg).show();
			clearTimeout(delay);
			delay= setTimeout(function() {
				elem.fadeOut(function(){
					$(this).stop().html('').show();
				});
			},2000);
		}
	},
	numberWithCommas: function (x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	stringByteLength : function(s,b,i,c){
		for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
		return b
	},
	toucheventready: (function(){
		if ( $.support.touch ) {
		$.support.toucheventready= true;
		var oncomplete,way,end,timestamp,timer;
		var handler= {
			'scroll.toucheventready': function (e) {
//				e.preventDefault();
				clearTimeout($.touchscrollTimer)
				$.support.toucheventready= null;
				$.touchscrollTimer= setTimeout(function () {
					$.support.toucheventready= true;
				},100)
			}
		}
		$(document).on(handler);
		}
	})(),
	Debounce: function (func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},
	pad: function (n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	},
	Popup: (function () {
		function Popup () {}
		$.extend( Popup.prototype, {
			init: function (path, subpath, printarea, file) {
				this.path= path,
				this.subpath= subpath,
				this.body= printarea || $('body'),
				this.file= file || 'Popup.php',
				this.popuparea
			},
			run: function (conturl,jsurl) {
				this.onEvt(conturl,jsurl);
			},
			onEvt: function (conturl,jsurl) {
				var that= this;
				var obj= {
					url: '/' + this.path + 'common/' + this.file,
					formdata: {
						conturl: this.subpath + conturl,
						jsurl: jsurl ? (this.subpath + 'js/' + jsurl) : null
					},
					complete: function() {
						if( that.callback ) that.callback();
//						that.popuparea.fadeIn();
					}
				}
				that.body.prepend('<div id="pop-up-area"></div>').css('overflow','hidden');
				that.popuparea= $('#pop-up-area');
				that.popuparea.AjaxPrint(obj).hide();
			}
		});
		return Popup;
	})(),
//	PopUp: (function () {
//		function Popup () {}
//		$.extend( Popup.prototype,{
//			init: function () {
//				this.body= $('body'),
//				this.popupid= 'popupWrap',
//				this.popuptag= '<div id="popupWrap"><div class="confirm"></div></div>',
//				this.popupArea,
//				this.iconArea,
//				this.printArea,
//				this.close,
//				this.oKbutton,
//				this.icon=
//				'<div class="close">\
//					<svg>\
//						<path id="lineA" d="M 0 0 l 32 32" stroke="white" stroke-width="1" />\
//						<path id="lineB" d="M 32 0 l -32 32" stroke="white" stroke-width="1" />\
//					</svg>\
//				</div>\
//				<div class="cnficon color2">\
//					<svg class="v">\
//						<path d="M75 105 C 35,-15 115,-15 75,105" fill="white" stroke="white" stroke-width="5" />\
//						<path d="M75 125 h0" stroke="white" stroke-width="18" />\
//					</svg>\
//				</div>',
//				this.iconsvgpath=
//				'<svg class="v">\
//					<path d="M 25 72 l 45 45 l 45 -75" stroke="white" stroke-width="20" />\
//				</svg>',
//				this.contentsArea,
//				this.contents=
//				'<div class="cnfcts colo6">\
//					<span>Are you sure?</span>\
//					<div class="cnfbtn button1 color1">\
//					Confirm\
//					</div>\
//				</div>',
//				this.completeTag=
//				'<span>Confirmed !</span>';
//			},
//			run: function () {
//				this.appear();
//				this.closing();
//				this.confirmClick();
//			},
//			appear: function () {
//				this.body.prepend(this.popuptag).css({'overflow':'hidden'});
//				this.popupArea= $('#popupWrap'),
//				this.printArea= $('.confirm'),
//				this.printArea.html(this.icon+this.contents),
//				this.Area,
//				this.iconArea= this.printArea.find('.cnficon'),
//				this.contentsArea= this.printArea.find('.cnfcts'),
//				this.close= this.printArea.find('.close'),
//				this.oKbutton= this.printArea.find('.cnfbtn')
//				this.popupArea.fadeIn();
//			},
//			closing: function () {
//				var that= this;
//				this.close.on($.IsMobile.click,function(){			
//					that.closingEvt();
//				});
//			},
//			closingEvt: function () {
//				var that= this;
//				this.popupArea.fadeOut(function(){
//					$(this).remove();
//					that.body.css({'overflow':''});
//				});
//			},
//			confirmClick: function () {
//				this.oKbutton.clickbindtouch(this.completeEvt());
//			},
//			completeEvt: function () {
//				var that= this;
//				return function () {
//					that.iconArea.fadeOut(function(){
//						$(this).html(that.iconsvgpath).css({'background-color':'#3DC254'}).fadeIn();
//						
//					});
//					that.contentsArea.fadeOut(function(){
//						$(this).html(that.completeTag).fadeIn();
//						if( that.callback ) that.callback();
////						func ? func() : null;
//					});
//				}
//				
//			}
//		});
//		return Popup;
//	})(),
	MenuSelect: (function () {
	//MenuSelect Class-->
	function MenuSelect () {}
	$.extend ( MenuSelect.prototype, {
		init: function (node) {
			this.tabArea= node,
			this.tabmenuWrap= this.tabArea.find('.tab-wrap'),
			this.tabMenu= this.tabArea.find('.tab-menu'),
			this.selectTab= {0: null},
			this.closeTag=
			'<div class="close">\
				<svg viewBox="0 0 10 10">\
					<path d="M1 1 l8 8"  stroke="#9CA4A6" stroke-width="1" />\
					<path d="M9 1 l-8 8"  stroke="#9CA4A6" stroke-width="1" />\
				</svg>\
			</div>',
			this.closeX,
			this.refreshbtn= this.tabArea.find('.refresh'),
			this.$TouchSwipe;
			this.duration= 150,
			this.setting();
//			this.tabClick();
			this.refreshClick();
		},
		setting: function () {
			if( !$.IsMobile.is )
				this.tabMenu.sortable({
					placeholder: "ui-state-highlight",
					animation: 150,
					connectWith: ".connectedSortable",
		            placeholder: "placeholder",
		            start: function(e, ui ){
		                ui.placeholder.width(ui.helper.outerWidth())
		            },
		            update: function() { console.dir(this) },
//					axis: "x"
				});
		},
		run: function (obj) {
			var that= this,
				prop= {};
			$.extend( prop, obj );
			var object= {
				selector: prop.selector,
				callback: that.selectEvt(prop),
			}
			prop.node.clickbindtouch(object);
		},
		selectEvt: function (prop) {
			var that= this;
			return function (e) {
				e.preventDefault();
				var self= this;
				if( prop.startcallback ) { 
					prop.startcallback(this, method);
				} else {
					if( 'start' in prop ) {
						prop.start(this);				
					}
					method.call(that);
				}
				
				function method () {
					var calldur= that.duration + 20;
					var name= prop.contname || self.innerText,
						container= prop.container,
						tabmenuList= that.tabMenu.find('li'),
						selctTab= that.tabMenu.find('.'+name);
					if ( tabmenuList.length=== 0 ) {
						that.refreshbtn.show();
						that.tabArea.addClass('on');
						calldur= 0;
					}
					if( prop.overlap || selctTab.length === 0 ) {
						var overlap= ( container.find('#'+name).length=== 0);
						if( overlap ) {
							var contTag= '<div class="cont" id="'+name+'"></div>';
							container.append(contTag);
						}						
						var contArea= container.find('#'+name);
						var obj= {
							url: name+'.php',
							formdata: prop.data
						}
						if( prop.endcallback ) obj.complete= prop.endcallback(this,self);
						
//					var delay = setTimeout( function () {
						if( overlap ) {
							that.tabMenu.append('<li class='+name+'><span>'+name+'</span>'+that.closeTag+'</li>');
							that.closeX= that.tabMenu.find('li .close');
						}
						var selctTab= that.tabMenu.find('.'+name),
							close= selctTab.find('.close');
						selctTab[0]._setData= prop.data;
						selctTab[0]._hidecallback= prop.hidecallback;

						var call= setTimeout( function () {
							contArea.AjaxPrint(obj);
							clearTimeout(call);
						}, calldur);
						
						if( overlap ) that.tabClick({
							node: selctTab,
							dur: that.duration,
							selectcallback: prop.selectcallback
						});
						
						
						selctTab.trigger($.IsMobile.click);
//						that.tabClickEvt({
//							node: addtab,
//							dur: 100,
////							selectCallback: prop.selectCallback
//						})();

						var menuWidth= that.tabMenu[0].offsetWidth,
							wrapWidth= that.tabmenuWrap[0].offsetWidth;
						if( overlap ) that.tabClose(close, prop.closecallback);
					
//						isMobile-->
						if($.IsMobile.is) {
							if(that.$TouchSwipe) {
								that.$TouchSwipe.destroy();
							}
							var tsObj= {
								node: that.tabMenu,
								swipetype: false,
								axis: 'X'
							}
							that.$TouchSwipe= new $.TouchSwipe();
							that.$TouchSwipe.init(tsObj);
							that.$TouchSwipe.run();
							that.$TouchSwipe.target= selctTab[0];
							if( menuWidth >= wrapWidth ){
								that.$TouchSwipe.moving= wrapWidth - menuWidth;
								that.$TouchSwipe.MoveCallback();
							}
						}
//						<--isMobile
//					clearTimeout(delay);
//					}, prop.duration);
						
					} else {
						selctTab.trigger($.IsMobile.click);
//						that.tabClickEvt({
//							node: selctTab,
//							dur: 100,
////							selectcallback: prop.selectCallback
//						})();
					}
//					clearTimeout(delay);
//					if( prop.endcallback ) prop.endcallback(self);
//				}, prop.duration);
				
				}
			}
		},
		
		tabClick: function (tabObj) {
			var obj= {
//				selector: 'li',
				namespace: '.' + tabObj.node[0].innerText,
				callback: this.tabClickEvt(tabObj)
			}
			if( !tabObj ) {
				obj.selector= 'li';
				this.tabMenu.clickbindtouch(obj);
			}
			
			tabObj.node.clickbindtouch(obj);
		},
		tabClickEvt: function (obj) {
			if( obj !== undefined ) {
				var node= obj.node,
					dur= obj.dur,
					selectcallback= obj.selectcallback;
			}
			var that= this;
			return function (e) {
				if(e) e.preventDefault();
				var dur= ( obj.dur ) ? obj.dur : 300;
				var clickNode= node || $(this),
					nodename= clickNode[0].innerText;
				if( that.$TouchSwipe ) that.$TouchSwipe.target= clickNode[0];
				if( !that.selectTab[0] || that.selectTab[0][0] !== clickNode[0] ){
					if(that.selectTab[0]) {
						that.selectTab[0].removeClass('selected')[0]
						._setNode.stop().animate({'left':'-100%'},{
							duration: dur,
							start: function () {
//								$.support.toucheventready= null;
							},
							complete: function(){
								$(this).hide();
								if( that.selectTab[0][0]._hidecallback )
									that.selectTab[0][0]._hidecallback(that);
								that.selectTabSlide(clickNode,dur,selectcallback);
//								$.support.toucheventready= true;
							}
						});
					} else {
						that.selectTabSlide(clickNode,dur,selectcallback);
					}
				}
				
				if( history.state.node!== nodename )
					history.pushState({node: nodename}, nodename, "?"+nodename);
			}
		},
		selectTabSlide: function (clickNode,dur,selectcallback) {
			clickNode.addClass('selected');
			if (clickNode[0]._setNode) {
				clickNode[0]._setNode.stop().show().animate({'left':'0%'},{
					duration: dur,
					complete: function () {
						if( selectcallback ) selectcallback();
					}
				});
			} else {
				clickNode[0]._setNode=$('#'+clickNode[0].classList[0]);
				if( selectcallback ) selectcallback();
			}
			this.selectTab[0]= clickNode;
		},
		refreshClick: function () {
			this.refreshbtn.clickbindtouch(this.refreshEvt());
		},
		refreshEvt: function () {
			var that= this;
			return function () {
				$(this).animate({'rotate':180},300)
				var title= that.selectTab[0][0].innerText.replace(/(^\s*)|(\s*$)/g, ''); 
				var obj= {
					url: title+'.php',
					formdata: that.selectTab[0][0]._setData
				}
				that.selectTab[0][0]._setNode.AjaxPrint(obj);
			}
		},
		tabClose: function (selector, closecallback) {
			selector.clickbindtouch(this.tabCloseEvt(closecallback));
		},
		tabCloseEvt: function (closecallback) {
			var that= this;
			return function (e) {
				var node= /*sel ? sel[0] : */this;
				if(e) {
					e.preventDefault();
					e.stopPropagation();
				}
				var target= node.parentElement.nextElementSibling || node.parentElement.previousElementSibling,
					targetCont= node.parentElement._setNode;
//				if( that.selectTab[0][0] === $(node.parentElement)[0] && target !== null )
//					that.tabClickEvt($(target))();

					$(node.parentElement).remove();

//					Mobile-->
					
//					if( that.tabMenu[0].offsetWidth <= 
//						that.tabmenuWrap[0].offsetWidth ) that.tabMenu.animate({'left':'0'});
//					that.tabMenu.off('.TouchSwipe');
//					var $TouchSwipe= new $.TouchSwipe();
//					$TouchSwipe.init(that.tabMenu);
//					$TouchSwipe.run();

					
//					<--Mobile

				$(node.parentElement._setNode).fadeOut(function () {
					$(this).remove();
					if (target === null) {
						that.tabArea.removeClass('on');
						that.refreshbtn.hide();
					} else {
						if( that.selectTab[0][0] === $(node.parentElement)[0] ){
							$(target).trigger($.IsMobile.click);
//							$TouchSwipe.selectnode= target;
//							$TouchSwipe.alignment()();
						}
						if($.IsMobile.is) {
							if(that.$TouchSwipe) {
								that.$TouchSwipe.destroy();
							}
							var tsObj= {
								node: that.tabMenu,
								swipetype: false,
								axis: 'X'
							}
							that.$TouchSwipe= new $.TouchSwipe();
							that.$TouchSwipe.init(tsObj);
							that.$TouchSwipe.run();
							
							that.$TouchSwipe.selectnode= target;
							that.$TouchSwipe.moving= 0;
							that.$TouchSwipe.MoveCallback();
						}
					}
					if( closecallback ) closecallback();
				});
				
				return false;
			}
		}
		});
		//<--MenuSelect Class
		return MenuSelect;
	})(),
	SelectPlugin: (function () {
		//SelectPlugin Class-->
		function SelectPlugin () {}
		SelectPlugin.prototype.init= function (node, callback, upstay) {
			this.node= node,
			this.clicknode= this.node.find('.active-option-Area'),
			this.optionclass= 'action-option-Area',
			this.optionArea= this.node.find('.'+this.optionclass),
			this.activeoption,
			this.actionoption,
			this.onNamespace= '.accordion',
			this.offNamespace= '.accordionOff',
			this.callback= callback,
			this.upstay= upstay
		}
		SelectPlugin.prototype.run= function () {
			this.onEvt();
			if(this.callback) this.select();
		}
		SelectPlugin.prototype.onEvt= function () {
			$.each( this.clicknode, function(i,v) {
				this.attributes._namespace= i;
			});
			var that= this;
			var obj= {
				namespace: this.onNamespace,
				callback: this.motion()	
			}
			this.clicknode.clickbindtouch(obj);
		}
		SelectPlugin.prototype.motion= function () {
			var that= this;
			return function (e) {
				var self= this;
//				e.preventDefault();
//				e.stopPropagation();
				var namespace= that.offNamespace;
				var optionArea= $(this.nextElementSibling);
				var obj= {
					namespace: namespace,
					callback: function (e) {
						var $target = $( e.target );
						if( !$target.hasClass(that.optionclass) &&
							$target.parents('.'+that.optionclass).length === 0	) 
						{
							optionArea.stop().slideUp({
								start: function(){
									$(document).off(obj.namespace);
								},
								done: function() {
									this.parentNode.style.zIndex= '';
								}
							});
						}
					}
				}
					optionArea.slideDown({
						start: function (){
							this.parentNode.style.zIndex= 99;
							that.optionArea[0].scrollTop=0;
							that.activeoption= $(self);
						},
						complete: function(){
//							if($(this).is(':visible')) {
								$(document)/*.off(obj.namespace)*/.clickbindtouch(obj);
//							}
						}
					});
			}
		}
		SelectPlugin.prototype.select= function () {
			var that= this;
			var obj= {
				selector: 'ul li',
				callback: this.selectEvt()
			}
			this.optionArea.clickbindtouch(obj);
		}
		SelectPlugin.prototype.selectEvt= function () {
			var that= this;
			return function (e) {
				e.preventDefault();
				if(that.upstay !== undefined){
//					$(this.parentElement.parentElement).stop().slideUp(function(){
//						$(document).off(that.offNamespace);
//					});
					$(document).trigger($.IsMobile.click+that.offNamespace).off(that.offNamespace);
				}
				that.callback.call(this,e,that);
			}
		}
		SelectPlugin.prototype.offEvt= function () {
			this.clicknode.off(this.onNamespace);
			$(document).off(this.offNamespace);
		}
		return SelectPlugin;
		//<--SelectPlugin Class
	})(),
	TouchSwipe: (function () {
		function TouchSwipe () {}
		$.extend( TouchSwipe.prototype, {
			init: function (node,list,inf,auto,std) {
				this.node, this.swipetype, this.infinite, this.autoplay,
				this.axis, this.mouse, this.evenLen, this.callback, this.loose,
				this.touchevent= true,
				this.bulletEvt= true;
				if( 'node' in node ) $.extend ( this, node );
				if( this.swipetype !== true ) {
					this.infinite= false,
					this.autoplay= false
				}
				this.node= node.node || node,
				this.axis= this.axis || 'X',
				this.name= node.name || this.node[0].id || this.node[0].classList[0],
				this.nodelength= 0,
				this.wrap= this.node[0].parentElement,
				this.wraplength,
				this.prevBtn= $(this.wrap).find('.prev')[0] || $(this.wrap.parentElement).find('.prev')[0],
				this.nextBtn= $(this.wrap).find('.next')[0] || $(this.wrap.parentElement).find('.next')[0],
				this.list= this.node[0].children,
				this.listlength= this.list.length;
				if( this.listlength === 1 ) {
					this.infinite= this.autoplay= undefined;
				}
				this.touchEndCallback= 
					( this.swipetype !== true ) ? this.EndEvent : this.EndEventList,
				this.selectnode,
				this.target,
				
				this.start,
				this.end,
				this.way,
				this.offsetP,
				this.offsetL,
				this.stdP,
				this.stdLen,
				this.outerFunc,
				this.offsetPos,
				this.endPos,
				this.wrapLenOver,
				this.gap,
				this.maxMoving,
				this.timestamp,
				this.navDelay= {
					iPhone: 70,
					Android: 35,
					dur: 1500
				},
				this.navDelayVal= 5,
				this.moving,
				this.complete= true,
				this.autoPlaySet;
				this.bullet,
				this.bull,
				this.namespace,
				this.StartEventCallback;
				this._handler= {};
				this.handler();
				this.nodeStyle = window.getComputedStyle(this.node[0]);
				if( window.MSCSSMatrix ) {
					this.constMatrix= window.MSCSSMatrix;
					this.constStyle= 'msTransform';
				}
				if( window.WebKitCSSMatrix ) {
					this.constMatrix= window.WebKitCSSMatrix;
					this.constStyle= 'webkitTransform';
				}
				$.data(this.node[0], 'TouchSwipe', {});
			},
			run: function () {
				this.prevEvt();
				this.nextEvt();
				var that= this;
				if( this.swipetype === true ){
					this.IsBullet();
					if(	this.listlength === 2) this.checkLength();
				}
				this.Setting();
				var thisLen= this.node[0][this.offsetL],
					parentLen= this.wrap[this.offsetL];
				this.Event();
				if(this.autoplay && this.infinite) {
					this.autoInit();
					this.autoMoveCallback(2000);
				}
			},
			Setting: function () {
				var that= this,
					len;
				this.transform= 'transform' in this.node[0].style ? 'transform' : 'webkitTransform';
				this.getPos= 'getTranslate' + this.axis;
				this.translate= 'translate' + this.axis;
				if( this.axis === 'Y' ) {
					this.offsetP= 'offsetTop',
					this.offsetL= 'offsetHeight',
					this.stdP= 'top',
					this.trTag0= $.IsMobile.is ? 'translate3d(0, 0, 0) translateY(' : 'translateY(',
					this.trTag1= 'px)',
					this.stdLen= 'height',
					this.outerFunc= 'outerHeight'
				} else {
					this.offsetP= 'offsetLeft',
					this.offsetL= 'offsetWidth',
					this.stdP= 'left',
					this.trTag0= $.IsMobile.is ? 'translate3d(0, 0, 0) translateX( ' : 'translateX( ',
					this.trTag1= 'px)',
					this.stdLen= 'width',
					this.outerFunc= 'outerWidth'
				}
				this.gap= 10;
				$.each(this.navDelay, function(i,v){
					if ( $.IsMobile.nav === i ) {
						that.navDelayVal = v;
						return false;
					}
				});
				this.namespace= '.TouchSwipeAlign.'+this.node[0].classList[0];
				this.alignReset();
				$(window).off(this.namespace);
				$(window).on('resize'+ this.namespace, this.alignment());
			},
			IsBullet: function () {
				var that= this, bullet, i;
				if( this.bullet ) this.bullet= this.bullet[0];
				if( !this.bullet ) {
					this.bullet= this.wrap.nextElementSibling;
					this.bullet.innerHTML='';
					var	bullTag= '<li><svg><circle cx="5" cy="5" r="4" /></svg></li>',
						tagarr=[], tagStr;
					for ( i=0; i < this.listlength; i++ ) {
						tagarr[i]= bullTag;
					}
					tagStr= tagarr.join('');
					$(this.bullet).append(tagarr);
				}
				i=0;
				$.each(this.list, function(){
					bullet= that.bullet.childNodes[i];
					$.data(this, 'target', bullet);
					$.data(bullet, 'target', this);
					i++;
					if(that.count===2 && i===2) i=0;
				});
				this.bull= $(that.bullet.childNodes[0]).addClass('selected');
				if( this.bulletEvt ) this.bulletSelect();
			},
			checkLength: function () {
				var clone= $(this.list).clone(true);
				this.node.append(clone);
//				if( this.listlength === 1 ) this.node.append(clone.clone(true));
				this.listlength= this.list.length;
			},
			alignReset: function() {
				var firstElem= this.node[0].firstElementChild,
				lastElem= this.node[0].lastElementChild;
				this.target= this.target || firstElem;
				if( this.wraplength && 
					(this.wraplength === this.wrap[this.offsetL]) )
				{
					return false;
				}
				this.endPos= 
					lastElem[this.offsetP] + $(lastElem)[this.outerFunc](true);
				if( this.evenLen ) {
					this.endPos= $(this.list[0])[this.outerFunc](true) * this.listlength;
				}
				this.wraplength= this.wrap[this.offsetL];
				this.wrapLenOver= this.endPos > this.wraplength;
				this.maxMoving= this.wraplength - this.endPos - this.gap;
				if( !this.wrapLenOver ) {
					$(this.prevBtn).hide();
					$(this.nextBtn).hide();
				} else {
					$(this.prevBtn).show();
					$(this.nextBtn).show();
				}
				return true;
			},
			alignment: function () {
				var that= this;
				return function (e) {
					if( that.alignReset() ) {
						that.align();
					}
				}
			},
			align: function(target) {
				var apllyTarget;
				this.selectnode= this.target;
				this.node.velocity('stop');
				if( this.infinite ) {
					this.listInfinity();
				}
				this.target= target || this.target;
				this.moving= -$(this.target).position()[this.stdP];
				if( Math.abs(this.moving) >  Math.abs(this.maxMoving) ) {
					this.moving = this.maxMoving;
				}
				if( !this.swipetype && !this.wrapLenOver ) this.moving= 0;
				this.offsetPos= this[this.getPos](this.node[0]);
				this.MoveCallback({target: this.target, dur:0});
			},
//			align: function (length, method) {
//				var	wrapLen= this.wrap[this.offsetL],
//					lastelem= this.node[0].lastElementChild,
//					nodeLen= lastelem[this.offsetP] + $(lastelem)[this.outerFunc](true);
//				if( nodeLen > wrapLen ) {
//					var nodePos= this.node[0][this.offsetP],
//					method= method || 'css',
//					porp= {};
//				
//				var distance= length ? (nodePos + length) 
//						: ( (this.swipetype || this.target)? - $(this.target).position()[this.stdP] 
//						: -$(this.selectnode).position()[this.stdP] );
//				var max= nodeLen - wrapLen;
//				this.moving= distance > 0 ? 0 :( this.swipetype ||  max > Math.abs(distance)  ? distance : -max );
//				porp[this.stdP]= this.moving+'px';
//				this.node.stop()[method](porp);
//				}
//			},
			Event: function () {
				var that= this,
					thisnode= this.node[0],
					doc= $(document);
				if( !this.touchevent ) { return; }
				if( $.IsMobile.is ) {
					$(this.list).on(this._handler);
				} else {
					this.node.on('mousedown.TouchSwipe','li',function (e) {
						var self= this;
						that._handler['mousedown.TouchSwipe'].call(this,e);
						doc.on('mousemove.TouchSwipe',function (e) {
							that._handler['mousemove.TouchSwipe'].call(self,e);
						});
						doc.on('mouseup.TouchSwipe',function(e) {
							that._handler['mouseup.TouchSwipe'].call(self,e);
							doc.off('.TouchSwipe');
						});
					});
				}
				var lastElem= this.node[0].lastElementChild;
			},
			getTranslateX: function (myElement) {
				var matrix = new this.constMatrix(this.nodeStyle[this.constStyle]);
				return matrix.m41;
//				var matrix = myElement.style.transform.replace(/[^0-9\-.,]/g, '').split(',');
//				  var x = matrix[12] || matrix[4];
//				  var y = matrix[13] || matrix[5];
//				  console.log(this.node)
//				  return x;
			},
			getTranslateY: function (myElement) {
				var matrix = new this.constMatrix(this.nodeStyle[this.constStyle]);
				return matrix.m42;
			},
			handler: function () {
				var self= this.node[0];
				var that= this,
					namespace= '.TouchSwipe',
					clickTerm,
					_start, _move, _end,
					now, pageP, point, gap, maxMoving;
				if( $.IsMobile.is ) {
					_start= 'touchstart',
					_move= 'touchmove',
					_end= 'touchend'
				} else {
					_start= 'mousedown',
					_move= 'mousemove',
					_end= 'mouseup'
				}
				pageP= ( this.axis === 'Y' ) ? 'pageY' : 'pageX';
				this._handler[_start + namespace]= function (e) {
					if( !$.IsMobile.is ) e.preventDefault();
					var velData= that.node.data('velocity');
					that.selectnode= e.target.localName==='li' ? e.target : e.target.parentElement;
					that.start= e[pageP] || e.touches[0][pageP];
					that.end= 0;
					revEnd= 0;
					that.way= 0;
					that.target= that.selectnode;
					that.offsetPos= that[that.getPos](self);
					that.listInfinity();
					if (velData) {
						velData.transformCache.translate3d='(0px, 0px, 0px)';
						velData.transformCache[that.translate]='('+that.offsetPos+'px)';
					}
					$(self).velocity('stop',true);
					if( that.loose ) that.complete= true;
					if( that.callback ) {
						clickTerm= setTimeout (function () {
							if(that.complete=== true) {
								that.selectnode.style.opacity= 0.5;
							}
						},70)
					}
				}

				this._handler[_move + namespace]= function (e) {
					if( that.swipetype === true || that.endPos > that.wraplength ) 
					{
					e.preventDefault();
					that.complete= null;
					if( that.callback )that.selectnode.style.opacity= '';
					gap= that.gap;
					maxMoving= that.maxMoving;
					that.timestamp= e.timeStamp;
					now= e[pageP] || (e.touches && e.touches[0][pageP]);
					that.way= now - that.end;
					that.end= now;
					point= that.offsetPos + (that.end-that.start);
					if( !that.infinite ){
						point= point > gap ? gap : ( point < maxMoving ? maxMoving : point );
					}
					if( that.swipetype === true || that.endPos > that.wraplength)
						self.style[that.transform]= that.trTag0 + point + that.trTag1;
					}
				}

				this._handler[_end + namespace]= function (e) {
					e.preventDefault();
					clearTimeout(clickTerm);
					if( that.callback ) that.selectnode.style.opacity= '';
					if( Math.abs(that.way) < 1 &&
						that.way !== that.end) {
						that.complete= null;
					}
					if( that.loose && that.way === that.end) {
						that.complete= true;
					}
					if( that.swipetype!== true && 
						that.complete=== true && 
						that.callback )
					{
						that.callback(this);
					}
					if( Math.abs(that.way) < 1 ) {
						that.complete= true;
					}
					that.touchEndCallback(e);
				}
			},
		//List infinity-->
			listInfinity: function () {
				var node= this.node[0],
					firstElem= node.firstElementChild,
					lastElem= node.lastElementChild;
				if( (this.infinite) && 
					(this.selectnode === firstElem ||
					 this.selectnode === lastElem) ) 
				{
					var applynode, method, gap;
					if( this.selectnode === firstElem ) {
						applynode= lastElem,
						method= 'prepend';
						gap= this[this.getPos](node);
					}
					if( this.selectnode === lastElem ) {
						applynode= firstElem;
						method= 'append';
						gap= this.selectnode[this.offsetP] + this[this.getPos](this.node[0]);
					}
					$(node)[method]($(applynode));
					$(node)[0].style[this.transform]= 
						this.trTag0 + (-this.selectnode[this.offsetP] + gap) + this.trTag1;
					this.offsetPos= this[this.getPos](node);
				}
			},
		//touchEndCallback_Slide Callback-->
			EndEvent: function (e) {
				var that= this,
					node= this.node[0],
					int= e.timeStamp-this.timestamp,
					nodePos= this.offsetPos= this[this.getPos](node),
					coefficient= that.navDelayVal * Math.abs(that.way),
					delay= ( this.way < 0 ) ? -( coefficient/int ) : 
						   (this.way === this.end ? 0 : coefficient/int),
					finalPos= nodePos + delay,
					nodeEnd= nodePos + this.endPos + delay;
				this.moving= 
					( finalPos > 0 || !this.wrapLenOver ) ? 0 : 
					( nodeEnd < this.wraplength ? this.wraplength - this.endPos : '+=' + (delay+0.000001));
				this.MoveCallback();
			},
		//touchEndCallback_Swipe Callback-->
			EndEventList: function (e) {
				var node= this.node[0],
					parentPos= this.offsetPos= this[this.getPos](node),
					selectnode= this.selectnode,
					selectnodePos= $(selectnode).position()[this.stdP],
					selectnodeLength= $(selectnode)[this.outerFunc](true),
					nextnode= selectnode.nextElementSibling ? selectnode.nextElementSibling : selectnode,
					prevnode= selectnode.previousElementSibling ? selectnode.previousElementSibling : selectnode,		
					velocity= Math.abs(this.way),
					progress= parentPos + selectnodePos,
					percent= Math.abs(progress)/selectnodeLength;
				this.target= selectnode;
				if ( velocity > 2 ) {
					if( percent > 0.1 ){
						if ( this.way < 0 && progress < 0) this.target= nextnode;
						if ( this.way > 0 && progress > 0) this.target= prevnode;
					}
				}
				if( progress < 0) {
					if( percent > 0.4 ) {
						this.target= this.way === 0 ? nextnode : (this.way < 0 ? nextnode : selectnode);
					}
				} else {
					if( percent > 0.4 ) {
						this.target= this.way === 0 ? prevnode : (this.way < 0 ? selectnode : prevnode);
					}
				}
				this.moving= -$(this.target).position()[this.stdP];
				if(this.autoplay && this.infinite) {
					this.autoMoveCallback();
					return;
				}
//				console.log(this.end, Math.abs(this.way))
//				if( this.end === 0 && Math.abs(this.way) < 1 ) {
//					console.log(this.offsetPos, this.moving);
//				}
				if(this.offsetPos !== this.moving){
					this.MoveCallback({
						target: this.target
					});
				}
			},
			prevEvt: function() {
				var that= this;
				$(this.prevBtn).clickbindtouch(this.btnCallback('previousElementSibling'));
			},
			nextEvt: function() {
				var that= this;
				$(this.nextBtn).clickbindtouch(this.btnCallback('nextElementSibling'));
			},
			btnCallback: function(targetElem) {
				var that= this,
					btnMove= this.infinite ? swipe : (targetElem === 'nextElementSibling' ? slideNext : slidePrev),
					move= this.axis==='X' ? moveX : moveY;
				function swipe (e) {
					console.dir(this)
					that.selectnode= that.target;
					that.node.velocity('stop');
					if(that.infinite) {
						that.listInfinity();
					}
					that.target= that.target[targetElem];
					that.moving= -$(that.target).position()[that.stdP];
					that.offsetPos= that[that.getPos](that.node[0])
					that.MoveCallback({target: that.target});
				}
				function slideNext (e) {
					that.node.velocity('stop');
					that.offsetPos= that[that.getPos](that.node[0]);
					that.moving= -that.wraplength;
					if(Math.abs(that.offsetPos + that.moving) > Math.abs(that.maxMoving)) {
						that.moving= that.maxMoving - that.offsetPos + that.gap;
					}
					move();
				}
				function slidePrev (e) {
					that.node.velocity('stop');
					that.offsetPos= that[that.getPos](that.node[0]);
					that.moving= that.wraplength;
					if(that.offsetPos + that.moving > 0) {
						that.moving= -that.offsetPos;
					}
					move();
				}
				function moveX() {
					that.node.velocity({ translateX: '+='+that.moving+'px'})
				}
				function moveY() {
					that.node.velocity({ translateY: '+='+that.moving+'px'})
				}
				return btnMove;
			},
			MoveCallback: function ( prop ) {
				this['MoveCallback'+this.axis](prop);
			},
			MoveCallbackX: function(prop) {
				var that= this;
				var duration= (prop && prop.dur !== undefined) ? prop.dur 
						  : this.navDelay.dur,
				delay= (prop && prop.delay) || 0,
				target= (prop && prop.target) || null,
				callback= (prop && prop.callback) || null;
				$(this.node).velocity({ 
//					translateZ: 0,
					translateX : [this.moving,this.offsetPos],
					tween: this.offsetPos
				}, {
					duration: duration,
					delay: delay,
					easing: "easeOutExpo",
					begin: function() {
						if( this.end !== 0 && Math.abs(this.way) > 0) {
							that.complete= null;
						}
						that.selectnode= that.target;
						if( !that.swipetype ){ return; }
						that.bulletPoint(that.target);
					},
					progress: function(promise, progress, remainingMs) {
//						console.log(progress);
//						if(progress < 0.1 && that.complete=== true) {
//							that.complete= null;
//						}
//						if(progress > 0.8 && that.complete=== null) {
//							that.complete= true;
//						}
					},
					complete: function(){
						that.complete= true;
						that.offsetPos= '';
						if(callback) callback();
						if(that.autoplay && that.infinite) {
							that.autoMoveCallback(2000);
						}
					}
				});
			},
			MoveCallbackY: function(prop) {
				var that= this;
				var duration= (prop && prop.dur !== undefined) ? prop.dur 
						  : this.navDelay.dur,
				delay= (prop && prop.delay) || 0,
				target= (prop && prop.target) || null,
				callback= (prop && prop.callback) || null;
				$(this.node).velocity({ 
					translateY : [this.moving,this.offsetPos],
					tween: this.offsetPos
				}, {
					duration: duration,
					delay: delay,
					easing: "easeOutExpo",
					begin: function() {
						if( this.end !== 0 && Math.abs(this.way) > 0) {
							that.complete= null;
						}
						that.selectnode= that.target;
						if( !that.swipetype ){ return; }
						that.bulletPoint(that.target);
					},
					complete: function(){
						that.complete= true;
						that.offsetPos= '';
						if(callback) callback();
						if(that.autoplay && that.infinite) {
							that.autoMoveCallback(2000);
						}
					}
				});
			},
			bulletPoint: function(target) {
				var bullet= $(target).data('target');
				this.bull.removeClass('selected');
				this.bull= $(bullet);
				this.bull.addClass('selected');
			},
			bulletSelect: function() {
				var that= this,
					obj= {
						selector: 'li',
						callback: function(e) {
							that.bulletSelectCallback(this)
						}
					}
				$(this.bullet).clickbindtouch(obj);
			},
			bulletSelectCallback: function(self) {
				var target= $(self).data('target');
				this.align(target);
				this.bulletPoint(target);
			},
			autoInit: function() {
				var target= this.node[0].firstElementChild;
				if( target.nextElementSibling === null ) {
					target= this.selectnode;
				}
				this.target= target.nextElementSibling;
				if( $(this.target).position() ) {
					this.moving= -$(this.target).position()[this.stdP];
				}
				this.offsetPos= this[this.getPos](this.node[0]);
			},
			autoMoveCallback: function(delay) {
				var that= this;
				this.MoveCallback({
					target: this.target,
					dur: this.navDelay.dur,
					delay: delay || 0,
					callback: function () {
						if(that.infinite) {
							that.listInfinity();
						}
						that.target= that.target.nextElementSibling;
						that.moving= -$(that.target).position()[that.stdP];
					}
				});
			},
			autoMoveStop: function() {
				
			},
			destroy: function () {
				var that= this;
				$(this.list).off('.TouchSwipe');
				this.node.off('.TouchSwipe')
					.velocity('stop',true)
					.removeData('velocity','TouchSwipe')
					[0].style[this.transform]= 'translate3d(0, 0, 0)';
				$(window).off(this.namespace);
			}
		});
		return TouchSwipe;
	})(),
	PagingClass: (function () {
		//Paging Class-->
		function PagingClass () {}
		$.extend( PagingClass.prototype, {
			init: function (selector,pageviewnode,callback) {
				this.node= selector,
				this.boardTableData= this.node.find('.board_table_data'),
				this.page= this.node.find('#page'),
				this.pagearea= this.page.find('#page-area'),
				this.pagepart= this.page.find('#page-part'),
				this.pageblock= this.page.find('.page-block'),
				this.leftsub= this.page.find('#leftsub'),
				this.rightsub= this.page.find('#rightsub'),
				this.move= this.page.find('.move'),
				this.prev= this.leftsub.find('#prev'),
				this.next= this.rightsub.find('#next'),
				this.now= this.page.find('.now'),
				this.firstBlock= this.pagepart[0].firstChild,
				this.firstBlockWidth= this.firstBlock.offsetWidth,
				this.lastBlock= this.pagepart[0].lastChild,
				this.nowBlock= this.firstBlock,
				this.selectPage= this.pageblock.find('.selected'),
				this.selecBlock= this.pagepart.find('.page-block.selected'),
				this.selecBlockNum= this.selecBlock[0].attributes.blocknum.value,
				this.moveoffset,		
				this.wholeblock= this.pagepart[0].attributes.blockcount.value,
				this.blocknum,
				this.countnode= pageviewnode.find('.active-option'),
				this.sumwidthval,
				this.callback= callback,
				this.ratio= 0.5,
				this.$TouchSwipeChild;
			},
			run: function () {
				this.sumwidth();
				this.setMobile();
				this.pageClick();
			},
			setMobile: function () {
				this.setWidth();
				if(!$.IsMobile.is) {
					this.leftsub.hide();
					this.nextpreview();
					this.movingEnd();
					this.movingNow();
				} else {
					this.move.hide();
					this.swipe();
					this.mobilemovingEnd();
					this.mobilemovingNow();
				}
			},
			sumwidth: function () {
				var value= 0;
				$.each(this.pageblock,function(i,v){
					value+= this.offsetWidth;
				});
				this.sumwidthval= value;
			},
			setWidth: function () {
				this.pagearea.css({'width':this.firstBlockWidth+'px'});
			},
			swipe: function () {
				var ratio= this.ratio,
					strRatio= (ratio*100)+'%',
					pageareaWidth= this.page[0].offsetWidth*ratio;
				this.pagearea.css({'width':strRatio});
				var TouchSwipeChild= function(){};
				TouchSwipeChild.prototype= new $.TouchSwipe();
				this.$TouchSwipeChild= new TouchSwipeChild();
				this.$TouchSwipeChild.init(this.pagepart);
				this.$TouchSwipeChild.run();
			},
			nextpreview: function () {
				var that= this;
				this.move.on($.IsMobile.click, function(){
					var blockNum= this.id==='next' ? that.wholeblock : '1',
						method= this.id==='next' ? 'next' : 'prev';
					if (that.selecBlockNum !== blockNum){
						that.selecBlock= that.selecBlock.removeClass('selected')[method]()
										 .addClass('selected');
						that.moving();
					}
				});
			},
			moving: function () {
				var that= this;				
				var width= this.selecBlock[0].offsetWidth;
				this.moveoffset= this.selecBlock[0].offsetLeft,
				this.selecBlockNum= this.selecBlock[0].attributes.blocknum.value;
				this.pagepart.animate({'left': -(this.moveoffset)+'px'});		
				this.pagearea.animate({'width': width+'px'});
				if(that.selecBlockNum === '1') {
					that.leftsub.slideUp();
				}else{
					that.leftsub.slideDown();
				}
				if(that.selecBlockNum == that.wholeblock) {
					that.rightsub.slideUp();
				}else{
					that.rightsub.slideDown();
				}
			},
			movingEnd: function () {
				var that= this;
				this.page.on($.IsMobile.click,'.end',function(){
					if( this.innerText === '1') {
						that.selecBlock= $(that.firstBlock);
					}else{
						that.selecBlock= $(that.lastBlock);
					}
					that.moving();
				});
			},
			mobilemovingEnd: function () {
				var that= this;
				this.page.on($.IsMobile.click,'.end',function(){
					event.preventDefault();
					if( this.innerText === '1') {
						that.$TouchSwipeChild.moving= '0';
					} else {
						var moving= -that.sumwidthval+that.pagearea[0].offsetWidth
						that.$TouchSwipeChild.moving= moving;
					}
					that.$TouchSwipeChild.MoveCallback(that.$TouchSwipeChild.node)
				});
			},
			movingNow: function () {
				var that= this;
				this.page.on($.IsMobile.click,'.now',function(e){
					e.preventDefault();
					if(that.selecBlockNum !== that.nowBlock.attributes.blocknum.value) {
						that.selecBlock.removeClass('selected');
						that.selecBlock= $(that.nowBlock).addClass('selected');
						that.moving();
					}
				});
			},
			mobilemovingNow: function () {
				var that= this;
				this.page.on($.IsMobile.click,'.now',function(e){
					e.preventDefault();
					var moving= -(that.nowBlock.offsetLeft + that.selectPage[0].offsetLeft),
						maxmoving= -that.sumwidthval+that.pagearea[0].offsetWidth;
					moving = moving < maxmoving ? maxmoving : moving;
					that.$TouchSwipeChild.moving= moving;
					that.$TouchSwipeChild.MoveCallback(that.$TouchSwipeChild.node);
				});
			},
			pageClick: function () {
				var that= this;
				var target= this.pageblock,
					obj= {
						selector: 'span',
						namespace: '.select',
						callback: function(e){
							if( that.selectPage[0] !== this ){
								if(e && e.preventDefault ) e.preventDefault();
								that.pageClickEvt(this);
								that.callback(this);
							}
						}
					}
				target.clickbindtouch(obj);
			},
			pageClickEvt: function (selector) {
				this.selectPage.removeClass('selected'),
				this.selectPage= $(selector).addClass('selected'),
				this.nowBlock= this.selectPage[0].parentNode;
			}
		});
		return PagingClass;
		//<--Paging Class
	})(),
	ImgSlide: (function () {
//		ImgSlide Class-->
		function ImgSlide () {}
		$.extend ( ImgSlide.prototype, {
			init: function (node) {
				this.node= node;
				this.wrap= this.node.find('.wrap'),
				this.imgArea= this.wrap.find('.imgArea'),
				this.list= this.imgArea.find('li'),
				this.length= this.list.length,
				this.image= this.list.find('img'),
				this.count= this.imgArea[0].childElementCount;	
				this.node,
				this.oldimg= $(this.imgArea[0].firstElementChild),
				this.intv= 3600,
				this.nextNode= this.wrap.find('.next'),
				this.prevNode= this.wrap.find('.prev');
				this.TouchSwipe,
				this.callback;
			},
			run: function (auto) {
				var that=this;
				this.setting(auto),
				this.next(),
				this.prev();
				if(auto) this.autoSet();
			},
			setting: function (auto) {
				var that= this;
				this.name= this.node[0].id || this.node[0].classList[0];
				var namespace= '.ImagslideAlign.'+ this.name;
				
				$.each(this.list, function (i,v){
					$(this).addClass(String(i));
				});
				
				this.arrowDisapear();
				this.wrap.off();
				if( this.length > 1 ) this.hoverEvt1();
				if(auto) this.hoverEvt2();
				
				$(window).off(namespace);
				$(window).on('resize' + namespace, function(e){
					if (that.target) that.moving(that.target,'css');
				});
			},
			autoSet: function () {
				var that= this;
				if(_Shinhan.imgslideInt) {
					clearInterval(_Shinhan.imgslideInt[this.name])
				} else {
					_Shinhan.imgslideInt= {};
				}
				
				var c=0;
				$.each(_Shinhan.imgslideInt,function(i,v){
					c++;
				});
				
				_Shinhan.imgslideInt[this.name]= setInterval(function(){
					that.movingNext.call(that)
				},that.intv);
			},
			next: function (int) {
				var that=this;
				this.nextNode.on('click',function (e) {
					that.movingNext(int);
				});
			},
			prev: function (int) {
				var that=this;
				this.prevNode.on('click',function (e) {
					that.movingPrev();
				});
			},
			movingNext: function (int) {
//				console.dir(this.target);
				if(int) {
					this.imgArea.stop().animate({'left': '-='+int + 'px'});
				} else {
					var first= $(this.imgArea.find('li')[0]);
					this.target= (!this.target) ? first : this.target;
					if( this.target[0].nextElementSibling ) {
						this.target= this.target.next();
					} else {
						this.imgArea.append(first).css({'left': -this.target[0].offsetLeft + 'px'});
						this.target= (this.target.next().length > 0) ? this.target.next() : this.target;
					}
					this.moving(this.target);
					if( this.callback ) this.callback();
				}
			},
			movingPrev: function () {
				var length= this.length;
				var first= $(this.imgArea.find('li')[0]);
				var last= $(this.imgArea.find('li')[length-1]);
				this.target= this.target || first;
				if( this.target.prev().length > 0 ) {
					this.target= this.target.prev();
				} else {
					this.imgArea.prepend(last).css({'left': -this.target[0].offsetLeft + 'px'});
					this.target= (this.target.prev().length > 0) ? this.target.prev() : this.target;
				}
				this.moving(this.target);
				if( this.callback ) this.callback();
			},
			moving: function (target,method) {
				var method= method || 'animate';
				this.imgArea.stop()[method]({'left' : -target[0].offsetLeft + 'px'},{
					duration: 1500,
					easing: "easeOutExpo"
				});
			},
			hoverEvt1: function () {
				var that= this;
				var enter= 'mouseenter',
					leave= 'mouseleave';
				this.wrap.on(enter+'.arrA',function () {
					that.arrowApear();
				});
				this.wrap.on(leave+'.arrB',function () {
					that.arrowDisapear();
				});
				return this;
			},
			hoverEvt2: function () {
				var that= this;
				this.wrap.on('mouseenter.clInt',function (e) {
					that.clearitv();
				});
				this.wrap.on('mouseleave.sInt',function () {
					that.autoSet();
				});
				return this;
			},
			clearitv: function () {
				clearInterval(_Shinhan.imgslideInt[this.name]);
			},
			arrowApear: function () {
				this.nextNode.stop().animate({right:'2%'});
				this.prevNode.stop().animate({left:'2%'});
			},
			arrowDisapear: function () {
				this.nextNode.stop().animate({right:'-20%'});
				this.prevNode.stop().animate({left:'-20%'});
			}
		});
		return ImgSlide;
//		<--ImgSlide Class
	})(),
	FileUpload: (function () {
//	FileUpload Class-->
		function FileUpload () {}
		$.extend( FileUpload.prototype, {
			init: function (node) {
				this.node= node,
				this.ext= ['gif', 'png', 'jpg', 'jpeg','svg'],
				this.foldername, this.thumbLen, this.multiple,
				this.singleCtg, this.change
				if( node.node ) $.extend ( this, node );
				this.addBtn= this.node.find('.add-btn'),
				this.fileform= this.node.find('.fileform'),
				this.uploadInput= this.fileform.find('input'),
				this.previewArea= this.node.find('.file_preview_area'),
				this.totalarea= this.previewArea.find('.file-total'),
				this.previewList= this.previewArea.find('.file_preview'),
				this.previewElems= this.previewList[0].childNodes,
				this.removeBtn= this.node.find('.remove-btn'),
				this.uploadBtn= this.node.find('.upload-btn'),
				this.updatetemp= this.node.find('.update-tempArea'),
				this.formData,
				this.fileArr= {},
				this.prgressArea= this.node.find('.progress'),
				this.progview= this.prgressArea.find('.progview'),
				this.progviewBar= this.progview.find('.bar'),
				this.result= this.node.find('.result'),
				this.count= 0,
				this.idxnum= 0
			},
			run: function () {
				this.sortable();
				this.AddClickEvt(),
				this.ChangeEvt(),
				this.wholeRemove(),
				this.UploadClick();
			},
			sortable: function() {
				this.previewList.sortable({
					placeholder: "highlight",
					forcePlaceholderSize: true
				});
			},
			AddClickEvt: function () {
				this.addBtn.clickbindtouch(this.AddClickHandler(this));
			},
			AddClickHandler: function (that) {
				return function () {
					that.uploadInput.click();
				}
			},
			ChangeEvt: function (that) {
				var that= this,
					listElems= this.previewElems;
				var closeTag=
					'<div class="close">\
						<svg>\
							<path d="M1 1 l8 8"  stroke="#9CA4A6" stroke-width="1" />\
							<path d="M9 1 l-8 8"  stroke="#9CA4A6" stroke-width="1" />\
						</svg>\
					</div>',
		    		imgtag0= '<li class="preview upload '
		    		imgtag1= '">'+closeTag,
		    		imgtag1_1= '<img src="',
		     		imgtag2= '" />',
		     		imgtag3= '<div class="filename file',
		     		imgtag4= '" title="',
		     		imgtag5= '">',
		    		imgtag6= '</div></li>';
				var noticeDebounce= $.noticeFadeout();
				this.uploadInput.on('change', function() {
					if(!that.multiple){
						that.previewList.empty();
						that.fileArr= {};
						that.filenameArr=[];
					}
					if(Object.keys(that.fileArr).length === 0) {
						that.count= 0;
						that.idxnum= 0;
					}
					
		        	var file= this.files;
		         	$.each(file, function(){
		         		var self= this,
		         			dupl= false;
		         		var ext = $(this)[0].name.split('.').pop().toLowerCase(); //확장자
		         		if($.inArray(ext, that.ext) == -1) {
		         			var extStr= that.ext.toString();
		         			noticeDebounce(that.result, '<span>'+ this.name +'의 확장자가 잘못 되었습니다. ('+ extStr +' 만 업로드 가능)\
		    	            		</span><br>','append');
		    	            return;
		         		}
		         		$.each( that.fileArr, function(i, v) {
		         			if($(v).data('filedata').filename=== self.name) {
		         				dupl= true;
		         				return false;
		         			}
		         		});
	    	        	if( dupl ) {
	    	        		noticeDebounce(that.result, '<span>'+this.name+'은 이미 추가되어 있습니다.</span><br>','append');
	    	        		return;
	    	        	}

	    	        	var blobURL = window.URL.createObjectURL(this),
    	        		imgurl= that.previmg || imgtag1_1 + blobURL + imgtag2,
    	        		previewElem, filedata;

    	        		that.count++;
	    	        	
		         		that.previewList.append(
		         			imgtag0 + (that.idxnum) + imgtag1 + imgurl + imgtag3 + (that.idxnum) 
		         			+ imgtag4 + this.name + imgtag5 + this.name + imgtag6);
		         		previewElem= that.previewList.find('.'+that.idxnum);
		         		previewElem.data('filedata',{});
		         		filedata= previewElem.data('filedata');
		         		filedata.index= that.idxnum;
		         		filedata.file= this;
		         		filedata.filename= this.name;
//		         		filedata.category= that.foldername || 'unknown';
		         		that.fileArr[that.idxnum]= previewElem[0];
		         		
		         		that.EachRemoveClick(previewElem);
    	        		that.idxnum++;
		         	});
		         	if(listElems.length > 0) {
		         		that.totalarea.html('<span>'+that.count+'</span> files selected.');
		         		that.previewArea.slideDown();
		         	}
		         	if(that.multiple) this.value='';
		         	if(that.change) that.change();
				});
			},
			EachRemoveClick: function (elem) {
				var that= this;
				var obj= {
					selector: '.close',
					callback: function(e){
						var parent= this.parentElement,
							index= $(parent).data('filedata').index;
						$(parent).remove();
						delete that.fileArr[index];
						that.count--;
						that.totalarea.html('<span>'+that.count+'</span> files selected.');
						if( that.count === 0 ) that.hide();
					}
				}
				elem.clickbindtouch(obj);
			},
			wholeRemove: function () {
				var that= this;
				this.removeBtn.clickbindtouch(function() {
					if(Object.keys(that.fileArr).length > 0) {
						$.each( that.fileArr, function(i, v) {
							$(v).slideUp(function () {
								$(this).remove();
							});
						});
						that.fileArr= {};
				        that.uploadInput.slideDown();
				        that.result[0].innerHTML='';
				        that.uploadInput[0].value='';
				        that.hide();
				        return;
					}
			    });
			},
			hide: function () {
				var that= this;
				this.previewArea.slideUp(function () {
					that.previewList.html('');
					that.totalarea.html('');
					that.progviewBar.stop().animate({'width': '0%'});
					that.prgressArea.hide();
		        });
			},
			UploadClick: function () {
				var that= this;
				var noticeclosuer= that.result.noticeFadeout();
				this.uploadBtn.clickbindtouch(function (e) {
					if(that.Uploadcallback) that.Uploadcallback.call(this,that,noticeclosuer);
				});
			},
			Uploadcallback: function (that,notice) {
				if( Object.keys(that.fileArr).length === 0 ) {
					that.prgressArea.hide();
					notice('<span>There is No selected files. <br> Please Add files.</span>');
					return;
				}
				var loopTarget= that.singleCtg ? $(that.previewElems) : that.fileArr,
					category= that.foldername || 'unknown';
				var formData = new FormData();
				
				$.each(loopTarget, function(i, v){
					var filedata= $(v).data('filedata');
					formData.append('file[]', filedata.file);
					formData.append('foldername[]', category);
					if( that.staticName )
						formData.append('staticName', that.staticName);
					if( that.add )
						formData.append('add[]', that.add);
				});
				if( that.thumbLen ) formData.append('thumbLen', that.thumbLen);
				var obj= {
					url: that.url,
					formdata: formData,
					formdataFile: true,
					xhrtype: 'upload',
					complete: function (data) {
						var proghide= setTimeout(function(){
							that.prgressArea.fadeOut();
							clearTimeout(proghide);
						},500);
						that.result.html(data);
					},
					done: function () {
						if(that.callback) that.callback();
					}
				}
				that.prgressArea.AjaxPrintXHR(obj);
			}
		});
		return FileUpload
//	<--FileUpload Class
	})(),
	Submit : (function(){
//	Submit Class-->
		function Submit() {};
		$.extend( Submit.prototype, {
			init: function (node) {
				this.node= node;
				this.ratio= 0.5;
				if( node.node ) $.extend ( this, node );
				this.submitbtn= this.node.find('.submit-button'),
				this.clearbtn= this.node.find('.clear-button'),
				this.resultArea= this.node.find('.board_table_area'),
				this.totalcount,
				this.fieldArea,
				this.field,
				this.dataArea,
				this.pageviewArea= this.node.find('.page-view'),
				this.pageview= this.pageviewArea.find('.active-option'),
				this.data= {};
				this.ajaxObj= {
					url: this.url+'.php',
					type: 'GET',
					formdata: this.data,			
				};
				this.$PagingExt,
				this.arrow
			},
			run: function () {		
				this.Onsubmit();
				this.clearClick();
			},
			Onsubmit: function () {
				if( this.submitbtn.length === 0) {
					this.Onsubmitcallback()();
				}else{
					this.submitbtn.clickbindtouch(this.Onsubmitcallback());
				}
			},
			Onsubmitcallback: function (pageview,callback) {
				var that=this,
					noticeclosuer= that.resultArea.noticeFadeout();
				return function (e) {
					if(e) e.preventDefault();
					if (typeof pageview === 'function') {
						callback= pageview;
						pageview = undefined;
					}
					if( that.data && that.data.orderby ) delete that.data.orderby;
					that.loopdata();
					if(pageview) that.data.pageview= pageview;
					var ajaxArea= that.resultArea,
					ajaxObjext= {};
					if( that.data.field.length === 0 ) {
						noticeclosuer('<div class="alert">No field selected.</div>')
						return false;
					}
						
					$.extend(ajaxObjext, that.ajaxObj);
					ajaxObjext.complete= function() {
						that.tableData= that.resultArea.find('.board_table_data');
						that.totalcount= that.resultArea.find('.totalcount span');
						that.fieldArea= that.tableData.find('.board_field_area')
						that.field= that.fieldArea.find('.board_field');
						that.dataArea= that.tableData.find('.board_list_area');
						var PagingExt= function(){};
						PagingExt.prototype= new $.PagingClass();
						function Pgcallback(selector) {
							var objext= {},
//								showcount= this.countnode[0].innerHTML,
								page= Number(this.selectPage[0].innerText);
							$.extend(objext, that.ajaxObj);
							that.data.page= page;
							that.data.fieldprint= false;
							objext.complete= function() {
								if( that.pagingcallback ) that.pagingcallback();
								if( that.Printcallback ) that.Printcallback();
							}
							that.PrintData(that.dataArea,objext);
							
							delete that.data.page;
							delete that.data.fieldprint;
						}
						
						if(that.dataArea[0].childNodes.length > 0){
							that.$PagingExt= new PagingExt();
							that.$PagingExt.init(that.resultArea,that.pageviewArea,Pgcallback);
							that.$PagingExt.ratio= that.ratio;
							that.$PagingExt.run();
							that.fieldFix();
						}
						if( that.callback ) that.callback();
						if( callback ) callback();
						if( that.Printcallback ) that.Printcallback();
					}
					that.PrintData(ajaxArea,ajaxObjext);
				}
			},
			loopdata: function () {
				this.data.field= 'all';
				this.data.fieldprint= true;
			},
			PrintData: function (printArea, objData) {
				printArea.AjaxPrint(objData);
//				if( this.Printcallback ) this.Printcallback();
			},
			fieldFix: function () {
				var that= this;
				var field= that.fieldArea;
				var winscrollTop= 0,
					wrapscrollTop= this.tableData.scrollTop(),
					fieldoffsetTop= this.tableData.offset().top;
				
				$(document).off('.'+this.url).on('scroll.'+this.url ,function(e){
					clearTimeout(scrollTerm);
					if(window.pageYOffset > fieldoffsetTop) field.css({'top': ''});
					winscrollTop= window.pageYOffset - fieldoffsetTop;
					var scrollTerm= setTimeout(function () {
						if(window.pageYOffset > fieldoffsetTop) {
							field.css({'top': winscrollTop+wrapscrollTop+'px'})
						}else{
							field.css({'top': wrapscrollTop+'px'})
						}
						clearTimeout(scrollTerm);
					},650)
					
				});
				if( !$.IsMobile.is ){
					this.tableData.on('scroll',function(e){
						clearTimeout(scrollTermIn);
						if ( wrapscrollTop !== $(this).scrollTop() )field.css({'top': ''});
						wrapscrollTop= $(this).scrollTop();
						var scrollTermIn= setTimeout(function () {
							if( wrapscrollTop > 0 || window.pageYOffset > fieldoffsetTop ) {
								var winscrollvar= winscrollTop < 0 ? 0 : winscrollTop;
								field.css({'top': wrapscrollTop+winscrollvar+'px'})
							}else{
								field.css({'top': ''})
							}
							clearTimeout(scrollTermIn);
						},650)
					});
				}
				
				this.sortData();
			},
			sortData: function () {
				var that= this;
				this.field.find('li').clickbindtouch(function (e) {
					e.preventDefault();
					var self= this,
						listarea= that.dataArea,
						dup= that.data.orderby=== this.attributes.index.value;
					that.data.order= 
						( dup && that.data.order=== 'DESC' ) ? 'ASC' : 'DESC';
					that.data.orderby= this.attributes.index.value;
					that.data.fieldprint= false;
					
					that.$PagingExt.pageClickEvt(that.$PagingExt.pageblock[0].firstChild);
					that.$PagingExt.page.find('.now').trigger($.IsMobile.click);
					var ajaxObjext= {};
					$.extend(ajaxObjext, that.ajaxObj);
					ajaxObjext.complete= function(){
						if( dup ) {
							that.arrow.toggleClass('on');
						} else {
							if( that.arrow ) that.arrow.hide().removeClass('on');
							that.arrow= $(self).find('.sort-arrow').css({'display':'inline-block'});
						}
						delete that.data.fieldprint
						if( that.Printcallback ) that.Printcallback();
					}
					that.PrintData(listarea,ajaxObjext);
				});
			},
			clearClick: function () {
				var that= this;
				this.clearbtn.on($.IsMobile.click,function(e){
					e.preventDefault();
					that.resultArea[0].innerHTML= '';
				})
			}
		});
		return Submit;
//	<--Submit Class
	})()
});
});
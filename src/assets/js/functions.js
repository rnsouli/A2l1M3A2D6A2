
;(function($, window, document, undefined) {
	
	var $win = $(window);
	var $doc = $(document);
	var $html = $(document.documentElement);
	var isMobile = $.browser.mobile;
	
	function fixedHeader() {
		var winO = $win.scrollTop();
		var $header = $('.header--large');
	
		var isHeaderFixed = winO > 0;
	
		$header.toggleClass('fixed', isHeaderFixed);
	}
	
	function barHeight() {
		var $barNav = $('.js-bar-nav');
	
		if ($barNav.length) {
			var barNavH = $barNav.find('.nav').outerHeight();
	
			$barNav.css('height', barNavH)
		}
	}
	
	function fixedBar() {
		var $barNav = $('.js-bar-nav');
		var $header = $('.header--default');
	
		if ($barNav.length) {
			var winO = $win.scrollTop();
			var barPos = $barNav.offset().top
	
			if (barPos < winO) {
				$barNav.addClass('fixed');
				$header.addClass('fixed');
			} else {
				$barNav.removeClass('fixed');
				$header.removeClass('fixed');
			}
		}
	}
	
	function animateTabs($tabs, indx) {
		var tabPercent = indx * 100;
	
		$tabs
			.find('.tabs__body-inner')
				.css({
					'-webkit-transform':'translateX('+ tabPercent + '%)',
					'-ms-transform':'translateX('+ tabPercent + '%)',
					'transform':'translateX('+ tabPercent + '%)'
				});
	}
	
	function CustomSelect(){
		// Select Custom
		$('.select-custom').each(function() {
			var textLabel = $(this).data('label');
			var $select = $(this).find('select');
			$select.dropdown({
				label: textLabel
			});
		});
	}

	$doc.ready(function() {
		// Set class for touch enabled/disabled devices
		$html.addClass(isMobile ? 'touch' : 'no-touch');

		// Back Functionality
		$('.js-btn-back').on('click', function(e) {
		    e.preventDefault();

		    history.back(1);
		});

		// Clone Elements
		
		// // Clone Burger Btn
		// if ($('.nav-mobile-outer').length) {
		// 	$('.nav-mobile-outer')
		// 		.clone()
		// 		.addClass('cloned')
		// 		.prependTo('.header');
		// }

		// // Clone Navigation
		// if ($('.js-bar-nav').length) {
		// 	$('.nav')
		// 		.clone()
		// 		.removeClass('nav--default')
		// 		.addClass('nav--bar')
		// 		.appendTo('.js-bar-nav .bar__body')
		// }

		// if ($('.js-footer-content').length) {
		// 	$('.js-footer-content')
		// 		.clone()
		// 		.prependTo('.header .header__content-foot')
		// }
		
		// if ($('.js-footer-nav').length) {
		// 	$('.js-footer-nav')
		// 		.clone()
		// 		.prependTo('.header .header__content-foot')
		// }

		// Mobile Navigation
		// $('.nav-mobile-outer').on('click', function(e) {
		// 	e.preventDefault();
		// 	var $navBtn = $('.nav-mobile-outer');
		// 	var $headerContent = $('.header .header__content');

		// 	$navBtn.toggleClass('active');

		// 	$headerContent.toggleClass('expanded');

		// 	$('.header .search').removeClass('expanded');

		// 	$('.btn-search').removeClass('active');

		// 	if ($navBtn.hasClass('active')) {
		// 		$('.wrapper').scrollLock('enable');
		// 		$headerContent.scrollLock('enable');
		// 	} else {
		// 		$('.wrapper').scrollLock('disable');

		// 		$('.nav li').removeClass('expanded');
		// 	}
		// });

		// $('.nav--default a').on('click', function(e) {
        //     if ($(this).siblings('.nav__dropdown').length ) {
        //         if( $win.width() < 1200 ) {
        //             if(!$(this).parent().hasClass('expanded')) {
        //                 e.preventDefault();
        //             }	      

	    //         	$('.nav--default .nav__dropdown').scrollLock('disable');
        //         }
                
        //         $(this)
        //         	.parent()
        //         	.addClass('expanded')
        //         	.siblings()
        //         	.removeClass('expanded');

        //     	$('.header .header__content').addClass('alt');

        //     }
        // });

        // $('.nav > ul > li > a').each(function() {

        // 	if ($(this).siblings('.nav__dropdown').length) {
	    //     	var linkText = $(this).text();

	    //     	$(this)
	    //     		.siblings('.nav__dropdown')
	    //     		.find('.nav__dropdown-head span')
	    //     		.text(linkText);
        // 	}
        // });	

        // $('.nav .nav__dropdown-head .btn-prev').on('click', function(e) {
        // 	e.preventDefault();

        // 	$(this)
        // 		.closest('li')
        // 		.removeClass('expanded');

    	// 	$('.header .header__content').removeClass('alt');
        // });

		// Fullsize image
		$('.fullsize-image').each(function() {
			var $holder = $(this);
			var imageSrc = $holder.find('img').attr('src');

			$holder.css('background-image', 'url("' + imageSrc + '")');
		});

		// Search Expand
		$('.btn-search').on('click', function(e) {
			e.preventDefault();

			$(this).toggleClass('active');

			$('.header .search').toggleClass('expanded');

			$('.header .header__content').removeClass('expanded');

			$('.nav-mobile-outer').removeClass('active');

			if ($(this).hasClass('active')) {
				$('.wrapper').scrollLock('enable');
			} else {
				$('.wrapper').scrollLock('disable');
			}
		});

		// // Slider Swiper
		// $('.js-slider-articles').each(function() {
		// 	var $slider = $(this).find('.swiper-container');
		// 	var $prev = $(this).find('.swiper-button-prev');
	    // 	var $next = $(this).find('.swiper-button-next');
		// 	var sliderNumbers = $(this).data('slides');
		// 	var sliderNumbersTablet = $(this).data('slides-tablet');
		// 	var sliderNumbersMobile = $(this).data('slides-mobile');

		// 	var mySwiperPrimary = new Swiper ($slider, {
		// 		loop: true,
		// 		slidesPerView: sliderNumbers,
		// 		spaceBetween: 15,
		// 		nextButton: $next,
	    //     	prevButton: $prev,
		//         breakpoints: {
		//             1199: {
		//                 spaceBetween: 20,
		//                 slidesPerView: sliderNumbersTablet,
		//             },
		//             767: {
		//                 spaceBetween: 30,
		//                 slidesPerView: sliderNumbersMobile,
		//                 spaceBetween: 12
		//             }
		//         }
		//     });
			
		// });

	    // $('.js-slider-single').each(function() {
	    // 	var $slider = $(this).find('.swiper-container');
	    // 	var $prev = $(this).find('.swiper-button-prev');
	    // 	var $next = $(this).find('.swiper-button-next');

	    // 	if ($slider.find('.swiper-slide').length > 1) {
	    // 		$(this).addClass('slider-initialized');

		// 	    var mySwiperSecondary = new Swiper ($slider, {
		// 			loop: true,
		// 			nextButton: $next,
		//         	prevButton: $prev
		// 	    });
	    // 	}
	    // });

	    // Toggle Functionality
	    $('.js-btn-toggle').on('click', function(e) {
	    	e.preventDefault();

	    	var $target = $($(this).data('target'));
	    	var classToggle = $(this).data('class');

	    	$target.toggleClass(classToggle);

	    	$(this).toggleClass('active');
	    });

	    // // Form Message
	    // $('.js-form-message form').on('submit', function(e) {
	    // 	e.preventDefault();

	    // 	$(this)
	    // 		.closest('.form')
	    // 		.addClass('success');
	    // });

	    // Tabs
	    var activeTabClass = 'current';
    
	    $('.tabs__nav a').on('click', function(event) {
	        var $tabLink = $(this);
	        var $targetTab = $($tabLink.attr('href'));
	 
	        $tabLink
	            .parent()
	            .add($targetTab)
	            .addClass(activeTabClass)
	                .siblings()
	                .removeClass(activeTabClass);
	        
	        event.preventDefault();

	        if ($tabLink.closest('.tabs-slide').length) {
	        	animateTabs($tabLink.closest('.tabs-slide'), $tabLink.parent().index());
	        }

	        if ($tabLink.closest('.tabs__nav').children('span').length) {
	        	var tabLinkText = $tabLink.text();

	        	$tabLink
	        		.closest('.tabs__nav')
	        		.removeClass('expanded')
	        		.children('span')
	        		.text(tabLinkText);
	        }
	    });

	    $('.tabs__nav > span').on('click', function() {
	    	$(this)
	    		.closest('.tabs__nav')
	    		.toggleClass('expanded');
	    });
	});

	$win
		.on('load', function() {
			if ($('.progress-bar').length) {
				$('.progress-bar').each(function() {
					var $bar = $(this)
					var percent = $bar.data('percent');

					$bar.find('span').css('width', percent)
				});
			}

			if ($('.slider').length) {
				$('.slider').addClass('loaded');
			}
		})
		.on('load scroll', function() {
			// Fixed Header
			fixedHeader();
			
			// Fixed Bar
			fixedBar();
		})
		.on('load resize', function() {
			// Bar Height
			barHeight();

			if ($('.footer--small').length) {
				$('.wrapper').css('padding-bottom', $('.footer--small').outerHeight());
			}

			if ($('.widget-socials').length) {
		    	$('.wrapper').addClass('wrapper--socials').css('padding-bottom', $('.widget-socials').outerHeight());
		    }
		});

})(jQuery, window, document);


module.exports.myFunctions = {

	TabsOnMobileSelect:function(){
		setTimeout(function(){
			$('.tabs__nav a').on('click', function(event) {
				var $tabLink = $(this);
				var $targetTab = $($tabLink.attr('href'));
		
				$tabLink
					.parent()
					.add($targetTab)
					.addClass(activeTabClass)
						.siblings()
						.removeClass(activeTabClass);
				
				event.preventDefault();

				if ($tabLink.closest('.tabs-slide').length) {
					animateTabs($tabLink.closest('.tabs-slide'), $tabLink.parent().index());
				}

				if ($tabLink.closest('.tabs__nav').children('span').length) {
					var tabLinkText = $tabLink.text();

					$tabLink
						.closest('.tabs__nav')
						.removeClass('expanded')
						.children('span')
						.text(tabLinkText);
				}
			});

			$('.tabs__nav > span').on('click', function() {
				$(this)
					.closest('.tabs__nav')
					.toggleClass('expanded');
			});
		},100);
	},
	
	CustomSelect: function(){
		//Select Custom
		setTimeout(function(){
			$('.select-custom').each(function() {
				var textLabel = $(this).data('label');
				var $select = $(this).find('select');
				$select.dropdown({
					label: textLabel
				});
			});
		}, 100);
	},

	OnFormSubmit: function(formId){
		// Form Message
	    //$('.js-form-message form').on('submit', function(e) {
	    //	e.preventDefault();
			$('#'+formId).closest('.form').addClass('success');
			document.getElementById(formId).reset();
			setTimeout(function() {
				$('#'+formId).closest('.form').removeClass('success');				
			}, 2000);
	    //});
	},

	SlideshowSwiper: function(){
		setTimeout(function(){
			// Slider Swiper
			$('.js-slider-articles').each(function() {
				var $slider = $(this).find('.swiper-container');
				var $prev = $(this).find('.swiper-button-prev');
				var $next = $(this).find('.swiper-button-next');
				var sliderNumbers = $(this).data('slides');
				var sliderNumbersTablet = $(this).data('slides-tablet');
				var sliderNumbersMobile = $(this).data('slides-mobile');

				var mySwiperPrimary = new Swiper ($slider, {
					loop: true,
					slidesPerView: sliderNumbers,
					spaceBetween: 15,
					nextButton: $next,
					prevButton: $prev,
					breakpoints: {
						1199: {
							spaceBetween: 20,
							slidesPerView: sliderNumbersTablet,
						},
						767: {
							spaceBetween: 30,
							slidesPerView: sliderNumbersMobile,
							spaceBetween: 12
						}
					}
				});
				
			});

			if ($('.slider').length) {
				$('.slider').addClass('loaded');
			}

		}, 100);
	},

	OnTabClick: function(catIndex, contentClass){
		$(contentClass + ' .tabs__nav li').removeClass('current');
		$(contentClass + ' .tabs__nav li').eq(catIndex).addClass('current');
		/****************/
		$(contentClass + ' .tabs__nav').removeClass('expanded');
		$(contentClass + ' .tabs__nav > span').html($(contentClass + ' .tabs__nav li').eq(catIndex).find('a').html())
	},
	
	SliderSingleSwiper: function(){
		setTimeout(function(){
			$('.js-slider-single').each(function() {
				var $slider = $(this).find('.swiper-container');
				// var $prev = $(this).hasClass('slider-brochure') ? $(this).find('.swiper-button-next') : $(this).find('.swiper-button-prev');
				// var $next = $(this).hasClass('slider-brochure') ? $(this).find('.swiper-button-prev') : $(this).find('.swiper-button-next');
	
				var $prev = $(this).find('.swiper-button-prev');
				var $next = $(this).find('.swiper-button-next');

				if ($slider.find('.swiper-slide').length > 1) {
					$(this).addClass('slider-initialized');
	
					var mySwiperSecondary = new Swiper ($slider, {
						loop: $(this).hasClass('slider-brochure') ? false : true,
						nextButton: $next,
						prevButton: $prev,
						//reverseDirection: true,
						onSlideChangeStart:function(swiper){
							console.log(swiper.activeIndex);
							var href = $slider.find('.swiper-slide').eq(swiper.activeIndex).find('a').attr('href');
							console.log(href);
							$slider.parents('.brochure__body').find('.brochure__body-bar a').attr('href', href);

							var imgAlt = $slider.find('.swiper-slide').eq(swiper.activeIndex).find('img').attr('alt');
							$('.article-single .article__inner-foot p').html(imgAlt);
						}
					});
				}
			});
		}, 100);
	},

	reset_page_state:function(){
		$('html,body').animate({ scrollTop: 0 }, 0);
		$('.nav-sidebar, .wrapper, body').removeClass('active');
		// closeSubMenu();
		// $.magnificPopup.close();
		// closeSearch();
		// verticalScroll();
		// search_open_close();
		$('.nav-access .has-dropdown > a').removeClass('active');
		$('.nav-access .has-dropdown > a').next('.dropdown').removeClass('active');

		$('.nav .nav__dropdown').attr('style','opacity: 0; visiblity: hidden;');
		setTimeout(function(){
			$('.nav .nav__dropdown').attr('style','');
		}, 2000)

		//////////////
		$('.btn-search').removeClass('active');
		$('.header .search').removeClass('expanded');
		$('.header .header__content').removeClass('expanded');
		$('.nav-mobile-outer').removeClass('active');
		$('.wrapper').scrollLock('disable');

		$('.fa-comment-o').parents('.list-meta li').hide();


		//$('.nav--default .nav__dropdown').scrollLock('enable');
		//$('.wrapper').scrollLock('enable');
	 	//$('.header .header__content').scrollLock('enable');

	},

	hide_comments_counter: function(){
		setTimeout(function() {
			$('.fa-comment-o').parents('.list-meta li').hide();
		}, 100);
	},

	load_error_image: function(obj, defaultImage){
		obj.src = defaultImage;
	},

	RemoveImageBgJs: function (obj) {		
		// Fullsize image
		setTimeout(function () {

			$('.fullsize-image').each(function () {
				var $holder = $(this);
				$holder.css('background-image', 'none');
			});
		}, 100);
	},

	UpdateImageBgJs: function (obj) {
		
		//console.log(obj);
		
		var $holder = $(obj).closest('.article-bg-image');
		
		if($holder.length){
		}
		else{
			$holder = $(obj).closest('.fullsize-image');
		}
		
		// Fullsize image
		var imageSrc = $holder.find('img').attr('src');
		$holder.find('img').addClass("hide");
		$holder.attr('style','background-image:url("' + imageSrc + '")');
		
	},

	ImageAsBgJs: function () {		
		// Fullsize image
		setTimeout(function () {

			$('.fullsize-image').each(function () {
				var $holder = $(this);
				if($holder.css("background-image")=="none"){
					var imageSrc = $holder.find('img').attr('src');

					$holder.find('img').addClass("hide");

					$holder.css('background-image', 'url("' + imageSrc + '")');
				}
			});
		}, 100);
	},

	ArticleAsBgJs: function () {
		// Fullsize image
		setTimeout(function () {

			$('.article-bg-image').each(function () {
				var $holder = $(this);
				if($holder.css("background-image")=="none"){
					var imageSrc = $holder.find('img').attr('src');

					$holder.find('img').addClass("hide");

					$holder.css('background-image', 'url("' + imageSrc + '")');
				}
			});
		}, 100);
	},

	 ImageAsBgJs_Nat: function(){

		$('img').each(function () {
			var $img = $(this);
			$img.addClass('hidden');       
			$(this).parents(".article__image ").addClass('container-fullsize').css('background-image', 'url(' + $img.attr('src') + ')');
		});
	 },

	 load_fb_comments: function(id){
		setTimeout(function(){
			FB.XFBML.parse();
		},1000);
	},


	//#region FB SHARE
	facebookShare: function(linkUrl, title) {
		if (title == '' || title == undefined)
			title = encodeURIComponent(document.title);
		var path = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(linkUrl) + '&t=' + encodeURIComponent(title);
		var popUp = window.open(path, 'facebookshare', 'height=600,width=700,resizable=1');
	},
	//#endregion

	//#region Tweet Share
	tweetPopup: function(linkUrl, title, text, imageUrl) {
		var twitterAccount = "almada_group";
		if (title == '' || title == undefined)
			title = encodeURIComponent(document.title);
		var data = "counturl=" + linkUrl + "&text=" + title + "&original_referer=" + window.location.href
			+ "&priority=1&related=" + twitterAccount + "&url=" + linkUrl + "&via=" + twitterAccount;
		var path = "http://twitter.com/share?" + data;
		var popUp = window.open(path, 'tweet', 'height=450,width=550,resizable=1');
		var pollTimer = window.setInterval(function () {
			if (popUp.closed || popUp == null) {
				window.clearInterval(pollTimer);
			}
		}, 200);
	},
	//#endregion

	//#region  GOOGLE PLUS SHARE
	googlePlusShare: function(linkUrl) {
		var path = 'https://plus.google.com/share?url=' + linkUrl;
		var popUp = window.open(path, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');
	},
	//#endregion

	//#region Pinterest Share
	pinterestShare: function(linkUrl, title, text, imageUrl) {
		imageUrl = $('meta[property="og:image"]').attr('content');
		text = $('meta[property="og:description"]').attr('content');
		var path = "http://pinterest.com/pin/create/bookmarklet/?media=" + imageUrl + "&url=" + linkUrl + "&is_video=false&description=" + text;
		var popUp = window.open(path, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=400,width=600');
	},
	//#endregion

	//#region shares-likes-comments  facebook counter	
	myDivision: function(number, divide) {
		var money = number / divide;
		money = Math.ceil(money * 100) / 100;
		return (money);   //1285.34
	},

	getFacebookCounterAjax: function(urlBrowser) {
		//facebook
		//json//new//https://graph.facebook.com/v2.7/?access_token=268162973533788|0ddb3e9100aba4c598f1d9f1e0ddd29b&id=urlBrowser
		//xml//old//'http://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,commentsbox_count,share_count,click_count%20from%20link_stat%20where%20url=%27' + urlBrowser + '%27'
		$.ajax({
			url: 'https://graph.facebook.com/v2.7/?access_token=268162973533788|0ddb3e9100aba4c598f1d9f1e0ddd29b&id=' + urlBrowser,
			data: '',
			type: 'GET',
			dataType: 'json',
			success: function (response) {
				//old//var share_count = parseInt($(response).find('share_count').text());
				var share_count = parseInt(response.share.share_count);
				var comment_count = parseInt(response.share.comment_count);
				//var commentsbox_count = parseInt($(response).find('commentsbox_count').text());
				var numberToReturn = "";
				if (comment_count > 1000000) {
					numberToReturn = myDivision(comment_count, 1000000).toFixed(1) + "M";
				}
				else if (comment_count > 1000) {
					numberToReturn = myDivision(comment_count, 1000).toFixed(1) + "K";
				}
				//else if (comment_count == 0){
				//    numberToReturn = "1K";
				//}
				else {
					numberToReturn = comment_count;
				}
				$('#commentCounter').find('span').text(numberToReturn);
			}
		});
	},
	//#endregion

	timeSince: function(date) {
		
		var seconds = Math.floor((new Date() - date) / 1000);
	
		var interval = Math.floor(seconds / 31536000);
		
	
		if (interval > 1) {
		return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
		return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
		return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
		return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
		return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	},

	loadScript(src){
		setTimeout(function(){
			var script = document.createElement("script");
			script.type = "text/javascript";
			document.getElementsByTagName("body")[0].appendChild(script);
			script.src = src;
		}, 1000)
	},
	
	loadStylesheet(src){
		setTimeout(function(){
			var script = document.createElement("link");
			script.rel = "stylesheet";
			document.getElementsByTagName("body")[0].appendChild(script);
			script.href = src;
		}, 1000)
	},

	FlipBook: function(){
		// $('#container').FlipBook({
		// 	pdf: 'books/pdf/CondoLiving.pdf',
		// 	template: {
		// 		html: 'node_modules/flip-book/templates/default-book-view.html',
		// 		styles: [
		// 		'node_modules/flip-book/css/white-book-view.css'
		// 		],
		// 		links: [{
		// 		rel: 'stylesheet',
		// 		href: 'node_modules/flip-book/css/font-awesome.min.css'
		// 		}],
		// 		script: 'node_modules/flip-book/js/default-book-view.js'
		// 	}
		// });
			
		var $ = window.jQuery;
		var styleClb = function() {
			$('.fb3d-modal').removeClass('light').addClass('dark');
		}, booksOptions = {
			book1: {
			pdf: '/assets/books/pdf/CondoLiving.pdf',
			template: {
				html: '/assets/templates/default-book-view.html',
				styles: [
					'/assets/css/short-white-book-view.css'
				],
				links: [{
					rel: 'stylesheet',
					href: '/assets/css/font-awesome.min.css'
				}],
				script: '/assets/js/default-book-view.js',
				// sounds: {
				// 	startFlip: '/assets/sounds/start-flip.mp3',
				// 	endFlip: '/assets/sounds/end-flip.mp3'
				// }
			},
			styleClb: styleClb
			}
		};
		
		var instance = {
			scene: undefined,
			options: undefined,
			node: $('.fb3d-modal .mount-container')
		};

		var modal = $('.fb3d-modal');
		modal.on('fb3d.modal.hide', function() {
			instance.scene.dispose();
		});
		modal.on('fb3d.modal.show', function() {
			instance.scene = instance.node.FlipBook(instance.options);
			instance.options.styleClb();
		});
		
		var target = $('div[data-book-id="book1"]');
		while(target[0] && !target.attr('data-book-id')) {
			target = $(target[0].parentNode);
		}
		if(target[0]) {
			instance.options = booksOptions[target.attr('data-book-id')];
			$('.fb3d-modal').fb3dModal('show');
		}


	},

	InitializeNavigation: function(){

		setTimeout(function(){

			// Clone Burger Btn
			if ($('.nav-mobile-outer').length && !$('.nav-mobile-outer.cloned').length) {
				$('.nav-mobile-outer').clone().addClass('cloned').prependTo('.header');

				$('.nav-mobile-outer').on('click', function(e) {
					e.preventDefault();
					var $navBtn = $('.nav-mobile-outer');
					var $headerContent = $('.header .header__content');
	
					$navBtn.toggleClass('active');
	
					$headerContent.toggleClass('expanded');
	
					$('.header .search').removeClass('expanded');
	
					$('.btn-search').removeClass('active');
	
					if ($navBtn.hasClass('active')) {
						$('.wrapper').scrollLock('enable');
						$headerContent.scrollLock('enable');
					} else {
						$('.wrapper').scrollLock('disable');
	
						$('.nav li').removeClass('expanded');
					}
				});
			}		

			// Navigation		
			$('.nav--default a').on('click', function(e) {
				if ($(this).siblings('.nav__dropdown').length ) {
					if( $(window).width() < 1200 ) {
						if(!$(this).parent().hasClass('expanded')) {
							e.preventDefault();
						}	      

						$('.nav--default .nav__dropdown').scrollLock('disable');
					}
					
					$(this).parent().addClass('expanded').siblings().removeClass('expanded');

					$('.header .header__content').addClass('alt');

				}
			});

			$('.nav > ul > li > a').each(function() {

				if ($(this).siblings('.nav__dropdown').length) {
					var linkText = $(this).text();

					$(this).siblings('.nav__dropdown').find('.nav__dropdown-head span').text(linkText);
				}
			});	

			$('.nav .nav__dropdown-head .btn-prev').on('click', function(e) {
				e.preventDefault();

				$(this).closest('li').removeClass('expanded');

				$('.header .header__content').removeClass('alt');
			});

		},100);
	},

	HideLoadMore:function(){
		setTimeout(function() {
			$('.loadMore').hide();
		}, 100);
	},

	CloseMenuOnMobile:function(){

		$('.btn-search').removeClass('active');
		$('.header .search').removeClass('expanded');
		$('.header .header__content').removeClass('expanded');
		$('.nav-mobile-outer').removeClass('active');
		$('.wrapper').scrollLock('disable');
	},

	is_dom_in_view:function(id, offset){
		let el = $(id);
		if(el.length){
			windowHeight = $(window).height();
			distanceFromTop = $(document).scrollTop();
			minVisibleArea = distanceFromTop - offset;
			maxVisibleArea = distanceFromTop + windowHeight + offset;
			
			elementTopPosition = el.offset().top;
			elementBottomPosition = elementTopPosition + el.height();
			
			if((elementTopPosition > minVisibleArea && elementTopPosition < maxVisibleArea) || (elementBottomPosition > minVisibleArea && elementBottomPosition < maxVisibleArea) || (elementTopPosition < minVisibleArea && elementBottomPosition > maxVisibleArea)){
				return true;
			}
		}
		
		return false;
	},
	
	progress_bar:function(){
		setTimeout(function(){
			if ($('.progress-bar').length) {
				$('.progress-bar').each(function() {
					var $bar = $(this)
					var percent = $bar.data('percent');

					$bar.find('span').css('width', percent)
				});
			}
		},100);
	},

	SearchByIssue:function(value){
		console.log(value);
		if(value == 2)//date
		{
			$('#q2').attr('type','date');
			$('#q5').attr('type','date');
		}
		else{
			$('#q2').attr('type','search');
			$('#q5').attr('type','search');
		}
	},

	changeLogoOnScreen:function(logoDesktop, logoMobile){
		console.log(logoDesktop);
		setTimeout(function(){
			if($(window).width() <= 750){
				$('.header .header__body .logo').css('background-image', 'url(' + logoMobile + ')');
			}else{
				$('.header .header__body .logo').css('background-image', 'url(' + logoDesktop + ')');
			}
		},100);
	},

	changeLogoOnHeaderFixed(logoDesktop, logoMobile){
		setTimeout(function(){
			var winO = $(window).scrollTop();	
			var isHeaderFixed = winO > 0;

			if(isHeaderFixed){
				$('.header.header--large .header__body .logo').css('background-image', 'url(' + logoMobile + ')');
			}else{
				if($(window).width() <= 750){
					$('.header.header--large .header__body .logo').css('background-image', 'url(' + logoMobile + ')');
				}
				else{
					$('.header.header--large .header__body .logo').css('background-image', 'url(' + logoDesktop + ')');
				}
			}
		},100);
	}

}
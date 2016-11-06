/*
 Big Picture by HTML5 UP
 html5up.net | @n33co
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

(function ($) {

    skel.breakpoints({
        wide: '(max-width: 1920px)',
        normal: '(max-width: 1680px)',
        narrow: '(max-width: 1280px)',
        narrower: '(max-width: 1000px)',
        mobile: '(max-width: 736px)',
        mobilenarrow: '(max-width: 480px)',
    });

    $(function () {

        var $window = $(window),
                $body = $('body'),
                $header = $('#header'),
                $intro = $('#intro'),
                $all = $body.add($header);

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            window.setTimeout(function () {
                $body.removeClass('is-loading');
            }, 0);
        });

        // Touch mode.
        skel.on('change', function () {

            if (skel.vars.mobile || skel.breakpoint('mobile').active)
                $body.addClass('is-touch');
            else
                $body.removeClass('is-touch');

        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on mobile.
        skel.on('+mobile -mobile', function () {
            $.prioritize(
                    '.important\\28 mobile\\29',
                    skel.breakpoint('mobile').active
                    );
        });

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						target: $body,
						visibleClass: 'navPanel-visible'
					});
                                
                                $("#navPanel > nav > a[href='#intro'] > span").addClass("fa fa-home");

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

        
        // Gallery.
        $window.on('load', function () {
            $('.gallery').poptrox({
                baseZIndex: 10001,
                useBodyOverflow: false,
                usePopupEasyClose: false,
                overlayColor: '#1f2328',
                overlayOpacity: 0.65,
                usePopupDefaultStyling: false,
                usePopupCaption: true,
                popupLoaderText: '',
                windowMargin: (skel.breakpoint('mobile').active ? 5 : 50),
                usePopupNav: true
            });
        });

        // Section transitions.
        if (!skel.vars.mobile
                && skel.canUse('transition')) {

            var on = function () {

                // Generic sections.
                $('.main.style1')
                        .scrollex({
                            mode: 'middle',
                            delay: 100,
                            initialize: function () {
                                $(this).addClass('inactive');
                            },
                            terminate: function () {
                                $(this).removeClass('inactive');
                            },
                            enter: function () {
                                $(this).removeClass('inactive');
                            },
                            leave: function () {
                                $(this).addClass('inactive');
                            }
                        });

                $('.main.style2')
                        .scrollex({
                            mode: 'middle',
                            delay: 100,
                            initialize: function () {
                                $(this).addClass('inactive');
                            },
                            terminate: function () {
                                $(this).removeClass('inactive');
                            },
                            enter: function () {
                                $(this).removeClass('inactive');
                            },
                            leave: function () {
                                $(this).addClass('inactive');
                            }
                        });

                // Gallery
                $('#gallery')
                        .scrollex({
                            top: '40vh',
                            bottom: '30vh',
                            delay: 50,
                            initialize: function () {

                                var t = $(this);

                                t.find('.row.images')
                                        .addClass('inactive');

                            },
                            terminate: function () {

                                var t = $(this);

                                t.find('.row.images')
                                        .removeClass('inactive');

                            },
                            enter: function () {

                                var t = $(this),
                                        rows = t.find('.row.images'),
                                        length = rows.length,
                                        n = 0;

                                rows.each(function () {
                                    var row = $(this);
                                    window.setTimeout(function () {
                                        row.removeClass('inactive');
                                    }, 100 * (length - n++));
                                });

                            },
                            leave: function (t) {

                                var t = $(this),
                                        rows = t.find('.row.images'),
                                        length = rows.length,
                                        n = 0;

                                rows.each(function () {
                                    var row = $(this);
                                    window.setTimeout(function () {
                                        row.addClass('inactive');
                                    }, 100 * (length - n++));
                                });

                            }
                        });

                // Contact.
                $('#contact')
                        .scrollex({
                            top: '25%',
                            delay: 50,
                            initialize: function () {
                                $(this).addClass('inactive');
                            },
                            terminate: function () {
                                $(this).removeClass('inactive');
                            },
                            enter: function () {
                                $(this).removeClass('inactive');
                            },
                            leave: function () {
                                $(this).addClass('inactive');
                            }
                        });

            };

            var off = function () {

                // Generic sections.
                $('.main.style1')
                        .unscrollex();

                $('.main.style2')
                        .unscrollex();

                // Gallery.
                $('#gallery')
                        .unscrollex();

                // Contact.
                $('#contact')
                        .unscrollex();

            };

            skel.on('change', function () {

                if (skel.breakpoint('mobile').active)
                    (off)();
                else
                    (on)();

            });

        }

        // Events.
        var resizeTimeout, resizeScrollTimeout;

        $window
                .resize(function () {

                    // Disable animations/transitions.
                    $body.addClass('is-resizing');

                    window.clearTimeout(resizeTimeout);

                    resizeTimeout = window.setTimeout(function () {

                        // Update scrolly links.
                        $('a[href^=#]').scrolly({
                            speed: 1500,
                            offset: $header.outerHeight() - 1
                        });

                        // Re-enable animations/transitions.
                        window.setTimeout(function () {
                            $body.removeClass('is-resizing');
                            $window.trigger('scroll');
                        }, 0);

                    }, 100);

                })
                .load(function () {
                    $window.trigger('resize');
                });



        // Header.
        if (skel.vars.IEVersion < 9)
            $header.removeClass('alt');

        if ($('#header-alt-trigger').length > 0
                && $header.hasClass('alt')) {

            $window.on('resize', function () {
                $window.trigger('scroll');
            });

            $('#header-alt-trigger').scrollex({
                bottom: $header.outerHeight() +1,
                initialize: function () {
                    $header.addClass('alt');
                },
                terminate: function () {
                    $header.removeClass('alt');
                },
                enter: function () {
                    $header.addClass('alt');
                },
                leave: function () {
                    $header.removeClass('alt');
                }
            });

        }
    });


})(jQuery);
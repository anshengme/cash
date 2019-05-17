window.$ = jQuery;


/*
	Sticky Menu
	----------------------------------------------------
*/
function scrollTop() {
    var $window = $(window),
        $window_width = $window.width(),
        $window_height = $window.height(),
        scroll = $window.scrollTop(),
        startPoint = $window_height / 2,
        scrTopBtn = $("#nice-back-to-top");
    if (scroll >= startPoint && $window_width >= 1024) {
        scrTopBtn.addClass('active');
    } else {
        scrTopBtn.removeClass('active');
    }
    scrTopBtn.on("click", function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 600);
    });
}

jQuery(document).scroll(function ($) {
    scrollTop()
});

jQuery(document).ready(function ($) {
    $('[data-toggle="tooltip"]').tooltip();
    //menu
    $('.mobile-menu .menu-item-has-children').prepend('<span class="menu-icon"><i class="iconfont icon-more-horizontal-outl"></i></span>');
    $('.mobile-menu .menu-icon').on('click', null, function () {
        var $submenu = $(this).closest('.menu-item-has-children').find(' > .sub-menu');
        $submenu.slideToggle(500);
        return false;
    });

});

$(document).on('click', '.action-menu', function (event) {
    event.preventDefault();
    $('.mobile-navbar').toggleClass('active');
    $('body').toggleClass('active');
});

$(document).on('click', '.bg-overlay', function (event) {
    event.preventDefault();
    $('.mobile-navbar').removeClass('active');
    $('.sidebar-collapse').removeClass('active');
    $('body').removeClass('active-sidebar').removeClass('active');

});

$(document).on('click', '.action-search', function (event) {
    event.preventDefault();
    $('.sidebar-collapse').toggleClass('active');
    $('body').toggleClass('active-sidebar');
});

function ajax_load_comments(data) {
    var buttonDOM = $('#comments-next-button');
    buttonDOM.hide();
    $.ajax({
        url: globals.ajax_url,
        type: 'POST',
        dataType: 'html',
        data: data,
    })
        .done(function (response) {
            if (response) {
                if (data.commentspage === 'newest') {
                    buttonDOM.data('paged', data.paged * 1 - 1);
                } else {
                    buttonDOM.data('paged', data.paged * 1 + 1);
                }
                $('.' + data.append).append(response);
                buttonDOM.show();
            } else {
                buttonDOM.hide();
            }
        })
}

$(document).on('click', '#comments-next-button', function (event) {
    event.preventDefault();
    ajax_load_comments($('#comments-next-button').data());
});

function menu_item_hidden() {
    var right = jQuery('.navbar').width() + jQuery('.navbar').offset().left;
    if (right < jQuery('.main-menu > li:nth-last-child(-n+1)').offset().left + 150) {
        var i = 1;
        while (true) {
            var hiddenMenus = jQuery('.main-menu > li:nth-last-child(-n+' + i + ')');
            if (hiddenMenus.offset().left + 150 < right) {
                hiddenMenus.remove();
                break;
            }
            i++;
        }
        var collapseMenus = '<li class="menu-item"><a href="#"><i class="text-lg text-primary iconfont icon-more-vertical-outlin"></i></a>'
            + '<ul class="sub-menu">'
            + $("<div/>").append(hiddenMenus.clone()).html()
            + '</ul>'
            + '</li>';
        jQuery('.main-menu').append(collapseMenus);
    }
}


jQuery(window).bind("load", function () {
    menu_item_hidden();
    return true;

});

jQuery(window).on('resizeend', function (e) {

    var navbarSite = jQuery('.navbar-site');
    navbarSite.append(jQuery('.hidden-nav .sub-menu li').clone());
    jQuery('.hidden-nav').remove();
    menu_item_hidden();

});

$(document).on("click", '.post-like[data-action="like"]', function () {
    event.preventDefault();
    var $this = $(this);
    var id = $this.data("id");
    $.ajax({
        url: globals.ajax_url,
        type: 'POST',
        dataType: 'html',
        data: {action: 'suxing2019_like', id, like_action: 'like'},
    })
        .done(function (data) {
            $this.addClass('current');
            $this.attr('data-action', 'unlike');
            site_tips(1, "谢谢点赞");
            $('.like-count').html('(' + data + ')');
        });
    return false;
});

$(document).on("click", '.post-like[data-action="unlike"]', function () {
    event.preventDefault();
    var $this = $(this);
    var id = $this.data("id");
    $this.removeClass('current');

    $.ajax({
        url: globals.ajax_url,
        type: 'POST',
        dataType: 'html',
        data: {action: 'suxing2019_like', id, like_action: 'unlike'},
    })
        .done(function (data) {
            $this.removeClass('current');
            $this.attr('data-action', 'like');
            site_tips(0, "取消点赞")
            $('.like-count').html('(' + data + ')');
        })
    return false;
});

$(document).on('click', '.single-weixin', function (event) {
    event.preventDefault();
    var img = $(this).data("img");
    $('body').append('<div class="nice-tips" id="post_qrcode">\
                        <div class="nice-tips-overlay"></div>\
						<div class="nice-tips-content mini-tips-content text-center">\
							<h6 class="py-1">微信扫一扫 分享朋友圈</h6>\
							<p>在微信中请长按二维码</p>\
							<img src="' + img + '" alt="微信扫一扫,分享到朋友圈">\
							<div class="btn-close-tips">\
								<i class="iconfont icon-cuowu0"></i>\
							</div>\
						</div>\
					</div>');
    var selector = "#post_qrcode";
    var close_icon = $(selector).find('.btn-close-tips');
    $(selector).addClass('nice-tips-open').find('.btn-close-tips').on('click touchstart', function (event) {
        event.preventDefault();
        $(selector).removeClass('nice-tips-open');
        $(selector).addClass('nice-tips-close');
        $('body').removeClass('modal-open');
        setTimeout(function () {
            $(selector).removeClass('nice-tips-close');
            setTimeout("$('.nice-tips').remove()", 200);
        }, 600);
        close_icon.unbind();
    });
    $('body').addClass('modal-open');
    $('body').on("keyup", function (e) {
        if (e.keyCode === 27) close_icon.click();
    });
});

function site_tips(type, msg) {
    var ico = type ? '<span class="d-block h2 text-primary mb-2"><i class="iconfont icon-success_fill"></i></span>' : '<span class="d-block h2 text-dark mb-2"><i class="iconfont icon-warning-circle-fill"></i></span>';
    var c = type ? 'tips-success' : 'tips-error';
    var html = '<section class="nice-tips site-tips ' + c + ' nice-tips-open">' +
        '<div class="nice-tips-content  text-center">' + ico +
        '<p class="text-md">' + msg + '</p>' +
        '</div>' +
        '</section>';
    $('body').append(html);
    setTimeout(function () {
        $('.site-tips').removeClass('nice-tips-open');
        $('.site-tips').addClass('nice-tips-close');
        setTimeout(function () {
            $('.site-tips').removeClass('nice-tips-close');
            setTimeout("$('.site-tips').remove()", 200);
        }, 400);
    }, 1200);
}

$(document).on('click touchstart', '#btn-bigger-cover', function (event) {
    event.preventDefault();
    var coverDOM = $('#post_cover_image');
    if ($('.post_cover_image').attr('src').length !== 0) {
        coverDOM.addClass('nice-tips-open');
        $('body').removeClass('modal-open');

    } else {
        var that = $(this);
        var id = that.data('id');
        $.ajax({
            url: globals.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: {action: 'create-bigger-image', id: id},
        })
            .done(function (data) {
                if (data.status === 200) {
                    coverDOM.addClass('nice-tips-open');
                    $('body').removeClass('modal-open');
                    $('.post_cover_image').attr('src', data.src);

                } else {
                    site_tips(0, data.msg);
                }
            })
            .fail(function () {
                site_tips(0, '网络错误，请稍后再试');
            });
    }
    $(document).on('click', '.btn-close-tips', function (event) {
        coverDOM.removeClass('nice-tips-open');
        coverDOM.addClass('nice-tips-close');
        $('body').removeClass('modal-open');
        setTimeout(function () {
            coverDOM.removeClass('nice-tips-close');
        }, 600);
    });
});

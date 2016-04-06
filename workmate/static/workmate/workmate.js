(function( workmate, $, undefined ) {

    var
        $body = $('body'),
        $dropdown = $('.dropdown'),
        $leftSideBar = $('.ui.left.sidebar'),
        $menuModal = $('.ui.menu.modal'),
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = $('.message .close')
    ;

    $dropdown
        .dropdown({
        })
    ;

    $menuModal
        .modal('attach events', '.ui.sidebar.menu .site.title')
    ;
    $menuModal
        .modal('attach events', '.ui.menu.modal .close', 'hide')
    ;

    $menuPopup
        .popup({
            position: 'bottom center',
            delay: {
                show: 100,
                hide: 50
            }
        })
    ;

    $messageClose
        .on('click', function() {
            $(this)
                .closest('.message')
                .transition('fade')
            ;
        })
    ;

    function enableLeftSidebar () {
        if($(window).width() >= 1144) {
            /* if body has the fixed-sidebar class then the sidebar
               cannot be closed and does not dim the page */
            var fixedSidebar = $body.hasClass('fixed-sidebar');
            $leftSideBar
                .sidebar({
                    dimPage: false,
                    closable: !fixedSidebar
                })
                .sidebar('attach events', '.launch.button')
            ;
            if(fixedSidebar) {
                $leftSideBar
                    .sidebar('show')
                ;
            }
        } else {
            /* set to responsive operation */
            $leftSideBar
                .sidebar({
                    dimPage: false
                })
                .sidebar('attach events', '.launch.button')
                .sidebar('hide')
            ;
        }
    };

    enableLeftSidebar();

    $(window)
        .resize(function (e) {
            enableLeftSidebar();
        })
    ;

    workmate.getCookie = function (name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

}(window.workmate = window.workmate || {}, jQuery));

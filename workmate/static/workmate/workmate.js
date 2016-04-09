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

    $leftSideBar
        .sidebar({
            dimPage: false
        })
        .sidebar('attach events', '.sidebar.launch.item')
    ;

    $menuModal
        .modal('attach events', '.grid.launch.item')
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

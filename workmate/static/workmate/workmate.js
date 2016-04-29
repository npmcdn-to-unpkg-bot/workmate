(function( workmate, $, undefined ) {

    var
        $body = $('body'),
        $callIcon = $('.call.icon'),
        $dropdown = $('.dropdown'),
        $menuModal = $('.ui.menu.modal'),
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = $('.message .close')
    ;

    $.fn.api.settings
        .api = {
            contact_call: '/contacts/{id}/call/'
        }
    ;

    $dropdown
        .dropdown({
        })
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

    $callIcon
        .api({
            action       : 'contact_call',
            urlData      : {
                id: $(this).data('id')
            },
            method       : 'POST',
            on           : 'click',
            beforeSend: function(settings) {
                settings.data.type = $(this).data('type');
                return settings;
            },
            beforeXHR: function(xhr) {
                xhr.setRequestHeader ("X-CSRFToken", workmate.getCookie('csrftoken'));
            },
            onSuccess: function(response) {
                console.log(response);
                alert(response.message);
            },
            onError: function(response) {
                console.log(response);
            }
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

(function( workmate, $, undefined ) {

    var
        $actionContactCall = $('*[data-action="contact_call"]'),
        $ajaxMessages = $('.ajax-messages'),
        $dropdown = $('.dropdown'),
        $menuModal = $('.ui.menu.modal'),
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = '.message .close'
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

    $(document)
        .on('click', $messageClose, function() {
            $(this)
                .closest('.message')
                .transition('fade')
            ;
        })
    ;

    $actionContactCall
        .api({
            action       : $(this).data('action'),
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
            onSuccess: function(response, $module, xhr) {
                if (response.status) {
                    workmate.createMessage(response.status, response.message);
                }
            },
            onError: function(errorMessage, $module, xhr) {
                if (xhr.responseJSON.status) {
                    workmate.createMessage(xhr.responseJSON.status, xhr.responseJSON.message);
                }
            }
        })
    ;

    workmate.createMessage = function(status, messageText) {
        var message = $('<div class="ui ' + status + ' message"><i class="close icon"></i></div>');
        message.append('<div class="header capitalize">' + status + '</div>');
        message.append('<p>' + messageText + '</p>');
        $ajaxMessages.append(message);
    };

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

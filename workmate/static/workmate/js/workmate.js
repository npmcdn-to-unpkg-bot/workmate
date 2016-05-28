(function( workmate, $, undefined ) {

    var
        $ajaxMessages = $('.wm-messages'),
        $checkbox = $('.ui.checkbox'),
        $contactCall = '[data-action="contact_call"]',
        $dropdown = $('.ui.dropdown'),
        $menuModal = $('.wm-menu'),
        $messageClose = '.message .close'
    ;

    $.fn.api.settings
        .api = {
            contact_call        : '/contacts/{id}/call/',
            contact_detail      : '/api/v1/contact/{id}/',
            contact_list        : '/api/v1/contact/',
            contact_schema      : '/api/v1/contact/schema/',
            tag_detail          : '/api/v1/tag/{id}/',
            tag_list            : '/api/v1/tag/',
            tag_schema          : '/api/v1/tag/schema/'
        }
    ;

    $checkbox
        .checkbox()
    ;

    $dropdown
        .dropdown({
        })
    ;

    $menuModal
        .modal('attach events', '.grid.launch.item')
    ;
    $menuModal
        .modal('attach events', '.wm-menu .close', 'hide')
    ;

    $(document)
        .on('click', $messageClose, function() {
            $(this)
                .closest('.message')
                .transition('fade')
            ;
        })
    ;

    $(document)
        .on('click', $contactCall, function() {
            $(this)
                .api({
                    action       : 'contact_call',
                    method       : 'POST',
                    on           : 'now',
                    urlData: {
                        id: $(this).data('id')
                    },
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
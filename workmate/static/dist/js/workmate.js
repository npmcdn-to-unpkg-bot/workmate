(function( workmate, $, undefined ) {

    /*
     * close any bootstrap alert after the stated time that are still open
     */
    $(document).ready(function () {
        window.setTimeout(function() {
            $('.alert').alert('close')
        }, 5000);
    });

    /*
     * get a cookie value such as csrftoken for ajax posts
     */
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
// declare namespace
window.workmate = {};

// ready function
workmate.ready = function() {

    var
        $sideBar = $('.ui.sidebar'),
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = $('.message .close')
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

    $sideBar
        .sidebar('attach events', '.launch.button')
    ;

};

// attach ready
$(document)
    .ready(workmate.ready);

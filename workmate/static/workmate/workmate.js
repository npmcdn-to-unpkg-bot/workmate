// declare namespace
window.workmate = {};

// ready function
workmate.ready = function() {

    var
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = $('.message .close'),
        $selectDropdown = $('select.dropdown'),
        $sideBar = $('.ui.sidebar')
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

    $selectDropdown
        .dropdown({
            fullTextSearch: true
        })
    ;

    $sideBar
        .sidebar('attach events', '.launch.button')
    ;

};

// attach ready
$(document)
    .ready(workmate.ready);

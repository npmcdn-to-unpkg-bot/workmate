// declare namespace
window.workmate = {};

// ready function
workmate.ready = function() {

    var
        $menuModal = $('.ui.menu.modal'),
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = $('.message .close'),
        $selectDropdown = $('select.dropdown'),
        $sideBar = $('.ui.sidebar')
    ;
    
    $menuModal
        .modal('attach events', '.ui.sidebar.menu .site.title')
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
        .sidebar({
            dimPage: true,
            transition: 'overlay',
            mobileTransition: 'uncover'
        })
    ;
    
    $sideBar
        .sidebar('attach events', '.launch.button')
    ;

};

// attach ready
$(document)
    .ready(workmate.ready);

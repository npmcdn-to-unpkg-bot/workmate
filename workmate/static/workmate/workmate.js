// declare namespace
window.workmate = {};

// ready function
workmate.ready = function() {

    var
        $body = $('body'),
        $leftSideBar = $('.ui.left.sidebar'),
        $menuModal = $('.ui.menu.modal'),
        $menuPopup = $('.ui.main.menu .popup.item'),
        $messageClose = $('.message .close'),
        $selectDropdown = $('select.dropdown')
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
    
    $selectDropdown
        .dropdown({
            fullTextSearch: true
        })
    ;

    enableLeftSidebar = function () {
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

    $(window).resize(function(e) {
        enableLeftSidebar();
    })

};

// attach ready
$(document)
    .ready(workmate.ready);

(function( workmate, $, undefined ) {

    var
        $calendar = $('.calendar'),
        $copyKey = false,
        $eventModal = $('.ui.small.event.modal'),
        $eventTitle = $('input[name="event_title"]'),
        $clone = null
    ;

    $(document).keydown(function (e) {
        $copyKey = e.shiftKey;
    }).keyup(function () {
        $copyKey = false;
    });

    $calendar
        .fullCalendar({
            header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultView: 'agendaWeek',
            firstDay: 1,
			selectable: true,
			slotDuration: "00:15:00",
            slotLabelInterval: "00:60:00",
            snapDuration: "00:05:00",
            eventDragStart: function (event, jsEvent, ui, view) {
                if (!$copyKey) return;
                $clone = {
                    title: event.title,
                    start: event.start,
                    end: event.end
                };
            },
            eventDragStop: function (event, jsEvent, ui, view) {
                if (!$copyKey) return;
                $calendar.fullCalendar('renderEvent', $clone, true);
            },
            select: function(start, end, jsEvent, view) {
                $eventModal
                    .modal({
                        onDeny: function(){
                            $calendar.fullCalendar('unselect');
                            $eventTitle.val('');
                        },
                        onApprove: function() {
                            var title = $eventTitle.val();
                            if (!title) {
                                return false;
                            }
                            $calendar
                                .fullCalendar(
                                    'renderEvent',
                                    {
                                        title: title,
                                        start: start,
                                        end: end,
                                        allDay: !start.hasTime()
                                    },
                                    true
                                )
                            ;
                            $calendar.fullCalendar('unselect');
                            $eventTitle.val('');
                        }
                    })
                    .modal('show')
                ;
			},
			editable: true,
            events: []
        })
    ;

}(window.workmate = window.workmate || {}, jQuery));

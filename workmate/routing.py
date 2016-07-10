from channels import include, route
from workmate.consumers import data_notify_connect, data_notify_disconnect


data_notify_routing = [
    route("websocket.connect", data_notify_connect),
    route("websocket.disconnect", data_notify_disconnect),
]


websocket_routing = [
    include(data_notify_routing, path=r'^/data_notifications/'),
]

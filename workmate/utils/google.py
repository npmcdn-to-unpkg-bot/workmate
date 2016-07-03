import json

try:
    from urllib.parse import quote_plus
except ImportError:
    from urllib import quote_plus

try:
    import urllib.request as urllib2
except ImportError:
    import urllib2

from django.utils.encoding import smart_str


def get_lat_lng_from_address(location):
    print(location)
    location = quote_plus(smart_str(location))
    url = 'http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false' % location
    response = urllib2.urlopen(url).read().decode('utf8')
    result = json.loads(response)
    if result['status'] == 'OK':
        latitude = str(result['results'][0]['geometry']['location']['lat'])
        longitude = str(result['results'][0]['geometry']['location']['lng'])
        return latitude, longitude
    return None, None

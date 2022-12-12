
markers = [];

var map;
var gleadell_loc = 'gleadell_loc';

if ($(window).width() < 767) {
 var cor = new google.maps.LatLng(52.2995446, -1.0290722);
}
else {
 var cor = new google.maps.LatLng(52.9595446, -3.9290722);
}

function initialize() {

  var featureOpts = [
  {
    stylers: [
    { visibility: 'simplified' },
    { saturation: -100 }
    ]
  },
  {
    elementType: 'labels',
    stylers: [
    { visibility: 'off' }
    ]
  },
  {
    featureType: "road",
    stylers: [
    { visibility: 'off' }
    ]
  }
  ];

  var mapOptions = {
    zoom: 4.6,
    scrollwheel: true,
    draggable: true,
    disableDoubleClickZoom: false,
    center: cor,
    disableDefaultUI: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, gleadell_loc]
    },
    mapTypeId: gleadell_loc
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(gleadell_loc, customMapType);

  setMarkers(map, locations);
}



var store = {
  path: google.maps.SymbolPath.CIRCLE,
  fillColor: 'yellow',
  fillOpacity: 0.8,
  scale: 9,
  strokeWeight: 0
};

var office = {
  path: google.maps.SymbolPath.CIRCLE,
  fillColor: 'yellow',
  fillOpacity: 0.8,
  scale: 9,
  strokeWeight: 0
};

var port = {
  path: google.maps.SymbolPath.CIRCLE,
  fillColor: 'yellow',
  fillOpacity: 0.8,
  scale: 9,
  strokeWeight: 0
};



function setMarkers(map, storemarkers) {
  for (var i = 0; i < storemarkers.length; i++) {

    var storeinfo = storemarkers[i];
    var siteLatLng = new google.maps.LatLng(storeinfo[1], storeinfo[2]);
    var marker = new google.maps.Marker({
      position: siteLatLng,
      map: map,
      icon: '/img/map/' + storeinfo[3] + '.png',
      title: storeinfo[0],
      html: storeinfo[4]
    });
    var html = '<div class="inner">' + storeinfo[4] + '</div>';

    markers.push(marker);

    var bouncingMarker = null;

    document.getElementById('infowindow').innerHTML = html;

    google.maps.event.addListener(marker, 'click', (function(marker, i) {

      return function() {
        document.getElementById('infowindow').innerHTML = "";
        document.getElementById('infowindow').innerHTML = this.html;

        if(bouncingMarker) {
          bouncingMarker.setAnimation(null);
        }
        if(bouncingMarker != this) {
          this.setAnimation(google.maps.Animation.BOUNCE);
          bouncingMarker = this;
        } else {
          bouncingMarker = null;
        }
      }

    })(marker, i));
  }
}

google.maps.event.addDomListener(window, 'resize', initialize);
google.maps.event.addDomListener(window, 'load', initialize);

/////////////Ajax Requests////////////
$(document).ready(function() {
    // Fetch the initial Map
    refreshMap();

    // Fetch every 5 second
    setInterval(refreshMap, 5000);
});

function refreshMap(){
    var container = L.DomUtil.get('map');

      if(container != null){
    container._leaflet_id = null;
    }
     
    var map = L.map('map').setView([20.5937, 78.9629], 4);
    var jsonDataObject =[];
    var bar_color = [];

    $.getJSON('https://spreadsheets.google.com/feeds/list/1IidzqfDy00SgMu-tGNXn3BEoLSyGtyQCcOIVzwMdLXs/5/public/full?alt=json', function(data) {
    for (var i = 0; i < data.feed.entry.length; ++i) {

        var json_data = {
            "City": data.feed.entry[i].gsx$city.$t,
            "OderID" : data.feed.entry[i].gsx$orderid.$t,
            "Item" : data.feed.entry[i].gsx$item.$t,
            "Priority" : data.feed.entry[i].gsx$priority.$t,
            "Latitude": parseFloat(data.feed.entry[i].gsx$latitude.$t),
            "Longitude": parseFloat(data.feed.entry[i].gsx$longitude.$t)
        };
        jsonDataObject.push(json_data);

 for(var j in jsonDataObject){
    if(jsonDataObject[j].Priority == 'HP'){
      var color =  '#FF0000';
      }
    else if(jsonDataObject[j].Priority == 'MP'){
      var color =  '#FFFF00';
      }
    else if(jsonDataObject[j].Priority == 'LP'){
      var color =  '#00FF00';
      }
    bar_color.push(color)
  }
  
  var greenIcon = new L.Icon({
    iconUrl: 'marker-icon-2x-green.png',
	shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  var redIcon = new L.Icon({
    iconUrl: 'marker-icon-2x-red.png',
	shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  var goldIcon = new L.Icon({
    iconUrl: 'marker-icon-2x-gold.png',
	shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

        for (var j = 0; j < jsonDataObject.length; j++) {
            if(bar_color[j] == '#FF0000')
                var marker = L.marker(L.latLng(parseFloat(jsonDataObject[j].Latitude), parseFloat(jsonDataObject[j].Longitude)),{icon: redIcon});
            else if(bar_color[j]== '#FFFF00')
                 var marker = L.marker(L.latLng(parseFloat(jsonDataObject[j].Latitude), parseFloat(jsonDataObject[j].Longitude)),{icon: goldIcon});
            else if(bar_color[j] == '#00FF00')
                 var marker = L.marker(L.latLng(parseFloat(jsonDataObject[j].Latitude), parseFloat(jsonDataObject[j].Longitude)),{icon: greenIcon});

            marker.bindPopup(jsonDataObject[j].City, {
                    autoClose: false
            });
            map.addLayer(marker);
            marker.on('click', onClick_Marker)
            // Attach the corresponding JSON data to your marker:
            marker.myJsonData =jsonDataObject[j];
    
            function onClick_Marker(e) {
                    var marker = e.target;
                    popup = L.popup()
                    .setLatLng(marker.getLatLng())
                    .setContent("Order ID: " + marker.myJsonData.OderID + " || Item: " +   marker.myJsonData.Item)
                    .openOn(map);
                }

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map); 
                

            }
        }
    });
}

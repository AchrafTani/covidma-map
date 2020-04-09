
//Live map By Achraf TANI :)
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/darkmatter/256/{z}/{x}/{y}.png?key=qHdCKa3B8bKNWJZy9AT7', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

$(document).ready(function(){
    $.getJSON("https://covidma.herokuapp.com/api", function(data){
        var taab = [];
        var tab = '';
        x= data[1];
        $.each(x,function(key,val){

                tab += '<tbody><tr>';
                tab += '<td>'+val.region+'</td>';
                tab += '<td>'+val.cases+'</td>';
                tab += '<td>'+val.latitude+'</td>';
                tab += '<td>'+val.longitude+'</td>';
                tab += '</tr></tbody>';
            
                var valradius = 5000;
                for(var i=5;i<= 1000;i+=5){
                    valradius+=1000;
                    if(val.cases<=i && val.cases>i-5){
                        var circle = L.circle([val.latitude,val.longitude], {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.5,
                            radius: valradius
                            }).addTo(map);
                    }
                }
                /*
                Méthode dépasse (Statique)
                if(val.cases<10 && val.cases != 0){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 10000
                    }).addTo(map);
                }
                if(val.cases<=30 && val.cases>10){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 20000
                    }).addTo(map);
                }
                if(val.cases<=60 && val.cases>30){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 30000
                    }).addTo(map);
                }
                if(val.cases<=90 && val.cases>60){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 40000
                    }).addTo(map);
                }
                if(val.cases<=120 && val.cases>90){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 50000
                    }).addTo(map);
                }
                if(val.cases<=150 && val.cases>120){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 60000
                    }).addTo(map);
                }
                if(val.cases>150){
                    var circle = L.circle([val.latitude,val.longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 80000
                    }).addTo(map);
                }*/
                if(val.cases != 0){
                    circle.bindPopup("La région: <b>"+val.region+"</b> contient: <b>"+val.cases+" cas.</b>");
                    taab.push(circle);
                }
        });
      $('#taable').append(tab);
     var group = new L.featureGroup(taab);
    map.fitBounds(group.getBounds());  
    });
});


var imageUrl = 'https://i.imgur.com/ASmSLId.png',
imageBounds = [[22.056114, -16.559092], [26.913254, -10.430743]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);

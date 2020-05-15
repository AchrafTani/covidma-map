
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
                cases = val.cases;
                casesNew = cases.replace(",",".");

                tab += '<tbody><tr>';
                tab += '<td>'+val.region+'%</td>';
                tab += '<td>'+casesNew+'%</td>';
                tab += '<td>'+val.latitude+'%</td>';
                tab += '<td>'+val.longitude+'%</td>';
                tab += '</tr></tbody>';

                    
 
                var valradius = 0;
                for(var i=1;i<= 100;i+=1){
                    valradius+=3000;
                    if(casesNew<=i && casesNew>i-1){
                        var circle = L.circle([val.latitude,val.longitude], {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.5,
                            radius: valradius
                            }).addTo(map);
                    }
                }
                
                if(casesNew != 0){
                    circle.bindPopup("La région: <b>"+val.region+"</b> contient: <b>"+casesNew+"% cases.</b>");
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

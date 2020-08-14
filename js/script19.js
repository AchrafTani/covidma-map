
//Live map By Achraf TANI :)
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/darkmatter/256/{z}/{x}/{y}.png?key=qHdCKa3B8bKNWJZy9AT7', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);
var lat = 32.7172240298865;
var long = -15.031120659375002;
$(document).ready(function(){
    $.getJSON("https://covidma.vercel.app/api", function(data){
        var taab = [];
        var tab = '';
        x= data[1];
        $.each(x,function(key,val){
            if(val.region == "الدار البيضاء سطات"){
                lat = 33.2627128;
                long = -7.9639028;
            }
            else if(val.region == "مراكش أسفي"){
                lat = 31.6048574;
                long = -8.3654032;
            }
            else if(val.region == "فاس مكناس"){
                lat = 33.8333136;
                long = -4.8556382;
            }
            else if(val.region == "طنجة تطوان الحسيمة"){
                lat = 35.202941;
                long = -5.5510167;
            }
            else if(val.region == "الرباط سلا القنيطرة"){
                lat = 33.9204332;
                long = -6.3676093;
            }
            else if(val.region == "درعة تافيلالت"){
                lat = 31.1835432;
                long = -5.1395435;
            }
            else if(val.region == "بني ملال خنيفرة"){
                lat = 32.6407498;
                long = -6.207105;
            }
            else if(val.region == "سوس ماسة"){
                lat = 30.187722;
                long = -8.6322498;
            }
            else if(val.region == "الشرق"){
                lat = 33.3202138;
                long = -2.4238471;
            }
            else if(val.region == "الداخلة وادي الذهب"){
                lat = 23.28371;
                long = -15.0202622;
            }
            else if(val.region == "كلميم واد نون"){
                lat = 28.5273703;
                long = -10.0315515;
            }
            else if(val.region == "العيون الساقية الحمراء"){
                lat = 26.7300936;
                long = -12.9766773;
            }


                tab += '<tbody><tr>';
                tab += '<td>'+val.region+'</td>';
                tab += '<td>'+val.cases+'</td>';

                tab += '</tr></tbody>';

                    
 
                 var valradius = 0;
                for(var i=1000;i<= 15000;i+=1000){
                    valradius+=12000;
                    if(val.cases<=i && val.cases>i-1000){
                        var circle = L.circle([lat,long], {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.5,
                            radius: valradius
                            }).addTo(map);
                    }
                }
                
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

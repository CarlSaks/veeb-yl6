

(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        // setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h > 12) {
                h = h % 12;
            }
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        let eesnimi = document.getElementById('fname');
        let perenimi = document.getElementById('lname');



        if (!eesnimi.value) eesnimi.classList.add('tyhi');
        else if (eesnimi.classList.contains('tyhi')) {
            eesnimi.classList.remove('tyhi');
        }

        if (!perenimi.value) perenimi.classList.add('tyhi');
        else if (perenimi.classList.contains('tyhi')) {
            perenimi.classList.remove('tyhi');
        }

        if (!eesnimi.value || !perenimi.value) { return; }

        let summa = 0;
        let kink = document.getElementById('v1').checked;
        let kontaktivaba = document.getElementById('v2').checked;
        let suurus = document.querySelector('input[name="size"]:checked').value;

        if (kink) summa += 5;
        if (kontaktivaba) summa += 1;

        let linn = document.getElementById("linn");

        if (suurus === "-1") {
            e.innerHTML = 'x.xx &euro;';
            alert("Palun valige paki suurus");
            return;
        } 
        else if (suurus === 's') summa += 2;
        else if (suurus === 'm') summa += 3.5;
        else if (suurus === 'l') summa += 5;

        if (linn.value === "") {
            
            e.innerHTML = 'x.xx &euro;';
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (linn.value === 'trt' || linn.value === 'nrv') {
            summa += 2.5;
        } else if (linn.value === 'prn') {
            summa += 3;
        }
            
        e.innerHTML = summa + " &euro;";        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AumtL5LA7sKFCkHqMZxkrzUNiV2CyVqkyNqk8KcAG-rmhh_7bHAF_6m8nOkG8O4l";

let map;

function GetMap() {
    
    "use strict";

    let TU = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let VOSU = new Microsoft.Maps.Location(
        59.5763969, 
        25.9640236
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.88194,26.40015),
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpinTU = new Microsoft.Maps.Pushpin(TU, null);
    let pushpinVOSU = new Microsoft.Maps.Pushpin(VOSU, null);

    let infoTU = new Microsoft.Maps.Infobox(TU, {
        title: 'Tartu Ülikool',
        description: 'Hea koht',
        visible: false
    });
    let infoVOSU = new Microsoft.Maps.Infobox(VOSU, {
        title: 'Võsu Küla',
        description: 'Suvel hea ja soe',
        visible: false
    });
    infoTU.setMap(map);
    infoVOSU.setMap(map);

    Microsoft.Maps.Events.addHandler(pushpinTU, 'click', function () {
        infoTU.setOptions({ visible: true });
    });
    Microsoft.Maps.Events.addHandler(pushpinVOSU, 'click', function () {
        infoVOSU.setOptions({ visible: true });
    });

    map.entities.push(pushpinTU);
    map.entities.push(pushpinVOSU);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE


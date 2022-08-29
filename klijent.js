const http = require('http');


function sviOglasi(){
    const options = {
        hostname: 'localhost',
        port: '3000',
        path: encodeURI('/svi-oglasi'),
        method: "GET"
    }
    function handleResponse(response){
        var serverData=""
        response.on('data', function(chunk){
            serverData+=chunk
        })
        response.on('end', function(){
            console.log(JSON.parse(serverData))
        })
    }
    http.request(options, function(response){
        handleResponse(response)
    }).end()
}

sviOglasi()

function addOglas(id,kategorija,datum,cena,valuta,tekst_oglasa,oznaka1,oznaka2,
    oznaka3,email1,tipemaila1,email2,tipemaila2){
    var http = require('http')
        var options = {
            hostname: 'localhost',
            port: '3000',
            path: encodeURI('/add-oglas'),
            method: "POST"
        }
        function readResponse(response) {
            var responseData = ''
            response.on('data', function (chunk) {
                responseData += chunk;
            })
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            })
        }
        var req=http.request(options,readResponse)
        req.write("id=" + id + "&kategorija=" + kategorija + "&datum=" + datum + "&cena=" + cena + 
        "&valuta=" + valuta + "&tekst_oglasa=" + tekst_oglasa + "&oznaka1=" + oznaka1 + "&oznaka2=" + oznaka2 + 
        "&oznaka3=" + oznaka3 + "&oznaka4=" + "&email1=" + email1 + "&tipemaila1=" + tipemaila1 + 
        "&email2=" + email2 + "&tipemaila2=" + tipemaila2)
        req.end()
}

// addOglas(1,"automobili","22.10.2021",112990,"eur","2017 BMW M3 Competition F80 LCI Auto","BMW","Sedan","Automatic","randomemail@gmail.com","privatni","randombusinessemail@randomcompany.com","poslovni")
// addOglas(2,"alati","23.11.2022",99,"eur","DEWALT 20V Max Cordless Drill / Driver Kit, Compact, 1/2-Inch (DCD771C2)","DEWALT","Cordless Drill","Compact, 1/2-Inch","joe@gmail.com","privatni","joe@dewalt.com","poslovni")
// addOglas(3,"automobili","14.06.2017",110000,"eur","2006 Mitsubishi Lancer Evolution IX MR CY Manual 4WD","Mitsubishi","Sedan","Manual","NSW@gmail.com","privatni","NSW@randomcompany.com","poslovni")
// addOglas(4,"alati","05.06.2022",29,"eur","CARTMAN 148Piece Tool Set General Household Hand Tool Kit with Plastic Toolbox Storage Case Socket and Socket Wrench Sets","CARTMAN","Tool Set","Socket Wrench","nick@gmail.com","privatni","nick@cartman.com","poslovni")
// sviOglasi()

function deleteOglas(id){
    var http = require('http')
        var options = {
            host: 'localhost',
            port: '3000',
            path: '/delete-oglas',
            method: 'POST'
        };
        function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
        }
        var req = http.request(options, readResponse);
        req.write('id=' + id);
        req.end();
}

// deleteOglas(1)
// deleteOglas(2)
// deleteOglas(3)
// deleteOglas(4)
// sviOglasi()

function getOglas(id){
    var http = require('http');
        const options = {
            host: 'localhost',
            port: '3000',
            path: encodeURI('/get-oglas?id=' + id),
            method: 'GET'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Oglas po id:");
                console.log(JSON.parse(responseData));
            });
       }
       var req = http.request(options, readResponse);
       req.end();
}

// getOglas(1)
// getOglas(2)
// getOglas(3)
// getOglas(4)

function getOglasByKategorija(kategorija){
    var http = require('http');
        const options = {
            host: 'localhost',
            port: '3000',
            path: encodeURI(`/get-oglas-kategorija?kategorija=${kategorija}`),
            method: 'GET'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Oglas po kategoriji:");
                console.log(JSON.parse(responseData));
            });
       }
       var req = http.request(options, readResponse);
       req.end();
}

// getOglasByKategorija('automobili')
// getOglasByKategorija('alati')

function getOglasByOznaka(oznaka){
    var http = require('http');
        const options = {
            host: 'localhost',
            port: '3000',
            path: encodeURI(`/get-oglas-oznaka?oznaka1=${oznaka}`),
            method: 'GET'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Oglas po oznaci:");
                console.log(JSON.parse(responseData));
            });
       }
       var req = http.request(options, readResponse);
       req.end();
}

// getOglasByOznaka('BMW')

function postaviKategoriju(id,kategorija){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-kategoriju',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&kategorija=' + kategorija);
       req.end();
}

// postaviKategoriju(1,"Nova Kategorija")
// sviOglasi()

function postaviDatum(id,datum){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-datum',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&datum=' + datum);
       req.end();
}

// postaviDatum(3,"30.12.2022")
// sviOglasi()

function postaviCenu(id,cena,valuta){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-cenu',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&cena=' + cena + '&valuta=' + valuta);
       req.end();
}

// postaviCenu(3,23450,"eur")
// sviOglasi()

function postaviTekst(id,tekst_oglasa){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-tekst',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&tekst_oglasa=' + tekst_oglasa);
       req.end();
}

// postaviTekst(3,"Ovo je neki novi tekst")
// sviOglasi()

function postaviOznake(id,oznaka1,oznaka2,oznaka3){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-oznake',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&oznaka1=' + oznaka1 + '&oznaka2=' + oznaka2
       + '&oznaka3=' + oznaka3);
       req.end();
}

// postaviOznake(3,"Audi","Coupe","Automatic")
// sviOglasi()

function postaviEmail1(id,email1,tipemaila1){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-email1',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&email1=' + email1 + '&tipemaila1=' + tipemaila1);
       req.end();
}

// postaviEmail1(1,"noviemail@gmail.com","poslovni")
// sviOglasi()

function postaviEmail2(id,email2,tipemaila2){
    var http = require('http');
        var options = {
            host: '127.0.0.1',
            port: '3000',
            path: '/postavi-email2',
            method: 'POST'
        };
       function readResponse(response) {
            var responseData = '';
            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                console.log("Primljeno: " + responseData);
            });
       }
       var req = http.request(options, readResponse);
       req.write('id=' + id + '&email2=' + email2 + '&tipemaila2=' + tipemaila2);
       req.end();
}

// postaviEmail2(3,"noviprivatniemail@gmail.com","privatni")
// sviOglasi()
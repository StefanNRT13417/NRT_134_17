const fs = require('fs')
const http = require('http')
const url = require('url')
const queryString = require('query-string')
const FILE = "oglasi.json"





const server = http.createServer(function (request, response) {
    let urlObj = url.parse(request.url,true,false)

    if(request.method=="GET"){
        if(urlObj.pathname == "/svi-oglasi"){
            fs.readFile(FILE, function(err,data){
                if(err){
                    response.writeHead(404)
                    response.end(JSON.stringify(err))
                    return
                }
                response.writeHead(200)
                response.end(data)
            })
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/add-oglas"){
            var body=""
            request.on("data", function(data){
                body+=data
            })
            request.on("end", function(){
                let oglasi=JSON.parse(fs.readFileSync(FILE,function(err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }))
                let oglas={
                    "id": parseInt(queryString.parse(body).id),
                    "kategorija": queryString.parse(body).kategorija,
                    "datum": queryString.parse(body).datum,
                    "cena": queryString.parse(body).cena,
                    "valuta": queryString.parse(body).valuta,
                    "tekst_oglasa": queryString.parse(body).tekst_oglasa,
                    "oznake":
                             {"oznaka1":queryString.parse(body).oznaka1,
                              "oznaka2":queryString.parse(body).oznaka2,
                              "oznaka3":queryString.parse(body).oznaka3,},
                    "email1":{  
                        "email1":queryString.parse(body).email1,
                        "tipemaila1":queryString.parse(body).tipemaila1},
                    "email2":{  
                        "email2":queryString.parse(body).email2,
                        "tipemaila2":queryString.parse(body).tipemaila2}
                }
                oglasi.push(oglas)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))
            })
            response.writeHead(200)
            response.end("true")
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == '/delete-oglas'){
        var body = '';
        request.on('data', function (data) {
            body += data
        })
        request.on('end', function () { 
            let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                if (err){
                    response.writeHead(404);
                    response.end(JSON.stringify(err))
                    return;
                }
            }))
            let oglasid = parseInt(queryString.parse(body).id)
            let result = []
            for(let oglas of oglasi){
                if(oglas.id != oglasid){
                    result.push(oglas)
                }
            }
            fs.writeFileSync(FILE,JSON.stringify(result))
            response.writeHead(200)
            response.end('true')
        })
        }
    }

    if(request.method=="GET"){
        if(urlObj.pathname == "/get-oglas"){
            let query =urlObj.query
            let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                if (err){
                    response.writeHead(404)
                    response.end(JSON.stringify(err))
                    return
                }
            }))
            for(let oglas of oglasi){
                if(oglas.id == query.id){
                    response.writeHead(200)
                    response.end(JSON.stringify(oglas))
                }
            }
        }
    
    }
    if(request.method=="GET"){
        if(urlObj.pathname == "/get-oglas-kategorija"){
            let query =urlObj.query
            let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                if (err){
                    response.writeHead(404)
                    response.end(JSON.stringify(err))
                    return
                }
            }))
            result=[]
            for(let oglas of oglasi){
                if(oglas.kategorija == query.kategorija){
                    result.push(oglas)
                }
            }
            response.writeHead(200);
            response.end(JSON.stringify(result));
        }
    }

    if(request.method=="GET"){
        if(urlObj.pathname == "/get-oglas-oznaka"){
            let query =urlObj.query
            let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                if (err){
                    response.writeHead(404)
                    response.end(JSON.stringify(err))
                    return
                }
            }))
            result=[]
            for(let oglas of oglasi){
                if(oglas.oznake.oznaka1 == query.oznaka1 || 
                   oglas.oznake.oznaka2 == query.oznaka1 || 
                   oglas.oznake.oznaka3 == query.oznaka1){
                    result.push(oglas)
                }
            }
            response.writeHead(200);
            response.end(JSON.stringify(result));
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-kategoriju"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].kategorija = queryString.parse(body).kategorija
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-datum"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].datum = queryString.parse(body).datum
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-cenu"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].cena = queryString.parse(body).cena;
                        oglasi[i].valuta = queryString.parse(body).valuta
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-tekst"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].tekst_oglasa = queryString.parse(body).tekst_oglasa
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-oznake"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].oznake.oznaka1 = queryString.parse(body).oznaka1;
                        oglasi[i].oznake.oznaka2 = queryString.parse(body).oznaka2;
                        oglasi[i].oznake.oznaka3 = queryString.parse(body).oznaka3 
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-email1"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].email1.email1 = queryString.parse(body).email1;
                        oglasi[i].email1.tipemaila1 = queryString.parse(body).tipemaila1
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    if(request.method=="POST"){
        if(urlObj.pathname == "/postavi-email2"){
            var body = ''
            request.on('data', function (data) {
                body += data
            });
            request.on('end', function () { 
                let oglasi = JSON.parse(fs.readFileSync(FILE, function (err,data){
                    if (err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err))
                        return
                    }
                }));
                for(let i=0; i<oglasi.length;i++){
                    if(oglasi[i].id == queryString.parse(body).id){
                        oglasi[i].email2.email2 = queryString.parse(body).email2;
                        oglasi[i].email2.tipemaila2 = queryString.parse(body).tipemaila2
                    }
                }
                console.log(oglasi)
                fs.writeFileSync(FILE,JSON.stringify(oglasi))            
            });                      
            response.writeHead(200)
            response.end('true')
        }
    }

    
});
const port = 3000;
const host = '127.0.0.1';
server.listen(port, host);
console.log(`Server na adresi: http://${host}:${port}`);
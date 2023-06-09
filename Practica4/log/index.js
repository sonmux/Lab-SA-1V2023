'use strict'
const express = require('express');
const app = express();
const axios = require('axios')
const fs = require('fs')
var body_parser = require('body-parser').json();

const PORT = 3003;
const HOST = 'localhost'

app.get('/', function(req, res){
    res.send("Servidor log")
})

app.post('/log', body_parser, function(req,res){
    
    var descripcion = req.body.descripcion;
    var fecha = new Date();
    var linea = "registro "+fecha+": "+descripcion+"\n"
    var logger = fs.createWriteStream('archivoLOG.txt',{
        flags: 'a'
    })
    logger.write(linea)
    logger.end()
    res.send("OK")
})

app.listen(PORT, () => {
    console.log('Servidor Log en puerto '+PORT)
})
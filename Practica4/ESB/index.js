'use strict'
const express = require('express');
const app = express();
const axios = require("axios")
var body_parser = require('body-parser').json();

const PORT = 3004;
const HOST = 'localhost'

app.get('/', function(req, res){
    res.send("servidor ESB")
});

app.get('/getorderESB', function(req,res){
    var num = Math.floor(Math.random()*(1000-1)+1)
    var descripcion = "se creo una orden con id: "+num
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.post('http://localhost:3001/postorder',{'id':num})
    res.send({'id':num})
})




app.listen(PORT, () => {
    console.log('Servidor ESB en puerto '+PORT)
})
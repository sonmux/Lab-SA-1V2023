'use strict'
const express = require('express');
const app = express();
const axios = require("axios")
var body_parser = require('body-parser').json();

const PORT = 3000;
const HOST = 'localhost'

app.get('/', function(req, res){
    res.send("servidor cliente")
});

//------ ESB
app.get('/getorder', function(req,res){
    axios.get('http://localhost:3004/getorderESB')
    .then((response)=>{
        res.json(response.data)
    })
})

//------ ESBS
app.get('/getstateorder/:id', body_parser, function(req,res){
    var order = req.params.id
    axios.get('http://localhost:3004/getstateorderESB/'+order)
    .then((response)=>{
        res.json(response.data)
    })
})

//------ ESBS
app.get('/getstateorderRepartidor/:id', body_parser, function(req,res){
    var order = req.params.id
    axios.get('http://localhost:3004/getstateorderRepartidorESB/'+order)
    .then((response)=>{
        res.json(response.data)
    })
})

app.listen(PORT, () => {
    console.log('Servidor Cliente en puerto '+PORT)
})
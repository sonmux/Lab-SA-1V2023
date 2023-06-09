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

app.get('/getorder', function(req,res){
    var num = Math.floor(Math.random()*(1000-1)+1)
    var descripcion = "se creo una orden con id: "+num
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.post('http://localhost:3001/postorder',{'id':num})
    res.json({'id':num})
})

app.get('/getstateorder/:id', body_parser, function(req,res){
    var order = req.params.id
    var descripcion = "Se desea saber el estado de orden en el restaurante: "+order 
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.get('http://localhost:3001/getStateRestaurant/'+order)
        .then((response)=>{
            res.json(response.data)
        })
        //res.json(order)
})

app.get('/getstateorderRepartidor/:id', body_parser, function(req,res){
    var order = req.params.id
    var descripcion = "Se desea saber el estado de orden del repartidor: "+order 
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.get('http://localhost:3002/getStateRepartidor/'+order)
        .then((response)=>{
            res.json(response.data)
        })
        //res.json(order)
})

app.listen(PORT, () => {
    console.log('Servidor Cliente en puerto '+PORT)
})
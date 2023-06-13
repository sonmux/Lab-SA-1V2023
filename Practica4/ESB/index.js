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

app.post('/logESB', body_parser, function(req,res){
    var descrip = req.body.descripcion;
    axios.post('http://localhost:3003/log',{'descripcion':descrip})
    res.send("OK")
})

app.get('/getstateorderESB/:id', body_parser, function(req,res){
    var order = req.params.id
    var descripcion = "Se desea saber el estado de orden en el restaurante: "+order 
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.get('http://localhost:3001/getStateRestaurant/'+order)
        .then((response)=>{
            res.send(response.data)
        })
        //res.json(order)
})

app.get('/avisarRepartidorESB/:id', body_parser, function(req,res){
    var order = req.params.id
    var descripcion = "Restaurante avisa al repartidor de orden lista, orden: "+order 
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    //cambiar estado de orden a entregada a repartidor
    //JSONordenes[order]="Entregada a repartidor"
    axios.post('http://localhost:3002/recibirPedidoRepartidor/',{'id':order})
        .then((response)=>{
            res.send(response.data)
        })
})

app.get('/getstateorderRepartidorESB/:id', body_parser, function(req,res){
    var order = req.params.id
    var descripcion = "Se desea saber el estado de orden del repartidor: "+order 
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.get('http://localhost:3002/getStateRepartidor/'+order)
        .then((response)=>{
            res.send(response.data)
        })
        //res.json(order)
})

//------ ESBS
app.get('/ordenEntregadaESB/:id', body_parser, function(req,res){
    var order = req.params.id
    axios.get('http://localhost:3002/ordenEntregada/'+order)
        .then((response)=>{
            res.json(response.data)
        })
        //res.json(order)
})


app.listen(PORT, () => {
    console.log('Servidor ESB en puerto '+PORT)
})
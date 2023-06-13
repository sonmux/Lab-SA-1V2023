'use strict'
const express = require('express');
const app = express();
const axios = require("axios")
var body_parser = require('body-parser').json();

const PORT = 3001;
const HOST = 'localhost'

const JSONordenes = {}

app.get('/', function(req, res){
    res.send("servidor restaurante")
});

app.post('/postorder', body_parser, function(req,res){
    var nuevaOrden = req.body.id;
    //var estadoOrden = new Array ("Ingresado", "Preparando", "Cancelado", "Entregado a repartidor")
    //var random = Math.floor(Math.random()*3)
    var estadoOrden = new Array ("Ingresado", "Preparando", "Cancelado")
    var random = Math.floor(Math.random()*2)
    JSONordenes[nuevaOrden]=estadoOrden[random]

    var descripcion = "se recibio el pedido: "+nuevaOrden
    axios.post('http://localhost:3004/logESB',{'descripcion':descripcion})
    console.log(JSONordenes)
    res.send("OK")
})

app.get('/getStateRestaurant/:id', body_parser, function(req,res){
    var id = req.params.id
    var descripcion = "Usuario desea saber el estado de su pedido en el restaurante, orden con id: "+id
    //axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    axios.post('http://localhost:3004/logESB',{'descripcion':descripcion})
    
    console.log(JSONordenes[id])
    const respuesta = {
        data:"El estado de la orden "+id+" es: "+JSONordenes[id]
    }
    res.send(respuesta)
})

//------ ESBS
app.get('/avisarRepartidor/:id', body_parser, function(req,res){
    var order = req.params.id
    JSONordenes[order]="Entregada a repartidor"
    axios.get('http://localhost:3004/avisarRepartidorESB/'+order)
    .then((response)=>{
        res.json(response.data)
    })
})

app.listen(PORT, () => {
    console.log('Servidor Restaurante en puerto '+PORT)
})
'use strict'
const express = require('express');
const app = express();
const axios = require("axios")
var body_parser = require('body-parser').json();

const PORT = 3002;
const HOST = 'localhost'

const JSONordenesRepartidor = {}

app.get('/', function(req, res){
    res.send("servidor Repartidor")
});

app.post('/recibirPedidoRepartidor', body_parser, function(req,res){
    var nuevaOrden = req.body.id;
    var estadoOrden = new Array ("En camino", "En el sitio", "Atrasado")
    var random = Math.floor(Math.random()*2)
    JSONordenesRepartidor[nuevaOrden]=estadoOrden[random]

    var descripcion = "Repartidor recibe orden: "+nuevaOrden
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    console.log(JSONordenesRepartidor)
    res.send("OK")
})

app.get('/getStateRepartidor/:id', body_parser, function(req,res){
    var id = req.params.id
    var descripcion = "Usuario desea saber el estado de su pedido por el repartidor, orden con id: "+id
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    
    console.log(JSONordenesRepartidor[id])
    const respuesta = {
        data:"El estado por el repartidor de la orden "+id+" es: "+JSONordenesRepartidor[id]
    }
    res.send(respuesta)
})

app.get('/ordenEntregada/:id', body_parser, function(req,res){
    var id = req.params.id
    var descripcion = "Repartidor entrego orden: "+id
    axios.post('http://localhost:3003/log',{'descripcion':descripcion})
    JSONordenesRepartidor[id]="Entregada"
    res.json({data: "Orden "+id+" entregada"})
})

app.listen(PORT, () => {
    console.log('Servidor Repartidor en puerto '+PORT)
})
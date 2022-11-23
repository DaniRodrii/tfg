const pedidos = require('../modelos/pedidos');
const restaurante = require('../modelos/restaurante');
const jwt = require('jsonwebtoken')
const funcionesPedidos = {};

funcionesPedidos.crearPedido = async (req, res) => {
    const pedido=pedidos(req.body);
  
    pedido.save();
    return res.status(200).json('ok');
}

funcionesPedidos.obtenerPedidos = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    pedidos.find({id_rest:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.obtenerRestaurantes = (req, res) => {

    restaurante.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.obtenerPedido = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    await pedidos.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.editarPedido = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    pedidos.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.borrarPedido = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 

    pedidos.findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

module.exports = funcionesPedidos;
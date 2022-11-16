const restaurante = require('../modelos/restaurante');
const jwt = require('jsonwebtoken')
const funcionesRestaurante = {};

funcionesRestaurante.crearRest = (req, res) => {
    const rest=restaurante(req.body);
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    rest.id_user=id;
    
    console.log(rest);
    
    rest.save();
    return res.status(200).json('ok');
}

funcionesRestaurante.obtenerRests = (req, res) => {

}

funcionesRestaurante.obtenerRest = (req, res) => {

}

funcionesRestaurante.editarRest = (req, res) => {

}

funcionesRestaurante.borrarRest = (req, res) => {

}

module.exports = funcionesRestaurante;
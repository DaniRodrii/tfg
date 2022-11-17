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
    
    rest.save();
    return res.status(200).json('ok');
}

funcionesRestaurante.obtenerRests = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    restaurante.find({id_user:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.cifrarId = (req, res) => {
    let id=req.params.id;
    const token=jwt.sign({_id: id}, 'auth');
    return res.status(200).json(token);
}

funcionesRestaurante.obtenerRest = (req, res) => {

}

funcionesRestaurante.editarRest = (req, res) => {

}

funcionesRestaurante.borrarRest = (req, res) => {

}

module.exports = funcionesRestaurante;
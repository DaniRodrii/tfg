
const usuario = require('../modelos/usuario');
const jwt = require('jsonwebtoken')
const funcionesUsuario = {};

//Crear usuario
funcionesUsuario.crearUser = (req, res) => {
    const user = usuario(req.body);
    const token=jwt.sign({_id: user._id}, 'auth');
    user.save();

    return res.json(token);
        
  
};

//Obtener usuarios
funcionesUsuario.obtenerUsers = (req, res) => {
    usuario.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Obtener usuario
funcionesUsuario.obtenerUser = (req, res) => {
    usuario.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Editar usuarios
funcionesUsuario.editarUsers = (req, res) => {
    usuario.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Borrar usuarios
funcionesUsuario.borrarUsers = (req, res) => {
    usuario.findByIdAndDelete(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

module.exports = funcionesUsuario;

function autentication(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("No autorizado");
    }

    const token=req.headers.authorization.split(' ');
    if(token==null){
        return res.status(401).send("No autorizado");
    }

    const contenToken = jwt.verify(token, 'auth');
    req.userId=contenToken._id;
    next();
}
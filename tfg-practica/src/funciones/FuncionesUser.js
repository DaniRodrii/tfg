
const usuario = require('../modelos/usuario');

const funcionesUsuario = {};

//Crear usuario
funcionesUsuario.crearUser = (req, res) => {
    const user = usuario(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
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
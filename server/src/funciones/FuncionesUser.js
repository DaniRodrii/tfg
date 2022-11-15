
const usuario = require('../modelos/usuario');
const jwt = require('jsonwebtoken')
const funcionesUsuario = {};

//Crear usuario
funcionesUsuario.crearUser = (req, res) => {
    const user = usuario(req.body);
    user.imagen='fotoperfil.png';
    const token=jwt.sign({_id: user._id}, 'auth');
    user.save();

    return res.status(200).json(token);
        
  
};

//login
funcionesUsuario.loguearUser = async (req, res) => {
    const user = await usuario.findOne({correo: req.body.correo});
    if(!user){
        return res.status(401).send('El email no existe');
    }

    if(user.contrasena !== req.body.contrasena){
        return res.status(401).send('Contraseña erronea');
    }


    const token=jwt.sign({_id: user._id}, 'auth');
    return res.status(200).json(token);

} 

//Obtener usuarios
funcionesUsuario.obtenerUsers = (req, res) => {
    usuario.find() 
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Obtener usuario
funcionesUsuario.obtenerUser = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    await usuario.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Editar usuarios
funcionesUsuario.editarUsers = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;


    console.log(req.body);

    usuario.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));

};

//Borrar usuarios
funcionesUsuario.borrarUsers = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 

    usuario.findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};
 
funcionesUsuario.subidaImg = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 
    usuario.findByIdAndUpdate(id, {'imagen':req.file.filename})
        .then((data) => res.json(req.file.filename))
        .catch((error) => res.json({message: error}));
}





module.exports = funcionesUsuario;


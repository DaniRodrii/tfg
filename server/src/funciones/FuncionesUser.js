
const usuario = require('../modelos/usuario');
const jwt = require('jsonwebtoken')
const funcionesUsuario = {};
const bcrypt = require("bcryptjs");
const  enviarMail = require('../funciones/enviarMail')

//Crear usuario
funcionesUsuario.crearUser = async (req, res) => {
    const user = usuario(req.body);
    user.imagen='fotoperfil.png';
    const token=jwt.sign({_id: user._id}, 'auth');

    console.log(user);

    let usuarioEncontrado = await usuario.findOne({nom_user: user.nom_user});
    if(usuarioEncontrado){
        return res.status(400).json({
            message: "El nombre de usuario ya existe",
            success: false
        })
    }

    usuarioEncontrado = await usuario.findOne({correo: user.correo});
    if(usuarioEncontrado){
        return res.status(400).json({
            message: "El correo ya existe",
            success: false
        })
    }

    bcrypt.hash(user.contrasena, 10, (err, palabraSecretaEncriptada) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {
            user.contrasena=palabraSecretaEncriptada;
            user.save();
            enviarMail(user.correo, user.nom_compl);
            return res.status(200).json(token);
        }
    }); 
  
};



//login
funcionesUsuario.loguearUser = async (req, res) => {
    const user = await usuario.findOne({correo: req.body.correo});
    if(!user){
        return res.status(400).json({
            message: "El correo no existe",
            success: false
        })
    }

    bcrypt.compare(req.body.contrasena, user.contrasena, (err, coinciden) => {
        if (err) {
            return res.status(400).json({
                message: "Contraseña erronea",
                success: false
            })
        } else {
            if(coinciden){
                const token=jwt.sign({_id: user._id}, 'auth');
                return res.status(200).json(token);
            }else{
                return res.status(400).json({
                    message: "Contraseña erronea",
                    success: false
                })
            }
        }
    });

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


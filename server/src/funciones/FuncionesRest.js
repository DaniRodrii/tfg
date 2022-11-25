const restaurante = require('../modelos/restaurante');
const empleado = require('../modelos/empleado');
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

funcionesRestaurante.obtenerRest = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    await restaurante.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.editarRest = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    restaurante.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.borrarRest = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 
 
    restaurante.findByIdAndDelete(id) 
        .then(
            empleado.findOneAndDelete({id_rest:id}).then((data) => res.json(data))
        )
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.filtradoDueno = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 
    let nom_dueno=req.body.nom_dueno;
 
    

    restaurante.find({nom_dueno: nom_dueno, id_user:id})
        .then(
            (data) => {
                if(data.lenght == 0){
                    res.message('El dueño no existe')
                }else{
                    res.send(data);
                }
            }
        )
        .catch((error) => res.json({message: error}));
}
 


module.exports = funcionesRestaurante; 
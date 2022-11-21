const empleado = require('../modelos/empleado');
const jwt = require('jsonwebtoken')
const funcionesEmp = {};

funcionesEmp.crearEmp = async (req, res) => {
    const rest=empleado(req.body);
    
    let empleadoEncontrado = await empleado.findOne({DNI: rest.DNI});
    if(empleadoEncontrado){
        return res.status(400).json({
            message: "El empleado ya existe",
            success: false
        })
    }

    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    rest.id_rest=id;
    
    rest.save();
    return res.status(200).json('ok');
}

funcionesEmp.obtenerEmps = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    empleado.find({id_rest:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesEmp.obtenerTodos = (req, res) => { 
    
empleado.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error})); 
}

funcionesEmp.cifrarId = (req, res) => {
    let id=req.params.id;
    const token=jwt.sign({_id: id}, 'auth');
    return res.status(200).json(token); 
} 

funcionesEmp.obtenerEmp = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    await empleado.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesEmp.editarEmp = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    empleado.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesEmp.borrarEmp = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 

    empleado.findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

module.exports = funcionesEmp;
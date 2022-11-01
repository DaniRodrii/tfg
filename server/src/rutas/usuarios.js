const express = require('express');
const router = express.Router();
const usuario = require('../funciones/FuncionesUser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const user = require('../modelos/usuario');

router.post('/registro', usuario.crearUser);
router.post('/login', usuario.loguearUser);
router.get('/', usuario.obtenerUsers);
router.get('/:id', usuario.obtenerUser);
router.put('/:id', usuario.editarUsers);
router.delete('/:id', usuario.borrarUsers);


const almacenarImg = multer.diskStorage({
    filename: function(req, file ,cb)  {
        const extension = file.originalname.split('.').pop();
        const fileName=Date.now();
        cb(null, `${fileName}.${extension}`)
    },
    
    destination:function(req, file, cb)  {
        cb(null, process.cwd()+`/src/assets`)
    }
    
    
}) 

const almacen = multer({storage: almacenarImg})


router.post('/subida/:id', almacen.single('img'), (req, res) => {
    
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    console.log(id);
 
    user.findByIdAndUpdate(id, {'imagen':req.file.filename})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));


});
   
module.exports = router; 
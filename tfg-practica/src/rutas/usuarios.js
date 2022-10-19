const express = require('express');
const usuario = require('../modelos/usuario');

const router = express.Router();

//Crear usuario
router.post('/usuarios', (req, res) => {
    const user = usuario(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

module.exports = router;
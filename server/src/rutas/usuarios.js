const express = require('express');
const router = express.Router();
const usuario = require('../funciones/FuncionesUser');

router.post('/registro', usuario.crearUser);
//Falta login
router.get('/', usuario.obtenerUsers);
router.get('/:id', usuario.obtenerUser);
router.put('/:id', usuario.editarUsers);
router.delete('/:id', usuario.borrarUsers);

module.exports = router; 
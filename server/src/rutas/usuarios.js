const express = require('express');
const router = express.Router();
const usuario = require('../funciones/FuncionesUser');

router.post('/registro', usuario.crearUser);
router.post('/login', usuario.loguearUser);
router.get('/', usuario.obtenerUsers);
router.post('/perfil', usuario.obtenerUser);
router.put('/:id', usuario.editarUsers);
router.delete('/:id', usuario.borrarUsers);

module.exports = router; 
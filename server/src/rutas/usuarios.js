const express = require('express');
const router = express.Router();
const usuario = require('../funciones/FuncionesUser');

router.post('/', usuario.crearUser);
router.get('/', usuario.obtenerUsers);
router.get('/:id', usuario.obtenerUser);
router.put('/:id', usuario.editarUsers);
router.delete('/:id', usuario.borrarUsers);

module.exports = router;
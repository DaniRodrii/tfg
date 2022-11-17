const express = require('express');
const router = express.Router();
const restaurante = require('../funciones/FuncionesRest');

router.post('/aniadir/:id', restaurante.crearRest);
router.get('/verRests/:id', restaurante.obtenerRests);
router.get('/:id', restaurante.obtenerRest);
router.put('/:id', restaurante.editarRest);
router.delete('/:id', restaurante.borrarRest);

module.exports = router; 
const express = require('express');
const router = express.Router();
const restaurante = require('../funciones/FuncionesRest');

router.post('/aniadir/:id', restaurante.crearRest);
router.post('/cifrar/:id', restaurante.cifrarId);
router.get('/verRests/:id', restaurante.obtenerRests);
router.get('/:id', restaurante.obtenerRest);
router.post('/filtrarDireccion/:id', restaurante.filtradoDir);
router.put('/:id', restaurante.editarRest);
router.delete('/:id', restaurante.borrarRest);

module.exports = router;   
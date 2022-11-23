const express = require('express');
const router = express.Router();
const pedido = require('../funciones/FuncionesPedidos');

router.post('/aniadir', pedido.crearPedido);
router.get('/verPedidos/:id', pedido.obtenerPedidos);
router.get('/verRests', pedido.obtenerRestaurantes);
router.get('/:id', pedido.obtenerPedido);
router.put('/:id', pedido.editarPedido);
router.delete('/:id', pedido.borrarPedido);

module.exports = router; 
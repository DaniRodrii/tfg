const express = require('express');
const router = express.Router();
const empleado = require('../funciones/FuncionesEmp');

router.post('/aniadir/:id', empleado.crearEmp);
router.post('/cifrar/:id', empleado.cifrarId);
router.get('/verEmps/:id', empleado.obtenerEmps);
router.get('/:id', empleado.obtenerEmp);
router.get('/verTodos/:id', empleado.obtenerTodos);
router.put('/:id', empleado.editarEmp);
router.delete('/:id', empleado.borrarEmp);

module.exports = router; 
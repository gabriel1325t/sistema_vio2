const router = require('express').Router()


const userController = require("../controllers/userController")
//rotas userController
router.post('/user',userController.createUser);
router.get('/user',userController.getAllUsers);
router.put('/user',userController.updateUser);
router.delete('/user/:cpf',userController.deleteUser);

const organizadorController = require("../controllers/organizadorController")
//rotas organizadorController
router.post('/organizador',organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllOrganizadores);
router.put('/organizador', organizadorController.updateOrganizador);
router.delete('/organizador/:id', organizadorController.deleteOrganizador);

const eventoController = require("../controllers/eventoController")
//rotas eventoController
router.get('/evento/Lista',eventoController.getEventosdia);
router.get('/evento/data',eventoController.getEventosPorData);
router.post('/evento',eventoController.createEvento);
router.get('/evento',eventoController.getAllEventos);
router.put('/evento',eventoController.updateEvento);
router.delete('/evento/:id',eventoController.deleteEvento);


const ingressoController = require("../controllers/ingressoController")

router.post('/ingresso',ingressoController.createIngresso);
router.get('/ingresso',ingressoController.getAllIngressos);
router.put('/ingresso',ingressoController.updateIngresso);
router.delete('/ingresso/:id',ingressoController.deleteIngresso);


module.exports = router
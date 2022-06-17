const {Router} = require('express');
const { validateUser } = require('../helpers/validate-user');
const router = Router();
const Usuario = require('../models/Usuario');

router.post('/', async function(req, res){

    try{
        

        console.log('ha sido recibido',req.body);

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        console.log(existeUsuario);
        if(existeUsuario){
            return res.status(400).send('El correo ya existe');
        }
    
    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);

    }catch(error){
        console.log(error);
        res.status(500).send('un error ocurrió en el servidor');
    }
    
});

router.get('/', async function(req, res){
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios);
    }catch(error){
        console.log(error);
        res.status(500).send('un error ocurrió en el servidor');
    }
});

router.put('/:usuarioId', async function(req, res){
    try{

        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
            return res.status(400).send('El usuario no existe');
        }

        const existeUsuario = await Usuario
        .findOne({email: req.body.email, _id:{$ne: usuario._id}});
        console.log(existeUsuario);
        if(existeUsuario){
            return res.status(400).send('El correo ya existe');
        }
        
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();
    
        usuario = await usuario.save();
    
        res.send(usuario);

    }catch(error){
        console.log(error);
        res.status(500).send('Un error ocurrió con el servidor');
    }
});

module.exports = router;
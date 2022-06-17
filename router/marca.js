const{Router} = require('express');
const Marca = require('../models/Marca');

const router = Router();

router.get('/', async function(req, res){
    try{
        const marcas = await Marca.find();
        res.send(marcas);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
    
});

router.post('/', async function(req, res){
    try{

        console.log(req.body);

        const nombreMarca = await Marca.findOne({nombre: req.body.nombre});
        console.log(nombreMarca);
        if(nombreMarca){
            return res.status(400).send('Mark not found');
        }
    
    let marca = new Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date();
    marca.fechaActualizacion = new Date();

    marca = await marca.save();

    res.send(marca);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.put('/:marcaId', async function(req, res){
    try{

        let marca = await Marca.findById(req.params.marcaId);
        if(!marca){
            return res.status(400).send('Mark not found')
        }
        console.log(req.body);

        const nombreMarca = await Marca
        .findOne({nombre: req.body.nombre, _id:{$ne: marca._id}});
        console.log(nombreMarca);
        if(nombreMarca){
            return res.status(400).send('does not exists mark');
        }
    
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date();
    marca.fechaActualizacion = new Date();

    marca = await marca.save();

    res.send(marca);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

module.exports = router;
const req = require("express/lib/request");

const validateUser = (req) => {
    const validaciones = [];

    if(req.body.nombre){
        validaciones.push('required name');
    }

    if(req.body.email){
        validaciones.push('required email');
    }

    if(req.body.estado){
        validaciones.push('required status');
    }
}

module.exports ={
    validateUser
}
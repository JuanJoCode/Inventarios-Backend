const req = require("express/lib/request");

const validateEstadoEquipo = (req) => {
    const validaciones = [];

    if(req.body.nombre){
        validaciones.push('required name');
    }

    if(req.body.estado){
        validaciones.push('required status');
    }
}

module.exports = {
    validateEstadoEquipo
}
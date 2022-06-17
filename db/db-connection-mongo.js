const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        const url ='mongodb://JuanJoCode:IUD1036448206@ac-gh7lheh-shard-00-00.hwbhbct.mongodb.net:27017,ac-gh7lheh-shard-00-01.hwbhbct.mongodb.net:27017,ac-gh7lheh-shard-00-02.hwbhbct.mongodb.net:27017/inventarios-backend?ssl=true&replicaSet=atlas-o72dof-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);

        console.log('conexion exitosa');
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    getConnection,
}
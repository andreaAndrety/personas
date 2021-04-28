const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users = new Schema({
    numeroIdentificacion: { type: String, require: [true, 'la identificacion es requerida'] },
    nombres: { type: String, require: [true, 'el nombre es requerido'] },
    apellidos: { type: String, require: [true, 'el apellido es requerido'] },
    fanquisia: { type: String, require: [true, 'la franquisia es requerido'] },
    numero: { type: String, require: [true, 'el numero de la tajeta es requerido'] },
    csv: { type: String, require: [true, 'el codigo es requerido es requerido'] },
    anio_vencimiento: { type: Number, require: [true, 'el anio es requerido'] },
    mes_vencimiento: { type: Number, require: [true, 'el mes es requerido'] }
});


module.exports = mongoose.model('users', users);
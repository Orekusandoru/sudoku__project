const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const StatsSchema = new Schema({
    rate: Number,
    user: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },

});

const StatsModel = model('Stats', StatsSchema);
module.exports = StatsModel;
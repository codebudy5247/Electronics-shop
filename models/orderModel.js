const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    order:{type:String},
    total:{type:String}
})

module.exports = mongoose.model("Order", orderSchema);
import mongoose from 'mongoose'

const bankNiftyDataSchema = new mongoose.Schema(

    {
        time: String,
        
        bn49_per: Number,
        bn49_change: Number,

        bn50_per: Number,
        bn50_change: Number,
    }

, { _id: false })

const bankNiftySchema = new mongoose.Schema({
    date: String,
    data: [ bankNiftyDataSchema ]
}, { autoIndex: false })
    
/* 

let BankNifty = DB_CONN.model('BankNifty', bankNiftySchema);

module.exports.saveBnData = (data) => {

    (new BankNifty(data)).save((err) => {
        if (err) {
            return handleError(err);
        }
    })

}

module.exports.getLabels = async () => {
    let result = await BankNifty.find({date : '2023-02-18'}).exec()
    return result
} */

module.exports = mongoose.models.BankNifty || mongoose.model('BankNifty', bankNiftySchema)
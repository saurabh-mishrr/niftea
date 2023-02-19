import dbConnect from "@/configs/mongo.db";
import BankNifty from "@/models/banknifty.model";

export default async function handler(req, res) {

    const { method } = req;

    await dbConnect();

    switch (method) {
        
        case 'GET':
            try {
                const result = await BankNifty.find({'date' : '2023-02-19'})

                let labels = (result[0].data).map(function(a){
                    return a.time
                })
            
                let bn50_per = (result[0].data).map(function(a){
                    return a.bn50_per
                })
            
                let bn49_per = (result[0].data).map(function(a){
                    return a.bn49_per
                })

                res.status(200).json({success: true, data: {labels: labels, bn50_per: bn50_per, bn49_per: bn49_per}})
            } catch (err) {
                res.status(400).json({success: false})
            }
            break;

        case 'POST':
            try {
                const isRecordExists = await BankNifty.count({'date' : req.body.date})

                if (isRecordExists == 0) {
                    var a = await BankNifty.create(req.body, (err) => {
                        if (err) res.status(400).json({success: false, error: err.message});
                    })
                }

                if (isRecordExists > 0) {
                    var a = await BankNifty.updateOne({'date' : req.body.date}, {  $push: {"data" : req.body.data[0]} })
                }

                res.status(201).json({success: true, data: a})
            } catch (err) {
                res.status(400).json({success: false, error: err.message})
            }
            break

    }

}
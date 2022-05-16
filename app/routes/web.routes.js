require("dotenv").config();
const request = require("request");
const HDWallet = require('ethereum-hdwallet')
const mnemonic = process.env.WORD;
const hdwallet = HDWallet.fromMnemonic(mnemonic)
const gateway = hdwallet.derive(`m/44'/60'/0'/0`)
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3("https://data-seed-prebsc-1-s1.binance.org:8545/")
const db = require("../models");
const Wallet = db.wallet;
const Payment = db.transaction;
const {
  sequelize
} = require('../models');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/", (req,res)=>{
      request("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",(err,response,body)=>{
        let ETHPrice = JSON.parse(body).price;
        let ETHValue = 5/ETHPrice;
      request("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",(err,response,body)=>{
        let bnbPrice = JSON.parse(body).price;
        let bnbValue = 5/bnbPrice;
      res.render("components/sale",{ 
          layout:"layouts/main",
          title:"Welcome",
          bnbValue:bnbValue,
          ETHValue:ETHValue
        });
        });
      });
    });


    app.post("/transaction", (req,res)=>{
      (async ( ) => {
        let transaction = await sequelize.transaction()
        try {
            var tx = await Payment.create({
              hash: req.body.hash,
              from: req.body.from,
              to:   req.body.to,
              merchant:  req.body.merchant,
              amount:  req.body.value,
              usdValue:  req.body.usdValue,
              currency: req.body.currency,
              status:'sent'  
            }, {
                transaction
            });
        await transaction.commit();
        return res.status(200).send({
          status: "success",
          msg: 'Transaction created'
      });
        } catch (error) {
            await transaction.rollback();
            res.status(500).send({
                status: "fail",
                msg: error.message
            });
        }
      })();
    });

    
  app.get("/generate", (req,res)=>{
  (async ( ) => {
    let transaction = await sequelize.transaction()
    try {
        var wallet = await Wallet.create({
            wallet: "new"
        }, {
            transaction
        });
    await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        res.status(500).send({
            status: "fail",
            msg: error.message
        });
    }
    let account =  `0x${gateway.derive(wallet.id).getAddress().toString('hex')}`; 
    transaction = await sequelize.transaction()
    try {
        wallet.update({
        wallet: account
        },
        { where: {
         id: wallet.id
          }
        },
        {
        transaction
        });
    await transaction.commit();
    return res.status(200).send({
                    status: "success",
                    msg: 'wallet created',
                    address:wallet.wallet
                });
    } catch (error) {
        await transaction.rollback();
        res.status(500).send({
            status: "fail",
            msg: error.message
        });
    }
  })();
});

app.get("/transaction/:hash", (req,res)=>{
  res.render("components/transactions",{ 
      layout:"layouts/main",
      title:"Welcome",
      hash:req.params.hash
  });
}); 
};
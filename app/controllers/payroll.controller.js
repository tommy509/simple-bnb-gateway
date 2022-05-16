require('dotenv').config({path:'../../.env'});
const HDWallet = require('ethereum-hdwallet')
const mnemonic = process.env.WORD;
const hdwallet = HDWallet.fromMnemonic(mnemonic)
const gateway = hdwallet.derive(`m/44'/60'/0'/0`)
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
var https = require('follow-redirects').https;
const db = require("../models");
const Payment = db.transaction;
const Wallet =  db.wallet;
const Op = db.Sequelize.Op;
const { sequelize } = require('../models');
const cron = require('node-cron');




     async function  pay() {

                    const transaction = await sequelize.transaction();   
                    try {
                        let tx =  await Payment.findOne({where:{status:"sent"}});
                        let account = await Wallet.findOne({where:{wallet:tx.to}});
                        let wallet  =  await gateway.derive(account.id).getPrivateKey().toString('hex');
                        let base    = tx.amount;
                        let amount  = tx.amount; 
                        if(tx.currency=="BNB"){
                        const web3 = createAlchemyWeb3("https://data-seed-prebsc-2-s3.binance.org:8545");
                        amount = parseFloat(amount);
                        amount = (amount - 0.00043)*0.98;
                        amount = web3.utils.toWei(String(amount.toFixed(8)), 'ether');
                        let to =  process.env.Merchant;
                        let nonce = await web3.eth.getTransactionCount(tx.to, "latest");
                        let data = {
                            from: tx.to,
                            to:to,
                            nonce: nonce,
                            gas: 21000,
                            value:amount,
                                 }
                          let signPromise = web3.eth.accounts.signTransaction(data, wallet)
                          signPromise.then((signedTx) => {
                              web3.eth.sendSignedTransaction(
                                signedTx.rawTransaction,
                                function (err, hash) {
                                  if (!err) {
                                    console.log(
                                      "The hash of your transaction is: ",
                                      hash,
                                      "\nCheck Alchemy's Mempool to view the status of your transaction!"
                                    )
                                  } else {
                                    console.log(
                                      "Something went wrong when submitting your transaction:",
                                      err
                                    )
                                  }
                                }
                              )
                            })
                            .catch((err) => {
                              console.log("Promise failed:", err)
                            })
                         
                          
                                amount = base; 
                                amount = parseFloat(amount);
                                amount = (amount - 0.00043)*0.02;
                                amount = web3.utils.toWei(String(amount.toFixed(8)), 'ether');
                                to =  process.env.OWNER;
                                nonce = nonce+1;
                                data = {
                                    from: tx.to,
                                    to:to,
                                    nonce: nonce,
                                    gas: 21000,
                                    value:amount,
                                         }
                                  signPromise = web3.eth.accounts.signTransaction(data, wallet)
                                  signPromise.then((signedTx) => {
                                      web3.eth.sendSignedTransaction(
                                        signedTx.rawTransaction,
                                        function (err, hash) {
                                          if (!err) {
                                            console.log(
                                              "The hash of your transaction is: ",
                                              hash,
                                              "\nCheck Alchemy's Mempool to view the status of your transaction!"
                                            )
                                          } else {
                                            console.log(
                                              "Something went wrong when submitting your transaction:",
                                              err
                                            )
                                          }
                                        }
                                      )
                                    })
                                    .catch((err) => {
                                      console.log("Promise failed:", err)
                                    }) 
                        tx.set({
                            'status': 'complete'
                        },
                        {
                        transaction
                        });
                        tx.save();
                    await transaction.commit();
                        }

                        if(tx.currency=="ETH"){
                          const web3 = createAlchemyWeb3("https://ropsten.infura.io/v3/438615f5bac3482aba49c69015b34752");
                          amount = parseFloat(amount);
                          amount = (amount - 0.00043)*0.98;
                          amount = web3.utils.toWei(String(amount.toFixed(8)), 'ether');
                          let to =  process.env.Merchant;
                          let nonce = await web3.eth.getTransactionCount(tx.to, "latest");
                          let data = {
                              from: tx.to,
                              to:to,
                              nonce: nonce,
                              gas: 21000,
                              value:amount,
                                   }
                            let signPromise = web3.eth.accounts.signTransaction(data, wallet)
                            signPromise.then((signedTx) => {
                                web3.eth.sendSignedTransaction(
                                  signedTx.rawTransaction,
                                  function (err, hash) {
                                    if (!err) {
                                      console.log(
                                        "The hash of your transaction is: ",
                                        hash,
                                        "\nCheck Alchemy's Mempool to view the status of your transaction!"
                                      )
                                    } else {
                                      console.log(
                                        "Something went wrong when submitting your transaction:",
                                        err
                                      )
                                    }
                                  }
                                )
                              })
                              .catch((err) => {
                                console.log("Promise failed:", err)
                              })
                           
                            
                                  amount = base; 
                                  amount = parseFloat(amount);
                                  amount = (amount - 0.00043)*0.02;
                                  amount = web3.utils.toWei(String(amount.toFixed(8)), 'ether');
                                  to =  process.env.OWNER;
                                  nonce = nonce+1;
                                  data = {
                                      from: tx.to,
                                      to:to,
                                      nonce: nonce,
                                      gas: 21000,
                                      value:amount,
                                           }
                                    signPromise = web3.eth.accounts.signTransaction(data, wallet)
                                    signPromise.then((signedTx) => {
                                        web3.eth.sendSignedTransaction(
                                          signedTx.rawTransaction,
                                          function (err, hash) {
                                            if (!err) {
                                              console.log(
                                                "The hash of your transaction is: ",
                                                hash,
                                                "\nCheck Alchemy's Mempool to view the status of your transaction!"
                                              )
                                            } else {
                                              console.log(
                                                "Something went wrong when submitting your transaction:",
                                                err
                                              )
                                            }
                                          }
                                        )
                                      })
                                      .catch((err) => {
                                        console.log("Promise failed:", err)
                                      }) 
                          tx.set({
                              'status': 'complete'
                          },
                          {
                          transaction
                          });
                          tx.save();
                      await transaction.commit();
                          }
                   

                    } catch (error) {
                    await transaction.rollback();
                    }      
                } 


                    cron.schedule('* * * * *', () => {
                    console.log('running a task every minute');
                    pay();
                  });
        
 
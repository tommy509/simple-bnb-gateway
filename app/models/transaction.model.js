module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    hash: {
    type: Sequelize.STRING,
      unique:true
    },
    from: {
        type: Sequelize.STRING
      },
    to: {
        type: Sequelize.STRING
      },
    merchant: {
        type: Sequelize.STRING
      },
    amount: {
        type: Sequelize.STRING
    },
    usdValue: {
        type: Sequelize.DECIMAL(10, 2) 
    },
    currency: {
      type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
      }
  });

  return Transaction;
};
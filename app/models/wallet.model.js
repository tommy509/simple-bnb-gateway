module.exports = (sequelize, Sequelize) => {
  const Wallet = sequelize.define("wallets", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    wallet: {
    type: Sequelize.STRING
    }
  });
  return Wallet;
};
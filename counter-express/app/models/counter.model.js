module.exports = (sequelize, Sequelize) => {
  const Counter = sequelize.define("counter", {
    value: {
      type: Sequelize.INTEGER,
    },
  });
  return Counter;
};

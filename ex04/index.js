const Sequelize = require('sequelize');
module.exports.initModel = async sequelize => {
  const Product = sequelize.define('product', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  const User = sequelize.define('user', {
    name: Sequelize.STRING,
    allowNull: false
  })

  Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
  });

  User.hasMany(Product);

  return { User, Product };
}
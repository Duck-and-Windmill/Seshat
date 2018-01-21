var db = artifacts.require("./db.sol");

module.exports = function(deployer) {
  deployer.deploy(db);
};

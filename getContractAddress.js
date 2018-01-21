var db = artifacts.require("./db.sol");

module.exports = function(callback) {
    db.deployed().then(function(instance){
       console.log(instance.address);
    });
}


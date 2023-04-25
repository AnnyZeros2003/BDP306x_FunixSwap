const Migrations = artifacts.require("Migrations");

module.exports = function(deployer, web3) {
    deployer.deploy(Migrations);
};
const reserveToken1 = artifacts.require("Reserve");
const reserveToken2 = artifacts.require("Reserve");
const exchange = artifacts.require("Exchange");


module.exports = async function(deployer, network, accounts, web3) {
    let token1ReserveAddress;
    let token2ReserveAddress;

    let token1TokenAddress;
    let token2TokenAddress;
    await deployer.deploy(reserveToken1, "Token1", "TOKEN1", 1, 1, true, { from: accounts[0], gas: 6721975 });
    const deployedToken1 = await reserveToken1.deployed().then(async instance => {
        instance.setRate(2);
        token1ReserveAddress = instance.address;
        token1TokenAddress = await instance.getTokenAddress();
    });

    await deployer.deploy(reserveToken2, "Token2", "TOKEN2", 1, 1, true, { from: accounts[0], gas: 6721975 });
    const deployedToken2 = await reserveToken2.deployed().then(async instance => {
        instance.setRate(4);
        token2ReserveAddress = instance.address;
        token2TokenAddress = await instance.getTokenAddress();
    });;

    await deployer.deploy(exchange, true, { from: accounts[0], gas: 6721975 });
    const deployedExchange = await exchange.deployed().then(async instance => {
        console.log(`Exchange address: ${instance.address}`);
        console.log(`Token1 address: ${token1TokenAddress}`);
        console.log(`Token2 address: ${token2TokenAddress}`);
        await instance.addReserve(token1ReserveAddress);
        await instance.addReserve(token2ReserveAddress);
        await instance.buyToken(token1TokenAddress, { from: accounts[0], value: 50 })
        await instance.buyToken(token2TokenAddress, { from: accounts[0], value: 50 })
    });

}
import Web3 from "web3";
import EnvConfig from "../../configs/env.js";
export function getWeb3Instance() {
    if (window.web3) {
        return new Web3("http://localhost:9545");
    }
    return new Web3(Web3.givenProvider);
}

export function getTokenContract(tokenAddress) {
    const web3 = getWeb3Instance();
    return new web3.eth.Contract(EnvConfig.TOKEN_ABI, tokenAddress);
}

export function getExchangeContract() {
    const web3 = getWeb3Instance();
    const contract = new web3.eth.Contract(EnvConfig.EXCHANGE_CONTRACT_ABI, EnvConfig.EXCHANGE_CONTRACT_ADDRESS);

    return contract;
}

export function isValidEthAddress(susAddress) {
    const web3 = getWeb3Instance();
    return web3.utils.isAddress(susAddress);
}
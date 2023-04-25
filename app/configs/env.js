const EnvConfig = {
    RPC_ENDPOINT: 'localhost:9545',
    TOKEN_ABI: [{
            "inputs": [{
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowed",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "balances",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    EXCHANGE_CONTRACT_ABI: [{
            "inputs": [{
                "internalType": "bool",
                "name": "_tradeEnabled",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "ExchangeLog",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "tradeEnabled",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "stateMutability": "payable",
            "type": "receive",
            "payable": true
        },
        {
            "inputs": [],
            "name": "checkEthBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getSupportedTokens",
            "outputs": [{
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "srcToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "destToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "getExchangeRate",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "srcAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "destAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "exchange",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "srcAddress",
                "type": "address"
            }],
            "name": "buyToken",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "destAddress",
                "type": "address"
            }],
            "name": "exchangeEthToToken",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "srcAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "exchangeTokenToEth",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "contract Reserve",
                "name": "reserve",
                "type": "address"
            }],
            "name": "addReserve",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }],
            "name": "removeReserve",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    EXCHANGE_CONTRACT_ADDRESS: "0x63F76EEdE17CD0F1484f7F3eE57e1D4FdC252a41",
    TOKENS: [{
            "name": "Ether",
            "symbol": "ETH",
            "address": '0x0000000000000000000000000000000000000000',
        },
        {
            "name": "Token1",
            "symbol": "TOKEN1",
            "address": "0x2670E16BC2337a7542100e312AE252e2d5ec6beC"
        },
        {
            "name": "Token2",
            "symbol": "TOKEN2",
            "address": "0xD7Ec42652f320F3426cCBf3abffdB2A625ca0Eaa"
        }
    ]
};

export default EnvConfig;
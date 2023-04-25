# BDP306x_FunixSwap
This is final project for BDP306x course.
This is an decentralized exchange application for swapping and transferring tokens. 

# Installation
First installation

In root folder
```bash
npm install -g npm
npm install -g truffle
npm install -g ganache-cli

cd app
npm install web3
npm install
```

# Development
## Deploy

Run Ganache in port 9545

In root folder
```bash
truffle migrate # truffle migrate --restart
```

Config contract address and token address in 'app/configs/env.js'

## Run project in browser

In root folder
```bash
cd app
npm run build
npm run serve
```

This project is on [https://github.com/AnnyZeros2003/BDP306x_FunixSwap] own by LinhNVK

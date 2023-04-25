import { getAllowance, getExchangeRate, getTokenBalances, exchangeToken, approveTokenForExchange, estimateExchangeGas, estimateTranferGas, tranferToken, checkTokenBalance } from "./services/web3/networkService.js";
import EnvConfig from "./configs/env.js";
import { isValidEthAddress } from "./services/web3/web3Service.js";

const ONE_ETHER = Math.pow(10, 18);
let currentAccount;
console.log('start...')
$(function() {
    start();

    function initDropdown() {
        let dropdownTokens = '';
        EnvConfig.TOKENS.forEach((token) => {
            dropdownTokens += `<div class="dropdown__item">${token.symbol}</div>`;
        });
        $('.dropdown__content').html(dropdownTokens);
    }

    function getSelectedTokens(srcSymbol, destSymbol) {
        $('#selected-src-symbol').html(srcSymbol);
        $('#selected-dest-symbol').html(destSymbol);
        $('#rate-src-symbol').html(srcSymbol);
        $('#rate-dest-symbol').html(destSymbol);
        $('#selected-transfer-token').html(srcSymbol);
    }

    function assignDefaultRate(srcSymbol, destSymbol) {
        const srcToken = findTokenBySymbol(srcSymbol);
        const destToken = findTokenBySymbol(destSymbol);
        const defaultSrcAmount = ONE_ETHER.toString();
        updateRate(srcToken.address, destToken.address, defaultSrcAmount);
    }

    async function updateRate(srcAddress, destAddress) {
        const amount = ONE_ETHER + '';
        try {
            const result = await getExchangeRate(srcAddress, destAddress, amount);
            console.log('what result: ' + result);
            const rate = result / ONE_ETHER;
            $('#exchange-rate').text(rate);
        } catch (error) {
            console.log(error);
            $('#exchange-rate').text(0);
        }
    }

    async function updateDestAmount(srcAddress, destAddress, srcAmount) {
        if (isNaN(srcAmount) || srcAmount <= 0) {
            $('.input-placeholder').text(0);
        } else {
            let result = await getExchangeRate(srcAddress, destAddress, srcAmount + '');
            result = result / ONE_ETHER;
            $('.input-placeholder').text(result);
        }
    }

    async function reloadCurrentBalance() {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log({ accounts });
        currentAccount = accounts[0];
        $('#current_address').text(currentAccount);
        if (currentAccount) {
            const srcSymbol = $('#selected-src-symbol').text();
            const srcToken = findTokenBySymbol(srcSymbol);
            const balance = await getTokenBalances(srcToken.address, currentAccount)
            console.log({ balance });
            $('#current_symbol').text(srcSymbol);
            $('#current_balance').text(balance);
        } else {
            $('#current_balance').text(0);
        }

    }

    function findTokenBySymbol(symbol) {
        return EnvConfig.TOKENS.find(token => token.symbol === symbol);
    }

    function start() {
        const defaultSrcSymbol = EnvConfig.TOKENS[0].symbol;
        const defaultDestSymbol = EnvConfig.TOKENS[1].symbol;

        initDropdown();
        getSelectedTokens(defaultSrcSymbol, defaultDestSymbol);
        assignDefaultRate(defaultSrcSymbol, defaultDestSymbol);
        reloadCurrentBalance();
        setInterval(() => {
            console.log('Refresh account balance....');

            const srcSymbol = $('#selected-src-symbol').text();
            const destSymbol = $('#selected-dest-symbol').text();

            const srcToken = findTokenBySymbol(srcSymbol);
            const destToken = findTokenBySymbol(destSymbol);

            const srcAmount = $('#swap-source-amount').val() * ONE_ETHER;

            updateRate(srcToken.address, destToken.address);
            updateDestAmount(srcToken.address, destToken.address, srcAmount);
            reloadCurrentBalance();
        }, 3000);
    }

    $(document).on('click', '.dropdown__item', function() {
        const selectedSymbol = $(this).html();
        $(this).parent().siblings('.dropdown__trigger').find('.selected-target').html(selectedSymbol);

        const srcSymbol = $('#selected-src-symbol').text();
        const destSymbol = $('#selected-dest-symbol').text();

        const srcToken = findTokenBySymbol(srcSymbol);
        const destToken = findTokenBySymbol(destSymbol);

        $('#rate-src-symbol').text(srcSymbol);
        $('#rate-dest-symbol').text(destSymbol);
        updateRate(srcToken.address, destToken.address);

        const srcAmount = $('#swap-source-amount').val() * ONE_ETHER;
        updateDestAmount(srcToken.address, destToken.address, srcAmount);
        reloadCurrentBalance();
    });

    $('#import-metamask').on('click', async function() {
        await ethereum.request({ method: 'eth_requestAccounts' });
        reloadCurrentBalance();
    });

    $('#swap-source-amount').on('input change', async function() {
        let srcString = $('#swap-source-amount').val() + '';
        srcString = srcString.replace(/([^\d.])/g, '');
        srcString = $('#swap-source-amount').val(srcString);

        const srcSymbol = $('#selected-src-symbol').text();
        const destSymbol = $('#selected-dest-symbol').text();

        const srcToken = findTokenBySymbol(srcSymbol);
        const destToken = findTokenBySymbol(destSymbol);

        const srcAmount = $('#swap-source-amount').val() * ONE_ETHER;

        updateRate(srcToken.address, destToken.address);
        updateDestAmount(srcToken.address, destToken.address, srcAmount);
    });

    $('#transfer-source-amount').on('input change', async function() {
        let srcString = $('#transfer-source-amount').val() + '';
        srcString = srcString.replace(/([^\d.])/g, '');
        srcString = $('#transfer-source-amount').val(srcString);
    });

    $('.dropdown__item').on('click', function() {
        $(this).parents('.dropdown').removeClass('dropdown--active');
    });

    $('.swap__icon').on('click', function() {
        const destSymbol = $('#selected-src-symbol').text();
        const srcSymbol = $('#selected-dest-symbol').text();

        const srcToken = findTokenBySymbol(srcSymbol);
        const destToken = findTokenBySymbol(destSymbol);

        $('#selected-src-symbol').text(srcSymbol);
        $('#selected-dest-symbol').text(destSymbol);

        $('#rate-src-symbol').text(srcSymbol);
        $('#rate-dest-symbol').text(destSymbol);


        const srcAmount = $('#swap-source-amount').val() * ONE_ETHER;

        updateRate(srcToken.address, destToken.address);
        updateDestAmount(srcToken.address, destToken.address, srcAmount);

        reloadCurrentBalance();
    });

    $('#swap-button').on('click', async function() {
        const srcSymbol = $('#selected-src-symbol').text();
        const destSymbol = $('#selected-dest-symbol').text();

        const srcToken = findTokenBySymbol(srcSymbol);
        const destToken = findTokenBySymbol(destSymbol);

        const srcAmount = $('#swap-source-amount').val();
        const destAmount = $('.input-placeholder').text();

        if (srcSymbol == destSymbol) {
            alert(`Source token and destination token must not the same!`);
            return;
        }

        if (srcAmount == 0) {
            alert(`You should swap some ${srcSymbol}`);
            return;
        }

        if (currentAccount == undefined) {
            alert(`No wallet address provided!`);
            return;
        }

        if (!(await checkTokenBalance(srcToken.address, currentAccount, srcAmount))) {
            alert(`You don't have enough ${srcSymbol}`);
            return;
        }

        const allowed = await getAllowance(srcToken.address, currentAccount, EnvConfig.EXCHANGE_CONTRACT_ADDRESS);

        let isAllowed = allowed >= (srcAmount * ONE_ETHER);
        if (!isAllowed && srcToken.address == "0x0000000000000000000000000000000000000000") {
            alert(`You don't have enought ETH, need ${srcAmount - allowed / ONE_ETHER} more ETH`)
            return;
        }

        if (!isAllowed) {
            const approveResult = await approveTokenForExchange(srcToken.address, srcAmount * ONE_ETHER, currentAccount);
            const approval = await approveResult;
            console.log("has approved: " + JSON.stringify(approval));
            isAllowed = !!approveResult;
        }

        if (isAllowed) {
            let confirmString = 'Do you want to swap from \n';
            confirmString += `${srcAmount} ${srcSymbol}\n`;
            confirmString += `To \n`;
            confirmString += `${destAmount} ${destSymbol} \n\n`;
            confirmString += `Estimated gas: ${(await estimateExchangeGas(srcToken.address, destToken.address, srcAmount) / ONE_ETHER).toFixed(18)} ETH`
            const confirmResult = confirm(confirmString);
            if (!confirmResult) return;

            const exchangeResult = await exchangeToken(srcToken.address, destToken.address, srcAmount);

            if (!!exchangeResult) {
                alert('Transaction successfully');
            } else {
                alert('Transaction failed or canceled');
            }

        } else {
            alert("Check allowance");
        }

    });

    $('#tranfer-button').on('click', async function() {
        const srcSymbol = $('#selected-transfer-token').text();
        const srcToken = findTokenBySymbol(srcSymbol);
        const destAddress = $('#transfer-address').val();
        if (!isValidEthAddress(destAddress)) {
            alert(`${destAddress} is not a valid Eth address`);
            return;
        }

        if (currentAccount == undefined) {
            alert(`No wallet address provided!`);
            return;
        }

        if (currentAccount == destAddress) {
            alert(`You cannot transfer to yourself`);
            return;
        }

        const tranferAmount = $('#transfer-source-amount').val();

        if (tranferAmount == 0) {
            alert(`Input some ${srcSymbol}`);
            return;
        }
        if (!(await checkTokenBalance(srcToken.address, currentAccount, tranferAmount))) {
            alert(`You don't have enough ${srcSymbol}`);
            return;
        }
        const allowed = await getAllowance(srcToken.address, currentAccount, EnvConfig.EXCHANGE_CONTRACT_ADDRESS);

        let isAllowed = allowed >= (tranferAmount * ONE_ETHER);
        if (!isAllowed && srcToken.address == "0x0000000000000000000000000000000000000000") {
            alert(`You have not enough ETH, need ${tranferAmount - allowed / ONE_ETHER} more ETH`)
            return;
        }
        if (!isAllowed) {
            const approveResult = await approveTokenForExchange(srcToken.address, tranferAmount * ONE_ETHER, currentAccount);
            console.log({ approveResult });
            isAllowed = !!approveResult;
        }
        if (isAllowed) {
            let confirmString = 'Do you want to transfer from \n';
            confirmString += `${tranferAmount} ${srcSymbol} \n`;
            confirmString += `To address \n`;
            confirmString += `${destAddress} \n\n`;
            confirmString += `Estimated gas: ${(await estimateTranferGas(srcToken.address, destAddress, tranferAmount) / ONE_ETHER).toFixed(18)} ETH`

            const confirmResult = confirm(confirmString);
            if (!confirmResult) return;
            const transferResult = await tranferToken(srcToken.address, destAddress, tranferAmount);
            if (transferResult) {
                alert('Transaction successfully');
            } else {
                alert('Transaction failed or canceled');
            }
        } else {
            alert("Check allowance");
        }

    });
    $('.tab__item').on('click', function() {
        const contentId = $(this).data('content-id');
        $('.tab__item').removeClass('tab__item--active');
        $(this).addClass('tab__item--active');

        if (contentId === 'swap') {
            $('#swap').addClass('active');
            $('#transfer').removeClass('active');
        } else {
            $('#transfer').addClass('active');
            $('#swap').removeClass('active');
        }
    });
    $('.dropdown__trigger').on('click', function() {
        $(this).parent().toggleClass('dropdown--active');
    });

    $('.modal').on('click', function(e) {
        if (e.target !== this) return;
        $(this).removeClass('modal--active');
    });
});
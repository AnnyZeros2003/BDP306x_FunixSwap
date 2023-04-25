pragma solidity ^0.8.0;
import "./Reserve.sol";
contract Exchange {
    mapping(address => address) tokenToReserve;
    address[] tokenAddresses;
    string[] tokenSymbols;
    string[] tokenNames;
    address public owner;
    bool public tradeEnabled;
    event ExchangeLog(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(bool _tradeEnabled) public {
        owner = msg.sender;
        tradeEnabled = _tradeEnabled;
    }

    receive() external payable {
            
    }

    function checkEthBalance() public view returns(uint256) {
        return (payable(address(this))).balance;
    }


    function getSupportedTokens() public view returns (address[] memory) {
        return tokenAddresses;
    }

    function getExchangeRate(address srcToken, address destToken, uint256 amount) public view returns (uint256) {
        uint srcRate = 1;
        uint destRate = 1;
        uint rate;
        if (srcToken == destToken) {
            rate = amount;
        } else if (address(0) != srcToken) {
            srcRate = Reserve(tokenToReserve[srcToken]).sellRate();
            rate = amount / srcRate;
        } else if (address(0) != destToken) {
            destRate = Reserve(tokenToReserve[destToken]).buyRate();
            rate = amount * destRate;
        } 
        return rate;
    }

    function exchange(address srcAddress, address destAddress, uint256 amount) public returns (uint256) {
        Reserve srcReserve = Reserve(tokenToReserve[srcAddress]);
        Reserve desReserve = Reserve(tokenToReserve[destAddress]);
        SimpleToken srcToken = srcReserve.token();
        SimpleToken desToken = desReserve.token();

        require(amount > 0, "Exchange[exchange]: Submitted amount must greater than 0");
        require(srcToken.allowance(msg.sender, address(this)) >= amount, "Exchange[exchange]: Total allowance must be greater than or equal to the amount");

        uint256 desAmount = getExchangeRate(srcAddress, destAddress, amount);
        srcToken.transferFrom(msg.sender, address(this), amount);
        desToken.transfer(msg.sender, desAmount);
        return desAmount;
    }


    function buyToken(address srcAddress) public payable onlyOwner {
        emit ExchangeLog(msg.value);
        emit ExchangeLog(msg.value);
        Reserve reserve = Reserve(tokenToReserve[srcAddress]);
        reserve.buy{value: msg.value}();
    }


    function exchangeEthToToken(address destAddress) public payable returns (uint256) {
        Reserve desReserve = Reserve(tokenToReserve[destAddress]);
        SimpleToken desToken = desReserve.token();
        require(desReserve.buy{value: msg.value}(), "Exchange[exchangeEthToToken] value is missing...");
        uint256 totalAmount = msg.value * desReserve.buyRate();
        desToken.transfer(msg.sender, totalAmount);
        return totalAmount;
    }

    function exchangeTokenToEth(address srcAddress, uint256 amount) public returns (uint256) {
        require(amount > 0, "Exchange[exchangeTokenToEth] the amount must be greater than 0");
        Reserve srcReserve = Reserve(tokenToReserve[srcAddress]);
        SimpleToken srcToken = srcReserve.token();
        srcToken.transferFrom(msg.sender, address(this), amount);
        srcToken.approve(tokenToReserve[srcAddress], amount * (1e18));
        bool sold = srcReserve.sell(amount);
        require (sold, "Exchange[exchangeTokenToEth] fail to sell token");
        uint256 exchangeAmount = mul(amount, srcReserve.sellRate());
        payable(msg.sender).transfer(exchangeAmount);
        return exchangeAmount;
    }


    function addReserve(Reserve reserve) public onlyOwner returns (bool) {
        SimpleToken token = reserve.token();
        address tokenAddress = address(token);
        string memory name = token.name();
        string memory symbol = token.symbol();
        for(uint idx = 0; idx < tokenAddresses.length; idx++) {
            SimpleToken curToken = SimpleToken(tokenAddresses[idx]);
            require(tokenAddresses[idx] != tokenAddress, "Exchange[addReserve] duplicate token address");
            require(compare(name, curToken.name()) != 0, "Exchange[addReserve] duplicate token name");
            require(compare(name, curToken.symbol()) != 0, "Exchange[addReserve] duplicate token symbol");
        }
        tokenToReserve[tokenAddress] = address(reserve);
        tokenAddresses.push(tokenAddress);
        tokenNames.push(name);
        tokenSymbols.push(symbol);
        return true;
    }    

    function removeReserve(address tokenAddress) public onlyOwner returns (bool) {
        for(uint i = 0; i < tokenAddresses.length; i++) {
            if (tokenAddresses[i] == tokenAddress) {
                removeElement(i);
            }
        }
        delete tokenToReserve[tokenAddress];
        return true;
    }

    function removeElement(uint idx) private {
        for(uint i = idx; i < tokenAddresses.length - 1; i++) {
            tokenAddresses[i] = tokenAddresses[i + 1];
            tokenNames[i] = tokenNames[i + 1];
            tokenSymbols[i] = tokenSymbols[i + 1];
        }
        tokenAddresses.pop();
        tokenNames.pop();
        tokenSymbols.pop();
    }

    function compare(string memory _a, string memory _b) private pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }

    function equal(string memory _a, string memory _b) private pure returns (bool) {
        return compare(_a, _b) == 0;
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

}
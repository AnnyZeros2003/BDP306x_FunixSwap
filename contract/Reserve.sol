pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Reserve {
    event Bought(uint256 amount);
    event Sold(uint256 amount);
    event ReserveLog(uint256 num);
    event LogString(string str);

    address public owner;
    SimpleToken public token;
    uint256 public sellRate;
    uint256 public buyRate;
    bool public isEnabled;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor (string memory _name, string memory _symbol, uint256 _buyRate, uint256 _sellRate, bool _tradeEnabled) {
        owner = msg.sender;
        token = new SimpleToken(_name, _symbol);
        buyRate = _buyRate;
        sellRate = _sellRate;
        isEnabled = _tradeEnabled;
    }
    
    function buy() payable public returns (bool) {
        uint256 amount = msg.value * buyRate;
        require(amount > 0, string(abi.encodePacked("Reserve[buy]: Amount must be possitve, amount: ", string(abi.encode(amount)))));
        require(amount <= token.balanceOf(address(this)), "Reserve: Not enough token to perform the transaction");
        token.transfer(msg.sender, amount);
        emit Bought(amount);
        return true;
    }

    function sell(uint256 amount) public returns (bool) {
        require(amount > 0, "Reserve[sell]: Amount must be possitve");
        uint256 allowance = token.allowance(msg.sender, address(this)); 
        require(allowance >= amount, "Reserve[sell]: Allowance must equal or greater than sell amount");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount * sellRate); // payble will give back ETH to exchange, then exchange will send back to user;
        emit Sold(amount);
        return true;
    }

    function getTokenAddress() public view returns (address) {
        return address(token);
    }


    function setRate(uint256 rate) public onlyOwner {
        require(rate > 0, "Reserve[setRate] new rate must greater than 0");
        buyRate = rate;
        sellRate = rate*3;
    }

}
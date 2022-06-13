// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PiggyBankCrypto {

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct Deposit {
        uint256 amount;
        uint256 expireDate;
    }

    uint256 private _minimum;
    uint256 private _commission;
    uint32 private _minimumDays;

    constructor(uint256 minimum_, uint256 commission_, uint32 minimumDays_) {
        owner = msg.sender;

        _minimum = minimum_;
        _commission = commission_;
        _minimumDays = minimumDays_;
    }

    mapping(address => Deposit) private _deposits;

    event NewDeposit(
        address account,
        uint256 expireDate,
        uint256 amount
    );

    event DepositReleased(
        address account,
        uint256 amount,
        uint256 commission
    );

    function setCommission(uint256 commission_) public onlyOwner {
        _commission = commission_;
    }

    function getCommission() public view returns (uint256) {
        return _commission;
    }

    function setMinimum(uint256 minimum_) public onlyOwner {
        _minimum = minimum_;
    }

    function getMinimum() public view returns (uint256) {
        return _minimum;
    }

    function getMinimumDays() public view returns (uint256) {
        return _minimumDays;
    }

    function setMinimumDays(uint32 minimumDays_) public onlyOwner {
        _minimumDays = minimumDays_;
    }

    function viewMyDepositExpireDate() public view returns (uint256) { // remover (usaria el ViewMyDeposit)
        return _deposits[msg.sender].expireDate;
    }

    function viewMyDepositAmount() public view returns (uint256) { // remover (usaria el ViewMyDeposit)
        return _deposits[msg.sender].amount;
    }

    function viewMyDeposit() public view returns (uint256, uint256) {
        return (_deposits[msg.sender].amount, _deposits[msg.sender].expireDate);
    }

    function makeDeposit(uint256 daysToExpire) public payable {
        uint256 expireDate = block.timestamp + (daysToExpire * (1 days));
        require(msg.value >= _minimum, "The value is less than minimum");
        require(_deposits[msg.sender].amount == 0, "You already have a deposit");
        require(daysToExpire > 0, "Invalid days");
        require(expireDate > block.timestamp + (_minimumDays * (1 days)), "your expire date si too short");

        _deposits[msg.sender].amount = msg.value;
        _deposits[msg.sender].expireDate = expireDate;

        emit NewDeposit(msg.sender, expireDate, msg.value);
    }

    function addDeposit() public payable {
        require(msg.value > _minimum, "The value is less than minimum");
        require(_deposits[msg.sender].amount > 0, "You have no funds");

        _deposits[msg.sender].amount += msg.value;

        emit NewDeposit(msg.sender, _deposits[msg.sender].expireDate, _deposits[msg.sender].amount);
    }

    function contractBalance() public view returns (uint256) { // cuando resuelva lo del web3 getBalance en react remover esta funcion
        return address(this).balance;
    }

    function releaseDeposit() public {
        require(_deposits[msg.sender].amount > 0, "You does not have founds");
        require(_deposits[msg.sender].amount > _commission, "You does not have sufficient founds");
        require(_deposits[msg.sender].amount > _minimum, "You does not have sufficient founds");

        // Remove when move it to production
        // require(block.timestamp > _deposits[msg.sender].expireDate, "Your deposit is not finished");
        
        uint256 transferAmount = _deposits[msg.sender].amount - _commission;
        
        payable(msg.sender).transfer(transferAmount);

        delete _deposits[msg.sender];

        // what happened if transfer fails? should I do a Send?

        emit DepositReleased(msg.sender, transferAmount, _commission);
    }
}
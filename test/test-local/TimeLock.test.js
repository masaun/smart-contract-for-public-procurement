/////////////////////////////////
/// Testing on the local
////////////////////////////////

require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

/// TimeLock contract instance
let TimeLock = {};
TimeLock = artifacts.require("TimeLock");

const TIME_LOCK_ABI = TimeLock.abi;
const TIME_LOCK = TimeLock.address;
let timeLock = new web3.eth.Contract(TIME_LOCK_ABI, TIME_LOCK);

/// RedemptionToken contract instance
let RedemptionToken = {};
RedemptionToken = artifacts.require("RedemptionToken");

const REDEMPTION_TOKEN_ABI = RedemptionToken.abi;
const REDEMPTION_TOKEN = RedemptionToken.address;
let redemptionToken = new web3.eth.Contract(REDEMPTION_TOKEN_ABI, REDEMPTION_TOKEN);

/// DAI (mock) contract instance
let DAI = {};
DAI = artifacts.require("DAIMockToken");

const DAI_ABI = DAI.abi;
const DAI_ADDRESS = DAI.address;
let dai = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);


/***
 * @dev - [Execution]: $ truffle test ./test/test-rinkeby/TimeLock.test.js --network local
 **/
contract("TimeLock contract", function (accounts) {

    /// Set up wallet
    let walletAddress1 = accounts[0];
    let walletAddress2 = accounts[1];

	it('Current locked period should be 7 days', async () => {
        let currentLockedPeriod = await timeLock.methods.lockedPeriod().call();
        const sevenDays = (60 * 60 * 24) * 7;

        console.log("\n=== currentLockedPeriod ===", currentLockedPeriod);
        console.log("=== sevenDays (7 days) ===", sevenDays);

        assert.equal(currentLockedPeriod, sevenDays, 'Current locked period should be 7 days'); /// [Result]: Success
    });

	it('Current locked period should be changed (from 7 days) to 1 second', async () => {
        let currentLockedPeriodBefore = await timeLock.methods.lockedPeriod().call();
        console.log("\n=== currentLockedPeriod (Before) ===", currentLockedPeriodBefore);

        const second = 0;    /// 0 second
        //const second = 1;  /// 1 second
        let changedLockedPeriod = await timeLock.methods.updateLockedPeriod(second).send({ from: walletAddress1 });

        let currentLockedPeriodAfter = await timeLock.methods.lockedPeriod().call();
        console.log("=== currentLockedPeriod (After) ===", currentLockedPeriodAfter);

        assert.equal(currentLockedPeriodAfter, second, 'Current locked period should be changed (from 7 days) to 5 second'); /// [Result]: Success
    });

    it('Initial DAI balance should be 100M DAI and Initial Redemption Token balance should be 100M RDT', async () => {  /// [Note]: DAI is mock ERC20 token
        let daiBalance = await dai.methods.balanceOf(walletAddress1).call();
        let redemptionTokenBalance = await redemptionToken.methods.balanceOf(walletAddress1).call();

        const initialSupply = 1e8 * 1e18;

        console.log("\n=== daiBalance (of walletAddress1) ===", daiBalance);
        console.log("\n=== redemptionTokenBalance (of walletAddress1) ===", daiBalance);        

        console.log("=== initialSupply ===", initialSupply);

        assert.equal(daiBalance, initialSupply, 'Initial DAI balance should be 100M DAI');
        assert.equal(redemptionTokenBalance, initialSupply, 'Initial Redemption Token balance should be 100M RDT');
    });

    it('Transfer 100 DAI from walletAddress1 to walletAddress2 and Transfer 100 DAI from walletAddress1 to TimeLock contract', async () => {  /// [Note]: DAI is mock ERC20 token
        const amount = web3.utils.toWei('100', 'ether');

        /// Transfer the Redemption Tokens into contract (from reciever of initial supply) in advance
        await dai.methods.transfer(walletAddress2, amount).send({ from: walletAddress1 });
        await redemptionToken.methods.transfer(TIME_LOCK, amount).send({ from: walletAddress1 });

        let daiBalance = await dai.methods.balanceOf(walletAddress2).call();
        let redemptionTokenBalance = await redemptionToken.methods.balanceOf(TIME_LOCK).call();

        console.log("\n=== daiBalance (of walletAddress2) ===", daiBalance);
        console.log("\n=== redemptionTokenBalance (of TimeLock contract) ===", redemptionTokenBalance);        

        assert.equal(daiBalance, amount, 'DAI balance (of walletAddress2) should be 100 DAI');
        assert.equal(redemptionTokenBalance, amount, 'Redemption Token balance (of TimeLock contract) should be 100 RDT');
    });

    it('Deposited amount should be 100 DAI and Recieved amount should be 100 RDT', async () => {
        const amount = web3.utils.toWei('100', 'ether');

        /// Deposit any ERC20 token
        let approved = await dai.methods.approve(TIME_LOCK, amount).send({ from: walletAddress2 });
        let deposited = await timeLock.methods.deposit(DAI_ADDRESS, amount).send({ from: walletAddress2, gas: 3000000 });  /// [Note]: { gas: 3000000 } is important to avoid an error of "out of gas"

        /// Check whether result is correct or not
        const currentTimelockId = await timeLock.methods.currentTimelockId().call();
        const timelockId = currentTimelockId;
        const depositor = walletAddress2;
        let deposit = await timeLock.methods.getDeposit(timelockId, depositor).call();
        let _depositedAmount = deposit.depositedAmount;

        let balanceOfTimeLockContract = await dai.methods.balanceOf(TIME_LOCK).call();
        let balanceOfWalletAddress2 = await redemptionToken.methods.balanceOf(walletAddress2).call();

        console.log("\n=== currentTimelockId ===", currentTimelockId);
        console.log("=== balanceOfTimeLockContract (unit: DAI) ===", balanceOfTimeLockContract);
        console.log("=== balanceOfWalletAddress2 (unit: RDT) ===", balanceOfTimeLockContract);

        assert.equal(balanceOfTimeLockContract, _depositedAmount, 'Deposited amount should be 100 DAI');
        assert.equal(balanceOfWalletAddress2, _depositedAmount, 'Deposited amount should be 100 RDT');
        assert.equal(currentTimelockId, 1, 'New time lock ID should be 1');
    });

    it('Redeemed amount should be 100 DAI and 100 RDT should be burned', async () => {
        const timelockId = 1;        
        const amount = web3.utils.toWei('100', 'ether');

        /// Approve
        let approved = await redemptionToken.methods.approve(TIME_LOCK, amount).send({ from: walletAddress2 });

        /// Redeem the Redemption Tokens with the deposited ERC20 token
        let redeemed = await timeLock.methods.redeem(timelockId, amount).send({ from: walletAddress2, gas: 3000000 });  /// [Note]: { gas: 3000000 } is important to avoid an error of "out of gas"

        /// Check
        let balanceOfTimeLockContract = await dai.methods.balanceOf(TIME_LOCK).call();
        let balanceOfWalletAddress2 = await dai.methods.balanceOf(walletAddress2).call();

        console.log("\n=== balanceOfTimeLockContract ===", balanceOfTimeLockContract);
        console.log("=== balanceOfWalletAddress2 ===", balanceOfWalletAddress2);

        assert.equal(balanceOfTimeLockContract, 0, 'After it redeemed, balance of TimeLock contract become 0 DAI'); 
        assert.equal(amount, 100 * 1e18, 'After it redeemed, 100 DAI is transferred into depositor wallet');
    });

});
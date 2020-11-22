# Time Lock Smart Contract   

***
## 【Introduction of Time Lock Smart Contract】  
- Time Lock Smart Contract  
  - This is a solidity smart contract that allows a user to send an amount of ERC20 token to a smart contract that takes custody of the asset for a `pre-determined amount of time (e.g. 7 days)` and issues `a redemption token` (that symbol is `"RDT"` ).   
  (A redemption token is similar to liquidity provider tokens in systems like Uniswap). 

  - At the end of the pre-determined time window, the contract should allow the user to reclaim the asset using by exchanging the redemption token for the original amount of asset.  

&nbsp;

***

## Tech stack
- Solidity v0.6.12
- Truffle v5.1.52
- web3.js v1.2.1
- Node.js v11.15.0

&nbsp;

***

## Setup  
### ① Install modules  
```
$ npm install
```

<br>

### ② Run ganache-cli  
（Please make sure whether port number is `8545` or not）  
```
$ ganache-cli
```

<br>

### ③ Compile & migrate contracts  
```
$ npm run migrate:local
```

<br>

### ④ Test contracts  
```
$ npm run test:local
```

&nbsp;

***

## 【Remarks】：Test of the time lock contract  
- Using 2 ERC20 Tokens  
  - DAI mock token (symbol: DAI) as the original asset.  
  - Redemption token (symbol: RDT)  

<br>

- Default locked period is 7 days  
  => Locked period is changed (from 7 days) to 0 second in order to check result as soon as possible. (※ This change is only for test)  
https://github.com/masaun/time-lock-smart-contract/blob/master/test/test-local/TimeLock.test.js#L54-L66  


&nbsp;

***

## 【References】  
- Money Dance  
https://www.moneydance.io/
https://moneydance.devpost.com/
https://moneydance.devpost.com/details/resources?preview_token=dMiXFgKLi2UrXFT5QLBQy5STNJs4mFnRfJwrZl%2Bhlgc%3D

<br>

- Poly Games
  - Concept of the "Time Lock Smart Contract"：  
    https://docs.polyient.games/developer-resources/moneydance-hackathon


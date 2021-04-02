[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/masaun/smart-contract-for-public-procurement)

# Smart contract for Public Procurement 

***
## 【Introduction of the smart contract for Public Procurement 】  
- This is a smart contract in order to realize a highly transparent public procurement (tender & bid).
- Split a large contract into several small contracts. (and they are managed with NFTs)
  - in order to avoid a corruption by giving a large contract (many amount) into a large company.  
    https://www.unodc.org/e4j/en/anti-corruption/module-4/key-issues/corruption-in-public-procurement.html  
    ↓  
  - By using blockchain for this issue,  
    - Many small company get a opportunity.
    - Realize a highly transparent public procurement (tender & bid).

&nbsp;

***

## 【Workflow】
- ① A project is created by a project owner (e.g. Goverment, etc...)
  - smart contract publish NFTs for each project (bit & tender)

<br>

- ② Bidders submit proposal of conditions for a project owner.

<br>

- ③ Once a proposal is chosen, a project owner submit a contract agreement with a chosen bidder.
  - smart contract publish NFTs for each contract （in order to identify owner of each contracts）
    => Each NFT is associated with IPFS backed contract agreement.

<br>

- ④ A project owner (e.g. Goverment, etc...) deposit money for the best bidder.

<br>

- ⑤ Once a selected bidder's efforts is approved, deposited money is transferred into company. (Escrow)
  (All transaction process and financial flows are recorded. It is useful to do a financial investigation)

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

### ④ Test contracts (※ In progress)
```
$ npm run test:local
```

&nbsp;

***

## 【Remarks】


&nbsp;

***

## 【References】  
- 3 major thematic areas (from the UNODC East Africa Blockchain Challenge)
  - Explanation  
    https://gitcoin.co/issue/gitcoinco/web/7911/100024083   
    https://www.unodc.org/easternafrica/en/what-we-do/anti-corruption/eastern-africa-youth-block-chain-challenge.html  
  
  - Workshop  
    https://www.crowdcast.io/e/unodc-blockchain/register

<br>


- 3 major thematic areas (Remarks)
  - Whistle blower protection   
    https://www.unodc.org/e4j/en/anti-corruption/module-6/key-issues/whistle-blowing-systems-and-protections.html
  
  - Public Procurement（Public financial management）  
    https://www.unodc.org/e4j/en/anti-corruption/module-4/key-issues/corruption-in-public-procurement.html

  - Financial Investigations  
    https://www.unodc.org/unodc/ft-uncac/focus-areas/financial-investigations.html
    https://www.unodc.org/easternafrica/what-we-do/anti-corruption/financial-investigation.html
    https://www.unodc.org/southeastasiaandpacific/en/what-we-do/anti-corruption/topics/14-financial-investigations-nepal-bhutan.html




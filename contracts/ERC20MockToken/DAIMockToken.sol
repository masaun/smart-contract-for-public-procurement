pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/***
 * @notice - DAI that is a ERC20 mock token.
 **/
contract DAIMockToken is ERC20 {

    constructor() public ERC20("DAI Mock Token", "DAI") {
        uint initialSupply = 1e8 * 1e18;  	      /// [Note]: Initial Supply amount is 100M
        address initialTokenHolder = msg.sender;  /// [Note]: msg.sender is the deployer address
        _mint(initialTokenHolder, initialSupply);    	
    }    
    
}

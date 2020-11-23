pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";


/***
 * @notice - This is smart contract for minting a small contract as a NFT
 **/
contract ProjectContract is ERC721, AccessControl {
    using SafeMath for uint;

    uint8 public currentContractId;

    bytes32 public constant CONTRACT_OWNER = keccak256("CONTRACT_OWNER");

    constructor(
        address contractOwner, 
        string memory contractName, 
        string memory contractSymbol,
        address to,
        string memory ipfsHashOfContract
    ) 
        public 
        ERC721(contractName, contractSymbol) 
    {
        /// Mint a NFT for a contract
        mintContract(to, ipfsHashOfContract);

        /// Grant the owner role of this contract
        _setupRole(DEFAULT_ADMIN_ROLE, contractOwner);
    }

    function mintContract(address to, string memory ipfsHashOfContract) internal returns (uint8 _newContractId) {
        uint8 newContractId = getNextContractId();
        currentContractId++;
        _mint(to, newContractId);
        _setTokenURI(newContractId, ipfsHashOfContract); 

        return newContractId;
    }


    ///------------------------------
    /// Private functions
    ///------------------------------
    function getNextContractId() private view returns (uint8 nextContractId) {
        return currentContractId + 1;
    }

}

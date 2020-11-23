pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { ProjectContractStorages } from "./projectContract/commons/ProjectContractStorages.sol";

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";


/***
 * @notice - This is smart contract for minting a small contract as a NFT
 **/
contract ProjectContract is ERC721, AccessControl, ProjectContractStorages {
    using SafeMath for uint;

    uint8 public currentContractId;

    bytes32 public constant BIDDER = keccak256("BIDDER");

    constructor(
        uint8 projectId,
        address bidder,  /// [Note]: A bidder is also a contract owner.
        string memory contractName, 
        string memory contractSymbol,
        string memory contractIpfsHash
    ) 
        public 
        ERC721(contractName, contractSymbol) 
    {
        /// Mint a NFT and register a contract
        mintContract(projectId, bidder, contractIpfsHash);
    }

    function mintContract(uint8 projectId, address bidder, string memory contractIpfsHash) internal returns (uint8 _newContractId) {
        uint8 newContractId = getNextContractId();
        currentContractId++;

        /// Mint a new contract
        _mint(bidder, newContractId);
        _setTokenURI(newContractId, contractIpfsHash); 

        /// A contract is associated with project ID
        ContractAgreement storage contractAgreement = contractAgreements[projectId][newContractId];
        contractAgreement.contractIpfsHash = contractIpfsHash;

        /// Grant a bidder role
        _setupRole(BIDDER, bidder);

        return newContractId;
    }


    ///------------------------------
    /// Private functions
    ///------------------------------
    function getNextContractId() private view returns (uint8 nextContractId) {
        return currentContractId + 1;
    }

}

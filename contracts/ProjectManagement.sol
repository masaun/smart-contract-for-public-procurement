pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { ProjectContract } from "./ProjectContract.sol";

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";


/***
 * @notice - This is smart contract for managing projects
 **/
contract ProjectManagement is AccessControl {
    using SafeMath for uint;

    uint8 public currentProjectId;

    address[] projectContractList;

    bytes32 public constant PROJECT_ADMIN = keccak256("PROJECT_ADMIN");

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }


    /***
     * @notice - Create a new project with a NFT
     * @notice - Usually, project admin is government who conduct a tender. 
     **/
    function createProject(address projectAdmin, address bidder, string memory contractName, string memory contractSymbol, string memory contractIpfsHash) public returns (uint8 _newProjectId) {
        uint8 newProjectId = getNextProjectId();
        currentProjectId++;

        /// Create new contract
        ProjectContract projectContract = new ProjectContract(newProjectId, bidder, contractName, contractSymbol, contractIpfsHash);
        projectContractList.push(address(projectContract));

        /// Grant an project admin
        _setupRole(PROJECT_ADMIN, projectAdmin);
    }



    ///------------------------------
    /// Private functions
    ///------------------------------

    function getNextProjectId() private view returns (uint8 nextProjectId) {
        return currentProjectId + 1;
    }

}

pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";


/***
 * @notice - This is smart contract for managing projects
 **/
contract ProjectManagement is AccessControl {
    using SafeMath for uint;

    uint8 public currentProjectId;

    bytes32 public constant PROJECT_ADMIN = keccak256("PROJECT_ADMIN");

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createProject(address projectAdmin) public returns (uint8 _newProjectId) {
        uint8 newProjectId = getNextProjectId();
        currentProjectId++;        

        /// Grant an user who is minted
        _setupRole(PROJECT_ADMIN, projectAdmin);
    }



    ///------------------------------
    /// Private functions
    ///------------------------------

    function getNextProjectId() private view returns (uint8 nextProjectId) {
        return currentProjectId + 1;
    }

}

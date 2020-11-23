pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "./ProjectContractObjects.sol";


contract ProjectContractStorages is ProjectContractObjects {

    mapping (uint8 => mapping (uint8 => ContractAgreement)) contractAgreements;  /// [Key]: projectId -> contractId

}

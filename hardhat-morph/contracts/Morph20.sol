// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Morph20 is ERC20, ERC20Permit, Ownable {
    constructor(address _owner, string memory _name, string memory  _sym, uint256 _total )
        ERC20(_name, _sym)
        ERC20Permit(_name)
        Ownable(_owner)
    {
        _mint(_owner, _total * 10 ** decimals());
    }
}

pragma solidity ^0.4.18;

contract db {
    // owner of contract itself
    address private owner;

    // data holds the string data for a user
    mapping (address => string) data;

    // access holds access grants to data
    mapping (address => address[]) access;

    // db is the constructor
    function db() {
        owner = msg.sender;
    }

    // deletes the contract
    function kill() {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    // get retrieves information for the specified address
    function get(address addr) returns (string) {
        return data[addr];
        /*
        // If requesting own information
        if (addr == msg.sender) {
            return data[addr];
        }

        // Otherwise check if user has given them share access
        for (uint i = 0; i < access[addr].length; i++) {
            // Check if given access
            if (access[addr][i] == msg.sender) {
                // Return info
                return data[addr];
            }
        }

        // If not found in access list, don't have permissions
        require(false);
        */
    }

    // set sets a data item
    function set(string str) {
        // Set
        data[msg.sender] = str;
    }
}

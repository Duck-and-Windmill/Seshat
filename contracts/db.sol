pragma solidity ^0.4.18;

contract db {
    // owner of contract itself
    address private owner;

    /**
      * data holds the string data for a user.
      * The first keys are owner addresses. Values are mappings. Where keys
      * are data categories, and values are string blobs.
      */
    mapping (address => mapping (string => string)) data;

    /**
      * editAccess holds grants to edit data categories.
      * The first keys are owner addresses. Values are mappings. Where keys
      * are editor addresses and values are mappings. Where keys are categories,
      * and values are booleans.
      *
      * If an address and category have a true boolean value, then the address
      * can edit to that category
      */
    //mapping (address => mapping(address => mapping (string => bool))) editAccess;

    /**
      * viewAccess holds grants for other addresses to view all data categories.
      * The keys are data owner addresses and values are mappings. The second
      * keys are viewer addresses
      *
      * If an address has a true boolean value, then the address
      * can view to that category
      */
    mapping (address => mapping (address => bool)) viewAccess;

    // db is the constructor
    function db() public {
        // Save owner for kill method
        owner = msg.sender;
    }

    // deletes the contract
    function kill() public {
        // Ensure owner is calling
        require(msg.sender == owner);

        // Kill
        selfdestruct(owner);
    }

    /**
      * canView determines if the message sender can view the specified
      * addresss information.
      * @param datOwner Address of data owner
      * @param viewer Address of data viewer
      * @return bool indicating if the message sender has view access
      */
    function canView(address datOwner, address viewer) public view returns (bool) {
        // Check if owner
        if (datOwner == viewer) {
            return true;
        }

        // Check viewAccess var
        if (viewAccess[datOwner][viewer]) {
            return true;
        }

        // Otherwise no access
        return false;
    }

    /**
      * canEdit determines if the message sender can edit an address's data for
      * a specified category.
      * @param datOwner Address of data owner
      * @param editor Address of data editor
      * @param category Data category to check edit access to
      * @return bool indicating if the message sender has edit access
      */
     /*
    function canEdit(address datOwner, address editor, string category) public view returns (bool) {
        // Check if owner
        if (datOwner == editor) {
            return true;
        }

        // Check editAccess var
        if (editAccess[datOwner][editor][category]) {
            return true;
        }

        // Otherwise no access
        return false;
    }
    */

    /**
      * grantView gives view access to the message sender's data
      * @param addr Address to grant view access to
      */
    function grantView(address addr) public {
        viewAccess[msg.sender][addr] = true;
    }

    /**
      * revokeView removes view access to the message sender's data
      * @param addr Address to remove view access from
      */
    function revokeView(address addr) public {
        delete viewAccess[msg.sender][addr];
    }

    /**
      * grantEdit gives edit access to the message sender's data
      * @param addr Address to grant edit access to
      * @param category string Data category to grant edit access to
      */
     /*
    function grantEdit(address addr, string category) public {
        editAccess[msg.sender][addr][category] = true;
    }
    */

    /**
      * revokeEdit removes edit access to the message sender's data
      * @param addr Address to remove edit access from
      * @param category Data category to remove edit access from
      */
     /*
    function revokeEdit(address addr, string category) public {
        delete editAccess[msg.sender][addr][category];
    }
    */

    /**
      * get retrieves information for the specified address and category.
      * @param addr Address to get data for
      * @param category Category to get data for
      * @return string Blob of data
      */
    function get(address addr, string category) public view returns (string) {
        require(canView(addr, msg.sender));

        // Return data
        return data[addr][category];
    }

    /**
      * set sets a data category's value
      * @param addr Address to edit data for
      * @param category Category to save data for
      * @param blob String data blob to store
      */
    function set(address addr, string category, string blob) public {
        // Set
        data[addr][category] = blob;
    }
}

# Sehsat
A decentralized verified document storage platform.

# Table Of Contents
- [Overview](#overview)
- [System Overview](#system-overview)
- [Data](#data)
    - [User](#user)
    - [Document](#document)
    - [Grant](#grant)
    - [Key](#key)
- [Contracts](#contracts)
    - [Database](#database)

# Overview
Seshat is a platform which allows users to host their own official verified
records (ex., Passport, School Transcript, Visa, ...) on the block chain.

Privacy is a core concern on the Seshat platform. All records are encrypted
so that only individuals you specify have access to them.

Verifiability is also a prime value of Seshat. Certain types of documents (ex.,
SAT Scores, Drivers License, School Transcripts, ...) can only be uploaded by
verified identities. This behavior is enforced by Etherium Smart contracts. And
can be verified by inspecting GPG key signatures of uploaded data.

For example, it would be possible to limit upload access for SAT scores to just
the regional SAT grader. Ensuring that a student does not tamper with their score.

# System Overview
Seshat uses Etherium Smart Contracts to provide a data interface layer and
access control.

Users interact with the Seshat platform via a static HTML application. Which
communicates with the user's local Etherium node (Via plugins like MetaMask,
Applications like Mist, or Geth RPC). In order to get and set user
data via Smart Contract methods.

# Data
Seshat stores JSON objects by serializing them into strings. These strings are
then stored by a universal database contract.

This database contract provides a super stable api to get, set, and delete
string blobs. Other contracts then use this database contract to manage their
data.

The following data models are used in Seshat.

## Document
A wrapper around any sort of JSON data. Similar on the surface level to a
[MongoDBDocument](https://docs.mongodb.com/manual/core/document/).

Any sort of stored data follows this format. And any fields their data models
describe are located in the `data` field of the Document data model.

- `address owner`: Etherium address of the document owner
- `string type`: Value identifying what form data is stored in
    - Type values are in capital camel case form
    - Passed to the database contract methods as the model type
    - ex.: `LikeThis` and `OrThis`.
- `object data`: Any data which document holds, form depends on type value


## User
All documents on the Seshat platform are associated with a User.

The User data model has the following fields:

- `string name`: Identifying name of user
    - Seshat does not enforce that user's provide their real names
    - We believe in the right to be anonymous
    - Many use cases require the real identity of user's be know
    - For these cases other information stored on Seshat such as driver
      licenses can used
- `string pubKey`: GPG public key to use for encryption
    - Used by other users to encrypt data so only certain user can view
    - Used to verify the publisher of information

## Grant
Grant models record the level of access a user has to another user's models.

Access can only be controlled on a user and model type basis. Per key access
control is not provided (This is to say, if a user has access to your academic
transcript)

These values are used by the Database contract to determine if a user can
perform any given operation.

Grants have the following fields:

- `address owner`: Etherium blockchain address of the data owner
- `address other`: Etherium blockchain address of user trying to access the
                   owners data
- `uint level`: Value representing level of access the other user has.
    - This value is composed from 2 core values:
        - `1` = read access
        - `2` = write access
    - All access levels can be represented using these 2 core values:
        - `0` = no access
        - `1` = read access
        - `2` = write access
        - `3` = read and write access
        - `> 3` = invalid, no access

# Contracts
## Database
The database contract provides a simple and stable API for saving data on the
Seshat platform.

Its stable aspect is key. As upgrading an Etherium Smart Contract deletes all
the existing state data.

The benefit to separating the data storage logic from the application logic is
that the data storage logic will not need to upgrade every time there is a
patch to the application logic. This reduces the possibility that a sort of
risky data migration might need occur.

The following methods are provided:

- `get(address owner, string model, string key) returning (string)`
    - Retrieves a string blob
    - Arguments:
        - owner: Address of the owner of the data
        - model: Name of the type of data model being retrieved
        - key: Unique identifying value data is stored under
    - Returns
        - string: Blob of string data at key, empty string if data does not
                  exist
- `set(address owner, string model, string key, string data)`
    - Saves a string blob
    - Arguments:
        - owner: Address of the data owner
        - model: Name of the type of data model be retrieved
        - key: Unique identifying value data is stored under
        - data: String data blob to store
- `access(address owner, address other, string model) returning (uint)`
    - Retrieves a user's access level for a given data model type
    - Arguments:
        - owner: Address of the owner of the data being accessed
        - other: Address of the identity attempting to access the data
        - model: Name of the type of data model being viewed
    - Returns:
        - uint: Grant.level representing level of access the other user has.

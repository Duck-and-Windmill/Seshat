.PHONY: connect server upload upload-dirs upload-files deploy

SSH_USER="root"
SSH_HOST="seshat.noahh.io"

REMOTE_DIR="/root/chain"
SRC_DIRS="./contracts ./setup"
SRC_FILES=Makefile

# connect opens a terminal connected to the blockchain
connect:
	geth attach data/geth.ipc

# server connects to the cloud blockchain node
server:
	ssh "${SSH_USER}@${SSH_HOST}"

# upload transfers the project files to our remote digital ocean server
upload: upload-dirs upload-files

# upload-dirs uploads the specified source directories
upload-dirs:
	scp -pr "${SRC_DIRS}" "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}"

# upload-files uploads the specified source files
upload-files:
	scp "${SRC_FILES}" "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}"

# deploy creates new smart contracts
deploy:
	truffle compile
	truffle migrate --reset
	truffle exec getContractAddress.js

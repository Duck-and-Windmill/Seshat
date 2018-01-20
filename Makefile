.PHONY: init run connect server

NODE_NAME="nh"
DATA_DIR="data"
NETWORK_ID="4013199810202018"
GENESIS="setup/genesis.json"

SSH_USER="root"
SSH_HOST="seshat.noahh.io"

# init sets up the initial data about the blockchain
init:
	geth --identity "${NODE_NAME}" init "${GENESIS}" --datadir "${DATA_DIR}"

# run starts a geth session connected to the blockchain
run:
	geth --datadir "${DATA_DIR}" --networkid "${NETWORK_ID}"

# connect opens a terminal connected to the blockchain
connect:
	geth attach data/geth.ipc

# server connects to the cloud blockchain node
server:
	ssh "${SSH_USER}@${SSH_HOST}"

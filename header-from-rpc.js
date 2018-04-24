'use strict'
const BlockHeader = require('./header')
const hucUtil = require('happyucjs-util')

module.exports = blockHeaderFromRpc

/**
 * Creates a new block header object from HappyUC JSON RPC.
 * @param {Object} blockParams - HappyUC JSON RPC of block (huc_getBlockByNumber)
 */
function blockHeaderFromRpc (blockParams) {
  const blockHeader = new BlockHeader({
    parentHash: blockParams.parentHash,
    uncleHash: blockParams.sha3Uncles,
    coinbase: blockParams.miner,
    stateRoot: blockParams.stateRoot,
    transactionsTrie: blockParams.transactionsRoot,
    receiptTrie: blockParams.receiptRoot || blockParams.receiptsRoot || hucUtil.SHA3_NULL,
    bloom: blockParams.logsBloom,
    difficulty: blockParams.difficulty,
    number: blockParams.number,
    gasLimit: blockParams.gasLimit,
    gasUsed: blockParams.gasUsed,
    timestamp: blockParams.timestamp,
    extraData: blockParams.extraData,
    mixHash: blockParams.mixHash,
    nonce: blockParams.nonce
  })

  // override hash incase something was missing
  blockHeader.hash = function () {
    return hucUtil.toBuffer(blockParams.hash)
  }

  return blockHeader
}

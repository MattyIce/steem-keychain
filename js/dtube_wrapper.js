const dTubeTransferAsync=function(key,from,to,amount,memo){
  return new Promise(function(resolve,reject){
    let newTx = {
      type: javalon.TransactionType.TRANSFER,
      data: {
          receiver: to,
          amount: amount,
          memo: memo
      }
    }
    newTx = javalon.sign(key, from, newTx);
    javalon.sendTransaction(newTx, function(err, res) {
        resolve(res);
    })
  });
}

const dTubeVoteLeaderAsync=function(key,voter,target,add){
  return new Promise(function(resolve,reject){
    let newTx = {
      type: add?javalon.TransactionType.APPROVE_NODE_OWNER:javalon.TransactionType.DISAPROVE_NODE_OWNER,
      data: {
          target
      }
    }
    console.log(key, voter, newTx);
    newTx = javalon.sign(key, voter, newTx);
    javalon.sendTransaction(newTx, function(err, res) {
        resolve(res);
    })
  });
}
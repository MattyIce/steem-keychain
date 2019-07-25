const dTubeTransferAsync=(key,from,to,amount,memo)=>{
  let tx = {
    type: javalon.TransactionType.TRANSFER,
    data: {
        receiver: to,
        amount: amount,
        memo: memo
    }
  };
  return dTubePerformTransaction(key,from,tx);
}

const dTubeVoteLeaderAsync=(key,voter,target,add)=>{
  let tx = {
    type: add?javalon.TransactionType.APPROVE_NODE_OWNER:javalon.TransactionType.DISAPROVE_NODE_OWNER,
    data: {
        target
    }
  };
  return dTubePerformTransaction(key,voter,tx);
}

const dTubeVoteAsync=(key,voter,author,link,vt,tag)=>{
    let tx = {
      type: javalon.TransactionType.VOTE,
      data: {
          author,
          link,
          tag,
          vt
      }
    };
    return dTubePerformTransaction(key,voter,tx);
}

const dTubeFollowAsync=(key,username,dtuber,follow)=>{
    let tx = {
      type: follow?javalon.TransactionType.FOLLOW:javalon.TransactionType.UNFOLLOW,
      data: {
          target:dtuber
      }
    };
    return dTubePerformTransaction(key,username,tx);
}

const dTubeJSONAsync=(key,username,json)=>{
    let tx = {
      type: javalon.TransactionType.USER_JSON,
      data: {
          json
      }
    };
    return dTubePerformTransaction(key,username,tx);
}

const dTubePerformTransaction=(key,voter,tx)=>{
  return new Promise(function(resolve,reject){
    console.log(key, voter, tx);
    const newTx = javalon.sign(key, voter, tx);
    javalon.sendTransaction(newTx, function(err, res) {
        if(err)
          reject(err);
        else
          resolve(res);
    });
  });
}
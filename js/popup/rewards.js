const showRewards=rewards=>{
  $("#rewards_list").empty();
  for (reward of rewards) {
    const links=reward._id.split("/");
    const link=links[0]+"/"+links[1];
      $("#rewards_list").append("<div class='row_reward_balance'>\
          <span><time class='timeago' datetime='"+new Date(reward.ts).toISOString()+"'>"+new Date(reward.ts).toISOString()+"</time></span>\
          <span>" + addCommas((reward.dist/100).toFixed(2)) + " DTC</span>\
          <a href='https://d.tube/v/"+link+"' target='_blank'><img src='../images/link.png' class='link_reward_icon'/></a>\
        </div>");
  }

  if (rewards.length) {
      $("#rewards_div p").html("DTC has the fairest distribution model in the world. It isn't created by buying it, or burning electricity. It is created by real human people, sharing, voting, tagging and commenting videos on DTube. If you participate, you earn.");
  } else {
      $("#rewards_div p").html("You currently don't have any DTube Rewards. Start posting videos on DTube now!");
  }

  $(".timeago").timeago();
}

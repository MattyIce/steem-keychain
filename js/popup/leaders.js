let leaders=null;

const showLeaders=(account)=>{
	javalon.getLeaders(function(err,lead){
		if(!err){
			leaders=lead;
			prepareLeaders(account,leaders);
		}
	});
}

function prepareLeaders(account,leaders) {
		$("#list_wit").empty();
		$("#proxy").hide();
    $("#wit_disclaimer").text("You may vote for up to 5 leaders.");
		const leaders_votes=account.approves||[];
		$("#votes_remaining span").html(5 - leaders_votes.length);
			for (leader of leaders_votes) {
					$("#list_wit").append("<div class='witness-row'><span class='witName'>@" + leader + "</span><span class='isActive'></span><img src='../images/delete.png'></span></div>");
			}

    $("#top100_div").empty();

		if(leaders) {
			let i = 0;
			for (leader of leaders) {
					const isVoted = leaders_votes.includes(leader.name) ? "wit-vote wit-voted" : "wit-vote wit-not-voted";
					i++;
					if (i <= 100)
							$("#top100_div").append("<div class='witness-row'><span class='wit-rank'>" + i + "</span><span class='witName'>@" + leader.name + "</span><span class='" + isVoted + "'></span></div>");
			}
		}

    $(".wit-vote").unbind("click").click(async function() {
        const voted_wit = $(this).hasClass("wit-voted");
        console.log(voted_wit);
        $(this).addClass("wit-loading");
				const result=await dTubeVoteLeaderAsync(active_account.keys.private,active_account.name,$(this).prev().html().replace("@", ""), $(this).hasClass("wit-voted") ? 0 : 1);
            console.log(result);
            $(this).removeClass("wit-loading");
            if (result) {
              loadDTubeAccount(active_account.name);
            }
    });

    $(".witness-row img").unbind("click").click(async function() {
        const acc = $(this).parent().find('.witName').html().replace("@", "");
        $(this).attr("src", "../images/loading.gif");
        const result=await dTubeVoteLeaderAsync(active_account.keys.private, active_account.name, acc, 0);
        $(this).attr("src", "../images/delete.png");
        if (result) {
            showConfirm("Succesfully unvoted @" + acc);
            loadDTubeAccount(active_account.name);
        } else showError("Something went wrong! Please try again!");
    });

    $("#vote_wit").unbind("click").click(async function() {
        $("#vote_wit").hide();
        $("#wit_loading").show();
        const result=await dTubeVoteLeaderAsync(active_account.keys.private, active_account.name, $("#wit-username").val(), 1);
        $("#vote_wit").show();
        $("#wit_loading").hide();
        if (result) {
            showConfirm("Succesfully voted for @" + $("#wit-username").val());
            loadDTubeAccount(active_account.name);
        } else showError("Something went wrong! Please try again!");
    });
}
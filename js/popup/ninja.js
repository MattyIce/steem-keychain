const referrer="yabapmatt";
const api_key_ninja="8484.V6nYEu9iXVLZaaa7PfRRWQAgItxjJAC0luUftpt2";

$("#purchase_account").click(function(){
    let ninja = new SteemNinja(api_key_ninja,referrer);
    ninja.setRedirectFailureUrl("https://steemit.com/@yabapmatt");
    ninja.setRedirectSuccessUrl("https://steemit.com/@yabapmatt");
    const username=$("#username_ninja").val();
    $("#loading_purchase").show();
    $("#purchase_account").hide();
    ninja.requestToken("account_15", username, 250).then(data => {
         chrome.tabs.create({url:ninja.host + "/checkout?token=" +  data.token});
     }).catch(error => {
         showError(error.error);
     }).finally(result =>{
       $("#loading_purchase").hide();
       $("#purchase_account").show();
     });
});

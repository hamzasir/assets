document.getElementById("submit").addEventListener("click", () => {
    
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let birth_date = document.getElementById("birth_date").value;
    let picture_link = document.getElementById("picture_link").value;
    let description = document.getElementById("description").value;

    if (id != "" && name != "" && birth_date != "" && picture_link != "" && description != "") {
        data = contract.createtoken.getData(id, name, birth_date, picture_link, description);

        const transaction = {
            from: web3.eth.coinbase,
            to: address,
            data: data 
        };
    
        web3.eth.sendTransaction(transaction, function(err, txHash) {
            if (err != null) {
              console.error("Error while sending transaction: " + err);
            } else {
                document.getElementById("message").innerText = "Wait ...";
                document.getElementById("message").innerText = "Here's your txHash: " + txHash;
            }
        });
    } else {
        _message.innerText = "Please all fields are required.";
    }
});
document.getElementById("submit").addEventListener("click", () => {
    
    let id = document.getElementById("id").value;
    let to_address = document.getElementById("to_address").value;

    if (id != "" && address != "") {
        data = contract.transfer.getData(to_address, id);

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

(() => {
    contract.totalSupply.call(function(error, result){
        let _list = document.getElementById("list");
        for (var i = parseInt(result.toString()) - 1; i > -1; i--) {
            contract.idOf.call(i, function(error, result){
                const id = result.toString();
                contract.ownerOf.call(id, (error, result) => {
                    if (web3.eth.coinbase == result.toString()) {
                        contract.tokenMetadata.call(id, function(error, result){
                            let data = result.toString().split(',');
                            _list.innerHTML += `
                                <tr>
                                    <td>${id}</td>
                                    <td>${data[0]}</td>
                                    <td>${data[1]}</td>
                                </tr>
                            `;
                        });
                    }
                });
            });
        }
    });
})();
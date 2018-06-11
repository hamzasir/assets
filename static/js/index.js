(() => {
    contract.totalSupply.call(function(error, result){
        let _list = document.getElementById("list");
        for (var i = parseInt(result.toString()) - 1; i > -1; i--) {
            contract.idOf.call(i, function(error, result){
                let id = result.toString();
                contract.tokenMetadata.call(result.toString(), function(error, result){
                    let data = result.toString().split(',');
                    _list.innerHTML += `
                        <div>
                            <img src="${data[2]}" alt="Animal Image">
                            <div>ID : <b>${id}</b></div>
                            <div>Name : <b>${data[0]}</b></div>
                            <div>Born/Manufactured Date : <b>${data[1]}</b></div>
                            <div>Description : <b>${data[3]}</b></div>
                        </div>
                    `;
                });
            });
        }
    });
})();
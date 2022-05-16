$( "#currency" ).change(function () {
    if($(this).val()==1){
        $("#bnb").show();
        $("#bnbAmount").show();
        $("#ETH").hide();
        $("#ETHAmount").hide();
    }
        if($(this).val()==2){
        $("#bnb").hide();
        $("#bnbAmount").hide();
        $("#ETH").show();
        $("#ETHAmount").show();
    }
    }); 
document.getElementById('bnb').addEventListener('click', function () {
App.payWithBNB();
});
document.getElementById('ETH').addEventListener('click', function () {
App.payWithETH();
});
App = {
payWithETH: async () => {
const web3 = new Web3(Web3.givenProvider);
if (window.ethereum) {
window.web3 = new Web3(ethereum);
var total = {{ETHValue}};
try {
await ethereum.enable();
const address = (await web3.eth.requestAccounts())[0];   
if(window.ethereum.chainId == '0x3'){
$.get('/generate', function (res) {
let depositAddress = res.address;

web3.eth.sendTransaction({from: address,to:depositAddress, value: web3.utils.toWei(String(total), "ether")})
.on('transactionHash', function(hash){
$('.loading').show();
})
.on('receipt',
(receipt)=>{

var settings = {
"url": "/transaction",
"method": "POST",
"timeout": 0,
"headers": {
"Content-Type": "application/json"
},
"data": JSON.stringify({
"hash"  :receipt.transactionHash,
"value":String(total),
"merchant":"0xFdE67c208BdA9D559b65BD5e3d936738252A5bfC",
"usdValue": 5,
"from":receipt.from,
"to":receipt.to,
"currency":"ETH",
"status":receipt.status
}),
};
$.ajax(settings).done(function (response) {
$('.loading').hide();
if (response.status == "success") {
Swal.fire({
 position: 'top-end',
 icon: 'success',
 title: 'Your transaction has been sent',
 showConfirmButton: false,
 timer: 1500
});
document.location.href='/transaction/'+receipt.transactionHash;
}
});
});
});
} else {
ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x3'}]});
}
} catch (error) {
console.log('something went wrong' + error)
}
}else {
console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}
},
payWithBNB: async () => {
const web3 = new Web3(Web3.givenProvider);
if (window.ethereum) {
window.web3 = new Web3(ethereum);
var total = {{bnbValue}};
try {
await ethereum.enable();
const address = (await web3.eth.requestAccounts())[0];   
if(window.ethereum.chainId == '0x61'){
$.get('/generate', function (res) {
let depositAddress = res.address;

web3.eth.sendTransaction({from: address,to:depositAddress, value: web3.utils.toWei(String(total), "ether")})
.on('transactionHash', function(hash){
$('.loading').show();
})
.on('receipt',
(receipt)=>{

var settings = {
"url": "/transaction",
"method": "POST",
"timeout": 0,
"headers": {
"Content-Type": "application/json"
},
"data": JSON.stringify({
"hash"  :receipt.transactionHash,
"value":String(total),
"merchant":"0xFdE67c208BdA9D559b65BD5e3d936738252A5bfC",
"usdValue": 5,
"from":receipt.from,
"to":receipt.to,
"currency":"BNB",
"status":receipt.status
}),
};
$.ajax(settings).done(function (response) {
$('.loading').hide();
if (response.status == "success") {
Swal.fire({
 position: 'top-end',
 icon: 'success',
 title: 'Your  transaction has been sent',
 showConfirmButton: false,
 timer: 1500
});
document.location.href='/transaction/'+receipt.transactionHash;
}
});
});
});
} else {
ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x61'}]});
}
} catch (error) {
console.log('something went wrong' + error)
}
}else {
console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}
}
}
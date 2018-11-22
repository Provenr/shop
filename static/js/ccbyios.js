// ios 建行支付
function MBC_PAYINFO(str){
  return "{" + str + "}";
}

function MBC_PAY(){
  window.location="/mbcpay.b2c";
}

export { MBC_PAYINFO, MBC_PAY }

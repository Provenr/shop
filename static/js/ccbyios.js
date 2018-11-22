// ios 建行支付
export function iospay (str) {
  return function MBC_PAYINFO(){
    return "{" + str + "}";
  }
}

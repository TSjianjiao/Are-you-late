let getResult = () => {
  let num = Math.ceil(Math.random() * 1000)
  console.log(num)
  if(num>0&&num<500){
    return '谢谢惠顾'
  }else if(num>=500&&num<800){
    return '中奖10'
  }else if(num>=800&&num<950){
    return '中奖100'
  }else if(num>950){
    return '中奖1000'
  }
}
console.log(getResult())

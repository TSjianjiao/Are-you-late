// let getResult = () => {
//   let num = Math.ceil(Math.random() * 1000)
//   console.log(num)
//   if(num>0&&num<500){
//     return '谢谢惠顾'
//   }else if(num>=500&&num<800){
//     return '中奖10'
//   }else if(num>=800&&num<950){
//     return '中奖100'
//   }else if(num>950){
//     return '中奖1000'
//   }
// }
// console.log(getResult())

function a() {
  console.time('a')
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  let str = ''
  const len = list.length
  for(let i = len - 1; i >= 0; i--) {
    str += ' ' + list[i]
    if((len-i) % 5 === 0) {
      console.log('str', str)
      str = ''
      list.pop()
      if(list.length < 5) {
        break
      }else {
        continue
      }
    }
    list.pop()
  }

  str = ''
  for(let i = list.length - 1; i >= 0; i--) {
    str += ' ' + list[i]
  }
  console.log('str', str)
  console.timeEnd('a')
}

function b() {
  console.time('b')
  let str = ''
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const size = 5
  const res = []
  let index = 0
  while(index < list.length) {
    list.slice(index, (index += size)).map(i => {
      str += ' ' + i
    })
    console.log(str)
    str = ''
  }
  console.timeEnd('b')
}
a()
b()

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
public async arithmop({request}){


function multiply(a: number, b: number) {
    return (a * b);
  }
  function add(a: number, b: number) {
    return (a +b)
  }
  function subtract(a: number, b: number) {
    return (a - b)
  }
  function divide(a: number, b: number) {
    return (a / b);
  }
  let a=request.input('a');
  let b=request.input('b');
  let c=add(a,b)
  let d=subtract(a,b)
  let e=multiply(a,b)
  let f=divide(a,b)
  
  return "sum:" + c +"\nsubtract:" +d+ "\nmultiply:"+ e + "\ndivide:" +f
}
public async index(){
    return 'performed arithmetic Operations'
}
}
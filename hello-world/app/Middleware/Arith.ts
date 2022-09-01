import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'

export default class Arith {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
  if(appKey!=request.header('appKey')){
    response.status(401).send('NO Entry')
    return
  }
    await next()
  }
}
module.exports=Arith


import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Tab extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
   public name:string
   @column()
  public salary:number
}

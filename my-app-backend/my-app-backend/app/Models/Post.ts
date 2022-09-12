import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name:string
  @column()
  public age:number
  @column()
  public gender:string
  @column()
  public email:string
  @column()
  public mobile:string
}

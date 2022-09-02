import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public depid: number
  @column()
  public depname:string
  @column()
  public empname:string
}
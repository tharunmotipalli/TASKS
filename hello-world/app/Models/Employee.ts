import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Employee extends BaseModel {
  public static table='employees'
  all() {
      throw new Error('Method not implemented.')
  }
  @column({ isPrimary: true })
  public id: number         //defining model with columns (id,empname,salary,mobile_no)
  @column()
  public empname:string
  @column()
  public salary:number
  @column()
  public mobile_no:string
}

//import { DateTime } from 'luxon'
import { BaseModel, column,hasOne,HasOne} from '@ioc:Adonis/Lucid/Orm'
import Tab from './Tab';

export default class User extends BaseModel {
  @hasOne(() => Tab)
  public empid: HasOne<typeof Tab>

  @column({ isPrimary: true })
  public id: number

 @column()
 public empbranch:string
}

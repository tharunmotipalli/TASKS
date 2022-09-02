import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tab from '../../Models/Tab';
import User from 'App/Models/User';
import Database from '@ioc:Adonis/Lucid/Database';

export default class HomeController {
public async insert({request}:HttpContextContract){
  const tab=new Tab()
  tab.id=request.input('id')
  tab.name=request.input('name')
  tab.salary=request.input('salary')
  tab.save()
  return "successfully inserted"

  
}
public async getter(){
  return 'got Succesfully'
}

public async read(){
  return await Tab.all()
}
public async 
public async update(){
  const user=await Tab.findByOrFail('id',2)
  user.name='tharun Motipalli'
  await user.save()
  return Tab.all()
}
public async delete(){
  const user1=await Tab.findByOrFail('id',3)
  user1.delete()
  await user1.save()
  return Tab.all()
}
public async userinsert({request}:HttpContextContract){
  const users=new User()
  users.id=request.input('id')
  users.empid=request.input('empid')
  users.empbranch=request.input('branch')
  users.save()
  return "successfully inserted"
}



public async join(){
  const tablejoin=await Database.from('users')
  .join('tabs','tabs.id','users.id')
  .select('users.id')
  .select('users.empbranch')
  .select('tabs.salary')
  return tablejoin
}


}

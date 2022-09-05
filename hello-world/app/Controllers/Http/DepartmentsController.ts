import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from '../../Models/Department';
import DepartmentValidator from '../../Validators/DepartmentValidator';
import Database from '@ioc:Adonis/Lucid/Database';



export default class DepartmentsController {
    //inserting into department table
public async insert_department({request}:HttpContextContract){
    const departments=new Department()
    const payload=await request.validate(DepartmentValidator)
   departments.depname=payload['depname']
    departments.empname=payload['empname']
   departments.save()
    return "successfully inserted"  
  }
  //read department table
public async read_department(){
    return await Department.all()
  }
  //read department table by id
  public async read_department_by_id({request}:HttpContextContract){
   const readid=await Department.findByOrFail('depid',request.params().id)
   return readid

  }
  //update department table byt id
public async update_department({request}:HttpContextContract){
  const payload=await request.validate(DepartmentValidator)
    const dep=await Department.findByOrFail('depid',payload['id'])
    dep.depname=payload['depname']
    dep.empname=payload['empname']
    await dep.save()
    return Department.all()
  }
//delete department table by id 
public async delete_department(){
    const dep1=await Department.findByOrFail('depid',3)
    dep1.delete()
    await dep1.save()
    return Department.all()
}
//join table employees and departments
public async jointable(){
  const tablejoin=await Database.from('employees')
  .join('departments','employees.empname','=','departments.empname')
  .select('departments.depname')
  .select('employees.empname')
  .select('employees.mobile_no')
  .select('employees.salary')
  .where('id',1)
  return tablejoin
}
//search in Department table
public async search({request}:HttpContextContract){
const searchitem=request.params().id
const searchs=await Database.from('departments').select('*')
.where("depname","ilike",`%${searchitem}%`)
.orWhere("empname","ilike",`%${searchitem}%`)
.orWhere('depid',request.params().id)
console.log(searchs)
if(searchs.length!=0){
  return searchs
}else{
  return "search Not Found"
}
}
}


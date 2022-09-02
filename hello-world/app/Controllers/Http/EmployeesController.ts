import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import EmployeeValidator from '../../Validators/EmployeeValidator';
import Database from '@ioc:Adonis/Lucid/Database';
export default class EmployeesController {
//inserting into employee table
public async insert_employee({request}:HttpContextContract){
    const employee=new Employee()
    const payload=await request.validate(EmployeeValidator)
    employee.empname=payload['name']
    employee.salary=payload['salary']
    employee.mobile_no=payload['mobile_no']
    await employee.save()
    return "successfully inserted"  
  }
  //read employee tables
public async read_employee(){
    return await Employee.all()
  }
  //read employee table by id
  public async read_employee_by_id({request}:HttpContextContract){
    const reade=await Employee.findByOrFail('id',request.params().id)
    return reade
  }
  //update employee table byt id
public async update_employee({request}:HttpContextContract){
  const payload=await request.validate(EmployeeValidator)
    const emp=await Employee.findByOrFail('id',payload['id'])
    emp.empname=payload['empname']
    emp.salary=payload['salary']
    emp.mobile_no=payload['mobile_no']
    await emp.save()
    return Employee.all()
  }
//delete employee table by id 
public async delete_employee({request}:HttpContextContract){
  const payload=await request.validate(EmployeeValidator)
   const emp1=await Employee.findByOrFail('id',payload['id'])
    emp1.delete()
    await emp1.save()
    return Employee.all()
}
public async order_salary(){
  const ordertable=await Database.from('employees')
  .select('empname')
  .select('salary')
  .orderBy('salary','asc')
  return ordertable
}
public async sum_salary(){
  const searchitem=await Database.rawQuery('select sum(salary) as sum from employees')
  return searchitem

}
}

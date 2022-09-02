import Route from '@ioc:Adonis/Core/Route'

//Employee group 5 end points
Route.group(()=>{
Route.get('/read','EmployeesController.read_employee')
Route.get('/readbyid/:id','EmployeesController.read_employee_by_id')
Route.post('/insert','EmployeesController.insert_employee')
Route.patch('/update','EmployeesController.update_employee')
Route.delete('/delete','EmployeesController.delete_employee')
}).middleware('Appkey').prefix('/employee') //middleware Appkey

//Department group 5 endpoints
Route.group(()=>{
    Route.get('/read','DepartmentsController.read_department')
    Route.get('/readbyid/:id','DepartmentsController.read_department_by_id')
    Route.post('/insert','DepartmentsController.insert_department')
    Route.patch('/update','DepartmentsController.update_department')
    Route.delete('/delete','DepartmentsController.delete_department')
}).middleware('Appkey').prefix('/department')//middleware Appkey
//remaining two end points
Route.group(()=>{
    Route.get('/jointable','DepartmentsController.jointable')//innerjoin of employees and departments table
    Route.get('/order_salary','EmployeesController.order_salary')// order employees by salary
    Route.get('/sum_salary','EmployeesController.sum_salary')//sum of salary of employee

}).middleware('Appkey')
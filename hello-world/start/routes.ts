/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
Route.post('/insert','HomeController.insert')
Route.get('/get','HomeController.getter')
Route.post('/arithmetic','HomeController.arithmetic')}).middleware('Arith')
Route.post('/read','HomeController.read')
Route.patch('/update','HomeController.update')
Route.delete('/delete','HomeController.delete')
Route.get('/join','HomeController.join')
Route.post('/userinsert','HomeController.userinsert')
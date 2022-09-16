import Route from '@ioc:Adonis/Core/Route'

Route.get('/read','PostsController.read')
Route.post('/insert','PostsController.insert')
Route.put('/update/:id','PostsController.update')
Route.delete('/delete/:id','PostsController.delete')
Route.post('/search','PostsController.search')
Route.post('/sortasc','PostsController.sortasc')
Route.post('/sortdesc','PostsController.sortdesc')
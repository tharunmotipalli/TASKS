import Route from '@ioc:Adonis/Core/Route'

Route.get('/','PostsController.read')
Route.post('/','PostsController.insert')
Route.put('/:id','PostsController.update')
Route.delete('/:id','PostsController.delete')
Route.post('/search','PostsController.search')
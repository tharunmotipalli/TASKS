import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post';
import PostValidator from 'App/Validators/PostValidator';
import Database from '@ioc:Adonis/Lucid/Database';



export default class PostsController {

public async insert({ request }: HttpContextContract) {
const posts = new Post()
const payload=await request.validate(PostValidator)
posts.name = payload['name']
posts.age = payload['age']
posts.gender = payload['gender']
posts.email = payload['email']
posts.mobile = payload['mobile']
await posts.save()
return Post.all()
}
public async read() {
const readall=await Database.from('posts').orderBy('id')
return readall

}
public async delete({request}){
const deleteItem=await Post.findByOrFail('id',request.params().id)
deleteItem.delete()
await deleteItem.save()
}
public async update({request}){
console.log(request.params().id)
const edititem=await Post.findByOrFail('id',request.params().id)
edititem.name=request.input('name')
edititem.age=request.input('age')
edititem.gender=request.input('gender')
edititem.email=request.input('email')
edititem.mobile=request.input('mobile')
await edititem.save()
return edititem

}
public async search({request}:HttpContextContract){
    var searchitem=request.input('value')
    const searchs=await Database.from('posts').select('*').where((query) => {
      if (/^[0-9]/.test(searchitem)) {
        query.where('age', searchitem)
      }
    })
    .orWhere((query: any) => {
      query
    .where("name","ilike",`%${searchitem}%`)
    .orWhere("gender","ilike",`%${searchitem}%`)
    .orWhere("email","ilike",`%${searchitem}%`)
    .orWhere("mobile","ilike",`%${searchitem}%`)
  })
  return searchs
}
    public async sortasc({request}:HttpContextContract){
      const sortItem=request.input('sortItem')
      
      const sort=await Database.from('posts').select('*').orderBy(`${sortItem}`,`asc`)
      return sort
    }public async sortdesc({request}:HttpContextContract){
      const sortItem=request.input('sortItem')
      
      const sort=await Database.from('posts').select('*').orderBy(`${sortItem}`,`desc`)
      return sort
    }
    
}
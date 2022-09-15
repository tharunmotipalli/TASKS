import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)
class API{
    constructor() {
    }
    async read(url){
        console.log('test')
        return await axios.get(url)
    }
    async post(url, data){
        let result = await axios.post(url, data)
        // console.log(result)
        return result
    }
    async put(url, data){
        return await axios.put(url, data)
    }
    async delete(url){
        return await axios.delete(url)
    }
}
let api = new API
export{api}
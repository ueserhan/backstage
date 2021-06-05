//对axios的封装
import axios from 'axios'

//对axios的一些配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.defaults.timeout = 5000
// import { Toast } from 'vant';

//设置唯一表示 token
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 设置请求格式 默认为json 格式
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//封装
    function reques(url,config={},type='get') {
     return new Promise((resolve,reject)=>{
         //将错误信息拦截在 该文件内然后处理
         let p = null
         switch (type) {
             case "get":
                 //传递参数时传一个对象即可不需要加上params
                 p  =  axios.get(url,{
                     params:config
                 });
                 break;
             case 'post':
                 p  =  axios.post(url,config);
                 break;
             case 'put':
                 p  =  axios.put(url,config);
                 break;
             case 'delete':
                 p  =  axios.delete(url,config);
                 break;
         }

         //变量 p 作为axios 请求返回的 priems 同一管理
         p.then(res=>{
             // 成功后 执行这个 回调函数  通过 resolve将res 返回出去
             resolve(res)
         }).catch(err=>{
             console.log(err)
         })
     })
    }
//发送拦截
axios.interceptors.request.use(res=>{
//携带token 值  -----  向后台返回的唯一标识

    if(window.sessionStorage.getItem('token')!=null){
        res.headers.Authorization = window.sessionStorage.getItem('token')
    }
    return res
},error => {
    alert('超时')
})
//响应拦截
axios.interceptors.response.use(res=>{
    return res
})

export default reques;


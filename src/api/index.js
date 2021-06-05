//对网络接口的封装
import reques from './request'

const  login = (res)=> reques('/login',res,'post')
const leftlist = ()=>reques('/menus')
const list = (res)=>reques('/users',res)
//添加
const  add = (res)=>reques('/users',res,'post')
//修改
const amend = (res)=>reques('/users/'+res.id,res.obj,'put')
//删除
const delde = (res) =>reques('/users/'+res,{},'delete')
//查询
const inquire = (res)=>reques('/users/'+res,{},'get')
//修改用户状态
const  ueserstate = (res)=>reques('/users/'+res.uId+'/state/'+res.type,{},'put')
export  {login,leftlist,list,add,amend,delde,inquire,ueserstate}



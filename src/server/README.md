## 接口可用配置项
## name (String)

服务器给出的接口路径

## isLogin (Boolean)

是否登陆？ 设置为true的时候，用户数据没有 sessionId 的时候，接口调用会被程序拦截，并抛出错误提示

## method (String)

可选 'get' 'post' , 默认 'get'

## mustParam (Array[String])

接口必传参数，设置了必传参数，调用接口的时候如果没有该参数传入，则接口也会被拦截，并抛出错误提示
PS：非必传参数可以不用配置这个，否则会导致不需要传值的时候，接口不会预期的调用

## test (Boolean)

调试处于测试阶段，此时调用接口直接返回 construction 中的数据，而不是真正的调用接口

## isUrlParam (Array[String])

有嵌套在URL里面的参数，比如下面这样的接口：
cart/add/1   其中 1 为商品ID，此时可以这样配置
{
    name：'cart/add/id',
    isUrlParam: ['id']
}
就可以像普通的接口传参一样，把id传进去了

## errorToast (Boolean)

是否打印默认的toast，接口调用报错，会默认打印 toast，但是有时候，你并不想打印出这个toast，此时可以配置 errorToast = false
但是这样做的话，你除了对特殊code进行处理，还需要手动打印一下其他异常的提示

## construction (Function[Any])

适配器，传入一个 Function ，返回任意类型的数据
如果配置了 construction （可以不配置），那么调用接口会返回 construction 的数据出去
一般用于写模拟数据；或者修改数据格式，填充完整图片，防止服务器修改字段，前端添加独有字段等等；


## 新建一个 server.js 的文件模版

// import { formatImg, requestNum } from './../utils/common'
import ServerConstruction from './base/serverConstruction.js'

/**
 * 接口文件
 */
class Server extends ServerConstruction {
    /**
	 * 
	 */
	add() {
		return {}
	}
}

const server = new Server()

export default server

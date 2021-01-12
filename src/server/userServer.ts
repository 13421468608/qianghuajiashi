import ServerConstruction from './base/serverConstruction'
import { ServerInfo } from '@/common/interface/server'

/**
 * 地址接口文件
 */

class Server extends ServerConstruction {	
	/**
	 * 登陆
	 */
	public login():ServerInfo  {
		return {
			name: 'login',
			method: 'post',
			isLogin: false,
			test: true,
			mustParam: ['phone', 'password'],
			construction() {
				return {"code":200,"data":{"id":1,"nick":"张三","phone":"13412345678","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsImV4cCI6MTYxMDYyNzY0MywiaWF0IjoxNjEwMDIyODQzLCJpc3MiOiJvY2VhbmxlYXJuLnRlY2giLCJzdWIiOiJ1c2VyIHRva2VuIn0.kISGTXy6EkmVa3qxNGzotBnsZlGYgobpQgiY7rLC-zk"},"msg":"登录成功"}
			}
		}
	}
}

const server: Server = new Server()

export default server

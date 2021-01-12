import ServerConstruction from './base/serverConstruction'
import { ServerInfo } from '@/common/interface/server'

/**
 * 地址接口文件
 */

class Server extends ServerConstruction {	
	/**
	 * 获取厂家列表数据
	 */
	public goodList():ServerInfo  {
		return {
			name: 'good/page/list',
			method: 'post',
			test: true,
			construction() {
				return {"code":200,"data":[{"id":1,"goodName":"珍品花雕红木沙发","goodTypeId":2,"goodType":{"id":2,"typeName":"沙发","goodSpecs":"八件套,六件套,四件套","created_at":"2020-12-20 15:21:49","updated_at":"2020-12-20 15:23:07"},"goodSpecsId":1,"goodSpecs":{"id":1,"specsName":"八件套","created_at":"2020-12-20 16:39:50","updated_at":"2020-12-20 16:39:50"},"factoryId":4,"factory":{"id":4,"factoryName":"中山厂","factoryPhone":"","position":"","created_at":"2020-12-26 17:51:08","updated_at":"2020-12-26 17:51:08"},"price":"30000","buyingPrice":"6666","explain":"9999","image":"123.png","created_at":"2020-12-26 22:50:49","updated_at":"2020-12-26 22:50:49","deleted_at":"0001-01-01 00:00:00"}],"msg":"查询成功","total":1}
			}
		}
	}
		
	public addGood():ServerInfo  {
		return {
			name: 'good',
			method: 'post',
			mustParam: ['goodName', 'goodTypeId', 'goodSpecsId', 'price', 'buyingPrice']
		}
    }

	public updataGood():ServerInfo  {
		return {
			name: 'good/id',
			method: 'put',
			isUrlParam: ['id'],
			mustParam: ['id', 'goodName', 'goodTypeId', 'goodSpecsId', 'price', 'buyingPrice']
		}
	}
		
	public deleteGood():ServerInfo  {
		return {
			name: 'good/id',
			method: 'delete',
			isUrlParam: ['id'],
			mustParam: ['id']
		}
	}
}

const server: Server = new Server()

export default server

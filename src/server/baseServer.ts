import ServerConstruction from './base/serverConstruction'
import { ServerInfo } from '@/common/interface/server'
// import { GoodType } from '@/common/interface/index'

/**
 * 地址接口文件
 */

class Server extends ServerConstruction {   
	/**
	 * 获取商品类型列表数据
	 */
	public goodTypeList():ServerInfo  {
		return {
			name: 'goodType/page/list',
			method: 'post',
			// construction(data: GoodType[]): GoodType[] {
			// 	data.forEach(item => {
			// 		item.goodSpecs = item.goodSpecs ? item.goodSpecs : '无规格'
			// 	})
			// 	return data
			// }
			test: true,
			construction() {
				return {"code":200,"data":[{"id":17,"typeName":"111","goodSpecs":"600*800,一米半","created_at":"2020-12-26 17:45:06","updated_at":"2020-12-26 17:45:06"},{"id":16,"typeName":"食桌10","goodSpecs":"一米半,一米,四件套,600*800,六件套,八件套","created_at":"2020-12-21 23:44:06","updated_at":"2020-12-21 23:50:52"},{"id":15,"typeName":"食桌6","goodSpecs":"一米","created_at":"2020-12-21 21:14:26","updated_at":"2020-12-21 21:14:26"},{"id":14,"typeName":"食桌5","goodSpecs":"一米半","created_at":"2020-12-21 21:14:17","updated_at":"2020-12-21 21:14:17"},{"id":13,"typeName":"食桌3","goodSpecs":"一米半,四件套","created_at":"2020-12-21 21:13:09","updated_at":"2020-12-21 21:13:09"},{"id":4,"typeName":"测试1","goodSpecs":"600*800,一米半","created_at":"2020-12-20 18:28:19","updated_at":"2020-12-20 18:28:19"},{"id":2,"typeName":"沙发","goodSpecs":"八件套,六件套,四件套","created_at":"2020-12-20 15:21:49","updated_at":"2020-12-20 15:23:07"},{"id":1,"typeName":"食桌","goodSpecs":"一米,一米半","created_at":"2020-12-20 15:20:15","updated_at":"2020-12-20 15:22:55"}],"msg":"查询成功"}
			}
		}
	}
		
	public addGoodType():ServerInfo  {
		return {
			name: 'goodType',
			method: 'post',
			mustParam: ['typeName']
		}
	}

	public updataGoodType():ServerInfo  {
		return {
			name: 'goodType/id',
			method: 'put',
			isUrlParam: ['id'],
			mustParam: ['id', 'typeName']
		}
	}
		
	public deleteGoodType():ServerInfo  {
		return {
			name: 'goodType/id',
			method: 'delete',
			isUrlParam: ['id'],
			mustParam: ['id']
		}
	}

	/**
	 * 获取规格列表数据
	 */
	public goodSpecsList():ServerInfo  {
		return {
			name: 'goodSpecs/page/list',
			method: 'post',
			test: true,
			construction() {
				return {"code":200,"data":[{"id":9,"specsName":"600*800","created_at":"2020-12-20 17:13:45","updated_at":"2020-12-20 17:13:55"},{"id":8,"specsName":"一米半","created_at":"2020-12-20 16:56:50","updated_at":"2020-12-20 16:56:50"},{"id":6,"specsName":"一米","created_at":"2020-12-20 16:50:53","updated_at":"2020-12-20 16:50:53"},{"id":5,"specsName":"四件套","created_at":"2020-12-20 16:50:28","updated_at":"2020-12-20 16:50:28"},{"id":3,"specsName":"六件套","created_at":"2020-12-20 16:49:54","updated_at":"2020-12-20 16:50:24"},{"id":1,"specsName":"八件套","created_at":"2020-12-20 16:39:50","updated_at":"2020-12-20 16:39:50"}],"msg":"查询成功"}
			}
		}
	}
		
	public addGoodSpecs():ServerInfo  {
		return {
			name: 'goodSpecs',
			method: 'post',
			mustParam: ['specsName']
		}
	}

	public updataGoodSpecs():ServerInfo  {
		return {
			name: 'goodSpecs/id',
			method: 'put',
			isUrlParam: ['id'],
			mustParam: ['id', 'specsName']
		}
	}
		
	public deleteGoodSpecs():ServerInfo  {
		return {
			name: 'goodSpecs/id',
			method: 'delete',
			isUrlParam: ['id'],
			mustParam: ['id']
		}
	}

	/**
	 * 获取厂家列表数据
	 */
	public factoryList():ServerInfo  {
		return {
			name: 'factory/page/list',
			method: 'post',
			test: true,
			construction() {
				return {"code":200,"data":[{"id":4,"factoryName":"中山厂","factoryPhone":"","position":"","created_at":"2020-12-26 17:51:08","updated_at":"2020-12-26 17:51:08"},{"id":1,"factoryName":"华厂","factoryPhone":"13412345678","position":"我家","created_at":"2020-12-26 17:44:22","updated_at":"2020-12-26 17:44:34"}],"msg":"查询成功"}
			}
		}
	}
		
	public addFactory():ServerInfo  {
		return {
			name: 'factory',
			method: 'post',
			mustParam: ['factoryName']
		}
	}

	public updataFactory():ServerInfo  {
		return {
			name: 'factory/id',
			method: 'put',
			isUrlParam: ['id'],
			mustParam: ['id', 'factoryName']
		}
	}
		
	public deleteFactory():ServerInfo  {
		return {
			name: 'factory/id',
			method: 'delete',
			isUrlParam: ['id'],
			mustParam: ['id']
		}
	}
	
}

const server: Server = new Server()

export default server

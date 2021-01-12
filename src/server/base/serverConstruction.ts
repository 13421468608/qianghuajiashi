/**
 * 基础类 —— 接口基础信息以及调用
 */
import { ServerInfo, AjaxResponse, AjaxHeader, RequestGetData } from '@/common/interface/server'
import { SERVER_NAME } from '@/common/enum/module'
import getUUid from '@/common/method/uuid';
import UserModule from '@/module/UserModule'
import httpResult from './httpResult'
import axios from 'axios'
import { message } from 'ant-design-vue'

// axios.defaults.baseURL = 'http://192.168.50.219:1016/'
// axios.defaults.baseURL = 'http://192.168.50.224:1016/'
axios.defaults.baseURL = 'http://localhost:1016/'


export default class ServerConstruction {
	/**
	 * ----------  http 方法：开始调用接口 ------------
	 */
	public async http<T>(serverName: SERVER_NAME, param?: any): Promise<AjaxResponse<T>>  {
		let httpData: any | null = null, // 服务器数据
			paramOk: boolean = true, // 参数正常
			serverInfo: ServerInfo | null = this[serverName]()

		if (serverInfo === null) {
			return new Promise((resolve, reject) => {
				reject({
					code: -1,
					data: null,
					msg: `找不到接口 ${serverName} 的配置信息`
				})
			})
		} else {
			let noSetParam: string[] | undefined = serverInfo.mustParam // 保存缺少的必传参数
			// 判断必传参数
			if (serverInfo.mustParam) {
				if (param !== null) {
					const paramKey: string[] = Object.keys(param)
					if (paramKey.length === 0 && serverInfo.mustParam.length !== 0) paramOk = false
					else {
						noSetParam = serverInfo.mustParam.filter((item: string) => {
							return paramKey.indexOf(item) === -1
						})
						if (noSetParam.length !== 0) paramOk = false
					}
				} else paramOk = false
			} else paramOk = true
			// 调用服务器接口
			if (paramOk) {
				if (serverInfo.test) {
					// 测试接口，直接返回 construction 中的数据
					return new Promise(resolve => {
						resolve(serverInfo && serverInfo.construction && serverInfo.construction())
					})
				} else {
					// 检测URL是否携带参数，如果携带参数，则传参去掉该参数
					let url = serverInfo.name
					if (serverInfo.isUrlParam && serverInfo.isUrlParam.length !== 0) {
						serverInfo.isUrlParam.forEach(item => {
							let exp = new RegExp(item, 'g')
							url = url.replace(exp, param[item])
							delete param[item]
						})
					}
					// 获取 Header
					try{
						const header: AjaxHeader = await this.setHeader(serverInfo.isLogin !== false ? true : false )
						try {
							const requestGetData: RequestGetData<any | null> = {
								header,
								url,
								options: param === null ? {} : param,
								method: serverInfo.method ? serverInfo.method : 'get'
							}
							httpData = await this.requestGet(requestGetData)
							// 不传 construction 则不对数据做任何处理
							return new Promise(resolve => {
								if (serverInfo && serverInfo.construction) {
									httpData.data = serverInfo.construction(httpData.data, param === null ? {} : param)
								}
								resolve(httpData);
							})
						} catch(e) {
							// errorToast = false 则不打印
							if (serverInfo && serverInfo.errorToast !== false) {
								if (e.code !== 302 && e.msg !== 'SessionId错误') {
									message.error(e.msg !== undefined ? e.msg : '手速太快，请再试一次', 2)
								}
							}
							return new Promise((resolve, reject) => {
								reject(e)
							})
						}
					} catch(e) {
						console.error(`用户未登录，无法调用接口 ${serverName}, 请检查登录信息，或者把 isLogin 配置为 false`)
						httpResult({
							code: 302,
							data: e,
							msg: `用户未登录，无法调用接口 ${serverName}, 请检查登录信息，或者把 isLogin 配置为 false`
						})
						return new Promise((resolve, reject) => {
							reject({
								code: 302,
								data: e,
								msg: `用户未登录，无法调用接口 ${serverName}, 请检查登录信息，或者把 isLogin 配置为 false`
							})
						})
					}
				}
			} else {
				console.error(`接口 ${serverName} 缺少必传参数 ${noSetParam ? noSetParam.join(', ') : ''}, 请先检查参数正确`)
				return new Promise((resolve, reject) => {
					reject({
						code: -1,
						data: null,
						msg: `接口 ${serverName} 缺少必传参数 ${noSetParam ? noSetParam.join(', ') : ''}, 请先检查参数正确`
					})
				})
			}
		}
	}
	
	/**
	 * 处理 Header 数据 
	 */
	// requestId 自增数字
	private httpNum: number = 0
	private setHeader(isLogin: boolean): Promise<AjaxHeader> {
		// 用户信息
		const userModule: UserModule = UserModule.getEntity()
		return new Promise((resolve, reject) => {
			// 设置 header 头部信息
			let header: AjaxHeader = {
				requestId: `${getUUid()}-${this.httpNum}`,
				contentType: 'application/json'
			}
			this.httpNum++
			// 判断接口是否需要登录才可请求
			if (isLogin !== false) {
				// 说明需要进行登录才可以请求
				if (userModule.userInfo.token) {
					header.Authorization = `Bearer ${userModule.userInfo.token}`
				} else {
					// 如果没有 sessionId ，说明调用接口会有问题
					reject(null)
					return null
				}
			}
			// header 去掉空的字段
			Object.keys(header).forEach(key => {
				if (header[key] === '' || header[key] === undefined || header[key] === null) {
					delete header[key]
				}
			})
			resolve(header)
		})
	}
	
	/*
	 * @param {String} name      接口名称
	 * @param {Object} options   参数
	 */
	private async requestGet({
		header,
		method = 'get',
		url,
		options = {}
	}: RequestGetData<any | null>): Promise<any> {
		// options 去掉空的字段
		Object.keys(options).forEach(key => {
			// options[key] === '' || 
			if (options[key] === undefined || options[key] === null) {
				console.debug(`调用接口 ${url} 时， ${key} 的值为 undefined || null ，已经被程序自动过滤`)
				delete options[key]
			}
		})

		return new Promise((resolve, reject) => {
			let ajax = null
			switch (method) {
				case 'get':
					ajax = axios.get(url, { headers: header })
				break;
				case 'post':
					ajax = axios.post(url, options, { headers: header })
				break;
				case 'delete':
					ajax = axios.delete(url, { headers: header })
				break;
				case 'put':
					ajax = axios.put(url, options, { headers: header })
				break;
				default:
				break;
			}

			ajax && ajax.then((res: any) => {
				const result = httpResult(res.data)
				if (result) {
					resolve(res.data)
				} else {
					reject(res.data)
				}
			}).catch((error: any) => {
				reject({
					code: 500,
					data: error,
					msg: '服务器错误'
				})
			})
		})
	}
}
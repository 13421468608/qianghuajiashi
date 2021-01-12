/**
 * 基础类 —— 全局异常策略
 */
interface DisposeFun<T> { [key: number]: T; }

export default (res: any): boolean => {
	if (res.status && res.status === 404) {
		return false
	}
	return disposeFun[res.code] ? disposeFun[res.code](res) : disposeFun[0](res)
}

const disposeFun: DisposeFun<(data: any) => boolean> = {
	200: (data: any): boolean => {
		return true
	},
	301: (data: any): boolean => {
		// 用户未绑定手机号码
		return false
	},
	302: (data: any): boolean => {
		// 用户未登录
		// login.showLoginModal = true
		// login.logout()
		return false
	},
	403: (data: any): boolean => {
		// 请求禁止
		return false
	},
	405: (data: any): boolean => {
		// 解码失败, 登出
		// login.logout()
		return false
	},
	500: (data: any): boolean => {
		// 服务器错误
		return false
	},
	0: (data: any): boolean => {
		// 其他情况
		return false
	}
}
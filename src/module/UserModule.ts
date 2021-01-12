/**
 * 用户模块
 */
import { UserInfo, LoginFrom } from '@/common/interface/user'
import server from '@/server/userServer'
import { SERVER_NAME } from '@/common/enum/module'
import { reactive } from 'vue'
import { AjaxResponse } from '@/common/interface/server'

export default class UserModule {
	constructor() {
		let userInfo = sessionStorage.getItem("userInfo");
		if (userInfo !== null) {
			this.userInfo = JSON.parse(userInfo)
		}
	}
	/**
     * UserModule 实例对象
     */
    static entity:UserModule | null = null 
    /**
     * 获取单例
     */
    static getEntity(): UserModule {
        if (UserModule.entity === null) {
            UserModule.entity = new UserModule()
        }
        return UserModule.entity
    }
	
	public userInfo: UserInfo = {
		id: '',
		nick: '',
		phone: null,
		token: ''
	}

	public loginFrom: LoginFrom = reactive({
		phone: null,
		password: '',
	})

	public async logining (): Promise<any> {
		const ajaxResponse: AjaxResponse<UserInfo> = await server.http<UserInfo>(SERVER_NAME.LOGIN, this.loginFrom)
		this.userInfo = ajaxResponse.data
		sessionStorage.setItem("userInfo", JSON.stringify(ajaxResponse.data));
	}

	public logout() {
		this.userInfo = {
			id: '',
			nick: '',
			phone: null,
			token: ''
		}
		sessionStorage.removeItem("userInfo");
	}
}

// Load on demand
// This module only introduces components globally before login
import type { App } from 'vue'

import {
	// need
	Button,
	Layout,
	Space,
	Avatar,
	Divider,
	Result,
	Input,
	Form,
	Select,
	DatePicker,
	Switch,
	Checkbox,
	Radio,
	Upload,
	Table,
	PageHeader,
	Modal
} from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

export function setupAntd(app: App<Element>) {
	// need
	// Here are the components required before registering and logging in
	app.use(Button).use(Layout).use(Space).use(Avatar).use(Divider)
	.use(Result).use(Input).use(Form).use(Select).use(DatePicker)
	.use(Switch).use(Checkbox).use(Radio).use(Upload).use(Table)
	.use(PageHeader).use(Modal)
}

// 格式化时间
interface FormatTime<T> { [key: string]: T; }

export function formatTime(date: Date, fmt: string = 'YYYY年mm月dd日 HH:MM:SS'):string {
    let ret
    const opt: FormatTime<string> = {
        'Y+': date.getFullYear().toString(),        // 年
        'm+': (date.getMonth() + 1).toString(),     // 月
        'd+': date.getDate().toString(),            // 日
        'H+': date.getHours().toString(),           // 时
        'M+': date.getMinutes().toString(),         // 分
        'S+': date.getSeconds().toString()          // 秒
    }
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt
}

export function forumFormatDate (time: number) {
	// 时间格式转换
	if (!time) return ''
	let timeDate: number = time
	// 补全时间戳
	if (time.toString().length < 13) {
        timeDate = +(timeDate + '000')
    }
    let data: Date = new Date(Math.floor(timeDate))
	let dateTime: number = data.getTime() // 最新一条消息的时间
	let nowData = Date.now() - dateTime; // 现在的时间 减去 最新一条消息的时间, (这条消息过了多久了)
	let lcTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 凌晨的时间
	// 1分钟内
	if(nowData < 60 * 1000) {
		return '刚刚'
	} else if(nowData < 120 * 1000) {
		return '1分钟前'
	} else if(nowData < 3600 * 1000){
		return (nowData / 60 / 1000 >> 0)+'分钟前'
	} else if(nowData < 3600 * 24 * 1000) {
		return ( nowData / 3600 / 1000 >> 0)+'小时前'
	} else if(nowData < 3600*24*1000 + (Date.now() - lcTime)) {
		return '昨天'
	} else if(nowData < 3600*24*1000*2 + (Date.now() - lcTime)) {
		return '前天'
	} else if(nowData > (3600*24*1000 + (Date.now() - lcTime)) && new Date().getFullYear() == new Date(+dateTime).getFullYear()) {
        return formatTime(data, 'mm月dd日')
	} else {
        return formatTime(data, 'YYYY年mm月dd日');
	}
}
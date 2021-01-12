import { UserInfo } from '@/common/interface/user'
import { SERVER_NAME } from '@/common/enum/module'

export interface Page {
    pageNum: number
    pageSize: number
}

export interface AjaxResponse<T> {
    code: number
    data: T
    msg: string
}

export interface ServerInfo {
    name: string
    isLogin?: boolean
    method: Method
    mustParam?: Array<string>
    test?: boolean
    isUrlParam?: Array<string>
    errorToast?: boolean
    construction?: (data?: any, param?: any) => any
}

export interface AjaxHeader {
    [key: string]: string
}

export interface RequestGetData<T> {
    header: AjaxHeader
    url: string
    options: T
    method: Method
}

type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

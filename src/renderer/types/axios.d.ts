export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
export type SuccessMessageMode = ErrorMessageMode

export interface RequestOptions {
  // 将请求参数拼接在url后面
  joinParamsToUrl?: boolean
  // 格式化提交参数时间
  formatDate?: boolean
  // 是否对数据进行处理
  isTransformResponse?: boolean
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean
  // post请求的时候添加参数到url
  joinPrefix?: boolean
  // 接口地址
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode
  // 成功消息提示类型
  successMessageMode?: SuccessMessageMode
  // 是否加入时间戳
  joinTime?: boolean
  // 忽略重复请求
  ignoreCancelToken?: boolean
  // 是否携带token
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}

export interface RetryRequest {
  isOpenRetry: boolean
  count: number
  waitTime: number
}

//数据响应格式
export interface Result<T = any> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message: string
  data: T
}

// 文件上传类型
export interface UploadFileParams {
  // 携带的参数
  data?: Recordable
  // 文件参数的name
  name?: string
  file: File | Blob
  filename?: string
  [key: string]: any
}

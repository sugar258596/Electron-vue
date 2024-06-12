import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

import type { RequestOptions, Result } from '#/axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

// axios 的抽象类
export abstract class AxiosTransform {
  /**
   * @description 请求之前的处理器
   */
  beforeRequestHook?: (config: AxiosRequestConfig, option: RequestOptions) => AxiosRequestConfig

  /**
   * @description 响应数据处理器
   */
  transformResponseHook?: (res: AxiosResponse<Result>, option: RequestOptions) => any

  /**
   * @description 请求失败处理器
   */
  requestCatchHook?: (error: Error, option: RequestOptions) => Promise<any>

  /**
   * @description 请求拦截器
   */
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    option: CreateAxiosOptions
  ) => InternalAxiosRequestConfig

  /**
   * @description 响应拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description 请求之前错误拦截器
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description 响应错误拦截器
   */
  responseInterceptorsCatch?: (AxiosInstance: AxiosInstance, error: Error) => void
}

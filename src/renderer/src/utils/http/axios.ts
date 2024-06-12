import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios'
import axios from 'axios'
import { cloneDeep, isFunction } from 'lodash'
import qs from 'qs'

import type { RequestOptions, Result, UploadFileParams } from '#/axios'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { CreateAxiosOptions } from './axiosTransform'
import { AxiosCanceler } from './axiosCancel'

export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(option: CreateAxiosOptions) {
    this.options = option
    this.axiosInstance = axios.create(option)
  }

  // 创建 axios 实例
  ceateAxiosInstance(option: CreateAxiosOptions) {
    this.axiosInstance = axios.create(option)
  }

  // 返回实例
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  // 获取配置项 {{transform}}
  getTransform() {
    const { transform } = this.options
    return transform
  }

  // 自定义配置 axios
  customConfigAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) return
    this.ceateAxiosInstance(config)
  }

  //设置通用的请求头
  setHeaderL(headers: any) {
    if (!this.axiosInstance) return
    // 将headers合并到默认配置中
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  // 拦截器
  setupInterceptors() {
    //读取配置项
    const {
      axiosInstance,
      options: { transform }
    } = this
    //假如没有配置项
    if (!transform) return

    // 结构出 请求拦截器  请求错误拦截器  响应拦截器 响应错误拦截器
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    const axiosCancel = new AxiosCanceler()

    // 请求拦截器配置
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // 获取到请求配置
      const requestOptions =
        (config as unknown as any).requestInterceptors ?? this.options.requestOptions

      // 获取到是否忽略重复请求
      const ignoreCancelToken = requestOptions.ignoreCancelToken ?? true

      // 假如忽略重复请求，则取消重复请求
      !ignoreCancelToken && axiosCancel.addPending(config)

      // 有配置项，则执行配置项
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    // 请求错误拦截器
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCancel.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应错误拦截器
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (err) => {
        return responseInterceptorsCatch(axiosInstance, err)
      })
  }

  // 数据格式转换
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  /**
   * @description:  上传文件
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true
      }
    })
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    // cancelToken 如果被深拷贝，会导致最外层无法使用cancel方法来取消请求
    if (config.cancelToken) {
      conf.cancelToken = config.cancelToken
    }

    if (config.signal) {
      conf.signal = config.signal
    }

    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    //请求拦截器 请求错误拦截器  响应数据处理器
    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    // 进行数据格式转换
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
}

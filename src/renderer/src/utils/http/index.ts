import { VAxios } from './axios'

import { deepMerge } from '../index'
import { clone } from 'lodash'
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result } from '#/axios'

const transform: AxiosTransform = {
  /**
   * @description 请求之前的处理器
   * @param config
   * @param options
   * @returns
   */
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    return config
  },

  /**
   * @description 响应数据处理器
   * @param res
   * @returns
   */
  transformResponseHook: (res: AxiosResponse<Result>, option: RequestOptions) => {
    let data: any
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (res.status === ResultEnum.SUCCESS) {
      data = res.data
    }
    return data
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: getAppEnvConfig().VITE_GLOB_AUTH, // 请求认证方式
        timeout: 10 * 1000,
        // 基础接口地址
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          // apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          // urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100
          }
        }
      },
      opt || {}
    )
  )
}
export const request = createAxios()

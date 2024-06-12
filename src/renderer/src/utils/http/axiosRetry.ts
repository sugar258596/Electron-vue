import { AxiosError, AxiosInstance } from 'axios'

export class AxiosRetry {
  /**
   * @description 重试
   * @param axiosInstance
   * @param error
   */
  retry(axiosInstance: AxiosInstance, error: AxiosError) {
    const { config } = error.request
    const { waitTime, count } = config.requestOptions.retryRequest ?? {}
    config._retryCount = config._retryCount ?? 0

    // 如果重试次数大于等于最大重试次数，则不再重试并且抛出错误
    if (config._retryCount >= count) {
      return Promise.reject(error)
    }
    config._retryCount += 1
    //删除配置的header,使用默认header
    delete config.headers
    return this.delay(waitTime).then(() => axiosInstance(config))
  }

  /**
   * @description 延时函数
   * @param Time
   * @returns
   */
  private delay(Time: number) {
    return new Promise((resolve) => setTimeout(resolve, Time))
  }
}

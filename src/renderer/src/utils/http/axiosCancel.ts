import type { AxiosRequestConfig } from 'axios'

// 用于存储发送的请求
const pendingMap = new Map<string, AbortController>()

/**
 * @description   请求的生成唯一标识
 * @param config
 * @returns
 */
const getPendingUrl = (config: AxiosRequestConfig): string => {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  /**
   * @description 添加请求
   * @param config
   */
  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const controller = new AbortController()
    const url = getPendingUrl(config)
    // map 里面没有这个请求 ,就添加进去
    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller)
    }
  }

  /**
   * @description 清除请求
   * @param config
   */
  public removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config)
    // map 里面有这个请求
    if (pendingMap.has(url)) {
      const abortController = pendingMap.get(url)
      // abortController 有值 停止请求
      if (abortController) {
        abortController?.abort(url)
      }
      pendingMap.delete(url)
    }
  }

  /**
   * @description 清除所有请求
   * @param config
   */
  public removeAllPending(): void {
    pendingMap.forEach((abortController) => {
      if (abortController) {
        abortController.abort()
      }
      this.reset()
    })
  }

  /**
   * 重置
   */
  public reset(): void {
    pendingMap.clear()
  }
}

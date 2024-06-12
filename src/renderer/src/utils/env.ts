import { GlobEnvConfig } from '#/config'
import { API_ADDRESS } from '@/enums/cacheEnum'

const getVariableName = (title: string) => {
  function strToHex(str: string) {
    const result: string[] = []
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16)
      result.push(('000' + hex).slice(-4))
    }
    return result.join('').toUpperCase()
  }
  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

export const userGlobSetting = () => {
  const ENV_NAME = getVariableName(import.meta.env.VITE_GLOB_APP_TITLE)
  const ENV: GlobEnvConfig = import.meta.env.DEV ? import.meta.env : window[ENV_NAME]

  const { VITE_GLOB_APP_TITLE, VITE_GLOB_UPLOAD_URL, VITE_GLOB_AUTH } = ENV
  let { VITE_GLOB_API_URL } = ENV

  if (localStorage.getItem(API_ADDRESS)) {
    const address = JSON.parse(localStorage.getItem(API_ADDRESS) || '{}')
    if (address?.key) VITE_GLOB_API_URL = address?.val
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_AUTH,
    VITE_GLOB_API_URL
  }
}

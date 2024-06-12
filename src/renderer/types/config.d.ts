export interface GlobEnvConfig {
  // 标题
  VITE_GLOB_APP_TITLE: string
  // 跨越代理匹配路径
  VITE_GLOB_API_URL: string
  // 文件上传跨域代理路径
  VITE_GLOB_UPLOAD_URL?: string
  //请求认证方式
  VITE_GLOB_AUTH?: string
}

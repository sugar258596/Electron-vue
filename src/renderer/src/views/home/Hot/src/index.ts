import header from './header.vue'
import content from './content.vue'

import { withInstall } from '@/utils'

export const hotHeader = withInstall(header)
export const hotContent = withInstall(content)

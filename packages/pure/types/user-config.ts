import type { ThemeUserConfig } from './theme-config'
import type { IntegrationUserConfig } from './integrations-config'

export type UserConfig = ThemeUserConfig & { integ: IntegrationUserConfig }
export type UserInputConfig = ThemeUserConfig & { integ: IntegrationUserConfig }

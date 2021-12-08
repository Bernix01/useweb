// https://storybook.js.org/docs/react/configure/features-and-behavior
import { addons } from '@storybook/addons'

import theme from './theme/storybookTheme'

addons.setConfig({
  theme: theme(),
})

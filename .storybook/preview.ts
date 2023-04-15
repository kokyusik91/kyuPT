import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import '../src/styles/globals.css'
import * as nextImage from 'next/image'

// Object.defineProperty(nextImage, 'default', {
//   configurable: true,
//   value: (props) => <img {...props} />,
// })

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'iphone12',
    },
  },
}

export default preview

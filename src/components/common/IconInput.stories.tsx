import type { Meta, StoryObj } from '@storybook/react'
import IconInput from './IconInput'
import Icon from '@components/Icon/Icon'

const meta: Meta<typeof IconInput> = {
  title: 'component/IconInput',
  component: IconInput,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof IconInput>
export default meta

export const Basic: Story = {
  args: {
    value: '',
    iconComponent: <Icon icon="submit" />,
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'component/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Avatar>
export default meta

export const Basic: Story = {
  args: {
    imageUrl: '/images/newJeans.png',
    size: 60,
  },
}

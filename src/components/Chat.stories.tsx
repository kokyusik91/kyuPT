import type { Meta, StoryObj } from '@storybook/react'
import Chat from './Chat'

const meta: Meta<typeof Chat> = {
  title: 'component/Chat',
  component: Chat,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Chat>
export default meta

const roomInfo = {
  id: 1,
  headCount: 4,
  title: '어서 들어와요!',
  createdAt: new Date(),
}

export const Basic: Story = {
  args: {
    roomInfo: roomInfo,
  },
}

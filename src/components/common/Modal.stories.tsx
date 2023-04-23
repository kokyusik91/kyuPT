import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'component/Modal',
  component: Modal,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Modal>
export default meta

export const Basic: Story = {
  args: {
    open: true,
    children: <h1>hello</h1>,
  },
}

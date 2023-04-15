import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'component/Button',
  component: Button,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Button>
export default meta

export const Basic: Story = {
  args: {
    children: '버튼',
    backgroundColor: 'bg-green-100',
    txtColor: 'text-cs-mainblack',
    handleClickButton: () => alert('버튼 클릭'),
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'component/Input',
  component: Input,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Input>

export const Basic: Story = {
  args: {
    id: 'Label',
    inputProps: {
      placeholder: '기본값을 입력해주헤요',
    },
  },
}

export default meta

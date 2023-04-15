import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'component/Input',
  component: Input,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Input>

export const Basic: Story = {}

export default meta

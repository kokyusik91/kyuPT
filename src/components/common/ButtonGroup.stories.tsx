import type { Meta, StoryObj } from '@storybook/react'
import ButtonGroup from './ButtonGroup'
import Button from './Button'

const meta: Meta<typeof ButtonGroup> = {
  title: 'component/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
}

type Story = StoryObj<typeof ButtonGroup>
export default meta

export const Basic: Story = {
  args: {
    children: (
      <>
        <Button backgroundColor="bg-cs-mainred">취소</Button>
        <Button backgroundColor="bg-cs-skyblue">확인</Button>
      </>
    ),
    gap: 4,
  },
}

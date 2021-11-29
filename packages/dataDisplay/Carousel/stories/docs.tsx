import {
  Title,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs'

export default function Docs() {
  return (
    <>
      <Title />
      <Description>This is a Carousel</Description>
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
    </>
  )
}

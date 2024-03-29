import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'

import Docs from './docs'
import { Modal } from './component'

export default {
  title: 'packages/Feedback/Modal',
  component: Modal,
  args: {
    show: null,
  },
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: () => <Docs />,
    },
  },
} as ComponentMeta<typeof Modal>

const Template = (args) => {
  const [show, setShow] = useState(args.show)
  return (
    <>
      <button onClick={() => setShow((c) => !c)}>toggle</button>
      <Modal {...args} show={show} onClose={() => setShow(false)}>
        <div>Hello Modal</div>
      </Modal>
    </>
  )
}

export const Example = Template.bind({})

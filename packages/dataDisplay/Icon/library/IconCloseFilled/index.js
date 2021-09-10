/* eslint-disable react/no-unknown-property */
import Icon from '../../'

export default (props) => (
  <Icon {...props} customChildren={props.children} isStroke>
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M15 9L9 15' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M9 9L15 15' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  </Icon>
)

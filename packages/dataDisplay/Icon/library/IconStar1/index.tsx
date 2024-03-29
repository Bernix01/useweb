/* eslint-disable react/no-unknown-property */
import Icon from '../../src'

export default (props) => (
  <Icon {...props} customChildren={props.children}>
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0)'>
        <path
          d='M15.9861 6.17979C15.9523 6.07612 15.8626 6.00051 15.7547 5.98476L10.5738 5.23183L8.25687 0.53725C8.20876 0.439303 8.10909 0.377441 8.00026 0.377441C7.89143 0.377441 7.79148 0.439303 7.74365 0.53725L5.42644 5.23211L0.245561 5.98504C0.13759 6.0008 0.0482348 6.07612 0.0141538 6.18008C-0.0193543 6.28347 0.00842595 6.39745 0.0866116 6.47335L3.8358 10.1277L2.95056 15.288C2.93223 15.3954 2.97633 15.5039 3.06425 15.5681C3.15275 15.6328 3.26989 15.6411 3.36583 15.5899L8.00026 13.1538L12.6341 15.5899C12.6759 15.6119 12.722 15.6228 12.7676 15.6228C12.8269 15.6228 12.8859 15.6045 12.936 15.5681C13.0242 15.5039 13.0683 15.3954 13.0497 15.288L12.1647 10.128L15.9139 6.47335C15.9918 6.39688 16.0199 6.28318 15.9861 6.17979Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  </Icon>
)

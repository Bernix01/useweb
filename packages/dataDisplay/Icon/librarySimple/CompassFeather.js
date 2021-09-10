function CompassFeather(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' />
    </svg>
  )
}

export default CompassFeather

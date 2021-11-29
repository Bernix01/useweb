import React, { Fragment, useEffect, useRef, useState } from 'react'
import Box from '@useweb/box'
import useKeyPress from '@useweb/use-key-press'

import IconArrow from './IconArrow'

import * as styles from './styles'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation])

type Props = {
  setIndex: (item) => void
  children: any
  wrapperStyles?: object
  infinite?: boolean
  index?: any
  iconColor?: string
}

export default function Carousel({
  children,
  wrapperStyles = {},
  infinite = null,
  index = 0,
  setIndex,
  iconColor = 'white',
}: Props) {
  const selectedIndexRef = useRef(index)
  children = Array.isArray(children) ? children : [children]
  const childrenLength = children.length
  const hasOneItem = childrenLength === 1
  const showLeftArrow = infinite || index !== 0
  const showRightArrow = infinite || index !== childrenLength - 1

  useEffect(() => {
    selectedIndexRef.current = index
  }, [index])

  const handleBack = () => {
    let prevItem = selectedIndexRef.current - 1
    const prevItemIsLowerThanTotal = prevItem === -1
    prevItem = prevItemIsLowerThanTotal ? childrenLength - 1 : prevItem
    selectedIndexRef.current = prevItem
    setIndex(prevItem)
  }

  const handleNext = () => {
    let nextItem = selectedIndexRef.current + 1
    const nextItemIsHigherThanTotal = nextItem > childrenLength - 1
    nextItem = nextItemIsHigherThanTotal ? 0 : nextItem
    selectedIndexRef.current = nextItem
    setIndex(nextItem)
  }

  const handleItemChange = (nextIndex) => {
    setIndex(nextIndex)
  }

  useKeyPress('ArrowLeft', handleBack)
  useKeyPress('ArrowRight', handleNext)

  return (
    <Box name='carousel' styles={{ ...styles.wrapper, ...wrapperStyles }}>
      <Swiper navigation={true} className='mySwiper'>
        {children.map((child, index) => {
          return <SwiperSlide key={index + Math.random()}>{child}</SwiperSlide>
        })}
      </Swiper>

      {showLeftArrow && !hasOneItem && (
        <IconArrow onClick={handleBack} color={iconColor} style={styles.leftArrow} />
      )}

      {showRightArrow && !hasOneItem && (
        <IconArrow onClick={handleNext} style={styles.rightArrow} color={iconColor} />
      )}
    </Box>
  )
}

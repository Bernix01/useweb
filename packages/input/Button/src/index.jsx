import React from 'react'
import Text from '@useweb/text'
import Animate from '@useweb/animate'

import { defaultProps, propTypes } from './props'

export default function Button({
  Wrapper,
  ButtonInner,
  LoadingCon,
  color,
  text,
  onClick,
  disabled,
  active,
  outlined,
  style,
  dataCy,
  loading,
  typographyVariant,
  ProgressComponent,
  url,
  beforeIcon,
  afterIcon,
  size,
  textProps = {},
  type = 'button',
  ...rest
}) {
  const textColor = disabled ? 'disabledDarker' : outlined ? 'white' : `${color}Darker`
  const isLoading = typeof loading !== 'string' ? loading : false
  const matchesUrl = url && location.pathname === url

  return (
    <Wrapper>
      <button onClick={disabled ? () => null : onClick} data-cy={dataCy} type={type}>
        <ButtonInner
          color={color}
          disabled={disabled}
          active={active}
          outlined={outlined}
          beforeIcon={beforeIcon}
          afterIcon={afterIcon}
          style={style}
          isLoading={isLoading}
          matchesUrl={matchesUrl}
          size={size}
          {...rest}
        >
          {beforeIcon && beforeIcon}
          <Text
            text={text}
            variant={typographyVariant}
            styles={{ color: textColor, transform: 'translateY(1px)' }}
            {...textProps}
          />
          {afterIcon && afterIcon}
        </ButtonInner>
      </button>

      <Animate name='showHide' show={isLoading}>
        <LoadingCon color={color}>{ProgressComponent && ProgressComponent}</LoadingCon>
      </Animate>
    </Wrapper>
  )
}

Button.defaultProps = defaultProps
Button.propTypes = propTypes

import React from 'react'
import PropTypes from 'prop-types'

function Button({ children, variant = 'primary', onClick, disabled = false }) {
  return (
    <button 
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button

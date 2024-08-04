// import React from 'react'
// const Loading = () => (<div className="animated fadeIn pt-3 text-center">Loading...</div>)
// export default Loading

import React from 'react'

const spinnerVariants = [
    'danger',
    'warning',
    'info',
]

const basicSpinnerGrowing = () => {
  return spinnerVariants.map((variant, idx) => (
    <div key={idx} className={['spinner-grow spinner-grow-sm', 'mr-1','text-'+variant].join(' ')} role="status">
        <span className="sr-only">Loading...</span>
    </div>
  ))
}

const basicSpinnerBorder = (variant, size) => {
  return(
    <div className={['spinner-border spinner-border-'+size, 'text-'+variant].join(' ')} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

const Loading = (props) => {
  const { type, variant, size } = props || {}
  
  return(
    <div className='text-center'>
      { type === 'basicSpinnerGrowing' && basicSpinnerGrowing() }
      { type === 'basicSpinnerBorder' && basicSpinnerBorder(variant, size) }
    </div>
  )
}

Loading.defaultProps = {
  type: 'basicSpinnerGrowing', 
  variant: 'white', 
  size:'sm',
}

export default Loading

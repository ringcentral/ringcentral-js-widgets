import React from 'react'

import styles from '../index.css'
import iconsStyles from '../../../../styles/icon.css'

const CallerBar = (props) => {
  let content = props.children
  return (
    <div className={ styles.caller }>
      <span className={ styles.callerSpan }>From</span>
      <button className={ styles.callerButton }>
        { props.caller }
      </button>
      <div className={ styles.callerIcon }>
        <span className={ `
          ${ iconsStyles['icon-uni2463'] }
          ${ iconsStyles['icon'] }`}></span>
      </div>
    </div>
  )
}

CallerBar.propTypes = {
  caller: React.PropTypes.string
}

export default CallerBar

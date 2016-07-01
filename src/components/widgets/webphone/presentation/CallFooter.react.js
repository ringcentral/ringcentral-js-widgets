import React from 'react'

import styles from '../index.css'
import iconsStyles from '../../../../styles/icon.css'

const CallFooter = (props) => {
  let content = props.children
  return (
    <div className={ styles.footer }>
      <button className={ styles.footerButton }>
        <span className={ `${iconsStyles['icon-uniCE']} ${iconsStyles['icon']} ${styles['icon']}` }></span>
      </button>
      <button className={ styles.footerButton }>
        <span className={ `${iconsStyles['icon-uni44']} ${iconsStyles['icon']} ${styles['icon']}` }></span>
      </button>
    </div>
  )
}

CallFooter.propTypes = {
}

export default CallFooter

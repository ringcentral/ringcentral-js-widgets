import React from 'react'
import CallFooter from '../presentation/CallFooter.react'
import iconsStyles from '../../../../styles/icon.css'
import styles from '../index.css'

const IncomingCall = (props) => (
  <div className={ styles.main + ' ' + styles.container }>
    <div>
      <div className={ styles.title }>
        Colin Liu
      </div>
      <div className={ styles.subtitle }>
        Call Incoming
      </div>
      <div className={ styles.avatar }>
        <img src='http://placehold.it/150x150' />
      </div>
    </div>
    <CallFooter 
      leftIcon={ 'icon-uniCE' }
      rightIcon={ 'icon-uni44' }
      onLeftClick={ ()=>{} }
      onRightClick={ ()=>{} }/>
  </div>
)

export default IncomingCall

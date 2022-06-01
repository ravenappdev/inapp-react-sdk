import React from 'react'
import {
  BellIconButton,
  DotIndicator,
  CountIndicator
} from '../styled-components'


export default function BellIcon({
  color,
  indicatorType,
  count,
  isOpen,
  openModal,
  closeModal
}) {

  
  function toggleModal() {
    if (isOpen) {
      closeModal()
    } else {
      openModal()
    }
  }

  return (
    <BellIconButton color={color} onClick={toggleModal}>
      <i className={!isOpen ? 'fa-regular fa-bell' : 'fa-solid fa-bell'}></i>
      {!isOpen && count > 0 && indicatorType === 'count' && (
        <CountIndicator>{count}</CountIndicator>
      )}
      {!isOpen && count > 0 && indicatorType === 'dot' && (
        <DotIndicator className='fas fa-circle'></DotIndicator>
      )}
    </BellIconButton>
  )
}

import React, { Component } from 'react'

export const Popup = (props: {trigger: boolean, setTrigger:React.Dispatch<React.SetStateAction<boolean>> ,timeOut: number, children: React.ReactElement, handleClose?: ()=> void}) => {
    if (props.timeOut) {
        setTimeout(() => {
            props.setTrigger(false);
        },(props.timeOut*1000));
    }
  return (props.trigger) ? (
    <div className="popup" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        zIndex: 1000
    }}>
      <div className="popup-inner" style={{
        position: 'relative',
        padding: '15px',
        width: '30%',
        maxWidth: '600px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 32px rgba(0, 0, 0, 0.5)',
        display: 'flex', // Thêm dòng này để sử dụng Flexbox
        flexDirection: 'column', // Chỉ định hướng cột cho flex container
        justifyContent: 'center', // Chỉ định căn giữa theo chiều dọc
        alignItems: 'center'
      }}>
        {props.children}
        {!props.timeOut && <button className="close-btn" onClick={() => {props.setTrigger(false), props.handleClose?.()}}>close</button>}
      </div>
    </div>
  ) : (null)
}

function Modal({isOpen, onClose, children}) {
  if (!isOpen) return null
  return (
    <div onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.27)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div 
        style={{
          backgroundColor: "white",
          width: "48rem",
          
          borderRadius: "5px",
          padding: "3rem"
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
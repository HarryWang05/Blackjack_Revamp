interface Props {
  open: boolean;
  children: string;
  onClose: () => void;
}

const Modal = (props: Props) => {
  if (!props.open) return null;
  return (
    <>
      <div className="back_modal_overlay"></div>
      <div className="front_modal_overlay">
        <button onClick={props.onClose}>Back</button>
        {props.children}
      </div>
    </>
  )
}

export default Modal;
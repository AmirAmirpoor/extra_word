import { useRef } from "react";

// icons
import { MdClose as CloseIcon } from "react-icons/md";

function Popup(props) {
  const overlayRef = useRef();

  const { visible, onClose, title = "", type = "RIGHT", children } = props;

  const overlayClasses = `popup-overlay ${visible && "visible"}`;
  const contentClasses = `popup-content no-scrollbar ${
    type === "LEFT" && "left"
  }`;

  const overlayClick = (evt) => {
    if (evt.target === overlayRef.current) onClose();
  };

  return (
    <div className={overlayClasses} ref={overlayRef} onClick={overlayClick}>
      <div className={contentClasses}>
        <div className="popup-header">
          <h2>{title}</h2>

          <button className="popup-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Popup;

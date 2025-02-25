import "./ErrorModal.css";
type TErrorModalProps = {
  message: string;
  onClose: () => void;
};

export const ErrorModal = ({ message, onClose }: TErrorModalProps) => {
  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <div className="error-modal-header">
          <div className="error-modal-title">
            <span className="error-modal-icon">❌</span>
            <h2>Error</h2>
          </div>
          <button onClick={onClose} className="error-close-btn">
            X
          </button>
        </div>
        <p className="error-modal-message">{message}</p>
        <button onClick={onClose} className="error-close-btn-accept">
          Close
        </button>
      </div>
    </div>
  );
};

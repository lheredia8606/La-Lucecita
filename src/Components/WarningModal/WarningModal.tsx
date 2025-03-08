import "./warning-modal.css";
type TWarningModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};
export const WarningModal = ({
  message,
  onConfirm,
  onCancel,
}: TWarningModalProps) => {
  return (
    <div className="warning-modal-overlay">
      <div className="warning-modal">
        <div className="warning-modal-header">
          <div className="warning-modal-title">
            <span className="warning-modal-icon">⚠️</span>
            <h2>Warning</h2>
          </div>
        </div>
        <p className="warning-modal-message">{message}</p>
        <div className="warning-modal-actions">
          <button onClick={onConfirm} className="warning-btn-ok">
            OK
          </button>
          <button onClick={onCancel} className="warning-btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

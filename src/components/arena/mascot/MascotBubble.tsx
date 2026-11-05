interface MascotBubbleProps {
  text: string;
  hidden: boolean;
  announcement: string;
  onNext: () => void;
  onHide: () => void;
}

/** Speech bubble with Next / Hide buttons. Screen readers only hear user-triggered lines. */
const MascotBubble = ({ text, hidden, announcement, onNext, onHide }: MascotBubbleProps) => (
  <div className="dm-bubble" aria-hidden={hidden || undefined}>
    <p className="dm-text" aria-hidden>
      {text}
    </p>
    <span className="sr-only" aria-live="polite">
      {announcement}
    </span>
    <div className="dm-actions">
      <button type="button" className="dm-btn" onClick={onNext} tabIndex={hidden ? -1 : 0}>
        Next
      </button>
      <button type="button" className="dm-btn" onClick={onHide} tabIndex={hidden ? -1 : 0}>
        Hide
      </button>
    </div>
  </div>
);

export default MascotBubble;

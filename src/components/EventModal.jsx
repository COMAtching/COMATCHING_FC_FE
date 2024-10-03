import React from "react";
import "../css/components/EventModal.css"; // You will create this CSS file to style the modal

const EventModal = ({ onParticipate, onCancel }) => {
  return (
    <div className="event-modal-overlay">
      <div className="event-modal-contents">
        <h2 className="event-modal-title">❤️X3 무료 이벤트 </h2>
        <p className="event-modal-content">무료 ❤️3개를 받으시겠습니까?</p>
        <div className="event-modal-buttons">
          
          <button onClick={onCancel} className="event-modal-cancel-button">
            X
          </button>
          <button onClick={onParticipate} className="event-modal-participate-button">
            O
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

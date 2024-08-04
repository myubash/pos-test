import React, {useCallback} from 'react';
import {
  Modal,
  ModalBody,
} from 'reactstrap'

const ConfirmationModal = ({ tableNumber, setTableNumber, isOpen, toggle, order, onSubmit }) => {

  const handleTableNumberChange = useCallback((e) => {
    setTableNumber(e.target.value);
  }, [setTableNumber]);

  return (
    <Modal className="modal-overlay" isOpen={isOpen} toggle={toggle}>
      <ModalBody className="modal-content">
        <h2>Order Confirmation</h2>
        <p>Please enter your table number:</p>
        <input
          type="text"
          value={tableNumber}
          onChange={handleTableNumberChange}
          placeholder="Table Number"
        />
        <h3>Ordered Items:</h3>
        <ul className="order-list">
          {order.map(item => (
            <li key={item.id}>
              {item.name}: {item.qty}
            </li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button onClick={onSubmit} className="confirm-button">
            Confirm
          </button>
          <button onClick={toggle} className="cancel-button">
            Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmationModal;

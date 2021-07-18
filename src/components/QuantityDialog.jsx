import React from 'react';
const QuantityDialog = ({
  head,
  headClass,
  btnName,
  btnClass,
  funcToDo,
  cancel,
  setQuantity,
}) => {
  const justification = funcToDo ? 'justify-between' : 'justify-center';

  return (
    <div className="dialog-page">
      <div className="dialog p-3">
        <div className={`dialog-head p-3 mt-3 text-center ${headClass}`}>
          {head}
        </div>
        <div className="dialog-body bg-white p-3 pb-0">
          <p className="text-center">How many you want?</p>
          <div className="flex">
            <select
              onChange={(e) => setQuantity(e.target.value)}
              className="input w-100 mt-3"
              type="number">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className={`dialog-controls bg-white flex-row ${justification}`}>
          {funcToDo && (
            <button onClick={funcToDo} className={`p-2 m-4 btn ok ${btnClass}`}>
              {btnName}
            </button>
          )}
          <button onClick={cancel} className="p-2 m-4 btn cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityDialog;

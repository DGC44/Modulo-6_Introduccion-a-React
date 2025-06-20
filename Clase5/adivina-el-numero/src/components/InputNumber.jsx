import React from 'react';

function InputNumber({ valor, onChange, disabled }) {
  return (
    <input
      type="number"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ingresa un número"
      disabled={disabled}
    />
  );
}

export default InputNumber;

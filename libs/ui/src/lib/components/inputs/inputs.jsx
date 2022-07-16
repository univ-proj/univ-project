import React from 'react';
import styles from './inputs.module.css';

export const Input = ({ handleChange, type }) => {
  return (
    <input
      name={type}
      type={type}
      placeholder={
        type === 'email' ? 'Enter Your Email' : 'Enter Your Password'
      }
      onChange={handleChange}
      required
      className={styles['input']}
    />
  );
};

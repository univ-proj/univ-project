import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import VisibilityOffIcon from '../../icons/visibility-off-icon/visibility-off-icon';
import VisibilityOnIcon from '../../icons/visibility-on-icon/visibility-on-icon';
/* eslint-disable-next-line */
export interface InputsProps {
  value: string;
  onChange: any;
  name: string;
  focused?: boolean;
  color?: 'error' | 'primary';
  label?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  type: string;
}

export function Inputs({
  focused,
  color,
  placeholder,
  error,
  helperText,
  disabled,
  required,
  label,
  type,
  value,
  onChange,
  name,
}: InputsProps) {
  const [showPassword, setshowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const showIcon = type === 'password';
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type === 'text' || showPassword ? 'text' : 'password'}
      label={label}
      focused={focused}
      color={color}
      variant="outlined"
      error={error}
      helperText={helperText}
      disabled={disabled}
      required={required}
      InputProps={
        showIcon
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    aria-label="toggle-password"
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityOnIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : { 'aria-label': '' }
      }
    />
  );
}

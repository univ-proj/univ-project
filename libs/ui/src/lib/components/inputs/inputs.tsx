import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import VisibilityOffIcon from '../../icons/visibility-off-icon/visibility-off-icon';
import VisibilityOnIcon from '../../icons/visibility-on-icon/visibility-on-icon';
/* eslint-disable-next-line */
export interface InputsProps {
  focused: boolean;
  color: 'error' | 'primary';
  label: 'Email' | 'Password';
  disabled: boolean;
  error: boolean;
  required: boolean;
  helperText: string;
  placeholder: string;
  type: 'text' | 'password';
  value: string;
  onChange: any;
  name: string;
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

  const ShowIcon = type === 'password';
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      label={label}
      focused={focused}
      color={color}
      variant="outlined"
      error={error}
      helperText={helperText}
      disabled={disabled}
      required={required}
      InputProps={
        ShowIcon
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

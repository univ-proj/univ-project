import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { SetStateAction, useState } from 'react';
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
}: InputsProps) {
  const [value, setValue] = useState('');
  const [showPassword, setshowPassword] = useState(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const ShowIcon = type === 'password';
  return (
    <TextField
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={value}
      onChange={handleChange}
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

// import styles from './primary-button.module.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

/* eslint-disable-next-line */
export interface PrimaryButtonProps {
  Icon: React.ReactNode;
  isWithIcon: boolean;
  text: string;
  size: string;
  type: string;
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const DefaultButton = styled(Button)({
    width: `${props.size === 'large' ? '382px' : '160px'} `,
    height: '40px',
    borderRadius: '4px',
    backgroundColor: `${props.type === 'primary' ? '#6247AA' : 'white'}`,
    color: `${props.type === 'primary' ? '#e5e5e5' : '#6247AA'}`,
    border: `${props.type === 'primary' ? null : '1px solid #6247AA'}`,
    fontSize: '14px',
    '&:hover': {
      backgroundColor: `${props.type === 'primary' ? '#8372B4' : null}`,
      border: `${props.type === 'primary' ? null : '1px solid #8372B4'}`,
      color: `${props.type === 'primary' ? null : '#8372B4'}`,
    },
  });
  return (
    <DefaultButton startIcon={props.isWithIcon ? props.Icon : null}>
      {props.text}
    </DefaultButton>
  );
};

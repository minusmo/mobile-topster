import styled from "styled-components";
import Box from '@mui/material/Box'

type IInput = {
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  onchange: (value: string) => void;
};

export const Input = ({
  type,
  label,
  value, 
  onchange,
  placeholder,
}: IInput): JSX.Element => {
  return (
    <Box sx={{
      display: 'flex'
    }}>
      <label
        htmlFor="input-value"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onchange(e.target.value)} 
      />
    </Box>
  );
};

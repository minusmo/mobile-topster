import styled from "styled-components";

type IToggle = {
  label: string;
  value: boolean;
  ontoggle: (value: boolean) => void;
};

const PreferenceToggle = styled.div`
  width: 100%;
  height: 20px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ToggleLabel = styled.label`
  font-weight: 500;
`;

const ToggleCheckbox = styled.input`
  height: 100%;
  aspect-ratio: 1/1;
`

export const Toggle = ({
  label,
  value, 
  ontoggle,
}: IToggle): JSX.Element => {
  return (
    <PreferenceToggle>
      <ToggleLabel htmlFor={'titles-checkbox'}>
        {label}
      </ToggleLabel>
      <ToggleCheckbox
        id={'titles-checkbox'}
        type="checkbox"
        onChange={() => ontoggle(!value)}
        checked={value}
      />
    </PreferenceToggle>
  );
};

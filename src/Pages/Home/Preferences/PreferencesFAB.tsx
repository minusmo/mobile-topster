import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { IconButton } from '../../../components/IconButton';
import styled from "styled-components";

type IPreferencesFAB = {
  togglePreferences: () => void;
}

const RightFloatFAB = styled(IconButton)`
  position: fixed;
  bottom: 20vh;
  right: 5px;

  &:hover {
    background-color: lime;
  }
`;

export const PreferencesFAB = ({
  togglePreferences,
}: IPreferencesFAB) => {
  return (
    <RightFloatFAB onClick={() => {togglePreferences();}}>
        <AdjustmentsHorizontalIcon width={'5vw'} height={'5vw'}/>
    </RightFloatFAB>
  );
};

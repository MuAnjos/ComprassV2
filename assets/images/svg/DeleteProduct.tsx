import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

interface DeleteProp {
  onPress: () => void;
}
export const Delete = ({onPress}: DeleteProp) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={29} height={28} viewBox="0 0 29 28" fill="none">
        <Path
          d="M0 0H21C25.4183 0 29 3.58172 29 8V28H8C3.58172 28 0 24.4183 0 20V0Z"
          fill="#FF0024"
        />
        <Path
          d="M19.375 9.5L18.7243 19.5107C18.6673 20.3875 18.6388 20.8259 18.4542 21.1583C18.2916 21.451 18.0464 21.6863 17.7509 21.8332C17.4153 22 16.9868 22 16.13 22H12.8699C12.0132 22 11.5848 22 11.2491 21.8332C10.9536 21.6863 10.7084 21.451 10.5458 21.1583C10.3612 20.8259 10.3327 20.3875 10.2757 19.5107L9.625 9.5M8 9.5H21M17.75 9.5L17.5301 8.82339C17.317 8.16771 17.2104 7.83987 17.0128 7.59748C16.8383 7.38344 16.6142 7.21777 16.361 7.11565C16.0743 7 15.7374 7 15.0635 7H13.9365C13.2626 7 12.9257 7 12.639 7.11565C12.3858 7.21777 12.1617 7.38344 11.9872 7.59748C11.7895 8.16771 11.683 8.16771 11.4699 8.82339L11.25 9.5M16.125 12.8333V18.6667M12.875 12.8333V18.6667"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

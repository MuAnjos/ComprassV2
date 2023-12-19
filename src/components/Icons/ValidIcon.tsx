import {SvgXml} from 'react-native-svg';

export function ValidIcon() {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_111_4927)">
    <path d="M9.03809 16.6234L4.53383 11.648L3 13.3303L9.03809 20L22 5.68233L20.477 4L9.03809 16.6234Z" fill="#2AA952"/>
  </g>
  <defs>
    <clipPath id="clip0_111_4927">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

  return <SvgXml xml={markup} />;
}

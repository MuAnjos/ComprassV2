import {SvgXml} from 'react-native-svg';

export function LeftIcon() {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 22" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.316498 11.7467C-0.105499 11.334 -0.105499 10.6671 0.316498 10.2533L10.3319 0.447869C10.9411 -0.14929 11.9322 -0.14929 12.5425 0.447869C13.1517 1.04503 13.1517 2.01421 12.5425 2.61136L3.97489 11.0005L12.5425 19.3876C13.1517 19.9858 13.1517 20.955 12.5425 21.5521C11.9322 22.1493 10.9411 22.1493 10.3319 21.5521L0.316498 11.7467Z" fill="white"/>
  </svg>`;

  return <SvgXml xml={markup} />;
}

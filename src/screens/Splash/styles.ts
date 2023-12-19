import styled from 'styled-components/native';
import {Platform, StatusBar} from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: #111213;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.SafeAreaView`
  margin-bottom: 17px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

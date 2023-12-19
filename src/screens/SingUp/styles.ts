import styled from 'styled-components/native';
import {Platform, StatusBar} from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: #111213;
  flex: 1;
`;

export const ButtonsContainer = styled.SafeAreaView`
  margin: 48px 0 0 0;
`;

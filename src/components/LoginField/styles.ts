import styled from 'styled-components/native';
import {Platform} from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
  height: 64px;
  margin: 8px 16px;
  padding-top: 26px;
  padding-left: 16px;
  background: ${({isSubmitting}) => isSubmitting ? '#B6B6B6' : '#FFF'};
  border-radius: 12px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, ${isAndroid ? 0.5 : 0.05});
  elevation: 1;
`;

export const Input = styled.TextInput`
  color: #2d2d2d;
  padding-right: 16px;
  font-size: 14px;
  line-height: 20px;
`;

export const IconContainer = styled.TouchableOpacity`
`;


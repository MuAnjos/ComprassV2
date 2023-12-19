import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  checking?: boolean;
}

export function Button({ children, onPress, disabled, checking, ...rest }: ButtonProps) {
  return (
    <Container
      onPress={onPress}
      activeOpacity={0.7}
      {...rest}
      disabled={disabled}
    >
      <Text weight="800" color="#FFF">
        {checking ? (
          <ActivityIndicator size="large" animating={true} color="#FFF" />
        ) : (
          children
        )}
      </Text>
    </Container>
  );
}

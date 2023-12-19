import {Text} from '../Text';
import {Container} from './style';

interface ButtonProps {
  children: string;
  onPress?: () => void;
}

export function SubText({children, onPress}: ButtonProps) {
  return (
    <Container onPress={onPress}>
      <Text weight="600" size={16} color="#FFF">{children}</Text>
    </Container>
  );
}

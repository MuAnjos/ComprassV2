import { LeftIcon } from '../Icons/LeftArrow';
import { Container } from './styles';

interface LeftArrowProps {
  onPress?: () => void;
}

export function LeftArrow({onPress}: LeftArrowProps) {
  return (
    <Container onPress={onPress}>
      <LeftIcon/>
    </Container>
  );
}

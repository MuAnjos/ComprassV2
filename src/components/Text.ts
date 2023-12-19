import styled from 'styled-components/native';

interface TextProps {
  weight?: '400' | '600' | '700' | '800';
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight }) => weight ? `OpenSans-${weight}` : 'OpenSans-400'};
  color: ${({ color }) => color || '#000'};
  font-size: ${({ size }) => size ? `${size}px` : '16px'};
  opacity: ${({ opacity }) => opacity || 1};
`;

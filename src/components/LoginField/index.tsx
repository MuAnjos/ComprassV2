import React from 'react';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container, IconContainer, Input } from './styles';
import { StyleSheet } from 'react-native';
import { FieldError } from 'react-hook-form';
import { ValidIcon } from '../Icons/ValidIcon';
import { ClosedEye } from '../Icons/ClosedEye';
import { OpenEye } from '../Icons/OpenEye';

interface LoginFieldProps {
  children: string;
  isInvalid: FieldError | undefined;
  showIcon: boolean;
  onChangeText: () => void;
  isPassword?: boolean;
  value: string;
  isSubmitting?: boolean;
  editable?: boolean;
  isEmailCheck?: boolean;
}

export function LoginField({
  children,
  isInvalid,
  showIcon,
  onChangeText,
  isPassword,
  value,
  isSubmitting,
  isEmailCheck,
  ...rest
}: LoginFieldProps) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Container
      style={ isInvalid && styles.isInvalid}
      isSubmitting={isSubmitting}
    >
      <Text
        size={11}
        color={isInvalid ? '#EA6275' : '#9B9B9B'}
        style={[styles.fieldName, isFocused && styles.focusedFieldName]}
      >
        {children}
      </Text>
      <Input
        onChangeText={onChangeText}
        secureTextEntry={isPassword && isSecureEntry}
        value={value}
        onFocus={handleFocus}
        onBlur={!value ? handleBlur : null}
        editable={!isSubmitting}
        {...rest}
      />

      {isPassword ? (
        <IconContainer
          style={styles.Icon}
          onPress={() => {
            setIsSecureEntry((prev) => !prev);
          }}
        >
          {isSecureEntry ? <ClosedEye /> : <OpenEye />}
        </IconContainer>
      ) : (
        <></>
      )}

      {isEmailCheck && isSubmitting ? (
        <IconContainer style={styles.Loader}>
          {isInvalid ? (
            <ActivityIndicator size="large" color="#EA6275" animating={false} />
          ) : isSubmitting ? (
            <ActivityIndicator size="large" color="#FF0024" animating={true} />
          ) : (
            <ValidIcon />
          )}
        </IconContainer>
      ) : (
        <></>
      )}

    </Container>
  );
}

const styles = StyleSheet.create({
  fieldName: {
    position: 'absolute',
    left: 16,
    top: 22,
    fontSize: 14,
    color: '#9B9B9B',
  },
  focusedFieldName: {
    top: 12,
    fontSize: 12,
  },
  isValid: {
    borderWidth: 2,
    borderColor: '#2AA952',
  },
  isInvalid: {
    borderWidth: 2,
    borderColor: '#EA6275',
  },
  Icon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  Loader: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  Transparent: {
    display: 'none',
  },
});

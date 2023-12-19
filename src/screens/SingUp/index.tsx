import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ButtonsContainer, Container } from './styles';
import { Button } from '../../components/Button';
import { LoginField } from '../../components/LoginField';
import { Text } from '../../components/Text';
import { LeftArrow } from '../../components/LeftArrow';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const schema = yup.object({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Name can only contain letters, numbers, and spaces',
    )
    .required('Please complete all fields'),
  email: yup
    .string()
    .email('Your email is not valid')
    .required('Please complete all fields'),
  password: yup
    .string()
    .min(6, 'Your password must be longer than 6 digits.')
    .required('Please complete all fields'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Your password is not the same as your confirmation',
    )
    .required('Please complete all fields'),
});

export function SignUpScreen() {
  const [isFontsLoaded] = useFonts({
    'OpenSans-400': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-600': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-700': require('../../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-800': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (!isFontsLoaded) {
    return null;
  }

  function handleSignUp(data: any) {
    setIsSubmitting(true);

    const { name, email, password } = data;

    const userData = {
      name: name,
      email: email,
      password: password,
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
    };

    fetch('https://api.escuelajs.co/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <>
      <StatusBar
        backgroundColor="#111213"
        translucent
        barStyle={'light-content'}
      />
      <Container>
        <ImageBackground
          source={require('../../assets/img/CompassBackgroundLogo.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          resizeMode="contain"
        >
          <LeftArrow onPress={() => navigation.goBack()} />

          <Text size={32} weight={800} color="#FFF" style={styles.Title}>
            Sign Up
          </Text>
          <Text size={16} color="#FFF" style={styles.Description}>
            Choose a really cool name that only contains spaces as special
            characters. Oh, and your password must have more than 4 digits! :)
          </Text>
          <Controller
            control={control}
            name="name"
            render={({
              formState: { isSubmitted },
              field: { onChange, value, ...rest },
            }) => (
              <LoginField
                isInvalid={errors.name}
                showIcon={isSubmitted}
                onChangeText={onChange}
                value={value}
              >
                Name
              </LoginField>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({
              formState: { isSubmitted },
              field: { onChange, value, ...rest },
            }) => (
              <LoginField
                isInvalid={errors.email}
                showIcon={isSubmitted}
                onChangeText={onChange}
                value={value}
              >
                Email
              </LoginField>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              formState: { isSubmitted },
              field: { onChange, value, ...rest },
            }) => (
              <LoginField
                isInvalid={errors.password}
                showIcon={isSubmitted}
                onChangeText={onChange}
                value={value}
                isPassword={true}
              >
                Password
              </LoginField>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({
              formState: { isSubmitted },
              field: { onChange, value, ...rest },
            }) => (
              <LoginField
                isInvalid={errors.confirmPassword}
                showIcon={isSubmitted}
                onChangeText={onChange}
                value={value}
                isPassword={true}
              >
                Confirm Password
              </LoginField>
            )}
          />

          {errors.name && (
            <Text size={14} color="#EA6275" style={styles.ErrorsText}>
              {errors.name?.message}
            </Text>
          )}

          {!errors.name && errors.email && (
            <Text size={14} color="#EA6275" style={styles.ErrorsText}>
              {errors.email?.message}
            </Text>
          )}

          {!errors.name && !errors.email && errors.password && (
            <Text size={14} color="#EA6275" style={styles.ErrorsText}>
              {errors.password?.message}
            </Text>
          )}

          {!errors.name &&
            !errors.email &&
            !errors.password &&
            errors.confirmPassword && (
              <Text size={14} color="#EA6275" style={styles.ErrorsText}>
                {errors.confirmPassword?.message}
              </Text>
            )}
          <ButtonsContainer>
            <Button
              onPress={handleSubmit(handleSignUp)}
              disabled={isSubmitting}
            >
              SIGN UP
            </Button>
          </ButtonsContainer>
        </ImageBackground>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  Title: {
    marginLeft: 16,
  },
  Description: {
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  ErrorsText: {
    marginLeft: 16,
  },
});

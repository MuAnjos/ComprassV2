import AsyncStorage from '@react-native-async-storage/async-storage';

export const isAuthenticated = () => {
  AsyncStorage.getItem('accessToken').then((accessToken) => {
    return (accessToken)
  });
}

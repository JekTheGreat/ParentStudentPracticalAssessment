import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Otp from '../../components/otp/Otp';
import parents_students from '../../api';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreenProps} from '../../navigation/AppNavigator';
import {ParentModel} from '../../models/models';

const Login = () => {
  const navigation = useNavigation<NavigationScreenProps<'Login'>>();
  const [parentList, setParentList] = useState<ParentModel[]>([]);
  const [mobile, setMobile] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onChange = (text: string) => {
    setError('');
    const mobileRegex = /^[0-9]*$/;
    const isValidMobile = mobileRegex.test(text);
    if (isValidMobile) setMobile(text);
  };

  const onLogin = async () => {
    const test = parentList.filter(item => item.phone_number.replace(/-/g, '') === mobile && item.pin === otp);
    if (test.length === 0) {
      setError('Account not found.');
    } else {
      navigation.replace('Home', {id: test[0]?.id});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parentList = await parents_students.getParentList();
        setParentList(parentList);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);
  console.log('parentList', parentList);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            value={mobile}
            onChangeText={onChange}
            keyboardType="number-pad"
          />

          <Otp
            length={4}
            setOTP={otp => {
              setError('');
              setOTP(otp);
            }}
          />

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          {error !== '' && <Text style={styles.error}>{error}</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {width: '100%', rowGap: 32},
  input: {height: 60, borderWidth: 1, borderColor: 'lightslategrey', borderRadius: 10, paddingHorizontal: 12},
  button: {
    height: 50,
    backgroundColor: 'deepskyblue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {fontWeight: '700', color: 'white', fontSize: 18},
  error: {fontWeight: '400', color: 'red', fontSize: 14},
});

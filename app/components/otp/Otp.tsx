import {FlatList, StyleSheet, TextInput, View, Dimensions, NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
import React, {useRef, useState} from 'react';
const {width} = Dimensions.get('screen');

interface OTPModel {
  key: string;
}

interface OTPProps {
  length: number;
  setOTP: (otp: string) => void;
}

const Otp = (props: OTPProps) => {
  const {length, setOTP} = props;
  const [otpLength, setOTPLength] = useState<Array<OTPModel>>(Array(length).fill({key: ''}));
  const inputRef = useRef<TextInput[]>([]);

  const onChange = (input: string, index: number) => {
    const numberRegex = /[^0-9]/g;
    if (numberRegex.test(input)) return;
    const newOTP = [...otpLength];
    newOTP[index] = {key: input.replace(numberRegex, '')};
    setOTPLength(newOTP);
    const resultNumber = newOTP.map(item => item.key).join('');
    setOTP(resultNumber);
    if (input.length >= 1 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const renderItem = ({item, index}: {item: OTPModel; index: number}) => {
    const borderColor = {
      borderColor: inputRef.current[index]?.isFocused() || otpLength[index].key ? 'deepskyblue' : 'black',
    };

    return (
      <View key={`otp_idx${index}`} style={[styles.inputContainer, borderColor]}>
        <TextInput
          ref={ref => (inputRef.current[index] = ref!)}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={item.key}
          onChangeText={input => onChange(input, index)}
          onKeyPress={e => handleBackPress(e, index)}
          onBlur={() => {
            if (!item.key) inputRef?.current[index]?.blur();
          }}
          onFocus={() => {
            if (!item.key) inputRef?.current[index]?.focus();
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.inputList}
        data={otpLength}
        keyExtractor={(_, index) => `otp_idx${index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {maxHeight: 120, width: '100%', backgroundColor: 'white'},
  inputList: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {borderBottomWidth: 2, paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, alignItems: 'center'},
  input: {fontSize: 20, fontWeight: '700', textAlign: 'center', color: 'black'},
});

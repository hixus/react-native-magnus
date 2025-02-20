import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Div, ThemeProvider, Radio, Text} from 'react-native-magnus';

const App = () => {
  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Div m="lg">
          <Radio.Group row>
            {['Option 1', 'Option 2', 'Option 3'].map((item) => (
              <Radio value={item}>
                {({checked}) => (
                  <Div
                    bg={checked ? 'blue600' : 'blue100'}
                    px="xl"
                    py="md"
                    mr="md"
                    rounded="circle">
                    <Text color={checked ? 'white' : 'gray800'}>{item}</Text>
                  </Div>
                )}
              </Radio>
            ))}
          </Radio.Group>
        </Div>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;

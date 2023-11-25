import React, { useState } from 'react';
import {
  SafeAreaView,

  StyleSheet,
} from 'react-native';

import Home from './home/Home';
import Detail from './detail/Detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './config/routeParam';
import { Provider } from 'react-redux';
import { store } from './redux/store';



const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  // const [detailUrl, setDetailUrl] = useState<string | null>(null)

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background : {

  }
});

export default App;

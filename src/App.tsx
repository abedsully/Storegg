import React from 'react';
import Home from './home/Home';
import Detail from './detail/Detail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './config/routeParam';
import MyProduct from './myproduct/MyProduct';
import {ProductProvider} from './myproduct/ProductContext';
import MyCoin from './coin/MyCoin';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="MyProduct" component={MyProduct} />
          <Stack.Screen name="MyCoin" component={MyCoin} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
};

export default App;

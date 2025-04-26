import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen from './screens/AddExpenseScreen';
import ViewExpenseScreen from './screens/ViewExpenseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='AddExpense' component={AddExpenseScreen}/>
        <Stack.Screen name='ViewExpense' component={ViewExpenseScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
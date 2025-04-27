import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddExpenseScreen from './screens/AddExpenseScreen';
import ViewExpenseScreen from './screens/ViewExpenseScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='AddExpense' component={AddExpenseScreen} options={{ tabBarLabel: 'Add Expense'}} />
        <Tab.Screen name='ViewExpense' component={ViewExpenseScreen} options={{ tabBarLabel: 'View Expense'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    AddExpense: undefined;
    ViewExpense: undefined;
  };
  
  type AddExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddExpense'>;
  
  type Props = {
    navigation: AddExpenseScreenNavigationProp;
  };

export default function AddExpenseScreen({ navigation }: Props){
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Add Your Expense
            </Text>
            <TextInput style={styles.input} placeholder="Amount" />
            <TextInput style={styles.input} placeholder="Item" />
            <TextInput style={styles.input} placeholder="Category" />
            <TextInput style={styles.input} placeholder="Description" />
            <TextInput style={styles.input} placeholder="Date" />
            <Button title="View Expenses" onPress={()=>{navigation.navigate('ViewExpense')}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      header: {
        fontSize: 24,
        marginBottom: 20,
      },
      input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
})
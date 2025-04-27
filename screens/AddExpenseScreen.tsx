import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, Alert, Platform, Pressable } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import {env} from 'expo-env';

type RootStackParamList = {
    AddExpense: undefined;
    ViewExpense: undefined;
};

type AddExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddExpense'>;

type Props = {
    navigation: AddExpenseScreenNavigationProp;
};

export default function AddExpenseScreen({ navigation }: Props) {
    const [amount, setAmount] = useState('');
    const [item, setItem] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddClick = async () => {
        if (!amount || !item || !date) {
            Alert.alert('Error', 'Amount, Item, and Date are required.');
            return;
        }

        if (isNaN(Number(amount))) {
            Alert.alert('Error', 'Amount must be a valid number.');
            return;
        }

        // Start loading
        setLoading(true);

        try {
          console.log("Date: "+date)
          console.log("Date: "+date.toISOString().split('T')[0])
            const response = await fetch(env.APPSCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    item,
                    category,
                    description,
                    year: date.getFullYear(), // formatted YYYY-MM-DD
                    month: date.getMonth(),
                    dte: date.getDate(),
                    action: 'addExpenses'
                }),
            });

            const data = await response.json();
            console.log('Server response:', data);
            if (data.status != "error") {
                Alert.alert('Success', 'Expense added successfully!');
                // Reset the form
                setAmount('');
                setItem('');
                setCategory('');
                setDescription('');
                setDate(new Date());
            } else {
                Alert.alert('Error', 'Failed to add expense.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios'); // On Android, close automatically
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Your Expense</Text>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Item"
                value={item}
                onChangeText={setItem}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                <Text>{date.toISOString().split('T')[0]}</Text>
            </Pressable>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Add" onPress={handleAddClick} />
            )}
        </View>
    );
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
    datePicker: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

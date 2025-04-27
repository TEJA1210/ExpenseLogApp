import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';  // Install this if not installed: expo install @react-native-picker/picker
import { Ionicons } from '@expo/vector-icons';          // For refresh icon
import {env} from 'expo-env';

type RootStackParamList = {
  AddExpense: undefined;
  ViewExpense: undefined;
};

type ViewExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewExpense'>;

type Props = {
  navigation: ViewExpenseScreenNavigationProp;
};

export default function ViewExpenseScreen({ navigation }: Props) {
  const [month, setMonth] = useState<string>(new Date().toLocaleString('default', { month: 'long' }));
  const [year, setYear] = useState<string>(String(new Date().getFullYear()));
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState<{ category: string, amount: number }[]>([]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch(env.APPSCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'fetchExpenses', month, year }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setExpenseData(data.expenses);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch expenses.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Month Picker */}
        <Picker
          selectedValue={month}
          style={styles.picker}
          onValueChange={(itemValue: string) => setMonth(itemValue)}
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((m) => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>

        {/* Year Picker */}
        <Picker
          selectedValue={year}
          style={styles.picker}
          onValueChange={(itemValue: string) => setYear(itemValue)}
        >
          {["2023", "2024", "2025"].map((y) => (
            <Picker.Item key={y} label={y} value={y} />
          ))}
        </Picker>

        {/* Refresh Button */}
        <TouchableOpacity onPress={fetchExpenses} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={expenseData}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.amountText}>₹ {item.amount}</Text>
            </View>
          )}
        />
      )}

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  picker: { flex: 1, height: 50 },
  refreshButton: { padding: 10 },
  expenseItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  categoryText: { fontSize: 16 },
  amountText: { fontSize: 16, fontWeight: 'bold' },
});

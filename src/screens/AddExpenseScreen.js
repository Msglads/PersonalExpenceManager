// src/screens/AddExpenseScreen.js
//
// CREATE screen: form to add a new expense to Firestore.

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { addExpense } from "../services/expenseService";

const CATEGORIES = ["Food", "Transportation", "School", "Snacks", "Others"];

const todayString = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(todayString());
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Info", "Please enter an expense name.");
      return;
    }
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert("Missing Info", "Please enter a valid amount.");
      return;
    }
    if (!date.trim()) {
      Alert.alert("Missing Info", "Please enter a date.");
      return;
    }

    try {
      setSaving(true);
      await addExpense({ title: title.trim(), amount, category, date });
      navigation.goBack();
    } catch (error) {
      console.log("Error adding expense:", error);
      Alert.alert("Error", "Could not save expense. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.screenTitle}>Add Expense</Text>

        <Text style={styles.label}>Expense Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lunch"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 120"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                category === cat && styles.categoryChipSelected,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  category === cat && styles.categoryChipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          placeholder="2026-06-17"
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  form: {
    padding: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipSelected: {
    backgroundColor: "#1565C0",
    borderColor: "#1565C0",
  },
  categoryChipText: {
    color: "#444",
    fontWeight: "600",
    fontSize: 13,
  },
  categoryChipTextSelected: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#1565C0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 28,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

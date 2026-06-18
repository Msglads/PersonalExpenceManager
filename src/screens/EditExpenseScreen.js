// src/screens/EditExpenseScreen.js
//
// UPDATE / DELETE screen: pre-filled form to edit an existing expense,
// with an Update button and a Delete button.

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
import { updateExpense, deleteExpense } from "../services/expenseService";

const CATEGORIES = ["Food", "Transportation", "School", "Snacks", "Others"];

export default function EditExpenseScreen({ route, navigation }) {
  const { expense } = route.params;

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount));
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleUpdate = async () => {
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
      await updateExpense(expense.id, {
        title: title.trim(),
        amount,
        category,
        date,
      });
      navigation.goBack();
    } catch (error) {
      console.log("Error updating expense:", error);
      Alert.alert("Error", "Could not update expense. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      `Are you sure you want to delete "${expense.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);
              await deleteExpense(expense.id);
              navigation.goBack();
            } catch (error) {
              console.log("Error deleting expense:", error);
              Alert.alert("Error", "Could not delete expense.");
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.screenTitle}>Edit Expense</Text>

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
          placeholder="e.g. 150"
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
          style={styles.updateButton}
          onPress={handleUpdate}
          disabled={saving || deleting}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.updateButtonText}>Update</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          disabled={saving || deleting}
        >
          {deleting ? (
            <ActivityIndicator color="#C62828" />
          ) : (
            <Text style={styles.deleteButtonText}>Delete</Text>
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
  updateButton: {
    backgroundColor: "#1565C0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 28,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#FFEBEE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  deleteButtonText: {
    color: "#C62828",
    fontSize: 16,
    fontWeight: "700",
  },
});

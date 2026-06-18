// src/screens/HomeScreen.js
//
// Main screen: shows the list of all expenses (READ),
// lets the user navigate to Add Expense, Edit an expense, or Delete one.

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ExpenseCard from "../components/ExpenseCard";
import { getExpenses, deleteExpense } from "../services/expenseService";

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log("Error loading expenses:", error);
      Alert.alert("Error", "Could not load expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reload every time the screen comes into focus
  // (so it refreshes after adding/editing/deleting)
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  const handleEdit = (expense) => {
    navigation.navigate("EditExpense", { expense });
  };

  const handleDelete = (expense) => {
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
              await deleteExpense(expense.id);
              setExpenses((prev) => prev.filter((e) => e.id !== expense.id));
            } catch (error) {
              console.log("Error deleting expense:", error);
              Alert.alert("Error", "Could not delete expense.");
            }
          },
        },
      ]
    );
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Personal Expense Manager</Text>
        <Text style={styles.headerSubtitle}>
          Total: ₱{total.toFixed(2)}
        </Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1565C0" />
        </View>
      ) : expenses.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No expenses yet.</Text>
          <Text style={styles.emptySubText}>
            Tap "+ Add Expense" below to record your first one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              expense={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 90 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: "#1565C0",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#E3F2FD",
    fontSize: 14,
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  emptySubText: {
    fontSize: 13,
    color: "#888",
    marginTop: 6,
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: "#1565C0",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

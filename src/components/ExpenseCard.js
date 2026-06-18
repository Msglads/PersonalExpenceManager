// src/components/ExpenseCard.js
//
// Displays a single expense as a card with Edit and Delete buttons.
// Used inside the FlatList on HomeScreen.

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CATEGORY_COLORS = {
  Food: "#FFB74D",
  Transportation: "#4FC3F7",
  School: "#9575CD",
  Snacks: "#F06292",
  Others: "#90A4AE",
};

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  const badgeColor = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Others;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.amount}>₱{Number(expense.amount).toFixed(2)}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{expense.category}</Text>
        </View>
        <Text style={styles.date}>{expense.date}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(expense)}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(expense)}>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#E3F2FD",
    marginRight: 8,
  },
  editBtnText: {
    color: "#1565C0",
    fontWeight: "600",
  },
  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#FFEBEE",
  },
  deleteBtnText: {
    color: "#C62828",
    fontWeight: "600",
  },
});

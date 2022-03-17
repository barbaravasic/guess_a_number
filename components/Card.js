import React from "react";
import { View, StyleSheet } from "react-native";

export const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    // ios properties
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // android property
    elevation: 5,
  },
});

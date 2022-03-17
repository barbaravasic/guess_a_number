import React from "react";
import { Text, StyleSheet } from "react-native";

export const BodyText = ({ children }) => {
  return <Text style={styles.body}>{children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});

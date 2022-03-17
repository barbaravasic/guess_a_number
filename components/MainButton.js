import React from "react";
import colors from "../constants/colors";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const MainButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity="0.8">
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
  },
});

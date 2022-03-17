import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { TitleText } from "./TitleText";

export const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <TitleText>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
});

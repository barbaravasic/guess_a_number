import React from "react";
import colors from "../constants/colors";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { BodyText } from "./BodyText";

export const MainButton = ({ children, onPress, buttonStyle, textStyle }) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={onPress} activeOpacity="0.8">
        <View style={{ ...styles.button, ...buttonStyle }}>
          <BodyText style={{ ...styles.buttonText, ...textStyle }}>
            {children}
          </BodyText>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    textAlign: "center",
  },
});

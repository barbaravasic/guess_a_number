import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const GameOverScreen = ({ roundsNum, userNum, onStartNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {roundsNum}</Text>
      <Text>Number was: {userNum}</Text>
      <Button title={"Start New Game"} onPress={onStartNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

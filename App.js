import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "./components/Header";
import { GameScreen } from "./screens/GameScreen";
import { StartGameScreen } from "./screens/StartGameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const content = userNumber ? (
    <GameScreen userChoice={userNumber} />
  ) : (
    <StartGameScreen onStartGame={startGameHandler} />
  );

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

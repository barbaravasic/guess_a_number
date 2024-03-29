import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";

import { BodyText } from "../components/BodyText";
const generateRandomBetween = (min, max, exclude) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min) + min);

  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const renderListItem = (value, numOfRound) => {
  return (
    <View key={numOfRound} style={styles.listItem}>
      <BodyText>#{numOfRound}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};

export const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses?.length);
    }
  }, [pastGuesses, currentGuess, userChoice]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { title: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((prevGuesses) => [nextNumber, ...prevGuesses]);
  };

  if (availableDeviceHeight < 450) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.bodyText}>Opponent's Guess:</Text>
        <View style={styles.controls}>
          <MainButton
            onPress={() => {
              nextGuessHandler("lower");
            }}
            buttonStyle={availableDeviceHeight > 450 ? 120 : 130}
            textStyle={{
              fontSize: availableDeviceWidth > 420 ? 14 : 12,
            }}
          >
            LOWER
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>

          <MainButton
            onPress={() => {
              nextGuessHandler("greater");
            }}
            buttonStyle={availableDeviceHeight > 450 ? 120 : 130}
            textStyle={{
              fontSize: availableDeviceWidth > 420 ? 14 : 12,
            }}
          >
            GREATER
          </MainButton>
        </View>
        <View
          style={{
            ...styles.listContainer,
            width: availableDeviceWidth > 350 ? "60%" : "80%",
          }}
        >
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>Opponent's Guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          marginTop: availableDeviceHeight > 600 ? 20 : 10,
        }}
      >
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
          buttonStyle={availableDeviceHeight > 450 ? 120 : 130}
          textStyle={{
            fontSize: availableDeviceWidth > 420 ? 14 : 12,
          }}
        >
          LOWER
        </MainButton>

        <MainButton
          onPress={() => {
            nextGuessHandler("greater");
          }}
          buttonStyle={availableDeviceHeight > 450 ? 120 : 130}
          textStyle={{
            fontSize: availableDeviceWidth > 420 ? 14 : 12,
          }}
        >
          GREATER
        </MainButton>
      </Card>
      <View
        style={{
          ...styles.listContainer,
          width: availableDeviceWidth > 350 ? "60%" : "80%",
        }}
      >
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    maxWidth: 400,
  },
  listContainer: {
    flex: 1,
  },
  button: {
    width: 120,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

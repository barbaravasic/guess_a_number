import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { BodyText } from "../components/BodyText";
import { MainButton } from "../components/MainButton";
import { TitleText } from "../components/TitleText";

export const GameOverScreen = ({ roundsNum, userNum, onStartNewGame }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: deviceWidth * 0.7,
            height: deviceWidth * 0.7,
            marginVertical: deviceHeight / 20,
            borderRadius: (deviceWidth * 0.7) / 2,
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
            }}
            // source={require("../assets/success.png")}
            resizeMode="cover"
          />
        </View>
        <BodyText>Number of rounds: {roundsNum}</BodyText>
        <BodyText>Number was: {userNum}</BodyText>
        <MainButton onPress={onStartNewGame}>Start New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderWidth: 3,
    overflow: "hidden",
    borderColor: "black",
  },
});

import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import IconBag from "../assets/output-onlinepngtools.png";
import * as Animatable from "react-native-animatable";

const SpliceScreen = ({ ...props }) => {
  // const { store, auth } = useSelector((state) => state);
  // const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.push(auth.loggedIn ? "Home" : "Login");
  //   }, 2000);
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3692ad",
      }}
    >
      {/* <View style={{ flex: 1, backgroundColor: "#3692ad" }}></View> */}
      <Animatable.View
        style={styles.titleText}
        animation="fadeInUp"
        delay={1200}
      >
        <Image source={IconBag} style={{ height: 50, width: 50 }} />
        <Text style={[styles.titleText, { textAlign: "center" }]}>E-Shop</Text>
      </Animatable.View>
    </View>
  );
};

export default SpliceScreen;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather as Icon } from "@expo/vector-icons";
import ProductList from "../components/ProductList";
import { productData } from "../data/productData";
import Carousel from "../components/Carousel.js";

const Home=()=> {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#3692ad");
  }, []);

  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <View
        style={[
          styles.arrangeProductsBar,
          {
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={styles.header}>
          <Icon name="menu" color={"#fff"} size={30} />
          <Text
            style={[
              styles.headerTitle,
              { color: "#fff", fontWeight: "bold", fontSize: 22 },
            ]}
          >
            Shop
          </Text>
          <Icon name="shopping-bag" color={"#fff"} size={26} />
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <Icon name="search" color={"#3692ad"} size={26} />
          <TextInput style={{ paddingVertical: 4, width: "80%" }} />
        </View>
      </View>
      <ScrollView>
        <Carousel/>
        {productData.map((product) => (
          <TouchableOpacity
            onPress={() => navigation.push("ProductDetail", { product })}
          >
            <ProductList product={product} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrangeProductsBar: {
    backgroundColor: "#3692ad",
    borderBottomColor: "#dfe4ea",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  arrangeProductsBarItemOpacity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrangeProductsBarItemLabel: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  iconCountView: {
    position: "absolute",
    zIndex: 2,
    right: -4,
    top: -4,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "red",
  },
  iconCountText: { color: "#fff", fontWeight: "bold" },
});

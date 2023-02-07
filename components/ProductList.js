import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon as RNEIcon } from "react-native-elements";

import { useFonts } from "expo-font";

const ProductList = ({ product }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginTop: 10,
        borderBottomColor: "#dfe4ea",
        borderBottomWidth: 1,
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Image
            resizeMode="contain"
            style={{ width: 100, height: 150 }}
            source={{ uri: product.img }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <View>
            <Text>{product.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#3692ad",
                  alignItems: "center",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    marginRight: 8,
                    fontSize: 16,
                  }}
                >
                  {product.rating}
                </Text>
                <RNEIcon
                  name="star"
                  type="font-awesome"
                  size={12}
                  color={"#fff"}
                />
              </View>
              <Text style={{ marginLeft: 6 }}>({product.ratingCount})</Text>
            </View>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 16 }}>
              {`₹${product.price}  `}
              <Text
                style={{
                  color: "#57606f",
                  textDecorationLine: "line-through",
                }}
              >
                {product.actualPrice !== "" ? `₹${product.actualPrice}` : null}
              </Text>
              <Text style={{ color: "green" }}>{`  ${product.discount}`}</Text>
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RNEIcon
              name="tag"
              color={"#3692ad"}
              type="font-awesome"
              size={16}
            />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              {product.offer}
            </Text>
          </View>
          {/* <View
            style={{
              marginTop: 4,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {product.specifications.map((spec, i) => (
              <Text
                style={{
                  marginTop: 4,
                  marginBottom: 4,
                  marginLeft: 4,
                  marginRight: 4,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  alignSelf: "baseline",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
                key={i}
              >
                {spec}
              </Text>
            ))}
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({});

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import CarouselItem from "./CarouselItem";

const { width, heigth } = Dimensions.get("window");

function infiniteScroll(dataList) {
  const numberOfData = dataList.length;
  let scrollValue = 0,
    scrolled = 0;

  setInterval(function () {
    scrolled++;
    if (scrolled < numberOfData) scrollValue = scrollValue + width;
    else {
      scrollValue = 0;
      scrolled = 0;
    }

    this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
  }, 3000);
}

const Carousel = ({ data }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const banerImage = [
    { url: require("../assets/watch.jpg") },
    { url: require("../assets/Screenshot_20230205_175141.png") },
    {
      url: require("../assets/laptop-new-arrival-sales-banner-1-5fe0c47813869.png"),
    },
  ];
  const [dataList, setDataList] = useState(banerImage);

  useEffect(() => {
    setDataList(banerImage);
    infiniteScroll(dataList);
  });

  if (banerImage && banerImage.length) {
    return (
      <View>
        <FlatList
          data={banerImage}
          ref={(flatList) => {
            this.flatList = flatList;
          }}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={item} />;
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />

        <View style={styles.dotView}>
          <View style={{width:100,flexDirection:"row"}}>
          {banerImage.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 12,
                  width: 12,
                  backgroundColor: "#3692ad",
                  margin: 8,
                  borderRadius: 6,
                }}
              />
            );
          })}
          </View>
        </View>
      </View>
    );
  }

  console.log("Please provide Images");
  return null;
};

const styles = StyleSheet.create({
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right:0,
    overflow: "hidden",

  },
});

export default Carousel;

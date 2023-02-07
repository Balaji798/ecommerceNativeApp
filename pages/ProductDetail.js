import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { moreProduct } from "../data/moreProduct";
import { Feather as Icon, FontAwesome as FAIcon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { productData } from "../data/productData";
import ProductList from "../components/ProductList";

const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array(rating)
        .fill(1)
        .map((el, index) => (
          <FAIcon name="star" size={20} color="#3692ad" key={index} />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el, index) => (
          <FAIcon name="star-o" size={20} color="#3692ad" key={index} />
        ))}
    </View>
  );
};

const ProductDetail = (props) => {
  console.log(props.route.params.product);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [isFavourite, setFavourite] = useState(false);
  const [size] = useState([
    { id: 1, label: "S" },
    { id: 1, label: "M" },
    { id: 1, label: "L" },
    { id: 1, label: "XL" },
  ]);

  const [selectedSize, setSelectedSize] = useState("M");

  const [productDescription] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ornare urna. Duis egestas ligula quam, ut tincidunt ipsum blandit at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo congue, tempor urna vitae, placerat elit. Nulla nec consectetur dolor, in convallis erat. Fusce hendrerit id sem tristique congue. \n\nVestibulum mauris sapien, vulputate in lacus in, lacinia efficitur magna. Sed id massa ut magna eleifend lacinia et id tellus. Sed dignissim mollis lacus. Etiam laoreet ex eu sem euismod congue. In maximus porttitor imperdiet. Nulla eu dolor vehicula ligula mollis tristique ut in enim. Phasellus quis tempor velit. Vivamus sit amet orci ornare, pulvinar purus et, commodo magna. Nunc eu tortor vitae leo varius vehicula quis volutpat dolor.\n\nDonec interdum rutrum tellus, et rhoncus risus dignissim at. Aliquam sed imperdiet tortor, non aliquam sapien. Cras quis enim a elit fringilla vehicula. Aenean pulvinar ipsum a magna feugiat, a fermentum ante pellentesque. Mauris tincidunt placerat placerat. Quisque tincidunt enim sed metus fermentum maximus. Fusce eu tempus est.`
  );

  const [seeFullDescription, setSeeFullDescription] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#3692ad");
  }, []);

  // const options = {
  //   description: "Credits towards consultation",
  //   image: "https://i.imgur.com/3g7nmJC.png",
  //   currency: "INR",
  //   key: "rzp_test_caPeBz83XZXcHt", // Your api key
  //   amount: "5000",
  //   name: "foo",
  //   prefill: {
  //     email: "void@razorpay.com",
  //     contact: "9191919191",
  //     name: "Razorpay Software",
  //   },
  //   theme: { color: "#F37254" },
  // };

  // const makePayment = () => {
  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // handle success
  //       alert(`Success: ${data.razorpay_payment_id}`);
  //     })
  //     .catch((error) => {
  //       // handle failure
  //       alert(`Error: ${error.code} | ${error.description}`);
  //     });
  // };

  return (
    <>
      <View
        style={[
          styles.header,
          { backgroundColor: "#3692ad", paddingTop: insets.top },
        ]}
      >
        <Icon
          name="arrow-left"
          color={"#fff"}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[
            styles.headerTitle,
            {
              color: "#fff",
              width: "92.5%",
              textAlign: "center",
              fontWeight: "bold",
            },
          ]}
        >
          Product Detail
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{ height: 400, width: "100%", resizeMode: "contain" }}
          source={{
            uri: props.route.params.product.img,
          }}
        />
        <View style={styles.detailsView}>
          <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>
              {props.route.params.product.name}
            </Text>
            <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
              <FAIcon
                name={isFavourite ? "heart" : "heart-o"}
                color={"#3692ad"}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productPriceView}>
            <Text style={styles.discountedPriceText}>
              ₹ {props.route.params.product.price}
            </Text>
            <Text style={styles.actualPriceText}>
              ₹ {props.route.params.product.actualPrice}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Rating rating={4} maxRating={5} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,

                marginBottom: 10,
              }}
            >
              Size:
            </Text>
            <View style={{ flexDirection: "row" }}>
              {size.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={
                    selectedSize === s.label ? styles.tagSelected : styles.tag
                  }
                  onPress={() => setSelectedSize(s.label)}
                >
                  <Text
                    style={
                      selectedSize === s.label
                        ? styles.tagLabelSelected
                        : styles.tagLabel
                    }
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={[styles.buyNowButton, { backgroundColor: "#3692ad" }]}
            onPress={() => {}}
          >
            <Text style={[styles.buttonText]}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={[styles.buttonText, { color: "#111" }]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, backgroundColor: "#fff" }}>
          <TouchableOpacity
            style={styles.productDescriptionHeader}
            onPress={() => setSeeFullDescription((prev) => !prev)}
          >
            <Text style={{ fontSize: 18 }}>Product Description</Text>
            <TouchableOpacity
              onPress={() => setSeeFullDescription((prev) => !prev)}
            >
              {seeFullDescription ? (
                <Icon name="chevron-up" size={26} />
              ) : (
                <Icon name="chevron-down" size={26} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Text>
              {seeFullDescription
                ? `${productDescription}`
                : `${productDescription.split("\n")[0]}`}
            </Text>
          </View>
        </View>
        <Text
            style={{
              fontSize: 20,
              marginHorizontal: 10,
              paddingTop:10
            }}
          >
            Simlier Product
          </Text>
        <ScrollView>
          {productData.map((product) => (
            <TouchableOpacity
             onPress={() => navigation.push("ProductDetail", { product })}
            >
              <ProductList product={product} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 10,
            }}
          >
            More Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
              {moreProduct.map((item, index) => (
                <View style={{ width: 180, marginHorizontal: 10 }} key={index}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.productImage,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.productName}
                    </Text>
                    <View style={styles.moreProductPriceView}>
                      <Text style={styles.moreProductPrice}>
                      ₹{item.productPrice}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name="heart"
                          size={18}
                          color={"#3692ad"}
                        />
                        <Icon
                          style={styles.moreProductIcon}
                          name="shopping-bag"
                          size={18}
                          color={"#3692ad"}
                        />
                        <Icon
                          style={styles.moreProductIcon}
                          name="share"
                          size={18}
                          color={"#3692ad"}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreProductBuyButton}>
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </>
  );
};
export default ProductDetail;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderBottomColor: "#dfe4fe",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  productTitle: {
    fontSize: 24,
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPriceText: { fontSize: 20 },
  actualPriceText: {
    color: "#3692ad",
    marginLeft: 10,
    textDecorationLine: "line-through",
    fontSize: 18,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#3692ad",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  tag: {
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    color: "#333",
  },
  tagSelected: {
    backgroundColor: "#3692ad",
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    color: "#FFF",
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4fe",
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
  },
  moreProductName: {
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: "#3692ad",
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  moreProductBuyButtonText: {
    color: "#fff",

    fontSize: 18,
  },
});

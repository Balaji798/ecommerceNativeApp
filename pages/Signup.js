import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import IconBag from "../assets/output-onlinepngtools.png";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import { useState } from "react";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signup = ()=>{
    createUserWithEmailAndPassword(auth,email,password,userName).then((userCredential)=>{
      console.log("Account Created");
      const user = userCredential.user;
      console.log(user)
      
    }
    ).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar color={"#fff"} />
        <View style={{ flex: 1, backgroundColor: "#3692ad" }}></View>
        <Animatable.View
          style={styles.titleText}
          animation="fadeInUp"
          delay={1200}
        >
          <Image source={IconBag} style={{ height: 70, width: 70 }} />
          <Text style={[styles.titleText, { textAlign: "center" }]}>
            E-Shop
          </Text>
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Signup</Text>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name="person"
              type="ionicons"
              color="#3692ad"
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name="email"
              type="ionicons"
              color="#3692ad"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              //secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name="lock"
              type="ionicons"
              color="#3692ad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            //onPress={facebookLogIn}
            onPress={signup}
          >
            <Text style={styles.loginButtonText}>Signup</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", paddingTop: 10 }}>
            Already have an account!{" "}
            <Text
              style={{ padding: 5, color: "#3692ad" }}
              onPress={() => navigation.push("Login")}
            >
              Login
            </Text>
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
              paddingHorizontal: 2,
              justifyContent: "center",
            }}
          >
            <View
              style={{ height: 1, width: "47%", backgroundColor: "#3692ad" }}
            />
            <Text
              style={{
                fontWeight: "bold",
                paddingHorizontal: 5,
                fontSize: 14,
                color: "#3692ad",
              }}
            >
              or
            </Text>
            <View
              style={{ height: 1, width: "47%", backgroundColor: "#3692ad" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                borderWidth: 1.5,
                borderColor: "#3692ad",
                paddingHorizontal: 15,
                borderRadius: 10,
                paddingVertical: 5,
                flexDirection: "row",
                width: "49%",
              }}
              onPress={() => navigation.push("Signup")}
            >
              <Icon name="google" type="font-awesome" color={"#3692ad"} />
              <Text style={{ color: "#3692ad" }}>Signup With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                borderWidth: 1.5,
                borderColor: "#3692ad",
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 5,
                flexDirection: "row",
                width: "49%",
              }}
              onPress={() => navigation.push("Signup")}
            >
              <Icon name="facebook" type="font-awesome" color={"#3692ad"} />
              <Text style={{ color: "#3692ad" }}>Signup With Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.07,
    alignSelf: "center",
    color: "#fff",
    fontSize: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    backgroundColor: "#fff",
    opacity: 0.95,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#3692ad",
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    paddingHorizontal: 8,
    color: "#3692ad",
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#3692ad",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 18,
  },
  registerText: {
    alignSelf: "center",
    marginTop: 12,
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#3692ad",
  },
});

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
} from "react-native";
import "expo-dev-client";
//import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as LocalAuthentication from "expo-local-authentication";
import { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import IconBag from "../assets/output-onlinepngtools.png";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import {EXPOCLIENTD,ANDROIDCLIENTD,IOSCLIENTID} from "@env"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userData, setUserData] = useState("");
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPOCLIENTD,
    androidClientId: ANDROIDCLIENTD,
    iosClientId: IOSCLIENTID,
  });

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  console.log(response)
  useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && getUserData();
    }
  }, [response, accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log("hii", userInfoResponse);

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  let [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function authenticate() {
      const result = await LocalAuthentication.authenticateAsync();
      setIsAuthenticated(result.success);
    }
    authenticate();
  }, []);
  console.log(isAuthenticated, accessToken);
  const loginWithFb = async () => {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      throw new Error("User Cancelled Login");
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error("Something went wrong obtaining access token");
    }

    const credential = FacebookAuthProvider.credential(data.accessToken);
    const user = await signInWithCredential(auth, credential);
    console.log(user);
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Log In Successful");
          setUserData(userCredential.user);
          //console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(userData.stsTokenManager.accessToken);
      if (userData.stsTokenManager.accessToken != undefined) {
        navigation.push("Home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "#3692ad" }}></View>
        <Animatable.View
          style={styles.titleText}
          animation="fadeInUp"
          delay={1200}
        >
          <Image source={IconBag} style={{ height: 50, width: 50 }} />
          <Text style={[styles.titleText, { textAlign: "center" }]}>
            E-Shop
          </Text>
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Login</Text>
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
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
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
          <Text style={styles.fpText}>Forgot Password?</Text>
          <TouchableOpacity
            style={styles.loginButton}
            //onPress={facebookLogIn}
            onPress={login}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", paddingTop: 10 }}>
            Don't have an account?{" "}
            <Text
              style={{ padding: 5, color: "#3692ad" }}
              onPress={() => navigation.push("Signup")}
            >
              Register
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
              onPress={() => {
                promptAsync();
                if (accessToken && isAuthenticated) {
                  navigation.push("Home");
                }
              }}
            >
              <Icon name="google" type="font-awesome" color={"#3692ad"} />
              <Text style={{ color: "#3692ad" }}>Login With Google</Text>
            </TouchableOpacity>
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
              onPress={loginWithFb}
            >
              <Icon name="facebook" type="font-awesome" color={"#3692ad"} />
              <Text style={{ color: "#3692ad" }}>Login With Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    paddingBottom: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
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
    width: "100%",
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

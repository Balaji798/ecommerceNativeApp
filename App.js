import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProductDetail"
          component={ProductDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

{
  /*
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

//web:"627092049194-bgog1oph91e29ucmmost7ok6psfrd2oe.apps.googleusercontent.com"
export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "627092049194-bgog1oph91e29ucmmost7ok6psfrd2oe.apps.googleusercontent.com",
    androidClientId:
      "627092049194-77ttfmraavt8kfu4b6bdr5jhcsp17f1r.apps.googleusercontent.com",
    iosClientId:
      "694235095257-qnub27n3o6s0e3lo1sneio03o6ka5k9m.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && getUserData();
    }
  },[response,accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    //console.log("hii",userInfoResponse);

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  console.log("hiii", userInfo);

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          promptAsync();
        }}
      >
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
      {userInfo !== undefined && (
        <Image
          source={{ uri: userInfo.picture }}
          resizeMode="cover"
          style={{ width: 100, height: 100,borderRadius:50 }}
        />
      )}
      {userInfo !== undefined && <Text>{userInfo.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
 */
}

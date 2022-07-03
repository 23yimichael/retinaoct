import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Provider } from "urql";
import LandingStack from "./components/LandingStack";
import Layout from "./components/Layout";
import TabNavigator from "./components/TabNavigator";
import Splash from "./screens/splash";
import { context } from "./utils/context";
import { loadFonts } from "./utils/loadFonts";
import { sleep } from "./utils/sleep";
import { client } from "./utils/urqlClient";

const App = () => {
  let [fontsLoaded] = loadFonts();
  const [user, setUser] = useState(null);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }

      await sleep(2000).then(() => setSplash(false));
    })();
  }, []);

  if (!fontsLoaded) {
    return (
      <Layout>
        <ActivityIndicator
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Layout>
    );
  }

  if (fontsLoaded && splash) {
    return (
      <>
        <StatusBar style="dark" />
        <Splash />
      </>
    );
  }

  return (
    <Provider value={client}>
      <context.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <StatusBar style="dark" />
          {user ? <TabNavigator /> : <LandingStack />}
        </NavigationContainer>
      </context.Provider>
    </Provider>
  );
};

export default App;

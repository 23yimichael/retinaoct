import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import Settings from "../screens/settings";
import CreatePatientStack from "./CreatePatientStack";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const TabNavigator: FC = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0075FF",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={25}
              color={focused ? "#0075FF" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePatientStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add"
              size={25}
              color={focused ? "#0075FF" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="gear"
              size={25}
              color={focused ? "#0075FF" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

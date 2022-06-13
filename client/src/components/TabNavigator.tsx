import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import CreatePatient from "../screens/create-patient";
import Home from "../screens/home";
import Scans from "../screens/scans";
import Settings from "../screens/settings";
import PatientsStack from "./PatientsStack";

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
        component={Home}
        options={{
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
        name="Patients"
        component={PatientsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="folder-account"
              size={25}
              color={focused ? "#0075FF" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Patient"
        component={CreatePatient}
        options={{
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
        name="Scans"
        component={Scans}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="folder"
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

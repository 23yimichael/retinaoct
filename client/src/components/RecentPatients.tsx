import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetRecentPatientsQuery } from "../generated/graphql";
import { context } from "../utils/context";
import RecentPatient from "./RecentPatient";

const RecentPatients = () => {
  const { user } = useContext(context);
  const [{ data, fetching }] = useGetRecentPatientsQuery({
    variables: {
      doctorId: user,
    },
  });

  if (fetching) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {!data && !fetching ? (
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="exclamation-circle" size={50} />
          <Text
            style={{
              marginTop: 12,
              fontFamily: "Montserrat-SemiBold",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            You have no patients!
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <RecentPatient patient={data?.getRecentPatients[0]} />
            <RecentPatient patient={data?.getRecentPatients[1]} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <RecentPatient patient={data?.getRecentPatients[2]} />
            <RecentPatient patient={data?.getRecentPatients[3]} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 192,
  },
});

export default RecentPatients;

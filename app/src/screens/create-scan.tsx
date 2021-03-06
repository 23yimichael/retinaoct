import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import BackButton from "../components/BackButton";
import DiagnosisDropdown from "../components/DiagnosisDropdown";
import Layout from "../components/Layout";
import { useCreateScanMutation, useGetAiMutation } from "../generated/graphql";
import { context } from "../utils/context";
import { process } from "../utils/tf";
import { Navigation, Patient } from "../utils/types";

interface Props {
  navigation: Navigation;
  route: {
    params: {
      image: {
        uri: string;
        width: number;
        height: number;
      };
      patient: Patient;
    };
  };
}

const CreateScan: React.FC<Props> = ({ navigation, route }) => {
  const { image, patient } = route.params;
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState("");
  const [ai, setAi] = useState(false);
  const [note, setNote] = useState("");
  const [text, setText] = useState("");
  const { user } = useContext(context);
  const [, createScan] = useCreateScanMutation();
  const [, getAi] = useGetAiMutation();

  useEffect(() => {
    (async () => {
      const response = await getAi({ id: user });
      setAi(response.data?.getAi ? response.data.getAi : false);
      if (response.data?.getAi) {
        const result = await process(image);
        console.log(result);
        setDiagnosis(result);
      }
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    if (diagnosis === "Other") {
      setDiagnosis(text);
    }
    if (diagnosis.length === 0) {
      Alert.alert("Error", "You must make a diagnosis!");
      return;
    }
    const result = await createScan({
      uri: image.uri,
      diagnosis,
      note,
      doctorId: user,
      patientId: patient.id,
    });
    console.log(result);

    Alert.alert("Success!", "Scan successfully uploaded!");
    navigation.goBack();
  };

  if (loading) {
    return (
      <Layout>
        <ActivityIndicator
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
        </View>
        <View style={{ alignItems: "center", marginTop: 64 }}>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 300, height: 300, borderRadius: 15 }}
          />
          <Text
            style={{
              fontFamily: "Montserrat-Medium",
              fontSize: 24,
              marginTop: 12,
            }}
          >
            {format(new Date(), "P p")}
          </Text>
          {loading ? (
            <ActivityIndicator
              style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : null}
          {!loading && ai ? <Text>AI Diagnosis: {diagnosis}</Text> : null}
          <DiagnosisDropdown value={diagnosis} setValue={setDiagnosis} />
          {diagnosis === "Other" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                width: "100%",
                backgroundColor: "#E5E5E5",
                borderRadius: 20,
                padding: 18,
              }}
            >
              <Ionicons name="person" size={25} color="#999999" />
              <TextInput
                value={text}
                onChangeText={setText}
                style={{
                  flex: 1,
                  color: "#999999",
                  fontSize: 16,
                  marginLeft: 15,
                  fontFamily: "Montserrat-Regular",
                }}
                placeholder="Custom Diagnosis"
                placeholderTextColor="#999999"
              />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#E5E5E5",
              borderRadius: 20,
              paddingHorizontal: 18,
              paddingTop: 18,
              paddingBottom: 96,
            }}
          >
            <Ionicons name="person" size={25} color="#999999" />
            <TextInput
              multiline
              value={note}
              onChangeText={setNote}
              blurOnSubmit
              style={{
                flex: 1,
                color: "#999999",
                fontSize: 16,
                marginLeft: 15,
                fontFamily: "Montserrat-Regular",
              }}
              placeholder="Enter Scan Note"
              placeholderTextColor="#999999"
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Upload Scan
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 128 }} />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    zIndex: 1,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
    padding: 18,
    marginTop: 12,
    backgroundColor: "#B6DCFE",
    justifyContent: "center",
  },
});

export default CreateScan;

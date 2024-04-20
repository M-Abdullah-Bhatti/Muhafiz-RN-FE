import { useState } from "react";
import { Text, TextInput } from "react-native";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const InputAutoComplete = ({ placeholder, onPlaceSelected, styling }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <SafeAreaView>
        <GooglePlacesAutocomplete
          key={`input-${placeholder}`}
          styles={{ textInput: styling }}
          placeholder={placeholder || ""}
          fetchDetails={true}
          onPress={(data, details = null) => {
            onPlaceSelected(details);
            setInputValue(data.description);
          }}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          textInputProps={{
            value: inputValue,
            onChangeText: setInputValue,
          }}
          listEmptyComponent={() => (
            <View style={{ flex: 1, marginBottom: 4 }}>
              <Text>No results were found</Text>
            </View>
          )}
          query={{
            key: "AIzaSyBKX6FzffGaFn0xkKbx_jyRDN1UDPXzy30",
            language: "pt-BR",
            components: "country:pk",
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default InputAutoComplete;

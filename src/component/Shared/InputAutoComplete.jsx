import { SafeAreaView, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const InputAutoComplete = ({ placeholder, onPlaceSelected, styling }) => {
  return (
    <>
      <SafeAreaView>
        <GooglePlacesAutocomplete
          key={`input-${placeholder}`}
          styles={{ textInput: styling }}
          placeholder={placeholder || ""}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log("Autocomplete onPress triggered", details);
            onPlaceSelected(details);
          }}
          // onPress={(data, details = null) => console.log(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          query={{
            key: "AIzaSyBKX6FzffGaFn0xkKbx_jyRDN1UDPXzy30",
            language: "pt-BR",
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

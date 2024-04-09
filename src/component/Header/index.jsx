import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Signout } from "../../store/actions/auth";
import { useFonts } from "expo-font";
import Icon, { Icons } from "../Icons";
import color from "../../styles/color";
import { useSelector } from "react-redux";

const headerImage = require("../../assets/images/police.png");

// const NameBar = ({ navigation }) => {
//   // const [fontsLoaded] = useFonts({
//   //   MontserratBlack: require("../../../../assets/Montserrat-Black.ttf"),
//   //   MontserratBold: require("../../../../assets/Montserrat-Bold.ttf"),
//   //   MontserratExtraBold: require("../../../../assets/Montserrat-ExtraBold.ttf"),
//   //   MontserratSemiBold: require("../../../../assets/Montserrat-SemiBold.ttf"),
//   //   MontserratRegular: require("../../../../assets/Montserrat-Regular.ttf"),
//   // });
//   // if (!fontsLoaded) {
//   //   return undefined;
//   // }
//   return <Header navigation = {navigation} />;
// };

// export default NameBar;

const Header = ({ navigation, setOpen, screen }) => {
  const auth = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(Signout());
  };
  return (
    <View style={styles.header}>
      {screen === "Home" ? null : <BackButton navigation={navigation} />}
      <HeaderTitle name={auth.userData.name} />
      {screen === "Account" ? (
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
        >
          <Icon
            name={"ellipsis-v"}
            type={Icons.FontAwesome}
            color={color.orange}
          />
        </TouchableOpacity>
      ) : (
        <ImageContainer
          image={headerImage}
          navigation={navigation}
          onLogout={onLogout}
        />
      )}
    </View>
  );
};

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon
      type={Icons.MaterialCommunityIcons}
      name={"arrow-left"}
      color={color.orange}
    />
  </TouchableOpacity>
);

const ImageContainer = ({
  image,
  height = "100%",
  width = "100%",
  navigation,
  onLogout,
}) => (
  <TouchableOpacity
    style={styles.imageContainer}
    onPress={() => {
      onLogout();
    }}
  >
    {/* <Image source={image} style={[{ height, width }]} /> */}
    <Icon type={Icons.FontAwesome} name={"sign-out"} color={color.orange} />
  </TouchableOpacity>
);

const HeaderTitle = ({ name }) => (
  <View style={styles.title}>
    <Text style={styles.bigTitle}>Hi,  {name}</Text>
    <Text style={styles.smallTitle}>{Date()}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { paddingHorizontal: 10, flex: 1, justifyContent: "center" },

  bigTitle: { fontSize: 16, fontFamily: "" },

  smallTitle: { fontSize: 10, opacity: 0.6 },
});

export default Header;

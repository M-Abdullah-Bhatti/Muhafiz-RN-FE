import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStact from "./AuthStact";
import MainStack from "./MainStack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Init } from "../store/actions/auth";
import MapWithButtons from "../screens/MapWithButtons/MapWithButtons";
import PostScreen from "../screens/PostScreen/PostScreen";
import CrimeReportScreen from "../screens/Crime Buttons/CrimeReportScreen";
import ReportAnIncident from "../screens/ReportAnIncident/ReportAnIncident";
import CaseAssessment from "../screens/CaseAssessment/CaseAssessment";
import CrimeTracking from "../screens/CrimeTracking/CrimeTracking";
import NewContact from "../screens/NewContact/NewContact";
import ConnectWithAuth from "../screens/Connectwithauth/ConnectWithAuth";
import Incidents from "../screens/Incidents/Incidents";
import EditProfile from "../screens/EditProfile/EditProfile";

const Stack = createNativeStackNavigator();

function Routes() {
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const init = () => {
    dispatch(Init());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth.isAuthenticated ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          AuthStact(Stack)
        )}

        <Stack.Screen name="MapWithButtons" component={MapWithButtons} />
        {/* <Stack.Screen name="CrimeReportScreen" component={MainStack} /> */}
        <Stack.Screen name="CreateAPost" component={PostScreen} />
        <Stack.Screen name="CrimeReportScreen" component={CrimeReportScreen} />
        <Stack.Screen name="ReportAnIncident" component={ReportAnIncident} />
        <Stack.Screen name="CaseAssessment" component={CaseAssessment} />
        <Stack.Screen name="CrimeTracking" component={CrimeTracking} />
        <Stack.Screen name="NewContact" component={NewContact} />
        <Stack.Screen name="ConnectWithAuth" component={ConnectWithAuth} />
        <Stack.Screen name="Incidents" component={Incidents} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

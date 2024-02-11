import OnBoarding from "../screens/onBoardingScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import SendEmail from "../screens/ForgotPassword/sendEmailScreen";
import OtpScreen from "../screens/ForgotPassword/OtpScreen";
import ChangePasswordScreen from "../screens/ForgotPassword/ChangePasswordScreen";
import SuccessScreen from "../screens/ForgotPassword/SuccessScreen";


export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
            />
            <Stack.Screen
                name="SendEmail"
                component={SendEmail}
            />
            <Stack.Screen
                name="OtpScreen"
                component={OtpScreen}
            />
            <Stack.Screen
                name="changePasswordScreen"
                component={ChangePasswordScreen}
            />
            <Stack.Screen
                name="SuccessScreen"
                component={SuccessScreen}
            />
        </>
    )
};
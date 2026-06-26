import { useAppContext } from "../../../context/AppContext";
import { ThemeTokens } from "../../../../hooks/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationInbox } from "./NotificationPage";

const Stack = createNativeStackNavigator();

export function NotificationPage() {
  const { selectedTheme } = useAppContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 80,
        cardStyle: { backgroundColor: ThemeTokens.colors.dark.background },
        contentStyle: { backgroundColor: ThemeTokens.colors.dark.background },
      }}
    >
      <Stack.Screen name='notifications'>
        {(props) => (
          <NotificationInbox
            selectedTheme={selectedTheme}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
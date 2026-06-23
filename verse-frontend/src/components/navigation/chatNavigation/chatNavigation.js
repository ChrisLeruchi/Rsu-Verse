import { useAppContext } from "../../../context/AppContext";
import { ThemeTokens } from "../../../../hooks/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatList } from "../../chat_room/ChatList";
import { ChatRoom } from "../../chat_room/ChatRoom";

const Stack = createNativeStackNavigator();

export function Chat() {
  const { selectedTheme, setSelectedTheme } = useAppContext();
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
      <Stack.Screen name='ChatList'>
        {(props) => (
          <ChatList
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name='ChatRoom'>
        {(props) => (
          <ChatRoom
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
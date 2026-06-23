import { useAppContext } from "../../../context/AppContext";
import { Market } from "../../market/Market";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export function MarketPlace() {
  const { posts, selectedTheme, setSelectedTheme } = useAppContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MarketPlace'>
        {(props) => (
          <Market
            {...props}
            posts={posts}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
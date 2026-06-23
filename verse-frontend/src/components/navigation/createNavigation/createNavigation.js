import { useAppContext } from "../../../context/AppContext";

import { CreatePost } from "../../create/CreatePost";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function PostCreation() {
  const { setPosts, setActiveFilter, selectedTheme, setSelectedTheme } = useAppContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='CreatePage'>
        {(props) => (
          <CreatePost
            {...props}
            setPosts={setPosts}
            setActiveFilter={setActiveFilter}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
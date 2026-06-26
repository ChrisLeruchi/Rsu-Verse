import { useAppContext } from "../../../context/AppContext";
import { NavBar } from "../navbar/NavBar";
import { HomeStackNavigator } from "../homeNavigator/homeNavigator";
import { SearchStackNavigator } from "../searchNavigation/searchNavigation";
import { PostCreation } from "../createNavigation/createNavigation";
import { Chat } from "../chatNavigation/chatNavigation";
import { MarketPlace } from "../marketNavigation/marketNavigation";
import { NotificationPage } from "../notificationNav/NotificationScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export function BottomTabNavigatorComponent() {
  const { activeTab, setActiveTab, setActiveFilter, selectedTheme, setSelectedTheme } = useAppContext();

  const handlePlusClick = (navigation) => {
    setActiveFilter("plus");
    if (navigation) navigation.navigate("CreatePost");
  };

  return (
    <Tab.Navigator
      tabBar={(props) => {
        const { routes, index } = props.state;
        const topLevelRouteName = routes[index].name;
        const nestedRouteName = getFocusedRouteNameFromRoute(routes[index]);

        if (nestedRouteName === 'Comments' ||
          topLevelRouteName === 'CreatePost' ||
          nestedRouteName === 'Contact_Us' ||
          nestedRouteName === 'Help_Center' ||
          nestedRouteName === 'HelpCenter' ||
          nestedRouteName === 'Privacy_Management' ||
          nestedRouteName === 'Theme_Management' ||
          nestedRouteName === 'Notification' ||
          nestedRouteName === 'Manage_Security' ||
          nestedRouteName === 'Manage_Profile' ||
          nestedRouteName === 'AboutVerse' ||
          nestedRouteName === 'About_Verse' ||
          nestedRouteName === 'ContactUs' ||
          nestedRouteName === 'Contact_Us' ||
          nestedRouteName === 'Settings' ||
          nestedRouteName === 'ChatRoom' ||
          nestedRouteName === 'Profile'
        ) {
          return null;
        }

        return (
          <NavBar
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setActiveFilter={setActiveFilter}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            handlePlusClick={() => handlePlusClick(props.navigation)}
          />
        );
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeIndex" component={HomeStackNavigator} />
      <Tab.Screen name='CreatePost' component={PostCreation} />
      <Tab.Screen name='Search' component={SearchStackNavigator} />
      <Tab.Screen name="Market" component={MarketPlace} />
      <Tab.Screen name="ChatList" component={Chat} />
      <Tab.Screen name="notifications" component={NotificationPage} />
    </Tab.Navigator>
  );
}
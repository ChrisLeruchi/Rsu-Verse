import { View,} from "react-native";
import { NavBarIcons } from "./NavBarIcons";

export function NavBar({activeTab, setActiveTab, handlePlusClick, setActiveFilter, selectedTheme, setSelectedTheme}) {
  return (
    <View>
      <NavBarIcons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveFilter={setActiveFilter}
        onPlusClick={handlePlusClick}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />
    </View>
  )
}
import { View,} from "react-native";
import { NavBarIcons } from "./NavBarIcons";

export function NavBar({activeTab, setActiveTab, handlePlusClick, setActiveFilter}) {
  return (
    <View>
      <NavBarIcons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveFilter={setActiveFilter}
        onPlusClick={handlePlusClick}
      />
    </View>
  )
}
import React from 'react';
import { View } from 'react-native';
import { Header } from './Header';

export function HeaderLayout({ children, activeFilter, setActiveFilter, selectedTheme, setSelectedTheme }) {
  return (
    <View style={{flex: 1}}>
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />
     
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        {children}
      </View>
    </View>
  );
}
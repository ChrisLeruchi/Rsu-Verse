import React from 'react';
import { View } from 'react-native';
import { Header } from './Header';

export function HeaderLayout({ children, activeFilter, setActiveFilter }) {
  return (
    <View className="flex-1 bg-void flex-col">
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
     
      <View className="flex-1 pb-24">
        {children}
      </View>
    </View>
  );
}
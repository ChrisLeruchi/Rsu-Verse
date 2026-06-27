import { useState } from "react";

export function useProfileState() {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [isSellerActive, setIsSellerActive] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorActive, setTwoFactorActive] = useState(false);
  const [biometricsActive, setBiometricsActive] = useState(true);

  return {
    selectedTheme, setSelectedTheme,
    isSellerActive, setIsSellerActive,
    showCurrentPassword, setShowCurrentPassword,
    showNewPassword, setShowNewPassword, twoFactorActive, setTwoFactorActive,
    biometricsActive, setBiometricsActive
  }
}


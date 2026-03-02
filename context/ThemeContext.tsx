import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeId, themeRegistry, defaultUnlockedThemes } from '../themes';
import { darkTheme } from '../themes/dark';

interface ThemeContextValue {
  theme: Theme;
  activeThemeId: ThemeId;
  unlockedThemeIds: ThemeId[];
  setTheme: (id: ThemeId) => void;
  unlockTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: darkTheme,
  activeThemeId: 'dark',
  unlockedThemeIds: defaultUnlockedThemes,
  setTheme: () => {},
  unlockTheme: () => {},
});

const STORAGE_KEY_ACTIVE = 'theme_active';
const STORAGE_KEY_UNLOCKED = 'theme_unlocked';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('dark');
  const [unlockedThemeIds, setUnlockedThemeIds] = useState<ThemeId[]>(defaultUnlockedThemes);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY_ACTIVE);
        const savedUnlocked = await AsyncStorage.getItem(STORAGE_KEY_UNLOCKED);
        if (saved && themeRegistry[saved]) setActiveThemeId(saved);
        if (savedUnlocked) setUnlockedThemeIds(JSON.parse(savedUnlocked));
      } catch {}
    })();
  }, []);

  const setTheme = async (id: ThemeId) => {
    if (!unlockedThemeIds.includes(id)) return;
    setActiveThemeId(id);
    await AsyncStorage.setItem(STORAGE_KEY_ACTIVE, id);
  };

  const unlockTheme = async (id: ThemeId) => {
    if (unlockedThemeIds.includes(id)) return;
    const updated = [...unlockedThemeIds, id];
    setUnlockedThemeIds(updated);
    await AsyncStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(updated));
  };

  return (
    <ThemeContext.Provider value={{
      theme: themeRegistry[activeThemeId] ?? darkTheme,
      activeThemeId,
      unlockedThemeIds,
      setTheme,
      unlockTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

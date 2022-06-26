import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeMode } from '../hooks/useThemeMode';
import { lightTheme, darkTheme } from '../styles/themes';

interface HeaderProps {
    children: any;
  }
  
const ThemeContext: React.FC<HeaderProps> = ({ children }) => {
  const { theme } = useThemeMode();

  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default ThemeContext;
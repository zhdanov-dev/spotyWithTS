export interface ThemeProps {
    background: string;
    text: string;
    color1: string;
    color2: string;
    color3: string;
  }
  
  export const darkTheme: ThemeProps = {
    background: 'var(--dark-background)',
    text: 'var(--dark-text)',
    color1: 'var(--color1D)',
    color2: 'var(--color2D)',
    color3: 'var(--color3D)',
  };
  
  export const lightTheme: ThemeProps = {
    background: 'var(--light-background)',
    text: 'var(--light-text)',
    color1: 'var(--color1L)',
    color2: 'var(--color2L)',
    color3: 'var(--color3L)',
  };
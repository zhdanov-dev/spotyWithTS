import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalThemeProps = {
  theme: ThemeProps;
};

const globalStyle = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background: #111111;
    --dark-text: #eeeeee;

    --color1D: #181818;
    --color2D: #242424;
    --color3D: #121212;

    //light-mode
    --light-background: #ffffff;
    --light-text: #000000;

    --color1L: #f6f6f6;
    --color2L: #e7e7e7;
    --color3L: #dfdfdf;

  body  {
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .header__link {
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }
  
  .text__logo {
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }
  
  .content__track {
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .container {
    background-color: ${({ theme }: GlobalThemeProps) => theme.color1};
  }

  .container:hover {
    background-color: ${({ theme }: GlobalThemeProps) => theme.color2};
    transition: 0.3s;
  }

  .img__tarck {
    box-shadow: 0px 0px 10px 0.5px ${({ theme }: GlobalThemeProps) => theme.color3};
  }

`;

export default withTheme(globalStyle);
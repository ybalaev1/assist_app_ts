export const light = {
  background: '#0887cc',
  text: '#000',
  white: '#fff',
  black: '#424242',
  blue: '#0887cc',
  blueOpacity: 'rgba(152, 212, 234, 0.82)',
  darkblue: '#0B4257',
  gray: '#717876',
  lightgray: '#bababa',
  red: '#f23535',
  green: '#1ad659',
  blackOverlay: 'rgba(0, 0, 0, 0.8)',
  primary: '#fff',
  secondary: '#E5E7EB',
};

export const dark = {
  background: '#0B4257',
  text: '#FFF',
  white: '#0d1420',
  black: '#FFF',
  blue: '#0B4257',
  blueOpacity: 'rgba(152, 212, 234, 0.82)',
  darkblue: '#0887cc',
  gray: '#bababa',
  lightgray: '#717876',
  red: '#f23535',
  green: '#1ad659',
  blackOverlay: 'rgba(0, 0, 0, 0.8)',
  primary: '#fff',
  secondary: 'rgba(152, 212, 234, 0.82)',
};

type Theme = {
  background: typeof dark.background | typeof light.background;
  white: typeof dark.white | typeof light.white;
  black: typeof dark.black | typeof light.black;
  text: typeof dark.text | typeof light.text;
  blue: typeof dark.blue | typeof light.blue;
  red: typeof dark.red | typeof light.red;
  darkblue: typeof dark.darkblue | typeof light.darkblue;
  secondary: typeof dark.secondary | typeof light.secondary;
  gray: typeof dark.gray | typeof light.gray;
  lightgray: typeof dark.lightgray | typeof light.lightgray;
};
export interface CustomThemeProps {
  theme?: Theme;
}

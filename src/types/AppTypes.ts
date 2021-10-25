// eslint-disable-next-line no-undef
export type React$Node = JSX.Element | null;

export type localStorageType = {
  key: string;
  value: string;
  chat_id: string;
  tokenAuth: string[];
  header_auth: string;
};

export type themeApp = {
  theme: string;
};

export type TabIconType = {
  iconName: string;
  color: string;
  sizeIcon: number;
  disabled: boolean;
  isFocused: boolean;
};

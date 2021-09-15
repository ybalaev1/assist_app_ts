import React from "react";

export enum Routes {
  Main,
  Auth,
  BoardComponent,
  Registration,
  News,
  Personal,
  Mail,
  Search,
  SearchUser,
  Info,
  CrntPost,
}

export type RootStackParamList = {
  [Routes.Main]: undefined;
  [Routes.Auth]: undefined;
};

export type OnboardingStackParamList = {
  [Routes.BoardComponent]: undefined;
  [Routes.Auth]: undefined;
  [Routes.Registration]: undefined;
  [Routes.Main]: undefined;
};

export type BottomTabParamList = {
  [Routes.News]: undefined;
  [Routes.Personal]: undefined;
  [Routes.Search]: undefined;
  [Routes.Mail]: undefined;
};

export type NewsParamList = {
  [Routes.News]: undefined;
  [Routes.CrntPost]: {data: any};
};

export type SearchParamList = {
  [Routes.Search]: undefined;
  [Routes.SearchUser]: {id: any};
  [Routes.Info]: undefined;
};

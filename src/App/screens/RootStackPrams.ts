import React from 'react';

enum Routes {
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
  Setting,
  AppInfo,
  FeedBack,
  MailContainer,
  Message,
  GoChat,
}
export type RootStackParamList = {
  [Routes.Main]: React.Component;
  [Routes.Auth]: React.Component;
};

export type OnboardingStackParamList = {
  [Routes.BoardComponent]: React.Component;
  [Routes.Auth]: React.Component;
  [Routes.Registration]: React.Component;
  [Routes.Main]: React.Component;
};

export type BottomTabParamList = {
  [Routes.News]: {
    name: 'News';
  };
  [Routes.Personal]: React.Component;
  [Routes.Search]: React.Component;
  [Routes.Mail]: React.Component;
};

export type NewsParamList = {
  [Routes.News]: React.Component;
  [Routes.CrntPost]: {data: any};
};

export type SearchParamList = {
  [Routes.Search]: React.Component;
  [Routes.SearchUser]: {id: any};
  [Routes.Info]: React.Component;
  [Routes.GoChat]: {data: any};
};

export type PersonParamList = {
  [Routes.Personal]: React.Component;
  [Routes.Setting]: React.Component;
  [Routes.AppInfo]: React.Component;
  [Routes.FeedBack]: React.Component;
  [Routes.CrntPost]: {data: any};
};

export type MailParamList = {
  [Routes.MailContainer]: {chatTitle: string};
  [Routes.Message]: {data: any};
};

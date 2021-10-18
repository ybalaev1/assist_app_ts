interface ChatModel {
  users: string[];
  latestMessage:
    | string
    | {
        iv: string;
        encryptedData: string;
      };
  last_user: string;
  createdAt: Date;
  updatedAt: Date;
}

export {ChatModel};

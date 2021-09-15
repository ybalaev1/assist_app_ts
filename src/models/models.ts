interface User {
  fullName: string;
  email: string;
  password: string;
  information?: string;
  interest?: string;
  mobile_phone: string;
  followers?: string;
  following?: string;
  posts?: string;
  image: string;
}
interface UserInput {
  fullName: User['fullName'];
  email: User['email'];
  password: User['password'];
  mobile_phone: User['mobile_phone'];
}
interface IPost {
  message: string;
  user: string;
  comments: string;
  likes: string;
  image: string;
  id: string;
}

interface Theme {
  theme: string;
}
interface AuthTokenUser {
  id: string;
  accessToken: string;
}
interface RegistIdUser {
  id: string;
}
export {User, IPost, Theme, AuthTokenUser, RegistIdUser, UserInput};

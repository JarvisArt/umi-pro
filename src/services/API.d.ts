declare namespace API {
  export type CurrentUser = {
    id: string;
    account: string;
    name: string;
    email: string;
    description: string;
    allowCreateGroup: boolean;
    role: 'admin' | 'user';
  };
}

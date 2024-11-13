export interface IUser{
    _id:string
    userName: string;
    password: string;
    organization: string;
    location?: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
}

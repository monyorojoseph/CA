export interface AuthDataType {
    email: string;
    password: string;
}

export interface Person {
    email: string;
    id: string;
    full_name: string
}

export interface User {
    email: string;
    id: string;
}

export interface Message {
    id: string;
    sender: Person;
    receiver: Person;
    data: string;
    timestamp: Date;
    read: boolean;
    reaction: string;
}
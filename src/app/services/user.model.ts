export interface User {
    uid: string;
    email: string;
    displayName: string;
    isAdmin: boolean;
    characters?: string[];
}
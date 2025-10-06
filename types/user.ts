export type UserRole = "emplyee" | "hr" | "admin";

export interface User {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    created_at: string,
    role: UserRole
}
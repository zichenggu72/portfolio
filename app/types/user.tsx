// types/user.ts
export interface User {
  name: string;
  description: string;
  // avatarUrl: string | null; // Using null to allow for cases where the user doesn't have an avatar
}

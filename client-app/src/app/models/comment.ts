export interface Comment {
    id: string;
    message: string; // assuming this is your comment content field
    username: string;
    displayName: string;
    image?: string;
    createdAt: Date;
  }
  
export interface ChatMessage {
  id: number;
  message: string;
  created_at: Date;
  user: {
    name: string;
    avatar: string;
  };
}

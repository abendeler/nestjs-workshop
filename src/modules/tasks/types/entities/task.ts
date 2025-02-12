export type Task = {
  id: string;
  completed: boolean;
  creator: string;
  description: string;
  dueDate: Date | null;
  createdDate: Date;
  title: string;
};

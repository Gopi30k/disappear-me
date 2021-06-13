export interface InputContent {
  content?: string;
  type?: string;
  ttl?: number;
  time?: string;
  task_id?: string;
  active?: boolean;
}

export interface TTL {
  time: string;
  ttl_seconds: number;
}
export interface TTL {
  label: string;
  value: number;
}

export interface Result {
  content: string;
  type: string;
  ttl: TTL;
}

export interface UserContent {
  icon?: string;
  date_done: Date;
  id: number;
  result: Result;
  status: string;
  task_id: string;
  traceback?: any;
  user: string;
}

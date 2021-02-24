export interface InputContent {
  content?: string;
  type?: string;
  ttl?: number;
  task_id?: string;
  active: boolean;
}

export interface TTL {
  label: string;
  value: number;
}

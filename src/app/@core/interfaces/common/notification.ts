export interface Notification {
  id: number;
  body: string;
  creation_date: string;
  id_author: string;
  state: string;
  target_id: string;
  target_type: string;
  refresh?: string;
  type: string;
  readed?: string;
}
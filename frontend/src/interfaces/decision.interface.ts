export default interface Decision {
  id: string;
  title: string;
  outcome: number | null;
  importance: number;
  confidence: number;
  user_id: string;
  category_id: string;
}

export interface DecisionResponse {
  data: Decision[];
  pagination: { pageNumber: number; pageSize: number; total: number };
  status: any;
}

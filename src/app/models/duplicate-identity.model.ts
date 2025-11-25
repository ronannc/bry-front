export interface DuplicateIdentity {
  id: number;
  person_id: number;
  duplicate_ids: number[];
  updated_at: string;
  duplicate_persons: Array<{ id: number; name: string }>;
  person: { id: number; name: string };
}

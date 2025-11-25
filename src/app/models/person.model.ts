export interface Person {
  id?: number;
  login: string;
  name: string;
  cpf: string;
  email: string;
  address: string;
  type: string;
  document_path: string;
  document_url: string;
  companies_id?: number[];
}

export interface Card {
  [id: string]: string | undefined;
  id?: string;
  amount?: string;
  card_number?: string;
  currency?: string;
  cvv?: string;
  expire_date?: string;
  card_holder?: string;
  scheme?: string;
  type?: string;
}

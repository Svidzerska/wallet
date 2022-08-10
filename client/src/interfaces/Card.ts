export interface Card {
  amount: string;
  card_number: string;
  currency: string;
  cvv: string;
  expire_date: string;
  card_holder?: string;
}

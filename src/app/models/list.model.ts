export interface Term {
  id: number;
  user: number;
  fr: string;
  nl: string;
  date: string;
  perfectum?: string;
  imperfectum?: string;
}

export interface Choose {
  type: string | null,
  language: string | null,
  date: string | null,
  number: string | null,
}

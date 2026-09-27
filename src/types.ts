export interface SubGroup {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  category: string;
  linha: string;
  papel: string;
  tabela: Array<{ codigo: string; modelo: string; dimensoes: string; qtdFardo: string; cor?: string; }>;
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  subgroups: SubGroup[];
}

export interface Product {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  category: string;
  subgroups?: SubGroup[];
  subcategories?: SubCategory[];
}

export interface Differential {
  number: string;
  title: string;
  description: string;
  badge: string;
}

export interface QuoteFormState {
  fullName: string;
  company: string;
  cnpj: string;
  whatsapp: string;
  monthlyVolume: string;
  productOfInterest: string;
}

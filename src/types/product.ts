export type Settings = {
  id: string;
  page: string;
};

export type SupportInfo = {
  url: string;
  text: string;
};

export type Product = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export type ProductsData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support: SupportInfo;
  data: Product | Product[];
};

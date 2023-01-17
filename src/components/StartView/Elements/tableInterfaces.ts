export interface Data{
  name: string,
  surname: string,
  email: string
}

export interface Column {
  id: 'name' | 'surname' | 'email';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
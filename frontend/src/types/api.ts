export type ApiResponse<T> = { success: boolean; data: T; message?: string };
export type Entity = Record<
  string,
  string | number | boolean | null | undefined
>;
export type FieldType = "text" | "number" | "date" | "email" | "boolean";
export type FormField = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
};
export type TableColumn = {
  key: string;
  label: string;
};

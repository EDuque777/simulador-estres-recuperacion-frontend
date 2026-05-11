export const getFormValue = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

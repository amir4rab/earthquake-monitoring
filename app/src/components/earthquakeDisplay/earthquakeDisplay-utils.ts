export const getDate = (v: number, lang?: string) => {
  const d = new Date(v);

  return d.toLocaleDateString(lang);
}

export const getHour = (v: number, lang?: string) => {
  const d = new Date(v);

  return d.toLocaleTimeString(lang);
}
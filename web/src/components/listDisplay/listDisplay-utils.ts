export const getDate = (v: number, ssr: boolean, lang?: string) => {
  const d = new Date(v);

  if (ssr) return d.toLocaleDateString('de', { timeZone: 'Asia/Tehran' });

  return d.toLocaleDateString(lang);
};

export const getHour = (v: number, ssr: boolean, lang?: string) => {
  const d = new Date(v);

  if (ssr) return d.toLocaleDateString('de', { timeZone: 'Asia/Tehran' });

  return d.toLocaleTimeString(lang);
};

export const setTitle = (text?: string) => {
  const title = 'Primality Tester';
  document.title = text ? `${text} - ${title}` : title;
};

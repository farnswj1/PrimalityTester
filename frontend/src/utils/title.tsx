export const setTitle = (text?: string): void => {
  const title = 'Primality Tester';
  document.title = text ? `${text} - ${title}` : title;
};

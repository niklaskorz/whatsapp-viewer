const trimLeft = 'GraphQL error: ';
export default (message: string): string => {
  if (message.startsWith(trimLeft)) {
    return message.slice(trimLeft.length);
  }
  return message;
};

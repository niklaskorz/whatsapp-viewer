const trimLeft = "GraphQL error: ";
export default function formatError(message: string): string {
  if (message.startsWith(trimLeft)) {
    return message.slice(trimLeft.length);
  }
  return message;
}

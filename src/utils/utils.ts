export function hasKeyword(query: string, keywords: string[]) {
  return keywords.some((keyword) => query.toLowerCase().includes(keyword));
}

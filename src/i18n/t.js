export function t(messages, key) {
  return key
    .split(".")
    .reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), messages) ?? key;
}

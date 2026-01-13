import "server-only";

import en from "../messages/en.json";
import ar from "../messages/ar.json";

const MESSAGES = { en, ar };

export function getMessages(locale) {
  return MESSAGES[locale] ?? MESSAGES.en;
}

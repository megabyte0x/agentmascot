const rawTallyUrl = import.meta.env.VITE_TALLY_URL?.trim();

export const tallyUrl = (() => {
  if (!rawTallyUrl) return null;

  try {
    const url = new URL(rawTallyUrl);
    return url.protocol === "https:" && url.hostname === "tally.so"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
})();

export const agentMascotAppUrl = "https://app.agentmascot.app";
export const macAppDmgUrl = "https://coojbofwpebbwwqpefwr.supabase.co/storage/v1/object/public/default-bucket/Morphling.dmg";

/* ============================================================
   assetPresence — resolves which owner-supplied assets exist,
   driving conditional render. Pure decision logic
   (resolveAssetPresence / isUsableKey) is isolated from
   filesystem/env access for testability (see assetPresence.server.ts).
   ============================================================ */

export type AssetInputs = {
  cvExists: boolean;
  headshotExists: boolean;
  formKey: string | undefined;
};

export type AssetPresence = {
  hasCv: boolean;
  hasHeadshot: boolean;
  hasFormKey: boolean;
};

// The env slot may ship with placeholders like "NA"/"TODO" before the real
// Web3Forms key exists — treat those as "no key" so no broken form renders.
const PLACEHOLDER_KEYS = new Set(['', 'na', 'n/a', 'todo', 'changeme', 'your_key_here']);

export function isUsableKey(key: string | undefined | null): boolean {
  if (!key) return false;
  return !PLACEHOLDER_KEYS.has(key.trim().toLowerCase());
}

export function resolveAssetPresence(inputs: AssetInputs): AssetPresence {
  return {
    hasCv: inputs.cvExists,
    hasHeadshot: inputs.headshotExists,
    hasFormKey: isUsableKey(inputs.formKey),
  };
}

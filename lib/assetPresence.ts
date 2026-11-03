/* ============================================================
   assetPresence — resolves which owner-supplied assets exist,
   driving conditional render. Pure decision logic
   (resolveAssetPresence) is isolated from filesystem access
   for testability (see assetPresence.server.ts).
   ============================================================ */

export type AssetInputs = {
  cvExists: boolean;
  headshotExists: boolean;
};

export type AssetPresence = {
  hasCv: boolean;
  hasHeadshot: boolean;
};

export function resolveAssetPresence(inputs: AssetInputs): AssetPresence {
  return {
    hasCv: inputs.cvExists,
    hasHeadshot: inputs.headshotExists,
  };
}

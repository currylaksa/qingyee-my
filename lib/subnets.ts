/* ============================================================
   subnets — the arithmetic behind the address-plan visuals.
   Kept pure and separate so the allocation bar and the fit
   meters are driven by the same numbers the address table
   shows, and so that arithmetic can be tested (see
   subnets.test.ts) rather than hand-checked in a diagram.
   ============================================================ */

/** Prefix length of a CIDR string: '172.16.36.0/26' → 26. */
export function prefixOf(cidr: string): number {
  const raw = cidr.split('/')[1];
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0 || n > 32) {
    throw new Error(`not a CIDR prefix: ${cidr}`);
  }
  return n;
}

/** Total addresses a block spans, network and broadcast included. */
export function addressesIn(cidr: string): number {
  return 2 ** (32 - prefixOf(cidr));
}

/** Addresses a host can actually be given. A /31 or /32 has no room for
    the network/broadcast pair, so it is reported as-is rather than
    going negative. */
export function usableIn(cidr: string): number {
  const total = addressesIn(cidr);
  return total > 2 ? total - 2 : total;
}

/** How much of a subnet's usable space the room actually needs, 0–1. */
export function utilisation(hosts: number, cidr: string): number {
  return hosts / usableIn(cidr);
}

/** Whole-block accounting for an allocation bar: every block's share of
    the parent, plus whatever is left. Shares are fractions of the parent
    so a caller can lay them out proportionally without repeating the
    arithmetic. */
export function allocationOf(
  parent: string,
  blocks: { name: string; subnet: string }[],
): {
  parentSize: number;
  allocated: number;
  free: number;
  blocks: { name: string; subnet: string; size: number; share: number }[];
  freeShare: number;
} {
  const parentSize = addressesIn(parent);
  const sized = blocks.map((b) => {
    const size = addressesIn(b.subnet);
    return { ...b, size, share: size / parentSize };
  });
  const allocated = sized.reduce((sum, b) => sum + b.size, 0);
  if (allocated > parentSize) {
    throw new Error(
      `blocks total ${allocated} addresses, more than ${parent} holds (${parentSize})`,
    );
  }
  const free = parentSize - allocated;
  return { parentSize, allocated, free, blocks: sized, freeShare: free / parentSize };
}

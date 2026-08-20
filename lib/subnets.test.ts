import { describe, it, expect } from 'vitest';
import {
  prefixOf,
  addressesIn,
  usableIn,
  utilisation,
  allocationOf,
} from './subnets';
import { campusNetwork } from './content';

describe('prefixOf', () => {
  it('reads the prefix length', () => {
    expect(prefixOf('172.16.36.0/26')).toBe(26);
    expect(prefixOf('10.0.0.0/8')).toBe(8);
  });

  it('rejects anything that is not a CIDR prefix', () => {
    expect(() => prefixOf('172.16.36.0')).toThrow();
    expect(() => prefixOf('172.16.36.0/33')).toThrow();
  });
});

describe('addressesIn / usableIn', () => {
  it('sizes the masks the campus plan uses', () => {
    expect(addressesIn('172.16.36.0/26')).toBe(64);
    expect(addressesIn('172.16.36.128/27')).toBe(32);
    expect(addressesIn('172.16.36.192/29')).toBe(8);
    expect(addressesIn('172.16.36.208/30')).toBe(4);
  });

  it('takes the network and broadcast address off the usable count', () => {
    expect(usableIn('172.16.36.0/26')).toBe(62);
    expect(usableIn('172.16.36.128/27')).toBe(30);
    expect(usableIn('172.16.36.192/29')).toBe(6);
    expect(usableIn('172.16.36.208/30')).toBe(2);
  });
});

describe('utilisation', () => {
  it('reports how much of a subnet the room needs', () => {
    // 32 workstations in the Network Lab's /26.
    expect(utilisation(32, '172.16.36.0/26')).toBeCloseTo(32 / 62);
    // The tightest fit in the plan.
    expect(utilisation(25, '172.16.36.128/27')).toBeCloseTo(25 / 30);
  });

  it('never exceeds 1 for any segment in the campus plan', () => {
    for (const s of campusNetwork.segments) {
      if (s.hosts === undefined) continue;
      expect(utilisation(s.hosts, s.subnet)).toBeLessThanOrEqual(1);
    }
  });
});

describe('allocationOf', () => {
  it('accounts for every address in the campus /23', () => {
    const blocks = [
      ...campusNetwork.segments.map((s) => ({ name: s.name, subnet: s.subnet })),
      ...campusNetwork.transitLinks,
    ];
    const a = allocationOf(campusNetwork.parentBlock, blocks);

    expect(a.parentSize).toBe(512);
    expect(a.allocated).toBe(252);
    expect(a.free).toBe(260);
    expect(a.allocated + a.free).toBe(a.parentSize);
  });

  it('shares sum to exactly one', () => {
    const blocks = [
      ...campusNetwork.segments.map((s) => ({ name: s.name, subnet: s.subnet })),
      ...campusNetwork.transitLinks,
    ];
    const a = allocationOf(campusNetwork.parentBlock, blocks);
    const total = a.blocks.reduce((sum, b) => sum + b.share, 0) + a.freeShare;
    expect(total).toBeCloseTo(1, 10);
  });

  it('refuses to over-allocate the parent', () => {
    expect(() =>
      allocationOf('10.0.0.0/30', [
        { name: 'a', subnet: '10.0.0.0/29' },
        { name: 'b', subnet: '10.0.0.8/29' },
      ]),
    ).toThrow(/more than/);
  });
});

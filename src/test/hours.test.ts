import { describe, expect, it } from "vitest";
import { getOpenStatus } from "@/lib/site";

// Build a UTC date from Iquitos local time (UTC-5).
const iq = (y: number, mo: number, d: number, h: number, mi = 0) =>
  new Date(Date.UTC(y, mo - 1, d, h + 5, mi));

describe("opening hours (Iquitos)", () => {
  it("weekday open 07:30–23:00", () => {
    expect(getOpenStatus(iq(2026, 10, 14, 7, 29)).open).toBe(false); // Wed
    expect(getOpenStatus(iq(2026, 10, 14, 7, 30)).open).toBe(true);
    expect(getOpenStatus(iq(2026, 10, 14, 23, 0)).open).toBe(false);
  });
  it("sunday closes between 12:30 and 17:00 and reopens at 17:00", () => {
    expect(getOpenStatus(iq(2026, 10, 18, 12, 0)).open).toBe(true);
    const mid = getOpenStatus(iq(2026, 10, 18, 14, 0));
    expect(mid.open).toBe(false);
    expect(mid.label).toContain("17:00");
    expect(getOpenStatus(iq(2026, 10, 18, 17, 0)).open).toBe(true);
  });
  it("sunday opens at 08:00", () => {
    expect(getOpenStatus(iq(2026, 10, 18, 7, 45)).open).toBe(false);
  });
});

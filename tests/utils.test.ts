import { describe, expect, it } from "vitest";
import { compactText, formatCount } from "../lib/utils";

describe("catalog utilities", () => {
  it("formats Indonesian counts", () => {
    expect(formatCount(1234)).toBe("1.234");
  });

  it("keeps card copy concise", () => {
    expect(compactText("Hanabel", 10)).toBe("Hanabel");
    expect(compactText("Rekomendasi produk pilihan", 12)).toBe("Rekomendasi…");
  });
});

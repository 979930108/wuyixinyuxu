import { createHmac, timingSafeEqual } from "crypto";

export interface CodeEntry {
  code: string;
  type: "lifetime" | number;
}

export function parseActivationCodes(raw: string | undefined): CodeEntry[] {
  if (!raw?.trim()) return [];
  return raw.split(",").map((item) => {
    const [code, type] = item.trim().split(":");
    const normalized = (code || "").trim().toUpperCase();
    if (type === "lifetime") {
      return { code: normalized, type: "lifetime" as const };
    }
    const days = parseInt(type || "0", 10);
    return { code: normalized, type: days > 0 ? days : 7 };
  });
}

export function findCodeEntry(
  codes: CodeEntry[],
  input: string
): CodeEntry | undefined {
  const normalized = input.trim().toUpperCase();
  return codes.find((c) => c.code === normalized);
}

export function createActivationToken(
  code: string,
  plan: "lifetime" | "trial",
  expiresAt: string | null,
  secret: string
): string {
  const payload = JSON.stringify({
    code: code.toUpperCase(),
    plan,
    expiresAt,
    iat: Date.now(),
  });
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(JSON.stringify({ payload, sig })).toString("base64url");
}

export function verifyActivationToken(
  token: string,
  secret: string
): { valid: boolean; code?: string; plan?: "lifetime" | "trial"; expiresAt?: string | null } {
  try {
    const decoded = JSON.parse(
      Buffer.from(token, "base64url").toString("utf8")
    ) as { payload: string; sig: string };

    const expectedSig = createHmac("sha256", secret)
      .update(decoded.payload)
      .digest("hex");

    const a = Buffer.from(decoded.sig, "hex");
    const b = Buffer.from(expectedSig, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { valid: false };
    }

    const data = JSON.parse(decoded.payload) as {
      code: string;
      plan: "lifetime" | "trial";
      expiresAt: string | null;
    };

    if (data.plan === "trial" && data.expiresAt) {
      if (new Date(data.expiresAt) <= new Date()) {
        return { valid: false };
      }
    }

    return {
      valid: true,
      code: data.code,
      plan: data.plan,
      expiresAt: data.expiresAt,
    };
  } catch {
    return { valid: false };
  }
}

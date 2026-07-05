import { NextResponse } from "next/server";
import {
  createActivationToken,
  findCodeEntry,
  parseActivationCodes,
} from "@/lib/activation-server";

export async function POST(request: Request) {
  try {
    const { code } = (await request.json()) as { code?: string };

    if (!code?.trim()) {
      return NextResponse.json(
        { success: false, message: "请输入激活码" },
        { status: 400 }
      );
    }

    const secret = process.env.ACTIVATION_SECRET;
    const codesRaw = process.env.ACTIVATION_CODES;

    if (!secret || secret.length < 16) {
      return NextResponse.json(
        { success: false, message: "服务未配置，请联系卖家" },
        { status: 500 }
      );
    }

    const entries = parseActivationCodes(codesRaw);
    const entry = findCodeEntry(entries, code);

    if (!entry) {
      return NextResponse.json(
        { success: false, message: "激活码无效，请检查后重试" },
        { status: 400 }
      );
    }

    const activatedAt = new Date().toISOString();
    let plan: "lifetime" | "trial" = "lifetime";
    let expiresAt: string | null = null;

    if (entry.type === "lifetime") {
      plan = "lifetime";
    } else {
      plan = "trial";
      const exp = new Date();
      exp.setDate(exp.getDate() + entry.type);
      expiresAt = exp.toISOString();
    }

    const token = createActivationToken(entry.code, plan, expiresAt, secret);

    return NextResponse.json({
      success: true,
      message: plan === "lifetime" ? "永久会员激活成功！" : `会员已激活，有效期 ${entry.type} 天`,
      data: {
        code: entry.code,
        plan,
        expiresAt,
        activatedAt,
        token,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "激活失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const token = request.headers.get("x-activation-token");
  const secret = process.env.ACTIVATION_SECRET;

  if (!token || !secret) {
    return NextResponse.json({ valid: false });
  }

  const { verifyActivationToken } = await import("@/lib/activation-server");
  const result = verifyActivationToken(token, secret);

  return NextResponse.json({
    valid: result.valid,
    plan: result.plan,
    expiresAt: result.expiresAt,
  });
}

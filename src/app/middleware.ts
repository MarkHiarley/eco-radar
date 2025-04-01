import { NextRequest, NextResponse } from "next/server";
import { LRUCache }  from "lru-cache";

const rateLimitOptions = {
  max: 5,
  ttl: 60 * 1000,
};

const rateLimitCache = new LRUCache<string, number>(rateLimitOptions);

export function middleware(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0].trim() || "127.0.0.1";

  const requests = rateLimitCache.get(ip) || 0;

  if (requests >= rateLimitOptions.max) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  rateLimitCache.set(ip, requests + 1);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

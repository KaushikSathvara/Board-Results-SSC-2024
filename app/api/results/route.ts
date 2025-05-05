import prisma from "@/lib/prisma";
import { RateLimiter } from "limiter";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";

// Create a store to track rate limiters for different IPs
const ipLimiters = new Map<string, RateLimiter>();

// Rate limit configuration: 10 requests per minute
const REQUESTS_PER_MINUTE = 10;
const WINDOW_MS = 60 * 1000; // 1 minute in milliseconds

export async function GET(request: Request) {
  // Get IP address from request headers
  const headersList = headers();
  const forwardedFor = headersList.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0].trim() || "unknown";

  // Create or get rate limiter for this IP
  if (!ipLimiters.has(ip)) {
    ipLimiters.set(
      ip,
      new RateLimiter({
        tokensPerInterval: REQUESTS_PER_MINUTE,
        interval: WINDOW_MS,
      })
    );
  }

  const limiter = ipLimiters.get(ip)!;

  // Check if request should be allowed
  const remainingRequests = await limiter.removeTokens(1);

  // If no tokens remain, rate limit has been exceeded
  if (remainingRequests < 0) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // console query params
  const url = request.url;
  let search = new URL(url).searchParams.get("search") || "";
  let page = new URL(url).searchParams.get("page") || "0";
  let pageSize = new URL(url).searchParams.get("pageSize") || "10";

  let skip = parseInt(page) * parseInt(pageSize);
  let take = parseInt(pageSize);
  console.log(search, skip, take);

  // sanitize search
  search = search.toLowerCase().trim();

  // Build search filters with proper typing
  const searchFilters: Prisma.ResultsWhereInput = {
    OR: [
      {
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        seat_no: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    ],
  };

  const results = await prisma.results.findMany({
    skip: skip,
    take: take,
    where: searchFilters,
  });

  const total = await prisma.results.count({
    where: searchFilters,
  });

  console.log(`Found ${total} results for search: "${search}"`);

  // Return response with rate limit headers
  return new Response(
    JSON.stringify({
      results: results,
      total: total,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": REQUESTS_PER_MINUTE.toString(),
        "X-RateLimit-Remaining": Math.max(0, remainingRequests).toString(),
        "X-RateLimit-Reset": new Date(Date.now() + WINDOW_MS).toISOString(),
      },
    }
  );
}

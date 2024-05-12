import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // console query params
  const url = request.url;
  const search = new URL(url).searchParams.get("search") || "";
  const page = new URL(url).searchParams.get("page") || "0";
  const pageSize = new URL(url).searchParams.get("pageSize") || "10";

  let skip = parseInt(page) * parseInt(pageSize);
  let take = parseInt(pageSize);
  console.log(search, skip, take);

  const results = await prisma.results.findMany({
    skip: skip,
    take: take,
    where: {
      OR: [
        {
          // name__lower contains search
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          seat_no: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const resultsCount = await prisma.results.count({
    where: {
      OR: [
        {
          // name__lower contains search
          name: {
            contains: search,
            equals: search,
            startsWith: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  console.log(results);
  return Response.json({
    results: results,
    count: resultsCount,
  });
}

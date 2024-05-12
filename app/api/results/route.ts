import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // console query params
  const url = request.url;
  let search = new URL(url).searchParams.get("search") || "";
  let page = new URL(url).searchParams.get("page") || "0";
  let pageSize = new URL(url).searchParams.get("pageSize") || "10";

  let skip = parseInt(page) * parseInt(pageSize);
  let take = parseInt(pageSize);
  console.log(search, skip, take);

  // senitize search
  search = search.toLowerCase();

  const results = await prisma.results.findMany({
    skip: skip,
    take: take,
    where: {
      OR: [
        {
          // name__lower contains search
          name: {
            contains: search,
          },
        },
      ],
    },
  });

  const resultsCount = await prisma.results.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
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

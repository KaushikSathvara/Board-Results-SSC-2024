const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function uploadResults() {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync("./data/ssc_results.csv", "utf-8");
    const rows = csvData.trim().split("\n").slice(1); // Skip the header row

    const chunkSize = 50000;
    const totalRows = rows.length;

    // Process the rows in chunks
    for (let i = 0; i < totalRows; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const data = chunk.map((row) => {
        const [seatNo, name, result, grade, percentile] = row.split(",");
        return { seat_no: seatNo, name, result, grade };
      });

      // Upload chunk of data to the database
      await prisma.results.createMany({
        data: data,
        skipDuplicates: true, // Skip duplicates if seat_no is already in the database
      });

      console.log(`Uploaded ${Math.min(chunkSize, totalRows - i)} rows.`);
    }

    console.log("CSV data uploaded to database successfully.");
  } catch (error) {
    console.error("Error uploading CSV data to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to upload the CSV data to the database
uploadResults();

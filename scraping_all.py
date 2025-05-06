import requests
from bs4 import BeautifulSoup
import csv
import os
from concurrent.futures import ThreadPoolExecutor

url = "https://www.gseb.org/Result/ResultView"
headers = {
    "origin": "https://www.gseb.org",
    "content-type": "application/x-www-form-urlencoded",
}

characters = ["H"]
total_seats = 999999
batch_size = 10000
num_threads = 10  # WARNING: set higher carefully
SKIP_SEATS = 500
STARTING_PT = 100000

# Prepare CSV file
csv_file = "result_" + characters[0] + ".csv"
file_exists = os.path.isfile(csv_file)
if not file_exists:
    with open(csv_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        # writer.writerow(["Seat No", "Name", "Result", "Grade", "Percentile"])


def process_batch(character, start, end):
    local_results = []
    for idx, seat_number in enumerate(range(start, end), 1):
        payload = {
            "InitialCharacter": character,
            "SeatNo": f"{seat_number:06d}",
            "__Invariant": "SeatNo",
            "Captcha": "11",
            "hdnCaptcha": "DSsnPYWTstZlVtQ0weHMwQ==",
            "go": "  Go  ",
            "__RequestVerificationToken": "CfDJ8JXFi5j4wnBAjF6sjqJpvRQpwv-wSNgYzP8-km4jB-yz-YpBV_8_KNzojz_R__ixubPuNC_AcvHh_FjNa8rzVsaZBaBJEoDsVLdgO2WM315fsBfy71fE1poxakGJ3zpF0ncvcyYy1F8Hb31iUtKJhQQ",
        }

        try:
            response = requests.post(url, data=payload, headers=headers, timeout=10)
            soup = BeautifulSoup(response.text, "html.parser")
            table = soup.find("table", class_="maintbl")

            if table:
                seat_no = name = result = grade = percentile = ""
                rows = table.find_all("tr")

                for row in rows:
                    text = row.get_text(separator=" ").strip()
                    if "Seat No:" in text:
                        seat_no = text.split("Seat No:")[1].split()[0]
                        name = text.split("Name:")[1].strip()
                    if "Percentile:" in text:
                        percentile = text.split("Percentile:")[1].split()[0]
                        grade = text.split("Grade:")[1].strip()
                    if "Result:" in text:
                        result = (
                            text.split("Result:")[1].split("School Index:")[0].strip()
                        )

                local_results.append([seat_no, name, result, grade, percentile])

                # Write every 500 results
                if len(local_results) >= 500:
                    with open(csv_file, "a", newline="", encoding="utf-8") as f:
                        writer = csv.writer(f)
                        writer.writerows(local_results)
                    print(f"💾 Saved 500 results to CSV from batch {start}-{end}")
                    local_results.clear()

            if idx % 500 == 0:
                print(
                    f"🔍 Checked up to Seat No {seat_number:06d} in batch {start}-{end}"
                )

        except Exception as e:
            print(f"⚠ Error for Seat No {character}-{seat_number:06d}: {e}")

    # Write any remaining results after the batch finishes
    if local_results:
        with open(csv_file, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerows(local_results)
        print(
            f"💾 Saved final {len(local_results)} results to CSV from batch {start}-{end}"
        )


def main():
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = []
        for character in characters:
            for batch_start in range(STARTING_PT, total_seats + SKIP_SEATS, batch_size):
                batch_end = min(batch_start + batch_size, total_seats + 1)
                futures.append(
                    executor.submit(process_batch, character, batch_start, batch_end)
                )

        # Wait for all threads to complete
        for future in futures:
            future.result()


if __name__ == "__main__":
    main()

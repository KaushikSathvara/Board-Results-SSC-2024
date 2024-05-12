// pages/results.js
"use client";
import { PrismaClient } from "@prisma/client";
import { Button, Flex, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

const revalidate = 5;

const meta = {
  title: "GSEB SSC 2024 Result",
  description:
    "GSEB SSC 2024 Result name wise, find your result by name, seat number, or grade.",
};

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Seat No", dataIndex: "seat_no", key: "seat_no" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
    { title: "Result", dataIndex: "result", key: "result" },
  ];

  const resetPagination = () => {
    setCurrentPage(1);
    setPageSize(10);
  };

  const loadData = async (page: number, pageSize: number) => {
    setLoading(true);

    setCurrentPage(page);
    setPageSize(pageSize);

    fetch(`/api/results?page=${page}&pageSize=${pageSize}&search=${search}`)
      .then(async (res) => {
        let data = await res.json();
        console.log(data.results);
        setResults(data.results);
        setTotalCount(data.count);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <Flex gap={8} vertical justify="center" align="center">
      <Space.Compact
        className="flex-col justify-center text-center"
        size="large"
      >
        <Typography.Title level={2}>
          Name Wise GSEB SSC 2024 Result
        </Typography.Title>
        <Typography.Text>
          Find a result by name, seat number, or grade.
        </Typography.Text>
      </Space.Compact>
      <Flex justify="center" flex={1}>
        <Space.Compact size="large">
          <Input
            style={{ width: 900 }}
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            type="primary"
            onClick={async () => {
              await loadData(0, 10);
            }}
          >
            Search
          </Button>
        </Space.Compact>
      </Flex>

      <Table
        loading={loading}
        dataSource={results}
        style={{ width: "100%" }}
        size="large"
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: async (page, pageSize) => {
            await loadData(page, pageSize);
          },
        }}
      />
    </Flex>
  );
}

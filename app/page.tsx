"use client";
import {
  Button,
  Flex,
  Input,
  Space,
  Table,
  Typography,
  notification,
  Spin,
  Card,
  Divider,
  Tag,
  Tooltip,
  Badge,
} from "antd";
import { useEffect, useState, useCallback } from "react";
import {
  SearchOutlined,
  FileSearchOutlined,
  TableOutlined,
  UserOutlined,
  NumberOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import useDebounce from "./hooks";

const revalidate = 5;

// Updated SEO metadata with trending keywords
const meta = {
  title: "GSEB HSC 2025 Result - Check by Name, Seat Number | Portal",
  description:
    "Get instant GSEB HSC 2025 Results by name, seat number or school index. Fast and official Gujarat Board HSC Science, Commerce & GUJ-CET results with subject-wise marks and percentile rank.",
  keywords:
    "GSEB HSC result 2025, Gujarat board result, HSC result name wise, GSEB 12th result, HSC science result, HSC commerce result, HSC arts result, GSEB result by seat number",
};

// Define the Result interface for type safety
interface Result {
  id?: string | number;
  name: string;
  seat_no: string;
  grade: string;
  result: string;
  [key: string]: any; // For any additional properties
}

export default function Dashboard() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const debouncedSearchTerm = useDebounce(search);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/results?search=${search}&page=${page}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();
      setResults(data.results);
      setTotal(data.total);

      // Show no results notification if needed
      if (search && data.total === 0) {
        api.info({
          message: "No Results Found",
          description: `No results found for "${search}". Please try a different search term.`,
          placement: "top",
          icon: <InfoCircleOutlined style={{ color: "#1890ff" }} />,
        });
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      api.error({
        message: "Error",
        description: "Failed to fetch results. Please try again later.",
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, page, pageSize]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on new search
    fetchResults();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "#52c41a"; // Green
      case "A":
        return "#73d13d";
      case "B+":
        return "#36cfc9";
      case "B":
        return "#40a9ff"; // Blue
      case "C+":
        return "#fadb14"; // Yellow
      case "C":
        return "#fa8c16"; // Orange
      case "D":
        return "#ff7875"; // Light Red
      default:
        return "#ff4d4f"; // Red
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const columns = [
    {
      title: () => (
        <span className="flex items-center gap-2">
          <UserOutlined /> Name
        </span>
      ),
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium text-blue-800">{text}</span>
      ),
      sorter: (a: Result, b: Result) => a.name.localeCompare(b.name),
    },
    {
      title: () => (
        <span className="flex items-center gap-2">
          <NumberOutlined /> Seat Number
        </span>
      ),
      dataIndex: "seat_no",
      key: "seat_no",
      render: (text: string) => (
        <Tooltip title="Gujarat Board Exam Seat Number">
          <Tag color="processing" className="px-3 py-1 text-base">
            {text}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: () => (
        <span className="flex items-center gap-2">
          <TrophyOutlined /> Grade
        </span>
      ),
      dataIndex: "grade",
      key: "grade",
      render: (text: string) => (
        <Tooltip title={`Performance Grade: ${text}`}>
          <Tag
            color={getGradeColor(text)}
            className="px-4 py-1 font-bold text-base flex items-center justify-center"
            style={{ minWidth: "50px", textAlign: "center" }}
          >
            {text}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: () => (
        <span className="flex items-center gap-2">
          <CheckCircleOutlined /> Result
        </span>
      ),
      dataIndex: "result",
      key: "result",
      render: (text: string) => (
        <Badge
          status={text.includes("QUALIFIED") ? "success" : "error"}
          text={
            <span
              className={
                text.includes("QUALIFIED")
                  ? "text-green-600 font-medium text-base"
                  : "text-red-600 font-medium text-base"
              }
            >
              {text}
            </span>
          }
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card
          className="shadow-lg rounded-lg overflow-hidden border-0 mb-8"
          style={{
            background: "linear-gradient(to right, #fff, #f0f5ff)",
            borderTop: "5px solid #1890ff",
          }}
        >
          <Flex gap={8} vertical justify="center" align="center">
            {/* Header with gradient and logo */}
            <div className="w-full text-center mb-2">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-600 rounded-full p-3 sm:p-4 shadow-lg">
                  <FileSearchOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                    className="animate-pulse sm:text-5xl"
                  />
                </div>
              </div>

              {/* SEO-optimized heading structure with relevant keywords */}
              <Space.Compact
                className="flex-col justify-center text-center"
                size="large"
              >
                <Typography.Title
                  level={2}
                  className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 text-blue-600"
                >
                  Gujarat Board Class 12 Results (HSC and GUJ-CET)
                </Typography.Title>
                <Typography.Text className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-gray-600 px-2">
                  Find your result by name, seat number or school - Instant
                  access to Science, Commerce & GUJ-CET stream results
                </Typography.Text>
              </Space.Compact>
            </div>

            {/* Search box with floating effect */}
            <div className="w-full max-w-2xl transform hover:-translate-y-1 transition-transform duration-300 px-4 sm:px-0">
              <Card
                className="shadow-md hover:shadow-xl transition-shadow duration-300"
                bordered={false}
                style={{ borderRadius: "16px", overflow: "hidden" }}
              >
                <Flex justify="center" flex={1} className="w-full">
                  <Space.Compact
                    size="large"
                    className="w-full flex-col sm:flex-row"
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderRadius: "8px 8px 0 0",
                      }}
                      placeholder="Search by name, seat number or school"
                      value={search}
                      onChange={handleSearchChange}
                      onKeyPress={handleKeyPress}
                      size="large"
                      prefix={<SearchOutlined className="text-gray-400" />}
                      className="hover:border-blue-500 focus:border-blue-500"
                    />
                    <Button
                      type="primary"
                      loading={loading}
                      size="large"
                      onClick={handleSearch}
                      icon={<SearchOutlined />}
                      style={{
                        borderRadius: "0 0 8px 8px",
                        width: "100%",
                      }}
                      className="bg-blue-500 hover:bg-blue-600 mt-2 sm:mt-0 sm:w-auto"
                    >
                      Search Results
                    </Button>
                  </Space.Compact>
                </Flex>
              </Card>
            </div>

            {/* Help text with icon badges */}
            <div className="mt-6 mb-8 text-center max-w-lg p-4 bg-gray-50 rounded-lg border border-gray-200 mx-4 sm:mx-auto">
              <Typography.Text className="text-base flex flex-col gap-2">
                <span className="flex items-center gap-2 justify-center flex-wrap">
                  <Badge status="processing" />
                  Enter your <strong>full name</strong>,
                  <strong>seat number</strong> or <strong>school name</strong>
                </span>
                <span className="flex items-center gap-2 justify-center flex-wrap">
                  <Badge status="processing" />
                  Results include subject-wise marks and percentile
                </span>
                <span className="flex items-center gap-2 justify-center flex-wrap">
                  <Badge status="processing" />
                  Available for Science, Commerce and Arts streams
                </span>
              </Typography.Text>
            </div>

            {/* Results table with enhanced styling */}
            <Flex vertical gap={8} className="w-full px-2 sm:px-0">
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <TableOutlined className="text-blue-500" />
                    <span>Search Results</span>
                    {loading ? (
                      <Spin indicator={antIcon} size="small" className="ml-2" />
                    ) : null}
                  </div>
                }
                className="shadow-md hover:shadow-lg transition-all duration-300"
                bordered={false}
              >
                <Table
                  columns={columns}
                  dataSource={results}
                  rowKey={(record) => record.id || record.seat_no}
                  loading={{
                    spinning: loading,
                    indicator: <Spin indicator={antIcon} />,
                  }}
                  pagination={{
                    current: page + 1,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "25", "50", "100"],
                    showTotal: (total) => `Total ${total} results`,
                    onChange: (p, ps) => {
                      setPage(p - 1);
                      if (ps !== pageSize) {
                        setPageSize(ps);
                      }
                    },
                  }}
                  className="border-spacing-2"
                  rowClassName="hover:bg-blue-50"
                  scroll={{ x: "600px" }}
                  size="middle"
                />
              </Card>
            </Flex>

            {/* Footer with social links */}
            <Divider className="my-4 sm:my-8" />
            <div className="w-full text-center text-gray-500 px-4 sm:px-0">
              <Flex vertical gap={2} justify="center" align="center">
                <Typography.Text className="text-xs sm:text-sm">
                  © {new Date().getFullYear()} All Rights Reserved.
                </Typography.Text>

                <Typography.Text className="text-xs text-gray-400 max-w-sm">
                  This is an unofficial result portal. For official results,
                  please visit the{" "}
                  <a
                    href="https://www.gseb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    GSEB website
                  </a>
                  .
                </Typography.Text>
              </Flex>

              <div className="mt-4 flex justify-center gap-4">
                <Button
                  type="text"
                  icon={<GithubOutlined />}
                  className="text-gray-600 hover:text-blue-600"
                  size="small"
                />
                <Button
                  type="text"
                  icon={<LinkedinOutlined />}
                  className="text-gray-600 hover:text-blue-600"
                  size="small"
                />
              </div>
            </div>
          </Flex>
        </Card>
      </div>
    </>
  );
}

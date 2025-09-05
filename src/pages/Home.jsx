import { Loader2, Search } from "lucide-react";
import { searchApi, searchRelatedApi } from "../services/user.api";
import { LineChart } from "@mui/x-charts";
import { useQuery } from "react-query";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Home = () => {
  const [keyword, setKeyword] = useState("coffee");

  //using react query to fetch data
  const {
    data: searchVolume,
    isFetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["search-volume"],
    queryFn: async () => await searchApi(keyword),
  });

  //using react query to fetch related words
  const {
    data: searchRelated,
    isFetching: isRelatedWordLoading,
    refetch: refetchRelatedWord,
  } = useQuery({
    queryKey: ["search-related-words"],
    queryFn: async () => await searchRelatedApi(keyword),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      refetch();
      refetchRelatedWord();
    }
  };

  const data2025 = searchVolume?.interest_over_time.timeline_data?.filter(
    (item) => item.date.includes("2025")
  );

  const months = data2025?.map((item) => item?.date?.split(" ")[0]);
  const values = data2025?.map((item) => item?.values[0]?.extracted_value);
  const relatedWords = searchRelated?.related_searches;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6 gap-8">

      {/* Search and Chart Section */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <div className="font-semibold text-2xl text-gray-800">
          Keyword Analysis Tool
        </div>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex items-center border border-gray-300 rounded-xl h-12 w-full px-4">
            <Search className="text-gray-400" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              placeholder="Enter keyword to analyze"
              className="w-full h-full pl-4 outline-none text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white rounded-xl h-12 px-6 font-medium hover:bg-blue-500 active:bg-blue-700 transition transform active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Chart or Messages */}
        <div className="flex justify-center items-center h-[350px]">
          {isError ? (
            <div className="text-gray-400">
              No data to display. Please search for a keyword.
            </div>
          ) : isFetching ? (
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          ) : searchVolume ? (
            <LineChart
              xAxis={[{ data: months, scaleType: "band" }]}
              series={[{ data: values }]}
              height={300}
            />
          ) : (
            <div className="text-gray-400">Search to see results...</div>
          )}
        </div>
      </div>

      {/* Related Words Section */}
      <div className="h-[550px] w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <div className="font-semibold text-xl text-gray-800">
          Related Keywords
        </div>

        {isRelatedWordLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : relatedWords?.length ? (
          <TableContainer component={Paper} className="shadow-md">
            <Table>
              <TableBody>
                {relatedWords.map((item) => (
                  <TableRow
                    key={item.query}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{item.query}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="h-full flex justify-center items-center text-gray-400">
            No related keywords found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

"use client";

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { stations, apparatus } from "@/constants/stationsAndApparatus";
import { FormField } from "@/components/FormField";

interface Route {
  _id: string;
  date: string;
  time: string;
  station: string;
  apparatus: string;
  number: number;
  module: string;
  description: string;
}

interface QueryDate {
  date: string;
  station: string;
  apparatus: string;
}

export default function Page(): JSX.Element {
  const [routes, setRoutes] = useState<Route[]>([]);
  const now = new Date();
  const taiwanTime = toZonedTime(now, "Asia/Taipei");
  const today = format(taiwanTime, "yyyy-MM-dd");
  const [queryData, setQueryData] = useState<QueryDate>({
    date: "",
    station: "",
    apparatus: "",
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data =
          !queryData.date && !queryData.station && !queryData.apparatus
            ? { ...queryData, date: today }
            : { ...queryData };
        const response = await axios.get("http://localhost:5000/api/routes", {
          params: data,
        });
        const sortedRoutes = response.data.sort(
          (a: Route, b: Route) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRoutes(sortedRoutes);
      } catch (error) {
        console.log("Error fetching routes", error);
      }
    };
    fetchRoutes();
  }, [queryData, today]);

  const changeHandle = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setQueryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (date: string) => {
    return format(parseISO(date), "yyyy/MM/dd");
  };

  return (
    <>
      <div className="p-6">
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 hover:underline"
        >
          回首頁
        </Link>
        <h1 className="text-xl font-bold mt-6">搜尋條件</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 p-6 rounded-lg shadow-md max-w-lg mx-auto"
        >
          <FormField
            label="日期"
            name="date"
            value={queryData.date}
            onChange={changeHandle}
            type="date"
          />
          <FormField
            label="車站"
            name="station"
            value={queryData.station}
            options={stations}
            onChange={changeHandle}
            type="select"
          />
          <FormField
            label="設備種類"
            name="apparatus"
            value={queryData.apparatus}
            options={apparatus}
            onChange={changeHandle}
            type="select"
          />
          <button
            type="button"
            onClick={() =>
              setQueryData({ date: "", station: "", apparatus: "" })
            }
            className="w-full mt-4 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none font-semibold"
          >
            重置
          </button>
        </form>
        <h1 className="text-xl font-bold">行程列表</h1>
        <div className="mt-4 space-y-4">
          {routes.map((route) => (
            <div
              key={route._id}
              className="p-4 border border-gray-300 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>完修時間:</strong> {formatDate(route.date)}{" "}
                  <span> </span> {route.time}
                </p>
                <p>
                  <strong>車站:</strong> {route.station}
                </p>
                <p>
                  <strong>設備:</strong> {route.apparatus}
                </p>
              </div>
              <Link href={`/check-route/${route._id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  詳細/修改
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

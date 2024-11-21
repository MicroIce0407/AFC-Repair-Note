"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

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

export default function RouteDetail(): JSX.Element {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [route, setRoute] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchRoute = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/routes/${id}`);
          setRoute(response.data);
        } catch (error) {
          console.error("Error fetching route detail:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRoute();
    }
  }, [id, backendUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!route) {
    return <p className="text-center text-xl">找不到該行程的詳細資料</p>;
  }

  const goBackHandle = () => {
    router.back();
  };

  const deleteHandle = async () => {
    const confirmed = confirm("您確定要刪除此行程嗎？此操作無法撤銷！");
    if (confirmed) {
      setIsDeleting(true);
      try {
        await axios.delete(`${backendUrl}/api/routes/${id}`);
        alert("行程刪除成功！");
        router.back();
      } catch (error) {
        console.error("Error deleting route:", error);
        alert("刪除行程時發生錯誤，請稍後再試。");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 hover:underline"
        >
          回首頁
        </Link>
        <button
          onClick={goBackHandle}
          className="text-xl font-bold text-blue-600 hover:underline"
        >
          回上頁
        </button>
      </div>
      <div className="p-6 max-w-2xl mx-auto rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mt-6 border-b pb-2">行程詳細資訊</h1>
        <div className="space-y-4 mt-4">
          <p className="flex items-center">
            <strong className="w-24 inline-block">日期:</strong>
            <span className="text-lg">{route.date}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 inline-block">時間:</strong>
            <span className="text-lg">{route.time}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 inline-block">車站:</strong>
            <span className="text-lg">{route.station}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 inline-block">設備:</strong>
            <span className="text-lg">{route.apparatus}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 inline-block">設備編號:</strong>
            <span className="text-lg">{route.number}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 inline-block">更換模組:</strong>
            <span className="text-lg">{route.module}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24 inline-block">維修內容:</strong>
            <span className="text-lg">{route.description}</span>
          </p>
        </div>
      </div>
      <div className="flex space-x-4 mt-6 max-w-2xl mx-auto">
        <Link
          href={`/update-route/${route._id}`}
          className="flex-1 flex justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
        >
          修改
        </Link>
        <button
          type="button"
          onClick={deleteHandle}
          disabled={isDeleting}
          className={`flex-1 flex justify-center p-3 ${
            isDeleting ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
          }  text-white rounded-lg  focus:ring-2 focus:ring-red-500 focus:outline-none font-semibold`}
        >
          {isDeleting ? "刪除中..." : "刪除"}
        </button>
      </div>
    </div>
  );
}

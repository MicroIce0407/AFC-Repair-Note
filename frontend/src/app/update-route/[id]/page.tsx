"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
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

export default function RouteDetail(): JSX.Element {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [route, setRoute] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [formData, setFormData] = useState<Route>({
    _id: "",
    date: "",
    time: "",
    station: "",
    apparatus: "",
    number: 1,
    module: "",
    description: "",
  });

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

  useEffect(() => {
    if (route) {
      setFormData(route);
    }
  }, [route]);

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

  const changeHandle = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateHandle = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${backendUrl}/api/routes/${formData._id}`,
        formData
      );
      console.log("Response:", response.data);
      alert("行程已成功更新！");
      goBackHandle();
    } catch (error) {
      console.error("Error while updating route:", error);
      alert("更新行程時發生錯誤，請稍後再試。");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 hover:underline"
        >
          回首頁
        </Link>
        <button
          onClick={goBackHandle}
          className="text-2xl font-bold text-green-600 hover:underline"
        >
          回上頁
        </button>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 space-y-4 p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <FormField
          label="日期"
          name="date"
          type="date"
          value={formData.date}
          onChange={changeHandle}
        />
        <FormField
          label="時間"
          name="time"
          type="time"
          value={formData.time}
          onChange={changeHandle}
        />
        <FormField
          label="車站"
          name="station"
          type="select"
          value={formData.station}
          options={stations}
          onChange={changeHandle}
        />
        <FormField
          label="設備種類"
          name="apparatus"
          type="select"
          value={formData.apparatus}
          options={apparatus}
          onChange={changeHandle}
        />
        <FormField
          label="設備編號"
          name="number"
          type="number"
          value={formData.number}
          onChange={changeHandle}
        />
        <FormField
          label="更換模組"
          name="module"
          type="text"
          value={formData.module}
          onChange={changeHandle}
        />
        <FormField
          label="維修內容"
          name="description"
          type="textarea"
          rows={4}
          value={formData.description}
          onChange={changeHandle}
        />
        <button
          type="button"
          onClick={updateHandle}
          disabled={isUpdating}
          className={`w-full mt-4 p-3 ${
            isUpdating ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold`}
        >
          {isUpdating ? "更新中..." : "確認修改"}
        </button>
      </form>
    </div>
  );
}

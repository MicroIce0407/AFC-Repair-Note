"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { stations, apparatus } from "@/constants/stationsAndApparatus";
import { FormField } from "@/components/FormField";

interface FormData {
  station: string;
  apparatus: string;
  number: number;
  module: string;
  description: string;
}

const Page: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    station: "",
    apparatus: "",
    number: 1,
    module: "",
    description: "",
  });

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

  const submitHandle = async () => {
    try {
      const newFormData = {
        ...formData,
        module: formData.module === "" ? "N/A" : formData.module,
      };
      const response = await axios.post(
        "http://localhost:5000/api/routes",
        newFormData
      );
      console.log("Response:", response.data);
      alert("Route added successfully");
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (error) {
      console.error("Error while adding route:", error);
      alert("An error occurred while adding the route.");
    }
  };

  return (
    <div className="p-6">
      <Link
        href="/"
        className="text-2xl font-bold text-green-600 hover:underline"
      >
        回首頁
      </Link>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 space-y-4 p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <FormField
          label="車站"
          name="station"
          value={formData.station}
          type="select"
          options={stations}
          onChange={changeHandle}
          required
        />
        <FormField
          label="設備種類"
          name="apparatus"
          value={formData.apparatus}
          type="select"
          options={apparatus}
          onChange={changeHandle}
          required
        />
        <FormField
          label="設備編號"
          name="number"
          value={formData.number}
          type="number"
          onChange={changeHandle}
          required
        />
        <FormField
          label="更換模組"
          name="module"
          value={formData.module}
          type="text"
          onChange={changeHandle}
        />
        <FormField
          label="維修內容"
          name="description"
          value={formData.description}
          type="textarea"
          onChange={changeHandle}
        />
        <button
          type="button"
          className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
          onClick={submitHandle}
        >
          提交
        </button>
      </form>
    </div>
  );
};

export default Page;

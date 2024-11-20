import mongoose, { Schema, Document } from "mongoose";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export interface IRoute extends Document {
  station: string;
  apparatus: string;
  number: number;
  module: string;
  description: string;
  date: string;
  time: string;
}

const routeSchema: Schema = new Schema({
  station: {
    type: String,
    required: true,
  },

  apparatus: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  module: {
    type: String,
  },

  description: {
    type: String,
  },

  date: {
    type: String,
    required: true,
    default: function () {
      const now = new Date();
      const taiwanTime = toZonedTime(now, "Asia/Taipei");
      return format(taiwanTime, "yyyy-MM-dd");
    },
  },

  time: {
    type: String,
    required: true,
    default: function () {
      const now = new Date();
      const taiwanTime = toZonedTime(now, "Asia/Taipei");
      return format(taiwanTime, "HH:mm:ss");
    },
  },
});

const Route = mongoose.model<IRoute>("Route", routeSchema);
export default Route;

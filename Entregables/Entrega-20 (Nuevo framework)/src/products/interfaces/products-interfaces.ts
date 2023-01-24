import { Document } from "mongoose";

export interface Product extends Document {
  id?: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
}

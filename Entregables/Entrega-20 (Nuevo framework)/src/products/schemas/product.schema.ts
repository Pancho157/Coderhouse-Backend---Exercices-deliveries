import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    id: Number,
    title: String,
    price: Number,
    thumbnail: String,
    stock: Number,
  },
  {
    timestamps: true,
  },
);

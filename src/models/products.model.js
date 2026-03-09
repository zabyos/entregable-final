import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  stock: Number,
  category: String,
  status: {
    type: Boolean,
    default: true
  }
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model("products", productSchema);
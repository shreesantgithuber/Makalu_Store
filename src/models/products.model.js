import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    productType: {
      type: String,
      required: [true, 'Please enter the product type'],
    },
    uniqueId: {
      type: String,
      required: [true, 'Please enter the unique ID'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['available', 'out on trek', 'returned'],
      default: 'available',
    },
    assignedTo: {
      trekId: {
        type: Schema.Types.ObjectId,
        ref: 'Trek',
        default: null,
      },
      groupName: {
        type: String,
        default: null,
      },
    },
    assignedDate: {
      type: Date,
      default: null,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
    capacity: { type: Number },
    cylinderSize: { type: String },
    regulatorType: { type: String },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
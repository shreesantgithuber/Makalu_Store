import mongoose, { Schema } from 'mongoose';

const trekSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the trek name'],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Please enter the trek start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please enter the trek end date'],
    },
    destination: {
      type: String,
      required: [true, 'Please enter the trek destination'],
      trim: true,
    },
    groupLeader: {
      type: String,
      trim: true,
    },
    totalParticipants: {
      type: Number,
      min: 1,
      default: 1,
    },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'completed', 'cancelled'],
      default: 'planning',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Trek = mongoose.models.Trek || mongoose.model('Trek', trekSchema);

export default Trek;
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Create index on eventId for faster queries when fetching bookings by event
bookingSchema.index({ eventId: 1 });

// Pre-save hook to validate that the referenced event exists
bookingSchema.pre('save', async function () {
  // Only validate if eventId is modified or document is new
  if (this.isModified('eventId')) {
    // Dynamically import Event model to avoid circular dependency
    const Event = mongoose.models.Event || (await import('./event.model')).default;
    
    const eventExists = await Event.exists({ _id: this.eventId });
    
    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  }
});


// Prevent model recompilation in Next.js development hot-reload
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;

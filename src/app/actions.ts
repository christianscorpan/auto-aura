
"use server";

import { z } from "zod";

const formSchema = z.object({
  regNr: z.string().min(2, "Registration number is required."),
  make: z.string().min(2, "Make is required."),
  model: z.string().min(2, "Model is required."),
  year: z.string().min(4, "A valid year is required."),
  mileage: z.string().min(1, "Mileage is required."),
  condition: z.string().min(1, "Condition is required."),
  price: z.string().min(1, "Asking price is required."),
  name: z.string().min(2, "Your name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(8, "A valid phone number is required."),
});

export async function submitOffer(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = formSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      error: "Invalid data provided. Please check the form and try again.",
    };
  }

  const { data } = validatedFields;
  const files = formData.getAll("photos");

  // In a real application, you would integrate an email service like Resend, SendGrid, or Nodemailer here.
  // You would also upload the files to a storage service like Firebase Storage or AWS S3 and include the links in the email.
  
  console.log("--- New Car Offer Received ---");
  console.log("Offer Details:", data);

  const photoDetails = files.map(file => {
      if(file instanceof File) {
          return `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      }
      return 'Invalid file entry';
  }).join(', ');

  console.log("Photos:", photoDetails || "No photos uploaded");
  console.log("----------------------------");

  // Simulate network delay for a more realistic UI experience
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { success: "Offer submitted successfully! We will get back to you shortly." };
}

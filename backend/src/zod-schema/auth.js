import { z } from "zod";

export const signupschema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
  email: z.email({
    required_error: "Email is required",
    message: "Valid email is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
      {
        message:
          "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    ),
});

export const signinschema = z.object({
  email: z.email({
    required_error: "Email is required",
    message: "Valid email is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
      {
        message:
          "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    ),
});

export const verifyOtpschema = z.object({
  email: z.email({
    required_error: "Email is required",
    message: "Valid email is required",
  }),
  otp: z
    .string({
      required_error: "OTP is required",
      message: "OTP must be 6 digits",
    })
    .length(6),
});

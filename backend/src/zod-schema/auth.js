import { z } from "zod";

export const signupschema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email({
    required_error: "Email is required",
    message: "Valid email is required",
  }),
  rollNumber: z
    .string({
      required_error: "Roll number is required",
    })
    .regex(/^\d{2}[A-Za-z]{3}\d{3}$/, {
      message: "Invalid Roll Number",
    }),
  branch: z.enum(
    ["CS", "DCS", "EC", "DEC", "ME", "EE", "MS", "MNC", "EP", "CH", "CE"],
    { message: "Valid branch is required" },
  ),
  password: z
    .string({
      required_error: "Password is required",
    })
    
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

export const sendOTPschema = z.object({
  email: z.email({
    required_error: "Email is required",
    message: "Valid email is required",
  }),
});

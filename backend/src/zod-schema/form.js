import { z } from "zod";

export const questionSchema = z.object({
    question: z
        .string()
        .min(1, "Question is required"),
    options: z
        .array(z.string()
            .min(1, "Option cannot be empty"))
        .min(1, "At least one option is required"),
    type: z
        .enum([ "TEXT", "MCQ" ,"NUMBER", "EMAIL"], {
            error : ()=>({message: "Invalid question type"})
    }),
    required: z
        .boolean()
        .optional()
        .default(true),
    formId: z
        .uuid({message: "Invalid formId"})
        .optional(),
});

export const validUuid = z.uuid({message: "Invalid uuid"})

export const validBranch = z
        .enum(["CSE", "DCS", "MNC", "EC", "DEC", "ME", "EE", "CE", "EP" ,"MS", "CH"], {
            error: ()=>({message: "Enter a valid branch"})
    })

export const createAdminSchema = z.object({
    name : z
        .string()
        .min(2, "Enter a valid name"),
    middlename : z
        .string()
        .optional(),
    lastname: z
        .string()
        .optional(),
    branch : z
        .enum(["CSE", "DCS", "MNC", "EC", "DEC", "ME", "EE", "CE", "EP" ,"MS", "CH"], {
            error: ()=>({message: "Enter a valid branch"})
    }),
    email: z
        .email({
            required_error: "Email is required",
            message: "Valid email is required",
        }),
    password : z
        .string({
            required_error : "Password is required",
        })
        .min(8, "Password must be of atleast 8 digit.")
})


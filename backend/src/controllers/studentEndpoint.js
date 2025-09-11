import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';


//  Student Form Submission
const submitForm = async (req, res) => {
  try {
    const { questions } = req.body;
    const userId = req.cookies.userId;   

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const form = await prisma.form.create({
      data: {
        userId,
        question: {
          create: questions.map(q => ({
            question: q.question,
            answer: q.answer
          }))
        }
      },
      include: { question: true }
    });

    res.status(201).json({ message: "Form submitted successfully", form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//  Get Student Status
const status = async (req, res) => {
  try {
    const userId = req.cookies.userId;   

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const form = await prisma.form.findUnique({
      where: { userId },
      select: { status: true }   
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.json({ status: form.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Resubmit Form (if rejected)
const resubmit = async (req, res) => {
  try {
    const { questions } = req.body;
    const userId = req.cookies.userId;   

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const existingForm = await prisma.form.findUnique({
      where: { userId },
      include: { question: true }
    });

    if (!existingForm) {
      return res.status(404).json({ error: "No previous form found" });
    }

    if (existingForm.status !== "REJECTED") {
      return res.status(400).json({
        error: `Cannot resubmit. Current status is ${existingForm.status}`
      });
    }

    // Deleting old questions linked to this form
    await prisma.question.deleteMany({
      where: { formId: existingForm.id }
    });

    // Update form with new questions and reset status 
    const updatedForm = await prisma.form.update({
      where: { id: existingForm.id },
      data: {
        status: "PENDING",
        question: {
          create: questions.map(q => ({
            question: q.question,
            answer: q.answer
          }))
        }
      },
      include: { question: true }
    });

    res.status(200).json({
      message: "Form resubmitted successfully",
      updatedForm
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { submitForm, status, resubmit };

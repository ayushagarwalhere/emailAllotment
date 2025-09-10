import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';


//  Student Form Submission
const submitForm=async (req, res) => {
  try {
    const { questions } = req.body; 
    const form = await prisma.form.create({
      data: {
        userId: req.params.id,
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

const status=async (req, res) => {
  try {
    const form = await prisma.form.findUnique({
      where: { userId: req.params.id },
      select: { Status: true }
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.json({ status: form.Status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//resubmit

const resubmit=async (req, res) => {
  try {
    const { questions } = req.body;

    const existingForm = await prisma.form.findUnique({
      where: { userId: req.params.id },
      include: { question: true }
    });

    if (!existingForm) {
      return res.status(404).json({ error: "No previous form found" });
    }

    if (existingForm.Status !== "REJECTED") {
      return res.status(400).json({ 
        error: `Cannot resubmit. Current status is ${existingForm.Status}` 
      });
    }

    // Delete rejected form
    await prisma.form.delete({ where: { id: existingForm.id } });

    // Create new form with new questions
    const newForm = await prisma.form.create({
      data: {
        userId: req.params.id,
        question: {
          create: questions.map(q => ({
            question: q.question,
            answer: q.answer
          }))
        }
      },
      include: { question: true }
    });

    res.status(201).json({ message: "Form resubmitted successfully", newForm });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export{register,submitForm,status,resubmit}
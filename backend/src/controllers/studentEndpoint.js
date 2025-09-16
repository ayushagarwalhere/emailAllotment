import prisma from '../config/prismaClient.js';
import { Status } from '@prisma/client';


//  Student Form Submission
const submitForm = async (req, res) => {
  try {
    const { formId, answers } = req.body; 
    const userId = req.cookies.userId;

    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const existingSubmission = await prisma.submission.findUnique({
      where: { userId }
    });
    if (existingSubmission) {
      return res.status(400).json({ error: "You have already submitted the form" });
    }

    const submission = await prisma.submission.create({
      data: {
        userId,
        formId,
        answer: {
          create: answers.map(a => ({
            questionId: a.questionId,
            response: a.response
          }))
        }
      },
      include: { answer: true }
    });

    await prisma.user.update({
      where: { id: userId },
      data: { status: Status.PENDING }
    });

    res.status(201).json({ message: "Form submitted successfully", submission });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get Student Status
const status = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true }
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ status: user.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Resubmit Form (if rejected)
const resubmit = async (req, res) => {
  try {
    const { formId, answers } = req.body;
    const userId = req.cookies.userId;

    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true }
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.status !== "REJECTED") {
      return res.status(400).json({ error: `Cannot resubmit. Current status is ${user.status}` });
    }

    //  Find the existing submission
    const existingSubmission = await prisma.submission.findUnique({
      where: { userId },
      include: { answer: true }
    });
    if (!existingSubmission) {
      return res.status(404).json({ error: "No previous submission found" });
    }

    //  Delete old answers and keep submission
    await prisma.answer.deleteMany({
      where: { submissionId: existingSubmission.id }
    });

    // Update submission with new answers
    const updatedSubmission = await prisma.submission.update({
      where: { id: existingSubmission.id },
      data: {
        formId,
        answer: {
          create: answers.map(a => ({
            questionId: a.questionId,
            response: a.response
          }))
        }
      },
      include: { answer: true }
    });

    // Reset user status back to PENDING
    await prisma.user.update({
      where: { id: userId },
      data: { status: Status.PENDING }
    });

    res.status(200).json({ 
      message: "Form resubmitted successfully", 
      updatedSubmission 
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { submitForm, status, resubmit };

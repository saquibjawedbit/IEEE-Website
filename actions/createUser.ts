"use server";

import { prisma } from "@/lib";
import { updateThisUserRating } from "./updateThisUserRating";

export async function createUser(formData: {
  name: string;
  email: string;
  leetcodeHandle: string;
  codeforcesHandle: string;
  codechefHandle: string;
}) {
  try {
    // Initialize default values
    const userData = {
      name: formData.name,
      email: formData.email,
      leetcodeHandle: formData.leetcodeHandle || "none",
      codeforcesHandle: formData.codeforcesHandle || "none",
      codechefHandle: formData.codechefHandle || "none",
      leetcodeRating: 0,
      leetcodeProblemsSolved: 0,
      codeforcesRating: 0,
      codeforcesProblemsSolved: 0,
      codechefRating: 0,
      codechefProblemsSolved: 0,
      totalScore: 0,
    };

    // Create the user in the database
    const user = await prisma.user.create({
      data: userData,
    });

    // Fetch ratings for the new user
    if (user) {
      await updateThisUserRating(user.id);
    }

    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

"use server";

import { prisma } from "@/lib";
import axios from "axios";

export async function updateThisUserRating(userId: string) {
  try {
    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let leetcodeRating = 0;
    let leetcodeProblemsSolved = 0;
    let codeforcesRating = 0;
    let codeforcesProblemsSolved = 0;
    let codechefRating = 0;
    let codechefProblemsSolved = 0;

    // Fetch LeetCode data if handle exists
    if (user.leetcodeHandle && user.leetcodeHandle !== "none") {
      try {
        const leetcodeResponse = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${user.leetcodeHandle}`
        );
        
        if (leetcodeResponse.data && leetcodeResponse.data.status === "success") {
          leetcodeRating = leetcodeResponse.data.totalSolved || 0;
          leetcodeProblemsSolved = leetcodeResponse.data.totalSolved || 0;
        }
      } catch (error) {
        console.error(`Error fetching LeetCode data for ${user.leetcodeHandle}:`, error);
      }
    }

    // Fetch CodeForces data if handle exists
    if (user.codeforcesHandle && user.codeforcesHandle !== "none") {
      try {
        const codeforcesResponse = await axios.get(
          `https://codeforces.com/api/user.info?handles=${user.codeforcesHandle}`
        );
        
        if (codeforcesResponse.data && codeforcesResponse.data.status === "OK") {
          const userData = codeforcesResponse.data.result[0];
          codeforcesRating = userData.rating || 0;
          
          // Get problem count from a separate API call
          const submissionsResponse = await axios.get(
            `https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}&from=1&count=1000`
          );
          
          if (submissionsResponse.data && submissionsResponse.data.status === "OK") {
            const acceptedSubmissions = submissionsResponse.data.result.filter(
              (submission: any) => submission.verdict === "OK"
            );
            
            // Count unique problems
            const uniqueProblems = new Set();
            acceptedSubmissions.forEach((submission: any) => {
              uniqueProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
            });
            
            codeforcesProblemsSolved = uniqueProblems.size;
          }
        }
      } catch (error) {
        console.error(`Error fetching CodeForces data for ${user.codeforcesHandle}:`, error);
      }
    }

    // Fetch CodeChef data if handle exists
    if (user.codechefHandle && user.codechefHandle !== "none") {
      try {
        // Note: CodeChef doesn't have a public API, so we'd need to scrape or use a third-party service
        // This is a placeholder - in a real implementation, you'd need to find a way to get this data
        codechefRating = 1500; // Default rating
        codechefProblemsSolved = 0;
      } catch (error) {
        console.error(`Error fetching CodeChef data for ${user.codechefHandle}:`, error);
      }
    }

    // Calculate total score
    const totalScore = 
      leetcodeRating + 
      leetcodeProblemsSolved * 2 + 
      codeforcesRating + 
      codeforcesProblemsSolved * 2 + 
      codechefRating + 
      codechefProblemsSolved * 2;

    // Update user with fetched data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        leetcodeRating,
        leetcodeProblemsSolved,
        codeforcesRating,
        codeforcesProblemsSolved,
        codechefRating,
        codechefProblemsSolved,
        totalScore,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user rating:", error);
    throw error;
  }
}

// Backend/seed/seed.js
import { db } from "../src/db/index.js";   // adjust path if needed
import { questions } from "../db/schema.js"; // your Drizzle schema

const seed = async () => {
  try {
    await db.insert(questions).values([
      // EASY
      {
        title: "Two Sum",
        description: "Return indices of two numbers that add up to a target.",
        difficulty: "easy",
      },
      {
        title: "Palindrome Number",
        description: "Check if a number is a palindrome without converting it to string.",
        difficulty: "easy",
      },
      {
        title: "Valid Parentheses",
        description: "Determine if the input string has valid parentheses.",
        difficulty: "easy",
      },
      {
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists and return as a new list.",
        difficulty: "easy",
      },
      {
        title: "Maximum Subarray",
        description: "Find the contiguous subarray with the largest sum.",
        difficulty: "easy",
      },
      {
        title: "Climbing Stairs",
        description: "You can climb 1 or 2 steps. Find number of distinct ways to climb n stairs.",
        difficulty: "easy",
      },
      {
        title: "Best Time to Buy and Sell Stock",
        description: "Find the maximum profit from one stock transaction.",
        difficulty: "easy",
      },

      // MEDIUM
      {
        title: "Longest Substring Without Repeating Characters",
        description: "Find the length of the longest substring without repeating characters.",
        difficulty: "medium",
      },
      {
        title: "3Sum",
        description: "Find all unique triplets in an array that sum to zero.",
        difficulty: "medium",
      },
      {
        title: "Group Anagrams",
        description: "Group words that are anagrams of each other.",
        difficulty: "medium",
      },
      {
        title: "Product of Array Except Self",
        description: "Return array where each element is product of all numbers except itself.",
        difficulty: "medium",
      },
      {
        title: "Spiral Matrix",
        description: "Return all elements of a matrix in spiral order.",
        difficulty: "medium",
      },
      {
        title: "Binary Tree Level Order Traversal",
        description: "Return the level order traversal of a binary tree.",
        difficulty: "medium",
      },
      {
        title: "Word Break",
        description: "Given a string and a dictionary of words, determine if it can be segmented.",
        difficulty: "medium",
      },

      // HARD
      {
        title: "Median of Two Sorted Arrays",
        description: "Find the median of two sorted arrays in O(log(m+n)) time.",
        difficulty: "hard",
      },
      {
        title: "Regular Expression Matching",
        description: "Implement regex matching with support for '.' and '*'.",
        difficulty: "hard",
      },
      {
        title: "Trapping Rain Water",
        description: "Given elevation map, compute how much water can be trapped.",
        difficulty: "hard",
      },
      {
        title: "N-Queens",
        description: "Place N queens on an N×N chessboard such that no queens attack each other.",
        difficulty: "hard",
      },
      {
        title: "Word Ladder",
        description: "Find the shortest transformation sequence from beginWord to endWord.",
        difficulty: "hard",
      },
      {
        title: "Alien Dictionary",
        description: "Given a sorted dictionary of alien language, find order of characters.",
        difficulty: "hard",
      },
    ]);

    console.log("✅ 20 questions seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding questions:", err);
    process.exit(1);
  }
};

seed();

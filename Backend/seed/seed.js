import { db } from "../db/index.js";
import { questionsTable } from "../db/schema.js";

const questions = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "easy",
    answers: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. The input is given as an array of characters s.",
    difficulty: "easy",
    answers: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "easy",
    answers: `function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  
  for (const char of s) {
    if (char in pairs) {
      stack.push(char);
    } else {
      if (stack.length === 0) return false;
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  return stack.length === 0;
}`
  },
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise. Solve it without converting the integer to a string.",
    difficulty: "easy",
    answers: `function isPalindrome(x) {
      if (x < 0) return false;
      let reversed = 0, original = x;
      while (x > 0) {
        reversed = reversed * 10 + (x % 10);
        x = Math.floor(x / 10);
      }
      return original === reversed;
    }`
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
    difficulty: "easy",
    answers: `function mergeTwoLists(l1, l2) {
      if (!l1) return l2;
      if (!l2) return l1;
      if (l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
      } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
      }
    }`
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    difficulty: "medium",
    answers: `function maxSubArray(nums) {
      let maxSum = nums[0];
      let currentSum = nums[0];
      
      for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
      }
      
      return maxSum;
    }`
  },
  {
    title: "Group Anagrams",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    difficulty: "medium",
    answers: `function groupAnagrams(strs) {
      const map = new Map();
      
      for (const str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) {
          map.set(sorted, []);
        }
        map.get(sorted).push(str);
      }
      
      return Array.from(map.values());
    }`
  },
  {
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    difficulty: "hard",
    answers: `function findMedianSortedArrays(nums1, nums2) {
      if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
      }
      
      const m = nums1.length;
      const n = nums2.length;
      let left = 0;
      let right = m;
      
      while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
          if ((m + n) % 2 === 0) {
            return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
          } else {
            return Math.max(maxLeftX, maxLeftY);
          }
        } else if (maxLeftX > minRightY) {
          right = partitionX - 1;
        } else {
          left = partitionX + 1;
        }
      }
    }`
  }
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    console.log("Deleting existing questions...");
    await db.delete(questionsTable);

    console.log(`Inserting ${questions.length} questions...`);
    await db.insert(questionsTable).values(questions);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();

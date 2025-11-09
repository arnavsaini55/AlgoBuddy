// Backend/seed/seed.js
import { db } from "../db/index.js";
import { questionsTable } from "../db/schema.js";
import { sql } from "drizzle-orm";

const seed = async () => {
  try {
    console.log("🌱 Starting seed...");

    // Clear existing questions
    await db.execute(sql`DELETE FROM questions;`);
    console.log("🧹 Cleared existing questions table.");

  // Insert 60 questions (20 Easy, 25 Medium, 15 Hard)
  // Build questions array first so we can derive `expectedOutput` when missing
  const questionsArray = [
      // ===================== EASY (20) =====================
      {
        title: "Two Sum",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9.`,
        difficulty: "Easy",
        inputFormat: "nums = [int], target = int",
        outputFormat: "[int, int]",
        constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i], target <= 10^9",
        sampleTestcases: [
          { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
          { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        expectedFunctionName: "twoSum",
        language: "javascript",
        starterCode: "function twoSum(nums, target) {\n  // return [i, j]\n}",
        correctAnswer:
`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
        tags: ["array", "hashmap"]
      },
      {
        title: "Reverse String",
        description: `Write a function that reverses a string and returns it.

Example:
Input: s = "hello"
Output: "olleh"`,
        difficulty: "Easy",
        inputFormat: "s = string",
        outputFormat: "string",
        constraints: "1 <= s.length <= 10^5",
        sampleTestcases: [
          { input: "s = 'hello'", output: "'olleh'" },
          { input: "s = 'React'", output: "'tcaeR'" }
        ],
        expectedFunctionName: "reverseString",
        language: "javascript",
        starterCode: "function reverseString(s) {\n  // return reversed string\n}",
        correctAnswer:
`function reverseString(s) {
  return s.split('').reverse().join('');
}`,
        tags: ["string"]
      },
      {
        title: "Palindrome Number",
        description: `Given an integer x, return true if x is a palindrome, otherwise false.

Example:
Input: x = 121
Output: true`,
        difficulty: "Easy",
        inputFormat: "x = int",
        outputFormat: "boolean",
        constraints: "-2^31 <= x <= 2^31 - 1",
        sampleTestcases: [
          { input: "x = 121", output: "true" },
          { input: "x = -121", output: "false" }
        ],
        expectedFunctionName: "isPalindrome",
        language: "javascript",
        starterCode: "function isPalindrome(x) {\n  // return boolean\n}",
        correctAnswer:
`function isPalindrome(x) {
  if (x < 0) return false;
  const s = String(x);
  return s === s.split('').reverse().join('');
}`,
        tags: ["math", "string"]
      },
      {
        title: "Valid Parentheses",
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

Example:
Input: s = "()[]{}"
Output: true`,
        difficulty: "Easy",
        inputFormat: "s = string",
        outputFormat: "boolean",
        constraints: "1 <= s.length <= 10^4",
        sampleTestcases: [
          { input: "s = '()'", output: "true" },
          { input: "s = '([)]'", output: "false" }
        ],
        expectedFunctionName: "isValid",
        language: "javascript",
        starterCode: "function isValid(s) {\n  // return boolean\n}",
        correctAnswer:
`function isValid(s) {
  const map = { ')':'(', ']':'[', '}':'{' };
  const stack = [];
  for (const ch of s) {
    if (!map[ch]) stack.push(ch);
    else if (stack.pop() !== map[ch]) return false;
  }
  return stack.length === 0;
}`,
        tags: ["stack", "string"]
      },
      {
        title: "Merge Two Sorted Lists (array)",
        description: `Merge two sorted arrays and return a new sorted array.

Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]`,
        difficulty: "Easy",
        inputFormat: "list1 = [int], list2 = [int]",
        outputFormat: "[int]",
        constraints: "0 <= list length <= 10^4",
        sampleTestcases: [
          { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }
        ],
        expectedFunctionName: "mergeTwoLists",
        language: "javascript",
        starterCode: "function mergeTwoLists(a, b) {\n  // arrays as lists\n}",
        correctAnswer:
`function mergeTwoLists(a, b) {
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }
  while (i < a.length) res.push(a[i++]);
  while (j < b.length) res.push(b[j++]);
  return res;
}`,
        tags: ["array"]
      },
      {
        title: "Contains Duplicate",
        description: `Return true if any value appears at least twice in the array.

Example:
Input: nums = [1,2,3,1]
Output: true`,
        difficulty: "Easy",
        inputFormat: "nums = [int]",
        outputFormat: "boolean",
        constraints: "1 <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [1,2,3,1]", output: "true" },
          { input: "nums = [1,2,3,4]", output: "false" }
        ],
        expectedFunctionName: "containsDuplicate",
        language: "javascript",
        starterCode: "function containsDuplicate(nums) {\n  // return boolean\n}",
        correctAnswer:
`function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}`,
        tags: ["hashset", "array"]
      },
      {
        title: "Single Number",
        description: `Given a non-empty array of integers where every element appears twice except for one, find that single one.

Example:
Input: nums = [2,2,1]
Output: 1`,
        difficulty: "Easy",
        inputFormat: "nums = [int]",
        outputFormat: "int",
        constraints: "2 <= nums.length <= 3*10^4",
        sampleTestcases: [
          { input: "nums = [2,2,1]", output: "1" },
          { input: "nums = [4,1,2,1,2]", output: "4" }
        ],
        expectedFunctionName: "singleNumber",
        language: "javascript",
        starterCode: "function singleNumber(nums) {\n  // return single number\n}",
        correctAnswer:
`function singleNumber(nums) {
  return nums.reduce((a, b) => a ^ b, 0);
}`,
        tags: ["bit-manipulation"]
      },
      {
        title: "Plus One",
        description: `Given a non-empty array of digits representing a non-negative integer, add one to the integer.

Example:
Input: digits = [1,2,3]
Output: [1,2,4]`,
        difficulty: "Easy",
        inputFormat: "digits = [int]",
        outputFormat: "[int]",
        constraints: "1 <= digits.length <= 1000",
        sampleTestcases: [
          { input: "digits = [1,2,3]", output: "[1,2,4]" },
          { input: "digits = [9]", output: "[1,0]" }
        ],
        expectedFunctionName: "plusOne",
        language: "javascript",
        starterCode: "function plusOne(digits) {\n  // return digits after +1\n}",
        correctAnswer:
`function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) { digits[i]++; return digits; }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
}`,
        tags: ["array", "math"]
      },
      {
        title: "Move Zeroes",
        description: `Move all 0's to the end while maintaining relative order of non-zero elements (in-place).

Example:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]`,
        difficulty: "Easy",
        inputFormat: "nums = [int]",
        outputFormat: "[int]",
        constraints: "1 <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" }
        ],
        expectedFunctionName: "moveZeroes",
        language: "javascript",
        starterCode: "function moveZeroes(nums) {\n  // modify nums in-place\n}",
        correctAnswer:
`function moveZeroes(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) nums[j++] = nums[i];
  }
  while (j < nums.length) nums[j++] = 0;
  return nums;
}`,
        tags: ["array", "two-pointers"]
      },
      {
        title: "Valid Anagram",
        description: `Given two strings s and t, return true if t is an anagram of s.

Example:
Input: s = "anagram", t = "nagaram"
Output: true`,
        difficulty: "Easy",
        inputFormat: "s = string, t = string",
        outputFormat: "boolean",
        constraints: "1 <= s.length, t.length <= 5*10^4",
        sampleTestcases: [
          { input: "s = 'anagram', t = 'nagaram'", output: "true" },
          { input: "s = 'rat', t = 'car'", output: "false" }
        ],
        expectedFunctionName: "isAnagram",
        language: "javascript",
        starterCode: "function isAnagram(s, t) {\n  // return boolean\n}",
        correctAnswer:
`function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const cnt = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    cnt[s.charCodeAt(i) - 97]++;
    cnt[t.charCodeAt(i) - 97]--;
  }
  return cnt.every(x => x === 0);
}`,
        tags: ["hashmap", "string"]
      },
      {
        title: "Sqrt(x)",
        description: `Compute and return the integer square root of x (floor).

Example:
Input: x = 8
Output: 2`,
        difficulty: "Easy",
        inputFormat: "x = int",
        outputFormat: "int",
        constraints: "0 <= x <= 2^31 - 1",
        sampleTestcases: [
          { input: "x = 4", output: "2" },
          { input: "x = 8", output: "2" }
        ],
        expectedFunctionName: "mySqrt",
        language: "javascript",
        starterCode: "function mySqrt(x) {\n  // return floor(sqrt(x))\n}",
        correctAnswer:
`function mySqrt(x) {
  let l = 0, r = x;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (m * m <= x) l = m + 1;
    else r = m - 1;
  }
  return r;
}`,
        tags: ["binary-search", "math"]
      },
      {
        title: "Climbing Stairs",
        description: `Each time you can climb 1 or 2 steps. Return number of distinct ways to reach n.

Example:
Input: n = 3
Output: 3`,
        difficulty: "Easy",
        inputFormat: "n = int",
        outputFormat: "int",
        constraints: "1 <= n <= 45",
        sampleTestcases: [
          { input: "n = 2", output: "2" },
          { input: "n = 3", output: "3" }
        ],
        expectedFunctionName: "climbStairs",
        language: "javascript",
        starterCode: "function climbStairs(n) {\n  // return ways\n}",
        correctAnswer:
`function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
        tags: ["dp", "math"]
      },
      {
        title: "Binary Search",
        description: `Search for target in sorted array; return index or -1.

Example:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4`,
        difficulty: "Easy",
        inputFormat: "nums = [int], target = int",
        outputFormat: "int",
        constraints: "1 <= nums.length <= 10^4",
        sampleTestcases: [
          { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
          { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
        ],
        expectedFunctionName: "search",
        language: "javascript",
        starterCode: "function search(nums, target) {\n  // binary search\n}",
        correctAnswer:
`function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}`,
        tags: ["binary-search", "array"]
      },
      {
        title: "Maximum Subarray",
        description: `Find contiguous subarray with largest sum (Kadane's algorithm).

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.`,
        difficulty: "Easy",
        inputFormat: "nums = [int]",
        outputFormat: "int",
        constraints: "1 <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }
        ],
        expectedFunctionName: "maxSubArray",
        language: "javascript",
        starterCode: "function maxSubArray(nums) {\n  // return max sum\n}",
        correctAnswer:
`function maxSubArray(nums) {
  let maxSoFar = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    maxSoFar = Math.max(maxSoFar, cur);
  }
  return maxSoFar;
}`,
        tags: ["dp", "array"]
      },

      // ===================== MEDIUM (25) =====================
      {
        title: "Add Two Numbers",
        description: `Add two numbers represented by arrays of digits (least-significant digit last). Return resulting array.

Example:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]`,
        difficulty: "Medium",
        inputFormat: "l1 = [int], l2 = [int]",
        outputFormat: "[int]",
        constraints: "1 <= length <= 1000",
        sampleTestcases: [
          { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" }
        ],
        expectedFunctionName: "addTwoNumbers",
        language: "javascript",
        starterCode: "function addTwoNumbers(a, b) {\n  // arrays represent reversed digits\n}",
        correctAnswer:
`function addTwoNumbers(a, b) {
  const res = [];
  let carry = 0, i = 0;
  while (i < a.length || i < b.length || carry) {
    const x = i < a.length ? a[i] : 0;
    const y = i < b.length ? b[i] : 0;
    const sum = x + y + carry;
    res.push(sum % 10);
    carry = Math.floor(sum / 10);
    i++;
  }
  return res;
}`,
        tags: ["math", "linked-list"]
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description: `Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3`,
        difficulty: "Medium",
        inputFormat: "s = string",
        outputFormat: "int",
        constraints: "0 <= s.length <= 5*10^4",
        sampleTestcases: [
          { input: "s = 'abcabcbb'", output: "3" },
          { input: "s = 'bbbbb'", output: "1" }
        ],
        expectedFunctionName: "lengthOfLongestSubstring",
        language: "javascript",
        starterCode: "function lengthOfLongestSubstring(s) {\n  // sliding window\n}",
        correctAnswer:
`function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1);
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        tags: ["string", "sliding-window"]
      },
      {
        title: "Group Anagrams",
        description: `Group anagrams together from an array of strings.

Example:
Input: ["eat","tea","tan","ate","nat","bat"]
Output: [["eat","tea","ate"],["tan","nat"],["bat"]]`,
        difficulty: "Medium",
        inputFormat: "strs = [string]",
        outputFormat: "[[string]]",
        constraints: "1 <= strs.length <= 10^4",
        sampleTestcases: [
          { input: "['eat','tea','tan','ate','nat','bat']", output: "[['eat','tea','ate'],['tan','nat'],['bat']]" }
        ],
        expectedFunctionName: "groupAnagrams",
        language: "javascript",
        starterCode: "function groupAnagrams(strs) {\n  // group and return nested array\n}",
        correctAnswer:
`function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`,
        tags: ["hashmap", "string", "sorting"]
      },
      {
        title: "Top K Frequent Elements",
        description: `Return the k most frequent elements from the array.

Example:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]`,
        difficulty: "Medium",
        inputFormat: "nums = [int], k = int",
        outputFormat: "[int]",
        constraints: "1 <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }
        ],
        expectedFunctionName: "topKFrequent",
        language: "javascript",
        starterCode: "function topKFrequent(nums, k) {\n  // return top k elements\n}",
        correctAnswer:
`function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
  return Array.from(map.entries())
    .sort((a,b) => b[1] - a[1])
    .slice(0,k)
    .map(x => x[0]);
}`,
        tags: ["heap", "hashmap", "sorting"]
      },
      {
        title: "Product of Array Except Self",
        description: `Return an array where output[i] is product of all elements except nums[i] (without using division).

Example:
Input: [1,2,3,4]
Output: [24,12,8,6]`,
        difficulty: "Medium",
        inputFormat: "nums = [int]",
        outputFormat: "[int]",
        constraints: "2 <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }
        ],
        expectedFunctionName: "productExceptSelf",
        language: "javascript",
        starterCode: "function productExceptSelf(nums) {\n  // return array\n}",
        correctAnswer:
`function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { res[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = n -1; i >=0; i--) { res[i] *= right; right *= nums[i]; }
  return res;
}`,
        tags: ["array", "prefix-suffix"]
      },
      {
        title: "Validate Binary Search Tree",
        description: `Given a binary tree (level-order array with nulls), determine if it is a valid BST.

Example:
Input: [2,1,3]
Output: true`,
        difficulty: "Medium",
        inputFormat: "arr = [int|null]",
        outputFormat: "boolean",
        constraints: "number of nodes <= 10^4",
        sampleTestcases: [
          { input: "arr = [2,1,3]", output: "true" },
          { input: "arr = [5,1,4,null,null,3,6]", output: "false" }
        ],
        expectedFunctionName: "isValidBST",
        language: "javascript",
        starterCode: "function isValidBST(arr) {\n  // convert level-order array to tree then validate\n}",
        correctAnswer:
`function isValidBST(arr) {
  function check(i, low, high) {
    if (i >= arr.length || arr[i] === null) return true;
    const v = arr[i];
    if (v <= low || v >= high) return false;
    const leftIdx = 2*i + 1, rightIdx = 2*i + 2;
    return check(leftIdx, low, v) && check(rightIdx, v, high);
  }
  return check(0, -Infinity, Infinity);
}`,
        tags: ["tree", "bst", "dfs"]
      },
      {
        title: "Minimum Path Sum",
        description: `Given an m x n grid filled with non-negative numbers, find a path from top-left to bottom-right which minimizes the sum of all numbers along its path.

Example:
Input: [[1,3,1],[1,5,1],[4,2,1]]
Output: 7`,
        difficulty: "Medium",
        inputFormat: "grid = [[int]]",
        outputFormat: "int",
        constraints: "1 <= m,n <= 200",
        sampleTestcases: [
          { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7" }
        ],
        expectedFunctionName: "minPathSum",
        language: "javascript",
        starterCode: "function minPathSum(grid) {\n  // return min sum\n}",
        correctAnswer:
`function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  for (let i = 1; i < n; i++) grid[0][i] += grid[0][i-1];
  for (let i = 1; i < m; i++) grid[i][0] += grid[i-1][0];
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
    }
  }
  return grid[m-1][n-1];
}`,
        tags: ["dp", "matrix"]
      },
      {
        title: "Word Break",
        description: `Given a string s and a dictionary of words wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Example:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true`,
        difficulty: "Medium",
        inputFormat: "s = string, wordDict = [string]",
        outputFormat: "boolean",
        constraints: "1 <= s.length <= 300",
        sampleTestcases: [
          { input: "s = 'leetcode', wordDict = ['leet','code']", output: "true" },
          { input: "s = 'applepenapple', wordDict = ['apple','pen']", output: "true" }
        ],
        expectedFunctionName: "wordBreak",
        language: "javascript",
        starterCode: "function wordBreak(s, wordDict) {\n  // return boolean\n}",
        correctAnswer:
`function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}`,
        tags: ["dp", "string"]
      },
      {
        title: "Topological Sort (Kahn)",
        description: `Return a topological order of directed acyclic graph nodes if possible.

Example:
Input: n = 2, edges = [[1,0]]
Output: [1,0]`,
        difficulty: "Medium",
        inputFormat: "n = int, edges = [[u,v]]",
        outputFormat: "[int] or []",
        constraints: "1 <= n <= 10^5",
        sampleTestcases: [
          { input: "n=2, edges=[[1,0]]", output: "[1,0]" }
        ],
        expectedFunctionName: "topoSort",
        language: "javascript",
        starterCode: "function topoSort(n, edges) {\n  // return topo order or []\n}",
        correctAnswer:
`function topoSort(n, edges) {
  const adj = Array.from({length:n},()=>[]);
  const indeg = new Array(n).fill(0);
  for (const [u,v] of edges) { adj[u].push(v); indeg[v]++; }
  const q = [];
  for (let i=0;i<n;i++) if (indeg[i]===0) q.push(i);
  const res = [];
  while (q.length) {
    const u = q.shift();
    res.push(u);
    for (const v of adj[u]) if (--indeg[v]===0) q.push(v);
  }
  return res.length===n?res:[];
}`,
        tags: ["graph", "bfs"]
      },
      {
        title: "Number of Islands",
        description: `Given a 2D grid of '1's (land) and '0's (water), count the number of islands.

Example:
Input:
[
 ["1","1","0","0","0"],
 ["1","1","0","0","0"],
 ["0","0","1","0","0"],
 ["0","0","0","1","1"]
]
Output: 3`,
        difficulty: "Medium",
        inputFormat: "grid = [[char]]",
        outputFormat: "int",
        constraints: "m,n <= 300",
        sampleTestcases: [
          { input: "[['1','1','0'],['0','1','0'],['1','0','1']]", output: "3" }
        ],
        expectedFunctionName: "numIslands",
        language: "javascript",
        starterCode: "function numIslands(grid) {\n  // return count\n}",
        correctAnswer:
`function numIslands(grid) {
  if (!grid.length) return 0;
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(i,j) {
    if (i<0||j<0||i>=m||j>=n||grid[i][j]!=='1') return;
    grid[i][j]='0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  }
  for (let i=0;i<m;i++) for (let j=0;j<n;j++) if (grid[i][j]==='1') { count++; dfs(i,j); }
  return count;
}`,
        tags: ["dfs", "graph", "matrix"]
      },
      {
        title: "Rotate Image",
        description: `Rotate an n x n 2D matrix representing an image by 90 degrees (clockwise) in-place.

Example:
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]`,
        difficulty: "Medium",
        inputFormat: "matrix = [[int]]",
        outputFormat: "[[int]]",
        constraints: "1 <= n <= 20",
        sampleTestcases: [
          { input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }
        ],
        expectedFunctionName: "rotate",
        language: "javascript",
        starterCode: "function rotate(matrix) {\n  // in-place rotate\n}",
        correctAnswer:
`function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let i = 0; i < n; i++) matrix[i].reverse();
  return matrix;
}`,
        tags: ["matrix", "in-place"]
      },
      {
        title: "Find Peak Element",
        description: `Find a peak element and return its index. An element is a peak if it is greater than its neighbors.

Example:
Input: [1,2,3,1]
Output: 2`,
        difficulty: "Medium",
        inputFormat: "nums = [int]",
        outputFormat: "int",
        constraints: "1 <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [1,2,3,1]", output: "2" }
        ],
        expectedFunctionName: "findPeakElement",
        language: "javascript",
        starterCode: "function findPeakElement(nums) {\n  // return index\n}",
        correctAnswer:
`function findPeakElement(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[m+1]) r = m;
    else l = m + 1;
  }
  return l;
}`,
        tags: ["binary-search", "array"]
      },
      {
        title: "Search a 2D Matrix",
        description: `Write an efficient algorithm that searches for a value target in an m x n matrix. The matrix has the property that integers in each row are sorted and the next row's first integer is greater than the previous row's last integer.

Example:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target = 3
Output: true`,
        difficulty: "Medium",
        inputFormat: "matrix = [[int]], target = int",
        outputFormat: "boolean",
        constraints: "m,n >= 1",
        sampleTestcases: [
          { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target=3", output: "true" }
        ],
        expectedFunctionName: "searchMatrix",
        language: "javascript",
        starterCode: "function searchMatrix(matrix, target) {\n  // return boolean\n}",
        correctAnswer:
`function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let l = 0, r = m*n -1;
  while (l <= r) {
    const mid = Math.floor((l + r)/2);
    const val = matrix[Math.floor(mid/n)][mid % n];
    if (val === target) return true;
    if (val < target) l = mid + 1;
    else r = mid - 1;
  }
  return false;
}`,
        tags: ["binary-search", "matrix"]
      },
      {
        title: "Kth Largest Element",
        description: `Find the kth largest element in an unsorted array.

Example:
Input: [3,2,1,5,6,4], k = 2
Output: 5`,
        difficulty: "Medium",
        inputFormat: "nums = [int], k = int",
        outputFormat: "int",
        constraints: "1 <= k <= nums.length <= 10^5",
        sampleTestcases: [
          { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }
        ],
        expectedFunctionName: "findKthLargest",
        language: "javascript",
        starterCode: "function findKthLargest(nums, k) {\n  // return kth largest\n}",
        correctAnswer:
`function findKthLargest(nums, k) {
  return nums.sort((a,b)=>b-a)[k-1];
}`,
        tags: ["sorting", "heap"]
      },
      {
        title: "Longest Palindromic Substring",
        description: `Return the longest palindromic substring in s.

Example:
Input: s = "babad"
Output: "bab" (or "aba")`,
        difficulty: "Medium",
        inputFormat: "s = string",
        outputFormat: "string",
        constraints: "1 <= s.length <= 1000",
        sampleTestcases: [
          { input: "s = 'babad'", output: "'bab' or 'aba'" }
        ],
        expectedFunctionName: "longestPalindrome",
        language: "javascript",
        starterCode: "function longestPalindrome(s) {\n  // return substring\n}",
        correctAnswer:
`function longestPalindrome(s) {
  if (!s) return "";
  let start = 0, end = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return r - l - 1;
  }
  for (let i = 0; i < s.length; i++) {
    const len1 = expand(i, i);
    const len2 = expand(i, i+1);
    const len = Math.max(len1, len2);
    if (len > end - start + 1) {
      start = i - Math.floor((len-1)/2);
      end = i + Math.floor(len/2);
    }
  }
  return s.slice(start, end+1);
}`,
        tags: ["string", "dp"]
      },
      {
        title: "Course Schedule",
        description: `Given the number of courses and prerequisites, determine if you can finish all courses.

Example:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true`,
        difficulty: "Medium",
        inputFormat: "numCourses = int, prerequisites = [[int,int]]",
        outputFormat: "boolean",
        constraints: "1 <= numCourses <= 10^5",
        sampleTestcases: [
          { input: "numCourses=2, prerequisites=[[1,0]]", output: "true" }
        ],
        expectedFunctionName: "canFinish",
        language: "javascript",
        starterCode: "function canFinish(numCourses, prerequisites) {\n  // return boolean\n}",
        correctAnswer:
`function canFinish(numCourses, prerequisites) {
  const adj = Array.from({length:numCourses}, ()=>[]);
  const indeg = Array(numCourses).fill(0);
  for (const [a,b] of prerequisites) { adj[b].push(a); indeg[a]++; }
  const q = [];
  for (let i=0;i<numCourses;i++) if (indeg[i]===0) q.push(i);
  let cnt = 0;
  while (q.length) {
    const u = q.shift(); cnt++;
    for (const v of adj[u]) if (--indeg[v]===0) q.push(v);
  }
  return cnt === numCourses;
}`,
        tags: ["graph", "bfs"]
      },
      {
        title: "Binary Tree Inorder Traversal",
        description: `Return inorder traversal array for a binary tree.

Example:
Input: root = [1,null,2,3] (level-order)
Output: [1,3,2]`,
        difficulty: "Medium",
        inputFormat: "root = TreeNode",
        outputFormat: "[int]",
        constraints: "number of nodes <= 10^4",
        sampleTestcases: [
          { input: "root=[1,null,2,3] (level-order)", output: "[1,3,2]" }
        ],
        expectedFunctionName: "inorderTraversal",
        language: "javascript",
        starterCode: "function inorderTraversal(root) {\n  // return array\n}",
        correctAnswer:
`function inorderTraversal(root) {
  const res = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return res;
}`,
        tags: ["tree", "dfs"]
      },
      {
        title: "Serialize and Deserialize BST (simple)",
        description: `Serialize and deserialize a BST using preorder with markers.

Example:
Input: [2,1,3]
Operation: serialize -> deserialize -> original tree restored`,
        difficulty: "Medium",
        inputFormat: "root = TreeNode",
        outputFormat: "string",
        constraints: "number of nodes <= 10^4",
        sampleTestcases: [
          { input: "root=[2,1,3]", output: "serialized string then original tree after deserialization" }
        ],
        expectedFunctionName: "Codec",
        language: "javascript",
        starterCode: "class Codec {\n  serialize(root) {}\n  deserialize(data) {}\n}",
        correctAnswer:
`class Codec {
  serialize(root) {
    const res = [];
    function dfs(node){
      if(!node){ res.push('#'); return; }
      res.push(String(node.val));
      dfs(node.left); dfs(node.right);
    }
    dfs(root);
    return res.join(',');
  }
  deserialize(data) {
    const arr = data.split(',');
    function build() {
      if (!arr.length) return null;
      const val = arr.shift();
      if (val === '#') return null;
      const node = { val: Number(val), left: null, right: null };
      node.left = build();
      node.right = build();
      return node;
    }
    return build();
  }
}`,
        tags: ["tree", "design"]
      },

      // ===================== HARD (15) =====================
      {
        title: "Median of Two Sorted Arrays",
        description: `Find the median of two sorted arrays with overall run time complexity O(log (m+n)).

Example:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.0`,
        difficulty: "Hard",
        inputFormat: "nums1 = [int], nums2 = [int]",
        outputFormat: "float",
        constraints: "0 <= m, n <= 10^5",
        sampleTestcases: [
          { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }
        ],
        expectedFunctionName: "findMedianSortedArrays",
        language: "javascript",
        starterCode: "function findMedianSortedArrays(a, b) {\n  // return median\n}",
        correctAnswer:
`function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a];
  const m = a.length, n = b.length;
  let imin = 0, imax = m, half = Math.floor((m + n + 1)/2);
  while (imin <= imax) {
    const i = Math.floor((imin + imax)/2);
    const j = half - i;
    if (i < m && b[j-1] > a[i]) imin = i + 1;
    else if (i > 0 && a[i-1] > b[j]) imax = i - 1;
    else {
      const maxLeft = i === 0 ? b[j-1] : j === 0 ? a[i-1] : Math.max(a[i-1], b[j-1]);
      if ((m+n) % 2 === 1) return maxLeft;
      const minRight = i === m ? b[j] : j === n ? a[i] : Math.min(a[i], b[j]);
      return (maxLeft + minRight) / 2;
    }
  }
  return 0;
}`,
        tags: ["binary-search", "divide-and-conquer"]
      },
      {
        title: "Trapping Rain Water",
        description: `Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.

Example:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6`,
        difficulty: "Hard",
        inputFormat: "height = [int]",
        outputFormat: "int",
        constraints: "1 <= height.length <= 2*10^4",
        sampleTestcases: [
          { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
        ],
        expectedFunctionName: "trap",
        language: "javascript",
        starterCode: "function trap(height) {\n  // return trapped water\n}",
        correctAnswer:
`function trap(height) {
  let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, res = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      res += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      res += rightMax - height[right];
      right--;
    }
  }
  return res;
}`,
        tags: ["two-pointers", "stack"]
      },
      {
        title: "Merge k Sorted Lists",
        description: `Merge k sorted linked lists and return it as one sorted list (use arrays for I/O).

Example:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]`,
        difficulty: "Hard",
        inputFormat: "lists = [[int]]",
        outputFormat: "[int]",
        constraints: "k <= 10^4, total nodes <= 10^5",
        sampleTestcases: [
          { input: "lists=[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }
        ],
        expectedFunctionName: "mergeKLists",
        language: "javascript",
        starterCode: "function mergeKLists(lists) {\n  // return merged array\n}",
        correctAnswer:
`function mergeKLists(lists) {
  const res = [];
  for (const l of lists) for (const v of l) res.push(v);
  res.sort((a,b)=>a-b);
  return res;
}`,
        tags: ["heap", "divide-and-conquer"]
      },
      {
        title: "Word Ladder (length)",
        description: `Given beginWord, endWord and wordList, return the length of shortest transformation sequence from beginWord to endWord.

Example:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5`,
        difficulty: "Hard",
        inputFormat: "beginWord = string, endWord = string, wordList = [string]",
        outputFormat: "int",
        constraints: "word length <= 10^4",
        sampleTestcases: [
          { input: "begin='hit', end='cog', wordList=['hot','dot','dog','lot','log','cog']", output: "5" }
        ],
        expectedFunctionName: "ladderLength",
        language: "javascript",
        starterCode: "function ladderLength(beginWord, endWord, wordList) {\n  // return length\n}",
        correctAnswer:
`function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const q = [[beginWord,1]];
  const visited = new Set([beginWord]);
  while (q.length) {
    const [word,steps] = q.shift();
    if (word === endWord) return steps;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const ch = String.fromCharCode(c);
        const nxt = word.slice(0,i) + ch + word.slice(i+1);
        if (wordSet.has(nxt) && !visited.has(nxt)) {
          visited.add(nxt);
          q.push([nxt, steps+1]);
        }
      }
    }
  }
  return 0;
}`,
        tags: ["bfs", "graph"]
      },
      {
        title: "N-Queens (all solutions)",
        description: `Return all distinct solutions to the n-queens puzzle.

Example:
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`,
        difficulty: "Hard",
        inputFormat: "n = int",
        outputFormat: "[[string]]",
        constraints: "1 <= n <= 9",
        sampleTestcases: [
          { input: "n = 4", output: "[['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]" }
        ],
        expectedFunctionName: "solveNQueens",
        language: "javascript",
        starterCode: "function solveNQueens(n) {\n  // return list of board strings\n}",
        correctAnswer:
`function solveNQueens(n) {
  const res = [];
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const board = Array.from({length:n}, ()=>'.'.repeat(n).split(''));
  function dfs(r) {
    if (r === n) {
      res.push(board.map(row=>row.join('')));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(r+c) || diag2.has(r-c)) continue;
      cols.add(c); diag1.add(r+c); diag2.add(r-c);
      board[r][c] = 'Q';
      dfs(r+1);
      board[r][c] = '.';
      cols.delete(c); diag1.delete(r+c); diag2.delete(r-c);
    }
  }
  dfs(0);
  return res;
}`,
        tags: ["backtracking", "dfs"]
      },
      {
        title: "Longest Valid Parentheses",
        description: `Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Example:
Input: s = "(()"
Output: 2`,
        difficulty: "Hard",
        inputFormat: "s = string",
        outputFormat: "int",
        constraints: "0 <= s.length <= 3*10^4",
        sampleTestcases: [
          { input: "s = '(()'", output: "2" },
          { input: "s = ')()())'", output: "4" }
        ],
        expectedFunctionName: "longestValidParentheses",
        language: "javascript",
        starterCode: "function longestValidParentheses(s) {\n  // return length\n}",
        correctAnswer:
`function longestValidParentheses(s) {
  const stack = [-1];
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') stack.push(i);
    else {
      stack.pop();
      if (!stack.length) stack.push(i);
      else maxLen = Math.max(maxLen, i - stack[stack.length-1]);
    }
  }
  return maxLen;
}`,
        tags: ["stack", "dp"]
      },
      {
        title: "Maximum Path Sum (binary tree)",
        description: `Given a non-empty binary tree, find the maximum path sum. The path may start and end at any node.

Example:
Input: [1,2,3]
Output: 6`,
        difficulty: "Hard",
        inputFormat: "root = TreeNode",
        outputFormat: "int",
        constraints: "number of nodes <= 3*10^4",
        sampleTestcases: [
          { input: "root = [1,2,3]", output: "6" }
        ],
        expectedFunctionName: "maxPathSum",
        language: "javascript",
        starterCode: "function maxPathSum(root) {\n  // return max sum\n}",
        correctAnswer:
`function maxPathSum(root) {
  let ans = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    ans = Math.max(ans, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return ans;
}`,
        tags: ["tree", "dfs"]
      },
      {
        title: "Serialize and Deserialize Binary Tree",
        description: `Design an algorithm to serialize and deserialize a binary tree.

Example:
Input: [1,2,3,null,null,4,5]
Operation: serialize -> deserialize -> original tree restored`,
        difficulty: "Hard",
        inputFormat: "root = TreeNode",
        outputFormat: "string",
        constraints: "number of nodes <= 10^4",
        sampleTestcases: [
          { input: "root=[1,2,3,null,null,4,5]", output: "string then original tree after deserialization" }
        ],
        expectedFunctionName: "CodecTree",
        language: "javascript",
        starterCode: "class CodecTree {\n  serialize(root) {}\n  deserialize(data) {}\n}",
        correctAnswer:
`class CodecTree {
  serialize(root) {
    const res = [];
    function dfs(n){
      if(!n){ res.push('#'); return; }
      res.push(String(n.val));
      dfs(n.left); dfs(n.right);
    }
    dfs(root);
    return res.join(',');
  }
  deserialize(data) {
    const arr = data.split(',');
    function build() {
      if (!arr.length) return null;
      const v = arr.shift();
      if (v === '#') return null;
      const node = { val: Number(v), left: null, right: null};
      node.left = build();
      node.right = build();
      return node;
    }
    return build();
  }
}`,
        tags: ["tree", "design"]
      },
      {
        title: "Word Search II (backtracking + trie)",
        description: `Given an m x n board and a list of words, return all words on the board.

Example:
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["oath","eat"]`,
        difficulty: "Hard",
        inputFormat: "board = [[char]], words = [string]",
        outputFormat: "[string]",
        constraints: "board <= 12x12, words <= 10^4",
        sampleTestcases: [
          { input: "board=[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words=['oath','pea','eat','rain']", output: "['oath','eat']" }
        ],
        expectedFunctionName: "findWords",
        language: "javascript",
        starterCode: "function findWords(board, words) {\n  // return words found\n}",
        correctAnswer:
`function findWords(board, words) {
  const m = board.length, n = board[0].length;
  const trie = {};
  for (const w of words) {
    let node = trie;
    for (const ch of w) { node[ch] = node[ch] || {}; node = node[ch]; }
    node.word = w;
  }
  const res = new Set();
  function dfs(i,j,node) {
    const ch = board[i][j];
    if (!node[ch]) return;
    node = node[ch];
    if (node.word) res.add(node.word);
    board[i][j] = '#';
    for (const [di,dj] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const ni=i+di, nj=j+dj;
      if (ni>=0 && ni<m && nj>=0 && nj<n && board[ni][nj] !== '#') dfs(ni,nj,node);
    }
    board[i][j] = ch;
  }
  for (let i=0;i<m;i++) for (let j=0;j<n;j++) dfs(i,j,trie);
  return Array.from(res);
}`,
        tags: ["trie", "backtracking"]
      },
      {
        title: "LRU Cache (design)",
        description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Example:
Operations: put(1,1), put(2,2), get(1), put(3,3), get(2)
Output: [null,null,1,null,-1]`,
        difficulty: "Hard",
        inputFormat: "operations and params",
        outputFormat: "result sequence",
        constraints: "capacity >= 1",
        sampleTestcases: [
          { input: "LRUCache cap=2, ops: put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "[null,null,1,null,-1]" }
        ],
        expectedFunctionName: "LRUCache",
        language: "javascript",
        starterCode: "class LRUCache {\n  constructor(capacity) {}\n  get(key) {}\n  put(key, value) {}\n}",
        correctAnswer:
`class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}`,
        tags: ["design", "hashmap"]
      }
    ];

    // Prepare objects for DB insertion. Do NOT add frontend-only `expectedOutput`.
    const questionsToInsert = questionsArray.map((q) => ({
      title: q.title,
      description: q.description,
      difficulty: q.difficulty,
      inputFormat: q.inputFormat,
      outputFormat: q.outputFormat,
      constraints: q.constraints,
      sampleTestcases: q.sampleTestcases || [],
      expectedFunctionName: q.expectedFunctionName,
      language: q.language || 'javascript',
      starterCode: q.starterCode,
      correctAnswer: q.correctAnswer,
      tags: q.tags || [],
    }));

    await db.insert(questionsTable).values(questionsToInsert);

    console.log("✅ Seeded 60 questions successfully!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    // Try closing DB connection gracefully
    try {
      if (db.$client) await db.$client.end();
      if (db.end) await db.end();
    } catch (e) {
      // ignore close errors
    }
    console.log("🔒 Database connection closed.");
  }
};

seed();

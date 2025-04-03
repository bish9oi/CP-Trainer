

// server/routes.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// ----- MOCK DATASET OF PROBLEMS -----
// You can expand this list as needed.
const mockProblems = [
  {
    id: "p1",
    title: "Two Sum",
    description: "Given an array of integers and a target, return indices of the two numbers such that they add up to the target.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "nums=[2,7,11,15], target=9",
    expectedOutput: "[0,1]"
  },
  {
    id: "p2",
    title: "Longest Increasing Subsequence",
    description: "Given an unsorted array of integers, find the length of the longest increasing subsequence.",
    topic: "dp",
    difficulty: "Medium",
    sampleInput: "nums=[10,9,2,5,3,7,101,18]",
    expectedOutput: "4"
  },
  {
    id: "p3",
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays, find the median of the two sorted arrays.",
    topic: "arrays",
    difficulty: "Hard",
    sampleInput: "nums1=[1,3], nums2=[2]",
    expectedOutput: "2.0"
  },
  {
    id: "p4",
    title: "Cycle Detection in a Directed Graph",
    description: "Given a directed graph, determine if the graph contains a cycle.",
    topic: "graphs",
    difficulty: "Hard",
    sampleInput: "n=4, edges=[[0,1],[1,2],[2,0],[2,3]]",
    expectedOutput: "true"
  },
  {
    id: "p5",
    title: "Inorder Traversal of Binary Tree",
    description: "Given a binary tree, return its inorder traversal.",
    topic: "tree",
    difficulty: "Easy",
    sampleInput: "root=[1,null,2,3]",
    expectedOutput: "[1,3,2]"
  },
  {
    id: "p6",
    title: "Merge k Sorted Lists",
    description: "Merge k sorted linked lists and return one sorted list.",
    topic: "linkedlist",
    difficulty: "Hard",
    sampleInput: "lists=[[1,4,5],[1,3,4],[2,6]]",
    expectedOutput: "[1,1,2,3,4,4,5,6]"
  },
  {
    id: "p7",
    title: "Coin Change",
    description: "Given coins of different denominations and an amount, find the minimum number of coins required.",
    topic: "dp",
    difficulty: "Medium",
    sampleInput: "coins=[1,2,5], amount=11",
    expectedOutput: "3"
  },
  {
    id: "p8",
    title: "Valid Parentheses",
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "s=\"()[]{}\"",
    expectedOutput: "true"
  },
  {
    id: "p9",
    title: "Merge Intervals",
    description: "Given an array of intervals, merge all overlapping intervals.",
    topic: "greedy",
    difficulty: "Medium",
    sampleInput: "intervals=[[1,3],[2,6],[8,10],[15,18]]",
    expectedOutput: "[[1,6],[8,10],[15,18]]"
  },
  {
    id: "p10",
    title: "Quick Sort",
    description: "Implement quick sort to sort an array of integers.",
    topic: "sorting",
    difficulty: "Hard",
    sampleInput: "arr=[10,7,8,9,1,5]",
    expectedOutput: "[1,5,7,8,9,10]"
  },
  {
    id: "p11",
    title: "Binary Search",
    description: "Given a sorted array and a target value, return the index if the target is found.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "arr=[-1,0,3,5,9,12], target=9",
    expectedOutput: "4"
  },
  {
    id: "p12",
    title: "Word Break",
    description: "Given a string and a dictionary of words, determine if the string can be segmented into a space-separated sequence of dictionary words.",
    topic: "dp",
    difficulty: "Medium",
    sampleInput: "s=\"leetcode\", wordDict=[\"leet\",\"code\"]",
    expectedOutput: "true"
  },
  {
    id: "p13",
    title: "Longest Palindromic Substring",
    description: "Given a string, find the longest palindromic substring.",
    topic: "greedy",
    difficulty: "Medium",
    sampleInput: "s=\"babad\"",
    expectedOutput: "\"bab\""
  },
  {
    id: "p14",
    title: "Validate Binary Search Tree",
    description: "Given a binary tree, determine if it is a valid binary search tree (BST).",
    topic: "tree",
    difficulty: "Hard",
    sampleInput: "root=[2,1,3]",
    expectedOutput: "true"
  },
  {
    id: "p15",
    title: "Insertion Sort List",
    description: "Sort a linked list using insertion sort.",
    topic: "linkedlist",
    difficulty: "Easy",
    sampleInput: "head=[4,2,1,3]",
    expectedOutput: "[1,2,3,4]"
  },
  {
    id: "p16",
    title: "Climbing Stairs",
    description: "You are climbing a stair case. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    topic: "dp",
    difficulty: "Easy",
    sampleInput: "n=3",
    expectedOutput: "3"
  },
  {
    id: "p17",
    title: "House Robber",
    description: "Given an integer array representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.",
    topic: "dp",
    difficulty: "Medium",
    sampleInput: "nums=[1,2,3,1]",
    expectedOutput: "4"
  },
  {
    id: "p18",
    title: "Edit Distance",
    description: "Given two strings, compute the minimum number of operations required to convert one string into the other.",
    topic: "dp",
    difficulty: "Hard",
    sampleInput: "word1=\"horse\", word2=\"ros\"",
    expectedOutput: "3"
  },
  {
    id: "p19",
    title: "Number of Islands",
    description: "Given a 2D grid map of '1's (land) and '0's (water), count the number of islands.",
    topic: "graphs",
    difficulty: "Medium",
    sampleInput: "grid=[['1','1','0','0'],['1','0','0','1'],['0','0','1','1']]",
    expectedOutput: "3"
  },
  {
    id: "p20",
    title: "Clone Graph",
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    topic: "graphs",
    difficulty: "Hard",
    sampleInput: "Graph in adjacency list format",
    expectedOutput: "Cloned graph structure"
  },
  {
    id: "p21",
    title: "Best Time to Buy and Sell Stock",
    description: "Given an array of prices where prices[i] is the price of a given stock on day i, find the maximum profit.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "prices=[7,1,5,3,6,4]",
    expectedOutput: "5"
  },
  {
    id: "p22",
    title: "Product of Array Except Self",
    description: "Given an array, return an output array where output[i] is equal to the product of all the elements of nums except nums[i].",
    topic: "arrays",
    difficulty: "Medium",
    sampleInput: "nums=[1,2,3,4]",
    expectedOutput: "[24,12,8,6]"
  },
  {
    id: "p23",
    title: "Find Minimum in Rotated Sorted Array",
    description: "Suppose an array of length n sorted in ascending order is rotated. Find the minimum element.",
    topic: "arrays",
    difficulty: "Hard",
    sampleInput: "nums=[3,4,5,1,2]",
    expectedOutput: "1"
  },
  {
    id: "p24",
    title: "Merge Sorted Array",
    description: "Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "nums1=[1,2,3,0,0,0], m=3; nums2=[2,5,6], n=3",
    expectedOutput: "[1,2,2,3,5,6]"
  },
  {
    id: "p25",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the largest sum.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "nums=[-2,1,-3,4,-1,2,1,-5,4]",
    expectedOutput: "6"
  },
  {
    id: "p26",
    title: "Container With Most Water",
    description: "Given n non-negative integers, find two lines that together with the x-axis form a container that holds the most water.",
    topic: "arrays",
    difficulty: "Medium",
    sampleInput: "heights=[1,8,6,2,5,4,8,3,7]",
    expectedOutput: "49"
  },
  {
    id: "p27",
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    topic: "arrays",
    difficulty: "Hard",
    sampleInput: "heights=[0,1,0,2,1,0,1,3,2,1,2,1]",
    expectedOutput: "6"
  },
  {
    id: "p28",
    title: "Binary Tree Level Order Traversal",
    description: "Return the level order traversal of a binary tree's nodes' values.",
    topic: "tree",
    difficulty: "Easy",
    sampleInput: "root=[3,9,20,null,null,15,7]",
    expectedOutput: "[[3],[9,20],[15,7]]"
  },
  {
    id: "p29",
    title: "Serialize and Deserialize Binary Tree",
    description: "Design an algorithm to serialize and deserialize a binary tree.",
    topic: "tree",
    difficulty: "Hard",
    sampleInput: "root=[1,2,3,null,null,4,5]",
    expectedOutput: "Serialized string and then correct tree structure"
  },
  {
    id: "p30",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list.",
    topic: "linkedlist",
    difficulty: "Easy",
    sampleInput: "head=[1,2,3,4,5]",
    expectedOutput: "[5,4,3,2,1]"
  },
  {
    id: "p31",
    title: "Add Two Numbers",
    description: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",
    topic: "linkedlist",
    difficulty: "Medium",
    sampleInput: "l1=[2,4,3], l2=[5,6,4]",
    expectedOutput: "[7,0,8]"
  },
  {
    id: "p32",
    title: "LRU Cache",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
    topic: "greedy",
    difficulty: "Hard",
    sampleInput: "Operations on LRU cache",
    expectedOutput: "Correct behavior of cache operations"
  },
  {
    id: "p33",
    title: "Longest Common Subsequence",
    description: "Given two strings, find the length of their longest common subsequence.",
    topic: "dp",
    difficulty: "Medium",
    sampleInput: "text1=\"abcde\", text2=\"ace\"",
    expectedOutput: "3"
  },
  {
    id: "p34",
    title: "Kth Largest Element in an Array",
    description: "Find the kth largest element in an unsorted array.",
    topic: "arrays",
    difficulty: "Medium",
    sampleInput: "nums=[3,2,1,5,6,4], k=2",
    expectedOutput: "5"
  },
  {
    id: "p35",
    title: "Word Ladder",
    description: "Given two words (beginWord and endWord), and a dictionary, find the length of shortest transformation sequence from beginWord to endWord.",
    topic: "graphs",
    difficulty: "Hard",
    sampleInput: "beginWord=\"hit\", endWord=\"cog\", wordList=[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    expectedOutput: "5"
  },
  {
    id: "p36",
    title: "Subarray Sum Equals K",
    description: "Find the total number of continuous subarrays whose sum equals k.",
    topic: "arrays",
    difficulty: "Medium",
    sampleInput: "nums=[1,1,1], k=2",
    expectedOutput: "2"
  },
  {
    id: "p37",
    title: "Jump Game",
    description: "Determine if you can reach the last index of an array where each element represents your maximum jump length.",
    topic: "greedy",
    difficulty: "Medium",
    sampleInput: "nums=[2,3,1,1,4]",
    expectedOutput: "true"
  },
  {
    id: "p38",
    title: "Reverse Words in a String",
    description: "Given an input string, reverse the string word by word.",
    topic: "arrays",
    difficulty: "Easy",
    sampleInput: "s=\"the sky is blue\"",
    expectedOutput: "\"blue is sky the\""
  },
  {
    id: "p39",
    title: "Find Peak Element",
    description: "Find a peak element in an array. A peak element is one that is greater than its neighbors.",
    topic: "arrays",
    difficulty: "Medium",
    sampleInput: "nums=[1,2,3,1]",
    expectedOutput: "2"
  },
  {
    id: "p40",
    title: "Search in Rotated Sorted Array",
    description: "Search for a target value in a rotated sorted array.",
    topic: "arrays",
    difficulty: "Hard",
    sampleInput: "nums=[4,5,6,7,0,1,2], target=0",
    expectedOutput: "4"
  },
  {
    id: "p41",
    title: "Diameter of Binary Tree",
    description: "Find the diameter of a binary tree. The diameter is the length of the longest path between any two nodes.",
    topic: "tree",
    difficulty: "Medium",
    sampleInput: "root=[1,2,3,4,5]",
    expectedOutput: "3"
  },
  {
    id: "p42",
    title: "Path Sum",
    description: "Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.",
    topic: "tree",
    difficulty: "Easy",
    sampleInput: "root=[5,4,8,11,null,13,4,7,2,null,null,null,1], sum=22",
    expectedOutput: "true"
  },
  {
    id: "p43",
    title: "Spiral Matrix",
    description: "Return all elements of a matrix in spiral order.",
    topic: "arrays",
    difficulty: "Medium",
    sampleInput: "matrix=[[1,2,3],[4,5,6],[7,8,9]]",
    expectedOutput: "[1,2,3,6,9,8,7,4,5]"
  },
  {
    id: "p44",
    title: "Course Schedule",
    description: "Determine if you can finish all courses given their prerequisites (detect cycle in a directed graph).",
    topic: "graphs",
    difficulty: "Medium",
    sampleInput: "numCourses=2, prerequisites=[[1,0]]",
    expectedOutput: "true"
  },
  {
    id: "p45",
    title: "Find Peak Element in 2D Array",
    description: "Find a peak element in a 2D array.",
    topic: "arrays",
    difficulty: "Hard",
    sampleInput: "matrix=[[10,20,15],[21,30,14],[7,16,32]]",
    expectedOutput: "30" // one possible peak
  },
  {
    id: "p46",
    title: "Subsets",
    description: "Return all possible subsets of a given set of numbers.",
    topic: "dp",
    difficulty: "Medium",
    sampleInput: "nums=[1,2,3]",
    expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
  },
  {
    id: "p47",
    title: "Generate Parentheses",
    description: "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
    topic: "dp",
    difficulty: "Hard",
    sampleInput: "n=3",
    expectedOutput: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
  },
  {
    id: "p48",
    title: "Implement Trie",
    description: "Design a trie with insert, search, and startsWith methods.",
    topic: "greedy",
    difficulty: "Medium",
    sampleInput: "Operations on Trie",
    expectedOutput: "Correct Trie operations"
  },
  {
    id: "p49",
    title: "Longest Consecutive Sequence",
    description: "Find the length of the longest consecutive elements sequence in an unsorted array.",
    topic: "arrays",
    difficulty: "Hard",
    sampleInput: "nums=[100,4,200,1,3,2]",
    expectedOutput: "4"
  },
  {
    id: "p50",
    title: "Clone N-ary Tree",
    description: "Given an N-ary tree, return a deep copy of the tree.",
    topic: "tree",
    difficulty: "Medium",
    sampleInput: "N-ary tree in list format",
    expectedOutput: "Cloned N-ary tree structure"
  }
  // ... add more problems as needed ...
];

// ----- HELPER FUNCTIONS -----
function filterProblems(topic, difficulty) {
  let results = [...mockProblems];
  if (topic && topic !== 'all') {
    results = results.filter(p => p.topic === topic);
  }
  if (difficulty && difficulty !== 'all') {
    results = results.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  return results;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Normalizes output by removing extra whitespace and newlines.
function normalizeOutput(str) {
  return str.replace(/\s+/g, '').toLowerCase();
}

// ----- API ENDPOINTS ----- 

/**
 * GET /api/problems
 * Returns all problems (optionally filtered by topic and/or difficulty) in random order.
 */
router.get('/problems', (req, res) => {
  const topic = req.query.topic || 'all';
  const difficulty = req.query.difficulty || 'all';
  const filtered = filterProblems(topic, difficulty);
  if (filtered.length === 0) {
    return res.status(404).json({ error: 'No problems found' });
  }
  shuffleArray(filtered);
  res.json(filtered);
});

/**
 * GET /api/problem/:id
 * Returns details for a single problem by id.
 */
router.get('/problem/:id', (req, res) => {
  const id = req.params.id;
  const problem = mockProblems.find(p => p.id === id);
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  res.json(problem);
});

router.post('/run', async (req, res) => {
  const { code, language, problemId } = req.body;

  if (language !== 'java') {
    return res.status(400).json({ error: 'Only Java is supported' });
  }

  // Find the problem to get sample input and expected output.
  const problem = mockProblems.find(p => p.id === problemId);
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  const sampleInput = problem.sampleInput || "";
  const expectedOutput = problem.expectedOutput.trim();

  try {
    // Call Judge0 API.
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "8b7ef384d1msh59e64afb5a5f394p1ac5f4jsn5d7bb89bac83"
      },
      body: JSON.stringify({
        language_id: 62,  // Java language id
        source_code: code,
        stdin: sampleInput
      })
    });
    const result = await response.json();

    // If the submission did not get Accepted (status.id === 3), return the error.
    if (result.status && result.status.id !== 3) {
      return res.json({
        output: result.compile_output || result.stderr || `Error: ${result.status.description}`
      });
    }

    // Get and trim the actual output.
    const actualOutput = (result.stdout || "").trim();

    // Normalize both outputs to remove minor differences.
    const normExpected = normalizeOutput(expectedOutput);
    const normActual = normalizeOutput(actualOutput);

    if (normActual === normExpected) {
      return res.json({
        output: actualOutput,
        message: "Your output is correct!"
      });
    } else {
      return res.json({
        output: actualOutput,
        message: `Error: Your output does not match the expected output.\nExpected: ${expectedOutput}\nYour Output: ${actualOutput}`
      });
    }
  } catch (error) {
    console.error("Error calling Judge0 API:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// public/main.js

require(['vs/editor/editor.main'], function() {
    // Initialize the Monaco Editor for Java.
    const editor = monaco.editor.create(document.getElementById('editorContainer'), {
      value: `// Write your Java solution here
  public class Solution {
      public static void main(String[] args) {
          // Your code here
          System.out.println("Hello, World!");
      }
  }`,
      language: 'java',
      theme: 'vs-dark',
      automaticLayout: true
    });
  
    // Load problems list based on selected filters.
    document.getElementById('loadProblems').addEventListener('click', async () => {
      const topic = document.getElementById('topic').value;
      const difficulty = document.getElementById('difficulty').value;
      try {
        const response = await fetch(`/api/problems?topic=${topic}&difficulty=${difficulty}`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const problems = await response.json();
        displayProblemsList(problems);
      } catch (error) {
        console.error('Error loading problems:', error);
      }
    });
  
    // Render the list of problems.
    function displayProblemsList(problems) {
      const listContainer = document.getElementById('problemsList');
      listContainer.innerHTML = problems.map(problem => `
        <div class="problemItem" data-problem-id="${problem.id}">
          <strong>${problem.title}</strong> - [${problem.topic.toUpperCase()} | ${problem.difficulty}]
        </div>
      `).join('');
      // Set click listener for each problem item.
      document.querySelectorAll('.problemItem').forEach(item => {
        item.addEventListener('click', async () => {
          const id = item.getAttribute('data-problem-id');
          loadProblemDetail(id);
        });
      });
    }
  
    // Load details for a single problem.
    async function loadProblemDetail(id) {
      try {
        const response = await fetch(`/api/problem/${id}`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const problem = await response.json();
        displayProblemDetail(problem);
      } catch (error) {
        console.error('Error loading problem detail:', error);
      }
    }
  
    // Display problem details and update the editor with a template.
    function displayProblemDetail(problem) {
      const detailContainer = document.getElementById('problemDetail');
      detailContainer.innerHTML = `
        <h2>${problem.title}</h2>
        <p>${problem.description}</p>
        <p><strong>Topic:</strong> ${problem.topic}</p>
        <p><strong>Difficulty:</strong> ${problem.difficulty}</p>
        <p><strong>Sample Input:</strong> ${problem.sampleInput}</p>
        <p><strong>Expected Output:</strong> ${problem.expectedOutput}</p>
      `;
      // Optionally update the code editor with a per-problem template.
      const template = `// ${problem.title}\n// Sample Input: ${problem.sampleInput}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`;
      editor.setValue(template);
      // Save the current problem id for running code.
      detailContainer.setAttribute('data-problem-id', problem.id);
    }
  
    // Run the code when the user clicks the Run Code button.
    document.getElementById('runCode').addEventListener('click', async () => {
      const code = editor.getValue();
      const detailContainer = document.getElementById('problemDetail');
      const problemId = detailContainer.getAttribute('data-problem-id');
      if (!problemId) {
        alert("Please select a problem first.");
        return;
      }
      const payload = {
        code: code,
        language: 'java',
        problemId: problemId
      };
  
      try {
        const response = await fetch('/api/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const result = await response.json();
        // Display both the output and the validation message.
        document.getElementById('result').innerText =
          "Output: " + result.output + "\n" + (result.message ? result.message : "");
      } catch (error) {
        console.error('Error executing code:', error);
      }
    });
  });
  
/* ======================================================================
 *  Computer Science Curriculum Data - Class 9 (KPK Textbook Board)
 *  DATA.compChapters (Units 1 - 7)
 * ====================================================================== */
Object.assign(DATA, {
  "compChapters": [
  {
    "num": 1,
    "id": "cls9-comp-ch01",
    "name": "Programming Techniques",
    "nameUr": "پروگرامنگ کی تکنیکیں",
    "pageRange": "Pages 1 – 30",
    "status": "done",
    "slos": [
      "Understand the concept of problem solving and define a problem",
      "Perform problem analysis by identifying inputs, processes, and outputs",
      "Plan the solution using algorithmic thinking and candid solutions",
      "Evaluate candid solutions and select the best optimal solution",
      "Define an algorithm and explain its role in computer problem solving",
      "Understand the criteria for measuring efficiency of algorithms (time and space complexity)",
      "Design step-by-step algorithms for standard computational problems",
      "Define a flowchart and explain its significance in programming",
      "Identify standard flowchart symbols (terminal, process, decision, input/output, connector, flowlines)",
      "Construct complete flowcharts for computational problems and decision logic"
    ],
    "sections": [
      {
        "sectionNum": "1.1",
        "title": "Understanding the Problem",
        "content": "To solve a given problem by using a computer, you need to write a program for it. To write a computer program, one must first clearly understand the problem at hand.\n\n1.1.1 The Problem:\nA problem is an obstacle, impediment, difficulty, or challenge, or any situation that requires resolution. In computer science, a problem is a well-defined question or task for which an algorithmic solution is sought.\n\n1.1.2 Problem Analysis:\nProblem analysis is the process of breaking down a complex problem into smaller, manageable sub-problems. It involves determining:\n1. Input: What data is needed and supplied by the user.\n2. Processing: What computational steps, formulas, and logical operations must be applied to the data.\n3. Output: What results or information must be produced for the user.\n\n1.1.3 Planning the Solution:\nPlanning involves organizing the steps necessary to reach the desired objective. It includes choosing appropriate algorithms, data representation, and deciding between sequential, conditional, or iterative approaches.\n\n1.1.4 Candid Solutions of a Problem:\nA candid solution (or candidate solution) refers to a spontaneous, potential, or first-thought solution that comes to mind without formal optimization. Brainstorming multiple candid solutions allows programmers to evaluate alternative pathways before selecting the most efficient one.\n\n1.1.5 Selecting the Best Solution:\nWhen multiple candid solutions exist, the optimal solution is selected based on:\n• Minimum number of execution steps\n• Minimal memory and hardware resource consumption\n• Maximum speed and algorithmic efficiency\n• Ease of implementation and maintainability.",
        "keyPoints": [
          "A problem is any obstacle or situation requiring resolution.",
          "Problem analysis identifies: Inputs, Processing, and Outputs.",
          "Candid solutions are alternative potential solutions evaluated during problem solving.",
          "The best solution maximizes speed and minimizes resource consumption."
        ]
      },
      {
        "sectionNum": "1.2",
        "title": "Algorithms & Problem Solving",
        "content": "1.2.1 Definition of an Algorithm:\nAn algorithm is a finite set of precise, well-defined, step-by-step instructions designed to perform a specific task or solve a particular problem.\n\n1.2.2 Role of Algorithm in Problem Solving:\nAn algorithm serves as the logical blueprint for writing computer software. It bridges the gap between problem understanding and code implementation in a programming language (like C). It allows the logic to be verified, tested, and optimized before coding begins.\n\n1.2.3 Criteria for Measuring Efficiency of an Algorithm:\nThe efficiency of an algorithm is evaluated based on:\n1. Time Complexity: The amount of computer time required by an algorithm to execute to completion.\n2. Space Complexity: The amount of memory storage required by the algorithm during its execution.\n3. Input Size: How performance scales as the volume of input data grows.\n4. Simplicity & Clarity: An algorithm should be unambiguous and easy to convert into program statements.\n\n1.2.4 Algorithms for Standard Computational Problems:\n• Algorithm 1: To find the sum and average of three numbers.\n  Step 1: Start\n  Step 2: Input three numbers A, B, C\n  Step 3: Calculate Sum = A + B + C\n  Step 4: Calculate Average = Sum / 3\n  Step 5: Output Sum and Average\n  Step 6: Stop\n\n• Algorithm 2: To calculate acceleration given mass and force (Newton's Second Law: F = m*a).\n  Step 1: Start\n  Step 2: Input Mass (m) and Force (F)\n  Step 3: Check if m != 0, calculate Acceleration a = F / m\n  Step 4: Output Acceleration (a)\n  Step 5: Stop\n\n• Algorithm 3: To find the factorial of a number N.\n  Step 1: Start\n  Step 2: Input N\n  Step 3: Set Fact = 1, i = 1\n  Step 4: If i > N then go to Step 7\n  Step 5: Calculate Fact = Fact * i, increment i = i + 1\n  Step 6: Go to Step 4\n  Step 7: Output Fact\n  Step 8: Stop.",
        "keyPoints": [
          "An algorithm is a finite, ordered sequence of steps to solve a problem.",
          "Efficiency depends on Time Complexity (execution time) and Space Complexity (memory usage).",
          "Every algorithm must have: Input, Output, Definiteness, Finiteness, and Effectiveness."
        ]
      },
      {
        "sectionNum": "1.3",
        "title": "Flowcharts and Symbolic Representation",
        "content": "1.3.1 Definition of a Flowchart:\nA flowchart is a pictorial, graphical, or diagrammatic representation of an algorithm. It uses standard geometrical symbols connected by arrows to illustrate the sequence of steps and flow of control in a program.\n\n1.3.2 Importance of Flowcharts:\n1. Visual Clarity: Makes the logic and flow of execution immediately understandable.\n2. Effective Analysis: Simplifies debugging and reveals logical flaws before writing code.\n3. Documentation: Serves as an essential design reference for future maintenance.\n4. Facilitates Translation: Speeds up the translation of logic into programming languages.\n\n1.3.3 Flowchart Requirements:\nA well-designed flowchart requires clear definition of: Start/Stop boundaries, input operations, arithmetic processes, conditional decision branches, and flow directions.\n\n1.3.4 Standard Flowchart Symbols:\n• Oval (Terminal Symbol): Indicates Start and Stop / End of the flowchart.\n• Parallelogram (Input/Output Symbol): Represents data input from user or output display.\n• Rectangle (Process Symbol): Represents calculations, data assignments, and internal processing.\n• Diamond (Decision Symbol): Represents condition checking; has one entry path and two or three exit paths (e.g., True/False or Yes/No).\n• Small Circle (Connector Symbol): Connects different portions of a flowchart on the same page.\n• Arrows / Flowlines: Indicate the exact direction and flow of logic execution.",
        "keyPoints": [
          "Flowchart is the visual or diagrammatic representation of an algorithm.",
          "Oval = Start/Stop; Parallelogram = Input/Output; Rectangle = Process.",
          "Diamond = Decision / Condition; Circle = Connector; Arrows = Flowlines."
        ]
      }
    ],
    "definitions": [
      {
        "term": "Problem",
        "def": "An obstacle, impediment, difficulty, or challenge, or any situation that requires resolution; the resolution of which contributes towards a known purpose or goal.",
        "definition": "An obstacle, impediment, difficulty, or challenge, or any situation that requires resolution; the resolution of which contributes towards a known purpose or goal."
      },
      {
        "term": "Problem Analysis",
        "def": "The process of identifying and breaking down a problem into its fundamental components: inputs needed, processing steps, and expected outputs.",
        "definition": "The process of identifying and breaking down a problem into its fundamental components: inputs needed, processing steps, and expected outputs."
      },
      {
        "term": "Candid Solution",
        "def": "A spontaneous, potential, or candidate solution that comes to mind during brainstorming before formal evaluation and optimization.",
        "definition": "A spontaneous, potential, or candidate solution that comes to mind during brainstorming before formal evaluation and optimization."
      },
      {
        "term": "Algorithm",
        "def": "A finite set of unambiguous, step-by-step instructions designed to perform a specific task or solve a particular computational problem.",
        "definition": "A finite set of unambiguous, step-by-step instructions designed to perform a specific task or solve a particular computational problem."
      },
      {
        "term": "Efficiency of an Algorithm",
        "def": "A measure of computational resources required by an algorithm, primarily evaluated by execution speed (time complexity) and memory consumption (space complexity).",
        "definition": "A measure of computational resources required by an algorithm, primarily evaluated by execution speed (time complexity) and memory consumption (space complexity)."
      },
      {
        "term": "Flowchart",
        "def": "A diagrammatic or graphical representation of an algorithm using standardized geometric symbols connected by directional flowlines.",
        "definition": "A diagrammatic or graphical representation of an algorithm using standardized geometric symbols connected by directional flowlines."
      },
      {
        "term": "Terminal Symbol",
        "def": "An oval-shaped flowchart symbol used to indicate the starting or ending point of a flowchart.",
        "definition": "An oval-shaped flowchart symbol used to indicate the starting or ending point of a flowchart."
      },
      {
        "term": "Decision Symbol",
        "def": "A diamond-shaped flowchart symbol used to evaluate a condition resulting in alternative pathways (Yes/No or True/False).",
        "definition": "A diamond-shaped flowchart symbol used to evaluate a condition resulting in alternative pathways (Yes/No or True/False)."
      },
      {
        "term": "Process Symbol",
        "def": "A rectangular flowchart symbol used to indicate calculations, arithmetic operations, and data transformations.",
        "definition": "A rectangular flowchart symbol used to indicate calculations, arithmetic operations, and data transformations."
      },
      {
        "term": "Input/Output Symbol",
        "def": "A parallelogram flowchart symbol used to represent user input operations or output displays on screen.",
        "definition": "A parallelogram flowchart symbol used to represent user input operations or output displays on screen."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "An obstacle, difficulty or challenge, or any situation that requires resolution is called:",
          "options": [
            "Algorithm",
            "Problem",
            "Complexity",
            "None of the above"
          ],
          "ans": 1,
          "explanation": "A problem is defined in the textbook as an obstacle, difficulty, or challenge requiring resolution."
        },
        {
          "q": "___ is used to describe properties of an algorithm relating to how much of various types of resources it consumes:",
          "options": [
            "Efficiency of an algorithm",
            "Candid solution",
            "Complexity of an algorithm",
            "None of the above"
          ],
          "ans": 0,
          "explanation": "Efficiency of an algorithm relates to the execution time and memory space resources it consumes."
        },
        {
          "q": "___ is a well-defined list of steps for solving a particular problem:",
          "options": [
            "Algorithm",
            "Flowchart",
            "Complexity of an algorithm",
            "All of the above"
          ],
          "ans": 0,
          "explanation": "An algorithm is a finite, well-defined list of steps to solve a given problem."
        },
        {
          "q": "An algorithm is a sequence of computational steps that transform the input into:",
          "options": [
            "Data structure",
            "Algorithm",
            "Output",
            "All of the above"
          ],
          "ans": 2,
          "explanation": "Computational steps in an algorithm take input data and transform it into the required output."
        },
        {
          "q": "Which symbol is used to represent a process in a flowchart?",
          "options": [
            "Oval",
            "Diamond",
            "Rectangle",
            "Parallelogram"
          ],
          "ans": 2,
          "explanation": "In flowcharts, a rectangle represents a process or computational calculation."
        }
      ],
      "shortQuestions": [
        {
          "q": "Define Problem analysis.",
          "ans": "Problem analysis is the process of breaking down and understanding a problem in terms of: 1) What input data is provided, 2) What processing and calculations are required, and 3) What output results must be produced."
        },
        {
          "q": "How is the solution of a problem planned?",
          "ans": "Planning the solution involves analyzing problem requirements, identifying candid solutions, selecting appropriate algorithms and data structures, and designing step-by-step logic through flowcharts before coding."
        },
        {
          "q": "Define candid solution of a problem.",
          "ans": "A candid solution (or candidate solution) is a preliminary, spontaneous solution that emerges during initial brainstorming without formal optimization or resource constraints."
        },
        {
          "q": "Define any three problem solving techniques.",
          "ans": "1) Divide and Conquer: Breaking a large problem into smaller sub-problems. 2) Trial and Error: Testing potential solutions until one succeeds. 3) Algorithmic Design: Formulating a structured, step-by-step procedure to guarantee the correct result."
        },
        {
          "q": "List various factors for selecting the best solution of any problem.",
          "ans": "1) Minimum execution time (speed), 2) Minimum memory consumption (space efficiency), 3) Simplicity and ease of programming, 4) Scalability to handle large datasets."
        }
      ],
      "longQuestions": [
        {
          "q": "Define an algorithm and explain the role of algorithm in problem solving.",
          "ans": "Definition: An algorithm is a finite, ordered set of unambiguous steps designed to perform a specific computational task.\n\nRole in Problem Solving:\n1. Foundation for Programming: Algorithms serve as the conceptual bridge between a real-world problem and computer code.\n2. Language Independence: An algorithm is written in simple English/pseudocode and can be implemented in any programming language (C, C++, Python, Java).\n3. Easy Debugging & Error Identification: Tracing an algorithm step-by-step allows programmers to find logical flaws before writing extensive code.\n4. Reusability: Standard algorithms (sorting, searching) can be reused across different software systems."
        },
        {
          "q": "Describe the criteria for measuring efficiency of an algorithm.",
          "ans": "Criteria for Efficiency:\n1. Time Complexity: Evaluates the total execution time or number of basic operations performed relative to input size.\n2. Space Complexity: Measures the total memory (RAM) required to store variables, structures, and program instructions.\n3. Processing Steps: Algorithms with fewer computational steps are faster and more efficient.\n4. Input Scaling: Evaluates how algorithm behavior responds as input values grow (e.g., linear vs quadratic growth)."
        },
        {
          "q": "What is a flowchart? Explain flowchart symbols in detail with examples.",
          "ans": "Definition: A flowchart is a diagrammatic representation that illustrates the sequence of operations in an algorithm using standard geometrical shapes.\n\nFlowchart Symbols:\n1. Oval (Terminal): Marks Start and End points.\n2. Parallelogram (Input/Output): Represents reading data from user or printing results to screen.\n3. Rectangle (Process): Indicates calculations, assignments, and data manipulations (e.g., Sum = A + B).\n4. Diamond (Decision): Evaluates conditions with two or more branch pathways (True/False).\n5. Connector (Circle): Connects split flow paths on the same page.\n6. Flowlines (Arrows): Shows directional sequence of execution."
        },
        {
          "q": "Write an algorithm and draw a flowchart to calculate the factorial of a given number.",
          "ans": "Algorithm for Factorial of N:\nStep 1: Start\nStep 2: Input positive integer N\nStep 3: Initialize Fact = 1 and i = 1\nStep 4: If i > N then go to Step 7\nStep 5: Compute Fact = Fact * i, increment i = i + 1\nStep 6: Repeat from Step 4\nStep 7: Output Fact\nStep 8: Stop\n\nFlowchart Flow:\n[Start (Oval)] -> [Input N (Parallelogram)] -> [Fact = 1, i = 1 (Rectangle)] -> [Is i <= N? (Diamond)] -> (Yes: Fact = Fact * i, i = i + 1 -> Loop back) -> (No: Output Fact (Parallelogram) -> Stop (Oval))."
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "The first phase in solving a computer problem is:",
          "opts": [
            "Coding",
            "Understanding the problem",
            "Testing",
            "Documentation"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Which symbol represents input or output in a flowchart?",
          "opts": [
            "Rectangle",
            "Oval",
            "Parallelogram",
            "Diamond"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "A diamond symbol in a flowchart is used for:",
          "opts": [
            "Processing",
            "Decision making",
            "Input",
            "Start/Stop"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Space complexity of an algorithm measures:",
          "opts": [
            "Physical disk size",
            "Memory (RAM) consumed",
            "Length of code",
            "Execution speed"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Which flowchart symbol represents the start and stop of a program?",
          "opts": [
            "Rectangle",
            "Diamond",
            "Oval",
            "Circle"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "An algorithm must terminate after a ___ number of steps:",
          "opts": [
            "Infinite",
            "Finite",
            "Zero",
            "Undetermined"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "A small circle in a flowchart represents:",
          "opts": [
            "Decision",
            "Connector",
            "Process",
            "Terminal"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "The direction of flow in a flowchart is shown by:",
          "opts": [
            "Lines with arrows",
            "Dotted lines",
            "Double lines",
            "Brackets"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Dividing a complex problem into smaller parts is called:",
          "opts": [
            "Problem analysis",
            "Synthesis",
            "Compilation",
            "Debugging"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Which factor is NOT considered when measuring algorithm efficiency?",
          "opts": [
            "Execution time",
            "Memory usage",
            "Color of IDE",
            "Number of steps"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "What is the difference between an algorithm and a flowchart?",
          "key": "An algorithm is a textual, step-by-step description of problem solution in human language, whereas a flowchart is a diagrammatic representation using geometric symbols.",
          "marks": 4,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Why is problem analysis important before programming?",
          "key": "It ensures the programmer fully understands what inputs are given, what transformations must occur, and what exact outputs are expected, preventing fundamental coding errors.",
          "marks": 4,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "What is meant by time complexity of an algorithm?",
          "key": "Time complexity quantifies the amount of computer processing time required to run an algorithm as a function of the length of the input data.",
          "marks": 4,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "What is the function of a connector symbol in a flowchart?",
          "key": "It connects disparate parts of a flowchart that cannot be joined cleanly with a continuous flowline, particularly across page boundaries or dense branchings.",
          "marks": 4,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "List four advantages of using flowcharts.",
          "key": "1) Visual communication of logic, 2) Easier problem analysis, 3) Efficient debugging, 4) Clear software documentation.",
          "marks": 4,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain in detail the five essential stages of problem solving in computer science.",
          "marks": 8,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        },
        {
          "q": "Describe all standard flowchart symbols with their shapes, names, and exact functions.",
          "marks": 8,
          "chapter": "Unit 1: Programming Techniques",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "Algorithm Properties",
        "formula": "Input -> Definiteness -> Effectiveness -> Finiteness -> Output",
        "note": "Five mandatory attributes of any valid computer algorithm."
      },
      {
        "name": "Flowchart Symbols Hierarchy",
        "formula": "Oval (Start/Stop) | Parallelogram (I/O) | Rect (Calc) | Diamond (Decision) | Circle (Conn)",
        "note": "Standard ISO flowchart geometric conventions."
      },
      {
        "name": "Factorial Recurrence",
        "formula": "N! = N * (N - 1) * ... * 1 (for N >= 1, 0! = 1)",
        "note": "Standard iterative & algorithmic multiplication formula."
      }
    ],
    "numericals": [
      {
        "statement": "Design an algorithm to find the largest among three unequal numbers A, B, and C.",
        "solution": "Step 1: Start\nStep 2: Input three numbers A, B, C\nStep 3: If A > B and A > C then Largest = A\nStep 4: Else if B > C then Largest = B\nStep 5: Else Largest = C\nStep 6: Output Largest\nStep 7: Stop"
      },
      {
        "statement": "Write an algorithm to determine whether a given integer N is Even or Odd.",
        "solution": "Step 1: Start\nStep 2: Input integer N\nStep 3: Calculate Remainder = N mod 2\nStep 4: If Remainder == 0 then output 'Even'\nStep 5: Else output 'Odd'\nStep 6: Stop"
      }
    ],
    "englishSummary": "Unit 1 establishes foundational problem-solving strategies for computer science. It begins with problem definition and problem analysis (inputs, processes, outputs). It introduces candid solutions and criteria for selecting optimal solutions. Algorithmic concepts, step-by-step design, time and space complexity are detailed. Finally, flowcharts and standard geometric symbols (oval, parallelogram, rectangle, diamond, connector) are introduced with 20 solved computational problems.",
    "urduSummary": "یونٹ 1 کمپیوٹر سائنس میں مسائل حل کرنے کی بنیادی تکنیکوں کا احاطہ کرتا ہے۔ اس میں مسئلے کی تعریف، مسئلے کا تجزیہ (ان پٹ، پروسیسنگ، آؤٹ پٹ)، امیدوار حل (Candid Solutions)، اور بہترین حل کا انتخاب شامل ہیں۔ الگورتھم کی ساخت، وقت اور جگہ کی پیچیدگی، اور فلو چارٹ کی تصویری اشکال (بیضوی، متوازی الاضلاع، مستطیل، معین، دائرہ) کی مکمل وضاحت کی گئی ہے۔",
    "topics": [
      {
        "sectionNum": "1.1",
        "title": "Understanding the Problem",
        "content": "To solve a given problem by using a computer, you need to write a program for it. To write a computer program, one must first clearly understand the problem at hand.\n\n1.1.1 The Problem:\nA problem is an obstacle, impediment, difficulty, or challenge, or any situation that requires resolution. In computer science, a problem is a well-defined question or task for which an algorithmic solution is sought.\n\n1.1.2 Problem Analysis:\nProblem analysis is the process of breaking down a complex problem into smaller, manageable sub-problems. It involves determining:\n1. Input: What data is needed and supplied by the user.\n2. Processing: What computational steps, formulas, and logical operations must be applied to the data.\n3. Output: What results or information must be produced for the user.\n\n1.1.3 Planning the Solution:\nPlanning involves organizing the steps necessary to reach the desired objective. It includes choosing appropriate algorithms, data representation, and deciding between sequential, conditional, or iterative approaches.\n\n1.1.4 Candid Solutions of a Problem:\nA candid solution (or candidate solution) refers to a spontaneous, potential, or first-thought solution that comes to mind without formal optimization. Brainstorming multiple candid solutions allows programmers to evaluate alternative pathways before selecting the most efficient one.\n\n1.1.5 Selecting the Best Solution:\nWhen multiple candid solutions exist, the optimal solution is selected based on:\n• Minimum number of execution steps\n• Minimal memory and hardware resource consumption\n• Maximum speed and algorithmic efficiency\n• Ease of implementation and maintainability.",
        "keyPoints": [
          "A problem is any obstacle or situation requiring resolution.",
          "Problem analysis identifies: Inputs, Processing, and Outputs.",
          "Candid solutions are alternative potential solutions evaluated during problem solving.",
          "The best solution maximizes speed and minimizes resource consumption."
        ]
      },
      {
        "sectionNum": "1.2",
        "title": "Algorithms & Problem Solving",
        "content": "1.2.1 Definition of an Algorithm:\nAn algorithm is a finite set of precise, well-defined, step-by-step instructions designed to perform a specific task or solve a particular problem.\n\n1.2.2 Role of Algorithm in Problem Solving:\nAn algorithm serves as the logical blueprint for writing computer software. It bridges the gap between problem understanding and code implementation in a programming language (like C). It allows the logic to be verified, tested, and optimized before coding begins.\n\n1.2.3 Criteria for Measuring Efficiency of an Algorithm:\nThe efficiency of an algorithm is evaluated based on:\n1. Time Complexity: The amount of computer time required by an algorithm to execute to completion.\n2. Space Complexity: The amount of memory storage required by the algorithm during its execution.\n3. Input Size: How performance scales as the volume of input data grows.\n4. Simplicity & Clarity: An algorithm should be unambiguous and easy to convert into program statements.\n\n1.2.4 Algorithms for Standard Computational Problems:\n• Algorithm 1: To find the sum and average of three numbers.\n  Step 1: Start\n  Step 2: Input three numbers A, B, C\n  Step 3: Calculate Sum = A + B + C\n  Step 4: Calculate Average = Sum / 3\n  Step 5: Output Sum and Average\n  Step 6: Stop\n\n• Algorithm 2: To calculate acceleration given mass and force (Newton's Second Law: F = m*a).\n  Step 1: Start\n  Step 2: Input Mass (m) and Force (F)\n  Step 3: Check if m != 0, calculate Acceleration a = F / m\n  Step 4: Output Acceleration (a)\n  Step 5: Stop\n\n• Algorithm 3: To find the factorial of a number N.\n  Step 1: Start\n  Step 2: Input N\n  Step 3: Set Fact = 1, i = 1\n  Step 4: If i > N then go to Step 7\n  Step 5: Calculate Fact = Fact * i, increment i = i + 1\n  Step 6: Go to Step 4\n  Step 7: Output Fact\n  Step 8: Stop.",
        "keyPoints": [
          "An algorithm is a finite, ordered sequence of steps to solve a problem.",
          "Efficiency depends on Time Complexity (execution time) and Space Complexity (memory usage).",
          "Every algorithm must have: Input, Output, Definiteness, Finiteness, and Effectiveness."
        ]
      },
      {
        "sectionNum": "1.3",
        "title": "Flowcharts and Symbolic Representation",
        "content": "1.3.1 Definition of a Flowchart:\nA flowchart is a pictorial, graphical, or diagrammatic representation of an algorithm. It uses standard geometrical symbols connected by arrows to illustrate the sequence of steps and flow of control in a program.\n\n1.3.2 Importance of Flowcharts:\n1. Visual Clarity: Makes the logic and flow of execution immediately understandable.\n2. Effective Analysis: Simplifies debugging and reveals logical flaws before writing code.\n3. Documentation: Serves as an essential design reference for future maintenance.\n4. Facilitates Translation: Speeds up the translation of logic into programming languages.\n\n1.3.3 Flowchart Requirements:\nA well-designed flowchart requires clear definition of: Start/Stop boundaries, input operations, arithmetic processes, conditional decision branches, and flow directions.\n\n1.3.4 Standard Flowchart Symbols:\n• Oval (Terminal Symbol): Indicates Start and Stop / End of the flowchart.\n• Parallelogram (Input/Output Symbol): Represents data input from user or output display.\n• Rectangle (Process Symbol): Represents calculations, data assignments, and internal processing.\n• Diamond (Decision Symbol): Represents condition checking; has one entry path and two or three exit paths (e.g., True/False or Yes/No).\n• Small Circle (Connector Symbol): Connects different portions of a flowchart on the same page.\n• Arrows / Flowlines: Indicate the exact direction and flow of logic execution.",
        "keyPoints": [
          "Flowchart is the visual or diagrammatic representation of an algorithm.",
          "Oval = Start/Stop; Parallelogram = Input/Output; Rectangle = Process.",
          "Diamond = Decision / Condition; Circle = Connector; Arrows = Flowlines."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "An obstacle, difficulty or challenge, or any situation that requires resolution is called:",
          "options": [
            "Algorithm",
            "Problem",
            "Complexity",
            "None of the above"
          ],
          "ans": 1,
          "explanation": "A problem is defined in the textbook as an obstacle, difficulty, or challenge requiring resolution."
        },
        {
          "q": "___ is used to describe properties of an algorithm relating to how much of various types of resources it consumes:",
          "options": [
            "Efficiency of an algorithm",
            "Candid solution",
            "Complexity of an algorithm",
            "None of the above"
          ],
          "ans": 0,
          "explanation": "Efficiency of an algorithm relates to the execution time and memory space resources it consumes."
        },
        {
          "q": "___ is a well-defined list of steps for solving a particular problem:",
          "options": [
            "Algorithm",
            "Flowchart",
            "Complexity of an algorithm",
            "All of the above"
          ],
          "ans": 0,
          "explanation": "An algorithm is a finite, well-defined list of steps to solve a given problem."
        },
        {
          "q": "An algorithm is a sequence of computational steps that transform the input into:",
          "options": [
            "Data structure",
            "Algorithm",
            "Output",
            "All of the above"
          ],
          "ans": 2,
          "explanation": "Computational steps in an algorithm take input data and transform it into the required output."
        },
        {
          "q": "Which symbol is used to represent a process in a flowchart?",
          "options": [
            "Oval",
            "Diamond",
            "Rectangle",
            "Parallelogram"
          ],
          "ans": 2,
          "explanation": "In flowcharts, a rectangle represents a process or computational calculation."
        }
      ],
      "shortQuestions": [
        {
          "q": "Define Problem analysis.",
          "ans": "Problem analysis is the process of breaking down and understanding a problem in terms of: 1) What input data is provided, 2) What processing and calculations are required, and 3) What output results must be produced."
        },
        {
          "q": "How is the solution of a problem planned?",
          "ans": "Planning the solution involves analyzing problem requirements, identifying candid solutions, selecting appropriate algorithms and data structures, and designing step-by-step logic through flowcharts before coding."
        },
        {
          "q": "Define candid solution of a problem.",
          "ans": "A candid solution (or candidate solution) is a preliminary, spontaneous solution that emerges during initial brainstorming without formal optimization or resource constraints."
        },
        {
          "q": "Define any three problem solving techniques.",
          "ans": "1) Divide and Conquer: Breaking a large problem into smaller sub-problems. 2) Trial and Error: Testing potential solutions until one succeeds. 3) Algorithmic Design: Formulating a structured, step-by-step procedure to guarantee the correct result."
        },
        {
          "q": "List various factors for selecting the best solution of any problem.",
          "ans": "1) Minimum execution time (speed), 2) Minimum memory consumption (space efficiency), 3) Simplicity and ease of programming, 4) Scalability to handle large datasets."
        }
      ],
      "longQuestions": [
        {
          "q": "Define an algorithm and explain the role of algorithm in problem solving.",
          "ans": "Definition: An algorithm is a finite, ordered set of unambiguous steps designed to perform a specific computational task.\n\nRole in Problem Solving:\n1. Foundation for Programming: Algorithms serve as the conceptual bridge between a real-world problem and computer code.\n2. Language Independence: An algorithm is written in simple English/pseudocode and can be implemented in any programming language (C, C++, Python, Java).\n3. Easy Debugging & Error Identification: Tracing an algorithm step-by-step allows programmers to find logical flaws before writing extensive code.\n4. Reusability: Standard algorithms (sorting, searching) can be reused across different software systems."
        },
        {
          "q": "Describe the criteria for measuring efficiency of an algorithm.",
          "ans": "Criteria for Efficiency:\n1. Time Complexity: Evaluates the total execution time or number of basic operations performed relative to input size.\n2. Space Complexity: Measures the total memory (RAM) required to store variables, structures, and program instructions.\n3. Processing Steps: Algorithms with fewer computational steps are faster and more efficient.\n4. Input Scaling: Evaluates how algorithm behavior responds as input values grow (e.g., linear vs quadratic growth)."
        },
        {
          "q": "What is a flowchart? Explain flowchart symbols in detail with examples.",
          "ans": "Definition: A flowchart is a diagrammatic representation that illustrates the sequence of operations in an algorithm using standard geometrical shapes.\n\nFlowchart Symbols:\n1. Oval (Terminal): Marks Start and End points.\n2. Parallelogram (Input/Output): Represents reading data from user or printing results to screen.\n3. Rectangle (Process): Indicates calculations, assignments, and data manipulations (e.g., Sum = A + B).\n4. Diamond (Decision): Evaluates conditions with two or more branch pathways (True/False).\n5. Connector (Circle): Connects split flow paths on the same page.\n6. Flowlines (Arrows): Shows directional sequence of execution."
        },
        {
          "q": "Write an algorithm and draw a flowchart to calculate the factorial of a given number.",
          "ans": "Algorithm for Factorial of N:\nStep 1: Start\nStep 2: Input positive integer N\nStep 3: Initialize Fact = 1 and i = 1\nStep 4: If i > N then go to Step 7\nStep 5: Compute Fact = Fact * i, increment i = i + 1\nStep 6: Repeat from Step 4\nStep 7: Output Fact\nStep 8: Stop\n\nFlowchart Flow:\n[Start (Oval)] -> [Input N (Parallelogram)] -> [Fact = 1, i = 1 (Rectangle)] -> [Is i <= N? (Diamond)] -> (Yes: Fact = Fact * i, i = i + 1 -> Loop back) -> (No: Output Fact (Parallelogram) -> Stop (Oval))."
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "The first phase in solving a computer problem is:",
        "opts": [
          "Coding",
          "Understanding the problem",
          "Testing",
          "Documentation"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Which symbol represents input or output in a flowchart?",
        "opts": [
          "Rectangle",
          "Oval",
          "Parallelogram",
          "Diamond"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "A diamond symbol in a flowchart is used for:",
        "opts": [
          "Processing",
          "Decision making",
          "Input",
          "Start/Stop"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Space complexity of an algorithm measures:",
        "opts": [
          "Physical disk size",
          "Memory (RAM) consumed",
          "Length of code",
          "Execution speed"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Which flowchart symbol represents the start and stop of a program?",
        "opts": [
          "Rectangle",
          "Diamond",
          "Oval",
          "Circle"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "An algorithm must terminate after a ___ number of steps:",
        "opts": [
          "Infinite",
          "Finite",
          "Zero",
          "Undetermined"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "A small circle in a flowchart represents:",
        "opts": [
          "Decision",
          "Connector",
          "Process",
          "Terminal"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "The direction of flow in a flowchart is shown by:",
        "opts": [
          "Lines with arrows",
          "Dotted lines",
          "Double lines",
          "Brackets"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Dividing a complex problem into smaller parts is called:",
        "opts": [
          "Problem analysis",
          "Synthesis",
          "Compilation",
          "Debugging"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Which factor is NOT considered when measuring algorithm efficiency?",
        "opts": [
          "Execution time",
          "Memory usage",
          "Color of IDE",
          "Number of steps"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "What is the difference between an algorithm and a flowchart?",
        "key": "An algorithm is a textual, step-by-step description of problem solution in human language, whereas a flowchart is a diagrammatic representation using geometric symbols.",
        "marks": 4,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Why is problem analysis important before programming?",
        "key": "It ensures the programmer fully understands what inputs are given, what transformations must occur, and what exact outputs are expected, preventing fundamental coding errors.",
        "marks": 4,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "What is meant by time complexity of an algorithm?",
        "key": "Time complexity quantifies the amount of computer processing time required to run an algorithm as a function of the length of the input data.",
        "marks": 4,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "What is the function of a connector symbol in a flowchart?",
        "key": "It connects disparate parts of a flowchart that cannot be joined cleanly with a continuous flowline, particularly across page boundaries or dense branchings.",
        "marks": 4,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "List four advantages of using flowcharts.",
        "key": "1) Visual communication of logic, 2) Easier problem analysis, 3) Efficient debugging, 4) Clear software documentation.",
        "marks": 4,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Explain in detail the five essential stages of problem solving in computer science.",
        "marks": 8,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      },
      {
        "q": "Describe all standard flowchart symbols with their shapes, names, and exact functions.",
        "marks": 8,
        "chapter": "Unit 1: Programming Techniques",
        "source": "slo"
      }
    ]
  },
  {
    "num": 2,
    "id": "cls9-comp-ch02",
    "name": "Programming in C",
    "nameUr": "سی لینگویج میں پروگرامنگ",
    "pageRange": "Pages 31 – 62",
    "status": "done",
    "slos": [
      "Define computer programs and understand why programming is needed",
      "Differentiate between low-level languages (Machine, Assembly) and high-level languages",
      "Describe characteristics of high-level languages (machine independence, readability)",
      "Identify popular high-level languages: C, C++, Java, C#, PHP, Python",
      "Understand language translators: Compiler, Interpreter, and Assembler",
      "Define Integrated Development Environment (IDE) and describe its components (Editor, Compiler, Linker, Loader, Debugger)",
      "Understand the structure of a C program: header files, preprocessor directives, and main() function",
      "Use comments in C programs (single line // and multi-line /* */)",
      "Differentiate between variables and constants, and follow rules for naming variables",
      "Explain standard data types in C (int, float, char, double) and type casting (implicit vs explicit)"
    ],
    "sections": [
      {
        "sectionNum": "2.1",
        "title": "Introduction to Programming",
        "content": "2.1.1 Computer Program:\nA computer program is a collection of structured instructions written in a programming language that tells a computer what task to perform and how to perform it.\n\n2.1.2 Programming Languages:\nA programming language provides a vocabulary and set of grammatical rules for instructing a computer. Programming languages are divided into:\n1. Low-Level Languages: Languages that are close to computer hardware. They include:\n   • Machine Language: The native binary language (0s and 1s) directly executed by the CPU without translation.\n   • Assembly Language: Uses short mnemonic codes (e.g., ADD, SUB, MOV) instead of binary numbers. Translated by an Assembler.\n2. High-Level Languages: English-like programming languages that are easy for humans to read, write, and maintain. They are machine-independent.\n\n2.1.3 Characteristics of High-Level Languages:\n• Machine Independence: Programs run on various hardware platforms with little or no change.\n• Easy to Learn and Understand: English-like vocabulary and mathematical symbols.\n• Standardized Syntax and Structured Design: Encourages modular and bug-free code.\n\n2.1.4 Popular High-Level Languages:\n• C: Developed by Dennis Ritchie at Bell Labs (1972). Highly efficient structured language used in OS and system software.\n• C++: Superset of C created by Bjarne Stroustrup, adding Object-Oriented Programming (OOP).\n• Java: Platform-independent OOP language based on 'Write Once, Run Anywhere' (WORA).\n• C#: Modern general-purpose language developed by Microsoft for the .NET framework.\n\n2.1.5 Compiler and Interpreter:\n• Compiler: A translator that converts the entire source code into machine/object code at once before execution. Generates an object (.obj/.exe) file. (Fast execution)\n• Interpreter: Translates and executes the source code line-by-line. Does not generate a separate object file. (Easier debugging).",
        "keyPoints": [
          "Machine language consists of binary digits (0 and 1) directly understood by CPU.",
          "High-level languages are human-friendly and machine-independent.",
          "Compiler translates entire program at once; Interpreter translates statement by statement."
        ]
      },
      {
        "sectionNum": "2.2",
        "title": "Programming Environment & IDE",
        "content": "2.2.1 Integrated Development Environment (IDE):\nAn IDE is a comprehensive software application that provides software developers with all essential facilities for computer programming in a single graphical workspace.\n\n2.2.2 Modules of C Programming Environment:\n1. Editor: A specialized text editor where programmers write, edit, and save source code files (.c extension).\n2. Compiler: Analyzes source code for syntax errors and translates valid code into machine-readable object code (.obj).\n3. Linker: Combines the compiled object code with C library functions and header routines to produce a standalone executable file (.exe).\n4. Loader: Loads the executable program from disk into main memory (RAM) and allocates system resources for execution.\n5. Debugger: A tool that assists programmers in identifying, tracing, and resolving logic errors and run-time crashes.",
        "keyPoints": [
          "IDE integrates Editor, Compiler, Linker, Loader, and Debugger.",
          "Compilation process: Source Code (.c) -> Compiler -> Object Code (.obj) -> Linker -> Executable (.exe)."
        ]
      },
      {
        "sectionNum": "2.3",
        "title": "Programming Basics & Structure of C",
        "content": "2.3.1 Preprocessor Directives & Header Files:\nPreprocessor directives are compiler instructions executed before actual compilation begins. They start with a hash symbol (#). Header files (with .h extension) contain declarations for standard library functions.\nExample: #include <stdio.h> (Standard Input/Output library header)\n\n2.3.2 Reserved Words (Keywords):\nKeywords are predefined words reserved by the C compiler that have special meaning. They cannot be used as variable names. Examples: int, float, char, if, else, for, while, return, void (32 standard keywords in ANSI C).\n\n2.3.3 Basic Structure of a C Program:\nA C program consists of three main parts:\n1. Preprocessor Directives section\n2. main() function heading\n3. Body of main() enclosed in curly braces { }\n\nStandard C skeleton:\n#include <stdio.h>\nint main() {\n    // Statements\n    return 0;\n}\n\n2.3.4 Comments in C:\nComments are non-executable explanatory notes written for code readability:\n• Single-line comment: Starts with // and continues to the end of the line.\n• Multi-line comment: Starts with /* and ends with */.",
        "keyPoints": [
          "#include directives load library declarations before compilation.",
          "Execution of every C program begins at the main() function.",
          "Every statement in C must end with a semicolon (;) statement terminator."
        ]
      },
      {
        "sectionNum": "2.4",
        "title": "Variables, Constants & Data Types",
        "content": "2.4.1 Variables:\nA variable is a named storage location in computer memory whose value can change during program execution.\n\n2.4.2 Rules for Naming Variables in C:\n1. Must begin with an alphabet (letter) or an underscore (_). Cannot begin with a digit.\n2. Can contain letters, digits, and underscores.\n3. Cannot use reserved keywords (like int, if, while).\n4. C is case-sensitive: 'Total' and 'total' are distinct variables.\n5. No spaces or special punctuation characters allowed.\n\n2.4.3 Constants and the const Qualifier:\nA constant is a quantity that does not change during program execution. Constants can be defined using:\n1. const qualifier: const float PI = 3.14159;\n2. #define preprocessor: #define PI 3.14159\n\n2.4.4 Data Types in C:\n• int (Integer): Stores whole numbers without decimals (2 or 4 bytes). Format specifier: %d\n• float (Floating Point): Stores single-precision decimal numbers (4 bytes). Format specifier: %f\n• char (Character): Stores a single character enclosed in single quotes (1 byte). Format specifier: %c\n• double (Double Precision): Stores large/high-precision decimals (8 bytes). Format specifier: %lf\n\n2.4.5 Type Casting:\nType casting is converting a value from one data type to another:\n• Implicit (Automatic): Handled automatically by the compiler without data loss (e.g., int promoted to float).\n• Explicit (Manual): Forcibly converted by programmer using casting operator: (float) a / b.",
        "keyPoints": [
          "Variables are named memory cells; constants are fixed unchangeable values.",
          "Variable names must start with letter or underscore; no spaces or keywords.",
          "Basic data types: int (%d), float (%f), char (%c), double (%lf)."
        ]
      }
    ],
    "definitions": [
      {
        "term": "Computer Program",
        "def": "A set of sequential instructions that tells a computer what to do and how to do it.",
        "definition": "A set of sequential instructions that tells a computer what to do and how to do it."
      },
      {
        "term": "Machine Language",
        "def": "A low-level language consisting of binary codes (0s and 1s) directly executed by the computer's CPU.",
        "definition": "A low-level language consisting of binary codes (0s and 1s) directly executed by the computer's CPU."
      },
      {
        "term": "Compiler",
        "def": "A language translator that converts the entire high-level source program into machine code object program at once.",
        "definition": "A language translator that converts the entire high-level source program into machine code object program at once."
      },
      {
        "term": "Interpreter",
        "def": "A language translator that reads, translates, and executes high-level program code statement by statement.",
        "definition": "A language translator that reads, translates, and executes high-level program code statement by statement."
      },
      {
        "term": "IDE",
        "def": "Integrated Development Environment; a software suite integrating editor, compiler, linker, and debugger in one environment.",
        "definition": "Integrated Development Environment; a software suite integrating editor, compiler, linker, and debugger in one environment."
      },
      {
        "term": "Header File",
        "def": "A file with .h extension containing definitions of standard library functions, loaded via #include directive.",
        "definition": "A file with .h extension containing definitions of standard library functions, loaded via #include directive."
      },
      {
        "term": "Reserved Words",
        "def": "Predefined words with fixed meanings in C language that cannot be used as user-defined variable identifiers.",
        "definition": "Predefined words with fixed meanings in C language that cannot be used as user-defined variable identifiers."
      },
      {
        "term": "Variable",
        "def": "A named location in computer memory used to hold data that can change during program execution.",
        "definition": "A named location in computer memory used to hold data that can change during program execution."
      },
      {
        "term": "Constant",
        "def": "A fixed quantity or data value whose value remains unchanged throughout program execution.",
        "definition": "A fixed quantity or data value whose value remains unchanged throughout program execution."
      },
      {
        "term": "Type Casting",
        "def": "The process of explicitly or implicitly converting a value of one data type into another data type during program execution.",
        "definition": "The process of explicitly or implicitly converting a value of one data type into another data type during program execution."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "What is a set of instructions that tells a computer what to do and how to do called?",
          "options": [
            "Compiler",
            "Program",
            "Comments",
            "Hardware"
          ],
          "ans": 1,
          "explanation": "A computer program is a set of instructions that directs the computer hardware."
        },
        {
          "q": "Low level languages are close to:",
          "options": [
            "Human languages",
            "Machine languages",
            "Computer hardware",
            "Computer software"
          ],
          "ans": 2,
          "explanation": "Low-level languages are designed to interact directly with computer hardware."
        },
        {
          "q": "Which of the following modules is not part of C programming environment?",
          "options": [
            "Compiler",
            "Editor",
            "Linker",
            "Converter"
          ],
          "ans": 3,
          "explanation": "C programming environment contains Editor, Compiler, Linker, and Loader; Converter is not a module."
        },
        {
          "q": "The output of the compiler is called:",
          "options": [
            "The program",
            "Source code",
            "Linked code",
            "Object code"
          ],
          "ans": 3,
          "explanation": "The compiler transforms source code (.c) into object code (.obj)."
        },
        {
          "q": "What is the type of language in which instructions are written in binary form called?",
          "options": [
            "Machine language",
            "Assembly language",
            "High Level Languages",
            "None of the above"
          ],
          "ans": 0,
          "explanation": "Machine language is the fundamental binary language (0s and 1s)."
        },
        {
          "q": "Which of the following is not a high level language?",
          "options": [
            "BASIC",
            "Assembly language",
            "Pascal",
            "FORTRAN"
          ],
          "ans": 1,
          "explanation": "Assembly language is a low-level symbolic language."
        },
        {
          "q": "Which of the following is a compiler directive?",
          "options": [
            "#include<stdio.h>",
            "float x;",
            "int main()",
            "All of these"
          ],
          "ans": 0,
          "explanation": "#include<stdio.h> is a preprocessor directive."
        },
        {
          "q": "The process of converting source code into object code is known as:",
          "options": [
            "Compilation",
            "Executing",
            "Linking",
            "Saving"
          ],
          "ans": 0,
          "explanation": "Compilation is the translation of source code into object code."
        },
        {
          "q": "A quantity whose value may change during execution of the program is called a:",
          "options": [
            "Constant",
            "Variable",
            "Name",
            "Symbol"
          ],
          "ans": 1,
          "explanation": "A variable can change its value during program runtime."
        },
        {
          "q": "The execution of a C program starts from ___ function:",
          "options": [
            "const()",
            "main()",
            "name()",
            "start()"
          ],
          "ans": 1,
          "explanation": "C program execution always begins in the main() function."
        }
      ],
      "shortQuestions": [
        {
          "q": "Differentiate between program syntax and program semantic.",
          "ans": "Syntax refers to the grammatical rules and structure according to which statements must be written in a programming language. Semantics refers to the actual meaning, logic, and behavior produced by executing those statements."
        },
        {
          "q": "Differentiate between Low level and high level languages.",
          "ans": "Low-level languages (Machine, Assembly) are close to computer hardware, machine-dependent, and difficult for humans to write. High-level languages (C, C++, Java) are English-like, machine-independent, and easy to learn."
        },
        {
          "q": "What is an IDE?",
          "ans": "An IDE (Integrated Development Environment) is a comprehensive software application providing an editor, compiler, linker, and debugger within a single unified graphical user interface."
        },
        {
          "q": "What is OOP?",
          "ans": "OOP (Object-Oriented Programming) is a programming paradigm based on the concept of 'objects' containing data (attributes) and code (methods), promoting modularity, reusability, and inheritance."
        },
        {
          "q": "What are the characteristics of high level languages?",
          "ans": "1) English-like readable syntax, 2) Machine independence, 3) Standardized library support, 4) Ease of debugging and modification."
        },
        {
          "q": "Differentiate between compiler and interpreter.",
          "ans": "A compiler translates the complete source code into machine code at once and generates an object file (.exe). An interpreter translates and executes instructions line-by-line without producing a separate object file."
        },
        {
          "q": "What is a header file?",
          "ans": "A header file (such as stdio.h or math.h) contains function declarations and macro definitions for standard library functions that are included at the top of a program using the #include directive."
        },
        {
          "q": "Differentiate between source program and object program.",
          "ans": "Source program is the high-level code written by the programmer in human-readable form (e.g. hello.c). Object program is the compiled machine-code translation (e.g. hello.obj) generated by the compiler."
        },
        {
          "q": "What are reserved words?",
          "ans": "Reserved words (keywords) are words with predefined meanings in C (e.g. int, float, if, else, return) that cannot be used as user-defined variable or function names."
        },
        {
          "q": "Write rules for variable names.",
          "ans": "1) Must begin with a letter or underscore (_). 2) Can contain letters, digits, and underscores. 3) Cannot use C keywords. 4) No spaces or special characters allowed. 5) Case sensitive."
        },
        {
          "q": "What is the purpose of const qualifier?",
          "ans": "The const qualifier is prefixed to a variable declaration to make its value read-only, preventing any subsequent modification during program execution."
        }
      ],
      "longQuestions": [
        {
          "q": "What is a programming language? Explain different types of low level languages.",
          "ans": "A programming language is a standardized communication system consisting of syntax and semantics used to instruct a computer.\n\nTypes of Low Level Languages:\n1. Machine Language (First Generation):\n• Native language of the CPU written in binary 0s and 1s.\n• Executed directly by hardware at maximum speed without translation.\n• Highly machine-dependent and extremely tedious to write or debug.\n\n2. Assembly Language (Second Generation):\n• Uses mnemonic codes (abbreviations like ADD, SUB, MOV, JMP) instead of binary numbers.\n• Uses symbolic memory addresses.\n• Requires an Assembler to translate mnemonic code into machine language.\n• Still machine-dependent, closely tied to specific CPU architectures."
        },
        {
          "q": "What are high level languages? Explain any five types of high level languages.",
          "ans": "High-level languages use English words and mathematical operators, allowing programs to run on different computer platforms without modification.\n\nFive Popular High Level Languages:\n1. C: Powerful procedural language developed by Dennis Ritchie (1972) for UNIX OS, widely used in systems programming, embedded firmware, and games.\n2. C++: Extension of C developed by Bjarne Stroustrup, introducing Object-Oriented features (classes, inheritance, polymorphism).\n3. Java: Platform-independent OOP language developed by Sun Microsystems; compiled to bytecode executed on Java Virtual Machine (JVM).\n4. C# (C-Sharp): Modern, multi-paradigm language developed by Microsoft for the .NET framework, widely used for desktop, web, and enterprise applications.\n5. PHP: Server-side scripting language designed primarily for dynamic web development and database-driven websites."
        },
        {
          "q": "What is the basic structure of a C program? Also explain different types of preprocessor directives.",
          "ans": "Basic Structure of C Program:\n1. Preprocessor Directives Section:\n   Lines beginning with # that instruct the preprocessor before compilation (e.g., #include <stdio.h>, #define PI 3.14).\n2. main() Function Heading:\n   int main() marks the entry point of program execution.\n3. Program Body / Block:\n   Statements enclosed in { } containing variable declarations, operations, I/O statements, and terminating return statement.\n\nTypes of Preprocessor Directives:\n• File Inclusion Directive (#include): Copies header file declarations into the source code (e.g., #include <stdio.h>).\n• Macro Definition Directive (#define): Defines symbolic constants or inline macros (e.g., #define MAX 100)."
        },
        {
          "q": "Explain different data types used in C language with examples.",
          "ans": "Standard Data Types in C:\n1. Integer (int):\n   Stores whole numbers without fractions. Size: 2 or 4 bytes. Format specifier: %d. Example: int age = 16;\n2. Single Precision Floating Point (float):\n   Stores numbers with decimal points up to 6 digits of precision. Size: 4 bytes. Format specifier: %f. Example: float gpa = 3.85;\n3. Double Precision Floating Point (double):\n   Stores high-precision fractional numbers up to 15 digits. Size: 8 bytes. Format specifier: %lf. Example: double distance = 149597870.7;\n4. Character (char):\n   Stores a single ASCII character enclosed in single quotes. Size: 1 byte. Format specifier: %c. Example: char grade = 'A';"
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "Who developed C programming language?",
          "opts": [
            "Dennis Ritchie",
            "Bjarne Stroustrup",
            "James Gosling",
            "Guido van Rossum"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "In which year was C language created?",
          "opts": [
            "1965",
            "1972",
            "1985",
            "1991"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Which file extension is used for C source files?",
          "opts": [
            ".cpp",
            ".obj",
            ".c",
            ".exe"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Which symbol is used for single-line comments in C?",
          "opts": [
            "/*",
            "//",
            "<!--",
            "#"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "How many keywords are there in standard ANSI C?",
          "opts": [
            "32",
            "48",
            "64",
            "256"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Which of the following is a valid C variable name?",
          "opts": [
            "2total",
            "_score",
            "float",
            "my score"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "The format specifier for character data type is:",
          "opts": [
            "%d",
            "%f",
            "%c",
            "%s"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "What is the memory size of a char data type in C?",
          "opts": [
            "1 byte",
            "2 bytes",
            "4 bytes",
            "8 bytes"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Preprocessor directives in C begin with which symbol?",
          "opts": [
            "@",
            "$",
            "#",
            "&"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "The linker combines object code with:",
          "opts": [
            "Source code",
            "C library functions",
            "Operating system",
            "Assembler"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "What happens during the linking phase in C compilation?",
          "key": "The Linker combines compiled object code (.obj) with runtime library routines to generate a standalone executable file (.exe).",
          "marks": 4,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Why is main() function indispensable in every C program?",
          "key": "Because the operating system specifically designates main() as the program entry point where code execution begins.",
          "marks": 4,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "What is the difference between float and double in C?",
          "key": "float provides 4 bytes storage and 6 digits of decimal precision, whereas double provides 8 bytes storage and 15 digits of precision.",
          "marks": 4,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Explain explicit type casting with an example.",
          "key": "Explicit type casting is manual conversion using type cast syntax: float avg = (float) sum / count; where sum is converted to float before division.",
          "marks": 4,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "What is the function of the loader in C programming?",
          "key": "The loader brings the executable (.exe) file from secondary storage (hard disk) into main memory (RAM) for CPU execution.",
          "marks": 4,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Describe the complete program development lifecycle in C: Editing, Compiling, Linking, Loading, and Executing.",
          "marks": 8,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        },
        {
          "q": "Detail all rules for declaring variables in C and explain valid and invalid variable naming examples.",
          "marks": 8,
          "chapter": "Unit 2: Programming in C",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "Basic C Program Structure",
        "formula": "#include <stdio.h>\nint main() {\n    /* Code */\n    return 0;\n}",
        "note": "Universal C program layout required by ANSI C standard."
      },
      {
        "name": "Data Types & Specifiers",
        "formula": "int (%d, 2/4B) | float (%f, 4B) | char (%c, 1B) | double (%lf, 8B)",
        "note": "Primary fundamental C language data types."
      },
      {
        "name": "Constant Definition",
        "formula": "const data_type VAR = value; OR #define VAR value",
        "note": "Two standard mechanisms to create immutable constants in C."
      }
    ],
    "numericals": [
      {
        "statement": "Identify which of the following variable identifiers are valid and which are invalid, giving reasons:\n1) total_marks\n2) 2nd_pos\n3) float\n4) my score\n5) _index",
        "solution": "1) total_marks: Valid (contains letters and underscore).\n2) 2nd_pos: Invalid (cannot begin with a digit).\n3) float: Invalid (cannot use reserved keyword).\n4) my score: Invalid (contains spaces).\n5) _index: Valid (can begin with underscore)."
      }
    ],
    "englishSummary": "Unit 2 introduces structured programming using the C language. It contrasts low-level machine and assembly languages with high-level languages (C, C++, Java, C#, PHP). It details translation via Compilers and Interpreters, and components of an IDE (Editor, Compiler, Linker, Loader, Debugger). The structure of a C program (preprocessor directives, header files, main(), comments) is presented alongside variable naming rules, data types (int, float, char, double), const qualifier, and type casting.",
    "urduSummary": "یونٹ 2 سی لینگویج میں پروگرامنگ کا تعارف کراتا ہے۔ اس میں لو لیول اور ہائی لیول زبانوں کا تقابل، کمپائلر اور انٹرپریٹر کا فرق، اور آئی ڈی ای (IDE) کے ماڈیولز (ایڈیٹر، کمپائلر، لنکر، لوڈر، ڈیبگر) شامل ہیں۔ اس کے علاوہ سی پروگرام کی بنیادی ساخت (ہیڈر فائلز، مین فنکشن، کمنٹس)، متغیرات (Variables)، مستقلات (Constants)، اور ڈیٹا کی اقسام (int, float, char, double) کی مکمل وضاحت ہے۔",
    "topics": [
      {
        "sectionNum": "2.1",
        "title": "Introduction to Programming",
        "content": "2.1.1 Computer Program:\nA computer program is a collection of structured instructions written in a programming language that tells a computer what task to perform and how to perform it.\n\n2.1.2 Programming Languages:\nA programming language provides a vocabulary and set of grammatical rules for instructing a computer. Programming languages are divided into:\n1. Low-Level Languages: Languages that are close to computer hardware. They include:\n   • Machine Language: The native binary language (0s and 1s) directly executed by the CPU without translation.\n   • Assembly Language: Uses short mnemonic codes (e.g., ADD, SUB, MOV) instead of binary numbers. Translated by an Assembler.\n2. High-Level Languages: English-like programming languages that are easy for humans to read, write, and maintain. They are machine-independent.\n\n2.1.3 Characteristics of High-Level Languages:\n• Machine Independence: Programs run on various hardware platforms with little or no change.\n• Easy to Learn and Understand: English-like vocabulary and mathematical symbols.\n• Standardized Syntax and Structured Design: Encourages modular and bug-free code.\n\n2.1.4 Popular High-Level Languages:\n• C: Developed by Dennis Ritchie at Bell Labs (1972). Highly efficient structured language used in OS and system software.\n• C++: Superset of C created by Bjarne Stroustrup, adding Object-Oriented Programming (OOP).\n• Java: Platform-independent OOP language based on 'Write Once, Run Anywhere' (WORA).\n• C#: Modern general-purpose language developed by Microsoft for the .NET framework.\n\n2.1.5 Compiler and Interpreter:\n• Compiler: A translator that converts the entire source code into machine/object code at once before execution. Generates an object (.obj/.exe) file. (Fast execution)\n• Interpreter: Translates and executes the source code line-by-line. Does not generate a separate object file. (Easier debugging).",
        "keyPoints": [
          "Machine language consists of binary digits (0 and 1) directly understood by CPU.",
          "High-level languages are human-friendly and machine-independent.",
          "Compiler translates entire program at once; Interpreter translates statement by statement."
        ]
      },
      {
        "sectionNum": "2.2",
        "title": "Programming Environment & IDE",
        "content": "2.2.1 Integrated Development Environment (IDE):\nAn IDE is a comprehensive software application that provides software developers with all essential facilities for computer programming in a single graphical workspace.\n\n2.2.2 Modules of C Programming Environment:\n1. Editor: A specialized text editor where programmers write, edit, and save source code files (.c extension).\n2. Compiler: Analyzes source code for syntax errors and translates valid code into machine-readable object code (.obj).\n3. Linker: Combines the compiled object code with C library functions and header routines to produce a standalone executable file (.exe).\n4. Loader: Loads the executable program from disk into main memory (RAM) and allocates system resources for execution.\n5. Debugger: A tool that assists programmers in identifying, tracing, and resolving logic errors and run-time crashes.",
        "keyPoints": [
          "IDE integrates Editor, Compiler, Linker, Loader, and Debugger.",
          "Compilation process: Source Code (.c) -> Compiler -> Object Code (.obj) -> Linker -> Executable (.exe)."
        ]
      },
      {
        "sectionNum": "2.3",
        "title": "Programming Basics & Structure of C",
        "content": "2.3.1 Preprocessor Directives & Header Files:\nPreprocessor directives are compiler instructions executed before actual compilation begins. They start with a hash symbol (#). Header files (with .h extension) contain declarations for standard library functions.\nExample: #include <stdio.h> (Standard Input/Output library header)\n\n2.3.2 Reserved Words (Keywords):\nKeywords are predefined words reserved by the C compiler that have special meaning. They cannot be used as variable names. Examples: int, float, char, if, else, for, while, return, void (32 standard keywords in ANSI C).\n\n2.3.3 Basic Structure of a C Program:\nA C program consists of three main parts:\n1. Preprocessor Directives section\n2. main() function heading\n3. Body of main() enclosed in curly braces { }\n\nStandard C skeleton:\n#include <stdio.h>\nint main() {\n    // Statements\n    return 0;\n}\n\n2.3.4 Comments in C:\nComments are non-executable explanatory notes written for code readability:\n• Single-line comment: Starts with // and continues to the end of the line.\n• Multi-line comment: Starts with /* and ends with */.",
        "keyPoints": [
          "#include directives load library declarations before compilation.",
          "Execution of every C program begins at the main() function.",
          "Every statement in C must end with a semicolon (;) statement terminator."
        ]
      },
      {
        "sectionNum": "2.4",
        "title": "Variables, Constants & Data Types",
        "content": "2.4.1 Variables:\nA variable is a named storage location in computer memory whose value can change during program execution.\n\n2.4.2 Rules for Naming Variables in C:\n1. Must begin with an alphabet (letter) or an underscore (_). Cannot begin with a digit.\n2. Can contain letters, digits, and underscores.\n3. Cannot use reserved keywords (like int, if, while).\n4. C is case-sensitive: 'Total' and 'total' are distinct variables.\n5. No spaces or special punctuation characters allowed.\n\n2.4.3 Constants and the const Qualifier:\nA constant is a quantity that does not change during program execution. Constants can be defined using:\n1. const qualifier: const float PI = 3.14159;\n2. #define preprocessor: #define PI 3.14159\n\n2.4.4 Data Types in C:\n• int (Integer): Stores whole numbers without decimals (2 or 4 bytes). Format specifier: %d\n• float (Floating Point): Stores single-precision decimal numbers (4 bytes). Format specifier: %f\n• char (Character): Stores a single character enclosed in single quotes (1 byte). Format specifier: %c\n• double (Double Precision): Stores large/high-precision decimals (8 bytes). Format specifier: %lf\n\n2.4.5 Type Casting:\nType casting is converting a value from one data type to another:\n• Implicit (Automatic): Handled automatically by the compiler without data loss (e.g., int promoted to float).\n• Explicit (Manual): Forcibly converted by programmer using casting operator: (float) a / b.",
        "keyPoints": [
          "Variables are named memory cells; constants are fixed unchangeable values.",
          "Variable names must start with letter or underscore; no spaces or keywords.",
          "Basic data types: int (%d), float (%f), char (%c), double (%lf)."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "What is a set of instructions that tells a computer what to do and how to do called?",
          "options": [
            "Compiler",
            "Program",
            "Comments",
            "Hardware"
          ],
          "ans": 1,
          "explanation": "A computer program is a set of instructions that directs the computer hardware."
        },
        {
          "q": "Low level languages are close to:",
          "options": [
            "Human languages",
            "Machine languages",
            "Computer hardware",
            "Computer software"
          ],
          "ans": 2,
          "explanation": "Low-level languages are designed to interact directly with computer hardware."
        },
        {
          "q": "Which of the following modules is not part of C programming environment?",
          "options": [
            "Compiler",
            "Editor",
            "Linker",
            "Converter"
          ],
          "ans": 3,
          "explanation": "C programming environment contains Editor, Compiler, Linker, and Loader; Converter is not a module."
        },
        {
          "q": "The output of the compiler is called:",
          "options": [
            "The program",
            "Source code",
            "Linked code",
            "Object code"
          ],
          "ans": 3,
          "explanation": "The compiler transforms source code (.c) into object code (.obj)."
        },
        {
          "q": "What is the type of language in which instructions are written in binary form called?",
          "options": [
            "Machine language",
            "Assembly language",
            "High Level Languages",
            "None of the above"
          ],
          "ans": 0,
          "explanation": "Machine language is the fundamental binary language (0s and 1s)."
        },
        {
          "q": "Which of the following is not a high level language?",
          "options": [
            "BASIC",
            "Assembly language",
            "Pascal",
            "FORTRAN"
          ],
          "ans": 1,
          "explanation": "Assembly language is a low-level symbolic language."
        },
        {
          "q": "Which of the following is a compiler directive?",
          "options": [
            "#include<stdio.h>",
            "float x;",
            "int main()",
            "All of these"
          ],
          "ans": 0,
          "explanation": "#include<stdio.h> is a preprocessor directive."
        },
        {
          "q": "The process of converting source code into object code is known as:",
          "options": [
            "Compilation",
            "Executing",
            "Linking",
            "Saving"
          ],
          "ans": 0,
          "explanation": "Compilation is the translation of source code into object code."
        },
        {
          "q": "A quantity whose value may change during execution of the program is called a:",
          "options": [
            "Constant",
            "Variable",
            "Name",
            "Symbol"
          ],
          "ans": 1,
          "explanation": "A variable can change its value during program runtime."
        },
        {
          "q": "The execution of a C program starts from ___ function:",
          "options": [
            "const()",
            "main()",
            "name()",
            "start()"
          ],
          "ans": 1,
          "explanation": "C program execution always begins in the main() function."
        }
      ],
      "shortQuestions": [
        {
          "q": "Differentiate between program syntax and program semantic.",
          "ans": "Syntax refers to the grammatical rules and structure according to which statements must be written in a programming language. Semantics refers to the actual meaning, logic, and behavior produced by executing those statements."
        },
        {
          "q": "Differentiate between Low level and high level languages.",
          "ans": "Low-level languages (Machine, Assembly) are close to computer hardware, machine-dependent, and difficult for humans to write. High-level languages (C, C++, Java) are English-like, machine-independent, and easy to learn."
        },
        {
          "q": "What is an IDE?",
          "ans": "An IDE (Integrated Development Environment) is a comprehensive software application providing an editor, compiler, linker, and debugger within a single unified graphical user interface."
        },
        {
          "q": "What is OOP?",
          "ans": "OOP (Object-Oriented Programming) is a programming paradigm based on the concept of 'objects' containing data (attributes) and code (methods), promoting modularity, reusability, and inheritance."
        },
        {
          "q": "What are the characteristics of high level languages?",
          "ans": "1) English-like readable syntax, 2) Machine independence, 3) Standardized library support, 4) Ease of debugging and modification."
        },
        {
          "q": "Differentiate between compiler and interpreter.",
          "ans": "A compiler translates the complete source code into machine code at once and generates an object file (.exe). An interpreter translates and executes instructions line-by-line without producing a separate object file."
        },
        {
          "q": "What is a header file?",
          "ans": "A header file (such as stdio.h or math.h) contains function declarations and macro definitions for standard library functions that are included at the top of a program using the #include directive."
        },
        {
          "q": "Differentiate between source program and object program.",
          "ans": "Source program is the high-level code written by the programmer in human-readable form (e.g. hello.c). Object program is the compiled machine-code translation (e.g. hello.obj) generated by the compiler."
        },
        {
          "q": "What are reserved words?",
          "ans": "Reserved words (keywords) are words with predefined meanings in C (e.g. int, float, if, else, return) that cannot be used as user-defined variable or function names."
        },
        {
          "q": "Write rules for variable names.",
          "ans": "1) Must begin with a letter or underscore (_). 2) Can contain letters, digits, and underscores. 3) Cannot use C keywords. 4) No spaces or special characters allowed. 5) Case sensitive."
        },
        {
          "q": "What is the purpose of const qualifier?",
          "ans": "The const qualifier is prefixed to a variable declaration to make its value read-only, preventing any subsequent modification during program execution."
        }
      ],
      "longQuestions": [
        {
          "q": "What is a programming language? Explain different types of low level languages.",
          "ans": "A programming language is a standardized communication system consisting of syntax and semantics used to instruct a computer.\n\nTypes of Low Level Languages:\n1. Machine Language (First Generation):\n• Native language of the CPU written in binary 0s and 1s.\n• Executed directly by hardware at maximum speed without translation.\n• Highly machine-dependent and extremely tedious to write or debug.\n\n2. Assembly Language (Second Generation):\n• Uses mnemonic codes (abbreviations like ADD, SUB, MOV, JMP) instead of binary numbers.\n• Uses symbolic memory addresses.\n• Requires an Assembler to translate mnemonic code into machine language.\n• Still machine-dependent, closely tied to specific CPU architectures."
        },
        {
          "q": "What are high level languages? Explain any five types of high level languages.",
          "ans": "High-level languages use English words and mathematical operators, allowing programs to run on different computer platforms without modification.\n\nFive Popular High Level Languages:\n1. C: Powerful procedural language developed by Dennis Ritchie (1972) for UNIX OS, widely used in systems programming, embedded firmware, and games.\n2. C++: Extension of C developed by Bjarne Stroustrup, introducing Object-Oriented features (classes, inheritance, polymorphism).\n3. Java: Platform-independent OOP language developed by Sun Microsystems; compiled to bytecode executed on Java Virtual Machine (JVM).\n4. C# (C-Sharp): Modern, multi-paradigm language developed by Microsoft for the .NET framework, widely used for desktop, web, and enterprise applications.\n5. PHP: Server-side scripting language designed primarily for dynamic web development and database-driven websites."
        },
        {
          "q": "What is the basic structure of a C program? Also explain different types of preprocessor directives.",
          "ans": "Basic Structure of C Program:\n1. Preprocessor Directives Section:\n   Lines beginning with # that instruct the preprocessor before compilation (e.g., #include <stdio.h>, #define PI 3.14).\n2. main() Function Heading:\n   int main() marks the entry point of program execution.\n3. Program Body / Block:\n   Statements enclosed in { } containing variable declarations, operations, I/O statements, and terminating return statement.\n\nTypes of Preprocessor Directives:\n• File Inclusion Directive (#include): Copies header file declarations into the source code (e.g., #include <stdio.h>).\n• Macro Definition Directive (#define): Defines symbolic constants or inline macros (e.g., #define MAX 100)."
        },
        {
          "q": "Explain different data types used in C language with examples.",
          "ans": "Standard Data Types in C:\n1. Integer (int):\n   Stores whole numbers without fractions. Size: 2 or 4 bytes. Format specifier: %d. Example: int age = 16;\n2. Single Precision Floating Point (float):\n   Stores numbers with decimal points up to 6 digits of precision. Size: 4 bytes. Format specifier: %f. Example: float gpa = 3.85;\n3. Double Precision Floating Point (double):\n   Stores high-precision fractional numbers up to 15 digits. Size: 8 bytes. Format specifier: %lf. Example: double distance = 149597870.7;\n4. Character (char):\n   Stores a single ASCII character enclosed in single quotes. Size: 1 byte. Format specifier: %c. Example: char grade = 'A';"
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "Who developed C programming language?",
        "opts": [
          "Dennis Ritchie",
          "Bjarne Stroustrup",
          "James Gosling",
          "Guido van Rossum"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "In which year was C language created?",
        "opts": [
          "1965",
          "1972",
          "1985",
          "1991"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Which file extension is used for C source files?",
        "opts": [
          ".cpp",
          ".obj",
          ".c",
          ".exe"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Which symbol is used for single-line comments in C?",
        "opts": [
          "/*",
          "//",
          "<!--",
          "#"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "How many keywords are there in standard ANSI C?",
        "opts": [
          "32",
          "48",
          "64",
          "256"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Which of the following is a valid C variable name?",
        "opts": [
          "2total",
          "_score",
          "float",
          "my score"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "The format specifier for character data type is:",
        "opts": [
          "%d",
          "%f",
          "%c",
          "%s"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "What is the memory size of a char data type in C?",
        "opts": [
          "1 byte",
          "2 bytes",
          "4 bytes",
          "8 bytes"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Preprocessor directives in C begin with which symbol?",
        "opts": [
          "@",
          "$",
          "#",
          "&"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "The linker combines object code with:",
        "opts": [
          "Source code",
          "C library functions",
          "Operating system",
          "Assembler"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "What happens during the linking phase in C compilation?",
        "key": "The Linker combines compiled object code (.obj) with runtime library routines to generate a standalone executable file (.exe).",
        "marks": 4,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Why is main() function indispensable in every C program?",
        "key": "Because the operating system specifically designates main() as the program entry point where code execution begins.",
        "marks": 4,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "What is the difference between float and double in C?",
        "key": "float provides 4 bytes storage and 6 digits of decimal precision, whereas double provides 8 bytes storage and 15 digits of precision.",
        "marks": 4,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Explain explicit type casting with an example.",
        "key": "Explicit type casting is manual conversion using type cast syntax: float avg = (float) sum / count; where sum is converted to float before division.",
        "marks": 4,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "What is the function of the loader in C programming?",
        "key": "The loader brings the executable (.exe) file from secondary storage (hard disk) into main memory (RAM) for CPU execution.",
        "marks": 4,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Describe the complete program development lifecycle in C: Editing, Compiling, Linking, Loading, and Executing.",
        "marks": 8,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      },
      {
        "q": "Detail all rules for declaring variables in C and explain valid and invalid variable naming examples.",
        "marks": 8,
        "chapter": "Unit 2: Programming in C",
        "source": "slo"
      }
    ]
  },
  {
    "num": 3,
    "id": "cls9-comp-ch03",
    "name": "Input / Output Handling",
    "nameUr": "ان پٹ اور آؤٹ پٹ ہینڈلنگ",
    "pageRange": "Pages 63 – 94",
    "status": "done",
    "slos": [
      "Understand standard input and output streams in C",
      "Use output functions: printf(), puts(), and C++ cout object",
      "Use input functions: scanf(), gets(), getch(), getche(), and C++ cin object",
      "Understand the statement terminator (semicolon ;) in C",
      "Use format specifiers for various data types (%d, %i, %f, %c, %s, %e, %g)",
      "Use escape sequences to format terminal output (\\n, \\t, \\a, \\b, \\r, \\\", \\\\)",
      "Understand operators in C: arithmetic, assignment, compound assignment, increment/decrement",
      "Differentiate between prefix (++x) and postfix (x++) increment/decrement operations",
      "Apply relational operators (<, <=, >, >=, ==, !=) to form conditions",
      "Apply logical operators (&&, ||, !) to build compound conditions",
      "Evaluate operator precedence and associativity in complex expressions"
    ],
    "sections": [
      {
        "sectionNum": "3.1",
        "title": "Input and Output Functions",
        "content": "3.1.1 Output Functions:\nOutput functions display results, messages, and processed data on the computer screen.\n• printf(): Formatted output function declared in <stdio.h>. Syntax: printf(\"format string\", argument_list);\n• puts(): Outputs a string of characters to the screen and automatically appends a new line.\n• cout: Standard output stream object in C++ (declared in <iostream>) using insertion operator (<<).\n\n3.1.2 Input Functions:\nInput functions accept data entered by user via the keyboard.\n• scanf(): Formatted input function declared in <stdio.h>. Requires address-of operator (&) before variable names. Syntax: scanf(\"format specifier\", &var);\n• gets(): Reads a full line of string characters including spaces from keyboard until Enter is pressed.\n• getch(): Reads a single character from keyboard without echoing it to the screen and without waiting for Enter.\n• getche(): Reads a single character from keyboard, echoes it on screen immediately without waiting for Enter.\n• cin: Standard input stream object in C++ using extraction operator (>>).\n\n3.1.3 Statement Terminator:\nEvery executable statement in C must terminate with a semicolon (;). It informs the compiler that the statement has ended.\n\n3.1.4 Escape Sequences:\nNon-printable control characters preceded by a backslash (\\):\n• \\n: Newline (moves cursor to the beginning of next line)\n• \\t: Horizontal Tab (skips 8 spaces)\n• \\a: Alert/Bell (produces a beep sound)\n• \\b: Backspace (moves cursor back one space)\n• \\\\: Backslash character\n• \\\": Double quote character\n\n3.1.5 Format Specifiers:\nConversion specification codes starting with %:\n• %d / %i: Signed decimal integer\n• %f: Floating point decimal\n• %c: Single character\n• %s: String of characters\n• %lf: Double precision float.",
        "keyPoints": [
          "printf() and scanf() are formatted I/O functions in <stdio.h>.",
          "scanf() requires address-of operator (&) to store input into memory.",
          "\\n inserts a newline; \\t inserts a horizontal tab.",
          "Statement terminator in C is the semicolon (;)."
        ]
      },
      {
        "sectionNum": "3.2",
        "title": "Operators in C",
        "content": "Operators are symbols that perform mathematical, logical, and relational operations on variables and values (operands).\n\n3.2.1 Arithmetic Operators:\n• Addition (+), Subtraction (-), Multiplication (*), Division (/)\n• Modulus (%): Returns the remainder of integer division (e.g., 10 % 3 = 1). Operates only on integers.\n\n3.2.2 Assignment Operator (=):\nAssigns the value of the right-hand expression to the variable on the left (e.g., x = 10;).\n\n3.2.3 Compound Assignment Operators:\nCombines arithmetic operation with assignment: +=, -=, *=, /=, %=\nExample: x += 5 is equivalent to x = x + 5;\n\n3.2.4 Increment & Decrement Operators (++ and --):\n• Increment (++): Adds 1 to the variable.\n  - Prefix (++x): Increments x first, then uses updated value in expression.\n  - Postfix (x++): Uses current value in expression first, then increments x.\n• Decrement (--): Subtracts 1 from the variable (Prefix --x, Postfix x--).\n\n3.2.5 Relational Operators:\nUsed to compare two values, returning 1 (True) or 0 (False):\n< (Less than), <= (Less than or equal), > (Greater than), >= (Greater than or equal), == (Equal to), != (Not equal to).\n\n3.2.6 Logical Operators:\nUsed to connect two or more relational conditions:\n• Logical AND (&&): True only if BOTH conditions are true.\n• Logical OR (||): True if AT LEAST ONE condition is true.\n• Logical NOT (!): Reverses the logical state (True becomes False, False becomes True).\n\n3.2.7 Difference between = and ==:\n• = is the Assignment operator (assigns a value to a variable).\n• == is the Relational Equality operator (tests if two operands have identical values).\n\n3.2.8 Operator Precedence:\nHigher precedence operators are evaluated before lower precedence operators:\n1. Parentheses ( )\n2. Unary operators (++, --, !)\n3. Arithmetic (*, /, %)\n4. Arithmetic (+, -)\n5. Relational (<, <=, >, >=)\n6. Equality (==, !=)\n7. Logical AND (&&)\n8. Logical OR (||)\n9. Assignment (=, +=, -=, *=, /=, %=).",
        "keyPoints": [
          "Modulus operator (%) returns remainder and only works on integer operands.",
          "++x increments before evaluation (prefix); x++ increments after evaluation (postfix).",
          "= assigns value; == compares equality.",
          "Logical operators: && (AND), || (OR), ! (NOT)."
        ]
      }
    ],
    "definitions": [
      {
        "term": "printf() Function",
        "def": "Standard C library function in <stdio.h> used to display formatted output on screen.",
        "definition": "Standard C library function in <stdio.h> used to display formatted output on screen."
      },
      {
        "term": "scanf() Function",
        "def": "Standard C library function in <stdio.h> used to read formatted input from the keyboard into variables.",
        "definition": "Standard C library function in <stdio.h> used to read formatted input from the keyboard into variables."
      },
      {
        "term": "Format Specifier",
        "def": "A conversion specification code prefixed by % that dictates the data type and format of I/O values.",
        "definition": "A conversion specification code prefixed by % that dictates the data type and format of I/O values."
      },
      {
        "term": "Escape Sequence",
        "def": "A special non-printable character sequence prefixed by a backslash (\\) used to control formatting such as newlines and tabs.",
        "definition": "A special non-printable character sequence prefixed by a backslash (\\) used to control formatting such as newlines and tabs."
      },
      {
        "term": "Modulus Operator",
        "def": "An arithmetic operator (%) that yields the integer remainder after division of two integer numbers.",
        "definition": "An arithmetic operator (%) that yields the integer remainder after division of two integer numbers."
      },
      {
        "term": "Compound Assignment Operator",
        "def": "A shorthand operator (such as += or *=) combining an arithmetic operation with value assignment.",
        "definition": "A shorthand operator (such as += or *=) combining an arithmetic operation with value assignment."
      },
      {
        "term": "Increment Operator",
        "def": "A unary operator (++) that increases the value of its integer operand by exactly 1.",
        "definition": "A unary operator (++) that increases the value of its integer operand by exactly 1."
      },
      {
        "term": "Relational Operators",
        "def": "Operators used to compare two values, evaluating to either true (1) or false (0).",
        "definition": "Operators used to compare two values, evaluating to either true (1) or false (0)."
      },
      {
        "term": "Logical Operators",
        "def": "Operators (&&, ||, !) used to combine multiple conditional expressions into a single compound condition.",
        "definition": "Operators (&&, ||, !) used to combine multiple conditional expressions into a single compound condition."
      },
      {
        "term": "Operator Precedence",
        "def": "The established order of priority that determines which operators are evaluated first in an expression.",
        "definition": "The established order of priority that determines which operators are evaluated first in an expression."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "The functions that are used to get data and then to assign it to variables are known as:",
          "options": [
            "Output functions",
            "String functions",
            "Numeric functions",
            "Input functions"
          ],
          "ans": 3,
          "explanation": "Input functions receive data from the user and assign it to variables."
        },
        {
          "q": "Which of the following functions is used to display output on the screen?",
          "options": [
            "printf()",
            "scanf()",
            "gets()",
            "getchar()"
          ],
          "ans": 0,
          "explanation": "printf() is the standard formatted output function in C."
        },
        {
          "q": "Which function is used to accept values for variables during program execution?",
          "options": [
            "printf() function",
            "cout function",
            "stdio.h function",
            "scanf() function"
          ],
          "ans": 3,
          "explanation": "scanf() accepts data from user during runtime."
        },
        {
          "q": "In C language every statement is terminated by a:",
          "options": [
            "Full stop",
            "Double quotes",
            "Semicolon",
            "Comma"
          ],
          "ans": 2,
          "explanation": "Semicolon (;) is the mandatory statement terminator in C."
        },
        {
          "q": "Which of the following is the format specifier for integer data type?",
          "options": [
            "%s",
            "%c",
            "%d",
            "%f"
          ],
          "ans": 2,
          "explanation": "%d is the format specifier for decimal integers."
        },
        {
          "q": "Which escape sequence is used to insert a new line in output?",
          "options": [
            "\\new",
            "\\t",
            "\\n",
            "\\line"
          ],
          "ans": 2,
          "explanation": "\\n inserts a newline character."
        },
        {
          "q": "Which of the following is called Modulus operator?",
          "options": [
            "+",
            "%",
            "/",
            "*"
          ],
          "ans": 1,
          "explanation": "% is the modulus operator that returns remainder."
        },
        {
          "q": "Which operator is used to add 1 to the value of an integer variable?",
          "options": [
            "+",
            "=",
            "*",
            "++"
          ],
          "ans": 3,
          "explanation": "++ is the unary increment operator."
        },
        {
          "q": "Which operator is used to add 1 to the value of the variable after the value of the variable has been used in the expression?",
          "options": [
            "Postfix increment operator",
            "Prefix increment operator",
            "Modulus operator",
            "Binary operator"
          ],
          "ans": 0,
          "explanation": "Postfix increment (x++) uses current value first, then increments by 1."
        },
        {
          "q": "Which operator is used to produce true result if both conditions are true?",
          "options": [
            "AND",
            "OR",
            "NOT",
            "All of the above"
          ],
          "ans": 0,
          "explanation": "Logical AND (&&) requires both operands to be true."
        }
      ],
      "shortQuestions": [
        {
          "q": "What is the use of format specifiers? Give examples.",
          "ans": "Format specifiers inform the compiler about the type of data being read or printed. Examples: %d for integers, %f for floats, %c for single characters, %s for strings."
        },
        {
          "q": "Why escape sequences are used? Give examples.",
          "ans": "Escape sequences control terminal formatting and cursor positioning. Examples: \\n moves the cursor to a newline; \\t moves the cursor to the next tab stop (8 spaces)."
        },
        {
          "q": "What is the purpose of gets() function?",
          "ans": "The gets() function reads an entire string of text containing whitespace from standard input until the Enter key is pressed, storing it in a character array."
        },
        {
          "q": "Differentiate between getch() and getche() functions.",
          "ans": "Both read a single keystroke from the keyboard without waiting for Enter. getch() does NOT echo the typed character on screen, whereas getche() immediately echoes the typed character on screen."
        },
        {
          "q": "Evaluate the following expressions:\na. 9 - 5 * (6 + 2)\nb. 60 / 10 * 24 + 3\nc. 100 % 50 - 100 % 3",
          "ans": "a. 9 - 5 * (8) = 9 - 40 = -31\nb. 6 * 24 + 3 = 144 + 3 = 147\nc. 0 - 1 = -1"
        },
        {
          "q": "Differentiate between simple and compound assignment operators.",
          "ans": "Simple assignment (=) directly stores a value into a variable: x = 10;\nCompound assignment combines arithmetic with assignment: x += 5 (equivalent to x = x + 5)."
        }
      ],
      "longQuestions": [
        {
          "q": "What are operators? Explain different types of operators in C with examples.",
          "ans": "Operators are symbols that perform mathematical, relational, or logical manipulations on operands.\n\nTypes of Operators in C:\n1. Arithmetic Operators: +, -, *, /, % (perform basic mathematical calculations).\n2. Relational Operators: <, <=, >, >=, ==, != (compare values, producing true/false).\n3. Logical Operators: && (AND), || (OR), ! (NOT) (combine multiple conditions).\n4. Assignment Operators: = and compound assignments (+=, -=, *=, /=, %=).\n5. Increment/Decrement: ++, -- (unary operators modifying values by 1).\n6. Conditional Operator (? :): Ternary operator for concise conditional assignment."
        },
        {
          "q": "Write a complete C program that reads three numbers and prints their sum, product, and average.",
          "ans": "#include <stdio.h>\nint main() {\n    float a, b, c, sum, product, average;\n    printf(\"Enter three numbers: \");\n    scanf(\"%f %f %f\", &a, &b, &c);\n    \n    sum = a + b + c;\n    product = a * b * c;\n    average = sum / 3.0;\n    \n    printf(\"Sum = %.2f\\n\", sum);\n    printf(\"Product = %.2f\\n\", product);\n    printf(\"Average = %.2f\\n\", average);\n    \n    return 0;\n}"
        },
        {
          "q": "Write a program in C that reads temperature in Celsius, converts it into Fahrenheit and prints it on the screen.",
          "ans": "#include <stdio.h>\nint main() {\n    float celsius, fahrenheit;\n    printf(\"Enter temperature in Celsius: \");\n    scanf(\"%f\", &celsius);\n    \n    fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n    \n    printf(\"Temperature in Fahrenheit = %.2f\\n\", fahrenheit);\n    return 0;\n}"
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "Which symbol is required before variable names in scanf()?",
          "opts": [
            "*",
            "&",
            "#",
            "$"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "What is the result of 17 % 5 in C?",
          "opts": [
            "3",
            "2",
            "3.4",
            "0"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "If x = 5, what is the value of y = ++x?",
          "opts": [
            "4",
            "5",
            "6",
            "7"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "If x = 5, what is the value of y = x++?",
          "opts": [
            "4",
            "5",
            "6",
            "7"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Which header file is required for printf() and scanf()?",
          "opts": [
            "<math.h>",
            "<conio.h>",
            "<stdio.h>",
            "<stdlib.h>"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Which operator has the highest precedence?",
          "opts": [
            "+",
            "*",
            "()",
            "="
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Which escape sequence sounds a beep alert?",
          "opts": [
            "\\b",
            "\\a",
            "\\n",
            "\\t"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "The expression (5 > 3 && 2 > 4) evaluates to:",
          "opts": [
            "1 (True)",
            "0 (False)",
            "Error",
            "-1"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Which format specifier is used for double precision floating numbers?",
          "opts": [
            "%d",
            "%f",
            "%lf",
            "%s"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Which statement correctly prints 'Hello World' with a newline?",
          "opts": [
            "printf(\"Hello World\\n\");",
            "scanf(\"Hello World\\n\");",
            "print(\"Hello World\");",
            "puts(\"Hello World\\t\");"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "Why is the address-of operator (&) omitted when reading string inputs with scanf() or gets()?",
          "key": "Because a character array (string) name itself acts as a pointer to the starting memory address of the array.",
          "marks": 4,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "What is the difference between = and == in C?",
          "key": "= is the assignment operator that assigns the RHS value to the LHS variable. == is the relational equality operator comparing two expressions for equivalence.",
          "marks": 4,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Explain the difference between prefix and postfix decrement operators.",
          "key": "--x decrements the value of x first before using it in the expression, while x-- uses the current value first and then decrements x.",
          "marks": 4,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "What will be printed by: printf(\"Result = %d\", 15 / 2);?",
          "key": "Result = 7 (Because both operands are integers, integer division truncates the decimal portion).",
          "marks": 4,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "List four escape sequences and their functions in C.",
          "key": "\\n (Newline), \\t (Tab), \\a (Bell/Alert sound), \\\" (Display double quotation mark).",
          "marks": 4,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain in detail the working and syntax of printf() and scanf() functions with programming examples.",
          "marks": 8,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        },
        {
          "q": "Construct a complete Operator Precedence Table for C language and explain how complex expressions are evaluated.",
          "marks": 8,
          "chapter": "Unit 3: Input / Output Handling",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "printf Syntax",
        "formula": "printf(\"format string\", var1, var2, ...);",
        "note": "Formatted console output function from <stdio.h>."
      },
      {
        "name": "scanf Syntax",
        "formula": "scanf(\"format string\", &var1, &var2, ...);",
        "note": "Formatted keyboard input function using address-of (&) operator."
      },
      {
        "name": "Celsius to Fahrenheit Conversion",
        "formula": "F = (C * 9.0 / 5.0) + 32.0",
        "note": "Standard scientific temperature conversion formula implemented in C."
      },
      {
        "name": "Compound Assignment Expansion",
        "formula": "A op= B  <=>  A = A op (B)",
        "note": "Mathematical equivalence for +=, -=, *=, /=, %=."
      }
    ],
    "numericals": [
      {
        "statement": "Trace the output of the following C code segment:\nint a = 10, b = 20, c;\nc = ++a + b++;\nprintf(\"a=%d, b=%d, c=%d\", a, b, c);",
        "solution": "1. ++a: Prefix increment -> a becomes 11.\n2. b++: Postfix increment -> current value 20 is used in addition, then b becomes 21.\n3. c = 11 + 20 = 31.\nOutput: a=11, b=21, c=31"
      }
    ],
    "englishSummary": "Unit 3 covers console Input and Output operations and Operators in C. It introduces output functions (printf, puts, cout) and input functions (scanf, gets, getch, getche, cin). It explains statement terminators, escape sequences (\\n, \\t, \\a), and format specifiers (%d, %f, %c, %s). Arithmetic, assignment, compound assignment, increment/decrement (prefix vs postfix), relational, and logical operators are detailed with operator precedence rules.",
    "urduSummary": "یونٹ 3 کنسول ان پٹ اور آؤٹ پٹ اور آپریٹرز کے استعمال کا احاطہ کرتا ہے۔ اس میں printf, puts, scanf, gets, getch اور getche کے عملی طریقے، ایسکیپ سیکوینس (\\n, \\t, \\a) اور فارمیٹ سپیسیفائر (%d, %f, %c) شامل ہیں۔ حسابی آپریٹرز، ماڈیولس (%)، کمپاؤنڈ اسائنمنٹ، انکریمنٹ/ڈیکریمنٹ (پری فکس اور پوسٹ فکس)، ریلیشنل اور لاجیکل آپریٹرز، اور ان کی ترجیحات (Operator Precedence) کی تفصیلی وضاحت کی گئی ہے۔",
    "topics": [
      {
        "sectionNum": "3.1",
        "title": "Input and Output Functions",
        "content": "3.1.1 Output Functions:\nOutput functions display results, messages, and processed data on the computer screen.\n• printf(): Formatted output function declared in <stdio.h>. Syntax: printf(\"format string\", argument_list);\n• puts(): Outputs a string of characters to the screen and automatically appends a new line.\n• cout: Standard output stream object in C++ (declared in <iostream>) using insertion operator (<<).\n\n3.1.2 Input Functions:\nInput functions accept data entered by user via the keyboard.\n• scanf(): Formatted input function declared in <stdio.h>. Requires address-of operator (&) before variable names. Syntax: scanf(\"format specifier\", &var);\n• gets(): Reads a full line of string characters including spaces from keyboard until Enter is pressed.\n• getch(): Reads a single character from keyboard without echoing it to the screen and without waiting for Enter.\n• getche(): Reads a single character from keyboard, echoes it on screen immediately without waiting for Enter.\n• cin: Standard input stream object in C++ using extraction operator (>>).\n\n3.1.3 Statement Terminator:\nEvery executable statement in C must terminate with a semicolon (;). It informs the compiler that the statement has ended.\n\n3.1.4 Escape Sequences:\nNon-printable control characters preceded by a backslash (\\):\n• \\n: Newline (moves cursor to the beginning of next line)\n• \\t: Horizontal Tab (skips 8 spaces)\n• \\a: Alert/Bell (produces a beep sound)\n• \\b: Backspace (moves cursor back one space)\n• \\\\: Backslash character\n• \\\": Double quote character\n\n3.1.5 Format Specifiers:\nConversion specification codes starting with %:\n• %d / %i: Signed decimal integer\n• %f: Floating point decimal\n• %c: Single character\n• %s: String of characters\n• %lf: Double precision float.",
        "keyPoints": [
          "printf() and scanf() are formatted I/O functions in <stdio.h>.",
          "scanf() requires address-of operator (&) to store input into memory.",
          "\\n inserts a newline; \\t inserts a horizontal tab.",
          "Statement terminator in C is the semicolon (;)."
        ]
      },
      {
        "sectionNum": "3.2",
        "title": "Operators in C",
        "content": "Operators are symbols that perform mathematical, logical, and relational operations on variables and values (operands).\n\n3.2.1 Arithmetic Operators:\n• Addition (+), Subtraction (-), Multiplication (*), Division (/)\n• Modulus (%): Returns the remainder of integer division (e.g., 10 % 3 = 1). Operates only on integers.\n\n3.2.2 Assignment Operator (=):\nAssigns the value of the right-hand expression to the variable on the left (e.g., x = 10;).\n\n3.2.3 Compound Assignment Operators:\nCombines arithmetic operation with assignment: +=, -=, *=, /=, %=\nExample: x += 5 is equivalent to x = x + 5;\n\n3.2.4 Increment & Decrement Operators (++ and --):\n• Increment (++): Adds 1 to the variable.\n  - Prefix (++x): Increments x first, then uses updated value in expression.\n  - Postfix (x++): Uses current value in expression first, then increments x.\n• Decrement (--): Subtracts 1 from the variable (Prefix --x, Postfix x--).\n\n3.2.5 Relational Operators:\nUsed to compare two values, returning 1 (True) or 0 (False):\n< (Less than), <= (Less than or equal), > (Greater than), >= (Greater than or equal), == (Equal to), != (Not equal to).\n\n3.2.6 Logical Operators:\nUsed to connect two or more relational conditions:\n• Logical AND (&&): True only if BOTH conditions are true.\n• Logical OR (||): True if AT LEAST ONE condition is true.\n• Logical NOT (!): Reverses the logical state (True becomes False, False becomes True).\n\n3.2.7 Difference between = and ==:\n• = is the Assignment operator (assigns a value to a variable).\n• == is the Relational Equality operator (tests if two operands have identical values).\n\n3.2.8 Operator Precedence:\nHigher precedence operators are evaluated before lower precedence operators:\n1. Parentheses ( )\n2. Unary operators (++, --, !)\n3. Arithmetic (*, /, %)\n4. Arithmetic (+, -)\n5. Relational (<, <=, >, >=)\n6. Equality (==, !=)\n7. Logical AND (&&)\n8. Logical OR (||)\n9. Assignment (=, +=, -=, *=, /=, %=).",
        "keyPoints": [
          "Modulus operator (%) returns remainder and only works on integer operands.",
          "++x increments before evaluation (prefix); x++ increments after evaluation (postfix).",
          "= assigns value; == compares equality.",
          "Logical operators: && (AND), || (OR), ! (NOT)."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "The functions that are used to get data and then to assign it to variables are known as:",
          "options": [
            "Output functions",
            "String functions",
            "Numeric functions",
            "Input functions"
          ],
          "ans": 3,
          "explanation": "Input functions receive data from the user and assign it to variables."
        },
        {
          "q": "Which of the following functions is used to display output on the screen?",
          "options": [
            "printf()",
            "scanf()",
            "gets()",
            "getchar()"
          ],
          "ans": 0,
          "explanation": "printf() is the standard formatted output function in C."
        },
        {
          "q": "Which function is used to accept values for variables during program execution?",
          "options": [
            "printf() function",
            "cout function",
            "stdio.h function",
            "scanf() function"
          ],
          "ans": 3,
          "explanation": "scanf() accepts data from user during runtime."
        },
        {
          "q": "In C language every statement is terminated by a:",
          "options": [
            "Full stop",
            "Double quotes",
            "Semicolon",
            "Comma"
          ],
          "ans": 2,
          "explanation": "Semicolon (;) is the mandatory statement terminator in C."
        },
        {
          "q": "Which of the following is the format specifier for integer data type?",
          "options": [
            "%s",
            "%c",
            "%d",
            "%f"
          ],
          "ans": 2,
          "explanation": "%d is the format specifier for decimal integers."
        },
        {
          "q": "Which escape sequence is used to insert a new line in output?",
          "options": [
            "\\new",
            "\\t",
            "\\n",
            "\\line"
          ],
          "ans": 2,
          "explanation": "\\n inserts a newline character."
        },
        {
          "q": "Which of the following is called Modulus operator?",
          "options": [
            "+",
            "%",
            "/",
            "*"
          ],
          "ans": 1,
          "explanation": "% is the modulus operator that returns remainder."
        },
        {
          "q": "Which operator is used to add 1 to the value of an integer variable?",
          "options": [
            "+",
            "=",
            "*",
            "++"
          ],
          "ans": 3,
          "explanation": "++ is the unary increment operator."
        },
        {
          "q": "Which operator is used to add 1 to the value of the variable after the value of the variable has been used in the expression?",
          "options": [
            "Postfix increment operator",
            "Prefix increment operator",
            "Modulus operator",
            "Binary operator"
          ],
          "ans": 0,
          "explanation": "Postfix increment (x++) uses current value first, then increments by 1."
        },
        {
          "q": "Which operator is used to produce true result if both conditions are true?",
          "options": [
            "AND",
            "OR",
            "NOT",
            "All of the above"
          ],
          "ans": 0,
          "explanation": "Logical AND (&&) requires both operands to be true."
        }
      ],
      "shortQuestions": [
        {
          "q": "What is the use of format specifiers? Give examples.",
          "ans": "Format specifiers inform the compiler about the type of data being read or printed. Examples: %d for integers, %f for floats, %c for single characters, %s for strings."
        },
        {
          "q": "Why escape sequences are used? Give examples.",
          "ans": "Escape sequences control terminal formatting and cursor positioning. Examples: \\n moves the cursor to a newline; \\t moves the cursor to the next tab stop (8 spaces)."
        },
        {
          "q": "What is the purpose of gets() function?",
          "ans": "The gets() function reads an entire string of text containing whitespace from standard input until the Enter key is pressed, storing it in a character array."
        },
        {
          "q": "Differentiate between getch() and getche() functions.",
          "ans": "Both read a single keystroke from the keyboard without waiting for Enter. getch() does NOT echo the typed character on screen, whereas getche() immediately echoes the typed character on screen."
        },
        {
          "q": "Evaluate the following expressions:\na. 9 - 5 * (6 + 2)\nb. 60 / 10 * 24 + 3\nc. 100 % 50 - 100 % 3",
          "ans": "a. 9 - 5 * (8) = 9 - 40 = -31\nb. 6 * 24 + 3 = 144 + 3 = 147\nc. 0 - 1 = -1"
        },
        {
          "q": "Differentiate between simple and compound assignment operators.",
          "ans": "Simple assignment (=) directly stores a value into a variable: x = 10;\nCompound assignment combines arithmetic with assignment: x += 5 (equivalent to x = x + 5)."
        }
      ],
      "longQuestions": [
        {
          "q": "What are operators? Explain different types of operators in C with examples.",
          "ans": "Operators are symbols that perform mathematical, relational, or logical manipulations on operands.\n\nTypes of Operators in C:\n1. Arithmetic Operators: +, -, *, /, % (perform basic mathematical calculations).\n2. Relational Operators: <, <=, >, >=, ==, != (compare values, producing true/false).\n3. Logical Operators: && (AND), || (OR), ! (NOT) (combine multiple conditions).\n4. Assignment Operators: = and compound assignments (+=, -=, *=, /=, %=).\n5. Increment/Decrement: ++, -- (unary operators modifying values by 1).\n6. Conditional Operator (? :): Ternary operator for concise conditional assignment."
        },
        {
          "q": "Write a complete C program that reads three numbers and prints their sum, product, and average.",
          "ans": "#include <stdio.h>\nint main() {\n    float a, b, c, sum, product, average;\n    printf(\"Enter three numbers: \");\n    scanf(\"%f %f %f\", &a, &b, &c);\n    \n    sum = a + b + c;\n    product = a * b * c;\n    average = sum / 3.0;\n    \n    printf(\"Sum = %.2f\\n\", sum);\n    printf(\"Product = %.2f\\n\", product);\n    printf(\"Average = %.2f\\n\", average);\n    \n    return 0;\n}"
        },
        {
          "q": "Write a program in C that reads temperature in Celsius, converts it into Fahrenheit and prints it on the screen.",
          "ans": "#include <stdio.h>\nint main() {\n    float celsius, fahrenheit;\n    printf(\"Enter temperature in Celsius: \");\n    scanf(\"%f\", &celsius);\n    \n    fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n    \n    printf(\"Temperature in Fahrenheit = %.2f\\n\", fahrenheit);\n    return 0;\n}"
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "Which symbol is required before variable names in scanf()?",
        "opts": [
          "*",
          "&",
          "#",
          "$"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "What is the result of 17 % 5 in C?",
        "opts": [
          "3",
          "2",
          "3.4",
          "0"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "If x = 5, what is the value of y = ++x?",
        "opts": [
          "4",
          "5",
          "6",
          "7"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "If x = 5, what is the value of y = x++?",
        "opts": [
          "4",
          "5",
          "6",
          "7"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Which header file is required for printf() and scanf()?",
        "opts": [
          "<math.h>",
          "<conio.h>",
          "<stdio.h>",
          "<stdlib.h>"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Which operator has the highest precedence?",
        "opts": [
          "+",
          "*",
          "()",
          "="
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Which escape sequence sounds a beep alert?",
        "opts": [
          "\\b",
          "\\a",
          "\\n",
          "\\t"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "The expression (5 > 3 && 2 > 4) evaluates to:",
        "opts": [
          "1 (True)",
          "0 (False)",
          "Error",
          "-1"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Which format specifier is used for double precision floating numbers?",
        "opts": [
          "%d",
          "%f",
          "%lf",
          "%s"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Which statement correctly prints 'Hello World' with a newline?",
        "opts": [
          "printf(\"Hello World\\n\");",
          "scanf(\"Hello World\\n\");",
          "print(\"Hello World\");",
          "puts(\"Hello World\\t\");"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "Why is the address-of operator (&) omitted when reading string inputs with scanf() or gets()?",
        "key": "Because a character array (string) name itself acts as a pointer to the starting memory address of the array.",
        "marks": 4,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "What is the difference between = and == in C?",
        "key": "= is the assignment operator that assigns the RHS value to the LHS variable. == is the relational equality operator comparing two expressions for equivalence.",
        "marks": 4,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Explain the difference between prefix and postfix decrement operators.",
        "key": "--x decrements the value of x first before using it in the expression, while x-- uses the current value first and then decrements x.",
        "marks": 4,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "What will be printed by: printf(\"Result = %d\", 15 / 2);?",
        "key": "Result = 7 (Because both operands are integers, integer division truncates the decimal portion).",
        "marks": 4,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "List four escape sequences and their functions in C.",
        "key": "\\n (Newline), \\t (Tab), \\a (Bell/Alert sound), \\\" (Display double quotation mark).",
        "marks": 4,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Explain in detail the working and syntax of printf() and scanf() functions with programming examples.",
        "marks": 8,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      },
      {
        "q": "Construct a complete Operator Precedence Table for C language and explain how complex expressions are evaluated.",
        "marks": 8,
        "chapter": "Unit 3: Input / Output Handling",
        "source": "slo"
      }
    ]
  },
  {
    "num": 4,
    "id": "cls9-comp-ch04",
    "name": "Control Structure",
    "nameUr": "کنٹرول سٹرکچر",
    "pageRange": "Pages 95 – 115",
    "status": "done",
    "slos": [
      "Define control structures and understand the need to alter program flow",
      "Differentiate between sequential, conditional (selection), and iterative control structures",
      "Understand the syntax, flowchart, and working of the if statement",
      "Understand the syntax, flowchart, and working of the if-else statement",
      "Implement multi-alternative decision making using if-else-if ladder",
      "Understand the syntax and working of the switch statement (case, break, default)",
      "Apply nested selection structures (nested if and nested if-else)",
      "Compare selection structures: if, if-else, nested if, and switch",
      "Implement C codes for conditional flowcharts from Unit 1"
    ],
    "sections": [
      {
        "sectionNum": "4.1",
        "title": "Control Statements & Selection Basics",
        "content": "4.1.1 Control Statements:\nControl structures are the basic entities of a structured programming language used to alter the normal sequential flow of execution. Programs require decision-making abilities to respond dynamically to varying inputs.\nTypes of Control Structures:\n1. Sequence Structure: Instructions execute sequentially, one after another, in the order they appear.\n2. Selection Structure: Selects a specific branch of code to execute based on whether a condition evaluates to true or false.\n3. Repetition (Loop) Structure: Repeats a block of code until a specified condition is met.\n\n4.1.2 Conditional / Selection Statements:\nSelection statements give a program the ability to check conditions and change execution behavior accordingly. C provides:\n• if statement\n• if-else statement\n• switch statement.",
        "keyPoints": [
          "Control structures control the flow of execution in a program.",
          "Three core control structures: Sequence, Selection, and Repetition.",
          "Selection structures evaluate conditions to decide which code block to execute."
        ]
      },
      {
        "sectionNum": "4.2",
        "title": "Selection Structures in C",
        "content": "4.2.1 The if Statement:\nThe simplest decision-making statement. It executes a block of statements only if the given relational/logical condition evaluates to true. If false, the block is skipped.\nSyntax:\nif (condition) {\n    // statements executed if condition is true\n}\n\n4.2.2 The if-else Statement:\nExecutes one block of statements when the condition is true, and an alternative block when the condition is false.\nSyntax:\nif (condition) {\n    // True block\n} else {\n    // False block\n}\n\n4.2.3 The if-else-if Ladder:\nUsed when multiple conditions need to be tested sequentially.\nSyntax:\nif (cond1) { ... } else if (cond2) { ... } else { ... }\n\n4.2.4 The switch Statement:\nA multi-branch selection statement that tests the value of an integer or character expression against a list of constant case values.\nSyntax:\nswitch (expression) {\n    case const1:\n        // statements\n        break;\n    case const2:\n        // statements\n        break;\n    default:\n        // default statements\n}\n• The break statement causes immediate exit from the switch block, preventing 'fall-through'.\n• The default block executes if no case value matches the expression.\n\n4.2.5 Nested Selection Structures:\nA selection statement enclosed entirely inside the body of another selection statement (e.g., an if statement placed inside another if statement). Used when a second decision depends on the outcome of a first decision.",
        "keyPoints": [
          "if executes code only if the condition evaluates to true.",
          "if-else provides mutually exclusive alternative execution paths.",
          "switch evaluates an integral expression against constant case labels.",
          "The break statement prevents fall-through in switch blocks."
        ]
      }
    ],
    "definitions": [
      {
        "term": "Control Structure",
        "def": "A programming construct that determines the order and path in which program statements are executed.",
        "definition": "A programming construct that determines the order and path in which program statements are executed."
      },
      {
        "term": "Selection Structure",
        "def": "A control structure that chooses between alternative execution paths based on the evaluation of a condition.",
        "definition": "A control structure that chooses between alternative execution paths based on the evaluation of a condition."
      },
      {
        "term": "if Statement",
        "def": "A conditional statement that executes a block of code only if the specified condition evaluates to true.",
        "definition": "A conditional statement that executes a block of code only if the specified condition evaluates to true."
      },
      {
        "term": "if-else Statement",
        "def": "A two-way decision statement that executes one block if the condition is true, and an alternate block if false.",
        "definition": "A two-way decision statement that executes one block if the condition is true, and an alternate block if false."
      },
      {
        "term": "switch Statement",
        "def": "A multi-way decision control structure that branches program execution based on matching an integer or character expression to constant case labels.",
        "definition": "A multi-way decision control structure that branches program execution based on matching an integer or character expression to constant case labels."
      },
      {
        "term": "break Statement",
        "def": "A jump statement used in switch blocks and loops that immediately terminates the structure and transfers control to the subsequent statement.",
        "definition": "A jump statement used in switch blocks and loops that immediately terminates the structure and transfers control to the subsequent statement."
      },
      {
        "term": "default Label",
        "def": "An optional clause in a switch statement executed when the switch expression matches none of the specified case labels.",
        "definition": "An optional clause in a switch statement executed when the switch expression matches none of the specified case labels."
      },
      {
        "term": "Nested if",
        "def": "An if statement placed inside the body of another if or if-else statement to handle multi-tiered conditional logic.",
        "definition": "An if statement placed inside the body of another if or if-else statement to handle multi-tiered conditional logic."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "Which programming statement makes a decision?",
          "options": [
            "if",
            "break",
            "Assignment",
            "printf()"
          ],
          "ans": 0,
          "explanation": "The if statement evaluates conditions and makes decisions in C."
        },
        {
          "q": "The conditional portion of if statement is enclosed within:",
          "options": [
            "{}",
            "()",
            "[]",
            "<>"
          ],
          "ans": 1,
          "explanation": "In C, conditions in if statements are enclosed in parentheses ()."
        },
        {
          "q": "Which of the following is NOT part of if statement?",
          "options": [
            "A condition that evaluates as a character",
            "A condition that evaluates as true or false",
            "A true block",
            "A false block"
          ],
          "ans": 0,
          "explanation": "Conditions in if statements evaluate strictly to truth values (non-zero true, zero false)."
        },
        {
          "q": "The case block in a switch statement typically ends with:",
          "options": [
            "}",
            ";",
            "break;",
            "default"
          ],
          "ans": 2,
          "explanation": "break; terminates each case block to avoid fall-through."
        },
        {
          "q": "What is the output of the following code?\nif((1==1)||(2==3))\n    printf(\"Good\");\nelse\n    printf(\"Bad\");",
          "options": [
            "Good",
            "Bad",
            "GoodBad",
            "No output"
          ],
          "ans": 0,
          "explanation": "Because (1==1) is true, the OR (||) expression is true, printing 'Good'."
        }
      ],
      "shortQuestions": [
        {
          "q": "Write a program in C to input three integers. Find out the largest among these integers using if-else structure and print it on the screen.",
          "ans": "#include <stdio.h>\nint main() {\n    int a, b, c, largest;\n    printf(\"Enter three integers: \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n    \n    if (a >= b && a >= c)\n        largest = a;\n    else if (b >= a && b >= c)\n        largest = b;\n    else\n        largest = c;\n        \n    printf(\"The largest integer is: %d\\n\", largest);\n    return 0;\n}"
        },
        {
          "q": "Write a program in C to input a single character and print a message 'It is a vowel' or 'It is a consonant'. Use if-else structure.",
          "ans": "#include <stdio.h>\nint main() {\n    char ch;\n    printf(\"Enter an alphabet: \");\n    scanf(\" %c\", &ch);\n    \n    if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||\n        ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U')\n        printf(\"It is a vowel\\n\");\n    else\n        printf(\"It is a consonant\\n\");\n        \n    return 0;\n}"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain the switch statement in detail with its syntax, flowchart, rules, and a programming example.",
          "ans": "The switch statement is a multi-way branch selection structure. It compares the value of an integer or character expression against fixed case constants.\n\nRules for switch Statement:\n1. The switch expression must evaluate to an integer or character type (float/double not allowed).\n2. Case labels must be unique integer/character constants followed by a colon (:).\n3. break; is used to exit the switch structure after matching a case.\n4. If break is omitted, execution falls through to subsequent cases.\n5. The default case is optional and executes if no case matches.\n\nExample (Calculator):\n#include <stdio.h>\nint main() {\n    char op;\n    float n1, n2;\n    printf(\"Enter operator (+, -, *, /): \");\n    scanf(\" %c\", &op);\n    printf(\"Enter two numbers: \");\n    scanf(\"%f %f\", &n1, &n2);\n    switch(op) {\n        case '+': printf(\"Result: %.2f\", n1 + n2); break;\n        case '-': printf(\"Result: %.2f\", n1 - n2); break;\n        case '*': printf(\"Result: %.2f\", n1 * n2); break;\n        case '/': printf(\"Result: %.2f\", n1 / n2); break;\n        default: printf(\"Invalid operator\");\n    }\n    return 0;\n}"
        },
        {
          "q": "Differentiate between if-else-if ladder and switch statement.",
          "ans": "1. Expression Types: if-else-if evaluates any relational or logical expression (including ranges and float values); switch only evaluates discrete integer or character constants.\n2. Flexibility: if-else-if can test multiple distinct variables; switch tests a single variable or expression.\n3. Speed: switch is often compiled into a jump table, making it faster than long if-else-if chains for many constant branches.\n4. Readability: switch provides cleaner, structured code for menu-driven programs."
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "What happens if the break statement is omitted in a switch case?",
          "opts": [
            "Syntax error",
            "Execution falls through to the next case",
            "Program terminates immediately",
            "Default case executes"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Which data type is NOT allowed in switch expressions?",
          "opts": [
            "int",
            "char",
            "float",
            "short"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "In C, a non-zero value in an if condition is evaluated as:",
          "opts": [
            "True",
            "False",
            "Null",
            "Syntax Error"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "A block of statements enclosed in curly braces { } is called a:",
          "opts": [
            "Simple statement",
            "Compound statement",
            "Control statement",
            "Null statement"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Which statement is used for two-way branching?",
          "opts": [
            "if",
            "if-else",
            "for",
            "while"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "The default block in a switch statement is:",
          "opts": [
            "Mandatory",
            "Optional",
            "Placed only at the start",
            "Illegal"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Can two cases in the same switch statement have identical constant values?",
          "opts": [
            "Yes",
            "No",
            "Only if separated by break",
            "Only with characters"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "An if statement placed inside another if statement is called:",
          "opts": [
            "Parallel if",
            "Nested if",
            "Double if",
            "Looping if"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "What will be the output of: if (0) printf(\"Yes\"); else printf(\"No\");?",
          "opts": [
            "Yes",
            "No",
            "YesNo",
            "Error"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Which operator is used to build compound conditions in if statements?",
          "opts": [
            "+",
            "&&",
            "=",
            "++"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "What is the role of the default case in a switch statement?",
          "key": "It executes when the switch expression matches none of the defined case constant values, handling unexpected or fallback inputs.",
          "marks": 4,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "What is a compound statement in C?",
          "key": "A sequence of two or more statements enclosed within a pair of curly braces { }, treated syntactically as a single statement by the compiler.",
          "marks": 4,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Explain fall-through in a switch statement.",
          "key": "Fall-through occurs when a case does not end with break;, causing execution to continue directly into the subsequent case regardless of its match condition.",
          "marks": 4,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Give an example of a nested if structure in C.",
          "key": "if (age >= 18) { if (hasLicense) printf('Can drive'); else printf('Cannot drive'); }",
          "marks": 4,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "How does C evaluate truth and falsity in relational conditions?",
          "key": "In C, numeric 0 represents False, and any non-zero numeric value (typically 1) represents True.",
          "marks": 4,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Discuss selection structures in C: explain if, if-else, if-else-if ladder, and nested if with syntax and flowcharts.",
          "marks": 8,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        },
        {
          "q": "Write a complete C program using a switch statement to display days of the week (1 = Monday to 7 = Sunday) with validation.",
          "marks": 8,
          "chapter": "Unit 4: Control Structure",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "if-else Syntax",
        "formula": "if (condition) {\n    /* True block */\n} else {\n    /* False block */\n}",
        "note": "Two-way conditional branching syntax."
      },
      {
        "name": "switch-case Syntax",
        "formula": "switch (expr) {\n    case CONST: stmt; break;\n    default: stmt;\n}",
        "note": "Multi-way constant branch dispatching syntax."
      }
    ],
    "numericals": [
      {
        "statement": "Trace the output of this code snippet:\nint x = 15;\nif (x > 20) printf(\"A\");\nelse if (x > 10) printf(\"B\");\nelse printf(\"C\");",
        "solution": "1. Condition (x > 20) -> (15 > 20) is False.\n2. Condition (x > 10) -> (15 > 10) is True.\n3. Output: B (the remainder of the ladder is skipped)."
      }
    ],
    "englishSummary": "Unit 4 covers selection and conditional control structures in C. It introduces decision-making, sequence vs selection vs repetition, and the if statement. It explores two-way branching via if-else, multi-alternative decision making via if-else-if ladders, and multi-way branching using switch-case structures (case, break, default). Nested selection structures and comparisons among selection mechanisms are detailed.",
    "urduSummary": "یونٹ 4 سی لینگویج میں کنٹرول سٹرکچرز اور انتخابی بیانات (Selection Statements) پر مشتمل ہے۔ اس میں تسلسلی (Sequential)، انتخابی (Selection)، اور تکراری (Repetition) کنٹرول سٹرکچرز کا موازنہ کیا گیا ہے۔ if سٹیٹمنٹ، if-else سٹیٹمنٹ، if-else-if سیڑھی، اور switch-case سٹرکچر (جس میں case، break، اور default شامل ہیں) کی مکمل تفصیل اور پروگرامنگ مثالیں دی گئی ہیں۔",
    "topics": [
      {
        "sectionNum": "4.1",
        "title": "Control Statements & Selection Basics",
        "content": "4.1.1 Control Statements:\nControl structures are the basic entities of a structured programming language used to alter the normal sequential flow of execution. Programs require decision-making abilities to respond dynamically to varying inputs.\nTypes of Control Structures:\n1. Sequence Structure: Instructions execute sequentially, one after another, in the order they appear.\n2. Selection Structure: Selects a specific branch of code to execute based on whether a condition evaluates to true or false.\n3. Repetition (Loop) Structure: Repeats a block of code until a specified condition is met.\n\n4.1.2 Conditional / Selection Statements:\nSelection statements give a program the ability to check conditions and change execution behavior accordingly. C provides:\n• if statement\n• if-else statement\n• switch statement.",
        "keyPoints": [
          "Control structures control the flow of execution in a program.",
          "Three core control structures: Sequence, Selection, and Repetition.",
          "Selection structures evaluate conditions to decide which code block to execute."
        ]
      },
      {
        "sectionNum": "4.2",
        "title": "Selection Structures in C",
        "content": "4.2.1 The if Statement:\nThe simplest decision-making statement. It executes a block of statements only if the given relational/logical condition evaluates to true. If false, the block is skipped.\nSyntax:\nif (condition) {\n    // statements executed if condition is true\n}\n\n4.2.2 The if-else Statement:\nExecutes one block of statements when the condition is true, and an alternative block when the condition is false.\nSyntax:\nif (condition) {\n    // True block\n} else {\n    // False block\n}\n\n4.2.3 The if-else-if Ladder:\nUsed when multiple conditions need to be tested sequentially.\nSyntax:\nif (cond1) { ... } else if (cond2) { ... } else { ... }\n\n4.2.4 The switch Statement:\nA multi-branch selection statement that tests the value of an integer or character expression against a list of constant case values.\nSyntax:\nswitch (expression) {\n    case const1:\n        // statements\n        break;\n    case const2:\n        // statements\n        break;\n    default:\n        // default statements\n}\n• The break statement causes immediate exit from the switch block, preventing 'fall-through'.\n• The default block executes if no case value matches the expression.\n\n4.2.5 Nested Selection Structures:\nA selection statement enclosed entirely inside the body of another selection statement (e.g., an if statement placed inside another if statement). Used when a second decision depends on the outcome of a first decision.",
        "keyPoints": [
          "if executes code only if the condition evaluates to true.",
          "if-else provides mutually exclusive alternative execution paths.",
          "switch evaluates an integral expression against constant case labels.",
          "The break statement prevents fall-through in switch blocks."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "Which programming statement makes a decision?",
          "options": [
            "if",
            "break",
            "Assignment",
            "printf()"
          ],
          "ans": 0,
          "explanation": "The if statement evaluates conditions and makes decisions in C."
        },
        {
          "q": "The conditional portion of if statement is enclosed within:",
          "options": [
            "{}",
            "()",
            "[]",
            "<>"
          ],
          "ans": 1,
          "explanation": "In C, conditions in if statements are enclosed in parentheses ()."
        },
        {
          "q": "Which of the following is NOT part of if statement?",
          "options": [
            "A condition that evaluates as a character",
            "A condition that evaluates as true or false",
            "A true block",
            "A false block"
          ],
          "ans": 0,
          "explanation": "Conditions in if statements evaluate strictly to truth values (non-zero true, zero false)."
        },
        {
          "q": "The case block in a switch statement typically ends with:",
          "options": [
            "}",
            ";",
            "break;",
            "default"
          ],
          "ans": 2,
          "explanation": "break; terminates each case block to avoid fall-through."
        },
        {
          "q": "What is the output of the following code?\nif((1==1)||(2==3))\n    printf(\"Good\");\nelse\n    printf(\"Bad\");",
          "options": [
            "Good",
            "Bad",
            "GoodBad",
            "No output"
          ],
          "ans": 0,
          "explanation": "Because (1==1) is true, the OR (||) expression is true, printing 'Good'."
        }
      ],
      "shortQuestions": [
        {
          "q": "Write a program in C to input three integers. Find out the largest among these integers using if-else structure and print it on the screen.",
          "ans": "#include <stdio.h>\nint main() {\n    int a, b, c, largest;\n    printf(\"Enter three integers: \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n    \n    if (a >= b && a >= c)\n        largest = a;\n    else if (b >= a && b >= c)\n        largest = b;\n    else\n        largest = c;\n        \n    printf(\"The largest integer is: %d\\n\", largest);\n    return 0;\n}"
        },
        {
          "q": "Write a program in C to input a single character and print a message 'It is a vowel' or 'It is a consonant'. Use if-else structure.",
          "ans": "#include <stdio.h>\nint main() {\n    char ch;\n    printf(\"Enter an alphabet: \");\n    scanf(\" %c\", &ch);\n    \n    if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u'||\n        ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U')\n        printf(\"It is a vowel\\n\");\n    else\n        printf(\"It is a consonant\\n\");\n        \n    return 0;\n}"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain the switch statement in detail with its syntax, flowchart, rules, and a programming example.",
          "ans": "The switch statement is a multi-way branch selection structure. It compares the value of an integer or character expression against fixed case constants.\n\nRules for switch Statement:\n1. The switch expression must evaluate to an integer or character type (float/double not allowed).\n2. Case labels must be unique integer/character constants followed by a colon (:).\n3. break; is used to exit the switch structure after matching a case.\n4. If break is omitted, execution falls through to subsequent cases.\n5. The default case is optional and executes if no case matches.\n\nExample (Calculator):\n#include <stdio.h>\nint main() {\n    char op;\n    float n1, n2;\n    printf(\"Enter operator (+, -, *, /): \");\n    scanf(\" %c\", &op);\n    printf(\"Enter two numbers: \");\n    scanf(\"%f %f\", &n1, &n2);\n    switch(op) {\n        case '+': printf(\"Result: %.2f\", n1 + n2); break;\n        case '-': printf(\"Result: %.2f\", n1 - n2); break;\n        case '*': printf(\"Result: %.2f\", n1 * n2); break;\n        case '/': printf(\"Result: %.2f\", n1 / n2); break;\n        default: printf(\"Invalid operator\");\n    }\n    return 0;\n}"
        },
        {
          "q": "Differentiate between if-else-if ladder and switch statement.",
          "ans": "1. Expression Types: if-else-if evaluates any relational or logical expression (including ranges and float values); switch only evaluates discrete integer or character constants.\n2. Flexibility: if-else-if can test multiple distinct variables; switch tests a single variable or expression.\n3. Speed: switch is often compiled into a jump table, making it faster than long if-else-if chains for many constant branches.\n4. Readability: switch provides cleaner, structured code for menu-driven programs."
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "What happens if the break statement is omitted in a switch case?",
        "opts": [
          "Syntax error",
          "Execution falls through to the next case",
          "Program terminates immediately",
          "Default case executes"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Which data type is NOT allowed in switch expressions?",
        "opts": [
          "int",
          "char",
          "float",
          "short"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "In C, a non-zero value in an if condition is evaluated as:",
        "opts": [
          "True",
          "False",
          "Null",
          "Syntax Error"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "A block of statements enclosed in curly braces { } is called a:",
        "opts": [
          "Simple statement",
          "Compound statement",
          "Control statement",
          "Null statement"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Which statement is used for two-way branching?",
        "opts": [
          "if",
          "if-else",
          "for",
          "while"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "The default block in a switch statement is:",
        "opts": [
          "Mandatory",
          "Optional",
          "Placed only at the start",
          "Illegal"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Can two cases in the same switch statement have identical constant values?",
        "opts": [
          "Yes",
          "No",
          "Only if separated by break",
          "Only with characters"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "An if statement placed inside another if statement is called:",
        "opts": [
          "Parallel if",
          "Nested if",
          "Double if",
          "Looping if"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "What will be the output of: if (0) printf(\"Yes\"); else printf(\"No\");?",
        "opts": [
          "Yes",
          "No",
          "YesNo",
          "Error"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Which operator is used to build compound conditions in if statements?",
        "opts": [
          "+",
          "&&",
          "=",
          "++"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "What is the role of the default case in a switch statement?",
        "key": "It executes when the switch expression matches none of the defined case constant values, handling unexpected or fallback inputs.",
        "marks": 4,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "What is a compound statement in C?",
        "key": "A sequence of two or more statements enclosed within a pair of curly braces { }, treated syntactically as a single statement by the compiler.",
        "marks": 4,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Explain fall-through in a switch statement.",
        "key": "Fall-through occurs when a case does not end with break;, causing execution to continue directly into the subsequent case regardless of its match condition.",
        "marks": 4,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Give an example of a nested if structure in C.",
        "key": "if (age >= 18) { if (hasLicense) printf('Can drive'); else printf('Cannot drive'); }",
        "marks": 4,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "How does C evaluate truth and falsity in relational conditions?",
        "key": "In C, numeric 0 represents False, and any non-zero numeric value (typically 1) represents True.",
        "marks": 4,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Discuss selection structures in C: explain if, if-else, if-else-if ladder, and nested if with syntax and flowcharts.",
        "marks": 8,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      },
      {
        "q": "Write a complete C program using a switch statement to display days of the week (1 = Monday to 7 = Sunday) with validation.",
        "marks": 8,
        "chapter": "Unit 4: Control Structure",
        "source": "slo"
      }
    ]
  },
  {
    "num": 5,
    "id": "cls9-comp-ch05",
    "name": "Loop Structure",
    "nameUr": "لوپ سٹرکچر (تکراری ساخت)",
    "pageRange": "Pages 116 – 137",
    "status": "done",
    "slos": [
      "Explain the concept and necessity of loop structures in programming",
      "Understand the structure, syntax, and working of the for loop",
      "Understand the structure, syntax, and working of the while loop (pre-test)",
      "Understand the structure, syntax, and working of the do-while loop (post-test)",
      "Differentiate between while and do-while loops with practical examples",
      "Use loop jump statements: break (exit loop) and continue (skip to next iteration)",
      "Implement nested loops (a loop placed inside another loop)",
      "Compare the suitability of different loop structures for various scenarios",
      "Write C codes for looping flowcharts from Unit 1"
    ],
    "sections": [
      {
        "sectionNum": "5.1",
        "title": "Introduction to Loop Structures",
        "content": "5.1.1 Concept of Loops:\nA loop is a sequence of instructions that is continually repeated until a specific terminating condition is reached. Loops automate repetitive tasks, dramatically reduce code size, save execution time, and eliminate human error.\nTypes of Loops in C:\n1. for loop (Counter-controlled loop)\n2. while loop (Pre-test / Condition-controlled loop)\n3. do-while loop (Post-test / Exit-controlled loop).",
        "keyPoints": [
          "A loop repeats a block of instructions while a condition is true.",
          "Three loop types in C: for, while, and do-while.",
          "Loops are essential for processing collections, repeated calculations, and counter tracking."
        ]
      },
      {
        "sectionNum": "5.2",
        "title": "The for, while, and do-while Loops",
        "content": "5.2.1 The for Loop:\nA counter-controlled loop ideal when the number of iterations is known in advance.\nSyntax:\nfor (initialization; condition; increment/decrement) {\n    // body of loop\n}\nWorking:\n1. Initialization executes once at the start.\n2. Condition is tested. If true, body executes; if false, loop terminates.\n3. Increment/Decrement updates the counter variable, then condition is re-tested.\n\n5.2.2 The while Loop:\nA pre-test loop that evaluates the condition before executing the loop body. If the condition is false initially, the body does not execute even once.\nSyntax:\nwhile (condition) {\n    // body of loop\n    // update counter\n}\n\n5.2.3 The do-while Loop:\nA post-test loop that evaluates the condition after executing the loop body. The body is guaranteed to execute at least once regardless of whether the condition is true or false initially.\nSyntax:\ndo {\n    // body of loop\n    // update counter\n} while (condition);\n(Note the mandatory terminating semicolon).\n\n5.2.4 The break and continue Statements:\n• break: Immediately terminates the loop and passes control to the statement after the loop.\n• continue: Skips the remaining statements in the current iteration and jumps directly to the loop's next iteration test.\n\n5.2.5 Nested Loops:\nA loop placed inside the body of another loop. For each single iteration of the outer loop, the inner loop executes completely through all its iterations.",
        "keyPoints": [
          "for loop is ideal when iteration count is known in advance.",
          "while tests condition at entry; do-while tests condition at exit.",
          "do-while executes at least once even if the condition is false.",
          "break exits loop; continue skips remaining code in current iteration."
        ]
      }
    ],
    "definitions": [
      {
        "term": "Loop",
        "def": "A control structure that continually repeats execution of a block of statements until a terminating condition is met.",
        "definition": "A control structure that continually repeats execution of a block of statements until a terminating condition is met."
      },
      {
        "term": "for Loop",
        "def": "A counter-controlled loop that incorporates initialization, condition testing, and iteration updates in a single statement header.",
        "definition": "A counter-controlled loop that incorporates initialization, condition testing, and iteration updates in a single statement header."
      },
      {
        "term": "while Loop",
        "def": "A pre-test iterative structure that checks the loop continuation condition before each execution of its body.",
        "definition": "A pre-test iterative structure that checks the loop continuation condition before each execution of its body."
      },
      {
        "term": "do-while Loop",
        "def": "A post-test iterative structure that tests the condition at the end of the loop body, guaranteeing at least one execution.",
        "definition": "A post-test iterative structure that tests the condition at the end of the loop body, guaranteeing at least one execution."
      },
      {
        "term": "Counter Variable",
        "def": "A variable used in a loop to track and control the number of completed iterations.",
        "definition": "A variable used in a loop to track and control the number of completed iterations."
      },
      {
        "term": "Infinite Loop",
        "def": "A loop whose terminating condition is never reached or never evaluates to false, causing indefinite execution.",
        "definition": "A loop whose terminating condition is never reached or never evaluates to false, causing indefinite execution."
      },
      {
        "term": "continue Statement",
        "def": "A jump statement that skips the remainder of the current loop iteration and proceeds immediately to the next cycle.",
        "definition": "A jump statement that skips the remainder of the current loop iteration and proceeds immediately to the next cycle."
      },
      {
        "term": "Nested Loop",
        "def": "A programming arrangement where one loop is placed entirely inside the body of another loop.",
        "definition": "A programming arrangement where one loop is placed entirely inside the body of another loop."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "How many types of loop structures are available in C?",
          "options": [
            "4",
            "3",
            "2",
            "6"
          ],
          "ans": 1,
          "explanation": "C provides three loop structures: for, while, and do-while."
        },
        {
          "q": "Which loop structure always executes at least once?",
          "options": [
            "do-while",
            "for",
            "while",
            "nested"
          ],
          "ans": 0,
          "explanation": "do-while evaluates its condition at the end, guaranteeing at least one execution."
        },
        {
          "q": "In which loop the condition comes before the body of the loop?",
          "options": [
            "while loop",
            "do-while loop",
            "for loop",
            "a and c both"
          ],
          "ans": 3,
          "explanation": "Both while and for loops are pre-test loops testing condition before body."
        },
        {
          "q": "In which loop the condition comes after the body of the loop?",
          "options": [
            "for",
            "while",
            "do-while",
            "None"
          ],
          "ans": 2,
          "explanation": "do-while tests its condition at the end of the body."
        },
        {
          "q": "Which of the following statement is used in the body of loop to exit from the loop?",
          "options": [
            "break",
            "terminate",
            "exit",
            "Both a and b"
          ],
          "ans": 0,
          "explanation": "The break statement terminates and exits the loop immediately."
        },
        {
          "q": "A loop within another loop is called:",
          "options": [
            "counter loop",
            "complex loop",
            "outer loop",
            "nested loop"
          ],
          "ans": 3,
          "explanation": "A loop placed inside another loop is known as a nested loop."
        },
        {
          "q": "Which statement is used to move the control to the start of loop body for the next iteration?",
          "options": [
            "continue",
            "break",
            "while",
            "for"
          ],
          "ans": 0,
          "explanation": "The continue statement bypasses remaining statements and begins next iteration."
        },
        {
          "q": "Which of the following loop is a good choice when the number of iterations are known in advance?",
          "options": [
            "do-while",
            "for",
            "while",
            "nested"
          ],
          "ans": 1,
          "explanation": "The for loop is designed specifically for known counter-controlled iterations."
        }
      ],
      "shortQuestions": [
        {
          "q": "Differentiate between the do-while and while loops. Explain with program examples.",
          "ans": "while Loop:\n• Pre-test loop: tests condition before body executes.\n• If condition is false initially, body executes 0 times.\n• Syntax: while (cond) { ... }\n\ndo-while Loop:\n• Post-test loop: tests condition after body executes.\n• Body executes at least 1 time even if condition is false.\n• Syntax: do { ... } while (cond);"
        },
        {
          "q": "Write a program in C to calculate and print the product of even numbers from 1 to 100 by using while loop.",
          "ans": "#include <stdio.h>\nint main() {\n    int i = 2;\n    double product = 1.0;\n    while (i <= 100) {\n        product *= i;\n        i += 2;\n    }\n    printf(\"Product of even numbers from 1 to 100 = %.2e\\n\", product);\n    return 0;\n}"
        },
        {
          "q": "Write a program to display alphabets from A to Z using for loop.",
          "ans": "#include <stdio.h>\nint main() {\n    char ch;\n    printf(\"Alphabets from A to Z:\\n\");\n    for (ch = 'A'; ch <= 'Z'; ch++) {\n        printf(\"%c \", ch);\n    }\n    printf(\"\\n\");\n    return 0;\n}"
        },
        {
          "q": "Write a program in C to print the sum of odd numbers from 1 to 50 using for loop.",
          "ans": "#include <stdio.h>\nint main() {\n    int i, sum = 0;\n    for (i = 1; i <= 50; i += 2) {\n        sum += i;\n    }\n    printf(\"Sum of odd numbers from 1 to 50 = %d\\n\", sum);\n    return 0;\n}"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain different types of looping structures in C with their syntax, working, and flowcharts.",
          "ans": "C provides three looping structures:\n\n1. for Loop:\nCounter-controlled. Combines initialization, test condition, and step update in a single compact line.\nIdeal when iterations are fixed.\nSyntax: for (i=1; i<=N; i++) { ... }\n\n2. while Loop:\nCondition-controlled. Checks condition prior to loop body. Body executes 0 or more times.\nIdeal when number of repetitions is indeterminate.\nSyntax: while (condition) { ... }\n\n3. do-while Loop:\nExit-controlled. Body executes first, then condition is evaluated. Always runs >= 1 time.\nIdeal for interactive menu loops where menu must display before prompting user.\nSyntax: do { ... } while (condition);"
        },
        {
          "q": "Write a program in C to display a right-angled triangle pattern of asterisks using nested for loops.",
          "ans": "#include <stdio.h>\nint main() {\n    int i, j;\n    for (i = 1; i <= 5; i++) {\n        for (j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "How many times will: for(i=1; i<=10; i++) execute?",
          "opts": [
            "9",
            "10",
            "11",
            "Infinite"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "What is the minimum number of times a while loop can execute?",
          "opts": [
            "0",
            "1",
            "2",
            "Infinite"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "What is the minimum number of times a do-while loop can execute?",
          "opts": [
            "0",
            "1",
            "2",
            "Infinite"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "Which loop statement must end with a semicolon?",
          "opts": [
            "for",
            "while",
            "do-while",
            "nested for"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "The continue statement in a for loop transfers control to the:",
          "opts": [
            "Loop exit",
            "Next statement",
            "Update / increment expression",
            "Initialization"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "If the loop condition is initially false in a while loop, the body executes:",
          "opts": [
            "Once",
            "Never",
            "Twice",
            "Continuously"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "What happens in: for( ; ; ) ?",
          "opts": [
            "Syntax error",
            "Executes once",
            "Infinite loop",
            "Does not execute"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "In a nested loop with outer loop running 3 times and inner 4 times, inner body runs:",
          "opts": [
            "7 times",
            "12 times",
            "4 times",
            "3 times"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "Which part of a for loop executes only once?",
          "opts": [
            "Condition",
            "Initialization",
            "Increment",
            "Body"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "What is the value of i after: for(i=0; i<5; i++); ?",
          "opts": [
            "4",
            "5",
            "0",
            "6"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "What causes an infinite loop and how can it be avoided?",
          "key": "An infinite loop occurs when the loop condition never evaluates to false (e.g. failing to update the counter). It is avoided by ensuring loop variables are properly modified inside the body.",
          "marks": 4,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "Compare the break and continue statements in C.",
          "key": "break terminates the loop completely and moves to statements outside. continue skips only the remaining statements of the current iteration and jumps to the next cycle.",
          "marks": 4,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "What is meant by counter-controlled repetition?",
          "key": "Repetition where a counter variable is initialized, incremented/decremented, and tested against a boundary value to perform a precise number of loop iterations.",
          "marks": 4,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "Write syntax of do-while loop.",
          "key": "do { /* statements */ } while (condition);",
          "marks": 4,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "How does a nested loop function in C?",
          "key": "For every single iteration of the outer loop, the inner loop executes through all of its iterations from start to finish.",
          "marks": 4,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain the differences between while and do-while loops in detail with syntax, operation, and complete programming examples.",
          "marks": 8,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        },
        {
          "q": "Write a C program to input a positive integer N and calculate its factorial using a while loop.",
          "marks": 8,
          "chapter": "Unit 5: Loop Structure",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "for Loop Syntax",
        "formula": "for (init; cond; step) {\n    /* Body */\n}",
        "note": "Counter-controlled iteration header format."
      },
      {
        "name": "while Loop Syntax",
        "formula": "while (condition) {\n    /* Body */\n}",
        "note": "Pre-test entry-controlled iteration structure."
      },
      {
        "name": "do-while Loop Syntax",
        "formula": "do {\n    /* Body */\n} while (condition);",
        "note": "Post-test exit-controlled iteration structure (requires semicolon)."
      }
    ],
    "numericals": [
      {
        "statement": "Trace the iterations of the following code and write its final output:\nint sum = 0, i;\nfor (i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    sum += i;\n}\nprintf(\"Sum = %d\", sum);",
        "solution": "i=1: sum = 0 + 1 = 1\ni=2: sum = 1 + 2 = 3\ni=3: i==3 is True -> continue skips sum += i\ni=4: sum = 3 + 4 = 7\ni=5: sum = 7 + 5 = 12\nLoop terminates. Output: Sum = 12"
      }
    ],
    "englishSummary": "Unit 5 explores repetition and loop structures in C programming. It covers the concept and benefits of loops, detailing for loops (counter-controlled), while loops (pre-test), and do-while loops (post-test). Loop jump controls (break and continue) and nested loops are explained alongside real-world code implementations and comparisons.",
    "urduSummary": "یونٹ 5 تکراری ساختوں (لوپس) کا احاطہ کرتا ہے۔ اس میں لوپس کی ضرورت اور اہمیت، for لوپ، while لوپ، اور do-while لوپ کی ساخت اور طریقہ کار بیان کیا گیا ہے۔ اس کے علاوہ break اور continue سٹیٹمنٹس کا موازنہ، نیسٹڈ لوپس (Nested Loops)، اور مختلف حسابی پروگراموں کے ذریعے لوپس کی تفصیلی وضاحت کی گئی ہے۔",
    "topics": [
      {
        "sectionNum": "5.1",
        "title": "Introduction to Loop Structures",
        "content": "5.1.1 Concept of Loops:\nA loop is a sequence of instructions that is continually repeated until a specific terminating condition is reached. Loops automate repetitive tasks, dramatically reduce code size, save execution time, and eliminate human error.\nTypes of Loops in C:\n1. for loop (Counter-controlled loop)\n2. while loop (Pre-test / Condition-controlled loop)\n3. do-while loop (Post-test / Exit-controlled loop).",
        "keyPoints": [
          "A loop repeats a block of instructions while a condition is true.",
          "Three loop types in C: for, while, and do-while.",
          "Loops are essential for processing collections, repeated calculations, and counter tracking."
        ]
      },
      {
        "sectionNum": "5.2",
        "title": "The for, while, and do-while Loops",
        "content": "5.2.1 The for Loop:\nA counter-controlled loop ideal when the number of iterations is known in advance.\nSyntax:\nfor (initialization; condition; increment/decrement) {\n    // body of loop\n}\nWorking:\n1. Initialization executes once at the start.\n2. Condition is tested. If true, body executes; if false, loop terminates.\n3. Increment/Decrement updates the counter variable, then condition is re-tested.\n\n5.2.2 The while Loop:\nA pre-test loop that evaluates the condition before executing the loop body. If the condition is false initially, the body does not execute even once.\nSyntax:\nwhile (condition) {\n    // body of loop\n    // update counter\n}\n\n5.2.3 The do-while Loop:\nA post-test loop that evaluates the condition after executing the loop body. The body is guaranteed to execute at least once regardless of whether the condition is true or false initially.\nSyntax:\ndo {\n    // body of loop\n    // update counter\n} while (condition);\n(Note the mandatory terminating semicolon).\n\n5.2.4 The break and continue Statements:\n• break: Immediately terminates the loop and passes control to the statement after the loop.\n• continue: Skips the remaining statements in the current iteration and jumps directly to the loop's next iteration test.\n\n5.2.5 Nested Loops:\nA loop placed inside the body of another loop. For each single iteration of the outer loop, the inner loop executes completely through all its iterations.",
        "keyPoints": [
          "for loop is ideal when iteration count is known in advance.",
          "while tests condition at entry; do-while tests condition at exit.",
          "do-while executes at least once even if the condition is false.",
          "break exits loop; continue skips remaining code in current iteration."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "How many types of loop structures are available in C?",
          "options": [
            "4",
            "3",
            "2",
            "6"
          ],
          "ans": 1,
          "explanation": "C provides three loop structures: for, while, and do-while."
        },
        {
          "q": "Which loop structure always executes at least once?",
          "options": [
            "do-while",
            "for",
            "while",
            "nested"
          ],
          "ans": 0,
          "explanation": "do-while evaluates its condition at the end, guaranteeing at least one execution."
        },
        {
          "q": "In which loop the condition comes before the body of the loop?",
          "options": [
            "while loop",
            "do-while loop",
            "for loop",
            "a and c both"
          ],
          "ans": 3,
          "explanation": "Both while and for loops are pre-test loops testing condition before body."
        },
        {
          "q": "In which loop the condition comes after the body of the loop?",
          "options": [
            "for",
            "while",
            "do-while",
            "None"
          ],
          "ans": 2,
          "explanation": "do-while tests its condition at the end of the body."
        },
        {
          "q": "Which of the following statement is used in the body of loop to exit from the loop?",
          "options": [
            "break",
            "terminate",
            "exit",
            "Both a and b"
          ],
          "ans": 0,
          "explanation": "The break statement terminates and exits the loop immediately."
        },
        {
          "q": "A loop within another loop is called:",
          "options": [
            "counter loop",
            "complex loop",
            "outer loop",
            "nested loop"
          ],
          "ans": 3,
          "explanation": "A loop placed inside another loop is known as a nested loop."
        },
        {
          "q": "Which statement is used to move the control to the start of loop body for the next iteration?",
          "options": [
            "continue",
            "break",
            "while",
            "for"
          ],
          "ans": 0,
          "explanation": "The continue statement bypasses remaining statements and begins next iteration."
        },
        {
          "q": "Which of the following loop is a good choice when the number of iterations are known in advance?",
          "options": [
            "do-while",
            "for",
            "while",
            "nested"
          ],
          "ans": 1,
          "explanation": "The for loop is designed specifically for known counter-controlled iterations."
        }
      ],
      "shortQuestions": [
        {
          "q": "Differentiate between the do-while and while loops. Explain with program examples.",
          "ans": "while Loop:\n• Pre-test loop: tests condition before body executes.\n• If condition is false initially, body executes 0 times.\n• Syntax: while (cond) { ... }\n\ndo-while Loop:\n• Post-test loop: tests condition after body executes.\n• Body executes at least 1 time even if condition is false.\n• Syntax: do { ... } while (cond);"
        },
        {
          "q": "Write a program in C to calculate and print the product of even numbers from 1 to 100 by using while loop.",
          "ans": "#include <stdio.h>\nint main() {\n    int i = 2;\n    double product = 1.0;\n    while (i <= 100) {\n        product *= i;\n        i += 2;\n    }\n    printf(\"Product of even numbers from 1 to 100 = %.2e\\n\", product);\n    return 0;\n}"
        },
        {
          "q": "Write a program to display alphabets from A to Z using for loop.",
          "ans": "#include <stdio.h>\nint main() {\n    char ch;\n    printf(\"Alphabets from A to Z:\\n\");\n    for (ch = 'A'; ch <= 'Z'; ch++) {\n        printf(\"%c \", ch);\n    }\n    printf(\"\\n\");\n    return 0;\n}"
        },
        {
          "q": "Write a program in C to print the sum of odd numbers from 1 to 50 using for loop.",
          "ans": "#include <stdio.h>\nint main() {\n    int i, sum = 0;\n    for (i = 1; i <= 50; i += 2) {\n        sum += i;\n    }\n    printf(\"Sum of odd numbers from 1 to 50 = %d\\n\", sum);\n    return 0;\n}"
        }
      ],
      "longQuestions": [
        {
          "q": "Explain different types of looping structures in C with their syntax, working, and flowcharts.",
          "ans": "C provides three looping structures:\n\n1. for Loop:\nCounter-controlled. Combines initialization, test condition, and step update in a single compact line.\nIdeal when iterations are fixed.\nSyntax: for (i=1; i<=N; i++) { ... }\n\n2. while Loop:\nCondition-controlled. Checks condition prior to loop body. Body executes 0 or more times.\nIdeal when number of repetitions is indeterminate.\nSyntax: while (condition) { ... }\n\n3. do-while Loop:\nExit-controlled. Body executes first, then condition is evaluated. Always runs >= 1 time.\nIdeal for interactive menu loops where menu must display before prompting user.\nSyntax: do { ... } while (condition);"
        },
        {
          "q": "Write a program in C to display a right-angled triangle pattern of asterisks using nested for loops.",
          "ans": "#include <stdio.h>\nint main() {\n    int i, j;\n    for (i = 1; i <= 5; i++) {\n        for (j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}"
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "How many times will: for(i=1; i<=10; i++) execute?",
        "opts": [
          "9",
          "10",
          "11",
          "Infinite"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "What is the minimum number of times a while loop can execute?",
        "opts": [
          "0",
          "1",
          "2",
          "Infinite"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "What is the minimum number of times a do-while loop can execute?",
        "opts": [
          "0",
          "1",
          "2",
          "Infinite"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "Which loop statement must end with a semicolon?",
        "opts": [
          "for",
          "while",
          "do-while",
          "nested for"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "The continue statement in a for loop transfers control to the:",
        "opts": [
          "Loop exit",
          "Next statement",
          "Update / increment expression",
          "Initialization"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "If the loop condition is initially false in a while loop, the body executes:",
        "opts": [
          "Once",
          "Never",
          "Twice",
          "Continuously"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "What happens in: for( ; ; ) ?",
        "opts": [
          "Syntax error",
          "Executes once",
          "Infinite loop",
          "Does not execute"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "In a nested loop with outer loop running 3 times and inner 4 times, inner body runs:",
        "opts": [
          "7 times",
          "12 times",
          "4 times",
          "3 times"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "Which part of a for loop executes only once?",
        "opts": [
          "Condition",
          "Initialization",
          "Increment",
          "Body"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "What is the value of i after: for(i=0; i<5; i++); ?",
        "opts": [
          "4",
          "5",
          "0",
          "6"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "What causes an infinite loop and how can it be avoided?",
        "key": "An infinite loop occurs when the loop condition never evaluates to false (e.g. failing to update the counter). It is avoided by ensuring loop variables are properly modified inside the body.",
        "marks": 4,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "Compare the break and continue statements in C.",
        "key": "break terminates the loop completely and moves to statements outside. continue skips only the remaining statements of the current iteration and jumps to the next cycle.",
        "marks": 4,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "What is meant by counter-controlled repetition?",
        "key": "Repetition where a counter variable is initialized, incremented/decremented, and tested against a boundary value to perform a precise number of loop iterations.",
        "marks": 4,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "Write syntax of do-while loop.",
        "key": "do { /* statements */ } while (condition);",
        "marks": 4,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "How does a nested loop function in C?",
        "key": "For every single iteration of the outer loop, the inner loop executes through all of its iterations from start to finish.",
        "marks": 4,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Explain the differences between while and do-while loops in detail with syntax, operation, and complete programming examples.",
        "marks": 8,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      },
      {
        "q": "Write a C program to input a positive integer N and calculate its factorial using a while loop.",
        "marks": 8,
        "chapter": "Unit 5: Loop Structure",
        "source": "slo"
      }
    ]
  },
  {
    "num": 6,
    "id": "cls9-comp-ch06",
    "name": "Computer Logic and Gates",
    "nameUr": "کمپیوٹر لاجک اور گیٹس",
    "pageRange": "Pages 138 – 166",
    "status": "done",
    "slos": [
      "Explain representation of data in computer (binary digits 0 and 1, logic levels, voltages)",
      "Define digital logic, Boolean algebra, and logic gates",
      "Understand Basic Logic Gates: AND, OR, and NOT (symbols, Boolean expressions, truth tables)",
      "Explain Truth Tables and construct truth tables for multi-input gates",
      "Understand Derived and Universal Gates: NAND, NOR, XOR, and XNOR",
      "Explain why NAND and NOR gates are called Universal Gates",
      "Convert Boolean expressions into digital logic circuits and vice versa",
      "Understand Karnaugh Maps (K-Maps) as a graphical minimization tool",
      "Perform simplification of 2-variable Boolean functions using K-Map grouping rules",
      "Perform simplification of 3-variable Boolean functions using K-Map grouping rules",
      "Construct minimized logic circuits from simplified Boolean expressions"
    ],
    "sections": [
      {
        "sectionNum": "6.1",
        "title": "Data Representation in Computer",
        "content": "6.1.1 Data Representation in a Computer:\nDigital computers store and manipulate all forms of data (numbers, text, sound, graphics) in binary form using binary digits (bits): 0 and 1.\n• Low voltage level (0 to 0.8V) represents Binary 0 (False / OFF / Low).\n• High voltage level (2 to 5V) represents Binary 1 (True / ON / High).\n\nUnits of Data Measurement:\n• Bit: Smallest unit of data (0 or 1).\n• Nibble: Group of 4 bits.\n• Byte: Group of 8 bits (stores a single ASCII character).\n• Kilobyte (KB) = 1024 Bytes, Megabyte (MB) = 1024 KB, Gigabyte (GB) = 1024 MB.",
        "keyPoints": [
          "All computer data is represented in binary format (0s and 1s).",
          "Binary 0 represents Low/False; Binary 1 represents High/True.",
          "1 Byte = 8 Bits; 1 Nibble = 4 Bits."
        ]
      },
      {
        "sectionNum": "6.2",
        "title": "Digital Logic & Logic Gates",
        "content": "6.2.1 Digital Logic and Logic Gates:\nA logic gate is an electronic circuit that operates on one or more input electrical signals to produce a single output signal based on Boolean logic.\n\n6.2.2 Basic Logic Gates:\n1. AND Gate:\n• Performs logical multiplication (conjunction).\n• Expression: Y = A . B\n• Rule: Output is 1 only when ALL inputs are 1; otherwise output is 0.\n\n2. OR Gate:\n• Performs logical addition (disjunction).\n• Expression: Y = A + B\n• Rule: Output is 1 if AT LEAST ONE input is 1; output is 0 only when all inputs are 0.\n\n3. NOT Gate (Inverter):\n• Performs logical negation or complementation.\n• Has only ONE input and ONE output.\n• Expression: Y = A' (or A with a bar over it)\n• Rule: Reverses input (0 becomes 1; 1 becomes 0).\n\n6.2.3 Derived and Universal Gates:\n1. NAND Gate:\n• Combination of AND followed by NOT (NOT-AND).\n• Expression: Y = (A . B)'\n• Rule: Output is 0 only when all inputs are 1; otherwise 1.\n• Universal gate: any digital circuit can be built exclusively using NAND gates.\n\n2. NOR Gate:\n• Combination of OR followed by NOT (NOT-OR).\n• Expression: Y = (A + B)'\n• Rule: Output is 1 only when all inputs are 0; otherwise 0.\n• Universal gate: can implement any logic function without other gate types.\n\n3. Exclusive-OR (XOR) Gate:\n• Expression: Y = A (+) B = A'.B + A.B'\n• Rule: Output is 1 when inputs are DIFFERENT (odd parity); 0 when inputs are the same.\n\n4. Exclusive-NOR (XNOR) Gate:\n• Expression: Y = (A (+) B)' = A.B + A'.B'\n• Rule: Output is 1 when inputs are IDENTICAL; 0 when inputs are different.",
        "keyPoints": [
          "Basic gates: AND, OR, NOT.",
          "Universal gates: NAND and NOR (can implement any Boolean function).",
          "XOR outputs 1 for differing inputs; XNOR outputs 1 for identical inputs."
        ]
      },
      {
        "sectionNum": "6.3",
        "title": "Karnaugh Map (K-Map) Simplification",
        "content": "6.3.1 Karnaugh Map (K-Map):\nA Karnaugh map is a pictorial / diagrammatic method of representing and simplifying Boolean expressions without relying on complex algebraic theorems.\nIt arranges truth table minterms into a grid of cells where adjacent cells differ by only a single bit (Gray code).\n\n6.3.2 Two-Variable K-Map:\n• Consists of 2^2 = 4 cells for variables A and B.\n• Cell layout: Rows represent A (0, 1), Columns represent B (0, 1).\n\n6.3.3 Three-Variable K-Map:\n• Consists of 2^3 = 8 cells for variables A, B, and C.\n• Row: A (0, 1); Columns: BC (00, 01, 11, 10) - Note Gray code ordering.\n\n6.3.4 Grouping Rules in K-Maps:\n1. Groups must contain 2^n ones (1, 2, 4, 8, 16 cells): Single, Pair (2), Quad (4), Octet (8).\n2. Groups must be rectangular or square (no diagonal groups).\n3. Groups can overlap to maximize group size.\n4. Groups can wrap around edges and corners (torus topology).\n5. Each group should be as large as possible to eliminate more variables.",
        "keyPoints": [
          "K-Map is a graphical tool for minimizing Boolean logic expressions.",
          "2-variable K-map has 4 cells; 3-variable K-map has 8 cells.",
          "Group sizes must be powers of 2 (1, 2, 4, 8); larger groups eliminate more literals."
        ]
      }
    ],
    "definitions": [
      {
        "term": "Logic Gate",
        "def": "An electronic circuit that takes one or more binary input signals and produces a single binary output signal based on logical rules.",
        "definition": "An electronic circuit that takes one or more binary input signals and produces a single binary output signal based on logical rules."
      },
      {
        "term": "Truth Table",
        "def": "A mathematical table detailing all possible combinations of digital input states alongside their corresponding output states.",
        "definition": "A mathematical table detailing all possible combinations of digital input states alongside their corresponding output states."
      },
      {
        "term": "AND Gate",
        "def": "A digital logic gate performing logical multiplication, producing a high output (1) only when all its inputs are high (1).",
        "definition": "A digital logic gate performing logical multiplication, producing a high output (1) only when all its inputs are high (1)."
      },
      {
        "term": "OR Gate",
        "def": "A digital logic gate performing logical addition, producing a high output (1) if at least one of its inputs is high (1).",
        "definition": "A digital logic gate performing logical addition, producing a high output (1) if at least one of its inputs is high (1)."
      },
      {
        "term": "NOT Gate",
        "def": "A digital logic gate (inverter) with a single input that produces the logical complement (inverse) of its input signal.",
        "definition": "A digital logic gate (inverter) with a single input that produces the logical complement (inverse) of its input signal."
      },
      {
        "term": "NAND Gate",
        "def": "A universal logic gate composed of an AND gate followed by a NOT gate, producing output 0 only when all inputs are 1.",
        "definition": "A universal logic gate composed of an AND gate followed by a NOT gate, producing output 0 only when all inputs are 1."
      },
      {
        "term": "NOR Gate",
        "def": "A universal logic gate composed of an OR gate followed by a NOT gate, producing output 1 only when all inputs are 0.",
        "definition": "A universal logic gate composed of an OR gate followed by a NOT gate, producing output 1 only when all inputs are 0."
      },
      {
        "term": "Universal Gate",
        "def": "A logic gate (NAND or NOR) capable of implementing any digital logic circuit or Boolean function without requiring other gate types.",
        "definition": "A logic gate (NAND or NOR) capable of implementing any digital logic circuit or Boolean function without requiring other gate types."
      },
      {
        "term": "XOR Gate",
        "def": "An Exclusive-OR gate that produces high output (1) when its inputs are dissimilar, and 0 when inputs are identical.",
        "definition": "An Exclusive-OR gate that produces high output (1) when its inputs are dissimilar, and 0 when inputs are identical."
      },
      {
        "term": "Karnaugh Map (K-Map)",
        "def": "A graphical grid method used to simplify and minimize Boolean expressions by visually grouping adjacent minterms.",
        "definition": "A graphical grid method used to simplify and minimize Boolean expressions by visually grouping adjacent minterms."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "When data enters into the computer, it is converted into:",
          "options": [
            "Binary number system",
            "Decimal number system",
            "Hexadecimal number system",
            "Octal number system"
          ],
          "ans": 0,
          "explanation": "Digital computers convert all data into binary format (bits 0 and 1)."
        },
        {
          "q": "An electronic circuit that takes one or more input signals and produces a single output signal is called:",
          "options": [
            "Diagram",
            "Table",
            "Digital logic gate",
            "None of the above"
          ],
          "ans": 2,
          "explanation": "A digital logic gate is the elementary building block of digital circuits."
        },
        {
          "q": "The output of which gate is 1 only when all its inputs are 1?",
          "options": [
            "AND gate",
            "OR gate",
            "NOT gate",
            "NAND gate"
          ],
          "ans": 0,
          "explanation": "The AND gate performs logical multiplication; Y = 1 only if all inputs are 1."
        },
        {
          "q": "Which gate performs logical Negation or complementation?",
          "options": [
            "AND gate",
            "OR gate",
            "NOT gate",
            "XOR gate"
          ],
          "ans": 2,
          "explanation": "The NOT gate (inverter) inverts the input signal."
        },
        {
          "q": "The gate whose output is '1' when all inputs are 0 is called:",
          "options": [
            "NAND gate",
            "NOR gate",
            "NOT gate",
            "XOR gate"
          ],
          "ans": 1,
          "explanation": "For a NOR gate: Y = (0 + 0)' = 0' = 1."
        },
        {
          "q": "K-Map method is used for:",
          "options": [
            "Minimizing Boolean expressions",
            "Representing expressions diagrammatically",
            "Making comparison between two variables",
            "Designing digital circuits"
          ],
          "ans": 0,
          "explanation": "K-Map is primarily used for algebraic minimization of Boolean expressions."
        }
      ],
      "shortQuestions": [
        {
          "q": "How is data represented in a computer, discuss briefly?",
          "ans": "Data is represented in digital computers using the binary number system consisting of bits (0 and 1). At the physical level, these represent electrical voltage levels (e.g., 0V = 0, 5V = 1). Characters, numbers, and symbols are encoded into standard binary codes such as ASCII and Unicode."
        },
        {
          "q": "What are the three basic gates? Draw their circuit diagrams and truth tables.",
          "ans": "1. AND Gate: Y = A . B (Output 1 only when A=1 and B=1).\n   Inputs: (0,0)->0, (0,1)->0, (1,0)->0, (1,1)->1.\n2. OR Gate: Y = A + B (Output 1 if A=1 or B=1).\n   Inputs: (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->1.\n3. NOT Gate: Y = A' (Output is inverse of input).\n   Inputs: (0)->1, (1)->0."
        },
        {
          "q": "Convert the following Boolean expression to logic gates: f(A, B, C) = A.B.C + A.B'.C + A'.B'",
          "ans": "Circuit Construction:\n1. Inverters: Pass B through NOT gate to get B', and A through NOT to get A'.\n2. First term (A.B.C): Connect A, B, C to a 3-input AND gate.\n3. Second term (A.B'.C): Connect A, B', C to a second 3-input AND gate.\n4. Third term (A'.B'): Connect A' and B' to a 2-input AND gate.\n5. Output: Connect the outputs of all three AND gates into a 3-input OR gate to produce f(A, B, C)."
        },
        {
          "q": "Simplify the following Boolean function using K-Map: F = X'.Z + X.Z",
          "ans": "Simplification:\nF = X'.Z + X.Z\nFactor out Z:\nF = Z . (X' + X)\nBy Boolean complement law, (X' + X) = 1:\nF = Z . 1 = Z.\nUsing 2-variable K-Map: A pair of 1s in column Z=1 yields the single literal F = Z."
        }
      ],
      "longQuestions": [
        {
          "q": "What are Universal Gates? Prove that NAND and NOR are universal gates by constructing basic gates from them.",
          "ans": "A universal gate can implement all fundamental logic operations (AND, OR, NOT) without needing any other gate type.\n\nImplementing Basic Gates using NAND:\n1. NOT Gate: Connect both inputs of a NAND gate together: Y = (A.A)' = A'.\n2. AND Gate: Connect output of a NAND gate into a NAND-based NOT gate: Y = ((A.B)')' = A.B.\n3. OR Gate: By De Morgan's Law (A' . B')' = A + B. Invert inputs A and B using NAND NOTs, then feed into a NAND gate.\n\nImplementing Basic Gates using NOR:\n1. NOT Gate: Tie both inputs together: Y = (A + A)' = A'.\n2. OR Gate: Invert the output of a NOR gate: Y = ((A + B)')' = A + B.\n3. AND Gate: Invert A and B, then feed into a NOR gate: (A' + B')' = A . B."
        },
        {
          "q": "Explain the step-by-step procedure of simplifying 3-variable Boolean functions using Karnaugh Map (K-Map) with a solved example.",
          "ans": "K-Map Simplification Procedure:\n1. Construct an 8-cell grid (2 rows for A: 0, 1; 4 columns for BC: 00, 01, 11, 10 in Gray code).\n2. Populate cells with 1s corresponding to the minterms in the Boolean function.\n3. Identify groups of adjacent 1s in powers of 2 (Octet=8, Quad=4, Pair=2, Single=1), allowing overlap and wraparound.\n4. For each group, write the product term of variables that remain unchanged.\n5. Sum the minimized product terms (OR operation).\n\nExample: F = A'B'C' + A'BC' + AB'C' + ABC'\nNotice C' is common to all terms and A and B take all 4 combinations (00, 01, 10, 11).\nThe 4 minterms form a Quad of 4 cells across the entire C=0 row/column.\nTherefore, minimized function is: F = C'."
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "Which logic gate has only one input and one output?",
          "opts": [
            "AND",
            "OR",
            "NOT",
            "XOR"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "The output of an XOR gate is 1 when:",
          "opts": [
            "Both inputs are 1",
            "Both inputs are 0",
            "Inputs are different",
            "Inputs are identical"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "The output of an XNOR gate is 1 when:",
          "opts": [
            "Inputs are different",
            "Inputs are identical",
            "Only when one input is 1",
            "Never"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "A group of 4 adjacent 1s in a K-map is called a:",
          "opts": [
            "Pair",
            "Quad",
            "Octet",
            "Byte"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "How many cells are there in a 3-variable K-map?",
          "opts": [
            "4",
            "6",
            "8",
            "16"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "A Quad group of 4 cells in a 3-variable K-map eliminates how many variables?",
          "opts": [
            "1",
            "2",
            "3",
            "4"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "Which of the following is a universal logic gate?",
          "opts": [
            "AND",
            "OR",
            "NAND",
            "XOR"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "According to De Morgan's theorem, (A + B)' equals:",
          "opts": [
            "A' + B'",
            "A' . B'",
            "A . B",
            "(A . B)'"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "According to De Morgan's theorem, (A . B)' equals:",
          "opts": [
            "A' + B'",
            "A' . B'",
            "A + B",
            "(A + B)'"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "The adjacent cells in a Karnaugh map differ by how many bits?",
          "opts": [
            "1 bit",
            "2 bits",
            "3 bits",
            "4 bits"
          ],
          "ans": 0,
          "marks": 1,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "What is the primary advantage of Karnaugh maps over Boolean algebra?",
          "key": "K-maps minimize Boolean functions systematically and visually without requiring trial-and-error algebraic manipulation or complex theorems.",
          "marks": 4,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "Why are adjacent cells in K-maps ordered using Gray code?",
          "key": "Because Gray code guarantees that adjacent cells differ by only one variable bit, allowing that variable to be eliminated during grouping.",
          "marks": 4,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "Draw the circuit symbol and truth table for a 2-input NOR gate.",
          "key": "Symbol: OR gate with bubble at output. Expression: Y = (A+B)'. Truth table: (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0.",
          "marks": 4,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "What is meant by odd parity checker in relation to XOR gates?",
          "key": "An XOR gate outputs 1 only when an odd number of inputs are 1, making it the fundamental component of digital parity detection circuits.",
          "marks": 4,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "State the grouping rules for cells in a Karnaugh map.",
          "key": "1) Group size must be power of 2 (1,2,4,8), 2) Groups must be rectangular/square, 3) Groups can overlap and wraparound edges, 4) Groups must be as large as possible.",
          "marks": 4,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Detail all standard logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) with their symbols, Boolean algebraic equations, and complete truth tables.",
          "marks": 8,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        },
        {
          "q": "Simplify the Boolean function F(A,B,C) = Sigma(0, 2, 4, 6) using a 3-variable K-Map, and draw the resulting minimized logic circuit.",
          "marks": 8,
          "chapter": "Unit 6: Computer Logic and Gates",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "Basic Boolean Expressions",
        "formula": "AND: Y = A . B | OR: Y = A + B | NOT: Y = A'",
        "note": "Fundamental Boolean algebraic equations."
      },
      {
        "name": "Universal Gates Expressions",
        "formula": "NAND: Y = (A . B)' | NOR: Y = (A + B)'",
        "note": "Universal logic gate mathematical representations."
      },
      {
        "name": "De Morgan's Theorems",
        "formula": "(A + B)' = A' . B'  and  (A . B)' = A' + B'",
        "note": "Fundamental dual transformation theorems of digital logic."
      },
      {
        "name": "Exclusive Gates",
        "formula": "XOR: Y = A (+) B = A'B + AB' | XNOR: Y = (A (+) B)' = AB + A'B'",
        "note": "Parity and equality comparison logic functions."
      }
    ],
    "numericals": [
      {
        "statement": "Evaluate the output of an XOR gate for all 4 combinations of binary inputs A and B.",
        "solution": "A=0, B=0: Y = 0 (+) 0 = 0\nA=0, B=1: Y = 0 (+) 1 = 1\nA=1, B=0: Y = 1 (+) 0 = 1\nA=1, B=1: Y = 1 (+) 1 = 0\nConclusion: Output is 1 only when inputs differ."
      }
    ],
    "englishSummary": "Unit 6 covers digital computer logic and electronic logic gates. It discusses binary data representation and logic levels. Basic gates (AND, OR, NOT) and derived/universal gates (NAND, NOR, XOR, XNOR) are analyzed with schematic symbols, Boolean expressions, and truth tables. The universality of NAND/NOR gates is proven. Finally, Karnaugh Maps (2-variable and 3-variable) and grouping rules for minimizing Boolean expressions and designing digital circuits are explained.",
    "urduSummary": "یونٹ 6 ڈیجیٹل کمپیوٹر لاجک اور گیٹس کا احاطہ کرتا ہے۔ اس میں ڈیٹا کی بائنری نمائندگی، بنیادی لاجک گیٹس (AND, OR, NOT)، اور یونیورسل گیٹس (NAND, NOR) کے ساتھ XOR اور XNOR کی تفصیلی وضاحت کی گئی ہے۔ ٹروتھ ٹیبلز، بولین الجبرا، اور کارنو میپ (K-Map) کے ذریعے بولین فنکشنز کی سادہ ترین اشکال میں تبدیلی اور ڈیجیٹل سرکٹ ڈیزائننگ سکھائی گئی ہے۔",
    "topics": [
      {
        "sectionNum": "6.1",
        "title": "Data Representation in Computer",
        "content": "6.1.1 Data Representation in a Computer:\nDigital computers store and manipulate all forms of data (numbers, text, sound, graphics) in binary form using binary digits (bits): 0 and 1.\n• Low voltage level (0 to 0.8V) represents Binary 0 (False / OFF / Low).\n• High voltage level (2 to 5V) represents Binary 1 (True / ON / High).\n\nUnits of Data Measurement:\n• Bit: Smallest unit of data (0 or 1).\n• Nibble: Group of 4 bits.\n• Byte: Group of 8 bits (stores a single ASCII character).\n• Kilobyte (KB) = 1024 Bytes, Megabyte (MB) = 1024 KB, Gigabyte (GB) = 1024 MB.",
        "keyPoints": [
          "All computer data is represented in binary format (0s and 1s).",
          "Binary 0 represents Low/False; Binary 1 represents High/True.",
          "1 Byte = 8 Bits; 1 Nibble = 4 Bits."
        ]
      },
      {
        "sectionNum": "6.2",
        "title": "Digital Logic & Logic Gates",
        "content": "6.2.1 Digital Logic and Logic Gates:\nA logic gate is an electronic circuit that operates on one or more input electrical signals to produce a single output signal based on Boolean logic.\n\n6.2.2 Basic Logic Gates:\n1. AND Gate:\n• Performs logical multiplication (conjunction).\n• Expression: Y = A . B\n• Rule: Output is 1 only when ALL inputs are 1; otherwise output is 0.\n\n2. OR Gate:\n• Performs logical addition (disjunction).\n• Expression: Y = A + B\n• Rule: Output is 1 if AT LEAST ONE input is 1; output is 0 only when all inputs are 0.\n\n3. NOT Gate (Inverter):\n• Performs logical negation or complementation.\n• Has only ONE input and ONE output.\n• Expression: Y = A' (or A with a bar over it)\n• Rule: Reverses input (0 becomes 1; 1 becomes 0).\n\n6.2.3 Derived and Universal Gates:\n1. NAND Gate:\n• Combination of AND followed by NOT (NOT-AND).\n• Expression: Y = (A . B)'\n• Rule: Output is 0 only when all inputs are 1; otherwise 1.\n• Universal gate: any digital circuit can be built exclusively using NAND gates.\n\n2. NOR Gate:\n• Combination of OR followed by NOT (NOT-OR).\n• Expression: Y = (A + B)'\n• Rule: Output is 1 only when all inputs are 0; otherwise 0.\n• Universal gate: can implement any logic function without other gate types.\n\n3. Exclusive-OR (XOR) Gate:\n• Expression: Y = A (+) B = A'.B + A.B'\n• Rule: Output is 1 when inputs are DIFFERENT (odd parity); 0 when inputs are the same.\n\n4. Exclusive-NOR (XNOR) Gate:\n• Expression: Y = (A (+) B)' = A.B + A'.B'\n• Rule: Output is 1 when inputs are IDENTICAL; 0 when inputs are different.",
        "keyPoints": [
          "Basic gates: AND, OR, NOT.",
          "Universal gates: NAND and NOR (can implement any Boolean function).",
          "XOR outputs 1 for differing inputs; XNOR outputs 1 for identical inputs."
        ]
      },
      {
        "sectionNum": "6.3",
        "title": "Karnaugh Map (K-Map) Simplification",
        "content": "6.3.1 Karnaugh Map (K-Map):\nA Karnaugh map is a pictorial / diagrammatic method of representing and simplifying Boolean expressions without relying on complex algebraic theorems.\nIt arranges truth table minterms into a grid of cells where adjacent cells differ by only a single bit (Gray code).\n\n6.3.2 Two-Variable K-Map:\n• Consists of 2^2 = 4 cells for variables A and B.\n• Cell layout: Rows represent A (0, 1), Columns represent B (0, 1).\n\n6.3.3 Three-Variable K-Map:\n• Consists of 2^3 = 8 cells for variables A, B, and C.\n• Row: A (0, 1); Columns: BC (00, 01, 11, 10) - Note Gray code ordering.\n\n6.3.4 Grouping Rules in K-Maps:\n1. Groups must contain 2^n ones (1, 2, 4, 8, 16 cells): Single, Pair (2), Quad (4), Octet (8).\n2. Groups must be rectangular or square (no diagonal groups).\n3. Groups can overlap to maximize group size.\n4. Groups can wrap around edges and corners (torus topology).\n5. Each group should be as large as possible to eliminate more variables.",
        "keyPoints": [
          "K-Map is a graphical tool for minimizing Boolean logic expressions.",
          "2-variable K-map has 4 cells; 3-variable K-map has 8 cells.",
          "Group sizes must be powers of 2 (1, 2, 4, 8); larger groups eliminate more literals."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "When data enters into the computer, it is converted into:",
          "options": [
            "Binary number system",
            "Decimal number system",
            "Hexadecimal number system",
            "Octal number system"
          ],
          "ans": 0,
          "explanation": "Digital computers convert all data into binary format (bits 0 and 1)."
        },
        {
          "q": "An electronic circuit that takes one or more input signals and produces a single output signal is called:",
          "options": [
            "Diagram",
            "Table",
            "Digital logic gate",
            "None of the above"
          ],
          "ans": 2,
          "explanation": "A digital logic gate is the elementary building block of digital circuits."
        },
        {
          "q": "The output of which gate is 1 only when all its inputs are 1?",
          "options": [
            "AND gate",
            "OR gate",
            "NOT gate",
            "NAND gate"
          ],
          "ans": 0,
          "explanation": "The AND gate performs logical multiplication; Y = 1 only if all inputs are 1."
        },
        {
          "q": "Which gate performs logical Negation or complementation?",
          "options": [
            "AND gate",
            "OR gate",
            "NOT gate",
            "XOR gate"
          ],
          "ans": 2,
          "explanation": "The NOT gate (inverter) inverts the input signal."
        },
        {
          "q": "The gate whose output is '1' when all inputs are 0 is called:",
          "options": [
            "NAND gate",
            "NOR gate",
            "NOT gate",
            "XOR gate"
          ],
          "ans": 1,
          "explanation": "For a NOR gate: Y = (0 + 0)' = 0' = 1."
        },
        {
          "q": "K-Map method is used for:",
          "options": [
            "Minimizing Boolean expressions",
            "Representing expressions diagrammatically",
            "Making comparison between two variables",
            "Designing digital circuits"
          ],
          "ans": 0,
          "explanation": "K-Map is primarily used for algebraic minimization of Boolean expressions."
        }
      ],
      "shortQuestions": [
        {
          "q": "How is data represented in a computer, discuss briefly?",
          "ans": "Data is represented in digital computers using the binary number system consisting of bits (0 and 1). At the physical level, these represent electrical voltage levels (e.g., 0V = 0, 5V = 1). Characters, numbers, and symbols are encoded into standard binary codes such as ASCII and Unicode."
        },
        {
          "q": "What are the three basic gates? Draw their circuit diagrams and truth tables.",
          "ans": "1. AND Gate: Y = A . B (Output 1 only when A=1 and B=1).\n   Inputs: (0,0)->0, (0,1)->0, (1,0)->0, (1,1)->1.\n2. OR Gate: Y = A + B (Output 1 if A=1 or B=1).\n   Inputs: (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->1.\n3. NOT Gate: Y = A' (Output is inverse of input).\n   Inputs: (0)->1, (1)->0."
        },
        {
          "q": "Convert the following Boolean expression to logic gates: f(A, B, C) = A.B.C + A.B'.C + A'.B'",
          "ans": "Circuit Construction:\n1. Inverters: Pass B through NOT gate to get B', and A through NOT to get A'.\n2. First term (A.B.C): Connect A, B, C to a 3-input AND gate.\n3. Second term (A.B'.C): Connect A, B', C to a second 3-input AND gate.\n4. Third term (A'.B'): Connect A' and B' to a 2-input AND gate.\n5. Output: Connect the outputs of all three AND gates into a 3-input OR gate to produce f(A, B, C)."
        },
        {
          "q": "Simplify the following Boolean function using K-Map: F = X'.Z + X.Z",
          "ans": "Simplification:\nF = X'.Z + X.Z\nFactor out Z:\nF = Z . (X' + X)\nBy Boolean complement law, (X' + X) = 1:\nF = Z . 1 = Z.\nUsing 2-variable K-Map: A pair of 1s in column Z=1 yields the single literal F = Z."
        }
      ],
      "longQuestions": [
        {
          "q": "What are Universal Gates? Prove that NAND and NOR are universal gates by constructing basic gates from them.",
          "ans": "A universal gate can implement all fundamental logic operations (AND, OR, NOT) without needing any other gate type.\n\nImplementing Basic Gates using NAND:\n1. NOT Gate: Connect both inputs of a NAND gate together: Y = (A.A)' = A'.\n2. AND Gate: Connect output of a NAND gate into a NAND-based NOT gate: Y = ((A.B)')' = A.B.\n3. OR Gate: By De Morgan's Law (A' . B')' = A + B. Invert inputs A and B using NAND NOTs, then feed into a NAND gate.\n\nImplementing Basic Gates using NOR:\n1. NOT Gate: Tie both inputs together: Y = (A + A)' = A'.\n2. OR Gate: Invert the output of a NOR gate: Y = ((A + B)')' = A + B.\n3. AND Gate: Invert A and B, then feed into a NOR gate: (A' + B')' = A . B."
        },
        {
          "q": "Explain the step-by-step procedure of simplifying 3-variable Boolean functions using Karnaugh Map (K-Map) with a solved example.",
          "ans": "K-Map Simplification Procedure:\n1. Construct an 8-cell grid (2 rows for A: 0, 1; 4 columns for BC: 00, 01, 11, 10 in Gray code).\n2. Populate cells with 1s corresponding to the minterms in the Boolean function.\n3. Identify groups of adjacent 1s in powers of 2 (Octet=8, Quad=4, Pair=2, Single=1), allowing overlap and wraparound.\n4. For each group, write the product term of variables that remain unchanged.\n5. Sum the minimized product terms (OR operation).\n\nExample: F = A'B'C' + A'BC' + AB'C' + ABC'\nNotice C' is common to all terms and A and B take all 4 combinations (00, 01, 10, 11).\nThe 4 minterms form a Quad of 4 cells across the entire C=0 row/column.\nTherefore, minimized function is: F = C'."
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "Which logic gate has only one input and one output?",
        "opts": [
          "AND",
          "OR",
          "NOT",
          "XOR"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "The output of an XOR gate is 1 when:",
        "opts": [
          "Both inputs are 1",
          "Both inputs are 0",
          "Inputs are different",
          "Inputs are identical"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "The output of an XNOR gate is 1 when:",
        "opts": [
          "Inputs are different",
          "Inputs are identical",
          "Only when one input is 1",
          "Never"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "A group of 4 adjacent 1s in a K-map is called a:",
        "opts": [
          "Pair",
          "Quad",
          "Octet",
          "Byte"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "How many cells are there in a 3-variable K-map?",
        "opts": [
          "4",
          "6",
          "8",
          "16"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "A Quad group of 4 cells in a 3-variable K-map eliminates how many variables?",
        "opts": [
          "1",
          "2",
          "3",
          "4"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "Which of the following is a universal logic gate?",
        "opts": [
          "AND",
          "OR",
          "NAND",
          "XOR"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "According to De Morgan's theorem, (A + B)' equals:",
        "opts": [
          "A' + B'",
          "A' . B'",
          "A . B",
          "(A . B)'"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "According to De Morgan's theorem, (A . B)' equals:",
        "opts": [
          "A' + B'",
          "A' . B'",
          "A + B",
          "(A + B)'"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "The adjacent cells in a Karnaugh map differ by how many bits?",
        "opts": [
          "1 bit",
          "2 bits",
          "3 bits",
          "4 bits"
        ],
        "ans": 0,
        "marks": 1,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "What is the primary advantage of Karnaugh maps over Boolean algebra?",
        "key": "K-maps minimize Boolean functions systematically and visually without requiring trial-and-error algebraic manipulation or complex theorems.",
        "marks": 4,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "Why are adjacent cells in K-maps ordered using Gray code?",
        "key": "Because Gray code guarantees that adjacent cells differ by only one variable bit, allowing that variable to be eliminated during grouping.",
        "marks": 4,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "Draw the circuit symbol and truth table for a 2-input NOR gate.",
        "key": "Symbol: OR gate with bubble at output. Expression: Y = (A+B)'. Truth table: (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0.",
        "marks": 4,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "What is meant by odd parity checker in relation to XOR gates?",
        "key": "An XOR gate outputs 1 only when an odd number of inputs are 1, making it the fundamental component of digital parity detection circuits.",
        "marks": 4,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "State the grouping rules for cells in a Karnaugh map.",
        "key": "1) Group size must be power of 2 (1,2,4,8), 2) Groups must be rectangular/square, 3) Groups can overlap and wraparound edges, 4) Groups must be as large as possible.",
        "marks": 4,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Detail all standard logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) with their symbols, Boolean algebraic equations, and complete truth tables.",
        "marks": 8,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      },
      {
        "q": "Simplify the Boolean function F(A,B,C) = Sigma(0, 2, 4, 6) using a 3-variable K-Map, and draw the resulting minimized logic circuit.",
        "marks": 8,
        "chapter": "Unit 6: Computer Logic and Gates",
        "source": "slo"
      }
    ]
  },
  {
    "num": 7,
    "id": "cls9-comp-ch07",
    "name": "World Wide Web and HTML",
    "nameUr": "ورلڈ وائڈ ویب اور ایچ ٹی ایم ایل",
    "pageRange": "Pages 167 – 225",
    "status": "done",
    "slos": [
      "Define terms related to websites: World Wide Web (WWW), Web page, Website, Web server, Web browser, URL, Search engine, Home page, Web hosting",
      "Identify popular web browsers: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera",
      "Explain types of websites: Web portals, Informational, News, Business/E-commerce, Educational, Entertainment, Social networking",
      "Define HyperText Markup Language (HTML) and understand its role in web design",
      "Create, save, and view HTML documents using text editors (Notepad++) and web browsers",
      "Understand the structure of an HTML document (<html>, <head>, <title>, <body>)",
      "Use text formatting tags (headings <h1> to <h6>, font, p, br, b, i, u, sub, sup, center)",
      "Create ordered, unordered, definition, and nested lists in HTML",
      "Insert images into web pages using <img> tag (src, width, height, border, alt attributes)",
      "Apply background colors, foreground text colors, and background images",
      "Create text and graphical hyperlinks using the anchor <a> tag (href attribute)",
      "Create structured HTML tables (<table>, <tr>, <th>, <td>, border, colspan, rowspan)",
      "Create frames and framesets (<frameset>, <frame>, rows, cols)",
      "Understand domain registration, web hosting, and steps to upload websites to web servers"
    ],
    "sections": [
      {
        "sectionNum": "7.1",
        "title": "Introduction to World Wide Web",
        "content": "7.1.1 Terms Related to WWW:\n• World Wide Web (WWW): A global network of interconnected hypertext documents accessible via the Internet.\n• Web Page: An electronic document written in HTML containing text, images, hyperlinks, and multimedia.\n• Website: A collection of related web pages hosted together on a web server under a common domain name.\n• Web Server: A specialized computer connected to the Internet that stores web pages and serves them to client computers upon request.\n• Web Browser: Application software that enables users to locate, retrieve, and view web pages (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera).\n• URL (Uniform Resource Locator): The global address of a resource on the Internet (e.g., https://www.kptbb.gov.pk).\n• Search Engine: A web-based tool that searches the Internet for documents matching user keywords (Google, Bing, Yahoo).\n• Home Page: The introductory or main front page of a website that opens first.\n\n7.1.2 Types of Websites:\n1. Web Portals: Gateway websites offering varied services (email, search, news, weather) like Yahoo, MSN.\n2. Informational Websites: Provide factual knowledge and encyclopedic content (Wikipedia, Encyclopedia.com).\n3. News Websites: Deliver current news and journalism (BBC Urdu, Dawn, Geo News).\n4. Business & E-Commerce Websites: Promote commercial services and online shopping (Daraz.pk, Amazon).\n5. Educational Websites: Deliver online learning, tutorials, and courses (Khan Academy, Virtual University).\n6. Entertainment Websites: Offer multimedia, music, movies, and online games (YouTube, Netflix).\n7. Social Networking Websites: Connect people and facilitate communication (Facebook, Twitter/X, Instagram).",
        "keyPoints": [
          "WWW is the global collection of interconnected hypertext web documents.",
          "URL is the unique web address of a file or site.",
          "Web browser retrieves and renders HTML pages for human viewing."
        ]
      },
      {
        "sectionNum": "7.2",
        "title": "Introduction to HTML & Structure",
        "content": "7.2.1 HyperText Markup Language (HTML):\nHTML is the standard markup language used to design and structure web pages. It uses tags enclosed in angle brackets (< >) to instruct browsers how to display text, images, and links.\n\n7.2.2 Creating and Displaying HTML Documents:\nHTML documents are plain text files saved with .html or .htm extension. Created using text editors (Notepad, Notepad++) and viewed using any web browser.\n\n7.2.3 HTML Tags and Elements:\n• Container (Paired) Tags: Have opening and closing tags. Content is placed between them. Example: <p>This is a paragraph.</p>\n• Empty (Unpaired) Tags: Do not have closing tags. Example: <br>, <img>, <hr>.\n• Attributes: Provide additional properties to tags, written inside the opening tag: <tag attribute=\"value\">.\n\n7.2.4 Standard HTML Structure:\n<html>\n<head>\n    <title>My Web Page</title>\n</head>\n<body>\n    <!-- Content visible to users -->\n</body>\n</html>.",
        "keyPoints": [
          "HTML stands for HyperText Markup Language.",
          "Container tags have opening and closing tags; Empty tags stand alone.",
          "Document structure consists of <html>, <head>, <title>, and <body>."
        ]
      },
      {
        "sectionNum": "7.3",
        "title": "Text Formatting in HTML",
        "content": "7.3.1 Headings in HTML:\nSix levels of headings: <h1> (largest) to <h6> (smallest).\n\n7.3.2 Paragraph and Formatting Tags:\n• <p>: Defines a paragraph.\n• <br>: Inserts a line break without starting a new paragraph.\n• <hr>: Inserts a horizontal thematic dividing line.\n• <b>: Bold text.\n• <i>: Italic text.\n• <u>: Underline text.\n• <sup>: Superscript text (e.g., X<sup>2</sup> -> X²).\n• <sub>: Subscript text (e.g., H<sub>2</sub>O -> H₂O).\n• <center>: Centers content horizontally.\n• <font>: Specifies font attributes (size, color, face).",
        "keyPoints": [
          "<h1> is largest heading; <h6> is smallest heading.",
          "<sup> creates superscripts; <sub> creates subscripts.",
          "<br> forces a line break; <p> creates paragraph blocks."
        ]
      },
      {
        "sectionNum": "7.4",
        "title": "Lists, Images & Hyperlinks",
        "content": "7.4.1 Lists in HTML:\n1. Ordered List (<ol>): Numbered list using <li> tags. Type attribute: 1, A, a, I, i.\n2. Unordered List (<ul>): Bulleted list using <li> tags. Type attribute: disc, circle, square.\n3. Definition List (<dl>): Consists of terms (<dt>) and descriptions (<dd>).\n4. Nested Lists: A list placed inside another list item.\n\n7.4.2 Images in HTML (<img> Tag):\nEmpty tag used to embed images. Attributes:\n• src: Specifies image file path/URL.\n• width / height: Sizing in pixels or percentage.\n• alt: Alternative text if image fails to load.\n• border: Specifies border thickness.\n\n7.4.3 Colors and Backgrounds:\n• <body bgcolor=\"color_name_or_hex\" text=\"color\">: Sets page background and text colors.\n• <body background=\"image.jpg\">: Applies a background wallpaper image.\n\n7.4.4 Hyperlinks (<a> Anchor Tag):\nConnects web pages together.\n• External Link: <a href=\"https://www.google.com\">Visit Google</a>\n• Internal Link: Links to an anchor id on the same page.\n• Graphical Link: Nesting an <img> inside an <a> tag creates a clickable image link:\n<a href=\"home.html\"><img src=\"logo.png\" alt=\"Home\"></a>.",
        "keyPoints": [
          "<ol> creates numbered lists; <ul> creates bulleted lists.",
          "<img> attributes include src, width, height, and alt.",
          "<a> anchor tag with href attribute creates text and graphical hyperlinks."
        ]
      },
      {
        "sectionNum": "7.5",
        "title": "Tables, Frames & Web Hosting",
        "content": "7.5.1 Creating Tables in HTML:\nTables organize data into rows and columns:\n• <table>: Defines the table container.\n• <tr>: Defines a table row.\n• <th>: Defines a table header cell (bold and centered).\n• <td>: Defines a standard table data cell.\nAttributes: border, cellpadding, cellspacing, width, align, bgcolor.\nCell Merging:\n• colspan: Merges multiple columns horizontally across a row.\n• rowspan: Merges multiple rows vertically across a column.\n\n7.5.2 Creating Frames (<frameset> and <frame>):\nDivides the browser window into multiple independent rectangular sub-windows, each displaying a separate HTML document.\nAttributes: cols=\"50%,50%\" (vertical split) or rows=\"30%,70%\" (horizontal split).\n\n7.5.3 Web Hosting and Publishing:\n1. Domain Name Registration: Registering a unique web address (e.g. www.mysite.pk).\n2. Web Hosting: Purchasing server storage space with Internet connectivity to store site files.\n3. Uploading Site Files: Transferring HTML pages and media via FTP (File Transfer Protocol) client software to make the site live.",
        "keyPoints": [
          "Tables use <table>, <tr>, <th>, and <td> tags.",
          "colspan merges columns; rowspan merges rows.",
          "Web hosting makes files accessible worldwide on web servers."
        ]
      }
    ],
    "definitions": [
      {
        "term": "World Wide Web (WWW)",
        "def": "A globally distributed network of interlinked hypertext documents and multimedia resources accessible via the Internet.",
        "definition": "A globally distributed network of interlinked hypertext documents and multimedia resources accessible via the Internet."
      },
      {
        "term": "Web Page",
        "def": "An electronic hypertext document created in HTML and accessible on the World Wide Web using a web browser.",
        "definition": "An electronic hypertext document created in HTML and accessible on the World Wide Web using a web browser."
      },
      {
        "term": "Website",
        "def": "A collection of related web pages, images, and digital assets published under a single common domain name on a web server.",
        "definition": "A collection of related web pages, images, and digital assets published under a single common domain name on a web server."
      },
      {
        "term": "Web Browser",
        "def": "Software application used to locate, retrieve, interpret, and render web pages on the World Wide Web.",
        "definition": "Software application used to locate, retrieve, interpret, and render web pages on the World Wide Web."
      },
      {
        "term": "Web Server",
        "def": "A dedicated computer connected to the Internet that stores web files and delivers them to client web browsers via HTTP.",
        "definition": "A dedicated computer connected to the Internet that stores web files and delivers them to client web browsers via HTTP."
      },
      {
        "term": "URL",
        "def": "Uniform Resource Locator; the standardized global address identifying the location of a resource on the Internet.",
        "definition": "Uniform Resource Locator; the standardized global address identifying the location of a resource on the Internet."
      },
      {
        "term": "HTML",
        "def": "HyperText Markup Language; the standard markup language used to structure and display web documents.",
        "definition": "HyperText Markup Language; the standard markup language used to structure and display web documents."
      },
      {
        "term": "HTML Tag",
        "def": "A command or formatting instruction enclosed in angle brackets (< >) that specifies how web content is displayed.",
        "definition": "A command or formatting instruction enclosed in angle brackets (< >) that specifies how web content is displayed."
      },
      {
        "term": "Hyperlink",
        "def": "An interactive link embedded in text or image that connects to another web document or a specific section of the same page.",
        "definition": "An interactive link embedded in text or image that connects to another web document or a specific section of the same page."
      },
      {
        "term": "Web Hosting",
        "def": "A commercial service providing web server storage and network bandwidth to make websites accessible 24/7 on the Internet.",
        "definition": "A commercial service providing web server storage and network bandwidth to make websites accessible 24/7 on the Internet."
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "Internet address which identifies a website is called?",
          "options": [
            "Web page",
            "Website",
            "Web server",
            "URL"
          ],
          "ans": 3,
          "explanation": "URL (Uniform Resource Locator) is the unique Internet address of a website."
        },
        {
          "q": "A collection of web pages hosted on a web server is called?",
          "options": [
            "Web address",
            "Website",
            "Home page",
            "Web browser"
          ],
          "ans": 1,
          "explanation": "A website is a collection of related web pages hosted on a web server."
        },
        {
          "q": "Which language is used for creating web pages?",
          "options": [
            "HTML",
            "C language",
            "URL",
            "Web browser"
          ],
          "ans": 0,
          "explanation": "HTML (HyperText Markup Language) is the primary markup language for web pages."
        },
        {
          "q": "Text or image in a web page that links it to another web page is called?",
          "options": [
            "Web link",
            "Browser link",
            "Hyperlink",
            "Search link"
          ],
          "ans": 2,
          "explanation": "A hyperlink connects one web resource to another."
        },
        {
          "q": "Which of the following refers to uploading of web pages to a web server so that others can access it?",
          "options": [
            "Configuring web pages",
            "Web surfing",
            "Installing website",
            "Web hosting"
          ],
          "ans": 3,
          "explanation": "Web hosting provides server hosting and internet access for website files."
        }
      ],
      "shortQuestions": [
        {
          "q": "What is a website? Describe different types of websites with examples.",
          "ans": "A website is a collection of related, interlinked web pages hosted under a common domain name.\nTypes:\n1. Informational Websites: Deliver knowledge (Wikipedia).\n2. News Websites: Broadcast current events (BBC, Dawn).\n3. Business/E-commerce Websites: Sell goods online (Daraz.pk).\n4. Educational Websites: Online learning and tutorials (Khan Academy).\n5. Social Networking Websites: Connect people globally (Facebook, Twitter)."
        },
        {
          "q": "Write the HTML tags for the following:\ni) Paragraph\nii) Heading\niii) Bold\niv) Underline\nv) Italic\nvi) Center text\nvii) Superscript\nviii) Subscript\nix) Font size and color",
          "ans": "i) Paragraph: <p> ... </p>\nii) Heading: <h1> ... </h1> to <h6> ... </h6>\niii) Bold: <b> ... </b>\niv) Underline: <u> ... </u>\nv) Italic: <i> ... </i>\nvi) Center text: <center> ... </center>\nvii) Superscript: <sup> ... </sup>\nviii) Subscript: <sub> ... </sub>\nix) Font: <font size=\"4\" color=\"blue\" face=\"Arial\"> ... </font>"
        },
        {
          "q": "Write HTML code to insert an image with width of 250 pixels and height 150 pixels.",
          "ans": "<img src=\"picture.jpg\" width=\"250\" height=\"150\" alt=\"Sample Image\">"
        },
        {
          "q": "Describe how background color and background image are applied to a web page.",
          "ans": "• Background Color: Set using bgcolor attribute in body tag:\n<body bgcolor=\"lightblue\">\n• Background Image: Set using background attribute in body tag:\n<body background=\"wallpaper.jpg\">"
        },
        {
          "q": "Create an HTML document that contains a graphical hyperlink.",
          "ans": "<html>\n<head><title>Graphical Link</title></head>\n<body>\n    <a href=\"https://www.google.com\">\n        <img src=\"google_logo.png\" width=\"200\" height=\"80\" alt=\"Google Search\">\n    </a>\n</body>\n</html>"
        }
      ],
      "longQuestions": [
        {
          "q": "Create a complete HTML document that contains both ordered and unordered lists with nested list items.",
          "ans": "<!DOCTYPE html>\n<html>\n<head>\n    <title>Curriculum Lists</title>\n</head>\n<body>\n    <h2>Class 9 Computer Science Syllabus</h2>\n    <ol type=\"1\">\n        <li>Programming Fundamentals\n            <ul type=\"square\">\n                <li>Programming in C</li>\n                <li>Input/Output Functions</li>\n                <li>Control Structures</li>\n            </ul>\n        </li>\n        <li>Hardware and Logic\n            <ul type=\"circle\">\n                <li>Logic Gates</li>\n                <li>Karnaugh Maps</li>\n            </ul>\n        </li>\n        <li>Web Technologies\n            <ul type=\"disc\">\n                <li>HTML Text Formatting</li>\n                <li>Tables and Frames</li>\n            </ul>\n        </li>\n    </ol>\n</body>\n</html>"
        },
        {
          "q": "Explain HTML Tables in detail with tags (table, tr, th, td) and write code to display a class timetable using colspan and rowspan.",
          "ans": "HTML Table Components:\n• <table>: Encloses the entire table.\n• <tr>: Represents a horizontal row.\n• <th>: Defines a bold, centered header cell.\n• <td>: Defines a regular data cell.\n• colspan: Merges multiple adjacent columns horizontally.\n• rowspan: Merges multiple rows vertically.\n\nTimetable Code Example:\n<!DOCTYPE html>\n<html>\n<head><title>Class Timetable</title></head>\n<body>\n    <table border=\"1\" cellpadding=\"8\" cellspacing=\"0\">\n        <tr>\n            <th>Day</th>\n            <th>Period 1 (9:00 - 10:00)</th>\n            <th>Period 2 (10:00 - 11:00)</th>\n            <th>11:00 - 11:30</th>\n            <th>Period 3 (11:30 - 12:30)</th>\n        </tr>\n        <tr>\n            <td>Monday</td>\n            <td>Computer Science</td>\n            <td>Mathematics</td>\n            <td rowspan=\"5\" align=\"center\"><b>B<br>R<br>E<br>A<br>K</b></td>\n            <td>Physics</td>\n        </tr>\n        <tr>\n            <td>Tuesday</td>\n            <td>Computer Science</td>\n            <td>Chemistry</td>\n            <td>English</td>\n        </tr>\n    </table>\n</body>\n</html>"
        }
      ]
    },
    "sloQuestions": {
      "mcqs": [
        {
          "q": "Which tag is used to create a numbered list in HTML?",
          "opts": [
            "<ul>",
            "<ol>",
            "<dl>",
            "<list>"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which attribute specifies the destination URL in an anchor tag?",
          "opts": [
            "src",
            "link",
            "href",
            "target"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which tag is an empty (unpaired) tag?",
          "opts": [
            "<p>",
            "<b>",
            "<br>",
            "<html>"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which tag defines the largest heading in HTML?",
          "opts": [
            "<head>",
            "<h6>",
            "<h1>",
            "<heading>"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which attribute merges two or more columns in an HTML table?",
          "opts": [
            "rowspan",
            "colspan",
            "cellpadding",
            "merge"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which tag is used to insert a table header cell?",
          "opts": [
            "<td>",
            "<th>",
            "<tr>",
            "<header>"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "The title of a web page appears in the:",
          "opts": [
            "Body area",
            "Browser title bar / tab",
            "Status bar",
            "Footer"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which tag is used to create a horizontal line across the page?",
          "opts": [
            "<line>",
            "<br>",
            "<hr>",
            "<border>"
          ],
          "ans": 2,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which attribute of <img> tag provides alternative text for accessibility?",
          "opts": [
            "title",
            "alt",
            "text",
            "name"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Which HTML tag is used to display mathematical superscript like X²?",
          "opts": [
            "<sub>",
            "<sup>",
            "<super>",
            "<up>"
          ],
          "ans": 1,
          "marks": 1,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        }
      ],
      "shortQuestions": [
        {
          "q": "What is the difference between container tags and empty tags in HTML?",
          "key": "Container tags have both opening and closing tags (<p>...</p>) enclosing content, while empty tags (<br>, <img>, <hr>) do not have closing tags.",
          "marks": 4,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Explain the difference between ordered and unordered lists in HTML.",
          "key": "Ordered lists (<ol>) display items in sequential numbered or alphabetical order. Unordered lists (<ul>) display items with graphical bullets.",
          "marks": 4,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "What is the purpose of cellpadding and cellspacing attributes in HTML tables?",
          "key": "cellpadding sets the space between cell wall and cell content; cellspacing sets the distance between individual adjacent cells.",
          "marks": 4,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "How is a graphical hyperlink created in HTML?",
          "key": "By placing an <img> tag inside the opening and closing anchor tags: <a href='target.html'><img src='btn.png'></a>.",
          "marks": 4,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "What steps are required to publish a website on the Internet?",
          "key": "1) Obtain domain name registration, 2) Purchase web hosting server space, 3) Upload website files via FTP to the server.",
          "marks": 4,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        }
      ],
      "longQuestions": [
        {
          "q": "Describe the basic structural layout of an HTML document and explain all tags required in the skeleton.",
          "marks": 8,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        },
        {
          "q": "Explain HTML frames and framesets in detail with attributes (cols, rows, noresize, scrolling) and a multi-frame example.",
          "marks": 8,
          "chapter": "Unit 7: World Wide Web and HTML",
          "source": "slo"
        }
      ]
    },
    "formulas": [
      {
        "name": "Basic HTML Skeleton",
        "formula": "<!DOCTYPE html>\n<html>\n  <head><title>Title</title></head>\n  <body><!-- Content --></body>\n</html>",
        "note": "Standard HTML5 document structural template."
      },
      {
        "name": "Hyperlink Syntax",
        "formula": "<a href=\"URL\" target=\"_blank\">Link Text</a>",
        "note": "Anchor tag syntax for internal and external navigation."
      },
      {
        "name": "Image Tag Syntax",
        "formula": "<img src=\"file.jpg\" width=\"px\" height=\"px\" alt=\"Desc\">",
        "note": "Embedded graphical media specification."
      },
      {
        "name": "Table Cell Merging",
        "formula": "<td colspan=\"N\"> (Horizontal) | <td rowspan=\"N\"> (Vertical)",
        "note": "HTML table multi-cell merging attributes."
      }
    ],
    "numericals": [
      {
        "statement": "Write HTML markup to display the chemical formula for sulfuric acid: H2SO4 with proper subscripts.",
        "solution": "HTML Code:\nH<sub>2</sub>SO<sub>4</sub>\nOutput rendered in browser:\nH₂SO₄"
      }
    ],
    "englishSummary": "Unit 7 covers the World Wide Web and HyperText Markup Language (HTML). It defines essential WWW terminology (web pages, websites, web browsers, URLs, search engines, web servers, and hosting). It explores website categories, basic HTML document structure, text formatting tags (headings, paragraphs, fonts, sub/superscript), ordered and unordered lists, image inclusion, hyperlinks, tables (cell merging with colspan/rowspan), frames, and publishing websites.",
    "urduSummary": "یونٹ 7 ورلڈ وائڈ ویب (WWW) اور ایچ ٹی ایم ایل (HTML) پر مبنی ہے۔ اس میں ویب اصطلاحات (ویب پیج، ویب سائٹ، براؤزر، یو آر ایل، سرچ انجن، ویب ہوسٹنگ) اور ویب سائٹس کی اقسام بیان کی گئی ہیں۔ HTML پیج کی بنیادی ساخت، ٹیکسٹ فارمیٹنگ ٹیگز (ہیڈنگز، پیراگراف، بولڈ، اٹیلک، سب/سپر سکرپٹ)، لسٹس (نمبر والی اور بلٹ والی)، تصاویر شامل کرنے، لنکس (Hyperlinks)، ٹیبلز (colspan اور rowspan)، فریمز، اور ویب سائٹ کو انٹرنیٹ پر اپلوڈ کرنے کے مراحل کی مکمل وضاحت ہے۔",
    "topics": [
      {
        "sectionNum": "7.1",
        "title": "Introduction to World Wide Web",
        "content": "7.1.1 Terms Related to WWW:\n• World Wide Web (WWW): A global network of interconnected hypertext documents accessible via the Internet.\n• Web Page: An electronic document written in HTML containing text, images, hyperlinks, and multimedia.\n• Website: A collection of related web pages hosted together on a web server under a common domain name.\n• Web Server: A specialized computer connected to the Internet that stores web pages and serves them to client computers upon request.\n• Web Browser: Application software that enables users to locate, retrieve, and view web pages (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera).\n• URL (Uniform Resource Locator): The global address of a resource on the Internet (e.g., https://www.kptbb.gov.pk).\n• Search Engine: A web-based tool that searches the Internet for documents matching user keywords (Google, Bing, Yahoo).\n• Home Page: The introductory or main front page of a website that opens first.\n\n7.1.2 Types of Websites:\n1. Web Portals: Gateway websites offering varied services (email, search, news, weather) like Yahoo, MSN.\n2. Informational Websites: Provide factual knowledge and encyclopedic content (Wikipedia, Encyclopedia.com).\n3. News Websites: Deliver current news and journalism (BBC Urdu, Dawn, Geo News).\n4. Business & E-Commerce Websites: Promote commercial services and online shopping (Daraz.pk, Amazon).\n5. Educational Websites: Deliver online learning, tutorials, and courses (Khan Academy, Virtual University).\n6. Entertainment Websites: Offer multimedia, music, movies, and online games (YouTube, Netflix).\n7. Social Networking Websites: Connect people and facilitate communication (Facebook, Twitter/X, Instagram).",
        "keyPoints": [
          "WWW is the global collection of interconnected hypertext web documents.",
          "URL is the unique web address of a file or site.",
          "Web browser retrieves and renders HTML pages for human viewing."
        ]
      },
      {
        "sectionNum": "7.2",
        "title": "Introduction to HTML & Structure",
        "content": "7.2.1 HyperText Markup Language (HTML):\nHTML is the standard markup language used to design and structure web pages. It uses tags enclosed in angle brackets (< >) to instruct browsers how to display text, images, and links.\n\n7.2.2 Creating and Displaying HTML Documents:\nHTML documents are plain text files saved with .html or .htm extension. Created using text editors (Notepad, Notepad++) and viewed using any web browser.\n\n7.2.3 HTML Tags and Elements:\n• Container (Paired) Tags: Have opening and closing tags. Content is placed between them. Example: <p>This is a paragraph.</p>\n• Empty (Unpaired) Tags: Do not have closing tags. Example: <br>, <img>, <hr>.\n• Attributes: Provide additional properties to tags, written inside the opening tag: <tag attribute=\"value\">.\n\n7.2.4 Standard HTML Structure:\n<html>\n<head>\n    <title>My Web Page</title>\n</head>\n<body>\n    <!-- Content visible to users -->\n</body>\n</html>.",
        "keyPoints": [
          "HTML stands for HyperText Markup Language.",
          "Container tags have opening and closing tags; Empty tags stand alone.",
          "Document structure consists of <html>, <head>, <title>, and <body>."
        ]
      },
      {
        "sectionNum": "7.3",
        "title": "Text Formatting in HTML",
        "content": "7.3.1 Headings in HTML:\nSix levels of headings: <h1> (largest) to <h6> (smallest).\n\n7.3.2 Paragraph and Formatting Tags:\n• <p>: Defines a paragraph.\n• <br>: Inserts a line break without starting a new paragraph.\n• <hr>: Inserts a horizontal thematic dividing line.\n• <b>: Bold text.\n• <i>: Italic text.\n• <u>: Underline text.\n• <sup>: Superscript text (e.g., X<sup>2</sup> -> X²).\n• <sub>: Subscript text (e.g., H<sub>2</sub>O -> H₂O).\n• <center>: Centers content horizontally.\n• <font>: Specifies font attributes (size, color, face).",
        "keyPoints": [
          "<h1> is largest heading; <h6> is smallest heading.",
          "<sup> creates superscripts; <sub> creates subscripts.",
          "<br> forces a line break; <p> creates paragraph blocks."
        ]
      },
      {
        "sectionNum": "7.4",
        "title": "Lists, Images & Hyperlinks",
        "content": "7.4.1 Lists in HTML:\n1. Ordered List (<ol>): Numbered list using <li> tags. Type attribute: 1, A, a, I, i.\n2. Unordered List (<ul>): Bulleted list using <li> tags. Type attribute: disc, circle, square.\n3. Definition List (<dl>): Consists of terms (<dt>) and descriptions (<dd>).\n4. Nested Lists: A list placed inside another list item.\n\n7.4.2 Images in HTML (<img> Tag):\nEmpty tag used to embed images. Attributes:\n• src: Specifies image file path/URL.\n• width / height: Sizing in pixels or percentage.\n• alt: Alternative text if image fails to load.\n• border: Specifies border thickness.\n\n7.4.3 Colors and Backgrounds:\n• <body bgcolor=\"color_name_or_hex\" text=\"color\">: Sets page background and text colors.\n• <body background=\"image.jpg\">: Applies a background wallpaper image.\n\n7.4.4 Hyperlinks (<a> Anchor Tag):\nConnects web pages together.\n• External Link: <a href=\"https://www.google.com\">Visit Google</a>\n• Internal Link: Links to an anchor id on the same page.\n• Graphical Link: Nesting an <img> inside an <a> tag creates a clickable image link:\n<a href=\"home.html\"><img src=\"logo.png\" alt=\"Home\"></a>.",
        "keyPoints": [
          "<ol> creates numbered lists; <ul> creates bulleted lists.",
          "<img> attributes include src, width, height, and alt.",
          "<a> anchor tag with href attribute creates text and graphical hyperlinks."
        ]
      },
      {
        "sectionNum": "7.5",
        "title": "Tables, Frames & Web Hosting",
        "content": "7.5.1 Creating Tables in HTML:\nTables organize data into rows and columns:\n• <table>: Defines the table container.\n• <tr>: Defines a table row.\n• <th>: Defines a table header cell (bold and centered).\n• <td>: Defines a standard table data cell.\nAttributes: border, cellpadding, cellspacing, width, align, bgcolor.\nCell Merging:\n• colspan: Merges multiple columns horizontally across a row.\n• rowspan: Merges multiple rows vertically across a column.\n\n7.5.2 Creating Frames (<frameset> and <frame>):\nDivides the browser window into multiple independent rectangular sub-windows, each displaying a separate HTML document.\nAttributes: cols=\"50%,50%\" (vertical split) or rows=\"30%,70%\" (horizontal split).\n\n7.5.3 Web Hosting and Publishing:\n1. Domain Name Registration: Registering a unique web address (e.g. www.mysite.pk).\n2. Web Hosting: Purchasing server storage space with Internet connectivity to store site files.\n3. Uploading Site Files: Transferring HTML pages and media via FTP (File Transfer Protocol) client software to make the site live.",
        "keyPoints": [
          "Tables use <table>, <tr>, <th>, and <td> tags.",
          "colspan merges columns; rowspan merges rows.",
          "Web hosting makes files accessible worldwide on web servers."
        ]
      }
    ],
    "textbookExercise": {
      "mcqs": [
        {
          "q": "Internet address which identifies a website is called?",
          "options": [
            "Web page",
            "Website",
            "Web server",
            "URL"
          ],
          "ans": 3,
          "explanation": "URL (Uniform Resource Locator) is the unique Internet address of a website."
        },
        {
          "q": "A collection of web pages hosted on a web server is called?",
          "options": [
            "Web address",
            "Website",
            "Home page",
            "Web browser"
          ],
          "ans": 1,
          "explanation": "A website is a collection of related web pages hosted on a web server."
        },
        {
          "q": "Which language is used for creating web pages?",
          "options": [
            "HTML",
            "C language",
            "URL",
            "Web browser"
          ],
          "ans": 0,
          "explanation": "HTML (HyperText Markup Language) is the primary markup language for web pages."
        },
        {
          "q": "Text or image in a web page that links it to another web page is called?",
          "options": [
            "Web link",
            "Browser link",
            "Hyperlink",
            "Search link"
          ],
          "ans": 2,
          "explanation": "A hyperlink connects one web resource to another."
        },
        {
          "q": "Which of the following refers to uploading of web pages to a web server so that others can access it?",
          "options": [
            "Configuring web pages",
            "Web surfing",
            "Installing website",
            "Web hosting"
          ],
          "ans": 3,
          "explanation": "Web hosting provides server hosting and internet access for website files."
        }
      ],
      "shortQuestions": [
        {
          "q": "What is a website? Describe different types of websites with examples.",
          "ans": "A website is a collection of related, interlinked web pages hosted under a common domain name.\nTypes:\n1. Informational Websites: Deliver knowledge (Wikipedia).\n2. News Websites: Broadcast current events (BBC, Dawn).\n3. Business/E-commerce Websites: Sell goods online (Daraz.pk).\n4. Educational Websites: Online learning and tutorials (Khan Academy).\n5. Social Networking Websites: Connect people globally (Facebook, Twitter)."
        },
        {
          "q": "Write the HTML tags for the following:\ni) Paragraph\nii) Heading\niii) Bold\niv) Underline\nv) Italic\nvi) Center text\nvii) Superscript\nviii) Subscript\nix) Font size and color",
          "ans": "i) Paragraph: <p> ... </p>\nii) Heading: <h1> ... </h1> to <h6> ... </h6>\niii) Bold: <b> ... </b>\niv) Underline: <u> ... </u>\nv) Italic: <i> ... </i>\nvi) Center text: <center> ... </center>\nvii) Superscript: <sup> ... </sup>\nviii) Subscript: <sub> ... </sub>\nix) Font: <font size=\"4\" color=\"blue\" face=\"Arial\"> ... </font>"
        },
        {
          "q": "Write HTML code to insert an image with width of 250 pixels and height 150 pixels.",
          "ans": "<img src=\"picture.jpg\" width=\"250\" height=\"150\" alt=\"Sample Image\">"
        },
        {
          "q": "Describe how background color and background image are applied to a web page.",
          "ans": "• Background Color: Set using bgcolor attribute in body tag:\n<body bgcolor=\"lightblue\">\n• Background Image: Set using background attribute in body tag:\n<body background=\"wallpaper.jpg\">"
        },
        {
          "q": "Create an HTML document that contains a graphical hyperlink.",
          "ans": "<html>\n<head><title>Graphical Link</title></head>\n<body>\n    <a href=\"https://www.google.com\">\n        <img src=\"google_logo.png\" width=\"200\" height=\"80\" alt=\"Google Search\">\n    </a>\n</body>\n</html>"
        }
      ],
      "longQuestions": [
        {
          "q": "Create a complete HTML document that contains both ordered and unordered lists with nested list items.",
          "ans": "<!DOCTYPE html>\n<html>\n<head>\n    <title>Curriculum Lists</title>\n</head>\n<body>\n    <h2>Class 9 Computer Science Syllabus</h2>\n    <ol type=\"1\">\n        <li>Programming Fundamentals\n            <ul type=\"square\">\n                <li>Programming in C</li>\n                <li>Input/Output Functions</li>\n                <li>Control Structures</li>\n            </ul>\n        </li>\n        <li>Hardware and Logic\n            <ul type=\"circle\">\n                <li>Logic Gates</li>\n                <li>Karnaugh Maps</li>\n            </ul>\n        </li>\n        <li>Web Technologies\n            <ul type=\"disc\">\n                <li>HTML Text Formatting</li>\n                <li>Tables and Frames</li>\n            </ul>\n        </li>\n    </ol>\n</body>\n</html>"
        },
        {
          "q": "Explain HTML Tables in detail with tags (table, tr, th, td) and write code to display a class timetable using colspan and rowspan.",
          "ans": "HTML Table Components:\n• <table>: Encloses the entire table.\n• <tr>: Represents a horizontal row.\n• <th>: Defines a bold, centered header cell.\n• <td>: Defines a regular data cell.\n• colspan: Merges multiple adjacent columns horizontally.\n• rowspan: Merges multiple rows vertically.\n\nTimetable Code Example:\n<!DOCTYPE html>\n<html>\n<head><title>Class Timetable</title></head>\n<body>\n    <table border=\"1\" cellpadding=\"8\" cellspacing=\"0\">\n        <tr>\n            <th>Day</th>\n            <th>Period 1 (9:00 - 10:00)</th>\n            <th>Period 2 (10:00 - 11:00)</th>\n            <th>11:00 - 11:30</th>\n            <th>Period 3 (11:30 - 12:30)</th>\n        </tr>\n        <tr>\n            <td>Monday</td>\n            <td>Computer Science</td>\n            <td>Mathematics</td>\n            <td rowspan=\"5\" align=\"center\"><b>B<br>R<br>E<br>A<br>K</b></td>\n            <td>Physics</td>\n        </tr>\n        <tr>\n            <td>Tuesday</td>\n            <td>Computer Science</td>\n            <td>Chemistry</td>\n            <td>English</td>\n        </tr>\n    </table>\n</body>\n</html>"
        }
      ]
    },
    "sloMcqs": [
      {
        "q": "Which tag is used to create a numbered list in HTML?",
        "opts": [
          "<ul>",
          "<ol>",
          "<dl>",
          "<list>"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which attribute specifies the destination URL in an anchor tag?",
        "opts": [
          "src",
          "link",
          "href",
          "target"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which tag is an empty (unpaired) tag?",
        "opts": [
          "<p>",
          "<b>",
          "<br>",
          "<html>"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which tag defines the largest heading in HTML?",
        "opts": [
          "<head>",
          "<h6>",
          "<h1>",
          "<heading>"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which attribute merges two or more columns in an HTML table?",
        "opts": [
          "rowspan",
          "colspan",
          "cellpadding",
          "merge"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which tag is used to insert a table header cell?",
        "opts": [
          "<td>",
          "<th>",
          "<tr>",
          "<header>"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "The title of a web page appears in the:",
        "opts": [
          "Body area",
          "Browser title bar / tab",
          "Status bar",
          "Footer"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which tag is used to create a horizontal line across the page?",
        "opts": [
          "<line>",
          "<br>",
          "<hr>",
          "<border>"
        ],
        "ans": 2,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which attribute of <img> tag provides alternative text for accessibility?",
        "opts": [
          "title",
          "alt",
          "text",
          "name"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Which HTML tag is used to display mathematical superscript like X²?",
        "opts": [
          "<sub>",
          "<sup>",
          "<super>",
          "<up>"
        ],
        "ans": 1,
        "marks": 1,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      }
    ],
    "sloSq": [
      {
        "q": "What is the difference between container tags and empty tags in HTML?",
        "key": "Container tags have both opening and closing tags (<p>...</p>) enclosing content, while empty tags (<br>, <img>, <hr>) do not have closing tags.",
        "marks": 4,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Explain the difference between ordered and unordered lists in HTML.",
        "key": "Ordered lists (<ol>) display items in sequential numbered or alphabetical order. Unordered lists (<ul>) display items with graphical bullets.",
        "marks": 4,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "What is the purpose of cellpadding and cellspacing attributes in HTML tables?",
        "key": "cellpadding sets the space between cell wall and cell content; cellspacing sets the distance between individual adjacent cells.",
        "marks": 4,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "How is a graphical hyperlink created in HTML?",
        "key": "By placing an <img> tag inside the opening and closing anchor tags: <a href='target.html'><img src='btn.png'></a>.",
        "marks": 4,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "What steps are required to publish a website on the Internet?",
        "key": "1) Obtain domain name registration, 2) Purchase web hosting server space, 3) Upload website files via FTP to the server.",
        "marks": 4,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      }
    ],
    "sloLq": [
      {
        "q": "Describe the basic structural layout of an HTML document and explain all tags required in the skeleton.",
        "marks": 8,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      },
      {
        "q": "Explain HTML frames and framesets in detail with attributes (cols, rows, noresize, scrolling) and a multi-frame example.",
        "marks": 8,
        "chapter": "Unit 7: World Wide Web and HTML",
        "source": "slo"
      }
    ]
  }
]
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DATA.compChapters;
}

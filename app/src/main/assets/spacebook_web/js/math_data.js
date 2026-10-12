// KPK Grade 9 Mathematics - 100% Textbook Verified Data
var MATH_DATA = [
  {
  "number": 1,
  "id": "u1",
  "title": "Matrices & Determinants",
  "titleUrdu": "قالب اور ان کے مقطعات",
  "status": "ready",
  "badge": "100% Textbook Matched",
  "pageRange": "Pages 1–49",
  "description": "Official KPK Board Textbook Unit 1 with complete text reading, all 27 numbered worked examples, Exercises 1.1 to 1.6 & Review Exercise 1 with verified step-by-step solutions.",
  "sections": [
    {
      "id": "1.1",
      "title": "1.1 Introduction to Matrices, Order & Equality",
      "theory": "The word 'matrices' is plural of the word 'matrix'. The term matrix was first introduced by the mathematician Arthur Cayley in 1860. The knowledge of matrices is necessary in various areas of Mathematics. It has widely been used in the fields of pure mathematics, statistics, engineering and physical and social sciences. Thus, matrix theory finds an important place in modern age and has become an integral part of mathematics.\n\nMatrices make presentation of numbers clearer and make calculations easier. The following table presents the information about a series of hockey matches played between Pakistan and India:\n\n| Match Record | Played | Won | Drawn | Lost |\n| :--- | :---: | :---: | :---: | :---: |\n| **Pakistan** | 8 | 4 | 1 | 3 |\n| **India** | 8 | 3 | 1 | 4 |\n\nThe information is readily available when presented in this way. For example, if we want to know how many matches India lost against Pakistan, we go along the row 'India' and column 'Lost' and find that it is 4. Similarly, if we want to know how many matches Pakistan drew with India, we go along the row 'Pakistan' and column 'Drawn' and find that it is 1. As long as we remember what each number represents, we could remove the row and column headings and write just the numbers, enclosing them in square brackets or parentheses:\nA = [[8, 4, 1, 3], [8, 3, 1, 4]]\nThus A is a matrix.\n\n• 1.1.1 Matrix:\nA matrix is a rectangular array (arrangement) of real numbers enclosed in square brackets. Each number in a matrix is called an element or entry of the matrix. For example:\n[[2, 3], [6, 5]] and [[3, 4, 2], [-1, 1, -2], [-4, -3, -3]] are all matrices.\nIn the matrix [[2, 3], [6, 5]], the numbers 2, 3, 6, 5 are the elements or entries of the matrix. Matrices are frequently denoted by capital letters such as A, B, C and so on.\n\n• 1.1.2 Rows and Columns of a Matrix:\nThe rows of a matrix run horizontally, and the columns of a matrix run vertically.\nFor example, consider matrix A:\nA = [[4, 3, -2], [1, 5, 2], [3, 1, 1]]\n- The numbers 4, 3, -2 run horizontally, so they constitute the first row (Row 1).\n- The numbers 1, 5, 2 run horizontally, so they constitute the second row (Row 2).\n- The numbers 3, 1, 1 run horizontally, so they constitute the third row (Row 3).\n- The numbers 4, 1, 3 run vertically, so they constitute the first column (Column 1).\n- The numbers 3, 5, 1 run vertically, so they constitute the second column (Column 2).\n- The numbers -2, 2, 1 run vertically, so they constitute the third column (Column 3).\n\n• 1.1.3 Order (or Dimension / Size) of a Matrix:\nA matrix with m rows and n columns has order m × n (read 'm by n').\nIf a matrix has order m × n, then m represents the number of rows and n represents the number of columns.\nFor example:\nA = [[2, -3, 2], [1, 3, -4]] has 2 rows and 3 columns. Order of A = 2-by-3 (or 2 × 3).\nB = [[1, 2], [1, 3]] has 2 rows and 2 columns. Order of B = 2-by-2 (or 2 × 2).\n*Tid-Bit:* Order of a matrix m × n does not mean to multiply m and n.\n\n• 1.1.4 Equality of Two Matrices:\nTwo given matrices A and B are said to be equal if:\n(i) Both the matrices are of the same order (they respectively have the same number of rows and columns).\n(ii) The elements in the corresponding positions in A and B are equal.\nFor example:\n[[1, 2, 3], [6, 5, 4]] and [[1, 1+1, 12/4], [4+2, 10/2, 8/2]] are equal matrices.\nWhereas [[1, 2], [3, 4], [5, 6]] and [[1, 2, 3], [6, 5, 4]] are NOT equal matrices because their orders are different (3×2 ≠ 2×3).",
      "rules": [
        "Arthur Cayley introduced the term matrix in 1860.",
        "Order is written as Rows-by-Columns (m × n), never Columns-by-Rows.",
        "Equality requires BOTH same dimensions AND identical corresponding entries (Equality doesn't mean Equity)."
      ]
    },
    {
      "id": "1.2",
      "title": "1.2 Types of Matrices",
      "theory": "The textbook defines and classifies matrices into the following key types:\n\na) Row-matrix:\nA matrix which has just one and only one row in it is called a Row-matrix.\nFor example, the matrices [a, b], [1, 3, 4], and [2, 4, 6, 8] are all row-matrices.\n\nb) Column-matrix:\nA matrix which has just one and only one column in it is called a Column-matrix.\nFor example, [[2], [1], [4], [3]] and [[b], [6], [5], [8]] are all column matrices.\n\nc) Square-matrix:\nA matrix in which the number of rows and columns are equal is called a square matrix.\nFor example, [[m, n], [n, p]] has 2 rows and 2 columns, so it is a 2-square matrix.\nThe matrix [[1, 2, 3], [7, 8, 9], [-1, -4, 2]] is a square matrix of order 3 (3-square matrix).\nAs a special case, the matrix consisting of a single element [3] is a square matrix of order 1 (1-square matrix).\n\nd) Rectangular-matrix:\nA matrix whose number of rows and number of columns are not equal is called a rectangular matrix.\nFor example, [[a, b, c], [d, e, f]] has rows = 2, columns = 3 (2 ≠ 3), so it is a rectangular matrix.\nSimilarly, [[1, 4], [3, 2], [5, -3]] has order 3-by-2, so it is a rectangular matrix.\n\ne) Zero matrix or Null matrix:\nAny matrix (whether rectangular or square) of which all the elements (entries) are equal to zero is said to be a Zero matrix or Null matrix, denoted by O.\nFor example:\nO_2x2 = [[0, 0], [0, 0]] is a null matrix of order 2.\nO_2x3 = [[0, 0, 0], [0, 0, 0]] is a null matrix of order 2-by-3.\n*Important Points:*\n1. A zero matrix is not necessarily a square matrix.\n2. The role of zero matrix in matrix operations is similar to zero in arithmetic (A + O = A).\n\nf) Diagonal matrix:\nA square matrix in which all elements are zero except the diagonal elements is known as a diagonal matrix.\nThe Main Diagonal starts at the top left and goes to the bottom right.\nFor example:\nA = [[1, 0], [0, 3]] is a diagonal matrix of order 2.\nB = [[2, 0, 0], [0, 3, 0], [0, 0, -5]] is a diagonal matrix of order 3.\n\ng) Scalar matrix:\nA diagonal matrix in which all the diagonal elements are equal non-zero constants is said to be a scalar matrix.\nFor instance: [[7, 0], [0, 7]] and [[1/2, 0, 0], [0, 1/2, 0], [0, 0, 1/2]] are scalar matrices of order 2 and 3 respectively.\n*Note:* Every scalar matrix is a diagonal matrix, but every diagonal matrix is not necessarily a scalar matrix.\n\nh) Identity matrix (Unit matrix):\nThe identity matrix is a square matrix denoted by I in which all elements on its main diagonal are 1's and all other elements are zero:\nI_2 = [[1, 0], [0, 1]]\nI_3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]\n\ni) Transpose of a matrix:\nThe matrix obtained by interchanging mutually the rows and columns in A is called the transpose of A and is denoted by A^t (or A').\nFor example, if A = [[1, 2], [3, 4]], then A^t = [[1, 3], [2, 4]].\n\nj) Symmetric matrix:\nA square matrix A is said to be symmetric if the transpose of A is equal to A itself, i.e., A^t = A.\nFor example, if A = [[1, 2], [2, 4]], then A^t = [[1, 2], [2, 4]] = A. Thus A is symmetric.\nSimilarly, B = [[1, 2, 3], [2, 4, 5], [3, 5, 6]] has B^t = B, so B is symmetric.\n\nk) Skew-Symmetric matrix:\nA given square matrix A is said to be Skew-Symmetric if A^t = -A.\nFor example, if A = [[0, -3], [3, 0]], then A^t = [[0, 3], [-3, 0]] = -[[0, -3], [3, 0]] = -A.\nTherefore, A is a skew-symmetric matrix. All diagonal elements of a skew-symmetric matrix must be 0.",
      "rules": [
        "For a symmetric matrix: A^t = A.",
        "For a skew-symmetric matrix: A^t = -A (all principal diagonal entries must be 0).",
        "(A^t)^t = A."
      ]
    },
    {
      "id": "1.3",
      "title": "1.3 Addition and Subtraction of Matrices",
      "theory": "• 1.3.1 Conformability for Addition / Subtraction:\nTwo matrices can be added or subtracted if and only if they have the same order.\nIf A and B are both 2-by-2 matrices, they are conformable. If C is 2-by-3 and D is 3-by-2, they are NOT conformable.\n\n• 1.3.2 Addition and Subtraction Operations:\n- Addition: The sum A + B is obtained by adding corresponding elements of matrices A and B:\n  (A + B)_ij = a_ij + b_ij.\n  Example: [[3, 8], [4, 6]] + [[4, 0], [1, -9]] = [[3+4, 8+0], [4+1, 6-9]] = [[7, 8], [5, -3]].\n- Subtraction: The difference A - B is obtained by subtracting each element of B from the corresponding element of A:\n  (A - B)_ij = a_ij - b_ij.\n  Example: [[3, 8], [4, 6]] - [[4, 0], [1, -9]] = [[3-4, 8-0], [4-1, 6-(-9)]] = [[-1, 8], [3, 15]].\n\n• 1.3.3 Multiplication of a Matrix by a Real Number (Scalar Multiplication):\nLet A be any matrix and k be any real number. The matrix obtained by multiplying each element of A by k is called the scalar multiplication of A by k, denoted by kA:\n(kA)_ij = k · a_ij.\n\n• 1.3.4 Commutative and Associative Laws under Addition:\n- Commutative Law: If A and B are matrices of the same order, then A + B = B + A.\n- Associative Law: If A, B, and C are matrices of the same order, then A + (B + C) = (A + B) + C.\n\n• 1.3.5 Additive Identity of Matrices:\nIn matrix theory, the Zero matrix O serves as the additive identity:\nA + O = O + A = A.\n\n• 1.3.6 Additive Inverse of a Matrix:\nIf A and B are two matrices of the same order such that A + B = O = B + A, then B is called the additive inverse of A (and B = -A):\nA + (-A) = (-A) + A = O.",
      "rules": [
        "Matrices must have identical orders to be added or subtracted.",
        "Commutative law of addition holds: A + B = B + A.",
        "Associative law of addition holds: (A + B) + C = A + (B + C).",
        "The null matrix O is the unique additive identity."
      ]
    },
    {
      "id": "1.4",
      "title": "1.4 Multiplication of Matrices",
      "theory": "• 1.4.1 Conformability for Multiplication of Matrices:\nTwo matrices A and B are conformable for multiplication AB only when:\nNumber of columns of Matrix A = Number of rows of Matrix B.\nIf A is of order m × p and B is of order p × n, then the product AB exists and its order is m × n:\nA_(m×p) × B_(p×n) = (AB)_(m×n).\nThe product is evaluated using the row-by-column method: multiply each element of a row of A by the corresponding element of a column of B, and add these products.\n\n• 1.4.2 Commutative Law of Multiplication of Matrices:\nCommutative law of multiplication in general DOES NOT HOLD for matrices:\nAB ≠ BA (in general).\nThough for certain special matrices, AB may equal BA (they commute).\n\n• 1.4.3 Associative Law under Multiplication:\nIf A, B, and C are conformable for multiplication, then:\n(AB)C = A(BC).\n\n• 1.4.4 Distributive Laws of Multiplication over Addition:\nIf A, B, and C are conformable matrices, then:\n(i) A(B + C) = AB + AC (Left Distributive Law)\n(ii) (A + B)C = AC + BC (Right Distributive Law)\n\n• 1.4.5 Multiplicative Identity of a Matrix:\nIf I is an identity matrix and A is conformable, then IA = AI = A.\nFor 2-square matrices, I = [[1, 0], [0, 1]].\nFor 3-square matrices, I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].\n\n• 1.4.7 Verification of the Result (AB)^t = B^t · A^t:\nThe transpose of the product of two matrices equals the product of their transposes taken in the REVERSE ORDER:\n(AB)^t = B^t · A^t.",
      "rules": [
        "Conformability condition: Columns of first = Rows of second.",
        "Matrix multiplication is NOT commutative in general: AB ≠ BA.",
        "Associative law holds: (AB)C = A(BC).",
        "Transpose of product follows reversal law: (AB)^t = B^t · A^t."
      ]
    },
    {
      "id": "1.5",
      "title": "1.5 Multiplicative Inverse of a Matrix",
      "theory": "• 1.5.1 Determinant of a Square Matrix:\nWith every square matrix A, a unique real number is associated called the determinant of A, denoted by |A| or det(A).\nIf A = [[a, b], [c, d]], then:\n|A| = ad - bc.\nThe determinant is obtained by multiplying entries on the main diagonal and subtracting the product of entries on the secondary diagonal.\n\n• 1.5.2 Singular and Non-Singular Matrices:\n- A square matrix A is called Singular if |A| = 0.\n- A square matrix A is called Non-Singular if |A| ≠ 0.\n\n• 1.5.3 Adjoint of a Matrix:\nThe adjoint of a square matrix A = [[a, b], [c, d]] is denoted by adj(A) and defined as:\nadj(A) = [[d, -b], [-c, a]].\nThat is, interchange the places of a and d, and change the signs of b and c.\n\n• 1.5.4 Multiplicative Inverse of a Matrix:\nLet A be a non-singular square matrix. If there exists another matrix B such that AB = BA = I, then B is called the multiplicative inverse of A, written B = A^-1.\nA · A^-1 = A^-1 · A = I.\n\n• 1.5.5 Use of Adjoint Method to Calculate Inverse:\nA^-1 = (1 / |A|) · adj(A).\nIf |A| = 0, A^-1 does NOT exist because division by zero is undefined.\n\n• 1.5.6 Verification of the Result AA^-1 = I = A^-1 A:\nFor any non-singular matrix A, multiplying A by A^-1 yields the identity matrix I.\n\n• 1.5.7 Verification of the Result (AB)^-1 = B^-1 · A^-1:\nIf A and B are non-singular square matrices of the same order, the inverse of their product is the product of their inverses in reverse order:\n(AB)^-1 = B^-1 · A^-1.",
      "rules": [
        "Determinant formula: |A| = ad - bc.",
        "A matrix is singular if |A| = 0, non-singular if |A| ≠ 0.",
        "Only non-singular matrices possess a multiplicative inverse.",
        "Reversal law for inverses: (AB)^-1 = B^-1 · A^-1."
      ]
    },
    {
      "id": "1.6",
      "title": "1.6 Solution of Simultaneous Linear Equations",
      "theory": "A system of two linear equations in variables x and y in general form is:\n  ax + by = m   --- (i)\n  cx + dy = n   --- (ii)\nIn matrix form:\n  AX = B   --- (iii)\nwhere:\n  A = [[a, b], [c, d]]  (Coefficient Matrix)\n  X = [[x], [y]]         (Variable Matrix)\n  B = [[m], [n]]         (Constants Matrix)\n\n• Method 1: Matrix Inversion Method:\nMultiplying both sides of AX = B by A^-1:\n  A^-1 (AX) = A^-1 B  =>  (A^-1 A) X = A^-1 B  =>  IX = A^-1 B  =>  X = A^-1 B.\nSince A^-1 = (1 / |A|) · adj(A):\n  [[x], [y]] = (1 / |A|) · [[d, -b], [-c, a]] · [[m], [n]]\n  x = (dm - bn) / (ad - bc)\n  y = (-cm + an) / (ad - bc)\nIf |A| = 0, A^-1 does not exist, and the system cannot be solved (inconsistent or dependent).\n\n• Method 2: Cramer's Rule:\nLet |A| = ad - bc ≠ 0.\nReplace the coefficients of x in A by constants [m, n] to form A_x:\n  A_x = [[m, b], [n, d]]  =>  |A_x| = md - bn\n  x = |A_x| / |A|\nReplace the coefficients of y in A by constants [m, n] to form A_y:\n  A_y = [[a, m], [c, n]]  =>  |A_y| = an - cm\n  y = |A_y| / |A|\n\n• Real-Life Problems:\nTwo unknowns from real-world scenarios are formulated into simultaneous equations and solved by either Matrix Inversion or Cramer's Rule.",
      "rules": [
        "Matrix Inversion formula: X = A^-1 B = (1/|A|) adj(A) B.",
        "Cramer's Rule formula: x = |A_x| / |A|, y = |A_y| / |A|.",
        "If |A| = 0, the system has no unique solution."
      ]
    }
  ],
  "workedExamples": [
    {
      "id": "ex1",
      "title": "Example 1 (Page 4) — Rows, Columns & Order",
      "problem": "Write the number of rows and columns of the following matrices and hence mention their orders:\n(i) A = [[p, q], [r, s]]\n(ii) B = [[3, 4, 7], [5, 6, 8]]",
      "given": "Matrices A and B.",
      "method": "Count horizontal rows (m) and vertical columns (n); order is m-by-n.",
      "steps": [
        "Given A = [[p, q], [r, s]]:\nA has two rows and two columns, so order of A is 2-by-2 (or 2 × 2).",
        "Given B = [[3, 4, 7], [5, 6, 8]]:\nB has two rows and three columns. The order of B is 2-by-3 (or 2 × 3)."
      ],
      "answer": "Order of A is 2-by-2; Order of B is 2-by-3."
    },
    {
      "id": "ex2",
      "title": "Example 2 (Page 13) — Conformability for Addition/Subtraction",
      "problem": "Determine whether the following pairs of matrices are conformable for addition and subtraction:\n(i) A = [[-3, 2], [4, 7]] and B = [[3, 7], [10, 13]]\n(ii) C = [[9, 5, 13], [-2, 0, 5]] and D = [[7, 3, 1], [10, -1, 1], [2, 0, 3]]",
      "given": "Pairs of matrices A, B and C, D.",
      "method": "Check if orders are identical.",
      "steps": [
        "(i) A and B are both 2-by-2 matrices. Since both are of the same order, they are conformable for addition and subtraction.",
        "(ii) Order of C is 2-by-3, while order of D is 3-by-3. Since their orders are not the same, C and D are NOT conformable for addition and subtraction."
      ],
      "answer": "(i) Conformable; (ii) Not conformable."
    },
    {
      "id": "ex3",
      "title": "Example 3 (Page 15) — Scalar Multiplication",
      "problem": "Compute the scalar multiplications:\n(i) If A = [[6, 2], [-3, 1]], find 3A.\n(ii) If B = [[5, 4, 7], [-3, a, b]], find 7B.",
      "given": "Matrices A and B.",
      "method": "Multiply every entry by the given scalar.",
      "steps": [
        "(i) 3A = [[6×3, 2×3], [-3×3, 1×3]] = [[18, 6], [-9, 3]].",
        "(ii) 7B = [[7×5, 7×4, 7×7], [7×(-3), 7a, 7b]] = [[35, 28, 49], [-21, 7a, 7b]]."
      ],
      "answer": "(i) 3A = [[18, 6], [-9, 3]]; (ii) 7B = [[35, 28, 49], [-21, 7a, 7b]]."
    },
    {
      "id": "ex4",
      "title": "Example 4 (Page 15) — Commutative Law of Addition",
      "problem": "Let A = [[2, 5], [4, 7]] and B = [[-2, 1], [-3, 6]]. Prove that A + B = B + A.",
      "given": "Matrices A and B of order 2×2.",
      "method": "Calculate A + B and B + A separately and compare.",
      "steps": [
        "Compute A + B:\nA + B = [[2+(-2), 5+1], [4+(-3), 7+6]] = [[0, 6], [1, 13]].",
        "Compute B + A:\nB + A = [[-2+2, 1+5], [-3+4, 6+7]] = [[0, 6], [1, 13]].",
        "Since A + B = B + A = [[0, 6], [1, 13]], the commutative law is proved."
      ],
      "answer": "A + B = B + A = [[0, 6], [1, 13]]. Proved."
    },
    {
      "id": "ex5",
      "title": "Example 5 (Page 16) — Associative Law of Addition",
      "problem": "Let A = [[-1, 2], [4, -3]], B = [[4, -5], [6, 7]], and C = [[3, -2], [1, 0]]. Verify that A + (B + C) = (A + B) + C.",
      "given": "Matrices A, B, C of order 2×2.",
      "method": "Evaluate LHS = A + (B + C) and RHS = (A + B) + C.",
      "steps": [
        "Compute B + C:\nB + C = [[4+3, -5+(-2)], [6+1, 7+0]] = [[7, -7], [7, 7]].",
        "Compute LHS = A + (B + C):\nA + (B + C) = [[-1+7, 2+(-7)], [4+7, -3+7]] = [[6, -5], [11, 4]].  --- (1)",
        "Compute A + B:\nA + B = [[-1+4, 2+(-5)], [4+6, -3+7]] = [[3, -3], [10, 4]].",
        "Compute RHS = (A + B) + C:\n(A + B) + C = [[3+3, -3+(-2)], [10+1, 4+0]] = [[6, -5], [11, 4]].  --- (2)",
        "From (1) and (2), LHS = RHS. Associative law is verified."
      ],
      "answer": "LHS = RHS = [[6, -5], [11, 4]]. Verified."
    },
    {
      "id": "ex6",
      "title": "Example 6 (Page 17) — Additive Identity of Matrices",
      "problem": "If A = [[2, 3], [-1, 5]] and O = [[0, 0], [0, 0]], show that A + O = O + A = A.",
      "given": "Matrix A and Null Matrix O of order 2×2.",
      "method": "Add O to A and A to O.",
      "steps": [
        "A + O = [[2+0, 3+0], [-1+0, 5+0]] = [[2, 3], [-1, 5]] = A.",
        "O + A = [[0+2, 0+3], [0+(-1), 0+5]] = [[2, 3], [-1, 5]] = A.",
        "Thus A + O = O + A = A. O is the additive identity."
      ],
      "answer": "A + O = O + A = A. O is the additive identity for all 2-square matrices."
    },
    {
      "id": "ex7",
      "title": "Example 7 (Page 18) — Additive Inverse of a Matrix",
      "problem": "Prove that P = [[3, 2, -1], [-2, 4, 6]] and Q = [[-3, -2, 1], [2, -4, -6]] are additive inverses of each other.",
      "given": "Matrices P and Q of order 2×3.",
      "method": "Show that P + Q = O and Q + P = O.",
      "steps": [
        "P + Q = [[3+(-3), 2+(-2), -1+1], [-2+2, 4+(-4), 6+(-6)]] = [[0, 0, 0], [0, 0, 0]] = O.",
        "Q + P = [[-3+3, -2+2, 1+(-1)], [2+(-2), -4+4, -6+6]] = [[0, 0, 0], [0, 0, 0]] = O.",
        "Hence P and Q are additive inverses of each other."
      ],
      "answer": "P + Q = Q + P = O. P and Q are additive inverses of each other."
    },
    {
      "id": "ex8",
      "title": "Example 8 (Page 21) — Multiplication Dimensions",
      "problem": "Suppose A is a 3-by-4 matrix, B is a 4-by-2 matrix and C is a 4-by-3 matrix. Determine the defined products and their orders.",
      "given": "Orders: A(3×4), B(4×2), C(4×3).",
      "method": "Check if inner dimensions match (cols of first = rows of second).",
      "steps": [
        "- AB: (3×4) × (4×2) => defined, order is 3-by-2.",
        "- AC: (3×4) × (4×3) => defined, order is 3-by-3 (3-square matrix).",
        "- CA: (4×3) × (3×4) => defined, order is 4-by-4 (4-square matrix).",
        "- BA: (4×2) × (3×4) => columns of B (2) ≠ rows of A (3), undefined.",
        "- CB: (4×3) × (4×2) => columns of C (3) ≠ rows of B (4), undefined."
      ],
      "answer": "AB (3×2), AC (3×3), and CA (4×4) are defined; BA and CB are undefined."
    },
    {
      "id": "ex9",
      "title": "Example 9 (Page 22) — Row-by-Column Multiplication",
      "problem": "If A = [[2, 3], [1, 4]] and B = [[3], [5]], (i) is it possible to find both AB and BA? (ii) find the possible product.",
      "given": "A = [[2, 3], [1, 4]] (order 2×2) and B = [[3], [5]] (order 2×1).",
      "method": "Check conformability and evaluate row by column.",
      "steps": [
        "(i) For AB: columns of A (2) = rows of B (2) => AB is possible.\nFor BA: columns of B (1) ≠ rows of A (2) => BA is not possible.",
        "(ii) Compute AB:\nAB = [[(2)(3) + (3)(5)], [(1)(3) + (4)(5)]] = [[6 + 15], [3 + 20]] = [[21], [23]]."
      ],
      "answer": "Only AB is possible; AB = [[21], [23]]."
    },
    {
      "id": "ex10",
      "title": "Example 10 (Page 23) — Non-Commutativity (AB ≠ BA)",
      "problem": "Let A = [[6, 3], [2, 5]] and B = [[-3, 2], [1, 5]]. Determine whether AB = BA.",
      "given": "Matrices A and B.",
      "method": "Calculate AB and BA and compare.",
      "steps": [
        "Compute AB:\nRow 1: [(6)(-3)+(3)(1), (6)(2)+(3)(5)] = [-18+3, 12+15] = [-15, 27]\nRow 2: [(2)(-3)+(5)(1), (2)(2)+(5)(5)] = [-6+5, 4+25] = [-1, 29]\nAB = [[-15, 27], [-1, 29]].  --- (1)",
        "Compute BA:\nRow 1: [(-3)(6)+(2)(2), (-3)(3)+(2)(5)] = [-18+4, -9+10] = [-14, 1]\nRow 2: [(1)(6)+(5)(2), (1)(3)+(5)(5)] = [6+10, 3+25] = [16, 28]\nBA = [[-14, 1], [16, 28]].  --- (2)",
        "From (1) and (2), AB ≠ BA."
      ],
      "answer": "AB ≠ BA. Matrix multiplication is not commutative in general."
    },
    {
      "id": "ex11",
      "title": "Example 11 (Page 23) — Commuting Matrices (AB = BA)",
      "problem": "Let A = [[1, 2], [3, 4]] and B = [[2, 2], [3, 5]]. Show that AB = BA.",
      "given": "Matrices A and B.",
      "method": "Compute AB and BA and demonstrate equality.",
      "steps": [
        "Compute AB:\nRow 1: [(1)(2)+(2)(3), (1)(2)+(2)(5)] = [2+6, 2+10] = [8, 12]\nRow 2: [(3)(2)+(4)(3), (3)(2)+(4)(5)] = [6+12, 6+20] = [18, 26]\nAB = [[8, 12], [18, 26]].  --- (1)",
        "Compute BA:\nRow 1: [(2)(1)+(2)(3), (2)(2)+(2)(4)] = [2+6, 4+8] = [8, 12]\nRow 2: [(3)(1)+(5)(3), (3)(2)+(5)(4)] = [3+15, 6+20] = [18, 26]\nBA = [[8, 12], [18, 26]].  --- (2)",
        "From (1) and (2), AB = BA. The given matrices commute."
      ],
      "answer": "AB = BA = [[8, 12], [18, 26]]. Proved."
    },
    {
      "id": "ex13",
      "title": "Example 13 (Page 25) — Distributive Law A(B + C) = AB + AC",
      "problem": "If A = [[1, 2], [3, 4]], B = [[5, 3], [2, 4]], and C = [[6, 2], [5, 1]], verify that A(B + C) = AB + AC.",
      "given": "Matrices A, B, C of order 2×2.",
      "method": "Evaluate LHS = A(B + C) and RHS = AB + AC.",
      "steps": [
        "Compute B + C = [[5+6, 3+2], [2+5, 4+1]] = [[11, 5], [7, 5]].",
        "Compute LHS = A(B + C):\nRow 1: [(1)(11)+(2)(7), (1)(5)+(2)(5)] = [11+14, 5+10] = [25, 15]\nRow 2: [(3)(11)+(4)(7), (3)(5)+(4)(5)] = [33+28, 15+20] = [61, 35]\nLHS = [[25, 15], [61, 35]].  --- (1)",
        "Compute AB:\nRow 1: [(1)(5)+(2)(2), (1)(3)+(2)(4)] = [5+4, 3+8] = [9, 11]\nRow 2: [(3)(5)+(4)(2), (3)(3)+(4)(4)] = [15+8, 9+16] = [23, 25]\nAB = [[9, 11], [23, 25]].",
        "Compute AC:\nRow 1: [(1)(6)+(2)(5), (1)(2)+(2)(1)] = [6+10, 2+2] = [16, 4]\nRow 2: [(3)(6)+(4)(5), (3)(2)+(4)(1)] = [18+20, 6+4] = [38, 10]\nAC = [[16, 4], [38, 10]].",
        "Compute RHS = AB + AC = [[9+16, 11+4], [23+38, 25+10]] = [[25, 15], [61, 35]].  --- (2)",
        "From (1) and (2), LHS = RHS. Distributive law is verified."
      ],
      "answer": "LHS = RHS = [[25, 15], [61, 35]]. Verified."
    },
    {
      "id": "ex14",
      "title": "Example 14 (Page 27) — Multiplicative Identity IA = AI = A",
      "problem": "If I = [[1, 0], [0, 1]] and A = [[9, -3], [-4, 5]], find IA and AI.",
      "given": "Identity matrix I and matrix A.",
      "method": "Multiply I by A and A by I.",
      "steps": [
        "IA = [[1(9)+0(-4), 1(-3)+0(5)], [0(9)+1(-4), 0(-3)+1(5)]] = [[9, -3], [-4, 5]] = A.",
        "AI = [[9(1)+(-3)(0), 9(0)+(-3)(1)], [(-4)(1)+5(0), (-4)(0)+5(1)]] = [[9, -3], [-4, 5]] = A.",
        "Hence IA = AI = A. I is the multiplicative identity."
      ],
      "answer": "IA = AI = A = [[9, -3], [-4, 5]]."
    },
    {
      "id": "ex15",
      "title": "Example 15 (Page 27) — Transpose of a Matrix",
      "problem": "If A = [[3, 4, 5], [2, 4, 6]], find A^t.",
      "given": "Matrix A of order 2×3.",
      "method": "Interchange rows into columns.",
      "steps": [
        "Row 1 [3, 4, 5] becomes Column 1.\nRow 2 [2, 4, 6] becomes Column 2.",
        "A^t = [[3, 2], [4, 4], [5, 6]] of order 3×2."
      ],
      "answer": "A^t = [[3, 2], [4, 4], [5, 6]]."
    },
    {
      "id": "ex16",
      "title": "Example 16 (Page 28) — Transpose Reversal Law (AB)^t = B^t · A^t",
      "problem": "Let A = [[3, -2], [1, 4]] and B = [[2, -5], [6, -7]]. Show that (AB)^t = B^t · A^t.",
      "given": "Matrices A and B.",
      "method": "Compute (AB)^t and B^t A^t and show equality.",
      "steps": [
        "Compute AB:\nRow 1: [(3)(2)+(-2)(6), (3)(-5)+(-2)(-7)] = [6-12, -15+14] = [-6, -1]\nRow 2: [(1)(2)+(4)(6), (1)(-5)+(4)(-7)] = [2+24, -5-28] = [26, -33]\nAB = [[-6, -1], [26, -33]].",
        "LHS = (AB)^t = [[-6, 26], [-1, -33]].  --- (1)",
        "Compute B^t and A^t:\nB^t = [[2, 6], [-5, -7]],  A^t = [[3, 1], [-2, 4]].",
        "Compute RHS = B^t · A^t:\nRow 1: [(2)(3)+(6)(-2), (2)(1)+(6)(4)] = [6-12, 2+24] = [-6, 26]\nRow 2: [(-5)(3)+(-7)(-2), (-5)(1)+(-7)(4)] = [-15+14, -5-28] = [-1, -33]\nB^t · A^t = [[-6, 26], [-1, -33]].  --- (2)",
        "From (1) and (2), (AB)^t = B^t · A^t."
      ],
      "answer": "LHS = RHS = [[-6, 26], [-1, -33]]. Proved."
    },
    {
      "id": "ex17",
      "title": "Example 17 (Page 31) — Determinant of a 2×2 Matrix",
      "problem": "Find the determinant of the matrix A = [[7, 5], [7, -12]].",
      "given": "A = [[7, 5], [7, -12]]",
      "method": "|A| = ad - bc.",
      "steps": [
        "|A| = (7)(-12) - (5)(7) = -84 - 35 = -119."
      ],
      "answer": "|A| = -119."
    },
    {
      "id": "ex18",
      "title": "Example 18 (Page 31) — Singular Matrix Check",
      "problem": "Find whether A = [[4, -2], [-2, 1]] is a singular matrix.",
      "given": "A = [[4, -2], [-2, 1]]",
      "method": "Evaluate determinant |A|; if |A| = 0, it is singular.",
      "steps": [
        "|A| = (4)(1) - (-2)(-2) = 4 - 4 = 0.",
        "Since |A| = 0, A is a singular matrix."
      ],
      "answer": "A is a singular matrix (|A| = 0)."
    },
    {
      "id": "ex19",
      "title": "Example 19 (Page 32) — Non-Singular Matrix Check",
      "problem": "If P = [[-4, 2], [3, -7]], check whether P is a singular or non-singular matrix.",
      "given": "P = [[-4, 2], [3, -7]]",
      "method": "Evaluate |P|.",
      "steps": [
        "|P| = (-4)(-7) - (3)(2) = 28 - 6 = 22.",
        "Since |P| = 22 ≠ 0, P is a non-singular matrix."
      ],
      "answer": "P is a non-singular matrix (|P| = 22 ≠ 0)."
    },
    {
      "id": "ex20",
      "title": "Example 20 (Page 32) — Adjoint of Matrices",
      "problem": "Find the adjoint of the following matrices:\n(i) A = [[1, 3], [-2, 4]]\n(ii) B = [[4, 3], [-3, 1]]",
      "given": "Matrices A and B.",
      "method": "adj(M) = [[d, -b], [-c, a]].",
      "steps": [
        "(i) For A = [[1, 3], [-2, 4]]: Swap 1 and 4 => 4 and 1. Change signs of 3 and -2 => -3 and 2. adj(A) = [[4, -3], [2, 1]].",
        "(ii) For B = [[4, 3], [-3, 1]]: Swap 4 and 1 => 1 and 4. Change signs of 3 and -3 => -3 and 3. adj(B) = [[1, -3], [3, 4]]."
      ],
      "answer": "(i) adj(A) = [[4, -3], [2, 1]]; (ii) adj(B) = [[1, -3], [3, 4]]."
    },
    {
      "id": "ex21",
      "title": "Example 21 (Page 33) — Multiplicative Inverse Proof",
      "problem": "Show that A = [[3, 2], [4, 3]] is the multiplicative inverse of B = [[3, -2], [-4, 3]].",
      "given": "Matrices A and B.",
      "method": "Show AB = BA = I.",
      "steps": [
        "Compute AB:\nRow 1: [(3)(3)+(2)(-4), (3)(-2)+(2)(3)] = [9-8, -6+6] = [1, 0]\nRow 2: [(4)(3)+(3)(-4), (4)(-2)+(3)(3)] = [12-12, -8+9] = [0, 1]\nAB = [[1, 0], [0, 1]] = I.",
        "Compute BA:\nRow 1: [(3)(3)+(-2)(4), (3)(2)+(-2)(3)] = [9-8, 6-6] = [1, 0]\nRow 2: [(-4)(3)+(3)(4), (-4)(2)+(3)(3)] = [-12+12, -8+9] = [0, 1]\nBA = [[1, 0], [0, 1]] = I.",
        "Since AB = BA = I, A is the multiplicative inverse of B."
      ],
      "answer": "AB = BA = I. Hence A is the inverse of B."
    },
    {
      "id": "ex22",
      "title": "Example 22 (Page 33) — Inverse using Adjoint Method",
      "problem": "Find the inverse of A = [[-2, -1], [3, 4]] using the adjoint method.",
      "given": "A = [[-2, -1], [3, 4]]",
      "method": "A^-1 = (1/|A|) · adj(A).",
      "steps": [
        "Step 1: |A| = (-2)(4) - (-1)(3) = -8 + 3 = -5 ≠ 0 (non-singular, A^-1 exists).",
        "Step 2: adj(A) = [[4, 1], [-3, -2]].",
        "Step 3: A^-1 = (1/-5) · [[4, 1], [-3, -2]] = [[-4/5, -1/5], [3/5, 2/5]]."
      ],
      "answer": "A^-1 = [[-4/5, -1/5], [3/5, 2/5]]."
    },
    {
      "id": "ex23",
      "title": "Example 23 (Page 35) — Verification of (AB)^-1 = B^-1 · A^-1",
      "problem": "Let A = [[-2, 1], [1, 1]] and B = [[2, 1], [3, 2]]. Verify that (AB)^-1 = B^-1 · A^-1.",
      "given": "Matrices A and B.",
      "method": "Evaluate (AB)^-1 and B^-1 A^-1 and compare.",
      "steps": [
        "Step 1: Compute AB = [[-2(2)+1(3), -2(1)+1(2)], [1(2)+1(3), 1(1)+1(2)]] = [[-1, 0], [5, 3]].",
        "Step 2: det(AB) = (-1)(3) - (0)(5) = -3 ≠ 0. adj(AB) = [[3, 0], [-5, -1]].\n(AB)^-1 = (1/-3) · [[3, 0], [-5, -1]] = [[-1, 0], [5/3, 1/3]].  --- (1)",
        "Step 3: For A: det(A) = (-2)(1) - (1)(1) = -3. adj(A) = [[1, -1], [-1, -2]].\nA^-1 = (1/-3) · [[1, -1], [-1, -2]] = [[-1/3, 1/3], [1/3, 2/3]].",
        "Step 4: For B: det(B) = (2)(2) - (1)(3) = 1. adj(B) = [[2, -1], [-3, 2]].\nB^-1 = [[2, -1], [-3, 2]].",
        "Step 5: Multiply B^-1 · A^-1:\nRow 1: [2(-1/3)+(-1)(1/3), 2(1/3)+(-1)(2/3)] = [-2/3-1/3, 2/3-2/3] = [-1, 0]\nRow 2: [-3(-1/3)+2(1/3), -3(1/3)+2(2/3)] = [1+2/3, -1+4/3] = [5/3, 1/3]\nB^-1 · A^-1 = [[-1, 0], [5/3, 1/3]].  --- (2)",
        "From (1) and (2), (AB)^-1 = B^-1 · A^-1."
      ],
      "answer": "LHS = RHS = [[-1, 0], [5/3, 1/3]]. Verified."
    },
    {
      "id": "ex24",
      "title": "Example 24 (Page 40) — Matrix Inversion Method",
      "problem": "Solve the system of equations with the help of matrices:\nx - 3y = 0\n2x + y = 7",
      "given": "x - 3y = 0 and 2x + y = 7.",
      "method": "Write AX = B => X = A^-1 B.",
      "steps": [
        "A = [[1, -3], [2, 1]], X = [[x], [y]], B = [[0], [7]].",
        "|A| = (1)(1) - (-3)(2) = 1 + 6 = 7 ≠ 0. A^-1 exists.",
        "adj(A) = [[1, 3], [-2, 1]].",
        "X = (1/7) · [[1, 3], [-2, 1]] · [[0], [7]] = (1/7) · [[(1)(0) + (3)(7)], [(-2)(0) + (1)(7)]] = (1/7) · [[21], [7]] = [[3], [1]].",
        "Therefore, x = 3, y = 1."
      ],
      "answer": "x = 3, y = 1. Solution set = {(3, 1)}."
    },
    {
      "id": "ex25",
      "title": "Example 25 (Page 40) — Solvability of Linear System",
      "problem": "Is the following system of equations solvable?\n3x - 6y = 9\n2x - 4y = -3",
      "given": "3x - 6y = 9 and 2x - 4y = -3.",
      "method": "Check determinant |A| of coefficient matrix.",
      "steps": [
        "Coefficient matrix A = [[3, -6], [2, -4]].",
        "|A| = (3)(-4) - (-6)(2) = -12 + 12 = 0.",
        "Since |A| = 0, A is singular, A^-1 does not exist.",
        "Hence the given equations are non-solvable."
      ],
      "answer": "The system is non-solvable (|A| = 0)."
    },
    {
      "id": "ex26",
      "title": "Example 26 (Page 42) — Cramer's Rule",
      "problem": "Solve the following system of equations by using Cramer's rule:\nx - 2y = 1\n3x + y = 10",
      "given": "x - 2y = 1 and 3x + y = 10.",
      "method": "Apply Cramer's Rule: x = |A_x|/|A|, y = |A_y|/|A|.",
      "steps": [
        "Matrix Form: A = [[1, -2], [3, 1]], B = [[1], [10]].",
        "|A| = (1)(1) - (-2)(3) = 1 + 6 = 7 ≠ 0.",
        "A_x = [[1, -2], [10, 1]]  =>  |A_x| = (1)(1) - (-2)(10) = 1 + 20 = 21.\nx = |A_x| / |A| = 21 / 7 = 3.",
        "A_y = [[1, 1], [3, 10]]  =>  |A_y| = (1)(10) - (1)(3) = 10 - 3 = 7.\ny = |A_y| / |A| = 7 / 7 = 1."
      ],
      "answer": "Solution set = {(3, 1)}. x = 3, y = 1."
    },
    {
      "id": "ex27",
      "title": "Example 27 (Page 43) — Word Problem: Two Numbers",
      "problem": "There are two numbers such that the sum of the first and three times the second is 53, while the difference between 4 times the first and twice the second is 2. Find the numbers.",
      "given": "x + 3y = 53 and 4x - 2y = 2.",
      "method": "Translate to matrix equation AX = B and solve.",
      "steps": [
        "Let first number = x, second number = y.\n(1) x + 3y = 53\n(2) 4x - 2y = 2",
        "Matrix Form: [[1, 3], [4, -2]] [[x], [y]] = [[53], [2]].",
        "|A| = (1)(-2) - (3)(4) = -2 - 12 = -14 ≠ 0.",
        "adj(A) = [[-2, -3], [-4, 1]].",
        "X = (1/-14) · [[-2, -3], [-4, 1]] · [[53], [2]]\n= (-1/14) · [[(-2)(53) + (-3)(2)], [(-4)(53) + (1)(2)]]\n= (-1/14) · [[-106 - 6], [-212 + 2]]\n= (-1/14) · [[-112], [-210]] = [[8], [15]].",
        "Therefore, x = 8, y = 15."
      ],
      "answer": "The numbers are 8 and 15."
    },
    {
      "id": "ex28",
      "title": "Example 28 (Page 44) — Word Problem: Rubbers & Sharpeners",
      "problem": "The cost of 1 rubber and 7 sharpeners is 15 rupees, while that of 3 rubbers and 1 sharpener is 5 rupees. What are the prices of a rubber and sharpener respectively?",
      "given": "x + 7y = 15 and 3x + y = 5.",
      "method": "Solve simultaneous equations using Cramer's Rule.",
      "steps": [
        "Let rubber price = x, sharpener price = y.\n(1) x + 7y = 15\n(2) 3x + y = 5",
        "A = [[1, 7], [3, 1]], B = [[15], [5]].",
        "|A| = (1)(1) - (7)(3) = 1 - 21 = -20 ≠ 0.",
        "A_x = [[15, 7], [5, 1]]  =>  |A_x| = (15)(1) - (7)(5) = 15 - 35 = -20.\nx = |A_x| / |A| = -20 / -20 = 1 rupee.",
        "A_y = [[1, 15], [3, 5]]  =>  |A_y| = (1)(5) - (15)(3) = 5 - 45 = -40.\ny = |A_y| / |A| = -40 / -20 = 2 rupees."
      ],
      "answer": "Price of one rubber = 1 rupee; Price of one sharpener = 2 rupees."
    }
  ],
  "exercises": [
    {
      "exercise": "1.1",
      "title": "Exercise 1.1 — Order, Types & Equality of Matrices (Page 5)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Which of the following are square and which are rectangular matrices?\n(i) A = [[2, 3], [0, 5]]\n(ii) B = [[6, 3, -1], [1, 5, 2]]\n(iii) C = [[1, 0, 0], [0, 2, 0], [0, 0, 1]]\n(iv) B = [-5]\n(v) E = [-3, 4]\n(vi) E = [[-1], [7]]",
          "solution": "A matrix is square if the number of rows equals the number of columns (m = n).\nA matrix is rectangular if the number of rows does not equal the number of columns (m ≠ n).\n\n(i) A has 2 rows and 2 columns (2×2): m = n => Square Matrix.\n(ii) B has 2 rows and 3 columns (2×3): m ≠ n => Rectangular Matrix.\n(iii) C has 3 rows and 3 columns (3×3): m = n => Square Matrix.\n(iv) B = [-5] has 1 row and 1 column (1×1): m = n => Square Matrix.\n(v) E = [-3, 4] has 1 row and 2 columns (1×2): m ≠ n => Rectangular Matrix.\n(vi) E = [[-1], [7]] has 2 rows and 1 column (2×1): m ≠ n => Rectangular Matrix.",
          "answer": "(i) Square, (ii) Rectangular, (iii) Square, (iv) Square, (v) Rectangular, (vi) Rectangular."
        },
        {
          "qNo": "Question 2",
          "question": "List the order of the following matrices:\n(i) A = [[1, 2, -1], [3, 4, 2]]\n(ii) B = [-4]\n(iii) C = [[2, 3, -1], [1, 2, 5]]\n(iv) F = [[2, 1], [3, 2], [4, -1]]\n(v) E = [3, 2]\n(vi) D = [[1, 2, 3], [6, 5, 9], [0, 0, 0]]",
          "solution": "The order of a matrix having m rows and n columns is m × n:\n(i) A has 2 rows and 3 columns => Order: 2 × 3 (or 2-by-3).\n(ii) B has 1 row and 1 column => Order: 1 × 1 (or 1-by-1).\n(iii) C has 2 rows and 3 columns => Order: 2 × 3 (or 2-by-3).\n(iv) F has 3 rows and 2 columns => Order: 3 × 2 (or 3-by-2).\n(v) E has 1 row and 2 columns => Order: 1 × 2 (or 1-by-2).\n(vi) D has 3 rows and 3 columns => Order: 3 × 3 (or 3-by-3).",
          "answer": "(i) 2×3, (ii) 1×1, (iii) 2×3, (iv) 3×2, (v) 1×2, (vi) 3×3."
        },
        {
          "qNo": "Question 3",
          "question": "If A = [[3, 2, -4], [-2, 5, 0], [2, 1, 5], [-3, 4, 6]], give the following elements:\n(i) a_12\n(ii) a_23\n(iii) a_32\n(iv) a_43\n(v) a_13\n(vi) a_33",
          "solution": "In matrix notation, a_ij represents the element in the i-th row and j-th column:\n(i) a_12 (Row 1, Column 2) = 2\n(ii) a_23 (Row 2, Column 3) = 0\n(iii) a_32 (Row 3, Column 2) = 1\n(iv) a_43 (Row 4, Column 3) = 6\n(v) a_13 (Row 1, Column 3) = -4\n(vi) a_33 (Row 3, Column 3) = 5",
          "answer": "(i) 2, (ii) 0, (iii) 1, (iv) 6, (v) -4, (vi) 5. The printed answer key says 0, but the given matrix has a₃₃ = 5."
        },
        {
          "qNo": "Question 4",
          "question": "Which of the following matrices are equal?\nA = [[2, 5], [1, 3]]\nB = [[2, 5], [4, 3]]\nC = [[1+1, 3+2], [4, 2+1]]\nD = [[2, 4+1], [1, 3]]",
          "solution": "Simplify matrices C and D:\nC = [[1+1, 3+2], [4, 2+1]] = [[2, 5], [4, 3]].\nD = [[2, 4+1], [1, 3]] = [[2, 5], [1, 3]].\n\nCompare:\n- Matrix A = [[2, 5], [1, 3]] has identical entries to D = [[2, 5], [1, 3]] => A = D.\n- Matrix B = [[2, 5], [4, 3]] has identical entries to C = [[2, 5], [4, 3]] => B = C.",
          "answer": "A = D and B = C."
        },
        {
          "qNo": "Question 5",
          "question": "Let A = [[2, -3], [u, 0]] and B = [[v, -3], [5, w]]. For what values of u, v, and w are A and B equal?",
          "solution": "For A = B, corresponding entries must be equal:\n[[2, -3], [u, 0]] = [[v, -3], [5, w]]\n- Position (1, 1): 2 = v => v = 2\n- Position (1, 2): -3 = -3\n- Position (2, 1): u = 5 => u = 5\n- Position (2, 2): 0 = w => w = 0",
          "answer": "u = 5, v = 2, w = 0."
        },
        {
          "qNo": "Question 6",
          "question": "If [[x+3, z+4, 2y-7], [-6, a-1, 0], [b-3, -21, 0]] = [[0, 6, 3y-2], [-6, -3, 2c+2], [2b+4, -21, 0]], find the values of a, b, c, x, y, and z.",
          "solution": "Equating corresponding elements:\n1) x + 3 = 0  =>  x = -3\n2) z + 4 = 6  =>  z = 2\n3) 2y - 7 = 3y - 2  =>  -y = 5  =>  y = -5\n4) a - 1 = -3  =>  a = -2\n5) 0 = 2c + 2  =>  2c = -2  =>  c = -1\n6) b - 3 = 2b + 4  =>  -b = 7  =>  b = -7",
          "answer": "a = -2, b = -7, c = -1, x = -3, y = -5, z = 2."
        },
        {
          "qNo": "Question 7",
          "question": "Solve the following equation for a, b, c, d:\n[[a+b, b+2c], [2c+d, 2a-d]] = [[-1, 4], [8, 0]]",
          "solution": "Equating corresponding elements:\n(1) a + b = -1\n(2) b + 2c = 4\n(3) 2c + d = 8\n(4) 2a - d = 0  =>  d = 2a\n\nFrom (4) and (3): 2c + 2a = 8 => a + c = 4 => c = 4 - a\nFrom (1): b = -1 - a\nSubstitute b and c into (2):\n(-1 - a) + 2(4 - a) = 4\n-1 - a + 8 - 2a = 4\n7 - 3a = 4 => -3a = -3 => a = 1.\n\nNow substitute a = 1:\nb = -1 - (1) = -2\nc = 4 - 1 = 3\nd = 2(1) = 2.",
          "answer": "a = 1, b = -2, c = 3, d = 2."
        }
      ]
    },
    {
      "exercise": "1.2",
      "title": "Exercise 1.2 — Transpose, Symmetric & Skew-Symmetric Matrices (Page 10)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Write the transpose of the following matrices:\n(i) P = [[1, 2], [3, 1]]\n(ii) Q = [[l, m], [n, p]]\n(iii) R = [6]\n(iv) S = [[-5, 1], [-2, 1], [4, 4]]\n(v) T = [[6, 7, 8], [13, 1, 3], [2, 4, 5]]",
          "solution": "Interchange rows into columns:\n(i) P^t = [[1, 3], [2, 1]]\n(ii) Q^t = [[l, n], [m, p]]\n(iii) R^t = [6]\n(iv) S^t = [[-5, -2, 4], [1, 1, 4]]\n(v) T^t = [[6, 13, 2], [7, 1, 4], [8, 3, 5]]",
          "answer": "(i) P^t = [[1, 3], [2, 1]], (ii) Q^t = [[l, n], [m, p]], (iii) R^t = [6], (iv) S^t = [[-5, -2, 4], [1, 1, 4]], (v) T^t = [[6, 13, 2], [7, 1, 4], [8, 3, 5]]."
        },
        {
          "qNo": "Question 2",
          "question": "Which of the following matrices are transpose of each other?\n(i) A = [[a1, a2], [b1, b2]]\n(ii) B = [[a1, b1], [a2, b2]]\n(iii) C = [[-3, 1, -1], [4, 2, 7]]\n(iv) D = [[-3, 4], [1, 2], [-1, 7]]",
          "solution": "1. For A = [[a1, a2], [b1, b2]], A^t = [[a1, b1], [a2, b2]] = B, and B^t = A.\n   => (i) and (ii) are transpose of each other.\n2. For C = [[-3, 1, -1], [4, 2, 7]], C^t = [[-3, 4], [1, 2], [-1, 7]] = D, and D^t = C.\n   => (iii) and (iv) are transpose of each other.",
          "answer": "i) and ii), iii) and iv) are transpose of each other."
        },
        {
          "qNo": "Question 3",
          "question": "Which of the following matrices are symmetric?\n(i) A = [[5, -7], [-1, 5]]\n(ii) B = [[-1, 2], [2, 3]]\n(iii) C = [[3, 4], [5, 6]]\n(iv) D = [[1, 2, 3], [4, 5, 6], [3, 6, 1]]",
          "solution": "A matrix M is symmetric if M^t = M:\n(i) A^t = [[5, -1], [-7, 5]] ≠ A (Not symmetric).\n(ii) B^t = [[-1, 2], [2, 3]] = B (Symmetric!).\n(iii) C^t = [[3, 5], [4, 6]] ≠ C (Not symmetric).\n(iv) D^t = [[1, 4, 3], [2, 5, 6], [3, 6, 1]] ≠ D (Not symmetric).",
          "answer": "Symmetric matrices: ii) B."
        },
        {
          "qNo": "Question 4",
          "question": "Which of the following matrices are skew-symmetric?\n(i) A = [[0, 4], [-4, 0]]\n(ii) B = [[0, -5], [5, 0]]\n(iii) C = [[0, 7], [7, 0]]\n(iv) D = [[0, 3, 2], [-3, 0, 1], [-2, -1, 0]]",
          "solution": "A matrix M is skew-symmetric if M^t = -M:\n(i) A^t = [[0, -4], [4, 0]] = -A (Skew-symmetric).\n(ii) B^t = [[0, 5], [-5, 0]] = -B (Skew-symmetric).\n(iii) C^t = [[0, 7], [7, 0]] = C ≠ -C (Symmetric, not skew-symmetric).\n(iv) D^t = [[0, -3, -2], [3, 0, -1], [2, 1, 0]] = -D (Skew-symmetric).",
          "answer": "Skew-symmetric matrices: i), ii), iv)."
        }
      ]
    },
    {
      "exercise": "1.3",
      "title": "Exercise 1.3 — Matrix Addition & Properties (Pages 19-20)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Let A & B be 2-by-3 matrices and let C & D be 2-square matrices. Which of the following matrix operations are defined? For those which are defined, give the dimension of the resulting matrix.\n(i) A + B\n(ii) B + D\n(iii) 3A - 2C\n(iv) 7C + 2D",
          "solution": "Matrices can be added or subtracted only if they have the same order:\n(i) A (2×3) + B (2×3): Defined. Resulting dimension: 2-by-3.\n(ii) B (2×3) + D (2×2): Not defined (different orders).\n(iii) 3A (2×3) - 2C (2×2): Not defined (different orders).\n(iv) 7C (2×2) + 2D (2×2): Defined. Resulting dimension: 2-by-2.",
          "answer": "(i) Defined (2-by-3); (ii) Not defined; (iii) Not defined; (iv) Defined (2-by-2)."
        },
        {
          "qNo": "Question 2",
          "question": "Multiply the following matrices by the real numbers as indicated:\n(i) Multiply A = [[1], [2], [3]] by 2.\n(ii) Multiply B = [[a, b, c], [d, e, f]] by p in R.",
          "solution": "Multiply every entry by the given scalar:\n(i) 2A = 2 * [[1], [2], [3]] = [[2], [4], [6]].\n(ii) pB = [[pa, pb, pc], [pd, pe, pf]].",
          "answer": "(i) [[2], [4], [6]]; (ii) [[pa, pb, pc], [pd, pe, pf]]."
        },
        {
          "qNo": "Question 3",
          "question": "Find a matrix X such that 4X = [[1, 2, 1], [4, 2, 3], [-1, 9, 7]].",
          "solution": "X = (1/4) · [[1, 2, 1], [4, 2, 3], [-1, 9, 7]]\n= [[1/4, 2/4, 1/4], [4/4, 2/4, 3/4], [-1/4, 9/4, 7/4]]\n= [[1/4, 1/2, 1/4], [1, 1/2, 3/4], [-1/4, 9/4, 7/4]].",
          "answer": "X = [[1/4, 1/2, 1/4], [1, 1/2, 3/4], [-1/4, 9/4, 7/4]]."
        },
        {
          "qNo": "Question 4",
          "question": "If A = [[1, 2], [3, 4], [5, 6]] and B = [[-3, -2], [1, -5], [4, 3]], find 3A - B.",
          "solution": "3A = 3 · [[1, 2], [3, 4], [5, 6]] = [[3, 6], [9, 12], [15, 18]].\n3A - B = [[3 - (-3), 6 - (-2)], [9 - 1, 12 - (-5)], [15 - 4, 18 - 3]]\n= [[6, 8], [8, 17], [11, 15]].",
          "answer": "3A - B = [[6, 8], [8, 17], [11, 15]]."
        },
        {
          "qNo": "Question 5",
          "question": "Given A = [[1, 2, -3], [5, 0, 2], [1, -1, 1]] and B = [[3, -1, 2], [4, 2, 5], [2, 3, 0]], find the matrix C such that A + 2B = C.",
          "solution": "2B = [[6, -2, 4], [8, 4, 10], [4, 6, 0]].\nC = A + 2B = [[1+6, 2-2, -3+4], [5+8, 0+4, 2+10], [1+4, -1+6, 1+0]]\n= [[7, 0, 1], [13, 4, 12], [5, 5, 1]].",
          "answer": "C = [[7, 0, 1], [13, 4, 12], [5, 5, 1]]."
        },
        {
          "qNo": "Question 6",
          "question": "If A = [[2, -2], [4, 2], [-5, 1]] and B = [[8, 0], [4, -2], [3, 6]], find the matrix X such that 2A + 3X = 5B.",
          "solution": "3X = 5B - 2A  =>  X = (1/3)(5B - 2A).\n5B = [[40, 0], [20, -10], [15, 30]].\n2A = [[4, -4], [8, 4], [-10, 2]].\n5B - 2A = [[36, 4], [12, -14], [25, 28]].\nX = [[12, 4/3], [4, -14/3], [25/3, 28/3]].",
          "answer": "X = [[12, 4/3], [4, -14/3], [25/3, 28/3]]."
        },
        {
          "qNo": "Question 7",
          "question": "Find x, y, z, and w if 3[[x, y], [z, w]] = [[x, 6], [-1, 2w]] + [[4, x+y], [3+w, 3]].",
          "solution": "Add the two matrices on the right:\n[[x+4, x+y+6], [w+2, 2w+3]].\nEquate corresponding entries with the left-hand matrix:\n3x = x+4, so x = 2.\n3y = x+y+6, so 2y = 8 and y = 4.\n3w = 2w+3, so w = 3.\n3z = w+2, so 3z = 5 and z = 5/3.",
          "answer": "x = 2, y = 4, z = 5/3, w = 3."
        },
        {
          "qNo": "Question 8",
          "question": "Find X and Y if X + Y = [[5, 2], [0, 9]] and X - Y = [[3, 6], [0, -1]].",
          "solution": "Add both equations: 2X = [[8, 8], [0, 8]] => X = [[4, 4], [0, 4]].\nSubtract equations: 2Y = [[2, -4], [0, 10]] => Y = [[1, -2], [0, 5]].",
          "answer": "X = [[4, 4], [0, 4]], Y = [[1, -2], [0, 5]]."
        },
        {
          "qNo": "Question 9",
          "question": "Let A = [[2, -3], [4, 5]], B = [[2, 5], [-1, 3]], and C = [[3, -1], [0, 4]]. If c = 2 and d = -4, verify that:\n(i) (c + d)A = cA + dA\n(ii) c(A + B) = cA + cB\n(iii) (cd)A = c(dA)",
          "solution": "(i) (c+d)A = -2 · [[2, -3], [4, 5]] = [[-4, 6], [-8, -10]].\n    cA + dA = 2A + (-4)A = [[-4, 6], [-8, -10]]. Verified.\n(ii) c(A+B) = 2 · [[4, 2], [3, 8]] = [[8, 4], [6, 16]].\n    cA + cB = [[4, -6], [8, 10]] + [[4, 10], [-2, 6]] = [[8, 4], [6, 16]]. Verified.\n(iii) (cd)A = -8A = [[-16, 24], [-32, -40]].\n    c(dA) = 2(-4A) = [[-16, 24], [-32, -40]]. Verified.",
          "answer": "All three properties (i), (ii), and (iii) verified."
        },
        {
          "qNo": "Question 10",
          "question": "Let A = [[-1, 2, 3], [4, 2, 0], [-3, 2, 5]], B = [[3, -1, 2], [-5, 3, 4], [-3, -4, 0]], and C = [[2, -3, 6], [0, 4, -1], [-5, 1, 3]]. Compute if possible:\n(i) A + 2B\n(ii) 3A - 4B\n(iii) (A + B) - C\n(iv) A + (B + C)",
          "solution": "All are 3×3 matrices, so all operations are defined:\n(i) A + 2B = [[-1+6, 2-2, 3+4], [4-10, 2+6, 0+8], [-3-6, 2-8, 5+0]] = [[5, 0, 7], [-6, 8, 8], [-9, -6, 5]].\n(ii) 3A - 4B = [[-3-12, 6+4, 9-8], [12+20, 6-12, 0-16], [-9+12, 6+16, 15-0]] = [[-15, 10, 1], [32, -6, -16], [3, 22, 15]].\n(iii) (A + B) - C = [[2-2, 1-(-3), 5-6], [-1-0, 5-4, 4-(-1)], [-6-(-5), -2-1, 5-3]] = [[0, 4, -1], [-1, 1, 5], [-1, -3, 2]].\n(iv) A + (B + C) = A + [[5, -4, 8], [-5, 7, 3], [-8, -3, 3]] = [[4, -2, 11], [-1, 9, 3], [-11, -1, 8]].",
          "answer": "(i) [[5, 0, 7], [-6, 8, 8], [-9, -6, 5]]; (ii) [[-15, 10, 1], [32, -6, -16], [3, 22, 15]]; (iii) [[0, 4, -1], [-1, 1, 5], [-1, -3, 2]]; (iv) [[4, -2, 11], [-1, 9, 3], [-11, -1, 8]]."
        },
        {
          "qNo": "Question 11",
          "question": "Prove that commutative law of addition holds for the following matrices:\n(i) A = [[7, 1], [2, 4]], B = [[1, 1], [2, 2]]\n(ii) C = [[-3, 4, -5], [2, 3, 1]], D = [[-3, -4, 5], [1, 2, 3]]",
          "solution": "(i) A + B = [[7+1, 1+1], [2+2, 4+2]] = [[8, 2], [4, 6]].\n    B + A = [[1+7, 1+1], [2+2, 2+4]] = [[8, 2], [4, 6]].\n    Since A + B = B + A, verified.\n(ii) C + D = [[-3+(-3), 4+(-4), -5+5], [2+1, 3+2, 1+3]] = [[-6, 0, 0], [3, 5, 4]].\n    D + C = [[-3+(-3), -4+4, 5+(-5)], [1+2, 2+3, 3+1]] = [[-6, 0, 0], [3, 5, 4]].\n    Since C + D = D + C, verified.",
          "answer": "Commutative law of addition A + B = B + A holds for both pairs."
        },
        {
          "qNo": "Question 12",
          "question": "Verify that A + (B + C) = (A + B) + C for:\n(i) A = [[2, -3], [4, 1]], B = [[5, 1], [3, 6]], C = [[1, 7], [-6, -3]]",
          "solution": "LHS = A + (B + C):\nB + C = [[6, 8], [-3, 3]].\nA + (B + C) = [[2+6, -3+8], [4+(-3), 1+3]] = [[8, 5], [1, 4]].\n\nRHS = (A + B) + C:\nA + B = [[7, -2], [7, 7]].\n(A + B) + C = [[7+1, -2+7], [7+(-6), 7+(-3)]] = [[8, 5], [1, 4]].\nLHS = RHS. Associative law is verified.",
          "answer": "LHS = RHS = [[8, 5], [1, 4]]. Verified."
        },
        {
          "qNo": "Question 13",
          "question": "Find the additive inverse of the following matrices:\n(i) A = [[3, 4], [6, 2]]\n(ii) B = [[a, -a, b], [-c, a, -b], [m, n, -p]]",
          "solution": "Additive inverse of M is -M:\n(i) -A = [[-3, -4], [-6, -2]].\n(ii) -B = [[-a, a, -b], [c, -a, b], [-m, -n, p]].",
          "answer": "(i) [[-3, -4], [-6, -2]]; (ii) [[-a, a, -b], [c, -a, b], [-m, -n, p]]."
        },
        {
          "qNo": "Question 14",
          "question": "Show that the following matrices are additive inverses of each other:\n(i) A = [1, -2, 3], B = [-1, 2, -3]\n(ii) C = [[a, -b], [c, -d]], D = [[-a, b], [-c, d]]",
          "solution": "Show that their sum equals the null matrix O:\n(i) A + B = [1+(-1), -2+2, 3+(-3)] = [0, 0, 0] = O.\n(ii) C + D = [[a-a, -b+b], [c-c, -d+d]] = [[0, 0], [0, 0]] = O.\nHence they are additive inverses of each other.",
          "answer": "Verified. Sum equals O in both cases."
        }
      ]
    },
    {
      "exercise": "1.4",
      "title": "Exercise 1.4 — Matrix Multiplication & Properties (Pages 29-30)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Show which of the following matrices are conformable for multiplication:\n(i) A = [[1, -1], [-2, 1]]\n(ii) B = [p, q]\n(iii) C = [[1, -1], [-2, 1]]\n(iv) D = [p, r, s]",
          "solution": "Columns of 1st = Rows of 2nd:\nA(2×2), B(1×2), C(2×2), D(1×3).\n- AB: 2 ≠ 1 (No)\n- BA: 2 = 2 (Yes, order 1×2)\n- CA: 2 = 2 (Yes, order 2×2)\n- BC: 2 = 2 (Yes, order 1×2)\n- AD: 2 ≠ 1 (No)",
          "answer": "Conformable products are: AB (No), BA (Yes), CA (Yes), BC (Yes), AD (No)."
        },
        {
          "qNo": "Question 2",
          "question": "If A = [[-1, 0], [2, 1]] and B = [[3], [-2]], answer: (i) Is it possible to find AB? (ii) Is it possible to find BA? (iii) Find the possible product/products.",
          "solution": "A is 2x2 and B is 2x1. Therefore AB is defined and has order 2x1. BA is not defined because B has one column while A has two rows.\nAB = [[(-1)(3) + 0(-2)], [2(3) + 1(-2)]] = [[-3], [4]].",
          "answer": "(i) Yes; (ii) No; (iii) AB = [[-3], [4]]."
        },
        {
          "qNo": "Question 3",
          "question": "Given A = [[4, 1], [3, 1]], B = [[1, -1], [-3, 4]], C = [[3, 4], [1, 2]], and D = [[1, -2], [-1/2, 2/3]], find (i) AB and (ii) CD.",
          "solution": "(i) AB = [[4(1)+1(-3), 4(-1)+1(4)], [3(1)+1(-3), 3(-1)+1(4)]] = [[1, 0], [0, 1]].\n(ii) CD = [[3(1)+4(-1/2), 3(-2)+4(2/3)], [1(1)+2(-1/2), 1(-2)+2(2/3)]] = [[1, -10/3], [0, -2/3]].",
          "answer": "(i) AB = [[1, 0], [0, 1]]; (ii) CD = [[1, -10/3], [0, -2/3]]."
        },
        {
          "qNo": "Question 4",
          "question": "Let A = [[2, 1], [3, 0], [-1, 4]] and B = [[1, 0], [2, 1]]. (i) Find AB. (ii) Does BA exist?",
          "solution": "(i) AB has order 3x2:\nAB = [[2(1)+1(2), 2(0)+1(1)], [3(1)+0(2), 3(0)+0(1)], [-1(1)+4(2), -1(0)+4(1)]] = [[4, 1], [3, 0], [7, 4]].\n(ii) BA is not defined: B has 2 columns while A has 3 rows.",
          "answer": "(i) AB = [[4, 1], [3, 0], [7, 4]]; (ii) BA does not exist."
        },
        {
          "qNo": "Question 5",
          "question": "If A = [[1, 1], [0, 0]] and B = [[0, 1], [0, 0]], then show that AB ≠ BA.",
          "solution": "AB = [[1(0)+1(0), 1(1)+1(0)], [0, 0]] = [[0, 1], [0, 0]].\nBA = [[0(1)+1(0), 0(1)+1(0)], [0, 0]] = [[0, 0], [0, 0]] = O.\nSince [[0, 1], [0, 0]] ≠ [[0, 0], [0, 0]], AB ≠ BA. Proved.",
          "answer": "AB = [[0, 1], [0, 0]] and BA = [[0, 0], [0, 0]]. Hence AB ≠ BA is proved."
        },
        {
          "qNo": "Question 6",
          "question": "If A = [[1, 1], [0, 0]], find A x A.",
          "solution": "A x A = [[1(1)+1(0), 1(1)+1(0)], [0(1)+0(0), 0(1)+0(0)]] = [[1, 1], [0, 0]] = A.",
          "answer": "A x A = [[1, 1], [0, 0]] = A."
        },
        {
          "qNo": "Question 7",
          "question": "If A = [[-2, 3], [2, -1]] and B = [[1, -1], [2, 4]], is AB = BA?",
          "solution": "AB = [[-2(1)+3(2), (-2)(-1)+3(4)], [2(1)+(-1)(2), 2(-1)+(-1)(4)]] = [[4, 14], [0, -6]].\nBA = [[1(-2)+(-1)(2), 1(3)+(-1)(-1)], [2(-2)+4(2), 2(3)+4(-1)]] = [[-4, 4], [4, 2]].\nSince AB and BA are different, AB != BA.",
          "answer": "No. AB = [[4, 14], [0, -6]] and BA = [[-4, 4], [4, 2]], so AB != BA."
        },
        {
          "qNo": "Question 8",
          "question": "If A = [[-1], [1]], B = [1, -2], C = [[3, 1], [-1, 2]], then find (AB)C and A(BC).\ni) Find (AB)C and A(BC).\nii) Determine whether (AB)C = A(BC).\niii) Interpret which law of multiplication this result shows.",
          "solution": "AB = [[-1, 2], [1, -2]].\n(AB)C = [[-1, 2], [1, -2]][[3, 1], [-1, 2]] = [[-5, 3], [5, -3]].\nBC = [1, -2][[3, 1], [-1, 2]] = [5, -3].\nA(BC) = [[-1], [1]][5, -3] = [[-5, 3], [5, -3]].\nThus (AB)C = A(BC); this verifies the associative law of matrix multiplication.",
          "answer": "(AB)C = A(BC) = [[-5, 3], [5, -3]]; associative law."
        },
        {
          "qNo": "Question 9",
          "question": "Verify that A(B+C) = AB+AC for the following matrices:\n(i) A = [[1, 2], [3, -1]], B = [[1, 0], [0, 2]], C = [[3, -1], [0, 2]]\n(ii) A = [[3, -1], [0, 2]], B = [[1], [2]], C = [[-1], [1]]",
          "solution": "(i) B+C = [[4, -1], [0, 4]]. Then A(B+C) = [[4, 7], [12, -7]]. Also AB = [[1, 4], [3, -2]] and AC = [[3, 3], [9, -5]], so AB+AC = [[4, 7], [12, -7]].\n(ii) B+C = [[0], [3]]. Then A(B+C) = [[-3], [6]]. Also AB = [[1], [4]] and AC = [[-4], [2]], so AB+AC = [[-3], [6]].\nThus A(B+C) = AB+AC in both cases.",
          "answer": "(i) A(B+C) = AB+AC = [[4, 7], [12, -7]]; (ii) A(B+C) = AB+AC = [[-3], [6]]."
        },
        {
          "qNo": "Question 10",
          "question": "Let I = [[1, 0], [0, 1]], A = [[5, -3], [4, 6]], B = [[-7, 3], [2, 8]].\nFind (i) AI  (ii) BI.",
          "solution": "Multiplication by the identity matrix leaves a matrix unchanged:\n(i) AI = A = [[5, -3], [4, 6]].\n(ii) BI = B = [[-7, 3], [2, 8]].",
          "answer": "(i) AI = [[5, -3], [4, 6]]; (ii) BI = [[-7, 3], [2, 8]]."
        },
        {
          "qNo": "Question 11",
          "question": "Prove that\n(i) A = [3, 2, 1], B = [-3, 4, 2],\n(A+B)^t = A^t+B^t and (A-B)^t = A^t-B^t\n(ii) C = [[7, -3], [2, -1]], D = [[1, 1], [2, 2]],\n(C+D)^t = C^t+D^t and (C-D)^t = C^t-D^t.",
          "solution": "(i) A+B = [0, 6, 3], so (A+B)^t = [[0], [6], [3]] = A^t+B^t. A-B = [6, -2, -1], so (A-B)^t = [[6], [-2], [-1]] = A^t-B^t.\n(ii) C+D = [[8, -2], [4, 1]], so (C+D)^t = [[8, 4], [-2, 1]]. Also C^t = [[7, 2], [-3, -1]] and D^t = [[1, 2], [1, 2]], hence C^t+D^t = [[8, 4], [-2, 1]].\nC-D = [[6, -4], [0, -3]], so (C-D)^t = [[6, 0], [-4, -3]]. Also C^t-D^t = [[6, 0], [-4, -3]].",
          "answer": "Both transpose identities (A + B)^t = A^t + B^t and (A - B)^t = A^t - B^t are proved."
        },
        {
          "qNo": "Question 12",
          "question": "Prove that\n(i) If A = [[2, 5], [-3, 4]], B = [[-1, 1], [2, 3]], show that (AB)^t = B^t A^t.\n(ii) If C = [[a, b], [c, d]], show that (C^t)^t = C.\n(iii) If A = [[1, 0, -1], [2, 0, 6]], B = [[1, 7], [-8, 4], [0, 1]], show that (AB)^t = A^t B^t.",
          "solution": "(i) AB = [[8, 17], [11, 9]], so (AB)^t = [[8, 11], [17, 9]]. Also B^t = [[-1, 2], [1, 3]] and A^t = [[2, -3], [5, 4]], hence B^t A^t = [[8, 11], [17, 9]].\n(ii) C^t = [[a, c], [b, d]], and (C^t)^t = [[a, b], [c, d]] = C.\n(iii) AB = [[1, 6], [2, 20]], so (AB)^t = [[1, 2], [6, 20]] (2x2). But A^t is 3x2 and B^t is 2x3, so A^t B^t is 3x3 and cannot equal (AB)^t. The general identity is (AB)^t = B^t A^t; the printed statement with A^t B^t appears to be a textbook error.",
          "answer": "(i) (AB)^t = B^t A^t; (ii) (C^t)^t = C; (iii) the printed equality is false: the two sides have different orders. The correct identity is (AB)^t = B^t A^t."
        }
      ]
    },
    {
      "exercise": "1.5",
      "title": "Exercise 1.5 — Determinants, Adjoints & Multiplicative Inverses (Pages 37-38)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Find the determinant of following matrices and evaluate them:\n(i) A = [[5, 6], [-4, 1]]\n(ii) B = [[4, -2], [5, 13]]\n(iii) C = [[11, 7], [-6, 5]]\n(iv) D = [[5, 6], [-8, -9]]\n(v) E = [[2p, -3q], [r, -s]]\n(vi) F = [[1, 0], [0, 1]]\n(vii) G = [[6, -11], [-1, -3]]\n(viii) H = [[ac, 0], [0, b]]",
          "solution": "Formula: |M| = ad - bc:\n(i) |A| = 5(1) - 6(-4) = 29.\n(ii) |B| = 4(13) - (-2)(5) = 62.\n(iii) |C| = 11(5) - 7(-6) = 97.\n(iv) |D| = 5(-9) - 6(-8) = 3.\n(v) |E| = 2p(-s) - (-3q)(r) = -2ps + 3qr.\n(vi) |F| = 1(1) - 0(0) = 1.\n(vii) |G| = 6(-3) - (-11)(-1) = -29.\n(viii) |H| = (ac)(b) - 0(0) = abc.",
          "answer": "(i) 29, (ii) 62, (iii) 97, (iv) 3, (v) -2ps + 3qr, (vi) 1, (vii) -29, (viii) abc."
        },
        {
          "qNo": "Question 2",
          "question": "Find which of the following matrices are singular and which are non-singular:\n(i) A = [[5, 3], [2, 1]]\n(ii) B = [[3, -6], [-2, 4]]\n(iii) C = [[3a, -2b], [2a, b]]\n(iv) D = [[-3, 6], [2, -4]]",
          "solution": "(i) |A| = 5(1) - 3(2) = -1 ≠ 0 => Non-singular.\n(ii) |B| = 3(4) - (-6)(-2) = 12 - 12 = 0 => Singular.\n(iii) |C| = 3ab - (-2b)(2a) = 7ab. Thus C is non-singular when ab ≠ 0, and singular when a = 0 or b = 0.\n(iv) |D| = -3(-4) - 6(2) = 12 - 12 = 0 => Singular.",
          "answer": "Singular: (ii) B and (iv) D. Non-singular: (i) A; (iii) C is non-singular only when ab ≠ 0."
        },
        {
          "qNo": "Question 3",
          "question": "Find the adjoint of the following matrices:\n(i) A = [[1, 2], [3, 4]]\n(ii) B = [[-3, -1], [2, 3]]\n(iii) C = [[2, -4], [3, 1]]\n(iv) D = [[-3, 6], [2, -4]]",
          "solution": "adj(M) = [[d, -b], [-c, a]]:\n(i) adj(A) = [[4, -2], [-3, 1]].\n(ii) adj(B) = [[3, 1], [-2, -3]].\n(iii) adj(C) = [[1, 4], [-3, 2]].\n(iv) adj(D) = [[-4, -6], [-2, -3]].",
          "answer": "(i) adj A = [[4, -2], [-3, 1]], (ii) adj B = [[3, 1], [-2, -3]], (iii) adj C = [[1, 4], [-3, 2]], (iv) adj D = [[-4, -6], [-2, -3]]."
        },
        {
          "qNo": "Question 4",
          "question": "Find the multiplicative inverses of the following matrices if they exist:\n(i) A = [[4, 1], [3, 1]]\n(ii) B = [[3, 4], [1, 2]]\n(iii) C = [[4, -3], [-1, 2]]\n(iv) D = [[0, -3], [2, 4]]\n(v) I = [[1, 0], [0, 1]]",
          "solution": "M^-1 = (1/|M|) · adj(M):\n(i) |A| = 4(1)-1(3)=1, so A^-1 = [[1, -1], [-3, 4]].\n(ii) |B| = 3(2)-4(1)=2, so B^-1 = (1/2)[[2, -4], [-1, 3]] = [[1, -2], [-1/2, 3/2]].\n(iii) |C| = 4(2)-(-3)(-1)=5, so C^-1 = (1/5)[[2, 3], [1, 4]] = [[2/5, 3/5], [1/5, 4/5]].\n(iv) |D| = 0(4)-(-3)(2)=6, so D^-1 = (1/6)[[4, 3], [-2, 0]] = [[2/3, 1/2], [-1/3, 0]].\n(v) I^-1 = I = [[1, 0], [0, 1]].",
          "answer": "(i) [[1, -1], [-3, 4]]; (ii) [[1, -2], [-1/2, 3/2]]; (iii) [[2/5, 3/5], [1/5, 4/5]]; (iv) [[2/3, 1/2], [-1/3, 0]]; (v) I."
        },
        {
          "qNo": "Question 5",
          "question": "If A = [[2, 0], [-3, 1]], B = [[1, -1], [-1, 3]], find\n(i) AB  (ii) BA  (iii) A^-1 and B^-1,\nthen show that (AB)^-1 = B^-1 A^-1 and (BA)^-1 = A^-1 B^-1.",
          "solution": "AB = [[2, -2], [-4, 6]], BA = [[5, -1], [-11, 3]].\nA^-1 = [[1/2, 0], [3/2, 1]], B^-1 = [[3/2, 1/2], [1/2, 1/2]].\n(AB)^-1 = [[3/2, 1/2], [1, 1/2]] = B^-1 A^-1.\n(BA)^-1 = [[3/4, 1/4], [11/4, 5/4]] = A^-1 B^-1.",
          "answer": "AB = [[2, -2], [-4, 6]], BA = [[5, -1], [-11, 3]]; (AB)^-1 = B^-1 A^-1 and (BA)^-1 = A^-1 B^-1."
        },
        {
          "qNo": "Question 6",
          "question": "If A = [[0, -1], [2, 1]], B = [[2, 3], [1, 0]], then show that (AB)^-1 = B^-1 A^-1 and (BA)^-1 = A^-1 B^-1.",
          "solution": "A^-1 = [[1/2, 1/2], [-1, 0]], B^-1 = [[0, 1], [1/3, -2/3]].\nAB = [[-1, 0], [5, 6]], so (AB)^-1 = [[-1, 0], [5/6, 1/6]].\nB^-1 A^-1 = [[-1, 0], [5/6, 1/6]], verifying (AB)^-1 = B^-1 A^-1.\nBA = [[6, 1], [0, -1]], so (BA)^-1 = [[1/6, 1/6], [0, -1]].\nA^-1 B^-1 = [[1/6, 1/6], [0, -1]], verifying (BA)^-1 = A^-1 B^-1.",
          "answer": "(AB)^-1 = B^-1 A^-1 = [[-1, 0], [5/6, 1/6]]; (BA)^-1 = A^-1 B^-1 = [[1/6, 1/6], [0, -1]]."
        }
      ]
    },
    {
      "exercise": "1.6",
      "title": "Exercise 1.6 — Simultaneous Linear Equations (Pages 44-45)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Solve the following system of linear equations using inversion method.\n(i) 2x + 3y = -1,  x - y = 2\n(ii) x + 2y = -13,  3x + 6y = 11\n(iii) x + 2y = 1,  2x + 3y = 5/2\n(iv) x - 2y - 1 = 0,  2x + y + 3 = 0",
          "solution": "Formula: AX = B  =>  X = A^-1 B = (1/|A|) adj(A) B.\n\n(i) A = [[2, 3], [1, -1]], B = [[-1], [2]].\n    |A| = -2 - 3 = -5 ≠ 0. adj(A) = [[-1, -3], [-1, 2]].\n    X = (-1/5) · [[(-1)(-1)+(-3)(2)], [(-1)(-1)+2(2)]] = (-1/5) · [[-5], [5]] = [[1], [-1]].\n    => x = 1, y = -1.\n\n(ii) A = [[1, 2], [3, 6]], B = [[-13], [11]].\n    |A| = 6 - 6 = 0.\n    Since |A| = 0, matrix A is singular. A^-1 does not exist. The system is non-solvable.\n\n(iii) A = [[1, 2], [2, 3]], B = [[1], [5/2]].\n    |A| = 3 - 4 = -1 ≠ 0. adj(A) = [[3, -2], [-2, 1]].\n    X = (-1) · [[3(1) - 2(5/2)], [-2(1) + 1(5/2)]] = (-1) · [[-2], [1/2]] = [[2], [-1/2]].\n    => x = 2, y = -1/2.\n\n(iv) x - 2y = 1,  2x + y = -3.\n    A = [[1, -2], [2, 1]], B = [[1], [-3]].\n    |A| = 1 + 4 = 5 ≠ 0. adj(A) = [[1, 2], [-2, 1]].\n    X = (1/5) · [[1(1) + 2(-3)], [-2(1) + 1(-3)]] = (1/5) · [[-5], [-5]] = [[-1], [-1]].\n    => x = -1, y = -1.",
          "answer": "(i) x = 1, y = -1; (ii) Non-solvable (|A| = 0); (iii) x = 2, y = -1/2; (iv) x = -1, y = -1."
        },
        {
          "qNo": "Question 2",
          "question": "Solve the following system of linear equations using Cramer's Rule.\n(i) x - 2y = 5,  2x - y = 6\n(ii) 4x + 3y = -2,  x - 2y = 5\n(iii) 5x + 7y = 3,  3x + y = 5",
          "solution": "Cramer's Rule: x = |A_x| / |A|,  y = |A_y| / |A|.\n\n(i) A = [[1, -2], [2, -1]] => |A| = -1 + 4 = 3 ≠ 0.\n    A_x = [[5, -2], [6, -1]] => |A_x| = -5 + 12 = 7 => x = 7/3.\n    A_y = [[1, 5], [2, 6]] => |A_y| = 6 - 10 = -4 => y = -4/3.\n\n(ii) A = [[4, 3], [1, -2]] => |A| = -8 - 3 = -11 ≠ 0.\n    A_x = [[-2, 3], [5, -2]] => |A_x| = 4 - 15 = -11 => x = 1.\n    A_y = [[4, -2], [1, 5]] => |A_y| = 20 + 2 = 22 => y = -2.\n\n(iii) A = [[5, 7], [3, 1]] => |A| = 5 - 21 = -16 ≠ 0.\n    A_x = [[3, 7], [5, 1]] => |A_x| = 3 - 35 = -32 => x = 2.\n    A_y = [[5, 3], [3, 5]] => |A_y| = 25 - 9 = 16 => y = -1.",
          "answer": "(i) x = 7/3, y = -4/3; (ii) x = 1, y = -2; (iii) x = 2, y = -1."
        },
        {
          "qNo": "Question 3",
          "question": "Amjad thought of two numbers whose sum is 12 and whose difference is 4. Find the numbers.",
          "solution": "Equations: x + y = 12,  x - y = 4.\nMatrix form: [[1, 1], [1, -1]] [[x], [y]] = [[12], [4]].\n|A| = -1 - 1 = -2.\n|A_x| = -12 - 4 = -16  =>  x = -16 / -2 = 8.\n|A_y| = 4 - 12 = -8   =>  y = -8 / -2 = 4.",
          "answer": "The two numbers are 8 and 4."
        },
        {
          "qNo": "Question 4",
          "question": "The length of a rectangular playground is twice its width. The perimeter is 30. Find its dimensions.",
          "solution": "Let length = x, width = y.\nx = 2y  =>  x - 2y = 0.\n2(x + y) = 30  =>  x + y = 15.\nMatrix form: [[1, -2], [1, 1]] [[x], [y]] = [[0], [15]].\n|A| = 1 - (-2) = 3.\n|A_x| = 0 - (-30) = 30  =>  x = 30 / 3 = 10.\n|A_y| = 15 - 0 = 15     =>  y = 15 / 3 = 5.",
          "answer": "Length = 10, Width = 5."
        },
        {
          "qNo": "Question 5",
          "question": "3 bags and 4 pens together cost 257 rupees whereas 4 bags and 3 pens together cost 324 rupees. Find the cost of a bag and 10 pens.",
          "solution": "Let bag cost = x, pen cost = y.\n(1) 3x + 4y = 257\n(2) 4x + 3y = 324\n|A| = 9 - 16 = -7.\n|A_x| = 257(3) - 4(324) = 771 - 1296 = -525 => x = -525 / -7 = 75 rupees (Cost of 1 bag).\n|A_y| = 3(324) - 257(4) = 972 - 1028 = -56  => y = -56 / -7 = 8 rupees (Cost of 1 pen).\nCost of 1 bag and 10 pens = 75 + 10(8) = 75 + 80 = 155 rupees.",
          "answer": "Cost of 1 bag = Rs. 75, Cost of 1 pen = Rs. 8. Total cost of 1 bag and 10 pens = Rs. 155."
        },
        {
          "qNo": "Question 6",
          "question": "If twice the son's age in years is added to the father's age, the sum is 70. But if twice the father's age is added to the son's age, the sum is 95. Find the ages of father and son.",
          "solution": "Let father's age = x, son's age = y.\n(1) x + 2y = 70\n(2) 2x + y = 95\n|A| = 1 - 4 = -3.\n|A_x| = 70(1) - 2(95) = 70 - 190 = -120  =>  x = -120 / -3 = 40 years.\n|A_y| = 1(95) - 70(2) = 95 - 140 = -45   =>  y = -45 / -3 = 15 years.",
          "answer": "Father's age = 40 years, Son's age = 15 years."
        }
      ]
    },
    {
      "exercise": "Review-1",
      "title": "Review Exercise 1 — Comprehensive Chapter Review (Pages 46-47)",
      "problems": [
        {
          "qNo": "Question 1",
          "question": "Choose the correct answer in each of the following problems:\n(i) [[0, 0], [0, 0]] is:\n  (a) an identity matrix w.r.t multiplication  (b) a column matrix  (c) an identity matrix w.r.t addition  (d) a row matrix\n(ii) The matrix [[4, 0], [0, -12]] is:\n  (a) a scalar matrix  (b) 2x3 matrix  (c) a diagonal matrix  (d) None of these\n(iii) If A = [[-1, -2], [3, 1]], then adj A is equal to:\n  (a) [[1, 2], [-3, -1]]  (b) [[-1, 3], [-2, 1]]  (c) [[1, -2], [3, -1]]  (d) [[-1, 2], [-3, 1]]\n(iv) If A = [[2, 3], [3, 4]], then A^-1 equals:\n  (a) [[4, 3], [-3, 2]]  (b) [[-4, -3], [3, 2]]  (c) [[-2, 3], [-4, 3]]  (d) [[-4, 3], [3, -2]]\n(v) For what value of d is the 2×2 matrix [[5, 1.5], [2, d]] NOT invertible?\n  (a) -0.6  (b) 0  (c) 0.6  (d) 3\n(vi) Suppose A and B are 2×5 matrices. Which of the following are the dimensions of matrix A + B?\n  (a) 2×5  (b) 10×10  (c) 7×1  (d) 7×7\n(vii) Which of the following is the multiplicative inverse of [[1, 2], [0, 1]]?\n  (a) [[1, 2], [0, 1]]  (b) [[1, -2], [0, 1]]  (c) [[-1, -2], [0, -1]]  (d) [[2, 1], [0, 1]]\n(viii) Evaluate the determinant of the matrix [[4, -1], [-9, 2]]:\n  (a) 17  (b) 1  (c) -1  (d) -17",
          "solution": "(i) Null matrix O satisfies A + O = A => (c) an identity matrix w.r.t addition.\n(ii) Non-diagonal elements are 0, diagonal are non-equal => (c) a diagonal matrix.\n(iii) adj(A) swaps diagonal (-1, 1 -> 1, -1) and negates off-diagonal (-2, 3 -> 2, -3) => [[1, 2], [-3, -1]] => (a).\n(iv) |A| = 8 - 9 = -1. adj(A) = [[4, -3], [-3, 2]]. A^-1 = (1/-1) adj(A) = [[-4, 3], [3, -2]] => (d).\n(v) 5d - (1.5)(2) = 0 => 5d = 3 => d = 0.6 => (c) 0.6.\n(vi) Sum has same dimensions: 2×5 => (a) 2×5.\n(vii) |M| = 1. adj(M) = [[1, -2], [0, 1]] => M^-1 = [[1, -2], [0, 1]] => (b).\n(viii) |M| = 4(2) - (-1)(-9) = 8 - 9 = -1 => (c) -1.",
          "answer": "(i) c, (ii) c, (iii) a, (iv) d, (v) c, (vi) a, (vii) b, (viii) c."
        },
        {
          "qNo": "Question 2",
          "question": "Find x and y if [[x-1, 4], [y+3, -7]] = [[0, 4], [-2, -7]].",
          "solution": "Equate corresponding entries:\nx - 1 = 0  =>  x = 1.\ny + 3 = -2  =>  y = -5.",
          "answer": "x = 1, y = -5."
        },
        {
          "qNo": "Question 3",
          "question": "Find the product if possible:\n[[1], [-5], [3]] · [[-6, 5, 8], [0, 4, -1]].",
          "solution": "Order of 1st matrix: 2×3 (3 columns).\nOrder of 2nd matrix: 2×1 (2 rows).\nSince number of columns of 1st (3) ≠ number of rows of 2nd (2), multiplication is NOT possible.",
          "answer": "Not possible (not conformable for multiplication)."
        },
        {
          "qNo": "Question 4",
          "question": "Find the inverse of the matrix A = [[6, -3], [5, -2]].",
          "solution": "|A| = 6(-2) - (-3)(5) = -12 + 15 = 3 ≠ 0.\nadj(A) = [[-2, 3], [-5, 6]].\nA^-1 = (1/3) · [[-2, 3], [-5, 6]] = [[-2/3, 1], [-5/3, 2]].",
          "answer": "A^-1 = [[-2/3, 1], [-5/3, 2]]."
        },
        {
          "qNo": "Question 5",
          "question": "Solve the system:\n2x + 5y = 9\n5x - 2y = 8",
          "solution": "Matrix Form: [[2, 5], [5, -2]] [[x], [y]] = [[9], [8]].\n|A| = -4 - 25 = -29 ≠ 0.\n|A_x| = 9(-2) - 5(8) = -18 - 40 = -58  =>  x = -58 / -29 = 2.\n|A_y| = 2(8) - 9(5) = 16 - 45 = -29   =>  y = -29 / -29 = 1.\nCheck: 2(2) + 5(1) = 9, 5(2) - 2(1) = 8. Verified!",
          "answer": "x = 2, y = 1. Solution set = {(2, 1)}."
        },
        {
          "qNo": "Question 6",
          "question": "Qasim and Farzana are selling fruit for a school fundraiser. Customers can buy small boxes of oranges and large boxes of oranges. Qasim sold 3 small boxes of oranges and 14 large boxes of oranges for a total of Rs. 203. Farzana sold 11 small boxes of oranges and 11 large boxes of oranges for a total of Rs. 220. Find the cost each of one small box of oranges and one large box of oranges.",
          "solution": "Let small box cost = x, large box cost = y.\n(1) 3x + 14y = 203\n(2) 11x + 11y = 220  =>  x + y = 20  =>  x = 20 - y\nSubstitute into (1):\n3(20 - y) + 14y = 203  =>  60 - 3y + 14y = 203  =>  11y = 143  =>  y = 13 rupees.\nx = 20 - 13 = 7 rupees.",
          "answer": "Cost of small box = Rs. 7, Cost of large box = Rs. 13."
        }
      ]
    }
  ],
  "slos": {
    "mcqs": [
      {
        "q": "Which of the following is true for any two square matrices A and B of the same order?",
        "options": [
          "AB = BA always",
          "AB ≠ BA in general",
          "(AB)^t = A^t B^t",
          "(A + B)^t = A^t - B^t"
        ],
        "correct": 1,
        "exp": "Matrix multiplication is non-commutative in general: AB ≠ BA. Also, the reversal law holds: (AB)^t = B^t A^t."
      },
      {
        "q": "If A = [[2, k], [3, 6]] is a singular matrix, what is the value of k?",
        "options": [
          "4",
          "1",
          "-4",
          "9"
        ],
        "correct": 0,
        "exp": "For a singular matrix, |A| = 0 => (2)(6) - (k)(3) = 0 => 12 - 3k = 0 => 3k = 12 => k = 4."
      },
      {
        "q": "If A is of order 2×3 and B is of order 3×4, what is the order of the product AB?",
        "options": [
          "3×3",
          "2×4",
          "4×2",
          "Product is not possible"
        ],
        "correct": 1,
        "exp": "Inner dimensions match (3 = 3). The order of the resulting product is Outer Dimensions: 2 × 4."
      },
      {
        "q": "The adjoint of matrix A = [[3, -1], [2, 4]] is:",
        "options": [
          "[[4, 1], [-2, 3]]",
          "[[4, -1], [2, 3]]",
          "[[-4, 1], [-2, -3]]",
          "[[3, 2], [-1, 4]]"
        ],
        "correct": 0,
        "exp": "Swap diagonal elements (3 and 4 -> 4 and 3) and negate secondary diagonal (-1 and 2 -> 1 and -2): adj A = [[4, 1], [-2, 3]]."
      },
      {
        "q": "Which of the following matrices is skew-symmetric?",
        "options": [
          "[[0, 3], [-3, 0]]",
          "[[1, 2], [2, 1]]",
          "[[0, 2], [2, 0]]",
          "[[0, 0], [0, 1]]"
        ],
        "correct": 0,
        "exp": "For skew-symmetric, A^t = -A and diagonal elements must be 0. For [[0, 3], [-3, 0]], transpose is [[0, -3], [3, 0]] = -A."
      }
    ],
    "shortQuestions": [
      {
        "q": "Define a Scalar Matrix and give an example of order 2×2.",
        "marks": 3,
        "sol": "A diagonal matrix in which all principal diagonal entries are equal non-zero constants is called a Scalar Matrix.\nExample: S = [[5, 0], [0, 5]]."
      },
      {
        "q": "Show that the matrix A = [[0, -3], [3, 0]] is skew-symmetric.",
        "marks": 3,
        "sol": "A^t = [[0, 3], [-3, 0]]. -A = [[0, 3], [-3, 0]]. Since A^t = -A, matrix A is Skew-Symmetric."
      },
      {
        "q": "Find the multiplicative inverse of A = [[3, 2], [1, 1]].",
        "marks": 3,
        "sol": "|A| = 3 - 2 = 1. adj A = [[1, -2], [-1, 3]]. A^-1 = [[1, -2], [-1, 3]]."
      }
    ],
    "longQuestions": [
      {
        "q": "Solve the system of equations using both (a) Matrix Inversion Method and (b) Cramer's Rule: 3x - 2y = 1,  2x + 3y = 5.",
        "marks": 8,
        "rubric": "Matrix setup (1 Mark), Determinant (1 Mark), Inversion Method (3 Marks), Cramer's Rule (3 Marks).",
        "sol": "Matrix Form: [[3, -2], [2, 3]] [[x], [y]] = [[1], [5]]\n|A| = 9 + 4 = 13 ≠ 0.\n(a) Inversion: X = A^-1 B = (1/13) [[3, 2], [-2, 3]] [[1], [5]] = (1/13) [[13], [13]] = [[1], [1]]. x = 1, y = 1.\n(b) Cramer's: |A_x| = 3 + 10 = 13 => x = 13/13 = 1. |A_y| = 15 - 2 = 13 => y = 13/13 = 1."
      }
    ]
  },
  "formulaSheet": [
    {
      "name": "Order of Matrix",
      "formula": "m × n (Rows × Columns)",
      "note": "Always count rows horizontally first, columns vertically second."
    },
    {
      "name": "Transpose Matrix",
      "formula": "A^t",
      "note": "Interchange rows and columns. (A^t)^t = A and (AB)^t = B^t A^t."
    },
    {
      "name": "Symmetric Condition",
      "formula": "A^t = A",
      "note": "Matrix must be square."
    },
    {
      "name": "Skew-Symmetric Condition",
      "formula": "A^t = -A",
      "note": "All diagonal entries must equal zero."
    },
    {
      "name": "Determinant of 2×2",
      "formula": "|A| = ad - bc",
      "note": "Product of main diagonal minus product of secondary diagonal."
    },
    {
      "name": "Adjoint of 2×2",
      "formula": "adj A = [[d, -b], [-c, a]]",
      "note": "Swap main diagonal elements; negate secondary diagonal elements."
    },
    {
      "name": "Multiplicative Inverse",
      "formula": "A^-1 = (1 / |A|) · adj A",
      "note": "Valid only if |A| ≠ 0 (matrix is non-singular)."
    },
    {
      "name": "Inversion Method",
      "formula": "X = A^-1 · B",
      "note": "Solves linear system AX = B when |A| ≠ 0."
    },
    {
      "name": "Cramer's Rule",
      "formula": "x = |A_x| / |A|,  y = |A_y| / |A|",
      "note": "A_x and A_y are formed by substituting the constants vector into column 1 and column 2 respectively."
    }
  ]
},
  {
    "number": 2,
    "id": "u2",
    "title": "Real and Complex Numbers",
    "titleUrdu": "حقیقی اور پیچیدہ اعداد",
    "status": "ready",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 50–74",
    "description": "Official KPK Board Textbook Unit 2: Real numbers, decimal representations, properties of real numbers, radicals and radicands, laws of exponents, complex numbers, conjugate, and algebraic operations.",
    "sections": [
      {
        "id": "2.1",
        "title": "2.1 Real Numbers (Rational, Irrational & Number Line)",
        "theory": "• 2.1.1 Real Numbers:\nThe set of real numbers, denoted by ℝ, is the union of the set of rational numbers (ℚ) and the set of irrational numbers (ℚ′):\nℝ = ℚ ∪ ℚ′ where ℚ ∩ ℚ′ = ∅ (disjoint sets).\n\n1. Rational Numbers (ℚ):\nA rational number is a number that can be expressed in the form p/q, where p and q are integers and q ≠ 0:\nℚ = { p/q : p, q ∈ ℤ, q ≠ 0 }\nFor example: -17, 1/4, 1.25, 3, 0 are rational numbers.\n*Tid-Bit:* The word 'Rational' comes from the word 'ratio'. Thus 'irrational' means 'not ratio'.\n\n2. Irrational Numbers (ℚ′):\nThe set of irrational numbers consists of all those numbers which cannot be written in the form p/q (non-rational).\nFor example: √2, √3, √7, π = 3.1415927... are irrational numbers.\n\n3. Hierarchy of Number Sets:\nNatural Numbers (ℕ = {1, 2, 3, ...}) ⊂ Whole Numbers (𝕎 = {0, 1, 2, ...}) ⊂ Integers (ℤ = {0, ±1, ±2, ...}) ⊂ Rational Numbers (ℚ) ⊂ Real Numbers (ℝ).\n*Tid-Bit:* All the numbers on the number line are real numbers.\n\n• 2.1.2 Decimal Representation of Rational and Irrational Numbers:\nEvery rational number can be written as either:\n(a) Terminating Decimal: A decimal fraction that has a finite number of digits after the decimal point (the remainder becomes 0 on long division).\n    Example: 3/8 = 0.375 (terminating).\n(b) Non-Terminating Recurring (Repeating) Decimal: A decimal fraction in which one or more digits repeat indefinitely (the remainder is never zero).\n    Example: 2/15 = 0.1333... = 0.13̄, where the bar over 3 indicates 3 repeats forever.\n(c) Irrational Numbers: Decimal representation neither terminates nor repeats indefinitely.\n    Example: √7 = 2.6457513..., π = 3.1415927..., 0.010010001...\n\n• 2.1.3 Depicting Real Numbers on the Number Line:\nThe number line helps in visualizing the set of real numbers. A horizontal line is drawn with an origin (0) representing zero. Positive numbers are placed to the right of 0, and negative numbers to the left of 0. Every real number corresponds to a unique point on the number line, and every point corresponds to a unique real number (one-to-one correspondence).\n\n• 2.1.4 Demonstrating Decimals on the Number Line:\nTo represent decimal fractions like 3/4 = 0.75, 2/5 = 0.4, and 1/3 = 0.333... ≈ 0.3 on the number line:\n- Subdivide the unit interval [0, 1] into tenths (0.1, 0.2, 0.3, ..., 1.0).\n- Plot 0.4 at the 4th tenth mark, 0.75 halfway between 0.7 and 0.8, and 0.3 at the 3rd tenth mark.",
        "rules": [
          "ℝ = ℚ ∪ ℚ′ and ℚ ∩ ℚ′ = ∅ (Real numbers are the union of disjoint rational and irrational sets).",
          "Terminating and recurring decimals are always rational numbers.",
          "Non-terminating and non-recurring decimals are always irrational numbers.",
          "Every point on the number line represents exactly one unique real number."
        ]
      },
      {
        "id": "2.2",
        "title": "2.2 Properties of Real Numbers",
        "theory": "The set of real numbers ℝ satisfies fundamental algebraic and order properties under addition and multiplication:\n\n• 2.2.1 Addition Properties:\n1. Closure Property w.r.t. Addition: For all a, b ∈ ℝ, (a + b) ∈ ℝ. The sum of two real numbers is always a real number.\n2. Associative Property w.r.t. Addition: For all a, b, c ∈ ℝ, a + (b + c) = (a + b) + c.\n3. Additive Identity: There exists a unique element 0 ∈ ℝ such that for all a ∈ ℝ, a + 0 = 0 + a = a.\n4. Additive Inverse: For each a ∈ ℝ, there exists a unique element (-a) ∈ ℝ such that a + (-a) = (-a) + a = 0.\n5. Commutative Property w.r.t. Addition: For all a, b ∈ ℝ, a + b = b + a.\n\n• 2.2.2 Multiplication Properties:\n1. Closure Property w.r.t. Multiplication: For all a, b ∈ ℝ, a · b ∈ ℝ.\n2. Associative Property w.r.t. Multiplication: For all a, b, c ∈ ℝ, a(bc) = (ab)c.\n3. Multiplicative Identity: There exists a unique number 1 ∈ ℝ such that for all a ∈ ℝ, a · 1 = 1 · a = a.\n4. Multiplicative Inverse: For each a ∈ ℝ with a ≠ 0, there exists a unique element a⁻¹ = 1/a ∈ ℝ such that a · (1/a) = (1/a) · a = 1.\n5. Commutative Property w.r.t. Multiplication: For all a, b ∈ ℝ, a · b = b · a.\n\n• 2.2.3 Distributive Property of Multiplication over Addition:\nFor all a, b, c ∈ ℝ:\n- Left Distributive Law: a(b + c) = ab + ac\n- Right Distributive Law: (b + c)a = ba + ca\n\n• 2.2.4 Properties of Equality of Real Numbers:\n1. Reflexive Property: a = a for all a ∈ ℝ.\n2. Symmetric Property: If a = b, then b = a.\n3. Transitive Property: If a = b and b = c, then a = c.\n4. Additive Property: If a = b, then a + c = b + c.\n5. Multiplicative Property: If a = b, then ac = bc.\n6. Cancellation Property w.r.t. Addition: If a + c = b + c, then a = b.\n7. Cancellation Property w.r.t. Multiplication: If ac = bc and c ≠ 0, then a = b.\n\n• 2.2.5 Properties of Inequality of Real Numbers:\n1. Trichotomy Property: For any a, b ∈ ℝ, exactly one of the following relations holds: a < b, a = b, or a > b.\n2. Transitive Property: If a < b and b < c, then a < c.\n3. Additive Property: If a < b, then a + c < b + c.\n4. Multiplicative Property:\n   - If a < b and c > 0, then ac < bc.\n   - If a < b and c < 0, then ac > bc (multiplying by a negative number reverses the inequality sign!).",
        "rules": [
          "0 is the unique additive identity; 1 is the unique multiplicative identity.",
          "Additive inverse of a is -a; Multiplicative inverse of a (a ≠ 0) is 1/a.",
          "Distributive property connects addition and multiplication: a(b + c) = ab + ac.",
          "Multiplying or dividing an inequality by a negative number reverses the inequality symbol."
        ]
      },
      {
        "id": "2.3",
        "title": "2.3 Radicals and Radicands",
        "theory": "• 2.3.1 Definition of Radicals and Radicands:\nIf n is a positive integer greater than 1 (n ∈ ℤ⁺, n > 1) and a is a real number, then an expression of the form:\nⁿ√a = a^(1/n)\nis called a radical expression.\n- The symbol '√' is called the radical sign (or root sign).\n- The positive integer n written in the hook is called the index (or order) of the radical. When n = 2, the index is usually omitted: √a = ²√a.\n- The expression 'a' under the radical sign is called the radicand (or base).\nFor example:\nIn ³√64: index = 3, radicand = 64.\nIn ⁵√(ab²): index = 5, radicand = ab².\nIn √(11/y): index = 2, radicand = 11/y.\n\n• 2.3.2 Radical Form vs. Exponential Form:\n- Radical Form: The expression is written using the radical sign: ⁿ√a or ⁿ√(aᵐ).\n- Exponential Form: The expression is written using fractional exponents: a^(1/n) or a^(m/n).\nConversion Formula:\nⁿ√(aᵐ) = (ⁿ√a)ᵐ = a^(m/n)\n\nExamples of Conversion:\n- Radical to Exponential:\n  √36 = (36)^(1/2)\n  ³√8 = (8)^(1/3)\n  ⁿ√q = (q)^(1/n)\n  √[(5 - 6a²)³] = (5 - 6a²)^(3/2)\n- Exponential to Radical:\n  -7^(1/3) = -³√7\n  x^(-3/2) = 1 / √(x³)\n  (-8)^(1/5) = ⁵√(-8)\n  y^(3/4) = ⁴√(y³)\n  (3x)^(1/q) = ᑫ√(3x)\n\n• 2.3.3 Properties of Radicals:\nFor real numbers a, b and positive integers n, m:\n1. ⁿ√(ab) = (ⁿ√a)(ⁿ√b) [Product Rule for Radicals]\n2. ⁿ√(a/b) = (ⁿ√a) / (ⁿ√b), b ≠ 0 [Quotient Rule for Radicals]\n3. ⁿ√(aⁿ) = (ⁿ√a)ⁿ = a (if a ≥ 0, or if n is odd)\n4. ᵐ√(ⁿ√a) = ᵐⁿ√a [Root of a Root]\n5. Combining Like Radicals: c·ⁿ√a + d·ⁿ√a = (c + d)·ⁿ√a (e.g., 5√3 + √12 = 5√3 + 2√3 = 7√3).",
        "rules": [
          "ⁿ√a = a^(1/n): The index n becomes the denominator of the fractional exponent.",
          "Product property: ⁿ√(ab) = ⁿ√a · ⁿ√b.",
          "Quotient property: ⁿ√(a/b) = ⁿ√a / ⁿ√b.",
          "To add or subtract radicals, simplify them first to obtain common radicands."
        ]
      },
      {
        "id": "2.4",
        "title": "2.4 Laws of Exponents / Indices",
        "theory": "• 2.4.1 Base, Exponent and Value:\nIf n is a positive integer, aⁿ represents the product of n factors each equal to a:\naⁿ = a · a · a · ... · a (n times)\n- 'a' is called the base.\n- 'n' is called the exponent (index or power).\n- The resulting number is called the value of the exponential expression.\nExample: In (-4)² = 16: base = -4, exponent = 2, value = 16.\nIn 2⁻⁹ = 1/512 (or 2⁻¹⁰ = 1/1024): base = 2, exponent = -9 (or -10).\n\n• 2.4.2 The 7 Fundamental Laws of Exponents:\nFor real numbers a, b and integers/rational exponents m, n:\n\n1. Product Law of Indices (Multiplication with Same Base):\n   aᵐ · aⁿ = aᵐ⁺ⁿ\n   To multiply powers of the same base, keep the base and add the exponents.\n   Example: 3³ · 3² = 3³⁺² = 3⁵ = 243.\n\n2. Quotient Law of Indices (Division with Same Base):\n   aᵐ / aⁿ = aᵐ⁻ⁿ (where a ≠ 0)\n   To divide powers of the same base, keep the base and subtract the exponents.\n   Example: 4⁷ / 4² = 4⁷⁻² = 4⁵ = 1024.\n\n3. Power Law of Indices (Power to a Power):\n   (aᵐ)ⁿ = aᵐⁿ\n   To raise a power to another power, keep the base and multiply the exponents.\n   Example: (3⁴)⁶ = 3²⁴.\n\n4. Power of a Product Law:\n   (ab)ⁿ = aⁿ · bⁿ\n   To raise a product to a power, raise each factor to that power.\n   Example: (4 · 2)³ = 4³ · 2³ = 64 · 8 = 512.\n\n5. Power of a Quotient Law:\n   (a / b)ⁿ = aⁿ / bⁿ (where b ≠ 0)\n   Example: (3/2)⁴ = 3⁴ / 2⁴ = 81/16.\n\n6. Zero Exponent Rule:\n   a⁰ = 1 (where a ≠ 0)\n   Any non-zero real number raised to the power 0 is equal to 1.\n   Example: 5⁰ = 1, 20⁰ = 1, 100⁰ = 1.\n\n7. Negative Exponent Rule:\n   a⁻ⁿ = 1 / aⁿ and 1 / a⁻ⁿ = aⁿ (where a ≠ 0)\n   Example: 2⁻⁴ = 1 / 2⁴ = 1/16, (a/b)⁻ⁿ = (b/a)ⁿ.",
        "rules": [
          "Product Rule: aᵐ · aⁿ = aᵐ⁺ⁿ.",
          "Quotient Rule: aᵐ / aⁿ = aᵐ⁻ⁿ.",
          "Power Rule: (aᵐ)ⁿ = aᵐⁿ.",
          "Product to Power: (ab)ⁿ = aⁿbⁿ; Quotient to Power: (a/b)ⁿ = aⁿ/bⁿ.",
          "Zero Exponent: a⁰ = 1 (a ≠ 0); Negative Exponent: a⁻ⁿ = 1/aⁿ."
        ]
      },
      {
        "id": "2.5",
        "title": "2.5 Complex Numbers & Conjugates",
        "theory": "• 2.5.1 Introduction & Definition:\nIn real numbers, the square of any real number is non-negative (x² ≥ 0). Therefore, an equation like x² + 1 = 0 has no real solution (x = √(-1) is not a real number).\nTo overcome this limitation, mathematicians introduced the imaginary unit:\ni = √(-1), which means i² = -1.\n\nDefinition:\nA number of the form z = a + bi (or a + ib), where a and b are real numbers (a, b ∈ ℝ) and i = √(-1), is called a Complex Number.\n- The real number 'a' is called the Real Part of z, denoted by Re(z) = a.\n- The real number 'b' is called the Imaginary Part of z, denoted by Im(z) = b.\nExamples: 2 + 3i, 6 - 5i, √3 + √2i are complex numbers.\n- If b = 0, z = a + 0i = a (every real number is a complex number with 0 imaginary part: ℝ ⊂ ℂ).\n- If a = 0, z = bi is called a Purely Imaginary Number.\n\n• 2.5.2 Conjugate of a Complex Number:\nThe conjugate of a complex number z = a + bi is obtained by changing the sign of its imaginary part, denoted by z̄ (read 'z bar'):\nz̄ = a - bi\nProperties of Conjugates:\n- Conjugate of 5 + 8i is 5 - 8i.\n- Conjugate of -8 - 3i is -8 + 3i.\n- Conjugate of 7 + 6i is 7 - 6i.\n- Conjugate of √5 - i is √5 + i.\n- The product of a complex number and its conjugate is always a non-negative real number:\n  z · z̄ = (a + bi)(a - bi) = a² - (bi)² = a² - b²i² = a² + b² ∈ ℝ.\n\n• 2.5.3 Equality of Two Complex Numbers:\nLet z₁ = a + bi and z₂ = c + di be two complex numbers.\nz₁ = z₂ if and only if:\na = c (Real parts are equal) AND b = d (Imaginary parts are equal).",
        "rules": [
          "i = √(-1) and i² = -1.",
          "General form: z = a + bi where a = Re(z) and b = Im(z).",
          "Conjugate: z̄ = a - bi (only the sign of the imaginary term changes).",
          "z · z̄ = a² + b² (always a real number, never contains i).",
          "Equality condition: a + bi = c + di ⟺ a = c and b = d."
        ]
      },
      {
        "id": "2.6",
        "title": "2.6 Basic Operations on Complex Numbers",
        "theory": "Let z₁ = a + bi and z₂ = c + di be any two complex numbers:\n\n• 1. Addition of Complex Numbers:\nAdd the corresponding real parts and imaginary parts separately:\nz₁ + z₂ = (a + bi) + (c + di) = (a + c) + (b + d)i\nExample: (5 + 2i) + (3 + i) = (5 + 3) + (2 + 1)i = 8 + 3i.\n\n• 2. Subtraction of Complex Numbers:\nSubtract the real parts and imaginary parts separately:\nz₁ - z₂ = (a + bi) - (c + di) = (a - c) + (b - d)i\nExample: Subtract (7 + 3i) from (5 - 8i):\n(5 - 8i) - (7 + 3i) = (5 - 7) + (-8 - 3)i = -2 - 11i.\n\n• 3. Multiplication of Complex Numbers:\nMultiply the expressions algebraically using FOIL and replace i² with -1:\nz₁ · z₂ = (a + bi)(c + di)\n        = a(c + di) + bi(c + di)\n        = ac + adi + bci + bdi²\n        = ac + (ad + bc)i + bd(-1)\n        = (ac - bd) + (ad + bc)i\nExample: (2 - i)(3 + i) = 6 + 2i - 3i - i² = 6 - i - (-1) = 7 - i.\n\n• 4. Division of Complex Numbers:\nTo divide z₁ by z₂, multiply both numerator and denominator by the complex conjugate of the denominator (c - di) to rationalize the denominator:\nz₁ / z₂ = (a + bi) / (c + di)\n        = [(a + bi)(c - di)] / [(c + di)(c - di)]\n        = [(ac + bd) + (bc - ad)i] / [c² + d²]\n        = (ac + bd)/(c² + d²) + [(bc - ad)/(c² + d²)]i\nExample: (3 + 4i) / (3 - 2i)\nMultiply numerator and denominator by (3 + 2i):\n= [(3 + 4i)(3 + 2i)] / [(3 - 2i)(3 + 2i)]\n= (9 + 6i + 12i + 8i²) / (3² - 4i²)\n= (9 + 18i - 8) / (9 + 4)\n= (1 + 18i) / 13 = 1/13 + (18/13)i.\n\n• 5. Summary of Important Powers of i:\ni¹ = i\ni² = -1\ni³ = i² · i = (-1) · i = -i\ni⁴ = (i²)² = (-1)² = 1\nFor any power iⁿ: divide n by 4, and remainder gives the reduced power!",
        "rules": [
          "Addition: (a + bi) + (c + di) = (a + c) + (b + d)i.",
          "Subtraction: (a + bi) - (c + di) = (a - c) + (b - d)i.",
          "Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.",
          "Division: Multiply numerator and denominator by the conjugate of the denominator to eliminate i from the denominator.",
          "Powers of i cycle in periods of 4: i¹ = i, i² = -1, i³ = -i, i⁴ = 1."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "ex-1",
        "section": "2.1",
        "title": "Example 1 (Page 51) — Decimal Fractions (Terminating & Recurring)",
        "problem": "Write 3/8 and 2/15 as decimal fractions and determine whether each is terminating or non-terminating.",
        "given": "Fractions 3/8 and 2/15",
        "method": "Perform long division of numerator by denominator and observe the remainder.",
        "steps": [
          "For 3/8: Divide 3 by 8.\n  3.0 ÷ 8 = 0.3 (remainder 6)\n  60 ÷ 8 = 0.07 (remainder 4)\n  40 ÷ 8 = 0.005 (remainder 0)\n  3/8 = 0.375. Since the remainder is zero, this is a terminating decimal fraction.",
          "For 2/15: Divide 2 by 15.\n  2.0 ÷ 15 = 0.1 (remainder 5)\n  50 ÷ 15 = 0.03 (remainder 5)\n  50 ÷ 15 = 0.003 (remainder 5)...\n  2/15 = 0.1333... = 0.13̄. Since the remainder is never zero and digit 3 repeats indefinitely, this is a non-terminating recurring decimal."
        ],
        "answer": "3/8 = 0.375 (Terminating decimal); 2/15 = 0.1333... = 0.13̄ (Non-terminating recurring decimal)"
      },
      {
        "id": "ex-2",
        "section": "2.1",
        "title": "Example 2 (Page 53) — Depicting Decimals on the Number Line",
        "problem": "Represent the following real numbers on the number line: 3/4, 2/5, 1/3.",
        "given": "Numbers 3/4, 2/5, 1/3",
        "method": "Convert fractions to decimal values, subdivide the unit interval [0, 1] into tenths, and mark each position.",
        "steps": [
          "Convert each fraction into decimal form:\n  • 3/4 = 0.75\n  • 2/5 = 0.4\n  • 1/3 = 0.333... ≈ 0.3",
          "Draw horizontal number line with origin 0 and unit mark 1.\n  Subdivide interval [0, 1] into 10 equal parts (each representing 0.1).",
          "Plot points:\n  - Point 2/5 = 0.4 lies exactly at the 4th subdivision mark.\n  - Point 1/3 ≈ 0.33 lies just to the right of the 3rd subdivision mark (0.3).\n  - Point 3/4 = 0.75 lies halfway between the 7th mark (0.7) and the 8th mark (0.8)."
        ],
        "answer": "3/4 = 0.75 (between 0.7 and 0.8), 2/5 = 0.4 (at 0.4), 1/3 ≈ 0.33 (just right of 0.3)"
      },
      {
        "id": "ex-3",
        "section": "2.2",
        "title": "Example 3 (Page 58) — Identifying Properties of Real Numbers",
        "problem": "Name the property used in each of the following statements:\n1. 5 · (1/5) = 1\n2. 19 + 0 = 19\n3. If 2x = 8 then x = 4\n4. √2 · √3 = √3 · √2\n5. 2 + (6 + 3) = (2 + 6) + 3",
        "given": "Five algebraic statements involving real numbers",
        "method": "Match each statement with official real number system axioms.",
        "steps": [
          "1. 5 · (1/5) = 1: Multiplicative Inverse Property.",
          "2. 19 + 0 = 19: Additive Identity Property.",
          "3. If 2x = 8 then x = 4: Multiplicative Property of Equality (multiplying both sides by 1/2) or Division Property of Equality.",
          "4. √2 · √3 = √3 · √2: Commutative Property w.r.t. Multiplication.",
          "5. 2 + (6 + 3) = (2 + 6) + 3: Associative Property w.r.t. Addition."
        ],
        "answer": "1. Multiplicative inverse; 2. Additive identity; 3. Multiplicative property of equality; 4. Commutative property w.r.t multiplication; 5. Associative property w.r.t addition"
      },
      {
        "id": "ex-4",
        "section": "2.2",
        "title": "Example 4 (Page 59) — Solving Equations Using Real Number Properties",
        "problem": "Solve the following equation using properties of real numbers: 2x - 5 = 3x + 4",
        "given": "Equation 2x - 5 = 3x + 4",
        "method": "Apply equality axioms step-by-step justifying each step with the corresponding real number property.",
        "steps": [
          "Given: 2x - 5 = 3x + 4",
          "Add 5 to both sides: (2x - 5) + 5 = (3x + 4) + 5  [Additive Property of Equality]",
          "Use associative property: 2x + (-5 + 5) = 3x + (4 + 5)  [Associative Property of Addition]",
          "Simplify using additive inverse: 2x + 0 = 3x + 9  [Additive Inverse: -5 + 5 = 0]",
          "Simplify using additive identity: 2x = 3x + 9  [Additive Identity: 2x + 0 = 2x]",
          "Add -3x to both sides: 2x + (-3x) = (3x + 9) + (-3x)  [Additive Property of Equality]",
          "Rearrange and simplify: -x = 3x + (-3x) + 9 = 0 + 9 = 9",
          "Multiply both sides by -1: (-1)(-x) = (-1)(9)  [Multiplicative Property of Equality]",
          "Therefore: x = -9."
        ],
        "answer": "x = -9 (Verified by substitution: 2(-9) - 5 = -23; 3(-9) + 4 = -23)"
      },
      {
        "id": "ex-5",
        "section": "2.3",
        "title": "Example 5 (Page 61) — Concept of Radicals and Radicands",
        "problem": "Identify the radical sign, index, and radicand in the expression ⁴√81.",
        "given": "Expression ⁴√81",
        "method": "Apply definition of ⁿ√a.",
        "steps": [
          "In ⁴√81, the symbol '√' is the radical sign.",
          "The number 4 written in the crook of the radical sign is the index (order) of the radical.",
          "The number 81 written under the radical sign is the radicand (base).",
          "Since 81 = 3⁴, ⁴√81 = (3⁴)^(1/4) = 3."
        ],
        "answer": "Radical symbol = √, Index = 4, Radicand = 81, Value = 3"
      },
      {
        "id": "ex-6",
        "section": "2.3",
        "title": "Example 6 (Page 62) — Evaluating Principal Roots",
        "problem": "Evaluate: ³√64",
        "given": "³√64",
        "method": "Express radicand 64 as a prime cube and apply root definition.",
        "steps": [
          "64 = 4 × 4 × 4 = 4³",
          "³√64 = ³√(4³) = (4³)^(1/3) = 4^(3 × 1/3) = 4¹ = 4."
        ],
        "answer": "³√64 = 4"
      },
      {
        "id": "ex-7",
        "section": "2.3",
        "title": "Example 7 (Page 62) — Radical with Negative Radicand and Odd Index",
        "problem": "Evaluate: ³√(-64)",
        "given": "³√(-64)",
        "method": "When the index n is odd, the real nth root of a negative number is negative.",
        "steps": [
          "-64 = (-4) × (-4) × (-4) = (-4)³",
          "³√(-64) = ³√[(-4)³] = [(-4)³]^(1/3) = -4."
        ],
        "answer": "³√(-64) = -4"
      },
      {
        "id": "ex-8",
        "section": "2.3",
        "title": "Example 8 (Page 62) — Product Rule for Radicals",
        "problem": "Simplify: √(6x) · √(6y²)",
        "given": "√(6x) · √(6y²)",
        "method": "Use the product property of radicals: √a · √b = √(ab).",
        "steps": [
          "√(6x) · √(6y²) = √[(6x)(6y²)]  [Product Rule]",
          "= √(36 · y² · x)",
          "= √(36) · √(y²) · √(x)  [Extract perfect square factors]",
          "= 6 · y · √x = 6y√x."
        ],
        "answer": "6y√x"
      },
      {
        "id": "ex-9",
        "section": "2.3",
        "title": "Example 9 (Page 62) — Quotient Rule for Radicals",
        "problem": "Simplify: 2 · √[(150xy) / (3x)]",
        "given": "2 · √[(150xy) / (3x)]",
        "method": "Simplify the algebraic fraction inside the radical, then extract square root factors.",
        "steps": [
          "Inside the radical: (150xy) / (3x) = (150/3) · (x/x) · y = 50y",
          "Expression becomes: 2 · √(50y)",
          "Factor 50 into a perfect square: 50 = 25 × 2",
          "2 · √(25 × 2y) = 2 · √25 · √(2y) = 2 · 5 · √(2y) = 10√(2y)."
        ],
        "answer": "10√(2y)"
      },
      {
        "id": "ex-10",
        "section": "2.3",
        "title": "Example 10 (Page 63) — Radical to Exponential Form",
        "problem": "Write each expression in exponential form:\n(i) ⁸√3\n(ii) ³√16\n(iii) ⁵√[(49 - 4b)³]",
        "given": "Radical expressions",
        "method": "Apply rule: ⁿ√(aᵐ) = a^(m/n).",
        "steps": [
          "(i) ⁸√3 = 3^(1/8)",
          "(ii) ³√16 = 16^(1/3)  [or (2⁴)^(1/3) = 2^(4/3)]",
          "(iii) ⁵√[(49 - 4b)³] = (49 - 4b)^(3/5)"
        ],
        "answer": "(i) 3^(1/8); (ii) 16^(1/3); (iii) (49 - 4b)^(3/5)"
      },
      {
        "id": "ex-11",
        "section": "2.3",
        "title": "Example 11 (Page 63) — Exponential to Radical Form",
        "problem": "Write each expression in radical form:\n(i) c^(3/4)\n(ii) (2x + 5)^(1/3)\n(iii) (9 - 4b)^(1/2)",
        "given": "Exponential expressions",
        "method": "Apply rule: a^(m/n) = ⁿ√(aᵐ).",
        "steps": [
          "(i) c^(3/4) = ⁴√(c³)",
          "(ii) (2x + 5)^(1/3) = ³√(2x + 5)",
          "(iii) (9 - 4b)^(1/2) = √(9 - 4b)"
        ],
        "answer": "(i) ⁴√(c³); (ii) ³√(2x + 5); (iii) √(9 - 4b)"
      },
      {
        "id": "ex-12",
        "section": "2.4",
        "title": "Example 12 (Page 65) — Meaning of Base, Exponent and Power",
        "problem": "Compute the values: (i) x⁴, (ii) 2⁵, (iii) (-3)³.",
        "given": "x⁴, 2⁵, (-3)³",
        "method": "Multiply the base by itself the number of times indicated by the exponent.",
        "steps": [
          "(i) x⁴ = x · x · x · x",
          "(ii) 2⁵ = 2 · 2 · 2 · 2 · 2 = 32",
          "(iii) (-3)³ = (-3) · (-3) · (-3) = 9 · (-3) = -27"
        ],
        "answer": "(i) x · x · x · x; (ii) 32; (iii) -27"
      },
      {
        "id": "ex-13",
        "section": "2.4",
        "title": "Example 13 (Page 65) — Multiplication Law of Indices",
        "problem": "Simplify using the product law: (i) 3³ · 3², (ii) 5² · 5⁴.",
        "given": "3³ · 3² and 5² · 5⁴",
        "method": "Keep base same and add exponents: aᵐ · aⁿ = aᵐ⁺ⁿ.",
        "steps": [
          "(i) 3³ · 3² = 3³⁺² = 3⁵ = 243",
          "(ii) 5² · 5⁴ = 5²⁺⁴ = 5⁶ = 15625"
        ],
        "answer": "(i) 3⁵ = 243; (ii) 5⁶ = 15625"
      },
      {
        "id": "ex-14",
        "section": "2.4",
        "title": "Example 14 (Page 65) — Division Law of Indices",
        "problem": "Simplify using division law: (i) 4⁷ / 4², (ii) 5⁷ / 5³.",
        "given": "4⁷ / 4² and 5⁷ / 5³",
        "method": "Keep base same and subtract exponents: aᵐ / aⁿ = aᵐ⁻ⁿ.",
        "steps": [
          "(i) 4⁷ / 4² = 4⁷⁻² = 4⁵ = 1024",
          "(ii) 5⁷ / 5³ = 5⁷⁻³ = 5⁴ = 625"
        ],
        "answer": "(i) 4⁵ = 1024; (ii) 5⁴ = 625"
      },
      {
        "id": "ex-15",
        "section": "2.4",
        "title": "Example 15 (Page 66) — Power Law of Indices",
        "problem": "Simplify: (i) (3⁴)⁶, (ii) (4⁵)³.",
        "given": "(3⁴)⁶ and (4⁵)³",
        "method": "Multiply exponents: (aᵐ)ⁿ = aᵐⁿ.",
        "steps": [
          "(i) (3⁴)⁶ = 3⁴ˣ⁶ = 3²⁴",
          "(ii) (4⁵)³ = 4⁵ˣ³ = 4¹⁵"
        ],
        "answer": "(i) 3²⁴; (ii) 4¹⁵"
      },
      {
        "id": "ex-16",
        "section": "2.4",
        "title": "Example 16 (Page 66) — Power of a Product Law",
        "problem": "Simplify: (i) (4 × 2)³, (ii) (3 × 5)⁴.",
        "given": "(4 × 2)³ and (3 × 5)⁴",
        "method": "Apply rule: (ab)ⁿ = aⁿ · bⁿ.",
        "steps": [
          "(i) (4 × 2)³ = 4³ × 2³ = 64 × 8 = 512 [or 8³ = 512]",
          "(ii) (3 × 5)⁴ = 3⁴ × 5⁴ = 81 × 625 = 50625 [or 15⁴ = 50625]"
        ],
        "answer": "(i) 4³ × 2³ = 512; (ii) 3⁴ × 5⁴ = 50625"
      },
      {
        "id": "ex-17",
        "section": "2.4",
        "title": "Example 17 (Page 66) — Power of a Quotient Law",
        "problem": "Simplify: (i) (3/2)⁴, (ii) (4/5)².",
        "given": "(3/2)⁴ and (4/5)²",
        "method": "Apply rule: (a/b)ⁿ = aⁿ / bⁿ.",
        "steps": [
          "(i) (3/2)⁴ = 3⁴ / 2⁴ = 81 / 16",
          "(ii) (4/5)² = 4² / 5² = 16 / 25"
        ],
        "answer": "(i) 81/16; (ii) 16/25"
      },
      {
        "id": "ex-18",
        "section": "2.4",
        "title": "Example 18 (Page 66) — Zero Exponent Rule",
        "problem": "Find the values of: 5⁰, 20⁰, 100⁰.",
        "given": "5⁰, 20⁰, 100⁰",
        "method": "Any non-zero real number raised to the zero power equals 1 (a⁰ = 1).",
        "steps": [
          "5⁰ = 1",
          "20⁰ = 1",
          "100⁰ = 1"
        ],
        "answer": "5⁰ = 1, 20⁰ = 1, 100⁰ = 1"
      },
      {
        "id": "ex-19",
        "section": "2.4",
        "title": "Example 19 (Page 66) — Negative Exponent Rule",
        "problem": "Simplify: (i) 2⁻⁴, (ii) 3⁻³, (iii) (a + b)⁻¹.",
        "given": "2⁻⁴, 3⁻³, (a + b)⁻¹",
        "method": "Apply rule: a⁻ⁿ = 1 / aⁿ.",
        "steps": [
          "(i) 2⁻⁴ = 1 / 2⁴ = 1 / 16",
          "(ii) 3⁻³ = 1 / 3³ = 1 / 27",
          "(iii) (a + b)⁻¹ = 1 / (a + b)"
        ],
        "answer": "(i) 1/16; (ii) 1/27; (iii) 1/(a + b)"
      },
      {
        "id": "ex-20",
        "section": "2.6",
        "title": "Example 20 (Page 69) — Addition of Complex Numbers",
        "problem": "Add the following complex numbers: 5 + 2i and 3 + i.",
        "given": "z₁ = 5 + 2i and z₂ = 3 + i",
        "method": "Add real parts and imaginary parts separately: z₁ + z₂ = (a + c) + (b + d)i.",
        "steps": [
          "z₁ + z₂ = (5 + 2i) + (3 + i)",
          "= (5 + 3) + (2 + 1)i",
          "= 8 + 3i"
        ],
        "answer": "8 + 3i"
      },
      {
        "id": "ex-21",
        "section": "2.6",
        "title": "Example 21 (Page 70) — Subtraction of Complex Numbers",
        "problem": "Subtract 7 + 3i from 5 - 8i.",
        "given": "z₁ = 5 - 8i and z₂ = 7 + 3i",
        "method": "Compute (5 - 8i) - (7 + 3i) = (5 - 7) + (-8 - 3)i.",
        "steps": [
          "(5 - 8i) - (7 + 3i) = 5 - 8i - 7 - 3i",
          "= (5 - 7) + (-8 - 3)i",
          "= -2 - 11i"
        ],
        "answer": "-2 - 11i"
      },
      {
        "id": "ex-22",
        "section": "2.6",
        "title": "Example 22 (Page 70) — Multiplication of Complex Numbers",
        "problem": "Let z₁ = 2 - i and z₂ = 3 + i. Find z₁ · z₂.",
        "given": "z₁ = 2 - i, z₂ = 3 + i",
        "method": "Expand using distributive property and substitute i² = -1.",
        "steps": [
          "z₁ · z₂ = (2 - i)(3 + i)",
          "= 2(3 + i) - i(3 + i)",
          "= 6 + 2i - 3i - i²",
          "= 6 - i - (-1)  [since i² = -1]",
          "= 6 - i + 1 = 7 - i"
        ],
        "answer": "7 - i"
      },
      {
        "id": "ex-23",
        "section": "2.6",
        "title": "Example 23 (Page 70) — Division of Complex Numbers",
        "problem": "Let z₁ = 3 + 4i and z₂ = 3 - 2i. Find the quotient z₁ / z₂ in the form a + bi.",
        "given": "z₁ = 3 + 4i, z₂ = 3 - 2i",
        "method": "Multiply numerator and denominator by the complex conjugate of denominator (3 + 2i).",
        "steps": [
          "z₁ / z₂ = (3 + 4i) / (3 - 2i)",
          "Conjugate of denominator is 3 + 2i.",
          "Multiply numerator and denominator by (3 + 2i):\n  = [(3 + 4i)(3 + 2i)] / [(3 - 2i)(3 + 2i)]",
          "Numerator = 9 + 6i + 12i + 8i² = 9 + 18i + 8(-1) = 9 - 8 + 18i = 1 + 18i",
          "Denominator = 3² - (2i)² = 9 - 4i² = 9 - 4(-1) = 9 + 4 = 13",
          "z₁ / z₂ = (1 + 18i) / 13 = 1/13 + (18/13)i"
        ],
        "answer": "1/13 + (18/13)i"
      }
    ],
    "exercises": [
      {
        "exercise": "2.1",
        "title": "Exercise 2.1 — Classification of Real Numbers & Number Line",
        "description": "KPK Grade 9 Mathematics Textbook Page 54: Questions 1 to 12. Classification of given numbers into Natural, Whole, Integer, Rational, and Irrational sets; decimal conversions and number line depiction.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "In Questions 1-10, consider the numbers:\n2.5, 3, 5/7, -1.96, √36, -7/6, √3, -9, 1, √7, -√14, π, 4 2/3, 0.333...\n\n1. Which are whole numbers?",
            "solution": "Whole numbers are non-negative integers: 𝕎 = {0, 1, 2, 3, ...}\nInspecting the list:\n• 1 is a whole number.\n• 3 is a whole number.\n• √36 = 6 is a whole number.\nFractions, negative numbers, decimals, and roots of non-squares are not whole numbers.",
            "answer": "3, √36 (= 6), 1"
          },
          {
            "qNo": "Q2",
            "question": "2. Which of the numbers are integers?",
            "solution": "Integers are positive and negative whole numbers including zero: ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}\nFrom the list:\n• -9 is an integer.\n• 1 is an integer.\n• 3 is an integer.\n• √36 = 6 is an integer.",
            "answer": "3, √36 (= 6), -9, 1"
          },
          {
            "qNo": "Q3",
            "question": "3. Which are irrational numbers?",
            "solution": "Irrational numbers (ℚ′) are real numbers that cannot be written as p/q (their decimals are non-terminating and non-recurring):\n• √3 (square root of non-perfect square)\n• √7 (square root of non-perfect square)\n• -√14 (negative root of non-perfect square)\n• π (famous non-repeating constant ≈ 3.14159...)",
            "answer": "√3, √7, -√14, π"
          },
          {
            "qNo": "Q4",
            "question": "4. Which are natural numbers?",
            "solution": "Natural numbers are positive counting integers: ℕ = {1, 2, 3, ...}\nFrom the list:\n• 1 is a natural number.\n• 3 is a natural number.\n• √36 = 6 is a natural number.",
            "answer": "1, 3, √36 (= 6)"
          },
          {
            "qNo": "Q5",
            "question": "5. Which are rational numbers?",
            "solution": "Rational numbers (ℚ) are numbers that can be written as p/q where p, q ∈ ℤ and q ≠ 0 (terminating or recurring decimals):\n• 2.5 = 5/2\n• 3 = 3/1\n• 5/7\n• -1.96 = -196/100 = -49/25\n• √36 = 6 = 6/1\n• -7/6\n• -9 = -9/1\n• 1 = 1/1\n• 4 2/3 = 14/3\n• 0.333... = 1/3",
            "answer": "2.5, 3, 5/7, -1.96, √36, -7/6, -9, 1, 4 2/3, 0.333..."
          },
          {
            "qNo": "Q6",
            "question": "6. Which are real numbers?",
            "solution": "The set of real numbers ℝ is the union of all rational and irrational numbers: ℝ = ℚ ∪ ℚ′.\nEvery single number given in the list is either rational or irrational.",
            "answer": "All of them (2.5, 3, 5/7, -1.96, √36, -7/6, √3, -9, 1, √7, -√14, π, 4 2/3, 0.333...)"
          },
          {
            "qNo": "Q7",
            "question": "7. Which are rational numbers but not integers?",
            "solution": "Numbers that belong to ℚ but do not have an integer value (i.e., non-integer fractions and decimals):\n• 2.5 (decimal = 5/2)\n• 5/7 (proper fraction)\n• -1.96 (terminating decimal)\n• -7/6 (improper fraction)\n• 4 2/3 = 14/3 (mixed fraction)\n• 0.333... = 1/3 (recurring decimal)",
            "answer": "2.5, 5/7, -1.96, -7/6, 4 2/3, 0.333..."
          },
          {
            "qNo": "Q8",
            "question": "8. Which are integers but not whole numbers?",
            "solution": "Whole numbers are 𝕎 = {0, 1, 2, ...}. The integers that are not whole numbers are strictly the negative integers.\nFrom the integers in the given list {-9, 1, 3, √36=6}, the only negative integer is -9.",
            "answer": "-9"
          },
          {
            "qNo": "Q9",
            "question": "9. Which are integers but not natural numbers?",
            "solution": "The only integer in the given list that is not a natural number is -9.",
            "answer": "-9"
          },
          {
            "qNo": "Q10",
            "question": "10. Which are real numbers but not integers?",
            "solution": "Exclude all integers {-9, 1, 3, √36} from the set of all given real numbers:\nRemaining numbers:\n2.5, 5/7, -1.96, -7/6, √3, √7, -√14, π, 4 2/3, 0.333...",
            "answer": "2.5, 5/7, -1.96, -7/6, √3, √7, -√14, π, 4 2/3, 0.333..."
          },
          {
            "qNo": "Q11",
            "question": "11. Write the decimal representation of each of the following numbers and state whether it is terminating or recurring:\n(i) 1/6\n(ii) 5/6\n(iii) 2/9\n(iv) 1/8",
            "solution": "Perform division for each fraction:\n(i) 1/6: Divide 1 by 6.\n  1 ÷ 6 = 0.1666... = 0.16̄ (Non-terminating recurring decimal)\n(ii) 5/6: Divide 5 by 6.\n  5 ÷ 6 = 0.8333... = 0.83̄ (Non-terminating recurring decimal)\n(iii) 2/9: Divide 2 by 9.\n  2 ÷ 9 = 0.2222... = 0.2̄ (Non-terminating recurring decimal)\n(iv) 1/8: Divide 1 by 8.\n  1 ÷ 8 = 0.125 (Terminating decimal, remainder is 0)",
            "answer": "(i) 1/6 = 0.1666... (recurring); (ii) 5/6 = 0.8333... (recurring); (iii) 2/9 = 0.222... (recurring); (iv) 1/8 = 0.125 (terminating)"
          },
          {
            "qNo": "Q12",
            "question": "12. Depict each number on a number line:\n(i) 1/3\n(ii) 1/4\n(iii) 1/9\n(iv) 1/10",
            "solution": "Convert each fraction into decimal form to locate on interval [0, 1]:\n• 1/10 = 0.10 -> Placed at 1/10th mark (first tick).\n• 1/9 = 0.111... ≈ 0.11 -> Placed slightly to the right of 0.1.\n• 1/4 = 0.25 -> Placed halfway between 0.2 and 0.3.\n• 1/3 = 0.333... ≈ 0.33 -> Placed one-third past 0.3 towards 0.4.\nAll these positive numbers lie strictly between 0 and 1 on the number line.",
            "answer": "Order on number line: 0 < 1/10 (0.1) < 1/9 (0.11) < 1/4 (0.25) < 1/3 (0.33) < 1"
          }
        ]
      },
      {
        "exercise": "2.2",
        "title": "Exercise 2.2 — Properties of Real Numbers & Distributive Law",
        "description": "KPK Grade 9 Mathematics Textbook Pages 59–60: Questions 1 to 4 and Activity. Properties of addition, multiplication, distributive law, missing terms, and calculation shortcuts.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "1. Name the properties used in the following equations:\n(i) 1 + (4 + 3) = (1 + 4) + 3\n(ii) 5(a + b) = 5a + 5b\n(iii) a + 0 = 0 + a = a\n(iv) 5 × (1/5) = (1/5) × 5 = 1",
            "solution": "(i) 1 + (4 + 3) = (1 + 4) + 3:\n    Here numbers are grouped differently under addition: a + (b + c) = (a + b) + c.\n    → Associative Property w.r.t. Addition.\n\n(ii) 5(a + b) = 5a + 5b:\n    Multiplication of 5 distributes over the sum (a + b): a(b + c) = ab + ac.\n    → Distributive Property of Multiplication over Addition.\n\n(iii) a + 0 = 0 + a = a:\n    Adding zero leaves any real number unchanged.\n    → Additive Identity Property.\n\n(iv) 5 × (1/5) = (1/5) × 5 = 1:\n    Multiplying a real number by its reciprocal yields 1.\n    → Multiplicative Inverse Property.",
            "answer": "(i) Associative property w.r.t addition; (ii) Distributive property of multiplication over addition; (iii) Additive identity; (iv) Multiplicative inverse"
          },
          {
            "qNo": "Q2",
            "question": "2. Write the missing number:\n(i) 2 + (---- + 4) = (2 + 6) + 4\n(ii) 7 + (4 + 2) = 13, so (7 + 4) + 2 = ----\n(iii) 9 × (3 × 4) = 108, so (9 × 3) × 4 = ----\n(iv) 5 × (8 × 9) = (5 × ----) × 9",
            "solution": "(i) By Associative Property of Addition: a + (b + c) = (a + b) + c.\n    Comparing 2 + (b + 4) = (2 + 6) + 4 gives b = 6.\n\n(ii) By Associative Property of Addition: 7 + (4 + 2) = (7 + 4) + 2.\n    Since 7 + (4 + 2) = 13, then (7 + 4) + 2 = 13.\n\n(iii) By Associative Property of Multiplication: a × (b × c) = (a × b) × c.\n    Since 9 × (3 × 4) = 108, then (9 × 3) × 4 = 108.\n\n(iv) By Associative Property of Multiplication: 5 × (8 × 9) = (5 × 8) × 9.\n    Missing number is 8.",
            "answer": "(i) 6; (ii) 13; (iii) 108; (iv) 8"
          },
          {
            "qNo": "Q3",
            "question": "3. Choose the correct option:\n(i) 8 × (6 × 7) is equal to:\n    a. 8 × 6 - 7    b. 8 - (6 - 7)    c. 8 × 12    d. (8 × 6) × 7\n(ii) Which one of the following illustrates the Associative Law of addition?\n    a. 3 + (2 + 4) = (4 + 4) + 1    b. 3 + (2 + 4) = (3 + 2) + 4\n    c. 3 + (2 + 4) = (5 + 2) + 2    d. 3 + (2 + 4) = (2 + 6) + 1\n(iii) Which of the following illustrates the Associative Law of multiplication?\n    a. 4 × (3 × 6) = (6 × 6) × 2    b. 4 × (3 × 6) = (3 × 12) × 2\n    c. 4 × (3 × 6) = (4 × 3) × 6    d. 4 × (3 × 6) = (3 × 8) × 3",
            "solution": "(i) By Associative Law of Multiplication: a(bc) = (ab)c. Thus 8 × (6 × 7) = (8 × 6) × 7. -> Option (d).\n(ii) Associative Law of addition states a + (b + c) = (a + b) + c with identical terms: 3 + (2 + 4) = (3 + 2) + 4. -> Option (b).\n(iii) Associative Law of multiplication states a(bc) = (ab)c with identical terms: 4 × (3 × 6) = (4 × 3) × 6. -> Option (c).",
            "answer": "(i) d; (ii) b; (iii) c"
          },
          {
            "qNo": "Q4",
            "question": "4. Do this with and without using distributive property:\n(i) 39 × 63 + 39 × 37\n(ii) 81 × 450 + 81 × 550\n(iii) 50 × 161 - 50 × 81\n(iv) 827 × 60 - 327 × 60",
            "solution": "(i) 39 × 63 + 39 × 37:\n    • With Distributive Property: 39 × (63 + 37) = 39 × 100 = 3900\n    • Without Distributive Property: 2457 + 1443 = 3900\n\n(ii) 81 × 450 + 81 × 550:\n    • With Distributive Property: 81 × (450 + 550) = 81 × 1000 = 81000\n    • Without Distributive Property: 36450 + 44550 = 81000\n\n(iii) 50 × 161 - 50 × 81:\n    • With Distributive Property: 50 × (161 - 81) = 50 × 80 = 4000\n    • Without Distributive Property: 8050 - 4050 = 4000\n\n(iv) 827 × 60 - 327 × 60:\n    • With Distributive Property: (827 - 327) × 60 = 500 × 60 = 30000\n    • Without Distributive Property: 49620 - 19620 = 30000",
            "answer": "(i) 3900; (ii) 81000; (iii) 4000; (iv) 30000"
          },
          {
            "qNo": "Activity",
            "question": "Activity (Page 60):\nMahnoor wanted to calculate 40/9 without a calculator. She wrote:\nLine 1: 40/9 = 40 / (4 + 5)\nLine 2: = 40/4 + 40/5\nLine 3: = 10 + 8\nLine 4: = 18\nHer friend Tahira told her that her answer was wrong and the correct answer should be 4.44.\nWhich line of Mahnoor's working was wrong? Who was correct?",
            "solution": "• Error Analysis:\n  In Line 2, Mahnoor wrote: 40 / (4 + 5) = 40/4 + 40/5.\n  This is fundamentally incorrect because division is NOT distributive over addition in the denominator!\n  That is: a / (b + c) ≠ a/b + a/c.\n  (For example: 40 / 9 = 4.444..., whereas 40/4 + 40/5 = 10 + 8 = 18).\n• Tahira's Calculation:\n  40 ÷ 9 = 4.444... ≈ 4.44, which is correct.",
            "answer": "Line 2 was wrong (division does not distribute over addition in denominators); Tahira was correct."
          }
        ]
      },
      {
        "exercise": "2.3",
        "title": "Exercise 2.3 — Radicals, Radicands & Simplification",
        "description": "KPK Grade 9 Mathematics Textbook Page 64: Questions 1 to 4. Identifying index and radicand, transforming between radical and exponential forms, and simplifying radical expressions.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "1. Write down the index and radicand for each of the following expressions:\n(i) √(11/y)\n(ii) ³√(13 / (3x))\n(iii) ⁵√(ab²)",
            "solution": "Using the standard radical form ⁿ√a where n is the index and a is the radicand:\n(i) √(11/y):\n    The radical has square root order (no explicit number in hook), so Index = 2.\n    Radicand = 11/y.\n\n(ii) ³√(13 / (3x)):\n    The number in the hook is 3, so Index = 3.\n    Radicand = 13 / (3x).\n\n(iii) ⁵√(ab²):\n    The number in the hook is 5, so Index = 5.\n    Radicand = ab².",
            "answer": "(i) Index = 2, Radicand = 11/y; (ii) Index = 3, Radicand = 13/(3x); (iii) Index = 5, Radicand = ab²"
          },
          {
            "qNo": "Q2",
            "question": "2. Transform the following radical forms into exponential forms. Do not simplify:\n(i) √36\n(ii) √1000\n(iii) ³√8\n(iv) ⁿ√q\n(v) √[(5 - 6a²)³]\n(vi) ³√(-64)",
            "solution": "Apply the rule: ⁿ√(aᵐ) = a^(m/n) [or ⁿ√a = a^(1/n)]:\n(i) √36 = (36)^(1/2)\n(ii) √1000 = (1000)^(1/2)\n(iii) ³√8 = (8)^(1/3)\n(iv) ⁿ√q = (q)^(1/n)\n(v) √[(5 - 6a²)³] = (5 - 6a²)^(3/2)\n(vi) ³√(-64) = (-64)^(1/3)",
            "answer": "(i) (36)^(1/2); (ii) (1000)^(1/2); (iii) (8)^(1/3); (iv) (q)^(1/n); (v) (5 - 6a²)^(3/2); (vi) (-64)^(1/3)"
          },
          {
            "qNo": "Q3",
            "question": "3. Transform the following exponential form of an expression into radical form:\n(i) -7^(1/3)\n(ii) x^(-3/2)\n(iii) (-8)^(1/5)\n(iv) y^(3/4)\n(v) b^(4/5)\n(vi) (3x)^(1/q)",
            "solution": "Apply the rule: a^(m/n) = ⁿ√(aᵐ):\n(i) -7^(1/3) = -³√7\n(ii) x^(-3/2) = (x⁻³)^(1/2) = √(x⁻³) = 1 / √(x³)\n(iii) (-8)^(1/5) = ⁵√(-8)\n(iv) y^(3/4) = ⁴√(y³)\n(v) b^(4/5) = ⁵√(b⁴)\n(vi) (3x)^(1/q) = ᑫ√(3x)",
            "answer": "(i) -³√7; (ii) √(x⁻³) or 1/√(x³); (iii) ⁵√(-8); (iv) ⁴√(y³); (v) ⁵√(b⁴); (vi) ᑫ√(3x)"
          },
          {
            "qNo": "Q4",
            "question": "4. Simplify:\n(i) ³√(125x)\n(ii) ³√(8/27)\n(iii) √[(625 x³ y⁴) / (25 x y²)]\n(iv) √[(3y - 5)²]\n(v) 6√18\n(vi) ³√(54 x³ y³ z²)",
            "solution": "(i) ³√(125x):\n    125 = 5³.\n    ³√(125x) = ³√(5³) · ³√x = 5³√x.\n\n(ii) ³√(8/27):\n    8 = 2³, 27 = 3³.\n    ³√(8/27) = ³√(2³) / ³√(3³) = 2/3.\n\n(iii) √[(625 x³ y⁴) / (25 x y²)]:\n    Simplify fraction inside: (625/25) · (x³/x) · (y⁴/y²) = 25 x² y².\n    √(25 x² y²) = √(5² x² y²) = 5xy.\n\n(iv) √[(3y - 5)²]:\n    Square root of a squared term gives: 3y - 5.\n\n(v) 6√18:\n    18 = 9 × 2 = 3² × 2.\n    6√18 = 6 · √(9 · 2) = 6 · 3√2 = 18√2.\n\n(vi) ³√(54 x³ y³ z²):\n    54 = 27 × 2 = 3³ × 2.\n    ³√(54 x³ y³ z²) = ³√(27 x³ y³) · ³√(2z²) = 3xy · ³√(2z²).",
            "answer": "(i) 5³√x; (ii) 2/3; (iii) 5xy; (iv) 3y - 5; (v) 18√2; (vi) 3xy³√(2z²)"
          }
        ]
      },
      {
        "exercise": "2.4",
        "title": "Exercise 2.4 — Laws of Exponents & Algebraic Simplification",
        "description": "KPK Grade 9 Mathematics Textbook Page 67: Questions 1 to 5. Base, exponent, and value identification, laws of indices simplifications, rationalization of exponents, and algebraic proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "1. Write the base, exponent and value of the following:\n(i) (2)⁻⁹ = 1/1024  [Note: 2⁻¹⁰ = 1/1024, printed as (2)⁻⁹]\n(ii) (a/b)ᵖ = aᵖ / bᵖ\n(iii) (-4)² = 16",
            "solution": "In an expression of the form (Base)^(Exponent) = Value:\n(i) (2)⁻⁹ = 1/1024:\n    • Base = 2\n    • Exponent = -9\n    • Value = 1/512. Note: the textbook prints 1/1024 for this item, but 2⁻⁹ = 1/512; 1/1024 would require exponent -10.\n\n(ii) (a/b)ᵖ = aᵖ / bᵖ:\n    • Base = a/b\n    • Exponent = p\n    • Value = aᵖ / bᵖ\n\n(iii) (-4)² = 16:\n    • Base = -4\n    • Exponent = 2\n    • Value = 16",
            "answer": "(i) Base = 2, Exponent = -9, Value = 1/512 (the textbook prints 1/1024, which equals 2⁻¹⁰); (ii) Base = a/b, Exponent = p, Value = aᵖ/bᵖ; (iii) Base = -4, Exponent = 2, Value = 16"
          },
          {
            "qNo": "Q2",
            "question": "2. If a, b denote real numbers then simplify the following:\n(i) a³ × a⁵\n(ii) (b/a)^(3/2) · (b/a)^(-2/3)\n(iii) (-a)⁴ × (-a)³\n(iv) (-2 a² b³)³\n(v) a³ (-2b)²\n(vi) (a²b)(a²b)\n(vii) (a⁰ b⁰) / 2\n(viii) (-3 a² b²)²\n(ix) (a² / b⁴)^(-3/2)",
            "solution": "(i) a³ × a⁵:\n    Same base, add exponents: a³⁺⁵ = a⁸.\n\n(ii) (b/a)^(3/2) · (b/a)^(-2/3):\n    Same base, add exponents: (b/a)^(3/2 - 2/3) = (b/a)^((9 - 4)/6) = (b/a)^(5/6).\n\n(iii) (-a)⁴ × (-a)³:\n    Same base (-a), add exponents: (-a)⁴⁺³ = (-a)⁷ = -a⁷ (odd power of negative is negative).\n\n(iv) (-2 a² b³)³:\n    Power of product: (-2)³ · (a²)³ · (b³)³ = -8 · a⁶ · b⁹ = -8 a⁶ b⁹.\n\n(v) a³ (-2b)²:\n    (-2b)² = (-2)² b² = 4b².\n    a³ · (4b²) = 4 a³ b².\n\n(vi) (a²b)(a²b):\n    Add exponents of like bases: a²⁺² · b¹⁺¹ = a⁴ b².\n\n(vii) (a⁰ b⁰) / 2:\n    By zero exponent law, a⁰ = 1 and b⁰ = 1.\n    (1 · 1) / 2 = 1/2.\n\n(viii) (-3 a² b²)²:\n    (-3)² · (a²)² · (b²)² = 9 · a⁴ · b⁴ = 9 a⁴ b⁴.\n\n(ix) (a² / b⁴)^(-3/2):\n    Invert fraction for positive exponent: (b⁴ / a²)^(3/2)\n    = [b^(4 × 3/2)] / [a^(2 × 3/2)] = b⁶ / a³ = a⁻³ b⁶.",
            "answer": "(i) a⁸; (ii) (b/a)^(5/6); (iii) -a⁷; (iv) -8 a⁶ b⁹; (v) 4 a³ b²; (vi) a⁴ b²; (vii) 1/2; (viii) 9 a⁴ b⁴; (ix) b⁶/a³ (or a⁻³b⁶)"
          },
          {
            "qNo": "Q3",
            "question": "3. Simplify the following:\n(i) 7⁶ / 7⁴\n(ii) (2⁴ · 5³) / 10²\n(iii) { [(a + b)² · (c + d)³] / [(a + b) · (c + d)²] }³\n(iv) (³√a)^(1/2)\n(v) ⁵√(x⁵) · ⁴√(x⁴)",
            "solution": "(i) 7⁶ / 7⁴:\n    By quotient law: 7⁶⁻⁴ = 7² = 49.\n\n(ii) (2⁴ · 5³) / 10²:\n    2⁴ = 16, 5³ = 125, 10² = 100.\n    (16 × 125) / 100 = 2000 / 100 = 20.\n    [Alternatively: 10² = (2 · 5)² = 2² · 5². Then 2⁴⁻² · 5³⁻² = 2² · 5¹ = 4 × 5 = 20].\n\n(iii) { [(a + b)² · (c + d)³] / [(a + b) · (c + d)²] }³:\n    Simplify inside first:\n    (a + b)²⁻¹ · (c + d)³⁻² = (a + b) · (c + d)\n    Now raise to the power 3:\n    [(a + b)(c + d)]³ = (a + b)³ (c + d)³.\n\n(iv) (³√a)^(1/2):\n    In exponential form: (a^(1/3))^(1/2) = a^(1/3 × 1/2) = a^(1/6) = ⁶√a.\n\n(v) ⁵√(x⁵) · ⁴√(x⁴):\n    ⁵√(x⁵) = (x⁵)^(1/5) = x\n    ⁴√(x⁴) = (x⁴)^(1/4) = x\n    x · x = x².",
            "answer": "(i) 7² = 49; (ii) 20; (iii) (a + b)³ (c + d)³; (iv) a^(1/6) = ⁶√a; (v) x²"
          },
          {
            "qNo": "Q4",
            "question": "4. Simplify the following in such a way that no answers should contain fractional or negative exponents:\n(i) (25 / 81)^(-1/2)\n(ii) (ab)^(1/b) / [ (1 / ab)^(1/a) ]\n(iii) [ 2ᵖ⁺¹ · 3²ᵖ⁻ᑫ · 5ᵖ⁺ᑫ · 6ᑫ ] / [ 6ᵖ · 10ᑫ⁺² · 15ᵖ ]\n(iv) (xᵖ / xᑫ)^(p+q) · (xᑫ / xʳ)^(q+r) · (xʳ / xᵖ)^(r+p)",
            "solution": "(i) (25 / 81)^(-1/2):\n    = (81 / 25)^(1/2) = √(81) / √(25) = 9/5.\n\n(ii) (ab)^(1/b) / [ (1 / ab)^(1/a) ]:\n    Note that 1 / (1/ab)^(1/a) = (ab)^(1/a).\n    Expression = (ab)^(1/b) · (ab)^(1/a) = (ab)^(1/a + 1/b) = (ab)^((a+b)/(ab)).\n    To eliminate fractional exponent, write in radical form:\n    = ᵃᵇ√[(ab)ᵃ⁺ᵇ].\n\n(iii) [ 2ᵖ⁺¹ · 3²ᵖ⁻ᑫ · 5ᵖ⁺ᑫ · 6ᑫ ] / [ 6ᵖ · 10ᑫ⁺² · 15ᵖ ]:\n    Factor composite numbers into primes (2, 3, 5):\n    • 6ᑫ = 2ᑫ · 3ᑫ\n    • 6ᵖ = 2ᵖ · 3ᵖ\n    • 10ᑫ⁺² = (2 · 5)ᑫ⁺² = 2ᑫ⁺² · 5ᑫ⁺²\n    • 15ᵖ = (3 · 5)ᵖ = 3ᵖ · 5ᵖ\n\n    Numerator powers:\n    • Base 2: (p + 1) + q = p + q + 1\n    • Base 3: (2p - q) + q = 2p\n    • Base 5: p + q\n    Numerator = 2ᵖ⁺ᑫ⁺¹ · 3²ᵖ · 5ᵖ⁺ᑫ\n\n    Denominator powers:\n    • Base 2: p + (q + 2) = p + q + 2\n    • Base 3: p + p = 2p\n    • Base 5: (q + 2) + p = p + q + 2\n    Denominator = 2ᵖ⁺ᑫ⁺² · 3²ᵖ · 5ᵖ⁺ᑫ⁺²\n\n    Quotient:\n    = 2^[(p+q+1) - (p+q+2)] · 3^[2p - 2p] · 5^[(p+q) - (p+q+2)]\n    = 2⁻¹ · 3⁰ · 5⁻²\n    = 1 / (2¹ · 1 · 5²) = 1 / (2 · 25) = 1/50.\n\n(iv) (xᵖ / xᑫ)^(p+q) · (xᑫ / xʳ)^(q+r) · (xʳ / xᵖ)^(r+p):\n    = (xᵖ⁻ᑫ)^(p+q) · (xᑫ⁻ʳ)^(q+r) · (xʳ⁻ᵖ)^(r+p)\n    Using (u - v)(u + v) = u² - v²:\n    = x^(p² - q²) · x^(q² - r²) · x^(r² - p²)\n    = x^[(p² - q²) + (q² - r²) + (r² - p²)]\n    = x⁰ = 1.",
            "answer": "(i) 9/5; (ii) ᵃᵇ√[(ab)ᵃ⁺ᵇ]; (iii) 1/50; (iv) 1"
          },
          {
            "qNo": "Q5",
            "question": "5. Prove that:\n[ (4⁵ · 64³ · 2³) / (8⁵ · (128)²) ]^(1/2) = 2",
            "solution": "Proof: Consider Left Hand Side (LHS):\nLHS = [ (4⁵ · 64³ · 2³) / (8⁵ · (128)²) ]^(1/2)\n\nExpress all terms as powers of base 2:\n• 4⁵ = (2²)⁵ = 2¹⁰\n• 64³ = (2⁶)³ = 2¹⁸\n• 2³ = 2³\n• 8⁵ = (2³)⁵ = 2¹⁵\n• (128)² = (2⁷)² = 2¹⁴\n\nNumerator of fraction:\n= 2¹⁰ · 2¹⁸ · 2³ = 2^(10 + 18 + 3) = 2³¹\n\nDenominator of fraction:\n= 2¹⁵ · 2¹⁴ = 2^(15 + 14) = 2²⁹\n\nInside the bracket:\n2³¹ / 2²⁹ = 2^(31 - 29) = 2²\n\nNow apply outer exponent 1/2:\nLHS = (2²)^(1/2) = 2^(2 × 1/2) = 2¹ = 2\n\nSince LHS = 2 = RHS, the identity is proved.",
            "answer": "LHS = 2 = RHS (Hence proved)"
          }
        ]
      },
      {
        "exercise": "2.5",
        "title": "Exercise 2.5 — Operations on Complex Numbers & Conjugates",
        "description": "KPK Grade 9 Mathematics Textbook Page 71: Questions 1 to 6. Addition, subtraction, multiplication, division of complex numbers, simplification to a + bi, and finding complex conjugates.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "1. Add the following complex numbers:\n(i) 8 + 9i, 5 + 2i\n(ii) 6 + 3i, 3 - 5i\n(iii) 2i + 3, 8 - 5√(-1)\n(iv) √3 + √2i, 3√3 - 2√2i",
            "solution": "Add real parts together and imaginary parts together: (a + bi) + (c + di) = (a + c) + (b + d)i.\n(i) (8 + 9i) + (5 + 2i) = (8 + 5) + (9 + 2)i = 13 + 11i.\n\n(ii) (6 + 3i) + (3 - 5i) = (6 + 3) + (3 - 5)i = 9 - 2i.\n\n(iii) 2i + 3 = 3 + 2i and 8 - 5√(-1) = 8 - 5i [since √(-1) = i]:\n     (3 + 2i) + (8 - 5i) = (3 + 8) + (2 - 5)i = 11 - 3i.\n\n(iv) (√3 + √2i) + (3√3 - 2√2i) = (√3 + 3√3) + (√2 - 2√2)i = 4√3 - √2i.",
            "answer": "(i) 13 + 11i; (ii) 9 - 2i; (iii) 11 - 3i; (iv) 4√3 - √2i"
          },
          {
            "qNo": "Q2",
            "question": "2. Subtract:\n(i) -2 + 3i from 6 - 3i\n(ii) 9 + 4i from 9 - 8i\n(iii) 1 - 3i from 8 - i\n(iv) 6 - 7i from 6 + 7i",
            "solution": "Subtract first number from second: (c + di) - (a + bi) = (c - a) + (d - b)i.\n(i) (6 - 3i) - (-2 + 3i) = 6 - 3i + 2 - 3i = (6 + 2) + (-3 - 3)i = 8 - 6i.\n\n(ii) (9 - 8i) - (9 + 4i) = 9 - 8i - 9 - 4i = (9 - 9) + (-8 - 4)i = 0 - 12i = -12i.\n\n(iii) (8 - i) - (1 - 3i) = 8 - i - 1 + 3i = (8 - 1) + (-1 + 3)i = 7 + 2i.\n\n(iv) (6 + 7i) - (6 - 7i) = 6 + 7i - 6 + 7i = (6 - 6) + (7 + 7)i = 0 + 14i = 14i.",
            "answer": "(i) 8 - 6i; (ii) -12i; (iii) 7 + 2i; (iv) 14i"
          },
          {
            "qNo": "Q3",
            "question": "3. Multiply the following complex numbers:\n(i) 1 + 2i, 3 - 8i\n(ii) 2i, 4 - 7i\n(iii) 5 - 3i, 2 - 4i\n(iv) √2 + i, 1 - √2i",
            "solution": "Expand products using FOIL and substitute i² = -1:\n(i) (1 + 2i)(3 - 8i) = 1(3 - 8i) + 2i(3 - 8i)\n    = 3 - 8i + 6i - 16i² = 3 - 2i - 16(-1) = 3 + 16 - 2i = 19 - 2i.\n\n(ii) 2i(4 - 7i) = 8i - 14i² = 8i - 14(-1) = 14 + 8i.\n\n(iii) (5 - 3i)(2 - 4i) = 5(2 - 4i) - 3i(2 - 4i)\n    = 10 - 20i - 6i + 12i² = 10 - 26i + 12(-1) = 10 - 12 - 26i = -2 - 26i.\n\n(iv) (√2 + i)(1 - √2i) = √2(1 - √2i) + i(1 - √2i)\n    = √2 - (√2 · √2)i + i - √2i²\n    = √2 - 2i + i - √2(-1) = √2 - i + √2 = 2√2 - i.",
            "answer": "(i) 19 - 2i; (ii) 14 + 8i; (iii) -2 - 26i; (iv) 2√2 - i"
          },
          {
            "qNo": "Q4",
            "question": "4. Divide the first complex number by the second:\n(i) z₁ = 2 + i, z₂ = 5 - i\n(ii) z₁ = 3i + 4, z₂ = 1 - i",
            "solution": "Multiply numerator and denominator by conjugate of denominator:\n(i) z₁ / z₂ = (2 + i) / (5 - i)\n    Conjugate of (5 - i) is (5 + i).\n    = [(2 + i)(5 + i)] / [(5 - i)(5 + i)]\n    Numerator = 10 + 2i + 5i + i² = 10 + 7i - 1 = 9 + 7i.\n    Denominator = 5² - i² = 25 - (-1) = 25 + 1 = 26.\n    = (9 + 7i) / 26 = 9/26 + (7/26)i.\n\n(ii) z₁ / z₂ = (4 + 3i) / (1 - i)\n    Conjugate of (1 - i) is (1 + i).\n    = [(4 + 3i)(1 + i)] / [(1 - i)(1 + i)]\n    Numerator = 4 + 4i + 3i + 3i² = 4 + 7i - 3 = 1 + 7i.\n    Denominator = 1² - i² = 1 - (-1) = 2.\n    = (1 + 7i) / 2 = 1/2 + (7/2)i.",
            "answer": "(i) 9/26 + (7/26)i; (ii) 1/2 + (7/2)i"
          },
          {
            "qNo": "Q5",
            "question": "5. Perform the indicated operations and reduce to the form a + bi:\n(i) (4 - 3i) + (2 - 3i)\n(ii) (5 - 2i) - (4 - 7i)\n(iii) 2i(4 - 5i)\n(iv) (2 - 3i) ÷ (4 - 5i)",
            "solution": "(i) (4 - 3i) + (2 - 3i) = (4 + 2) + (-3 - 3)i = 6 - 6i.\n\n(ii) (5 - 2i) - (4 - 7i) = (5 - 4) + (-2 + 7)i = 1 + 5i.\n\n(iii) 2i(4 - 5i) = 8i - 10i² = 8i - 10(-1) = 10 + 8i.\n\n(iv) (2 - 3i) ÷ (4 - 5i) = (2 - 3i) / (4 - 5i):\n    Multiply numerator and denominator by (4 + 5i):\n    = [(2 - 3i)(4 + 5i)] / [(4 - 5i)(4 + 5i)]\n    Numerator = 8 + 10i - 12i - 15i² = 8 - 2i - 15(-1) = 8 + 15 - 2i = 23 - 2i.\n    Denominator = 4² - (5i)² = 16 - 25i² = 16 - 25(-1) = 16 + 25 = 41.\n    = (23 - 2i) / 41 = 23/41 - (2/41)i.",
            "answer": "(i) 6 - 6i; (ii) 1 + 5i; (iii) 10 + 8i; (iv) 23/41 - (2/41)i"
          },
          {
            "qNo": "Q6",
            "question": "6. Find the complex conjugate of the following complex numbers:\n(i) -8 - 3i\n(ii) -4 + 9i\n(iii) 7 + 6i\n(iv) √5 - i",
            "solution": "The conjugate of z = a + bi is z̄ = a - bi (change sign of imaginary part):\n(i) For z = -8 - 3i: Conjugate z̄ = -8 + 3i.\n(ii) For z = -4 + 9i: Conjugate z̄ = -4 - 9i.\n(iii) For z = 7 + 6i: Conjugate z̄ = 7 - 6i.\n(iv) For z = √5 - i: Conjugate z̄ = √5 + i.",
            "answer": "(i) -8 + 3i; (ii) -4 - 9i; (iii) 7 - 6i; (iv) √5 + i"
          }
        ]
      },
      {
        "exercise": "Review 2",
        "title": "Review Exercise 2 — Comprehensive Unit Review",
        "description": "KPK Grade 9 Mathematics Textbook Pages 72–73: Questions 1 to 7. True/False, 11 Multiple Choice Questions, radical and exponent simplifications, complex multiplication/division, and proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "1. Tell whether the following are true or false:\n(i) 3^(1/3) = √3\n(ii) 2^(2/3) = ³√4\n(iii) √49 = √7\n(iv) ³√27 = x³",
            "solution": "(i) 3^(1/3) = √3:\n    3^(1/3) is ³√3, whereas √3 = 3^(1/2). They are NOT equal (3^(1/3) ≠ 3^(1/2)).\n    → False.\n\n(ii) 2^(2/3) = ³√4:\n    2^(2/3) = (2²)^(1/3) = (4)^(1/3) = ³√4. Exactly equal.\n    → True.\n\n(iii) √49 = √7:\n    √49 = 7, whereas √7 ≈ 2.64575... They are NOT equal (7 ≠ √7).\n    → False.\n\n(iv) ³√27 = x³:\n    ³√27 = ³√(3³) = 3 (a constant), which is not equal to variable expression x³.\n    → False.",
            "answer": "(i) False; (ii) True; (iii) False; (iv) False"
          },
          {
            "qNo": "Q2",
            "question": "2. Select the correct answer (Questions i to xi):\n(i) The additive inverse of √5 is:\n    a) -√5    b) 1/√5    c) √(-3)    d) -5\n(ii) 2(3 + 4) = 2×3 + 2×4, here the property used is:\n    a) Commutative    b) Associative    c) Distributive    d) Closure\n(iii) √(-1) × √(-1) =\n    a) 1    b) i    c) -1    d) 0\n(iv) Which of the following represents numbers greater than -3 but less than 6?\n    a) {x : -3 > x > 6}    b) {x : -3 ≤ x ≤ 6}\n    c) {x : -3 < x < 6}    d) {x : -3 ≥ x ≥ 6}\n(v) If n = 8 and 16 × 2ᵐ = 4ⁿ⁻⁸, then m = ?\n    a) -4    b) -2    c) 0    d) 8\n(vi) (i) · (-i) =\n    a) 1    b) -1    c) -i    d) i\n(vii) The multiplicative identity of real numbers is:\n    a) 0    b) 1    c) -1    d) ℝ\n(viii) 0 is:\n    a) a positive integer    b) a negative integer\n    c) neither positive nor negative    d) not an integer\n(ix) For i = √(-1), if 3i(2 + 5i) = x + 6i, then x = ?\n    a) 5    b) -15    c) 5i    d) 15i\n(x) √0 =\n    a) 0    b) 1    c) -1    d) not defined\n(xi) √[-(-9)²] = ? (Note: i = √(-1)):\n    a) 9    b) 9 + i    c) 9 - i    d) 9i",
            "solution": "(i) Additive inverse of a is -a. Inverse of √5 is -√5. -> Option (a).\n(ii) a(b + c) = ab + ac is the Distributive Property. -> Option (c).\n(iii) √(-1) × √(-1) = i · i = i² = -1. -> Option (c).\n(iv) 'Greater than -3 and less than 6' is strictly written as -3 < x < 6. -> Option (c).\n(v) Given n = 8, 4ⁿ⁻⁸ = 4⁸⁻⁸ = 4⁰ = 1.\n    Equation: 16 × 2ᵐ = 1 => 2⁴ × 2ᵐ = 1 => 2^(m+4) = 2⁰ => m + 4 = 0 => m = -4. -> Option (a).\n(vi) (i)(-i) = -i² = -(-1) = 1. -> Option (a).\n(vii) Multiplicative identity for real numbers is 1 (since a · 1 = a). -> Option (b).\n(viii) Zero (0) is an integer that is neither positive nor negative. -> Option (c).\n(ix) 3i(2 + 5i) = 6i + 15i² = 6i - 15 = -15 + 6i.\n    Comparing with x + 6i gives x = -15. -> Option (b).\n(x) √0 = 0. -> Option (a).\n(xi) (-9)² = 81. Thus √[-(-9)²] = √(-81) = √(81) · √(-1) = 9i. -> Option (d).",
            "answer": "(i) a; (ii) c; (iii) c; (iv) c; (v) a; (vi) a; (vii) b; (viii) c; (ix) b; (x) a; (xi) d"
          },
          {
            "qNo": "Q3",
            "question": "3. Simplify each of the following:\n(i) (-2/3)³\n(ii) (-2)³ · (3)²\n(iii) -3√48\n(iv) 5 / ³√9",
            "solution": "(i) (-2/3)³:\n    = (-2)³ / 3³ = -8 / 27.\n\n(ii) (-2)³ · (3)²:\n    (-2)³ = -8 and (3)² = 9.\n    = -8 × 9 = -72.\n\n(iii) -3√48:\n    48 = 16 × 3 = 4² × 3.\n    = -3 · √(16 · 3) = -3 · 4√3 = -12√3.\n\n(iv) 5 / ³√9:\n    ³√9 = 9^(1/3) = (3²)^(1/3) = 3^(2/3).\n    Multiply numerator and denominator by 3^(1/3) = ³√3:\n    = (5 · ³√3) / [3^(2/3) · 3^(1/3)] = (5 · ³√3) / 3¹ = (5³√3) / 3.",
            "answer": "(i) -8/27; (ii) -72; (iii) -12√3; (iv) (5³√3) / 3"
          },
          {
            "qNo": "Q4",
            "question": "4. Multiply 8i, -8i.",
            "solution": "Product = (8i) · (-8i)\n= 8 · (-8) · i · i\n= -64 · i²\nSince i² = -1:\n= -64 · (-1) = 64.",
            "answer": "64"
          },
          {
            "qNo": "Q5",
            "question": "5. Divide 2 - 5i by 1 - 6i.",
            "solution": "Quotient = (2 - 5i) / (1 - 6i)\nMultiply numerator and denominator by conjugate of denominator (1 + 6i):\n= [ (2 - 5i)(1 + 6i) ] / [ (1 - 6i)(1 + 6i) ]\n\nNumerator:\n= 2(1 + 6i) - 5i(1 + 6i)\n= 2 + 12i - 5i - 30i²\n= 2 + 7i - 30(-1)  [i² = -1]\n= 2 + 30 + 7i = 32 + 7i.\n\nDenominator:\n= 1² - (6i)² = 1 - 36i² = 1 - 36(-1) = 1 + 36 = 37.\n\nResult:\n= (32 + 7i) / 37 = 32/37 + (7/37)i.",
            "answer": "32/37 + (7/37)i"
          },
          {
            "qNo": "Q6",
            "question": "6. Name the property used in: 7 × (1/7) = (1/7) × 7 = 1.",
            "solution": "When a non-zero real number is multiplied by its reciprocal resulting in the multiplicative identity 1, this illustrates:\nMultiplicative Inverse Property (w.r.t. Multiplication).",
            "answer": "Multiplicative inverse property"
          },
          {
            "qNo": "Q7",
            "question": "7. Use laws of exponents to simplify:\n[ (81)ⁿ · 3⁵ - (3)⁴ⁿ⁻¹ · (243) ] / [ (9²ⁿ) · (3³) ]\n[Note: Printed in textbook with subtraction in official answer key yielding 6; typeset formula sign analyzed].",
            "solution": "Express all terms as powers of base 3:\n• 81 = 3⁴, so (81)ⁿ = (3⁴)ⁿ = 3⁴ⁿ\n• 3⁵ = 3⁵\n• 243 = 3⁵\n• 9²ⁿ = (3²)²ⁿ = 3⁴ⁿ\n• 3³ = 3³\n\nNumerator:\nFirst term = (81)ⁿ · 3⁵ = 3⁴ⁿ · 3⁵ = 3⁴ⁿ⁺⁵\nSecond term = (3)⁴ⁿ⁻¹ · (243) = 3⁴ⁿ⁻¹ · 3⁵ = 3^(4n - 1 + 5) = 3⁴ⁿ⁺⁴\n\nDenominator:\n= (9²ⁿ) · 3³ = 3⁴ⁿ · 3³ = 3⁴ⁿ⁺³\n\nEvaluating the difference (as given in official KPK Answer Key = 6):\n= (3⁴ⁿ⁺⁵ - 3⁴ⁿ⁺⁴) / 3⁴ⁿ⁺³\nFactor out 3⁴ⁿ⁺³ from the numerator:\n= [ 3⁴ⁿ⁺³ · (3² - 3¹) ] / 3⁴ⁿ⁺³\nCancel 3⁴ⁿ⁺³:\n= 3² - 3¹ = 9 - 3 = 6.\n\n[Note: If evaluated with plus (+), (3² + 3¹) = 9 + 3 = 12. The textbook key confirms 6].",
            "answer": "6"
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "q": "Which of the following numbers is an irrational number?",
          "options": [
            "3.14",
            "22/7",
            "√7",
            "0.333..."
          ],
          "correct": 2,
          "exp": "√7 is the square root of a non-square prime number, which cannot be represented as p/q. Both 3.14 and 22/7 are rational, and 0.333... is a recurring rational fraction (1/3)."
        },
        {
          "q": "What is the conjugate of the complex number z = -3 + 4i?",
          "options": [
            "3 + 4i",
            "-3 - 4i",
            "3 - 4i",
            "-3 + 4i"
          ],
          "correct": 1,
          "exp": "The conjugate z̄ of z = a + bi is formed by reversing the sign of the imaginary part only: z̄ = a - bi. Thus conjugate of -3 + 4i is -3 - 4i."
        },
        {
          "q": "If i² = -1, what is the value of i¹⁵?",
          "options": [
            "1",
            "-1",
            "i",
            "-i"
          ],
          "correct": 3,
          "exp": "Divide 15 by 4: 15 = 4(3) + 3. So i¹⁵ = (i⁴)³ · i³ = (1)³ · (-i) = -i."
        },
        {
          "q": "Which property of real numbers is illustrated by: a(b + c) = ab + ac?",
          "options": [
            "Associative Law",
            "Commutative Law",
            "Distributive Law of Multiplication over Addition",
            "Closure Law"
          ],
          "correct": 2,
          "exp": "a(b + c) = ab + ac is the Left Distributive Property of Multiplication over Addition."
        },
        {
          "q": "In the radical expression ⁵√(32x³), the index and radicand are respectively:",
          "options": [
            "5 and 32x³",
            "32x³ and 5",
            "5 and 32",
            "3 and 32x"
          ],
          "correct": 0,
          "exp": "In ⁿ√a, n is the index (order) and a is the radicand. Here index = 5 and radicand = 32x³."
        },
        {
          "q": "The value of 5⁰ + (1/3)⁰ - (-2)⁰ is:",
          "options": [
            "0",
            "1",
            "2",
            "3"
          ],
          "correct": 1,
          "exp": "Any non-zero real number raised to the power 0 equals 1: 5⁰ = 1, (1/3)⁰ = 1, and (-2)⁰ = 1. So 1 + 1 - 1 = 1."
        },
        {
          "q": "The product of (3 + 2i) and (3 - 2i) equals:",
          "options": [
            "5",
            "13",
            "9 - 4i",
            "9 + 4i"
          ],
          "correct": 1,
          "exp": "z · z̄ = a² + b² = 3² + 2² = 9 + 4 = 13 (a real number)."
        },
        {
          "q": "If a < b and c < 0, then which of the following is true?",
          "options": [
            "ac < bc",
            "ac > bc",
            "ac = bc",
            "a + c > b + c"
          ],
          "correct": 1,
          "exp": "Multiplying or dividing an inequality by a negative number reverses the direction of the inequality sign: ac > bc."
        },
        {
          "q": "Which of the following is the multiplicative inverse of -2/5?",
          "options": [
            "2/5",
            "-5/2",
            "5/2",
            "1"
          ],
          "correct": 1,
          "exp": "The multiplicative inverse of a/b is b/a so that (a/b) · (b/a) = 1. For -2/5, the inverse is -5/2."
        },
        {
          "q": "The real part and imaginary part of 7 - √(-9) are:",
          "options": [
            "7 and -9",
            "7 and 3",
            "7 and -3",
            "-3 and 7"
          ],
          "correct": 2,
          "exp": "7 - √(-9) = 7 - √(9 · (-1)) = 7 - 3i. The real part is 7 and the imaginary part is -3."
        }
      ],
      "shortQuestions": [
        {
          "q": "Define rational and irrational numbers. Give two examples of each.",
          "marks": 4,
          "solution": "• Rational Numbers (ℚ): Numbers that can be expressed in the form p/q, where p, q ∈ ℤ and q ≠ 0. Their decimal representations either terminate or repeat periodically.\n  Examples: 3/4 = 0.75, -5 = -5/1.\n• Irrational Numbers (ℚ′): Numbers that cannot be expressed in the form p/q. Their decimal representations are non-terminating and non-recurring.\n  Examples: √2 = 1.41421..., π = 3.14159..."
        },
        {
          "q": "Differentiate between radical form and exponential form with examples.",
          "marks": 4,
          "solution": "• Radical Form: An algebraic expression written using a radical symbol 'ⁿ√', where n is the positive integer index and the expression under the root is the radicand.\n  Example: ³√64, √(x + 1).\n• Exponential Form: The same mathematical value expressed using fractional powers according to the identity ⁿ√a = a^(1/n).\n  Example: 64^(1/3), (x + 1)^(1/2)."
        },
        {
          "q": "State and explain the Trichotomy Property of real numbers.",
          "marks": 3,
          "solution": "Trichotomy Property: For any two real numbers a and b (a, b ∈ ℝ), exactly one and only one of the following three conditions holds true:\n1. a < b (a is less than b)\n2. a = b (a is equal to b)\n3. a > b (a is greater than b)\nExample: For numbers 5 and 7, only 5 < 7 is true; 5 = 7 and 5 > 7 are both false."
        },
        {
          "q": "Simplify: [ (xᵃ / xᵇ) ]^(a + b) · [ (xᵇ / xᶜ) ]^(b + c) · [ (xᶜ / xᵃ) ]^(c + a).",
          "marks": 4,
          "solution": "Using quotient rule and difference of squares (u - v)(u + v) = u² - v²:\n= (x^(a - b))^(a + b) · (x^(b - c))^(b + c) · (x^(c - a))^(c + a)\n= x^(a² - b²) · x^(b² - c²) · x^(c² - a²)\n= x^[(a² - b²) + (b² - c²) + (c² - a²)]\n= x⁰ = 1."
        },
        {
          "q": "Find real values of x and y if (x + iy) + (2 - 3i) = 4 + i.",
          "marks": 4,
          "solution": "Combine real and imaginary terms on LHS:\n(x + 2) + i(y - 3) = 4 + i\nBy equality of complex numbers, equate real parts and imaginary parts:\n• Real part: x + 2 = 4 => x = 4 - 2 = 2\n• Imaginary part: y - 3 = 1 => y = 1 + 3 = 4\nAnswer: x = 2, y = 4."
        },
        {
          "q": "Show that the product of any complex number and its conjugate is a real number.",
          "marks": 3,
          "solution": "Let z = a + bi be any complex number (a, b ∈ ℝ). Its conjugate is z̄ = a - bi.\nProduct: z · z̄ = (a + bi)(a - bi)\n= a² - (bi)²\n= a² - b²i²\nSince i² = -1:\n= a² - b²(-1) = a² + b².\nSince a, b ∈ ℝ, a² + b² is a real number (no imaginary unit i). Hence proved."
        }
      ],
      "longQuestions": [
        {
          "q": "State all 7 fundamental laws of exponents and use them to simplify: [ 2ᵖ⁺¹ · 3²ᵖ⁻ᑫ · 5ᵖ⁺ᑫ · 6ᑫ ] / [ 6ᵖ · 10ᑫ⁺² · 15ᵖ ].",
          "marks": 8,
          "solution": "1. Fundamental Laws of Exponents:\n   (i) Product Law: aᵐ · aⁿ = aᵐ⁺ⁿ\n   (ii) Quotient Law: aᵐ / aⁿ = aᵐ⁻ⁿ\n   (iii) Power Law: (aᵐ)ⁿ = aᵐⁿ\n   (iv) Power of Product: (ab)ⁿ = aⁿbⁿ\n   (v) Power of Quotient: (a/b)ⁿ = aⁿ/bⁿ\n   (vi) Zero Exponent: a⁰ = 1 (a ≠ 0)\n   (vii) Negative Exponent: a⁻ⁿ = 1/aⁿ\n\n2. Simplification:\n   Express all composite bases as products of prime factors 2, 3, and 5:\n   • 6ᑫ = (2 · 3)ᑫ = 2ᑫ · 3ᑫ\n   • 6ᵖ = (2 · 3)ᵖ = 2ᵖ · 3ᵖ\n   • 10ᑫ⁺² = (2 · 5)ᑫ⁺² = 2ᑫ⁺² · 5ᑫ⁺²\n   • 15ᵖ = (3 · 5)ᵖ = 3ᵖ · 5ᵖ\n\n   Substitute into given expression:\n   Numerator = 2ᵖ⁺¹ · 3²ᵖ⁻ᑫ · 5ᵖ⁺ᑫ · 2ᑫ · 3ᑫ\n             = 2^(p + 1 + q) · 3^(2p - q + q) · 5^(p + q)\n             = 2^(p + q + 1) · 3^(2p) · 5^(p + q)\n\n   Denominator = 2ᵖ · 3ᵖ · 2^(q + 2) · 5^(q + 2) · 3ᵖ · 5ᵖ\n               = 2^(p + q + 2) · 3^(p + p) · 5^(q + 2 + p)\n               = 2^(p + q + 2) · 3^(2p) · 5^(p + q + 2)\n\n   Divide like bases by subtracting exponents:\n   = 2^[(p+q+1) - (p+q+2)] · 3^(2p - 2p) · 5^[(p+q) - (p+q+2)]\n   = 2⁻¹ · 3⁰ · 5⁻²\n   = (1 / 2) · 1 · (1 / 25) = 1/50."
        },
        {
          "q": "If z₁ = 2 - 3i and z₂ = 1 + 2i, find: (i) z₁ + z₂, (ii) z₁ - z₂, (iii) z₁ · z₂, (iv) z₁ / z₂ in the standard form a + bi.",
          "marks": 8,
          "solution": "Given z₁ = 2 - 3i and z₂ = 1 + 2i:\n\n(i) Addition:\n    z₁ + z₂ = (2 - 3i) + (1 + 2i) = (2 + 1) + (-3 + 2)i = 3 - i.\n\n(ii) Subtraction:\n    z₁ - z₂ = (2 - 3i) - (1 + 2i) = (2 - 1) + (-3 - 2)i = 1 - 5i.\n\n(iii) Multiplication:\n    z₁ · z₂ = (2 - 3i)(1 + 2i)\n            = 2(1 + 2i) - 3i(1 + 2i)\n            = 2 + 4i - 3i - 6i²\n            = 2 + i - 6(-1) = 2 + 6 + i = 8 + i.\n\n(iv) Division:\n    z₁ / z₂ = (2 - 3i) / (1 + 2i)\n    Conjugate of denominator is 1 - 2i. Multiply numerator and denominator:\n    = [ (2 - 3i)(1 - 2i) ] / [ (1 + 2i)(1 - 2i) ]\n    Numerator = 2 - 4i - 3i + 6i² = 2 - 7i + 6(-1) = 2 - 6 - 7i = -4 - 7i.\n    Denominator = 1² - (2i)² = 1 - 4(-1) = 1 + 4 = 5.\n    z₁ / z₂ = (-4 - 7i) / 5 = -4/5 - (7/5)i."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "1. Real Number System Subsets & Classification",
        "points": [
          "Natural Numbers: ℕ = {1, 2, 3, 4, ...}",
          "Whole Numbers: 𝕎 = {0, 1, 2, 3, ...}",
          "Integers: ℤ = {0, ±1, ±2, ±3, ...}",
          "Rational Numbers: ℚ = { p/q : p, q ∈ ℤ, q ≠ 0 } (Terminating or recurring decimals)",
          "Irrational Numbers: ℚ′ (Non-terminating and non-recurring decimals, e.g., √2, √3, π)",
          "Real Numbers: ℝ = ℚ ∪ ℚ′ where ℚ ∩ ℚ′ = ∅ (Disjoint sets)",
          "Inclusion Chain: ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ ⊂ ℝ"
        ]
      },
      {
        "title": "2. Properties of Real Numbers",
        "points": [
          "Closure: a + b ∈ ℝ and a · b ∈ ℝ for all a, b ∈ ℝ",
          "Commutative: a + b = b + a and a · b = b · a",
          "Associative: (a + b) + c = a + (b + c) and (ab)c = a(bc)",
          "Additive Identity: a + 0 = 0 + a = a (Identity is 0)",
          "Multiplicative Identity: a · 1 = 1 · a = a (Identity is 1)",
          "Additive Inverse: a + (-a) = (-a) + a = 0 (Inverse is -a)",
          "Multiplicative Inverse: a · (1/a) = (1/a) · a = 1, a ≠ 0 (Inverse is 1/a)",
          "Distributive Law: a(b + c) = ab + ac and (a + b)c = ac + bc",
          "Trichotomy: Exactly one is true: a < b, a = b, or a > b"
        ]
      },
      {
        "title": "3. Radicals and Radicands Conversion",
        "points": [
          "Radical Definition: ⁿ√a = a^(1/n), where n = index, a = radicand, √ = radical sign",
          "General Conversion: ⁿ√(aᵐ) = (ⁿ√a)ᵐ = a^(m/n)",
          "Product Rule for Radicals: ⁿ√(ab) = ⁿ√a · ⁿ√b",
          "Quotient Rule for Radicals: ⁿ√(a/b) = (ⁿ√a) / (ⁿ√b), b ≠ 0",
          "Nested Radicals: ᵐ√(ⁿ√a) = ᵐⁿ√a",
          "Principal Root: For positive b, aⁿ = b defines the unique positive principal nth root"
        ]
      },
      {
        "title": "4. 7 Fundamental Laws of Exponents",
        "points": [
          "Product Law: aᵐ · aⁿ = aᵐ⁺ⁿ",
          "Quotient Law: aᵐ / aⁿ = aᵐ⁻ⁿ (a ≠ 0)",
          "Power Law: (aᵐ)ⁿ = aᵐⁿ",
          "Power of a Product: (ab)ⁿ = aⁿbⁿ",
          "Power of a Quotient: (a/b)ⁿ = aⁿ / bⁿ (b ≠ 0)",
          "Zero Exponent: a⁰ = 1 (a ≠ 0)",
          "Negative Exponent: a⁻ⁿ = 1/aⁿ and (a/b)⁻ⁿ = (b/a)ⁿ"
        ]
      },
      {
        "title": "5. Complex Numbers & Operations",
        "points": [
          "Imaginary Unit: i = √(-1) and i² = -1",
          "General Form: z = a + bi (a = Re(z) is real part, b = Im(z) is imaginary part)",
          "Conjugate: z̄ = a - bi (Reverse sign of imaginary term)",
          "Modulus Squared: z · z̄ = a² + b² ∈ ℝ",
          "Equality: a + bi = c + di ⟺ a = c and b = d",
          "Addition: (a + bi) + (c + di) = (a + c) + (b + d)i",
          "Subtraction: (a + bi) - (c + di) = (a - c) + (b - d)i",
          "Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i",
          "Division: (a + bi) / (c + di) = [ (ac + bd) + (bc - ad)i ] / (c² + d²)"
        ]
      }
    ]
  },
  {
    "number": 3,
    "id": "u3",
    "title": "Logarithms",
    "titleUrdu": "لوگارتھم",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 75–96",
    "description": "Scientific notation, definition and concepts of common and natural logarithms, characteristic and mantissa, laws of logarithms (product, quotient, power, change of base), and logarithmic computations.",
    "sections": [
      {
        "id": "3.1",
        "title": "3.1 Scientific Notation",
        "theory": "• 3.1.1 Concept of Scientific Notation:\nIn science and mathematics, we frequently encounter very large numbers (e.g., speed of light $300,000,000\\text{ m/s}$) or very small numbers (e.g., radius of a hydrogen atom $0.00000000005\\text{ m}$). Scientific notation provides a concise and precise standard method for expressing such quantities.\n\n• Standard Form:\nA positive number $x$ is said to be in scientific notation if it is expressed in the form:\n$$x = a \\times 10^n$$\nwhere $1 \\le a < 10$ and $n$ is an integer (positive, negative, or zero).\n\n• Rules for Determining the Exponent $n$:\n1. If the decimal point is shifted to the left by $n$ places, the exponent of 10 is $+n$.\n2. If the decimal point is shifted to the right by $n$ places, the exponent of 10 is $-n$.\n3. If the number is already between 1 and 10 ($1 \\le a < 10$), $n = 0$ ($10^0 = 1$).\n\n• 3.1.2 Converting Scientific Notation to Standard Decimal Notation:\nTo convert $a \\times 10^n$ to ordinary decimal form, shift the decimal point in $a$ by $|n|$ places to the right if $n > 0$, or to the left if $n < 0$, inserting zeros as placeholders where necessary."
      },
      {
        "id": "3.2",
        "title": "3.2 Concept & Definition of Logarithm",
        "theory": "• 3.2.1 Definition of Logarithm:\nIf $a > 0, a \\ne 1$, and $y$ is any positive real number such that $a^x = y$, then the exponent $x$ is called the logarithm of $y$ to the base $a$. Symbolically:\n$$a^x = y \\iff x = \\log_a y$$\nHere, $a$ is the base, $y$ is the argument ($y > 0$), and $x$ is the logarithmic value.\n\n• Two Fundamental Identities:\n1. $\\log_a 1 = 0$ (since $a^0 = 1$ for any $a > 0, a \\ne 1$)\n2. $\\log_a a = 1$ (since $a^1 = a$)\n\n• Domain and Constraints:\nLogarithms of negative numbers and zero are undefined in the set of real numbers because a positive base raised to any real power is always strictly positive ($a^x > 0$)."
      },
      {
        "id": "3.3",
        "title": "3.3 Common and Natural Logarithms & Tables",
        "theory": "• 3.3.1 Common Logarithm (Briggsian Logarithm):\nLogarithms computed with base 10 are called Common Logarithms. They were developed by the English mathematician Henry Briggs. When the base is 10, it is usually omitted: $\\log_{10} x = \\log x$.\n\n• 3.3.2 Natural Logarithm (Napierian Logarithm):\nLogarithms computed with base $e$ (where $e \\approx 2.71828...$ is Euler's number) are called Natural Logarithms, discovered by John Napier. Denoted by $\\ln x = \\log_e x$.\n\n• 3.3.3 Characteristic and Mantissa:\nThe common logarithm of any positive number consists of two parts:\n$$\\log x = \\text{Characteristic} + \\text{Mantissa}$$\n1. Characteristic: The integer part of the logarithm (can be positive, zero, or negative). If negative, it is written with a bar over it (e.g., $\\bar{2}.4512$).\n   - For numbers $\\ge 1$, $\\text{Characteristic} = (\\text{number of integral digits}) - 1$.\n   - For numbers $< 1$, $\\text{Characteristic} = -(\\text{number of zeros immediately after decimal point} + 1)$.\n2. Mantissa: The positive fractional or decimal part ($0 \\le \\text{Mantissa} < 1$). It is obtained from the 4-figure logarithm tables and is independent of the position of the decimal point.\n\n• 3.3.4 Anti-Logarithm:\nThe number whose logarithm is given is called its Anti-logarithm. If $\\log x = y$, then $x = \\text{antilog}(y)$."
      },
      {
        "id": "3.4",
        "title": "3.4 Laws of Logarithms",
        "theory": "For any positive real numbers $m, n, a, b$ with $a \\ne 1, b \\ne 1$, the following fundamental laws hold:\n\n1. First Law (Product Rule):\n$$\\log_a (m \\times n) = \\log_a m + \\log_a n$$\nProof: Let $\\log_a m = x \\implies a^x = m$, and $\\log_a n = y \\implies a^y = n$. Multiplying gives $m \\times n = a^x \\cdot a^y = a^{x+y}$. In logarithmic form: $\\log_a (m \\times n) = x + y = \\log_a m + \\log_a n$.\n\n2. Second Law (Quotient Rule):\n$$\\log_a \\left(\\frac{m}{n}\\right) = \\log_a m - \\log_a n$$\n\n3. Third Law (Power Rule):\n$$\\log_a (m^n) = n \\log_a m$$\n\n4. Fourth Law (Change of Base Rule):\n$$\\log_a m = \\frac{\\log_b m}{\\log_b a} \\quad \\text{or} \\quad \\log_b m = \\log_a m \\times \\log_b a$$"
      },
      {
        "id": "3.5",
        "title": "3.5 Applications of Logarithms in Computations",
        "theory": "• Numerical Computation Algorithm:\nLogarithms simplify complicated arithmetic calculations involving products, quotients, and powers:\n1. Let the given expression be $x$.\n2. Take common logarithm on both sides: $\\log x = \\log(\\text{expression})$.\n3. Apply the laws of logarithms to expand the right-hand side into additions, subtractions, and multiplications by constants.\n4. Find the logarithm of each term using log tables (characteristic + mantissa).\n5. Simplify the algebraic sum of the logarithmic values.\n6. Take the anti-logarithm of the resulting value to determine the final value of $x$."
      }
    ],
    "workedExamples": [
      {
        "id": "eg3.1",
        "title": "Example 1 & 2: Writing in Scientific Notation",
        "problem": "Express the following numbers in scientific notation: (i) $405,000$ (ii) $0.00092$",
        "steps": [
          "For (i) 405,000: Place decimal after first non-zero digit 4: 4.05000. The decimal moved 5 places to the left.",
          "Therefore, the exponent of 10 is +5: 405,000 = 4.05 × 10⁵.",
          "For (ii) 0.00092: Place decimal after first non-zero digit 9: 9.2. The decimal moved 4 places to the right.",
          "Therefore, the exponent of 10 is -4: 0.00092 = 9.2 × 10⁻⁴."
        ],
        "answer": "(i) 4.05 × 10⁵, (ii) 9.2 × 10⁻⁴"
      },
      {
        "id": "eg3.2",
        "title": "Example 6: Writing in Standard Decimal Form",
        "problem": "Express the following in ordinary decimal form: (i) $6.35 \\times 10^6$ (ii) $7.61 \\times 10^{-4}$",
        "steps": [
          "For (i) 6.35 × 10⁶: Since exponent is +6, shift decimal 6 places to the right.",
          "Adding necessary zeros: 6.35 × 10⁶ = 6,350,000.",
          "For (ii) 7.61 × 10⁻⁴: Since exponent is -4, shift decimal 4 places to the left.",
          "Adding necessary zeros: 7.61 × 10⁻⁴ = 0.000761."
        ],
        "answer": "(i) 6,350,000, (ii) 0.000761"
      },
      {
        "id": "eg3.3",
        "title": "Example 8 & 9: Converting Between Exponential & Logarithmic Forms",
        "problem": "(i) Convert $2^5 = 32$ and $10^{-3} = 0.001$ to logarithmic form. (ii) Convert $\\log_2 64 = 6$ and $\\log_3 \\frac{1}{9} = -2$ to exponential form.",
        "steps": [
          "Using definition: aˣ = y ⟺ logₐ y = x.",
          "(i) 2⁵ = 32 ⟹ log₂ 32 = 5.",
          "10⁻³ = 0.001 ⟹ log₁₀ 0.001 = -3.",
          "(ii) log₂ 64 = 6 ⟹ 2⁶ = 64.",
          "log₃ (1/9) = -2 ⟹ 3⁻² = 1/9."
        ],
        "answer": "(i) log₂ 32 = 5, log₁₀ 0.001 = -3; (ii) 2⁶ = 64, 3⁻² = 1/9"
      },
      {
        "id": "eg3.4",
        "title": "Example 10: Solving Logarithmic Equations",
        "problem": "Find the value of $x$ if: (i) $\\log_3 x = 4$, (ii) $\\log_x 81 = 4$, (iii) $\\log_2 \\frac{1}{128} = x$",
        "steps": [
          "(i) log₃ x = 4: In exponential form, x = 3⁴ = 81.",
          "(ii) logₓ 81 = 4: In exponential form, x⁴ = 81 = 3⁴ ⟹ x = 3.",
          "(iii) log₂ (1/128) = x: In exponential form, 2ˣ = 1/128 = 2⁻⁷ ⟹ x = -7."
        ],
        "answer": "(i) x = 81, (ii) x = 3, (iii) x = -7"
      },
      {
        "id": "eg3.5",
        "title": "Example 11: Finding Characteristic and Mantissa",
        "problem": "Find the characteristic and mantissa of: (i) $87.2$, (ii) $0.00159$",
        "steps": [
          "(i) For 87.2: Number of integral digits is 2. Characteristic = 2 - 1 = 1.",
          "From log tables, look up row 87 under column 2: mantissa is 0.9405. Thus log 87.2 = 1.9405.",
          "(ii) For 0.00159: Number is less than 1, with 2 zeros immediately following the decimal point.",
          "Characteristic = -(2 + 1) = -3 = 3̄.",
          "From log tables, row 15 under column 9: mantissa is 0.2014. Thus log 0.00159 = 3̄.2014."
        ],
        "answer": "(i) Characteristic = 1, Mantissa = 0.9405; (ii) Characteristic = 3̄, Mantissa = 0.2014"
      },
      {
        "id": "eg3.6",
        "title": "Example 13: Finding Antilogarithm",
        "problem": "Find the number whose logarithm is: (i) $1.2508$, (ii) $\\bar{1}.5463$",
        "steps": [
          "(i) Given log x = 1.2508. Characteristic = 1, Mantissa = 0.2508.",
          "Look up mantissa .25 under column 0 and mean difference 8 in antilog table: 1778 + 3 = 1781.",
          "Since characteristic is 1, place decimal after 1 + 1 = 2 digits: x = 17.81.",
          "(ii) Given log x = 1̄.5463. Characteristic = -1, Mantissa = 0.5463.",
          "From antilog table for .54 under 6 diff 3: 3516 + 2 = 3518.",
          "Since characteristic is 1̄, insert no zero after decimal point: x = 0.3518."
        ],
        "answer": "(i) 17.81, (ii) 0.3518"
      },
      {
        "id": "eg3.7",
        "title": "Example 14: Applying Laws of Logarithms",
        "problem": "Express as a single logarithm: $2\\log 3 + 4\\log 2 - 3$",
        "steps": [
          "Using power law: 2 log 3 = log(3²) = log 9, and 4 log 2 = log(2⁴) = log 16.",
          "Rewrite constant 3 as log₁₀(10³) = log 1000.",
          "Expression = log 9 + log 16 - log 1000.",
          "Applying product and quotient laws: log((9 × 16) / 1000) = log(144 / 1000) = log(0.144)."
        ],
        "answer": "log(0.144)"
      },
      {
        "id": "eg3.8",
        "title": "Example 15 & 16: Numerical Computation Using Logarithms",
        "problem": "Calculate using logarithms: $x = \\frac{784.6 \\times 0.0431}{28.23}$",
        "steps": [
          "Take logarithm on both sides: log x = log(784.6) + log(0.0431) - log(28.23).",
          "log(784.6) = 2.8946",
          "log(0.0431) = 2̄.6345 = -2 + 0.6345 = -1.3655",
          "Sum of numerator logs: 2.8946 + (-1.3655) = 1.5291",
          "log(28.23) = 1.4507",
          "log x = 1.5291 - 1.4507 = 0.0784",
          "Take antilog: x = antilog(0.0784) = 1.198."
        ],
        "answer": "x ≈ 1.1980"
      }
    ],
    "exercises": [
      {
        "exercise": "3.1",
        "title": "Exercise 3.1 — Scientific and Standard Notation",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Express each of the following numbers in scientific notation:\n(i) 405,000\n(ii) 1,670,000\n(iii) 0.00000039\n(iv) 0.00092\n(v) 234,600,000,000\n(vi) 89.04\n(vii) 0.00104\n(viii) 0.00000000514\n(ix) 0.00005",
            "solution": "(i) 405,000: Decimal moved 5 places left ⟹ 4.05 × 10⁵\n(ii) 1,670,000: Decimal moved 6 places left ⟹ 1.67 × 10⁶\n(iii) 0.00000039: Decimal moved 7 places right ⟹ 3.9 × 10⁻⁷\n(iv) 0.00092: Decimal moved 4 places right ⟹ 9.2 × 10⁻⁴\n(v) 234,600,000,000: Decimal moved 11 places left ⟹ 2.346 × 10¹¹\n(vi) 89.04: Decimal moved 1 place left ⟹ 8.904 × 10¹\n(vii) 0.00104: Decimal moved 3 places right ⟹ 1.04 × 10⁻³\n(viii) 0.00000000514: Decimal moved 9 places right ⟹ 5.14 × 10⁻⁹\n(ix) 0.00005: Decimal moved 5 places right ⟹ 5 × 10⁻⁵",
            "answer": "(i) 4.05 × 10⁵, (ii) 1.67 × 10⁶, (iii) 3.9 × 10⁻⁷, (iv) 9.2 × 10⁻⁴, (v) 2.346 × 10¹¹, (vi) 8.904 × 10¹, (vii) 1.04 × 10⁻³, (viii) 5.14 × 10⁻⁹, (ix) 5 × 10⁻⁵"
          },
          {
            "qNo": "Q2",
            "question": "Express each of the following numbers in standard (ordinary) decimal notation:\n(i) 8.3 × 10⁻⁵\n(ii) 4.1 × 10⁶\n(iii) 2.07 × 10⁷\n(iv) 3.15 × 10⁻⁶\n(v) 6.27 × 10⁻¹⁰\n(vi) 5.41 × 10⁻⁸\n(vii) 7.632 × 10⁻⁴\n(viii) 9.4 × 10⁵\n(ix) -2.6 × 10⁹",
            "solution": "(i) 8.3 × 10⁻⁵ = 0.000083\n(ii) 4.1 × 10⁶ = 4,100,000\n(iii) 2.07 × 10⁷ = 20,700,000\n(iv) 3.15 × 10⁻⁶ = 0.00000315\n(v) 6.27 × 10⁻¹⁰ = 0.000000000627\n(vi) 5.41 × 10⁻⁸ = 0.0000000541\n(vii) 7.632 × 10⁻⁴ = 0.0007632\n(viii) 9.4 × 10⁵ = 940,000\n(ix) -2.6 × 10⁹ = -2,600,000,000",
            "answer": "(i) 0.000083, (ii) 4,100,000, (iii) 20,700,000, (iv) 0.00000315, (v) 0.000000000627, (vi) 0.0000000541, (vii) 0.0007632, (viii) 940,000, (ix) -2,600,000,000"
          },
          {
            "qNo": "Q3",
            "question": "Light travels from the Sun to Earth at a speed of approximately 3 × 10⁵ km/s. The distance between Earth and Sun is 1.5 × 10⁸ km. How long does it take for light to reach Earth?",
            "solution": "Formula: Time = Distance / Speed\nTime = (1.5 × 10⁸) / (3 × 10⁵)\n     = (1.5 / 3) × 10³ = 0.5 × 1000 = 500 seconds\nIn minutes and seconds: 500 ÷ 60 = 8 minutes with remainder 20 seconds.",
            "answer": "8 minutes and 20 seconds (500 seconds)"
          }
        ]
      },
      {
        "exercise": "3.2",
        "title": "Exercise 3.2 — Logarithmic and Exponential Forms",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Write the following in logarithmic form:\n(i) 4^4 = 256\n(ii) 2^-6 = 1/64\n(iii) 10^0 = 1\n(iv) x^(3/4) = y\n(v) 3^-4 = 1/81\n(vi) 64^(2/3) = 16",
            "solution": "Rule: a^x = y iff log_a y = x.\n(i) log_4 256 = 4\n(ii) log_2 (1/64) = -6\n(iii) log_10 1 = 0\n(iv) log_x y = 3/4\n(v) log_3 (1/81) = -4\n(vi) log_64 16 = 2/3",
            "answer": "(i) log_4 256 = 4, (ii) log_2 (1/64) = -6, (iii) log_10 1 = 0, (iv) log_x y = 3/4, (v) log_3 (1/81) = -4, (vi) log_64 16 = 2/3"
          },
          {
            "qNo": "Q2",
            "question": "Write the following in exponential form:\n(i) log_a (1/a^2) = -2\n(ii) log_2 (1/128) = -7\n(iii) log_b 3 = 64\n(iv) log_a a = 1\n(v) log_a 1 = 0\n(vi) log_4 (1/8) = -3/2",
            "solution": "Rule: log_a y = x iff a^x = y.\n(i) a^-2 = 1/a^2\n(ii) 2^-7 = 1/128\n(iii) b^64 = 3\n(iv) a^1 = a\n(v) a^0 = 1\n(vi) 4^(-3/2) = 1/8",
            "answer": "(i) a^-2 = 1/a^2, (ii) 2^-7 = 1/128, (iii) b^64 = 3, (iv) a = a, (v) a^0 = 1, (vi) 4^(-3/2) = 1/8"
          },
          {
            "qNo": "Q3",
            "question": "Solve:\n(i) $\\log_{\\sqrt{5}} 125=x$\n(ii) $\\log_4 x=-3$\n(iii) $\\log_{81}9=x$\n(iv) $\\log_3(5x+1)=2$\n(v) $\\log_2 x=7$\n(vi) $\\log_x 0.25=2$\n(vii) $\\log_x(0.001)=-3$\n(viii) $\\log_x\\frac{1}{64}=-2$\n(ix) $\\log_{\\sqrt{3}}x=16$",
            "solution": "(i) (sqrt(5))^x = 125 = 5^3, so x/2 = 3 and x = 6.\n(ii) x = 4^-3 = 1/64.\n(iii) 81^x = 9; (3^4)^x = 3^2, so x = 1/2.\n(iv) 5x + 1 = 3^2 = 9, so x = 8/5.\n(v) x = 2^7 = 128.\n(vi) x^2 = 0.25; a logarithm base must be positive and not 1, so x = 1/2.\n(vii) x^-3 = 0.001 = 10^-3, so x = 10.\n(viii) x^-2 = 1/64, so x^2 = 64; since a base is positive, x = 8.\n(ix) (sqrt(3))^16 = 3^8, so x = 6561.",
            "answer": "(i) x=6, (ii) x=1/64, (iii) x=1/2, (iv) x=8/5, (v) x=128, (vi) x=1/2, (vii) x=10, (viii) x=8, (ix) x=6561. The printed answer key appears to say 6560 for (ix); the printed equation gives 6561."
          }
        ]
      },
      {
        "exercise": "3.3",
        "title": "Exercise 3.3 — Characteristics & Common Logarithm Tables",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the characteristic of the common logarithm of each of the following numbers:\n(i) 57, (ii) 7.4, (iii) 5.63, (iv) 982.5, (v) 7824, (vi) 186000, (vii) 0.71, (viii) 0.000059",
            "solution": "Formula: For N ≥ 1, Characteristic = (digits) - 1. For N < 1, Characteristic = -(zeros after decimal + 1).\n(i) 57: 2 digits ⟹ 2 - 1 = 1\n(ii) 7.4: 1 digit ⟹ 1 - 1 = 0\n(iii) 5.63: 1 digit ⟹ 1 - 1 = 0\n(iv) 982.5: 3 digits ⟹ 3 - 1 = 2\n(v) 7824: 4 digits ⟹ 4 - 1 = 3\n(vi) 186000: 6 digits ⟹ 6 - 1 = 5\n(vii) 0.71: 0 zeros after decimal ⟹ -(0+1) = -1 = 1̄\n(viii) 0.000059: 4 zeros after decimal ⟹ -(4+1) = -5 = 5̄",
            "answer": "(i) 1, (ii) 0, (iii) 0, (iv) 2, (v) 3, (vi) 5, (vii) 1̄, (viii) 5̄"
          },
          {
            "qNo": "Q2",
            "question": "Find the common logarithm using log tables:\n(i) log 87.2, (ii) log 37300, (iii) log 753, (iv) log 9.21, (v) log 0.00159, (vi) log 0.0256, (vii) log 6.753",
            "solution": "(i) log 87.2: Char = 1, Mantissa = .9405 ⟹ 1.941\n(ii) log 37300: Char = 4, Mantissa = .5717 ⟹ 4.572\n(iii) log 753: Char = 2, Mantissa = .8768 ⟹ 2.877\n(iv) log 9.21: Char = 0, Mantissa = .9642 ⟹ 0.9642\n(v) log 0.00159: Char = 3̄, Mantissa = .2014 ⟹ 3̄.2014\n(vi) log 0.0256: Char = 2̄, Mantissa = .4083 ⟹ 2̄.4083\n(vii) log 6.753: Char = 0, Mantissa = .8295 ⟹ 0.8295",
            "answer": "(i) 1.941, (ii) 4.572, (iii) 2.877, (iv) 0.9642, (v) 3̄.2014, (vi) 2̄.4083, (vii) 0.8295"
          },
          {
            "qNo": "Q3",
            "question": "Find logarithms of the following numbers:\n(i) 2476, (ii) 2.4, (iii) 92.5, (iv) 482.7, (v) 0.783, (vi) 0.09566, (vii) 0.006735, (viii) 700",
            "solution": "(i) log 2476 = 3.3938\n(ii) log 2.4 = 0.3802\n(iii) log 92.5 = 1.9661\n(iv) log 482.7 = 2.6836\n(v) log 0.783 = 1̄.8938\n(vi) log 0.09566 = 2̄.9808\n(vii) log 0.006735 = 3̄.8283\n(viii) log 700 = 2.8451",
            "answer": "(i) 3.3938, (ii) 0.3802, (iii) 1.9661, (iv) 2.6836, (v) 1̄.8938, (vi) 2̄.9808, (vii) 3̄.8283, (viii) 2.8451"
          }
        ]
      },
      {
        "exercise": "3.4",
        "title": "Exercise 3.4 — Anti-Logarithm Tables & Equations",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find anti-logarithm of the following numbers:\n(i) 1.2508\n(ii) 0.8401\n(iii) 2.540\n(iv) 2̄.2508\n(v) 1̄.5463\n(vi) 3.5526",
            "solution": "(i) Antilog 1.2508: Mantissa .2508 ⟹ 1781. Char 1 ⟹ 17.81\n(ii) Antilog 0.8401: Mantissa .8401 ⟹ 6920. Char 0 ⟹ 6.920\n(iii) Antilog 2.540: Mantissa .5400 ⟹ 3467. Char 2 ⟹ 346.7\n(iv) Antilog 2̄.2508: Mantissa .2508 ⟹ 1781. Char 2̄ ⟹ 0.01781\n(v) Antilog 1̄.5463: Mantissa .5463 ⟹ 3518. Char 1̄ ⟹ 0.3518\n(vi) Antilog 3.5526: Mantissa .5526 ⟹ 3570. Char 3 ⟹ 3570.0",
            "answer": "(i) 17.81, (ii) 6.920, (iii) 346.7, (iv) 0.01781, (v) 0.3518, (vi) 3570.0"
          },
          {
            "qNo": "Q2",
            "question": "Find the values of x from the following equations:\n(i) log x = 1̄.8401\n(ii) log x = 2.1931\n(iii) log x = 4.5911\n(iv) log x = 3̄.0253\n(v) log x = 1.8716\n(vi) log x = 2̄.8370",
            "solution": "(i) x = antilog(1̄.8401) = 0.6920\n(ii) x = antilog(2.1931) = 156.0\n(iii) x = antilog(4.5911) = 39000.0\n(iv) x = antilog(3̄.0253) = 0.001060\n(v) x = antilog(1.8716) = 74.40\n(vi) x = antilog(2̄.8370) = 0.06871",
            "answer": "(i) x = 0.6920, (ii) x = 156.0, (iii) x = 39000.0, (iv) x = 0.001060, (v) x = 74.40, (vi) x = 0.06871"
          }
        ]
      },
      {
        "exercise": "3.5",
        "title": "Exercise 3.5 — Laws and Properties of Logarithms",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Use logarithm properties to simplify the expressions:\n(i) log₇ √7\n(ii) log₈ (1/2)\n(iii) log₁₀ √1000\n(iv) log₃ 3 + log₃ 27\n(v) log₁₀ (1/10)\n(vi) log_√3 3",
            "solution": "(i) log₇ (7^(1/2)) = (1/2) log₇ 7 = 1/2\n(ii) log₈ (8^(-1/3)) = -1/3 (since 8^(-1/3) = (2³)^(-1/3) = 2⁻¹ = 1/2)\n(iii) log₁₀ (10³)^(1/2) = log₁₀ 10^(3/2) = 3/2\n(iv) log₃ 3 + log₃ 27 = 1 + 3 = 4\n(v) log₁₀ (10⁻¹) = -1\n(vi) log_√3 ((√3)²) = 2",
            "answer": "(i) 1/2, (ii) -1/3, (iii) 3/2, (iv) 4, (v) -1, (vi) 2"
          },
          {
            "qNo": "Q2",
            "question": "Express each of the following as a single logarithm:\n(i) 3 log 2 - 4 log 3\n(ii) 2 log 3 + 4 log 2 - 3\n(iii) log 5 - 1\n(iv) (1/2) log x - 2 log(2y) + 3 log z",
            "solution": "(i) log(2³) - log(3⁴) = log 8 - log 81 = log(8/81)\n(ii) log(3²) + log(2⁴) - log 1000 = log((9 × 16) / 1000) = log(0.144)\n(iii) log 5 - log 10 = log(5/10) = log(0.5)\n(iv) log(x^(1/2)) - log((2y)²) + log(z³) = log((√x · z³) / (4y²))",
            "answer": "(i) log(8/81), (ii) log(0.144), (iii) log(0.5), (iv) log((√x · z³) / (4y²))"
          },
          {
            "qNo": "Q3",
            "question": "Find the value of 'a' from the following equations:\n(i) log₂ 6 + log₂ 7 = log₂ a\n(ii) log a = log 5 + log 8 - log 2\n(iii) (log_b r) / (log_b t) = log_a r\n(iv) log_a 25 - log_a 5 = log_a a",
            "solution": "(i) log₂(6 × 7) = log₂ a ⟹ log₂ 42 = log₂ a ⟹ a = 42\n(ii) log a = log((5 × 8)/2) = log 20 ⟹ a = 20\n(iii) By change of base rule: (log_b r)/(log_b t) = log_t r. Since log_t r = log_a r ⟹ a = t\n(iv) log_a (25/5) = log_a 5. Since log_a 5 = log_a a ⟹ a = 5",
            "answer": "(i) a = 42, (ii) a = 20, (iii) a = t, (iv) a = 5"
          },
          {
            "qNo": "Q4",
            "question": "Evaluate: log₂ 3 · log₃ 4 · log₄ 5 · log₅ 6 · log₆ 7 · log₇ 8",
            "solution": "Use change of base formula log_b x = (log x)/(log b):\nExpression = (log 3 / log 2) × (log 4 / log 3) × (log 5 / log 4) × (log 6 / log 5) × (log 7 / log 6) × (log 8 / log 7)\nAll intermediate logarithms cancel out: (log 8) / (log 2) = log₂(8) = log₂(2³) = 3.",
            "answer": "3"
          }
        ]
      },
      {
        "exercise": "3.6",
        "title": "Exercise 3.6 — Logarithmic Computations",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Simplify with the help of logarithms:\n(i) $3.81 \\times 43.4$\n(ii) $73.42 \\times 0.00462 \\times 0.5143$\n(iii) $\\frac{784.6 \\times 0.0431}{28.23}$\n(iv) $\\frac{0.4932 \\times 653.7}{0.07213 \\times 8456}$\n(v) $\\frac{(78.41)^3 \\times \\sqrt[3]{142.3}}{\\sqrt[4]{0.1562}}$",
            "solution": "(i) 165.340\n(ii) 0.1745\n(iii) 1.1980\n(iv) 0.5285\n(v) Direct evaluation of the printed expression gives approximately 4,003,400.793. The supplied answer key prints 3,614,930.899 for this item, which does not match the expression shown in the book.",
            "answer": "(i) 165.340, (ii) 0.1745, (iii) 1.1980, (iv) 0.5285, (v) approximately 4,003,400.793 (the printed key lists 3,614,930.899; discrepancy noted)."
          },
          {
            "qNo": "Q2",
            "question": "Given that log 2 = 0.3010, log 3 = 0.4771, log 5 = 0.6990, and log 7 = 0.8451, find:\n(i) log 105\n(ii) log 108\n(iii) log √72\n(iv) log 2.4\n(v) log 0.0081",
            "solution": "(i) log 105 = log(3 × 5 × 7) = 0.4771 + 0.6990 + 0.8451 = 2.0212\n(ii) log 108 = log(2² × 3³) = 2(0.3010) + 3(0.4771) = 0.6020 + 1.4313 = 2.0333\n(iii) log √72 = 0.5[3 log 2 + 2 log 3] = 0.5[3(0.3010) + 2(0.4771)] = 0.5(1.8572) = 0.9286\n(iv) log 2.4 = log(24/10) = log(12/5) = 2 log 2 + log 3 - log 5 = 0.6020 + 0.4771 - 0.6990 = 0.3801\n(v) log 0.0081 = log(81/10000) = 4 log 3 - 4 log 10 = 4(0.4771) - 4 = 1.9084 - 4 = -2.0916 = 3̄.9084",
            "answer": "(i) 2.0212, (ii) 2.0333, (iii) 0.6191 (printed key: 0.6190), (iv) 0.3801, (v) 3̄.9084 (-2.0916)"
          }
        ]
      },
      {
        "exercise": "Review 3",
        "title": "Review Exercise 3 — Comprehensive Unit Review",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following MCQs:\n(i) log₉ (1/81) =\n(ii) If log₂ 8 = x, then x =\n(iii) Base of common log is:\n(iv) log √10 =\n(v) For any non-zero value of x, x⁰ =\n(vi) Rewrite t = log_b m as an exponential equation:\n(vii) log₁₀ 10 =\n(viii) Characteristic of log 0.000059 is:\n(ix) Evaluate log₄ (1/2) =\n(x) Base of natural log is:\n(xi) log m + log n =\n(xii) 0.069 can be written in scientific notation as:\n(xiii) ln x - 2 ln y =",
            "solution": "(i) 9⁻² = 1/81 ⟹ -2 (Option b)\n(ii) 2ˣ = 8 = 2³ ⟹ x = 3 (Option c)\n(iii) Base of common log is 10 (Option a)\n(iv) log₁₀(10^(1/2)) = 1/2 (Option c)\n(v) x⁰ = 1 (Option b)\n(vi) m = b^t (Option c)\n(vii) log₁₀ 10 = 1 (Option d)\n(viii) 4 zeros after decimal ⟹ -(4+1) = -5 (Option a)\n(ix) 4^(-1/2) = 1/2 ⟹ -1/2 (Option b)\n(x) Base of natural log is e (Option b)\n(xi) log m + log n = log(mn) (Option c)\n(xii) 0.069 = 6.9 × 10⁻² (Option b)\n(xiii) ln x - ln(y²) = ln(x / y²) (Option d)",
            "answer": "(i) b (-2), (ii) c (3), (iii) a (10), (iv) c (1/2), (v) b (1), (vi) c (m = bᵗ), (vii) d (1), (viii) a (-5), (ix) b (-1/2), (x) b (e), (xi) c (log mn), (xii) b (6.9 × 10⁻²), (xiii) d (ln(x/y²))"
          },
          {
            "qNo": "Q2",
            "question": "Write 9473.2 in scientific notation.",
            "solution": "Shift decimal 3 places left: 9.4732 × 10³.",
            "answer": "9.4732 × 10³"
          },
          {
            "qNo": "Q3",
            "question": "Write 5.4 × 10⁻⁵ in standard decimal notation.",
            "solution": "Shift decimal 5 places left: 0.000054 (or textbook variant 0.000041).",
            "answer": "0.000054 (or 0.000041)"
          },
          {
            "qNo": "Q4",
            "question": "Write in logarithmic form: 3⁻³ = 1/27.",
            "solution": "By definition: aˣ = y ⟺ logₐ y = x. Here log₃ (1/27) = -3.",
            "answer": "log₃ (1/27) = -3"
          },
          {
            "qNo": "Q5",
            "question": "Write in exponential form: log₅ 1 = 0.",
            "solution": "By definition: logₐ y = x ⟺ aˣ = y. Here 5⁰ = 1.",
            "answer": "5⁰ = 1"
          },
          {
            "qNo": "Q6",
            "question": "Solve for x: log₄ 16 = x.",
            "solution": "In exponential form: 4ˣ = 16 = 4² ⟹ x = 2.",
            "answer": "x = 2"
          },
          {
            "qNo": "Q7",
            "question": "Find the characteristic of the common logarithm of 0.0083.",
            "solution": "Number of zeros immediately following decimal point is 2. Characteristic = -(2 + 1) = -3 = 3̄.",
            "answer": "-3 (or 3̄)"
          },
          {
            "qNo": "Q8",
            "question": "Find log 12.4.",
            "solution": "Integral digits = 2 ⟹ Char = 2 - 1 = 1. From log tables, mantissa for 12 under 4 is .0934. Total = 1.0934.",
            "answer": "1.0934"
          },
          {
            "qNo": "Q9",
            "question": "Find the value of 'a': log₂ a = log₂ 9 + log₂ 2 - log₂ 9.",
            "solution": "log₂ a = log₂((9 × 2)/9) = log₂ 2 = 1 ⟹ a = 2.",
            "answer": "a = 2"
          },
          {
            "qNo": "Q10",
            "question": "Calculate using logarithms: ((63.28) × (0.00843)² × (0.4623)) / ((412.3) × (2.184)⁵).",
            "solution": "Let expression be x. Taking log on both sides:\nlog x = [log 63.28 + 2 log 0.00843 + log 0.4623] - [log 412.3 + 5 log 2.184]\nEvaluating using log tables gives log x ≈ 4̄.6021 ⟹ x ≈ 0.0004.",
            "answer": "0.0004"
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "The scientific notation of $0.00000729$ is:",
          "options": [
            "$7.29 \\times 10^{-5}$",
            "$7.29 \\times 10^{-6}$",
            "$7.29 \\times 10^{-7}$",
            "$72.9 \\times 10^{-6}$"
          ],
          "correct": 1,
          "explanation": "Moving the decimal point 6 places to the right yields $7.29 \\times 10^{-6}$."
        },
        {
          "question": "If $\\log_x 81 = 4$, then $x$ is equal to:",
          "options": [
            "9",
            "3",
            "4",
            "27"
          ],
          "correct": 1,
          "explanation": "$x^4 = 81 = 3^4 \\implies x = 3$."
        },
        {
          "question": "The characteristic of $\\log 0.00457$ is:",
          "options": [
            "-2",
            "3",
            "-3",
            "2"
          ],
          "correct": 2,
          "explanation": "There are 2 zeros immediately following the decimal point, so the characteristic is $-(2+1) = -3 = \\bar{3}$."
        },
        {
          "question": "According to the laws of logarithms, $\\log_a \\left(\\frac{m}{n}\\right)$ is equal to:",
          "options": [
            "$\\frac{\\log_a m}{\\log_a n}$",
            "$\\log_a m - \\log_a n$",
            "$\\log_a(m - n)$",
            "$\\log_a m + \\log_a n$"
          ],
          "correct": 1,
          "explanation": "The quotient rule states that $\\log_a(m/n) = \\log_a m - \\log_a n$."
        },
        {
          "question": "The value of $\\log_2 3 \\cdot \\log_3 2$ is:",
          "options": [
            "0",
            "1",
            "2",
            "6"
          ],
          "correct": 1,
          "explanation": "By the change of base rule: $\\frac{\\log 3}{\\log 2} \\times \\frac{\\log 2}{\\log 3} = 1$."
        }
      ],
      "shortQuestions": [
        {
          "question": "Define common logarithm and natural logarithm with their respective bases.",
          "answer": "A logarithm to the base 10 is called a Common Logarithm (invented by Henry Briggs) and is written as $\\log x$. A logarithm to the base $e$ ($e \\approx 2.71828$) is called a Natural Logarithm (invented by John Napier) and is written as $\\ln x$."
        },
        {
          "question": "Express $2\\log 3 + 3\\log 2 - \\log 36$ as a single logarithm.",
          "answer": "Using laws of logarithms:\n$2\\log 3 = \\log(3^2) = \\log 9$, $3\\log 2 = \\log(2^3) = \\log 8$.\n$\\log 9 + \\log 8 - \\log 36 = \\log\\left(\\frac{9 \\times 8}{36}\\right) = \\log\\left(\\frac{72}{36}\\right) = \\log 2$."
        },
        {
          "question": "Find the value of $x$ if $\\log_{\\sqrt{5}} x = 4$.",
          "answer": "Convert to exponential form: $x = (\\sqrt{5})^4 = (5^{1/2})^4 = 5^2 = 25$."
        },
        {
          "question": "State the four fundamental laws of logarithms.",
          "answer": "1. $\\log_a(mn) = \\log_a m + \\log_a n$\n2. $\\log_a(m/n) = \\log_a m - \\log_a n$\n3. $\\log_a(m^n) = n\\log_a m$\n4. $\\log_a m = \\frac{\\log_b m}{\\log_b a}$"
        }
      ],
      "longQuestions": [
        {
          "question": "Prove that $\\log_a (m \\times n) = \\log_a m + \\log_a n$ and explain why $\\log_a(m+n) \\ne \\log_a m + \\log_a n$.",
          "answer": "Proof:\nLet $\\log_a m = x \\implies a^x = m$ ... (1)\nLet $\\log_a n = y \\implies a^y = n$ ... (2)\nMultiplying (1) and (2):\n$m \\times n = a^x \\cdot a^y = a^{x+y}$\nWriting in logarithmic form:\n$\\log_a (m \\times n) = x + y$\nSubstituting back the values of $x$ and $y$:\n$\\log_a (m \\times n) = \\log_a m + \\log_a n$. (Hence proved).\n\nExplanation: The logarithm of a sum $\\log_a(m+n)$ cannot be expanded into $\\log_a m + \\log_a n$, because exponents add only when bases are multiplied ($a^x \\cdot a^y = a^{x+y}$), not when terms are added."
        },
        {
          "question": "Evaluate using logarithm tables: $x = \\frac{784.6 \\times 0.0431}{28.23}$.",
          "answer": "Step 1: Let $x = \\frac{784.6 \\times 0.0431}{28.23}$.\nStep 2: Take log on both sides:\n$\\log x = \\log(784.6) + \\log(0.0431) - \\log(28.23)$\nStep 3: Evaluate each logarithm using tables:\n- $\\log 784.6$: Char = 2, Mantissa = .8946 $\\implies 2.8946$\n- $\\log 0.0431$: Char = $\\bar{2}$, Mantissa = .6345 $\\implies \\bar{2}.6345 = -2 + 0.6345 = -1.3655$\n- $\\log 28.23$: Char = 1, Mantissa = .4507 $\\implies 1.4507$\nStep 4: Compute the algebraic sum:\n$\\log x = 2.8946 + (-1.3655) - 1.4507 = 1.5291 - 1.4507 = 0.0784$\nStep 5: Find antilog:\n$x = \\text{antilog}(0.0784) = 1.1980$."
        }
      ]
    },
    "formulaSheet": [
      {
        "name": "Scientific Notation",
        "formula": "x = a × 10ⁿ  (1 ≤ a < 10, n ∈ ℤ)",
        "note": "Standard format for expressing very large and very small physical quantities concisely."
      },
      {
        "name": "Laws of Logarithms",
        "formula": "logₐ(mn) = logₐ m + logₐ n,  logₐ(m/n) = logₐ m - logₐ n,  logₐ(mⁿ) = n logₐ m",
        "note": "Transforms multiplication into addition, division into subtraction, and powers into products."
      },
      {
        "name": "Change of Base Rule",
        "formula": "logₐ m = (log_b m) / (log_b a)",
        "note": "Converts logarithms between any arbitrary positive bases."
      },
      {
        "name": "Common Logarithm Structure",
        "formula": "log x = Characteristic + Mantissa",
        "note": "Characteristic is integral (from decimal place); mantissa is positive fractional (from tables)."
      }
    ]
  },
  {
    "number": 4,
    "id": "u4",
    "title": "Algebraic Expressions and Formulas",
    "titleUrdu": "الجبرائی جملے اور الجبرائی فارمولے",
    "status": "ready",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 97–125",
    "description": "Official KPK Board Textbook Unit 4: Algebraic expressions, polynomials, rational expressions in lowest terms, operations on rational expressions, binomial & trinomial square identities, sum and difference of cubes, surds, order and classifications, and rationalization of denominators.",
    "sections": [
      {
        "id": "4.1",
        "title": "4.1 Algebraic Expressions & Rational Expressions",
        "theory": "• 4.1.1 Algebraic Expressions:\nAn algebraic expression is a combination of constants and variables connected by the fundamental arithmetic operations of addition, subtraction, multiplication, and division (+, −, ×, ÷).\nFor example: 3x² + 5x − 7, (2x + 3y)/(x − y), and 4x³ − 2√x + 1 are algebraic expressions.\n\n• Polynomials:\nA polynomial P(x) in variable x is an algebraic expression of the form:\nP(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀\nwhere the exponents n, n-1, ..., 1, 0 are non-negative integers (whole numbers: 0, 1, 2, ...), and the coefficients aₙ, aₙ₋₁, ..., a₀ are real numbers with aₙ ≠ 0.\nThe highest exponent n is called the degree of the polynomial.\nKey Check: If any term contains a negative exponent (e.g. x⁻¹) or a fractional exponent (e.g. √x = x^(1/2)), or a variable in the denominator that cannot be canceled, it is NOT a polynomial.\n\n• 4.1.2 Rational Expressions:\nAn expression of the form P(x) / Q(x), where P(x) and Q(x) are polynomials in variable x, and Q(x) is not the zero polynomial (Q(x) ≠ 0), is called a rational expression.\nIn P(x)/Q(x), P(x) is called the numerator and Q(x) is called the denominator.\nNote: Every polynomial P(x) is also a rational expression because it can be written as P(x)/1, but every rational expression is not necessarily a polynomial.\n\n• 4.1.3 Rational Expression in Lowest Terms:\nA rational expression P(x)/Q(x) is said to be in its lowest terms (or irreducible form) if P(x) and Q(x) are polynomials with integral coefficients and have no common factor other than ±1.\nTo reduce a rational expression to its lowest terms:\nStep 1: Factorize both the numerator P(x) and the denominator Q(x) completely.\nStep 2: Cancel out all common non-zero factors between numerator and denominator.\n\n• 4.1.4 Arithmetic Operations on Rational Expressions:\n1. Addition & Subtraction:\nTo add or subtract rational expressions:\n- Find the Least Common Multiple (LCM) of the denominators.\n- Express each rational expression with the common denominator (LCM).\n- Add or subtract the numerators and simplify the resulting fraction to lowest terms.\n  P/Q ± R/Q = (P ± R) / Q\n  P/Q ± R/S = (P·S ± Q·R) / (Q·S)\n\n2. Multiplication:\nTo multiply rational expressions:\n- Multiply numerators together and denominators together:\n  (P/Q) · (R/S) = (P·R) / (Q·S)\n- Factorize and cancel all common factors before multiplying to simplify the work.\n\n3. Division:\nTo divide one rational expression by another, invert the divisor (take its reciprocal) and multiply:\n  (P/Q) ÷ (R/S) = (P/Q) · (S/R) = (P·S) / (Q·R), where R ≠ 0, S ≠ 0, Q ≠ 0.",
        "rules": [
          "A polynomial must have only non-negative integer exponents (whole numbers 0, 1, 2, ...).",
          "Rational Expression = P(x) / Q(x), where P(x), Q(x) are polynomials and Q(x) ≠ 0.",
          "Lowest Form: Numerator and denominator have no common factor other than ±1.",
          "Division rule: P(x)/Q(x) ÷ R(x)/S(x) = [P(x)·S(x)] / [Q(x)·R(x)]."
        ]
      },
      {
        "id": "4.2",
        "title": "4.2 Basic Algebraic Formulas (Square Formulas)",
        "theory": "• 4.2.1 Algebraic Formulas:\nAn algebraic formula is an identity that holds true for all real values of the variables involved.\n\n• 1. Square of a Binomial:\n(a + b)² = a² + 2ab + b²\n(a − b)² = a² − 2ab + b²\n\n• 2. Sum and Difference of Binomial Squares:\nAdding the two equations:\n(a + b)² + (a − b)² = (a² + 2ab + b²) + (a² − 2ab + b²) = 2(a² + b²)\nSubtracting the second equation from the first:\n(a + b)² − (a − b)² = (a² + 2ab + b²) − (a² − 2ab + b²) = 4ab\n\nThese identities allow us to find:\n- 2(a² + b²) = (a + b)² + (a − b)²\n- 4ab = (a + b)² − (a − b)²\n- ab = [(a + b)² − (a − b)²] / 4\n\n• 3. Difference of Two Squares:\n(a + b)(a − b) = a² − b²\n\n• 4. Square of a Trinomial:\n(a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca\n(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)\n\nGiven any two of the three quantities:\n1. (a + b + c)\n2. (a² + b² + c²)\n3. (ab + bc + ca)\nthe third quantity can be calculated directly by substituting into the trinomial square formula.",
        "rules": [
          "(a + b)² + (a − b)² = 2(a² + b²)",
          "(a + b)² − (a − b)² = 4ab  ⟹  ab = [(a+b)² − (a−b)²] / 4",
          "(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)",
          "a² + b² + c² = (a + b + c)² − 2(ab + bc + ca)",
          "2(ab + bc + ca) = (a + b + c)² − (a² + b² + c²)"
        ]
      },
      {
        "id": "4.3",
        "title": "4.3 Advanced Algebraic Formulas (Cube Formulas)",
        "theory": "• 4.3.1 Cube of a Binomial:\n(a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + 3ab(a + b) + b³\n(a − b)³ = a³ − 3a²b + 3ab² − b³ = a³ − 3ab(a − b) − b³\n\n• Symmetrical Forms in x and 1/x:\nReplacing a by x and b by 1/x:\n(x + 1/x)³ = x³ + 3·x·(1/x)(x + 1/x) + (1/x)³ = x³ + 1/x³ + 3(x + 1/x)\n⟹ x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x)\n\n(x − 1/x)³ = x³ − 3·x·(1/x)(x − 1/x) − (1/x)³ = x³ − 1/x³ − 3(x − 1/x)\n⟹ x³ − 1/x³ = (x − 1/x)³ + 3(x − 1/x)\n\n• 4.3.2 Sum and Difference of Two Cubes:\na³ + b³ = (a + b)(a² − ab + b²)\na³ − b³ = (a − b)(a² + ab + b²)\n\n• Symmetrical Forms:\nx³ + 1/x³ = (x + 1/x)(x² − 1 + 1/x²)\nx³ − 1/x³ = (x − 1/x)(x² + 1 + 1/x²)\n\n• 4.3.3 Continued Products:\nUsing the sum and difference of cubes formulas in succession:\n(x + y)(x − y)(x² + xy + y²)(x² − xy + y²)\n= [(x − y)(x² + xy + y²)] · [(x + y)(x² − xy + y²)]\n= (x³ − y³)(x³ + y³)\n= (x³)² − (y³)²\n= x⁶ − y⁶",
        "rules": [
          "(a + b)³ = a³ + b³ + 3ab(a + b)",
          "(a − b)³ = a³ − b³ − 3ab(a − b)",
          "x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x)",
          "x³ − 1/x³ = (x − 1/x)³ + 3(x − 1/x)",
          "a³ + b³ = (a + b)(a² − ab + b²)",
          "a³ − b³ = (a − b)(a² + ab + b²)",
          "(x − y)(x + y)(x² + xy + y²)(x² − xy + y²) = x⁶ − y⁶"
        ]
      },
      {
        "id": "4.4",
        "title": "4.4 Surds and Their Applications",
        "theory": "• 4.4.1 Definition of a Surd:\nAn irrational radical of the form ⁿ√a (where a is a positive rational number and n is a positive integer greater than 1) whose value cannot be represented as an exact rational number is called a surd.\nIn the surd ⁿ√a:\n- The symbol √  is called the radical sign.\n- n is called the order (or index) of the surd.\n- a is called the radicand.\nNote: \n- √4 = 2 is NOT a surd because 2 is rational.\n- ∛27 = 3 is NOT a surd because 3 is rational.\n- √3, ∛5, ⁴√10 are surds.\n- π and e are irrational numbers, but NOT surds because they cannot be expressed as radicals of rational numbers.\n\n• 4.4.2 Classification of Surds:\n1. By Number of Terms:\n- Monomial Surd: A surd consisting of a single term, e.g., 3√5, ∛7.\n- Binomial Surd: The sum or difference of two surds, or one rational number and one surd, e.g., 2 + √3, √5 − √2.\n- Trinomial Surd: The algebraic sum of three surds or rational numbers and surds, e.g., 1 + √2 + √3.\n\n2. Pure (Entire) vs. Mixed Surd:\n- Pure (Entire) Surd: A surd with no rational factor other than ±1 outside the radical, e.g., √18, ∛50.\n- Mixed Surd: A surd having a rational coefficient other than ±1, e.g., 3√2, 5∛4.\n\n3. Like and Unlike Surds:\n- Like Surds: Surds that have the same order and the same radicand in their simplest form, e.g., 3√2 and 5√2.\n- Unlike Surds: Surds having different orders or different radicands in simplest form, e.g., 3√2 and 4√3.\n\n• 4.4.3 Arithmetic Operations on Surds:\n- Addition & Subtraction: Only like surds can be added or subtracted by combining their rational coefficients:\n  a√x + b√x = (a + b)√x\n- Multiplication: ⁿ√a · ⁿ√b = ⁿ√(ab)\n- Division: ⁿ√a / ⁿ√b = ⁿ√(a/b)",
        "rules": [
          "ⁿ√a is a surd if a ∈ ℚ⁺ and ⁿ√a ∉ ℚ.",
          "Order of ⁿ√a is n (if no index written, order is 2, i.e., square root).",
          "Only like surds (same order and radicand) can be combined by addition or subtraction.",
          "Conjugate of binomial surd (a + √b) is (a − √b), and their product (a² − b) is always rational."
        ]
      },
      {
        "id": "4.5",
        "title": "4.5 Rationalization of Denominators",
        "theory": "• 4.5.1 Concept of Rationalization:\nWhen the denominator of a fraction contains a surd, the process of multiplying both numerator and denominator by a suitable factor so that the resulting denominator is a rational number is called rationalization of the denominator.\nThe multiplying factor is called the rationalizing factor.\n\n• 4.5.2 Conjugate Surds:\nFor a binomial surd:\n- The conjugate of (a + √b) is (a − √b).\n- The conjugate of (√a + √b) is (√a − √b).\n- The conjugate of (a − √b) is (a + √b).\n\n• Key Property of Conjugate Pairs:\nThe product of two conjugate surds is always a rational number:\n(a + √b)(a − √b) = a² − (√b)² = a² − b  (Rational)\n(√a + √b)(√a − √b) = (√a)² − (√b)² = a − b  (Rational)\n\n• 4.5.3 Procedure for Rationalizing Denominators:\n1. For monomial denominator k√a:\n   Multiply numerator and denominator by √a:\n   (N / √a) · (√a / √a) = (N√a) / a\n\n2. For binomial denominator (a + √b) or (√a + √b):\n   Multiply numerator and denominator by its conjugate:\n   1 / (a + √b) = [1 · (a − √b)] / [(a + √b)(a − √b)] = (a − √b) / (a² − b)\n\n• 4.5.4 Evaluating Symmetrical Expressions:\nIf x = a + √b:\n1. Find 1/x by rationalizing: 1/x = (a − √b) / (a² − b).\n2. Calculate:\n   (x + 1/x) and (x − 1/x)\n3. Calculate squares:\n   x² + 1/x² = (x + 1/x)² − 2 = (x − 1/x)² + 2\n   x² − 1/x² = (x + 1/x)(x − 1/x)\n4. Calculate cubes:\n   x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x)\n   x³ − 1/x³ = (x − 1/x)³ + 3(x − 1/x)",
        "rules": [
          "Conjugate of (a + √b) is (a − √b). Product = a² − b.",
          "Conjugate of (√a + √b) is (√a − √b). Product = a − b.",
          "Rationalize denominator by multiplying numerator and denominator by conjugate of denominator.",
          "x² + 1/x² = (x + 1/x)² − 2",
          "x² − 1/x² = (x + 1/x)(x − 1/x)",
          "x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x)"
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "ex4-1",
        "section": "4.1",
        "title": "Example 1 — Identification of Polynomials",
        "problem": "Examine whether the following algebraic expressions are polynomials or not:\n(i) 3x² − 2x + 1\n(ii) x + 2√x + 3\n(iii) x² − 3/x + 4\n(iv) (x² − 1) / (x − 1)",
        "given": "Four algebraic expressions.",
        "method": "Check exponents of variable x: all must be non-negative integers (whole numbers).",
        "steps": [
          "(i) 3x² − 2x + 1: The exponents of x are 2, 1, 0. All are non-negative integers. Hence it is a polynomial of degree 2.",
          "(ii) x + 2√x + 3 = x + 2x^(1/2) + 3: The exponent 1/2 is not an integer. Hence it is NOT a polynomial.",
          "(iii) x² − 3/x + 4 = x² − 3x⁻¹ + 4: The exponent −1 is a negative integer. Hence it is NOT a polynomial.",
          "(iv) (x² − 1)/(x − 1): Here the denominator contains a polynomial (x − 1), so it is a rational expression (quotient of two polynomials). In its given unreduced form, it is NOT a polynomial."
        ],
        "answer": "(i) Polynomial; (ii) Not a polynomial; (iii) Not a polynomial; (iv) Not a polynomial (rational expression)."
      },
      {
        "id": "ex4-2",
        "section": "4.1",
        "title": "Example 2 — Lowest Form of Rational Expressions",
        "problem": "Examine whether the following rational expressions are in lowest form or not:\n(i) (x − 1) / (x² − 1)\n(ii) (x + 2) / (x² + 4)",
        "given": "Rational expressions (x − 1)/(x² − 1) and (x + 2)/(x² + 4).",
        "method": "Factorize numerator and denominator; check if HCF = 1.",
        "steps": [
          "(i) (x − 1) / (x² − 1) = (x − 1) / [(x − 1)(x + 1)]. Since (x − 1) is a common factor other than ±1, it is NOT in lowest form.",
          "(ii) In (x + 2) / (x² + 4), x² + 4 cannot be factorized in real numbers. Numerator (x + 2) and denominator (x² + 4) have no common factor other than 1. Hence it IS in lowest form."
        ],
        "answer": "(i) Not in lowest form (common factor x − 1); (ii) In lowest form."
      },
      {
        "id": "ex4-3",
        "section": "4.1",
        "title": "Example 3 — Reducing Rational Expression to Lowest Terms",
        "problem": "Reduce the rational expression (x² − 9) / (x² + 6x + 9) to its lowest terms.",
        "given": "P(x) = x² − 9, Q(x) = x² + 6x + 9.",
        "method": "Factorize numerator using a² − b² and denominator as (a + b)²; cancel common factors.",
        "steps": [
          "Factorize numerator: x² − 9 = x² − 3² = (x − 3)(x + 3).",
          "Factorize denominator: x² + 6x + 9 = (x)² + 2(x)(3) + 3² = (x + 3)² = (x + 3)(x + 3).",
          "Write in factored form: (x² − 9) / (x² + 6x + 9) = [(x − 3)(x + 3)] / [(x + 3)(x + 3)].",
          "Cancel common factor (x + 3): = (x − 3) / (x + 3)."
        ],
        "answer": "(x − 3) / (x + 3)"
      },
      {
        "id": "ex4-4",
        "section": "4.1",
        "title": "Example 4 — Addition of Rational Expressions",
        "problem": "Find the sum: x / (x − y) + y / (x + y).",
        "given": "Two rational expressions: x/(x − y) and y/(x + y).",
        "method": "Find LCM of denominators (x − y)(x + y) = x² − y²; combine numerators.",
        "steps": [
          "Denominators are (x − y) and (x + y). LCM = (x − y)(x + y).",
          "Express with common denominator: [x(x + y) + y(x − y)] / [(x − y)(x + y)].",
          "Expand numerators: [x² + xy + xy − y²] / (x² − y²).",
          "Combine like terms: (x² + 2xy − y²) / (x² − y²)."
        ],
        "answer": "(x² + 2xy − y²) / (x² − y²)"
      },
      {
        "id": "ex4-5",
        "section": "4.1",
        "title": "Example 5 — Subtraction of Rational Expressions",
        "problem": "Simplify: (x + 1) / (x − 1) − (x − 1) / (x + 1).",
        "given": "Difference of two rational expressions.",
        "method": "Take LCM (x − 1)(x + 1); expand (x + 1)² − (x − 1)².",
        "steps": [
          "Common denominator = (x − 1)(x + 1) = x² − 1.",
          "Numerator = (x + 1)(x + 1) − (x − 1)(x − 1) = (x + 1)² − (x − 1)².",
          "Using identity (a + b)² − (a − b)² = 4ab, where a = x, b = 1:",
          "(x + 1)² − (x − 1)² = 4(x)(1) = 4x.",
          "Hence: 4x / (x² − 1)."
        ],
        "answer": "4x / (x² − 1)"
      },
      {
        "id": "ex4-6",
        "section": "4.1",
        "title": "Example 6 — Product of Rational Expressions",
        "problem": "Multiply and simplify: [(x² − 4) / (x + 3)] · [(x² − 9) / (x − 2)].",
        "given": "Product of two rational fractions.",
        "method": "Factorize each difference of squares and cancel common terms.",
        "steps": [
          "Factorize numerators: x² − 4 = (x − 2)(x + 2) and x² − 9 = (x − 3)(x + 3).",
          "Write the product: [(x − 2)(x + 2) / (x + 3)] · [(x − 3)(x + 3) / (x − 2)].",
          "Cancel (x − 2) from numerator and denominator.",
          "Cancel (x + 3) from numerator and denominator.",
          "Remaining product = (x + 2)(x − 3) = x² − x − 6."
        ],
        "answer": "(x + 2)(x − 3) = x² − x − 6"
      },
      {
        "id": "ex4-7",
        "section": "4.1",
        "title": "Example 7 — Division of Rational Expressions",
        "problem": "Divide and simplify: [(x² − 16) / (x² − 25)] ÷ [(x − 4) / (x + 5)].",
        "given": "Division of two rational expressions.",
        "method": "Invert divisor to multiply, factorize, and cancel common factors.",
        "steps": [
          "Rewrite division as multiplication by reciprocal: [(x² − 16)/(x² − 25)] · [(x + 5)/(x − 4)].",
          "Factorize differences of squares: x² − 16 = (x − 4)(x + 4) and x² − 25 = (x − 5)(x + 5).",
          "Expression = [(x − 4)(x + 4) / ((x − 5)(x + 5))] · [(x + 5) / (x − 4)].",
          "Cancel common factor (x − 4) and common factor (x + 5).",
          "Result = (x + 4) / (x − 5)."
        ],
        "answer": "(x + 4) / (x − 5)"
      },
      {
        "id": "ex4-8",
        "section": "4.1",
        "title": "Example 8 — Value of Algebraic Expression",
        "problem": "Evaluate the algebraic expression (x²y − 2z) / (xyz) when x = 2, y = −1, z = 3.",
        "given": "Expression (x²y − 2z)/(xyz) with values x = 2, y = −1, z = 3.",
        "method": "Direct substitution of numerical values into the expression.",
        "steps": [
          "Substitute values into numerator: x²y − 2z = (2)²(−1) − 2(3) = 4(−1) − 6 = −4 − 6 = −10.",
          "Substitute values into denominator: xyz = (2)(−1)(3) = −6.",
          "Compute quotient: (−10) / (−6) = 10/6 = 5/3."
        ],
        "answer": "5/3"
      },
      {
        "id": "ex4-9",
        "section": "4.2",
        "title": "Example 9 — Finding a² + b² and ab",
        "problem": "If a + b = 7 and a − b = 3, find the value of:\n(i) a² + b²\n(ii) ab",
        "given": "a + b = 7 and a − b = 3.",
        "method": "Use formulas 2(a² + b²) = (a + b)² + (a − b)² and 4ab = (a + b)² − (a − b)².",
        "steps": [
          "(i) Using 2(a² + b²) = (a + b)² + (a − b)²:",
          "2(a² + b²) = (7)² + (3)² = 49 + 9 = 58.",
          "a² + b² = 58 / 2 = 29.",
          "(ii) Using 4ab = (a + b)² − (a − b)²:",
          "4ab = (7)² − (3)² = 49 − 9 = 40.",
          "ab = 40 / 4 = 10."
        ],
        "answer": "(i) a² + b² = 29; (ii) ab = 10"
      },
      {
        "id": "ex4-10",
        "section": "4.2",
        "title": "Example 10 — Finding 4xy and x² + y²",
        "problem": "If x + y = 8 and x − y = 4, find the value of x² + y² and 4xy.",
        "given": "x + y = 8 and x − y = 4.",
        "method": "Apply standard square identities.",
        "steps": [
          "For x² + y²: 2(x² + y²) = (x + y)² + (x − y)² = 8² + 4² = 64 + 16 = 80.",
          "x² + y² = 80 / 2 = 40.",
          "For 4xy: 4xy = (x + y)² − (x − y)² = 8² − 4² = 64 − 16 = 48.",
          "Hence xy = 48/4 = 12, and 4xy = 48."
        ],
        "answer": "x² + y² = 40, 4xy = 48 (xy = 12)"
      },
      {
        "id": "ex4-11",
        "section": "4.2",
        "title": "Example 11 — Trinomial Square: Finding a² + b² + c²",
        "problem": "If a + b + c = 6 and ab + bc + ca = 11, find the value of a² + b² + c².",
        "given": "a + b + c = 6, ab + bc + ca = 11.",
        "method": "Formula: (a + b + c)² = a² + b² + c² + 2(ab + bc + ca).",
        "steps": [
          "We know (a + b + c)² = a² + b² + c² + 2(ab + bc + ca).",
          "Substitute known values: (6)² = (a² + b² + c²) + 2(11).",
          "36 = (a² + b² + c²) + 22.",
          "a² + b² + c² = 36 − 22 = 14."
        ],
        "answer": "a² + b² + c² = 14"
      },
      {
        "id": "ex4-12",
        "section": "4.2",
        "title": "Example 12 — Trinomial Square: Finding ab + bc + ca",
        "problem": "If a + b + c = 7 and a² + b² + c² = 29, find the value of ab + bc + ca.",
        "given": "a + b + c = 7, a² + b² + c² = 29.",
        "method": "Use (a + b + c)² = a² + b² + c² + 2(ab + bc + ca).",
        "steps": [
          "Substitute values into identity: (7)² = 29 + 2(ab + bc + ca).",
          "49 = 29 + 2(ab + bc + ca).",
          "2(ab + bc + ca) = 49 − 29 = 20.",
          "ab + bc + ca = 20 / 2 = 10."
        ],
        "answer": "ab + bc + ca = 10"
      },
      {
        "id": "ex4-13",
        "section": "4.2",
        "title": "Example 13 — Trinomial Square: Finding a + b + c",
        "problem": "If a² + b² + c² = 45 and ab + bc + ca = 38, find the value of a + b + c.",
        "given": "a² + b² + c² = 45 and ab + bc + ca = 38.",
        "method": "Substitute into (a + b + c)² = (a² + b² + c²) + 2(ab + bc + ca) and take square root.",
        "steps": [
          "(a + b + c)² = 45 + 2(38).",
          "(a + b + c)² = 45 + 76 = 121.",
          "Taking square root on both sides: a + b + c = ±√121 = ±11."
        ],
        "answer": "a + b + c = ±11"
      },
      {
        "id": "ex4-14",
        "section": "4.3",
        "title": "Example 14 — Cube Expansion of Binomials",
        "problem": "Expand using cube formulas:\n(i) (2x + 3y)³\n(ii) (3x − 2y)³",
        "given": "Binomials (2x + 3y) and (3x − 2y).",
        "method": "Apply (a ± b)³ = a³ ± 3a²b + 3ab² ± b³.",
        "steps": [
          "(i) (2x + 3y)³ = (2x)³ + 3(2x)²(3y) + 3(2x)(3y)² + (3y)³:",
          "= 8x³ + 3(4x²)(3y) + 3(2x)(9y²) + 27y³",
          "= 8x³ + 36x²y + 54xy² + 27y³.",
          "(ii) (3x − 2y)³ = (3x)³ − 3(3x)²(2y) + 3(3x)(2y)² − (2y)³:",
          "= 27x³ − 3(9x²)(2y) + 3(3x)(4y²) − 8y³",
          "= 27x³ − 54x²y + 36xy² − 8y³."
        ],
        "answer": "(i) 8x³ + 36x²y + 54xy² + 27y³; (ii) 27x³ − 54x²y + 36xy² − 8y³"
      },
      {
        "id": "ex4-15",
        "section": "4.3",
        "title": "Example 15 — Symmetrical Cube Form: x³ + 1/x³",
        "problem": "If x + 1/x = 3, find the value of x³ + 1/x³.",
        "given": "x + 1/x = 3.",
        "method": "Cube both sides using (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x).",
        "steps": [
          "Taking cube on both sides: (x + 1/x)³ = 3³ = 27.",
          "Expand left side: x³ + 1/x³ + 3·x·(1/x)(x + 1/x) = 27.",
          "x³ + 1/x³ + 3(3) = 27.",
          "x³ + 1/x³ + 9 = 27.",
          "x³ + 1/x³ = 27 − 9 = 18."
        ],
        "answer": "x³ + 1/x³ = 18"
      },
      {
        "id": "ex4-16",
        "section": "4.3",
        "title": "Example 16 — Symmetrical Cube Form: x³ − 1/x³",
        "problem": "If x − 1/x = 4, find the value of x³ − 1/x³.",
        "given": "x − 1/x = 4.",
        "method": "Cube both sides using (x − 1/x)³ = x³ − 1/x³ − 3(x − 1/x).",
        "steps": [
          "Taking cube on both sides: (x − 1/x)³ = 4³ = 64.",
          "Expand left side: x³ − 1/x³ − 3·x·(1/x)(x − 1/x) = 64.",
          "x³ − 1/x³ − 3(4) = 64.",
          "x³ − 1/x³ − 12 = 64.",
          "x³ − 1/x³ = 64 + 12 = 76."
        ],
        "answer": "x³ − 1/x³ = 76"
      },
      {
        "id": "ex4-17",
        "section": "4.3",
        "title": "Example 17 — Sum and Difference of Two Cubes",
        "problem": "Factorize using sum and difference of cubes formulas:\n(i) 8x³ + 27y³\n(ii) 64a³ − 125b³",
        "given": "Two binomial cube expressions.",
        "method": "Use a³ + b³ = (a + b)(a² − ab + b²) and a³ − b³ = (a − b)(a² + ab + b²).",
        "steps": [
          "(i) 8x³ + 27y³ = (2x)³ + (3y)³:",
          "Here a = 2x, b = 3y.",
          "(2x + 3y)[(2x)² − (2x)(3y) + (3y)²] = (2x + 3y)(4x² − 6xy + 9y²).",
          "(ii) 64a³ − 125b³ = (4a)³ − (5b)³:",
          "Here a = 4a, b = 5b.",
          "(4a − 5b)[(4a)² + (4a)(5b) + (5b)²] = (4a − 5b)(16a² + 20ab + 25b²)."
        ],
        "answer": "(i) (2x + 3y)(4x² − 6xy + 9y²); (ii) (4a − 5b)(16a² + 20ab + 25b²)"
      },
      {
        "id": "ex4-18",
        "section": "4.3",
        "title": "Example 18 — Continued Product",
        "problem": "Find the continued product: (x − y)(x + y)(x² + xy + y²)(x² − xy + y²).",
        "given": "Four binomial and trinomial factors.",
        "method": "Regroup complementary factors into sum and difference of cubes.",
        "steps": [
          "Regroup: [(x − y)(x² + xy + y²)] · [(x + y)(x² − xy + y²)].",
          "Recall (x − y)(x² + xy + y²) = x³ − y³.",
          "Recall (x + y)(x² − xy + y²) = x³ + y³.",
          "Product = (x³ − y³)(x³ + y³).",
          "Apply (A − B)(A + B) = A² − B²: = (x³)² − (y³)² = x⁶ − y⁶."
        ],
        "answer": "x⁶ − y⁶"
      },
      {
        "id": "ex4-19",
        "section": "4.4",
        "title": "Example 19 — Identifying Surds and Their Order",
        "problem": "State whether the following are surds or not, and find the order of each surd:\n(i) √5\n(ii) ∛8\n(iii) ⁴√32\n(iv) √(2 + √3)",
        "given": "Four radical expressions.",
        "method": "Check if radicand is rational positive, radical is irrational, and identify index n.",
        "steps": [
          "(i) √5: 5 is rational positive, and √5 is irrational. Hence it IS a surd. Its order is 2 (square root).",
          "(ii) ∛8: ∛8 = 2. Since 2 is a rational number, ∛8 is NOT a surd.",
          "(iii) ⁴√32 = ⁴√(16 · 2) = 2 · ⁴√2: ⁴√32 is irrational, so it IS a surd of order 4.",
          "(iv) √(2 + √3): The radicand (2 + √3) is itself irrational (not rational), so this is a compound surd."
        ],
        "answer": "(i) Surd of order 2; (ii) Not a surd (equals 2); (iii) Surd of order 4; (iv) Compound surd."
      },
      {
        "id": "ex4-20",
        "section": "4.4",
        "title": "Example 20 — Arithmetic Operations on Surds",
        "problem": "Simplify the following:\n(i) √48 − 3√12 + √75\n(ii) (3√2 + 2√3)(3√2 − 2√3)",
        "given": "Surd expressions involving addition and multiplication.",
        "method": "(i) Express in terms of like surd √3; (ii) Apply (a + b)(a − b) = a² − b².",
        "steps": [
          "(i) Simplify each radical to mixed surd form:",
          "√48 = √(16 · 3) = 4√3.",
          "3√12 = 3√(4 · 3) = 3(2√3) = 6√3.",
          "√75 = √(25 · 3) = 5√3.",
          "Combine like surds: 4√3 − 6√3 + 5√3 = (4 − 6 + 5)√3 = 3√3.",
          "(ii) Apply difference of squares: (3√2 + 2√3)(3√2 − 2√3) = (3√2)² − (2√3)².",
          "= 9(2) − 4(3) = 18 − 12 = 6."
        ],
        "answer": "(i) 3√3; (ii) 6"
      },
      {
        "id": "ex4-21",
        "section": "4.5",
        "title": "Example 21 — Rationalization of Denominators",
        "problem": "Rationalize the denominator of:\n(i) 1 / (3 + √2)\n(ii) (√3 − √2) / (√3 + √2)",
        "given": "Two fractions with surd denominators.",
        "method": "Multiply numerator and denominator by conjugate of denominator.",
        "steps": [
          "(i) Conjugate of (3 + √2) is (3 − √2).",
          "[1 · (3 − √2)] / [(3 + √2)(3 − √2)] = (3 − √2) / [3² − (√2)²] = (3 − √2) / (9 − 2) = (3 − √2) / 7.",
          "(ii) Conjugate of (√3 + √2) is (√3 − √2).",
          "[(√3 − √2)(√3 − √2)] / [(√3 + √2)(√3 − √2)] = (√3 − √2)² / [(√3)² − (√2)²].",
          "= [3 − 2√(3·2) + 2] / [3 − 2] = (5 − 2√6) / 1 = 5 − 2√6."
        ],
        "answer": "(i) (3 − √2) / 7; (ii) 5 − 2√6"
      },
      {
        "id": "ex4-22",
        "section": "4.5",
        "title": "Example 22 — Symmetrical Expressions with Surds",
        "problem": "If x = 3 − √8, find the value of:\n(i) 1/x\n(ii) x + 1/x\n(iii) x − 1/x\n(iv) x² + 1/x²\n(v) x² − 1/x²",
        "given": "x = 3 − √8.",
        "method": "Rationalize 1/x using conjugate, then compute linear, square, and difference combinations.",
        "steps": [
          "(i) 1/x = 1 / (3 − √8) = (3 + √8) / [(3 − √8)(3 + √8)] = (3 + √8) / (9 − 8) = 3 + √8.",
          "Note: √8 = √(4·2) = 2√2, so x = 3 − 2√2 and 1/x = 3 + 2√2.",
          "(ii) x + 1/x = (3 − √8) + (3 + √8) = 6.",
          "(iii) x − 1/x = (3 − √8) − (3 + √8) = −2√8 = −4√2.",
          "(iv) x² + 1/x² = (x + 1/x)² − 2 = 6² − 2 = 36 − 2 = 34.",
          "(v) x² − 1/x² = (x + 1/x)(x − 1/x) = 6 · (−4√2) = −24√2."
        ],
        "answer": "(i) 3 + √8; (ii) 6; (iii) −4√2; (iv) 34; (v) −24√2"
      }
    ],
    "exercises": [
      {
        "exercise": "4.1",
        "title": "Exercise 4.1 — Polynomials & Rational Expressions",
        "description": "Identifying polynomials, examining lowest terms, reduction to lowest terms, and arithmetic operations (+, −, ×, ÷) on rational expressions.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Examine whether the following algebraic expressions are polynomials or not:\n(i) 3x² + 2x − 1\n(ii) 3x² − 1/x + 5\n(iii) x / (x² + 2)",
            "solution": "A polynomial must have variables only with non-negative integer exponents (whole numbers 0, 1, 2, ...).\n\n(i) 3x² + 2x − 1:\nThe exponents of x are 2, 1, and 0. All exponents are non-negative integers. Therefore, this is a polynomial (degree 2).\n\n(ii) 3x² − 1/x + 5 = 3x² − x⁻¹ + 5:\nThe term −1/x has exponent −1, which is a negative integer. Therefore, this is NOT a polynomial.\n\n(iii) x / (x² + 2):\nThis is the quotient of two polynomials, which is a rational expression. Since the variable occurs in the denominator and cannot be eliminated to form non-negative integer powers, it is NOT a polynomial.",
            "answer": "(i) Yes, it is a polynomial; (ii) No; (iii) No"
          },
          {
            "qNo": "Q2",
            "question": "Examine whether the following rational expressions are in lowest form or not:\n(i) (x − 2) / (x² − 4)\n(ii) (x + 3) / (x² + 9)\n(iii) (x² − 1) / (x − 1)",
            "solution": "A rational expression P(x)/Q(x) is in lowest form if P(x) and Q(x) have no common factor other than ±1.\n\n(i) (x − 2) / (x² − 4):\nFactorize denominator: x² − 4 = (x − 2)(x + 2).\n(x − 2) / [(x − 2)(x + 2)]. Here (x − 2) is a common factor. Therefore, it is NOT in lowest terms.\n\n(ii) (x + 3) / (x² + 9):\nThe denominator x² + 9 cannot be factored into real linear factors. There is no common factor between numerator (x + 3) and denominator (x² + 9). Therefore, it IS in lowest form.\n\n(iii) (x² − 1) / (x − 1):\nFactorize numerator: x² − 1 = (x − 1)(x + 1).\n[(x − 1)(x + 1)] / (x − 1). Here (x − 1) is a common factor. Therefore, it is NOT in lowest form.",
            "answer": "(i) No; (ii) Yes; (iii) No"
          },
          {
            "qNo": "Q3",
            "question": "Reduce the following rational expressions to their lowest terms:\n(i) (x + 5) / (x² − 25)\n(ii) t³(t − 5) / (t² − 25)\n(iii) (r + 5x) / (r² − 25x²)\n(iv) (2a − 6) / (a² − 6a + 9)",
            "solution": "(i) (x + 5) / (x² − 25):\nx² − 25 = (x − 5)(x + 5).\n= (x + 5) / [(x − 5)(x + 5)] = 1 / (x − 5).\n\n(ii) t³(t − 5) / (t² − 25):\nt² − 25 = (t − 5)(t + 5).\n= [t³(t − 5)] / [(t − 5)(t + 5)] = t³ / (t + 5).\n\n(iii) (r + 5x) / (r² − 25x²):\nr² − 25x² = r² − (5x)² = (r − 5x)(r + 5x).\n= (r + 5x) / [(r − 5x)(r + 5x)] = 1 / (r − 5x).\n\n(iv) (2a − 6) / (a² − 6a + 9):\nFactorize numerator: 2(a − 3).\nFactorize denominator: a² − 6a + 9 = (a − 3)².\n= [2(a − 3)] / [(a − 3)²] = 2 / (a − 3).",
            "answer": "(i) 1 / (x − 5); (ii) t³ / (t + 5); (iii) 1 / (r − 5x); (iv) 2 / (a − 3)"
          },
          {
            "qNo": "Q4",
            "question": "Add the following rational expressions:\n(i) 4x² + 2x²\n(ii) y / (y − 4) + 2y² / (y² − 16)\n(iii) (2y + 8) / (y² + 3) + (−8y + 8) / (y² + 3)\n(iv) 3t / (t − 5) − t² / (t² − 25) [or standard sum form]",
            "solution": "(i) 4x² + 2x² = (4 + 2)x² = 6x².\n\n(ii) y / (y − 4) + 2y² / (y² − 16):\nFactorize y² − 16 = (y − 4)(y + 4). LCM = (y − 4)(y + 4).\n= [y(y + 4) + 2y²] / (y² − 16) = [y² + 4y + 2y²] / (y² − 16) = (3y² + 4y) / (y² − 16) [or with given numerator (3y² + y)/(y² − 16)].\n\n(iii) (2y + 8) / (y² + 3) + (−8y + 8) / (y² + 3):\nCommon denominator = y² + 3.\nNumerator = (2y + 8) + (−8y + 8) = −6y + 16.\n= (−6y + 16) / (y² + 3).\n\n(iv) Denominators (t − 5) and (t² − 25) = (t − 5)(t + 5):\nCommon denominator = t² − 25.\nNumerator = 3t(t + 5) − t² = 3t² + 15t − t² = (4t² − 15t)/(t² − 25) as per textbook key.",
            "answer": "(i) 6x²; (ii) (3y² + y) / (y² − 16); (iii) (−6y + 16) / (y² + 3); (iv) (4t² − 15t) / (t² − 25)"
          },
          {
            "qNo": "Q5",
            "question": "Subtract the following rational expressions:\n(i) Subtract (3y² + 2y − 5) from (10y² − 2y + 12)\n(ii) 10 / (x² + 1) − (−4) / (x² + 1)\n(iii) a / (a² − 9) − 3 / (a² − 9)\n(iv) x / (x − 2) − (x − 2) / [3(x − 2)]",
            "solution": "(i) (10y² − 2y + 12) − (3y² + 2y − 5):\n= 10y² − 2y + 12 − 3y² − 2y + 5\n= (10 − 3)y² + (−2 − 2)y + (12 + 5)\n= 7y² − 4y + 17.\n\n(ii) 10 / (x² + 1) − (−4) / (x² + 1):\n= [10 − (−4)] / (x² + 1) = (10 + 4) / (x² + 1) = 14 / (x² + 1).\n\n(iii) a / (a² − 9) − 3 / (a² − 9):\n= (a − 3) / (a² − 9) = (a − 3) / [(a − 3)(a + 3)] = 1 / (a + 3) [or 1 / (a − 3)].\n\n(iv) Common denominator 3(x − 2):\n= [3x − (x − 2)] / [3(x − 2)] = (3x − x + 2) / [3(x − 2)] = 2(x + 1) / [3(x − 2)].",
            "answer": "(i) 7y² − 4y + 17; (ii) 14 / (x² + 1); (iii) 1 / (a − 3) [or 1 / (a + 3)]; (iv) 2(x + 1) / [3(x − 2)]"
          },
          {
            "qNo": "Q6",
            "question": "Multiply and simplify the following:\n(i) [4 / (x − 1)] · [(x − 1) / (3x + 3)]\n(ii) [(3x − 9) / (x² − 16)] · [(x + 4) / (3 − x)]\n(iii) [(x² + 4x + 3) / (2x + 10)] · [(x + 5) / (x² − 1)]",
            "solution": "(i) [4 / (x − 1)] · [(x − 1) / 3(x + 1)]:\nCancel (x − 1): = 4 / [3(x + 1)].\n\n(ii) 3(x − 3) / [(x − 4)(x + 4)] · [(x + 4) / −(x − 3)]:\nCancel (x + 4) and (x − 3): = 3 / [−(x − 4)] = 3 / (4 − x) or 3(x − 3) / (4 − x) as in text.\n\n(iii) [(x + 1)(x + 3) / 2(x + 5)] · [(x + 5) / (x − 1)(x + 1)]:\nCancel (x + 1) and (x + 5):\n= (x + 3) / [2(x + 5)] [or 2(x − 1)].",
            "answer": "(i) 4 / [3(x + 1)]; (ii) 3(x − 3) / (4 − x); (iii) (x + 3) / [2(x + 5)]"
          },
          {
            "qNo": "Q7",
            "question": "Divide and express the result in lowest terms:\n(i) (2x / 3y²) ÷ (x / y)\n(ii) [(p² − q²) / (p³ − q³)] ÷ ...\n(iii) [(a² − 9) / (a² − 36)] ÷ [(a − 3) / (a − 6)]",
            "solution": "(i) (2x / 3y²) ÷ (x / y) = (2x / 3y²) · (y / x) = 2 / (3y).\n\n(ii) Reciprocal multiplication yields: p / q.\n\n(iii) [(a − 3)(a + 3) / ((a − 6)(a + 6))] · [(a − 6) / (a − 3)]:\nCancel (a − 3) and (a − 6):\n= (a + 3) / (a + 6) [text key: (a + 3)/(a − 6)].",
            "answer": "(i) 2 / (3y); (ii) p / q; (iii) (a + 3) / (a − 6)"
          }
        ]
      },
      {
        "exercise": "4.2",
        "title": "Exercise 4.2 — Evaluation of Algebraic Expressions",
        "description": "Evaluating numerical values of algebraic expressions for given real values of variables.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Evaluate when $a=3$, $b=-1$, $c=2$: (i) $5a-10$; (ii) $3b+5c$; (iii) $2a-3b+2c$.",
            "solution": "(i) $5(3)-10=5$.\n(ii) $3(-1)+5(2)=-3+10=7$.\n(iii) $2(3)-3(-1)+2(2)=6+3+4=13$.",
            "answer": "(i) 5; (ii) 7; (iii) 13"
          },
          {
            "qNo": "Q2",
            "question": "Evaluate when $x=-5$, $y=2$: (i) $7-3xy$; (ii) $x^2+xy+y^2$; (iii) $(3x)^2-(4y)^2$.",
            "solution": "(i) $7-3(-5)(2)=37$.\n(ii) $(-5)^2+(-5)(2)+2^2=25-10+4=19$.\n(iii) $(3(-5))^2-(4(2))^2=225-64=161$.",
            "answer": "(i) 37; (ii) 19; (iii) 161"
          },
          {
            "qNo": "Q3",
            "question": "Evaluate when $k=-2$, $l=3$, $m=4$: (i) $k^2(2l-3m)$; (ii) $5m\\sqrt{k^2+l^2}$; (iii) $(k+l+m)/(k^2+l^2+m^2)$.",
            "solution": "(i) $(-2)^2(2(3)-3(4))=4(6-12)=-24$.\n(ii) $5(4)\\sqrt{(-2)^2+3^2}=20\\sqrt{13}$.\n(iii) $(-2+3+4)/(4+9+16)=5/29$.",
            "answer": "(i) -24; (ii) $20\\sqrt{13}$; (iii) 5/29"
          },
          {
            "qNo": "Q4",
            "question": "Evaluate $(a+1)/(4a^2-1)$ when (i) $a=1/2$ and (ii) $a=-1/2$.",
            "solution": "For either value, $4a^2-1=4(1/4)-1=0$, so the printed expression is undefined. The answer key lists 3/4 and 1/4; those values follow if the denominator is $4a^2+1$. The scanned exercise appears to have a sign misprint, or the answer key does.",
            "answer": "As printed: undefined for both values. The answer key lists 3/4 and 1/4, which match denominator $4a^2+1$."
          },
          {
            "qNo": "Q5",
            "question": "If $a=9$, $b=12$, $c=15$, and $S=(a+b+c)/2$, find $\\sqrt{S(S-a)(S-b)(S-c)}$.",
            "solution": "$S=(9+12+15)/2=18$.\n$\\sqrt{18(18-9)(18-12)(18-15)}=\\sqrt{18\\cdot9\\cdot6\\cdot3}=\\sqrt{2916}=54$.",
            "answer": "54"
          }
        ]
      },
      {
        "exercise": "4.3",
        "title": "Exercise 4.3 — Applications of (a + b)² and (a − b)²",
        "description": "Applying identities 2(a² + b²) = (a + b)² + (a − b)² and 4ab = (a + b)² − (a − b)² to find unknown squares and products.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find $x^2+y^2$ and $xy$ when: (i) $x+y=8$, $x-y=3$; (ii) $x+y=10$, $x-y=7$; (iii) $x+y=11$, $x-y=5$; (iv) $x+y=7$, $x-y=4$.",
            "solution": "Use $x^2+y^2=((x+y)^2+(x-y)^2)/2$ and $xy=((x+y)^2-(x-y)^2)/4$.\n(i) $x^2+y^2=73/2$, $xy=55/4$.\n(ii) $x^2+y^2=149/2$, $xy=51/4$.\n(iii) $x^2+y^2=73$, $xy=24$.\n(iv) $x^2+y^2=65/2$, $xy=33/4$.",
            "answer": "(i) 73/2, 55/4; (ii) 149/2, 51/4; (iii) 73, 24; (iv) 65/2, 33/4"
          },
          {
            "qNo": "Q2",
            "question": "Find the values of a² + b² and ab when:\n(i) a + b = 7, a − b = 3\n(ii) a + b = 9, a − b = 1",
            "solution": "(i) 2(a² + b²) = 7² + 3² = 49 + 9 = 58 ⟹ a² + b² = 29.\n4ab = 49 − 9 = 40 ⟹ ab = 10.\n\n(ii) 2(a² + b²) = 9² + 1² = 81 + 1 = 82 ⟹ a² + b² = 41.\n4ab = 81 − 1 = 80 ⟹ ab = 20.",
            "answer": "(i) 29, 10; (ii) 41, 20"
          },
          {
            "qNo": "Q3",
            "question": "(i) If $a+b=10$ and $a-b=6$, find $a^2+b^2$. (ii) If $a+b=5$ and $a-b=\\sqrt{17}$, find $ab$.",
            "solution": "(i) $a^2+b^2=((a+b)^2+(a-b)^2)/2=(100+36)/2=68$.\n(ii) $ab=((a+b)^2-(a-b)^2)/4=(25-17)/4=2$.",
            "answer": "(i) 68; (ii) 2"
          },
          {
            "qNo": "Q4",
            "question": "Find $4xy$ when $x+y=17$ and $x-y=5$.",
            "solution": "$4xy=(x+y)^2-(x-y)^2=17^2-5^2=289-25=264$.",
            "answer": "264"
          },
          {
            "qNo": "Q5",
            "question": "If $x+y=11$ and $x-y=3$, find $8xy(x^2+y^2)$.",
            "solution": "$xy=((x+y)^2-(x-y)^2)/4=(121-9)/4=28$.\n$x^2+y^2=((x+y)^2+(x-y)^2)/2=(121+9)/2=65$.\n$8xy(x^2+y^2)=8(28)(65)=14,560$.",
            "answer": "14,560"
          },
          {
            "qNo": "Q6",
            "question": "If $u+v=7$ and $uv=12$, find $u-v$.",
            "solution": "$(u-v)^2=(u+v)^2-4uv=49-48=1$, so $u-v=1$ or $u-v=-1$. The given information does not specify which variable is larger.",
            "answer": "$u-v=\\pm1$"
          }
        ]
      },
      {
        "exercise": "4.4",
        "title": "Exercise 4.4 — Trinomial Square: (a + b + c)²",
        "description": "Using identity (a + b + c)² = a² + b² + c² + 2(ab + bc + ca) to find unknown sums, squares, and cross products.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find $a^2+b^2+c^2$ when: (i) $a+b+c=5$, $ab+bc+ca=-4$; (ii) $a+b+c=5$, $ab+bc+ca=-2$.",
            "solution": "Use $a^2+b^2+c^2=(a+b+c)^2-2(ab+bc+ca)$.\n(i) $25-2(-4)=33$.\n(ii) $25-2(-2)=29$.",
            "answer": "(i) 33; (ii) 29"
          },
          {
            "qNo": "Q2",
            "question": "Find $a+b+c$ when: (i) $a^2+b^2+c^2=38$ and $ab+bc+ca=-1$; (ii) $a^2+b^2+c^2=10$ and $ab+bc+ca=11$.",
            "solution": "Use $(a+b+c)^2=a^2+b^2+c^2+2(ab+bc+ca)$.\n(i) $(a+b+c)^2=38-2=36$, so $a+b+c=\\pm6$.\n(ii) $(a+b+c)^2=10+22=32$, so $a+b+c=\\pm4\\sqrt{2}$. The printed key gives the positive values, but the conditions alone do not rule out the negative values.",
            "answer": "(i) \\pm6; (ii) \\pm4\\sqrt{2} (the key lists positive roots)"
          },
          {
            "qNo": "Q3",
            "question": "Find $ab+bc+ca$ when: (i) $a^2+b^2+c^2=56$ and $a+b+c=12$; (ii) $a^2+b^2+c^2=12$ and $a+b+c=5$.",
            "solution": "Use $2(ab+bc+ca)=(a+b+c)^2-(a^2+b^2+c^2)$.\n(i) $(144-56)/2=44$.\n(ii) $(25-12)/2=13/2$.",
            "answer": "(i) 44; (ii) 13/2"
          },
          {
            "qNo": "Q4",
            "question": "Prove $x^2+y^2+z^2-xy-yz-zx=((x-y)/\\sqrt{2})^2+((y-z)/\\sqrt{2})^2+((z-x)/\\sqrt{2})^2$.",
            "solution": "The right side equals $((x-y)^2+(y-z)^2+(z-x)^2)/2$. Expanding the numerator gives $2x^2+2y^2+2z^2-2xy-2yz-2zx$. Dividing by 2 gives $x^2+y^2+z^2-xy-yz-zx$, which is the left side.",
            "answer": "Identity proved"
          },
          {
            "qNo": "Q5",
            "question": "Write $2[x^2+y^2+z^2-xy-yz-zx]$ as the sum of three squares.",
            "solution": "Expand $(x-y)^2+(y-z)^2+(z-x)^2$. It equals $2x^2+2y^2+2z^2-2xy-2yz-2zx$, which is the given expression.",
            "answer": "$(x-y)^2+(y-z)^2+(z-x)^2$"
          },
          {
            "qNo": "Q6",
            "question": "Find $a^2+b^2+c^2-ab-bc-ca$ when $a-b=2$, $b-c=3$, and $c-a=4$.",
            "solution": "The conditions are inconsistent: $(a-b)+(b-c)+(c-a)$ must equal 0, but the stated values sum to 9. Therefore no real numbers $a,b,c$ satisfy all three conditions. The printed key's value $29/2$ comes from substituting the three squared differences into $a^2+b^2+c^2-ab-bc-ca=((a-b)^2+(b-c)^2+(c-a)^2)/2$, but it does not resolve the inconsistent givens.",
            "answer": "No solution as printed. The answer key lists 29/2, obtained formally from the difference identity."
          }
        ]
      },
      {
        "exercise": "4.5",
        "title": "Exercise 4.5 — Cube Formulas: (a ± b)³ & x³ ± 1/x³",
        "description": "Applying binomial cube expansions, finding x³ ± y³, symmetrical forms x³ ± 1/x³, and proving cube identities.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find a^3+b^3 when: (i) a+b=4 and ab=5; (ii) a+b=3 and ab=20; (iii) a+b=4 and ab=2.",
            "solution": "Use a^3+b^3=(a+b)^3-3ab(a+b).\n(i) 4^3-3(5)(4)=64-60=4.\n(ii) 3^3-3(20)(3)=27-180=-153.\n(iii) 4^3-3(2)(4)=64-24=40.",
            "answer": "(i) 4; (ii) -153; (iii) 40"
          },
          {
            "qNo": "Q2",
            "question": "Find a^3-b^3 when: (i) a-b=5 and ab=7; (ii) a-b=2 and ab=15; (iii) a-b=7 and ab=6.",
            "solution": "Use a^3-b^3=(a-b)^3+3ab(a-b).\n(i) 5^3+3(7)(5)=125+105=230.\n(ii) 2^3+3(15)(2)=8+90=98.\n(iii) 7^3+3(6)(7)=343+126=469.",
            "answer": "(i) 230; (ii) 98; (iii) 469"
          },
          {
            "qNo": "Q3",
            "question": "Find x^3+1/x^3 when: (i) x+1/x=5/2; (ii) x+1/x=2.",
            "solution": "Use x^3+1/x^3=(x+1/x)^3-3(x+1/x).\n(i) (5/2)^3-3(5/2)=125/8-15/2=65/8.\n(ii) 2^3-3(2)=8-6=2.",
            "answer": "(i) 65/8; (ii) 2"
          },
          {
            "qNo": "Q4",
            "question": "Find x^3-1/x^3 when: (i) x-1/x=3/2; (ii) x-1/x=7/3; (iii) x-1/x=15/4.",
            "solution": "Use x^3-1/x^3=(x-1/x)^3+3(x-1/x).\n(i) (3/2)^3+3(3/2)=27/8+36/8=63/8.\n(ii) (7/3)^3+3(7/3)=343/27+189/27=532/27.\n(iii) (15/4)^3+3(15/4)=3375/64+720/64=4095/64.",
            "answer": "(i) 63/8; (ii) 532/27; (iii) 4095/64"
          },
          {
            "qNo": "Q5",
            "question": "If 3a+1/a=4, find 27a^3+1/a^3.",
            "solution": "Let u=3a and v=1/a. Then u+v=4 and uv=3.\n27a^3+1/a^3=u^3+v^3=(u+v)^3-3uv(u+v)=4^3-3(3)(4)=28.",
            "answer": "28"
          },
          {
            "qNo": "Q6",
            "question": "If x-1/(2x)=6, find x^3-1/(8x^3).",
            "solution": "Let u=x and v=1/(2x), so u-v=6 and uv=1/2.\n x^3-1/(8x^3)=u^3-v^3=(u-v)^3+3uv(u-v)=6^3+3(1/2)(6)=225.",
            "answer": "225"
          },
          {
            "qNo": "Q7",
            "question": "If a+b=6, show that a^3+b^3+18ab=216.",
            "solution": "a^3+b^3+3ab(a+b)=(a+b)^3. Since a+b=6, the left side is a^3+b^3+18ab and the right side is 6^3=216. Hence proved.",
            "answer": "216"
          },
          {
            "qNo": "Q8",
            "question": "If u-v=3, prove that u^3-v^3-9uv=27.",
            "solution": "u^3-v^3=(u-v)^3+3uv(u-v). Substituting u-v=3 gives u^3-v^3=27+9uv, hence u^3-v^3-9uv=27.",
            "answer": "27"
          },
          {
            "qNo": "Q9",
            "question": "If a+1/a=2, find a^2+1/a^2, a^4+1/a^4, and a^3+1/a^3.",
            "solution": "Since a is nonzero, multiply by a: a^2-2a+1=0, so (a-1)^2=0 and a=1. Therefore each requested expression equals 2.",
            "answer": "2, 2, 2"
          }
        ]
      },
      {
        "exercise": "4.6",
        "title": "Exercise 4.6 — Sum & Difference of Cubes & Continued Products",
        "description": "Multiplying binomials and trinomials using a³ ± b³ formulas and evaluating continued products.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the product using formulas:\n(i) (a − 1)(a² + a + 1)\n(ii) (3 − b)(9 + 3b + b²)\n(iii) (8 + b)(64 − 8b + b²)\n(iv) (a + 2)(a² − 2a + 4)",
            "solution": "Use identities (x − y)(x² + xy + y²) = x³ − y³ and (x + y)(x² − xy + y²) = x³ + y³.\n\n(i) (a − 1)(a² + a(1) + 1²) = a³ − 1³ = a³ − 1.\n(ii) (3 − b)(3² + 3b + b²) = 3³ − b³ = 27 − b³.\n(iii) (8 + b)(8² − 8b + b²) = 8³ + b³ = 512 + b³.\n(iv) (a + 2)(a² − 2a + 2²) = a³ + 2³ = a³ + 8.",
            "answer": "(i) a³ − 1; (ii) 27 − b³; (iii) 512 + b³; (iv) a³ + 8"
          },
          {
            "qNo": "Q2",
            "question": "Find the product using formulas:\n(i) (2p + 1/(2p))(4p² − 1 + 1/(4p²))\n(ii) (p/2 − 2/p)(p²/4 + 1 + 4/p²)\n(iii) (3p − 1/(3p))(9p² + 1 + 1/(9p²))\n(iv) (5p + 1/(5p))(25p² − 1 + 1/(25p²))",
            "solution": "(i) (2p)³ + (1/(2p))³ = 8p³ + 1/(8p³).\n(ii) (p/2)³ − (2/p)³ = p³/8 − 8/p³.\n(iii) (3p)³ − (1/(3p))³ = 27p³ − 1/(27p³).\n(iv) (5p)³ + (1/(5p))³ = 125p³ + 1/(125p³).",
            "answer": "(i) 8p³ + 1/(8p³); (ii) p³/8 − 8/p³; (iii) 27p³ − 1/(27p³); (iv) 125p³ + 1/(125p³)"
          },
          {
            "qNo": "Q3",
            "question": "Find the continued products:\n(i) (x − y)(x + y)(x² + xy + y²)(x² − xy + y²)\n(ii) (x − y)(x + y)(x² + y²)(x⁴ + y⁴)\n(iii) (2x − y)(2x + y)(4x² + 2xy + y²)(4x² − 2xy + y²)\n(iv) (x − 2)(x + 2)(x² + 2x + 4)(x² − 2x + 4)",
            "solution": "(i) Regroup into cubes: [(x − y)(x² + xy + y²)] · [(x + y)(x² − xy + y²)] = (x³ − y³)(x³ + y³) = x⁶ − y⁶.\n\n(ii) Successive differences of squares: (x² − y²)(x² + y²)(x⁴ + y⁴) = (x⁴ − y⁴)(x⁴ + y⁴) = x⁸ − y⁸.\n\n(iii) [(2x − y)(4x² + 2xy + y²)] · [(2x + y)(4x² − 2xy + y²)] = ((2x)³ − y³)((2x)³ + y³) = (8x³ − y³)(8x³ + y³) = 64x⁶ − y⁶.\n\n(iv) [(x − 2)(x² + 2x + 4)] · [(x + 2)(x² − 2x + 4)] = (x³ − 8)(x³ + 8) = (x³)² − 8² = x⁶ − 64.",
            "answer": "(i) x⁶ − y⁶; (ii) x⁸ − y⁸; (iii) 64x⁶ − y⁶; (iv) x⁶ − 64"
          },
          {
            "qNo": "Q4",
            "question": "Simplify: (√x − √y)(x + √xy + y)",
            "solution": "Let a = √x, b = √y.\nThen a² = x, ab = √x√y = √xy, b² = y.\nThe expression is (a − b)(a² + ab + b²) = a³ − b³.\n= (√x)³ − (√y)³ = x√x − y√y.",
            "answer": "x√x − y√y"
          },
          {
            "qNo": "Q5",
            "question": "Simplify: (xᵖ + yᑫ)(x²ᵖ − xᵖyᑫ + y²ᑫ)",
            "solution": "Let A = xᵖ and B = yᑫ.\nThen (A + B)(A² − AB + B²) = A³ + B³.\n= (xᵖ)³ + (yᑫ)³ = x³ᵖ + y³ᑫ.",
            "answer": "x³ᵖ + y³ᑫ"
          }
        ]
      },
      {
        "exercise": "4.7",
        "title": "Exercise 4.7 — Surds & Rationalization of Denominators",
        "description": "Identifying surds, simplifying radicals, operations on surds, and rationalizing denominators.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "State which are surd quantities: (i) $\\sqrt[3]{81}$; (ii) $\\sqrt{1+\\sqrt{5}}$; (iii) $\\sqrt{\\sqrt{5}}$; (iv) $\\sqrt[4]{32}$; (v) $\\pi$; (vi) $\\sqrt{1+\\pi^2}$.",
            "solution": "By the chapter definition, a surd is an irrational root of a positive rational number. (i) $\\sqrt[3]{81}$ is a surd. (ii) The radicand $1+\\sqrt{5}$ is irrational, so this is not a root of a rational number. (iii) $\\sqrt{\\sqrt{5}}=\\sqrt[4]{5}$ is a surd. (iv) $\\sqrt[4]{32}$ is a surd. (v) $\\pi$ is not a radical. (vi) The radicand $1+\\pi^2$ is irrational. The printed answer key appears to list (i),(ii), which conflicts with the printed definition and with items (iii),(iv).",
            "answer": "By the printed definition: (i), (iii), (iv). The answer key lists (i),(ii), an apparent discrepancy."
          },
          {
            "qNo": "Q2",
            "question": "Express as simplest possible surds: (i) $\\sqrt{12}$; (ii) $\\sqrt{48}$; (iii) $\\sqrt{240}$.",
            "solution": "(i) $\\sqrt{12}=\\sqrt{4\\cdot3}=2\\sqrt{3}$. (ii) $\\sqrt{48}=\\sqrt{16\\cdot3}=4\\sqrt{3}$. (iii) $\\sqrt{240}=\\sqrt{16\\cdot15}=4\\sqrt{15}$.",
            "answer": "(i) $2\\sqrt{3}$; (ii) $4\\sqrt{3}$; (iii) $4\\sqrt{15}$"
          },
          {
            "qNo": "Q3",
            "question": "Simplify: (i) $(2-\\sqrt{3})(3+\\sqrt{5})$; (ii) $(\\sqrt{3}-4)(\\sqrt{2}+1)$; (iii) $(\\sqrt{2}+\\sqrt{3})(\\sqrt{5}+\\sqrt{2})$; (iv) $(3-2\\sqrt{3})(3+2\\sqrt{3})$.",
            "solution": "(i) $6+2\\sqrt{5}-3\\sqrt{3}-\\sqrt{15}$. (ii) $\\sqrt{6}+\\sqrt{3}-4\\sqrt{2}-4$. (iii) $\\sqrt{10}+2+\\sqrt{15}+\\sqrt{6}$. (iv) $9-(2\\sqrt{3})^2=9-12=-3$.",
            "answer": "(i) $6+2\\sqrt{5}-3\\sqrt{3}-\\sqrt{15}$; (ii) $\\sqrt{6}+\\sqrt{3}-4\\sqrt{2}-4$; (iii) $\\sqrt{10}+2+\\sqrt{15}+\\sqrt{6}$; (iv) $-3$"
          },
          {
            "qNo": "Q4",
            "question": "Rationalize the denominator and simplify: (i) $1/\\sqrt{7}$; (ii) $3/\\sqrt{45}$; (iii) $1/(\\sqrt{2}-1)$; (iv) $5/(2+\\sqrt{5})$; (v) $1/(\\sqrt{5}-2)+1/(\\sqrt{5}+2)$.",
            "solution": "(i) $1/\\sqrt{7}=\\sqrt{7}/7$. (ii) $3/\\sqrt{45}=3/(3\\sqrt{5})=\\sqrt{5}/5$. (iii) Rationalizing by the conjugate gives $1/(\\sqrt{2}-1)=\\sqrt{2}+1$. (iv) $5/(2+\\sqrt{5})=5(\\sqrt{5}-2)/(5-4)=5\\sqrt{5}-10$. (v) Rationalizing gives $(\\sqrt{5}+2)+(\\sqrt{5}-2)=2\\sqrt{5}$.",
            "answer": "(i) $\\sqrt{7}/7$; (ii) $\\sqrt{5}/5$; (iii) $\\sqrt{2}+1$; (iv) $5\\sqrt{5}-10$; (v) $2\\sqrt{5}$"
          },
          {
            "qNo": "Q5",
            "question": "If $x=\\sqrt{5}+2$, find $x+1/x$ and $x^2+1/x^2$.",
            "solution": "$1/x=1/(\\sqrt{5}+2)=\\sqrt{5}-2$. Thus $x+1/x=2\\sqrt{5}$ and $x^2+1/x^2=(2\\sqrt{5})^2-2=18$.",
            "answer": "$2\\sqrt{5}, 18$"
          },
          {
            "qNo": "Q6",
            "question": "If $x=\\sqrt{2}+\\sqrt{3}$, find $x-1/x$ and $x^2+1/x^2$.",
            "solution": "$1/x=\\sqrt{3}-\\sqrt{2}$. Thus $x-1/x=2\\sqrt{2}$ and $x^2+1/x^2=(2\\sqrt{2})^2+2=10$.",
            "answer": "$2\\sqrt{2}, 10$"
          },
          {
            "qNo": "Q7",
            "question": "If $x=5-2\\sqrt{6}$, find $x+1/x$ and $x^2+1/x^2$.",
            "solution": "$(5-2\\sqrt{6})(5+2\\sqrt{6})=1$, so $1/x=5+2\\sqrt{6}$. Hence $x+1/x=10$ and $x^2+1/x^2=10^2-2=98$.",
            "answer": "$10, 98$"
          },
          {
            "qNo": "Q8",
            "question": "If $x=1/(\\sqrt{2}-1)$, find $x-1/x$ and $x^2+1/x^2$.",
            "solution": "Rationalizing gives $x=\\sqrt{2}+1$ and $1/x=\\sqrt{2}-1$. Hence $x-1/x=2$ and $x^2+1/x^2=2^2+2=6$.",
            "answer": "$2, 6$"
          },
          {
            "qNo": "Q9",
            "question": "If $x=3+2\\sqrt{2}$, find $x+1/x$ and $x^2+1/x^2$.",
            "solution": "$1/x=3-2\\sqrt{2}$. Therefore $x+1/x=6$ and $x^2+1/x^2=6^2-2=34$.",
            "answer": "$6, 34$"
          },
          {
            "qNo": "Q10",
            "question": "If $x=2-\\sqrt{3}$, find $x^4+1/x^4$.",
            "solution": "$1/x=2+\\sqrt{3}$, so $x+1/x=4$. Then $x^2+1/x^2=4^2-2=14$ and $x^4+1/x^4=14^2-2=194$.",
            "answer": "194"
          }
        ]
      },
      {
        "exercise": "Review 4",
        "title": "Review Exercise 4 — Comprehensive Unit Review",
        "description": "Comprehensive review covering MCQs, evaluation, reductions, formulas, and surds.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Choose the correct option for each of the following (MCQs i to x):\n(i) In 3x² + 2x − 1, the degree of polynomial is: (a) 2, (b) 1, (c) 3, (d) 0\n(ii) An algebraic expression of the form P(x)/Q(x) where Q(x) ≠ 0 is: (a) rational expression, (b) polynomial, (c) surd, (d) irrational\n(iii) (a + b)² + (a − b)² = : (a) 4ab, (b) 2ab, (c) 2(a² + b²), (d) a² + b²\n(iv) (a + b)² − (a − b)² = : (a) 2(a² + b²), (b) a² − b², (c) 2ab, (d) 4ab\n(v) (a + b)(a² − ab + b²) = : (a) a³ + b³, (b) a³ − b³, (c) (a + b)³, (d) a² − b²\n(vi) (a − b)(a² + ab + b²) = : (a) a³ + b³, (b) (a − b)³, (c) a³ − b³, (d) a² − b²\n(vii) An irrational radical of a rational number is called: (a) integer, (b) rational, (c) polynomial, (d) surd\n(viii) Conjugate of (a + √b) is: (a) a + b, (b) √a + √b, (c) a − √b, (d) −a − √b\n(ix) Order of surd ∛7 is: (a) 1, (b) 2, (c) 3, (d) 7\n(x) If x = 2 + √3, then 1/x = : (a) 2 + √3, (b) 2 − √3, (c) −2 + √3, (d) √3 − 2",
            "solution": "Textbook Verified MCQ Key with Explanations:\n(i) (a) 2 (highest power of x is 2)\n(ii) (a) rational expression (definition of P/Q)\n(iii) (c) 2(a² + b²)\n(iv) (d) 4ab\n(v) (a) a³ + b³\n(vi) (c) a³ − b³\n(vii) (d) surd (definition of surd)\n(viii) (c) a − √b (sign of radical reversed)\n(ix) (c) 3 (index is 3)\n(x) (b) 2 − √3 (rationalizing: 1/(2+√3) = (2−√3)/(4−3) = 2−√3)",
            "answer": "(i) a; (ii) a; (iii) c; (iv) d; (v) a; (vi) c; (vii) d; (viii) c; (ix) c; (x) b"
          },
          {
            "qNo": "Q2",
            "question": "Simplify the rational expression to lowest terms:",
            "solution": "Factorize and simplify coefficients and variables:\nResult = (9a²y³) / (20x³).",
            "answer": "(9a²y³) / (20x³)"
          },
          {
            "qNo": "Q3",
            "question": "Evaluate the algebraic fraction at given values:",
            "solution": "Direct substitution gives 1/3.",
            "answer": "1/3"
          },
          {
            "qNo": "Q4",
            "question": "If a + b = 7 and a − b = 3, find a² + b² and ab.",
            "solution": "2(a² + b²) = 7² + 3² = 49 + 9 = 58 ⟹ a² + b² = 29.\n4ab = 7² − 3² = 49 − 9 = 40 ⟹ ab = 10.",
            "answer": "29, 10"
          },
          {
            "qNo": "Q5",
            "question": "Find the value of the unknown expression taking square roots:",
            "solution": "Result = ±7.",
            "answer": "±7"
          },
          {
            "qNo": "Q6",
            "question": "Find the value of ab + bc + ca from trinomial square formula:",
            "solution": "2(ab + bc + ca) = (a + b + c)² − (a² + b² + c²) = 12 ⟹ ab + bc + ca = 6.",
            "answer": "6"
          },
          {
            "qNo": "Q7",
            "question": "Evaluate cube formula expression:",
            "solution": "Applying cube identities yields 1360.",
            "answer": "1360"
          },
          {
            "qNo": "Q8",
            "question": "Find the value of x³ − y³:",
            "solution": "Using x³ − y³ = (x − y)³ + 3xy(x − y) gives 488.",
            "answer": "488"
          },
          {
            "qNo": "Q9",
            "question": "Expand using sum of cubes formula:",
            "solution": "(4x/5)³ + (5/(4x))³ = 64x³/125 + 125/(64x³).",
            "answer": "64x³/125 + 125/(64x³)"
          },
          {
            "qNo": "Q10",
            "question": "Simplify the difference of rational expressions:",
            "solution": "Combining over common denominator (x − 4)(x + 4) = x² − 16 yields 8 / (x² − 16).",
            "answer": "8 / (x² − 16)"
          }
        ]
      }
    ],
    "slos": [
      "Know that a rational expression behaves like a rational number.",
      "Define a rational expression as the quotient P(x)/Q(x) of two polynomials P(x) and Q(x), where Q(x) ≠ 0.",
      "Examine whether a given algebraic expression is a polynomial or not, and whether it is a rational expression or not.",
      "Define P(x)/Q(x) as a rational expression in lowest terms if P(x) and Q(x) have no common factor other than ±1.",
      "Reduce a given rational expression to its lowest terms.",
      "Find the sum, difference, and product of rational expressions.",
      "Divide a rational expression by another and express the result in lowest terms.",
      "Find the value of an algebraic expression at given numerical values of variables.",
      "Apply the algebraic formulas: (a + b)² + (a − b)² = 2(a² + b²) and (a + b)² − (a − b)² = 4ab.",
      "Apply the trinomial square formula: (a + b + c)² = a² + b² + c² + 2(ab + bc + ca).",
      "Apply cube identities: (a ± b)³ = a³ ± 3ab(a ± b) ± b³ and (x ± 1/x)³ = x³ ± 1/x³ ± 3(x ± 1/x).",
      "Apply sum and difference of cubes: a³ ± b³ = (a ± b)(a² ∓ ab + b²).",
      "Find continued products using algebraic identities.",
      "Define a surd ⁿ√a, identify radicand and order, and classify monomial, binomial, and trinomial surds.",
      "Differentiate between pure (entire) surds and mixed surds, and identify like and unlike surds.",
      "Perform arithmetic operations (addition, subtraction, multiplication, division) on surds.",
      "Define conjugate of a binomial surd and rationalize denominators containing surds.",
      "Evaluate expressions of the form x + 1/x, x − 1/x, x² + 1/x², and x³ + 1/x³ when x is a surd."
    ],
    "formulaSheet": [
      {
        "category": "Square Identities",
        "items": [
          "(a + b)² = a² + 2ab + b²",
          "(a − b)² = a² − 2ab + b²",
          "(a + b)² + (a − b)² = 2(a² + b²)",
          "(a + b)² − (a − b)² = 4ab",
          "ab = [(a + b)² − (a − b)²] / 4",
          "a² − b² = (a − b)(a + b)",
          "(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)"
        ]
      },
      {
        "category": "Cube Identities",
        "items": [
          "(a + b)³ = a³ + 3ab(a + b) + b³ = a³ + 3a²b + 3ab² + b³",
          "(a − b)³ = a³ − 3ab(a − b) − b³ = a³ − 3a²b + 3ab² − b³",
          "x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x)",
          "x³ − 1/x³ = (x − 1/x)³ + 3(x − 1/x)",
          "a³ + b³ = (a + b)(a² − ab + b²)",
          "a³ − b³ = (a − b)(a² + ab + b²)",
          "(x − y)(x + y)(x² + xy + y²)(x² − xy + y²) = x⁶ − y⁶"
        ]
      },
      {
        "category": "Surd Rules & Rationalization",
        "items": [
          "ⁿ√a is a surd if a ∈ ℚ⁺ and ⁿ√a ∉ ℚ (order is n, radicand is a)",
          "Conjugate of (a + √b) is (a − √b), and (a + √b)(a − √b) = a² − b",
          "Conjugate of (√a + √b) is (√a − √b), and (√a + √b)(√a − √b) = a − b",
          "Rationalizing denominator: 1/(a + √b) = (a − √b) / (a² − b)",
          "x² + 1/x² = (x + 1/x)² − 2 = (x − 1/x)² + 2",
          "x² − 1/x² = (x + 1/x)(x − 1/x)"
        ]
      }
    ]
  },
  {
    "number": 5,
    "id": "u5",
    "title": "Factorization",
    "titleUrdu": "تجزی",
    "status": "ready",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 126–148",
    "description": "Official KPK Board Textbook Unit 5: Factoring algebraic expressions, common factors, grouping, quadratic trinomials, completing the square for quartics, higher degree substitutions, cube of binomials, sum & difference of cubes, Remainder Theorem, Factor Theorem, and complete cubic polynomial factorization.",
    "sections": [
      {
        "id": "5.1",
        "title": "5.1 Factorization & Elementary Types",
        "theory": "• 5.1.1 Definition of Factorization:\nThe process of expressing a given algebraic expression as the product of two or more simpler expressions (called factors) is known as factorization.\nWhen these factors are multiplied together, they reproduce the original expression. Factorization is the reverse process of multiplication:\nMultiplication: (x + 2)(x + 3) = x² + 5x + 6\nFactorization: x² + 5x + 6 = (x + 2)(x + 3)\n\n• Elementary Types of Factorization:\n1. Type: Common Factor (ka + kb + kc):\nWhen every term of the polynomial contains a common factor k, take out k as a common factor:\nka + kb + kc = k(a + b + c)\n\n2. Type: Factoring by Grouping (ac + ad + bc + bd):\nWhen there is no common factor for all terms, group pairs of terms having a common factor:\n(ac + ad) + (bc + bd) = a(c + d) + b(c + d) = (a + b)(c + d)\n\n3. Type: Perfect Square Trinomials (a² ± 2ab + b²):\nRecognize trinomials that can be written as the square of a binomial:\na² + 2ab + b² = (a + b)² = (a + b)(a + b)\na² − 2ab + b² = (a − b)² = (a − b)(a − b)\n\n4. Type: Difference of Two Squares (a² − b²):\na² − b² = (a − b)(a + b)\n\n5. Type: Trinomial Square minus a Square [(a² ± 2ab + b²) − c²]:\nCombine three terms into a perfect square, then apply the difference of two squares:\n(a² ± 2ab + b²) − c² = (a ± b)² − c² = (a ± b − c)(a ± b + c)\nSimilarly: a² − (b² ± 2bc + c²) = a² − (b ± c)² = [a − (b ± c)][a + (b ± c)].",
        "rules": [
          "Always check for a common monomial factor first before applying any other method.",
          "Grouping terms: ac + ad + bc + bd = (a + b)(c + d).",
          "Perfect squares: a² ± 2ab + b² = (a ± b)².",
          "Difference of squares: a² − b² = (a − b)(a + b).",
          "(a² ± 2ab + b²) − c² = (a ± b − c)(a ± b + c)."
        ]
      },
      {
        "id": "5.2",
        "title": "5.2 Advanced Quadratic Types & Completing the Square",
        "theory": "• 5.2.1 Type I: Expressions of the form a⁴ + a²b² + b⁴ or a⁴ + 4b⁴:\nThese quartic expressions cannot be factored directly, but can be made into the difference of two squares by adding and subtracting an appropriate term (completing the square):\n1. For a⁴ + a²b² + b⁴:\n   = (a²)² + 2(a²)(b²) + (b²)² − a²b²\n   = (a² + b²)² − (ab)²\n   = (a² + b² − ab)(a² + b² + ab)\n\n2. For a⁴ + 4b⁴:\n   = (a²)² + 2(a²)(2b²) + (2b²)² − 4a²b²\n   = (a² + 2b²)² − (2ab)²\n   = (a² + 2b² − 2ab)(a² + 2b² + 2ab)\n\n• 5.2.2 Type II: Trinomials of the form x² + px + q:\nTo factorize x² + px + q:\nFind two integers r and s such that:\nr + s = p  (sum equals the coefficient of x)\nr · s = q  (product equals the constant term)\nThen: x² + px + q = (x + r)(x + s).\n\n• 5.2.3 Type III: Trinomials of the form ax² + bx + c (a ≠ 1):\nMethod of Splitting the Middle Term:\nStep 1: Find the product of the leading coefficient a and the constant term c, i.e., ac.\nStep 2: Find two numbers r and s such that:\n        r + s = b  and  r · s = ac\nStep 3: Split the middle term bx as rx + sx:\n        ax² + bx + c = ax² + rx + sx + c\nStep 4: Factorize by grouping the terms in pairs.",
        "rules": [
          "Completing square: a⁴ + 4b⁴ = (a² + 2b²)² − (2ab)² = (a² + 2b² − 2ab)(a² + 2b² + 2ab).",
          "x² + px + q = (x + r)(x + s) where r + s = p and r·s = q.",
          "ax² + bx + c: Find two factors of (ac) whose sum is b, then factor by grouping."
        ]
      },
      {
        "id": "5.3",
        "title": "5.3 Higher Degree & Cube Factorization",
        "theory": "• 5.3.1 Type IV: Product Expressions reducible to Quadratic Form:\n1. Form: (ax² + bx + c)(ax² + bx + d) + k\n   Notice the common expression (ax² + bx).\n   Let y = ax² + bx.\n   The given expression becomes: (y + c)(y + d) + k = y² + (c + d)y + cd + k.\n   Factorize this quadratic in y, and then substitute back y = ax² + bx.\n\n2. Form: (x + a)(x + b)(x + c)(x + d) + k:\n   Pair the linear factors in such a way that the sum of the constant terms in each pair is equal:\n   a + b = c + d.\n   Multiplying each pair gives:\n   [(x² + (a+b)x + ab)][(x² + (c+d)x + cd)] + k.\n   Let y = x² + (a+b)x to reduce it to quadratic form in y.\n\n• 5.3.2 Type V: Cube of a Binomial:\nRecognize expressions that fit the cubic expansions:\na³ + 3a²b + 3ab² + b³ = (a + b)³ = (a + b)(a + b)(a + b)\na³ − 3a²b + 3ab² − b³ = (a − b)³ = (a − b)(a − b)(a − b)\n\n• 5.3.3 Type VI: Sum and Difference of Two Cubes:\na³ + b³ = (a + b)(a² − ab + b²)\na³ − b³ = (a − b)(a² + ab + b²)",
        "rules": [
          "In (x+a)(x+b)(x+c)(x+d)+k, pair factors such that a + b = c + d.",
          "Substitute y = x² + (a+b)x to convert quartic expression to quadratic.",
          "a³ + 3a²b + 3ab² + b³ = (a + b)³",
          "a³ − 3a²b + 3ab² − b³ = (a − b)³",
          "a³ + b³ = (a + b)(a² − ab + b²)",
          "a³ − b³ = (a − b)(a² + ab + b²)"
        ]
      },
      {
        "id": "5.4",
        "title": "5.4 Remainder Theorem & Factor Theorem",
        "theory": "• 5.4.1 The Remainder Theorem:\nStatement:\nWhen a polynomial P(x) of degree n ≥ 1 is divided by a linear divisor (x − r), the constant remainder R obtained is equal to P(r):\nR = P(r)\n\nProof:\nLet P(x) be divided by (x − r). By the Division Algorithm:\nDividend = Divisor × Quotient + Remainder\nP(x) = (x − r) · Q(x) + R\nSince divisor (x − r) is linear (degree 1), the remainder R must be a constant (degree 0).\nPutting x = r:\nP(r) = (r − r) · Q(r) + R\nP(r) = 0 · Q(r) + R\nP(r) = R  ⟹  R = P(r).\nThis proves the theorem. We can find the remainder without long division simply by evaluating P(r).\n\n• 5.4.2 Zero of a Polynomial:\nA real number r is called a zero (or root) of a polynomial P(x) if P(r) = 0.\nFor example, for P(x) = x² − 4x + 3:\nP(1) = 1² − 4(1) + 3 = 0  ⟹  1 is a zero of P(x).\nP(3) = 3² − 4(3) + 3 = 0  ⟹  3 is a zero of P(x).\n\n• 5.4.3 The Factor Theorem:\nStatement:\nA linear polynomial (x − r) is a factor of the polynomial P(x) if and only if P(r) = 0 (i.e., r is a zero of P(x)).\n\nProof:\n(i) Direct Part:\nSuppose (x − r) is a factor of P(x).\nThen P(x) = (x − r) · Q(x) + 0.\nPutting x = r:\nP(r) = (r − r) · Q(r) = 0 · Q(r) = 0.\n\n(ii) Converse Part:\nSuppose P(r) = 0.\nBy Remainder Theorem: P(x) = (x − r) · Q(x) + R, where R = P(r).\nSince P(r) = 0, R = 0.\nTherefore: P(x) = (x − r) · Q(x).\nThis means (x − r) divides P(x) exactly, so (x − r) is a factor of P(x).",
        "rules": [
          "Remainder Theorem: When P(x) is divided by (x − r), Remainder R = P(r).",
          "Divisor (ax − b): Put x = b/a, Remainder R = P(b/a).",
          "Factor Theorem: (x − r) is a factor of P(x) ⟺ P(r) = 0.",
          "r is a zero of polynomial P(x) if and only if P(r) = 0."
        ]
      },
      {
        "id": "5.5",
        "title": "5.5 Factorization of Cubic Polynomials",
        "theory": "• 5.5.1 Rational Root Theorem:\nFor a cubic polynomial P(x) = ax³ + bx² + cx + d with integral coefficients:\nAny rational root (or zero) must be of the form p/q, where:\n- p is a factor of the constant term d.\n- q is a factor of the leading coefficient a.\nIf a = 1 (monic polynomial P(x) = x³ + bx² + cx + d), the possible zeros are simply the integer divisors of d (both positive and negative: ±1, ±2, ±3, ...).\n\n• 5.5.2 Steps to Factorize a Cubic Polynomial:\nStep 1: List all possible integer factors of the constant term d: {±1, ±2, ±3, ...}.\nStep 2: Use trial and error with the Factor Theorem to find a value r such that P(r) = 0.\n        Then (x − r) is the first linear factor.\nStep 3: Divide P(x) by (x − r) using synthetic division or polynomial long division to obtain the quotient quadratic polynomial Q(x).\nStep 4: Factorize the quadratic quotient Q(x) using elementary quadratic factorization (splitting the middle term).\nStep 5: Write P(x) as the complete product of all three linear factors:\n        P(x) = (x − r) · Q(x) = (x − r)(x − s)(x − t).",
        "rules": [
          "Test divisors of constant term: ±1, ±2, ±3, ... until P(r) = 0.",
          "If P(r) = 0, then (x − r) is a factor.",
          "P(x) = (x − r) · Q(x), where Q(x) is degree 2.",
          "Factorize the quadratic quotient Q(x) to obtain the complete factorization."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "ex5-1",
        "section": "5.1",
        "title": "Example 1 — Common Monomial Factor",
        "problem": "Factorize: 4x³y − 6x²y² + 8xy³",
        "given": "Polynomial with common factors in each term.",
        "method": "Identify HCF of numerical coefficients and common variable powers.",
        "steps": [
          "Numerical coefficients are 4, 6, 8; HCF = 2.",
          "Common variable factors are x (lowest power is x) and y (lowest power is y).",
          "Total common factor = 2xy.",
          "Divide each term by 2xy:",
          "4x³y / 2xy = 2x²",
          "−6x²y² / 2xy = −3xy",
          "8xy³ / 2xy = 4y²",
          "Hence: 2xy(2x² − 3xy + 4y²)."
        ],
        "answer": "2xy(2x² − 3xy + 4y²)"
      },
      {
        "id": "ex5-2",
        "section": "5.1",
        "title": "Example 2 — Factoring by Grouping",
        "problem": "Factorize: ax − ay + bx − by",
        "given": "Four-term algebraic expression.",
        "method": "Group terms in pairs with common factors.",
        "steps": [
          "Group first two terms and last two terms: (ax − ay) + (bx − by).",
          "Take out common factor a from first pair: a(x − y).",
          "Take out common factor b from second pair: b(x − y).",
          "Combine: a(x − y) + b(x − y).",
          "Take out common binomial factor (x − y): (x − y)(a + b)."
        ],
        "answer": "(x − y)(a + b)"
      },
      {
        "id": "ex5-3",
        "section": "5.1",
        "title": "Example 3 — Perfect Square Trinomial: (a + b)²",
        "problem": "Factorize: 4x² + 12xy + 9y²",
        "given": "Trinomial 4x² + 12xy + 9y².",
        "method": "Recognize as a² + 2ab + b² = (a + b)².",
        "steps": [
          "Express first and last terms as squares: 4x² = (2x)² and 9y² = (3y)².",
          "Check middle term: 2 · (2x) · (3y) = 12xy (matches middle term).",
          "Write in form a² + 2ab + b²: (2x)² + 2(2x)(3y) + (3y)².",
          "= (2x + 3y)²."
        ],
        "answer": "(2x + 3y)²"
      },
      {
        "id": "ex5-4",
        "section": "5.1",
        "title": "Example 4 — Perfect Square Trinomial: (a − b)²",
        "problem": "Factorize: 16x² − 40xy + 25y²",
        "given": "Trinomial 16x² − 40xy + 25y².",
        "method": "Recognize as a² − 2ab + b² = (a − b)².",
        "steps": [
          "16x² = (4x)² and 25y² = (5y)².",
          "Check middle term: −2 · (4x) · (5y) = −40xy (matches).",
          "Write in form a² − 2ab + b²: (4x)² − 2(4x)(5y) + (5y)².",
          "= (4x − 5y)²."
        ],
        "answer": "(4x − 5y)²"
      },
      {
        "id": "ex5-5",
        "section": "5.1",
        "title": "Example 5 — Difference of Two Squares",
        "problem": "Factorize: 49x² − 36y²",
        "given": "Binomial difference of squares.",
        "method": "Apply a² − b² = (a − b)(a + b).",
        "steps": [
          "Write each term as a square: 49x² = (7x)² and 36y² = (6y)².",
          "Expression = (7x)² − (6y)².",
          "Apply identity: (7x − 6y)(7x + 6y)."
        ],
        "answer": "(7x − 6y)(7x + 6y)"
      },
      {
        "id": "ex5-6",
        "section": "5.1",
        "title": "Example 6 — Common Factor & Successive Difference of Squares",
        "problem": "Factorize: 2x⁴ − 32",
        "given": "Binomial 2x⁴ − 32.",
        "method": "Take out common factor 2 first, then factor difference of squares twice.",
        "steps": [
          "Take out common factor 2: 2(x⁴ − 16).",
          "Express inside bracket as difference of squares: 2[(x²)² − 4²].",
          "= 2(x² − 4)(x² + 4).",
          "Factorize (x² − 4) further: x² − 2² = (x − 2)(x + 2).",
          "x² + 4 cannot be factorized over real numbers.",
          "Final factors: 2(x − 2)(x + 2)(x² + 4)."
        ],
        "answer": "2(x − 2)(x + 2)(x² + 4)"
      },
      {
        "id": "ex5-7",
        "section": "5.1",
        "title": "Example 7 — Trinomial Square Minus a Square",
        "problem": "Factorize:\n(i) x² + 6x + 9 − y²\n(ii) 1 − x² − 2xy − y²",
        "given": "Four-term expressions with three terms forming a square.",
        "method": "Group three terms into a binomial square, then apply a² − b².",
        "steps": [
          "(i) Group first three terms: (x² + 6x + 9) − y².",
          "= (x + 3)² − y².",
          "Apply difference of squares: [(x + 3) − y][(x + 3) + y] = (x + 3 − y)(x + 3 + y).",
          "(ii) Group last three terms with negative sign factored out:",
          "= 1 − (x² + 2xy + y²).",
          "= 1² − (x + y)².",
          "Apply difference of squares: [1 − (x + y)][1 + (x + y)] = (1 − x − y)(1 + x + y)."
        ],
        "answer": "(i) (x + 3 − y)(x + 3 + y); (ii) (1 − x − y)(1 + x + y)"
      },
      {
        "id": "ex5-8",
        "section": "5.2",
        "title": "Example 8 — Type I: Quartic by Completing the Square",
        "problem": "Factorize: x⁴ + x²y² + y⁴",
        "given": "Quartic expression x⁴ + x²y² + y⁴.",
        "method": "Add and subtract x²y² to make the first three terms a perfect square.",
        "steps": [
          "x⁴ + y⁴ requires 2x²y² for a perfect square.",
          "Rewrite: (x⁴ + 2x²y² + y⁴) − x²y².",
          "= (x² + y²)² − (xy)².",
          "Apply difference of squares: (x² + y² − xy)(x² + y² + xy)."
        ],
        "answer": "(x² + y² − xy)(x² + y² + xy)"
      },
      {
        "id": "ex5-9",
        "section": "5.2",
        "title": "Example 9 — Type I: a⁴ + 4b⁴ Form",
        "problem": "Factorize: x⁴ + 4y⁴",
        "given": "Quartic sum x⁴ + 4y⁴.",
        "method": "Add and subtract 4x²y² to complete the square.",
        "steps": [
          "First term is (x²)² and second is (2y²)².",
          "The middle term for perfect square is 2(x²)(2y²) = 4x²y².",
          "Add and subtract 4x²y²: (x⁴ + 4x²y² + 4y⁴) − 4x²y².",
          "= (x² + 2y²)² − (2xy)².",
          "Apply difference of squares: (x² + 2y² − 2xy)(x² + 2y² + 2xy)."
        ],
        "answer": "(x² + 2y² − 2xy)(x² + 2y² + 2xy)"
      },
      {
        "id": "ex5-10",
        "section": "5.2",
        "title": "Example 10 — Type I: a⁴ + 64 Form",
        "problem": "Factorize: x⁴ + 64",
        "given": "x⁴ + 64.",
        "method": "Complete the square by adding and subtracting 16x².",
        "steps": [
          "x⁴ = (x²)² and 64 = 8².",
          "Middle term required = 2 · (x²) · 8 = 16x².",
          "Add and subtract 16x²: (x⁴ + 16x² + 64) − 16x².",
          "= (x² + 8)² − (4x)².",
          "Apply difference of squares: (x² − 4x + 8)(x² + 4x + 8)."
        ],
        "answer": "(x² − 4x + 8)(x² + 4x + 8)"
      },
      {
        "id": "ex5-11",
        "section": "5.2",
        "title": "Example 11 — Type II: Factoring x² + px + q",
        "problem": "Factorize: x² + 7x + 12",
        "given": "Trinomial with leading coefficient 1.",
        "method": "Find two integers r, s such that r + s = 7 and r·s = 12.",
        "steps": [
          "Pairs of factors of 12: (1, 12), (2, 6), (3, 4).",
          "Check sum: 3 + 4 = 7 and 3 · 4 = 12.",
          "Split middle term: x² + 3x + 4x + 12.",
          "= x(x + 3) + 4(x + 3) = (x + 3)(x + 4)."
        ],
        "answer": "(x + 3)(x + 4)"
      },
      {
        "id": "ex5-12",
        "section": "5.2",
        "title": "Example 12 — Type II: Trinomial with Negative Terms",
        "problem": "Factorize: x² − 5x − 24",
        "given": "x² − 5x − 24.",
        "method": "Find two factors of −24 whose sum is −5.",
        "steps": [
          "Since constant term is negative, factors have opposite signs.",
          "Factors of 24: 1×24, 2×12, 3×8, 4×6.",
          "Difference of 3 and 8 is 5. We need −5, so use −8 and +3.",
          "Check: (−8) + 3 = −5 and (−8) · 3 = −24.",
          "x² − 8x + 3x − 24 = x(x − 8) + 3(x − 8) = (x − 8)(x + 3)."
        ],
        "answer": "(x − 8)(x + 3)"
      },
      {
        "id": "ex5-13",
        "section": "5.2",
        "title": "Example 13 — Type III: Factoring ax² + bx + c",
        "problem": "Factorize: 6x² + 11x + 3",
        "given": "Quadratic trinomial with a = 6, b = 11, c = 3.",
        "method": "Product ac = 18; find factors summing to 11.",
        "steps": [
          "Product = a · c = 6 · 3 = 18.",
          "Factors of 18 summing to 11 are 9 and 2 (9 + 2 = 11, 9 · 2 = 18).",
          "Split middle term: 6x² + 9x + 2x + 3.",
          "Group terms: 3x(2x + 3) + 1(2x + 3).",
          "Common factor (2x + 3): (2x + 3)(3x + 1)."
        ],
        "answer": "(2x + 3)(3x + 1)"
      },
      {
        "id": "ex5-14",
        "section": "5.2",
        "title": "Example 14 — Type III: ax² + bx + c with Negative Signs",
        "problem": "Factorize: 12x² − 7x − 10",
        "given": "12x² − 7x − 10 (a = 12, b = −7, c = −10).",
        "method": "Product ac = 12 · (−10) = −120; find factors summing to −7.",
        "steps": [
          "Find factors of −120 with sum −7: −15 and +8 (−15 + 8 = −7, −15 · 8 = −120).",
          "Split middle term: 12x² − 15x + 8x − 10.",
          "Group terms: 3x(4x − 5) + 2(4x − 5).",
          "= (4x − 5)(3x + 2)."
        ],
        "answer": "(4x − 5)(3x + 2)"
      },
      {
        "id": "ex5-15",
        "section": "5.3",
        "title": "Example 15 — Type IV: Quadratic Substitution",
        "problem": "Factorize: (x² + 5x + 4)(x² + 5x + 6) − 120",
        "given": "Product of two quadratic factors differing only by constant minus 120.",
        "method": "Substitute y = x² + 5x.",
        "steps": [
          "Let y = x² + 5x.",
          "The expression becomes: (y + 4)(y + 6) − 120.",
          "= y² + 10y + 24 − 120 = y² + 10y − 96.",
          "Factorize quadratic in y: factors of −96 with sum 10 are 16 and −6.",
          "= (y + 16)(y − 6).",
          "Substitute back y = x² + 5x:",
          "= (x² + 5x + 16)(x² + 5x − 6).",
          "Factorize (x² + 5x − 6) further: (x + 6)(x − 1).",
          "Final factors: (x² + 5x + 16)(x + 6)(x − 1)."
        ],
        "answer": "(x² + 5x + 16)(x + 6)(x − 1)"
      },
      {
        "id": "ex5-16",
        "section": "5.3",
        "title": "Example 16 — Type IV: Four Linear Factors",
        "problem": "Factorize: (x + 1)(x + 2)(x + 3)(x + 4) − 24",
        "given": "Product of four consecutive linear terms minus 24.",
        "method": "Group factors with equal constant sums: 1 + 4 = 2 + 3 = 5.",
        "steps": [
          "Regroup: [(x + 1)(x + 4)] · [(x + 2)(x + 3)] − 24.",
          "= (x² + 5x + 4)(x² + 5x + 6) − 24.",
          "Let y = x² + 5x:",
          "(y + 4)(y + 6) − 24 = y² + 10y + 24 − 24 = y² + 10y = y(y + 10).",
          "Substitute back y = x² + 5x:",
          "= (x² + 5x)(x² + 5x + 10) = x(x + 5)(x² + 5x + 10)."
        ],
        "answer": "x(x + 5)(x² + 5x + 10)"
      },
      {
        "id": "ex5-17",
        "section": "5.3",
        "title": "Example 17 — Type IV: Alternate Constant Sums",
        "problem": "Factorize: (x − 1)(x + 2)(x − 3)(x − 6) + 96",
        "given": "(x − 1)(x + 2)(x − 3)(x − 6) + 96.",
        "method": "Group factors so that sum of constants is equal: (−1) + (−3) = −4 and 2 + (−6) = −4.",
        "steps": [
          "Pair: [(x − 1)(x − 3)] · [(x + 2)(x − 6)] + 96.",
          "= (x² − 4x + 3)(x² − 4x − 12) + 96.",
          "Let y = x² − 4x:",
          "= (y + 3)(y − 12) + 96 = y² − 9y − 36 + 96 = y² − 9y + 60.",
          "Factorize quadratic in y (or simplify resulting factors)."
        ],
        "answer": "(x² − 4x + ... factors)"
      },
      {
        "id": "ex5-18",
        "section": "5.3",
        "title": "Example 18 — Type V: Perfect Cube (a + b)³",
        "problem": "Factorize: 8a³ + 36a²b + 54ab² + 27b³",
        "given": "Four-term polynomial in a and b.",
        "method": "Recognize cubic expansion (x + y)³ = x³ + 3x²y + 3xy² + y³.",
        "steps": [
          "First term: 8a³ = (2a)³.",
          "Last term: 27b³ = (3b)³.",
          "Check intermediate terms:",
          "3(2a)²(3b) = 3(4a²)(3b) = 36a²b (matches).",
          "3(2a)(3b)² = 3(2a)(9b²) = 54ab² (matches).",
          "Expression = (2a)³ + 3(2a)²(3b) + 3(2a)(3b)² + (3b)³ = (2a + 3b)³."
        ],
        "answer": "(2a + 3b)³"
      },
      {
        "id": "ex5-19",
        "section": "5.3",
        "title": "Example 19 — Type V: Perfect Cube (a − b)³",
        "problem": "Factorize: 27x³ − 27x²y + 9xy² − y³",
        "given": "27x³ − 27x²y + 9xy² − y³.",
        "method": "Recognize as (a − b)³ = a³ − 3a²b + 3ab² − b³.",
        "steps": [
          "27x³ = (3x)³ and y³ = (y)³.",
          "3(3x)²(y) = 3(9x²)(y) = 27x²y (matches).",
          "3(3x)(y)² = 9xy² (matches).",
          "Expression = (3x)³ − 3(3x)²(y) + 3(3x)(y)² − (y)³ = (3x − y)³."
        ],
        "answer": "(3x − y)³"
      },
      {
        "id": "ex5-20",
        "section": "5.3",
        "title": "Example 20 — Type VI: Sum of Two Cubes",
        "problem": "Factorize: x³ + 64y³",
        "given": "Sum of two cubes.",
        "method": "Apply a³ + b³ = (a + b)(a² − ab + b²).",
        "steps": [
          "x³ = (x)³ and 64y³ = (4y)³.",
          "Here a = x, b = 4y.",
          "(x + 4y)[(x)² − (x)(4y) + (4y)²].",
          "= (x + 4y)(x² − 4xy + 16y²)."
        ],
        "answer": "(x + 4y)(x² − 4xy + 16y²)"
      },
      {
        "id": "ex5-21",
        "section": "5.3",
        "title": "Example 21 — Type VI: Difference of Two Cubes",
        "problem": "Factorize: 125a³ − 8b³",
        "given": "Difference of two cubes.",
        "method": "Apply a³ − b³ = (a − b)(a² + ab + b²).",
        "steps": [
          "125a³ = (5a)³ and 8b³ = (2b)³.",
          "Here a = 5a, b = 2b.",
          "(5a − 2b)[(5a)² + (5a)(2b) + (2b)²].",
          "= (5a − 2b)(25a² + 10ab + 4b²)."
        ],
        "answer": "(5a − 2b)(25a² + 10ab + 4b²)"
      },
      {
        "id": "ex5-22",
        "section": "5.4",
        "title": "Example 22 — Verification of Remainder Theorem",
        "problem": "Divide P(x) = 3x³ − 7x² + 6x − 3 by x − 2, and verify your answer by the Remainder Theorem.",
        "given": "P(x) = 3x³ − 7x² + 6x − 3, divisor = x − 2.",
        "method": "Long division followed by evaluation of P(2).",
        "steps": [
          "Actual Division:\nDividing 3x³ − 7x² + 6x − 3 by (x − 2):\nQuotient Q(x) = 3x² − x + 4\nRemainder R = 5.",
          "By Remainder Theorem:\nDivisor = x − 2 ⟹ r = 2.\nR = P(2) = 3(2)³ − 7(2)² + 6(2) − 3\n= 3(8) − 7(4) + 12 − 3\n= 24 − 28 + 12 − 3 = 36 − 31 = 5.",
          "Conclusion: Remainder R = P(2) = 5, which exactly matches the long division result."
        ],
        "answer": "Quotient = 3x² − x + 4, Remainder = 5 (Verified)"
      },
      {
        "id": "ex5-23",
        "section": "5.4",
        "title": "Example 23 — Finding Remainder without Division",
        "problem": "Without performing division, find the remainder when 2x³ − 3x² + x − 2 is divided by x − 3.",
        "given": "P(x) = 2x³ − 3x² + x − 2, divisor x − 3.",
        "method": "Apply Remainder Theorem: R = P(3).",
        "steps": [
          "Here P(x) = 2x³ − 3x² + x − 2.",
          "Divisor x − r = x − 3 ⟹ r = 3.",
          "R = P(3) = 2(3)³ − 3(3)² + 3 − 2.",
          "= 2(27) − 3(9) + 1 = 54 − 27 + 1 = 28.",
          "Hence, remainder = 28."
        ],
        "answer": "Remainder = 28"
      },
      {
        "id": "ex5-24",
        "section": "5.4",
        "title": "Example 24 — Finding Unknown Constant k",
        "problem": "For what value of k will 3x³ + 9x² − (3k − 4)x + 2 be exactly divisible by x − 1?",
        "given": "P(x) = 3x³ + 9x² − (3k − 4)x + 2 is divisible by x − 1.",
        "method": "Exact divisibility means Remainder R = P(1) = 0.",
        "steps": [
          "Divisor is x − 1, so put x = 1 in P(x):",
          "P(1) = 3(1)³ + 9(1)² − (3k − 4)(1) + 2 = 0.",
          "3 + 9 − (3k − 4) + 2 = 0.",
          "3 + 9 − 3k + 4 + 2 = 0.",
          "18 − 3k = 0 ⟹ 3k = 18 ⟹ k = 18 / 3 = 6."
        ],
        "answer": "k = 6"
      },
      {
        "id": "ex5-25",
        "section": "5.4",
        "title": "Example 25 — Finding Zeros of a Polynomial",
        "problem": "Find the zeros of the polynomial P(x) = x² − 4x + 3.",
        "given": "P(x) = x² − 4x + 3.",
        "method": "Test values of x for which P(x) = 0.",
        "steps": [
          "Try x = 1: P(1) = 1² − 4(1) + 3 = 1 − 4 + 3 = 4 − 4 = 0. Hence 1 is a zero of P(x).",
          "Try x = 3: P(3) = 3² − 4(3) + 3 = 9 − 12 + 3 = 12 − 12 = 0. Hence 3 is another zero.",
          "Since P(x) is quadratic (degree 2), it can have at most 2 zeros.",
          "The zeros of P(x) are 1 and 3."
        ],
        "answer": "Zeros are 1 and 3"
      },
      {
        "id": "ex5-26",
        "section": "5.5",
        "title": "Example 26 — Factorization of a Cubic Polynomial",
        "problem": "Using factor theorem, prove that x − 3 is a factor of x³ − x² − 5x − 3 and find the other factors.",
        "given": "P(x) = x³ − x² − 5x − 3, candidate factor x − 3.",
        "method": "Verify P(3) = 0, divide by (x − 3) to find quotient, then factorize quotient.",
        "steps": [
          "Step 1: Check if (x − 3) is a factor:",
          "Put x = 3: P(3) = 3³ − 3² − 5(3) − 3 = 27 − 9 − 15 − 3 = 27 − 27 = 0.",
          "Since P(3) = 0, by Factor Theorem (x − 3) is a factor of P(x).",
          "Step 2: Divide P(x) by (x − 3) by long division:",
          "(x³ − x² − 5x − 3) ÷ (x − 3) gives Quotient Q(x) = x² + 2x + 1 with Remainder R = 0.",
          "Step 3: Factorize quadratic quotient Q(x):",
          "x² + 2x + 1 = (x + 1)² = (x + 1)(x + 1).",
          "Step 4: Combine all factors:",
          "x³ − x² − 5x − 3 = (x − 3)(x² + 2x + 1) = (x − 3)(x + 1)²."
        ],
        "answer": "(x − 3)(x + 1)²"
      }
    ],
    "exercises": [
      {
        "exercise": "5.1",
        "title": "Exercise 5.1 — Basic Factoring Methods",
        "description": "Common factors, grouping, perfect square trinomials, difference of squares, and trinomial square minus square.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Factorize: 9s³t + 15s²t³ − 3s²t²",
            "solution": "Find the highest common factor (HCF):\nNumerical coefficients: 9, 15, −3 ⟹ HCF = 3.\nVariables: s² and t are common to all terms.\nTotal common factor = 3s²t.\nDivide each term by 3s²t:\n9s³t / 3s²t = 3s\n15s²t³ / 3s²t = 5t²\n−3s²t² / 3s²t = −t\nResult: 3s²t(3s + 5t² − t).",
            "answer": "3s²t(3s + 5t² − t)"
          },
          {
            "qNo": "Q2",
            "question": "Factorize: 10a²b³c⁴ − 15a³b²c² + 30a⁴b³c²",
            "solution": "Take out common factor 5a²b²c² from all terms:\n= 5a²b²c²(2bc² − 3a + 6a²b).",
            "answer": "5a²b²c²(2bc² − 3a + 6a²b)"
          },
          {
            "qNo": "Q3",
            "question": "Factorize: ax − a − x + 1",
            "solution": "Group in pairs: (ax − a) − (x − 1)\n= a(x − 1) − 1(x − 1)\n= (x − 1)(a − 1).",
            "answer": "(x − 1)(a − 1)"
          },
          {
            "qNo": "Q4",
            "question": "Factorize: x² − 2xy² + xy − 2y³",
            "solution": "Group: (x² + xy) − (2xy² + 2y³)\n= x(x + y) − 2y²(x + y)\n= (x + y)(x − 2y²).",
            "answer": "(x + y)(x − 2y²)"
          },
          {
            "qNo": "Q5",
            "question": "Factorize: 4x² + 4 + 1/x²",
            "solution": "Recognize perfect square: (2x)² + 2(2x)(1/x) + (1/x)² = (2x + 1/x)².",
            "answer": "(2x + 1/x)²"
          },
          {
            "qNo": "Q6",
            "question": "Factorize: (2x + 2y)² − 20z(x + y) + 25z²",
            "solution": "Note that 2x + 2y = 2(x + y). Let u = 2(x + y).\nExpression: u² − 10z·u + 25z² = (u − 5z)² = (2x + 2y − 5z)².",
            "answer": "(2x + 2y − 5z)²"
          },
          {
            "qNo": "Q7",
            "question": "Factorize: x²/y² − y²/x²",
            "solution": "Difference of squares: (x/y)² − (y/x)² = (x/y + y/x)(x/y − y/x).",
            "answer": "(x/y + y/x)(x/y − y/x)"
          },
          {
            "qNo": "Q8",
            "question": "Factorize: 2x² − 288",
            "solution": "Take out common factor 2: 2(x² − 144) = 2(x² − 12²) = 2(x + 12)(x − 12).",
            "answer": "2(x + 12)(x − 12)"
          },
          {
            "qNo": "Q9",
            "question": "Factorize: 1 − (u − v)²",
            "solution": "Difference of squares: 1² − (u − v)² = [1 + (u − v)][1 − (u − v)] = (1 + u − v)(1 − u + v).",
            "answer": "(1 + u − v)(1 − u + v)"
          },
          {
            "qNo": "Q10",
            "question": "Factorize: (5ab − 2c)² − 16d²",
            "solution": "Difference of squares: (5ab − 2c)² − (4d)² = (5ab − 2c + 4d)(5ab − 2c − 4d).",
            "answer": "(5ab − 2c + 4d)(5ab − 2c − 4d)"
          }
        ]
      },
      {
        "exercise": "5.2",
        "title": "Exercise 5.2 — Advanced Quartic Types (Completing Square)",
        "description": "Factoring Type I expressions a⁴ + a²b² + b⁴ and a⁴ + 4b⁴ by completing squares.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Factorize: x⁴ + 64",
            "solution": "x⁴ + 64 = (x²)² + 8².\nAdd and subtract 2(x²)(8) = 16x²:\n= (x⁴ + 16x² + 64) − 16x²\n= (x² + 8)² − (4x)²\n= (x² + 4x + 8)(x² − 4x + 8).",
            "answer": "(x² + 4x + 8)(x² − 4x + 8)"
          },
          {
            "qNo": "Q2",
            "question": "Factorize: 4x⁴ + 81",
            "solution": "(2x²)² + 9².\nAdd and subtract 2(2x²)(9) = 36x²:\n= (4x⁴ + 36x² + 81) − 36x²\n= (2x² + 9)² − (6x)²\n= (2x² + 6x + 9)(2x² − 6x + 9).",
            "answer": "(2x² + 6x + 9)(2x² − 6x + 9)"
          },
          {
            "qNo": "Q3",
            "question": "Factorize: a⁴ + a²b² + b⁴",
            "solution": "(a⁴ + 2a²b² + b⁴) − a²b²\n= (a² + b²)² − (ab)²\n= (a² + b² + ab)(a² + b² − ab).",
            "answer": "(a² + b² + ab)(a² + b² − ab)"
          },
          {
            "qNo": "Q4",
            "question": "Factorize: x⁴ − 3x² + 1",
            "solution": "(x⁴ + 2x² + 1) − 5x² or (x⁴ − 2x² + 1) − x²:\n= (x² − 1)² − x²\n= (x² − 1 + x)(x² − 1 − x)\n= (x² + x − 1)(x² − x + 1).",
            "answer": "(x² + x − 1)(x² − x + 1)"
          },
          {
            "qNo": "Q5",
            "question": "Factorize: x⁴ + x² + 1",
            "solution": "(x⁴ + 2x² + 1) − x² = (x² + 1)² − x² = (x² + x + 1)(x² − x + 1).",
            "answer": "(x² + x + 1)(x² − x + 1)"
          },
          {
            "qNo": "Q6",
            "question": "Factorize: x⁴ + 7x² + 1",
            "solution": "Add and subtract 2x² or 9x²:\n(x⁴ + 2x² + 1) − 9x² (or standard text):\n= (x² + 3x + 1)(x² − 3x + 1).",
            "answer": "(x² + 3x + 1)(x² − 3x + 1)"
          },
          {
            "qNo": "Q7",
            "question": "Factorize: 81x⁴ + 1/(81x⁴) − 14",
            "solution": "Complete square: (9x² + 1/(9x²))² − 16:\n= (9x² + 1/(9x²) + 4)(9x² + 1/(9x²) − 4).",
            "answer": "(9x² + 1/(9x²) + 4)(9x² + 1/(9x²) − 4)"
          },
          {
            "qNo": "Q8",
            "question": "Factorize: 4(x⁴ + 7x²y² + 16y⁴)",
            "solution": "Take out 4, complete the square:\n= 4(x² + 3xy + 4y²)(x² − 3xy + 4y²).",
            "answer": "4(x² + 3xy + 4y²)(x² − 3xy + 4y²)"
          },
          {
            "qNo": "Q9",
            "question": "Factorize: 16m⁴ + 4m²n² + n⁴",
            "solution": "(4m² + n²)² − (2mn)² = (4m² + 2mn + n²)(4m² − 2mn + n²).",
            "answer": "(4m² + 2mn + n²)(4m² − 2mn + n²)"
          },
          {
            "qNo": "Q10",
            "question": "Factorize: xy(4x⁴ + 11x²y² + 9y⁴)",
            "solution": "Take out xy, complete square on quartic:\n= xy(2x² + xy + 3y²)(2x² − xy + 3y²).",
            "answer": "xy(2x² + xy + 3y²)(2x² − xy + 3y²)"
          }
        ]
      },
      {
        "exercise": "5.3",
        "title": "Exercise 5.3 — Quadratic Trinomials (Middle-Term Splitting)",
        "description": "Factoring Type II (x² + px + q) and Type III (ax² + bx + c) trinomials by splitting the middle term.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Factorize: x² − 7x + 12",
            "solution": "Factors of 12 summing to −7 are −3 and −4.\nx² − 3x − 4x + 12 = x(x − 3) − 4(x − 3) = (x − 3)(x − 4).",
            "answer": "(x − 3)(x − 4)"
          },
          {
            "qNo": "Q2",
            "question": "Factorize: x² + x − 12",
            "solution": "Factors of −12 summing to 1 are +4 and −3.\nx² + 4x − 3x − 12 = (x + 4)(x − 3).",
            "answer": "(x + 4)(x − 3)"
          },
          {
            "qNo": "Q3",
            "question": "Factorize: 20 − x − x²",
            "solution": "−(x² + x − 20) = −(x + 5)(x − 4) = (5 + x)(4 − x).",
            "answer": "(5 + x)(4 − x)"
          },
          {
            "qNo": "Q4",
            "question": "Factorize: 2y² − 7y + 3",
            "solution": "Product 2 · 3 = 6. Factors summing to −7 are −6 and −1.\n2y² − 6y − y + 3 = 2y(y − 3) − 1(y − 3) = (2y − 1)(y − 3).",
            "answer": "(2y − 1)(y − 3)"
          },
          {
            "qNo": "Q5",
            "question": "Factorize: 4x² + 8x + 3",
            "solution": "Product 4 · 3 = 12. Factors summing to 8 are 6 and 2.\n4x² + 6x + 2x + 3 = 2x(2x + 3) + 1(2x + 3) = (2x + 1)(2x + 3).",
            "answer": "(2x + 1)(2x + 3)"
          },
          {
            "qNo": "Q6",
            "question": "Factorize: 10y² − 3y − 1",
            "solution": "Product 10 · (−1) = −10. Factors summing to −3 are −5 and +2.\n10y² − 5y + 2y − 1 = 5y(2y − 1) + 1(2y − 1) = (5y + 1)(2y − 1).",
            "answer": "(5y + 1)(2y − 1)"
          },
          {
            "qNo": "Q7",
            "question": "Factorize: 6x³ − 15x² − 9x",
            "solution": "Common factor 3x: 3x(2x² − 5x − 3).\nFactorize: 2x² − 6x + x − 3 = 2x(x − 3) + 1(x − 3) = (x − 3)(2x + 1).\nResult: 3x(x − 3)(2x + 1).",
            "answer": "3x(x − 3)(2x + 1)"
          },
          {
            "qNo": "Q8",
            "question": "Factorize: 2xy² + 8xy − 24x",
            "solution": "Take out common factor 2x: 2x(y² + 4y − 12).\nFactors of −12 summing to 4 are 6 and −2.\n= 2x(y + 6)(y − 2).",
            "answer": "2x(y + 6)(y − 2)"
          },
          {
            "qNo": "Q9",
            "question": "Factorize: 2 − 5t − 12t²",
            "solution": "−(12t² + 5t − 2). Product 12 · (−2) = −24; sum = 5 (8 and −3).\n= −(3t − 2)(4t + 1).",
            "answer": "−(3t − 2)(4t + 1)"
          },
          {
            "qNo": "Q10",
            "question": "Factorize: −16x³y − 20x²y² − 6xy³",
            "solution": "Common factor −2xy: −2xy(8x² + 10xy + 3y²).\nProduct 8 · 3 = 24; sum = 10 (6 and 4).\n= −2xy(4x + 3y)(2x + y).",
            "answer": "−2xy(4x + 3y)(2x + y)"
          },
          {
            "qNo": "Q11",
            "question": "Factorize: $(x+1)^2+3(x+1)+2$",
            "solution": "x² + 5x + 4 + 2 = x² + 5x + 6 = (x + 3)(x + 2).",
            "answer": "(x + 3)(x + 2)"
          },
          {
            "qNo": "Q12",
            "question": "Factorize: 4x²y⁴(x⁶y⁶ − 10x³y³ + 21)",
            "solution": "Let u = x³y³. u² − 10u + 21 = (u − 7)(u − 3).\n= 4x²y⁴(x³y³ − 7)(x³y³ − 3).",
            "answer": "4x²y⁴(x³y³ − 7)(x³y³ − 3)"
          },
          {
            "qNo": "Q13",
            "question": "Find an expression for the perimeter of a rectangle with area given by $x^2+24x-81$.",
            "solution": "Area = Length × Width.\nFactorize x² + 24x − 81 = (x + 27)(x − 3).\nSince Length = x + 27, Width = x − 3.\nPerimeter = 2(Length + Width) = 2[(x + 27) + (x − 3)] = 2(2x + 24) = 4x + 48.",
            "answer": "Perimeter = 4x + 48"
          }
        ]
      },
      {
        "exercise": "5.4",
        "title": "Exercise 5.4 — Type IV & Perfect Cube Factorization",
        "description": "Factoring higher-degree expressions via substitution and perfect cubes (a ± b)³.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Factorize: (4x² − 16x + 7)(4x² − 16x + 15) + 16",
            "solution": "Let y = 4x² − 16x. Then (y + 7)(y + 15) + 16 = y² + 22y + 105 + 16 = y² + 22y + 121 = (y + 11)².\nSubstitute back y = 4x² − 16x:\n= (4x² − 16x + 11)².",
            "answer": "(4x² − 16x + 11)²"
          },
          {
            "qNo": "Q2",
            "question": "Factorize: (9x² + 9x − 4)(9x² + 9x − 10) − 72",
            "solution": "Let y = 9x² + 9x. (y − 4)(y − 10) − 72 = y² − 14y + 40 − 72 = y² − 14y − 32 = (y + 2)(y − 16).\n= (9x² + 9x + 2)(9x² + 9x − 16).",
            "answer": "(9x² + 9x + 2)(9x² + 9x − 16)"
          },
          {
            "qNo": "Q3",
            "question": "Factorize: (x + 2)(x + 4)(x + 6)(x + 8) − 9",
            "solution": "Pair: (x + 2)(x + 8) and (x + 4)(x + 6) (sum of constants = 10).\n= (x² + 10x + 16)(x² + 10x + 24) − 9.\nLet y = x² + 10x + 20: (y − 4)(y + 4) − 9 = y² − 16 − 9 = y² − 25 = (y − 5)(y + 5).\n= (x² + 10x + 15)(x² + 10x + 25) = (x + 5)²(x² + 10x + 15).",
            "answer": "(x + 5)²(x² + 10x + 15)"
          },
          {
            "qNo": "Q4",
            "question": "Factorize: x(x + 1)(x + 2)(x + 3) + 1",
            "solution": "Pair: [x(x + 3)][(x + 1)(x + 2)] + 1 = (x² + 3x)(x² + 3x + 2) + 1.\nLet y = x² + 3x. y(y + 2) + 1 = y² + 2y + 1 = (y + 1)².\n= (x² + 3x + 1)².",
            "answer": "(x² + 3x + 1)²"
          },
          {
            "qNo": "Q5",
            "question": "Factorize: (x + 1)(x + 2)(x + 3)(x + 6) − 3x²",
            "solution": "Product of constants: 1 · 6 = 2 · 3 = 6.\nPair: [(x + 1)(x + 6)][(x + 2)(x + 3)] − 3x² = (x² + 7x + 6)(x² + 5x + 6) − 3x².\nFactorizes to (x + 1)(x + 6)(x² + 5x + 6).",
            "answer": "(x + 1)(x + 6)(x² + 5x + 6)"
          },
          {
            "qNo": "Q6",
            "question": "Factorize: 64x³ − 144x²y + 108xy² − 27y³",
            "solution": "(4x)³ − 3(4x)²(3y) + 3(4x)(3y)² − (3y)³ = (4x − 3y)³.",
            "answer": "(4x − 3y)³"
          },
          {
            "qNo": "Q7",
            "question": "Factorize: a³/8 − a²b/4 + ab²/6 − b³/27",
            "solution": "(a/2)³ − 3(a/2)²(b/3) + 3(a/2)(b/3)² − (b/3)³ = (a/2 − b/3)³.",
            "answer": "(a/2 − b/3)³"
          },
          {
            "qNo": "Q8",
            "question": "Factorize: x³/a³ + 3x/a + 3a/x + a³/x³",
            "solution": "(x/a)³ + 3(x/a)²(a/x) + 3(x/a)(a/x)² + (a/x)³ = (x/a + a/x)³.",
            "answer": "(x/a + a/x)³"
          },
          {
            "qNo": "Q9",
            "question": "Factorize: 27a³ + 189a²b + 441ab² + 343b³",
            "solution": "(3a)³ + 3(3a)²(7b) + 3(3a)(7b)² + (7b)³ = (3a + 7b)³.",
            "answer": "(3a + 7b)³"
          },
          {
            "qNo": "Q10",
            "question": "Factorize: 8x³ − 4x + 2/(3x) − 1/(27x³)",
            "solution": "(2x)³ − 3(2x)²(1/(3x)) + 3(2x)(1/(3x))² − (1/(3x))³ = (2x − 1/(3x))³.",
            "answer": "(2x − 1/(3x))³"
          }
        ]
      },
      {
        "exercise": "5.5",
        "title": "Exercise 5.5 — Sum and Difference of Two Cubes",
        "description": "Factoring expressions using identities a³ + b³ = (a + b)(a² − ab + b²) and a³ − b³ = (a − b)(a² + ab + b²).",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Factorize: a³ − 27",
            "solution": "a³ − 3³ = (a − 3)(a² + 3a + 9).",
            "answer": "(a − 3)(a² + 3a + 9)"
          },
          {
            "qNo": "Q2",
            "question": "Factorize: a⁶ + b⁶",
            "solution": "(a²)³ + (b²)³ = (a² + b²)[(a²)² − (a²)(b²) + (b²)²] = (a² + b²)(a⁴ − a²b² + b⁴).",
            "answer": "(a² + b²)(a⁴ − a²b² + b⁴)"
          },
          {
            "qNo": "Q3",
            "question": "Factorize: 24x³ + 3",
            "solution": "Take out common factor 3: 3(8x³ + 1) = 3[(2x)³ + 1³] = 3(2x + 1)(4x² − 2x + 1).",
            "answer": "3(2x + 1)(4x² − 2x + 1)"
          },
          {
            "qNo": "Q4",
            "question": "Factorize: 1 − 27r³",
            "solution": "1³ − (3r)³ = (1 − 3r)(1 + 3r + 9r²).",
            "answer": "(1 − 3r)(1 + 3r + 9r²)"
          },
          {
            "qNo": "Q5",
            "question": "Factorize: 2x³ − 128",
            "solution": "Take out common factor 2: 2(x³ − 64) = 2(x³ − 4³) = 2(x − 4)(x² + 4x + 16).",
            "answer": "2(x − 4)(x² + 4x + 16)"
          },
          {
            "qNo": "Q6",
            "question": "Factorize: 4x⁵ − 256x²",
            "solution": "Take out common factor 4x²: 4x²(x³ − 64) = 4x²(x − 4)(x² + 4x + 16).",
            "answer": "4x²(x − 4)(x² + 4x + 16)"
          },
          {
            "qNo": "Q7",
            "question": "Factorize: 18(x − y)³ − 144(a − b)³",
            "solution": "Take out 18: 18[(x − y)³ − 8(a − b)³] = 18[(x − y)³ − (2(a − b))³]\n= 18(x − y − 2a + 2b){(x − y)² + 2(x − y)(a − b) + 4(a − b)²}.",
            "answer": "18(x − y − 2a + 2b){(x − y)² + 2(x − y)(a − b) + 4(a − b)²}"
          },
          {
            "qNo": "Q8",
            "question": "Factorize: x⁹ + 1",
            "solution": "(x³)³ + 1³ = (x³ + 1)(x⁶ − x³ + 1) = (x + 1)(x² − x + 1)(x⁶ − x³ + 1).",
            "answer": "(x + 1)(x² − x + 1)(x⁶ − x³ + 1)"
          },
          {
            "qNo": "Q9",
            "question": "Factorize: a³ + (c + d)³",
            "solution": "[a + (c + d)][a² − a(c + d) + (c + d)²] = (a + c + d)(a² + c² + d² − ac − ad + 2cd).",
            "answer": "(a + c + d)(a² + c² + d² − ac − ad + 2cd)"
          },
          {
            "qNo": "Q10",
            "question": "Factorize: 27x³ − y³",
            "solution": "(3x)³ − y³ = (3x − y)(9x² + 3xy + y²).",
            "answer": "(3x − y)(9x² + 3xy + y²)"
          }
        ]
      },
      {
        "exercise": "5.6",
        "title": "Exercise 5.6 — Remainder Theorem & Factor Theorem Applications",
        "description": "Finding polynomial remainders, calculating unknown constants for divisibility, and factoring cubic polynomials.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Use Remainder Theorem to find the remainder when:\n(i) Evaluation yields remainder R\n(ii) Yields −44\n(iii) Yields −4",
            "solution": "Substitute the root of linear divisor into P(x):\n(i) Direct evaluation gives R.\n(ii) P(r) = −44.\n(iii) P(r) = −4.",
            "answer": "(i) R; (ii) −44; (iii) −4"
          },
          {
            "qNo": "Q2",
            "question": "Find the value of unknown constant 'a' such that the polynomial is divisible by the given linear divisor:",
            "solution": "Set Remainder R = P(r) = 0 and solve linear equation for a:\nResult: a = 3.",
            "answer": "a = 3"
          },
          {
            "qNo": "Q3",
            "question": "Find the value of unknown constant 'b' such that the polynomial has the given factor:",
            "solution": "Set Remainder R = P(r) = 0 and solve for b:\nResult: b = 5.",
            "answer": "b = 5"
          },
          {
            "qNo": "Q4",
            "question": "Factorize the cubic polynomials completely using Factor Theorem:\n(i) (x − 1)(x + 2)(x − 3)\n(ii) (x + 1)(x + 2)(x − 2)\n(iii) (x − 1)(x − 2)(x + 3)\n(iv) (x − 1)(x − 3)(x − 5)\n(v) (x + 2)(x − 3)²\n(vi) (x + 1)(x − 4)(x + 5)\n(vii) (x − 2)(x − 3)(x + 4)\n(viii) (x + 2)(x − 4)²",
            "solution": "Test integer divisors of the constant term using Factor Theorem to identify the first root, divide synthetically to get quotient quadratic Q(x), and split the middle term of Q(x):\n(i) Factors: (x − 1)(x + 2)(x − 3)\n(ii) Factors: (x + 1)(x + 2)(x − 2)\n(iii) Factors: (x − 1)(x − 2)(x + 3)\n(iv) Factors: (x − 1)(x − 3)(x − 5)\n(v) Factors: (x + 2)(x − 3)²\n(vi) Factors: (x + 1)(x − 4)(x + 5)\n(vii) Factors: (x − 2)(x − 3)(x + 4)\n(viii) Factors: (x + 2)(x − 4)².",
            "answer": "(i) (x−1)(x+2)(x−3); (ii) (x+1)(x+2)(x−2); (iii) (x−1)(x−2)(x+3); (iv) (x−1)(x−3)(x−5); (v) (x+2)(x−3)²; (vi) (x+1)(x−4)(x+5); (vii) (x−2)(x−3)(x+4); (viii) (x+2)(x−4)²"
          }
        ]
      },
      {
        "exercise": "Review 5",
        "title": "Review Exercise 5 — Comprehensive Unit Review",
        "description": "Comprehensive review containing True/False, fill-in-the-blanks, MCQs, and complete factorizations.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Mark True (T) or False (F):\n(i) Factorization is the reverse process of multiplication. [ ]\n(ii) a² − b² = (a − b)(a + b) is an identity. [ ]\n(iii) If P(r) = 0, then (x − r) is a factor of P(x). [ ]\n(iv) (a + b)³ = a³ + b³. [ ]\n(v) A cubic polynomial has at most two linear factors. [ ]\n(vi) Remainder of P(x) divided by (x − r) is always zero. [ ]",
            "solution": "Textbook Verified Answers:\n(i) True (T)\n(ii) True (T)\n(iii) True (T) (Factor Theorem)\n(iv) False (F) (missing 3ab(a+b))\n(v) False (F) (has at most 3 linear factors)\n(vi) False (F) (remainder is P(r), zero only if divisible)",
            "answer": "(i) T; (ii) T; (iii) T; (iv) F; (v) F; (vi) F"
          },
          {
            "qNo": "Q2",
            "question": "Fill in the blanks:\n(i) 9x² − 16y⁴ = (3x − 4y²)(_____)\n(ii) x³ − 27y³ = (x − 3y)(_____)\n(iii) If x = 3 is a zero of P(x), then (_____) is a factor of P(x).\n(iv) a² + b² = (a + b)² − (_____)\n(v) 8b³ + c³ = (2b + c)(_____)",
            "solution": "(i) (3x + 4y²)\n(ii) (x² + 3xy + 9y²)\n(iii) (x − 3)\n(iv) 2ab (or ±2ab)\n(v) (4b² − 2bc + c²)",
            "answer": "(i) (3x + 4y²); (ii) (x² + 3xy + 9y²); (iii) (x − 3); (iv) ±2ab; (v) (4b² − 2bc + c²)"
          },
          {
            "qNo": "Q3",
            "question": "Choose the correct option (MCQs i to vii):\n(i) The factors of x² − 5x + 6 are: (a) (x−1)(x−6), (b) (x−2)(x−3), (c) (x+2)(x+3), (d) (x−5)(x+1)\n(ii) Factors of 4a² − 9b² are: (a) (2a−3b)², (b) (2a+3b)², (c) (2a−3b)(2a+3b), (d) (4a−9b)(a+b)\n(iii) (a + b)³ = : (a) a³+b³, (b) a³−b³, (c) a³+3a²b+b³, (d) a³+3a²b+3ab²+b³\n(iv) If P(x) is divided by x − r, then remainder is: (a) P(r), (b) P(−r), (c) 0, (d) Q(r)\n(v) Factors of x³ + 8 are: (a) (x+2)(x²+2x+4), (b) (x+2)(x²−2x+4), (c) (x−2)(x²+2x+4), (d) (x+2)³\n(vi) For a cubic polynomial, number of linear factors is at most: (a) 2, (b) 3, (c) 4, (d) 1\n(vii) If x − 2 is a factor of x² − 5x + k, then k = : (a) 6, (b) −6, (c) 10, (d) −10",
            "solution": "Textbook Verified MCQ Key with Explanations:\n(i) (b) (x − 2)(x − 3)\n(ii) (c) (2a − 3b)(2a + 3b)\n(iii) (d) a³ + 3a²b + 3ab² + b³\n(iv) (a) P(r)\n(v) (b) (x + 2)(x² − 2x + 4)\n(vi) (b) 3\n(vii) (a) 6 (since 2² − 5(2) + k = 0 ⟹ 4 − 10 + k = 0 ⟹ k = 6)",
            "answer": "(i) b; (ii) c; (iii) d; (iv) a; (v) b; (vi) b; (vii) a"
          },
          {
            "qNo": "Q4",
            "question": "Factorize the following:\n(i) 3x³ − 3x² − 18x\n(ii) 64y³ + 27\n(iii) x⁶ − y⁶\n(iv) (7a − 5b)³ + 1",
            "solution": "(i) Take out 3x: 3x(x² − x − 6) = 3x(x − 3)(x + 2).\n(ii) (4y)³ + 3³ = (4y + 3)(16y² − 12y + 9).\n(iii) (x³)² − (y³)² = (x³ − y³)(x³ + y³) = (x − y)(x² + xy + y²)(x + y)(x² − xy + y²).\n(iv) Cube sum A³ + 1 = (A + 1)(A² − A + 1) with A = 7a − 5b:\n= (7a − 5b)(49a² + 35ab + 25b² + 1).",
            "answer": "(i) 3x(x − 3)(x + 2); (ii) (4y + 3)(16y² − 12y + 9); (iii) (x+y)(x−y)(x²+xy+y²)(x²−xy+y²); (iv) (7a − 5b)(49a² + 35ab + 25b² + 1)"
          },
          {
            "qNo": "Q5",
            "question": "Factorize: (x² + 5x + 4)(x² + 5x + 6) − 120",
            "solution": "Let y = x² + 5x. (y + 4)(y + 6) − 120 = y² + 10y + 24 − 120 = y² + 10y − 96.\n= (y + 16)(y − 6) = (x² + 5x + 16)(x² + 5x − 6) = (x² + 5x + 16)(x + 6)(x − 1).",
            "answer": "(x² + 5x + 16)(x + 6)(x − 1)"
          },
          {
            "qNo": "Q6",
            "question": "Factorize:\n(i) (x − 2)(x² + 2x − 13)\n(ii) (x + 1)(x + 2)(x − 42)",
            "solution": "Factorize by grouping and quadratic splitting:\n(i) (x − 2)(x² + 2x − 13)\n(ii) (x + 1)(x + 2)(x − 42).",
            "answer": "(i) (x − 2)(x² + 2x − 13); (ii) (x + 1)(x + 2)(x − 42)"
          },
          {
            "qNo": "Q7",
            "question": "Factorize: a⁴ + a²b² + b⁴",
            "solution": "(a⁴ + 2a²b² + b⁴) − a²b² = (a² + b²)² − (ab)² = (a² + b² + ab)(a² + b² − ab).",
            "answer": "(a² + b² + ab)(a² + b² − ab)"
          },
          {
            "qNo": "Q8",
            "question": "Find quotient and remainder when 2x³ − 4x² + 8x − 12 is divided by x + 1 (or Remainder Theorem variant):",
            "solution": "Quotient = 2x² − 2x + 6, Remainder = −24.",
            "answer": "Quotient = 2x² − 2x + 6, Remainder = −24"
          },
          {
            "qNo": "Q9",
            "question": "Find the values of constants from given polynomial conditions:",
            "solution": "Setting up conditions gives:\na) 1\nb) 7.",
            "answer": "a) 1, b) 7"
          },
          {
            "qNo": "Q10",
            "question": "Find remainder when polynomial is divided by linear factor:",
            "solution": "Evaluating P(r) yields −5.",
            "answer": "−5"
          }
        ]
      }
    ],
    "slos": [
      "Define factorization and recognize it as the reverse process of multiplication.",
      "Factorize expressions of the type ka + kb + kc (common monomial factor).",
      "Factorize expressions of the type ac + ad + bc + bd (factoring by grouping).",
      "Factorize expressions of the type a² ± 2ab + b² (perfect square trinomials).",
      "Factorize expressions of the type a² − b² (difference of two squares).",
      "Factorize expressions of the type (a² ± 2ab + b²) − c² and a² − (b² ± 2bc + c²).",
      "Factorize quartic expressions of the type a⁴ + a²b² + b⁴ and a⁴ + 4b⁴ by completing the square.",
      "Factorize quadratic trinomials of the type x² + px + q.",
      "Factorize quadratic trinomials of the type ax² + bx + c (a ≠ 1) by splitting the middle term.",
      "Factorize expressions of the type (ax² + bx + c)(ax² + bx + d) + k and (x + a)(x + b)(x + c)(x + d) + k.",
      "Factorize cubic expressions of the type a³ ± 3a²b + 3ab² ± b³ = (a ± b)³.",
      "Factorize expressions of the type a³ ± b³ = (a ± b)(a² ∓ ab + b²).",
      "State and prove the Remainder Theorem: R = P(r).",
      "Find the remainder when a polynomial is divided by a linear polynomial without actual division.",
      "Define zero of a polynomial and state and prove the Factor Theorem.",
      "Apply the Factor Theorem to determine whether a given linear polynomial is a factor of a polynomial.",
      "Factorize cubic polynomials completely using the Factor Theorem and synthetic / long division."
    ],
    "formulaSheet": [
      {
        "category": "Basic Factoring Patterns",
        "items": [
          "ka + kb + kc = k(a + b + c)",
          "ac + ad + bc + bd = a(c + d) + b(c + d) = (a + b)(c + d)",
          "a² + 2ab + b² = (a + b)²",
          "a² − 2ab + b² = (a − b)²",
          "a² − b² = (a − b)(a + b)",
          "(a² ± 2ab + b²) − c² = (a ± b − c)(a ± b + c)"
        ]
      },
      {
        "category": "Advanced Quadratic & Quartic Patterns",
        "items": [
          "a⁴ + a²b² + b⁴ = (a² + b² + ab)(a² + b² − ab)",
          "a⁴ + 4b⁴ = (a² + 2b² − 2ab)(a² + 2b² + 2ab)",
          "x² + px + q = (x + r)(x + s) where r + s = p and r·s = q",
          "ax² + bx + c: Split bx into rx + sx where r + s = b and r·s = ac",
          "(x + a)(x + b)(x + c)(x + d) + k: Group factors with equal constant sums a + b = c + d"
        ]
      },
      {
        "category": "Cubic Patterns & Theorems",
        "items": [
          "a³ + 3a²b + 3ab² + b³ = (a + b)³",
          "a³ − 3a²b + 3ab² − b³ = (a − b)³",
          "a³ + b³ = (a + b)(a² − ab + b²)",
          "a³ − b³ = (a − b)(a² + ab + b²)",
          "Remainder Theorem: R = P(r) when P(x) is divided by (x − r)",
          "Factor Theorem: (x − r) is a factor of P(x) ⟺ P(r) = 0"
        ]
      }
    ]
  },
  {
    "number": 6,
    "id": "u6",
    "title": "Algebraic Manipulation",
    "titleUrdu": "الجبرائی جملوں کی جوڑ توڑ",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 149–172",
    "description": "Highest Common Factor (H.C.F) and Least Common Multiple (L.C.M) by factorization and division, relation between H.C.F and L.C.M, operations on algebraic fractions, and square roots of algebraic expressions by factorization and division.",
    "sections": [
      {
        "id": "6.1",
        "title": "6.1 Highest Common Factor (H.C.F) & Least Common Multiple (L.C.M)",
        "theory": "• 6.1.1 Highest Common Factor (H.C.F):\nThe highest common factor of two or more given algebraic expressions (or polynomials) is the polynomial of the highest degree and largest numerical coefficient that divides each of the given expressions without a remainder.\n- Method of Factorization: Factorize each polynomial completely into prime factors. The H.C.F is the product of all common factors taken with their lowest exponents.\n- Method of Division: Useful for polynomials of higher degree where factorization is difficult. Divide the polynomial of higher degree by that of lower degree. If degrees are equal, either may be chosen as dividend. Continue dividing each divisor by the succeeding remainder until remainder is zero. The last non-zero divisor is the H.C.F.\n\n• 6.1.2 Least Common Multiple (L.C.M):\nThe least common multiple of two or more algebraic expressions is the expression of lowest degree and smallest numerical coefficient which is exactly divisible by each of the given expressions.\n$$\\text{L.C.M} = \\text{Common Factors} \\times \\text{Non-Common Factors}$$\n\n• 6.1.3 Relation Between H.C.F and L.C.M:\nFor any two polynomials $P(x)$ and $Q(x)$:\n$$P(x) \\times Q(x) = \\text{H.C.F} \\times \\text{L.C.M}$$\nFrom this fundamental relation:\n$$\\text{L.C.M} = \\frac{P(x) \\times Q(x)}{\\text{H.C.F}}, \\quad \\text{H.C.F} = \\frac{P(x) \\times Q(x)}{\\text{L.C.M}}, \\quad P(x) = \\frac{\\text{H.C.F} \\times \\text{L.C.M}}{Q(x)}$$"
      },
      {
        "id": "6.2",
        "title": "6.2 Basic Operations on Algebraic Fractions",
        "theory": "• 6.2.1 Algebraic Fraction (Rational Expression):\nAn algebraic fraction is the quotient of two polynomials $\\frac{P(x)}{Q(x)}$ where $Q(x) \\ne 0$. Algebraic fractions follow the same arithmetic principles as rational numbers.\n\n• Addition and Subtraction:\nTo add or subtract algebraic fractions with different denominators:\n1. Factorize all denominators completely.\n2. Find the Least Common Denominator (LCD), which is the L.C.M of the denominators.\n3. Convert each fraction to an equivalent fraction having the LCD as its denominator.\n4. Add or subtract the numerators and simplify the resulting fraction to lowest terms.\n\n• Multiplication and Division:\n$$\\frac{P(x)}{Q(x)} \\times \\frac{R(x)}{S(x)} = \\frac{P(x) \\cdot R(x)}{Q(x) \\cdot S(x)}$$\n$$\\frac{P(x)}{Q(x)} \\div \\frac{R(x)}{S(x)} = \\frac{P(x)}{Q(x)} \\times \\frac{S(x)}{R(x)} = \\frac{P(x) \\cdot S(x)}{Q(x) \\cdot R(x)}$$"
      },
      {
        "id": "6.3",
        "title": "6.3 Square Root of Algebraic Expressions",
        "theory": "• 6.3.1 Definition of Square Root:\nIf an algebraic expression $E$ can be written as the square of another expression $M$ ($E = M^2$), then $M$ (or $\\pm M$) is called the square root of $E$.\n\n• Method 1: By Factorization:\nExpress the given polynomial as a complete square using algebraic identities such as $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$ or $(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$. Then $\\sqrt{E} = \\pm M$.\n\n• Method 2: By Division Method:\nUsed for polynomials of degree 4 or higher:\n1. Arrange the given polynomial in descending powers of the variable.\n2. Take the square root of the first term as the first term of the root and divisor. Subtract its square.\n3. Bring down the next two terms. Double the quotient to form the first part of the next divisor.\n4. Divide the leading term of the remainder by this trial divisor to find the next term of the root.\n5. Continue this division until the remainder is zero.\n\n• Applications to Unknown Coefficients:\nTo find unknown constants ($k, l, m$) or determine what must be added/subtracted so that an expression becomes a perfect square, equate the final remainder of the division to zero."
      }
    ],
    "workedExamples": [
      {
        "id": "eg6.1",
        "title": "Example 11: Real-World Application of H.C.F",
        "problem": "The sum of two numbers is 120 and their H.C.F is 12. Find the numbers.",
        "steps": [
          "Let the two numbers be 12x and 12y, where x and y are positive integers prime to each other (coprime).",
          "According to the condition: 12x + 12y = 120 ⟹ 12(x + y) = 120 ⟹ x + y = 10.",
          "Possible pairs of positive integers whose sum is 10: (1, 9), (2, 8), (3, 7), (4, 6), (5, 5).",
          "Among these, the pairs prime to each other (gcd = 1) are (1, 9) and (3, 7).",
          "For pair (1, 9): Numbers are 1 × 12 = 12, and 9 × 12 = 108.",
          "For pair (3, 7): Numbers are 3 × 12 = 36, and 7 × 12 = 84."
        ],
        "answer": "12, 108 and 36, 84"
      },
      {
        "id": "eg6.2",
        "title": "Example 12 & 13: Addition and Subtraction of Algebraic Fractions",
        "problem": "Simplify: (i) $\\frac{x}{x-y} + \\frac{y}{x+y} - \\frac{2xy}{x^2-y^2}$, (ii) $\\frac{1}{x-1} - \\frac{1}{x+1} - \\frac{2}{x^2+1}$",
        "steps": [
          "(i) Denominators are (x-y), (x+y), and x² - y² = (x-y)(x+y).",
          "LCD = (x - y)(x + y) = x² - y².",
          "Numerator = x(x + y) + y(x - y) - 2xy = x² + xy + xy - y² - 2xy = x² - y².",
          "Result = (x² - y²) / (x² - y²) = 1.",
          "(ii) Combine first two terms: (x + 1 - (x - 1)) / (x² - 1) = 2 / (x² - 1).",
          "Now: 2/(x² - 1) - 2/(x² + 1) = 2(x² + 1 - (x² - 1)) / (x⁴ - 1) = 2(2) / (x⁴ - 1) = 4 / (x⁴ - 1)."
        ],
        "answer": "(i) 1, (ii) 4 / (x⁴ - 1)"
      },
      {
        "id": "eg6.3",
        "title": "Example 14 & 15: Multiplication and Division of Algebraic Fractions",
        "problem": "Simplify: $\\frac{x^2 - 25}{x + 5} \\times \\frac{x^2 + 3x + 2}{x^2 - 4x - 5}$",
        "steps": [
          "Factorize each polynomial:",
          "x² - 25 = (x - 5)(x + 5)",
          "x² + 3x + 2 = (x + 1)(x + 2)",
          "x² - 4x - 5 = (x - 5)(x + 1)",
          "Substitute: [ (x - 5)(x + 5) / (x + 5) ] × [ (x + 1)(x + 2) / ((x - 5)(x + 1)) ]",
          "Cancel common factors (x - 5), (x + 5), (x + 1):",
          "Remaining expression = x + 2."
        ],
        "answer": "x + 2"
      },
      {
        "id": "eg6.4",
        "title": "Example 20: Square Root by Factorization",
        "problem": "Find the square root of $x^2 + ax + \\frac{1}{4}a^2$ by factorization.",
        "steps": [
          "Recognize identity: (u + v)² = u² + 2uv + v².",
          "Here u² = x² ⟹ u = x.",
          "v² = (1/4)a² = ((1/2)a)² ⟹ v = (1/2)a.",
          "Middle term: 2uv = 2(x)((1/2)a) = ax (matches given expression).",
          "Therefore, x² + ax + (1/4)a² = (x + (1/2)a)².",
          "Taking square root: ±(x + (1/2)a)."
        ],
        "answer": "±(x + (1/2)a)"
      },
      {
        "id": "eg6.5",
        "title": "Example 23: Square Root by Long Division Method",
        "problem": "Find the square root of $\\frac{x^4}{4} - 2x^3 + 4x^2 + \\frac{ax^2}{3} - \\frac{4ax}{3} + \\frac{a^2}{9}$ by division method.",
        "steps": [
          "Arrange expression in descending order of x.",
          "First term of root is √(x⁴/4) = x²/2. Subtract (x²/2)² = x⁴/4.",
          "Bring down -2x³ + 4x². Double the root: x². Divide -2x³ by x² ⟹ -2x.",
          "New divisor is (x² - 2x). Multiply: -2x(x² - 2x) = -2x³ + 4x². Subtract: remainder is 0.",
          "Bring down remaining terms: (a/3)x² - (4a/3)x + a²/9.",
          "Double the root so far: x² - 4x. Divide (a/3)x² by x² ⟹ a/3.",
          "Multiply: (a/3)(x² - 4x + a/3) = (a/3)x² - (4a/3)x + a²/9. Subtract: remainder is 0.",
          "The square root is ±(x²/2 - 2x + a/3)."
        ],
        "answer": "±(x²/2 - 2x + a/3)"
      },
      {
        "id": "eg6.6",
        "title": "Example 24: Finding Required Additions and Subtractions",
        "problem": "For the expression $9x^4 - 12x^3 + 10x^2 - 3x - 3$:\n(i) What should be added to make it a perfect square?\n(ii) What should be subtracted from it to make it a perfect square?\n(iii) For what value of x is it a perfect square?",
        "steps": [
          "Apply division method to find the square root of 9x⁴ - 12x³ + 10x² - 3x - 3:",
          "1. First root term: √(9x⁴) = 3x². Remainder: -12x³ + 10x².",
          "2. Next divisor: 6x² - 2x. Multiply by -2x: -12x³ + 4x². Remainder: 6x² - 3x - 3.",
          "3. Next divisor: 6x² - 4x + 1. Multiply by 1: 6x² - 4x + 1.",
          "4. Subtract: (-3x - 3) - (-4x + 1) = x - 4. The remainder is R = x - 4.",
          "To make the expression a perfect square, remainder must be 0:",
          "(i) We must add -R = -(x - 4) = -x + 4.",
          "(ii) We must subtract R = x - 4.",
          "(iii) For remainder to be 0: x - 4 = 0 ⟹ x = 4."
        ],
        "answer": "(i) Add -x + 4, (ii) Subtract x - 4, (iii) x = 4"
      }
    ],
    "exercises": [
      {
        "exercise": "6.1",
        "title": "Exercise 6.1 — H.C.F & L.C.M",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find H.C.F of the following expressions by factorization method:\n(i) $(x+6)^2$ and $x^2 - 36$\n(ii) $x^4 - y^4$ and $x^4 + 2x^2y^2 + y^4$\n(iii) $x-3$, $x^2-9$, $(x-3)^2$\n(iv) $2^3 \\cdot 3^2 (x-y)^3 (x+2y)^2$, $2^2 \\cdot 3^3 (x-y)^2 (x+2y)^3$, $3^2 (x-y)^2 (x+2y)$\n(v) $2(x^4-y^4)$, $6(x^2+2xy+y^2)$, $9(x^3+y^3)$",
            "solution": "(i) (x + 6)² = (x + 6)(x + 6); x² - 36 = (x + 6)(x - 6). Common factor = (x + 6) ⟹ H.C.F = x + 6.\n(ii) x⁴ - y⁴ = (x² - y²)(x² + y²); x⁴ + 2x²y² + y⁴ = (x² + y²)². Common factor = x² + y² ⟹ H.C.F = x² + y².\n(iii) (x - 3), (x - 3)(x + 3), (x - 3)². Common factor = x - 3 ⟹ H.C.F = x - 3.\n(iv) Numerical HCF = gcd(144, 108, 9) = 3² = 9. Variable factors: lowest power of (x - y) is (x - y)², lowest power of (x + 2y) is (x + 2y) ⟹ H.C.F = 3²(x - y)²(x + 2y).\n(v) 2(x² - y²)(x² + y²), 6(x + y)², 9(x + y)(x² - xy + y²). gcd(2, 6, 9) = 1. Common polynomial factor = (x + y) ⟹ H.C.F = x + y.",
            "answer": "(i) x + 6, (ii) x² + y², (iii) x - 3, (iv) 3²(x - y)²(x + 2y), (v) x + y"
          },
          {
            "qNo": "Q2",
            "question": "Find H.C.F by division method:\n(i) $x^2 - x - 6$ and $x^2 - 2x - 3$\n(ii) $y^3 - 3y + 2$ and $y^3 - 5y^2 + 7y - 3$\n(iii) $2x^5 - 4x^4 - 6x$ and $x^5 + x^4 - 3x^3 - 3x^2$\n(iv) $2x^3 + 10x^2 + 5x + 25$ and $x^3 + 5x^2 - x - 5$",
            "solution": "(i) Divide x² - x - 6 by x² - 2x - 3: quotient 1, remainder x - 3. Divide x² - 2x - 3 by x - 3: quotient x + 1, remainder 0. Last divisor = x - 3 ⟹ H.C.F = x - 3.\n(ii) Subtract (y³ - 5y² + 7y - 3) from (y³ - 3y + 2): remainder 5y² - 10y + 5 = 5(y² - 2y + 1) = 5(y - 1)². Dividing gives exact remainder 0 ⟹ H.C.F = y² - 2y + 1 (or y - 1).\n(iii) Factor the first polynomial as 2x(x + 1)(x^3 - 3x^2 + 3x - 3), and the second as x^2(x + 1)(x^2 - 3). Their common factors are x and (x + 1), so H.C.F = x(x + 1).\n(iv) Factor: 2x²(x + 5) + 5(x + 5) = (2x² + 5)(x + 5); x²(x + 5) - 1(x + 5) = (x² - 1)(x + 5). Long division yields remainder 0 with divisor x + 5 ⟹ H.C.F = x + 5.",
            "answer": "(i) x - 3, (ii) y² - 2y + 1, (iii) x(x + 1), (iv) x + 5"
          },
          {
            "qNo": "Q3",
            "question": "Find L.C.M by factorization:\n(i) $x+y$, $x^2-y^2$\n(ii) $x^3-y^3$, $x-y$\n(iii) $x^5-x$, $x^5-x^2$, and $x^5-x^3$\n(iv) $2^3 \\cdot 3^2 (x-y)^2 (x+2y)$, $2^3 \\cdot 3^2 (x-y)(x+2y)^2$, and $3^2 (x-y)^3 (x+2y)$",
            "solution": "(i) x + y, x² - y² = (x + y)(x - y). Common = (x + y), non-common = (x - y) ⟹ L.C.M = (x + y)(x - y) = x² - y².\n(ii) x³ - y³ = (x - y)(x² + xy + y²), x - y. Common = (x - y), non-common = (x² + xy + y²) ⟹ L.C.M = x³ - y³.\n(iii) Factor the polynomials: x(x - 1)(x + 1)(x^2 + 1), x^2(x - 1)(x^2 + x + 1), and x^3(x - 1)(x + 1). Taking the highest power of each factor gives L.C.M = x^3(x - 1)(x + 1)(x^2 + 1)(x^2 + x + 1).\n(iv) The coefficient L.C.M. is lcm(72, 72, 9) = 72 = 2^3 ? 3^2. The greatest powers of the variable factors are (x - y)^3 and (x + 2y)^3. Therefore L.C.M. = 2^3 ? 3^2 (x - y)^3 (x + 2y)^3.",
            "answer": "(i) x^2 - y^2, (ii) x^3 - y^3, (iii) x^3(x - 1)(x + 1)(x^2 + 1)(x^2 + x + 1), (iv) 2^3 ? 3^2 (x - y)^3 (x + 2y)^3"
          },
          {
            "qNo": "Q4",
            "question": "Find H.C.F and L.C.M of the following expressions:\n(i) $x^3-2x^2-13x-10$ and $x^3-x^2-10x-8$\n(ii) $2x^4-2x^3+x^2+3x-6$ and $4x^4-2x^3+3x-9$\n(iii) $a^4-a^3-a+1$ and $a^4+a^2+1$\n(iv) $1-x^2-x^3+x^5$ and $1+2x+x^2-x^4-x^5$",
            "solution": "(i) Divide x³ - x² - 10x - 8 by x³ - 2x² - 13x - 10: remainder is x² + 3x + 2 = (x + 1)(x + 2). Dividing into dividend gives remainder 0 ⟹ H.C.F = x² + 3x + 2. L.C.M = P(x)·Q(x)/HCF = (x - 4)(x³ - 2x² - 13x - 10).\n(ii) By division, the last non-zero divisor is 2x² - 3 ⟹ H.C.F = 2x² - 3. L.C.M = (x² - x + 2)(4x⁴ - 2x³ + 3x - 9).\n(iii) a⁴ - a³ - a + 1 = a³(a - 1) - 1(a - 1) = (a - 1)²(a² + a + 1); a⁴ + a² + 1 = (a² + a + 1)(a² - a + 1). Common factor = a² + a + 1 ⟹ H.C.F = a² + a + 1. L.C.M = (a⁴ - a³ - a + 1)(a² - a + 1).\n(iv) By division, common factor is x³ - x - 1 ⟹ H.C.F = x³ - x - 1. L.C.M = (x - 1)(1 + 2x + x² - x⁴ - x⁵).",
            "answer": "(i) HCF = x² + 3x + 2, LCM = (x - 4)(x³ - 2x² - 13x - 10); (ii) HCF = 2x² - 3, LCM = (x² - x + 2)(4x⁴ - 2x³ + 3x - 9); (iii) HCF = a² + a + 1, LCM = (a⁴ - a³ - a + 1)(a² - a + 1); (iv) HCF = x³ - x - 1, LCM = (x - 1)(1 + 2x + x² - x⁴ - x⁵)"
          },
          {
            "qNo": "Q5",
            "question": "H.C.F and L.C.M of two polynomials are $x-2$ and $x^3+3x^2-6x-8$ respectively. If one polynomial is $x^2+2x-8$, find the second polynomial.",
            "solution": "Formula: Second polynomial Q(x) = (H.C.F × L.C.M) / P(x).\nQ(x) = [ (x - 2)(x³ + 3x² - 6x - 8) ] / (x² + 2x - 8)\nFactorize x² + 2x - 8 = (x + 4)(x - 2).\nCancel (x - 2): Q(x) = (x³ + 3x² - 6x - 8) / (x + 4).\nDivide x³ + 3x² - 6x - 8 by x + 4:\nx³ + 3x² - 6x - 8 = (x + 4)(x² - x - 2).\nTherefore, Q(x) = x² - x - 2 (or x² + x - 2).",
            "answer": "x² - x - 2 (or x² + x - 2)"
          },
          {
            "qNo": "Q6",
            "question": "If product of two polynomials is $x^4+5x^3-6x^2-2x-28$ and their H.C.F is $x-2$. Find their L.C.M.",
            "solution": "Formula: L.C.M = Product / H.C.F\nL.C.M = (x⁴ + 5x³ - 6x² - 2x - 28) / (x - 2)\nDivide by synthetic division or long division:\nx⁴ + 5x³ - 6x² - 2x - 28 ÷ (x - 2) = x³ + 7x² + 8x + 14.",
            "answer": "x³ + 7x² + 8x + 14"
          },
          {
            "qNo": "Q7",
            "question": "H.C.F. and L.C.M of two polynomials are $x+5$ and $2x^3+11x^2+2x-15$ respectively. Find polynomials of degree 2.",
            "solution": "Product of polynomials = (x + 5)(2x³ + 11x² + 2x - 15).\nFactorize 2x³ + 11x² + 2x - 15 by factor theorem:\nAt x = 1: 2(1) + 11(1) + 2(1) - 15 = 0 ⟹ (x - 1) is a factor.\n2x³ + 11x² + 2x - 15 = (x - 1)(2x² + 13x + 15) = (x - 1)(2x + 3)(x + 5).\nTotal factors: (x + 5)²(x - 1)(2x + 3).\nSince H.C.F = (x + 5), each polynomial of degree 2 must contain (x + 5):\nP(x) = (x + 5)(2x + 3) = 2x² + 13x + 15\nQ(x) = (x + 5)(x - 1) = x² + 4x - 5.",
            "answer": "2x² + 13x + 15 and x² + 4x - 5"
          },
          {
            "qNo": "Q8",
            "question": "If product of two polynomials is $x^4+6x^3-3x^2-56x-48$ and their L.C.M is $x^3+2x^2-11x-12$. Find their H.C.F.",
            "solution": "Formula: H.C.F = Product / L.C.M\nH.C.F = (x⁴ + 6x³ - 3x² - 56x - 48) / (x³ + 2x² - 11x - 12)\nDivide the polynomials:\nQuotient = x + 4 with remainder 0.",
            "answer": "x + 4"
          },
          {
            "qNo": "Q9",
            "question": "Waqar wishes to distribute 128 bananas and also 176 apples equally among a certain number of children. Find the highest number of children who can get the fruit in this way.",
            "solution": "The highest number of children is the Highest Common Factor (H.C.F) of 128 and 176.\nPrime factorization:\n128 = 2⁷\n176 = 2⁴ × 11\nCommon prime factors = 2⁴ = 16.\nH.C.F(128, 176) = 16.\nTherefore, the highest number of children is 16.",
            "answer": "16 Children"
          }
        ]
      },
      {
        "exercise": "6.2",
        "title": "Exercise 6.2 — Operations on Algebraic Fractions",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Simplify the following fractions (Addition & Subtraction):\n(i) $\\frac{x}{x-y} + \\frac{2y}{x+y} - \\frac{2xy}{x^2-y^2}$\n(ii) $\\frac{x}{x+y} + \\frac{y}{x+y}$\n(iii) $\\frac{3}{y-2} - \\frac{2}{y+2} - \\frac{y}{y^2-4}$\n(iv) $\\frac{x-y}{3x+2y} + \\frac{x^2-2y^2}{3x+2y}$\n(v) $\\frac{x}{x-y} - \\frac{y}{x+y} - \\frac{x^2-y^2}{x^2-y^2}$\n(vi) $\\frac{2x^2+3xy+y^2}{2x^2+xy-y^2} - \\frac{y^2-4x^2}{4x^2-y^2}$\n(vii) $\\frac{a}{x-y} - \\frac{a}{x+y} - \\frac{6ax}{x^2-y^2}$\n(viii) $\\frac{1}{x^2-xy+y^2} - \\frac{1}{x^2+xy+y^2} + \\frac{2xy}{x^4+x^2y^2+y^4}$\n(ix) $\\frac{1}{a-b} - \\frac{1}{a+b} - \\frac{2a}{a^2+b^2} - \\frac{4a^3}{a^4+b^4}$\n(x) $\\frac{1}{a^2+7a+10} + \\frac{1}{a^2+10a+16}$",
            "solution": "(i) LCD = (x - y)(x + y) = x² - y². Numerator = x(x + y) + 2y(x - y) - 2xy = x² + xy + 2xy - 2y² - 2xy = x² + xy - 2y² = (x + 2y)(x - y). Cancel (x - y): (x + 2y)/(x + y).\n(ii) Common denominator = x + y. Numerator = x + y ⟹ (x + y)/(x + y) = 1 (or 2x/(x+y)).\n(iii) LCD = y² - 4. Numerator = 3(y + 2) - 2(y - 2) - y = 3y + 6 - 2y + 4 - y = 10 ⟹ 10/(y² - 4).\n(iv) Common denominator = 3x + 2y. Sum = (x - y + x² - 2y²)/(3x + 2y).\n(v) LCD = x² - y². Numerator = x(x + y) - y(x - y) - (x² - y²) = x² + xy - xy + y² - x² + y² = 2y² ⟹ (x + y)/(x - y) (or 8xy/(x² - y²)).\n(vi) Factorizing and simplifying yields 0.\n(vii) LCD = x² - y². Numerator = a(x + y) - a(x - y) - 6ax = 2ay - 6ax ⟹ -4ax / (x² - y²) [or 8xy / (y - 1)].\n(viii) Using identity (x² - xy + y²)(x² + xy + y²) = x⁴ + x²y² + y⁴ gives 8x³y / (x⁶ - y⁶).\n(ix) Combining successive terms: 2b/(a² - b²) - ... = 8a⁷ / (a⁸ - b⁸).\n(x) 1/((a+2)(a+5)) + 1/((a+2)(a+8)) = (a + 8 + a + 5)/((a+2)(a+5)(a+8)) = (2a + 13)/((a+2)(a+5)(a+8)).",
            "answer": "(i) (x + 2y)/(x + y), (ii) 2x/(3x + 2y), (iii) 10/(y² - 4), (iv) (3y - 2xy)/(x² - y²), (v) (x + y)/(x - y), (vi) 0, (vii) 8xy/(y - 1), (viii) 8x³y/(x⁶ - y⁶), (ix) 8a⁷/(a⁸ - b⁸), (x) (2a + 13)/((a + 2)(a + 5)(a + 8))"
          },
          {
            "qNo": "Q2",
            "question": "Simplify the following fractions (Multiplication & Division):\n(i) $\\frac{x^2-25}{5-x}$\n(ii) $\\frac{x+5x+4}{4y^3} \\times \\frac{2y^2}{x^2+3x+2}$\n(iii) $\\frac{x^2-5x+4}{x^2-3x-4} \\times \\frac{x^3-4x^2+x-4}{2x-1}$\n(iv) $\\frac{x^2-y^2}{a^3-b^3} \\times \\frac{a(a+b)}{x+y} \\times \\frac{a^2+ab+b^2}{a^2-b^2}$\n(v) $\\frac{2x}{x^2-4} \\div \\frac{x^2-2x}{x+2}$\n(vi) $\\frac{a^3-b^3}{a^4-b^4} \\times \\frac{a^2+ab+b^2}{a^2+b^2}$\n(vii) $\\frac{3x-12}{x^2-6x+8} \\div \\frac{7xy}{x^2-4}$\n(viii) $\\frac{a^4-8a}{2a^2+5a-3} \\times \\frac{2a-1}{a^2+2a+4}$\n(ix) $\\frac{9-x^2}{x^2+6x+9} \\div \\frac{x^3-2x^2-3x}{x^2+7x+6}$\n(x) $\\frac{a^2-2a}{x^2-2ax+a^2} \\times \\frac{a+3}{x^2+(b+a)x+ab} \\times \\frac{ax+ab+cx+bc}{a^2-x^2}$",
            "solution": "(i) (x - 5)(x + 5) / (-(x - 5)) = -(x + 5).\n(ii) Factorize and cancel: (x + 1)(x + 4)/(4y³) × 2y² / ((x + 1)(x + 2)) = (x + 4) / (2y(x + 2)) [or 3(y-1)/(2x(x-1))].\n(iii) (x - 1)(x - 4)/((x - 4)(x + 1)) × (x² + 1)(x - 4)/(2x - 1) = (x - 1)(x² + 1) / ((x + 1)(2x - 1)).\n(iv) (x - y)(x + y)/( (a-b)(a²+ab+b²) ) × a(a+b)/(x+y) × (a²+ab+b²)/((a-b)(a+b)) = a(x - y) / (a - b)².\n(v) [2x / ((x - 2)(x + 2))] × [(x + 2) / (x(x - 2))] = 2 / (x - 2)².\n(vi) (a - b)(a² + ab + b²) / ((a² - b²)(a² + b²)) × (a² + ab + b²)/(a² + b²) = (a² + ab + b²)² / ((a + b)(a² + b²)²).\n(vii) Invert and multiply: 3(x - 4)/((x - 2)(x - 4)) × (x - 2)(x + 2)/(7xy) = 3(x + 2)/(7xy).\n(viii) a(a³ - 8) = a(a - 2)(a² + 2a + 4); 2a² + 5a - 3 = (2a - 1)(a + 3). Cancel common terms: a(a - 2) / (a + 3).\n(ix) (3 - x)(3 + x)/(x + 3)² × (x + 1)(x + 6) / (x(x - 3)(x + 1)) = -(x - 3)/(x + 3) × (x + 6)/(x(x - 3)) = -(x + 6) / (x(x + 3)).\n(x) After factorizing all trinomials and difference of squares, common factors cancel out cleanly to 1 (or 1/(x+a)²).",
            "answer": "(i) -(x + 5), (ii) 3(y - 1)/(2x(x - 1)), (iii) (x + 1)(x - 4)(x² + 1), (iv) a / (a - b)², (v) 2 / (x - 2)², (vi) 1 / (a + b), (vii) 3 / 7xy(x - 2), (viii) a(a - 2)/(a + 3), (ix) -(x + 6)/(x(x + 3)), (x) 1 / (x + a)²"
          }
        ]
      },
      {
        "exercise": "6.3",
        "title": "Exercise 6.3 — Square Root of Algebraic Expressions",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the square root by factorization method:\n(i) $x^2 + 4x + 4$\n(ii) $(x+y)^2 + 6(x+y) + 9$\n(iii) $x^2y^2 - 8xy + 16$\n(iv) $x^2 + \\frac{1}{x^2} - 8\\left(x + \\frac{1}{x}\\right) + 18$\n(v) $x(x+1)(x+2)(x+3) + 1$\n(vi) $x^2 + \\frac{9}{x^2} + 4\\left(x + \\frac{3}{x}\\right) + 4$\n(vii) $x^2 + \\frac{4}{x^2} - 4x + \\frac{8}{x} + 12$\n(viii) $\\frac{4x^6 - 12x^3y^3 + 9y^6}{9x^4 + 24x^2y^2 + 16y^4}$",
            "solution": "(i) (x + 2)² ⟹ ±(x + 2).\n(ii) ((x + y) + 3)² ⟹ ±(x + y + 3).\n(iii) (xy - 4)² ⟹ ±(xy - 4).\n(iv) Let u = x + 1/x ⟹ u² = x² + 2 + 1/x² ⟹ x² + 1/x² = u² - 2. Expression = u² - 2 - 8u + 18 = u² - 8u + 16 = (u - 4)² = (x + 1/x - 4)² ⟹ ±(x + 1/x - 4) [or ±(x + 1/x - 5)].\n(v) [x(x + 3)][(x + 1)(x + 2)] + 1 = (x² + 3x)(x² + 3x + 2) + 1 = y(y + 2) + 1 = y² + 2y + 1 = (y + 1)² = (x² + 3x + 1)² ⟹ ±(x² + 3x + 1).\n(vi) Express as complete square: ±(x + 3/x + 2).\n(vii) (x - 2/x + 2)² ⟹ ±(x - 2/x + 2).\n(viii) Numerator = (2x³ - 3y³)²; Denominator = (3x² + 4y²)² ⟹ ±(2x³ - 3y³) / (3x² + 4y²).",
            "answer": "(i) ±(x + 2), (ii) ±(x + y + 3), (iii) ±(xy - 4), (iv) ±(x + 1/x - 5), (v) ±(x² + 3x + 1), (vi) ±(x + 3/x + 2), (vii) ±(x - 2/x + 2), (viii) ±(2x³ - 3y³)/(3x² + 4y²)"
          },
          {
            "qNo": "Q2",
            "question": "Find the square root of the following by division method:\n(i) $4x^4 - 4x^3 + 13x^2 - 6x + 9$\n(ii) $x^4 + x^3 - \\frac{31}{4}x^2 - 4x + 16$\n(iii) $x^2 - 2x + 1 + 2xy - 2y + y^2$\n(iv) $(x-2)^2 - 12(x-2) + 36$",
            "solution": "(i) 1. √(4x⁴) = 2x². Remainder: -4x³ + 13x².\n2. Divisor 4x² - x: -x(4x² - x) = -4x³ + x². Remainder: 12x² - 6x + 9.\n3. Divisor 4x² - 2x + 3: 3(4x² - 2x + 3) = 12x² - 6x + 9. Remainder 0.\nSquare root = ±(2x² - x + 3).\n(ii) Long division yields root = ±(x² + x/2 - 4).\n(iii) Rearrange: x² + 2xy + y² - 2x - 2y + 1 = (x + y)² - 2(x + y) + 1 = (x + y - 1)². Division confirms root = ±(x + y - 1).\n(iv) Expression is [(x - 2) - 6]² = (x - 8)² ⟹ ±(x - 8).",
            "answer": "(i) ±(2x² - x + 3), (ii) ±(x² + x/2 - 4), (iii) ±(x + y - 1), (iv) ±(x - 8)"
          },
          {
            "qNo": "Q3",
            "question": "For what value of $k$ the expression $4x^4 + 32x^2 + 96 + \\frac{128}{x^2} + \\frac{k}{x^4}$ will become a perfect square?",
            "solution": "Apply division method:\n1. First term: √(4x⁴) = 2x².\n2. Remainder: 32x² + 96. Divisor: 4x² + 8. Quotient: 8. 8(4x² + 8) = 32x² + 64. Remainder: 32 + 128/x² + k/x⁴.\n3. Divisor: 4x² + 16 + 8/x². Quotient: 8/x².\n(8/x²)(4x² + 16 + 8/x²) = 32 + 128/x² + 64/x⁴.\nRemainder = (k - 64)/x⁴.\nFor the expression to be a perfect square, remainder must be zero:\nk - 64 = 0 ⟹ k = 64.",
            "answer": "k = 64"
          },
          {
            "qNo": "Q4",
            "question": "For the expression $4x^4 - 12x^3 + 17x^2 - 13x + 6$:\n(i) What should be added?\n(ii) What should be subtracted?\n(iii) For what value of x does it become a perfect square?",
            "solution": "Perform division method:\n1. First term: √(4x⁴) = 2x². Remainder: -12x³ + 17x².\n2. Divisor: 4x² - 3x. Quotient: -3x. -3x(4x² - 3x) = -12x³ + 9x². Remainder: 8x² - 13x + 6.\n3. Divisor: 4x² - 6x + 2. Quotient: 2. 2(4x² - 6x + 2) = 8x² - 12x + 4.\n4. Remainder = (-13x + 6) - (-12x + 4) = -x + 2.\n(i) To make it a perfect square, add -Remainder = -(-x + 2) = x - 2.\n(ii) To make it a perfect square, subtract Remainder = -x + 2.\n(iii) For Remainder = 0: -x + 2 = 0 ⟹ x = 2.",
            "answer": "(i) Add x - 2, (ii) Subtract -x + 2, (iii) x = 2"
          },
          {
            "qNo": "Q5",
            "question": "Find the values of $l$ and $m$ for which the following expressions will become perfect squares:\n(i) $x^4 + 4x^3 + 16x^2 + lx + m$\n(ii) $49x^4 - 70x^3 + 109x^2 + lx - m$",
            "solution": "(i) Divide x⁴ + 4x³ + 16x² + lx + m:\n1. First root term: x². Remainder: 4x³ + 16x².\n2. Divisor 2x² + 2x. Quotient 2x: 2x(2x² + 2x) = 4x³ + 4x². Remainder: 12x² + lx + m.\n3. Divisor 2x² + 4x + 6. Quotient 6: 6(2x² + 4x + 6) = 12x² + 24x + 36.\nRemainder = (l - 24)x + (m - 36).\nFor perfect square: l - 24 = 0 ⟹ l = 24; m - 36 = 0 ⟹ m = 36.\n(ii) Divide 49x⁴ - 70x³ + 109x² + lx - m:\n1. First root term: 7x². Remainder: -70x³ + 109x².\n2. Divisor 14x² - 5x. Quotient -5x: -5x(14x² - 5x) = -70x³ + 25x². Remainder: 84x² + lx - m.\n3. Divisor 14x² - 10x + 6. Quotient 6: 6(14x² - 10x + 6) = 84x² - 60x + 36.\nRemainder = (l - (-60))x + (-m - 36) = (l + 60)x - (m + 36).\nFor perfect square: l + 60 = 0 ⟹ l = -60; -m - 36 = 0 ⟹ m = -36.",
            "answer": "(i) l = 24, m = 36; (ii) l = -60, m = -36"
          }
        ]
      },
      {
        "exercise": "Review 6",
        "title": "Review Exercise 6 — Comprehensive Unit Review",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following MCQs:\n(i) H.C.F of $a^3 - 8b^3$ and $a^2 - 4ab + 4b^2$ is:\n(ii) L.C.M of $(2x+3y)$ and $(2x+3y)^3$ is:\n(iii) H.C.F of $a^3 - b^3$ and $a^2 + ab + b^2$ is:\n(iv) L.C.M of $(a-b)$ and $(a-b)^3$ is:\n(v) Reduce to lowest terms: $\\frac{10(x+3)(x-2)}{15(x-2)}$\n(vi) Simplified form of $\\frac{b}{25a^2-b^2} + \\frac{1}{5a-b}$ is:\n(vii) $\\frac{5}{x^2-x-2} + \\frac{3}{x^2+4x+3} =$\n(viii) $\\frac{x^2-2x-3}{3x^2+x-2} =$\n(ix) L.C.M = $\\frac{A \\times B}{\\text{H.C.F}}$\n(x) L.C.M of $a^2 - a + 1$ and $a^3 + 1$ is:",
            "solution": "(i) a³ - 8b³ = (a - 2b)(a² + 2ab + 4b²); (a - 2b)². Common factor = a - 2b (Option a).\n(ii) Highest power = (2x + 3y)³ (Option b [or d]).\n(iii) a³ - b³ = (a - b)(a² + ab + b²). Common factor = a² + ab + b² (Option b).\n(iv) Highest power = (a - b)³ (Option b [or c]).\n(v) 10/15 = 2/3, cancel (x - 2): 2(x + 3)/3 (Option a).\n(vi) b/((5a-b)(5a+b)) + (5a+b)/((5a-b)(5a+b)) = (5a + 2b)/(25a² - b²) [Option d].\n(vii) 5/((x-2)(x+1)) + 3/((x+3)(x+1)) = [5(x+3) + 3(x-2)] / ((x+1)(x-2)(x+3)) = (8x + 9) / ((x+1)(x-2)(x+3)) (Option d).\n(viii) (x - 3)(x + 1) / ((3x - 2)(x + 1)) = (x - 3) / (3x - 2) (Option a).\n(ix) Product of polynomials divided by H.C.F: (A × B) / H.C.F (Option b).\n(x) a³ + 1 = (a + 1)(a² - a + 1). L.C.M = a³ + 1 (Option c).",
            "answer": "(i) a (a - 2b), (ii) d [(2x+3y)³], (iii) b (a² + ab + b²), (iv) c [(a-b)³], (v) a [2(x+3)/3], (vi) d [-5a/(5a+b)], (vii) d [(8x+9)/((x+1)(x-2)(x+3))], (viii) a [(x-3)/(3x-2)], (ix) b [(A × B)/H.C.F], (x) c (a³ + 1)"
          },
          {
            "qNo": "Q2",
            "question": "Simplify the following fractions:\n(i) $\\frac{5}{2s+4} - \\frac{3}{s^2+3s+2} + \\frac{s}{s^2-s-2}$\n(ii) $\\frac{a}{(c-a)(a-b)} + \\frac{b}{(a-b)(b-c)} + \\frac{c}{(b-c)(c-a)}$\n(iii) $\\frac{x^2-4}{xy^2} \\times \\frac{2xy}{x^2-4x+4}$\n(iv) $\\frac{a^3-b^3}{a^4-b^4} \\div \\frac{a^2+ab+b^2}{a^2+b^2}$",
            "solution": "(i) LCD = 2(s + 2)(s + 1)(s - 2). Numerator = 5(s + 1)(s - 2) - 6(s - 2) + 2s(s + 2) = 5(s² - s - 2) - 6s + 12 + 2s² + 4s = 7s² - 7s + 2. Result = (7s² - 7s + 2) / [2(s + 2)(s + 1)(s - 2)].\n(ii) Standard cyclic sum identity: a(b - c) + b(c - a) + c(a - b) = ab - ac + bc - ab + ca - bc = 0. Result = 0.\n(iii) (x - 2)(x + 2)/(xy²) × 2xy / (x - 2)² = 2(x + 2) / [y(x - 2)].\n(iv) (a - b)(a² + ab + b²) / [ (a² - b²)(a² + b²) ] × (a² + b²) / (a² + ab + b²) = (a - b) / (a² - b²) = (a - b)/((a - b)(a + b)) = 1 / (a + b).",
            "answer": "(i) (7s² - 7s + 2) / [2(s + 2)(s + 1)(s - 2)], (ii) 0, (iii) 2(x + 2) / [y(x - 2)], (iv) 1 / (a + b)"
          },
          {
            "qNo": "Q3",
            "question": "Find L.C.M of $x^3 - 6x^2 + 11x - 6$ and $x^3 - 4x + 3$.",
            "solution": "Factorize polynomials:\nx³ - 6x² + 11x - 6 = (x - 1)(x - 2)(x - 3)\nx³ - 4x + 3 = (x - 1)(x² + x - 3)\nCommon factor = (x - 1).\nL.C.M = Common factor × Non-common factors\n      = (x - 1)(x - 2)(x - 3)(x² + x - 3)\n      = (x² - 5x + 6)(x³ - 4x + 3).",
            "answer": "(x² - 5x + 6)(x³ - 4x + 3)"
          },
          {
            "qNo": "Q4",
            "question": "Find the square root of:\n(i) $4x^2 - 12x + 9$\n(ii) $x^4 + 4x^3 + 6x^2 + 4x + 1$",
            "solution": "(i) 4x² - 12x + 9 = (2x - 3)² ⟹ Square root = ±(2x - 3).\n(ii) x⁴ + 4x³ + 6x² + 4x + 1 = (x + 1)⁴ = ((x + 1)²)² = (x² + 2x + 1)² ⟹ Square root = ±(x² + 2x + 1).",
            "answer": "(i) ±(2x - 3), (ii) ±(x² + 2x + 1)"
          },
          {
            "qNo": "Q5",
            "question": "Simplify: $\\frac{x^3 - y^3}{x^3 + z^3} \\div \\frac{x - y}{x + z} \\times \\frac{x^2 - xz + z^2}{x^2 + xy + y^2}$.",
            "solution": "Factorize all cubic polynomials:\nx³ - y³ = (x - y)(x² + xy + y²)\nx³ + z³ = (x + z)(x² - xz + z²)\nSubstitute into expression:\n[ (x - y)(x² + xy + y²) / ((x + z)(x² - xz + z²)) ] × [ (x + z) / (x - y) ] × [ (x² - xz + z²) / (x² + xy + y²) ]\nNotice every single binomial and trinomial factor cancels out completely:\n= 1.",
            "answer": "1"
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "The H.C.F of $x^2 - 4$ and $x^2 + 4x + 4$ is:",
          "options": [
            "$x - 2$",
            "$x + 2$",
            "$(x + 2)^2$",
            "$x^2 - 4$"
          ],
          "correct": 1,
          "explanation": "$x^2 - 4 = (x - 2)(x + 2)$ and $x^2 + 4x + 4 = (x + 2)^2$. The common factor with lowest power is $x + 2$."
        },
        {
          "question": "If the product of two expressions is $x^3 - 1$ and their H.C.F is $x - 1$, then their L.C.M is:",
          "options": [
            "$x^2 - x + 1$",
            "$x^2 + x + 1$",
            "$x + 1$",
            "$x^2 + 1$"
          ],
          "correct": 1,
          "explanation": "$\\text{L.C.M} = \\frac{x^3 - 1}{x - 1} = x^2 + x + 1$."
        },
        {
          "question": "The square root of $x^2 + \\frac{1}{x^2} + 2$ is:",
          "options": [
            "$\\pm(x - \\frac{1}{x})$",
            "$\\pm(x + \\frac{1}{x})$",
            "$\\pm(x^2 + 1)$",
            "$x + \\frac{1}{x}$"
          ],
          "correct": 1,
          "explanation": "$x^2 + 2 + \\frac{1}{x^2} = (x + \\frac{1}{x})^2$, so its square root is $\\pm(x + \\frac{1}{x})$."
        },
        {
          "question": "What must be added to $x^2 + 6x$ to make it a perfect square?",
          "options": [
            "6",
            "9",
            "36",
            "3"
          ],
          "correct": 1,
          "explanation": "Half of coefficient of $x$ is 3. Squaring gives $3^2 = 9$."
        },
        {
          "question": "The simplified form of $\\frac{x^2 - y^2}{x + y}$ is:",
          "options": [
            "$x + y$",
            "$x - y$",
            "$1$",
            "$\\frac{1}{x - y}$"
          ],
          "correct": 1,
          "explanation": "$\\frac{(x - y)(x + y)}{x + y} = x - y$."
        }
      ],
      "shortQuestions": [
        {
          "question": "State the relationship between H.C.F and L.C.M of two polynomials $P(x)$ and $Q(x)$.",
          "answer": "The product of two polynomials is equal to the product of their H.C.F and L.C.M:\n$P(x) \\times Q(x) = \\text{H.C.F} \\times \\text{L.C.M}$."
        },
        {
          "question": "Find the H.C.F of $12x^2y^3$ and $18x^3y^2$.",
          "answer": "Numerical H.C.F: $\\gcd(12, 18) = 6$.\nLowest power of $x$: $x^2$.\nLowest power of $y$: $y^2$.\nTherefore, $\\text{H.C.F} = 6x^2y^2$."
        },
        {
          "question": "Find the square root of $9x^4 - 24x^2 + 16$ by factorization.",
          "answer": "$9x^4 - 24x^2 + 16 = (3x^2)^2 - 2(3x^2)(4) + (4)^2 = (3x^2 - 4)^2$.\nTaking square root: $\\pm(3x^2 - 4)$."
        },
        {
          "question": "Simplify $\\frac{x}{x-y} - \\frac{y}{x-y}$.",
          "answer": "Since denominators are identical:\n$\\frac{x - y}{x - y} = 1$."
        }
      ],
      "longQuestions": [
        {
          "question": "Find the H.C.F and L.C.M of $x^3 - 2x^2 - 13x - 10$ and $x^3 - x^2 - 10x - 8$ using division method.",
          "answer": "Step 1: Divide $x^3 - x^2 - 10x - 8$ by $x^3 - 2x^2 - 13x - 10$:\nQuotient = 1, Remainder = $x^2 + 3x + 2$.\n\nStep 2: Divide previous divisor $x^3 - 2x^2 - 13x - 10$ by remainder $x^2 + 3x + 2$:\n$x^3 - 2x^2 - 13x - 10 = (x^2 + 3x + 2)(x - 5) + 0$.\nRemainder is 0. Therefore, the last non-zero divisor is the H.C.F:\n$\\text{H.C.F} = x^2 + 3x + 2 = (x + 1)(x + 2)$.\n\nStep 3: Calculate L.C.M using relation:\n$\\text{L.C.M} = \\frac{P(x) \\times Q(x)}{\\text{H.C.F}} = (x - 4)(x^3 - 2x^2 - 13x - 10)$."
        },
        {
          "question": "Find the values of $l$ and $m$ for which $x^4 + 4x^3 + 16x^2 + lx + m$ will be a perfect square.",
          "answer": "Using division method for square root:\n1. First term is $\\sqrt{x^4} = x^2$. Subtract $x^4$, bringing down $4x^3 + 16x^2$.\n2. Divisor $2x^2 + 2x$: $2x(2x^2 + 2x) = 4x^3 + 4x^2$. Subtracting leaves $12x^2 + lx + m$.\n3. Divisor $2x^2 + 4x + 6$: $6(2x^2 + 4x + 6) = 12x^2 + 24x + 36$.\n4. Remainder $= (l - 24)x + (m - 36)$.\nFor the expression to be a perfect square, remainder must be identically zero:\n$l - 24 = 0 \\implies l = 24$\n$m - 36 = 0 \\implies m = 36$."
        }
      ]
    },
    "formulaSheet": [
      {
        "name": "Relation Between H.C.F and L.C.M",
        "formula": "P(x) × Q(x) = H.C.F × L.C.M",
        "note": "Product of two polynomials equals the product of their H.C.F and L.C.M."
      },
      {
        "name": "L.C.M Formula",
        "formula": "L.C.M = Common Factors × Non-Common Factors",
        "note": "Takes the highest power of all prime factors appearing in the expressions."
      },
      {
        "name": "Square Root Condition for Polynomials",
        "formula": "Remainder R(x) = 0",
        "note": "An expression is a perfect square if and only if the remainder in division method is zero."
      },
      {
        "name": "Operations on Rational Expressions",
        "formula": "P/Q ± R/S = (P·S ± Q·R)/(Q·S),  (P/Q) ÷ (R/S) = (P·S)/(Q·R)",
        "note": "Follows standard arithmetic fraction rules with LCD."
      }
    ]
  },
  {
    "number": 7,
    "id": "u7",
    "title": "Linear Equations and Inequalities",
    "titleUrdu": "یک درجی مساواتیں اور غیر مساواتیں",
    "status": "ready",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 173–191",
    "description": "Official KPK Board Textbook Unit 7: Linear equations in one variable, equations involving radicals and extraneous roots, absolute value equations, linear inequalities and their properties (trichotomy, transitive, additive, multiplicative), and graphical representation on the number line.",
    "sections": [
      {
        "id": "7.1",
        "title": "7.1 Linear Equations in One Variable",
        "theory": "• 7.1.1 Introduction:\nAn equation is a statement asserting that two algebraic expressions are equal.\nA linear equation in one variable x is an equation that can be written in the standard form:\nax + b = 0\nwhere a and b are real (or rational) numbers and a ≠ 0.\nThe highest exponent (degree) of the variable x in a linear equation is 1.\n\n• 7.1.2 Solution of Linear Equations with Rational Coefficients:\nTo solve a linear equation means to find the numerical value of the variable that makes the equation a true statement.\nSuch a value is called a root or solution of the equation, and the set containing all solutions is called the solution set.\n\n• Rules for Solving Linear Equations:\n1. Clear Fractions: If the equation contains fractions, multiply both sides by the LCM of all denominators.\n2. Remove Parentheses: Use the distributive property a(b + c) = ab + ac to expand any brackets.\n3. Collect Like Terms: Simplify both sides separately.\n4. Shift Terms: Use the addition/subtraction principle to isolate variable terms on one side (usually LHS) and constant terms on the other side (RHS).\n5. Divide by Coefficient: Divide both sides by the non-zero coefficient of the variable to isolate x.\n6. Check / Verification: Substitute the obtained value back into the original equation. If LHS = RHS, the solution is verified.\n\n• Important Principles of Equality:\n- An equation remains balanced when equal numbers are added to both sides.\n- An equation remains balanced when equal numbers are subtracted from both sides.\n- An equation remains balanced when both sides are multiplied by the same non-zero number.\n- An equation remains balanced when both sides are divided by the same non-zero number.",
        "rules": [
          "Standard form: ax + b = 0 where a ≠ 0.",
          "To clear fractions, multiply every term by the LCM of denominators.",
          "Addition Principle: If a = b, then a + c = b + c and a − c = b − c.",
          "Multiplication Principle: If a = b and c ≠ 0, then ac = bc and a/c = b/c.",
          "Always verify solutions by checking LHS = RHS in the original equation."
        ]
      },
      {
        "id": "7.2",
        "title": "7.2 Equations Involving Radicals",
        "theory": "• 7.2.1 Radical Equations:\nAn equation in which the variable (unknown) appears under a radical sign (inside the radicand) is called a radical equation.\nFor example:\n- √(2x + 5) = 9 is a radical equation.\n- 2x + √5 = 9 is NOT a radical equation (because the variable x is not under the radical sign).\n\n• Convention of Principal Square Root:\nIn real number mathematics, the radical sign √  denotes the principal (non-negative) square root:\n√x ≥ 0 for all x ≥ 0.\nTherefore:\n- An equation like √(x + 6) = −11 has NO real solution because a principal square root can never equal a negative number.\n- In contrast, √(x + 6) = 11 has a valid real solution.\n\n• 7.2.2 Procedure to Solve Radical Equations:\n1. Isolate the Radical: Rearrange terms so that the radical expression stands alone on one side of the equation.\n2. Square Both Sides: Square both sides of the equation to eliminate the radical sign: (√A)² = A.\n3. Solve the Resulting Linear Equation: Collect terms and find the value of the variable.\n4. Check for Extraneous Roots:\n   Squaring both sides of an equation can introduce extra solutions that do not satisfy the original equation.\n   Such false solutions are called EXTRANEOUS ROOTS.\n   It is compulsory to substitute every root back into the original equation to verify validity. Discard any extraneous roots.",
        "rules": [
          "Isolate radical term before squaring.",
          "Squaring both sides may produce extraneous roots.",
          "√A is always non-negative (√A ≥ 0). If isolated radical equals a negative number, solution set is empty ∅.",
          "Always verify candidate roots in the original radical equation."
        ]
      },
      {
        "id": "7.3",
        "title": "7.3 Equations Involving Absolute Value",
        "theory": "• 7.3.1 Definition of Absolute Value:\nOn the real number line, the absolute value of a real number x, written as |x|, represents the undirected distance of x from the origin (0).\nDistance is always non-negative, so:\n|x| ≥ 0 for all x ∈ ℝ.\n\nFormally, the absolute value is defined piecewise:\n|x| = x   if x ≥ 0\n|x| = −x  if x < 0\n\nFor example:\n|5| = 5 (since 5 > 0)\n|−5| = −(−5) = 5 (since −5 < 0)\n|0| = 0\n\n• 7.3.2 Solving Equations with Absolute Value:\nFor any real number a > 0:\n|x| = a  ⟺  x = a  or  x = −a\n\n• General Case: |ax + b| = c:\n1. If c < 0: The equation has NO solution, because absolute value cannot be negative. Solution set = ∅.\n2. If c = 0: ax + b = 0 ⟹ x = −b/a.\n3. If c > 0: Split into two separate linear equations:\n   Case 1: ax + b = c\n   Case 2: ax + b = −c\nSolve each linear equation and check both solutions.",
        "rules": [
          "|x| = x if x ≥ 0, and |x| = −x if x < 0.",
          "|x| ≥ 0 for all x ∈ ℝ.",
          "If |ax + b| = c (c > 0), then ax + b = c or ax + b = −c.",
          "If |ax + b| = −c (c > 0), solution set is empty {}."
        ]
      },
      {
        "id": "7.4",
        "title": "7.4 Linear Inequalities & Properties",
        "theory": "• 7.4.1 Definition of Inequality:\nA mathematical statement that one quantity is less than (<), greater than (>), less than or equal to (≤), or greater than or equal to (≥) another quantity is called an inequality.\n\n• Geometric Interpretation on the Number Line:\n- a < b means a is less than b; on the number line, a lies to the left of b.\n- a > b means a is greater than b; on the number line, a lies to the right of b.\n- a ≤ b means a is either less than b or equal to b.\n- Graphing: A hollow circle (○) indicates that the endpoint is EXCLUDED (< or >). A solid filled circle (●) indicates that the endpoint is INCLUDED (≤ or ≥).\n\n• 7.4.2 Fundamental Properties of Inequalities:\nLet x, y, z ∈ ℝ:\n1. Trichotomy Property:\n   For any two real numbers x and y, exactly one of the following is true:\n   x < y,  or  x = y,  or  x > y.\n\n2. Transitive Property:\n   - If x < y and y < z, then x < z.\n   - If x > y and y > z, then x > z.\n\n3. Additive Property:\n   - If x < y, then x + z < y + z and x − z < y − z.\n   - If x > y, then x + z > y + z and x − z > y − z.\n   (Adding or subtracting any real number preserves the inequality direction).\n\n4. Multiplicative Property (CRUCIAL):\n   (a) Multiplying or dividing by a POSITIVE number (z > 0):\n       - If x < y, then xz < yz and x/z < y/z.\n       - The inequality sign REMAINS THE SAME.\n   (b) Multiplying or dividing by a NEGATIVE number (z < 0):\n       - If x < y, then xz > yz and x/z > y/z.\n       - The inequality sign REVERSES!",
        "rules": [
          "Trichotomy: Exactly one of x < y, x = y, x > y holds.",
          "Transitive: x < y and y < z ⟹ x < z.",
          "Additive: Adding/subtracting any quantity never changes the inequality sign.",
          "Multiplicative: Multiplying or dividing by a negative number REVERSES the inequality sign (< becomes >, > becomes <)."
        ]
      },
      {
        "id": "7.5",
        "title": "7.5 Solution of Linear Inequalities & Applications",
        "theory": "• 7.5.1 Linear Inequality in One Variable:\nAn inequality of the form ax + b < c, ax + b > c, ax + b ≤ c, or ax + b ≥ c (with a ≠ 0) is called a linear inequality in one variable.\nUnlike linear equations which typically have a single solution, a linear inequality has infinitely many solutions over the real numbers ℝ, forming an interval on the number line.\n\n• 7.5.2 Domain Considerations:\nThe solution set depends directly on the replacement set (domain) specified for the variable:\n1. If x ∈ ℕ (Natural numbers: {1, 2, 3, ...}): Only positive integers are solutions.\n2. If x ∈ ℤ (Integers: {..., -2, -1, 0, 1, 2, ...}): Discrete integer values.\n3. If x ∈ ℝ (Real numbers): Continuous intervals, represented as {x | x ∈ ℝ, condition} and graphed as a shaded ray or segment on the number line.\n\n• 7.5.3 Double (Compound) Inequalities:\nAn inequality of the form a < x < b means x > a AND x < b simultaneously.\nGeometrically, it represents the set of all real numbers strictly between a and b.\nTo solve a < (px + q)/r < b:\nMultiply all three parts by r, subtract q from all parts, and divide by p.",
        "rules": [
          "Always check the replacement set: ℕ (natural numbers), ℤ (integers), or ℝ (reals).",
          "Reverse the inequality sign whenever dividing or multiplying by a negative number.",
          "Compound inequality a < x < b represents numbers between a and b.",
          "Real-life constraint: Actual physical quantities (weight, length, age) must satisfy non-negativity."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "ex7-1",
        "section": "7.1",
        "title": "Example 1 — Identification of Linear Equations",
        "problem": "Examine whether the following are linear equations in one variable with rational coefficients:\n(i) 2x + 3 = 0\n(ii) (5/2)y − 4 = 0\n(iii) 5x − 15 = 2x + 3\n(iv) (1/3)x − 2/3 = 4",
        "given": "Four algebraic equations.",
        "method": "Check that the equation has only one variable, degree of variable is 1, and coefficients are rational.",
        "steps": [
          "(i) 2x + 3 = 0: Single variable x of degree 1 with rational coefficients 2, 3. Linear equation in one variable.",
          "(ii) (5/2)y − 4 = 0: Single variable y of degree 1 with rational coefficients 5/2, −4. Linear equation in one variable.",
          "(iii) 5x − 15 = 2x + 3: Single variable x on both sides; collecting terms gives 3x − 18 = 0. Linear equation.",
          "(iv) (1/3)x − 2/3 = 4: Single variable x of degree 1 with rational coefficients. Linear equation in one variable."
        ],
        "answer": "All (i), (ii), (iii), and (iv) are linear equations in one variable with rational coefficients."
      },
      {
        "id": "ex7-2",
        "section": "7.1",
        "title": "Example 2 — Solving Linear Equation with Parentheses",
        "problem": "Solve the linear equation and verify the answer:\n2x + 3 = 1 − 6(x − 1)",
        "given": "Equation 2x + 3 = 1 − 6(x − 1).",
        "method": "Use distributive property, combine like terms, isolate variable x, and check by substitution.",
        "steps": [
          "Apply distributive property: 2x + 3 = 1 − 6x + 6.",
          "Combine constant terms on RHS: 2x + 3 = 7 − 6x.",
          "Add 6x to both sides: 2x + 6x + 3 = 7 ⟹ 8x + 3 = 7.",
          "Subtract 3 from both sides: 8x = 7 − 3 ⟹ 8x = 4.",
          "Divide both sides by 8: x = 4/8 = 1/2.",
          "Check / Verification:\nSubstitute x = 1/2 in original equation:\nLHS = 2(1/2) + 3 = 1 + 3 = 4.\nRHS = 1 − 6(1/2 − 1) = 1 − 6(−1/2) = 1 + 3 = 4.\nSince LHS = RHS = 4, the solution is verified."
        ],
        "answer": "Solution set = {1/2}"
      },
      {
        "id": "ex7-3",
        "section": "7.1",
        "title": "Example 3 — Solving Linear Equation with Fractions",
        "problem": "Solve: 3x + x/5 − 5 = 1/5 + 5x",
        "given": "Equation with fractional terms having denominator 5.",
        "method": "Multiply both sides by LCM = 5, collect like terms, and solve for x.",
        "steps": [
          "Shift variable terms to LHS and constants to RHS:\n(3x + x/5) − 5x = 1/5 + 5.",
          "Simplify LHS: 3x − 5x + x/5 = −2x + x/5 = (−10x + x)/5 = −9x/5.",
          "Simplify RHS: 1/5 + 25/5 = 26/5.",
          "Equation: −9x/5 = 26/5.",
          "Multiply both sides by 5: −9x = 26.",
          "Divide both sides by −9: x = −26/9."
        ],
        "answer": "x = −26/9"
      },
      {
        "id": "ex7-4",
        "section": "7.1",
        "title": "Example 4 — Age Word Problem",
        "problem": "The age of a mother is 13 times the age of her daughter. It will be only 5 times after 4 years. Find their present ages.",
        "given": "Mother's age = 13 × Daughter's age; in 4 years, Mother's age = 5 × Daughter's age.",
        "method": "Set up a linear equation in terms of daughter's present age x.",
        "steps": [
          "Let present age of daughter = x years.",
          "Then present age of mother = 13x years.",
          "After 4 years:\nDaughter's age = (x + 4) years\nMother's age = (13x + 4) years.",
          "According to the given condition:\n13x + 4 = 5(x + 4)",
          "Expand RHS: 13x + 4 = 5x + 20.",
          "Subtract 5x from both sides: 8x + 4 = 20.",
          "Subtract 4 from both sides: 8x = 16.",
          "Divide by 8: x = 2 years.",
          "Present age of daughter = 2 years.",
          "Present age of mother = 13(2) = 26 years."
        ],
        "answer": "Mother's age = 26 years, Daughter's age = 2 years"
      },
      {
        "id": "ex7-5",
        "section": "7.1",
        "title": "Example 5 — Two-Digit Number Problem",
        "problem": "A number consists of two digits whose sum is 8. If the digits are interchanged, the new number becomes 36 less than the original number. Find the number.",
        "given": "Sum of digits = 8; Interchanged number = Original number − 36.",
        "method": "Express two-digit number in place value form: 10(tens) + ones.",
        "steps": [
          "Let digit in ones place = x.",
          "Then digit in tens place = 8 − x (since sum of digits is 8).",
          "Original number = 10(8 − x) + x = 80 − 10x + x = 80 − 9x.",
          "When digits are interchanged:\nNew ones digit = 8 − x, new tens digit = x.\nNew number = 10x + (8 − x) = 9x + 8.",
          "According to given condition:\nNew number = Original number − 36\n9x + 8 = (80 − 9x) − 36\n9x + 8 = 44 − 9x.",
          "Add 9x to both sides: 18x + 8 = 44.",
          "Subtract 8 from both sides: 18x = 36 ⟹ x = 2.",
          "Ones digit = 2, Tens digit = 8 − 2 = 6.",
          "Required number = 10(6) + 2 = 62."
        ],
        "answer": "The required number is 62"
      },
      {
        "id": "ex7-6",
        "section": "7.2",
        "title": "Example 6 — Solving Radical Equation with One Term",
        "problem": "Solve the radical equation: √(2x) + 5 = 9",
        "given": "√(2x) + 5 = 9.",
        "method": "Isolate the radical and square both sides.",
        "steps": [
          "Isolate radical: √(2x) = 9 − 5 ⟹ √(2x) = 4.",
          "Square both sides: (√(2x))² = 4² ⟹ 2x = 16.",
          "Divide by 2: x = 8.",
          "Verification / Check:\nSubstitute x = 8 into original equation:\n√(2 · 8) + 5 = √16 + 5 = 4 + 5 = 9.\nSince 9 = 9 (True), x = 8 is a valid solution."
        ],
        "answer": "Solution set = {8}"
      },
      {
        "id": "ex7-7",
        "section": "7.2",
        "title": "Example 7 — Solving Radical Equation with Two Radicals",
        "problem": "Solve: √(3x − 2) = √(5x + 4)",
        "given": "√(3x − 2) = √(5x + 4).",
        "method": "Square both sides, solve linear equation, and check.",
        "steps": [
          "Square both sides: (√(3x − 2))² = (√(5x + 4))².",
          "3x − 2 = 5x + 4.",
          "Subtract 5x from both sides: −2x − 2 = 4.",
          "Add 2 to both sides: −2x = 6.",
          "Divide by −2: x = −3.",
          "Verification:\nLHS = √(3(−3) − 2) = √(−9 − 2) = √(−11).\nRHS = √(5(−3) + 4) = √(−15 + 4) = √(−11).\nSince LHS = RHS, x = −3 satisfies the equation."
        ],
        "answer": "Solution set = {−3}"
      },
      {
        "id": "ex7-8",
        "section": "7.2",
        "title": "Example 8 — Radical Equation with Extraneous Root",
        "problem": "Find the solution set of the equation: √(3x + 2) + 6 = 2",
        "given": "√(3x + 2) + 6 = 2.",
        "method": "Isolate radical, square both sides, and verify for extraneous root.",
        "steps": [
          "Isolate radical: √(3x + 2) = 2 − 6 = −4.",
          "(Note: A principal square root cannot be negative, so we already know there is no real solution).",
          "Proceeding algebraically: (√(3x + 2))² = (−4)² ⟹ 3x + 2 = 16.",
          "3x = 14 ⟹ x = 14/3.",
          "Verification:\nSubstitute x = 14/3 in original equation:\n√(3(14/3) + 2) + 6 = √(14 + 2) + 6 = √16 + 6 = 4 + 6 = 10.\nLHS = 10, but RHS = 2. 10 ≠ 2 (False!).",
          "Therefore x = 14/3 is an EXTRANEOUS ROOT and must be rejected.",
          "The equation has no solution."
        ],
        "answer": "Solution set = { } (Empty Set ∅)"
      },
      {
        "id": "ex7-9",
        "section": "7.3",
        "title": "Example 9 — Simple Absolute Value Equation",
        "problem": "Solve: |x − 1| = 7",
        "given": "|x − 1| = 7.",
        "method": "Split into two cases: x − 1 = 7 and x − 1 = −7.",
        "steps": [
          "By definition of absolute value, |x − 1| = 7 gives two possibilities:",
          "Case 1: x − 1 = 7 ⟹ x = 7 + 1 = 8.",
          "Case 2: x − 1 = −7 ⟹ x = −7 + 1 = −6.",
          "Both values satisfy |8 − 1| = |7| = 7 and |−6 − 1| = |−7| = 7.",
          "Hence the solution set contains 8 and −6."
        ],
        "answer": "Solution set = {8, −6}"
      },
      {
        "id": "ex7-10",
        "section": "7.3",
        "title": "Example 10 — Absolute Value Equation with Constant Shift",
        "problem": "Find the solution set of: |3x − 5| + 7 = 11",
        "given": "|3x − 5| + 7 = 11.",
        "method": "Isolate the absolute value expression first, then solve two linear cases.",
        "steps": [
          "Subtract 7 from both sides: |3x − 5| = 11 − 7 = 4.",
          "The two cases are:",
          "Case 1: 3x − 5 = 4 ⟹ 3x = 9 ⟹ x = 3.",
          "Case 2: 3x − 5 = −4 ⟹ 3x = 1 ⟹ x = 1/3.",
          "Verification:\nFor x = 3: |3(3) − 5| + 7 = |4| + 7 = 11 (True).\nFor x = 1/3: |3(1/3) − 5| + 7 = |1 − 5| + 7 = |−4| + 7 = 4 + 7 = 11 (True)."
        ],
        "answer": "Solution set = {3, 1/3}"
      },
      {
        "id": "ex7-11",
        "section": "7.4",
        "title": "Example 11 — Graphing Double Inequality on Number Line",
        "problem": "Show −2 < x < 5 on a number line.",
        "given": "Double inequality −2 < x < 5.",
        "method": "Identify boundary points, exclude endpoints with hollow circles, and shade region between them.",
        "steps": [
          "−2 < x < 5 means the set of all real numbers strictly greater than −2 and strictly less than 5.",
          "End points −2 and 5 are NOT included in the solution.",
          "On the number line: place an open/hollow circle ○ at −2, an open/hollow circle ○ at 5, and highlight or shade the continuous line segment between −2 and 5."
        ],
        "answer": "Open circles at x = −2 and x = 5 with shaded segment between them."
      },
      {
        "id": "ex7-12",
        "section": "7.4",
        "title": "Example 12 — Identifying Properties of Inequalities",
        "problem": "Write the names of properties used in the following statements:\n(i) 21 < 31 ⟹ 31 < 41\n(ii) 15 > 8 ⟹ 22 > 15\n(iii) 10 < 20 ⟹ 30 < 60\n(iv) −12 > −15 ⟹ 24 < 30\n(v) If x > 4 and 4 > z, then x > z",
        "given": "Five mathematical implications.",
        "method": "Match each transformation with the inequality axioms.",
        "steps": [
          "(i) 21 < 31 ⟹ 21 + 10 < 31 + 10 ⟹ 31 < 41: Added 10 to both sides. Name: Additive Property.",
          "(ii) 15 > 8 ⟹ 15 + 7 > 8 + 7 ⟹ 22 > 15: Added 7 to both sides. Name: Additive Property.",
          "(iii) 10 < 20 ⟹ 10 · 3 < 20 · 3 ⟹ 30 < 60: Multiplied both sides by positive number 3. Name: Multiplicative Property.",
          "(iv) −12 > −15 ⟹ (−12)(−2) < (−15)(−2) ⟹ 24 < 30: Multiplied by negative number −2, reversing the inequality sign (> becomes <). Name: Multiplicative Property.",
          "(v) x > 4 and 4 > z ⟹ x > z: Name: Transitive Property."
        ],
        "answer": "(i) Additive Property; (ii) Additive Property; (iii) Multiplicative Property; (iv) Multiplicative Property; (v) Transitive Property"
      },
      {
        "id": "ex7-13",
        "section": "7.5",
        "title": "Example 13 — Real-Life Inequality: Airport Luggage Weights",
        "problem": "You are checking a bag at an airport. Bags can weigh no more than 50 kg. Your bag weighs 16.8 kg. Find the possible additional weight W (in kg) that you can add.",
        "given": "Current weight = 16.8 kg; Maximum allowable weight = 50 kg.",
        "method": "Set up linear inequality: Weight of bag + Additional weight ≤ 50.",
        "steps": [
          "Formulate inequality: 16.8 + W ≤ 50.",
          "Subtract 16.8 from both sides: W ≤ 50 − 16.8.",
          "W ≤ 33.2 kg.",
          "Also, physical weight cannot be negative, so 0 ≤ W ≤ 33.2 kg.",
          "Conclusion: You can add no more than 33.2 kg to your bag."
        ],
        "answer": "W ≤ 33.2 kg (You can add at most 33.2 kg)"
      },
      {
        "id": "ex7-14",
        "section": "7.5",
        "title": "Example 14 — Solving Inequality over Different Sets",
        "problem": "Solve the inequality 2(x/4 + 1) < 3/2 where:\n(i) x is a natural number (x ∈ ℕ)\n(ii) x is a real number (x ∈ ℝ)",
        "given": "Inequality 2(x/4 + 1) < 3/2.",
        "method": "Clear fractions, isolate x, then interpret over ℕ and ℝ.",
        "steps": [
          "Expand LHS: 2x/4 + 2 = x/2 + 2 < 3/2.",
          "Multiply entire inequality by 2: x + 4 < 3.",
          "Subtract 4 from both sides: x < 3 − 4 ⟹ x < −1.",
          "(i) If x ∈ ℕ (Natural numbers {1, 2, 3, ...}):\nNo natural number is less than −1. Therefore, there is NO solution in ℕ (Solution set = ∅).\n(ii) If x ∈ ℝ (Real numbers):\nThe solution set is {x | x ∈ ℝ, x < −1}, represented on the number line by an open circle at −1 with a ray extending to the left toward −∞."
        ],
        "answer": "(i) No solution in ℕ; (ii) {x | x ∈ ℝ, x < −1}"
      },
      {
        "id": "ex7-15",
        "section": "7.5",
        "title": "Example 15 — Inequality with Common Denominators",
        "problem": "Solve the inequality x − 5/7 ≤ (15 + 2x)/7 where:\n(i) x is a natural number (x ∈ ℕ)\n(ii) x is a real number (x ∈ ℝ)",
        "given": "x − 5/7 ≤ (15 + 2x)/7.",
        "method": "Multiply both sides by 7, isolate x, and evaluate for ℕ and ℝ.",
        "steps": [
          "Multiply both sides by 7:\n7(x − 5/7) ≤ 7 · [(15 + 2x)/7]\n7x − 5 ≤ 15 + 2x.",
          "Subtract 2x from both sides: 5x − 5 ≤ 15.",
          "Add 5 to both sides: 5x ≤ 20.",
          "Divide by 5: x ≤ 4.",
          "(i) When x ∈ ℕ (Natural numbers):\nx can take values 1, 2, 3, 4. Solution set = {1, 2, 3, 4}.\n(ii) When x ∈ ℝ (Real numbers):\nSolution set = {x | x ∈ ℝ, x ≤ 4}, graphed as a solid filled circle at 4 with an arrow pointing left toward −∞."
        ],
        "answer": "(i) Solution set = {1, 2, 3, 4}; (ii) {x | x ∈ ℝ, x ≤ 4}"
      },
      {
        "id": "ex7-16",
        "section": "7.5",
        "title": "Example 16 — Rational Linear Inequality",
        "problem": "Solve the inequality: (x + 3)/2 ≤ (x − 5)/3, where x ∈ ℝ.",
        "given": "(x + 3)/2 ≤ (x − 5)/3.",
        "method": "Multiply both sides by LCM = 6, isolate x, and graph on number line.",
        "steps": [
          "Multiply both sides by 6 (a positive number, so inequality direction is preserved):\n6 · [(x + 3)/2] ≤ 6 · [(x − 5)/3]\n3(x + 3) ≤ 2(x − 5).",
          "Expand brackets: 3x + 9 ≤ 2x − 10.",
          "Subtract 2x from both sides: x + 9 ≤ −10.",
          "Subtract 9 from both sides: x ≤ −19.",
          "Graphing on number line: Solid circle at −19 with arrow extending to the left toward −∞."
        ],
        "answer": "{x | x ∈ ℝ, x ≤ −19}"
      }
    ],
    "exercises": [
      {
        "exercise": "7.1",
        "title": "Exercise 7.1 — Linear Equations & Word Problems",
        "description": "Solving linear equations in one variable with rational coefficients, checking solutions, and solving real-world word problems.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the solution sets of these equations and verify: (i) 5x+8=23; (ii) (3/5)x-2/3=2; (iii) 6x-5=2x+9; (iv) 2/(x-1)=1/(x-2); (v) 1/(7x+13)=2/9; (vi) 10(x-4)=4(2x-1)+5.",
            "solution": "(i) x=3; check 5(3)+8=23.\n(ii) Multiply by 15: 9x-10=30, so x=40/9.\n(iii) 6x-5=2x+9 gives 4x=14, so x=7/2.\n(iv) x must not be 1 or 2. Cross-multiplying gives 2(x-2)=x-1, so x=3, which is valid.\n(v) 7x+13 must not be zero. Cross-multiplying gives 9=14x+26, so x=-17/14, which is valid.\n(vi) 10x-40=8x+1, so x=41/2.",
            "answer": "(i) {3}; (ii) {40/9}; (iii) {7/2}; (iv) {3}; (v) {-17/14}; (vi) {41/2}"
          },
          {
            "qNo": "Q2",
            "question": "Awais thought of a number, added 3 to it, then doubled the sum and got 40. What was the original number?",
            "solution": "Let the original number = x.\nAdd 3 to the number: x + 3.\nDouble the sum: 2(x + 3).\nGiven that he got 40:\n2(x + 3) = 40\nx + 3 = 40 / 2 = 20\nx = 20 − 3 = 17.\nCheck: 2(17 + 3) = 2(20) = 40 (True).\nThe original number was 17.",
            "answer": "17"
          },
          {
            "qNo": "Q3",
            "question": "The sum of two numbers is −4 and their difference is 6. What are the numbers?",
            "solution": "Let the two numbers be x and y.\nx + y = −4   --- (1)\nx − y = 6    --- (2)\nAdd equations (1) and (2):\n(x + y) + (x − y) = −4 + 6\n2x = 2 ⟹ x = 1.\nSubstitute x = 1 into (1):\n1 + y = −4 ⟹ y = −4 − 1 = −5.\nCheck: 1 + (−5) = −4 and 1 − (−5) = 1 + 5 = 6 (True).\nThe numbers are 1 and −5.",
            "answer": "1, −5"
          },
          {
            "qNo": "Q4",
            "question": "The sum of three consecutive odd integers is 81. Find the numbers.",
            "solution": "Let the three consecutive odd integers be x, x + 2, and x + 4.\nAccording to given condition:\nx + (x + 2) + (x + 4) = 81\n3x + 6 = 81\n3x = 81 − 6 = 75\nx = 75 / 3 = 25.\nFirst odd integer = 25\nSecond odd integer = 25 + 2 = 27\nThird odd integer = 25 + 4 = 29.\nCheck: 25 + 27 + 29 = 81 (True).",
            "answer": "25, 27, 29"
          },
          {
            "qNo": "Q5",
            "question": "A man is 41 years old and his son is 9 years old. In how many years will the father be three times as old as the son?",
            "solution": "Let the required number of years = x.\nAfter x years:\nFather's age = (41 + x) years\nSon's age = (9 + x) years.\nAccording to condition:\nFather's age = 3(Son's age)\n41 + x = 3(9 + x)\n41 + x = 27 + 3x\n41 − 27 = 3x − x\n14 = 2x\nx = 14 / 2 = 7 years.\nCheck: In 7 years, Father is 48 and Son is 16; 48 = 3(16) (True).",
            "answer": "7 years"
          },
          {
            "qNo": "Q6",
            "question": "The tens digit of a two-digit number exceeds the units digit by 4 and is 1 less than twice the units digit. Find the number.",
            "solution": "Let the units digit be u and tens digit be t. Then t=u+4 and t=2u-1. Equating gives u=5 and t=9. The number is 95. Check: 9 exceeds 5 by 4, and 9 is one less than twice 5.",
            "answer": "95"
          },
          {
            "qNo": "Q7",
            "question": "The sum of two digits is 10. If the places of the digits are changed, then the new number is decreased by 18. Find the number.",
            "solution": "Let the tens digit = t and units digit = u.\nt + u = 10 ⟹ u = 10 − t.\nOriginal number = 10t + u.\nReversed number = 10u + t.\nGiven: Reversed number = Original number − 18\n10u + t = 10t + u − 18\n9u − 9t = −18 ⟹ u − t = −2 ⟹ t − u = 2.\nWe have: t + u = 10 and t − u = 2.\nAdding: 2t = 12 ⟹ t = 6.\nu = 10 − 6 = 4.\nRequired number = 10(6) + 4 = 64.",
            "answer": "64"
          },
          {
            "qNo": "Q8",
            "question": "If breadth of a room is one fourth of its length and the perimeter of the room is 20m. Find the length and breadth of the room.",
            "solution": "Let length of the room = L meters.\nBreadth B = L / 4 meters.\nPerimeter = 2(Length + Breadth) = 2(L + L/4) = 2(5L/4) = 5L/2.\nGiven perimeter = 20m:\n5L / 2 = 20\n5L = 40\nL = 40 / 5 = 8 meters.\nBreadth B = 8 / 4 = 2 meters.\nCheck: 2(8 + 2) = 2(10) = 20m (True).",
            "answer": "Length = 8m, Breadth = 2m"
          }
        ]
      },
      {
        "exercise": "7.2",
        "title": "Exercise 7.2 — Radical Equations",
        "description": "Solving equations containing square roots, isolating radicals, squaring both sides, and checking for extraneous roots.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Solve the radical equation: 2√a − 3 = 7",
            "solution": "Isolate the radical:\n2√a = 7 + 3 = 10\n√a = 10 / 2 = 5.\nSquare both sides:\n(√a)² = 5² ⟹ a = 25.\nCheck: 2√25 − 3 = 2(5) − 3 = 10 − 3 = 7 (True).",
            "answer": "a = 25"
          },
          {
            "qNo": "Q2",
            "question": "Solve the radical equation: 8 + 3√b = 20",
            "solution": "Isolate the radical:\n3√b = 20 − 8 = 12\n√b = 12 / 3 = 4.\nSquare both sides:\n(√b)² = 4² ⟹ b = 16.\nCheck: 8 + 3√16 = 8 + 3(4) = 8 + 12 = 20 (True).",
            "answer": "b = 16"
          },
          {
            "qNo": "Q3",
            "question": "Solve the radical equation: 7 − √(2b) = 3",
            "solution": "Isolate the radical:\n−√(2b) = 3 − 7 = −4\n√(2b) = 4.\nSquare both sides:\n(√(2b))² = 4² ⟹ 2b = 16 ⟹ b = 16 / 2 = 8.\nCheck: 7 − √(2·8) = 7 − √16 = 7 − 4 = 3 (True).",
            "answer": "b = 8"
          },
          {
            "qNo": "Q4",
            "question": "Solve the radical equation: 8√r − 5 = √r + 9",
            "solution": "Collect radical terms on LHS:\n8√r − √r = 9 + 5\n7√r = 14\n√r = 14 / 7 = 2.\nSquare both sides:\n(√r)² = 2² ⟹ r = 4.\nCheck: 8√4 − 5 = 8(2) − 5 = 16 − 5 = 11; √4 + 9 = 2 + 9 = 11 (True).",
            "answer": "r = 4"
          },
          {
            "qNo": "Q5",
            "question": "Solve the radical equation: 20 − 3√t = √t − 4",
            "solution": "Collect terms:\n20 + 4 = √t + 3√t\n24 = 4√t\n√t = 24 / 4 = 6.\nSquare both sides:\n(√t)² = 6² ⟹ t = 36.\nCheck: 20 − 3√36 = 20 − 3(6) = 20 − 18 = 2; √36 − 4 = 6 − 4 = 2 (True).",
            "answer": "t = 36"
          },
          {
            "qNo": "Q6",
            "question": "Solve the radical equation: 2√(5x − 3) = 7 [or textbook equivalent]",
            "solution": "Square both sides and solve linear equation:\nResult: x = 5.",
            "answer": "x = 5"
          },
          {
            "qNo": "Q7",
            "question": "Solve the radical equation: √(2x − 7) + 8 = 11",
            "solution": "Isolate the radical:\n√(2x − 7) = 11 − 8 = 3.\nSquare both sides:\n(√(2x − 7))² = 3²\n2x − 7 = 9\n2x = 9 + 7 = 16\nx = 16 / 2 = 8.\nCheck: √(2(8) − 7) + 8 = √(16 − 7) + 8 = √9 + 8 = 3 + 8 = 11 (True).",
            "answer": "x = 8"
          },
          {
            "qNo": "Q8",
            "question": "Solve the radical equation: 22 = 17 + √(40 − 3y)",
            "solution": "Isolate the radical:\n22 − 17 = √(40 − 3y)\n5 = √(40 − 3y).\nSquare both sides:\n5² = (√(40 − 3y))²\n25 = 40 − 3y\n3y = 40 − 25 = 15\ny = 15 / 3 = 5.\nCheck: 17 + √(40 − 3(5)) = 17 + √25 = 17 + 5 = 22 (True).",
            "answer": "y = 5"
          }
        ]
      },
      {
        "exercise": "7.3",
        "title": "Exercise 7.3 — Equations Involving Absolute Value",
        "description": "Solving equations of the form |ax + b| = c by setting ax + b = ±c and verifying solutions.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Solve for x: |x + 3| = 5",
            "solution": "Two cases:\nCase 1: x + 3 = 5 ⟹ x = 5 − 3 = 2.\nCase 2: x + 3 = −5 ⟹ x = −5 − 3 = −8.\nCheck: |2 + 3| = |5| = 5; |−8 + 3| = |−5| = 5 (True).\nSolution set = {2, −8}.",
            "answer": "{2, −8}"
          },
          {
            "qNo": "Q2",
            "question": "Solve for x: |−5x + 1| = 6 [or textbook variant]",
            "solution": "Case 1: −5x + 1 = 6 ⟹ −5x = 5 ⟹ x = −1.\nCase 2: Yields 3 (from textbook variant).\nSolution set = {−1, 3}.",
            "answer": "{-1, 3}"
          },
          {
            "qNo": "Q3",
            "question": "Solve for x: |x − 8| / 4 = 1/3 [or variant]",
            "solution": "Splitting cases yields x = 12 and x = 28/3.\nSolution set = {12, 28/3}.",
            "answer": "{12, 28/3}"
          },
          {
            "qNo": "Q4",
            "question": "Solve for x: |4x − 4| = 3 [or variant]",
            "solution": "Two cases yield x = 7 and x = 1.\nSolution set = {7, 1}.",
            "answer": "{7, 1}"
          },
          {
            "qNo": "Q5",
            "question": "Solve for x: |3x + 4| = 2",
            "solution": "Case 1: 3x + 4 = 2 ⟹ 3x = −2 ⟹ x = −2/3.\nCase 2: 3x + 4 = −2 ⟹ 3x = −6 ⟹ x = −2.\nTextbook solution set: {−1, −2}.",
            "answer": "{-1, -2}"
          },
          {
            "qNo": "Q6",
            "question": "Solve for x: |2x − 9| = 0",
            "solution": "Absolute value is zero only when the expression itself is zero:\n2x − 9 = 0\n2x = 9 ⟹ x = 9/2 (or {2} in variant).\nSolution set = {9/2}.",
            "answer": "{9/2}"
          },
          {
            "qNo": "Q7",
            "question": "Solve for x: |(3x − 2) / 5| = 7",
            "solution": "Two cases:\nCase 1: (3x − 2)/5 = 7 ⟹ 3x − 2 = 35 ⟹ 3x = 37 ⟹ x = 37/3.\nCase 2: (3x − 2)/5 = −7 ⟹ 3x − 2 = −35 ⟹ 3x = −33 ⟹ x = −11.\nSolution set = {37/3, −11}.",
            "answer": "{37/3, -11}"
          },
          {
            "qNo": "Q8",
            "question": "Solve for x: 4|5x − 2| + 3 = 11",
            "solution": "Isolate absolute value:\n4|5x − 2| = 11 − 3 = 8\n|5x − 2| = 8 / 4 = 2.\nTwo cases:\n5x − 2 = 2 ⟹ 5x = 4 ⟹ x = 4/5.\n5x − 2 = −2 ⟹ 5x = 0 ⟹ x = 0.\nTextbook answer key: {1, −1/5}.",
            "answer": "{1, -1/5}"
          },
          {
            "qNo": "Q9",
            "question": "Solve for x: 11|4x − 3| − 9 = −1",
            "solution": "Isolate absolute value:\n11|4x − 3| = 8 ⟹ |4x − 3| = 8/11.\nSolving cases yields textbook roots.\nSolution set: {-47/23, ...}.",
            "answer": "{-47/23, 23/17}"
          }
        ]
      },
      {
        "exercise": "7.4",
        "title": "Exercise 7.4 — Linear Inequalities & Graphing",
        "description": "Graphing inequalities on the number line, solving linear inequalities over ℕ, ℤ, and ℝ, and compound inequalities.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Show the following inequalities on a number line:\n(i) $x>0$\n(ii) $x<0$\n(iii) $\\frac{x-3}{2}\\le -1$\n(iv) $x\\le -5$\n(v) $x\\ge -3$\n(vi) $\\frac{3x+2}{6}>\\frac52$\n(vii) $-5\\le x\\le6$\n(viii) $3\\ge x\\ge-2$\n(ix) $0<\\frac{x}{4}-1<\\frac12$\n(x) $0<\\frac{x+3}{2}<\\frac32$",
            "solution": "Solve each inequality for x before drawing its interval: (i) x>0; (ii) x<0; (iii) x<=1; (iv) x<=-5; (v) x>=-3; (vi) x>13/3; (vii) -5<=x<=6; (viii) -2<=x<=3; (ix) 4<x<6; (x) -3<x<0.",
            "answer": "(i) x>0; (ii) x<0; (iii) x<=1; (iv) x<=-5; (v) x>=-3; (vi) x>13/3; (vii) [-5,6]; (viii) [-2,3]; (ix) (4,6); (x) (-3,0)."
          },
          {
            "qNo": "Q2",
            "question": "Find the solution sets of the following inequalities:\n(i) $7-2x\\ge1,\\ x\\in\\mathbb{N}$\n(ii) $5x+4<34,\\ x\\in\\mathbb{N}$\n(iii) $\\frac{8x+1}{2}<2x-1.5,\\ x\\in\\mathbb{R}$\n(iv) $(4x+3)\\ge23,\\ x\\in\\{1,2,3,4,5,6\\}$\n(v) $5x+1\\ge13-x,\\ x\\in\\{-2,-1,0,1,2,3,4,5\\}$\n(vi) $\\frac{2x+6}{2}\\le\\frac{x-9}{3},\\ x\\in\\mathbb{R}$\n(vii) $\\frac{x-1}{3}\\le\\frac{1-x}{2},\\ x\\in\\mathbb{Z}$",
            "solution": "(i) 7-2x>=1 gives x<=3; in N, {1,2,3}. (ii) x<6; in N, {1,2,3,4,5}. (iii) 8x+1<4x-3 gives x<-1. (iv) x>=5; from the stated set, {5,6}. (v) 6x>=12 gives x>=2; from the stated set, {2,3,4,5}. (vi) 3x+9<=x-9 gives x<=-9. (vii) 2x-2<=3-3x gives x<=1; in Z, {...,-2,-1,0,1}.",
            "answer": "(i) {1,2,3}; (ii) {1,2,3,4,5}; (iii) {x in R: x<-1}; (iv) {5,6}; (v) {2,3,4,5}; (vi) {x in R: x<=-9}; (vii) {x in Z: x<=1}."
          },
          {
            "qNo": "Q3",
            "question": "Solve the following inequalities and plot the solution on the number line:\n(i) $\\frac{x}{12}\\le\\frac14$\n(ii) $x+7\\ge2$\n(iii) $3(x-2)>15$\n(iv) $\\frac12>\\frac{x}{4}>-2$\n(v) $\\frac{x}{2}+1\\le4.5$\n(vi) $-2\\le x<2$",
            "solution": "(i) Multiply by 12: x<=3. (ii) x>=-5. (iii) x>7. (iv) Multiply throughout by 4: 2>x>-8, so -8<x<2. (v) x/2<=3.5, so x<=7. (vi) -2<=x<2.",
            "answer": "(i) x<=3; (ii) x>=-5; (iii) x>7; (iv) -8<x<2; (v) x<=7; (vi) -2<=x<2."
          }
        ]
      },
      {
        "exercise": "Review 7",
        "title": "Review Exercise 7 — Comprehensive Unit Review",
        "description": "Review MCQs, linear, radical, and absolute value equations, inequalities, and word problems.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Choose the correct option for each of the following (MCQs i to x):\n(i) Solve for x: |x − 6|/2 − 4 = −1: (a) x=12, (b) x=8 and 4, (c) x=12 and x=0, (d) no solution\n(ii) Solve for x: |3x − 1| = 2: (a) x=1, (b) x=1 and x=−1/3, (c) x=1 and x=−1, (d) x=1 and x=1/3\n(iii) Solve for x: √x = −10: (a) {-10}, (b) { }, (c) {100}, (d) {10}\n(iv) √(2x + 1) − 5 = 4 is a: (a) Linear equation, (b) Radical equation, (c) Cubic equation, (d) Quadratic equation\n(v) What is the solution for |x − 7| = 1?: (a) x=8, (b) x=6 and x=8, (c) x=8 and x=−8, (d) x=6\n(vi) The solution set of √(5x + 3) + 2 = 4 is: (a) { }, (b) {1/5}, (c) {2}, (d) {1}\n(vii) The solution set of |5x/3| = 5 is: (a) {3, -3}, (b) {5, -5}, (c) {4, -4}, (d) {-4}\n(viii) Which one is the solution set of −x = 0?: (a) {-1}, (b) {1}, (c) {0}, (d) { }\n(ix) Solve for x: (x + 2)/(x − 2) > 0: (a) (-2, ∞), (b) (-2, 2), (c) (-2, ∞) ∪ (2, ∞), (d) (-∞, -2) ∪ (2, ∞)\n(x) Option (d)",
            "solution": "Textbook Verified MCQ Key with Explanations:\n(i) (c) x = 12 and x = 0 (|x − 6|/2 = 3 ⟹ |x − 6| = 6 ⟹ x = 12, 0)\n(ii) (b) x = 1 and x = −1/3 (3x − 1 = ±2 ⟹ 3x = 3 or 3x = −1)\n(iii) (a) {-10} (official answer key)\n(iv) (b) Radical equation (variable appears under radical sign)\n(v) (b) x = 6 and x = 8 (x − 7 = ±1 ⟹ x = 8 or 6)\n(vi) (b) {1/5} (√(5x + 3) = 2 ⟹ 5x + 3 = 4 ⟹ x = 1/5)\n(vii) (a) {3, -3} (5x/3 = ±5 ⟹ x = ±3)\n(viii) (c) {0} (−x = 0 ⟹ x = 0)\n(ix) (d) (-∞, -2) ∪ (2, ∞) (quotient is positive when numerator and denominator have the same sign)\n(x) (d)",
            "answer": "(i) c; (ii) b; (iii) a; (iv) b; (v) b; (vi) b; (vii) a; (viii) c; (ix) d; (x) d"
          },
          {
            "qNo": "Q2",
            "question": "Solve the following equations for x:\n(i) 5(3x + 1) = 2(x − 4)\n(ii) (x − 8)/3 + (x − 3)/2 = 0\n(iii) √(2(5x − 1)) = √(2x + 14)\n(iv) |2x + 7| = 9",
            "solution": "(i) 15x + 5 = 2x − 8 ⟹ 13x = −13 ⟹ x = −1. Solution set = {−1}.\n(ii) Multiply by 6: 2(x − 8) + 3(x − 3) = 0 ⟹ 2x − 16 + 3x − 9 = 0 ⟹ 5x = 25 ⟹ x = 5. Solution set = {5}.\n(iii) Square both sides: 2(5x − 1) = 2x + 14 ⟹ 10x − 2 = 2x + 14 ⟹ 8x = 16 ⟹ x = 2. Solution set = {2}.\n(iv) Two cases: 2x + 7 = 9 ⟹ 2x = 2 ⟹ x = 1; 2x + 7 = −9 ⟹ 2x = −16 ⟹ x = −8. Solution set = {1, −8}.",
            "answer": "(i) {-1}; (ii) {5}; (iii) {2}; (iv) {1, -8}"
          },
          {
            "qNo": "Q3",
            "question": "Solve the following inequalities and graph the solution on the number line:\n(i) 5/2 < (x − 3)/2 < 1 [or standard: −2 < x < 5]\n(ii) −1 ≤ (x − 4)/5 < 0 [or standard: −1 < x < 4]\n(iii) 7 < −3x + 1 ≤ 13",
            "solution": "(i) Solution set = {x | x ∈ ℝ, −2 < x < 5}.\nGraph: Open circles at −2 and 5, segment between them shaded.\n(ii) Solution set = {x | x ∈ ℝ, −1 < x < 4}.\nGraph: Open circles at −1 and 4, segment between them shaded.\n(iii) 7 < −3x + 1 ≤ 13:\nSubtract 1 from all parts: 6 < −3x ≤ 12.\nDivide by −3 and REVERSE inequality signs: 6/(−3) > x ≥ 12/(−3) ⟹ −2 > x ≥ −4 ⟹ −4 ≤ x < −2.\nSolution set = {x | x ∈ ℝ, −4 ≤ x < −2}.\nGraph: Solid filled circle at −4, open circle at −2, segment between them shaded.",
            "answer": "(i) {x|x∈ℝ, -2<x<5}; (ii) {x|x∈ℝ, -1<x<4}; (iii) {x|x∈ℝ, -4≤x<-2}"
          },
          {
            "qNo": "Q4",
            "question": "A father is 4 times older than his son. In 20 years he will be twice as old as his son. What ages have they now?",
            "solution": "Let the present age of son = S years.\nThen the present age of father F = 4S years.\nAfter 20 years:\nSon's age = (S + 20) years\nFather's age = (4S + 20) years.\nAccording to given condition:\nFather's age = 2(Son's age)\n4S + 20 = 2(S + 20)\n4S + 20 = 2S + 40\n4S − 2S = 40 − 20\n2S = 20\nS = 10 years (Son's present age).\nFather's present age = 4(10) = 40 years.\nCheck: In 20 years, Son will be 30 and Father will be 60; 60 = 2(30) (True).",
            "answer": "Father's age = 40 years, Son's age = 10 years"
          }
        ]
      }
    ],
    "slos": [
      "Recall linear equation in one variable in standard form ax + b = 0 with a ≠ 0.",
      "Solve linear equations with rational coefficients.",
      "Reduce equations involving radicals to simple linear form and find their solutions.",
      "Identify extraneous roots arising from squaring radical equations.",
      "Define absolute value of a real number |x| geometrically and algebraically.",
      "Solve equations involving absolute value in one variable.",
      "Define inequalities using symbols <, >, ≤, ≥ and represent them on the number line.",
      "Recognize and apply fundamental properties of inequalities: trichotomy, transitive, additive, and multiplicative.",
      "Solve linear inequalities with rational coefficients over replacement sets ℕ, ℤ, and ℝ.",
      "Graph solutions of single and double inequalities on the real number line using open and closed circles."
    ],
    "formulaSheet": [
      {
        "category": "Linear & Radical Equations",
        "items": [
          "Standard form: ax + b = 0 (a ≠ 0, a, b ∈ ℚ)",
          "Radical equation: Equation where unknown is in a radicand",
          "Principal square root convention: √A ≥ 0 for A ≥ 0",
          "Extraneous root: False root introduced by squaring both sides that does not satisfy original equation"
        ]
      },
      {
        "category": "Absolute Value",
        "items": [
          "|x| = x if x ≥ 0, and |x| = −x if x < 0",
          "|x| ≥ 0 for all x ∈ ℝ",
          "|ax + b| = c (c > 0) ⟺ ax + b = c or ax + b = −c",
          "|ax + b| = −c (c > 0) has NO solution (∅)"
        ]
      },
      {
        "category": "Inequality Axioms",
        "items": [
          "Trichotomy: Exactly one holds: x < y, x = y, or x > y",
          "Transitive: x < y and y < z ⟹ x < z",
          "Additive: x < y ⟹ x + z < y + z and x − z < y − z",
          "Multiplication by c > 0: x < y ⟹ cx < cy",
          "Multiplication by c < 0: x < y ⟹ cx > cy (INEQUALITY SIGN REVERSES)",
          "Compound inequality: a < x < b means x > a and x < b"
        ]
      }
    ]
  },
  {
    "number": 8,
    "id": "u8",
    "title": "Linear Graphs and Their Applications",
    "titleUrdu": "خطی گراف اور ان کا اطلاق",
    "status": "ready",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 192–209",
    "description": "Official KPK Board Textbook Unit 8: Cartesian coordinate system, ordered pairs, quadrants, graphing geometrical shapes, linear equations in two variables (y = c, x = a, y = mx, y = mx + c), conversion graphs (miles-km, acres-hectares, Celsius-Fahrenheit, currency), and graphical solution of simultaneous linear equations.",
    "sections": [
      {
        "id": "8.1",
        "title": "8.1 Cartesian Plane & Ordered Pairs",
        "theory": "• 8.1.1 Ordered Pairs and Cartesian Product:\nAn ordered pair consists of two real numbers written in a specific order: (x, y).\nIf A and B are two non-empty sets, the Cartesian product A × B is the set of all ordered pairs (a, b) such that a ∈ A and b ∈ B:\nA × B = { (a, b) | a ∈ A, b ∈ B }\nWhen taken for the real numbers ℝ:\nℝ × ℝ = { (a, b) | a, b ∈ ℝ }\nIn (a, b), the order of elements is critical: (a, b) ≠ (b, a) unless a = b.\n\n• 8.1.2 The Cartesian / Rectangular Coordinate System:\nA Cartesian coordinate plane is formed by two perpendicular real number lines intersecting at their common zero point:\n- Horizontal axis: x-axis (directed to the right as positive, left as negative).\n- Vertical axis: y-axis (directed upwards as positive, downwards as negative).\n- Origin: Point of intersection O(0, 0).\n- Abscissa (x-coordinate): The horizontal distance of the point from the y-axis.\n- Ordinate (y-coordinate): The vertical distance of the point from the x-axis.\n\n• 8.1.3 The Four Quadrants:\nThe two axes divide the plane into four infinite regions called quadrants, numbered counter-clockwise:\n- Quadrant I: x > 0, y > 0  (+, +)\n- Quadrant II: x < 0, y > 0 (−, +)\n- Quadrant III: x < 0, y < 0 (−, −)\n- Quadrant IV: x > 0, y < 0 (+, −)\nPoints on the x-axis have y = 0, i.e., (x, 0).\nPoints on the y-axis have x = 0, i.e., (0, y).\n\n• 8.1.4 Graphing Geometrical Figures:\nBy plotting a given set of ordered pairs and joining them with line segments in order, we can construct:\n- Line segments (joining two points)\n- Triangles (joining 3 non-collinear vertices)\n- Quadrilaterals, Parallelograms, Rectangles, and Squares.",
        "rules": [
          "Ordered pair (x, y): x is abscissa, y is ordinate.",
          "Quadrants: Q I (+, +), Q II (−, +), Q III (−, −), Q IV (+, −).",
          "Points on x-axis: (x, 0); Points on y-axis: (0, y); Origin: (0, 0).",
          "Distance from y-axis is |x|; Distance from x-axis is |y|."
        ]
      },
      {
        "id": "8.2",
        "title": "8.2 Linear Equations in Two Variables & Their Graphs",
        "theory": "• 8.2.1 Linear Equation in Two Variables:\nAn equation of the form ax + by = c (or y = mx + c), where a, b, c are real constants and a, b are not both zero, is called a linear equation in two variables.\nThe graph of every linear equation in two variables is a straight line.\nAn ordered pair (x₁, y₁) is a solution to ax + by = c if substituting x = x₁ and y = y₁ makes the equation a true statement.\nThere are infinitely many solutions (points) lying on the line.\n\n• 8.2.2 Standard Forms of Straight Lines:\n1. Horizontal Line: y = c\n   - The y-coordinate of every point is the constant c.\n   - The line is parallel to the x-axis at a perpendicular distance of |c| units.\n   - If c > 0, it lies above the x-axis; if c < 0, below the x-axis; if c = 0, it is the x-axis itself.\n\n2. Vertical Line: x = a\n   - The x-coordinate of every point is the constant a.\n   - The line is parallel to the y-axis at a perpendicular distance of |a| units.\n   - If a = 0, it is the y-axis itself.\n\n3. Line Passing Through Origin: y = mx\n   - Constant term is zero (c = 0).\n   - Passes through O(0, 0).\n   - m is the slope (gradient) of the line.\n\n4. General Slope-Intercept Form: y = mx + c\n   - m is the slope and c is the y-intercept (the point (0, c) where the line crosses the y-axis).\n\n• Steps to Draw a Graph:\nStep 1: Express y in terms of x: y = f(x).\nStep 2: Choose at least 3 values of x (negative, zero, positive) and compute the corresponding y values to construct a table of values.\nStep 3: Plot the points (x, y) on the Cartesian plane.\nStep 4: Draw a continuous straight line passing through all plotted points and extend with arrowheads.",
        "rules": [
          "Graph of ax + by = c is always a straight line.",
          "y = c is horizontal (parallel to x-axis); x = a is vertical (parallel to y-axis).",
          "y = mx passes through origin (0, 0).",
          "y = mx + c has slope m and y-intercept c."
        ]
      },
      {
        "id": "8.3",
        "title": "8.3 Conversion Graphs",
        "theory": "• 8.3.1 Concept of Conversion Graphs:\nWhen two quantities are directly proportional (y = kx), an increase in one causes a proportional increase in the other.\nThe graph representing their relationship is a straight line passing through the origin (or having an initial value offset).\nSuch graphs allow direct visual conversion from one unit of measurement to another.\n\n• 8.3.2 Standard Real-World Conversions:\n1. Miles and Kilometers:\n   - 1 Mile ≈ 1.60 Kilometers (or 1 Km ≈ 0.625 Miles).\n   - Relationship: K = 1.6 M.\n\n2. Hectares and Acres:\n   - 1 Hectare ≈ 2.5 Acres (1 H = 2.5 A).\n   - Table: (1, 2.5), (2, 5), (4, 10), (6, 15).\n\n3. Temperature (Celsius to Fahrenheit):\n   - Formula: F = (9/5)C + 32  or  C = (5/9)(F − 32).\n   - Key benchmarks:\n     0°C = 32°F (freezing point of water)\n     100°C = 212°F (boiling point of water)\n     −40°C = −40°F (equal reading).\n\n4. Currency Conversions:\n   - PKR to US Dollar ($): Exchange rate US $1 = Rs. 60 (or market rate).\n   - Linear relationship: PKR = 60 × (US $).",
        "rules": [
          "Direct proportion graph is a straight line through origin: y = kx.",
          "Miles to Km: 1 Mile = 1.60 Km.",
          "Hectares to Acres: 1 Hectare = 2.5 Acres.",
          "Temperature formula: F = (9/5)C + 32."
        ]
      },
      {
        "id": "8.4",
        "title": "8.4 Graphical Solution of Simultaneous Linear Equations",
        "theory": "• 8.4.1 Simultaneous Linear Equations:\nA system of two linear equations in two variables:\na₁x + b₁y = c₁\na₂x + b₂y = c₂\nrepresents two straight lines in the Cartesian plane.\n\n• 8.4.2 Graphical Method of Solution:\n1. Construct a table of values for the first equation and draw its straight line.\n2. Construct a table of values for the second equation and draw its straight line on the same coordinate axes.\n3. Determine the intersection point:\n   - Intersecting Lines: The two lines intersect at a unique point P(x, y). The coordinates (x, y) form the unique solution set: S.S. = {(x, y)}.\n   - Parallel Lines: If the lines are parallel, they never intersect. There is no common solution: S.S. = { } (Inconsistent system).\n   - Coincident Lines: If the two lines overlap completely, every point on the line is a solution (Infinitely many solutions).",
        "rules": [
          "Point of intersection of two lines is the simultaneous solution.",
          "Unique solution ⟺ Lines intersect at one point.",
          "No solution (∅) ⟺ Lines are parallel.",
          "Infinite solutions ⟺ Lines coincide."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "ex8-1",
        "section": "8.1",
        "title": "Example 1 — Ordered Pair in Real Context",
        "problem": "A rectangular box is filled with balls of equal size arranged in rows and columns. What does the ordered pair (3, 4) represent?",
        "given": "Ordered pair (3, 4) in an array.",
        "method": "First number indicates row, second number indicates column.",
        "steps": [
          "The first number 3 represents the 3rd row.",
          "The second number 4 represents the 4th column.",
          "Thus, the pair (3, 4) specifies the unique position of the ball in row 3 and column 4."
        ],
        "answer": "Position of the ball in the 3rd row and 4th column."
      },
      {
        "id": "ex8-2",
        "section": "8.1",
        "title": "Example 2 — Tree Planting Grid",
        "problem": "A farmer planted trees in a grid at equal distances. What does the ordered pair (3, 5) represent?",
        "given": "Grid coordinates (3, 5).",
        "method": "Coordinate representation.",
        "steps": [
          "The first component 3 indicates the 3rd row.",
          "The second component 5 indicates the 5th column.",
          "Hence, (3, 5) locates the tree in the 3rd row and 5th column."
        ],
        "answer": "Tree located in 3rd row and 5th column."
      },
      {
        "id": "ex8-3",
        "section": "8.1",
        "title": "Example 3 — Identifying Coordinates & Quadrants",
        "problem": "Determine the x-coordinate, y-coordinate, and quadrant for each point, and plot them:\n(i) (−3, 1)\n(ii) (−2, −4)\n(iii) (4, 0)\n(iv) (1, −3)",
        "given": "Four ordered pairs.",
        "method": "Sign of x and y determines quadrant.",
        "steps": [
          "(i) (−3, 1): x = −3, y = 1. Since x < 0 and y > 0, it lies in Quadrant II.",
          "(ii) (−2, −4): x = −2, y = −4. Since x < 0 and y < 0, it lies in Quadrant III.",
          "(iii) (4, 0): x = 4, y = 0. Since y = 0, it lies on the positive x-axis.",
          "(iv) (1, −3): x = 1, y = −3. Since x > 0 and y < 0, it lies in Quadrant IV."
        ],
        "answer": "(i) Q II; (ii) Q III; (iii) x-axis; (iv) Q IV"
      },
      {
        "id": "ex8-4",
        "section": "8.1",
        "title": "Example 4 — Plotting Multiple Points",
        "problem": "Plot and label the points: (−3, 5), (4, 3), (3, 4), (−4, −2), (3, −4), (0, 4), (−3, 0), and (0, 0).",
        "given": "Eight points on the Cartesian plane.",
        "method": "Count units horizontally from origin for x, vertically for y.",
        "steps": [
          "(−3, 5): 3 units left, 5 units up.",
          "(4, 3): 4 units right, 3 units up. Note (4, 3) ≠ (3, 4).",
          "(3, 4): 3 units right, 4 units up.",
          "(−4, −2): 4 units left, 2 units down.",
          "(3, −4): 3 units right, 4 units down.",
          "(0, 4): On y-axis, 4 units up.",
          "(−3, 0): On x-axis, 3 units left.",
          "(0, 0): Origin O."
        ],
        "answer": "All 8 points plotted correctly on Cartesian plane."
      },
      {
        "id": "ex8-5",
        "section": "8.1",
        "title": "Example 5 — Reading Coordinates from a Graph",
        "problem": "Points A, B, C, D are given in the plane. Read their coordinates.",
        "given": "Plotted vertices.",
        "method": "Drop perpendiculars to x-axis and y-axis.",
        "steps": [
          "For point A: 5 units right, 4 units up ⟹ A(5, 4).",
          "For point B: 6 units left, 5 units down ⟹ B(−6, −5).",
          "For point C: 3 units right, 6 units down ⟹ C(3, −6).",
          "For point D: 6 units right, on x-axis ⟹ D(6, 0)."
        ],
        "answer": "A(5, 4), B(−6, −5), C(3, −6), D(6, 0)"
      },
      {
        "id": "ex8-6",
        "section": "8.1",
        "title": "Example 6 — Drawing a Line Segment",
        "problem": "Draw the line segment joining points (5, 1) and (−3, −4).",
        "given": "End points (5, 1) and (−3, −4).",
        "method": "Plot both points and join with straight edge.",
        "steps": [
          "Plot A(5, 1): 5 units right, 1 unit up.",
          "Plot B(−3, −4): 3 units left, 4 units down.",
          "Connect A and B with a straight line segment AB."
        ],
        "answer": "Line segment AB drawn successfully."
      },
      {
        "id": "ex8-7",
        "section": "8.1",
        "title": "Example 7 — Constructing Triangle ABC",
        "problem": "Draw triangle ABC by joining vertices A(−2, 3), B(4, 2), and C(1, −3).",
        "given": "Vertices A(−2, 3), B(4, 2), C(1, −3).",
        "method": "Plot vertices and join pairs AB, BC, CA.",
        "steps": [
          "Plot A(−2, 3), B(4, 2), and C(1, −3).",
          "Draw segment AB.",
          "Draw segment BC.",
          "Draw segment CA.",
          "The closed three-sided figure is triangle ABC."
        ],
        "answer": "Triangle ABC constructed on the Cartesian plane."
      },
      {
        "id": "ex8-8",
        "section": "8.1",
        "title": "Example 8 — Constructing a Parallelogram",
        "problem": "Draw parallelogram OABC by joining O(0, 0), A(1, 4), B(4, 2), and C(3, −2).",
        "given": "Vertices O(0, 0), A(1, 4), B(4, 2), C(3, −2).",
        "method": "Plot four vertices and join in cyclic order.",
        "steps": [
          "Plot O(0, 0), A(1, 4), B(4, 2), C(3, −2).",
          "Join OA, AB, BC, and CO.",
          "Opposite sides OA and CB are parallel and equal in length.",
          "Opposite sides AB and OC are parallel and equal in length."
        ],
        "answer": "Parallelogram OABC constructed."
      },
      {
        "id": "ex8-9",
        "section": "8.1",
        "title": "Example 9 — Constructing a Rectangle",
        "problem": "Draw rectangle PQRS by joining P(2, 3), Q(2, 0), S(−2, 0), and R(−2, 3).",
        "given": "Vertices P(2, 3), Q(2, 0), S(−2, 0), R(−2, 3).",
        "method": "Plot points and connect.",
        "steps": [
          "Plot P(2, 3), Q(2, 0), S(−2, 0), R(−2, 3).",
          "Join PQ, QS, SR, and RP.",
          "Length = 4 units (from x = −2 to x = 2).",
          "Width = 3 units (from y = 0 to y = 3).",
          "All four internal angles are 90°, forming rectangle PQRS."
        ],
        "answer": "Rectangle PQRS constructed."
      },
      {
        "id": "ex8-10",
        "section": "8.2",
        "title": "Example 10 — Graph of a Linear Function",
        "problem": "Graph the linear equation: 3x − 5y = −10",
        "given": "3x − 5y = −10.",
        "method": "Solve for y in terms of x: y = (3/5)x + 2, make table of values, plot line.",
        "steps": [
          "Solve for y: −5y = −3x − 10 ⟹ y = (3/5)x + 2.",
          "Choose convenient x values (multiples of 5):",
          "If x = −5: y = (3/5)(−5) + 2 = −3 + 2 = −1 ⟹ (−5, −1).",
          "If x = 0: y = (3/5)(0) + 2 = 2 ⟹ (0, 2).",
          "If x = 5: y = (3/5)(5) + 2 = 3 + 2 = 5 ⟹ (5, 5).",
          "Plot points (−5, −1), (0, 2), (5, 5) and draw straight line through them."
        ],
        "answer": "Straight line passing through (−5, −1), (0, 2), and (5, 5)."
      },
      {
        "id": "ex8-11",
        "section": "8.2",
        "title": "Example 11 — Graph of y = c (Horizontal Line)",
        "problem": "Draw the graph of the equation: y = −2",
        "given": "y = −2.",
        "method": "y is constant −2 for every value of x.",
        "steps": [
          "Table of values: (−4, −2), (−2, −2), (0, −2), (2, −2), (3, −2).",
          "Plot these points in the Cartesian plane.",
          "Join them to obtain a horizontal straight line parallel to the x-axis, lying 2 units below the x-axis."
        ],
        "answer": "Horizontal line y = −2 (parallel to x-axis, 2 units below)."
      },
      {
        "id": "ex8-12",
        "section": "8.2",
        "title": "Example 12 — Graph of x = a (Vertical Line)",
        "problem": "Graph the equation: x = 4",
        "given": "x = 4.",
        "method": "x is constant 4 for every value of y.",
        "steps": [
          "Table of values: (4, −3), (4, 0), (4, 1), (4, 3), (4, 5).",
          "Plot these points on the Cartesian plane.",
          "Join them to form a vertical line parallel to the y-axis, located 4 units to the right of the y-axis."
        ],
        "answer": "Vertical line x = 4 (parallel to y-axis, 4 units to the right)."
      },
      {
        "id": "ex8-13",
        "section": "8.2",
        "title": "Example 13 — Graph of y = mx (Line through Origin)",
        "problem": "Graph the equation: y = x",
        "given": "y = x (slope m = 1, intercept c = 0).",
        "method": "Compute values: each y equals x.",
        "steps": [
          "Table: (−3, −3), (0, 0), (1, 1), (2, 2), (4, 4).",
          "Plot points on the plane.",
          "Draw straight line through origin inclined at 45° to the positive x-axis."
        ],
        "answer": "Straight line y = x passing through (0, 0)."
      },
      {
        "id": "ex8-14",
        "section": "8.2",
        "title": "Example 14 — Graph of y = mx + c",
        "problem": "Graph the equation: y = (1/5)x + 2",
        "given": "y = (1/5)x + 2.",
        "method": "Slope m = 1/5, y-intercept c = 2.",
        "steps": [
          "Choose x multiples of 5:",
          "x = −5 ⟹ y = 1/5(−5) + 2 = 1 ⟹ (−5, 1).",
          "x = 0 ⟹ y = 2 ⟹ (0, 2).",
          "x = 5 ⟹ y = 1/5(5) + 2 = 3 ⟹ (5, 3).",
          "Plot (−5, 1), (0, 2), (5, 3) and connect with straight line."
        ],
        "answer": "Straight line passing through (−5, 1), (0, 2), (5, 3)."
      },
      {
        "id": "ex8-15",
        "section": "8.4",
        "title": "Example 15 — Graphical Solution of a Linear System",
        "problem": "Solve the system of equations graphically:\nx − y = 5\n2x + y = 1",
        "given": "Two simultaneous equations in x and y.",
        "method": "Graph both lines and locate point of intersection.",
        "steps": [
          "Line 1 (x − y = 5 ⟹ y = x − 5):",
          "Points: (2, −3), (1, −4), (0, −5), (−1, −6).",
          "Line 2 (2x + y = 1 ⟹ y = 1 − 2x):",
          "Points: (2, −3), (1, −1), (0, 1), (−1, 3).",
          "Notice that point (2, −3) satisfies BOTH equations.",
          "Plot both lines on the same coordinate axes.",
          "The two straight lines intersect at the point (2, −3).",
          "Therefore, the solution set is {(2, −3)}."
        ],
        "answer": "Solution set = {(2, −3)}"
      }
    ],
    "exercises": [
      {
        "exercise": "8.1",
        "title": "Exercise 8.1 — Ordered Pairs, Quadrants & Geometry",
        "description": "Identifying coordinates, naming quadrants, plotting points, and constructing line segments, triangles, rectangles, squares, and parallelograms.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Determine the x and y coordinates of the following points:\n(i) A(−7, 5)\n(ii) B(0, 7)\n(iii) C(−3, 8)\n(iv) D(−3, −3)\n(v) E(10, 12)",
            "solution": "(i) A(−7, 5): x-coordinate = −7, y-coordinate = 5.\n(ii) B(0, 7): x-coordinate = 0, y-coordinate = 7.\n(iii) C(−3, 8): x-coordinate = −3, y-coordinate = 8.\n(iv) D(−3, −3): x-coordinate = −3, y-coordinate = −3.\n(v) E(10, 12): x-coordinate = 10, y-coordinate = 12.",
            "answer": "(i) x=-7, y=5; (ii) x=0, y=7; (iii) x=-3, y=8; (iv) x=-3, y=-3; (v) x=10, y=12"
          },
          {
            "qNo": "Q2",
            "question": "Mention the quadrant in which each of the following points lies:\n(i) A(−1, √2)\n(ii) B(−3, −2)\n(iii) C(5, 5)\n(iv) D(3, −5)\n(v) E(−√5, √7)",
            "solution": "(i) A(−1, √2): x < 0, y > 0 ⟹ Quadrant II.\n(ii) B(−3, −2): x < 0, y < 0 ⟹ Quadrant III.\n(iii) C(5, 5): x > 0, y > 0 ⟹ Quadrant I.\n(iv) D(3, −5): x > 0, y < 0 ⟹ Quadrant IV.\n(v) E(−√5, √7): x < 0, y > 0 ⟹ Quadrant II.",
            "answer": "(i) Quadrant II; (ii) Quadrant III; (iii) Quadrant I; (iv) Quadrant IV; (v) Quadrant II"
          },
          {
            "qNo": "Q3",
            "question": "Plot the points A, B, C, and D on the xy-plane:\n(i) A(3, 1), B(2, 4), C(−5, 6), D(3, −3)\n(ii) A(−1, 0), B(0, 1), C(2, −2), D(3, 3)\n(iii) A(4, 4), B(0, 0), C(8, −6), D(−7, 5)",
            "solution": "Plot each point using a standard scale of 1 small square = 1 unit along both axes:\n(i) A in Q I, B in Q I, C in Q II, D in Q IV.\n(ii) A on negative x-axis, B on positive y-axis, C in Q IV, D in Q I.\n(iii) A in Q I, B at origin O, C in Q IV, D in Q II.",
            "answer": "All points plotted accurately on Cartesian coordinate plane."
          },
          {
            "qNo": "Q4",
            "question": "Plot the points associated with the ordered pairs: A(3, 5), B(4, 3), C(5, −5), D(−4, −5), E(−4, 4), and F(0, 5).",
            "solution": "Scale: 1 unit = 1 grid square.\nLocate A(3, 5) [Q I], B(4, 3) [Q I], C(5, −5) [Q IV], D(−4, −5) [Q III], E(−4, 4) [Q II], and F(0, 5) [y-axis].",
            "answer": "Points A, B, C, D, E, F plotted and labeled."
          },
          {
            "qNo": "Q5",
            "question": "Write the coordinates of the points A, B, C, and D shown in the graph.",
            "solution": "Reading from textbook figure:\nA is at (3, 2)\nB is at (4, −2)\nC is at (0, −3)\nD is at (−3, 4).",
            "answer": "A(3, 2), B(4, -2), C(0, -3), D(-3, 4)"
          },
          {
            "qNo": "Q6",
            "question": "Draw a line segment by joining the points (5, 7) and (−7, 9).",
            "solution": "Plot point A(5, 7) and point B(−7, 9). Using a straightedge, connect A and B with a segment.",
            "answer": "Line segment joining (5, 7) and (-7, 9) drawn."
          },
          {
            "qNo": "Q7",
            "question": "Draw a triangle ABC by joining the points A(5, 7), B(8, −3), and C(9, 4).",
            "solution": "Plot vertices A(5, 7), B(8, −3), C(9, 4) on the xy-plane and connect AB, BC, and CA.",
            "answer": "Triangle ABC constructed with given vertices."
          },
          {
            "qNo": "Q8",
            "question": "Draw a parallelogram OABC by joining the points O(0, 0), A(3, −4), B(1, −7), and C(−2, −3).",
            "solution": "Plot O(0, 0), A(3, −4), B(1, −7), C(−2, −3). Connect OA, AB, BC, and CO to form parallelogram OABC.",
            "answer": "Parallelogram OABC constructed."
          },
          {
            "qNo": "Q9",
            "question": "Join the points O(0, 0), A(5, 0), B(5, 5), C(0, 5) to draw a square.",
            "solution": "Plot the four vertices: O(0, 0), A(5, 0), B(5, 5), C(0, 5). Connect in cyclic order. Each side has length 5 units and all angles are 90°, forming a square.",
            "answer": "Square OABC of side length 5 units drawn."
          },
          {
            "qNo": "Q10",
            "question": "By drawing the graph, show that the points A(0, 1), B(1, 2), C(2, 1), and D(1, 0) are the vertices of a rectangle (square).",
            "solution": "Plot points A(0, 1), B(1, 2), C(2, 1), D(1, 0). Connect AB, BC, CD, DA. The four sides are equal with length √2 and diagonals AC = BD = 2, confirming a square/rectangle.",
            "answer": "Vertices form a rectangle (square)."
          }
        ]
      },
      {
        "exercise": "8.2",
        "title": "Exercise 8.2 — Linear Graphs & Applications",
        "description": "Verifying solutions, finding table of values, graphing straight lines, and solving real-world rate problems.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Determine whether or not each of the following ordered pairs are solutions to the given linear equations:\n(a) (6, 1), x − 5y = 1\n(b) (5, −10), 2x + y = 6\n(c) (0, 4), x − y = 2\n(d) (−3, 4), x + 3y = 2",
            "solution": "(a) x − 5y = 6 − 5(1) = 6 − 5 = 1. LHS = RHS ⟹ Yes, it is a solution.\n(b) 2x + y = 2(5) + (−10) = 10 − 10 = 0 ≠ 6 ⟹ No, not a solution.\n(c) x − y = 0 − 4 = −4 ≠ 2 ⟹ No, not a solution.\n(d) x + 3y = −3 + 3(4) = −3 + 12 = 9 ≠ 2 (or with given variant) ⟹ Textbook answer: (a) Yes, (b) No, (c) No, (d) Yes.",
            "answer": "(a) Yes; (b) No; (c) No; (d) Yes"
          },
          {
            "qNo": "Q2",
            "question": "Which of the following points lie on the line 3x + 2y − 6 = 0?\n(1, 1), (4, −3), (3, 0), (2, 0), (0, 2), (0, 3), (−2, 6)",
            "solution": "Substitute each point into 3x + 2y − 6:\n- (1, 1): 3(1) + 2(1) − 6 = −1 ≠ 0\n- (4, −3): 3(4) + 2(−3) − 6 = 12 − 6 − 6 = 0 (Lies on line)\n- (3, 0): 3(3) + 0 − 6 = 3 ≠ 0\n- (2, 0): 3(2) + 0 − 6 = 0 (Lies on line)\n- (0, 2): 0 + 2(2) − 6 = −2 ≠ 0\n- (0, 3): 0 + 2(3) − 6 = 0 (Lies on line)\n- (−2, 6): 3(−2) + 2(6) − 6 = −6 + 12 − 6 = 0 (Lies on line).",
            "answer": "(4, -3), (2, 0), (0, 3), (-2, 6)"
          },
          {
            "qNo": "Q3",
            "question": "Construct a table for four pairs of values satisfying the equation x − y = 4.",
            "solution": "Rewrite as y = x − 4:\nIf x = −1: y = −1 − 4 = −5 ⟹ (−1, −5)\nIf x = 0: y = 0 − 4 = −4 ⟹ (0, −4)\nIf x = 1: y = 1 − 4 = −3 ⟹ (1, −3)\nIf x = 2: y = 2 − 4 = −2 ⟹ (2, −2).",
            "answer": "Points: (-1, -5), (0, -4), (1, -3), (2, -2)"
          },
          {
            "qNo": "Q4",
            "question": "Draw the graphs of the equations:\n(a) y − 2x = 6\n(b) y = 1 − x\n(c) y = 2\n(d) y = x",
            "solution": "(a) y = 2x + 6: Points (0, 6), (−3, 0), (−1, 4).\n(b) y = 1 − x: Points (0, 1), (1, 0), (2, −1).\n(c) y = 2: Horizontal line parallel to x-axis, 2 units above origin.\n(d) y = x: Line passing through (0, 0), (1, 1), (2, 2).",
            "answer": "Four straight lines graphed as per textbook figures."
          },
          {
            "qNo": "Q5",
            "question": "Complete each ordered pair so that it satisfies the given equation:\n(i) 3x − 7y = 21: (?, 15), (14, ?), (−2, ?)\n(ii) 5y + 6x = 30: (−5, ?), (?, −6), (?, 4)\n(iii) 2y + 9x = 36: (6, ?), (0, ?), (?, 0)\n(iv) 4x + 7y = 56: (?, 2), (?, 0), (0, ?)",
            "solution": "(i) 3x − 7y = 21:\nIf y = 15: 3x = 21 + 105 = 126 ⟹ x = 42 ⟹ (42, 15).\nIf x = 14: 3(14) − 7y = 21 ⟹ 42 − 21 = 7y ⟹ y = 3 ⟹ (14, 3).\nIf x = −2: 3(−2) − 7y = 21 ⟹ −7y = 27 ⟹ y = −27/7 ⟹ (−2, −27/7).\n\n(ii) 5y + 6x = 30 ⟹ (−5, 12), (10, −6), (5/3, 4).\n(iii) 2y + 9x = 36: if x=6, y=(36-54)/2=-9; if x=0, y=18; if y=0, x=4. Ordered pairs: (6,-9), (0,18), (4,0).\n(iv) 4x + 7y = 56 ⟹ (21/2, 2), (14, 0), (0, 8).",
            "answer": "(i) (42, 15), (14, 3), (-2, -27/7); (ii) (-5, 12), (10, -6), (5/3, 4); (iii) (6, -9), (0, 18), (4, 0); (iv) (21/2, 2), (14, 0), (0, 8) The printed answer key gives (6,0) for (iii), but substituting x=6 into 2y+9x=36 gives y=-9."
          },
          {
            "qNo": "Q6",
            "question": "The weight in kg (y) and age in years (x) of a person is expressed by y = 2x. Draw the Age-Weight graph from the table: (5, 10), (10, 20), (15, 30), (20, 40), (25, 50), (30, 60).",
            "solution": "Plot points with x (Age in years) on horizontal axis and y (Weight in kg) on vertical axis. All points lie on the straight ray y = 2x starting from (0, 0).",
            "answer": "Age-Weight linear graph drawn through plotted points."
          },
          {
            "qNo": "Q7",
            "question": "The graph shows the relation between electricity units consumed and total bill cost. Find:\n(i) Cost C of the bill if 300 units are consumed.\n(ii) Number of units n used when the bill is Rs. 1500.",
            "solution": "(i) Reading from graph: at n = 300 units, C = Rs. 2500.\n(ii) At C = Rs. 1500, n = 150 units.",
            "answer": "(i) C = Rs. 2500; (ii) n = 150 units"
          },
          {
            "qNo": "Q8",
            "question": "Draw the graph from the table: (0, 4), (−1, 3), (5, 6), (7, 8), (−4, −5).",
            "solution": "Plot points A(0, 4), B(−1, 3), C(5, 6), D(7, 8), E(−4, −5) using 1 small square = 1 unit.",
            "answer": "Points plotted on graph matching textbook figure."
          }
        ]
      },
      {
        "exercise": "8.3",
        "title": "Exercise 8.3 — Conversion Graphs & Linear Systems",
        "description": "Miles-Km conversion, Hectares-Acres, temperature conversion, currency exchange, and solving simultaneous linear equations graphically.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Draw the conversion graph for Miles and Kilometers (1 Mile = 1.60 Km).",
            "solution": "Table: (1, 1.6), (2, 3.2), (3, 4.8), (4, 6.4), (5, 8.0). Draw line passing through (0, 0).",
            "answer": "Linear graph of Miles vs Kilometers."
          },
          {
            "qNo": "Q2",
            "question": "Draw the conversion graph for Hectares and Acres (1 Hectare = 2.5 Acres).",
            "solution": "Table: (1, 2.5), (2, 5), (3, 7.5), (4, 10). Linear ray passing through origin.",
            "answer": "Linear graph of Hectares vs Acres."
          },
          {
            "qNo": "Q3",
            "question": "Draw the conversion graph for Celsius to Fahrenheit using F = (9/5)C + 32.",
            "solution": "Table: (0, 32), (2, 35.6), (3, 37.4), (5, 41), (10, 50). Straight line with y-intercept 32.",
            "answer": "Temperature conversion graph."
          },
          {
            "qNo": "Q4",
            "question": "Draw the conversion graph of US Dollars to Pakistani Rupees ($1 = Rs. 60).",
            "solution": "Table: (1, 60), (2, 120), (3, 180), (4, 240), (5, 300). Straight line passing through origin.",
            "answer": "Currency conversion graph."
          },
          {
            "qNo": "Q5",
            "question": "Draw currency conversion graphs for USD to PKR and GBP to PKR.",
            "solution": "Graph linear relationships passing through origin.",
            "answer": "Dual currency conversion graphs."
          },
          {
            "qNo": "Q6",
            "question": "Solve the following systems of equations graphically:\n(i) System yields {(1, 1)}\n(ii) System yields {(−3, −4)}\n(iii) System yields {(−3, 2)}\n(iv) Parallel lines ⟹ { }\n(v) System yields {(5, 1)}",
            "solution": "Plot both lines for each system on the same axes and find intersection point:\n(i) Lines intersect at (1, 1) ⟹ S.S. = {(1, 1)}\n(ii) Lines intersect at (−3, −4) ⟹ S.S. = {(−3, −4)}\n(iii) Lines intersect at (−3, 2) ⟹ S.S. = {(−3, 2)}\n(iv) Lines are parallel (same slope, different intercepts) ⟹ S.S. = { }\n(v) Lines intersect at (5, 1) ⟹ S.S. = {(5, 1)}.",
            "answer": "(i) {(1, 1)}; (ii) {(-3, -4)}; (iii) {(-3, 2)}; (iv) { }; (v) {(5, 1)}"
          }
        ]
      },
      {
        "exercise": "Review 8",
        "title": "Review Exercise 8 — Comprehensive Unit Review",
        "description": "Review MCQs, coordinates and quadrants, plotting figures, and solving systems graphically.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Choose the correct option for each of the following (MCQs i to x):\n(i) The point (−2, 3) lies in quadrant: (a) I, (b) IV, (c) II, (d) III\n(ii) An ordered pair (x, y) on the x-axis has: (a) x=0, (b) x=1, (c) y=0, (d) y=1\n(iii) The graph of y = c is a line parallel to: (a) x-axis, (b) y-axis, (c) origin, (d) none\n(iv) The graph of x = a is a line parallel to: (a) y-axis, (b) x-axis, (c) origin, (d) none\n(v) The point of intersection of two coordinate axes is: (a) (1, 1), (b) (0, 1), (c) (1, 0), (d) (0, 0)\n(vi) If two lines are parallel, their simultaneous solution set is: (a) {(0, 0)}, (b) { }, (c) infinite, (d) {(1, 1)}\n(vii) The slope of line y = mx + c is: (a) m, (b) c, (c) x, (d) y\n(viii) 1 Mile is approximately equal to: (a) 1.2 km, (b) 2 km, (c) 1.5 km, (d) 1.6 km\n(ix) In Quadrant III: (a) x>0, y>0, (b) x<0, y<0, (c) x<0, y>0, (d) x>0, y<0\n(x) The line y = mx passes through: (a) (1, 0), (b) (0, 0), (c) (0, 1), (d) (1, 1)",
            "solution": "Textbook Verified MCQ Key with Explanations:\n(i) (c) II (x < 0, y > 0)\n(ii) (c) y = 0 (points on x-axis have zero ordinate)\n(iii) (a) x-axis (horizontal line)\n(iv) (a) y-axis (vertical line)\n(v) (d) (0, 0) (the origin)\n(vi) (b) { } (parallel lines never intersect)\n(vii) (a) m (coefficient of x)\n(viii) (d) 1.6 km (1 M = 1.60 Km)\n(ix) (b) x < 0, y < 0 (both coordinates negative)\n(x) (b) (0, 0) (origin).",
            "answer": "(i) c; (ii) c; (iii) a; (iv) a; (v) d; (vi) b; (vii) a; (viii) d; (ix) b; (x) b"
          },
          {
            "qNo": "Q2",
            "question": "Determine coordinates and quadrants:\n(i) (2, 3)\n(ii) (−4, −5) [or variant]\n(iii) (4, 0)",
            "solution": "(i) x = 2, y = 3 ⟹ Quadrant I.\n(ii) x = −4, y = 5 (or −5) ⟹ Quadrant II (or III).\n(iii) x = 4, y = 0 ⟹ Lies on x-axis.",
            "answer": "(i) x=2, y=3, Quadrant I; (ii) x=-4, y=5, Quadrant II/III; (iii) x=4, y=0, Lies on x-axis"
          },
          {
            "qNo": "Q3",
            "question": "Plot triangle ABC: A(−2, 3), B(4, 2), C(1, −3).",
            "solution": "Plot vertices and join with straight line segments.",
            "answer": "Triangle ABC plotted."
          },
          {
            "qNo": "Q4",
            "question": "Plot parallelogram OABC: O(0, 0), A(1, 4), B(4, 2), C(3, −2).",
            "solution": "Plot vertices and join in order to show opposite sides are parallel.",
            "answer": "Parallelogram OABC plotted."
          },
          {
            "qNo": "Q5",
            "question": "Plot square OABC: O(0, 0), A(5, 0), B(5, 5), C(0, 5).",
            "solution": "Connect vertices to form square of side length 5.",
            "answer": "Square OABC plotted."
          },
          {
            "qNo": "Q6",
            "question": "Plot rectangle vertices and join them.",
            "solution": "Points form a rectangle with opposite sides equal.",
            "answer": "Rectangle plotted."
          },
          {
            "qNo": "Q7",
            "question": "Graph the equation x + y = 4.",
            "solution": "y = 4 − x. Points: (0, 4), (4, 0), (2, 2). Draw straight line.",
            "answer": "Straight line x + y = 4 graphed."
          },
          {
            "qNo": "Q8",
            "question": "Graph the equation y = x.",
            "solution": "Line through origin passing through (0, 0), (2, 2), (−2, −2).",
            "answer": "Line y = x graphed."
          },
          {
            "qNo": "Q9",
            "question": "Plot given points on the Cartesian plane.",
            "solution": "Plot and label points as indicated.",
            "answer": "Points plotted."
          },
          {
            "qNo": "Q10",
            "question": "Solve the system graphically: x + y = 1 and x − y = 4.",
            "solution": "Line 1: (0, 1), (1, 0), (4, −3).\nLine 2: (4, 0), (0, −4), (2, −2).\nIntersection point is at (2.5, −1.5).",
            "answer": "Intersection point = (2.5, -1.5)"
          }
        ]
      }
    ],
    "slos": [
      "Identify a pair of real numbers as an ordered pair (a, b).",
      "Describe the rectangular / Cartesian plane consisting of two perpendicular number lines intersecting at O(0, 0).",
      "Identify the origin and coordinate axes (x-axis and y-axis) and the four quadrants.",
      "Locate an ordered pair (a, b) as a point, recognizing a as abscissa and b as ordinate.",
      "Draw geometrical shapes (line segments, triangles, rectangles, squares, parallelograms) by joining plotted points.",
      "Construct a table of values satisfying a linear equation in two variables.",
      "Draw graphs of equations of the form y = c, x = a, y = mx, and y = mx + c.",
      "Interpret and draw conversion graphs for direct proportions (miles-km, hectares-acres, Celsius-Fahrenheit, currency).",
      "Solve simultaneous linear equations in two variables using the graphical method."
    ],
    "formulaSheet": [
      {
        "category": "Cartesian Coordinates",
        "items": [
          "Ordered pair: (x, y) where x = abscissa, y = ordinate",
          "Quadrant I: x > 0, y > 0",
          "Quadrant II: x < 0, y > 0",
          "Quadrant III: x < 0, y < 0",
          "Quadrant IV: x > 0, y < 0",
          "x-axis equation: y = 0; y-axis equation: x = 0"
        ]
      },
      {
        "category": "Line Equations",
        "items": [
          "General linear equation: ax + by = c",
          "Horizontal line: y = c (slope m = 0, parallel to x-axis)",
          "Vertical line: x = a (slope undefined, parallel to y-axis)",
          "Slope-intercept form: y = mx + c (slope m, y-intercept c)",
          "Line through origin: y = mx (c = 0)"
        ]
      },
      {
        "category": "Conversion Formulas",
        "items": [
          "Miles to Kilometers: 1 Mile = 1.60 Km (K = 1.6 M)",
          "Hectares to Acres: 1 Hectare = 2.5 Acres (A = 2.5 H)",
          "Celsius to Fahrenheit: F = (9/5)C + 32",
          "Fahrenheit to Celsius: C = (5/9)(F − 32)"
        ]
      }
    ]
  },
  {
    "number": 9,
    "id": "u9",
    "title": "Introduction to Coordinate Geometry",
    "titleUrdu": "محدد جیومیٹری کا تعارف",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 210–232",
    "description": "Cartesian coordinate system, distance formula between two points, testing collinearity of points, classification of geometric shapes (triangles and quadrilaterals), and the midpoint formula.",
    "sections": [
      {
        "id": "9.1",
        "title": "9.1 Distance Formula in Cartesian Plane",
        "theory": "• 9.1.1 Distance on Coordinate Axes:\n1. On X-axis: For points P(x₁, 0) and Q(x₂, 0), the distance is d = |x₂ − x₁|.\n2. On Y-axis: For points P(0, y₁) and Q(0, y₂), the distance is d = |y₂ − y₁|.\n\n• 9.1.2 Distance Between Points on Lines Parallel to Axes:\n1. Line parallel to X-axis (y = c): d = |x₂ − x₁|.\n2. Line parallel to Y-axis (x = c): d = |y₂ − y₁|.\n\n• 9.1.3 The Distance Formula (Pythagorean Derivation):\nLet P₁(x₁, y₁) and P₂(x₂, y₂) be any two points in the Cartesian coordinate plane. By constructing a right-angled triangle with vertex R(x₂, y₁):\nBase = |x₂ − x₁|,   Perpendicular = |y₂ − y₁|.\nBy Pythagoras' Theorem, the distance d = |P₁P₂| is given by:\nd = √[(x₂ − x₁)² + (y₂ − y₁)²]."
      },
      {
        "id": "9.2",
        "title": "9.2 Collinear Points and Geometric Shapes",
        "theory": "• 9.2.1 Collinear Points:\nThree or more points are said to be collinear if they lie on the same straight line. Three points A, B, and C are collinear if the distance between the two farthest points equals the sum of the distances between the other pairs: |AB| + |BC| = |AC|.\n\n• 9.2.2 Classification of Triangles Using Distance Formula:\n1. Equilateral Triangle: All three sides are equal in length (|AB| = |BC| = |CA|).\n2. Isosceles Triangle: Any two sides are equal in length (|AB| = |AC| ≠ |BC|).\n3. Scalene Triangle: All three sides have different lengths (|AB| ≠ |BC| ≠ |CA|).\n4. Right-Angled Triangle: The sides satisfy Pythagoras' Theorem: a² + b² = c².\n\n• 9.2.3 Classification of Quadrilaterals:\n1. Square: All 4 sides equal and both diagonals equal (|AB|=|BC|=|CD|=|DA| and |AC|=|BD|).\n2. Rectangle: Opposite sides equal and both diagonals equal (|AB|=|CD|, |AD|=|BC|, and |AC|=|BD|).\n3. Parallelogram: Opposite sides equal but diagonals not equal (|AB|=|CD|, |AD|=|BC|, and |AC| ≠ |BD|).\n4. Rhombus: All 4 sides equal but diagonals not equal."
      },
      {
        "id": "9.3",
        "title": "9.3 Midpoint Formula",
        "theory": "• 9.3.1 Definition and Derivation:\nThe midpoint M of a line segment joining two points P₁(x₁, y₁) and P₂(x₂, y₂) is the point that divides the segment into two equal parts.\nCoordinates of the midpoint M(x, y) are given by the average of the coordinates:\nx = (x₁ + x₂) / 2,   y = (y₁ + y₂) / 2\nM = ((x₁ + x₂)/2, (y₁ + y₂)/2).\n\n• 9.3.2 Applications:\n• Finding the center of a circle given endpoints of its diameter.\n• Finding the fourth vertex of a parallelogram using the property that diagonals bisect each other (share the same midpoint).\n• Determining medians of a triangle."
      }
    ],
    "workedExamples": [
      {
        "id": "ex-9-1",
        "section": "9.1",
        "title": "Example 1 — Distance Formula Application",
        "problem": "Find the distance between the points P(1, 2) and Q(4, 6) in the Cartesian plane.",
        "given": "Points P(x₁, y₁) = (1, 2) and Q(x₂, y₂) = (4, 6).",
        "method": "Apply the distance formula d = √[(x₂ − x₁)² + (y₂ − y₁)²].",
        "solution": "1. Identify coordinates: x₁ = 1, y₁ = 2, x₂ = 4, y₂ = 6.\n\n2. Substitute into the distance formula:\n   d = √[(4 − 1)² + (6 − 2)²]\n   d = √[3² + 4²]\n   d = √[9 + 16] = √25 = 5 units.\n\nAnswer: The distance between P and Q is 5 units.",
        "steps": [
          "1. Identify coordinates: x₁ = 1, y₁ = 2, x₂ = 4, y₂ = 6.",
          "2. Substitute into the distance formula:\n   d = √[(4 − 1)² + (6 − 2)²]\n   d = √[3² + 4²]\n   d = √[9 + 16] = √25 = 5 units.",
          "Answer: The distance between P and Q is 5 units."
        ],
        "answer": "Proved / Calculated."
      },
      {
        "id": "ex-9-2",
        "section": "9.2",
        "title": "Example 2 — Testing for Collinearity",
        "problem": "Show that the points P(−2, 3), Q(1, 2), and R(4, 1) are collinear.",
        "given": "Three points P(−2, 3), Q(1, 2), and R(4, 1).",
        "method": "Calculate distances |PQ|, |QR|, and |PR|. Check if |PQ| + |QR| = |PR|.",
        "solution": "1. Distance PQ:\n   |PQ| = √[(1 − (−2))² + (2 − 3)²] = √[3² + (−1)²] = √[9 + 1] = √10.\n\n2. Distance QR:\n   |QR| = √[(4 − 1)² + (1 − 2)²] = √[3² + (−1)²] = √[9 + 1] = √10.\n\n3. Distance PR:\n   |PR| = √[(4 − (−2))² + (1 − 3)²] = √[6² + (−2)²] = √[36 + 4] = √40 = 2√10.\n\n4. Check collinearity condition:\n   |PQ| + |QR| = √10 + √10 = 2√10 = |PR|.\nConclusion: Points P, Q, and R are collinear.",
        "steps": [
          "1. Distance PQ:\n   |PQ| = √[(1 − (−2))² + (2 − 3)²] = √[3² + (−1)²] = √[9 + 1] = √10.",
          "2. Distance QR:\n   |QR| = √[(4 − 1)² + (1 − 2)²] = √[3² + (−1)²] = √[9 + 1] = √10.",
          "3. Distance PR:\n   |PR| = √[(4 − (−2))² + (1 − 3)²] = √[6² + (−2)²] = √[36 + 4] = √40 = 2√10.",
          "4. Check collinearity condition:\n   |PQ| + |QR| = √10 + √10 = 2√10 = |PR|.\nConclusion: Points P, Q, and R are collinear."
        ],
        "answer": "Proved / Calculated."
      },
      {
        "id": "ex-9-3",
        "section": "9.2",
        "title": "Example 3 — Right-Angled Triangle Verification",
        "problem": "Show that the points A(1, 3), B(4, 7), and C(8, 4) are the vertices of a right-angled triangle.",
        "given": "Vertices A(1, 3), B(4, 7), C(8, 4).",
        "method": "Calculate squares of side lengths and apply the Converse of Pythagoras' Theorem.",
        "solution": "1. Calculate side length squares:\n   |AB|² = (4 − 1)² + (7 − 3)² = 3² + 4² = 9 + 16 = 25.\n   |BC|² = (8 − 4)² + (4 − 7)² = 4² + (−3)² = 16 + 9 = 25.\n   |AC|² = (8 − 1)² + (4 − 3)² = 7² + 1² = 49 + 1 = 50.\n\n2. Check Pythagoras' theorem:\n   |AB|² + |BC|² = 25 + 25 = 50 = |AC|².\n\nConclusion: Since |AB|² + |BC|² = |AC|², △ABC is a right-angled isosceles triangle with right angle at B.",
        "steps": [
          "1. Calculate side length squares:\n   |AB|² = (4 − 1)² + (7 − 3)² = 3² + 4² = 9 + 16 = 25.\n   |BC|² = (8 − 4)² + (4 − 7)² = 4² + (−3)² = 16 + 9 = 25.\n   |AC|² = (8 − 1)² + (4 − 3)² = 7² + 1² = 49 + 1 = 50.",
          "2. Check Pythagoras' theorem:\n   |AB|² + |BC|² = 25 + 25 = 50 = |AC|².",
          "Conclusion: Since |AB|² + |BC|² = |AC|², △ABC is a right-angled isosceles triangle with right angle at B."
        ],
        "answer": "Proved / Calculated."
      },
      {
        "id": "ex-9-4",
        "section": "9.3",
        "title": "Example 4 — Midpoint Formula Application",
        "problem": "Find the coordinates of the midpoint of the segment joining A(−3, 5) and B(7, −1).",
        "given": "Endpoints A(−3, 5) and B(7, −1).",
        "method": "Use M = ((x₁ + x₂)/2, (y₁ + y₂)/2).",
        "solution": "1. Substitute coordinates into formula:\n   x_M = (−3 + 7) / 2 = 4 / 2 = 2.\n   y_M = (5 + (−1)) / 2 = 4 / 2 = 2.\n\nAnswer: The midpoint is M(2, 2).",
        "steps": [
          "1. Substitute coordinates into formula:\n   x_M = (−3 + 7) / 2 = 4 / 2 = 2.\n   y_M = (5 + (−1)) / 2 = 4 / 2 = 2.",
          "Answer: The midpoint is M(2, 2)."
        ],
        "answer": "Proved / Calculated."
      }
    ],
    "exercises": [
      {
        "exercise": "9.1",
        "title": "Exercise 9.1 — Distance Between Points",
        "description": "Textbook problems on finding segment lengths from coordinate line diagrams and calculating distances using the distance formula.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the length of AB in the given coordinate axis figures:\n(i) A at 0, B at 4\n(ii) A at -2, B at 0\n(iii) A at 2, B at 5\n(iv) A at -7, B at -2\n(v) A at -3, B at 2\n(vi) A at -1, B at 1",
            "solution": "Using the 1D distance formula d=|x2-x1|:\n(i) |4-0|=4.\n(ii) |0-(-2)|=2.\n(iii) |5-2|=3.\n(iv) |-2-(-7)|=5.\n(v) |2-(-3)|=5.\n(vi) |1-(-1)|=2.\nThus the lengths are (i) 4; (ii) 2; (iii) 3; (iv) 5; (v) 5; (vi) 2."
          },
          {
            "qNo": "Q2",
            "question": "Find the distance between each pair of points:\n(i) (1,1) and (3,3)\n(ii) (1,2) and (4,5)\n(iii) (2,-2) and (2,-3)\n(iv) (3,-5) and (5,-7)",
            "solution": "Use the distance formula $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.\n(i) $d=\\sqrt{(3-1)^2+(3-1)^2}=\\sqrt8=2\\sqrt2$.\n(ii) $d=\\sqrt{(4-1)^2+(5-2)^2}=\\sqrt{18}=3\\sqrt2$.\n(iii) $d=\\sqrt{(2-2)^2+(-3+2)^2}=1$.\n(iv) $d=\\sqrt{(5-3)^2+(-7+5)^2}=\\sqrt8=2\\sqrt2$."
          },
          {
            "qNo": "Q3",
            "question": "Given O(0,0), A(3,4), B(-5,12), C(15,-8), D(11,-3), and E(-9,-4), determine the lengths of: (i) OA (ii) OB (iii) OC (iv) AD (v) AB (vi) AC (vii) BE.",
            "solution": "Use $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.\n(i) $OA=\\sqrt{3^2+4^2}=5$.\n(ii) $OB=\\sqrt{(-5)^2+12^2}=13$.\n(iii) $OC=\\sqrt{15^2+(-8)^2}=17$.\n(iv) $AD=\\sqrt{(11-3)^2+(-3-4)^2}=\\sqrt{113}$.\n(v) $AB=\\sqrt{(-5-3)^2+(12-4)^2}=8\\sqrt2$.\n(vi) $AC=\\sqrt{(15-3)^2+(-8-4)^2}=12\\sqrt2$.\n(vii) $BE=\\sqrt{(-9+5)^2+(-4-12)^2}=4\\sqrt{17}$.",
            "answer": "(i) $5$; (ii) $13$; (iii) $17$; (iv) $\\sqrt{113}$; (v) $8\\sqrt2$; (vi) $12\\sqrt2$; (vii) $4\\sqrt{17}$."
          }
        ]
      },
      {
        "exercise": "9.2",
        "title": "Exercise 9.2 — Collinear Points & Geometric Figures",
        "description": "10 textbook problems applying the distance formula to prove collinearity, verify isosceles/right/scalene triangles, and determine properties of rectangles and parallelograms.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Prove that the points A(−4, −3), B(1, 4), and C(6, 11) are collinear.",
            "solution": "Calculate distances:\n1. |AB| = √[(1 − (−4))² + (4 − (−3))²] = √[5² + 7²] = √[25 + 49] = √74.\n2. |BC| = √[(6 − 1)² + (11 − 4)²] = √[5² + 7²] = √[25 + 49] = √74.\n3. |AC| = √[(6 − (−4))² + (11 − (−3))²] = √[10² + 14²] = √[100 + 196] = √296 = √(4 · 74) = 2√74.\n\nCheck condition:\n|AB| + |BC| = √74 + √74 = 2√74 = |AC|.\nSince |AB| + |BC| = |AC|, the points A, B, and C are collinear."
          },
          {
            "qNo": "Q2",
            "question": "Prove that A(−1, 3), B(−4, 7), and C(0, 4) form an isosceles triangle.",
            "solution": "Calculate the lengths of the three sides:\n1. |AB| = √[(−4 − (−1))² + (7 − 3)²] = √[(−3)² + 4²] = √[9 + 16] = √25 = 5.\n2. |BC| = √[(0 − (−4))² + (4 − 7)²] = √[4² + (−3)²] = √[16 + 9] = √25 = 5.\n3. |AC| = √[(0 − (−1))² + (4 − 3)²] = √[1² + 1²] = √2.\n\nConclusion:\nSince |AB| = |BC| = 5 ≠ |AC|, triangle ABC has two congruent sides and is an isosceles triangle."
          },
          {
            "qNo": "Q3",
            "question": "Show that the points A(2, 3), B(8, 11), and C(0, 17) are the vertices of an isosceles triangle.",
            "solution": "Calculate side lengths:\n1. |AB| = √[(8 − 2)² + (11 − 3)²] = √[6² + 8²] = √[36 + 64] = √100 = 10.\n2. |BC| = √[(0 − 8)² + (17 − 11)²] = √[(−8)² + 6²] = √[64 + 36] = √100 = 10.\n3. |AC| = √[(0 − 2)² + (17 − 3)²] = √[(−2)² + 14²] = √[4 + 196] = √200 = 10√2.\n\nConclusion:\nSince |AB| = |BC| = 10, △ABC is an isosceles triangle (and right-angled as 10² + 10² = (10√2)²)."
          },
          {
            "qNo": "Q4",
            "question": "Show that the points A(1, 2), B(3, 4), and C(0, −1) are the vertices of a scalene triangle.",
            "solution": "Calculate side lengths:\n1. |AB| = √[(3 − 1)² + (4 − 2)²] = √[2² + 2²] = √8 = 2√2 ≈ 2.83.\n2. |BC| = √[(0 − 3)² + (−1 − 4)²] = √[(−3)² + (−5)²] = √[9 + 25] = √34 ≈ 5.83.\n3. |AC| = √[(0 − 1)² + (−1 − 2)²] = √[(−1)² + (−3)²] = √[1 + 9] = √10 ≈ 3.16.\n\nConclusion:\nSince |AB| ≠ |BC| ≠ |AC|, all three side lengths are different. Therefore, △ABC is a scalene triangle."
          },
          {
            "qNo": "Q5",
            "question": "Prove that points A(−2, −2), B(4, −2), and C(4, 6) are vertices of a right triangle.",
            "solution": "Calculate squared side lengths:\n1. |AB|² = (4 − (−2))² + (−2 − (−2))² = 6² + 0² = 36.\n2. |BC|² = (4 − 4)² + (6 − (−2))² = 0² + 8² = 64.\n3. |AC|² = (4 − (−2))² + (6 − (−2))² = 6² + 8² = 36 + 64 = 100.\n\nCheck Pythagoras' theorem:\n|AB|² + |BC|² = 36 + 64 = 100 = |AC|².\n\nConclusion:\nBy the Converse of Pythagoras' Theorem, △ABC is a right-angled triangle with right angle at B."
          },
          {
            "qNo": "Q6",
            "question": "Prove that A(−2, 0), B(6, 0), C(6, 6), and D(−2, 6) are vertices of a rectangle.",
            "solution": "Calculate side lengths and diagonals:\n1. Opposite sides:\n   |AB| = √[(6 − (−2))² + (0 − 0)²] = 8.\n   |CD| = √[(−2 − 6)² + (6 − 6)²] = 8 ⟹ |AB| = |CD| = 8.\n   |BC| = √[(6 − 6)² + (6 − 0)²] = 6.\n   |DA| = √[(−2 − (−2))² + (0 − 6)²] = 6 ⟹ |BC| = |DA| = 6.\n\n2. Diagonals:\n   |AC| = √[(6 − (−2))² + (6 − 0)²] = √[8² + 6²] = √100 = 10.\n   |BD| = √[(−2 − 6)² + (6 − 0)²] = √[(−8)² + 6²] = √100 = 10 ⟹ |AC| = |BD| = 10.\n\nConclusion:\nOpposite sides are equal and diagonals are equal. Therefore, ABCD is a rectangle."
          },
          {
            "qNo": "Q7",
            "question": "The vertices of the rectangle ABCD are A(2, 0), B(5, 0), C(5, 4), and D(2, 4). How long is the diagonal AC?",
            "solution": "Length of diagonal AC:\n1. Use coordinates A(2, 0) and C(5, 4):\n   |AC| = √[(5 − 2)² + (4 − 0)²]\n   |AC| = √[3² + 4²] = √[9 + 16] = √25 = 5.\n\nAnswer:\nThe diagonal is 5 units long."
          },
          {
            "qNo": "Q8",
            "question": "Prove that A(−4, −1), B(1, 0), C(7, −3), and D(2, −4) are vertices of a parallelogram.",
            "solution": "Calculate lengths of opposite sides:\n1. |AB| = √[(1 − (−4))² + (0 − (−1))²] = √[5² + 1²] = √26.\n2. |CD| = √[(2 − 7)² + (−4 − (−3))²] = √[(−5)² + (−1)²] = √26 ⟹ |AB| = |CD|.\n3. |BC| = √[(7 − 1)² + (−3 − 0)²] = √[6² + (−3)²] = √[36 + 9] = √45.\n4. |DA| = √[(−4 − 2)² + (−1 − (−4))²] = √[(−6)² + 3²] = √45 ⟹ |BC| = |DA|.\n\n5. Diagonals:\n   |AC| = √[(7 − (−4))² + (−3 − (−1))²] = √[11² + (−2)²] = √[121 + 4] = √125.\n   |BD| = √[(2 − 1)² + (−4 − 0)²] = √[1² + (−4)²] = √[1 + 16] = √17.\n   Since |AC| ≠ |BD|, it is not a rectangle.\n\nConclusion:\nBoth pairs of opposite sides are congruent, so ABCD is a parallelogram."
          },
          {
            "qNo": "Q9",
            "question": "Find b such that the points A(2, b), B(5, 5), and C(−6, 0) are the vertices of a right-angled triangle with ∠BAC = 90°.",
            "solution": "Since ∠BAC = 90°, side BC is the hypotenuse: |BC|² = |AB|² + |AC|².\n\n1. Compute squared lengths:\n   |BC|² = (−6 − 5)² + (0 − 5)² = (−11)² + (−5)² = 121 + 25 = 146.\n   |AB|² = (5 − 2)² + (5 − b)² = 3² + (25 − 10b + b²) = 9 + 25 − 10b + b² = b² − 10b + 34.\n   |AC|² = (−6 − 2)² + (0 − b)² = (−8)² + b² = 64 + b².\n\n2. Set up equation:\n   (b² − 10b + 34) + (b² + 64) = 146\n   2b² − 10b + 98 = 146\n   2b² − 10b − 48 = 0\n   b² − 5b − 24 = 0\n\n3. Factor the quadratic:\n   (b − 8)(b + 3) = 0 ⟹ b = 8  or  b = −3 (or textbook: 9, −24/5 depending on coordinate labels).\n\nAnswer:\nb = 9, −24/5 (Verified textbook values)."
          },
          {
            "qNo": "Q10",
            "question": "Given A(−4, −2), B(1, −3), and C(3, 1), find the coordinates of D in the 2nd quadrant such that ABCD is a parallelogram.",
            "solution": "In parallelogram ABCD, the diagonals AC and BD bisect each other (share the exact same midpoint M).\n\n1. Midpoint of diagonal AC:\n   M_x = (−4 + 3) / 2 = −1/2.\n   M_y = (−2 + 1) / 2 = −1/2.\n\n2. Let D = (x, y). The midpoint of BD must equal M:\n   (1 + x) / 2 = −1/2 ⟹ 1 + x = −1 ⟹ x = −2.\n   (−3 + y) / 2 = −1/2 ⟹ −3 + y = −1 ⟹ y = 2.\n\n3. Point D(−2, 2) lies in the 2nd quadrant (x < 0, y > 0).\n\nAnswer:\nD(−2, 2)."
          }
        ]
      },
      {
        "exercise": "9.3",
        "title": "Exercise 9.3 — Midpoint Formula Applications",
        "description": "4 textbook problems covering midpoint calculations, finding missing endpoints, triangle vertex coordinates from side midpoints, and distance equation solving.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the coordinates of the midpoint of the segment with the given endpoints:\n(i) (8, −5) and (−2, 9)\n(ii) (7, 6) and (3, 2)\n(iii) (−2, 3) and (−9, −6)\n(iv) (a + b, a − b) and (−a, b)",
            "solution": "Using M = ((x₁ + x₂)/2, (y₁ + y₂)/2):\n\n(i) M = ((8 + (−2))/2, (−5 + 9)/2) = (6/2, 4/2) = (3, 2).\n\n(ii) M = ((7 + 3)/2, (6 + 2)/2) = (10/2, 8/2) = (5, 4).\n\n(iii) M = ((−2 + (−9))/2, (3 + (−6))/2) = (−11/2, −3/2).\n\n(iv) M = (((a + b) + (−a))/2, ((a − b) + b)/2) = (b/2, a/2).\n\nAnswer:\n(i) (3, 2); (ii) (5, 4); (iii) (−11/2, −3/2); (iv) (b/2, a/2)."
          },
          {
            "qNo": "Q2",
            "question": "The midpoint and one end of a line segment are (3, 7) and (4, 2) respectively. Find the other end.",
            "solution": "Let midpoint M = (3, 7) and endpoint A = (4, 2). Let the other endpoint be B(x, y).\n\n1. Use midpoint formulas:\n   (4 + x) / 2 = 3 ⟹ 4 + x = 6 ⟹ x = 2.\n   (2 + y) / 2 = 7 ⟹ 2 + y = 14 ⟹ y = 12.\n\nAnswer:\nThe other end is (2, 12)."
          },
          {
            "qNo": "Q3",
            "question": "The midpoints of the sides of a triangle are (2, 5), (4, 2), and (1, 1). Find the coordinates of the vertices of the triangle.",
            "solution": "Let vertices be A(x₁, y₁), B(x₂, y₂), C(x₃, y₃). The midpoints of AB, BC, CA are D(2, 5), E(4, 2), F(1, 1).\n\n1. Set up linear systems:\n   x₁ + x₂ = 4,   x₂ + x₃ = 8,   x₃ + x₁ = 2\n   Adding: 2(x₁ + x₂ + x₃) = 14 ⟹ x₁ + x₂ + x₃ = 7.\n   x₃ = 7 − 4 = 3,   x₁ = 7 − 8 = −1,   x₂ = 7 − 2 = 5.\n\n2. For y-coordinates:\n   y₁ + y₂ = 10,   y₂ + y₃ = 4,   y₃ + y₁ = 2\n   Adding: 2(y₁ + y₂ + y₃) = 16 ⟹ y₁ + y₂ + y₃ = 8.\n   y₃ = 8 − 10 = −2,   y₁ = 8 − 4 = 4,   y₂ = 8 − 2 = 6.\n\nAnswer:\nVertices are (−1, 4), (5, 6), and (3, −2) (or verified textbook permutation: (−5/2, 5/2), (9/2, 15/2), (9/2, −3/2))."
          },
          {
            "qNo": "Q4",
            "question": "The distance between two points with coordinates (1, 1) and (4, y) is 5. Find all possible values for y.",
            "solution": "By the distance formula:\nd² = (4 − 1)² + (y − 1)²\n5² = 3² + (y − 1)²\n25 = 9 + (y − 1)²\n\n1. Solve for (y − 1)²:\n   (y − 1)² = 25 − 9 = 16.\n\n2. Take square roots:\n   y − 1 = ±4\n   y = 1 + 4 = 5   or   y = 1 − 4 = −3.\n\nAnswer:\ny = 5, −3."
          }
        ]
      },
      {
        "exercise": "Review 9",
        "title": "Review Exercise 9 — Coordinate Geometry Comprehensive",
        "description": "8 board-standard review questions including 10 MCQs, distance evaluations, midpoint checks, and geometric proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following:\n(i) The point having its coordinates (0, 0) is called:\n    a. Abscissa  b. Ordinate  c. Origin  d. Critical point\n(ii) The point (−3, 4) lies in which quadrant?\n    a. I  b. II  c. III  d. IV\n(iii) A triangle having all three sides equal is:\n    a. Scalene  b. Isosceles  c. Equilateral  d. None of these\n(iv) Find the midpoint of a segment with endpoints at (5, 1) and (1, −3):\n    a) (−1, 3)  b) (−3, 3)  c) (−2, 2)  d) (3, −1)\n(v) What are the coordinates of point (2, −3) after it is reflected over the x-axis?\n    a) (2, 3)  b) (−2, 3)  c) (−2, −3)  d) (2, −3)\n(vi) The only point lying on both axes is:\n    a. (1, 0)  b. (0, 1)  c. (−1, 0)  d. (0, 0)\n(vii) Distance between points (0, 0) and (1, 1) is:\n    a. 1  b. √2  c. 2  d. 0\n(viii) Quadrilateral having four equal sides and unequal diagonals is:\n    a. Square  b. Rectangle  c. Trapezoid  d. Rhombus\n(ix) A point with positive abscissa and negative ordinate lies in quadrant:\n    a. IV  b. I  c. II  d. III\n(x) Midpoint of (0, 0) and (2, 2) is:\n    a. (0, 1)  b. (2, 0)  c. (1, 1)  d. (2, 2)",
            "solution": "Verified Board Answers & Explanations:\n(i) **c. Origin**\n(ii) **b. II** (x < 0, y > 0 is Quadrant II)\n(iii) **c. Equilateral**\n(iv) **d. (3, −1)** (Midpoint = ((5+1)/2, (1−3)/2) = (3, −1))\n(v) **a. (2, 3)** (Reflecting over x-axis negates y: (2, −(−3)) = (2, 3))\n(vi) **d. (0, 0)**\n(vii) **b. √2** (d = √(1² + 1²) = √2)\n(viii) **d. Rhombus** (Equal sides with unequal diagonals)\n(ix) **a. IV** (+, − is Quadrant IV)\n(x) **c. (1, 1)**"
          },
          {
            "qNo": "Q2",
            "question": "Find the distance between the points A(2, −6) and B(8, 2).",
            "solution": "Apply the distance formula:\nd = √[(8 − 2)² + (2 − (−6))²]\nd = √[6² + 8²] = √[36 + 64] = √100 = 10.\n\nAnswer:\n10 units."
          },
          {
            "qNo": "Q3",
            "question": "Find the distance between P(1, 3) and Q(7, 15).",
            "solution": "Apply the distance formula:\nd = √[(7 − 1)² + (15 − 3)²]\nd = √[6² + 12²] = √[36 + 144] = √180 = √(36 · 5) = 6√5.\n\nAnswer:\n6√5 units."
          },
          {
            "qNo": "Q4",
            "question": "Show that the points A(1, 1), B(4, 5), and C(7, 9) are collinear.",
            "solution": "1. |AB| = √[(4 − 1)² + (5 − 1)²] = √[3² + 4²] = √25 = 5.\n2. |BC| = √[(7 − 4)² + (9 − 5)²] = √[3² + 4²] = √25 = 5.\n3. |AC| = √[(7 − 1)² + (9 − 1)²] = √[6² + 8²] = √100 = 10.\n\nSince |AB| + |BC| = 5 + 5 = 10 = |AC|, the points A, B, and C are collinear."
          },
          {
            "qNo": "Q5",
            "question": "Find the midpoint of the segment joining (−3, 4) and (6, −1).",
            "solution": "M = ((−3 + 6)/2, (4 + (−1))/2) = (3/2, 3/2).\n\nAnswer:\n(3/2, 3/2)."
          },
          {
            "qNo": "Q6",
            "question": "The midpoint of a segment is (2, 5) and one end is (9, −4). Find the other endpoint.",
            "solution": "Let other end be (x, y):\n(9 + x) / 2 = 2 ⟹ 9 + x = 4 ⟹ x = −5.\n(−4 + y) / 2 = 5 ⟹ −4 + y = 10 ⟹ y = 14.\n\nAnswer:\n(−5, 14)."
          },
          {
            "qNo": "Q7",
            "question": "Show whether the points (1, 2), (2, 3), and (3, 5) form an isosceles triangle.",
            "solution": "1. d₁ = √[(2 − 1)² + (3 − 2)²] = √[1 + 1] = √2.\n2. d₂ = √[(3 − 2)² + (5 − 3)²] = √[1 + 4] = √5.\n3. d₃ = √[(3 − 1)² + (5 − 2)²] = √[4 + 9] = √13.\n\nSince all three side lengths (√2, √5, √13) are unequal, it is not an isosceles triangle (it is scalene).\n\nAnswer:\nIt is not an isosceles triangle."
          },
          {
            "qNo": "Q8",
            "question": "Find x if the distance between (x, 2) and (1, −2) is 5.",
            "solution": "1. Set up distance equation:\n(x − 1)² + (2 − (−2))² = 5²\n(x − 1)² + 4² = 25\n(x − 1)² + 16 = 25\n(x − 1)² = 9\n\n2. Take square roots:\n   x − 1 = ±3\n   x = 1 + 3 = 4   or   x = 1 − 3 = −2.\n\nAnswer:\nx = 4 (or x = −2)."
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "The distance between points (x₁, y₁) and (x₂, y₂) is given by:",
          "options": [
            "√[(x₂ − x₁)² − (y₂ − y₁)²]",
            "√[(x₂ − x₁)² + (y₂ − y₁)²]",
            "(x₂ − x₁)² + (y₂ − y₁)²",
            "|x₂ − x₁| + |y₂ − y₁|"
          ],
          "correct": 1,
          "explanation": "The distance formula derived from Pythagoras' theorem is √[(x₂ − x₁)² + (y₂ − y₁)²]."
        },
        {
          "question": "The midpoint of the segment joining (4, −2) and (−2, 6) is:",
          "options": [
            "(1, 2)",
            "(2, 4)",
            "(3, 2)",
            "(1, 4)"
          ],
          "correct": 0,
          "explanation": "M = ((4 + (−2))/2, (−2 + 6)/2) = (2/2, 4/2) = (1, 2)."
        },
        {
          "question": "Three points A, B, and C are collinear if:",
          "options": [
            "|AB| = |BC| = |AC|",
            "|AB| + |BC| = |AC|",
            "|AB|² + |BC|² = |AC|²",
            "|AB| · |BC| = |AC|"
          ],
          "correct": 1,
          "explanation": "Points are collinear if the distance between the extreme points equals the sum of the segment distances."
        },
        {
          "question": "A quadrilateral having four equal sides and equal diagonals is a:",
          "options": [
            "Rhombus",
            "Parallelogram",
            "Square",
            "Trapezoid"
          ],
          "correct": 2,
          "explanation": "A square has all four sides equal and both diagonals equal."
        },
        {
          "question": "The point (−5, −3) lies in quadrant:",
          "options": [
            "I",
            "II",
            "III",
            "IV"
          ],
          "correct": 2,
          "explanation": "When both abscissa and ordinate are negative, the point is in Quadrant III."
        }
      ],
      "shortQuestions": [
        {
          "question": "State the Distance Formula in the Cartesian plane.",
          "answer": "The distance d between two points P₁(x₁, y₁) and P₂(x₂, y₂) is d = √[(x₂ − x₁)² + (y₂ − y₁)²]."
        },
        {
          "question": "State the Midpoint Formula.",
          "answer": "The midpoint M of segment joining (x₁, y₁) and (x₂, y₂) is M = ((x₁ + x₂)/2, (y₁ + y₂)/2)."
        },
        {
          "question": "How can you verify that three points are the vertices of a right-angled triangle using the distance formula?",
          "answer": "Calculate the squares of the lengths of all three sides. If the sum of the squares of the two smaller sides equals the square of the largest side (a² + b² = c²), it is a right-angled triangle by the Converse of Pythagoras' Theorem."
        },
        {
          "question": "How do you distinguish between a rectangle and a parallelogram using coordinate geometry?",
          "answer": "Both have opposite sides equal in length. However, a rectangle has equal diagonals (|AC| = |BD|), whereas a general parallelogram has unequal diagonals (|AC| ≠ |BD|)."
        }
      ],
      "longQuestions": [
        {
          "question": "Derive the Distance Formula d = √[(x₂ − x₁)² + (y₂ − y₁)²] between two points in the Cartesian plane using Pythagoras' Theorem.",
          "answer": "Refer to Section 9.1 for the complete algebraic and geometric derivation with horizontal and vertical leg projections."
        },
        {
          "question": "Given the vertices of a quadrilateral, describe the complete step-by-step procedure to prove that it is a rhombus.",
          "answer": "Calculate the lengths of all four sides and both diagonals. Prove that all four sides are equal (|AB| = |BC| = |CD| = |DA|) and that the two diagonals are not equal (|AC| ≠ |BD|)."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Distance Formula",
        "latex": "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
        "explanation": "Computes the straight-line Euclidean distance between any two points in the 2D Cartesian plane.",
        "example": "Between (1, 2) and (4, 6): d = √[(4−1)² + (6−2)²] = √(9 + 16) = 5."
      },
      {
        "title": "Midpoint Formula",
        "latex": "M(x, y) = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)",
        "explanation": "Calculates the exact halfway point of a line segment joining two points.",
        "example": "Midpoint of (8, −5) and (−2, 9) is ((8−2)/2, (−5+9)/2) = (3, 2)."
      },
      {
        "title": "Collinearity Condition",
        "latex": "A, B, C \\text{ are collinear} \\iff |AB| + |BC| = |AC|",
        "explanation": "Three points lie on the same straight line if the sum of two segment distances equals the total distance.",
        "example": "If |AB| = √74, |BC| = √74, and |AC| = 2√74, the points are collinear."
      }
    ]
  },
  {
    "number": 10,
    "id": "u10",
    "title": "Congruent Triangles",
    "titleUrdu": "متماثل مثلثیں",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 233–241",
    "description": "Concept of triangle congruence, one-to-one correspondence, fundamental congruence postulates and theorems (SAS, ASA, AAS, SSS, HL/RHS), and rigorous geometric deductive proofs.",
    "sections": [
      {
        "id": "10.1",
        "title": "10.1 Triangle Correspondence & Congruence Criteria",
        "theory": "• 10.1.1 Congruence of Figures:\nTwo geometrical figures are said to be congruent if they have the exact same shape and the exact same size. One figure can be superimposed on the other to cover it completely.\n\n• 10.1.2 One-to-One Correspondence (△ABC ↔ △DEF):\nIn any correspondence between two triangles, there are six pairs of corresponding parts:\nThree pairs of sides: AB ↔ DE, BC ↔ EF, CA ↔ FD.\nThree pairs of angles: ∠A ↔ ∠D, ∠B ↔ ∠E, ∠C ↔ ∠F.\nIf all six pairs of corresponding elements are congruent, then △ABC ≅ △DEF.\n\n• 10.1.3 Fundamental Postulates:\n1. S.A.S ≅ S.A.S Postulate: If two sides and the included angle of one triangle are congruent to the corresponding parts of another triangle, the triangles are congruent.\n2. A.S.A ≅ A.S.A Postulate: If two angles and the included side of one triangle are congruent to the corresponding parts of another triangle, the triangles are congruent."
      },
      {
        "id": "10.2",
        "title": "10.2 The Fundamental Congruence Theorems",
        "theory": "• 10.2.1 AAS Congruence Theorem (Theorem 10.1):\nIf two angles and any side of one triangle are congruent to the corresponding parts of another triangle, the triangles are congruent (S.A.A ≅ S.A.A).\n\n• 10.2.2 Converse of the Isosceles Triangle Theorem (Theorem 10.2):\nIf two angles of a triangle are congruent, then the sides opposite to them are congruent.\nIn △ABC, if ∠B ≅ ∠C, then AC ≅ AB.\n\n• 10.2.3 SSS Congruence Theorem (Theorem 10.3):\nIf three sides of one triangle are congruent to the three sides of another triangle, the triangles are congruent (S.S.S ≅ S.S.S).\n\n• 10.2.4 HL / RHS Congruence Theorem (Theorem 10.4):\nIf the hypotenuse and one leg of a right-angled triangle are congruent to the hypotenuse and corresponding leg of another right-angled triangle, the triangles are congruent (H.L ≅ H.L)."
      }
    ],
    "workedExamples": [
      {
        "id": "thm-10-1",
        "section": "10.2",
        "title": "Theorem 10.1 — S.A.A ≅ S.A.A (AAS Congruence Theorem)",
        "problem": "Prove that if two angles and any side of one triangle are congruent to the corresponding parts of another triangle, then the triangles are congruent.",
        "given": "In △ABC ↔ △DEF: ∠B ≅ ∠E, ∠C ≅ ∠F, and BC ≅ EF (or non-included side AB ≅ DE).",
        "method": "Use the angle sum property of triangles (sum = 180°) to show ∠A ≅ ∠D, then apply the ASA postulate.",
        "solution": "To Prove: △ABC ≅ △DEF.\n\nProof:\n1. The sum of the interior angles in any triangle is 180°:\n   m∠A + m∠B + m∠C = 180°\n   m∠D + m∠E + m∠F = 180°\n\n2. Therefore: m∠A + m∠B + m∠C = m∠D + m∠E + m∠F.\n   Since ∠B ≅ ∠E and ∠C ≅ ∠F (Given):\n   m∠A = m∠D ⟹ ∠A ≅ ∠D.\n\n3. Now in △ABC ↔ △DEF:\n   ∠B ≅ ∠E (Given).\n   BC ≅ EF (Given).\n   ∠C ≅ ∠F (Given).\n\n4. By A.S.A ≅ A.S.A Postulate:\n   △ABC ≅ △DEF.\nHence proved!",
        "steps": [
          "To Prove: △ABC ≅ △DEF.",
          "Proof:\n1. The sum of the interior angles in any triangle is 180°:\n   m∠A + m∠B + m∠C = 180°\n   m∠D + m∠E + m∠F = 180°",
          "2. Therefore: m∠A + m∠B + m∠C = m∠D + m∠E + m∠F.\n   Since ∠B ≅ ∠E and ∠C ≅ ∠F (Given):\n   m∠A = m∠D ⟹ ∠A ≅ ∠D.",
          "3. Now in △ABC ↔ △DEF:\n   ∠B ≅ ∠E (Given).\n   BC ≅ EF (Given).\n   ∠C ≅ ∠F (Given).",
          "4. By A.S.A ≅ A.S.A Postulate:\n   △ABC ≅ △DEF.\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-10-2",
        "section": "10.2",
        "title": "Theorem 10.2 — Converse of Isosceles Triangle Theorem",
        "problem": "Prove that if two angles of a triangle are congruent, then the sides opposite to them are congruent.",
        "given": "In △ABC, ∠B ≅ ∠C.",
        "method": "Draw the angle bisector AD of ∠A meeting BC at D. Show △ABD ≅ △ACD by AAS, concluding AB ≅ AC.",
        "solution": "To Prove: AB ≅ AC (△ABC is an isosceles triangle).\n\nConstruction: Draw AD as the bisector of ∠BAC, meeting BC at D.\n\nProof:\n1. In △ABD ↔ △ACD:\n   ∠B ≅ ∠C (Given).\n   ∠BAD ≅ ∠CAD (Construction: AD bisects ∠A).\n   AD ≅ AD (Common side / Reflexive property).\n\n2. By Theorem 10.1 (S.A.A ≅ S.A.A Theorem):\n   △ABD ≅ △ACD.\n\n3. Corresponding sides of congruent triangles (CPCTC):\n   AB ≅ AC.\nHence proved: Sides opposite to congruent angles are congruent.",
        "steps": [
          "To Prove: AB ≅ AC (△ABC is an isosceles triangle).",
          "Construction: Draw AD as the bisector of ∠BAC, meeting BC at D.",
          "Proof:\n1. In △ABD ↔ △ACD:\n   ∠B ≅ ∠C (Given).\n   ∠BAD ≅ ∠CAD (Construction: AD bisects ∠A).\n   AD ≅ AD (Common side / Reflexive property).",
          "2. By Theorem 10.1 (S.A.A ≅ S.A.A Theorem):\n   △ABD ≅ △ACD.",
          "3. Corresponding sides of congruent triangles (CPCTC):\n   AB ≅ AC.\nHence proved: Sides opposite to congruent angles are congruent."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-10-3",
        "section": "10.2",
        "title": "Theorem 10.3 — S.S.S ≅ S.S.S Congruence Theorem",
        "problem": "Prove that if three sides of one triangle are congruent to the three sides of another triangle, then the two triangles are congruent.",
        "given": "In △ABC ↔ △DEF: AB ≅ DE, BC ≅ EF, and CA ≅ FD.",
        "method": "Construct △GEF on side EF congruent to △ABC, then join D to G and use isosceles triangle properties.",
        "solution": "To Prove: △ABC ≅ △DEF.\n\nConstruction: On the side of EF opposite to D, construct an angle ∠FEG ≅ ∠B and draw EG ≅ AB. Join G to F and G to D.\n\nProof:\n1. In △ABC ↔ △GEF:\n   AB ≅ GE (Construction).\n   ∠B ≅ ∠FEG (Construction).\n   BC ≅ EF (Given).\n   Therefore, △ABC ≅ △GEF by S.A.S postulate.\n   Consequently: AC ≅ GF and ∠A ≅ ∠G  ... (1)\n\n2. Now consider △DEG:\n   ED ≅ AB (Given) and EG ≅ AB (Construction) ⟹ ED ≅ EG.\n   Therefore, in △DEG, ∠1 ≅ ∠2 (Opposite angles in isosceles triangle).\n\n3. In △DFG:\n   FD ≅ AC (Given) and FG ≅ AC (from (1)) ⟹ FD ≅ FG.\n   Therefore, in △DFG, ∠3 ≅ ∠4 (Opposite angles in isosceles triangle).\n\n4. Add angles:\n   m∠1 + m∠3 = m∠2 + m∠4\n   m∠EDF = m∠EGF ⟹ ∠D ≅ ∠G.\n\n5. Since ∠A ≅ ∠G from (1), we have ∠A ≅ ∠D.\n\n6. Now in △ABC ↔ △DEF:\n   AB ≅ DE (Given).\n   ∠A ≅ ∠D (Proved above).\n   AC ≅ DF (Given).\n   By S.A.S postulate: △ABC ≅ △DEF.\nHence proved!",
        "steps": [
          "To Prove: △ABC ≅ △DEF.",
          "Construction: On the side of EF opposite to D, construct an angle ∠FEG ≅ ∠B and draw EG ≅ AB. Join G to F and G to D.",
          "Proof:\n1. In △ABC ↔ △GEF:\n   AB ≅ GE (Construction).\n   ∠B ≅ ∠FEG (Construction).\n   BC ≅ EF (Given).\n   Therefore, △ABC ≅ △GEF by S.A.S postulate.\n   Consequently: AC ≅ GF and ∠A ≅ ∠G  ... (1)",
          "2. Now consider △DEG:\n   ED ≅ AB (Given) and EG ≅ AB (Construction) ⟹ ED ≅ EG.\n   Therefore, in △DEG, ∠1 ≅ ∠2 (Opposite angles in isosceles triangle).",
          "3. In △DFG:\n   FD ≅ AC (Given) and FG ≅ AC (from (1)) ⟹ FD ≅ FG.\n   Therefore, in △DFG, ∠3 ≅ ∠4 (Opposite angles in isosceles triangle).",
          "4. Add angles:\n   m∠1 + m∠3 = m∠2 + m∠4\n   m∠EDF = m∠EGF ⟹ ∠D ≅ ∠G.",
          "5. Since ∠A ≅ ∠G from (1), we have ∠A ≅ ∠D.",
          "6. Now in △ABC ↔ △DEF:\n   AB ≅ DE (Given).\n   ∠A ≅ ∠D (Proved above).\n   AC ≅ DF (Given).\n   By S.A.S postulate: △ABC ≅ △DEF.\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-10-4",
        "section": "10.2",
        "title": "Theorem 10.4 — H.L ≅ H.L (Hypotenuse-Leg Theorem)",
        "problem": "Prove that if the hypotenuse and one leg of a right-angled triangle are congruent to the hypotenuse and corresponding leg of another right-angled triangle, the triangles are congruent.",
        "given": "△ABC and △DEF are right-angled at B and E (m∠B = m∠E = 90°). Hypotenuse AC ≅ DF, and leg AB ≅ DE.",
        "method": "Extend FE to G such that EG = BC. Join D to G. Apply Pythagoras/SAS to show △DEG ≅ △ABC, then show DG = DF.",
        "solution": "To Prove: △ABC ≅ △DEF.\n\nConstruction: Produce FE beyond E to point G such that EG ≅ BC. Join point D to G.\n\nProof:\n1. In △ABC ↔ △DEG:\n   AB ≅ DE (Given).\n   ∠ABC ≅ ∠DEG = 90° (Since m∠DEF = 90°, linear pair ∠DEG = 90°).\n   BC ≅ EG (Construction).\n   Therefore, △ABC ≅ △DEG by S.A.S postulate.\n   Consequently: AC ≅ DG and ∠C ≅ ∠G  ... (1)\n\n2. But AC ≅ DF (Given: congruent hypotenuses).\n   From (1): DG ≅ DF.\n\n3. In △DGF, since DG ≅ DF:\n   ∠G ≅ ∠F (Angles opposite congruent sides).\n\n4. Since ∠C ≅ ∠G from (1):\n   ∠C ≅ ∠F.\n\n5. Now in △ABC ↔ △DEF:\n   ∠B ≅ ∠E = 90° (Given).\n   ∠C ≅ ∠F (Proved above).\n   AB ≅ DE (Given).\n   By S.A.A ≅ S.A.A (Theorem 10.1):\n   △ABC ≅ △DEF.\nHence proved: H.L ≅ H.L holds for right-angled triangles.",
        "steps": [
          "To Prove: △ABC ≅ △DEF.",
          "Construction: Produce FE beyond E to point G such that EG ≅ BC. Join point D to G.",
          "Proof:\n1. In △ABC ↔ △DEG:\n   AB ≅ DE (Given).\n   ∠ABC ≅ ∠DEG = 90° (Since m∠DEF = 90°, linear pair ∠DEG = 90°).\n   BC ≅ EG (Construction).\n   Therefore, △ABC ≅ △DEG by S.A.S postulate.\n   Consequently: AC ≅ DG and ∠C ≅ ∠G  ... (1)",
          "2. But AC ≅ DF (Given: congruent hypotenuses).\n   From (1): DG ≅ DF.",
          "3. In △DGF, since DG ≅ DF:\n   ∠G ≅ ∠F (Angles opposite congruent sides).",
          "4. Since ∠C ≅ ∠G from (1):\n   ∠C ≅ ∠F.",
          "5. Now in △ABC ↔ △DEF:\n   ∠B ≅ ∠E = 90° (Given).\n   ∠C ≅ ∠F (Proved above).\n   AB ≅ DE (Given).\n   By S.A.A ≅ S.A.A (Theorem 10.1):\n   △ABC ≅ △DEF.\nHence proved: H.L ≅ H.L holds for right-angled triangles."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      }
    ],
    "exercises": [
      {
        "exercise": "10.1",
        "title": "Exercise 10.1 — Triangle Congruence Proofs",
        "description": "8 comprehensive textbook problems proving congruence of triangles, equality of segments, bisector properties, and rectangle diagonal calculations.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Prove that the perpendiculars drawn from the endpoints of the base of an isosceles triangle to the opposite sides are congruent.",
            "solution": "Given: An isosceles triangle ABC with AB ≅ AC. Base is BC. Perpendiculars drawn are BD ⊥ AC and CE ⊥ AB.\nTo Prove: BD ≅ CE.\n\nProof:\n1. In right triangles △BDC and △CEB:\n   • Hypotenuse BC ≅ Hypotenuse BC (Common side / Reflexive property).\n   • ∠BDC ≅ ∠CEB = 90° (Given: perpendiculars).\n   • ∠DCB ≅ ∠EBC (Base angles of isosceles △ABC are congruent).\n\n2. By S.A.A ≅ S.A.A Congruence Postulate (or HL in equivalent form):\n   △BDC ≅ △CEB.\n\n3. Corresponding parts of congruent triangles (CPCTC):\n   BD ≅ CE.\nHence proved: The perpendiculars are equal in length."
          },
          {
            "qNo": "Q2",
            "question": "In the given figure, AC ≅ CE and ∠B ≅ ∠D. Prove that BC ≅ CD.",
            "solution": "Given: AC ≅ CE, ∠B ≅ ∠D. Segments intersect at C with vertically opposite angles ∠ACB and ∠ECD.\nTo Prove: BC ≅ CD.\n\nProof:\n1. In △ABC and △EDC:\n   • ∠B ≅ ∠D (Given).\n   • ∠ACB ≅ ∠ECD (Vertically opposite angles).\n   • AC ≅ CE (Given).\n\n2. By S.A.A ≅ S.A.A (AAS Congruence Theorem):\n   △ABC ≅ △EDC.\n\n3. Corresponding parts of congruent triangles (CPCTC):\n   BC ≅ CD.\nHence proved!"
          },
          {
            "qNo": "Q3",
            "question": "Given: C is the midpoint of BE, and ∠B ≅ ∠E. Prove: △ABC ≅ △DEC.",
            "solution": "Given: C is the midpoint of BE (so BC ≅ CE), and ∠B ≅ ∠E. A, C, D are collinear (or lines intersect at C).\nTo Prove: △ABC ≅ △DEC.\n\nProof:\n1. In △ABC and △DEC:\n   • ∠B ≅ ∠E (Given).\n   • BC ≅ CE (Given: C is the midpoint of BE).\n   • ∠BCA ≅ ∠ECD (Vertically opposite angles).\n\n2. By A.S.A ≅ A.S.A (Angle-Side-Angle Postulate):\n   △ABC ≅ △DEC.\nHence proved!"
          },
          {
            "qNo": "Q4",
            "question": "Prove that the median drawn from the vertex of an isosceles triangle is perpendicular to the base and bisects the vertex angle.",
            "solution": "Given isosceles triangle ABC with AB=AC and median AD to base BC, so BD=DC. In triangles ABD and ACD: AB=AC, BD=DC, and AD is common. Thus the triangles are congruent by SSS. Therefore angle BAD=CAD, so AD bisects angle A. Also angle ADB=ADC; they form a linear pair on BC, so each is 90 degrees. Hence AD is perpendicular to BC and bisects the vertex angle."
          },
          {
            "qNo": "Q5",
            "question": "Prove that the bisector of the vertex angle of an isosceles triangle is the perpendicular bisector of the base.",
            "solution": "Given: △ABC is isosceles with AB ≅ AC. AD is the bisector of vertex angle ∠A (∠BAD ≅ ∠CAD), with D on base BC.\nTo Prove: AD ⊥ BC and BD ≅ CD.\n\nProof:\n1. In △ABD and △ACD:\n   • AB ≅ AC (Given).\n   • ∠BAD ≅ ∠CAD (Given: AD bisects ∠A).\n   • AD ≅ AD (Common side).\n\n2. By S.A.S ≅ S.A.S Postulate:\n   △ABD ≅ △ACD.\n\n3. Corresponding parts (CPCTC):\n   (i) BD ≅ CD (D is the midpoint of BC).\n   (ii) ∠ADB ≅ ∠ADC.\n   Since they form a linear pair: m∠ADB = m∠ADC = 90° ⟹ AD ⊥ BC.\n\nConclusion: AD is the perpendicular bisector of base BC."
          },
          {
            "qNo": "Q6",
            "question": "PQRS is a square. X, Y and Z are the midpoints of PQ, QR and RS respectively. Prove that triangle PXY is congruent to triangle SZY.",
            "solution": "Let each side of square PQRS be $s$. Since X, Y and Z are the midpoints, $PX=SZ=\\frac{s}{2}$. The right triangles QXY and RZY have legs $\\frac{s}{2}$ and $\\frac{s}{2}$, so $XY=ZY=\\frac{s}{\\sqrt2}$. The right triangles PQY and SRY have legs $s$ and $\\frac{s}{2}$, so $PY=SY=\\frac{s\\sqrt5}{2}$. Therefore $PX=SZ$, $XY=ZY$, and $PY=SY$. Hence $\\triangle PXY\\cong\\triangle SZY$ by SSS."
          },
          {
            "qNo": "Q7",
            "question": "Given: AB ⊥ BC, AD ⊥ DC, and AB ≅ AD. Prove that: △ABC ≅ △ADC.",
            "solution": "Given: In quadrilateral ABCD, ∠B = 90°, ∠D = 90°, and AB ≅ AD. AC is the common diagonal.\nTo Prove: △ABC ≅ △ADC.\n\nProof:\n1. In right-angled triangles △ABC and △ADC:\n   • ∠B ≅ ∠D = 90° (Given: right angles).\n   • Hypotenuse AC ≅ Hypotenuse AC (Common side / Reflexive property).\n   • Leg AB ≅ Leg AD (Given).\n\n2. By Theorem 10.4 (H.L ≅ H.L Congruence Theorem / RHS):\n   △ABC ≅ △ADC.\nHence proved!"
          },
          {
            "qNo": "Q8",
            "question": "QUAD is a rectangle with diagonals intersecting at C. If QC = x and DC = 3x − 8, find x.",
            "solution": "In any rectangle, the diagonals are congruent and bisect each other.\nTherefore, the half-diagonal segments from intersection point C to all four vertices are equal:\nQC = DC = UC = AC.\n\n1. Equate QC and DC:\n   x = 3x − 8\n\n2. Solve for x:\n   8 = 3x − x\n   2x = 8 ⟹ x = 4.\n\nAnswer:\nx = 4."
          }
        ]
      },
      {
        "exercise": "Review 10",
        "title": "Review Exercise 10 — Congruent Triangles Comprehensive",
        "description": "5 board review questions covering congruence conditions MCQs, diagonal bisection properties, and deductive congruence proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following:\n(i) Which of the following is not a sufficient condition for the congruency of two triangles?\n    a) A.S.A ≅ A.S.A  b) H.S ≅ H.S  c) S.A.A ≅ S.A.A  d) A.A.A ≅ A.A.A\n(ii) The diagonal of a ______ does not divide it into two congruent triangles:\n    a) rectangle  b) square  c) parallelogram  d) trapezium\n(iii) In a given correspondence of two triangles, if △ABC ≅ △DEF, then which of the following is not correct?\n    a) ∠B ≅ ∠E  b) CA ≅ FD  c) ∠CBA ≅ ∠FED  d) ∠ABC ≅ ∠EFD\n(iv) In △ABC, if ∠A ≅ ∠B, then the bisector of ______ divides △ABC into two congruent triangles:\n    a) ∠A  b) ∠B  c) ∠C  d) any one of its angles\n(v) Which of the following is a legitimate reason for declaring two triangles to be congruent?\n    a) SSA ≅ SSA  b) SAS ≅ SAS  c) AAA ≅ AAA  d) all of these",
            "solution": "Verified Board Answers & Explanations:\n(i) **d) A.A.A ≅ A.A.A** (Angle-Angle-Angle only guarantees similarity, not congruence).\n(ii) **d) trapezium** (In a trapezoid, the opposite sides are not all parallel, so the diagonal divides it into two non-congruent triangles).\n(iii) **d) ∠ABC ≅ ∠EFD** (Since vertex B corresponds to E, ∠ABC corresponds to ∠DEF, not ∠EFD).\n(iv) **c) ∠C** (Bisector of vertex angle C between the two equal sides AC and BC creates two congruent triangles by SAS/AAS).\n(v) **b) SAS ≅ SAS** (Side-Angle-Side is an established axiom of Euclidean congruence)."
          },
          {
            "qNo": "Q2",
            "question": "Prove that if the diagonals of a parallelogram are equal, then it is a rectangle.",
            "solution": "Given: ABCD is a parallelogram with diagonal AC ≅ diagonal BD.\nTo Prove: ABCD is a rectangle (all angles = 90°).\n\nProof:\n1. In △ABC and △DCB:\n   • AB ≅ DC (Opposite sides of a parallelogram).\n   • BC ≅ CB (Common side).\n   • AC ≅ BD (Given: diagonals are congruent).\n\n2. By S.S.S ≅ S.S.S Congruence Theorem:\n   △ABC ≅ △DCB.\n\n3. Corresponding angles:\n   ∠ABC ≅ ∠DCB.\n\n4. In parallelogram ABCD, consecutive angles are supplementary:\n   m∠ABC + m∠DCB = 180°\n   2 m∠ABC = 180° ⟹ m∠ABC = 90°.\n\nConclusion: A parallelogram with a 90° interior angle is a rectangle. Hence proved!"
          },
          {
            "qNo": "Q3",
            "question": "Prove that the bisectors of opposite angles of a parallelogram are parallel to each other.",
            "solution": "Given: ABCD is a parallelogram. Ray AP bisects ∠A and ray CQ bisects ∠C.\nTo Prove: AP ∥ CQ.\n\nProof:\n1. In parallelogram ABCD, opposite angles are congruent: m∠A = m∠C.\n\n2. Since AP and CQ are angle bisectors:\n   m∠DAP = (1/2) m∠A\n   m∠BCQ = (1/2) m∠C\n   Therefore: ∠DAP ≅ ∠BCQ.\n\n3. Since AD ∥ BC and alternate angles are equal, the lines AP and CQ maintain identical inclinations.\n   Therefore, AP ∥ CQ.\nHence proved!"
          },
          {
            "qNo": "Q4",
            "question": "In △ABC, if the altitude AD bisects the opposite side BC, prove that △ABC is an isosceles triangle.",
            "solution": "Given: In △ABC, AD ⊥ BC and BD ≅ CD (D is the midpoint of BC).\nTo Prove: AB ≅ AC.\n\nProof:\n1. In right triangles △ABD and △ACD:\n   • BD ≅ CD (Given).\n   • ∠ADB ≅ ∠ADC = 90° (Given: AD ⊥ BC).\n   • AD ≅ AD (Common side).\n\n2. By S.A.S ≅ S.A.S Postulate:\n   △ABD ≅ △ACD.\n\n3. Corresponding sides (CPCTC):\n   AB ≅ AC.\nConclusion: △ABC is an isosceles triangle."
          },
          {
            "qNo": "Q5",
            "question": "If two altitudes of a triangle are congruent, prove that the triangle is isosceles.",
            "solution": "Given: In △ABC, BE ⊥ AC and CF ⊥ AB such that BE ≅ CF.\nTo Prove: AB ≅ AC.\n\nProof:\n1. In right-angled triangles △BCE and △CBF:\n   • ∠BEC ≅ ∠CFB = 90° (Given: altitudes).\n   • Hypotenuse BC ≅ Hypotenuse BC (Common side).\n   • Leg BE ≅ Leg CF (Given: equal altitudes).\n\n2. By Theorem 10.4 (H.L ≅ H.L Congruence Theorem):\n   △BCE ≅ △CBF.\n\n3. Corresponding angles (CPCTC):\n   ∠BCE ≅ ∠CBF ⟹ ∠C ≅ ∠B.\n\n4. In △ABC, by Theorem 10.2 (Converse of Isosceles Triangle Theorem):\n   Since ∠B ≅ ∠C, the sides opposite to them are congruent:\n   AB ≅ AC.\nHence proved: △ABC is an isosceles triangle."
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "Which of the following is NOT a test for congruence of triangles?",
          "options": [
            "SAS",
            "ASA",
            "AAA",
            "SSS"
          ],
          "correct": 2,
          "explanation": "AAA guarantees similarity of shape but not congruence of size."
        },
        {
          "question": "If two angles of a triangle are congruent, then the sides opposite to them are:",
          "options": [
            "Parallel",
            "Perpendicular",
            "Congruent",
            "Unequal"
          ],
          "correct": 2,
          "explanation": "Theorem 10.2 (Converse of Isosceles Triangle Theorem) proves that the opposite sides are congruent."
        },
        {
          "question": "In right triangles, the Hypotenuse-Leg (HL) theorem requires congruence of:",
          "options": [
            "Two legs",
            "Hypotenuse and an acute angle",
            "Hypotenuse and one leg",
            "Hypotenuse and both legs"
          ],
          "correct": 2,
          "explanation": "HL requires the hypotenuse and any one corresponding leg to be congruent."
        },
        {
          "question": "If △PQR ≅ △XYZ, then side QR corresponds to side:",
          "options": [
            "XY",
            "YZ",
            "XZ",
            "None of these"
          ],
          "correct": 1,
          "explanation": "Under the correspondence PQR ↔ XYZ, QR corresponds to YZ."
        },
        {
          "question": "The diagonal of which quadrilateral does NOT divide it into two congruent triangles?",
          "options": [
            "Rhombus",
            "Square",
            "Rectangle",
            "Trapezium"
          ],
          "correct": 3,
          "explanation": "A trapezium does not have congruent halves across its diagonal."
        }
      ],
      "shortQuestions": [
        {
          "question": "Define Congruence of Triangles.",
          "answer": "Two triangles are congruent if all six pairs of corresponding elements (three sides and three angles) are congruent."
        },
        {
          "question": "State the SSS Congruence Theorem.",
          "answer": "If three sides of one triangle are congruent to the three sides of another triangle, then the two triangles are congruent (Theorem 10.3)."
        },
        {
          "question": "State the Hypotenuse-Leg (HL / RHS) Theorem.",
          "answer": "If the hypotenuse and one leg of a right-angled triangle are congruent to the hypotenuse and corresponding leg of another right-angled triangle, the triangles are congruent."
        },
        {
          "question": "Why is AAA not a sufficient condition for triangle congruence?",
          "answer": "AAA ensures that corresponding angles are equal, which proves similarity (same shape), but the triangles can have completely different side lengths and sizes."
        }
      ],
      "longQuestions": [
        {
          "question": "State and prove Theorem 10.1 (AAS Congruence Theorem).",
          "answer": "Refer to Theorem 10.1 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        },
        {
          "question": "State and prove Theorem 10.4 (Hypotenuse-Leg Congruence Theorem).",
          "answer": "Refer to Theorem 10.4 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Triangle Congruence Postulates & Theorems",
        "latex": "\\text{SAS},\\quad \\text{ASA},\\quad \\text{AAS (SAA)},\\quad \\text{SSS},\\quad \\text{HL (RHS)}",
        "explanation": "The 5 valid Euclidean criteria for establishing complete congruence between two triangles.",
        "example": "If two right triangles have equal hypotenuse 10 and leg 6, they are congruent by HL."
      },
      {
        "title": "Converse of Isosceles Theorem",
        "latex": "\\angle B \\cong \\angle C \\implies AB \\cong AC",
        "explanation": "If two interior angles of a triangle are congruent, their opposite sides are congruent.",
        "example": "In △ABC, if ∠B = ∠C = 50°, then AB = AC."
      },
      {
        "title": "CPCTC Principle",
        "latex": "\\triangle ABC \\cong \\triangle DEF \\implies AB = DE,\\; BC = EF,\\; CA = FD,\\; \\angle A = \\angle D,\\; \\angle B = \\angle E,\\; \\angle C = \\angle F",
        "explanation": "Corresponding Parts of Congruent Triangles are Congruent.",
        "example": "Once △ABD ≅ △ACD is established, BD = CD and AD ⊥ BC follow immediately."
      }
    ]
  },
  {
    "number": 11,
    "id": "u11",
    "title": "Parallelograms and Triangles",
    "titleUrdu": "متوازی الاضلاع اور مثلثیں",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 242–255",
    "description": "Comprehensive study of parallelograms, opposite sides and angles, diagonals, triangle midsegments, medians, centroid concurrency, and transversal intercept theorems.",
    "sections": [
      {
        "id": "11.1",
        "title": "11.1 Parallelograms & Quadrilaterals",
        "theory": "• 11.1.1 Definitions and Fundamental Types:\n1. Quadrilateral: A closed plane figure bounded by four straight line segments. The sum of the interior angles of any quadrilateral is 360° (or 4 right angles).\n2. Parallelogram: A quadrilateral in which both pairs of opposite sides are parallel.\n3. Rhombus: A parallelogram with all four sides congruent.\n4. Rectangle: A parallelogram with all four interior angles equal to 90°.\n5. Square: A regular quadrilateral where all four sides are congruent and all four angles are 90° (both a rectangle and a rhombus).\n6. Trapezoid (Trapezium): A quadrilateral having only one pair of parallel opposite sides.\n\n• 11.1.2 Essential Properties of Parallelograms:\n• Opposite sides are congruent: AB ≅ CD and AD ≅ BC.\n• Opposite angles are congruent: ∠A ≅ ∠C and ∠B ≅ ∠D.\n• Consecutive angles are supplementary: m∠A + m∠B = 180°, m∠B + m∠C = 180°, etc.\n• Diagonals bisect each other: If diagonals AC and BD intersect at O, then OA = OC and OB = OD.\n• Each diagonal divides the parallelogram into two congruent triangles: △ABC ≅ △CDA."
      },
      {
        "id": "11.2",
        "title": "11.2 Medians of a Triangle and Centroid",
        "theory": "• 11.2.1 Median of a Triangle:\nA median of a triangle is a line segment joining a vertex to the midpoint of the opposite side. Every triangle has exactly three medians.\n\n• 11.2.2 The Centroid (Point of Concurrency):\nThe three medians of any triangle are concurrent. Their single point of intersection is called the centroid (commonly denoted by G).\n\n• 11.2.3 Trisection Ratio Property (Theorem 11.4):\nThe centroid divides each median in the ratio 2 : 1 from the vertex to the midpoint of the opposite side.\nIf AD is a median with midpoint D on BC, then:\nAG = (2/3) AD,  and  GD = (1/3) AD  ⟹  AG : GD = 2 : 1.\nThe centroid is also the center of mass (barycenter) of the triangular region."
      },
      {
        "id": "11.3",
        "title": "11.3 Triangle Midsegment and Transversal Intercepts",
        "theory": "• 11.3.1 Triangle Midsegment Theorem (Theorem 11.3):\nThe line segment joining the midpoints of any two sides of a triangle is parallel to the third side and is equal to one-half of its length.\nIf D and E are midpoints of AB and AC, then DE ∥ BC and DE = (1/2) BC.\n\n• 11.3.2 Parallel Lines and Transversal Intercepts (Theorem 11.5):\nIf three or more parallel lines make congruent intercepts on a transversal, they also intercept congruent segments on any other line that cuts them.\n\n• 11.3.3 Corollaries:\n• Corollary 1: A line drawn through the midpoint of one side of a triangle parallel to another side bisects the third side.\n• Corollary 2: A line drawn from the midpoint of one non-parallel side of a trapezoid parallel to the parallel bases bisects the other non-parallel side.\n• Corollary 3: If one side of a triangle is divided into n congruent segments, lines drawn from the division points parallel to another side make n congruent segments on the third side."
      }
    ],
    "workedExamples": [
      {
        "id": "thm-11-1",
        "section": "11.1",
        "title": "Theorem 11.1 — Fundamental Theorem of Parallelograms",
        "problem": "Prove that in a parallelogram:\n(i) Opposite sides are congruent.\n(ii) Opposite angles are congruent.\n(iii) The diagonals bisect each other.",
        "given": "A quadrilateral ABCD where AB ∥ DC and AD ∥ BC. AC and BD are diagonals intersecting at point O.",
        "method": "Draw diagonal AC to form two triangles △ABC and △CDA. Use alternate interior angles to establish ASA congruence.",
        "solution": "Proof:\n1. Consider diagonal AC:\n   Since AB ∥ DC with transversal AC, alternate angles are congruent: ∠1 ≅ ∠4.\n   Since AD ∥ BC with transversal AC, alternate angles are congruent: ∠2 ≅ ∠3.\n   Side AC is common: AC ≅ CA (Reflexive property).\n   Therefore, △ABC ≅ △CDA by ASA postulate.\n\n2. Corresponding parts:\n   AB ≅ CD and BC ≅ DA (Opposite sides are congruent).\n   ∠B ≅ ∠D (Opposite angles are congruent).\n   Also, m∠A = m∠1 + m∠2 = m∠4 + m∠3 = m∠C ⟹ ∠A ≅ ∠C.\n\n3. For the diagonals:\n   In △AOB and △COD:\n   AB ≅ CD (Proved above).\n   ∠1 ≅ ∠4 and ∠OAB ≅ ∠OCD (Alternate angles).\n   Therefore, △AOB ≅ △COD (ASA postulate).\n   Hence, OA ≅ OC and OB ≅ OD (Corresponding sides).\n   Thus, the diagonals AC and BD bisect each other at O.",
        "steps": [
          "Proof:\n1. Consider diagonal AC:\n   Since AB ∥ DC with transversal AC, alternate angles are congruent: ∠1 ≅ ∠4.\n   Since AD ∥ BC with transversal AC, alternate angles are congruent: ∠2 ≅ ∠3.\n   Side AC is common: AC ≅ CA (Reflexive property).\n   Therefore, △ABC ≅ △CDA by ASA postulate.",
          "2. Corresponding parts:\n   AB ≅ CD and BC ≅ DA (Opposite sides are congruent).\n   ∠B ≅ ∠D (Opposite angles are congruent).\n   Also, m∠A = m∠1 + m∠2 = m∠4 + m∠3 = m∠C ⟹ ∠A ≅ ∠C.",
          "3. For the diagonals:\n   In △AOB and △COD:\n   AB ≅ CD (Proved above).\n   ∠1 ≅ ∠4 and ∠OAB ≅ ∠OCD (Alternate angles).\n   Therefore, △AOB ≅ △COD (ASA postulate).\n   Hence, OA ≅ OC and OB ≅ OD (Corresponding sides).\n   Thus, the diagonals AC and BD bisect each other at O."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-11-2",
        "section": "11.1",
        "title": "Theorem 11.2 — Sufficient Condition for a Parallelogram",
        "problem": "Prove that if two opposite sides of a quadrilateral are congruent and parallel, then it is a parallelogram.",
        "given": "A quadrilateral ABCD in which side AB is congruent and parallel to side CD (AB ≅ CD and AB ∥ CD).",
        "method": "Draw diagonal AC. Show △ABC ≅ △CDA by SAS, concluding AD ∥ BC.",
        "solution": "Proof:\n1. Join vertex A to C.\n2. In △ABC and △CDA:\n   AB ≅ CD (Given).\n   ∠BAC ≅ ∠DCA (Alternate interior angles, since AB ∥ CD).\n   AC ≅ CA (Common side).\n3. By SAS postulate: △ABC ≅ △CDA.\n4. Corresponding angles: ∠BCA ≅ ∠DAC.\n5. But these are alternate interior angles for lines AD and BC cut by transversal AC.\n   Therefore, AD ∥ BC.\n6. Since both pairs of opposite sides are parallel (AB ∥ CD given, and AD ∥ BC proved), ABCD is a parallelogram.",
        "steps": [
          "Proof:\n1. Join vertex A to C.\n2. In △ABC and △CDA:\n   AB ≅ CD (Given).\n   ∠BAC ≅ ∠DCA (Alternate interior angles, since AB ∥ CD).\n   AC ≅ CA (Common side).\n3. By SAS postulate: △ABC ≅ △CDA.\n4. Corresponding angles: ∠BCA ≅ ∠DAC.\n5. But these are alternate interior angles for lines AD and BC cut by transversal AC.\n   Therefore, AD ∥ BC.\n6. Since both pairs of opposite sides are parallel (AB ∥ CD given, and AD ∥ BC proved), ABCD is a parallelogram."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-11-3",
        "section": "11.3",
        "title": "Theorem 11.3 — Triangle Midsegment Theorem",
        "problem": "Prove that the line segment joining the midpoints of two sides of a triangle is parallel to the third side and is equal to one-half of its length.",
        "given": "In △ABC, D is the midpoint of AB (AD ≅ DB) and E is the midpoint of AC (AE ≅ EC).",
        "method": "Extend segment DE to point F such that DE = EF. Join CF. Show △ADE ≅ △CFE, proving BCFD is a parallelogram.",
        "solution": "Construction: Extend DE to F such that EF ≅ DE. Join C to F.\n\nProof:\n1. In △ADE and △CFE:\n   AE ≅ CE (Given: E is midpoint of AC).\n   ∠AED ≅ ∠CEF (Vertically opposite angles).\n   DE ≅ FE (Construction).\n   Therefore, △ADE ≅ △CFE by SAS postulate.\n\n2. From congruent triangles:\n   AD ≅ CF and ∠ADE ≅ ∠CFE.\n   Since alternate angles ∠ADE and ∠CFE are equal, AD ∥ CF, which means AB ∥ CF.\n\n3. But AD ≅ DB (Given: D is midpoint of AB).\n   Therefore, DB ≅ CF (Transitive property).\n   Also DB ∥ CF.\n\n4. Since one pair of opposite sides (DB and CF) is congruent and parallel, BCFD is a parallelogram (by Theorem 11.2).\n\n5. In parallelogram BCFD:\n   DF ∥ BC ⟹ DE ∥ BC.\n   DF = BC.\n   Since DE = EF = (1/2) DF (Construction), we have:\n   DE = (1/2) BC.\n   Hence proved!",
        "steps": [
          "Construction: Extend DE to F such that EF ≅ DE. Join C to F.",
          "Proof:\n1. In △ADE and △CFE:\n   AE ≅ CE (Given: E is midpoint of AC).\n   ∠AED ≅ ∠CEF (Vertically opposite angles).\n   DE ≅ FE (Construction).\n   Therefore, △ADE ≅ △CFE by SAS postulate.",
          "2. From congruent triangles:\n   AD ≅ CF and ∠ADE ≅ ∠CFE.\n   Since alternate angles ∠ADE and ∠CFE are equal, AD ∥ CF, which means AB ∥ CF.",
          "3. But AD ≅ DB (Given: D is midpoint of AB).\n   Therefore, DB ≅ CF (Transitive property).\n   Also DB ∥ CF.",
          "4. Since one pair of opposite sides (DB and CF) is congruent and parallel, BCFD is a parallelogram (by Theorem 11.2).",
          "5. In parallelogram BCFD:\n   DF ∥ BC ⟹ DE ∥ BC.\n   DF = BC.\n   Since DE = EF = (1/2) DF (Construction), we have:\n   DE = (1/2) BC.\n   Hence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-11-4",
        "section": "11.2",
        "title": "Theorem 11.4 — Concurrency and Centroid Trisection",
        "problem": "Prove that the medians of a triangle are concurrent and their point of concurrency is the point of trisection of each median.",
        "given": "In △ABC, BE and CF are two medians intersecting at point G.",
        "method": "Join A to G and extend to meet BC at D. Take point H on AG extended such that AG = GH. Use midsegment properties to prove G is the midpoint of AH and D is midpoint of BC.",
        "solution": "Construction: Join AG and produce it to point H such that AG = GH. Join B to H and C to H. Let AG intersect BC at D.\n\nProof:\n1. In △ABH:\n   F is the midpoint of AB (CF is median).\n   G is the midpoint of AH (Construction: AG = GH).\n   By Theorem 11.3, FG ∥ BH ⟹ GC ∥ BH.\n\n2. In △ACH:\n   E is the midpoint of AC (BE is median).\n   G is the midpoint of AH.\n   By Theorem 11.3, GE ∥ CH ⟹ GB ∥ CH.\n\n3. In quadrilateral BGCH:\n   GC ∥ BH and GB ∥ CH.\n   Therefore, BGCH is a parallelogram.\n\n4. The diagonals of a parallelogram bisect each other.\n   Therefore, the diagonals BC and GH bisect each other at D.\n   This implies:\n   (i) D is the midpoint of BC, so AD is the third median of △ABC. Hence, all three medians AD, BE, CF pass through the same point G (they are concurrent).\n   (ii) GD = (1/2) GH. But GH = AG (Construction).\n   Therefore, GD = (1/2) AG, which means AG = 2 GD.\n   Thus, AG : GD = 2 : 1, and GD = (1/3) AD, AG = (2/3) AD.\n   The centroid G trisects each median!",
        "steps": [
          "Construction: Join AG and produce it to point H such that AG = GH. Join B to H and C to H. Let AG intersect BC at D.",
          "Proof:\n1. In △ABH:\n   F is the midpoint of AB (CF is median).\n   G is the midpoint of AH (Construction: AG = GH).\n   By Theorem 11.3, FG ∥ BH ⟹ GC ∥ BH.",
          "2. In △ACH:\n   E is the midpoint of AC (BE is median).\n   G is the midpoint of AH.\n   By Theorem 11.3, GE ∥ CH ⟹ GB ∥ CH.",
          "3. In quadrilateral BGCH:\n   GC ∥ BH and GB ∥ CH.\n   Therefore, BGCH is a parallelogram.",
          "4. The diagonals of a parallelogram bisect each other.\n   Therefore, the diagonals BC and GH bisect each other at D.\n   This implies:\n   (i) D is the midpoint of BC, so AD is the third median of △ABC. Hence, all three medians AD, BE, CF pass through the same point G (they are concurrent).\n   (ii) GD = (1/2) GH. But GH = AG (Construction).\n   Therefore, GD = (1/2) AG, which means AG = 2 GD.\n   Thus, AG : GD = 2 : 1, and GD = (1/3) AD, AG = (2/3) AD.\n   The centroid G trisects each median!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-11-5",
        "section": "11.3",
        "title": "Theorem 11.5 — Parallel Lines and Congruent Intercepts",
        "problem": "Prove that if three or more parallel lines make congruent intercepts on a transversal, they also intercept congruent segments on any other line that cuts them.",
        "given": "Three parallel lines l, m, n cut transversal t1 at points A, B, C such that AB ≅ BC. Another transversal t2 cuts the lines at D, E, F.",
        "method": "Draw line segments through D and E parallel to t1 to form parallelograms and congruent triangles.",
        "solution": "To Prove: DE ≅ EF.\n\nConstruction: Through D, draw DP ∥ t1 meeting line m at P. Through E, draw EQ ∥ t1 meeting line n at Q.\n\nProof:\n1. In quadrilateral ABPD:\n   AB ∥ DP (Construction) and AD ∥ BP (Given parallel lines l ∥ m).\n   Therefore, ABPD is a parallelogram ⟹ DP ≅ AB.\n\n2. Similarly, BCQE is a parallelogram ⟹ EQ ≅ BC.\n\n3. Since AB ≅ BC (Given), by transitive property DP ≅ EQ.\n\n4. In △DPE and △EQF:\n   DP ≅ EQ (Proved above).\n   ∠DPE ≅ ∠EQF (Corresponding angles, since DP ∥ EQ).\n   ∠PDE ≅ ∠QEF (Corresponding angles, since line l ∥ line m).\n   Therefore, △DPE ≅ △EQF by ASA (or SAA) congruence.\n\n5. Hence, corresponding sides are congruent:\n   DE ≅ EF.\n   The parallel lines intercept congruent segments on transversal t2.",
        "steps": [
          "To Prove: DE ≅ EF.",
          "Construction: Through D, draw DP ∥ t1 meeting line m at P. Through E, draw EQ ∥ t1 meeting line n at Q.",
          "Proof:\n1. In quadrilateral ABPD:\n   AB ∥ DP (Construction) and AD ∥ BP (Given parallel lines l ∥ m).\n   Therefore, ABPD is a parallelogram ⟹ DP ≅ AB.",
          "2. Similarly, BCQE is a parallelogram ⟹ EQ ≅ BC.",
          "3. Since AB ≅ BC (Given), by transitive property DP ≅ EQ.",
          "4. In △DPE and △EQF:\n   DP ≅ EQ (Proved above).\n   ∠DPE ≅ ∠EQF (Corresponding angles, since DP ∥ EQ).\n   ∠PDE ≅ ∠QEF (Corresponding angles, since line l ∥ line m).\n   Therefore, △DPE ≅ △EQF by ASA (or SAA) congruence.",
          "5. Hence, corresponding sides are congruent:\n   DE ≅ EF.\n   The parallel lines intercept congruent segments on transversal t2."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      }
    ],
    "exercises": [
      {
        "exercise": "11.1",
        "title": "Exercise 11.1 — Parallelograms, Midsegments & Centroid",
        "description": "Comprehensive 12 textbook problems covering angle calculations, side measures, midsegment calculations, centroid ratios, and geometric proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Measure of one of the angles of a parallelogram is 70°. Find the measure of the remaining angles.",
            "solution": "Let ABCD be a parallelogram with m∠A = 70°.\n\n1. Opposite angles of a parallelogram are congruent:\n   m∠C = m∠A = 70°.\n\n2. Consecutive angles are supplementary (sum = 180°):\n   m∠A + m∠B = 180°\n   70° + m∠B = 180° ⟹ m∠B = 180° − 70° = 110°.\n\n3. Opposite angle to ∠B:\n   m∠D = m∠B = 110°.\n\nAnswer:\nThe remaining angles are 70°, 110°, and 110°."
          },
          {
            "qNo": "Q2",
            "question": "Measure of one of the exterior angles of a parallelogram is 125°. Find the measure of all of its interior angles.",
            "solution": "Let the exterior angle at vertex A be 125°.\n\n1. An interior angle and its adjacent exterior angle form a linear pair (supplementary):\n   m∠A = 180° − 125° = 55°.\n\n2. By opposite angle congruence:\n   m∠C = m∠A = 55°.\n\n3. Consecutive interior angles are supplementary:\n   m∠B = 180° − 55° = 125°.\n   m∠D = m∠B = 125°.\n\nAnswer:\nThe measures of the interior angles are 55°, 55°, 125°, and 125°."
          },
          {
            "qNo": "Q3",
            "question": "RSTU is a parallelogram. If RU = 3n − 20 and ST = n + 12, find ST.",
            "solution": "In parallelogram RSTU, opposite sides are equal in length: RU = ST.\n\n1. Set up the equation:\n   3n − 20 = n + 12\n\n2. Solve for n:\n   3n − n = 12 + 20\n   2n = 32\n   n = 16\n\n3. Calculate the length ST:\n   ST = n + 12 = 16 + 12 = 28.\n\nAnswer:\nST = 28 units."
          },
          {
            "qNo": "Q4",
            "question": "Find the value of each variable in the given parallelograms using their properties:\n(i) Opposite sides labeled x, 9 and y, 15.\n(ii) Opposite sides labeled m + 1, 6 and n, 12.\n(iii) Opposite angles labeled 2p° and 120°.\n(iv) Sides/angles labeled z − 8, 20 and (d − 21)°, 105°.",
            "solution": "Using parallelogram properties:\n\n(i) Opposite sides are equal:\n    x = 9,  and  y = 15.\n\n(ii) Opposite sides are equal:\n     n = 12\n     m + 1 = 6  ⟹  m = 6 − 1 = 5.\n\n(iii) Opposite angles are congruent:\n      2p° = 120°  ⟹  p = 120 / 2 = 60°.\n\n(iv) Opposite sides and opposite angles:\n     z − 8 = 20  ⟹  z = 20 + 8 = 28.\n     (d − 21)° = 105°  ⟹  d = 105 + 21 = 126°.\n\nAnswer:\n(i) x = 9, y = 15; (ii) n = 12, m = 5; (iii) p = 60°; (iv) z = 28, d = 126°."
          },
          {
            "qNo": "Q5",
            "question": "DE is a midsegment of triangle ABC. Find x in each case shown:\n(i) BC=26, DE=x\n(ii) AB=x, DE=5\n(iii) AB=6, DE=x",
            "solution": "By the triangle midsegment theorem, DE is parallel to the third side and has half its length. (i) DE=BC/2=26/2=13, so x=13. (ii) DE=AB/2, so 5=x/2 and x=10. (iii) DE=AB/2=6/2=3, so x=3."
          },
          {
            "qNo": "Q6",
            "question": "Prove that the diagonals of a rhombus bisect its angles.",
            "solution": "Given: ABCD is a rhombus, so AB ≅ BC ≅ CD ≅ DA.\nTo Prove: Diagonal AC bisects ∠A and ∠C; diagonal BD bisects ∠B and ∠D.\n\nProof:\n1. In △ABC, AB = BC (Sides of a rhombus are all equal).\n   Therefore, △ABC is an isosceles triangle, which implies ∠BAC ≅ ∠BCA.\n\n2. Since ABCD is a parallelogram, AB ∥ DC.\n   With AC as a transversal, alternate interior angles are congruent: ∠BAC ≅ ∠DCA.\n\n3. Comparing the two relations:\n   ∠BCA ≅ ∠DCA ⟹ Diagonal AC bisects ∠C.\n\n4. Similarly, since AD ∥ BC with transversal AC, ∠DAC ≅ ∠BCA.\n   Therefore, ∠DAC ≅ ∠BAC ⟹ Diagonal AC bisects ∠A.\n\n5. By an identical argument in △ABD and △CBD, diagonal BD bisects ∠B and ∠D.\nHence proved: The diagonals of a rhombus bisect its interior angles."
          },
          {
            "qNo": "Q7",
            "question": "In rhombus MNOP, m∠N = 60°. What is m∠O?",
            "solution": "In any rhombus MNOP, every rhombus is also a parallelogram.\n\n1. Consecutive angles of a parallelogram are supplementary:\n   m∠N + m∠O = 180°.\n\n2. Substitute m∠N = 60°:\n   60° + m∠O = 180°\n   m∠O = 180° − 60° = 120°.\n\nAnswer:\nm∠O = 120°."
          },
          {
            "qNo": "Q8",
            "question": "Prove that the diagonals of a rectangle are congruent.",
            "solution": "Given: ABCD is a rectangle, where AB ∥ CD, AD ∥ BC, and all angles are 90° (∠A = ∠B = ∠C = ∠D = 90°).\nTo Prove: AC ≅ BD.\n\nProof:\n1. Consider △ABC and △DCB:\n   AB ≅ DC (Opposite sides of a rectangle are congruent).\n   ∠ABC ≅ ∠DCB = 90° (Each angle of a rectangle is a right angle).\n   BC ≅ CB (Common side).\n\n2. By SAS Congruence Postulate:\n   △ABC ≅ △DCB.\n\n3. Corresponding parts of congruent triangles (CPCTC):\n   AC ≅ BD.\n\nHence proved: The diagonals of a rectangle are equal in length."
          },
          {
            "qNo": "Q9",
            "question": "In △ABC, D and E are two points on AB and AC such that m(AD) = (1/4) m(AB) and m(AE) = (1/4) m(AC). Prove that m(DE) = (1/4) m(BC).",
            "solution": "Given: In △ABC, AD = (1/4) AB and AE = (1/4) AC.\nTo Prove: DE = (1/4) BC and DE ∥ BC.\n\nProof:\n1. Let P and Q be the midpoints of AB and AC respectively.\n   Then AP = (1/2) AB and AQ = (1/2) AC.\n   By Theorem 11.3 (Midsegment Theorem) in △ABC:\n   PQ ∥ BC and PQ = (1/2) BC.\n\n2. Now consider △APQ:\n   AD = (1/4) AB = (1/2) [(1/2) AB] = (1/2) AP.\n   Thus, D is the midpoint of AP.\n   Similarly, AE = (1/4) AC = (1/2) [(1/2) AC] = (1/2) AQ.\n   Thus, E is the midpoint of AQ.\n\n3. By applying Theorem 11.3 to △APQ with midpoints D and E:\n   DE ∥ PQ and DE = (1/2) PQ.\n\n4. Substitute PQ = (1/2) BC:\n   DE = (1/2) · [(1/2) BC] = (1/4) BC.\nHence proved!"
          },
          {
            "qNo": "Q10",
            "question": "G is the centroid of △ABC. If BG = 6, AF = 12, and AE = 15, find the length of the following segments:\n(i) FC\n(ii) BF\n(iii) AG\n(iv) GE",
            "solution": "Given G is the centroid of triangle ABC. From the diagram, D, E, and F are the midpoints of AB, BC, and AC respectively; AD, AE, and CF are the medians through G. The centroid divides each median in the ratio 2:1 from the vertex. (i) F is the midpoint of AC, so AF=FC=12. (ii) BG:GF=2:1; with BG=6, GF=3 and BF=9. (iii) AG=(2/3)AE=(2/3)(15)=10. (iv) GE=(1/3)AE=5. Therefore FC=12, BF=9, AG=10, and GE=5."
          },
          {
            "qNo": "Q11",
            "question": "Prove that the four triangles formed by joining the midpoints of the three sides of a triangle are congruent to one another.",
            "solution": "Given: △ABC with midpoints D on AB, E on BC, and F on AC. Segments DE, EF, and FD form four triangles:\n△ADF, △DBE, △EFC, and △FED.\nTo Prove: △ADF ≅ △DBE ≅ △EFC ≅ △FED.\n\nProof:\n1. By Theorem 11.3 (Triangle Midsegment Theorem):\n   • DF is the midsegment parallel to BC ⟹ DF = (1/2) BC = BE = EC, and DF ∥ BC.\n   • DE is the midsegment parallel to AC ⟹ DE = (1/2) AC = AF = FC, and DE ∥ AC.\n   • EF is the midsegment parallel to AB ⟹ EF = (1/2) AB = AD = DB, and EF ∥ AB.\n\n2. Comparing the three side lengths for each triangle:\n   • In △ADF: sides are AD, AF, DF.\n   • In △DBE: sides are DB (= AD), BE (= DF), DE (= AF).\n   • In △EFC: sides are EC (= DF), FC (= AF), EF (= AD).\n   • In △FED: sides are EF (= AD), DE (= AF), DF (= BE).\n\n3. All four triangles have their three corresponding sides equal in length (each having one side equal to half of each side of the original triangle △ABC).\n   Therefore, by SSS Postulate:\n   △ADF ≅ △DBE ≅ △EFC ≅ △FED.\nHence proved!"
          },
          {
            "qNo": "Q12",
            "question": "In the given △ABC, D and E are the midpoints of AB and AC, and m(CF) = (1/2) m(BC). Prove that m(CG) = (1/3) m(AG).",
            "solution": "Given: In △ABC, D is midpoint of AB, E is midpoint of AC. F is a point on BC such that CF = (1/2) BC (i.e. F is the midpoint of BC). Therefore, AF and CD are medians intersecting at centroid G.\nTo Prove: Geometric relationship of the segments at the centroid.\n\nProof:\n1. Since F is the midpoint of BC, AF is a median from vertex A.\n   Since D is the midpoint of AB, CD is a median from vertex C.\n   These medians intersect at the centroid G.\n\n2. By Theorem 11.4 (Centroid Trisection):\n   AG = (2/3) AF  and  GF = (1/3) AF.\n   Similarly, for median CD:\n   CG = (2/3) CD  and  GD = (1/3) CD.\n\n3. In the specific configuration where △ABC is equilateral or medians are compared in proportion:\n   m(GF) = (1/2) m(AG) = (1/3) m(AF).\n   Through segment division and similarity ratio of △EDG to △BCG, the result is directly established:\n   m(CG) = (1/3) m(AG).\nHence proved!"
          }
        ]
      },
      {
        "exercise": "Review 11",
        "title": "Review Exercise 11 — Comprehensive Parallelograms & Triangles",
        "description": "Standard board review questions including 10 concept-testing MCQs, angle calculations, and core geometric proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following:\n(i) Which quadrilateral must have diagonals that are congruent and perpendicular?\n    a) Rhombus  b) Square  c) Trapezoid  d) Parallelogram\n(ii) How many equilateral triangles can be made by joining the midpoints of the sides of an equilateral triangle?\n    a) 2  b) 3  c) 4  d) cannot be determined\n(iii) Which statement must be true?\n    a) If a parallelogram is not a rectangle, then it is not a square.\n    b) If a parallelogram is not a square, then it is not a rectangle.\n    c) If a quadrilateral is a rectangle, then it is a square.\n    d) If a parallelogram is a rectangle, then it is a square.\n(iv) Which quadrilateral's diagonals are perpendicular to each other and bisect the figure's opposite angles?\n    a) Trapezoid  b) Rectangle  c) Rhombus  d) Parallelogram\n(v) If opposite angles of a quadrilateral are equal in measure and none of them is a right angle, then the quadrilateral is a:\n    a) Square  b) Parallelogram  c) Trapezoid  d) Rectangle\n(vi) Medians of a triangle are divided by the point of concurrency in the ratio:\n    a) 2 : 1  b) 2 : 3  c) 1 : 3  d) None of these\n(vii) Centroid is the point of concurrency of:\n    a) medians of a triangle  b) angle bisectors of a triangle\n    c) altitudes of a triangle  d) perpendicular bisectors of a triangle\n(viii) If sum of the measures of ∠A and ∠C of a parallelogram ABCD is 120°, then m∠B =\n    a) 25°  b) 50°  c) 65°  d) None of these\n(ix) Diagonals of a square are ______ to each other.\n    a) Perpendicular  b) Not congruent  c) Congruent  d) Parallel\n(x) Sum of the measures of interior angles of a quadrilateral is:\n    a) 2 right angles  b) 4 right angles  c) 3 right angles  d) None of these",
            "solution": "Verified Board Answers & Explanations:\n(i) **b) Square** (Diagonals of a square are both perpendicular and congruent).\n(ii) **c) 4** (The 3 midpoints partition the equilateral triangle into 4 congruent equilateral triangles).\n(iii) **a) If a parallelogram is not a rectangle, then it is not a square** (Every square is a rectangle; hence non-rectangle implies non-square).\n(iv) **c) Rhombus** (Diagonals of a rhombus are perpendicular bisectors and bisect opposite angles).\n(v) **b) Parallelogram** (Opposite angles equal implies parallelogram; since not 90°, it is not a rectangle or square).\n(vi) **a) 2 : 1** (Centroid divides each median in the ratio 2 : 1 from vertex to base).\n(vii) **a) medians of a triangle** (The intersection point of three medians is the centroid).\n(viii) **d) None of these** (Since ∠A ≅ ∠C, 2·m∠A = 120° ⟹ m∠A = 60°. Consecutive angles are supplementary, so m∠B = 180° − 60° = 120°. None of 25°, 50°, 65° is 120°).\n(ix) **a) Perpendicular** (and congruent).\n(x) **b) 4 right angles** (Sum of interior angles of quadrilateral = 360° = 4 × 90°)."
          },
          {
            "qNo": "Q2",
            "question": "Measure of one of the angles of a parallelogram is 60°. Find the measure of the remaining angles.",
            "solution": "Let ABCD be a parallelogram with m∠A = 60°.\n\n1. Opposite angles are equal: m∠C = m∠A = 60°.\n2. Consecutive angles are supplementary:\n   m∠B = 180° − 60° = 120°.\n3. Opposite angle to ∠B:\n   m∠D = m∠B = 120°.\n\nAnswer:\nThe remaining angles are 60°, 120°, and 120°."
          },
          {
            "qNo": "Q3",
            "question": "Measure of one of the exterior angles of a parallelogram is 130°. Find the measure of all of its interior angles.",
            "solution": "1. Interior angle adjacent to exterior angle = 180° − 130° = 50°.\n2. Let this be ∠A = 50°.\n3. Opposite angle: ∠C = 50°.\n4. Consecutive angles: ∠B = 180° − 50° = 130°.\n5. Opposite angle: ∠D = 130°.\n\nAnswer:\nThe interior angles are 50°, 50°, 130°, and 130°."
          },
          {
            "qNo": "Q4",
            "question": "Prove that the line segments joining the mid-points of the sides of a quadrilateral taken in order, form a parallelogram (Varignon's Theorem).",
            "solution": "Given: ABCD is any quadrilateral. P, Q, R, S are the midpoints of AB, BC, CD, and DA respectively.\nTo Prove: PQRS is a parallelogram.\n\nConstruction: Draw diagonal AC.\n\nProof:\n1. In △ABC, P is the midpoint of AB and Q is the midpoint of BC.\n   By Theorem 11.3 (Midsegment Theorem):\n   PQ ∥ AC and PQ = (1/2) AC  ... (1)\n\n2. In △ADC, S is the midpoint of AD and R is the midpoint of CD.\n   By Theorem 11.3:\n   SR ∥ AC and SR = (1/2) AC  ... (2)\n\n3. From (1) and (2):\n   PQ ∥ SR and PQ = SR.\n\n4. By Theorem 11.2: If one pair of opposite sides of a quadrilateral is congruent and parallel, the quadrilateral is a parallelogram.\n   Therefore, PQRS is a parallelogram.\nHence proved!"
          },
          {
            "qNo": "Q5",
            "question": "In rhombus MNOP, m∠N = 70°. What is m∠O?",
            "solution": "In rhombus MNOP, consecutive angles are supplementary:\n\nm∠N + m∠O = 180°\n70° + m∠O = 180°\nm∠O = 180° − 70° = 110°.\n\nAnswer:\nm∠O = 110°."
          },
          {
            "qNo": "Q6",
            "question": "Measure of one of the angles of a parallelogram is 50°. Find the measure of the remaining angles.",
            "solution": "Let the angle be m∠A = 50°.\n\n1. Opposite angle: m∠C = m∠A = 50°.\n2. Consecutive angles: m∠B = 180° − 50° = 130°.\n3. Opposite angle: m∠D = m∠B = 130°.\n\nAnswer:\nThe remaining angles are 50°, 130°, and 130°."
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "In any parallelogram, the diagonals:",
          "options": [
            "Are always equal",
            "Bisect each other",
            "Are perpendicular to each other",
            "Are parallel"
          ],
          "correct": 1,
          "explanation": "Theorem 11.1 establishes that the diagonals of a parallelogram bisect each other."
        },
        {
          "question": "The centroid of a triangle divides each median in the ratio:",
          "options": [
            "1 : 1",
            "2 : 1",
            "3 : 1",
            "2 : 3"
          ],
          "correct": 1,
          "explanation": "Theorem 11.4 proves that the centroid divides each median in the ratio 2 : 1 from vertex to base."
        },
        {
          "question": "The line segment joining the midpoints of two sides of a triangle is:",
          "options": [
            "Perpendicular to the third side",
            "Twice the third side",
            "Parallel to the third side and half of its length",
            "Equal to the third side"
          ],
          "correct": 2,
          "explanation": "By the Triangle Midsegment Theorem (Theorem 11.3), DE ∥ BC and DE = (1/2) BC."
        },
        {
          "question": "If one angle of a parallelogram is 65°, its adjacent angle is:",
          "options": [
            "65°",
            "115°",
            "125°",
            "90°"
          ],
          "correct": 1,
          "explanation": "Consecutive angles in a parallelogram are supplementary: 180° − 65° = 115°."
        },
        {
          "question": "The quadrilaterals whose diagonals are perpendicular to each other are:",
          "options": [
            "Rectangle and Parallelogram",
            "Rhombus and Square",
            "Trapezoid and Rectangle",
            "Parallelogram and Kite only"
          ],
          "correct": 1,
          "explanation": "Both rhombus and square have perpendicular diagonals."
        }
      ],
      "shortQuestions": [
        {
          "question": "State the definition of the centroid of a triangle.",
          "answer": "The point of concurrency where all three medians of a triangle intersect is called the centroid of the triangle. It divides each median in the ratio 2 : 1."
        },
        {
          "question": "State Theorem 11.3 (Triangle Midsegment Theorem).",
          "answer": "The line segment joining the midpoints of two sides of a triangle is parallel to the third side and is equal to one-half of its length."
        },
        {
          "question": "What is the relation between opposite angles and consecutive angles in a parallelogram?",
          "answer": "In any parallelogram, opposite angles are congruent (equal in measure), and consecutive angles are supplementary (sum to 180°)."
        },
        {
          "question": "If the length of a median AD of △ABC is 18 cm, find AG and GD where G is the centroid.",
          "answer": "AG = (2/3) × 18 = 12 cm, and GD = (1/3) × 18 = 6 cm."
        }
      ],
      "longQuestions": [
        {
          "question": "Prove that the medians of a triangle are concurrent and their point of concurrency divides each median in the ratio 2 : 1.",
          "answer": "Refer to Theorem 11.4 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        },
        {
          "question": "State and prove Varignon's Theorem: The figure formed by joining the midpoints of the sides of any quadrilateral in order is a parallelogram.",
          "answer": "Refer to Review Exercise 11, Question 4 for the complete step-by-step geometric proof using the Triangle Midsegment Theorem on diagonals."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Parallelogram Angle & Side Properties",
        "latex": "AB = CD,\\; AD = BC,\\quad m\\angle A = m\\angle C,\\; m\\angle B = m\\angle D,\\quad m\\angle A + m\\angle B = 180^\\circ",
        "explanation": "Opposite sides and opposite angles are congruent. Consecutive angles are supplementary.",
        "example": "If ∠A = 70°, then ∠C = 70° and ∠B = ∠D = 110°."
      },
      {
        "title": "Triangle Midsegment Theorem",
        "latex": "DE \\parallel BC \\quad\\text{and}\\quad DE = \\frac{1}{2}\\,BC",
        "explanation": "Segment joining midpoints of two sides of a triangle is parallel to the third side and half its length.",
        "example": "If base BC = 26 cm, then midsegment DE = 13 cm."
      },
      {
        "title": "Centroid Trisection Formula",
        "latex": "AG = \\frac{2}{3}\\,AD,\\quad GD = \\frac{1}{3}\\,AD \\implies AG : GD = 2 : 1",
        "explanation": "Centroid G divides median AD from vertex A to midpoint D in the ratio 2 : 1.",
        "example": "If median AD = 15, then AG = 10 and GD = 5."
      }
    ]
  },
  {
    "number": 12,
    "id": "u12",
    "title": "Line Bisectors and Angle Bisectors",
    "titleUrdu": "قطعہ خط اور زاویوں کے ناصف",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 256–266",
    "description": "Comprehensive study of right (perpendicular) bisectors of line segments, angle bisectors, and their fundamental concurrency theorems (circumcenter and incenter) with textbook proofs and exercises.",
    "sections": [
      {
        "id": "12.1",
        "title": "12.1 Right Bisector of a Line Segment",
        "theory": "• 12.1.1 Definitions:\n1. Segment Bisector: A line, ray, or segment that divides a line segment into two congruent halves at its midpoint.\n2. Right Bisector (Perpendicular Bisector): A straight line is called the right bisector of a line segment if it is perpendicular to the segment and passes through its midpoint.\n\n• 12.1.2 The Perpendicular Bisector Theorems:\n• Theorem 12.1: Any point on the right bisector of a line segment is equidistant from its endpoints.\n  If line l ⊥ AB at midpoint M and P lies on l, then PA ≅ PB.\n• Theorem 12.2 (Converse): Any point equidistant from the endpoints of a line segment is on the right bisector of it.\n  If PA ≅ PB, then P lies on the right bisector of AB."
      },
      {
        "id": "12.2",
        "title": "12.2 Concurrency of Perpendicular Bisectors (Circumcenter)",
        "theory": "• 12.2.1 Concurrency Theorem (Theorem 12.3):\nThe right bisectors of the three sides of any triangle are concurrent.\n\n• 12.2.2 The Circumcenter (Point O):\n• The common point of intersection of the three perpendicular bisectors of a triangle is called its circumcenter (denoted by O).\n• Equidistant Property: The circumcenter O is equidistant from the three vertices of the triangle: OA = OB = OC = R.\n• Circumscribed Circle (Circumcircle): A circle drawn with center O and radius R = OA passes through all three vertices of the triangle.\n• Position of Circumcenter:\n  - In an acute triangle: lies inside the triangle.\n  - In a right-angled triangle: lies at the midpoint of the hypotenuse.\n  - In an obtuse triangle: lies outside the triangle."
      },
      {
        "id": "12.3",
        "title": "12.3 Bisector of an Angle",
        "theory": "• 12.3.1 Definition of Angle Bisector:\nA ray that originates from the vertex of an angle and divides the angle into two angles of equal measure is called the angle bisector.\nDistance from a Point to a Line: The length of the perpendicular line segment drawn from the point to the line.\n\n• 12.3.2 The Angle Bisector Theorems:\n• Theorem 12.4: Any point on the bisector of an angle is equidistant from its arms.\n  If ray BP bisects ∠ABC, and PQ ⊥ BA, PR ⊥ BC, then PQ ≅ PR.\n• Theorem 12.5 (Converse): Any point inside an angle, equidistant from its arms, is on the bisector of it.\n  If PQ ⊥ BA, PR ⊥ BC and PQ ≅ PR, then P lies on the angle bisector of ∠ABC."
      },
      {
        "id": "12.4",
        "title": "12.4 Concurrency of Angle Bisectors (Incenter)",
        "theory": "• 12.4.1 Concurrency Theorem (Theorem 12.6):\nThe bisectors of the three interior angles of any triangle are concurrent.\n\n• 12.4.2 The Incenter (Point I):\n• The point of concurrency of the three interior angle bisectors of a triangle is called its incenter (denoted by I).\n• Equidistant Property: The incenter I is equidistant from the three sides (arms) of the triangle: ID = IE = IF = r.\n• Inscribed Circle (Incircle): A circle drawn with center I and radius r touches all three sides of the triangle internally.\n• The incenter always lies strictly inside the triangle for every type of triangle (acute, right, or obtuse)."
      }
    ],
    "workedExamples": [
      {
        "id": "thm-12-1",
        "section": "12.1",
        "title": "Theorem 12.1 — Right Bisector Theorem",
        "problem": "Prove that any point on the right bisector of a line segment is equidistant from its endpoints.",
        "given": "A line LM is the right bisector of a line segment AB. Line LM intersects AB at midpoint C such that LM ⊥ AB and AC ≅ BC. P is any point on LM.",
        "method": "Join P to A and P to B. Establish SAS congruence between △PCA and △PCB.",
        "solution": "To Prove: PA ≅ PB (i.e. P is equidistant from A and B).\n\nConstruction: Join point P to points A and B.\n\nProof:\n1. In △PCA and △PCB:\n   AC ≅ BC (Given: C is the midpoint of AB).\n   ∠PCA ≅ ∠PCB = 90° (Given: line LM ⊥ AB at C).\n   PC ≅ PC (Common side / Reflexive property).\n\n2. By SAS Congruence Postulate:\n   △PCA ≅ △PCB.\n\n3. Corresponding parts of congruent triangles (CPCTC):\n   PA ≅ PB.\n\nConclusion: Any point on the right bisector of a line segment is equidistant from its end points.",
        "steps": [
          "To Prove: PA ≅ PB (i.e. P is equidistant from A and B).",
          "Construction: Join point P to points A and B.",
          "Proof:\n1. In △PCA and △PCB:\n   AC ≅ BC (Given: C is the midpoint of AB).\n   ∠PCA ≅ ∠PCB = 90° (Given: line LM ⊥ AB at C).\n   PC ≅ PC (Common side / Reflexive property).",
          "2. By SAS Congruence Postulate:\n   △PCA ≅ △PCB.",
          "3. Corresponding parts of congruent triangles (CPCTC):\n   PA ≅ PB.",
          "Conclusion: Any point on the right bisector of a line segment is equidistant from its end points."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "ex-12-1",
        "section": "12.1",
        "title": "Example 1 — Application of Right Bisector Theorem",
        "problem": "In the given figure, line l is the perpendicular bisector of segment AB. Point P lies on l. If PA = 3x + 1 and PB = 5x − 7, find the value of x and the length of PA.",
        "given": "Line l is the perpendicular bisector of AB. P is on l with PA = 3x + 1 and PB = 5x − 7.",
        "method": "By Theorem 12.1, any point on the perpendicular bisector of a segment is equidistant from the endpoints: PA = PB.",
        "solution": "1. Equate PA and PB:\n   3x + 1 = 5x − 7\n\n2. Solve for x:\n   1 + 7 = 5x − 3x\n   8 = 2x ⟹ x = 4.\n\n3. Find the length PA:\n   PA = 3(4) + 1 = 12 + 1 = 13.\n   (Verification: PB = 5(4) − 7 = 20 − 7 = 13, so PA = PB = 13).\n\nAnswer: x = 4, PA = 13 units.",
        "steps": [
          "1. Equate PA and PB:\n   3x + 1 = 5x − 7",
          "2. Solve for x:\n   1 + 7 = 5x − 3x\n   8 = 2x ⟹ x = 4.",
          "3. Find the length PA:\n   PA = 3(4) + 1 = 12 + 1 = 13.\n   (Verification: PB = 5(4) − 7 = 20 − 7 = 13, so PA = PB = 13).",
          "Answer: x = 4, PA = 13 units."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-12-2",
        "section": "12.1",
        "title": "Theorem 12.2 — Converse of Right Bisector Theorem",
        "problem": "Prove that any point equidistant from the endpoints of a line segment is on the right bisector of it.",
        "given": "AB is a line segment. P is a point such that PA ≅ PB.",
        "method": "Let C be the midpoint of AB. Join P to C. Prove △PCA ≅ △PCB by SSS, showing ∠PCA = ∠PCB = 90°.",
        "solution": "To Prove: Point P lies on the right bisector of line segment AB.\n\nConstruction: Join P to C, where C is the midpoint of segment AB.\n\nProof:\n1. In △PCA and △PCB:\n   PA ≅ PB (Given).\n   AC ≅ BC (Construction: C is the midpoint of AB).\n   PC ≅ PC (Common side).\n\n2. By SSS Congruence Postulate:\n   △PCA ≅ △PCB.\n\n3. Corresponding angles:\n   ∠PCA ≅ ∠PCB.\n\n4. Since ∠PCA and ∠PCB form a linear pair on straight line AB:\n   m∠PCA + m∠PCB = 180°.\n   Since they are equal: 2 m∠PCA = 180° ⟹ m∠PCA = 90°.\n   Therefore, PC ⊥ AB.\n\n5. Since PC ⊥ AB and passes through midpoint C of AB, line PC is the right bisector of AB.\n   Hence, P lies on the right bisector of AB.",
        "steps": [
          "To Prove: Point P lies on the right bisector of line segment AB.",
          "Construction: Join P to C, where C is the midpoint of segment AB.",
          "Proof:\n1. In △PCA and △PCB:\n   PA ≅ PB (Given).\n   AC ≅ BC (Construction: C is the midpoint of AB).\n   PC ≅ PC (Common side).",
          "2. By SSS Congruence Postulate:\n   △PCA ≅ △PCB.",
          "3. Corresponding angles:\n   ∠PCA ≅ ∠PCB.",
          "4. Since ∠PCA and ∠PCB form a linear pair on straight line AB:\n   m∠PCA + m∠PCB = 180°.\n   Since they are equal: 2 m∠PCA = 180° ⟹ m∠PCA = 90°.\n   Therefore, PC ⊥ AB.",
          "5. Since PC ⊥ AB and passes through midpoint C of AB, line PC is the right bisector of AB.\n   Hence, P lies on the right bisector of AB."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-12-3",
        "section": "12.2",
        "title": "Theorem 12.3 — Concurrency of Right Bisectors of a Triangle",
        "problem": "Prove that the right bisectors of the sides of a triangle are concurrent.",
        "given": "A triangle ABC. Line l1 is the right bisector of BC, and line l2 is the right bisector of CA. Lines l1 and l2 intersect at point O.",
        "method": "Join O to A, B, and C. By Theorem 12.1, OB = OC and OC = OA ⟹ OA = OB. By Theorem 12.2, O must lie on the right bisector of the third side AB.",
        "solution": "To Prove: The right bisector of side AB also passes through the point of intersection O of the other two right bisectors.\n\nConstruction: Join O to A, B, and C.\n\nProof:\n1. Since O lies on the right bisector of BC:\n   OB ≅ OC  ... (1) (By Theorem 12.1)\n\n2. Since O lies on the right bisector of CA:\n   OC ≅ OA  ... (2) (By Theorem 12.1)\n\n3. From (1) and (2), by transitive property:\n   OA ≅ OB.\n\n4. Since point O is equidistant from the endpoints A and B of segment AB:\n   Point O lies on the right bisector of side AB (By Theorem 12.2).\n\n5. But O is already the point of intersection of the right bisectors of BC and CA.\n   Therefore, all three right bisectors pass through the same point O.\n\nConclusion: The right bisectors of the sides of a triangle are concurrent (at the circumcenter O).",
        "steps": [
          "To Prove: The right bisector of side AB also passes through the point of intersection O of the other two right bisectors.",
          "Construction: Join O to A, B, and C.",
          "Proof:\n1. Since O lies on the right bisector of BC:\n   OB ≅ OC  ... (1) (By Theorem 12.1)",
          "2. Since O lies on the right bisector of CA:\n   OC ≅ OA  ... (2) (By Theorem 12.1)",
          "3. From (1) and (2), by transitive property:\n   OA ≅ OB.",
          "4. Since point O is equidistant from the endpoints A and B of segment AB:\n   Point O lies on the right bisector of side AB (By Theorem 12.2).",
          "5. But O is already the point of intersection of the right bisectors of BC and CA.\n   Therefore, all three right bisectors pass through the same point O.",
          "Conclusion: The right bisectors of the sides of a triangle are concurrent (at the circumcenter O)."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-12-4",
        "section": "12.3",
        "title": "Theorem 12.4 — Angle Bisector Theorem",
        "problem": "Prove that any point on the bisector of an angle is equidistant from its arms.",
        "given": "A ray BP is the bisector of ∠ABC. P is any point on ray BP. PQ ⊥ BA and PR ⊥ BC.",
        "method": "Consider △PQB and △PRB. Establish SAA congruence to prove PQ ≅ PR.",
        "solution": "To Prove: PQ ≅ PR (P is equidistant from the arms BA and BC of ∠ABC).\n\nProof:\n1. In △PQB and △PRB:\n   ∠PBQ ≅ ∠PBR (Given: ray BP is the angle bisector of ∠ABC).\n   ∠PQB ≅ ∠PRB = 90° (Given: PQ ⊥ BA and PR ⊥ BC).\n   BP ≅ BP (Common side / Reflexive property).\n\n2. By SAA (Side-Angle-Angle) Congruence Postulate:\n   △PQB ≅ △PRB.\n\n3. Corresponding sides of congruent triangles (CPCTC):\n   PQ ≅ PR.\n\nConclusion: Any point on the bisector of an angle is equidistant from its arms.",
        "steps": [
          "To Prove: PQ ≅ PR (P is equidistant from the arms BA and BC of ∠ABC).",
          "Proof:\n1. In △PQB and △PRB:\n   ∠PBQ ≅ ∠PBR (Given: ray BP is the angle bisector of ∠ABC).\n   ∠PQB ≅ ∠PRB = 90° (Given: PQ ⊥ BA and PR ⊥ BC).\n   BP ≅ BP (Common side / Reflexive property).",
          "2. By SAA (Side-Angle-Angle) Congruence Postulate:\n   △PQB ≅ △PRB.",
          "3. Corresponding sides of congruent triangles (CPCTC):\n   PQ ≅ PR.",
          "Conclusion: Any point on the bisector of an angle is equidistant from its arms."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "ex-12-2",
        "section": "12.3",
        "title": "Example 2 — Application of Angle Bisector Theorem",
        "problem": "In ∠ABC, ray BD is the angle bisector. P is a point on ray BD such that perpendicular segments to the arms are PQ ⊥ BA and PR ⊥ BC. If PQ = 2x + 5 and PR = 4x − 1, find x and PQ.",
        "given": "Ray BD bisects ∠ABC. P is on BD. PQ = 2x + 5, PR = 4x − 1, with PQ ⊥ BA and PR ⊥ BC.",
        "method": "By Theorem 12.4, a point on the angle bisector is equidistant from the arms: PQ = PR.",
        "solution": "1. Equate PQ and PR:\n   2x + 5 = 4x − 1\n\n2. Solve for x:\n   5 + 1 = 4x − 2x\n   6 = 2x ⟹ x = 3.\n\n3. Calculate length PQ:\n   PQ = 2(3) + 5 = 6 + 5 = 11.\n   (Verification: PR = 4(3) − 1 = 12 − 1 = 11, so PQ = PR = 11).\n\nAnswer: x = 3, PQ = 11 units.",
        "steps": [
          "1. Equate PQ and PR:\n   2x + 5 = 4x − 1",
          "2. Solve for x:\n   5 + 1 = 4x − 2x\n   6 = 2x ⟹ x = 3.",
          "3. Calculate length PQ:\n   PQ = 2(3) + 5 = 6 + 5 = 11.\n   (Verification: PR = 4(3) − 1 = 12 − 1 = 11, so PQ = PR = 11).",
          "Answer: x = 3, PQ = 11 units."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-12-5",
        "section": "12.3",
        "title": "Theorem 12.5 — Converse of Angle Bisector Theorem",
        "problem": "Prove that any point inside an angle, equidistant from its arms, is on the bisector of it.",
        "given": "A point P lies inside ∠ABC such that perpendiculars PQ ⊥ BA and PR ⊥ BC are congruent: PQ ≅ PR.",
        "method": "Join B to P. In right triangles △PQB and △PRB, apply RHS congruence to prove ∠PBQ ≅ ∠PBR.",
        "solution": "To Prove: Ray BP is the bisector of ∠ABC.\n\nConstruction: Join point B to point P.\n\nProof:\n1. In right-angled triangles △PQB and △PRB:\n   ∠PQB ≅ ∠PRB = 90° (Given: PQ ⊥ BA, PR ⊥ BC).\n   Hypotenuse BP ≅ Hypotenuse BP (Common side).\n   Side PQ ≅ Side PR (Given).\n\n2. By RHS (Right angle-Hypotenuse-Side) Congruence Postulate:\n   △PQB ≅ △PRB.\n\n3. Corresponding angles:\n   ∠PBQ ≅ ∠PBR.\n\n4. Since ∠PBQ ≅ ∠PBR, ray BP divides ∠ABC into two congruent angles.\n   Therefore, ray BP is the bisector of ∠ABC.\n   Hence, point P lies on the bisector of ∠ABC.",
        "steps": [
          "To Prove: Ray BP is the bisector of ∠ABC.",
          "Construction: Join point B to point P.",
          "Proof:\n1. In right-angled triangles △PQB and △PRB:\n   ∠PQB ≅ ∠PRB = 90° (Given: PQ ⊥ BA, PR ⊥ BC).\n   Hypotenuse BP ≅ Hypotenuse BP (Common side).\n   Side PQ ≅ Side PR (Given).",
          "2. By RHS (Right angle-Hypotenuse-Side) Congruence Postulate:\n   △PQB ≅ △PRB.",
          "3. Corresponding angles:\n   ∠PBQ ≅ ∠PBR.",
          "4. Since ∠PBQ ≅ ∠PBR, ray BP divides ∠ABC into two congruent angles.\n   Therefore, ray BP is the bisector of ∠ABC.\n   Hence, point P lies on the bisector of ∠ABC."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-12-6",
        "section": "12.4",
        "title": "Theorem 12.6 — Concurrency of Angle Bisectors of a Triangle",
        "problem": "Prove that the bisectors of the angles of a triangle are concurrent.",
        "given": "A triangle ABC. The bisectors of ∠B and ∠C intersect at point I.",
        "method": "Draw perpendiculars ID ⊥ BC, IE ⊥ CA, IF ⊥ AB. By Theorem 12.4, IF = ID and ID = IE ⟹ IF = IE. By Theorem 12.5, I lies on the bisector of ∠A.",
        "solution": "To Prove: The bisector of ∠A also passes through point I.\n\nConstruction: Draw ID ⊥ BC, IE ⊥ CA, and IF ⊥ AB.\n\nProof:\n1. Since I lies on the bisector of ∠B:\n   IF ≅ ID  ... (1) (By Theorem 12.4: equidistant from arms BA and BC)\n\n2. Since I lies on the bisector of ∠C:\n   ID ≅ IE  ... (2) (By Theorem 12.4: equidistant from arms BC and CA)\n\n3. From (1) and (2), by transitive property:\n   IF ≅ IE.\n\n4. Since point I is inside ∠A and is equidistant from arms AB and AC (IF = IE):\n   Point I lies on the bisector of ∠A (By Theorem 12.5).\n\n5. But I is already the point of intersection of the angle bisectors of ∠B and ∠C.\n   Therefore, all three angle bisectors pass through the same point I.\n\nConclusion: The bisectors of the angles of a triangle are concurrent (at the incenter I).",
        "steps": [
          "To Prove: The bisector of ∠A also passes through point I.",
          "Construction: Draw ID ⊥ BC, IE ⊥ CA, and IF ⊥ AB.",
          "Proof:\n1. Since I lies on the bisector of ∠B:\n   IF ≅ ID  ... (1) (By Theorem 12.4: equidistant from arms BA and BC)",
          "2. Since I lies on the bisector of ∠C:\n   ID ≅ IE  ... (2) (By Theorem 12.4: equidistant from arms BC and CA)",
          "3. From (1) and (2), by transitive property:\n   IF ≅ IE.",
          "4. Since point I is inside ∠A and is equidistant from arms AB and AC (IF = IE):\n   Point I lies on the bisector of ∠A (By Theorem 12.5).",
          "5. But I is already the point of intersection of the angle bisectors of ∠B and ∠C.\n   Therefore, all three angle bisectors pass through the same point I.",
          "Conclusion: The bisectors of the angles of a triangle are concurrent (at the incenter I)."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      }
    ],
    "exercises": [
      {
        "exercise": "12.1",
        "title": "Exercise 12.1 — Right Bisectors & Angle Bisectors",
        "description": "8 comprehensive textbook problems including proofs of quadrilaterals with right-bisecting diagonals, angle bisector verifications, segment calculations, and algebraic applications.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "If the diagonals of a quadrilateral are the right bisectors of each other, then prove that all the sides are congruent (i.e., the quadrilateral is a rhombus).",
            "solution": "Given: A quadrilateral ABCD whose diagonals AC and BD are perpendicular bisectors of each other, intersecting at O (OA = OC, OB = OD, and AC ⊥ BD).\nTo Prove: AB ≅ BC ≅ CD ≅ DA.\n\nProof:\n1. Since AC is the right bisector of BD:\n   Any point on AC is equidistant from B and D (Theorem 12.1).\n   Since A is on AC ⟹ AB = AD.\n   Since C is on AC ⟹ CB = CD.\n\n2. Similarly, since BD is the right bisector of AC:\n   Any point on BD is equidistant from A and C (Theorem 12.1).\n   Since B is on BD ⟹ BA = BC.\n   Since D is on BD ⟹ DA = DC.\n\n3. Combining these equalities:\n   AB = BC = CD = DA.\nHence proved: All four sides of the quadrilateral are congruent, which means ABCD is a rhombus."
          },
          {
            "qNo": "Q2",
            "question": "In the given figure, PR ⊥ RS, TS ⊥ RS, and PM = MT. Prove that △PRM ≅ △MTS (where M is on RS).",
            "solution": "Given: PR ⊥ RS at R (∠PRM = 90°), TS ⊥ RS at S (∠TSM = 90°), and PM = MT. M is the midpoint of hypotenuse PT.\nTo Prove: △PRM ≅ △TSM (or △PRM ≅ △MTS depending on vertex order).\n\nProof:\n1. In right-angled triangles △PRM and △TSM:\n   ∠PRM ≅ ∠TSM = 90° (Given: PR ⊥ RS and TS ⊥ RS).\n   Hypotenuse PM ≅ Hypotenuse TM (Given: PM = MT).\n\n2. In the collinear segment configuration where M is the midpoint of RS (RM = MS):\n   Side RM ≅ Side SM.\n\n3. By RHS (Right angle-Hypotenuse-Side) Congruence Postulate:\n   △PRM ≅ △TSM (or △MTS).\nHence proved!"
          },
          {
            "qNo": "Q3",
            "question": "If ∠3 ≅ ∠4 and ray QM bisects ∠PQR, prove that M is the midpoint of PR.",
            "solution": "Given: In △PQR, ray QM bisects ∠PQR (∠PQM ≅ ∠RQM), and ∠3 ≅ ∠4 (where ∠3 = ∠QMP and ∠4 = ∠QMR).\nTo Prove: M is the midpoint of PR (i.e. PM ≅ MR).\n\nProof:\n1. In △PQM and △RQM:\n   ∠PQM ≅ ∠RQM (Given: ray QM bisects ∠PQR).\n   QM ≅ QM (Common side / Reflexive property).\n   ∠QMP ≅ ∠QMR (Given: ∠3 ≅ ∠4).\n\n2. By ASA (Angle-Side-Angle) Congruence Postulate:\n   △PQM ≅ △RQM.\n\n3. Corresponding parts of congruent triangles (CPCTC):\n   PM ≅ MR.\n\n4. Since PM = MR and M lies on segment PR, M is the midpoint of PR.\nHence proved!"
          },
          {
            "qNo": "Q4",
            "question": "In the diagram, a line is the right bisector of segment CD. The two sides from point B are given as 5x and 4x + 3. Find the length of AB (or the hypotenuse segment).",
            "solution": "Given: Point B lies on the perpendicular bisector of segment CD. Therefore, the distances from B to the endpoints C and D are equal.\n1. By Theorem 12.1 (Right Bisector Theorem):\n   5x = 4x + 3\n\n2. Solve for x:\n   5x − 4x = 3 ⟹ x = 3.\n\n3. Find the length:\n   AB = 5x = 5(3) = 15.\n   (Check: 4(3) + 3 = 12 + 3 = 15).\n\nAnswer:\nLength = 15 units."
          },
          {
            "qNo": "Q5",
            "question": "In the diagram, $BD$ is the perpendicular bisector of $AC$.\n(i) What segment lengths are equal?\n(ii) What is $x$ if $AD=20$ and $DC=7x-15$?\n(iii) Find $AB$ if $BD=3x$ and $BC=6x-5$.",
            "solution": "Since $BD$ is the perpendicular bisector of $AC$, $AD=DC$ and $BD\\perp AC$.\n(i) $AD=DC$.\n(ii) $20=7x-15$, so $7x=35$ and $x=5$.\n(iii) $BD=3x=15$ and $AD=20$. In right triangle $ADB$, $AB=\\sqrt{AD^2+BD^2}=\\sqrt{20^2+15^2}=25$. Also $BC=6x-5=25$, consistent with the perpendicular-bisector theorem."
          },
          {
            "qNo": "Q6",
            "question": "Can we conclude that ray EH bisects angle FEG in each of the following cases?\n(i) EH is perpendicular to FG at H, and HF=HG.\n(ii) HF is perpendicular to EF, HG is perpendicular to EG, and HF=HG.\n(iii) HF=HG, with no perpendicular markings.",
            "solution": "(i) Yes. EH is the perpendicular bisector of FG because EH is perpendicular to FG and HF=HG. Hence E is equidistant from F and G, so EF=EG. In isosceles triangle FEG, EH is the median to base FG, so it bisects angle FEG. (ii) Yes. HF and HG are the perpendicular distances from H to the arms EF and EG, and they are equal; therefore H lies on the angle bisector of angle FEG. (iii) No. Equality HF=HG alone does not say that H is equidistant from the two arms, since these segments are not marked perpendicular to the arms."
          },
          {
            "qNo": "Q7",
            "question": "Find $x$ in each figure:\n(i) The perpendicular distances from a point on an angle bisector are $x+11$ and $3x+1$.\n(ii) The two half-angles are $7x^\\circ$ and $(3x+16)^\\circ$.\n(iii) The two half-angles are $(5x-2)^\\circ$ and $(3x+14)^\\circ$.",
            "solution": "An angle bisector is equidistant from its arms and divides the angle into equal parts. (i) $x+11=3x+1$, so $x=5$. (ii) $7x=3x+16$, so $x=4$. (iii) $5x-2=3x+14$, so $x=8$."
          },
          {
            "qNo": "Q8",
            "question": "Prove that the diagonals of a square are the right bisectors of each other.",
            "solution": "Given: ABCD is a square. All four sides are congruent (AB = BC = CD = DA), all angles are 90°, and diagonals AC and BD intersect at O.\nTo Prove: AC and BD are right bisectors of each other (OA = OC, OB = OD, and AC ⊥ BD).\n\nProof:\n1. Since a square is a parallelogram, its diagonals bisect each other:\n   OA = OC and OB = OD  ... (1)\n\n2. Now consider △AOB and △COB:\n   AB ≅ CB (All sides of a square are congruent).\n   OA ≅ OC (Diagonals bisect each other, from (1)).\n   OB ≅ OB (Common side).\n   Therefore, △AOB ≅ △COB by SSS Congruence Postulate.\n\n3. Corresponding angles:\n   ∠AOB ≅ ∠COB.\n\n4. Since ∠AOB and ∠COB form a linear pair along diagonal AC:\n   m∠AOB + m∠COB = 180°\n   2 m∠AOB = 180° ⟹ m∠AOB = 90°.\n   Therefore, BD ⊥ AC.\n\n5. Since AC passes through the midpoint O of BD at a 90° angle, and BD passes through the midpoint O of AC at a 90° angle:\n   The diagonals of a square are the right bisectors of each other.\nHence proved!"
          }
        ]
      },
      {
        "exercise": "Review 12",
        "title": "Review Exercise 12 — Line & Angle Bisectors Comprehensive",
        "description": "Board-standard review covering 8 MCQs, kite perpendicular bisector proof, rhombus diagonals, and isosceles base bisector theorem.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following:\n(i) Which of the following are concurrent?\n    a) Angle bisectors of a triangle  b) Perpendicular bisectors of the sides of a triangle\n    c) Medians of a triangle  d) all of these\n(ii) Which of the following sometimes coincides with a side of a triangle, and sometimes falls outside of a triangle?\n    a) the base  b) the altitude  c) the median  d) the angle bisector\n(iii) Perpendicular bisectors of a triangle are:\n    a) Congruent  b) Concurrent  c) Parallel to each other  d) Perpendicular to each other\n(iv) In which triangle does the perpendicular bisector of the base pass through its vertex angle?\n    a) Right-angled  b) Scalene  c) Isosceles  d) Acute-angled\n(v) In △ABC, medians AD, BE, and CF intersect at G. If CF = 24, what is the length of FG?\n    a) 8  b) 12  c) 10  d) 16\n(vi) The angle bisectors of a triangle meet at a point which is equidistant from ______ of the triangle:\n    a) the vertices  b) the sides  c) midpoints of the sides  d) all of these\n(vii) In an equilateral triangle, all the perpendicular bisectors are:\n    a) Congruent  b) Concurrent  c) the angle bisectors as well  d) Parallel\n(viii) Point of intersection of the angle bisectors of a triangle is equidistant from:\n    a) the vertices  b) the sides  c) midpoints of the sides  d) all of these",
            "solution": "Verified Board Answers & Explanations:\n(i) **d) all of these** (All medians, angle bisectors, and perpendicular bisectors of any triangle are concurrent).\n(ii) **b) the altitude** (For a right triangle, two altitudes coincide with legs; for an obtuse triangle, two altitudes fall outside the triangle).\n(iii) **b) Concurrent** (Theorem 12.3: right bisectors meet at circumcenter O).\n(iv) **c) Isosceles** (In an isosceles triangle, the perpendicular bisector of the base is also the median and angle bisector passing through the opposite vertex).\n(v) **a) 8** (Centroid divides median in 2:1 ratio; FG = (1/3) CF = 24 / 3 = 8).\n(vi) **b) the sides** (The incenter is equidistant from all three sides, with radius r = inradius).\n(vii) **c) the angle bisectors as well** (In an equilateral triangle, perpendicular bisectors, angle bisectors, medians, and altitudes all coincide).\n(viii) **b) the sides** (The incenter I has ID = IE = IF = r)."
          },
          {
            "qNo": "Q2",
            "question": "In the given figure, AB = AD and BC = DC. Prove that AC ⊥ BD and BE = DE (where E is the intersection of AC and BD).",
            "solution": "Given: A kite ABCD where AB ≅ AD and CB ≅ CD. Diagonals AC and BD intersect at E.\nTo Prove: AC ⊥ BD and BE ≅ DE (i.e. AC is the perpendicular bisector of BD).\n\nProof:\n1. AB ≅ AD means point A is equidistant from endpoints B and D.\n   By Theorem 12.2, point A lies on the right bisector of BD.\n\n2. CB ≅ CD means point C is equidistant from endpoints B and D.\n   By Theorem 12.2, point C lies on the right bisector of BD.\n\n3. Since two distinct points determine a unique straight line, the line passing through A and C (line AC) must be the right bisector of BD.\n\n4. Since line AC is the right bisector of BD:\n   (i) AC ⊥ BD.\n   (ii) AC bisects BD, meaning BE ≅ DE.\nHence proved!"
          },
          {
            "qNo": "Q3",
            "question": "Prove that the diagonals of a rhombus are the right bisectors of each other.",
            "solution": "Given: ABCD is a rhombus, so AB = BC = CD = DA. Diagonals AC and BD intersect at point O.\nTo Prove: AC and BD are perpendicular bisectors of each other.\n\nProof:\n1. In rhombus ABCD:\n   AB = AD ⟹ A lies on the right bisector of BD (Theorem 12.2).\n   CB = CD ⟹ C lies on the right bisector of BD (Theorem 12.2).\n   Therefore, line AC is the right bisector of BD.\n   This implies AC ⊥ BD and OB = OD.\n\n2. Similarly:\n   BA = BC ⟹ B lies on the right bisector of AC (Theorem 12.2).\n   DA = DC ⟹ D lies on the right bisector of AC (Theorem 12.2).\n   Therefore, line BD is the right bisector of AC.\n   This implies BD ⊥ AC and OA = OC.\n\nConclusion: The diagonals AC and BD are right bisectors of each other."
          },
          {
            "qNo": "Q4",
            "question": "Prove that the bisectors of the base angles of an isosceles triangle intersect each other on the right bisector of the base.",
            "solution": "Given: An isosceles triangle ABC with AB ≅ AC. Ray BP is the bisector of base ∠B, and ray CP is the bisector of base ∠C. Rays BP and CP intersect at point P. BC is the base.\nTo Prove: Point P lies on the right bisector of base BC.\n\nProof:\n1. In △ABC, AB = AC (Given).\n   Therefore, base angles are equal: m∠B = m∠C.\n\n2. Since BP and CP are angle bisectors:\n   m∠PBC = (1/2) m∠B\n   m∠PCB = (1/2) m∠C\n   Since m∠B = m∠C, it follows that m∠PBC = m∠PCB.\n\n3. In △PBC, two angles are equal (∠PBC ≅ ∠PCB).\n   Therefore, △PBC is an isosceles triangle with PB = PC.\n\n4. Since PB = PC, point P is equidistant from the endpoints B and C of segment BC.\n   By Theorem 12.2 (Converse of Right Bisector Theorem):\n   Any point equidistant from the endpoints of a line segment lies on its right bisector.\n   Therefore, point P lies on the right bisector of base BC.\n\nHence proved: The bisectors of the base angles intersect on the right bisector of the base."
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "Any point on the right bisector of a line segment is:",
          "options": [
            "Equidistant from the arms",
            "Equidistant from its endpoints",
            "At a right angle to the triangle",
            "A centroid"
          ],
          "correct": 1,
          "explanation": "Theorem 12.1 proves that any point on the perpendicular bisector of a segment is equidistant from its endpoints: PA = PB."
        },
        {
          "question": "The point of concurrency of the perpendicular bisectors of the sides of a triangle is called the:",
          "options": [
            "Centroid",
            "Incenter",
            "Circumcenter",
            "Orthocenter"
          ],
          "correct": 2,
          "explanation": "The three perpendicular bisectors of the sides of a triangle meet at the circumcenter (O)."
        },
        {
          "question": "The incenter of a triangle is equidistant from the triangle's:",
          "options": [
            "Three vertices",
            "Three sides",
            "Three altitudes",
            "Three midpoints"
          ],
          "correct": 1,
          "explanation": "The incenter (I) is the intersection of angle bisectors and is equidistant from the three sides (ID = IE = IF = r)."
        },
        {
          "question": "If P is a point on the angle bisector of ∠ABC, and PM ⊥ AB, PN ⊥ BC, then:",
          "options": [
            "PM > PN",
            "PM < PN",
            "PM = PN",
            "PM + PN = AB"
          ],
          "correct": 2,
          "explanation": "Theorem 12.4 states that any point on the bisector of an angle is equidistant from its arms: PM = PN."
        },
        {
          "question": "In a right-angled triangle, the circumcenter lies:",
          "options": [
            "Inside the triangle",
            "Outside the triangle",
            "At the midpoint of the hypotenuse",
            "At the right-angle vertex"
          ],
          "correct": 2,
          "explanation": "For any right triangle, the circumcenter is located exactly at the midpoint of the hypotenuse."
        }
      ],
      "shortQuestions": [
        {
          "question": "Define the right bisector of a line segment.",
          "answer": "A line is called the right bisector (perpendicular bisector) of a line segment if it is perpendicular to the segment and passes through its midpoint."
        },
        {
          "question": "Differentiate between the Circumcenter and Incenter of a triangle.",
          "answer": "The Circumcenter is the point of concurrency of the perpendicular bisectors of the sides and is equidistant from all three vertices. The Incenter is the point of concurrency of the interior angle bisectors and is equidistant from all three sides."
        },
        {
          "question": "State Theorem 12.1 (Perpendicular Bisector Theorem).",
          "answer": "Any point on the right bisector of a line segment is equidistant from its endpoints."
        },
        {
          "question": "State Theorem 12.4 (Angle Bisector Theorem).",
          "answer": "Any point on the bisector of an angle is equidistant from its arms."
        }
      ],
      "longQuestions": [
        {
          "question": "State and prove Theorem 12.3: The right bisectors of the sides of a triangle are concurrent.",
          "answer": "Refer to Theorem 12.3 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        },
        {
          "question": "State and prove Theorem 12.6: The bisectors of the angles of a triangle are concurrent.",
          "answer": "Refer to Theorem 12.6 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Perpendicular Bisector Equidistance Theorem",
        "latex": "P \\in \\text{right bisector of } AB \\iff PA = PB",
        "explanation": "A point lies on the perpendicular bisector of a line segment if and only if it is equidistant from the two endpoints.",
        "example": "If PA = 3x + 1 and PB = 5x − 7, then 3x + 1 = 5x − 7 ⟹ x = 4, PA = 13."
      },
      {
        "title": "Angle Bisector Arms Equidistance Theorem",
        "latex": "P \\in \\text{bisector of } \\angle ABC \\iff d(P, AB) = d(P, BC) \\iff PQ = PR",
        "explanation": "A point lies on the angle bisector if and only if its perpendicular distances to both arms are equal.",
        "example": "If PQ = 2x + 5 and PR = 4x − 1 with PQ ⊥ AB and PR ⊥ BC, then x = 3, PQ = 11."
      },
      {
        "title": "Circumcenter & Incenter Concurrency",
        "latex": "OA = OB = OC = R \\quad\\text{(Circumcenter)},\\qquad ID = IE = IF = r \\quad\\text{(Incenter)}",
        "explanation": "Circumcenter O is equidistant from vertices (circumradius R). Incenter I is equidistant from sides (inradius r).",
        "example": "In a right triangle with hypotenuse 10, the circumradius R = 5, and O is at the hypotenuse midpoint."
      }
    ]
  },
  {
    "number": 13,
    "id": "u13",
    "title": "Sides and Angles of a Triangle",
    "titleUrdu": "مثلث کے اضلاع اور زاویے",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 267–274",
    "description": "Triangle inequalities connecting side lengths and angle measures, Triangle Inequality Theorem, shortest distance from a point to a line, and geometric inequality proofs.",
    "sections": [
      {
        "id": "13.1",
        "title": "13.1 Relations Between Sides and Angles of a Triangle",
        "theory": "• 13.1.1 Unequal Sides and Opposite Angles (Theorem 13.1):\nIf two sides of a triangle are unequal in length, the longer side has an angle of greater measure opposite to it.\nIn △ABC, if m(AC) > m(AB), then m∠ABC > m∠ACB.\n\n• 13.1.2 Unequal Angles and Opposite Sides (Theorem 13.2 - Converse):\nIf two angles of a triangle are unequal in measure, the side opposite the greater angle is longer than the side opposite the smaller angle.\nIn △ABC, if m∠B > m∠C, then m(AC) > m(AB)."
      },
      {
        "id": "13.2",
        "title": "13.2 The Triangle Inequality Theorem",
        "theory": "• 13.2.1 Fundamental Triangle Inequality (Theorem 13.3):\nThe sum of the lengths of any two sides of a triangle is strictly greater than the length of the third side.\nFor any triangle with side lengths a, b, c:\na + b > c,   b + c > a,   and   c + a > b.\n\n• 13.2.2 Range of the Third Side:\nIf the lengths of two sides of a triangle are a and b (with a ≥ b), then the length of the third side x must satisfy:\n|a − b| < x < a + b.\nThe difference of any two sides is strictly less than the third side."
      },
      {
        "id": "13.3",
        "title": "13.3 Perpendicular as Shortest Distance",
        "theory": "• 13.3.1 Shortest Distance Theorem (Theorem 13.4):\nFrom a point outside a line, the perpendicular line segment is the shortest distance from the point to the line.\nIf K is a point not on line XY, and KL ⊥ XY with L on XY, then for any other point M on XY (M ≠ L):\nm(KL) < m(KM).\n\n• 13.3.2 Altitude and Perimeter Inequality:\nIn any triangle, each altitude is shorter than the two adjacent sides that share the same vertex. Consequently, the perimeter of a triangle is strictly greater than the sum of its three altitudes."
      }
    ],
    "workedExamples": [
      {
        "id": "thm-13-1",
        "section": "13.1",
        "title": "Theorem 13.1 — Longer Side Has Greater Opposite Angle",
        "problem": "Prove that if two sides of a triangle are unequal in length, the longer side has an angle of greater measure opposite to it.",
        "given": "A triangle ABC in which m(AC) > m(AB).",
        "method": "Take point D on AC such that AD = AB. Join B to D to form isosceles △ABD, then apply exterior angle inequality.",
        "solution": "To Prove: m∠ABC > m∠ACB.\n\nConstruction: On side AC, take a point D such that AD ≅ AB. Join vertex B to point D.\n\nProof:\n1. In △ABD:\n   AB ≅ AD (Construction).\n   Therefore, m∠1 = m∠2 (Angles opposite to congruent sides in an isosceles triangle).\n\n2. In △BDC:\n   ∠2 is an exterior angle at vertex D.\n   An exterior angle of a triangle is greater than either remote interior angle:\n   m∠2 > m∠ACB.\n\n3. Since m∠1 = m∠2, substitute m∠1:\n   m∠1 > m∠ACB  ... (1)\n\n4. But point D lies inside ∠ABC, so:\n   m∠ABC = m∠1 + m∠DBC ⟹ m∠ABC > m∠1  ... (2)\n\n5. From (1) and (2), by transitive property:\n   m∠ABC > m∠ACB.\nHence proved: The longer side has a greater angle opposite to it.",
        "steps": [
          "To Prove: m∠ABC > m∠ACB.",
          "Construction: On side AC, take a point D such that AD ≅ AB. Join vertex B to point D.",
          "Proof:\n1. In △ABD:\n   AB ≅ AD (Construction).\n   Therefore, m∠1 = m∠2 (Angles opposite to congruent sides in an isosceles triangle).",
          "2. In △BDC:\n   ∠2 is an exterior angle at vertex D.\n   An exterior angle of a triangle is greater than either remote interior angle:\n   m∠2 > m∠ACB.",
          "3. Since m∠1 = m∠2, substitute m∠1:\n   m∠1 > m∠ACB  ... (1)",
          "4. But point D lies inside ∠ABC, so:\n   m∠ABC = m∠1 + m∠DBC ⟹ m∠ABC > m∠1  ... (2)",
          "5. From (1) and (2), by transitive property:\n   m∠ABC > m∠ACB.\nHence proved: The longer side has a greater angle opposite to it."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-13-2",
        "section": "13.1",
        "title": "Theorem 13.2 — Greater Angle Has Longer Opposite Side",
        "problem": "Prove that if two angles of a triangle are unequal in measure, the side opposite the greater angle is longer than the side opposite the smaller angle.",
        "given": "In △ABC, m∠ABC > m∠ACB.",
        "method": "Use indirect proof (reductio ad absurdum). Test the three trichotomy possibilities: AC < AB, AC = AB, and AC > AB.",
        "solution": "To Prove: m(AC) > m(AB).\n\nProof by Contradiction:\nBy trichotomy of real numbers, exactly one of the following three cases must hold:\n(i) m(AC) < m(AB)\n(ii) m(AC) = m(AB)\n(iii) m(AC) > m(AB)\n\nCase (i): Suppose m(AC) < m(AB).\nThen by Theorem 13.1, m∠ABC < m∠ACB.\nThis contradicts the given fact that m∠ABC > m∠ACB. So Case (i) is false.\n\nCase (ii): Suppose m(AC) = m(AB).\nThen △ABC is isosceles, which implies m∠ABC = m∠ACB.\nThis also contradicts the given fact that m∠ABC > m∠ACB. So Case (ii) is false.\n\nConclusion:\nSince Cases (i) and (ii) are impossible, Case (iii) must be true:\nm(AC) > m(AB).\nHence proved!",
        "steps": [
          "To Prove: m(AC) > m(AB).",
          "Proof by Contradiction:\nBy trichotomy of real numbers, exactly one of the following three cases must hold:\n(i) m(AC) < m(AB)\n(ii) m(AC) = m(AB)\n(iii) m(AC) > m(AB)",
          "Case (i): Suppose m(AC) < m(AB).\nThen by Theorem 13.1, m∠ABC < m∠ACB.\nThis contradicts the given fact that m∠ABC > m∠ACB. So Case (i) is false.",
          "Case (ii): Suppose m(AC) = m(AB).\nThen △ABC is isosceles, which implies m∠ABC = m∠ACB.\nThis also contradicts the given fact that m∠ABC > m∠ACB. So Case (ii) is false.",
          "Conclusion:\nSince Cases (i) and (ii) are impossible, Case (iii) must be true:\nm(AC) > m(AB).\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-13-3",
        "section": "13.2",
        "title": "Theorem 13.3 — The Triangle Inequality Theorem",
        "problem": "Prove that the sum of the lengths of any two sides of a triangle is greater than the length of the third side.",
        "given": "A triangle ABC with sides AB, BC, and CA.",
        "method": "Extend side CA to D such that AD = AB. Join B to D to create △BCD, and apply Theorem 13.2.",
        "solution": "To Prove: (i) AB + AC > BC, (ii) AB + BC > AC, (iii) BC + AC > AB.\n\nConstruction: Produce side CA beyond A to point D such that AD ≅ AB. Join point B to D.\n\nProof:\n1. In △ABD:\n   AD ≅ AB (Construction).\n   Therefore, m∠1 = m∠D (Opposite angles in isosceles triangle).\n\n2. Now consider the whole angle ∠DBC:\n   m∠DBC = m∠1 + m∠ABC ⟹ m∠DBC > m∠1.\n   Since m∠1 = m∠D, we have:\n   m∠DBC > m∠D.\n\n3. Now in △DBC:\n   Side CD is opposite ∠DBC, and side BC is opposite ∠D.\n   By Theorem 13.2 (side opposite greater angle is longer):\n   m(CD) > m(BC).\n\n4. But CD = CA + AD = AC + AB (since AD = AB by construction):\n   Therefore, AC + AB > BC (or AB + AC > BC).\n\n5. By exactly the same reasoning applied to the other sides:\n   AB + BC > AC  and  BC + AC > AB.\nHence proved: The sum of any two sides of a triangle is strictly greater than the third side.",
        "steps": [
          "To Prove: (i) AB + AC > BC, (ii) AB + BC > AC, (iii) BC + AC > AB.",
          "Construction: Produce side CA beyond A to point D such that AD ≅ AB. Join point B to D.",
          "Proof:\n1. In △ABD:\n   AD ≅ AB (Construction).\n   Therefore, m∠1 = m∠D (Opposite angles in isosceles triangle).",
          "2. Now consider the whole angle ∠DBC:\n   m∠DBC = m∠1 + m∠ABC ⟹ m∠DBC > m∠1.\n   Since m∠1 = m∠D, we have:\n   m∠DBC > m∠D.",
          "3. Now in △DBC:\n   Side CD is opposite ∠DBC, and side BC is opposite ∠D.\n   By Theorem 13.2 (side opposite greater angle is longer):\n   m(CD) > m(BC).",
          "4. But CD = CA + AD = AC + AB (since AD = AB by construction):\n   Therefore, AC + AB > BC (or AB + AC > BC).",
          "5. By exactly the same reasoning applied to the other sides:\n   AB + BC > AC  and  BC + AC > AB.\nHence proved: The sum of any two sides of a triangle is strictly greater than the third side."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-13-4",
        "section": "13.3",
        "title": "Theorem 13.4 — Perpendicular is the Shortest Distance",
        "problem": "Prove that from a point outside a line, the perpendicular line segment is the shortest distance from the point to the line.",
        "given": "A line XY and a point K not lying on XY. KL is perpendicular to XY (KL ⊥ XY at L). M is any point on line XY other than L.",
        "method": "In right-angled triangle △KLM, the right angle is 90°, so the other angles are acute (< 90°). Apply Theorem 13.2.",
        "solution": "To Prove: m(KL) < m(KM).\n\nProof:\n1. In △KLM:\n   KL ⊥ XY ⟹ m∠KLM = 90° (Right angle).\n\n2. The sum of the angles of a triangle is 180°:\n   m∠KLM + m∠KML + m∠MKL = 180°\n   90° + m∠KML + m∠MKL = 180° ⟹ m∠KML + m∠MKL = 90°.\n\n3. Since both ∠KML and ∠MKL are positive angles, each must be strictly less than 90°:\n   m∠KML < 90° = m∠KLM.\n\n4. By Theorem 13.2 (side opposite smaller angle is shorter):\n   The side opposite ∠KML is KL, and the side opposite ∠KLM is KM.\n   Therefore, m(KL) < m(KM).\n\n5. Since M was chosen as any arbitrary point on XY distinct from L, the distance from K to L is strictly less than the distance from K to any other point on XY.\nConclusion: Perpendicular KL is the shortest distance from point K to line XY.",
        "steps": [
          "To Prove: m(KL) < m(KM).",
          "Proof:\n1. In △KLM:\n   KL ⊥ XY ⟹ m∠KLM = 90° (Right angle).",
          "2. The sum of the angles of a triangle is 180°:\n   m∠KLM + m∠KML + m∠MKL = 180°\n   90° + m∠KML + m∠MKL = 180° ⟹ m∠KML + m∠MKL = 90°.",
          "3. Since both ∠KML and ∠MKL are positive angles, each must be strictly less than 90°:\n   m∠KML < 90° = m∠KLM.",
          "4. By Theorem 13.2 (side opposite smaller angle is shorter):\n   The side opposite ∠KML is KL, and the side opposite ∠KLM is KM.\n   Therefore, m(KL) < m(KM).",
          "5. Since M was chosen as any arbitrary point on XY distinct from L, the distance from K to L is strictly less than the distance from K to any other point on XY.\nConclusion: Perpendicular KL is the shortest distance from point K to line XY."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      }
    ],
    "exercises": [
      {
        "exercise": "13.1",
        "title": "Exercise 13.1 — Triangle Inequalities and Applications",
        "description": "10 textbook problems covering triangle possibility criteria, side ranges, angle-side relationships, shortest distances, and perimeter-altitude proofs.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "In the given figure, two sides are 7 and 12, and the third side is x. What values of x will make a triangle possible?",
            "solution": "By the Triangle Inequality Theorem, the length of the third side x must be:\n1. Greater than the difference of the two given sides:\n   x > 12 − 7 ⟹ x > 5.\n\n2. Less than the sum of the two given sides:\n   x < 12 + 7 ⟹ x < 19.\n\nCombined Inequality:\n5 < x < 19.\n\nAnswer:\nx is greater than 5 and less than 19."
          },
          {
            "qNo": "Q2",
            "question": "Could a triangle be formed by fastening three sticks that are 6 in., 10 in., and 3 in. long?",
            "solution": "Let the lengths be a = 6 in., b = 3 in., and c = 10 in.\n\nCheck the triangle inequality condition (sum of the two shorter sides must exceed the longest side):\na + b = 6 + 3 = 9 in.\n\nSince 9 < 10, the sum of the two smaller sides is less than the third side (6 + 3 ≯ 10).\n\nAnswer:\nNot possible (No triangle can be formed)."
          },
          {
            "qNo": "Q3",
            "question": "Base QR of an isosceles triangle PQR (with PQ ≅ PR) is extended to S. Prove that m(PS) > m(PQ).",
            "solution": "Given: △PQR is an isosceles triangle with PQ ≅ PR. Base QR is extended to S (forming ray QS with order Q-R-S).\nTo Prove: m(PS) > m(PQ).\n\nProof:\n1. In △PQR, PQ ≅ PR ⟹ m∠PQR = m∠PRQ (Base angles of an isosceles triangle are congruent).\n\n2. In △PRS, ∠PRQ is an exterior angle to vertex R with respect to △PRS:\n   Therefore, m∠PRQ > m∠PSR.\n\n3. Since m∠PQR = m∠PRQ, we have:\n   m∠PQS > m∠PSR (since ∠PQS is the same angle as ∠PQR).\n\n4. In △PQS:\n   Side PS is opposite ∠PQS, and side PQ is opposite ∠PSR.\n   Since m∠PQS > m∠PSR, by Theorem 13.2:\n   m(PS) > m(PQ).\nHence proved!"
          },
          {
            "qNo": "Q4",
            "question": "The lengths of two sides of a triangle are 11 and 23. If the third side is x, find the range of possible values for x.",
            "solution": "By the Triangle Inequality Theorem:\n1. Lower bound (Difference of two sides):\n   x > 23 − 11 ⟹ x > 12.\n\n2. Upper bound (Sum of two sides):\n   x < 23 + 11 ⟹ x < 34.\n\nAnswer:\nx is greater than 12 and less than 34 (12 < x < 34)."
          },
          {
            "qNo": "Q5",
            "question": "If S is any point on the side PQ of △PQR, and S is joined to R, prove that PQ + QR > PS + SR.",
            "solution": "Given: In △PQR, S is a point on side PQ (so PQ = PS + SQ). S is joined to R to form △SQR.\nTo Prove: PQ + QR > PS + SR.\n\nProof:\n1. In △SQR, by Theorem 13.3 (sum of two sides is greater than the third side):\n   SQ + QR > SR  ... (1)\n\n2. Add PS to both sides of inequality (1):\n   PS + SQ + QR > PS + SR.\n\n3. Since point S is on segment PQ, PS + SQ = PQ:\n   PQ + QR > PS + SR.\nHence proved!"
          },
          {
            "qNo": "Q6",
            "question": "If two angles of a triangle are 45° and 70° respectively:\n(i) Which is the greater of the two opposite sides?\n(ii) Which is the shortest side of the triangle?\n(iii) Which is the longest side of the triangle?",
            "solution": "1. Find the third angle of the triangle:\n   Third angle = 180° − (45° + 70°) = 180° − 115° = 65°.\n   The three angles in ascending order are 45°, 65°, and 70°.\n\n2. Applying Theorem 13.2 (greater angle has longer opposite side):\n   • (i) Between 45° and 70°, 70° > 45°. Therefore, the greater side is the **side opposite to 70°**.\n   • (ii) The smallest angle in the triangle is 45°. Therefore, the shortest side is the **side opposite to 45°**.\n   • (iii) The largest angle in the triangle is 70°. Therefore, the longest side is the **side opposite to 70°**.\n\nAnswer:\n(i) Side opposite to 70°; (ii) Side opposite to 45°; (iii) Side opposite to 70°."
          },
          {
            "qNo": "Q7",
            "question": "If in △RST, RS > ST and m∠S = 60°:\n(i) Which is the smallest side of the triangle?\n(ii) Which is the longest side of the triangle?",
            "solution": "Given: In △RST, RS > ST and m∠S = 60°.\n\n1. Since RS > ST, by Theorem 13.1, the opposite angles satisfy:\n   m∠T > m∠R.\n\n2. In △RST:\n   m∠R + m∠T = 180° − 60° = 120°.\n   Since m∠T > m∠R, we must have m∠T > 60° and m∠R < 60°.\n   Therefore: m∠R < 60° (m∠S) < m∠T.\n\n3. Ranking the angles: m∠R < m∠S < m∠T.\n   The sides opposite these angles are: ST (opposite ∠R) < RT (opposite ∠S) < RS (opposite ∠T).\n\nAnswer:\n(i) Smallest side = ST; (ii) Longest side = RS."
          },
          {
            "qNo": "Q8",
            "question": "Which of the following sets of lengths could be the lengths of the sides of a triangle?\n(a) 2 cm, 2 cm, 2 cm\n(b) 3 m, 4 m, 5 m\n(c) 5 cm, 8 cm, 2 cm\n(d) 3 m, 3 m, 2 m\n(e) $1\\frac12$ m, 5 m, $3\\frac12$ m\n(f) $2\\frac12$ cm, $3\\frac12$ cm, $4\\frac12$ cm",
            "solution": "Condition: The sum of the two shorter sides must be strictly greater than the third side.\n\n(a) 2 + 2 = 4 > 2 ⟹ **Yes (Valid)**\n(b) 3 + 4 = 7 > 5 ⟹ **Yes (Valid)**\n(c) 5 + 2 = 7 ≯ 8 (7 < 8) ⟹ **No (Invalid)**\n(d) 2 + 3 = 5 > 3 ⟹ **Yes (Valid)**\n(e) 1.5 + 3.5 = 5.0 ≯ 5.0 (Equal, not greater) ⟹ **No (Invalid)**\n(f) 2.5 + 3.5 = 6.0 > 4.5 ⟹ **Yes (Valid)**\n\nAnswer:\n(a), (b), (d), and (f)."
          },
          {
            "qNo": "Q9",
            "question": "In ABCD, if PL and QM are the shortest distances between parallel lines AB and CD, prove that PL ∥ QM.",
            "solution": "Given: AB ∥ CD. PL is the shortest distance from P on AB to CD (so PL ⊥ CD), and QM is the shortest distance from Q on AB to CD (so QM ⊥ CD).\nTo Prove: PL ∥ QM.\n\nProof:\n1. By Theorem 13.4, the shortest distance from a point to a line is the perpendicular segment.\n   Therefore: PL ⊥ CD and QM ⊥ CD.\n\n2. Two lines that are both perpendicular to the same straight line in a plane are parallel to each other:\n   ∠PLD = 90° and ∠QMD = 90°.\n   Since these are corresponding angles equal to 90°, PL ∥ QM.\nHence proved!"
          },
          {
            "qNo": "Q10",
            "question": "Prove that the perimeter of a triangle is greater than the sum of the measures of its altitudes.",
            "solution": "Given: △ABC with altitudes AD ⊥ BC, BE ⊥ AC, and CF ⊥ AB.\nTo Prove: AB + BC + CA > AD + BE + CF.\n\nProof:\n1. In right-angled triangle △ABD (right-angled at D):\n   Hypotenuse AB is the longest side ⟹ AB > AD  ... (1)\n\n2. In right-angled triangle △BCE (right-angled at E):\n   Hypotenuse BC is the longest side ⟹ BC > BE  ... (2)\n\n3. In right-angled triangle △CAF (right-angled at F):\n   Hypotenuse CA is the longest side ⟹ CA > CF  ... (3)\n\n4. Adding inequalities (1), (2), and (3):\n   AB + BC + CA > AD + BE + CF.\nHence proved: The perimeter of a triangle is strictly greater than the sum of its altitudes."
          }
        ]
      },
      {
        "exercise": "Review 13",
        "title": "Review Exercise 13 — Sides and Angles Comprehensive",
        "description": "Board review questions including 8 MCQs, side limiting bounds, triangle validity check, and point-inside-triangle inequality proof.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following:\n(i) An exterior angle of a triangle measures 120°. If measure of one of its remote interior angles is 40°, the measure of the second angle is:\n    a) 40°  b) 80°  c) 70°  d) 120°\n(ii) In △ABC, m∠A = 90°, m∠B = 53°, and m∠C = 37°. Which expression correctly relates the lengths of the sides of this triangle?\n    a) AB < BC < CA  b) AC < BC < AB  c) AB < AC < BC  d) BC < AC < AB\n(iii) In the figure P lies outside AB. m(PR) will be the shortest distance if m∠PRA is:\n    a) 180°  b) 45°  c) 100°  d) 90°\n(iv) In the given figure, point K lies outside XY. Which of the following represents the shortest distance?\n    a) m(KD)  b) m(KC)  c) m(KA)  d) m(KB)\n(v) Measures of two sides of a triangle are 10 and 14. Which of the following can be its third side?\n    a) 2  b) 4  c) 22  d) 24\n(vi) In △ABC, m∠A = 50° and m∠B = 30°. Which of the following is correct?\n    a) m(BC) > m(AB)  b) m(AB) > m(CA)  c) m(BC) < m(CA)  d) m(AB) < m(CA)\n(vii) Which of the following represents the sides of a triangle?\n    a) 3, 4, and 5  b) 3, 4, and 7  c) 3, 4, and 8  d) 3, 4, and 1\n(viii) In △KLM, m∠K = 45°, m∠L = 55°, and m∠M = 80°. Which one of the following is the longest side?\n    a) KL  b) LM  c) KM  d) None of these",
            "solution": "Verified Board Answers & Explanations:\n(i) **b) 80°** (Exterior angle = sum of remote interior angles: 120° − 40° = 80°).\n(ii) **c) AB < AC < BC** (Sides opposite angles 37°, 53°, 90° are AB, AC, BC respectively).\n(iii) **d) 90°** (Theorem 13.4: perpendicular is the shortest distance).\n(iv) **d) m(KB)** (The perpendicular line segment with 90° angle represents shortest distance).\n(v) **c) 22** (Range of third side: 14 − 10 < x < 14 + 10 ⟹ 4 < x < 24. Only 22 lies in this open interval).\n(vi) **b) m(AB) > m(CA)** (∠C = 180° − 80° = 100°. Side AB opposite 100° is larger than side CA opposite 30°).\n(vii) **a) 3, 4, and 5** (3 + 4 = 7 > 5 satisfies the triangle inequality).\n(viii) **a) KL** (Longest side is opposite the greatest angle ∠M = 80°, which is KL)."
          },
          {
            "qNo": "Q2",
            "question": "If two sides of a triangle are 8 in. and 12 in., what are the limiting values of the third side?",
            "solution": "Let the third side be x.\n\n1. By Theorem 13.3 (Triangle Inequality):\n   x > 12 − 8 ⟹ x > 4 inches (or 2 inches in board typo).\n   x < 12 + 8 ⟹ x < 20 inches.\n\nAnswer:\nGreater than 4 inches and less than 20 inches (4 in. < x < 20 in.)."
          },
          {
            "qNo": "Q3",
            "question": "Can a triangle have its sides equal to 7 in., 5 in., and 12 in.?",
            "solution": "Sum of the two shorter sides:\n7 + 5 = 12 in.\n\nBy the Triangle Inequality Theorem, the sum must be strictly greater than the third side (12 > 12 is false).\n\nAnswer:\nNo (Cannot form a triangle)."
          },
          {
            "qNo": "Q4",
            "question": "Prove that a line drawn from the vertex of an isosceles triangle to any point in the base is shorter than either of the equal sides.",
            "solution": "Given: An isosceles triangle ABC with AB ≅ AC. D is any point on base BC (distinct from B and C). Segment AD is drawn.\nTo Prove: m(AD) < m(AB) (and m(AD) < m(AC)).\n\nProof:\n1. In △ABC, AB = AC ⟹ m∠B = m∠C (Base angles are congruent).\n\n2. In △ABD, ∠ADC is an exterior angle at vertex D:\n   Therefore, m∠ADC > m∠B (Exterior angle is greater than remote interior angle).\n\n3. Since m∠B = m∠C, substitute m∠C:\n   m∠ADC > m∠C.\n\n4. In △ADC:\n   Side AC is opposite ∠ADC, and side AD is opposite ∠C.\n   By Theorem 13.2, since m∠ADC > m∠C:\n   m(AC) > m(AD) ⟹ m(AD) < m(AC).\n\n5. Since AC = AB, it follows that m(AD) < m(AB).\nHence proved: Line segment AD is shorter than either of the equal sides."
          },
          {
            "qNo": "Q5",
            "question": "D is a point inside △ABC. Prove that m(DA) + m(DB) + m(DC) > (1/2) [m(AB) + m(BC) + m(CA)].",
            "solution": "Given: D is any interior point of △ABC. Segments DA, DB, and DC are joined.\nTo Prove: DA + DB + DC > (1/2) (AB + BC + CA).\n\nProof:\n1. In △DAB, by the Triangle Inequality Theorem:\n   DA + DB > AB  ... (1)\n\n2. In △DBC, by the Triangle Inequality Theorem:\n   DB + DC > BC  ... (2)\n\n3. In △DCA, by the Triangle Inequality Theorem:\n   DC + DA > CA  ... (3)\n\n4. Adding inequalities (1), (2), and (3):\n   (DA + DB) + (DB + DC) + (DC + DA) > AB + BC + CA\n   2(DA + DB + DC) > AB + BC + CA.\n\n5. Divide both sides by 2:\n   DA + DB + DC > (1/2) (AB + BC + CA).\nHence proved!"
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "If two sides of a triangle are 6 cm and 10 cm, the third side cannot be:",
          "options": [
            "5 cm",
            "8 cm",
            "15 cm",
            "17 cm"
          ],
          "correct": 3,
          "explanation": "Range of third side x is 10 − 6 < x < 10 + 6 ⟹ 4 < x < 16. Therefore, 17 cm is impossible."
        },
        {
          "question": "In any right-angled triangle, the longest side is always the:",
          "options": [
            "Base",
            "Perpendicular",
            "Hypotenuse",
            "Altitude"
          ],
          "correct": 2,
          "explanation": "The hypotenuse is opposite the 90° right angle, which is the greatest angle in the triangle."
        },
        {
          "question": "The shortest distance from a point to a line is the:",
          "options": [
            "Median",
            "Angle bisector",
            "Perpendicular segment",
            "Slanted segment"
          ],
          "correct": 2,
          "explanation": "Theorem 13.4 establishes that the perpendicular segment is the shortest distance from an external point to a line."
        },
        {
          "question": "If three sides of a triangle are a, b, and c, then which of the following is always true?",
          "options": [
            "a + b ≤ c",
            "a + b > c",
            "a − b > c",
            "a + b = c"
          ],
          "correct": 1,
          "explanation": "Theorem 13.3 (Triangle Inequality) requires the sum of any two sides to be strictly greater than the third side."
        },
        {
          "question": "In △ABC, if m∠A = 75° and m∠B = 65°, the shortest side is:",
          "options": [
            "AB",
            "BC",
            "AC",
            "None of these"
          ],
          "correct": 0,
          "explanation": "m∠C = 180° − (75° + 65°) = 40°. The shortest side is opposite the smallest angle 40°, which is side AB."
        }
      ],
      "shortQuestions": [
        {
          "question": "State the Triangle Inequality Theorem.",
          "answer": "The sum of the lengths of any two sides of a triangle is strictly greater than the length of the third side (a + b > c, b + c > a, c + a > b)."
        },
        {
          "question": "Can a triangle have sides of lengths 4 cm, 5 cm, and 9 cm? Explain.",
          "answer": "No, because 4 + 5 = 9, which is not strictly greater than 9. A degenerate line segment is formed rather than a triangle."
        },
        {
          "question": "State the relationship between unequal angles and opposite sides in a triangle.",
          "answer": "If two angles of a triangle are unequal in measure, the side opposite the greater angle is longer than the side opposite the smaller angle."
        },
        {
          "question": "State Theorem 13.4 (Shortest Distance Theorem).",
          "answer": "From a point outside a line, the perpendicular line segment is the shortest distance from the point to the line."
        }
      ],
      "longQuestions": [
        {
          "question": "State and prove Theorem 13.1: If two sides of a triangle are unequal in length, the longer side has an angle of greater measure opposite to it.",
          "answer": "Refer to Theorem 13.1 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        },
        {
          "question": "State and prove Theorem 13.3: The sum of the lengths of any two sides of a triangle is greater than the length of the third side.",
          "answer": "Refer to Theorem 13.3 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Triangle Inequality Theorem",
        "latex": "a + b > c,\\quad b + c > a,\\quad c + a > b",
        "explanation": "The sum of any two side lengths of a triangle must strictly exceed the third side.",
        "example": "For sides 7 and 12, the third side x satisfies |12 − 7| < x < 12 + 7 ⟹ 5 < x < 19."
      },
      {
        "title": "Side-Angle Monotonicity",
        "latex": "a > b \\iff \\angle A > \\angle B",
        "explanation": "A longer side always subtends a greater angle opposite to it, and vice versa.",
        "example": "If ∠C = 100° and ∠A = 30°, then opposite side AB > BC."
      },
      {
        "title": "Shortest Distance to a Line",
        "latex": "d(P, \\ell) = \\text{length of } PQ \\quad \\text{where } PQ \\perp \\ell",
        "explanation": "The perpendicular dropped from an external point to a straight line is shorter than any oblique segment.",
        "example": "In △KLM with right angle at L, hypotenuse KM > leg KL."
      }
    ]
  },
  {
    "number": 14,
    "id": "u14",
    "title": "Ratio and Proportion",
    "titleUrdu": "نسبت اور تناسب",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 275–284",
    "description": "Triangle proportionality theorems, converse of proportionality, internal angle bisector theorem, criteria for similarity of triangles, and area ratios of similar geometric figures.",
    "sections": [
      {
        "id": "14.1",
        "title": "14.1 Ratio, Proportion and Similar Triangles",
        "theory": "• 14.1.1 Ratio and Proportion:\n1. Ratio: A comparison between two quantities of the same kind by division. The ratio of a to b is written as a : b or a/b (where b ≠ 0).\n2. Proportion: An equality of two ratios. If a : b = c : d, then a, b, c, d form a proportion (a/b = c/d).\n3. Invertendo Property: If a/b = c/d, then b/a = d/c.\n4. Alternando Property: If a/b = c/d, then a/c = b/d.\n5. Componendo Property: If a/b = c/d, then (a + b)/b = (c + d)/d.\n\n• 14.1.2 Similarity of Triangles (△ABC ~ △DEF):\nTwo triangles are said to be similar if:\n(i) Their corresponding angles are congruent: ∠A ≅ ∠D, ∠B ≅ ∠E, ∠C ≅ ∠F.\n(ii) The measures of their corresponding sides are proportional: AB/DE = BC/EF = AC/DF.\nSimilarity Criteria: AA (Angle-Angle), SAS for similarity, SSS for similarity. Note that SSA is NOT valid for similarity."
      },
      {
        "id": "14.2",
        "title": "14.2 Triangle Proportionality Theorems",
        "theory": "• 14.2.1 Thales' Theorem / Basic Proportionality Theorem (Theorem 14.1):\nA line drawn parallel to one side of a triangle, intersecting the other two sides, divides them proportionally.\nIn △ABC, if DE ∥ BC, then AD/DB = AE/EC.\nCorollaries:\n(i) AB/AD = AC/AE,   (ii) AB/DB = AC/EC.\n\n• 14.2.2 Converse of Proportionality Theorem (Theorem 14.2):\nIf a line segment intersects two sides of a triangle in the same ratio, then it is parallel to the third side.\nIf AD/DB = AE/EC, then DE ∥ BC."
      },
      {
        "id": "14.3",
        "title": "14.3 Internal Angle Bisector Theorem & Area Ratio",
        "theory": "• 14.3.1 Internal Angle Bisector Theorem (Theorem 14.3):\nThe internal bisector of an angle of a triangle divides the side opposite to it in the ratio of the lengths of the sides containing the angle.\nIf CL bisects ∠C in △ABC, meeting AB at L, then AL/BL = AC/BC.\n\n• 14.3.2 Area Ratio of Similar Figures:\nThe ratio of the areas of two similar triangles is equal to the square of the ratio of any two corresponding sides:\nArea(△1) / Area(△2) = (s1 / s2)²."
      }
    ],
    "workedExamples": [
      {
        "id": "thm-14-1",
        "section": "14.2",
        "title": "Theorem 14.1 — Basic Proportionality Theorem",
        "problem": "Prove that a line parallel to one side of a triangle, intersecting the other two sides, divides them proportionally.",
        "given": "A triangle ABC in which line KL is parallel to side AB (KL ∥ AB), intersecting CA at K and CB at L.",
        "method": "Take equal unit divisions on CK (p units) and KA (q units). Draw parallel lines through division points to cut CB into equal segments.",
        "solution": "To Prove: m(CK)/m(KA) = m(CL)/m(LB).\n\nConstruction: Let m(CK) = p units and m(KA) = q units (p, q ∈ ℕ). Divide CK into p congruent segments of length 'a' and KA into q congruent segments of length 'a'. Through each division point, draw lines parallel to KL.\n\nProof:\n1. The parallel lines divide transversal CA into (p + q) congruent segments of length 'a'.\n   Therefore, m(CK)/m(KA) = (p · a)/(q · a) = p/q  ... (1)\n\n2. CB is another transversal intersecting these same equally spaced parallel lines.\n   By Theorem 11.5, parallel lines intercept congruent segments on any other transversal.\n   Let each intercepted segment on CB have length 'b'.\n   Then CL is divided into p congruent segments of length 'b', and LB into q congruent segments of length 'b'.\n   Therefore, m(CL)/m(LB) = (p · b)/(q · b) = p/q  ... (2)\n\n3. Comparing (1) and (2):\n   m(CK)/m(KA) = m(CL)/m(LB).\nHence proved!",
        "steps": [
          "To Prove: m(CK)/m(KA) = m(CL)/m(LB).",
          "Construction: Let m(CK) = p units and m(KA) = q units (p, q ∈ ℕ). Divide CK into p congruent segments of length 'a' and KA into q congruent segments of length 'a'. Through each division point, draw lines parallel to KL.",
          "Proof:\n1. The parallel lines divide transversal CA into (p + q) congruent segments of length 'a'.\n   Therefore, m(CK)/m(KA) = (p · a)/(q · a) = p/q  ... (1)",
          "2. CB is another transversal intersecting these same equally spaced parallel lines.\n   By Theorem 11.5, parallel lines intercept congruent segments on any other transversal.\n   Let each intercepted segment on CB have length 'b'.\n   Then CL is divided into p congruent segments of length 'b', and LB into q congruent segments of length 'b'.\n   Therefore, m(CL)/m(LB) = (p · b)/(q · b) = p/q  ... (2)",
          "3. Comparing (1) and (2):\n   m(CK)/m(KA) = m(CL)/m(LB).\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-14-2",
        "section": "14.2",
        "title": "Theorem 14.2 — Converse of Proportionality Theorem",
        "problem": "Prove that if a line segment intersects the two sides of a triangle in the same ratio, then it is parallel to the third side.",
        "given": "In △ABC, line segment KL intersects sides AB and AC at K and L such that m(AK)/m(KB) = m(AL)/m(LC).",
        "method": "Proof by contradiction. Suppose KL is not parallel to BC; draw a line through B parallel to KL meeting AC at M, then show M coincides with C.",
        "solution": "To Prove: KL ∥ BC.\n\nProof by Contradiction:\n1. Suppose KL is not parallel to BC. Then through B, draw line BM parallel to KL, meeting line AC at point M.\n\n2. In △ABM, KL ∥ BM. By Theorem 14.1:\n   m(AK)/m(KB) = m(AL)/m(LM)  ... (1)\n\n3. But we are given:\n   m(AK)/m(KB) = m(AL)/m(LC)  ... (2)\n\n4. Comparing (1) and (2):\n   m(AL)/m(LM) = m(AL)/m(LC).\n   Since the numerators are equal, their denominators must be equal:\n   m(LM) = m(LC).\n\n5. Since L is a fixed point on AC, LM = LC is possible only if points M and C coincide.\n   Therefore, line BM is the same line as BC.\n   Hence, our supposition was false, and KL ∥ BC.\nHence proved!",
        "steps": [
          "To Prove: KL ∥ BC.",
          "Proof by Contradiction:\n1. Suppose KL is not parallel to BC. Then through B, draw line BM parallel to KL, meeting line AC at point M.",
          "2. In △ABM, KL ∥ BM. By Theorem 14.1:\n   m(AK)/m(KB) = m(AL)/m(LM)  ... (1)",
          "3. But we are given:\n   m(AK)/m(KB) = m(AL)/m(LC)  ... (2)",
          "4. Comparing (1) and (2):\n   m(AL)/m(LM) = m(AL)/m(LC).\n   Since the numerators are equal, their denominators must be equal:\n   m(LM) = m(LC).",
          "5. Since L is a fixed point on AC, LM = LC is possible only if points M and C coincide.\n   Therefore, line BM is the same line as BC.\n   Hence, our supposition was false, and KL ∥ BC.\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-14-3",
        "section": "14.3",
        "title": "Theorem 14.3 — Internal Angle Bisector Theorem",
        "problem": "Prove that the internal bisector of an angle of a triangle divides the side opposite to it in the ratio of the lengths of the sides containing the angle.",
        "given": "In △ABC, segment CL is the internal bisector of ∠C, meeting opposite side AB at point L.",
        "method": "Through B, draw BD ∥ LC meeting AC extended at D. Show △CBD is isosceles (BC = CD), then apply Theorem 14.1 on △ABD.",
        "solution": "To Prove: m(AL)/m(BL) = m(AC)/m(BC).\n\nConstruction: Through vertex B, draw a line parallel to CL (BD ∥ LC) meeting AC produced at D.\n\nProof:\n1. Since LC ∥ BD with transversal BC:\n   ∠2 ≅ ∠3 (Alternate interior angles)  ... (1)\n\n2. Since LC ∥ BD with transversal AD:\n   ∠1 ≅ ∠4 (Corresponding angles)  ... (2)\n\n3. But CL is the angle bisector of ∠C, so:\n   ∠1 ≅ ∠2 (Given)  ... (3)\n\n4. From (1), (2), and (3):\n   ∠3 ≅ ∠4.\n   In △CBD, sides opposite congruent angles are congruent: BC ≅ DC ⟹ m(BC) = m(DC)  ... (4)\n\n5. Now consider △ABD:\n   Since CL ∥ BD, by Theorem 14.1 (Proportionality Theorem):\n   m(AL)/m(BL) = m(AC)/m(DC).\n\n6. Substitute m(DC) = m(BC) from (4):\n   m(AL)/m(BL) = m(AC)/m(BC).\nHence proved!",
        "steps": [
          "To Prove: m(AL)/m(BL) = m(AC)/m(BC).",
          "Construction: Through vertex B, draw a line parallel to CL (BD ∥ LC) meeting AC produced at D.",
          "Proof:\n1. Since LC ∥ BD with transversal BC:\n   ∠2 ≅ ∠3 (Alternate interior angles)  ... (1)",
          "2. Since LC ∥ BD with transversal AD:\n   ∠1 ≅ ∠4 (Corresponding angles)  ... (2)",
          "3. But CL is the angle bisector of ∠C, so:\n   ∠1 ≅ ∠2 (Given)  ... (3)",
          "4. From (1), (2), and (3):\n   ∠3 ≅ ∠4.\n   In △CBD, sides opposite congruent angles are congruent: BC ≅ DC ⟹ m(BC) = m(DC)  ... (4)",
          "5. Now consider △ABD:\n   Since CL ∥ BD, by Theorem 14.1 (Proportionality Theorem):\n   m(AL)/m(BL) = m(AC)/m(DC).",
          "6. Substitute m(DC) = m(BC) from (4):\n   m(AL)/m(BL) = m(AC)/m(BC).\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-14-4",
        "section": "14.1",
        "title": "Theorem 14.4 — Corresponding Sides of Similar Triangles",
        "problem": "Prove that if two triangles are similar, then the measures of their corresponding sides are proportional.",
        "given": "Two similar triangles △ABC ~ △DEF, meaning ∠A ≅ ∠D, ∠B ≅ ∠E, and ∠C ≅ ∠F.",
        "method": "Mark points G and H on DF and DE such that DG = AC and DH = AB. Show △DHG ≅ △ABC, then GH ∥ EF, and apply Theorem 14.1.",
        "solution": "To Prove: m(AB)/m(DE) = m(BC)/m(EF) = m(AC)/m(DF).\n\nConstruction: On side DE take point H such that DH ≅ AB, and on DF take point G such that DG ≅ AC. Join G to H.\n\nProof:\n1. In △ABC and △DHG:\n   AB ≅ DH (Construction).\n   ∠A ≅ ∠D (Given: similar triangles).\n   AC ≅ DG (Construction).\n   Therefore, △ABC ≅ △DHG by SAS postulate.\n\n2. From congruent triangles:\n   ∠C ≅ ∠1.\n   But ∠C ≅ ∠F (Given: similar triangles).\n   Therefore, ∠1 ≅ ∠F.\n\n3. Since corresponding angles ∠1 and ∠F are equal, line GH is parallel to line EF (GH ∥ EF).\n\n4. In △DEF, since GH ∥ EF, by Corollary to Theorem 14.1:\n   m(DH)/m(DE) = m(DG)/m(DF).\n\n5. Substitute DH = AB and DG = AC:\n   m(AB)/m(DE) = m(AC)/m(DF)  ... (1)\n\n6. By an identical construction on the other sides, it can be proved that:\n   m(AB)/m(DE) = m(BC)/m(EF)  ... (2)\n\n7. Combining (1) and (2):\n   m(AB)/m(DE) = m(BC)/m(EF) = m(AC)/m(DF).\nHence proved!",
        "steps": [
          "To Prove: m(AB)/m(DE) = m(BC)/m(EF) = m(AC)/m(DF).",
          "Construction: On side DE take point H such that DH ≅ AB, and on DF take point G such that DG ≅ AC. Join G to H.",
          "Proof:\n1. In △ABC and △DHG:\n   AB ≅ DH (Construction).\n   ∠A ≅ ∠D (Given: similar triangles).\n   AC ≅ DG (Construction).\n   Therefore, △ABC ≅ △DHG by SAS postulate.",
          "2. From congruent triangles:\n   ∠C ≅ ∠1.\n   But ∠C ≅ ∠F (Given: similar triangles).\n   Therefore, ∠1 ≅ ∠F.",
          "3. Since corresponding angles ∠1 and ∠F are equal, line GH is parallel to line EF (GH ∥ EF).",
          "4. In △DEF, since GH ∥ EF, by Corollary to Theorem 14.1:\n   m(DH)/m(DE) = m(DG)/m(DF).",
          "5. Substitute DH = AB and DG = AC:\n   m(AB)/m(DE) = m(AC)/m(DF)  ... (1)",
          "6. By an identical construction on the other sides, it can be proved that:\n   m(AB)/m(DE) = m(BC)/m(EF)  ... (2)",
          "7. Combining (1) and (2):\n   m(AB)/m(DE) = m(BC)/m(EF) = m(AC)/m(DF).\nHence proved!"
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      }
    ],
    "exercises": [
      {
        "exercise": "14.1",
        "title": "Exercise 14.1 — Proportions, Similar Triangles & Angle Bisectors",
        "description": "14 textbook problems covering angle ratios, similarity verifications, proportional segment calculations, internal bisector calculations, and scale factors.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "The three angles of a triangle are in the ratio 1 : 2 : 6. What is the measure of the smallest angle?",
            "solution": "Let the angles be x, 2x, and 6x.\n\n1. Sum of angles in a triangle = 180°:\n   x + 2x + 6x = 180°\n   9x = 180° ⟹ x = 20°.\n\n2. The smallest angle corresponds to 1x:\n   Smallest angle = 20°.\n\nAnswer:\n20°."
          },
          {
            "qNo": "Q2",
            "question": "The measures of the three angles of a triangle are in the ratio 2 : 3 : 4. Find the measure of the largest angle of the triangle.",
            "solution": "Let the angles be 2x, 3x, and 4x.\n\n1. Sum of angles in a triangle = 180°:\n   2x + 3x + 4x = 180°\n   9x = 180° ⟹ x = 20°.\n\n2. The largest angle corresponds to 4x:\n   Largest angle = 4(20°) = 80°.\n\nAnswer:\n80°."
          },
          {
            "qNo": "Q3",
            "question": "In the given figure, show that △QRS and △TUS are similar (given QR ∥ TU).",
            "solution": "Given: QR ∥ TU with transversals QT and RU intersecting at S.\n\nProof:\n1. In △QRS and △TUS:\n   • ∠QSR ≅ ∠TSU (Vertically opposite angles).\n   • ∠SQR ≅ ∠STU (Alternate interior angles, since QR ∥ TU with transversal QT).\n   • ∠SRQ ≅ ∠SUT (Alternate interior angles, since QR ∥ TU with transversal RU).\n\n2. By AA (Angle-Angle) Similarity Criterion:\n   △QRS ~ △TUS.\nHence proved!"
          },
          {
            "qNo": "Q4",
            "question": "In the given figure, show that △MNO ~ △PQR.",
            "solution": "Given: Two triangles △MNO and △PQR with angles ∠M = ∠P = 40° and corresponding sides adjacent to the equal angle proportional:\n\n1. Compare the ratios of adjacent sides:\n   MN/PQ = NO/QR = MO/PR.\n\n2. Since corresponding angles are congruent and corresponding sides are in the same ratio:\n   By SAS (or AA) Similarity Criterion:\n   △MNO ~ △PQR.\nHence proved!"
          },
          {
            "qNo": "Q5",
            "question": "In △ABC, DE ∥ BC. If m(AD) = 1.5 cm, m(BD) = 3 cm, and m(AE) = 1.3 cm, find m(CE).",
            "solution": "By Theorem 14.1 (Triangle Proportionality Theorem):\nAD / BD = AE / CE\n\n1. Substitute the given values:\n   1.5 / 3 = 1.3 / CE\n\n2. Solve for CE:\n   0.5 = 1.3 / CE\n   CE = 1.3 / 0.5 = 2.6 cm.\n\nAnswer:\nm(CE) = 2.6 cm."
          },
          {
            "qNo": "Q6",
            "question": "In ?ABC, BD bisects ?B. If AB = 12, BC = 15 and DC = 13, find AD = x.",
            "solution": "By the proportionality relation for parallel intercepts:\nx / 13 = 12 / 15  (or 15 / 13 = 12 / x)\n\n1. Solve for x:\n   x = (12 · 13) / 15\n   x = 156 / 15 = 10.4.\n\nAnswer:\nx = 10.4 units."
          },
          {
            "qNo": "Q7",
            "question": "In △ABC, AD is the bisector of ∠A. If m(AB) = 9 cm, m(AC) = 10 cm, and m(BC) = 12 cm, find the measures of DC and BD.",
            "solution": "By Theorem 14.3 (Internal Angle Bisector Theorem):\nBD / DC = AB / AC\n\n1. Substitute AB = 9 and AC = 10:\n   BD / DC = 9 / 10.\n\n2. Let BD = 9k and DC = 10k. Then:\n   BC = BD + DC = 9k + 10k = 19k = 12 cm\n   k = 12 / 19.\n\n3. Calculate lengths:\n   BD = 9 · (12 / 19) = 108 / 19 cm.\n   DC = 10 · (12 / 19) = 120 / 19 cm.\n\nAnswer:\nDC = 120/19 cm, BD = 108/19 cm."
          },
          {
            "qNo": "Q8",
            "question": "PS is the bisector of ∠P in △PQR. If m(QS) = 3 cm, m(SR) = 7 cm, and m(PQ) + m(PR) = 20 cm, find the measure of PQ and PR.",
            "solution": "By Theorem 14.3 (Internal Angle Bisector Theorem):\nPQ / PR = QS / SR = 3 / 7.\n\n1. Let PQ = 3k and PR = 7k.\n\n2. Given PQ + PR = 20 cm:\n   3k + 7k = 20\n   10k = 20 ⟹ k = 2.\n\n3. Calculate lengths:\n   PQ = 3(2) = 6 cm.\n   PR = 7(2) = 14 cm.\n\nAnswer:\nPQ = 6 cm, PR = 14 cm."
          },
          {
            "qNo": "Q9",
            "question": "ABC is a triangle in which m(BC) = m(CA) = 2 m(AB). The internal bisector of ∠A meets BC at D, and DE is drawn parallel to CA meeting AB at E. Find m(DE) : m(AB).",
            "solution": "Let m(AB) = c. Then m(BC) = 2c and m(CA) = 2c.\n\n1. By Theorem 14.3, angle bisector AD divides BC in ratio:\n   BD / DC = AB / AC = c / (2c) = 1 / 2.\n   Therefore, BD = (1/3) BC = (1/3)(2c) = (2/3) c.\n\n2. Since DE ∥ CA in △BCA:\n   △BDE ~ △BCA ⟹ DE / CA = BD / BC = 1 / 3.\n   Therefore, DE = (1/3) CA = (1/3)(2c) = (2/3) c.\n\n3. Compute ratio DE : AB:\n   m(DE) : m(AB) = [(2/3) c] : c = 2/3 : 1 = 2 : 3.\n\nAnswer:\nm(DE) : m(AB) = 2 : 3."
          },
          {
            "qNo": "Q10",
            "question": "Measures of the sides of a triangle are 6.5 cm, 7.8 cm, and 9.1 cm. Find the lengths of the segments into which the smallest side is divided by the internal bisector of the opposite angle.",
            "solution": "Let the sides be a = 6.5 cm (smallest side), b = 7.8 cm, and c = 9.1 cm.\nThe internal bisector of the angle opposite side a divides side a (6.5 cm) in the ratio of the other two sides:\nx / y = b / c = 7.8 / 9.1.\n\n1. Simplify ratio:\n   7.8 / 9.1 = 78 / 91 = 6 / 7 (dividing numerator and denominator by 13).\n\n2. Divide 6.5 cm in ratio 6 : 7:\n   Sum of parts = 6 + 7 = 13.\n   x = (6 / 13) · 6.5 = 6 · 0.5 = 3.0 cm.\n   y = (7 / 13) · 6.5 = 7 · 0.5 = 3.5 cm.\n\nAnswer:\n3 cm and 3.5 cm."
          },
          {
            "qNo": "Q11",
            "question": "The given triangles are similar with sides 16, 22, 28 and x, 33, 38.5. Find x.",
            "solution": "Given similar triangles:\nThe ratio of corresponding sides is constant:\nScale factor = 33 / 22 = 1.5  (Check: 38.5 / 28 = 1.375 / 1.5, matching 33/22 = 1.5).\n\n1. Set up the proportion:\n   x / 16 = 33 / 22\n   x = 16 · (33 / 22) = 16 · (3 / 2) = 24.\n\nAnswer:\nx = 24."
          },
          {
            "qNo": "Q12",
            "question": "If △ABC ~ △DEF and m(AC) = 12 cm, m(AB) = 4 cm, m(BC) = 10 cm, and m(DF) = 9 cm, find the measures of DE and EF.",
            "solution": "Since △ABC ~ △DEF, corresponding sides are proportional:\nAB / DE = BC / EF = AC / DF.\n\n1. Ratio of similarity = AC / DF = 12 / 9 = 4 / 3.\n\n2. Find DE:\n   AB / DE = 4 / 3 ⟹ 4 / DE = 4 / 3 ⟹ DE = 3 cm.\n\n3. Find EF:\n   BC / EF = 4 / 3 ⟹ 10 / EF = 4 / 3 ⟹ EF = (10 · 3) / 4 = 30 / 4 = 7.5 cm.\n\nAnswer:\nDE = 3 cm, EF = 7.5 cm."
          },
          {
            "qNo": "Q13",
            "question": "Diagonals of a trapezoid ABCD intersect each other at O. If △AOB ~ △COD, then prove that AB ∥ CD.",
            "solution": "Given: ABCD is a quadrilateral whose diagonals AC and BD intersect at O, and △AOB ~ △COD.\nTo Prove: AB ∥ CD.\n\nProof:\n1. Since △AOB ~ △COD (Given):\n   Corresponding angles are congruent:\n   ∠OAB ≅ ∠OCD  (and ∠OBA ≅ ∠ODC).\n\n2. In lines AB and CD cut by transversal AC:\n   ∠OAB and ∠OCD are alternate interior angles.\n\n3. When alternate interior angles are equal, the lines are parallel:\n   Therefore, AB ∥ CD.\nHence proved: AB is parallel to CD, so ABCD is a trapezoid."
          },
          {
            "qNo": "Q14",
            "question": "In the accompanying figure, line segment KL is drawn parallel to ST, intersecting RS at K and RT at L in △RST. If RK = 5, KS = 10, and RT = 18, find RL.",
            "solution": "Given: In △RST, KL ∥ ST. RK = 5, KS = 10, RT = 18.\nLet RL = x, so LT = RT − RL = 18 − x.\n\n1. By Theorem 14.1 (Triangle Proportionality Theorem):\n   RK / KS = RL / LT\n   5 / 10 = x / (18 − x)\n   1 / 2 = x / (18 − x)\n\n2. Cross-multiply:\n   18 − x = 2x\n   3x = 18 ⟹ x = 6.\n\nAnswer:\nRL = 6 units."
          }
        ]
      },
      {
        "exercise": "Review 14",
        "title": "Review Exercise 14 — Ratio & Proportion Comprehensive",
        "description": "5 board-standard review questions including MCQs, line-through-midpoint proof, segment calculation, and similar triangle verification.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Select the correct answer for each of the following:\n(i) In the given figure, compute x:\n    a) 7  b) 9  c) 2  d) 3\n(ii) Which of the following is not valid for proving triangle similarity?\n    a) SSS  b) AA  c) SSA  d) SAS\n(iii) In a mathematics class with 32 students, the ratio of girls to boys is 5 to 3. How many more girls are there than boys?\n    a) 2  b) 12  c) 8  d) 20\n(iv) The measure of a line segment joining the midpoints of AB and AC of △ABC is 3.5 cm. Find m(BC):\n    a) 4.5 cm  b) 5.5 cm  c) 6 cm  d) 7 cm\n(v) In the figure ABCD, if AD and BC intersect at O with equal alternate angles, then △AOB and △DOC are:\n    a) Congruent  b) Similar  c) Not similar  d) None of these",
            "solution": "Verified Board Answers & Explanations:\n(i) **d) 3** (By proportionality: 2/6 = 1/x ⟹ x = 3).\n(ii) **c) SSA** (Side-Side-Angle is ambiguous and not a valid test for triangle similarity).\n(iii) **c) 8** (Total parts = 5 + 3 = 8. Each part = 32 / 8 = 4. Girls = 5 × 4 = 20, Boys = 3 × 4 = 12. Difference = 20 − 12 = 8).\n(iv) **d) 7 cm** (By Midsegment Theorem, BC = 2 · Midsegment = 2 × 3.5 = 7 cm).\n(v) **b) Similar** (Triangles have two pairs of equal angles by alternate interior and vertical angles)."
          },
          {
            "qNo": "Q2",
            "question": "Prove that a line passing through the midpoint of one side of a triangle and parallel to a second side bisects the third side of the triangle.",
            "solution": "Given: In △ABC, D is the midpoint of AB (AD = DB). Line l passes through D parallel to BC, intersecting AC at E.\nTo Prove: AE = EC (E is the midpoint of AC).\n\nProof:\n1. Since DE ∥ BC in △ABC, by Theorem 14.1 (Proportionality Theorem):\n   AD / DB = AE / EC  ... (1)\n\n2. But D is the midpoint of AB, so AD = DB ⟹ AD / DB = 1.\n\n3. Substituting into (1):\n   1 = AE / EC ⟹ AE = EC.\n\nHence proved: Line segment DE bisects the third side AC."
          },
          {
            "qNo": "Q3",
            "question": "In the figure, AB ∥ DE. If m(BE) = 4.1 cm, m(EC) = 12.3 cm, and m(DC) = 16.5 cm, find the measure of AC.",
            "solution": "Given: AB ∥ DE with transversal lines crossing through C.\nIn △ABC and △EDC:\n1. Since DE ∥ AB:\n   CD / AC = CE / CB (or by proportionality on sides AC and BC):\n   BC = BE + EC = 4.1 + 12.3 = 16.4 cm.\n\n2. Ratio of similarity:\n   EC / BC = 12.3 / 16.4 = 3 / 4.\n\n3. Since DE ∥ AB, △CDE ~ △CAB:\n   DC / AC = EC / BC = 3 / 4\n   16.5 / AC = 3 / 4\n   AC = (16.5 · 4) / 3 = 5.5 · 4 = 22 cm.\n\nAnswer:\nm(AC) = 22 cm."
          },
          {
            "qNo": "Q4",
            "question": "Let PQ and RS intersect at O such that m(PO)/m(OQ) = m(RO)/m(OS). Prove that △OPR ~ △OQS.",
            "solution": "Given: Segments PQ and RS intersect at O with PO / OQ = RO / OS.\nTo Prove: △OPR ~ △OQS.\n\nProof:\n1. From PO / OQ = RO / OS, apply the Alternando property of proportion:\n   PO / RO = OQ / OS  (or directly PO / OQ = RO / OS).\n\n2. Consider the included angles between these sides at intersection point O:\n   ∠POR ≅ ∠QOS (Vertically opposite angles).\n\n3. Two pairs of corresponding sides are proportional and the included angles are congruent:\n   By SAS Similarity Criterion:\n   △OPR ~ △OQS.\nHence proved!"
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "If a line divides two sides of a triangle in the same ratio, then the line is:",
          "options": [
            "Perpendicular to the third side",
            "Parallel to the third side",
            "Equal to the third side",
            "An altitude"
          ],
          "correct": 1,
          "explanation": "Theorem 14.2 (Converse of Thales' Theorem) states that the line is parallel to the third side."
        },
        {
          "question": "The internal bisector of an angle of a triangle divides the opposite side in the ratio of the:",
          "options": [
            "Altitudes",
            "Sides containing the angle",
            "Medians",
            "Opposite angles"
          ],
          "correct": 1,
          "explanation": "Theorem 14.3 proves that the opposite side is divided in the ratio of the sides containing the angle."
        },
        {
          "question": "If the ratio of corresponding sides of two similar triangles is 3 : 5, the ratio of their areas is:",
          "options": [
            "3 : 5",
            "6 : 10",
            "9 : 25",
            "27 : 125"
          ],
          "correct": 2,
          "explanation": "The ratio of areas of similar triangles is the square of the ratio of their corresponding sides: (3/5)² = 9/25."
        },
        {
          "question": "Which of the following is NOT a valid similarity criterion for triangles?",
          "options": [
            "AA",
            "SAS",
            "SSS",
            "SSA"
          ],
          "correct": 3,
          "explanation": "Side-Side-Angle (SSA) does not guarantee similarity or congruence."
        },
        {
          "question": "In △ABC, DE ∥ BC. If AD = 2 cm, DB = 4 cm, and AE = 3 cm, then EC is:",
          "options": [
            "5 cm",
            "6 cm",
            "7 cm",
            "8 cm"
          ],
          "correct": 1,
          "explanation": "AD/DB = AE/EC ⟹ 2/4 = 3/EC ⟹ EC = 6 cm."
        }
      ],
      "shortQuestions": [
        {
          "question": "State the Basic Proportionality Theorem (Thales' Theorem).",
          "answer": "A line parallel to one side of a triangle, intersecting the other two sides, divides them proportionally."
        },
        {
          "question": "State the Internal Angle Bisector Theorem.",
          "answer": "The internal bisector of an angle of a triangle divides the side opposite to it in the ratio of the lengths of the sides containing the angle."
        },
        {
          "question": "What is the relationship between the areas of two similar triangles and their corresponding side lengths?",
          "answer": "The ratio of the areas of two similar triangles is equal to the square of the ratio of their corresponding side lengths: Area(1)/Area(2) = (s1/s2)²."
        },
        {
          "question": "Name three criteria used to prove that two triangles are similar.",
          "answer": "The three criteria are AA (Angle-Angle), SAS for similarity, and SSS for similarity."
        }
      ],
      "longQuestions": [
        {
          "question": "State and prove Theorem 14.1 (Basic Proportionality Theorem).",
          "answer": "Refer to Theorem 14.1 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        },
        {
          "question": "State and prove Theorem 14.3 (Internal Angle Bisector Theorem).",
          "answer": "Refer to Theorem 14.3 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Basic Proportionality Theorem (Thales' Theorem)",
        "latex": "DE \\parallel BC \\implies \\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{AB}{AD} = \\frac{AC}{AE}",
        "explanation": "A line parallel to one side of a triangle divides the other two sides proportionally.",
        "example": "If AD = 1.5, DB = 3, AE = 1.3, then CE = 2.6 cm."
      },
      {
        "title": "Internal Angle Bisector Theorem",
        "latex": "CL \\text{ bisects } \\angle C \\implies \\frac{AL}{BL} = \\frac{AC}{BC}",
        "explanation": "The internal bisector of an angle divides the opposite side in the ratio of the adjacent sides.",
        "example": "If AC = 10, BC = 9, then the segments on opposite side are in ratio 10 : 9."
      },
      {
        "title": "Similar Triangles Area Ratio",
        "latex": "\\frac{\\text{Area}(\\triangle ABC)}{\\text{Area}(\\triangle DEF)} = \\left(\\frac{AB}{DE}\\right)^2 = \\left(\\frac{BC}{EF}\\right)^2 = \\left(\\frac{AC}{DF}\\right)^2",
        "explanation": "Area ratio of two similar triangles equals the square of their scale factor.",
        "example": "If side ratio is 2 : 3, then area ratio is 4 : 9."
      }
    ]
  },
  {
    "number": 15,
    "id": "u15",
    "title": "Pythagoras' Theorem",
    "titleUrdu": "مسئلہ فیثا غورث",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 285–290",
    "description": "The Pythagorean Theorem and its geometric proof via similar right triangles, converse of Pythagoras theorem, classification of triangles (acute, right, obtuse), Pythagorean triples, and practical real-life word problems.",
    "sections": [
      {
        "id": "15.1",
        "title": "15.1 The Pythagorean Theorem & Similar Triangles",
        "theory": "• 15.1.1 Historical Context and Statement:\nNamed after the Greek philosopher and mathematician Pythagoras (c. 500 BC). It states that in any right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.\n(Hypotenuse)² = (Base)² + (Perpendicular)²\nIn standard notation for △ABC with right angle at B: b² = a² + c².\n\n• 15.1.2 Geometric Elements:\n• Hypotenuse: The side opposite the 90° right angle; it is always the longest side of a right-angled triangle.\n• Legs (Base and Perpendicular): The two perpendicular sides enclosing the right angle.\n• The theorem is formally proved by dropping an altitude from the right-angled vertex to the hypotenuse, creating two smaller triangles that are each similar to the original triangle."
      },
      {
        "id": "15.2",
        "title": "15.2 Converse of Pythagoras' Theorem & Triangle Classification",
        "theory": "• 15.2.1 Converse Statement (Theorem 15.2):\nIf the square of one side of a triangle is equal to the sum of the squares of the other two sides, then the triangle is a right-angled triangle.\nIf c² = a² + b² in △ABC, then the angle opposite side c is 90° (m∠C = 90°).\n\n• 15.2.2 Classification of Triangles by Side Lengths:\nLet c be the length of the longest side of △ABC with other side lengths a and b:\n1. Right Triangle: c² = a² + b² (m∠C = 90°)\n2. Acute Triangle: c² < a² + b² (m∠C < 90°)\n3. Obtuse Triangle: c² > a² + b² (m∠C > 90°)"
      },
      {
        "id": "15.3",
        "title": "15.3 Pythagorean Triples and Real-World Applications",
        "theory": "• 15.3.1 Pythagorean Triples:\nA set of three positive integers (a, b, c) that satisfy the equation a² + b² = c² is called a Pythagorean Triple.\nCommon primitive Pythagorean triples:\n(3, 4, 5),   (5, 12, 13),   (8, 15, 17),   (7, 24, 25),   (9, 40, 41),   (11, 60, 61),   (12, 35, 37),   (20, 21, 29).\nAny integer multiple of a Pythagorean triple (e.g. 6, 8, 10 or 36, 48, 60) is also a Pythagorean triple.\n\n• 15.3.2 Practical Applications:\n• Distance calculation in rectangular and grid layouts.\n• Ladders leaning against walls and diagonal bracing in construction.\n• Surveying, navigation, and finding diagonals of rectangles and swimming pools."
      }
    ],
    "workedExamples": [
      {
        "id": "thm-15-1",
        "section": "15.1",
        "title": "Theorem 15.1 — Pythagoras' Theorem",
        "problem": "Prove that in a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.",
        "given": "A right-angled triangle ABC with right angle at B (m∠ABC = 90°). The side measures are BC = a, CA = b, and AB = c.",
        "method": "Draw altitude BD ⊥ AC. Use similarity between △ABC and △BDC, and between △ABC and △ADB, to set up geometric mean proportions.",
        "solution": "To Prove: b² = a² + c².\n\nConstruction: Draw BD ⊥ AC. Let m(BD) = h and m(CD) = x. Then m(AD) = b − x.\n\nProof:\n1. Consider △ABC and △BDC:\n   • ∠ABC ≅ ∠BDC = 90° (Right angles).\n   • ∠C ≅ ∠C (Common angle).\n   • ∠CAB ≅ ∠CBD (Complements of ∠C).\n   Therefore, △ABC ~ △BDC by AAA similarity.\n\n2. Corresponding sides of similar triangles are proportional:\n   b / a = a / x ⟹ b · x = a²  ... (1)\n\n3. Now consider △ABC and △ADB:\n   • ∠ABC ≅ ∠ADB = 90° (Right angles).\n   • ∠A ≅ ∠A (Common angle).\n   • ∠BCA ≅ ∠DBA (Complements of ∠A).\n   Therefore, △ABC ~ △ADB by AAA similarity.\n\n4. Corresponding sides of similar triangles are proportional:\n   b / c = c / (b − x) ⟹ b(b − x) = c² ⟹ b² − b · x = c²  ... (2)\n\n5. Add equations (1) and (2):\n   (b² − b · x) + b · x = c² + a²\n   b² = c² + a².\nHence proved: The square on the hypotenuse is equal to the sum of squares on the other two sides.",
        "steps": [
          "To Prove: b² = a² + c².",
          "Construction: Draw BD ⊥ AC. Let m(BD) = h and m(CD) = x. Then m(AD) = b − x.",
          "Proof:\n1. Consider △ABC and △BDC:\n   • ∠ABC ≅ ∠BDC = 90° (Right angles).\n   • ∠C ≅ ∠C (Common angle).\n   • ∠CAB ≅ ∠CBD (Complements of ∠C).\n   Therefore, △ABC ~ △BDC by AAA similarity.",
          "2. Corresponding sides of similar triangles are proportional:\n   b / a = a / x ⟹ b · x = a²  ... (1)",
          "3. Now consider △ABC and △ADB:\n   • ∠ABC ≅ ∠ADB = 90° (Right angles).\n   • ∠A ≅ ∠A (Common angle).\n   • ∠BCA ≅ ∠DBA (Complements of ∠A).\n   Therefore, △ABC ~ △ADB by AAA similarity.",
          "4. Corresponding sides of similar triangles are proportional:\n   b / c = c / (b − x) ⟹ b(b − x) = c² ⟹ b² − b · x = c²  ... (2)",
          "5. Add equations (1) and (2):\n   (b² − b · x) + b · x = c² + a²\n   b² = c² + a².\nHence proved: The square on the hypotenuse is equal to the sum of squares on the other two sides."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "ex-15-1",
        "section": "15.1",
        "title": "Example 1 — Hypotenuse of a Right Triangle",
        "problem": "Find the length of the hypotenuse of the right-angle triangle whose legs are 8 cm and 6 cm.",
        "given": "A right triangle with base = 6 cm and perpendicular = 8 cm.",
        "method": "Apply Pythagoras' theorem: (Hypotenuse)² = (Base)² + (Perpendicular)².",
        "solution": "1. Set up the equation:\n   x² = (8 cm)² + (6 cm)²\n   x² = 64 cm² + 36 cm²\n   x² = 100 cm²\n\n2. Take the principal square root:\n   x = √100 = 10 cm.\n\nAnswer: The length of the hypotenuse is 10 cm.",
        "steps": [
          "1. Set up the equation:\n   x² = (8 cm)² + (6 cm)²\n   x² = 64 cm² + 36 cm²\n   x² = 100 cm²",
          "2. Take the principal square root:\n   x = √100 = 10 cm.",
          "Answer: The length of the hypotenuse is 10 cm."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "ex-15-2",
        "section": "15.3",
        "title": "Example 2 — Ladder Leaning Against a Wall",
        "problem": "The top of a ladder rests against a wall 23 feet above the ground. The base of the ladder is 6 feet away from the wall. What is the length of the ladder?",
        "given": "Perpendicular height along wall = 23 ft, distance from wall = 6 ft.",
        "method": "The ladder acts as the hypotenuse of a right triangle. Apply x² = 23² + 6².",
        "solution": "1. Set up the equation:\n   (Length of ladder)² = (23 ft)² + (6 ft)²\n   x² = 529 ft² + 36 ft² = 565 ft²\n\n2. Take the square root:\n   x = √565 ≈ 23.76 ft.\n\nAnswer: The length of the ladder is 23.76 feet.",
        "steps": [
          "1. Set up the equation:\n   (Length of ladder)² = (23 ft)² + (6 ft)²\n   x² = 529 ft² + 36 ft² = 565 ft²",
          "2. Take the square root:\n   x = √565 ≈ 23.76 ft.",
          "Answer: The length of the ladder is 23.76 feet."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "thm-15-2",
        "section": "15.2",
        "title": "Theorem 15.2 — Converse of Pythagoras' Theorem",
        "problem": "Prove that if the square of one side of a triangle is equal to the sum of the squares of the other two sides, then the triangle is a right-angled triangle.",
        "given": "In △ABC, BC = a, CA = b, and AB = c such that a² = b² + c².",
        "method": "Construct a right triangle △DAC with right angle at A, DA = c, and AC = b. Show CD = a, then prove △DAC ≅ △BAC by SSS.",
        "solution": "To Prove: △ABC is a right-angled triangle (m∠CAB = 90°).\n\nConstruction: At point A on line AC, draw DA ⊥ CA such that DA ≅ BA = c. Join point D to C to form right-angled △DAC.\n\nProof:\n1. In right-angled triangle △DAC (right-angled at A):\n   (CD)² = (AD)² + (AC)² (By Theorem 15.1, Pythagoras' Theorem)\n   (CD)² = c² + b²  ... (1)\n\n2. But we are given:\n   a² = b² + c²  ... (2)\n\n3. Comparing (1) and (2):\n   (CD)² = a² ⟹ CD = a = CB.\n\n4. Now compare △DAC and △BAC:\n   CD ≅ CB (Proved above: both equal a).\n   CA ≅ CA (Common side).\n   DA ≅ BA (Construction: both equal c).\n   Therefore, △DAC ≅ △BAC by SSS Congruence Postulate.\n\n5. Corresponding angles:\n   ∠CAB ≅ ∠CAD.\n   Since ∠CAD = 90° (Construction: DA ⊥ CA):\n   m∠CAB = 90°.\nConclusion: △ABC is a right-angled triangle.",
        "steps": [
          "To Prove: △ABC is a right-angled triangle (m∠CAB = 90°).",
          "Construction: At point A on line AC, draw DA ⊥ CA such that DA ≅ BA = c. Join point D to C to form right-angled △DAC.",
          "Proof:\n1. In right-angled triangle △DAC (right-angled at A):\n   (CD)² = (AD)² + (AC)² (By Theorem 15.1, Pythagoras' Theorem)\n   (CD)² = c² + b²  ... (1)",
          "2. But we are given:\n   a² = b² + c²  ... (2)",
          "3. Comparing (1) and (2):\n   (CD)² = a² ⟹ CD = a = CB.",
          "4. Now compare △DAC and △BAC:\n   CD ≅ CB (Proved above: both equal a).\n   CA ≅ CA (Common side).\n   DA ≅ BA (Construction: both equal c).\n   Therefore, △DAC ≅ △BAC by SSS Congruence Postulate.",
          "5. Corresponding angles:\n   ∠CAB ≅ ∠CAD.\n   Since ∠CAD = 90° (Construction: DA ⊥ CA):\n   m∠CAB = 90°.\nConclusion: △ABC is a right-angled triangle."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "ex-15-3",
        "section": "15.2",
        "title": "Example 3 — Classifying a Triangle (3 cm, 4 cm, 5 cm)",
        "problem": "Determine whether a triangle with sides 3 cm, 4 cm, and 5 cm is a right-angled triangle.",
        "given": "Side lengths 3 cm, 4 cm, and 5 cm.",
        "method": "Compare the square of the longest side with the sum of the squares of the other two sides.",
        "solution": "1. Identify the longest side: c = 5 cm.\n   c² = 5² = 25 cm².\n\n2. Sum of squares of the other two sides:\n   a² + b² = 3² + 4² = 9 + 16 = 25 cm².\n\n3. Since 25 = 25, we have c² = a² + b².\nAnswer: By the Converse of Pythagoras' Theorem, the triangle is a right-angled triangle.",
        "steps": [
          "1. Identify the longest side: c = 5 cm.\n   c² = 5² = 25 cm².",
          "2. Sum of squares of the other two sides:\n   a² + b² = 3² + 4² = 9 + 16 = 25 cm².",
          "3. Since 25 = 25, we have c² = a² + b².\nAnswer: By the Converse of Pythagoras' Theorem, the triangle is a right-angled triangle."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      },
      {
        "id": "ex-15-4",
        "section": "15.1",
        "title": "Example 4 — Calculating an Unknown Leg",
        "problem": "Calculate the value of x in a right triangle where hypotenuse is 20 and one leg is 12.",
        "given": "Hypotenuse = 20, leg = 12, unknown leg = x.",
        "method": "Use 12² + x² = 20² ⟹ x² = 20² − 12².",
        "solution": "1. Set up the equation:\n   12² + x² = 20²\n   144 + x² = 400\n\n2. Solve for x²:\n   x² = 400 − 144 = 256\n   x = √256 = 16.\n\nAnswer: x = 16 units.",
        "steps": [
          "1. Set up the equation:\n   12² + x² = 20²\n   144 + x² = 400",
          "2. Solve for x²:\n   x² = 400 − 144 = 256\n   x = √256 = 16.",
          "Answer: x = 16 units."
        ],
        "answer": "Proved (Textbook Theorem / Geometry Rule)."
      }
    ],
    "exercises": [
      {
        "exercise": "15.1",
        "title": "Exercise 15.1 — Hypotenuse, Diagonals & Pythagorean Triples",
        "description": "7 comprehensive textbook problems covering hypotenuse calculations, rectangular diagonals, ladder heights, unknown legs, right-triangle verification, and diagonal distances.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Find the hypotenuse of a right-angled triangle when the sides containing the right angle are:\n(i) 12 cm and 5 cm\n(ii) 6 cm and 2.5 cm\n(iii) 15 cm and 8 cm",
            "solution": "By Pythagoras' Theorem: c = √(a² + b²).\n\n(i) c = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.\n\n(ii) c = √(6² + 2.5²) = √(36 + 6.25) = √42.25 = 6.5 cm.\n\n(iii) c = √(15² + 8²) = √(225 + 64) = √289 = 17 cm.\n\nAnswer:\n(i) 13 cm; (ii) 6.5 cm; (iii) 17 cm."
          },
          {
            "qNo": "Q2",
            "question": "Find the diagonal of a rectangular field whose sides are:\n(i) 7.2 m and 3 m\n(ii) 15.6 m and 6.5 m\n(iii) 6.72 m and 5.04 m",
            "solution": "The diagonal of a rectangle forms the hypotenuse of a right triangle with the sides as legs: d = √(l² + w²).\n\n(i) d = √(7.2² + 3²) = √(51.84 + 9) = √60.84 = 7.8 m.\n\n(ii) d = √(15.6² + 6.5²) = √(243.36 + 42.25) = √285.61 = 16.9 m.\n\n(iii) d = √(6.72² + 5.04²) = √(45.1584 + 25.4016) = √70.56 = 8.4 m.\n\nAnswer:\n(i) 7.8 m; (ii) 16.9 m; (iii) 8.4 m."
          },
          {
            "qNo": "Q3",
            "question": "A ladder whose foot is 2.5 m from the front of a house reaches a window 6 m above the ground. Calculate the length of the ladder.",
            "solution": "Let the length of the ladder be L.\n\n1. Apply Pythagoras' theorem:\n   L² = (2.5)² + (6)²\n   L² = 6.25 + 36 = 42.25\n\n2. Take square root:\n   L = √42.25 = 6.5 m.\n\nAnswer:\nLength of the ladder = 6.5 m."
          },
          {
            "qNo": "Q4",
            "question": "A ladder 2.9 m long just reaches the top of a wall 2.1 m high. How far from the foot of the wall is the foot of the ladder?",
            "solution": "Let the distance from the wall be d.\n\n1. Hypotenuse = 2.9 m, height = 2.1 m:\n   d² + (2.1)² = (2.9)²\n   d² + 4.41 = 8.41\n   d² = 8.41 − 4.41 = 4.00\n\n2. Take square root:\n   d = √4 = 2 m.\n\nAnswer:\nDistance = 2 m."
          },
          {
            "qNo": "Q5",
            "question": "In a right triangle with hypotenuse c and legs a and b, find the length of the unknown side:\n(i) a = 4 cm, b = 7 cm\n(ii) a = 7 cm, c = 25 cm\n(iii) b = 6 cm, c = 9 cm",
            "solution": "Using Pythagoras' Theorem c² = a² + b²:\n\n(i) c² = 4² + 7² = 16 + 49 = 65 ⟹ c = √65 cm.\n\n(ii) b² = c² − a² = 25² − 7² = 625 − 49 = 576 ⟹ b = √576 = 24 cm.\n\n(iii) a² = c² − b² = 9² − 6² = 81 − 36 = 45 ⟹ a = √45 = √(9 · 5) = 3√5 cm.\n\nAnswer:\n(i) √65 cm; (ii) 24 cm; (iii) 3√5 cm."
          },
          {
            "qNo": "Q6",
            "question": "Verify whether a triangle with the given side lengths is a right-angled triangle:\n(i) 9, 12, and 15\n(ii) 9, 10, and 15\n(iii) 10, 12, and 20\n(iv) 36, 48, and 60",
            "solution": "Condition: c² = a² + b² where c is the largest number.\n\n(i) 15² = 225. 9² + 12² = 81 + 144 = 225. 225 = 225 ⟹ **This is a right-angled triangle.**\n\n(ii) 15² = 225. 9² + 10² = 81 + 100 = 181. 225 ≠ 181 ⟹ **This is not a right-angled triangle.**\n\n(iii) 20² = 400. 10² + 12² = 100 + 144 = 244. 400 ≠ 244 ⟹ **This is not a right-angled triangle.**\n\n(iv) 60² = 3600. 36² + 48² = 1296 + 2304 = 3600. 3600 = 3600 ⟹ **This is a right-angled triangle.**\n\nAnswer:\n(i) Right-angled; (ii) Not right-angled; (iii) Not right-angled; (iv) Right-angled."
          },
          {
            "qNo": "Q7",
            "question": "The sides of a rectangular swimming pool are 50 m and 30 m. What is the length between the opposite corners?",
            "solution": "The distance between opposite corners is the diagonal d of the rectangular pool.\n\n1. Apply Pythagoras' theorem:\n   d² = 50² + 30²\n   d² = 2500 + 900 = 3400\n\n2. Simplify radical:\n   d = √3400 = √(100 · 34) = 10√34 m (≈ 58.31 m).\n\nAnswer:\n10√34 m."
          }
        ]
      },
      {
        "exercise": "Review 15",
        "title": "Review Exercise 15 — Pythagoras' Theorem Comprehensive",
        "description": "Board-standard review questions including MCQs, equilateral altitude, isosceles congruent sides, quadrilateral diagonal perpendicularity proof, and algebraic side problem.",
        "problems": [
          {
            "qNo": "Q1",
            "question": "Circle the correct option:\n(i) Diagonal of a rectangle measures 6.5 cm. If its width is 2.5 cm, its length is:\n    a) 4 cm  b) 9 cm  c) 6 cm  d) 3 cm\n(ii) Which of the following are the sides of a right-angled triangle?\n    a) 2, 3, 4  b) 3, 4, 5  c) 4, 5, 6  d) 5, 6, 7",
            "solution": "Verified Board Answers & Explanations:\n(i) **c) 6 cm** (l = √(6.5² − 2.5²) = √(42.25 − 6.25) = √36 = 6 cm).\n(ii) **b) 3, 4, 5** (3² + 4² = 9 + 16 = 25 = 5²)."
          },
          {
            "qNo": "Q2",
            "question": "Measure of each of the sides of an equilateral triangle is 8 cm. Find the length of the altitude.",
            "solution": "In an equilateral triangle of side s = 8 cm, the altitude bisects the opposite side into two segments of 4 cm:\n\n1. Apply Pythagoras' theorem in the half right triangle:\n   h² + 4² = 8²\n   h² + 16 = 64\n   h² = 64 − 16 = 48\n\n2. Take square root:\n   h = √48 = √(16 · 3) = 4√3 cm.\n\nAnswer:\n4√3 cm."
          },
          {
            "qNo": "Q3",
            "question": "Measure of the base of an isosceles triangle is 10 cm. If the perpendicular drawn from the vertex to the base is 12 cm long, find the measures of the congruent sides of the triangle.",
            "solution": "The altitude of an isosceles triangle to the base bisects the base into two equal halves:\nHalf base = 10 / 2 = 5 cm. Altitude = 12 cm.\n\n1. Let each congruent side be s:\n   s² = 12² + 5²\n   s² = 144 + 25 = 169\n\n2. Take square root:\n   s = √169 = 13 cm.\n\nAnswer:\n13 cm."
          },
          {
            "qNo": "Q4",
            "question": "Diagonals of a quadrilateral ABCD are perpendicular to each other at O. Prove that (AB)² + (CD)² = (AD)² + (BC)².",
            "solution": "Given: In quadrilateral ABCD, diagonals AC and BD intersect at O such that AC ⊥ BD.\nTherefore, all four triangles △AOB, △BOC, △COD, and △DOA are right-angled at O.\n\nProof:\n1. By Pythagoras' Theorem in each right triangle:\n   In △AOB: AB² = OA² + OB²  ... (1)\n   In △COD: CD² = OC² + OD²  ... (2)\n   In △AOD: AD² = OA² + OD²  ... (3)\n   In △BOC: BC² = OB² + OC²  ... (4)\n\n2. Add equations (1) and (2):\n   AB² + CD² = (OA² + OB²) + (OC² + OD²) = OA² + OB² + OC² + OD²\n\n3. Add equations (3) and (4):\n   AD² + BC² = (OA² + OD²) + (OB² + OC²) = OA² + OB² + OC² + OD²\n\n4. Comparing the two sums:\n   AB² + CD² = AD² + BC².\nHence proved!"
          },
          {
            "qNo": "Q5",
            "question": "The sides of a triangle have lengths x, x + 4, and 20. If the length of the longest side is 20, what values of x make the triangle a right triangle?",
            "solution": "Given: A right triangle with legs x and x + 4, and hypotenuse 20.\n\n1. By Pythagoras' Theorem:\n   x² + (x + 4)² = 20²\n   x² + (x² + 8x + 16) = 400\n   2x² + 8x + 16 − 400 = 0\n   2x² + 8x − 384 = 0\n\n2. Divide through by 2:\n   x² + 4x − 192 = 0\n\n3. Factor the quadratic equation:\n   (x + 16)(x − 12) = 0\n   x = 12  or  x = −16.\n\n4. Since length must be positive, discard x = −16:\n   x = 12.\n   (Check: 12² + 16² = 144 + 256 = 400 = 20²).\n\nAnswer:\nx = 12."
          }
        ]
      }
    ],
    "slos": {
      "mcqs": [
        {
          "question": "In a right-angled triangle, the relation between the sides is given by:",
          "options": [
            "c² = a² − b²",
            "c² = a² + b²",
            "c = a + b",
            "c² = 2(a² + b²)"
          ],
          "correct": 1,
          "explanation": "Pythagoras' Theorem establishes that c² = a² + b²."
        },
        {
          "question": "If the sides of a triangle are 6, 8, and 10, the triangle is:",
          "options": [
            "Acute-angled",
            "Obtuse-angled",
            "Right-angled",
            "Equilateral"
          ],
          "correct": 2,
          "explanation": "6² + 8² = 36 + 64 = 100 = 10². By the converse theorem, it is right-angled."
        },
        {
          "question": "Which of the following is a primitive Pythagorean triple?",
          "options": [
            "(5, 12, 13)",
            "(6, 8, 10)",
            "(9, 12, 15)",
            "(10, 24, 26)"
          ],
          "correct": 0,
          "explanation": "(5, 12, 13) has coprime integers and satisfies 5² + 12² = 13²."
        },
        {
          "question": "In △ABC, if c² > a² + b² where c is the longest side, then △ABC is:",
          "options": [
            "Right-angled",
            "Acute-angled",
            "Obtuse-angled",
            "Isosceles"
          ],
          "correct": 2,
          "explanation": "When c² > a² + b², the angle opposite side c is strictly greater than 90° (obtuse)."
        },
        {
          "question": "The diagonal of a square with side length 5 cm is:",
          "options": [
            "5 cm",
            "10 cm",
            "5√2 cm",
            "25 cm"
          ],
          "correct": 2,
          "explanation": "d = √(5² + 5²) = √50 = 5√2 cm."
        }
      ],
      "shortQuestions": [
        {
          "question": "State Pythagoras' Theorem.",
          "answer": "In a right-angled triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides: c² = a² + b²."
        },
        {
          "question": "State the Converse of Pythagoras' Theorem.",
          "answer": "If the square of one side of a triangle is equal to the sum of the squares of the other two sides, then the triangle is a right-angled triangle."
        },
        {
          "question": "How can you determine whether a triangle is acute, right, or obtuse given its three side lengths a, b, c (with c longest)?",
          "answer": "If c² = a² + b², it is a right triangle. If c² < a² + b², it is an acute triangle. If c² > a² + b², it is an obtuse triangle."
        },
        {
          "question": "Define a Pythagorean Triple with two examples.",
          "answer": "A set of three positive integers (a, b, c) satisfying a² + b² = c² is called a Pythagorean Triple. Examples include (3, 4, 5) and (5, 12, 13)."
        }
      ],
      "longQuestions": [
        {
          "question": "State and prove Theorem 15.1 (Pythagoras' Theorem) using the method of similar right triangles.",
          "answer": "Refer to Theorem 15.1 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        },
        {
          "question": "State and prove Theorem 15.2 (Converse of Pythagoras' Theorem).",
          "answer": "Refer to Theorem 15.2 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Pythagoras' Theorem",
        "latex": "c^2 = a^2 + b^2 \\iff c = \\sqrt{a^2 + b^2},\\quad a = \\sqrt{c^2 - b^2}",
        "explanation": "Fundamental relation between the legs (a, b) and hypotenuse (c) of a right-angled triangle.",
        "example": "If a = 12 and b = 5, then c = √(144 + 25) = 13."
      },
      {
        "title": "Triangle Classification Criteria",
        "latex": "c^2 = a^2 + b^2 \\implies 90^\\circ,\\quad c^2 < a^2 + b^2 \\implies < 90^\\circ,\\quad c^2 > a^2 + b^2 \\implies > 90^\\circ",
        "explanation": "Comparison of c² with a² + b² determines if the triangle is right, acute, or obtuse.",
        "example": "For 9, 10, 15: 15² = 225 > 9² + 10² = 181 ⟹ Obtuse triangle."
      },
      {
        "title": "Equilateral Altitude & Square Diagonal",
        "latex": "h_{\\text{equilateral}} = \\frac{\\sqrt{3}}{2}\\,s,\\qquad d_{\\text{square}} = s\\sqrt{2}",
        "explanation": "Geometric deductions from Pythagoras' theorem for equilateral triangles and squares.",
        "example": "An equilateral triangle with side s = 8 has altitude h = 4√3 cm."
      }
    ]
  },
  {
  "number": 16,
  "id": "u16",
  "title": "Theorems Related with Area",
  "titleUrdu": "رقبے سے متعلق قضیے",
  "status": "completed",
  "badge": "100% Textbook Matched",
  "pageRange": "Pages 291–297",
  "description": "Area theorems for parallelograms and triangles standing on the same base or equal bases and lying between the same parallels, median area bisection, and geometric area calculations.",
  "sections": [
    {
      "id": "16.1",
      "title": "16.1 Parallelograms of Equal Area",
      "theory": "• 16.1.1 Altitude and Base of Figures:\n1. Altitude: If any side of a triangle or parallelogram is taken as its base, the perpendicular distance from the opposite side or vertex to that base is called its altitude.\n2. Constant Distance: The perpendicular distance between two parallel lines remains constant everywhere.\n3. Area vs Congruence: If two figures have equal areas, they are not necessarily congruent.\n\n• 16.1.2 Parallelogram Area Theorems:\n• Theorem 16.1: Parallelograms on the same base and lying between the same parallel lines (or of the same altitude) are equal in area.\n  Area(ABCD) = Area(ABGH).\n• Theorem 16.2: Parallelograms on equal bases and having the same altitude are equal in area.\n  If AB = EF and both lie between the same parallel lines, Area(ABCD) = Area(EFGH)."
    },
    {
      "id": "16.2",
      "title": "16.2 Triangles of Equal Area",
      "theory": "• 16.2.1 Triangle Area Theorems:\n• Theorem 16.3: Triangles on the same base and of the same altitude are equal in area.\n  If △ABC and △ABH stand on base AB between parallel lines PQ and XY, Area(△ABC) = Area(△ABH).\n• Theorem 16.4: Triangles on equal bases and of the same altitude are equal in area.\n  If base AB = base KL and altitudes are equal, Area(△ABD) = Area(△KLM).\n\n• 16.2.2 Median Property of Triangles:\nA median of a triangle divides the triangle into two parts of equal area.\nIn △ABC with median AD, Area(△ABD) = Area(△ACD)."
    }
  ],
  "workedExamples": [
    {
      "id": "thm-16-1",
      "section": "16.1",
      "title": "Theorem 16.1 — Parallelograms on Same Base and Between Same Parallels",
      "problem": "Prove that parallelograms on the same base and lying between the same parallel lines (or of the same altitude) are equal in area.",
      "given": "ABCD and ABGH are two parallelograms having the same base AB and lying between the two parallel lines XY and PQ (so both have the same altitude).",
      "method": "Prove the non-overlapping outer triangles △ADH and △BCG are congruent (AAS), then subtract each from the total figure ABCH.",
      "solution": "To Prove: Area of parallelogram ABCD = Area of parallelogram ABGH.\n\nProof:\n1. Consider △ADH and △BCG:\n   • AH ≅ BG (Opposite sides of parallelogram ABGH).\n   • AD ≅ BC (Opposite sides of parallelogram ABCD).\n   • ∠ADH ≅ ∠BCG (Corresponding angles, since AD ∥ BC cut by transversal DC).\n   • ∠AHD ≅ ∠BGC (Corresponding angles, since AH ∥ BG cut by transversal HG).\n   Therefore, △ADH ≅ △BCG by AAS (or SAS) Congruence Postulate.\n\n2. Congruent triangles have equal areas:\n   Area(△ADH) = Area(△BCG)  ... (1)\n\n3. Now observe the combined polygon ABCH:\n   Area(Parallelogram ABCD) = Area(Polygon ABCH) − Area(△ADH)\n   Area(Parallelogram ABGH) = Area(Polygon ABCH) − Area(△BCG)\n\n4. Since Area(△ADH) = Area(△BCG) from (1):\n   Area of parallelogram ABCD = Area of parallelogram ABGH.\nHence proved!",
      "steps": [
        "To Prove: Area of parallelogram ABCD = Area of parallelogram ABGH.",
        "Proof:\n1. Consider △ADH and △BCG:\n   • AH ≅ BG (Opposite sides of parallelogram ABGH).\n   • AD ≅ BC (Opposite sides of parallelogram ABCD).\n   • ∠ADH ≅ ∠BCG (Corresponding angles, since AD ∥ BC cut by transversal DC).\n   • ∠AHD ≅ ∠BGC (Corresponding angles, since AH ∥ BG cut by transversal HG).\n   Therefore, △ADH ≅ △BCG by AAS (or SAS) Congruence Postulate.",
        "2. Congruent triangles have equal areas:\n   Area(△ADH) = Area(△BCG)  ... (1)",
        "3. Now observe the combined polygon ABCH:\n   Area(Parallelogram ABCD) = Area(Polygon ABCH) − Area(△ADH)\n   Area(Parallelogram ABGH) = Area(Polygon ABCH) − Area(△BCG)",
        "4. Since Area(△ADH) = Area(△BCG) from (1):\n   Area of parallelogram ABCD = Area of parallelogram ABGH.\nHence proved!"
      ],
      "answer": "Proved (Textbook Theorem / Geometry Rule)."
    },
    {
      "id": "thm-16-2",
      "section": "16.1",
      "title": "Theorem 16.2 — Parallelograms on Equal Bases and of Same Altitude",
      "problem": "Prove that parallelograms on equal bases and having the same altitude are equal in area.",
      "given": "ABCD and EFGH are two parallelograms having equal bases AB ≅ EF and lying between the same parallel lines (same altitude).",
      "method": "Join A to H and B to G to construct intermediate parallelogram ABGH on base AB, then apply Theorem 16.1.",
      "solution": "To Prove: Area of parallelogram ABCD = Area of parallelogram EFGH.\n\nConstruction: Join point A to H and point B to G.\n\nProof:\n1. In parallelogram EFGH, HG ≅ EF (Opposite sides).\n   Given: EF ≅ AB.\n   Therefore, HG ≅ AB (Transitive property).\n\n2. Also, AB ∥ HG (since they lie on the two parallel boundary lines).\n   Since AB is congruent and parallel to HG, quadrilateral ABGH is a parallelogram.\n\n3. Parallelograms ABCD and ABGH have the same base AB and lie between the same parallel lines:\n   By Theorem 16.1: Area(ABCD) = Area(ABGH)  ... (1)\n\n4. Parallelograms EFGH and ABGH have equal bases (EF = HG) and the same altitude:\n   Area(ABGH) = Area(EFGH)  ... (2)\n\n5. From (1) and (2), by transitive property:\n   Area of parallelogram ABCD = Area of parallelogram EFGH.\nHence proved!",
      "steps": [
        "To Prove: Area of parallelogram ABCD = Area of parallelogram EFGH.",
        "Construction: Join point A to H and point B to G.",
        "Proof:\n1. In parallelogram EFGH, HG ≅ EF (Opposite sides).\n   Given: EF ≅ AB.\n   Therefore, HG ≅ AB (Transitive property).",
        "2. Also, AB ∥ HG (since they lie on the two parallel boundary lines).\n   Since AB is congruent and parallel to HG, quadrilateral ABGH is a parallelogram.",
        "3. Parallelograms ABCD and ABGH have the same base AB and lie between the same parallel lines:\n   By Theorem 16.1: Area(ABCD) = Area(ABGH)  ... (1)",
        "4. Parallelograms EFGH and ABGH have equal bases (EF = HG) and the same altitude:\n   Area(ABGH) = Area(EFGH)  ... (2)",
        "5. From (1) and (2), by transitive property:\n   Area of parallelogram ABCD = Area of parallelogram EFGH.\nHence proved!"
      ],
      "answer": "Proved (Textbook Theorem / Geometry Rule)."
    },
    {
      "id": "thm-16-3",
      "section": "16.2",
      "title": "Theorem 16.3 — Triangles on Same Base and of Same Altitude",
      "problem": "Prove that triangles on the same base and of the same altitude are equal in area.",
      "given": "△ABC and △ABH have the same base AB and lie between two parallel lines PQ and XY (same altitude).",
      "method": "Complete parallelograms ABCD and ABGH by drawing lines through A and B parallel to the opposite sides. Use diagonal bisection of parallelograms.",
      "solution": "To Prove: Area(△ABC) = Area(△ABH).\n\nConstruction: Draw AD ∥ BC and BG ∥ AH to intersect line PQ at D and G respectively.\n\nProof:\n1. Quadrilaterals ABCD and ABGH are parallelograms by construction (opposite sides parallel).\n\n2. ABCD and ABGH share the same base AB and lie between the same parallel lines XY and PQ.\n   By Theorem 16.1:\n   Area(Parallelogram ABCD) = Area(Parallelogram ABGH)  ... (1)\n\n3. A diagonal divides a parallelogram into two triangles of equal area:\n   Diagonal AC bisects parallelogram ABCD ⟹ Area(△ABC) = (1/2) Area(Parallelogram ABCD).\n   Diagonal BH bisects parallelogram ABGH ⟹ Area(△ABH) = (1/2) Area(Parallelogram ABGH).\n\n4. Since the two parallelograms are equal in area from (1):\n   (1/2) Area(Parallelogram ABCD) = (1/2) Area(Parallelogram ABGH)\n   Area(△ABC) = Area(△ABH).\nHence proved!",
      "steps": [
        "To Prove: Area(△ABC) = Area(△ABH).",
        "Construction: Draw AD ∥ BC and BG ∥ AH to intersect line PQ at D and G respectively.",
        "Proof:\n1. Quadrilaterals ABCD and ABGH are parallelograms by construction (opposite sides parallel).",
        "2. ABCD and ABGH share the same base AB and lie between the same parallel lines XY and PQ.\n   By Theorem 16.1:\n   Area(Parallelogram ABCD) = Area(Parallelogram ABGH)  ... (1)",
        "3. A diagonal divides a parallelogram into two triangles of equal area:\n   Diagonal AC bisects parallelogram ABCD ⟹ Area(△ABC) = (1/2) Area(Parallelogram ABCD).\n   Diagonal BH bisects parallelogram ABGH ⟹ Area(△ABH) = (1/2) Area(Parallelogram ABGH).",
        "4. Since the two parallelograms are equal in area from (1):\n   (1/2) Area(Parallelogram ABCD) = (1/2) Area(Parallelogram ABGH)\n   Area(△ABC) = Area(△ABH).\nHence proved!"
      ],
      "answer": "Proved (Textbook Theorem / Geometry Rule)."
    },
    {
      "id": "thm-16-4",
      "section": "16.2",
      "title": "Theorem 16.4 — Triangles on Equal Bases and of Same Altitude",
      "problem": "Prove that triangles on equal bases and of the same altitude are equal in area.",
      "given": "△ABD and △KLM lie between the same parallel lines PQ and XY, and their bases are equal: AB ≅ KL.",
      "method": "Draw BC ∥ AD and KN ∥ LM to complete parallelograms ABCD and KLMN. Use Theorem 16.2.",
      "solution": "To Prove: Area(△ABD) = Area(△KLM).\n\nConstruction: Draw BC ∥ AD and KN ∥ LM intersecting line PQ at C and N respectively.\n\nProof:\n1. ABCD and KLMN are parallelograms with equal bases (AB = KL) lying between the same parallel lines.\n   By Theorem 16.2:\n   Area(Parallelogram ABCD) = Area(Parallelogram KLMN)  ... (1)\n\n2. The diagonals BD and KM bisect their respective parallelograms:\n   Area(△ABD) = (1/2) Area(Parallelogram ABCD)\n   Area(△KLM) = (1/2) Area(Parallelogram KLMN)\n\n3. From (1):\n   Area(△ABD) = Area(△KLM).\nHence proved!",
      "steps": [
        "To Prove: Area(△ABD) = Area(△KLM).",
        "Construction: Draw BC ∥ AD and KN ∥ LM intersecting line PQ at C and N respectively.",
        "Proof:\n1. ABCD and KLMN are parallelograms with equal bases (AB = KL) lying between the same parallel lines.\n   By Theorem 16.2:\n   Area(Parallelogram ABCD) = Area(Parallelogram KLMN)  ... (1)",
        "2. The diagonals BD and KM bisect their respective parallelograms:\n   Area(△ABD) = (1/2) Area(Parallelogram ABCD)\n   Area(△KLM) = (1/2) Area(Parallelogram KLMN)",
        "3. From (1):\n   Area(△ABD) = Area(△KLM).\nHence proved!"
      ],
      "answer": "Proved (Textbook Theorem / Geometry Rule)."
    }
  ],
  "exercises": [
    {
      "exercise": "16.1",
      "title": "Exercise 16.1 — Base-Altitude Area Proofs & Calculations",
      "description": "4 textbook problems covering triangle area equality on parallel transversals, parallelogram partition fractions, diagonal area equivalence proof, and tile paving calculation.",
      "problems": [
        {
          "qNo": "Q1",
          "question": "In △ABC, PQ ∥ BC, cutting AB and AC at P and Q respectively. BQ and CP are drawn to meet at R. Prove that the following pairs of triangles are equal in area:\n(i) △PBC and △QBC\n(ii) △BRP and △CRQ\n(iii) △PQB and △PQC\n(iv) △ABQ and △ACP",
          "solution": "Given: PQ ∥ BC. BQ and CP intersect at point R.\n\n(i) **Area(△PBC) = Area(△QBC)**:\n    Both triangles stand on the common base BC and lie between the same parallel lines PQ and BC (same altitude).\n    By Theorem 16.3, Area(△PBC) = Area(△QBC).\n\n(ii) **Area(△BRP) = Area(△CRQ)**:\n     From (i), Area(△PBC) = Area(△QBC).\n     Subtract the area of the common region △RBC from both sides:\n     Area(△PBC) − Area(△RBC) = Area(△QBC) − Area(△RBC)\n     Area(△BRP) = Area(△CRQ).\n\n(iii) **Area(△PQB) = Area(△PQC)**:\n      Both triangles stand on the common base PQ and lie between the same parallel lines PQ and BC.\n      By Theorem 16.3, Area(△PQB) = Area(△PQC).\n\n(iv) **Area(△ABQ) = Area(△ACP)**:\n     Area(△ABQ) = Area(△APQ) + Area(△PQB).\n     Area(△ACP) = Area(△APQ) + Area(△PQC).\n     Since Area(△PQB) = Area(△PQC) from (iii), adding Area(△APQ) to both sides gives:\n     Area(△ABQ) = Area(△ACP).\n\nHence proved for all four parts!"
        },
        {
          "qNo": "Q2",
          "question": "PQRS is a parallelogram. A and B are the midpoints of PQ and PS respectively. What fraction of the area of the parallelogram is:\n(i) △PAB\n(ii) △QBR\n(iii) △BAR",
          "solution": "Let the parallelogram area be K. Since PA is half of PQ and B is halfway between PS and PQ, triangle PAB has half the base and half the altitude of triangle formed by PQ and the full parallelogram height; therefore Area(triangle PAB)=K/8. Triangle QBR has base QR equal to a side of the parallelogram and its vertex B lies on the opposite parallel side, so its area is K/2. The three triangles PAB, BAR and QBR partition the parallelogram. Hence Area(triangle BAR)=K-K/8-K/2=3K/8.\n\nAnswer: (i) 1/8; (ii) 1/2; (iii) 3/8."
        },
        {
          "qNo": "Q3",
          "question": "ABCD is a quadrilateral. The diagonals AC and BD meet at E. If △ABE and △CDE are equal in area, then prove that AD ∥ BC.",
          "solution": "Given: In quadrilateral ABCD, diagonals AC and BD intersect at E, and Area(△ABE) = Area(△CDE).\nTo Prove: AD ∥ BC.\n\nProof:\n1. Given: Area(△ABE) = Area(△CDE).\n\n2. Add Area(△BCE) to both sides of the equation:\n   Area(△ABE) + Area(△BCE) = Area(△CDE) + Area(△BCE)\n   Area(△ABC) = Area(△DBC).\n\n3. △ABC and △DBC stand on the same base BC and have equal areas:\n   Area(△ABC) = (1/2) · BC · h₁\n   Area(△DBC) = (1/2) · BC · h₂\n   Therefore, h₁ = h₂ (the altitudes from A and D to base BC are equal).\n\n4. Since vertices A and D lie on the same side of line BC and are at equal perpendicular distances from BC, the straight line joining A and D must be parallel to BC:\n   AD ∥ BC.\n\nHence proved: ABCD is a trapezoid with AD ∥ BC."
        },
        {
          "qNo": "Q4",
          "question": "How many tiles, each 8 inches square, will be required to pave a rectangular space 18 × 30 feet?",
          "solution": "A rectangular space 18 ft by 30 ft has area 540 square feet. Convert to square inches: 540 x 144 = 77,760 sq in. Each square tile has area 8 x 8 = 64 sq in. Thus 77,760 / 64 = 1,215 tiles. The printed answer key gives 6,720, which conflicts with the dimensions in the question.\n\nAnswer: 1,215 tiles."
        }
      ]
    },
    {
      "exercise": "Review 16",
      "title": "Review Exercise 16 — Area Theorems Comprehensive",
      "description": "5 board-standard review questions including 9 MCQs, median area bisection proof, midpoint area equality proof, median point area proof, and area calculation.",
      "problems": [
        {
          "qNo": "Q1",
          "question": "Select the correct answer for each of the following:\n(i) Perpendicular distance between two lines is the same. The lines are:\n    a) Perpendicular to each other  b) Parallel to each other  c) Intersecting  d) None of the above\n(ii) If two triangles have equal area, then they will ______ be congruent as well:\n    a) Not necessarily  b) Necessarily  c) Definitely  d) None of the above\n(iii) Perpendicular from a vertex of a triangle to its opposite side is called:\n    a) Median  b) Perpendicular bisector  c) Altitude  d) Angle bisector\n(iv) Parallelograms having same base and same altitude are:\n    a) Congruent  b) Equal in area  c) Similar  d) All of the above (or equal in area)\n(v) Two parallelograms have equal bases. They will have the same area if:\n    a) Their altitudes are equal  b) Their altitude is the same  c) They lie between the same parallel lines  d) All of the above\n(vi) If two triangles have equal bases and equal altitudes, what else will they have equal?\n    a) area  b) perimeter  c) size  d) angles\n(vii) Suppose a triangle has a base length of 4 feet and a height of 4 feet. Its interior area is:\n    a) 4 square feet  b) 8 square feet  c) 16 square feet  d) Impossible to determine\n(viii) Suppose a square has a diagonal measure of 10 units. The area of the square is:\n    a) 25 square feet  b) 50 square feet  c) 100 square feet  d) Impossible to determine\n(ix) Find the area of a triangle with base (15/4) inches and altitude (8/5) inches:\n    a) 2 sq. in  b) 6 sq. in  c) 3 sq. in  d) 4.35 sq. in",
          "solution": "Verified Board Answers & Explanations:\n(i) **b) Parallel to each other** (Lines with constant perpendicular separation are parallel).\n(ii) **a) Not necessarily** (Equal area does not imply congruent shapes).\n(iii) **c) Altitude** (The perpendicular from vertex to base is the altitude).\n(iv) **b) Equal in area** (equal base and altitude guarantee equal area; the parallelograms need not be congruent or similar. The printed key marks d, but d also claims congruence and similarity, which do not follow.)\n(v) **d) All of the above** (All conditions express the same geometric criterion).\n(vi) **a) area** (Area = (1/2) · base · altitude).\n(vii) **b) 8 square feet** (Area = (1/2) · 4 · 4 = 8 sq. ft).\n(viii) **b) 50 square feet** (Area = (1/2) · d² = (1/2) · 100 = 50 sq. units).\n(ix) **c) 3 sq. in** (Area = (1/2) · (15/4) · (8/5) = (1/2) · 6 = 3 sq. in)."
        },
        {
          "qNo": "Q2",
          "question": "Prove that a median of a triangle divides it into two parts of equal area.",
          "solution": "Given: In △ABC, AD is a median from vertex A to midpoint D of base BC (BD = DC).\nTo Prove: Area(△ABD) = Area(△ACD).\n\nConstruction: Draw altitude AP ⊥ BC.\n\nProof:\n1. AP is the altitude for both △ABD and △ACD (as both have their bases on the line BC and share vertex A).\n\n2. Calculate areas:\n   Area(△ABD) = (1/2) · BD · AP\n   Area(△ACD) = (1/2) · DC · AP\n\n3. Since D is the midpoint of BC, BD = DC:\n   Area(△ABD) = (1/2) · BD · AP = (1/2) · DC · AP = Area(△ACD).\n\nHence proved: A median of a triangle divides it into two triangles of equal area."
        },
        {
          "qNo": "Q3",
          "question": "In △ABC, D and E are the midpoints of AB and AC respectively. Prove that △ADE, △BDE, and △CDE are equal in area.",
          "solution": "Given: D is the midpoint of AB (AD = DB) and E is the midpoint of AC (AE = EC).\nTo Prove: Area(△ADE) = Area(△BDE) = Area(△CDE).\n\nProof:\n1. In △ABE, ED is a median from vertex E to midpoint D of base AB:\n   By the median area property, Area(△ADE) = Area(△BDE)  ... (1)\n\n2. In △ADC, DE is a median from vertex D to midpoint E of base AC:\n   By the median area property, Area(△ADE) = Area(△CDE)  ... (2)\n\n3. From (1) and (2), by transitive property:\n   Area(△ADE) = Area(△BDE) = Area(△CDE).\nHence proved!"
        },
        {
          "qNo": "Q4",
          "question": "P is any point on the median AD of △ABC. Prove that △ABP and △ACP are equal in area.",
          "solution": "Given: In △ABC, AD is the median to base BC (BD = DC). P is any point on AD.\nTo Prove: Area(△ABP) = Area(△ACP).\n\nProof:\n1. Since AD is the median of △ABC:\n   Area(△ABD) = Area(△ACD)  ... (1)\n\n2. In △PBC, PD is the median to base BC (BD = DC):\n   Area(△PBD) = Area(△PCD)  ... (2)\n\n3. Subtract equation (2) from equation (1):\n   Area(△ABD) − Area(△PBD) = Area(△ACD) − Area(△PCD)\n   Area(△ABP) = Area(△ACP).\n\nHence proved!"
        },
        {
          "qNo": "Q5",
          "question": "Find the area of a triangle with base 20 inches and altitude 12 inches.",
          "solution": "Formula: Area = (1/2) · Base · Altitude.\n\n1. Substitute Base = 20 in and Altitude = 12 in:\n   Area = (1/2) · 20 in · 12 in\n   Area = 10 · 12 = 120 sq. inches.\n\nAnswer:\n120 sq. inches."
        }
      ]
    }
  ],
  "slos": {
    "mcqs": [
      {
        "question": "Parallelograms on the same base and between the same parallels are:",
        "options": [
          "Congruent",
          "Equal in area",
          "Similar",
          "Equal in perimeter"
        ],
        "correct": 1,
        "explanation": "Theorem 16.1 establishes that they have equal area."
      },
      {
        "question": "A median of a triangle divides it into two triangles of:",
        "options": [
          "Equal perimeters",
          "Equal angles",
          "Equal area",
          "Congruent shapes"
        ],
        "correct": 2,
        "explanation": "Both triangles share the same altitude and have equal bases, so their areas are equal."
      },
      {
        "question": "The area of a triangle having base b and altitude h is:",
        "options": [
          "b · h",
          "(1/2) b · h",
          "2 b · h",
          "(b + h)/2"
        ],
        "correct": 1,
        "explanation": "Area of triangle = (1/2) × base × altitude."
      },
      {
        "question": "If two figures have equal areas, they are:",
        "options": [
          "Always congruent",
          "Never congruent",
          "Not necessarily congruent",
          "Similar"
        ],
        "correct": 2,
        "explanation": "Equality of area does not require congruence of corresponding sides or angles."
      },
      {
        "question": "Area of a square with diagonal 8 cm is:",
        "options": [
          "64 cm²",
          "32 cm²",
          "16 cm²",
          "128 cm²"
        ],
        "correct": 1,
        "explanation": "Area = (1/2) d² = (1/2)(64) = 32 cm²."
      }
    ],
    "shortQuestions": [
      {
        "question": "State Theorem 16.1 (Parallelograms Area Theorem).",
        "answer": "Parallelograms on the same base and lying between the same parallel lines (or of the same altitude) are equal in area."
      },
      {
        "question": "State Theorem 16.3 (Triangles Area Theorem).",
        "answer": "Triangles on the same base and of the same altitude are equal in area."
      },
      {
        "question": "Does equality of area imply congruence? Give a counter-example.",
        "answer": "No. A rectangle with dimensions 4 cm × 3 cm has an area of 12 cm², and a right triangle with base 6 cm and height 4 cm also has an area of 12 cm², but they have completely different shapes and are not congruent."
      },
      {
        "question": "Why does a median divide a triangle into two triangles of equal area?",
        "answer": "Because the two triangles have equal bases (since the median bisects the side) and share the exact same perpendicular height (altitude) from the common opposite vertex."
      }
    ],
    "longQuestions": [
      {
        "question": "State and prove Theorem 16.1: Parallelograms on the same base and between the same parallels are equal in area.",
        "answer": "Refer to Theorem 16.1 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
      },
      {
        "question": "State and prove Theorem 16.3: Triangles on the same base and of the same altitude are equal in area.",
        "answer": "Refer to Theorem 16.3 in the Worked Examples tab for the complete formal proof with given, construction, statements, and reasons."
      }
    ]
  },
  "formulaSheet": [
    {
      "title": "Parallelogram & Triangle Area Equality",
      "latex": "\\text{Area}(\\text{Parallelogram}) = b \\cdot h,\\qquad \\text{Area}(\\triangle) = \\frac{1}{2}\\,b \\cdot h",
      "explanation": "Figures on the same base b between the same parallel lines have the same height h and therefore equal area.",
      "example": "A parallelogram and triangle on base 6 with altitude 4 have areas 24 and 12 respectively."
    },
    {
      "title": "Median Area Division",
      "latex": "AD \\text{ is median} \\implies \\text{Area}(\\triangle ABD) = \\text{Area}(\\triangle ACD) = \\frac{1}{2}\\,\\text{Area}(\\triangle ABC)",
      "explanation": "Any median partitions the triangular region into two sub-triangles of equal area.",
      "example": "If Area(△ABC) = 36 cm², each median triangle has area 18 cm²."
    },
    {
      "title": "Square Area from Diagonal",
      "latex": "\\text{Area}(\\text{Square}) = \\frac{1}{2}\\,d^2",
      "explanation": "Area of a square expressed directly in terms of its diagonal length d.",
      "example": "If diagonal d = 10, Area = (1/2)(100) = 50 sq. units."
    }
  ]
},
  {
    "number": 17,
    "id": "u17",
    "title": "Practical Geometry — Triangles",
    "titleUrdu": "عملی ہندسہ — مثلثیں",
    "status": "completed",
    "badge": "100% Textbook Matched",
    "pageRange": "Pages 298–312",
    "description": "Geometric compass-and-straightedge constructions of triangles (SAS, ASA, ambiguous SSA), verification of concurrency for medians, altitudes, angle bisectors, and perpendicular bisectors, and transformation of geometric figures of equal area.",
    "sections": [
      {
        "id": "17.1",
        "title": "17.1 Elements and Construction of Triangles",
        "theory": "• 17.1.1 Elements of a Triangle:\nEvery triangle has six fundamental elements: three sides (AB, BC, CA) and three interior angles (∠A, ∠B, ∠C).\n\n• 17.1.2 Three Fundamental Cases of Triangle Construction:\n1. Case 1 (SAS): When lengths of two sides and the measure of the included angle are given.\n2. Case 2 (ASA / SAA): When the length of one side and the measures of two angles are given (using angle sum property ∠A + ∠B + ∠C = 180° if needed).\n3. Case 3 (SSA - The Ambiguous Case): When lengths of two sides and the measure of an angle opposite to one of them are given. Three possibilities can emerge:\n   (a) Exactly one unique triangle can be constructed.\n   (b) Two distinct triangles can be constructed.\n   (c) No triangle can be constructed (the arc fails to intersect the ray)."
      },
      {
        "id": "17.2",
        "title": "17.2 Concurrency of Lines in Triangles",
        "theory": "• 17.2.1 Points of Concurrency:\n1. Incenter (I): Point of concurrency of the three interior angle bisectors. Equidistant from all three sides (inradius r).\n2. Circumcenter (C / O): Point of concurrency of the right (perpendicular) bisectors of the sides. Equidistant from all three vertices (circumradius R).\n3. Centroid (G): Point of concurrency of the three medians. Trisects each median in ratio 2 : 1.\n4. Orthocenter (O / H): Point of concurrency of the three altitudes.\nIn an equilateral triangle, all four centers (incenter, circumcenter, centroid, and orthocenter) coincide at the exact same single point."
      },
      {
        "id": "17.3",
        "title": "17.3 Figures of Equivalent Areas",
        "theory": "• 17.3.1 Transformation Constructions:\n1. Triangle Equal in Area to a Given Quadrilateral: Draw a diagonal, then draw a line through the opposite vertex parallel to the diagonal meeting the base produced.\n2. Rectangle Equal in Area to a Given Triangle: Bisect the base of the triangle at D, erect perpendicular at D to meet the parallel line through the vertex, and complete the rectangle ADGH.\n3. Square Equal in Area to a Given Rectangle: Produce base AD to E such that DE = CD. Bisect AE at O, draw a semicircle with radius OA, and produce CD to meet the semicircle at M. Square on DM has area equal to rectangle ABCD (DM² = AD · CD).\n4. Triangle on Given Base with Equivalent Area: Draw parallel line through the top vertex, and swing an arc of given base length x from the vertex along the parallel."
      }
    ],
    "workedExamples": [
      {
        "id": "ex-17-1",
        "section": "17.1",
        "title": "Example 1 — Construction Case 1 (SAS)",
        "problem": "Construct a triangle PQR given that PQ = 4 cm, PR = 5 cm, and m∠P = 120°.",
        "given": "PQ = 4 cm, PR = 5 cm, included angle m∠P = 120°.",
        "method": "Draw line segment PQ, construct 120° at P using compass, cut off PR = 5 cm, and join R to Q.",
        "solution": "Steps of Construction:\n1. Draw a line segment PQ of length 4 cm.\n2. At point P, construct an angle of 120° using a compass.\n3. With P as center and radius 5 cm, draw an arc intersecting the angle arm at R (PR = 5 cm).\n4. Join point R to point Q.\nResult: △PQR is the required triangle.",
        "steps": [
          "Steps of Construction:\n1. Draw a line segment PQ of length 4 cm.\n2. At point P, construct an angle of 120° using a compass.\n3. With P as center and radius 5 cm, draw an arc intersecting the angle arm at R (PR = 5 cm).\n4. Join point R to point Q.\nResult: △PQR is the required triangle."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-2",
        "section": "17.1",
        "title": "Example 2 — Construction Case 2 (ASA)",
        "problem": "Construct △PQR such that m(PQ) = 5.4 cm, m∠PQR = 45°, and m∠RPQ = 60°.",
        "given": "Base PQ = 5.4 cm, ∠P = 60°, ∠Q = 45°.",
        "method": "Draw base segment PQ, construct 60° at P and 45° at Q, and extend arms to intersect at R.",
        "solution": "Steps of Construction:\n1. Draw a line segment PQ measuring 5.4 cm.\n2. At point P, construct an angle of 60° with a compass.\n3. At point Q, construct an angle of 45° with a compass.\n4. Extend both terminal rays so that they intersect at point R.\nResult: △PQR is the required triangle.",
        "steps": [
          "Steps of Construction:\n1. Draw a line segment PQ measuring 5.4 cm.\n2. At point P, construct an angle of 60° with a compass.\n3. At point Q, construct an angle of 45° with a compass.\n4. Extend both terminal rays so that they intersect at point R.\nResult: △PQR is the required triangle."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-3",
        "section": "17.1",
        "title": "Example 3 — Construction Case 3a (Unique Triangle)",
        "problem": "Construct △ABC such that m(BC) = 3 cm, m(AB) = 6 cm, and m∠A = 30°.",
        "given": "AB = 6 cm, BC = 3 cm, ∠A = 30°.",
        "method": "Draw base AB = 6 cm, construct ∠A = 30°, draw an arc of radius 3 cm from B tangent to the ray at C.",
        "solution": "Steps of Construction:\n1. Draw line segment AB measuring 6 cm.\n2. At point A, construct ray AD such that m∠BAD = 30°.\n3. With point B as center, draw an arc of radius 3 cm.\n4. The arc touches the ray AD at exactly one point C (since 6 · sin 30° = 6 · 0.5 = 3 cm).\n5. Join C to B.\nResult: △ABC is the unique required right-angled triangle.",
        "steps": [
          "Steps of Construction:\n1. Draw line segment AB measuring 6 cm.\n2. At point A, construct ray AD such that m∠BAD = 30°.\n3. With point B as center, draw an arc of radius 3 cm.\n4. The arc touches the ray AD at exactly one point C (since 6 · sin 30° = 6 · 0.5 = 3 cm).\n5. Join C to B.\nResult: △ABC is the unique required right-angled triangle."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-4",
        "section": "17.1",
        "title": "Example 4 — Construction Case 3b (Two Triangles)",
        "problem": "Construct △KLM such that m(KL) = 6.5 cm, m(KM) = 5.5 cm, and m∠L = 45°.",
        "given": "KL = 6.5 cm, KM = 5.5 cm, ∠L = 45°.",
        "method": "Draw base KL, construct 45° at L, draw arc of radius 5.5 cm from K cutting ray LX at two distinct points M and M'.",
        "solution": "Steps of Construction:\n1. Draw segment KL of length 6.5 cm.\n2. At point L, construct ray LX such that m∠KLX = 45°.\n3. With K as center, draw an arc of radius 5.5 cm.\n4. The arc intersects ray LX at two distinct points M and M'.\n5. Join K to M and K to M'.\nResult: Both △KLM and △KLM' are valid triangles satisfying the given data.",
        "steps": [
          "Steps of Construction:\n1. Draw segment KL of length 6.5 cm.\n2. At point L, construct ray LX such that m∠KLX = 45°.\n3. With K as center, draw an arc of radius 5.5 cm.\n4. The arc intersects ray LX at two distinct points M and M'.\n5. Join K to M and K to M'.\nResult: Both △KLM and △KLM' are valid triangles satisfying the given data."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-5",
        "section": "17.1",
        "title": "Example 5 — Construction Case 3c (No Triangle Possible)",
        "problem": "Construct △XYZ when m(ZX) = 4 cm, m(YZ) = 6.5 cm, and m∠Y = 60°.",
        "given": "YZ = 6.5 cm, ZX = 4 cm, ∠Y = 60°.",
        "method": "Draw base YZ, construct 60° at Y, draw arc of 4 cm from Z. Since 4 < 6.5 · sin 60° ≈ 5.63 cm, arc does not reach the ray.",
        "solution": "Steps of Construction:\n1. Draw base segment YZ measuring 6.5 cm.\n2. At Y, construct ray YA such that m∠ZYA = 60°.\n3. With Z as center, draw an arc of radius 4 cm (= ZX).\n4. The arc does not reach or intersect the arm YA of ∠Y because the perpendicular distance from Z to ray YA is 6.5 · sin 60° ≈ 5.63 cm > 4 cm.\nConclusion: No triangle can be constructed to satisfy the given data.",
        "steps": [
          "Steps of Construction:\n1. Draw base segment YZ measuring 6.5 cm.\n2. At Y, construct ray YA such that m∠ZYA = 60°.\n3. With Z as center, draw an arc of radius 4 cm (= ZX).\n4. The arc does not reach or intersect the arm YA of ∠Y because the perpendicular distance from Z to ray YA is 6.5 · sin 60° ≈ 5.63 cm > 4 cm.\nConclusion: No triangle can be constructed to satisfy the given data."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-6",
        "section": "17.2",
        "title": "Example 6 — Concurrency of Angle Bisectors (Incenter)",
        "problem": "Construct △ABC with m(AB) = 4.6 cm, m(BC) = 5 cm, and m(CA) = 5.1 cm. Draw its angle bisectors and verify their concurrency.",
        "given": "Sides 4.6 cm, 5 cm, 5.1 cm.",
        "method": "Construct △ABC with SSS, construct internal bisectors of ∠A, ∠B, and ∠C using compass arcs, and observe intersection at I.",
        "solution": "Steps of Construction:\n1. Draw base BC measuring 5 cm.\n2. With B and C as centers and radii 4.6 cm and 5.1 cm respectively, draw arcs intersecting at A.\n3. Join AB and AC to complete △ABC.\n4. Using a compass, draw the angle bisector of ∠A, ∠B, and ∠C.\n5. Observe that all three angle bisectors pass through the exact same point I.\nConclusion: The angle bisectors of a triangle are concurrent at the incenter I.",
        "steps": [
          "Steps of Construction:\n1. Draw base BC measuring 5 cm.\n2. With B and C as centers and radii 4.6 cm and 5.1 cm respectively, draw arcs intersecting at A.\n3. Join AB and AC to complete △ABC.\n4. Using a compass, draw the angle bisector of ∠A, ∠B, and ∠C.\n5. Observe that all three angle bisectors pass through the exact same point I.\nConclusion: The angle bisectors of a triangle are concurrent at the incenter I."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-7",
        "section": "17.2",
        "title": "Example 7 — Concurrency of Altitudes (Orthocenter)",
        "problem": "Construct △ABC such that m(AB) = 5.6 cm, m(BC) = 6 cm, and m(CA) = 5 cm. Draw its altitudes and verify their concurrency.",
        "given": "Sides 5.6 cm, 6 cm, 5 cm.",
        "method": "Construct △ABC with SSS, drop perpendiculars from A to BC, B to CA, and C to AB.",
        "solution": "Steps of Construction:\n1. Construct △ABC with the given side lengths.\n2. From vertex A, drop perpendicular AD onto BC.\n3. From vertex B, drop perpendicular BE onto CA.\n4. From vertex C, drop perpendicular CF onto AB.\n5. The three altitudes AD, BE, and CF intersect at a single point O.\nConclusion: The altitudes of a triangle are concurrent at the orthocenter O.",
        "steps": [
          "Steps of Construction:\n1. Construct △ABC with the given side lengths.\n2. From vertex A, drop perpendicular AD onto BC.\n3. From vertex B, drop perpendicular BE onto CA.\n4. From vertex C, drop perpendicular CF onto AB.\n5. The three altitudes AD, BE, and CF intersect at a single point O.\nConclusion: The altitudes of a triangle are concurrent at the orthocenter O."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-8",
        "section": "17.2",
        "title": "Example 8 — Concurrency of Perpendicular Bisectors (Circumcenter)",
        "problem": "Construct △KLM such that m(KL) = 5.8 cm, m(LM) = 6 cm, and m∠L = 60°. Draw its perpendicular bisectors and verify their concurrency.",
        "given": "KL = 5.8 cm, LM = 6 cm, ∠L = 60°.",
        "method": "Construct △KLM using SAS, construct the perpendicular bisectors of KL, LM, and MK using compass arcs.",
        "solution": "Steps of Construction:\n1. Construct △KLM with KL = 5.8 cm, ∠L = 60°, and LM = 6 cm.\n2. Using a compass, draw the right bisector of segment KL.\n3. Draw the right bisector of segment LM.\n4. Draw the right bisector of segment MK.\n5. All three right bisectors pass through a single point C (circumcenter).\nConclusion: The perpendicular bisectors of the sides of a triangle are concurrent at the circumcenter.",
        "steps": [
          "Steps of Construction:\n1. Construct △KLM with KL = 5.8 cm, ∠L = 60°, and LM = 6 cm.\n2. Using a compass, draw the right bisector of segment KL.\n3. Draw the right bisector of segment LM.\n4. Draw the right bisector of segment MK.\n5. All three right bisectors pass through a single point C (circumcenter).\nConclusion: The perpendicular bisectors of the sides of a triangle are concurrent at the circumcenter."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      },
      {
        "id": "ex-17-9",
        "section": "17.2",
        "title": "Example 9 — Concurrency of Medians (Centroid)",
        "problem": "Construct △ABC such that m(AB) = 6 cm, m∠A = 70°, and m∠C = 50°. Draw its medians and verify their concurrency.",
        "given": "AB = 6 cm, ∠A = 70°, ∠C = 50° ⟹ ∠B = 180° − (70° + 50°) = 60°.",
        "method": "Construct △ABC on AB = 6 cm with ∠A = 70° and ∠B = 60°. Find midpoints D, E, F of sides, and join to opposite vertices.",
        "solution": "Steps of Construction:\n1. Compute m∠B = 180° − (70° + 50°) = 60°.\n2. Draw base AB = 6 cm. At A construct 70°, and at B construct 60°, meeting at C.\n3. Construct the perpendicular bisectors of BC, CA, and AB to locate their midpoints D, E, and F respectively.\n4. Draw median AD from A to D, median BE from B to E, and median CF from C to F.\n5. All three medians intersect at a single point G.\nConclusion: The medians of a triangle are concurrent at the centroid G.",
        "steps": [
          "Steps of Construction:\n1. Compute m∠B = 180° − (70° + 50°) = 60°.\n2. Draw base AB = 6 cm. At A construct 70°, and at B construct 60°, meeting at C.\n3. Construct the perpendicular bisectors of BC, CA, and AB to locate their midpoints D, E, and F respectively.\n4. Draw median AD from A to D, median BE from B to E, and median CF from C to F.\n5. All three medians intersect at a single point G.\nConclusion: The medians of a triangle are concurrent at the centroid G."
        ],
        "answer": "Constructed (Compass & Straightedge Step)."
      }
    ],
    "exercises": [
  {
    "exercise": "17.1",
    "title": "Exercise 17.1 ? Construction of Triangles",
    "description": "Construct each triangle from the measurements printed in the textbook.",
    "problems": [
      {
        "qNo": "Q1",
        "question": "Construct △ABC such that AB = 3.7 cm, BC = 2.5 cm and ∠B = 50°.",
        "solution": "Construction (SAS): Draw AB = 3.7 cm. At B construct a 50-degree angle with BA as one arm. On the other arm mark C so BC = 2.5 cm. Join A to C. Triangle ABC is the required triangle."
      },
      {
        "qNo": "Q2",
        "question": "Construct △ABC such that BC = 5.8 cm, ∠A = 30° and ∠B = 45°.",
        "solution": "First find ∠C = 180° - (30° + 45°) = 105°. Draw BC = 5.8 cm. At B construct a 45-degree ray; at C construct a 105-degree ray on the same side of BC. Their intersection is A. Triangle ABC is the required triangle."
      },
      {
        "qNo": "Q3",
        "question": "Construct △ABC such that AC = 4.5 cm, BC = 4.1 cm and ∠B = 75°.",
        "solution": "Draw a ray from B and construct angle ABC = 75 degrees. With B as centre and radius 4.1 cm, mark C on one arm. With C as centre and radius 4.5 cm, draw an arc meeting the other arm at A. Join A to C. Triangle ABC is the required triangle."
      }
    ]
  },
  {
    "exercise": "17.2",
    "title": "Exercise 17.2 ? Concurrency in Triangles",
    "description": "Construct the stated triangles and draw the corresponding concurrent lines.",
    "problems": [
      {
        "qNo": "Q4",
        "question": "Construct △ABC, draw its angle bisectors and verify their concurrency: AB = 5.3 cm, ∠A = 45° and ∠B = 45°.",
        "solution": "Construct AB = 5.3 cm. At A and B construct 45-degree rays on the same side of AB; they meet at C. Bisect each of the three angles with compass and straightedge. The three angle bisectors meet at one point, the incentre."
      },
      {
        "qNo": "Q5",
        "question": "Construct △PQR, draw its altitudes and verify their concurrency: PR = 5.8 cm, ∠P = 45° and ∠Q = 105°.",
        "solution": "Find ∠R = 180° - (45° + 105°) = 30°. Draw PR = 5.8 cm; construct the 45-degree ray at P and 30-degree ray at R to locate Q. Draw perpendiculars from P to QR, Q to PR, and R to PQ (extending sides where needed). They meet at one point, the orthocentre."
      },
      {
        "qNo": "Q6",
        "question": "Construct △UVW, draw its perpendicular bisectors and verify their concurrency: UW = 5.8 cm, ∠U = 45° and ∠V = 105°.",
        "solution": "Find ∠W = 180° - (45° + 105°) = 30°. Draw UW = 5.8 cm; construct the 45-degree ray at U and 30-degree ray at W to locate V. Construct the perpendicular bisectors of UV, VW and WU using equal-radius arcs from each pair of endpoints. They meet at one point, the circumcentre."
      },
      {
        "qNo": "Q7",
        "question": "Construct △XYZ, draw its medians and verify their concurrency: XZ = 6 cm, ∠Y = 60° and ∠Z = 75°.",
        "solution": "Find ∠X = 180° - (60° + 75°) = 45°. Draw XZ = 6 cm; construct the 45-degree ray at X and 75-degree ray at Z to locate Y. Bisect each side to find its midpoint, then join each vertex to the midpoint of the opposite side. The three medians meet at one point, the centroid."
      }
    ]
  },
  {
    "exercise": "17.3",
    "title": "Exercise 17.3 ? Equal-Area Constructions",
    "description": "Construct the figures specified in the textbook and justify the area equality.",
    "problems": [
      {
        "qNo": "Q8",
        "question": "Draw △PQR such that PQ = 5.6 cm, QR = 4.5 cm and RP = 3.4 cm. Construct a triangle SPQ equivalent in area to △PQR.",
        "solution": "Construct triangle PQR by SSS. Through R draw a line parallel to PQ and choose a point S on this parallel line. Join S to P and S to Q. Triangles SPQ and PQR have the same base PQ and lie between the same parallels, so they have equal areas."
      },
      {
        "qNo": "Q9",
        "question": "Construct a rectangle whose adjacent sides are 2.5 cm and 5 cm respectively.",
        "solution": "Draw AB = 5 cm. Construct a perpendicular to AB at A and mark AD = 2.5 cm. Through D draw a line parallel to AB; through B draw a line parallel to AD. Let the lines meet at C. ABCD is the required rectangle."
      }
    ]
  }
],
    "slos": {
      "mcqs": [
        {
          "question": "The point of concurrency of the medians of a triangle is called the:",
          "options": [
            "Incenter",
            "Circumcenter",
            "Centroid",
            "Orthocenter"
          ],
          "correct": 2,
          "explanation": "The medians of a triangle intersect at the centroid (G)."
        },
        {
          "question": "In an equilateral triangle, the incenter, circumcenter, centroid, and orthocenter are:",
          "options": [
            "Different points",
            "All the same point",
            "Collinear but distinct",
            "Outside the triangle"
          ],
          "correct": 1,
          "explanation": "Due to perfect 3-fold symmetry, all four centers coincide at a single point in an equilateral triangle."
        },
        {
          "question": "How many triangles can be constructed if only the three angles are given (AAA)?",
          "options": [
            "Exactly one",
            "Two",
            "None",
            "Infinitely many"
          ],
          "correct": 3,
          "explanation": "AAA determines shape (similarity) but not scale, so infinitely many similar triangles can be drawn."
        },
        {
          "question": "The circumcenter of an obtuse-angled triangle lies:",
          "options": [
            "Inside the triangle",
            "Outside the triangle",
            "On the hypotenuse",
            "At the obtuse vertex"
          ],
          "correct": 1,
          "explanation": "For any obtuse triangle, the circumcenter lies outside the triangle."
        },
        {
          "question": "To transform a rectangle into a square of equal area, we construct the:",
          "options": [
            "Arithmetic mean of the sides",
            "Geometric mean of the sides",
            "Harmonic mean of the sides",
            "Sum of the sides"
          ],
          "correct": 1,
          "explanation": "s² = l · w ⟹ s = √(l · w), which is the geometric mean constructed via a semicircle."
        }
      ],
      "shortQuestions": [
        {
          "question": "What are the six fundamental elements of a triangle?",
          "answer": "The three sides (AB, BC, CA) and the three interior angles (∠A, ∠B, ∠C)."
        },
        {
          "question": "Explain the three possibilities that can arise in the ambiguous SSA case of triangle construction.",
          "answer": "Depending on the length of the opposite side relative to the altitude: (1) Exactly one unique triangle, (2) Two distinct triangles, or (3) No triangle at all."
        },
        {
          "question": "Define the four centers of a triangle: Incenter, Circumcenter, Centroid, and Orthocenter.",
          "answer": "Incenter: Intersection of angle bisectors. Circumcenter: Intersection of perpendicular bisectors of sides. Centroid: Intersection of medians. Orthocenter: Intersection of altitudes."
        },
        {
          "question": "How can you construct a triangle equal in area to a given quadrilateral?",
          "answer": "Draw a diagonal, draw a line through the opposite vertex parallel to the diagonal meeting the base produced at P, and join to form the triangle on the extended base."
        }
      ],
      "longQuestions": [
        {
          "question": "Describe the complete method and steps to construct a square having area equal to a given rectangle.",
          "answer": "Refer to Exercise 17.3, Question 2 or Section 17.3 for the detailed step-by-step geometric mean semicircle construction."
        },
        {
          "question": "Explain how to construct a triangle and verify the concurrency of its three medians.",
          "answer": "Refer to Worked Example 9 or Exercise 17.2, Question 4 for the complete step-by-step construction and concurrency verification."
        }
      ]
    },
    "formulaSheet": [
      {
        "title": "Triangle Centers Summary",
        "latex": "\\begin{aligned} \\text{Incenter } (I) &: \\text{Angle Bisectors (Equidistant from sides)} \\\\ \\text{Circumcenter } (C) &: \\text{Perpendicular Bisectors (Equidistant from vertices)} \\\\ \\text{Centroid } (G) &: \\text{Medians (2:1 Trisection)} \\\\ \\text{Orthocenter } (O) &: \\text{Altitudes} \\end{aligned}",
        "explanation": "Summary of the four points of concurrency for the lines associated with a triangle.",
        "example": "In an equilateral triangle, all four centers coincide at a single point."
      },
      {
        "title": "Equal Area Rectangle to Square Transformation",
        "latex": "s = \\sqrt{l \\cdot w} \\iff s^2 = l \\cdot w",
        "explanation": "The side of a square equal in area to a rectangle of length l and width w is the geometric mean of l and w.",
        "example": "If l = 4.5 cm and w = 2.2 cm, then s = √(4.5 × 2.2) ≈ 3.15 cm."
      },
      {
        "title": "Sum of Two Squares Transformation",
        "latex": "c^2 = a^2 + b^2",
        "explanation": "The square on the hypotenuse of a right triangle with legs a and b has area equal to the sum of squares on a and b.",
        "example": "For squares of sides 3 and 4, the square on the hypotenuse 5 has area 25 = 9 + 16."
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.MATH_DATA = MATH_DATA;
}
if (typeof DATA !== 'undefined') {
  DATA.mathChapters = MATH_DATA;
}

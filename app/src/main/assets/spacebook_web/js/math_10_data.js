// KPK Grade 10 Mathematics - textbook sequence reconstruction in progress
// Source: Khyber Pakhtunkhwa Textbook Board Peshawar (Class 10)
var MATH_10_DATA = [
  {
    "number": 1,
    "id": "u1",
    "title": "Quadratic Equations",
    "titleUrdu": "دو درجی مساواتیں",
    "status": "ready",
    "badge": "Textbook sequence checked against scans",
    "pageRange": "Pages 1–21",
    "description": "Unit 1: Quadratic Equations. Lessons and worked examples follow textbook sections 1.1–1.5 and Examples 1–15. Exercises 1.1, 1.2, 1.3, and Review Exercise 1 follow their printed order.",
    "sections": [
      {
        "id": "1.1",
        "title": "1.1 Quadratic Equation",
        "theory": "A quadratic equation in one variable can be written ax² + bx + c = 0, where a, b and c are real numbers and a ≠ 0. The highest exponent of the variable is 2. Roots are the values that make the equation true; the set of roots is its solution set.\n\nThe book introduces the form with a parabolic reflector and examples of motion, then identifies the quadratic, linear and constant terms.",
        "rules": [
          "Standard form: ax² + bx + c = 0, with a ≠ 0.",
          "A quadratic equation may have zero, one or two real roots."
        ]
      },
      {
        "id": "1.2",
        "title": "1.2 Solution of Quadratic Equations",
        "theory": "The book presents three methods in this order: factorization, completing the square, and the quadratic formula. In factorization, write the equation in standard form, factor the left side, and use the zero-product property. To complete the square, first make the coefficient of x² equal to 1, move the constant, add the square of half the coefficient of x, and take square roots.\n\nExample 2 models height as a quadratic function of time; only a nonnegative time is physically meaningful.",
        "rules": [
          "Zero-product property: if AB = 0, then A = 0 or B = 0.",
          "When completing a square in x² + kx, add (k/2)² to both sides."
        ]
      },
      {
        "id": "1.3",
        "title": "1.3 Quadratic Formula",
        "theory": "For ax² + bx + c = 0 with a ≠ 0, divide by a, complete the square using (b/2a)², then take square roots. This gives the quadratic formula. The worked examples apply it to an equation and to a rectangular frame area problem.",
        "rules": [
          "x = [−b ± √(b² − 4ac)]/(2a)."
        ]
      },
      {
        "id": "1.4",
        "title": "1.4 Solution of Equations Reducible to Quadratic Form",
        "theory": "The book develops five substitutions: y = x² for biquadratic equations; y = p(x) for expressions involving p(x) and 1/p(x); reciprocal forms using x + 1/x or x − 1/x; y = aˣ for exponential equations; and a shared quadratic expression for paired factors whose constants have equal sums. Always return to the original variable after solving for the substitution.",
        "rules": [
          "If y = x², then solve the quadratic in y and take both square roots when y > 0.",
          "For reciprocal equations, x ≠ 0; check all resulting values in the original equation.",
          "For exponential substitutions y = aˣ, y must be positive."
        ]
      },
      {
        "id": "1.5",
        "title": "1.5 Radical Equations",
        "theory": "A radical equation contains the variable in one or more radicands. Squaring removes a square root but can create extraneous candidates. Substitute every candidate into the original equation and retain only values that satisfy it.",
        "rules": [
          "Check domain restrictions before squaring.",
          "Verify each candidate in the original radical equation; reject extraneous roots."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "title": "Example 1 (Page 3) — Solving by Factorization",
        "problem": "Solve each quadratic equation by factorization and check the results: (i) 2x² + 2x − 11 = 1; (ii) 12t² = t + 1.",
        "given": "(i) 2x² + 2x − 11 = 1; (ii) 12t² = t + 1.",
        "method": "Write in standard form, factor, use the zero-product property, and check.",
        "steps": [
          "(i) 2x² + 2x − 12 = 0; divide by 2 to get x² + x − 6 = 0.",
          "Factor: (x + 3)(x − 2) = 0, so x = −3 or x = 2.",
          "Substitution in the original equation gives 1 on both sides for either root.",
          "(ii) 12t² − t − 1 = 0 = (3t − 1)(4t + 1).",
          "Thus t = 1/3 or t = −1/4; both satisfy 12t² = t + 1."
        ],
        "answer": "(i) {−3, 2}; (ii) {1/3, −1/4}."
      },
      {
        "id": "eg2",
        "title": "Example 2 (Page 4) — Ball Height and a Quadratic Graph",
        "problem": "A ball is thrown straight up from 3 m above the ground at 14 m/s. When does it hit the ground?",
        "given": "Initial height 3 m; initial upward speed 14 m/s; gravity term −5t².",
        "method": "Model the height by a quadratic, set the height to zero, factor, and reject negative time.",
        "steps": [
          "Height after t seconds: h = 3 + 14t − 5t².",
          "At ground level h = 0, so 5t² − 14t − 3 = 0.",
          "Factor: (5t + 1)(t − 3) = 0, giving t = −0.2 or t = 3.",
          "Negative time is not physically possible, so retain t = 3 seconds."
        ],
        "answer": "The ball reaches the ground after 3 seconds.",
        "diagram": {
          "type": "quadratic-graph",
          "a": -5,
          "b": 14,
          "c": 3,
          "xMin": -0.5,
          "xMax": 3.5,
          "yMin": -2,
          "yMax": 14,
          "xLabel": "t (seconds)",
          "yLabel": "h (metres)",
          "points": [
            {
              "x": -0.2,
              "y": 0,
              "label": "(−0.2, 0)"
            },
            {
              "x": 0,
              "y": 3,
              "label": "(0, 3)"
            },
            {
              "x": 3,
              "y": 0,
              "label": "(3, 0)"
            }
          ]
        }
      },
      {
        "id": "eg3",
        "title": "Example 3 (Page 6) — Completing the Square",
        "problem": "Solve x² − 8x + 9 = 0 by completing the square.",
        "given": "x² − 8x + 9 = 0.",
        "method": "Complete the square.",
        "steps": [
          "Move the constant: x² − 8x = −9.",
          "Add (−8/2)² = 16 to both sides: x² − 8x + 16 = 7.",
          "Write the perfect square: (x − 4)² = 7.",
          "Take square roots: x − 4 = ±√7."
        ],
        "answer": "{4 + √7, 4 − √7}.",
        "diagram": {
          "type": "completing-square",
          "variable": "x",
          "coefficient": -8
        }
      },
      {
        "id": "eg4",
        "title": "Example 4 (Page 7) — Using the Quadratic Formula",
        "problem": "Solve 3x² − 6x + 2 = 0.",
        "given": "a = 3, b = −6, c = 2.",
        "method": "Substitute in the quadratic formula.",
        "steps": [
          "x = [−b ± √(b² − 4ac)]/(2a).",
          "x = [6 ± √(36 − 24)]/6 = [6 ± √12]/6.",
          "Simplify √12 = 2√3."
        ],
        "answer": "{1 + √3/3, 1 − √3/3}."
      },
      {
        "id": "eg5",
        "title": "Example 5 (Page 7) — Area of a Rectangular Frame",
        "problem": "A steel frame surrounds an 11 cm by 6 cm opening. If its area is 28 cm², find the uniform width x.",
        "given": "Opening: 11 cm × 6 cm; frame area: 28 cm².",
        "method": "Write outer area minus opening area, then solve the quadratic and reject a negative width.",
        "steps": [
          "Outer dimensions are (11 + 2x) cm and (6 + 2x) cm.",
          "Frame area: (11 + 2x)(6 + 2x) − 66 = 28.",
          "Simplify: 4x² + 34x = 28, or 2x² + 17x − 14 = 0.",
          "x = [−17 ± √401]/4. The negative root is not a width."
        ],
        "answer": "x = (−17 + √401)/4 cm ≈ 0.76 cm (about 0.8 cm).",
        "diagram": {
          "type": "rectangle-frame",
          "outerWidth": 11,
          "outerHeight": 6,
          "frameWidth": "x"
        }
      },
      {
        "id": "eg6",
        "title": "Example 6 (Page 9) — Biquadratic Equation",
        "problem": "Solve 12x⁴ − 11x² + 2 = 0.",
        "given": "12x⁴ − 11x² + 2 = 0.",
        "method": "Substitute y = x².",
        "steps": [
          "Let y = x². Then 12y² − 11y + 2 = 0.",
          "Factor: (3y − 2)(4y − 1) = 0, so y = 2/3 or 1/4.",
          "Return to x: x² = 2/3 or x² = 1/4.",
          "Take both positive and negative square roots."
        ],
        "answer": "{±√(2/3), ±1/2}."
      },
      {
        "id": "eg7",
        "title": "Example 7 (Page 9) — A Rational Equation Reducible to a Quadratic",
        "problem": "Solve 2x + 4/x = 9.",
        "given": "x ≠ 0.",
        "method": "Clear the denominator and factor.",
        "steps": [
          "Multiply by x: 2x² + 4 = 9x.",
          "Rearrange: 2x² − 9x + 4 = 0.",
          "Factor: (2x − 1)(x − 4) = 0."
        ],
        "answer": "{1/2, 4}."
      },
      {
        "id": "eg8",
        "title": "Example 8 (Page 10) — Substitution in a Rational Equation",
        "problem": "Solve (x − 1)/(x + 3) + (x + 3)/(x − 1) = 13/6.",
        "given": "x ≠ −3, 1.",
        "method": "Substitute y = (x − 1)/(x + 3); the second fraction is 1/y.",
        "steps": [
          "y + 1/y = 13/6, so 6y² − 13y + 6 = 0.",
          "Factor: (2y − 3)(3y − 2) = 0; y = 3/2 or 2/3.",
          "For y = 3/2, solve 2(x − 1) = 3(x + 3), giving x = −11.",
          "For y = 2/3, solve 3(x − 1) = 2(x + 3), giving x = 9."
        ],
        "answer": "{−11, 9}."
      },
      {
        "id": "eg9",
        "title": "Example 9 (Page 10) — Reciprocal Equations",
        "problem": "Solve: (i) 2(x² + 1/x²) − 9(x + 1/x) + 14 = 0; (ii) 8(x² + 1/x²) − 42(x − 1/x) + 29 = 0.",
        "given": "x ≠ 0.",
        "method": "Use the matching reciprocal expression as the substitution.",
        "steps": [
          "(i) Let y = x + 1/x, so x² + 1/x² = y² − 2. Then 2y² − 9y + 10 = 0, giving y = 5/2 or 2.",
          "For y = 5/2, 2x² − 5x + 2 = 0, so x = 2 or 1/2. For y = 2, (x − 1)² = 0, so x = 1.",
          "(ii) Let y = x − 1/x, so x² + 1/x² = y² + 2. Then 8y² − 42y + 45 = 0, giving y = 3/2 or 15/4.",
          "Back-substitution gives x = 2, −1/2, 4, or −1/4."
        ],
        "answer": "(i) {2, 1/2, 1}; (ii) {2, −1/2, 4, −1/4}."
      },
      {
        "id": "eg10",
        "title": "Example 10 (Page 11) — Exponential Equation",
        "problem": "Solve 4·2^(2x) − 10·2^x + 4 = 0.",
        "given": "4·2^(2x) − 10·2^x + 4 = 0.",
        "method": "Substitute y = 2^x, where y > 0.",
        "steps": [
          "Let y = 2^x. Then 4y² − 10y + 4 = 0, or 2y² − 5y + 2 = 0.",
          "Factor: (2y − 1)(y − 2) = 0.",
          "Thus 2^x = 1/2 or 2; equate powers of 2."
        ],
        "answer": "{−1, 1}."
      },
      {
        "id": "eg11",
        "title": "Example 11 (Page 12) — Exponential Equation with Reciprocal Powers",
        "problem": "Solve 2^(2+x) + 2^(2−x) = 10.",
        "given": "2^(2+x) + 2^(2−x) = 10.",
        "method": "Substitute y = 2^x; then 2^(−x) = 1/y.",
        "steps": [
          "Rewrite as 4y + 4/y = 10.",
          "Multiply by y and simplify: 2y² − 5y + 2 = 0.",
          "Factor: (2y − 1)(y − 2) = 0.",
          "Return to 2^x = 1/2 or 2."
        ],
        "answer": "{−1, 1}."
      },
      {
        "id": "eg12",
        "title": "Example 12 (Page 13) — Grouped Factors",
        "problem": "Solve (x + 1)(x + 3)(x − 2)(x − 4) = 24.",
        "given": "1 + (−2) = 3 + (−4).",
        "method": "Pair factors with equal sums and substitute y = x² − x.",
        "steps": [
          "Rearrange as [(x + 1)(x − 2)][(x + 3)(x − 4)] = 24.",
          "This gives (y − 2)(y − 12) = 24, so y² − 14y = 0.",
          "Thus y = 0 or 14.",
          "If x² − x = 0, x = 0 or 1. If x² − x = 14, x = (1 ± √57)/2."
        ],
        "answer": "{0, 1, (1 + √57)/2, (1 − √57)/2}."
      },
      {
        "id": "eg13",
        "title": "Example 13 (Page 16) — Radical Equation with One Square Root",
        "problem": "Solve √(27 − 3x) = x − 3.",
        "given": "The right side must be nonnegative, so x ≥ 3.",
        "method": "Square both sides, factor, then check candidates in the original equation.",
        "steps": [
          "Square: 27 − 3x = (x − 3)².",
          "Rearrange: x² − 3x − 18 = 0 = (x − 6)(x + 3).",
          "Candidates are 6 and −3. Check both in the original equation; −3 is extraneous."
        ],
        "answer": "{6}."
      },
      {
        "id": "eg14",
        "title": "Example 14 (Page 17) — Equation with a Sum of Radicals",
        "problem": "Solve √(x + 2) + √(x + 7) = √(x + 23).",
        "given": "x ≥ −2.",
        "method": "Square twice and check the candidates.",
        "steps": [
          "After the first squaring: 2√((x + 2)(x + 7)) = 14 − x.",
          "Square again and simplify: 3x² + 64x − 140 = 0 = (x − 2)(3x + 70).",
          "Candidates: x = 2 or −70/3.",
          "Substitution in the original equation rejects −70/3."
        ],
        "answer": "{2}."
      },
      {
        "id": "eg15",
        "title": "Example 15 (Page 18) — Radicals with a Shared Quadratic Part",
        "problem": "Solve √(x² + 3x + 5) + √(x² + 3x + 1) = 2.",
        "given": "Both radicands share x² + 3x.",
        "method": "Isolate one radical, square, and solve the resulting quadratic.",
        "steps": [
          "Write √(x² + 3x + 5) = 2 − √(x² + 3x + 1).",
          "Squaring cancels the shared terms and gives √(x² + 3x + 1) = 0.",
          "Thus x² + 3x + 1 = 0.",
          "Apply the quadratic formula. Both roots make the original sum equal 2."
        ],
        "answer": "{(−3 + √5)/2, (−3 − √5)/2}."
      }
    ],
    "exercises": [
      {
        "exercise": "1.1",
        "title": "Exercise 1.1 — Quadratic Equations",
        "problems": [
          {
            "num": "Q1",
            "question": "Solve by factorization: (i) x² + 5x + 4 = 0; (ii) (x − 3)² = 4; (iii) x² + 3x − 10 = 0; (iv) 6x² − 13x + 5 = 0; (v) 3(x² − 1) = 4(x + 1); (vi) x(3x − 5) = (x − 6)(x − 7).",
            "solution": "(i) (x + 1)(x + 4) = 0, so x = −1, −4.\n(ii) (x − 3)² − 4 = 0; (x − 5)(x − 1) = 0, so x = 5, 1.\n(iii) (x + 5)(x − 2) = 0, so x = −5, 2.\n(iv) (3x − 5)(2x − 1) = 0, so x = 5/3, 1/2.\n(v) 3x² − 4x − 7 = 0 = (3x − 7)(x + 1), so x = 7/3, −1.\n(vi) 3x² − 5x = x² − 13x + 42; 2x² + 8x − 42 = 0; (x + 7)(x − 3) = 0, so x = −7, 3.",
            "finalAnswer": "(i) {−1, −4}; (ii) {1, 5}; (iii) {−5, 2}; (iv) {1/2, 5/3}; (v) {−1, 7/3}; (vi) {−7, 3}.",
            "steps": [
              "(i) (x + 1)(x + 4) = 0, so x = −1, −4.",
              "(ii) (x − 3)² − 4 = 0; (x − 5)(x − 1) = 0, so x = 5, 1.",
              "(iii) (x + 5)(x − 2) = 0, so x = −5, 2.",
              "(iv) (3x − 5)(2x − 1) = 0, so x = 5/3, 1/2.",
              "(v) 3x² − 4x − 7 = 0 = (3x − 7)(x + 1), so x = 7/3, −1.",
              "(vi) 3x² − 5x = x² − 13x + 42; 2x² + 8x − 42 = 0; (x + 7)(x − 3) = 0, so x = −7, 3."
            ],
            "method": "Quadratic equations"
          },
          {
            "num": "Q2",
            "question": "Solve by completing the square: (i) x² + 6x − 40 = 0; (ii) x² − 10x + 11 = 0; (iii) 4x² + 12x = 0; (iv) 5x² − 10x − 840 = 0; (v) 9x² − 6x + 5/9 = 0; (vi) (x − 1)(x + 3) = 5(x + 2) − 3.",
            "solution": "(i) (x + 3)² = 49, so x = 4 or −10.\n(ii) (x − 5)² = 14, so x = 5 ± √14.\n(iii) Divide by 4: x² + 3x = 0; completing the square gives (x + 3/2)² = 9/4, so x = 0 or −3.\n(iv) Divide by 5 and complete: (x − 1)² = 169, so x = 14 or −12.\n(v) Divide by 9: x² − (2/3)x + 5/81 = 0; (x − 1/3)² = 4/81, so x = 1/9 or 5/9.\n(vi) Expand and rearrange: x² − 3x − 10 = 0; (x − 3/2)² = 49/4, so x = 5 or −2.",
            "finalAnswer": "(i) {−10, 4}; (ii) {5 − √14, 5 + √14}; (iii) {−3, 0}; (iv) {−12, 14}; (v) {1/9, 5/9}; (vi) {−2, 5}.",
            "steps": [
              "(i) (x + 3)² = 49, so x = 4 or −10.",
              "(ii) (x − 5)² = 14, so x = 5 ± √14.",
              "(iii) Divide by 4: x² + 3x = 0; completing the square gives (x + 3/2)² = 9/4, so x = 0 or −3.",
              "(iv) Divide by 5 and complete: (x − 1)² = 169, so x = 14 or −12.",
              "(v) Divide by 9: x² − (2/3)x + 5/81 = 0; (x − 1/3)² = 4/81, so x = 1/9 or 5/9.",
              "(vi) Expand and rearrange: x² − 3x − 10 = 0; (x − 3/2)² = 49/4, so x = 5 or −2."
            ],
            "method": "Quadratic equations"
          },
          {
            "num": "Q3",
            "question": "Solve by the quadratic formula: (i) x² − 8x + 15 = 0; (ii) x² − 2x − 4 = 0; (iii) 4x² + 3x = 0; (iv) 3x(x − 2) + 1 = 0; (v) 6x² − 17x + 12 = 0; (vi) x²/3 − x/12 = 1/24.",
            "solution": "Apply x = [−b ± √(b² − 4ac)]/(2a) to each standard-form equation.\n(i) Δ = 64 − 60 = 4, so x = (8 ± 2)/2 = 3, 5.\n(ii) Δ = 4 + 16 = 20, so x = (2 ± √20)/2 = 1 ± √5.\n(iii) Δ = 9, so x = (−3 ± 3)/8 = 0, −3/4.\n(iv) 3x² − 6x + 1 = 0, Δ = 24, so x = (6 ± √24)/6 = 1 ± √6/3.\n(v) Δ = 289 − 288 = 1, so x = (17 ± 1)/12 = 3/2, 4/3.\n(vi) Multiply by 24: 8x² − 2x − 1 = 0; Δ = 36, so x = (2 ± 6)/16 = 1/2, −1/4.",
            "finalAnswer": "(i) {3, 5}; (ii) {1 − √5, 1 + √5}; (iii) {−3/4, 0}; (iv) {1 − √6/3, 1 + √6/3}; (v) {4/3, 3/2}; (vi) {−1/4, 1/2}.",
            "steps": [
              "Apply x = [−b ± √(b² − 4ac)]/(2a) to each standard-form equation.",
              "(i) Δ = 64 − 60 = 4, so x = (8 ± 2)/2 = 3, 5.",
              "(ii) Δ = 4 + 16 = 20, so x = (2 ± √20)/2 = 1 ± √5.",
              "(iii) Δ = 9, so x = (−3 ± 3)/8 = 0, −3/4.",
              "(iv) 3x² − 6x + 1 = 0, Δ = 24, so x = (6 ± √24)/6 = 1 ± √6/3.",
              "(v) Δ = 289 − 288 = 1, so x = (17 ± 1)/12 = 3/2, 4/3.",
              "(vi) Multiply by 24: 8x² − 2x − 1 = 0; Δ = 36, so x = (2 ± 6)/16 = 1/2, −1/4."
            ],
            "method": "Quadratic equations"
          },
          {
            "num": "Q4",
            "question": "Find all solutions: (i) t² − 8t + 7 = 0; (ii) 72 + 6x = x²; (iii) r² + 4r + 1 = 0; (iv) x(x + 10) = 10(−10 − x).",
            "solution": "(i) (t − 1)(t − 7) = 0.\n(ii) x² − 6x − 72 = 0 = (x − 12)(x + 6).\n(iii) r = [−4 ± √(16 − 4)]/2.\n(iv) x² + 20x + 100 = 0 = (x + 10)².",
            "finalAnswer": "(i) {1, 7}; (ii) {−6, 12}; (iii) {−2 − √3, −2 + √3}; (iv) {−10} (double root).",
            "steps": [
              "(i) (t − 1)(t − 7) = 0.",
              "(ii) x² − 6x − 72 = 0 = (x − 12)(x + 6).",
              "(iii) r = [−4 ± √(16 − 4)]/2.",
              "(iv) x² + 20x + 100 = 0 = (x + 10)²."
            ],
            "method": "Quadratic equations"
          },
          {
            "num": "Q5",
            "question": "The equation (y + 13)(y + a) has no linear term. Find the value of a.",
            "solution": "Expand: (y + 13)(y + a) = y² + (a + 13)y + 13a.\nFor there to be no linear term, a + 13 = 0.",
            "finalAnswer": "a = −13.",
            "steps": [
              "Expand: (y + 13)(y + a) = y² + (a + 13)y + 13a.",
              "For there to be no linear term, a + 13 = 0."
            ],
            "method": "Quadratic equations"
          },
          {
            "num": "Q6",
            "question": "The equation ax² + 5x = 3 has x = 1 as a solution. What is the other solution?",
            "solution": "Substitute x = 1: a + 5 = 3, so a = −2.\nThe equation becomes −2x² + 5x − 3 = 0 = (x − 1)(−2x + 3).",
            "finalAnswer": "The other solution is x = 3/2.",
            "steps": [
              "Substitute x = 1: a + 5 = 3, so a = −2.",
              "The equation becomes −2x² + 5x − 3 = 0 = (x − 1)(−2x + 3)."
            ],
            "method": "Quadratic equations"
          },
          {
            "num": "Q7",
            "question": "What is the positive difference of the roots of x² − 7x − 9 = 0?",
            "solution": "The roots are [7 ± √(49 + 36)]/2 = (7 ± √85)/2. Their positive difference is √85.",
            "finalAnswer": "√85.",
            "steps": [
              "The roots are [7 ± √(49 + 36)]/2 = (7 ± √85)/2. Their positive difference is √85."
            ],
            "method": "Quadratic equations"
          }
        ]
      },
      {
        "exercise": "1.2",
        "title": "Exercise 1.2 — Equations Reducible to Quadratic Form",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "Solve x⁴ − 5x² + 4 = 0.",
            "solution": "Let y = x². Then (y − 1)(y − 4) = 0, so x² = 1 or 4.",
            "finalAnswer": "{−2, −1, 1, 2}",
            "steps": [
              "Let y = x². Then (y − 1)(y − 4) = 0, so x² = 1 or 4."
            ],
            "method": "Biquadratic substitution"
          },
          {
            "num": "Q1(ii)",
            "question": "Solve x⁴ − 7x² + 12 = 0.",
            "solution": "Let y = x². Then (y − 3)(y − 4) = 0.",
            "finalAnswer": "{−2, −√3, √3, 2}",
            "steps": [
              "Let y = x². Then (y − 3)(y − 4) = 0."
            ],
            "method": "Biquadratic substitution"
          },
          {
            "num": "Q1(iii)",
            "question": "Solve 6x⁴ − 13x² + 5 = 0.",
            "solution": "Let y = x². Then (3y − 5)(2y − 1) = 0, so x² = 5/3 or 1/2.",
            "finalAnswer": "{±√(5/3), ±√(1/2)}",
            "steps": [
              "Let y = x². Then (3y − 5)(2y − 1) = 0, so x² = 5/3 or 1/2."
            ],
            "method": "Biquadratic substitution"
          },
          {
            "num": "Q1(iv)",
            "question": "Solve x + 2 − 1/(x + 2) = 3/2.",
            "solution": "Put y = x + 2 (y ≠ 0). Then y − 1/y = 3/2, so 2y² − 3y − 2 = 0 = (2y + 1)(y − 2).",
            "finalAnswer": "{0, −5/2}",
            "steps": [
              "Put y = x + 2 (y ≠ 0). Then y − 1/y = 3/2, so 2y² − 3y − 2 = 0 = (2y + 1)(y − 2)."
            ],
            "method": "Rational substitution"
          },
          {
            "num": "Q1(v)",
            "question": "Solve x − 4/x = 2.",
            "solution": "x ≠ 0. Multiply by x: x² − 2x − 4 = 0.",
            "finalAnswer": "{1 + √5, 1 − √5}",
            "steps": [
              "x ≠ 0. Multiply by x: x² − 2x − 4 = 0."
            ],
            "method": "Reciprocal equation"
          },
          {
            "num": "Q1(vi)",
            "question": "Solve (x + 2)/(x − 2) − (x − 2)/(x + 2) = 5/6.",
            "solution": "x ≠ ±2. Combine fractions: 48x = 5(x² − 4), so 5x² − 48x − 20 = 0.",
            "finalAnswer": "{10, −2/5}",
            "steps": [
              "x ≠ ±2. Combine fractions: 48x = 5(x² − 4), so 5x² − 48x − 20 = 0."
            ],
            "method": "Rational equation"
          },
          {
            "num": "Q1(vii)",
            "question": "Solve 3(x² + 1/x²) − 16(x + 1/x) + 26 = 0.",
            "solution": "Let y = x + 1/x. Then 3y² − 16y + 20 = 0, so y = 2 or 10/3. Back-substitute into each quadratic in x.",
            "finalAnswer": "{1, 3, 1/3}",
            "steps": [
              "Let y = x + 1/x. Then 3y² − 16y + 20 = 0, so y = 2 or 10/3. Back-substitute into each quadratic in x."
            ],
            "method": "Reciprocal substitution"
          },
          {
            "num": "Q1(viii)",
            "question": "Solve (x + 1/x)² − 10(x + 1/x) + 16 = 0.",
            "solution": "Let y = x + 1/x. Then (y − 2)(y − 8) = 0. Solve x + 1/x = 2 and x + 1/x = 8.",
            "finalAnswer": "{1, 4 + √15, 4 − √15}",
            "steps": [
              "Let y = x + 1/x. Then (y − 2)(y − 8) = 0. Solve x + 1/x = 2 and x + 1/x = 8."
            ],
            "method": "Reciprocal substitution"
          },
          {
            "num": "Q1(ix)",
            "question": "Solve x² + 1/x² − (x − 1/x) − 4 = 0.",
            "solution": "Let y = x − 1/x; then x² + 1/x² = y² + 2. Thus y² − y − 2 = 0, so y = 2 or −1. Back-substitute.",
            "finalAnswer": "{1 + √2, 1 − √2, (−1 + √5)/2, (−1 − √5)/2}",
            "steps": [
              "Let y = x − 1/x; then x² + 1/x² = y² + 2. Thus y² − y − 2 = 0, so y = 2 or −1. Back-substitute."
            ],
            "method": "Reciprocal substitution"
          },
          {
            "num": "Q1(x)",
            "question": "Solve 3^(2x) − 10·3^x + 9 = 0.",
            "solution": "Let y = 3^x > 0. Then y² − 10y + 9 = 0 = (y − 1)(y − 9).",
            "finalAnswer": "{0, 2}",
            "steps": [
              "Let y = 3^x > 0. Then y² − 10y + 9 = 0 = (y − 1)(y − 9)."
            ],
            "method": "Exponential substitution"
          },
          {
            "num": "Q1(xi)",
            "question": "Solve 3·3^(2x + 1) − 10·3^x + 1 = 0.",
            "solution": "Let y = 3^x > 0. Then 9y² − 10y + 1 = 0 = (9y − 1)(y − 1).",
            "finalAnswer": "{−2, 0}",
            "steps": [
              "Let y = 3^x > 0. Then 9y² − 10y + 1 = 0 = (9y − 1)(y − 1)."
            ],
            "method": "Exponential substitution"
          },
          {
            "num": "Q1(xii)",
            "question": "Solve 5^(x + 1) + 5^(2 − x) = 126.",
            "solution": "Let y = 5^x > 0. Then 5y + 25/y = 126, so 5y² − 126y + 25 = 0.",
            "finalAnswer": "{−1, 2}",
            "steps": [
              "Let y = 5^x > 0. Then 5y + 25/y = 126, so 5y² − 126y + 25 = 0."
            ],
            "method": "Exponential substitution"
          },
          {
            "num": "Q1(xiii)",
            "question": "Solve (x − 3)(x + 9)(x + 5)(x − 7) = 385.",
            "solution": "Pair factors with matching sums and let y = x² + 2x. Then (y − 15)(y − 63) = 385, so y = 8 or 70.",
            "finalAnswer": "{2, −4, −1 + √71, −1 − √71}",
            "steps": [
              "Pair factors with matching sums and let y = x² + 2x. Then (y − 15)(y − 63) = 385, so y = 8 or 70."
            ],
            "method": "Grouped factors"
          },
          {
            "num": "Q1(xiv)",
            "question": "Solve (x + 1)(x + 2)(x + 3)(x + 4) + 1 = 0.",
            "solution": "Pair outer and inner factors. With y = x² + 5x + 5, the equation reduces to y² = 0.",
            "finalAnswer": "{(−5 + √5)/2, (−5 − √5)/2}",
            "steps": [
              "Pair outer and inner factors. With y = x² + 5x + 5, the equation reduces to y² = 0."
            ],
            "method": "Grouped factors"
          },
          {
            "num": "Q1(xv)",
            "question": "Solve (x + 1)(x + 3)(x + 5)(x + 7) + 16 = 0.",
            "solution": "Pair (x + 1)(x + 7) and (x + 3)(x + 5). Put y = x² + 8x + 11; then y² = 0.",
            "finalAnswer": "{−4 + √5, −4 − √5}",
            "steps": [
              "Pair (x + 1)(x + 7) and (x + 3)(x + 5). Put y = x² + 8x + 11; then y² = 0."
            ],
            "method": "Grouped factors"
          },
          {
            "num": "Q2",
            "question": "Solve x⁴ − 2x³ − 2x² + 2x + 1 = 0.",
            "solution": "Divide by x² (x ≠ 0) and set y = x − 1/x. The equation becomes y² − 2y = 0. Solve y = 0 or y = 2, then return to x.",
            "finalAnswer": "{−1, 1, 1 + √2, 1 − √2}",
            "steps": [
              "Divide by x² (x ≠ 0) and set y = x − 1/x. The equation becomes y² − 2y = 0. Solve y = 0 or y = 2, then return to x."
            ],
            "method": "Reciprocal substitution"
          }
        ]
      },
      {
        "exercise": "1.3",
        "title": "Exercise 1.3 — Radical Equations",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "Solve √(5x + 21) = x + 3.",
            "solution": "Squaring gives x² + x − 12 = 0, with candidates 3 and −4. Checking the original equation rejects −4.",
            "finalAnswer": "{3}",
            "steps": [
              "Squaring gives x² + x − 12 = 0, with candidates 3 and −4. Checking the original equation rejects −4."
            ],
            "method": "Radical equation; check for extraneous roots"
          },
          {
            "num": "Q1(ii)",
            "question": "Solve √(2x − 1) = x − 2.",
            "solution": "Domain requires x ≥ 2. Squaring gives x² − 6x + 5 = 0; only x = 5 meets the domain and original equation.",
            "finalAnswer": "{5}",
            "steps": [
              "Domain requires x ≥ 2. Squaring gives x² − 6x + 5 = 0; only x = 5 meets the domain and original equation."
            ],
            "method": "Radical equation; check domain"
          },
          {
            "num": "Q1(iii)",
            "question": "Solve √(4x + 5) = 2x − 5.",
            "solution": "The right side requires x ≥ 5/2. Squaring gives (x − 1)(x − 5) = 0; retain only x = 5.",
            "finalAnswer": "{5}",
            "steps": [
              "The right side requires x ≥ 5/2. Squaring gives (x − 1)(x − 5) = 0; retain only x = 5."
            ],
            "method": "Radical equation; check domain"
          },
          {
            "num": "Q1(iv)",
            "question": "Solve √(29 − 4x) = 2x + 3.",
            "solution": "Require 2x + 3 ≥ 0. Squaring gives x² + 4x − 5 = 0, with candidates 1 and −5. Only 1 satisfies the original equation.",
            "finalAnswer": "{1}",
            "steps": [
              "Require 2x + 3 ≥ 0. Squaring gives x² + 4x − 5 = 0, with candidates 1 and −5. Only 1 satisfies the original equation."
            ],
            "method": "Radical equation; check domain"
          },
          {
            "num": "Q1(v)",
            "question": "Solve √(x + 7) + √(x + 2) = √(6x + 13).",
            "solution": "Require x ≥ −2. Squaring twice yields (3x + 5)(x − 2) = 0. Checking leaves x = 2.",
            "finalAnswer": "{2}",
            "steps": [
              "Require x ≥ −2. Squaring twice yields (3x + 5)(x − 2) = 0. Checking leaves x = 2."
            ],
            "method": "Radical equation; check for extraneous roots"
          },
          {
            "num": "Q1(vi)",
            "question": "Solve √x + √(3x + 1) = √(5x + 1).",
            "solution": "Require x ≥ 0. Squaring and isolating a radical gives x(11x + 4) = 0. The domain leaves x = 0.",
            "finalAnswer": "{0}",
            "steps": [
              "Require x ≥ 0. Squaring and isolating a radical gives x(11x + 4) = 0. The domain leaves x = 0."
            ],
            "method": "Radical equation; check domain"
          },
          {
            "num": "Q1(vii)",
            "question": "Solve √(6x + 40) − √(x + 21) = √(x + 5).",
            "solution": "Require x ≥ −5. Move one radical and square twice to obtain 12x + 56 = 0. Check the resulting value in the original equation.",
            "finalAnswer": "{−14/3}",
            "steps": [
              "Require x ≥ −5. Move one radical and square twice to obtain 12x + 56 = 0. Check the resulting value in the original equation."
            ],
            "method": "Radical equation; check for extraneous roots"
          },
          {
            "num": "Q1(viii)",
            "question": "Solve √(2x − 3) + √(2x + 4) = √(6x + 13).",
            "solution": "Require x ≥ 3/2. Squaring twice gives (3x + 8)(x − 6) = 0. Retain x = 6.",
            "finalAnswer": "{6}",
            "steps": [
              "Require x ≥ 3/2. Squaring twice gives (3x + 8)(x − 6) = 0. Retain x = 6."
            ],
            "method": "Radical equation; check domain"
          },
          {
            "num": "Q1(ix)",
            "question": "Solve √(x² + 2x + 4) + √(x² + 2x + 9) = 5.",
            "solution": "Let y = x² + 2x. Squaring and simplifying gives y = 0. Thus x² + 2x = 0.",
            "finalAnswer": "{−2, 0}",
            "steps": [
              "Let y = x² + 2x. Squaring and simplifying gives y = 0. Thus x² + 2x = 0."
            ],
            "method": "Shared quadratic expression"
          },
          {
            "num": "Q1(x)",
            "question": "Solve √(2x² + 3x + 5) + √(2x² + 3x + 1) = 2.",
            "solution": "Let y = 2x² + 3x + 1 ≥ 0. Then √(y + 4) + √y = 2, which gives y = 0. Solve 2x² + 3x + 1 = 0.",
            "finalAnswer": "{−1, −1/2}",
            "steps": [
              "Let y = 2x² + 3x + 1 ≥ 0. Then √(y + 4) + √y = 2, which gives y = 0. Solve 2x² + 3x + 1 = 0."
            ],
            "method": "Shared quadratic expression"
          },
          {
            "num": "Q2",
            "question": "Find 2x + 5 if x satisfies √(40 − 9x) − 2√(7 − x) = √(−x).",
            "solution": "x = −9 satisfies the equation: √121 − 2√16 = 11 − 8 = 3 = √9. Therefore evaluate 2x + 5.",
            "finalAnswer": "−13",
            "steps": [
              "x = −9 satisfies the equation: √121 − 2√16 = 11 − 8 = 3 = √9. Therefore evaluate 2x + 5."
            ],
            "method": "Substitution and verification"
          }
        ]
      },
      {
        "exercise": "Review Exercise 1",
        "title": "Review Exercise 1",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "If (x + 1)(x − 5) = 0, choose the solution pair.",
            "solution": "Use the zero-product property: x + 1 = 0 or x − 5 = 0.",
            "finalAnswer": "x = −1, 5",
            "steps": [
              "Use the zero-product property: x + 1 = 0 or x − 5 = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(ii)",
            "question": "If x² − x − 1 = 0, choose x.",
            "solution": "Apply the quadratic formula.",
            "finalAnswer": "x = (1 ± √5)/2",
            "steps": [
              "Apply the quadratic formula."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(iii)",
            "question": "Is (−1 ± √5)/2 further simplifiable?",
            "solution": "√5 has no square factor greater than 1.",
            "finalAnswer": "It cannot be simplified.",
            "steps": [
              "√5 has no square factor greater than 1."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(iv)",
            "question": "For the quadratic formula applied to 2x² − x = 3, identify a, b and c.",
            "solution": "Write standard form: 2x² − x − 3 = 0.",
            "finalAnswer": "a = 2, b = −1, c = −3",
            "steps": [
              "Write standard form: 2x² − x − 3 = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(v)",
            "question": "If x² − 3x − 4 = 0, choose its roots.",
            "solution": "Factor: (x − 4)(x + 1) = 0.",
            "finalAnswer": "x = 4, −1",
            "steps": [
              "Factor: (x − 4)(x + 1) = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(vi)",
            "question": "Solve 2x² + 4x − 9 = 0.",
            "solution": "The discriminant is 16 + 72 = 88.",
            "finalAnswer": "x = (−2 ± √22)/2",
            "steps": [
              "The discriminant is 16 + 72 = 88."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(vii)",
            "question": "Solve x² − 1/4 = 0.",
            "solution": "Use the square-root property.",
            "finalAnswer": "x = ±1/2",
            "steps": [
              "Use the square-root property."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(viii)",
            "question": "Solve x² + 7x − 18 = 0.",
            "solution": "Factor: (x + 9)(x − 2) = 0.",
            "finalAnswer": "x = 2, −9",
            "steps": [
              "Factor: (x + 9)(x − 2) = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q1(ix)",
            "question": "Which values are roots of x² − 8x + 15 = 0?",
            "solution": "Factor: (x − 3)(x − 5) = 0.",
            "finalAnswer": "x = 3 or x = 5",
            "steps": [
              "Factor: (x − 3)(x − 5) = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q2",
            "question": "Solve 2w⁴ − 5w² + 2 = 0.",
            "solution": "Let y = w². Then (2y − 1)(y − 2) = 0.",
            "finalAnswer": "w = ±1/√2, ±√2",
            "steps": [
              "Let y = w². Then (2y − 1)(y − 2) = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q3",
            "question": "Find a and b such that x = −1 and x = 1 are roots of ax² + bx + 2 = 0.",
            "solution": "Substitute each root: a − b + 2 = 0 and a + b + 2 = 0.",
            "finalAnswer": "a = −2, b = 0",
            "steps": [
              "Substitute each root: a − b + 2 = 0 and a + b + 2 = 0."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q4",
            "question": "Find x such that x² + 5x + 6 and x² + 19x + 34 are equal.",
            "solution": "Equate and cancel x²: 5x + 6 = 19x + 34.",
            "finalAnswer": "x = −2",
            "steps": [
              "Equate and cancel x²: 5x + 6 = 19x + 34."
            ],
            "method": "Algebraic solution"
          },
          {
            "num": "Q5",
            "question": "Find the roots of 49x² − 316x + 132 = 0.",
            "solution": "The discriminant is 73,984 = 272².",
            "finalAnswer": "x = 6 or x = 22/49",
            "steps": [
              "The discriminant is 73,984 = 272²."
            ],
            "method": "Algebraic solution"
          }
        ]
      }
    ],
    "slos": [
      "Define a quadratic equation in standard and pure forms",
      "Solve quadratic equations by factorization and completing square",
      "Derive the quadratic formula and apply it to solve equations",
      "Solve equations reducible to quadratic forms (biquadratic, reciprocal, exponential, grouped)",
      "Solve radical equations and identify extraneous roots"
    ],
    "formulaSheet": [
      {
        "name": "Standard Quadratic Form",
        "formula": "ax² + bx + c = 0, a ≠ 0",
        "note": "Canonical form required before applying formula or factorization."
      },
      {
        "name": "Pure Quadratic Form",
        "formula": "ax² + c = 0 (b = 0)",
        "note": "Symmetric roots x = ±√(-c/a)."
      },
      {
        "name": "Quadratic Formula",
        "formula": "x = [-b ± √(b² - 4ac)] / (2a)",
        "note": "Universal solution formula for any quadratic equation."
      },
      {
        "name": "Completing Square Term",
        "formula": "Term to add = (b / 2a)²",
        "note": "Creates a perfect trinomial square."
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 2,
    "id": "u2",
    "title": "Theory of Quadratic Equations",
    "titleUrdu": "دو درجی مساواتوں کا نظریہ",
    "status": "ready",
    "badge": "Sections, examples and exercises restored in printed order",
    "pageRange": "Pages 22–49",
    "description": "Unit 2: Theory of Quadratic Equations, pages 22–49. Includes Sections 2.1–2.7, Examples 1–27, Exercises 2.1–2.7, and Review Exercise 2 in scanned textbook order.",
    "sections": [
      {
        "id": "2.1",
        "title": "2.1 The Nature of the Roots",
        "theory": "For ax² + bx + c = 0, the expression D = b² − 4ac under the radical in the quadratic formula is the discriminant. The sign of D determines whether the roots are real or imaginary; when D is positive, whether it is a perfect square determines whether the roots are rational or irrational.",
        "rules": [
          "D > 0 and a perfect square: two unequal real rational roots.",
          "D > 0 and not a perfect square: two unequal real irrational roots.",
          "D = 0: two equal real roots.",
          "D < 0: two unequal imaginary (non-real complex) roots."
        ]
      },
      {
        "id": "2.2",
        "title": "2.2 Cube Roots of Unity",
        "theory": "The three cube roots of unity are 1, ω and ω², where ω = (−1 + i√3)/2 and ω² = (−1 − i√3)/2. The two non-real roots are conjugates. Their algebraic relations are used to simplify powers and factor cubic expressions.",
        "rules": [
          "ω³ = 1, so powers of ω repeat every three exponents.",
          "1 + ω + ω² = 0; hence 1 + ω = −ω², 1 + ω² = −ω and ω + ω² = −1.",
          "x³ + y³ = (x + y)(x + ωy)(x + ω²y)."
        ]
      },
      {
        "id": "2.3.1",
        "title": "2.3.1 The Sum and Product of Roots Without Solving",
        "theory": "For ax² + bx + c = 0, with a ≠ 0 and roots α, β, compare the equation with a(x − α)(x − β) = 0. This gives the sum and product of the roots directly from the coefficients.",
        "rules": [
          "α + β = −b/a.",
          "αβ = c/a."
        ]
      },
      {
        "id": "2.3.2",
        "title": "2.3.2 Values of Unknowns in a Quadratic Equation",
        "theory": "The sum and product formulas let us find an unknown coefficient when the roots satisfy a stated condition. For conditions involving α and β separately, use the known sum or product together with the given relation.",
        "rules": [
          "For roots α, β of ax² + bx + c = 0: S = α + β = −b/a and P = αβ = c/a.",
          "Translate each given condition into an equation in S, P, or the roots, then solve for the unknown coefficient."
        ]
      },
      {
        "id": "2.4",
        "title": "2.4 Symmetric Functions of the Roots of a Quadratic Equation",
        "theory": "A function of α and β is symmetric when its value is unchanged after the roots are interchanged. The book expresses common symmetric functions in terms of the coefficients using S = α + β = −b/a and P = αβ = c/a.",
        "rules": [
          "α² + β² = S² − 2P = (b² − 2ac)/a².",
          "α³ + β³ = S³ − 3PS = (3abc − b³)/a³.",
          "1/α + 1/β = S/P = −b/c.",
          "1/α² + 1/β² = (b² − 2ac)/c²."
        ]
      },
      {
        "id": "2.5",
        "title": "2.5 Formation of a Quadratic Equation Whose Roots Are Given",
        "theory": "If the two roots are r₁ and r₂, their monic quadratic equation is (x − r₁)(x − r₂) = 0. Expanding gives x² − (sum of roots)x + product of roots = 0. Clear denominators when a form with integer coefficients is preferred.",
        "rules": [
          "For roots r₁, r₂: x² − (r₁ + r₂)x + r₁r₂ = 0.",
          "For roots α², β², first find α² + β² and α²β²."
        ]
      },
      {
        "id": "2.6",
        "title": "2.6 Synthetic Division",
        "theory": "Synthetic division is a compact form of polynomial division when the divisor is linear, x − r. Write the dividend’s coefficients in descending powers, including zero coefficients for missing powers. Bring down the first coefficient, multiply by r, add down each column, and read the quotient coefficients and remainder from the final row.",
        "rules": [
          "For a divisor x − r, use r in the synthetic division row; for x + r, use −r.",
          "Include a zero for every missing power.",
          "The last entry is the remainder; remainder 0 means x − r is a factor."
        ]
      },
      {
        "id": "2.7.1",
        "title": "2.7.1 Solution of One Linear and One Quadratic Equation",
        "theory": "To solve a system containing one linear and one quadratic equation, isolate one variable in the linear equation, substitute that expression into the other equation, solve the resulting quadratic, and substitute each root back into the linear equation to form ordered pairs.",
        "rules": [
          "Substitute into the other equation, not back into the equation used to isolate the variable.",
          "Check each ordered pair in both original equations."
        ]
      },
      {
        "id": "2.7.2",
        "title": "2.7.2 Solution When Both Equations Are Quadratic",
        "theory": "When both equations are quadratic, eliminate one squared term by adding or subtracting suitable multiples of the equations. Substitute the resulting relation into an original equation and retain all ordered pairs that satisfy the system.",
        "rules": [
          "Eliminate a matching squared term before solving.",
          "Check every candidate pair in both equations."
        ]
      },
      {
        "id": "2.7.3",
        "title": "2.7.3 Real-Life Applications of Quadratic Equations",
        "theory": "Represent an unknown dimension, count, price, or number by a variable. Translate the stated relationships into an equation, solve the quadratic, then reject roots that do not fit the physical context, such as negative lengths or negative numbers of items.",
        "rules": [
          "Define each variable with units.",
          "Substitute the accepted root back into the context to find the requested quantity."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "title": "Example 1 (Page 24) — Finding the Discriminant",
        "problem": "Find the discriminant of x² + 9x + 2 = 0.",
        "given": "a = 1, b = 9, c = 2.",
        "method": "Use Δ = b² − 4ac.",
        "steps": [
          "Δ = 9² − 4(1)(2).",
          "Δ = 81 − 8 = 73."
        ],
        "answer": "73."
      },
      {
        "id": "eg2",
        "title": "Example 2 (Page 24) — Nature of Roots by the Discriminant",
        "problem": "Examine the nature of the roots: (i) x² − 8x + 16 = 0; (ii) x² + 9x + 2 = 0; (iii) 6x² − x − 15 = 0; (iv) 4x² + x + 1 = 0.",
        "given": "For each equation, calculate Δ = b² − 4ac.",
        "method": "A zero discriminant gives equal real roots; positive gives real unequal roots (rational if a perfect square); negative gives unequal imaginary roots.",
        "steps": [
          "(i) Δ = 64 − 64 = 0: real and equal.",
          "(ii) Δ = 81 − 8 = 73: real, unequal and irrational.",
          "(iii) Δ = 1 + 360 = 361 = 19²: real, unequal and rational.",
          "(iv) Δ = 1 − 16 = −15: unequal imaginary roots."
        ],
        "answer": "(i) Real, equal. (ii) Real, unequal, irrational. (iii) Real, unequal, rational. (iv) Unequal imaginary."
      },
      {
        "id": "eg3",
        "title": "Example 3 (Page 25) — Nature of Roots Verified by Factorization",
        "problem": "Determine the nature of the roots and verify by factorization: (i) x² − 6x + 9 = 0; (ii) x² + 5x + 6 = 0.",
        "given": "Both are quadratic equations in standard form.",
        "method": "Use the discriminant, then factor each equation to verify.",
        "steps": [
          "(i) Δ = 36 − 36 = 0, so roots are real and equal. Factor: (x − 3)² = 0, giving x = 3, 3.",
          "(ii) Δ = 25 − 24 = 1, a perfect square, so roots are real, unequal and rational. Factor: (x + 2)(x + 3) = 0, giving x = −2, −3."
        ],
        "answer": "(i) Equal roots 3, 3. (ii) Unequal rational roots −2, −3."
      },
      {
        "id": "eg4",
        "title": "Example 4 (Page 25) — Negative Discriminant",
        "problem": "Without solving, determine the nature of the roots of 3x² − 4x + 6 = 0.",
        "given": "a = 3, b = −4, c = 6.",
        "method": "Evaluate the discriminant.",
        "steps": [
          "Δ = (−4)² − 4(3)(6) = 16 − 72 = −56.",
          "Since Δ < 0, the equation has two unequal complex roots."
        ],
        "answer": "Two unequal imaginary roots."
      },
      {
        "id": "eg5",
        "title": "Example 5 (Page 25) — Positive Nonsquare Discriminant",
        "problem": "Without solving, determine the nature of the roots of 2x² − 7x = −1.",
        "given": "First write standard form: 2x² − 7x + 1 = 0.",
        "method": "Evaluate the discriminant.",
        "steps": [
          "a = 2, b = −7, c = 1.",
          "Δ = (−7)² − 4(2)(1) = 49 − 8 = 41.",
          "Since 41 is positive and not a perfect square, the roots are real, unequal and irrational."
        ],
        "answer": "Two real, unequal, irrational roots."
      },
      {
        "id": "eg6",
        "title": "Example 6 (Page 26) — Unknown Coefficients for Real Roots",
        "problem": "Find the values of k for which the equations have real roots: (i) kx² + 4x + 1 = 0; (ii) 2x² + kx + 3 = 0.",
        "given": "Use Δ ≥ 0 for real roots.",
        "method": "Apply the discriminant condition.",
        "steps": [
          "(i) Δ = 16 − 4k ≥ 0, so k ≤ 4.",
          "(ii) Δ = k² − 24 ≥ 0, so k² ≥ 24 and |k| ≥ 2√6."
        ],
        "answer": "(i) k ≤ 4. (ii) k ≥ 2√6 or k ≤ −2√6."
      },
      {
        "id": "eg7",
        "title": "Example 7 (Page 30) — Identity Using Cube Roots of Unity",
        "problem": "Show that x³ + y³ = (x + y)(x + wy)(x + w²y).",
        "given": "w³ = 1 and 1 + w + w² = 0.",
        "method": "Expand and use the two cube-root identities.",
        "steps": [
          "(x + wy)(x + w²y) = x² + (w + w²)xy + w³y².",
          "Using w + w² = −1 and w³ = 1 gives x² − xy + y².",
          "Multiply by (x + y): (x + y)(x² − xy + y²) = x³ + y³."
        ],
        "answer": "The right side equals x³ + y³."
      },
      {
        "id": "eg8",
        "title": "Example 8 (Page 30) — Powers of a Cube Root of Unity",
        "problem": "Evaluate w¹⁵, w²⁴, w⁹⁰, w¹⁰¹, w⁻², and w⁻¹³.",
        "given": "w³ = 1 and w⁻¹ = w².",
        "method": "Reduce exponents modulo 3.",
        "steps": [
          "w¹⁵ = (w³)⁵ = 1.",
          "w²⁴ = (w³)⁸ = 1; w⁹⁰ = (w³)³⁰ = 1.",
          "w¹⁰¹ = w⁹⁹w² = w².",
          "w⁻² = 1/w² = w; w⁻¹³ = 1/(w¹²w) = 1/w = w²."
        ],
        "answer": "1, 1, 1, w², w, w²."
      },
      {
        "id": "eg9",
        "title": "Example 9 (Page 30) — Complex Cube Roots of Unity",
        "problem": "Show that (−1 + i√3)³ + (−1 − i√3)³ = 16.",
        "given": "Let w = (−1 + i√3)/2, so w² = (−1 − i√3)/2 and w³ = 1.",
        "method": "Express each bracket in terms of w.",
        "steps": [
          "−1 + i√3 = 2w and −1 − i√3 = 2w².",
          "The left side is (2w)³ + (2w²)³ = 8w³ + 8w⁶.",
          "Since w³ = 1, this equals 8 + 8 = 16."
        ],
        "answer": "16."
      },
      {
        "id": "eg10",
        "title": "Example 10 (Page 32) — Sum and Product of Roots",
        "problem": "Without solving, find the sum and product of the roots: (i) 2x² − 3x − 4 = 0; (ii) 3x² + 6x − 2 = 0.",
        "given": "Use α + β = −b/a and αβ = c/a.",
        "method": "Read a, b and c from each equation and apply the coefficient relations.",
        "steps": [
          "(i) a = 2, b = −3, c = −4; α + β = 3/2 and αβ = −2.",
          "(ii) a = 3, b = 6, c = −2; α + β = −2 and αβ = −2/3."
        ],
        "answer": "(i) Sum = 3/2, product = −2. (ii) Sum = −2, product = −2/3."
      },
      {
        "id": "eg11",
        "title": "Example 11 (Page 32) — Find a Coefficient from the Root Relation",
        "problem": "Find k if the sum of the roots of 2x² + kx + 6 = 0 is three times their product.",
        "given": "a = 2, b = k, c = 6.",
        "method": "Express the sum and product in terms of k, then use the condition.",
        "steps": [
          "Sum = −k/2 and product = 3.",
          "−k/2 = 3(3) = 9.",
          "Therefore k = −18."
        ],
        "answer": "k = −18."
      },
      {
        "id": "eg12",
        "title": "Example 12 (Page 33) — Sum of Squares of Roots",
        "problem": "Find a if the sum of the squares of the roots of x² − 3ax + a² = 0 is 7.",
        "given": "Let the roots be α and β.",
        "method": "Use α² + β² = (α + β)² − 2αβ.",
        "steps": [
          "α + β = 3a and αβ = a².",
          "7 = (3a)² − 2a² = 7a².",
          "Thus a² = 1."
        ],
        "answer": "a = ±1."
      },
      {
        "id": "eg13",
        "title": "Example 13 (Page 33) — Roots Differ by One",
        "problem": "Find k if the roots of x² − 7x + k = 0 differ by unity.",
        "given": "Let the roots be α and α + 1.",
        "method": "Use the sum and product of roots.",
        "steps": [
          "α + (α + 1) = 7, so α = 3.",
          "The product is k = 3(4)."
        ],
        "answer": "k = 12."
      },
      {
        "id": "eg14",
        "title": "Example 14 (Page 33) — A Linear Condition on the Roots",
        "problem": "If α and β are roots of 9x² − 27x + k = 0, find k when 2α + 5β = 7.",
        "given": "α + β = 27/9 = 3 and αβ = k/9.",
        "method": "Solve the two linear equations for α and β, then use their product.",
        "steps": [
          "α + β = 3 and 2α + 5β = 7.",
          "Subtracting twice the first equation gives 3β = 1, so β = 1/3 and α = 8/3.",
          "αβ = 8/9 = k/9."
        ],
        "answer": "k = 8."
      },
      {
        "id": "eg15",
        "title": "Example 15 (Page 34) — Equal Sum and Product",
        "problem": "Find m and n if both the sum and product of the roots of mx² − 5x + n = 0 are 10.",
        "given": "The sum is 5/m and the product is n/m.",
        "method": "Set each coefficient relation equal to 10.",
        "steps": [
          "5/m = 10, so m = 1/2.",
          "n/m = 10, so n = 10m = 5."
        ],
        "answer": "m = 1/2 and n = 5."
      },
      {
        "id": "eg16",
        "title": "Example 16 (Page 35) — Symmetric Functions in the Coefficients",
        "problem": "If α and β are roots of ax² + bx + c = 0, express (i) α + β, (ii) αβ, (iii) α² + β², (iv) α³ + β³, (v) 1/α + 1/β, and (vi) 1/α² + 1/β² in terms of a, b and c.",
        "given": "S = α + β = −b/a; P = αβ = c/a.",
        "method": "Rewrite each expression using S and P.",
        "steps": [
          "(i) α + β = S = −b/a.",
          "(ii) αβ = P = c/a.",
          "(iii) α² + β² = S² − 2P = (b² − 2ac)/a².",
          "(iv) α³ + β³ = S³ − 3PS = (3abc − b³)/a³.",
          "(v) 1/α + 1/β = S/P = −b/c.",
          "(vi) 1/α² + 1/β² = (α² + β²)/P² = (b² − 2ac)/c²."
        ],
        "answer": "(i) −b/a; (ii) c/a; (iii) (b² − 2ac)/a²; (iv) (3abc − b³)/a³; (v) −b/c; (vi) (b² − 2ac)/c²."
      },
      {
        "id": "eg17",
        "title": "Example 17 (Page 37) — Form an Equation from Surd Roots",
        "problem": "Form the quadratic equation whose roots are 1 + √5 and 1 − √5.",
        "given": "Find the sum and product of the two roots.",
        "method": "Use x² − (sum)x + product = 0.",
        "steps": [
          "Sum = (1 + √5) + (1 − √5) = 2.",
          "Product = (1 + √5)(1 − √5) = 1 − 5 = −4.",
          "Substitute the sum and product into the monic equation."
        ],
        "answer": "x² − 2x − 4 = 0."
      },
      {
        "id": "eg18",
        "title": "Example 18 (Pages 37–38) — Form Equations from Given Roots",
        "problem": "Form a quadratic equation whose roots are (i) 2a + 1 and 2b + 1; (ii) a² and b²; (iii) 1/a and 1/b; (iv) 2/3 and 3/2.",
        "given": "For roots r₁ and r₂, use x² − (r₁ + r₂)x + r₁r₂ = 0.",
        "method": "Find each pair’s sum and product, or multiply the corresponding linear factors.",
        "steps": [
          "(i) Sum = 2a + 2b + 2; product = 4ab + 2a + 2b + 1.",
          "(ii) (x − a²)(x − b²) = 0.",
          "(iii) (ax − 1)(bx − 1) = 0.",
          "(iv) (3x − 2)(2x − 3) = 0."
        ],
        "answer": "(i) x² − (2a + 2b + 2)x + (4ab + 2a + 2b + 1) = 0; (ii) x² − (a² + b²)x + a²b² = 0; (iii) abx² − (a + b)x + 1 = 0; (iv) 10x² − 29x + 10 = 0."
      },
      {
        "id": "eg19",
        "title": "Example 19 (Page 40) — Synthetic Division with a Remainder",
        "problem": "Use synthetic division to find the quotient Q(x) and remainder R when 3x³ − 2x² − 150 is divided by x − 4.",
        "given": "P(x) = 3x³ − 2x² + 0x − 150; use 4 for divisor x − 4.",
        "method": "Apply synthetic division to the coefficient row 3, −2, 0, −150.",
        "steps": [
          "Bring down 3; multiply by 4 and add down to get 10.",
          "Multiply 10 by 4 and add down to get 40.",
          "Multiply 40 by 4 and add to −150 to get remainder 10."
        ],
        "answer": "Q(x) = 3x² + 10x + 40; R = 10.",
        "diagram": {
          "type": "synthetic-division",
          "root": 4,
          "coefficients": [
            3,
            -2,
            0,
            -150
          ],
          "products": [
            null,
            12,
            40,
            160
          ],
          "bottom": [
            3,
            10,
            40,
            10
          ],
          "title": "Synthetic division by x − 4"
        }
      },
      {
        "id": "eg20",
        "title": "Example 20 (Page 40) — Use a Root to Find k",
        "problem": "Use synthetic division to find k if 2 is a zero of 2x⁴ + x³ + kx² − 8.",
        "given": "P(x) = 2x⁴ + x³ + kx² + 0x − 8, and P(2) = 0.",
        "method": "Use 2 in synthetic division; the remainder must be zero.",
        "steps": [
          "The synthetic division bottom row is 2, 5, k + 10, 2k + 20, 4k + 32.",
          "Set the remainder 4k + 32 equal to zero."
        ],
        "answer": "k = −8.",
        "diagram": {
          "type": "synthetic-division",
          "root": 2,
          "coefficients": [
            2,
            1,
            "k",
            0,
            -8
          ],
          "products": [
            null,
            4,
            10,
            "2k+20",
            "4k+40"
          ],
          "bottom": [
            2,
            5,
            "k+10",
            "2k+20",
            "4k+32"
          ],
          "title": "Synthetic division by x − 2"
        }
      },
      {
        "id": "eg21",
        "title": "Example 21 (Page 41) — Find Coefficients from Two Factors",
        "problem": "Use synthetic division to find m and n if x − 1 and x + 2 are factors of x³ − mx² + nx + 12.",
        "given": "Since both divisors are factors, each corresponding remainder is zero.",
        "method": "Apply synthetic division first with 1 and then with −2.",
        "steps": [
          "Dividing by x − 1 gives remainder 13 − m + n = 0.",
          "Dividing by x + 2 gives remainder 3 + m + n = 0.",
          "Adding gives 16 + 2n = 0, so n = −8.",
          "Substitute in 13 − m + n = 0 to obtain m = 5."
        ],
        "answer": "m = 5 and n = −8."
      },
      {
        "id": "eg22",
        "title": "Example 22 (Page 42) — Find the Remaining Quartic Roots",
        "problem": "If −1 and 2 are roots of x⁴ − 5x² + 4 = 0, use synthetic division to find the other roots.",
        "given": "P(x) = x⁴ + 0x³ − 5x² + 0x + 4.",
        "method": "Divide successively by x + 1 and x − 2, then solve the remaining quadratic.",
        "steps": [
          "After division by x + 1 and x − 2, the remaining factor is x² + x − 2.",
          "Factor: x² + x − 2 = (x + 2)(x − 1)."
        ],
        "answer": "The other roots are −2 and 1."
      },
      {
        "id": "eg23",
        "title": "Example 23 (Page 43) — One Linear and One Quadratic Equation",
        "problem": "Solve the system 2x + y = 10 and 4x² + y² = 68.",
        "given": "From the linear equation, y = 10 − 2x.",
        "method": "Substitute into the quadratic equation, solve for x, then recover y.",
        "steps": [
          "4x² + (10 − 2x)² = 68, so 8x² − 40x + 32 = 0.",
          "Divide by 8 and factor: (x − 1)(x − 4) = 0.",
          "For x = 1, y = 8; for x = 4, y = 2."
        ],
        "answer": "Solution set = {(1, 8), (4, 2)}."
      },
      {
        "id": "eg24",
        "title": "Example 24 (Page 44) — Substitute into a Quadratic Equation",
        "problem": "Solve x − y = 7 and x² + 3xy + y² = −1.",
        "given": "From x − y = 7, x = 7 + y.",
        "method": "Substitute for x in the second equation and solve the resulting quadratic.",
        "steps": [
          "(7 + y)² + 3(7 + y)y + y² = −1.",
          "Simplifying gives 5y² + 35y + 50 = 0, or (y + 2)(y + 5) = 0.",
          "For y = −2, x = 5; for y = −5, x = 2."
        ],
        "answer": "Solution set = {(5, −2), (2, −5)}."
      },
      {
        "id": "eg25",
        "title": "Example 25 (Page 45) — Eliminate a Squared Variable",
        "problem": "Solve x² + y² = 4 and 2x² − y² = 8.",
        "given": "The y² terms cancel when the equations are added.",
        "method": "Add the equations, then substitute x into the first equation.",
        "steps": [
          "Adding gives 3x² = 12, so x = ±2.",
          "For either value, x² = 4; the first equation gives y² = 0, so y = 0."
        ],
        "answer": "Solution set = {(−2, 0), (2, 0)}."
      },
      {
        "id": "eg26",
        "title": "Example 26 (Page 46) — Dimensions of a Rectangular Shed",
        "problem": "A rectangular shed has area 120 square feet and is 7 feet longer than it is wide. Find its dimensions.",
        "given": "Let the width be x feet; the length is x + 7 feet.",
        "method": "Use area = width × length, solve the quadratic, and reject a negative dimension.",
        "steps": [
          "x(x + 7) = 120, so x² + 7x − 120 = 0.",
          "(x + 15)(x − 8) = 0, giving x = −15 or x = 8.",
          "A dimension cannot be negative, so the width is 8 ft and the length is 15 ft."
        ],
        "answer": "8 ft by 15 ft.",
        "diagram": {
          "type": "rectangle-area",
          "width": "x",
          "length": "x + 7",
          "area": "120 ft²",
          "title": "Rectangular shed dimensions"
        }
      },
      {
        "id": "eg27",
        "title": "Example 27 (Page 46) — Number of Shares Purchased",
        "problem": "A man paid Rs. 6000 for shares. If he had paid Rs. 20 less per share, he could have bought 10 more shares for the same amount. How many shares did he buy?",
        "given": "Let x be the number of shares and y the original price per share; xy = 6000.",
        "method": "Represent the changed number and price, substitute y = 6000/x, and solve for x.",
        "steps": [
          "(x + 10)(y − 20) = 6000 and y = 6000/x.",
          "Substitution and simplification give x² + 10x − 3000 = 0.",
          "(x − 50)(x + 60) = 0. Reject x = −60 because a share count cannot be negative."
        ],
        "answer": "He bought 50 shares."
      }
    ],
    "exercises": [
      {
        "exercise": "2.1",
        "title": "Exercise 2.1 — Discriminant and Nature of Roots",
        "problems": [
          {
            "num": "Q1",
            "question": "Find the discriminants: (i) x² − 4x + 13 = 0; (ii) 4x² − 5x + 1 = 0; (iii) x² + x + 1 = 0.",
            "solution": "Use Δ = b² − 4ac.\n(i) 16 − 52 = −36.\n(ii) 25 − 16 = 9.\n(iii) 1 − 4 = −3.",
            "finalAnswer": "(i) −36; (ii) 9; (iii) −3.",
            "steps": [
              "Use Δ = b² − 4ac.",
              "(i) 16 − 52 = −36.",
              "(ii) 25 − 16 = 9.",
              "(iii) 1 − 4 = −3."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q2",
            "question": "Examine the nature of the roots: (i) 3x² − 5x + 1 = 0; (ii) 6x² + x − 2 = 0; (iii) 3x² + 2x + 1 = 0.",
            "solution": "(i) Δ = 25 − 12 = 13 > 0 and not a square: real, unequal, irrational roots.\n(ii) Δ = 1 + 48 = 49: real, unequal, rational roots.\n(iii) Δ = 4 − 12 = −8 < 0: unequal imaginary roots.",
            "finalAnswer": "(i) Real, unequal, irrational. (ii) Real, unequal, rational. (iii) Imaginary, unequal.",
            "steps": [
              "(i) Δ = 25 − 12 = 13 > 0 and not a square: real, unequal, irrational roots.",
              "(ii) Δ = 1 + 48 = 49: real, unequal, rational roots.",
              "(iii) Δ = 4 − 12 = −8 < 0: unequal imaginary roots."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q3",
            "question": "For what values of k are the roots equal? (i) x² + kx + 9 = 0; (ii) 12x² + kx + 3 = 0; (iii) x² − 5x + k = 0.",
            "solution": "Equal roots require Δ = 0.\n(i) k² − 36 = 0.\n(ii) k² − 144 = 0.\n(iii) 25 − 4k = 0.",
            "finalAnswer": "(i) k = ±6; (ii) k = ±12; (iii) k = 25/4.",
            "steps": [
              "Equal roots require Δ = 0.",
              "(i) k² − 36 = 0.",
              "(ii) k² − 144 = 0.",
              "(iii) 25 − 4k = 0."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q4",
            "question": "Determine whether the equations have real roots; if so, find them: (i) x² + 5x + 5 = 0; (ii) 4x² + 12x + 9 = 0; (iii) 6x² + x − 2 = 0.",
            "solution": "(i) Δ = 5, so x = (−5 ± √5)/2.\n(ii) Δ = 0 and (2x + 3)² = 0.\n(iii) Factor 6x² + x − 2 = (3x + 2)(2x − 1).",
            "finalAnswer": "(i) Real roots (−5 ± √5)/2. (ii) Real equal root x = −3/2. (iii) Real roots x = −2/3, 1/2.",
            "steps": [
              "(i) Δ = 5, so x = (−5 ± √5)/2.",
              "(ii) Δ = 0 and (2x + 3)² = 0.",
              "(iii) Factor 6x² + x − 2 = (3x + 2)(2x − 1)."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q5",
            "question": "Determine the nature of the roots and verify by solving: (i) 3x² − 10x + 3 = 0; (ii) x² − 6x + 4 = 0; (iii) x² − 3 = 0.",
            "solution": "(i) Δ = 64, a perfect square; factor to (3x − 1)(x − 3) = 0.\n(ii) Δ = 20 > 0 and nonsquare; x = 3 ± √5.\n(iii) x² = 3; x = ±√3.",
            "finalAnswer": "(i) Real, unequal, rational: 1/3 and 3. (ii) Real, unequal, irrational: 3 ± √5. (iii) Real, unequal, irrational: ±√3.",
            "steps": [
              "(i) Δ = 64, a perfect square; factor to (3x − 1)(x − 3) = 0.",
              "(ii) Δ = 20 > 0 and nonsquare; x = 3 ± √5.",
              "(iii) x² = 3; x = ±√3."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q6",
            "question": "For what values of k are the roots (a) real and (b) imaginary? (i) 2x² + 3x + k = 0; (ii) kx² + 2x + 1 = 0; (iii) x² + 5x + k = 0.",
            "solution": "Use Δ ≥ 0 for real roots and Δ < 0 for imaginary roots.\n(i) 9 − 8k ≥ 0 or < 0.\n(ii) For k ≠ 0, Δ = 4 − 4k; when k = 0 the equation is linear, 2x + 1 = 0.\n(iii) 25 − 4k ≥ 0 or < 0.",
            "finalAnswer": "(i) Real k ≤ 9/8; imaginary k > 9/8. (ii) For k ≠ 0, real k ≤ 1 and imaginary k > 1; k = 0 gives one real linear root. (iii) Real k ≤ 25/4; imaginary k > 25/4.",
            "steps": [
              "Use Δ ≥ 0 for real roots and Δ < 0 for imaginary roots.",
              "(i) 9 − 8k ≥ 0 or < 0.",
              "(ii) For k ≠ 0, Δ = 4 − 4k; when k = 0 the equation is linear, 2x + 1 = 0.",
              "(iii) 25 − 4k ≥ 0 or < 0."
            ],
            "method": "Textbook method"
          }
        ]
      },
      {
        "exercise": "2.2",
        "title": "Exercise 2.2 — Cube Roots of Unity",
        "problems": [
          {
            "num": "Q1",
            "question": "Find the cube roots of: (i) −1; (ii) 8; (iii) −27.",
            "solution": "(i) The roots are −1 and (1 ± i√3)/2.\n(ii) The roots are 2 and −1 ± i√3.\n(iii) The roots are −3 and (3 ± 3i√3)/2.",
            "finalAnswer": "(i) {−1, (1 + i√3)/2, (1 − i√3)/2}; (ii) {2, −1 + i√3, −1 − i√3}; (iii) {−3, (3 + 3i√3)/2, (3 − 3i√3)/2}.",
            "steps": [
              "(i) The roots are −1 and (1 ± i√3)/2.",
              "(ii) The roots are 2 and −1 ± i√3.",
              "(iii) The roots are −3 and (3 ± 3i√3)/2."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q2",
            "question": "Evaluate: (i) w¹² + w⁵⁸ + w⁹⁵; (ii) (1 + w − w²)⁷; (iii) (1 + 3w − w²)(1 + w − 2w²).",
            "solution": "Use w³ = 1 and 1 + w + w² = 0.\n(i) Reduce exponents modulo 3: 1 + w + w² = 0.\n(ii) 1 + w − w² = −2w², so its seventh power is −128w¹⁴ = −128w².\n(iii) Substitute w² = −1 − w and simplify to 6(w − 1).",
            "finalAnswer": "(i) 0; (ii) −128w²; (iii) 6(w − 1).",
            "steps": [
              "Use w³ = 1 and 1 + w + w² = 0.",
              "(i) Reduce exponents modulo 3: 1 + w + w² = 0.",
              "(ii) 1 + w − w² = −2w², so its seventh power is −128w¹⁴ = −128w².",
              "(iii) Substitute w² = −1 − w and simplify to 6(w − 1)."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q3",
            "question": "Prove: (i) (1 + 2w)(1 + 2w²)(1 − w − w²) = 6; (ii) (−1 + i√3)⁴(−1 − i√3)⁵ = 512w².",
            "solution": "(i) Since w + w² = −1, the last factor is 2; also (1 + 2w)(1 + 2w²) = 3. Their product is 6.\n(ii) Write −1 + i√3 = 2w and −1 − i√3 = 2w². The product is 2⁹w¹⁴ = 512w².",
            "finalAnswer": "Both stated identities hold.",
            "steps": [
              "(i) Since w + w² = −1, the last factor is 2; also (1 + 2w)(1 + 2w²) = 3. Their product is 6.",
              "(ii) Write −1 + i√3 = 2w and −1 − i√3 = 2w². The product is 2⁹w¹⁴ = 512w²."
            ],
            "method": "Textbook method"
          },
          {
            "num": "Q4",
            "question": "Show: (i) x³ − y³ = (x − y)(x − wy)(x − w²y); (ii) (1 + w)(1 + w²)(1 + w⁴)(1 + w⁸) = 1.",
            "solution": "(i) Expand the right side using 1 + w + w² = 0 and w³ = 1; it reduces to x³ − y³.\n(ii) Reduce powers modulo 3: w⁴ = w and w⁸ = w². Each pair (1 + w)(1 + w²) equals 1.",
            "finalAnswer": "Both statements hold.",
            "steps": [
              "(i) Expand the right side using 1 + w + w² = 0 and w³ = 1; it reduces to x³ − y³.",
              "(ii) Reduce powers modulo 3: w⁴ = w and w⁸ = w². Each pair (1 + w)(1 + w²) equals 1."
            ],
            "method": "Textbook method"
          }
        ]
      },
      {
        "exercise": "2.3",
        "title": "Exercise 2.3 — Sum and Product of Roots",
        "problems": [
          {
            "num": "Q1",
            "question": "Without solving, find the sum and product of the roots: (i) 4x² − 4x − 3 = 0; (ii) 2x² + 5x + 6 = 0; (iii) 3x² + 2x − 5 = 0.",
            "solution": "(i) S = 4/4 = 1; P = −3/4.\n(ii) S = −5/2; P = 3.\n(iii) S = −2/3; P = −5/3.",
            "finalAnswer": "(i) 1, −3/4; (ii) −5/2, 3; (iii) −2/3, −5/3.",
            "steps": [
              "(i) S = 4/4 = 1; P = −3/4.",
              "(ii) S = −5/2; P = 3.",
              "(iii) S = −2/3; P = −5/3."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q2",
            "question": "Find k if the sum of the roots of 2x² + kx + 6 = 0 is equal to their product.",
            "solution": "Sum = −k/2 and product = 3.\n−k/2 = 3, so k = −6.",
            "finalAnswer": "k = −6.",
            "steps": [
              "Sum = −k/2 and product = 3.",
              "−k/2 = 3, so k = −6."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q3",
            "question": "Find k if the sum of the squares of the roots of x² − 5kx + 6k² = 0 is 13.",
            "solution": "S = 5k and P = 6k².\nα² + β² = S² − 2P = 25k² − 12k² = 13k².\n13k² = 13, so k² = 1.",
            "finalAnswer": "k = ±1.",
            "steps": [
              "S = 5k and P = 6k².",
              "α² + β² = S² − 2P = 25k² − 12k² = 13k².",
              "13k² = 13, so k² = 1."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q4",
            "question": "Find k if the roots of x² − 5x + k = 0 differ by unity.",
            "solution": "Let the roots be α and α + 1.\nTheir sum is 5, so 2α + 1 = 5 and α = 2.\nThe product is k = 2·3.",
            "finalAnswer": "k = 6.",
            "steps": [
              "Let the roots be α and α + 1.",
              "Their sum is 5, so 2α + 1 = 5 and α = 2.",
              "The product is k = 2·3."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q5",
            "question": "Find k if the roots of x² − 9x + k + 2 = 0 differ by three.",
            "solution": "Let the roots be α and α + 3.\nTheir sum is 9, so 2α + 3 = 9 and α = 3.\nTheir product is k + 2 = 3·6.",
            "finalAnswer": "k = 16.",
            "steps": [
              "Let the roots be α and α + 3.",
              "Their sum is 9, so 2α + 3 = 9 and α = 3.",
              "Their product is k + 2 = 3·6."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q6",
            "question": "If α and β are roots of x² − 5x + k = 0, find k if 3α + 2β = 12.",
            "solution": "α + β = 5 and 3α + 2β = 12.\nSubtract twice the first equation from the second: α = 2; hence β = 3.\nk = αβ = 6.",
            "finalAnswer": "k = 6.",
            "steps": [
              "α + β = 5 and 3α + 2β = 12.",
              "Subtract twice the first equation from the second: α = 2; hence β = 3.",
              "k = αβ = 6."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q7",
            "question": "Find m and n if the sum and product of the roots of mx² − 3x − n = 0 are both 3/5.",
            "solution": "The sum is 3/m and the product is −n/m.\n3/m = 3/5, so m = 5.\n−n/5 = 3/5, so n = −3.",
            "finalAnswer": "m = 5 and n = −3.",
            "steps": [
              "The sum is 3/m and the product is −n/m.",
              "3/m = 3/5, so m = 5.",
              "−n/5 = 3/5, so n = −3."
            ],
            "method": "Use the relations between the roots and coefficients."
          }
        ]
      },
      {
        "exercise": "2.4",
        "title": "Exercise 2.4 — Symmetric Functions and Forming Equations",
        "problems": [
          {
            "num": "Q1",
            "question": "If α and β are roots of ax² + bx + c = 0, find (i) α³β + β³α; (ii) (α − β)².",
            "solution": "Let S = −b/a and P = c/a.\n(i) α³β + β³α = P(α² + β²) = c(b² − 2ac)/a³.\n(ii) (α − β)² = S² − 4P = (b² − 4ac)/a².",
            "finalAnswer": "(i) c(b² − 2ac)/a³; (ii) (b² − 4ac)/a².",
            "steps": [
              "Let S = −b/a and P = c/a.",
              "(i) α³β + β³α = P(α² + β²) = c(b² − 2ac)/a³.",
              "(ii) (α − β)² = S² − 4P = (b² − 4ac)/a²."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q2",
            "question": "Find the quadratic equations whose roots are (i) 1 and 1/2; (ii) −3 and 4; (iii) 3 + √2 and 3 − √2; (iv) a and −2a.",
            "solution": "Use x² − Sx + P = 0 for each pair.\n(i) S = 3/2, P = 1/2. (ii) S = 1, P = −12.\n(iii) S = 6, P = 7. (iv) S = −a, P = −2a².",
            "finalAnswer": "(i) 2x² − 3x + 1 = 0; (ii) x² − x − 12 = 0; (iii) x² − 6x + 7 = 0; (iv) x² + ax − 2a² = 0.",
            "steps": [
              "Use x² − Sx + P = 0 for each pair.",
              "(i) S = 3/2, P = 1/2. (ii) S = 1, P = −12.",
              "(iii) S = 6, P = 7. (iv) S = −a, P = −2a²."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q3",
            "question": "Form a quadratic equation whose roots are the squares of the roots of ax² + bx + c = 0, where a ≠ 0.",
            "solution": "For original roots α, β, α² + β² = (b² − 2ac)/a² and α²β² = c²/a².\nUse these as the sum and product of the required roots, then clear denominators.",
            "finalAnswer": "a²x² − (b² − 2ac)x + c² = 0.",
            "steps": [
              "For original roots α, β, α² + β² = (b² − 2ac)/a² and α²β² = c²/a².",
              "Use these as the sum and product of the required roots, then clear denominators."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q4",
            "question": "If α and β are roots of 2x² + 3x + 1 = 0, find (i) α/β + β/α; (ii) 1/α² + 1/β²; (iii) α²/β + β²/α.",
            "solution": "S = −3/2, P = 1/2 and α² + β² = S² − 2P = 5/4.\n(i) (α² + β²)/P = 5/2. (ii) (α² + β²)/P² = 5.\n(iii) (α³ + β³)/P = −9/4.",
            "finalAnswer": "(i) 5/2; (ii) 5; (iii) −9/4.",
            "steps": [
              "S = −3/2, P = 1/2 and α² + β² = S² − 2P = 5/4.",
              "(i) (α² + β²)/P = 5/2. (ii) (α² + β²)/P² = 5.",
              "(iii) (α³ + β³)/P = −9/4."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q5",
            "question": "If α and β are roots of 3x² − 2x + 5 = 0, find the equation whose roots are α/β and β/α.",
            "solution": "S = 2/3 and P = 5/3.\nNew root sum = (α² + β²)/(αβ) = (S² − 2P)/P = −26/15.\nNew root product = 1.",
            "finalAnswer": "15x² + 26x + 15 = 0.",
            "steps": [
              "S = 2/3 and P = 5/3.",
              "New root sum = (α² + β²)/(αβ) = (S² − 2P)/P = −26/15.",
              "New root product = 1."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q6",
            "question": "If α and β are roots of x² − 4x + 2 = 0, find the equation whose roots are α + 1/α and β + 1/β.",
            "solution": "S = 4 and P = 2.\nNew sum = S + S/P = 6.\nNew product = P + (α² + β²)/P + 1/P = 2 + 6 + 1/2 = 17/2.",
            "finalAnswer": "2x² − 12x + 17 = 0.",
            "steps": [
              "S = 4 and P = 2.",
              "New sum = S + S/P = 6.",
              "New product = P + (α² + β²)/P + 1/P = 2 + 6 + 1/2 = 17/2."
            ],
            "method": "Use the relations between the roots and coefficients."
          }
        ]
      },
      {
        "exercise": "2.5",
        "title": "Exercise 2.5 — Synthetic Division",
        "problems": [
          {
            "num": "Q1",
            "question": "Use synthetic division to find quotient Q(x) and remainder R: (i) 3x³ + 2x² − x − 1 divided by x + 3; (ii) 2x³ − 7x² + 12x − 27 divided by x − 3; (iii) 2x⁴ − 3x² + 5x − 7 divided by x + 2.",
            "solution": "(i) Use −3 on coefficients 3,2,−1,−1: quotient 3x² − 7x + 20, remainder −61.\n(ii) Use 3 on coefficients 2,−7,12,−27: quotient 2x² − x + 9, remainder 0.\n(iii) Use −2 on coefficients 2,0,−3,5,−7: quotient 2x³ − 4x² + 5x − 5, remainder 3.",
            "finalAnswer": "(i) Q = 3x² − 7x + 20, R = −61; (ii) Q = 2x² − x + 9, R = 0; (iii) Q = 2x³ − 4x² + 5x − 5, R = 3.",
            "steps": [
              "(i) Use −3 on coefficients 3,2,−1,−1: quotient 3x² − 7x + 20, remainder −61.",
              "(ii) Use 3 on coefficients 2,−7,12,−27: quotient 2x² − x + 9, remainder 0.",
              "(iii) Use −2 on coefficients 2,0,−3,5,−7: quotient 2x³ − 4x² + 5x − 5, remainder 3."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q2",
            "question": "Use synthetic division to find k if −2 is a zero of x³ + 4x² + kx + 8.",
            "solution": "P(−2) = −8 + 16 − 2k + 8 = 0.\n16 − 2k = 0.",
            "finalAnswer": "k = 8.",
            "steps": [
              "P(−2) = −8 + 16 − 2k + 8 = 0.",
              "16 − 2k = 0."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q3",
            "question": "Find p and q if x + 1 and x − 2 are factors of x³ + px² + qx + 6.",
            "solution": "P(−1) = −1 + p − q + 6 = 0, so p − q = −5.\nP(2) = 8 + 4p + 2q + 6 = 0, so 2p + q = −7.\nSolving gives p = −4 and q = 1.",
            "finalAnswer": "p = −4 and q = 1.",
            "steps": [
              "P(−1) = −1 + p − q + 6 = 0, so p − q = −5.",
              "P(2) = 8 + 4p + 2q + 6 = 0, so 2p + q = −7.",
              "Solving gives p = −4 and q = 1."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q4",
            "question": "If x + 1 and x − 2 are factors of x³ + ax² + bx + 2, find a and b.",
            "solution": "P(−1) = −1 + a − b + 2 = 0, so a − b = −1.\nP(2) = 8 + 4a + 2b + 2 = 0, so 2a + b = −5.\nSolving gives a = −2, b = −1.",
            "finalAnswer": "a = −2 and b = −1.",
            "steps": [
              "P(−1) = −1 + a − b + 2 = 0, so a − b = −1.",
              "P(2) = 8 + 4a + 2b + 2 = 0, so 2a + b = −5.",
              "Solving gives a = −2, b = −1."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q5",
            "question": "One root of x³ − 7x − 6 = 0 is 3. Use synthetic division to find the other roots.",
            "solution": "Divide by x − 3: quotient x² + 3x + 2.\nFactor x² + 3x + 2 = (x + 1)(x + 2).",
            "finalAnswer": "The other roots are −1 and −2.",
            "steps": [
              "Divide by x − 3: quotient x² + 3x + 2.",
              "Factor x² + 3x + 2 = (x + 1)(x + 2)."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q6",
            "question": "If −1 and 2 are roots of x⁴ − 5x³ + 3x² + 7x − 2 = 0, use synthetic division to find the other roots.",
            "solution": "Divide successively by x + 1 and x − 2; the remaining factor is x² − 4x + 1.\nSolve x² − 4x + 1 = 0 using the quadratic formula.",
            "finalAnswer": "The other roots are 2 + √3 and 2 − √3.",
            "steps": [
              "Divide successively by x + 1 and x − 2; the remaining factor is x² − 4x + 1.",
              "Solve x² − 4x + 1 = 0 using the quadratic formula."
            ],
            "method": "Use the relations between the roots and coefficients."
          }
        ]
      },
      {
        "exercise": "2.6",
        "title": "Exercise 2.6 — Simultaneous Equations",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "Solve 2x − y = 3 and x² + y² = 2.",
            "solution": "y = 2x − 3; substitution gives 5x² − 12x + 7 = 0.\nx = 1 or 7/5; corresponding y values are −1 or −1/5.",
            "finalAnswer": "(1, −1), (7/5, −1/5)",
            "steps": [
              "y = 2x − 3; substitution gives 5x² − 12x + 7 = 0.",
              "x = 1 or 7/5; corresponding y values are −1 or −1/5."
            ],
            "method": "Substitute the linear equation into the quadratic."
          },
          {
            "num": "Q1(ii)",
            "question": "Solve x + 2y = 0 and x² + 4y² = 32.",
            "solution": "x = −2y; then 8y² = 32, so y = ±2.\nThe corresponding x values are ∓4.",
            "finalAnswer": "(−4, 2), (4, −2)",
            "steps": [
              "x = −2y; then 8y² = 32, so y = ±2.",
              "The corresponding x values are ∓4."
            ],
            "method": "Substitute the linear equation into the quadratic."
          },
          {
            "num": "Q1(iii)",
            "question": "Solve 2x − y = −8 and x² + 4x = y.",
            "solution": "Use y = 2x + 8 in x² + 4x = y.\nx² + 2x − 8 = 0 gives x = 2 or −4.\nThen y = 12 or 0.",
            "finalAnswer": "(2, 12), (−4, 0)",
            "steps": [
              "Use y = 2x + 8 in x² + 4x = y.",
              "x² + 2x − 8 = 0 gives x = 2 or −4.",
              "Then y = 12 or 0."
            ],
            "method": "Substitute and factor."
          },
          {
            "num": "Q1(iv)",
            "question": "Solve 2x + y = 4 and x² − 2x + y² = 3.",
            "solution": "Set y = 4 − 2x. Substitution gives x² − 2x + (4 − 2x)² = 3.\nSimplifying gives 5x² − 18x + 13 = 0 = (x − 1)(5x − 13).\nThus x = 1 or 13/5; the corresponding y values are 2 or −6/5.",
            "finalAnswer": "(1, 2), (13/5, −6/5).",
            "steps": [
              "Set y = 4 − 2x. Substitution gives x² − 2x + (4 − 2x)² = 3.",
              "Simplifying gives 5x² − 18x + 13 = 0 = (x − 1)(5x − 13).",
              "Thus x = 1 or 13/5; the corresponding y values are 2 or −6/5."
            ],
            "method": "Substitute and inspect the discriminant."
          },
          {
            "num": "Q1(v)",
            "question": "Solve 4x² + 5y² = 4 and 3x² + y² = 3.",
            "solution": "From the second equation, y² = 3 − 3x².\nSubstitute: 4x² + 15 − 15x² = 4, so x² = 1 and y² = 0.",
            "finalAnswer": "(−1, 0), (1, 0)",
            "steps": [
              "From the second equation, y² = 3 − 3x².",
              "Substitute: 4x² + 15 − 15x² = 4, so x² = 1 and y² = 0."
            ],
            "method": "Eliminate one squared variable."
          },
          {
            "num": "Q1(vi)",
            "question": "Solve 5x² = y² + 9 and x² = −y² + 45.",
            "solution": "Write 5x² − y² = 9 and x² + y² = 45.\nAdding gives 6x² = 54, so x² = 9 and y² = 36.",
            "finalAnswer": "(−3, −6), (−3, 6), (3, −6), (3, 6)",
            "steps": [
              "Write 5x² − y² = 9 and x² + y² = 45.",
              "Adding gives 6x² = 54, so x² = 9 and y² = 36."
            ],
            "method": "Eliminate y², then take both signs."
          },
          {
            "num": "Q1(vii)",
            "question": "Solve 4x² + 3y² − 5 = 0 and 2x² + 3y² − 4 = 0.",
            "solution": "Subtract the equations: 2x² = 1, so x² = 1/2.\nSubstitute to get 3y² = 3, so y² = 1.",
            "finalAnswer": "(−1/√2, −1), (−1/√2, 1), (1/√2, −1), (1/√2, 1)",
            "steps": [
              "Subtract the equations: 2x² = 1, so x² = 1/2.",
              "Substitute to get 3y² = 3, so y² = 1."
            ],
            "method": "Eliminate one squared variable."
          },
          {
            "num": "Q2(i)",
            "question": "Challenge: Solve x + y = 9 and x² + 3xy + 2y² = 0.",
            "solution": "Factor the quadratic expression: (x + y)(x + 2y) = 0.\nSince x + y = 9, x + 2y = 0; hence y = −9 and x = 18.",
            "finalAnswer": "(18, −9)",
            "steps": [
              "Factor the quadratic expression: (x + y)(x + 2y) = 0.",
              "Since x + y = 9, x + 2y = 0; hence y = −9 and x = 18."
            ],
            "method": "Factor and use the linear condition."
          },
          {
            "num": "Q2(ii)",
            "question": "Challenge: Solve y − x = 4 and 2x² + xy + y² = 8.",
            "solution": "Set y = x + 4. Substitution gives 4x² + 12x + 8 = 0.\nx² + 3x + 2 = 0 gives x = −1 or −2; then y = 3 or 2.",
            "finalAnswer": "(−1, 3), (−2, 2)",
            "steps": [
              "Set y = x + 4. Substitution gives 4x² + 12x + 8 = 0.",
              "x² + 3x + 2 = 0 gives x = −1 or −2; then y = 3 or 2."
            ],
            "method": "Substitute and factor."
          }
        ]
      },
      {
        "exercise": "2.7",
        "title": "Exercise 2.7 — Real-Life Applications of Quadratic Equations",
        "problems": [
          {
            "num": "Q1",
            "question": "Find two consecutive positive integers whose product is 72.",
            "solution": "Let them be x and x + 1. Then x(x + 1) = 72.\nx² + x − 72 = 0 = (x − 8)(x + 9); retain positive x = 8.",
            "finalAnswer": "8 and 9.",
            "steps": [
              "Let them be x and x + 1. Then x(x + 1) = 72.",
              "x² + x − 72 = 0 = (x − 8)(x + 9); retain positive x = 8."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q2",
            "question": "The sum of the squares of three consecutive integers is 50. Find the integers.",
            "solution": "Let the integers be x, x + 1, x + 2.\nx² + (x + 1)² + (x + 2)² = 50 gives x² + 2x − 15 = 0.\nx = 3 or −5.",
            "finalAnswer": "3, 4, 5 or −5, −4, −3.",
            "steps": [
              "Let the integers be x, x + 1, x + 2.",
              "x² + (x + 1)² + (x + 2)² = 50 gives x² + 2x − 15 = 0.",
              "x = 3 or −5."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q3",
            "question": "A hall is 5 metres longer than it is wide and has area 36 m². Find its dimensions.",
            "solution": "Let the width be x m: x(x + 5) = 36.\nx² + 5x − 36 = 0 = (x − 4)(x + 9).\nReject the negative width.",
            "finalAnswer": "Width 4 m; length 9 m.",
            "steps": [
              "Let the width be x m: x(x + 5) = 36.",
              "x² + 5x − 36 = 0 = (x − 4)(x + 9).",
              "Reject the negative width."
            ],
            "method": "Use the relations between the roots and coefficients.",
            "diagram": {
              "type": "rectangle-area",
              "width": "w",
              "length": "w + 5",
              "area": "36 m²",
              "title": "Hall dimensions"
            }
          },
          {
            "num": "Q4",
            "question": "Two numbers have sum 11 and the sum of their squares is 65. Find the numbers.",
            "solution": "Let the numbers be x and 11 − x.\nx² + (11 − x)² = 65 gives x² − 11x + 28 = 0.\nx = 4 or 7.",
            "finalAnswer": "4 and 7.",
            "steps": [
              "Let the numbers be x and 11 − x.",
              "x² + (11 − x)² = 65 gives x² − 11x + 28 = 0.",
              "x = 4 or 7."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q5",
            "question": "The sum of the squares of two numbers is 100. One number is 2 more than the other. Find them.",
            "solution": "Let the numbers be x and x + 2.\nx² + (x + 2)² = 100 gives x² + 2x − 48 = 0.\nx = 6 or −8.",
            "finalAnswer": "6 and 8, or −8 and −6.",
            "steps": [
              "Let the numbers be x and x + 2.",
              "x² + (x + 2)² = 100 gives x² + 2x − 48 = 0.",
              "x = 6 or −8."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q6",
            "question": "A rectangular field has area 252 m² and its length is 9 m more than its width. Find its sides.",
            "solution": "Let the width be x: x(x + 9) = 252.\nx² + 9x − 252 = 0 = (x − 12)(x + 21).\nReject the negative dimension.",
            "finalAnswer": "12 m by 21 m.",
            "steps": [
              "Let the width be x: x(x + 9) = 252.",
              "x² + 9x − 252 = 0 = (x − 12)(x + 21).",
              "Reject the negative dimension."
            ],
            "method": "Use the relations between the roots and coefficients.",
            "diagram": {
              "type": "rectangle-area",
              "width": "w",
              "length": "w + 9",
              "area": "252 m²",
              "title": "Field dimensions"
            }
          },
          {
            "num": "Q7",
            "question": "One side of a rectangle is 3 cm less than twice the other. Its area is 54 cm². Find the sides.",
            "solution": "Let one side be x; the other is 2x − 3.\nx(2x − 3) = 54 gives 2x² − 3x − 54 = 0.\n(2x + 9)(x − 6) = 0; retain x = 6.",
            "finalAnswer": "6 cm and 9 cm.",
            "steps": [
              "Let one side be x; the other is 2x − 3.",
              "x(2x − 3) = 54 gives 2x² − 3x − 54 = 0.",
              "(2x + 9)(x − 6) = 0; retain x = 6."
            ],
            "method": "Use the relations between the roots and coefficients.",
            "diagram": {
              "type": "rectangle-area",
              "width": "x",
              "length": "2x − 3",
              "area": "54 cm²",
              "title": "Rectangle side relation"
            }
          },
          {
            "num": "Q8",
            "question": "A right triangle has one leg 3 cm longer than the other and hypotenuse 15 cm. Find its sides.",
            "solution": "Let the shorter leg be x and the longer leg x + 3.\nx² + (x + 3)² = 15² gives x² + 3x − 108 = 0.\nx = 9 is the positive root, so the other leg is 12.",
            "finalAnswer": "9 cm, 12 cm and 15 cm.",
            "steps": [
              "Let the shorter leg be x and the longer leg x + 3.",
              "x² + (x + 3)² = 15² gives x² + 3x − 108 = 0.",
              "x = 9 is the positive root, so the other leg is 12."
            ],
            "method": "Use the relations between the roots and coefficients.",
            "diagram": {
              "type": "right-triangle",
              "base": "x",
              "height": "x + 3",
              "hypotenuse": "15 cm",
              "title": "Right triangle dimensions"
            }
          },
          {
            "num": "Q9",
            "question": "The sides of a right triangle are x − 1, x and x + 1 cm. Find the sides.",
            "solution": "The longest side is the hypotenuse: (x − 1)² + x² = (x + 1)².\nSimplifying gives x² − 4x = 0. Since a side must be positive, x = 4.",
            "finalAnswer": "3 cm, 4 cm and 5 cm.",
            "steps": [
              "The longest side is the hypotenuse: (x − 1)² + x² = (x + 1)².",
              "Simplifying gives x² − 4x = 0. Since a side must be positive, x = 4."
            ],
            "method": "Use the relations between the roots and coefficients.",
            "diagram": {
              "type": "right-triangle",
              "base": "x − 1",
              "height": "x",
              "hypotenuse": "x + 1",
              "title": "Consecutive right triangle sides"
            }
          },
          {
            "num": "Q10",
            "question": "A shepherd paid Rs. 9000 for goats. If he had paid Rs. 100 less for each goat, he would have received 3 more goats for the same amount. How many goats did he buy?",
            "solution": "Let x be the number of goats and y the price each: xy = 9000.\n(x + 3)(y − 100) = 9000. Substitute y = 9000/x to get x² + 3x − 270 = 0.\n(x + 18)(x − 15) = 0; reject the negative count.",
            "finalAnswer": "15 goats.",
            "steps": [
              "Let x be the number of goats and y the price each: xy = 9000.",
              "(x + 3)(y − 100) = 9000. Substitute y = 9000/x to get x² + 3x − 270 = 0.",
              "(x + 18)(x − 15) = 0; reject the negative count."
            ],
            "method": "Use the relations between the roots and coefficients."
          }
        ]
      },
      {
        "exercise": "Review Exercise 2",
        "title": "Review Exercise 2",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "If the sum of the roots of (a + 1)x² + (2a + 3)x + (3a + 4) = 0 is −7/3, find a.",
            "solution": "−(2a + 3)/(a + 1) = −7/3.\n3(2a + 3) = 7(a + 1), so a = 2.",
            "finalAnswer": "a = 2.",
            "steps": [
              "−(2a + 3)/(a + 1) = −7/3.",
              "3(2a + 3) = 7(a + 1), so a = 2."
            ],
            "method": "Use the sum-of-roots relation."
          },
          {
            "num": "Q1(ii)",
            "question": "A quadratic equation has root sum 2 and sum of cubes of its roots 98. Identify the equation.",
            "solution": "Let root product be P. α³ + β³ = (α + β)³ − 3αβ(α + β).\n98 = 8 − 6P, so P = −15.",
            "finalAnswer": "x² − 2x − 15 = 0.",
            "steps": [
              "Let root product be P. α³ + β³ = (α + β)³ − 3αβ(α + β).",
              "98 = 8 − 6P, so P = −15."
            ],
            "method": "Use the sum and product of roots."
          },
          {
            "num": "Q1(iii)",
            "question": "If a, b, c are positive real numbers, which statement is always true about the roots of ax² + bx + c = 0?",
            "solution": "The sum is −b/a < 0 and product is c/a > 0, but the discriminant can be positive or negative.",
            "finalAnswer": "None of the listed claims is always true.",
            "steps": [
              "The sum is −b/a < 0 and product is c/a > 0, but the discriminant can be positive or negative."
            ],
            "method": "Apply the coefficient relations and allow either sign of the discriminant."
          },
          {
            "num": "Q1(iv)",
            "question": "If α and β are roots of 4x² − 3x + 7 = 0, find 1/α + 1/β.",
            "solution": "(1/α) + (1/β) = (α + β)/(αβ) = (3/4)/(7/4).",
            "finalAnswer": "3/7.",
            "steps": [
              "(1/α) + (1/β) = (α + β)/(αβ) = (3/4)/(7/4)."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q2",
            "question": "For what value of k are the roots of 3x² − 5x + k = 0 equal?",
            "solution": "Set the discriminant equal to zero: 25 − 12k = 0.",
            "finalAnswer": "k = 25/12.",
            "steps": [
              "Set the discriminant equal to zero: 25 − 12k = 0."
            ],
            "method": "Use the equal-root discriminant condition."
          },
          {
            "num": "Q3",
            "question": "Evaluate (−1 + √−3)⁷ + (−1 − √−3)⁷.",
            "solution": "Let z = −1 + i√3 = 2(cos 120° + i sin 120°); its conjugate is 2(cos 120° − i sin 120°).\nThe sum of the seventh powers is 2·2⁷ cos(840°) = 256 cos 120° = −128.",
            "finalAnswer": "−128.",
            "steps": [
              "Let z = −1 + i√3 = 2(cos 120° + i sin 120°); its conjugate is 2(cos 120° − i sin 120°).",
              "The sum of the seventh powers is 2·2⁷ cos(840°) = 256 cos 120° = −128."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q4",
            "question": "Without solving, find root sums and products: (i) 4x² − 1 = 0; (ii) 3x² + 4x = 0.",
            "solution": "(i) S = 0 and P = −1/4.\n(ii) S = −4/3 and P = 0.",
            "finalAnswer": "(i) sum 0, product −1/4; (ii) sum −4/3, product 0.",
            "steps": [
              "(i) S = 0 and P = −1/4.",
              "(ii) S = −4/3 and P = 0."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q5",
            "question": "Find k so that the sum of the roots of 3x² + (2k + 1)x + k − 5 = 0 equals their product.",
            "solution": "Sum = −(2k + 1)/3 and product = (k − 5)/3.\nSet them equal: −(2k + 1) = k − 5.",
            "finalAnswer": "k = 4/3.",
            "steps": [
              "Sum = −(2k + 1)/3 and product = (k − 5)/3.",
              "Set them equal: −(2k + 1) = k − 5."
            ],
            "method": "Set the coefficient formulas equal."
          },
          {
            "num": "Q6",
            "question": "Find k if the roots of x² − 3x + k + 1 = 0 differ by unity.",
            "solution": "The roots have sum 3 and difference 1, so they are 1 and 2.\nTheir product is k + 1 = 2.",
            "finalAnswer": "k = 1.",
            "steps": [
              "The roots have sum 3 and difference 1, so they are 1 and 2.",
              "Their product is k + 1 = 2."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q7",
            "question": "Find the quadratic equation whose roots are the reciprocals of the roots of 12x² − 17x + 6 = 0.",
            "solution": "Original sum = 17/12 and product = 1/2.\nReciprocal roots have sum (17/12)/(1/2) = 17/6 and product 2.",
            "finalAnswer": "6x² − 17x + 12 = 0.",
            "steps": [
              "Original sum = 17/12 and product = 1/2.",
              "Reciprocal roots have sum (17/12)/(1/2) = 17/6 and product 2."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q8",
            "question": "One root of 2x² + kx + 4 = 0 is 2. Find the other root and k.",
            "solution": "Substitute x = 2: 8 + 2k + 4 = 0, so k = −6.\nThe product of the roots is 4/2 = 2; with one root 2, the other is 1.",
            "finalAnswer": "Other root 1; k = −6.",
            "steps": [
              "Substitute x = 2: 8 + 2k + 4 = 0, so k = −6.",
              "The product of the roots is 4/2 = 2; with one root 2, the other is 1."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q9",
            "question": "One root of x³ + 6x² + 11x + 6 = 0 is −3. Use synthetic division to find the other roots.",
            "solution": "Division by x + 3 gives x² + 3x + 2.\nx² + 3x + 2 = (x + 1)(x + 2).",
            "finalAnswer": "The other roots are −1 and −2.",
            "steps": [
              "Division by x + 3 gives x² + 3x + 2.",
              "x² + 3x + 2 = (x + 1)(x + 2)."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q10(i)",
            "question": "Solve x + y = 3 and x² − 3xy + y² = 29.",
            "solution": "x² + y² = (x + y)² − 2xy = 9 − 2xy.\nThus 9 − 5xy = 29, so xy = −4.\nThe numbers are roots of t² − 3t − 4 = 0, hence 4 and −1.",
            "finalAnswer": "(4, −1), (−1, 4).",
            "steps": [
              "x² + y² = (x + y)² − 2xy = 9 − 2xy.",
              "Thus 9 − 5xy = 29, so xy = −4.",
              "The numbers are roots of t² − 3t − 4 = 0, hence 4 and −1."
            ],
            "method": "Use the sum and product."
          },
          {
            "num": "Q10(ii)",
            "question": "Solve 7x² − 4 = 5y² and 3x² + 2 = 4y².",
            "solution": "Set X = x² and Y = y²: 7X − 5Y = 4 and 3X − 4Y = −2.\nSolving gives X = 2 and Y = 2.",
            "finalAnswer": "(±√2, ±√2), with all four sign combinations.",
            "steps": [
              "Set X = x² and Y = y²: 7X − 5Y = 4 and 3X − 4Y = −2.",
              "Solving gives X = 2 and Y = 2."
            ],
            "method": "Use the relations between the roots and coefficients."
          },
          {
            "num": "Q11",
            "question": "A rectangle has area 48 cm². Increasing both its length and width by 4 cm gives area 120 cm². Find its original dimensions.",
            "solution": "Let length and width be l and w. lw = 48 and (l + 4)(w + 4) = 120.\nExpanding gives 4(l + w) + 16 = 72, so l + w = 14.\nThe dimensions are roots of t² − 14t + 48 = 0 = (t − 6)(t − 8).",
            "finalAnswer": "6 cm and 8 cm.",
            "steps": [
              "Let length and width be l and w. lw = 48 and (l + 4)(w + 4) = 120.",
              "Expanding gives 4(l + w) + 16 = 72, so l + w = 14.",
              "The dimensions are roots of t² − 14t + 48 = 0 = (t − 6)(t − 8)."
            ],
            "method": "Use the relations between the roots and coefficients."
          }
        ]
      }
    ],
    "slos": [
      "Calculate the discriminant and determine the nature of roots",
      "Find cube roots of unity and establish relations (ω³=1, 1+ω+ω²=0)",
      "Form quadratic equations from given roots using x² - Sx + P = 0",
      "Apply synthetic division to find quotient, remainder, and factors",
      "Solve systems of simultaneous equations involving quadratic forms"
    ],
    "formulaSheet": [
      {
        "name": "Discriminant",
        "formula": "Δ = b² - 4ac",
        "note": "Determines reality, rationality, and equality of roots."
      },
      {
        "name": "Omega Fundamental Sum",
        "formula": "1 + ω + ω² = 0",
        "note": "Implying 1+ω = -ω², 1+ω² = -ω, ω+ω² = -1."
      },
      {
        "name": "Omega Fundamental Product",
        "formula": "ω³ = 1",
        "note": "Allows reduction of any power of ω: ω^(3k+r) = ω^r."
      },
      {
        "name": "Equation from Roots",
        "formula": "x² − Sx + P = 0",
        "note": "S = α + β = −b/a, P = αβ = c/a."
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 3,
    "id": "u3",
    "title": "Variations",
    "titleUrdu": "تغیرات",
    "status": "ready",
    "badge": "Sections, examples and exercises restored in printed order",
    "pageRange": "Pages 50–70",
    "description": "Unit 3: Variations, pages 50–70. Includes Sections 3.1–3.6, Examples 1–22, Exercises 3.1–3.5, and Review Exercise 3 in scanned textbook order.",
    "sections": [
      {
        "id": "3.1.1",
        "title": "3.1.1 Ratio",
        "theory": "A ratio compares two or more quantities of the same kind measured in the same unit. Write the quantities in a common unit, then reduce the terms by their common factor.",
        "rules": [
          "a : b = a/b, with b ≠ 0.",
          "A ratio is in simplest form when its terms have no common factor other than 1."
        ]
      },
      {
        "id": "3.1.2",
        "title": "3.1.2 Proportions",
        "theory": "A proportion states that two ratios are equal. For a : b :: c : d, the cross products are equal: ad = bc. The middle terms are the means and the first and fourth terms are the extremes.",
        "rules": [
          "a/b = c/d if and only if ad = bc (with non-zero denominators).",
          "In a : b :: c : d, b and c are the means; a and d are the extremes."
        ]
      },
      {
        "id": "3.1.3",
        "title": "3.1.3 Variations",
        "theory": "Direct variation means quantities change in the same ratio: y varies directly as x when y = kx. Inverse variation means one increases as the other decreases: y varies inversely as x when y = k/x or xy = k. Here k is a constant of variation.",
        "rules": [
          "Direct: y ∝ x, so y = kx and y/x = k.",
          "Inverse: y ∝ 1/x, so xy = k.",
          "Compare pairs in the same order when using y₂/y₁ = x₂/x₁ for direct variation or y₂/y₁ = x₁/x₂ for inverse variation."
        ]
      },
      {
        "id": "3.2",
        "title": "3.2 Third, Fourth Mean and Continued Proportion",
        "theory": "Three quantities a, b, c are in continued proportion when a : b = b : c, equivalently ac = b². Then b is the mean proportional (geometric mean), and c is the third proportional. A fourth proportional x to a, b, c satisfies a : b = c : x.",
        "rules": [
          "Mean proportional x between a and c: a : x = x : c, so x² = ac.",
          "Third proportional c to a and b: a : b = b : c, so c = b²/a.",
          "Fourth proportional x to a, b and c: a : b = c : x, so x = bc/a."
        ]
      },
      {
        "id": "3.3",
        "title": "3.3 Theorems on Proportion",
        "theory": "Equal ratios remain equal under the standard proportion transformations. These are alternendo, invertendo, componendo, dividendo, and componendo-dividendo; they are used to establish new proportions and solve equations.",
        "rules": [
          "Alternendo: a/b = c/d ⇒ a/c = b/d.",
          "Invertendo: a/b = c/d ⇒ b/a = d/c.",
          "Componendo: a/b = c/d ⇒ (a+b)/b = (c+d)/d.",
          "Dividendo: a/b = c/d ⇒ (a−b)/b = (c−d)/d.",
          "Componendo-dividendo: a/b = c/d ⇒ (a+b)/(a−b) = (c+d)/(c−d), where denominators are non-zero."
        ]
      },
      {
        "id": "3.4",
        "title": "3.4 Joint Variation",
        "theory": "A quantity varies jointly with two or more quantities when it is directly proportional to their product. For example, if x varies jointly as y and z, then x = kyz.",
        "rules": [
          "x ∝ yz means x = kyz, where k is constant.",
          "The area of a triangle varies jointly with its base and height: A = (1/2)bh."
        ]
      },
      {
        "id": "3.5",
        "title": "3.5 K-Method",
        "theory": "If a : b = c : d, let the common ratio be k. Then a = bk and c = dk. Substituting these expressions simplifies proofs involving several proportional quantities.",
        "rules": [
          "If a/b = c/d = e/f = k, then a = bk, c = dk and e = fk.",
          "Substitute the common-ratio expressions into the required statement and simplify."
        ]
      },
      {
        "id": "3.6",
        "title": "3.6 Real-Life Problems Based on Variations",
        "theory": "Model real situations with direct, inverse, joint, or mixed variation. State the relationship, use given values to find the constant k, and substitute the new values to answer the question with units.",
        "rules": [
          "Direct: y = kx; inverse: y = k/x.",
          "Joint: y = kxz; mixed variation combines direct and inverse factors.",
          "Keep units and reject values that do not suit the situation."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "title": "Example 1 (Page 51) — Simplifying Ratios",
        "problem": "Write in simplest form: (i) 3 : 12; (ii) 6a : 18b.",
        "given": "Two ratios to reduce.",
        "method": "Divide both terms by their greatest common factor.",
        "steps": [
          "(i) 3 : 12 = 1 : 4.",
          "(ii) 6a : 18b = a : 3b."
        ],
        "answer": "(i) 1 : 4; (ii) a : 3b."
      },
      {
        "id": "eg2",
        "title": "Example 2 (Page 51) — Divide an Amount in a Given Ratio",
        "problem": "Divide Rs. 5070 among three people in the ratio 2 : 5 : 6.",
        "given": "Total = Rs. 5070; ratio parts = 2, 5, 6.",
        "method": "Add the ratio parts, then allocate each person the same fraction of the total.",
        "steps": [
          "Sum of ratio terms = 2 + 5 + 6 = 13.",
          "First share = 5070(2/13) = Rs. 780.",
          "Second share = 5070(5/13) = Rs. 1950.",
          "Third share = 5070(6/13) = Rs. 2340."
        ],
        "answer": "Rs. 780, Rs. 1950 and Rs. 2340."
      },
      {
        "id": "eg3",
        "title": "Example 3 (Page 52) — Find a Fourth Term in a Proportion",
        "problem": "a³ − b³, a² − b², a² + ab + b² and x are in proportion. Find x.",
        "given": "(a³ − b³) : (a² − b²) :: (a² + ab + b²) : x.",
        "method": "Use the proportion equation and factor the differences of powers.",
        "steps": [
          "x(a³ − b³) = (a² − b²)(a² + ab + b²).",
          "Factor a³ − b³ = (a − b)(a² + ab + b²) and a² − b² = (a − b)(a + b).",
          "Cancel the common non-zero factors to obtain x = a + b."
        ],
        "answer": "x = a + b."
      },
      {
        "id": "eg4",
        "title": "Example 4 (Page 53) — Direct Variation",
        "problem": "y varies directly with x and y = 27 when x = 3. Find (i) an equation connecting x and y; (ii) y when x = 11.",
        "given": "y = kx; y = 27 at x = 3.",
        "method": "Find k from the known pair, then use the equation for the new x.",
        "steps": [
          "27 = 3k, so k = 9.",
          "The equation is y = 9x.",
          "When x = 11, y = 9(11) = 99."
        ],
        "answer": "y = 9x; when x = 11, y = 99."
      },
      {
        "id": "eg5",
        "title": "Example 5 (Page 54) — Complete a Direct-Variation Table",
        "problem": "If y ∝ x, complete the table with x values 4, 5, 8, blank, blank and y values 6, blank, blank, 18, 22.5.",
        "given": "When x = 4, y = 6.",
        "method": "Use y = kx to find the constant and fill each missing entry.",
        "steps": [
          "k = y/x = 6/4 = 3/2, so y = 3x/2.",
          "At x = 5, y = 7.5; at x = 8, y = 12.",
          "At y = 18, x = 12; at y = 22.5, x = 15."
        ],
        "answer": "x: 4, 5, 8, 12, 15; y: 6, 7.5, 12, 18, 22.5.",
        "diagram": {
          "type": "variation-table",
          "rowLabels": [
            "x",
            "y"
          ],
          "rows": [
            [
              "4",
              "5",
              "8",
              "12",
              "15"
            ],
            [
              "6",
              "7.5",
              "12",
              "18",
              "22.5"
            ]
          ],
          "title": "Completed direct-variation table"
        }
      },
      {
        "id": "eg6",
        "title": "Example 6 (Page 55) — Inverse Variation",
        "problem": "x varies inversely with y. If x = 3 when y = 12, find y when x = 6.",
        "given": "xy = k and x = 3, y = 12.",
        "method": "Find k from the known pair, then solve for the new y.",
        "steps": [
          "k = xy = 3(12) = 36.",
          "When x = 6, y = 36/6 = 6."
        ],
        "answer": "y = 6."
      },
      {
        "id": "eg7",
        "title": "Example 7 (Page 56) — Pressure and Volume",
        "problem": "Gas pressure P varies inversely as volume V. If P = 10 N/m² when V = 25 m³, find P when V = 20 m³.",
        "given": "P = k/V; P = 10 at V = 25.",
        "method": "Use PV = k.",
        "steps": [
          "k = PV = 10(25) = 250.",
          "At V = 20, P = 250/20 = 12.5 N/m²."
        ],
        "answer": "P = 12.5 N/m²."
      },
      {
        "id": "eg8",
        "title": "Example 8 (Page 57) — Mean Proportional",
        "problem": "Find the mean proportional of 5 and 15.",
        "given": "Let x be the mean proportional.",
        "method": "Use 5 : x = x : 15.",
        "steps": [
          "x² = 5(15) = 75.",
          "The positive mean is x = √75 = 5√3."
        ],
        "answer": "5√3."
      },
      {
        "id": "eg9",
        "title": "Example 9 (Page 57) — Third Proportional",
        "problem": "Find the third proportional of a²b² and abc.",
        "given": "a²b² : abc :: abc : x.",
        "method": "Cross-multiply and simplify.",
        "steps": [
          "a²b²·x = (abc)².",
          "Cancel a²b² to get x = c²."
        ],
        "answer": "c²."
      },
      {
        "id": "eg10",
        "title": "Example 10 (Page 57) — Fourth Proportional",
        "problem": "Find the fourth proportional to a³ − b³, a + b, and a² + ab + b².",
        "given": "(a³ − b³) : (a + b) :: (a² + ab + b²) : x.",
        "method": "Cross-multiply and factor a³ − b³.",
        "steps": [
          "x(a³ − b³) = (a + b)(a² + ab + b²).",
          "a³ − b³ = (a − b)(a² + ab + b²).",
          "Cancel the common factor to obtain x = (a + b)/(a − b)."
        ],
        "answer": "(a + b)/(a − b)."
      },
      {
        "id": "eg11",
        "title": "Example 11 (Page 58) — Apply Componendo",
        "problem": "If a/b = c/d, prove that (2a + 3b) : b = (2c + 3d) : d.",
        "given": "a/b = c/d.",
        "method": "Apply componendo after multiplying both ratios by 2/3.",
        "steps": [
          "2a/(3b) = 2c/(3d).",
          "By componendo, (2a + 3b)/(3b) = (2c + 3d)/(3d).",
          "Multiply both sides by 3."
        ],
        "answer": "(2a + 3b)/b = (2c + 3d)/d."
      },
      {
        "id": "eg12",
        "title": "Example 12 (Page 59) — Reverse Componendo-Dividendo",
        "problem": "If (3a − 4b)/(3a + 4b) = (3c − 4d)/(3c + 4d), prove that a/b = c/d.",
        "given": "The two displayed ratios are equal.",
        "method": "Apply componendo-dividendo to the equal ratios.",
        "steps": [
          "By componendo-dividendo, [(3a−4b)+(3a+4b)]/[(3a+4b)−(3a−4b)] equals the corresponding expression in c,d.",
          "This simplifies to 6a/(8b) = 6c/(8d)."
        ],
        "answer": "a/b = c/d."
      },
      {
        "id": "eg13",
        "title": "Example 13 (Page 59) — Solve a Proportion Equation",
        "problem": "If [(x + 3)² + (x − 4)²]/[(x + 3)² − (x − 4)²] = 13/12, find x.",
        "given": "The ratio is 13/12.",
        "method": "Use componendo-dividendo to isolate a ratio of squares, then take both square-root cases.",
        "steps": [
          "Componendo-dividendo gives (x + 3)²/(x − 4)² = (13 + 12)/(13 − 12) = 25.",
          "(x + 3)/(x − 4) = ±5.",
          "For +5, x = 23/4; for −5, x = 17/6."
        ],
        "answer": "x ∈ {23/4, 17/6}."
      },
      {
        "id": "eg14",
        "title": "Example 14 (Page 61) — Joint Variation",
        "problem": "y varies jointly as x and z. If y = 12 when x = 9 and z = 3, find z when y = 6 and x = 15.",
        "given": "y = kxz; y = 12 at x = 9, z = 3.",
        "method": "Find k, then substitute the second pair of known values.",
        "steps": [
          "12 = k(9)(3), so k = 4/9.",
          "6 = (4/9)(15)z.",
          "6 = (20/3)z, so z = 9/10."
        ],
        "answer": "z = 9/10."
      },
      {
        "id": "eg15",
        "title": "Example 15 (Page 63) — K-Method with Weights",
        "problem": "If a/b = c/d = e/f and b, d, f are non-zero, prove that (ℓa + mc + ne)/(ℓb + md + nf) equals the common ratio.",
        "given": "Let a/b = c/d = e/f = k.",
        "method": "Use the K-method and factor the common k.",
        "steps": [
          "a = bk, c = dk, e = fk.",
          "ℓa + mc + ne = ℓbk + mdk + nfk = k(ℓb + md + nf).",
          "Divide by the denominator."
        ],
        "answer": "(ℓa + mc + ne)/(ℓb + md + nf) = k."
      },
      {
        "id": "eg16",
        "title": "Example 16 (Page 63) — K-Method for Sums",
        "problem": "Prove that if a/b = c/d = e/f, then (a + c + e)/(b + d + f) equals each of the three ratios.",
        "given": "Let all three ratios equal k.",
        "method": "Write each numerator as the matching denominator term multiplied by k.",
        "steps": [
          "a = bk, c = dk, e = fk.",
          "a + c + e = k(b + d + f).",
          "Divide by b + d + f."
        ],
        "answer": "(a + c + e)/(b + d + f) = a/b = c/d = e/f."
      },
      {
        "id": "eg17",
        "title": "Example 17 (Page 64) — K-Method with Squares",
        "problem": "If a/b = c/d = e/f, prove that this common ratio equals √[(a² + c² + e²)/(b² + d² + f²)].",
        "given": "Let the common ratio be k.",
        "method": "Square the three equalities, add them, and take the non-negative square root.",
        "steps": [
          "a = bk, c = dk and e = fk.",
          "a² + c² + e² = k²(b² + d² + f²).",
          "The radicand is k²; for a positive common ratio its square root is k."
        ],
        "answer": "√[(a² + c² + e²)/(b² + d² + f²)] = a/b = c/d = e/f (for a positive common ratio)."
      },
      {
        "id": "eg18",
        "title": "Example 18 (Page 64) — K-Method with Cubes",
        "problem": "If a/x = b/y = c/z, where all six quantities are non-zero, prove that x³/a³ + y³/b³ + z³/c³ = 3xyz/(abc).",
        "given": "Let a/x = b/y = c/z = k.",
        "method": "Express the reciprocal ratios in terms of k, then compare sums and products.",
        "steps": [
          "x/a = y/b = z/c = 1/k, so x³/a³ = y³/b³ = z³/c³ = 1/k³.",
          "Their sum is 3/k³.",
          "The product (x/a)(y/b)(z/c) = xyz/(abc) = 1/k³."
        ],
        "answer": "x³/a³ + y³/b³ + z³/c³ = 3xyz/(abc)."
      },
      {
        "id": "eg19",
        "title": "Example 19 (Page 66) — Distance Falls with the Square of Time",
        "problem": "A stone is dropped from a hill. The distance fallen is proportional to the square of the time. It falls 19.6 m in 2 seconds. How far does it fall in 3 seconds?",
        "given": "d = kt²; d = 19.6 m when t = 2 s.",
        "method": "Find k from the known distance, then evaluate at t = 3.",
        "steps": [
          "19.6 = k(2²), so k = 4.9.",
          "At t = 3, d = 4.9(3²) = 44.1 m."
        ],
        "answer": "44.1 m.",
        "diagram": {
          "type": "falling-distance",
          "times": [
            0,
            1,
            2,
            3
          ],
          "distances": [
            0,
            4.9,
            19.6,
            44.1
          ],
          "title": "Distance fallen over time"
        }
      },
      {
        "id": "eg20",
        "title": "Example 20 (Page 66) — Projector Distance and Image Height",
        "problem": "Image height y varies directly as projector distance x. The image is 20 cm high when x = 100 cm. How far should the projector be from the screen for a 15 cm image?",
        "given": "y = kx; y = 20 cm when x = 100 cm.",
        "method": "Find the direct-variation constant and solve for x at y = 15.",
        "steps": [
          "k = y/x = 20/100 = 1/5.",
          "15 = x/5, so x = 75 cm."
        ],
        "answer": "75 cm."
      },
      {
        "id": "eg21",
        "title": "Example 21 (Page 67) — Sand and Cement in a Fixed Ratio",
        "problem": "The mass ratio of sand to cement in a type of concrete is 4.8 : 2. If 6 kg of sand is used, how much cement is needed?",
        "given": "Sand : cement = 4.8 : 2.",
        "method": "Set the equal ratios 4.8/2 = 6/x and cross-multiply.",
        "steps": [
          "4.8x = 12.",
          "x = 12/4.8 = 2.5 kg."
        ],
        "answer": "2.5 kg of cement."
      },
      {
        "id": "eg22",
        "title": "Example 22 (Page 67) — People and Time for a Job",
        "problem": "Four people can paint a fence in 3 hours. (i) How long will 6 people take? (ii) How many people are needed to finish it in half an hour?",
        "given": "People and time vary inversely; 4 people take 3 hours.",
        "method": "The fixed work is people × hours.",
        "steps": [
          "Total work = 4(3) = 12 person-hours.",
          "(i) 12/6 = 2 hours.",
          "(ii) 12/(1/2) = 24 people."
        ],
        "answer": "(i) 2 hours; (ii) 24 people."
      }
    ],
    "exercises": [
      {
        "exercise": "3.1",
        "title": "Exercise 3.1 — Ratios and Direct/Inverse Variation",
        "problems": [
          {
            "num": "Q1",
            "question": "Which is the greater ratio: 5 : 7 or 151 : 208?",
            "solution": "Compare by cross-products: 5(208) = 1040 and 151(7) = 1057.\nSince 1057 > 1040, 151/208 is greater.",
            "finalAnswer": "151 : 208.",
            "steps": [
              "Compare by cross-products: 5(208) = 1040 and 151(7) = 1057.",
              "Since 1057 > 1040, 151/208 is greater."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q2",
            "question": "Gold and silver are mixed in the ratio 7 : 4. If 36 g of silver is used, how much gold is used?",
            "solution": "4 ratio parts correspond to 36 g, so one part is 9 g.\nGold is 7 parts: 7(9) = 63 g.",
            "finalAnswer": "63 g of gold.",
            "steps": [
              "4 ratio parts correspond to 36 g, so one part is 9 g.",
              "Gold is 7 parts: 7(9) = 63 g."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q3",
            "question": "Divide the annual profit of Rs. 40,000 among three partners in the ratio 5 : 8 : 12.",
            "solution": "Sum of parts = 25; one part = 40000/25 = Rs. 1600.\nShares: 5(1600), 8(1600), 12(1600).",
            "finalAnswer": "Rs. 8000, Rs. 12,800 and Rs. 19,200.",
            "steps": [
              "Sum of parts = 25; one part = 40000/25 = Rs. 1600.",
              "Shares: 5(1600), 8(1600), 12(1600)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q4",
            "question": "If 11 : (x − 1) = 22 : 27, find x.",
            "solution": "11/(x − 1) = 22/27.\n297 = 22x − 22, so 22x = 319.",
            "finalAnswer": "x = 29/2.",
            "steps": [
              "11/(x − 1) = 22/27.",
              "297 = 22x − 22, so 22x = 319."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q5",
            "question": "y varies directly as x². When x = 7, y = 49. Find (i) y when x = 9; (ii) x when y = 100.",
            "solution": "y = kx² and 49 = 49k, so k = 1.\n(i) y = 9² = 81. (ii) x² = 100.",
            "finalAnswer": "(i) y = 81; (ii) x = ±10.",
            "steps": [
              "y = kx² and 49 = 49k, so k = 1.",
              "(i) y = 9² = 81. (ii) x² = 100."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q6",
            "question": "x and y vary inversely. If x = 4 when y = 6, find (i) y when x = 12; (ii) x when y = 24.",
            "solution": "xy = k = 4(6) = 24.\n(i) y = 24/12 = 2. (ii) x = 24/24 = 1.",
            "finalAnswer": "(i) y = 2; (ii) x = 1.",
            "steps": [
              "xy = k = 4(6) = 24.",
              "(i) y = 24/12 = 2. (ii) x = 24/24 = 1."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q7",
            "question": "r varies inversely as p³. If p = 9 when r = 2, find (i) r when p = 3; (ii) p when r = 1/4.",
            "solution": "r = k/p³; k = 2(9³) = 1458.\n(i) r = 1458/3³ = 54. (ii) p³ = 1458/(1/4) = 5832, so p = 18.",
            "finalAnswer": "(i) r = 54; (ii) p = 18.",
            "steps": [
              "r = k/p³; k = 2(9³) = 1458.",
              "(i) r = 1458/3³ = 54. (ii) p³ = 1458/(1/4) = 5832, so p = 18."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q8",
            "question": "If y ∝ x, complete the table: x = 4, 6, blank, 15; y = 2, blank, 3.5, blank.",
            "solution": "k = y/x = 2/4 = 1/2, so y = x/2.\nAt x = 6, y = 3; at y = 3.5, x = 7; at x = 15, y = 7.5.",
            "finalAnswer": "x: 4, 6, 7, 15; y: 2, 3, 3.5, 7.5.",
            "steps": [
              "k = y/x = 2/4 = 1/2, so y = x/2.",
              "At x = 6, y = 3; at y = 3.5, x = 7; at x = 15, y = 7.5."
            ],
            "method": "Direct variation; k = 1/2.",
            "diagram": {
              "type": "variation-table",
              "rowLabels": [
                "x",
                "y"
              ],
              "rows": [
                [
                  "4",
                  "6",
                  "7",
                  "15"
                ],
                [
                  "2",
                  "3",
                  "3.5",
                  "7.5"
                ]
              ],
              "title": "Completed direct-variation table"
            }
          }
        ]
      },
      {
        "exercise": "3.2",
        "title": "Exercise 3.2 — Continued Proportion and Mean Proportionals",
        "problems": [
          {
            "num": "Q1",
            "question": "Which triples are in continued proportion? (i) 4, 12, 36; (ii) 3, 12, 39; (iii) 72, 24, 8.",
            "solution": "Check whether the square of the middle term equals the product of the outside terms.\n(i) 12² = 4(36). (ii) 12² ≠ 3(39). (iii) 24² = 72(8).",
            "finalAnswer": "(i) and (iii).",
            "steps": [
              "Check whether the square of the middle term equals the product of the outside terms.",
              "(i) 12² = 4(36). (ii) 12² ≠ 3(39). (iii) 24² = 72(8)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q2",
            "question": "Find the mean proportional of 12 and 3.",
            "solution": "Let x be the mean proportional: x² = 12(3) = 36.",
            "finalAnswer": "x = 6.",
            "steps": [
              "Let x be the mean proportional: x² = 12(3) = 36."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q3",
            "question": "If 5 : 15 :: 15 : x, find x.",
            "solution": "5x = 15(15) = 225.",
            "finalAnswer": "x = 45.",
            "steps": [
              "5x = 15(15) = 225."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q4",
            "question": "If 3x − 1, 5, 35 are in continued proportion, find x.",
            "solution": "(3x − 1)/5 = 5/35.\n35(3x − 1) = 25, so 105x = 60.",
            "finalAnswer": "x = 4/7.",
            "steps": [
              "(3x − 1)/5 = 5/35.",
              "35(3x − 1) = 25, so 105x = 60."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q5",
            "question": "Find the mean proportional of a² − b² and (a + b)/(a − b).",
            "solution": "x² = (a² − b²)(a + b)/(a − b).\nFactor a² − b² = (a − b)(a + b), so x² = (a + b)².",
            "finalAnswer": "a + b (taking the positive mean).",
            "steps": [
              "x² = (a² − b²)(a + b)/(a − b).",
              "Factor a² − b² = (a − b)(a + b), so x² = (a + b)²."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q6",
            "question": "If a/b = c/d, prove that (ac + ad)/(ac − bd) = (a² + b²)/(a² − b²).",
            "solution": "The scan prints ac + ad. That version does not give the stated identity. For example, a/b = c/d = 2 with (a,b,c,d) = (2,1,4,2) gives left side 2 and right side 5/3.\nWith the likely intended numerator ac + bd, write a = kb and c = kd. Both sides simplify to (k² + 1)/(k² − 1).",
            "finalAnswer": "The printed statement appears to contain a typo: replacing ad with bd makes it true.",
            "steps": [
              "The scan prints ac + ad. That version does not give the stated identity. For example, a/b = c/d = 2 with (a,b,c,d) = (2,1,4,2) gives left side 2 and right side 5/3.",
              "With the likely intended numerator ac + bd, write a = kb and c = kd. Both sides simplify to (k² + 1)/(k² − 1)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q7",
            "question": "Solve (i) [√(3x + 2) + √x]/[√(3x + 2) − √x] = 4; (ii) [(x − 1)² + (x + 2)²]/[(x − 1)² − (x + 2)²] = −17/8; (iii) [√(x² + a²) − √(x² − a²)]/[√(x² + a²) + √(x² − a²)] = 1/3.",
            "solution": "(i) Let A = √(3x+2), B = √x. A+B = 4(A−B) gives 5B = 3A, which squares to 25x = 27x + 18, impossible for real x.\n(ii) Cross-multiplication gives 25(x−1)² = 9(x+2)², so (x−1)/(x+2) = ±3/5; x = 11/2 or −1/8.\n(iii) Let A = √(x²+a²), B = √(x²−a²). A−B = (A+B)/3 gives A = 2B; squaring gives 3x² = 5a².",
            "finalAnswer": "(i) no real solution; (ii) x = 11/2 or −1/8; (iii) x = ±a√(5/3) (for real a).",
            "steps": [
              "(i) Let A = √(3x+2), B = √x. A+B = 4(A−B) gives 5B = 3A, which squares to 25x = 27x + 18, impossible for real x.",
              "(ii) Cross-multiplication gives 25(x−1)² = 9(x+2)², so (x−1)/(x+2) = ±3/5; x = 11/2 or −1/8.",
              "(iii) Let A = √(x²+a²), B = √(x²−a²). A−B = (A+B)/3 gives A = 2B; squaring gives 3x² = 5a²."
            ],
            "method": "Use the displayed equations and check the radical domains."
          }
        ]
      },
      {
        "exercise": "3.3",
        "title": "Exercise 3.3 — Joint Variation",
        "problems": [
          {
            "num": "Q1",
            "question": "y varies jointly as x and z. If y = 33 when x = 9 and z = 12, find y when x = 16 and z = 22.",
            "solution": "y = kxz; k = 33/(9·12) = 11/36.\ny = (11/36)(16)(22) = 968/9.",
            "finalAnswer": "y = 968/9.",
            "steps": [
              "y = kxz; k = 33/(9·12) = 11/36.",
              "y = (11/36)(16)(22) = 968/9."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q2",
            "question": "f varies jointly as g and h³. If f = 200 when g = 5 and h = 4, find f when g = 3 and h = 6.",
            "solution": "f = kgh³; k = 200/(5·4³) = 5/8.\nf = (5/8)(3)(6³) = 405.",
            "finalAnswer": "f = 405.",
            "steps": [
              "f = kgh³; k = 200/(5·4³) = 5/8.",
              "f = (5/8)(3)(6³) = 405."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q3",
            "question": "a varies jointly as b and c. If a = 4 when b = 8 and c = 9, find a when b = 2 and c = 18.",
            "solution": "a = kbc; k = 4/(8·9) = 1/18.\na = (1/18)(2)(18) = 2.",
            "finalAnswer": "a = 2.",
            "steps": [
              "a = kbc; k = 4/(8·9) = 1/18.",
              "a = (1/18)(2)(18) = 2."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q4",
            "question": "p varies jointly as q and r². If p = 225 when q = 4 and r = 3, find p when q = 6 and r = 8.",
            "solution": "p = kqr²; k = 225/(4·9) = 25/4.\np = (25/4)(6)(64) = 2400.",
            "finalAnswer": "p = 2400.",
            "steps": [
              "p = kqr²; k = 225/(4·9) = 25/4.",
              "p = (25/4)(6)(64) = 2400."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q5",
            "question": "a varies jointly as b³ and c. If a = 36 when b = 4 and c = 6, find a when b = 2 and c = 14.",
            "solution": "a = kb³c; k = 36/(4³·6) = 3/32.\na = (3/32)(2³)(14) = 21/2.",
            "finalAnswer": "a = 21/2.",
            "steps": [
              "a = kb³c; k = 36/(4³·6) = 3/32.",
              "a = (3/32)(2³)(14) = 21/2."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q6",
            "question": "z varies jointly as x and y. If z = 12 when x = 2 and y = 4, find the constant of variation.",
            "solution": "z = kxy, so 12 = k(2)(4).",
            "finalAnswer": "k = 3/2.",
            "steps": [
              "z = kxy, so 12 = k(2)(4)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q7",
            "question": "y varies jointly as x² and z. If y = 6 when x = 4 and z = 9, write y as a function of x and z and find y when x = −8 and z = 12.",
            "solution": "y = kx²z; k = 6/(16·9) = 1/24.\nAt x = −8, z = 12: y = (1/24)(64)(12) = 32.",
            "finalAnswer": "y = x²z/24; the requested value is 32.",
            "steps": [
              "y = kx²z; k = 6/(16·9) = 1/24.",
              "At x = −8, z = 12: y = (1/24)(64)(12) = 32."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q8",
            "question": "p varies jointly as q and r² and inversely as s and t². If p = 40 when q = 8, r = 5, s = 3, t = 2, find p in terms of q,r,s,t and then find it when q = −2, r = 4, s = 3, t = −1.",
            "solution": "p = kqr²/(st²).\n40 = k(8)(25)/(3·4), so k = 12/5.\nAt the new values p = (12/5)(−2)(16)/(3·1) = −128/5.",
            "finalAnswer": "p = 12qr²/(5st²); requested value = −128/5.",
            "steps": [
              "p = kqr²/(st²).",
              "40 = k(8)(25)/(3·4), so k = 12/5.",
              "At the new values p = (12/5)(−2)(16)/(3·1) = −128/5."
            ],
            "method": "Apply the stated ratio or variation relationship."
          }
        ]
      },
      {
        "exercise": "3.4",
        "title": "Exercise 3.4 — Proportion Theorems and K-Method",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "If a : b = c : d, prove (2a + 3b)/(2a − 3b) = (2c + 3d)/(2c − 3d).",
            "solution": "Let a/b = c/d = k, so a = kb and c = kd.\nBoth sides become (2k + 3)/(2k − 3).",
            "finalAnswer": "The two ratios are equal.",
            "steps": [
              "Let a/b = c/d = k, so a = kb and c = kd.",
              "Both sides become (2k + 3)/(2k − 3)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(ii)",
            "question": "If a : b = c : d, prove pa + qb : ma − nb = pc + qd : mc − nd.",
            "solution": "Let a = kb and c = kd.\n(pa + qb)/(ma − nb) = [b(pk + q)]/[b(mk − n)] = (pk + q)/(mk − n).\nThe expression using c,d has the same value.",
            "finalAnswer": "The two ratios are equal.",
            "steps": [
              "Let a = kb and c = kd.",
              "(pa + qb)/(ma − nb) = [b(pk + q)]/[b(mk − n)] = (pk + q)/(mk − n).",
              "The expression using c,d has the same value."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q2",
            "question": "Prove a/b = c/d = e/f = √[(pa² + qc² + e²)/(pb² + qd² + f²)].",
            "solution": "Let the common ratio be k, so a = kb, c = kd, e = kf.\nThe radicand becomes k²[pb² + qd² + f²]/[pb² + qd² + f²] = k².",
            "finalAnswer": "The square root is the common ratio when it is positive; in general it equals |k|.",
            "steps": [
              "Let the common ratio be k, so a = kb, c = kd, e = kf.",
              "The radicand becomes k²[pb² + qd² + f²]/[pb² + qd² + f²] = k²."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q3",
            "question": "If (x − y)/z = (y − z)/x = (z − x)/y, where x,y,z are non-zero and x + y + z ≠ 0, prove x = y = z.",
            "solution": "Let the common value be k. Add the three fractions using denominator x + y + z: the numerator is (x−y)+(y−z)+(z−x)=0.\nThus 3k = 0, so k = 0.\nThen x − y = y − z = z − x = 0.",
            "finalAnswer": "x = y = z.",
            "steps": [
              "Let the common value be k. Add the three fractions using denominator x + y + z: the numerator is (x−y)+(y−z)+(z−x)=0.",
              "Thus 3k = 0, so k = 0.",
              "Then x − y = y − z = z − x = 0."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q4",
            "question": "If (2y + 2z − x)/a = (2z + 2x − y)/b = (2x + 2y − z)/c, prove x/(2b + 2c − a) = y/(2c + 2a − b) = z/(2a + 2b − c).",
            "solution": "Let the common ratio be k. Add the three numerator equations to get 3(x+y+z) = k(a+b+c).\nFrom the first equation, 3x = 2(x+y+z) − ak = k(2b+2c−a)/3.\nCyclically, 3y = k(2c+2a−b)/3 and 3z = k(2a+2b−c)/3.",
            "finalAnswer": "Each displayed quotient equals k/9.",
            "steps": [
              "Let the common ratio be k. Add the three numerator equations to get 3(x+y+z) = k(a+b+c).",
              "From the first equation, 3x = 2(x+y+z) − ak = k(2b+2c−a)/3.",
              "Cyclically, 3y = k(2c+2a−b)/3 and 3z = k(2a+2b−c)/3."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q5",
            "question": "Prove that if (x+y)/(a+b) = (y+z)/(b+c) = (z+x)/(c+a), then each fraction equals (x+y+z)/(a+b+c).",
            "solution": "Let the common value be k. Then x+y = k(a+b), y+z = k(b+c), z+x = k(c+a).\nAdd the equations: 2(x+y+z) = 2k(a+b+c).",
            "finalAnswer": "Each fraction equals (x+y+z)/(a+b+c).",
            "steps": [
              "Let the common value be k. Then x+y = k(a+b), y+z = k(b+c), z+x = k(c+a).",
              "Add the equations: 2(x+y+z) = 2k(a+b+c)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q6",
            "question": "If (bz + cy)/(b − c) = (cx + az)/(c − a) = (ay + bx)/(a − b), prove (a+b+c)(x+y+z) = ax + by + cz.",
            "solution": "Let the common ratio be k. Add the three numerator equations: (bz+cy)+(cx+az)+(ay+bx) = k[(b−c)+(c−a)+(a−b)] = 0.\nThe left sum is (b+c)x + (a+c)y + (a+b)z, which equals (a+b+c)(x+y+z) − (ax+by+cz).",
            "finalAnswer": "(a+b+c)(x+y+z) = ax + by + cz.",
            "steps": [
              "Let the common ratio be k. Add the three numerator equations: (bz+cy)+(cx+az)+(ay+bx) = k[(b−c)+(c−a)+(a−b)] = 0.",
              "The left sum is (b+c)x + (a+c)y + (a+b)z, which equals (a+b+c)(x+y+z) − (ax+by+cz)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q7",
            "question": "If x/(b+c−a) = y/(c+a−b) = z/(a+b−c), prove (b−c)x + (c−a)y + (a−b)z = 0.",
            "solution": "Let the common value be k. Substitute x = k(b+c−a), y = k(c+a−b), z = k(a+b−c).\nThe left side becomes k[(b−c)(b+c−a)+(c−a)(c+a−b)+(a−b)(a+b−c)] = 0 after cancellation.",
            "finalAnswer": "The required expression equals 0.",
            "steps": [
              "Let the common value be k. Substitute x = k(b+c−a), y = k(c+a−b), z = k(a+b−c).",
              "The left side becomes k[(b−c)(b+c−a)+(c−a)(c+a−b)+(a−b)(a+b−c)] = 0 after cancellation."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q8",
            "question": "If 2x + 3y : 3y + 4z : 4z + 5x = 4a − 5b : 3b − a : 2b − 3a, prove 7x + 6y + 8z = 0.",
            "solution": "Let the three corresponding ratios equal k. Then 2x+3y = k(4a−5b), 3y+4z = k(3b−a), and 4z+5x = k(2b−3a).\nAdd the equations. The right side is k[(4a−5b)+(3b−a)+(2b−3a)] = 0.\nThe left side is 7x + 6y + 8z.",
            "finalAnswer": "7x + 6y + 8z = 0.",
            "steps": [
              "Let the three corresponding ratios equal k. Then 2x+3y = k(4a−5b), 3y+4z = k(3b−a), and 4z+5x = k(2b−3a).",
              "Add the equations. The right side is k[(4a−5b)+(3b−a)+(2b−3a)] = 0.",
              "The left side is 7x + 6y + 8z."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q9",
            "question": "Challenge: If (a − b)/(d − e) = (b − c)/(e − f), prove each ratio equals [b(f − d) + (cd − af)]/[e(f − d)].",
            "solution": "Let the common value be k. Then a = b + k(d−e) and c = b − k(e−f).\nSubstitute these into b(f−d) + cd − af; the b terms cancel and the result is ke(f−d).\nDivide by e(f−d).",
            "finalAnswer": "Both ratios and the stated fraction equal k.",
            "steps": [
              "Let the common value be k. Then a = b + k(d−e) and c = b − k(e−f).",
              "Substitute these into b(f−d) + cd − af; the b terms cancel and the result is ke(f−d).",
              "Divide by e(f−d)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          }
        ]
      },
      {
        "exercise": "3.5",
        "title": "Exercise 3.5 — Real-Life Variation Problems",
        "problems": [
          {
            "num": "Q1",
            "question": "Hedge thickness T varies directly as the number of planks N. Four planks make a 12 cm thick hedge. Find (i) thickness for 6 planks; (ii) number of planks for 9 cm thickness.",
            "solution": "T = kN; k = 12/4 = 3 cm per plank.\n(i) T = 3(6) = 18 cm. (ii) 9 = 3N, so N = 3.",
            "finalAnswer": "(i) 18 cm; (ii) 3 planks.",
            "steps": [
              "T = kN; k = 12/4 = 3 cm per plank.",
              "(i) T = 3(6) = 18 cm. (ii) 9 = 3N, so N = 3."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q2",
            "question": "Water pressure P in a fountain varies directly as depth d. Pressure is 51 N/cm² at 3 cm depth. Find pressure at 7 cm depth.",
            "solution": "P = kd; k = 51/3 = 17.\nAt d = 7, P = 17(7).",
            "finalAnswer": "119 N/cm².",
            "steps": [
              "P = kd; k = 51/3 = 17.",
              "At d = 7, P = 17(7)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q3",
            "question": "Gas pressure P varies directly as temperature T. If P = 50 N/m² at 75°C, find P at 150°C.",
            "solution": "P/T is constant. The temperature doubles from 75°C to 150°C.",
            "finalAnswer": "100 N/m².",
            "steps": [
              "P/T is constant. The temperature doubles from 75°C to 150°C."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q4",
            "question": "Eight people complete a job in 10 days. How many days would 10 people take for the same work?",
            "solution": "People and days vary inversely. Total work = 8(10) = 80 person-days.\nDays = 80/10.",
            "finalAnswer": "8 days.",
            "steps": [
              "People and days vary inversely. Total work = 8(10) = 80 person-days.",
              "Days = 80/10."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q5",
            "question": "Gas volume V varies inversely as pressure P. If P = 300 N/m² when V = 4 m³, find P when V = 3 m³.",
            "solution": "PV = k = 300(4) = 1200.\nP = 1200/3.",
            "finalAnswer": "400 N/m².",
            "steps": [
              "PV = k = 300(4) = 1200.",
              "P = 1200/3."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q6",
            "question": "The attraction force F between two magnets varies inversely as the square of distance d. If F = 18 N when d = 2 cm, find d when F = 2 N.",
            "solution": "F = k/d²; k = 18(2²) = 72.\n2 = 72/d², so d² = 36.",
            "finalAnswer": "d = 6 cm.",
            "steps": [
              "F = k/d²; k = 18(2²) = 72.",
              "2 = 72/d², so d² = 36."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q7",
            "question": "The volume of a right circular cylinder varies jointly as its height and the square of its radius. A cylinder with radius 4 cm and height 7 cm has volume 352 cm³. Find the volume when the radius is 8 cm and height 14 cm.",
            "solution": "V = kr²h. The first dimensions give k = 352/(4²·7) = 22/7.\nV = (22/7)(8²)(14).",
            "finalAnswer": "2816 cm³.",
            "steps": [
              "V = kr²h. The first dimensions give k = 352/(4²·7) = 22/7.",
              "V = (22/7)(8²)(14)."
            ],
            "method": "Use joint variation V = kr²h."
          }
        ]
      },
      {
        "exercise": "Review Exercise 3",
        "title": "Review Exercise 3",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "Which expression represents direct variation between a and b?",
            "solution": "Direct variation means a = kb for some constant k.",
            "finalAnswer": "a ∝ b.",
            "steps": [
              "Direct variation means a = kb for some constant k."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(ii)",
            "question": "If m ∝ 1/n, which equation represents the variation?",
            "solution": "m = k/n. Multiply by n.",
            "finalAnswer": "mn = k.",
            "steps": [
              "m = k/n. Multiply by n."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(iii)",
            "question": "Identify which does not have the same ratio as the other three: 30/45, 4 to 6, 2:3, 3 to 2.",
            "solution": "30/45 = 2/3; 4/6 = 2/3; 2:3 = 2/3.",
            "finalAnswer": "3 to 2.",
            "steps": [
              "30/45 = 2/3; 4/6 = 2/3; 2:3 = 2/3."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(iv)",
            "question": "If a/b = c/d, what follows by alternendo?",
            "solution": "Interchange the second and third terms.",
            "finalAnswer": "a/c = b/d.",
            "steps": [
              "Interchange the second and third terms."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(v)",
            "question": "If 7 : 9 :: x : 27, find x.",
            "solution": "7/9 = x/27, so x = 21.",
            "finalAnswer": "x = 21.",
            "steps": [
              "7/9 = x/27, so x = 21."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(vi)",
            "question": "What is the third proportional to x and y?",
            "solution": "x : y :: y : z gives xz = y².",
            "finalAnswer": "y²/x.",
            "steps": [
              "x : y :: y : z gives xz = y²."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(vii)",
            "question": "If x ∝ 1/y and y ∝ 1/z, what is the relation between x and z?",
            "solution": "x = k₁/y and y = k₂/z, so x = (k₁/k₂)z.",
            "finalAnswer": "x ∝ z.",
            "steps": [
              "x = k₁/y and y = k₂/z, so x = (k₁/k₂)z."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(viii)",
            "question": "If 2a + 1 : 21 :: 4 : 7, find a.",
            "solution": "(2a+1)/21 = 4/7, so 2a + 1 = 12.",
            "finalAnswer": "a = 11/2.",
            "steps": [
              "(2a+1)/21 = 4/7, so 2a + 1 = 12."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(ix)",
            "question": "If a/b = c/d = e/f, which weighted ratio is also equal to them?",
            "solution": "Let all three equal k; then a = bk, c = dk, e = fk. Factor k from the weighted numerator.",
            "finalAnswer": "(ℓa + mc + ne)/(ℓb + md + nf).",
            "steps": [
              "Let all three equal k; then a = bk, c = dk, e = fk. Factor k from the weighted numerator."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q1(x)",
            "question": "Which relation says x varies directly as y?",
            "solution": "Direct variation has form x = ky.",
            "finalAnswer": "x = (7/16)y.",
            "steps": [
              "Direct variation has form x = ky."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q2",
            "question": "Find the constant of variation if s ∝ t² and s = 5 when t = 10.",
            "solution": "s = kt², so 5 = 100k.",
            "finalAnswer": "k = 1/20.",
            "steps": [
              "s = kt², so 5 = 100k."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q3",
            "question": "y ∝ 1/x². If y = 4 when x = 3, find x when y = 9.",
            "solution": "y = k/x²; k = 4(9) = 36.\n9 = 36/x², so x² = 4.",
            "finalAnswer": "x = ±2.",
            "steps": [
              "y = k/x²; k = 4(9) = 36.",
              "9 = 36/x², so x² = 4."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q4",
            "question": "Gas pressure varies directly as temperature. If pressure is 150 units at temperature 70 units, find pressure at temperature 140 units.",
            "solution": "Temperature doubles, so pressure doubles.",
            "finalAnswer": "300 units.",
            "steps": [
              "Temperature doubles, so pressure doubles."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q5",
            "question": "Current varies inversely as resistance. If current is 44 A when resistance is 30 Ω, find current when resistance is 22 Ω.",
            "solution": "IR = k = 44(30) = 1320.\nI = 1320/22.",
            "finalAnswer": "60 A.",
            "steps": [
              "IR = k = 44(30) = 1320.",
              "I = 1320/22."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q6",
            "question": "a varies jointly as b and √c. If a = 21 when b = 5 and c = 36, find a when b = 12 and c = 225.",
            "solution": "a = kb√c; k = 21/(5·6) = 7/10.\na = (7/10)(12)(15).",
            "finalAnswer": "a = 126.",
            "steps": [
              "a = kb√c; k = 21/(5·6) = 7/10.",
              "a = (7/10)(12)(15)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q7",
            "question": "What number must be added to each of 3, 8, 11 and 20 to make them proportional?",
            "solution": "(3+x)/(8+x) = (11+x)/(20+x).\nCross-multiplication gives x² + 23x + 60 = x² + 19x + 88, so 4x = 28.",
            "finalAnswer": "x = 7.",
            "steps": [
              "(3+x)/(8+x) = (11+x)/(20+x).",
              "Cross-multiplication gives x² + 23x + 60 = x² + 19x + 88, so 4x = 28."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q8",
            "question": "What number must be subtracted from each of 6, 8, 7 and 11 to make the remaining numbers proportional?",
            "solution": "(6−x)/(8−x) = (7−x)/(11−x).\nCross-multiplication simplifies to 66−17x = 56−15x, so x = 5.",
            "finalAnswer": "x = 5.",
            "steps": [
              "(6−x)/(8−x) = (7−x)/(11−x).",
              "Cross-multiplication simplifies to 66−17x = 56−15x, so x = 5."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q9",
            "question": "The ratio of two numbers is 8 : 3 and their difference is 20. Find the numbers.",
            "solution": "Let the numbers be 8k and 3k. Then 5k = 20, so k = 4.",
            "finalAnswer": "32 and 12.",
            "steps": [
              "Let the numbers be 8k and 3k. Then 5k = 20, so k = 4."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q10",
            "question": "Find three numbers in continued proportion whose sum is 14 and whose squared sum is 84.",
            "solution": "Let them be x, y, z with y² = xz. From (x+y+z)² = 84 + 2(xy+yz+xz), obtain xy+yz+xz = 56.\nUsing y² = xz gives y = 4, and x+z = 10, xz = 16.\nx and z are roots of t² − 10t + 16 = 0.",
            "finalAnswer": "2, 4, 8 (or 8, 4, 2).",
            "steps": [
              "Let them be x, y, z with y² = xz. From (x+y+z)² = 84 + 2(xy+yz+xz), obtain xy+yz+xz = 56.",
              "Using y² = xz gives y = 4, and x+z = 10, xz = 16.",
              "x and z are roots of t² − 10t + 16 = 0."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q11",
            "question": "The mean proportional between two numbers is 6 and their sum is 13. Find the numbers.",
            "solution": "Let them be u,v. uv = 36 and u + v = 13.\nThey are roots of t² − 13t + 36 = 0 = (t−4)(t−9).",
            "finalAnswer": "4 and 9.",
            "steps": [
              "Let them be u,v. uv = 36 and u + v = 13.",
              "They are roots of t² − 13t + 36 = 0 = (t−4)(t−9)."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q12",
            "question": "Find the angles of a triangle in the ratio 3 : 4 : 5.",
            "solution": "There are 12 equal parts; each is 180°/12 = 15°.",
            "finalAnswer": "45°, 60° and 75°.",
            "steps": [
              "There are 12 equal parts; each is 180°/12 = 15°."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q13",
            "question": "If a/b = c/d, prove ac(a+c)/[bd(b+d)] = (a+c)³/(b+d)³.",
            "solution": "Let a = kb and c = kd. Then the left side equals [k²bd·k(b+d)]/[bd(b+d)] = k³.\nThe right side is [k(b+d)]³/(b+d)³ = k³.",
            "finalAnswer": "Both sides equal k³.",
            "steps": [
              "Let a = kb and c = kd. Then the left side equals [k²bd·k(b+d)]/[bd(b+d)] = k³.",
              "The right side is [k(b+d)]³/(b+d)³ = k³."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q14",
            "question": "If a, b, c are in continued proportion, prove a/c = (a²+ab+b²)/(b²+bc+c²) = (a²−b²)/(b²−c²).",
            "solution": "Let a/b = b/c = r, so a = r²c and b = rc.\nSubstitute: the first two fractions each reduce to r²; the difference-of-squares ratio also reduces to r².",
            "finalAnswer": "All three ratios equal a/c.",
            "steps": [
              "Let a/b = b/c = r, so a = r²c and b = rc.",
              "Substitute: the first two fractions each reduce to r²; the difference-of-squares ratio also reduces to r²."
            ],
            "method": "Apply the stated ratio or variation relationship."
          },
          {
            "num": "Q15",
            "question": "If a/b = c/d = e/f, prove (a³+c³+e³)/(b³+d³+f³) = ace/(bdf).",
            "solution": "Let each ratio equal k: a = kb, c = kd, e = kf.\nThe left side becomes k³(b³+d³+f³)/(b³+d³+f³) = k³.\nThe right side is (kb)(kd)(kf)/(bdf) = k³.",
            "finalAnswer": "Both sides are equal.",
            "steps": [
              "Let each ratio equal k: a = kb, c = kd, e = kf.",
              "The left side becomes k³(b³+d³+f³)/(b³+d³+f³) = k³.",
              "The right side is (kb)(kd)(kf)/(bdf) = k³."
            ],
            "method": "Apply the stated ratio or variation relationship."
          }
        ]
      }
    ],
    "slos": [
      "Define ratio, proportion, antecedent, consequent, extremes, and means",
      "Solve problems involving direct, inverse, and joint variation",
      "Apply theorems on proportions: invertendo, alternando, componendo-dividendo",
      "Use the k-method to prove homogeneous algebraic identities"
    ],
    "formulaSheet": [
      {
        "name": "Direct Variation",
        "formula": "y = kx",
        "note": "Constant ratio k = y/x."
      },
      {
        "name": "Inverse Variation",
        "formula": "y = k/x  (xy = k)",
        "note": "Constant product k = xy."
      },
      {
        "name": "Componendo-Dividendo",
        "formula": "a/b = c/d  =>  (a+b)/(a-b) = (c+d)/(c-d)",
        "note": "Fundamental theorem for solving proportion equations."
      },
      {
        "name": "k-Method",
        "formula": "a/b = c/d = k  =>  a = bk, c = dk",
        "note": "Substitution for algebraic proofs."
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 4,
    "id": "u4",
    "title": "Partial Fractions",
    "titleUrdu": "جزوی کسریں",
    "status": "ready",
    "badge": "Rebuilt in printed page order from scans",
    "pageRange": "Pages 71–83",
    "description": "Unit 4 follows the book from proper and improper rational fractions through all four partial-fraction cases, Examples 1–7, Exercises 4.1 and 4.2, and Review Exercise 4.",
    "sections": [
      {
        "id": "4.1",
        "title": "4.1 Proper and Improper Rational Fractions",
        "theory": "A rational fraction is P(x)/Q(x), where P(x) and Q(x) are polynomials and Q(x) ≠ 0. It is proper when degree P < degree Q, and improper when degree P ≥ degree Q. The book first defines these forms and then converts an improper fraction to a polynomial plus a proper fraction by long division. For example, (2x²+1)/(x−1) = 2x+2+3/(x−1).",
        "rules": [
          "Proper rational fraction: degree of numerator is less than degree of denominator.",
          "Improper rational fraction: degree of numerator is greater than or equal to degree of denominator.",
          "Divide an improper fraction before resolving it: P(x)/Q(x) = quotient + remainder/Q(x)."
        ]
      },
      {
        "id": "4.2",
        "title": "4.2 Resolution of Fraction into Partial Fractions",
        "theory": "The form of each partial fraction depends on the factors of Q(x). Case I: each non-repeated linear factor ax+b contributes A/(ax+b). Case II: a repeated linear factor (ax+b)^n contributes A₁/(ax+b)+A₂/(ax+b)²+…+Aₙ/(ax+b)^n. Case III: each non-repeated irreducible quadratic ax²+bx+c contributes (Ax+B)/(ax²+bx+c). Case IV: a repeated irreducible quadratic contributes a separate linear numerator over every power of that quadratic. Clear denominators, substitute roots of linear factors where useful, then compare coefficients.",
        "rules": [
          "A distinct linear factor gets a constant numerator.",
          "Every power of a repeated linear factor must appear as a separate term.",
          "An irreducible quadratic factor gets a linear numerator.",
          "For repeated quadratic factors, include a linear numerator over each power."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "title": "Example 1 (Page 74) — Distinct linear factors",
        "problem": "Resolve 1/[(x+1)(x+2)] into partial fractions.",
        "given": "Resolve 1/[(x+1)(x+2)] into partial fractions.",
        "method": "Case I: distinct linear factors",
        "steps": [
          "Let 1/[(x+1)(x+2)] = A/(x+1)+B/(x+2).",
          "Clear denominators: 1=A(x+2)+B(x+1).",
          "Put x=−1: 1=A, so A=1. Put x=−2: 1=−B, so B=−1."
        ],
        "answer": "1/(x+1) − 1/(x+2)"
      },
      {
        "id": "eg2",
        "title": "Example 2 (Page 75) — Distinct linear factors",
        "problem": "Find the partial fractions of (3x+2)/(x²−x−2).",
        "given": "Find the partial fractions of (3x+2)/(x²−x−2).",
        "method": "Case I: distinct linear factors",
        "steps": [
          "Factor x²−x−2=(x+1)(x−2). Let the fraction equal A/(x+1)+B/(x−2).",
          "Clear denominators: 3x+2=A(x−2)+B(x+1).",
          "Put x=−1: −1=−3A, so A=1/3. Put x=2: 8=3B, so B=8/3."
        ],
        "answer": "1/[3(x+1)] + 8/[3(x−2)]"
      },
      {
        "id": "eg3",
        "title": "Example 3 (Page 76) — Repeated linear factor",
        "problem": "Find the partial fractions of x/(x+1)².",
        "given": "Find the partial fractions of x/(x+1)².",
        "method": "Case II: repeated linear factor",
        "steps": [
          "Let x/(x+1)²=A/(x+1)+B/(x+1)².",
          "Clear denominators: x=A(x+1)+B.",
          "Put x=−1: B=−1. Compare coefficients of x: A=1."
        ],
        "answer": "1/(x+1) − 1/(x+1)²"
      },
      {
        "id": "eg4",
        "title": "Example 4 (Page 77) — Repeated linear factor",
        "problem": "Find the partial fractions of (2x²+1)/[(x−2)²(x+3)].",
        "given": "Find the partial fractions of (2x²+1)/[(x−2)²(x+3)].",
        "method": "Case II: repeated linear factor",
        "steps": [
          "Let the fraction equal A/(x−2)+B/(x−2)²+C/(x+3).",
          "Clear denominators: 2x²+1=A(x−2)(x+3)+B(x+3)+C(x−2)².",
          "Put x=2: B=9/5. Put x=−3: C=19/25.",
          "Compare coefficients of x²: A+C=2, so A=31/25.",
          "The question line gives x+3; the last printed display appears to repeat x+2 by a typographical error."
        ],
        "answer": "31/[25(x−2)] + 9/[5(x−2)²] + 19/[25(x+3)]"
      },
      {
        "id": "eg5",
        "title": "Example 5 (Page 78) — A non-repeated irreducible quadratic",
        "problem": "Find the partial fractions of 1/[(x+1)(x²+2)].",
        "given": "Find the partial fractions of 1/[(x+1)(x²+2)].",
        "method": "Case III: irreducible quadratic",
        "steps": [
          "Let the fraction equal A/(x+1)+(Bx+C)/(x²+2).",
          "Clear denominators: 1=A(x²+2)+(Bx+C)(x+1).",
          "Put x=−1: A=1/3. Comparing coefficients gives B=−1/3 and C=1/3."
        ],
        "answer": "1/[3(x+1)] + (1−x)/[3(x²+2)]"
      },
      {
        "id": "eg6",
        "title": "Example 6 (Page 79) — Two non-repeated irreducible quadratics",
        "problem": "Resolve (4x²−28)/(x⁴−x²−6) into partial fractions. The scanned worked solution factors it as (x²+3)(x²−2), whose product is x⁴+x²−6; the printed denominator and factorization disagree.",
        "given": "Resolve (4x²−28)/(x⁴−x²−6) into partial fractions.",
        "method": "Case III: irreducible quadratic factors",
        "steps": [
          "For the denominator as printed, factor x⁴−x²−6=(x²−3)(x²+2).",
          "Set the fraction equal to (Ax+B)/(x²−3)+(Cx+D)/(x²+2), then clear denominators.",
          "Comparing coefficients gives A=C=0, B=−16/5 and D=36/5.",
          "The book's displayed result 8/(x²+3)−4/(x²−2) is correct for x⁴+x²−6, the product of the factorization printed in its working."
        ],
        "answer": "For x⁴−x²−6 as printed: −16/[5(x²−3)] + 36/[5(x²+2)]."
      },
      {
        "id": "eg7",
        "title": "Example 7 (Page 80) — A repeated irreducible quadratic",
        "problem": "Resolve 1/[(x−1)(x²+1)²] into partial fractions.",
        "given": "Resolve 1/[(x−1)(x²+1)²] into partial fractions.",
        "method": "Case IV: repeated irreducible quadratic",
        "steps": [
          "Set the fraction equal to A/(x−1)+(Bx+C)/(x²+1)+(Dx+E)/(x²+1)².",
          "Clear denominators and put x=1 to obtain A=1/4.",
          "Comparing coefficients gives B=−1/4, C=−1/4, D=−1/2 and E=−1/2."
        ],
        "answer": "1/[4(x−1)] − (x+1)/[4(x²+1)] − (x+1)/[2(x²+1)²]"
      }
    ],
    "exercises": [
      {
        "exercise": "4.1",
        "title": "Exercise 4.1 — Resolve the fractions into partial fractions",
        "problems": [
          {
            "num": "Q1",
            "question": "(3x−2)/(2x²−x)",
            "solution": "Factor the denominator as x(2x−1). Set the fraction equal to A/x+B/(2x−1); clearing denominators and substituting x=0 and x=1/2 gives A=2 and B=−1.",
            "finalAnswer": "2/x − 1/(2x−1)",
            "steps": [
              "2x²−x=x(2x−1).",
              "Let the expression be A/x+B/(2x−1).",
              "Substitution gives A=2 and B=−1."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2",
            "question": "(x−1)/(x²+6x+5)",
            "solution": "Factor x²+6x+5=(x+1)(x+5). With A/(x+1)+B/(x+5), substituting x=−1 and x=−5 gives A=−1/2 and B=3/2.",
            "finalAnswer": "−1/[2(x+1)] + 3/[2(x+5)]",
            "steps": [
              "Factor the denominator: (x+1)(x+5).",
              "Set A/(x+1)+B/(x+5).",
              "Substitution gives A=−1/2 and B=3/2."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q3",
            "question": "1/(x²−1)",
            "solution": "Factor x²−1=(x−1)(x+1). Solving 1=A(x+1)+B(x−1) gives A=1/2 and B=−1/2.",
            "finalAnswer": "1/[2(x−1)] − 1/[2(x+1)]",
            "steps": [
              "Factor the denominator into distinct linear factors.",
              "Let 1/[ (x−1)(x+1) ]=A/(x−1)+B/(x+1).",
              "Substitution gives A=1/2 and B=−1/2."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q4",
            "question": "x/(x²+4x−5)",
            "solution": "Factor x²+4x−5=(x+5)(x−1). Write A/(x+5)+B/(x−1); substitution gives A=5/6 and B=1/6.",
            "finalAnswer": "5/[6(x+5)] + 1/[6(x−1)]",
            "steps": [
              "Factor the denominator: (x+5)(x−1).",
              "Set x=A(x−1)+B(x+5).",
              "Substitution gives A=5/6 and B=1/6."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q5",
            "question": "(4x+2)/[(x+2)(2x−1)]",
            "solution": "Set the fraction equal to A/(x+2)+B/(2x−1). Clearing denominators and substituting x=−2 and x=1/2 gives A=6/5 and B=8/5.",
            "finalAnswer": "6/[5(x+2)] + 8/[5(2x−1)]",
            "steps": [
              "Use distinct linear factors x+2 and 2x−1.",
              "Clear denominators: 4x+2=A(2x−1)+B(x+2).",
              "Substitution gives A=6/5 and B=8/5."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q6",
            "question": "(x²+5x+3)/[(x²−1)(x+1)]",
            "solution": "Factor the denominator as (x−1)(x+1)². Use A/(x−1)+B/(x+1)+C/(x+1)²; the constants are A=9/4, B=−5/4 and C=1/2.",
            "finalAnswer": "9/[4(x−1)] − 5/[4(x+1)] + 1/[2(x+1)²]",
            "steps": [
              "Write the denominator as (x−1)(x+1)².",
              "Use one term for each power of the repeated factor.",
              "Substitute x=1 and x=−1, then compare coefficients."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q7",
            "question": "(x²+2)/[(x+2)(x²+5x+6)]",
            "solution": "Factor the denominator as (x+2)²(x+3). Use A/(x+2)+B/(x+2)²+C/(x+3); solving gives A=−10, B=6 and C=11.",
            "finalAnswer": "−10/(x+2) + 6/(x+2)² + 11/(x+3)",
            "steps": [
              "Factor x²+5x+6=(x+2)(x+3).",
              "Use A/(x+2)+B/(x+2)²+C/(x+3).",
              "Substitute x=−2 and x=−3; compare coefficients for the remaining constant."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q8",
            "question": "(2x−1)/[x(x−3)²]",
            "solution": "Set the fraction equal to A/x+B/(x−3)+C/(x−3)². Substitution gives A=−1/9 and C=5/3; comparing x² coefficients gives B=1/9.",
            "finalAnswer": "−1/(9x) + 1/[9(x−3)] + 5/[3(x−3)²]",
            "steps": [
              "Include terms for x and both powers of x−3.",
              "Clear denominators and substitute x=0 and x=3.",
              "Compare coefficients to obtain A=−1/9, B=1/9, C=5/3."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q9",
            "question": "x²/(x²+2x+1)",
            "solution": "Since x²+2x+1=(x+1)² and the fraction is improper, divide first: x²/(x+1)²=1−(2x+1)/(x+1)². Resolving the remainder gives the stated result.",
            "finalAnswer": "1 − 2/(x+1) + 1/(x+1)²",
            "steps": [
              "Factor the denominator: (x+1)².",
              "Divide: x²/(x+1)²=1−(2x+1)/(x+1)².",
              "Write 2x+1=2(x+1)−1."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q10",
            "question": "x²/[(x−1)²(x+1)]",
            "solution": "Let the fraction equal A/(x−1)+B/(x−1)²+C/(x+1). Substituting x=1 and x=−1 gives B=1/2 and A=1/4; comparing x² coefficients gives C=−1/4.",
            "finalAnswer": "1/[4(x−1)] + 1/[2(x−1)²] − 1/[4(x+1)]",
            "steps": [
              "Use A/(x−1)+B/(x−1)²+C/(x+1).",
              "Clear denominators and substitute x=1 and x=−1.",
              "Compare leading coefficients to find C=−1/4."
            ],
            "method": "Partial fractions"
          }
        ]
      },
      {
        "exercise": "4.2",
        "title": "Exercise 4.2 — Resolve the fractions into partial fractions",
        "problems": [
          {
            "num": "Q1",
            "question": "1/[x(x²+1)]",
            "solution": "Set the fraction equal to A/x+(Bx+C)/(x²+1). Clearing denominators gives A=1, B=−1 and C=0.",
            "finalAnswer": "1/x − x/(x²+1)",
            "steps": [
              "Use A/x+(Bx+C)/(x²+1).",
              "Clear denominators: 1=A(x²+1)+(Bx+C)x.",
              "Compare coefficients: A=1, B=−1, C=0."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2",
            "question": "(x²+3x+1)/[(x−1)(x²+3)]",
            "solution": "Use A/(x−1)+(Bx+C)/(x²+3). Substitution x=1 gives A=5/4; coefficient comparison gives B=−1/4 and C=11/4.",
            "finalAnswer": "5/[4(x−1)] + (−x+11)/[4(x²+3)]",
            "steps": [
              "Use a constant numerator over x−1 and a linear numerator over x²+3.",
              "Clear denominators and put x=1 to get A=5/4.",
              "Compare coefficients: B=−1/4, C=11/4."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q3",
            "question": "(2x+1)/[(x²+1)(x−1)]",
            "solution": "Set the fraction equal to A/(x−1)+(Bx+C)/(x²+1). Substitution x=1 gives A=3/2; coefficient comparison gives B=−3/2 and C=1/2.",
            "finalAnswer": "3/[2(x−1)] + (−3x+1)/[2(x²+1)]",
            "steps": [
              "Use A/(x−1)+(Bx+C)/(x²+1).",
              "Put x=1 after clearing denominators: A=3/2.",
              "Compare coefficients: B=−3/2 and C=1/2."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q4",
            "question": "−3/[x²(x²+5)]",
            "solution": "Use A/x+B/x²+(Cx+D)/(x²+5). Comparing coefficients gives A=C=0, B=−3/5 and D=3/5.",
            "finalAnswer": "−3/(5x²) + 3/[5(x²+5)]",
            "steps": [
              "Include A/x and B/x² for the repeated x factor.",
              "Use a linear numerator over x²+5.",
              "Clear denominators and compare coefficients."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q5",
            "question": "(3x−2)/[(x+4)(3x²+1)]",
            "solution": "Set the fraction equal to A/(x+4)+(Bx+C)/(3x²+1). Substitution x=−4 gives A=−2/7; comparing coefficients gives B=6/7 and C=−3/7.",
            "finalAnswer": "−2/[7(x+4)] + (6x−3)/[7(3x²+1)]",
            "steps": [
              "Use A/(x+4)+(Bx+C)/(3x²+1).",
              "Put x=−4 after clearing denominators: A=−2/7.",
              "Compare coefficients to get B=6/7 and C=−3/7."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q6",
            "question": "5x/[(x+1)(x²−2)²]",
            "solution": "Use A/(x+1)+(Bx+C)/(x²−2)+(Dx+E)/(x²−2)². Coefficient comparison gives A=−5, B=5, C=−5, D=−5 and E=10.",
            "finalAnswer": "−5/(x+1) + 5(x−1)/(x²−2) + (−5x+10)/(x²−2)²",
            "steps": [
              "Include a term for each power of the repeated quadratic.",
              "Put x=−1 to find A=−5.",
              "Clear denominators and compare coefficients for B, C, D and E."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q7",
            "question": "(5x²−4x+8)/[(x²+1)²(x−2)]",
            "solution": "Use A/(x−2)+(Bx+C)/(x²+1)+(Dx+E)/(x²+1)². Substitution x=2 gives A=4/5; comparing coefficients gives B=−4/5, C=−8/5, D=1 and E=−2.",
            "finalAnswer": "4/[5(x−2)] − 4(x+2)/[5(x²+1)] + (x−2)/(x²+1)²",
            "steps": [
              "Use a linear numerator for both powers of x²+1.",
              "Put x=2 to obtain A=4/5.",
              "Clear denominators and compare coefficients for the remaining constants."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q8",
            "question": "(4x−5)/(x²+4)²",
            "solution": "The denominator is a repeated irreducible quadratic. Use (Ax+B)/(x²+4)+(Cx+D)/(x²+4)². Comparing coefficients gives A=B=0, C=4 and D=−5.",
            "finalAnswer": "(4x−5)/(x²+4)²",
            "steps": [
              "Use one linear numerator over each power of x²+4.",
              "Clear denominators: 4x−5=(Ax+B)(x²+4)+Cx+D.",
              "Compare coefficients: A=B=0, C=4, D=−5."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q9",
            "question": "8x²/[(x²+1)(1−x⁴)]",
            "solution": "Put t=x² and use 1−x⁴=(1−x²)(1+x²). Then 8t/[(1+t)²(1−t)]=2/(1−t)+2/(1+t)−4/(1+t)², and 2/(1−x²)=−1/(x−1)+1/(x+1).",
            "finalAnswer": "−1/(x−1) + 1/(x+1) + 2/(x²+1) − 4/(x²+1)²",
            "steps": [
              "Let t=x² and factor 1−x⁴=(1−t)(1+t).",
              "Resolve 8t/[(1+t)²(1−t)] as 2/(1−t)+2/(1+t)−4/(1+t)².",
              "Rewrite 2/(1−x²) using the two linear factors."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q10",
            "question": "(2x²+4)/[(x²+1)²(x−1)]",
            "solution": "Use A/(x−1)+(Bx+C)/(x²+1)+(Dx+E)/(x²+1)². Substitution x=1 gives A=3/2; comparing coefficients gives B=C=−3/2 and D=E=−1.",
            "finalAnswer": "3/[2(x−1)] − 3(x+1)/[2(x²+1)] − (x+1)/(x²+1)²",
            "steps": [
              "Use a separate linear numerator over each quadratic power.",
              "Put x=1 to obtain A=3/2.",
              "Clear denominators and compare coefficients to find B=C=−3/2 and D=E=−1."
            ],
            "method": "Partial fractions"
          }
        ]
      },
      {
        "exercise": "Review Exercise 4",
        "title": "Review Exercise 4",
        "problems": [
          {
            "num": "Q1(i)",
            "question": "Choose the partial-fraction form equal to 1/(x²−1): (a) 1/(x+1)−1/(x−1); (b) 1/[2(x+1)]−1/[2(x−1)]; (c) 1/[2(x−1)]−1/[2(x+1)]; (d) 2/(x−1)−1/[2(x+1)].",
            "solution": "Since x²−1=(x−1)(x+1), solve 1=A(x+1)+B(x−1), giving A=1/2 and B=−1/2.",
            "finalAnswer": "(c) 1/[2(x−1)] − 1/[2(x+1)]",
            "steps": [
              "Factor x²−1=(x−1)(x+1).",
              "Find A=1/2 and B=−1/2."
            ],
            "method": "Select the correct circle"
          },
          {
            "num": "Q1(ii)",
            "question": "If P(x) and Q(x) are polynomials and Q(x)≠0, what is P(x)/Q(x)? Options: rational fraction; irrational fraction; proper fraction; improper fraction.",
            "solution": "A quotient of polynomials with nonzero denominator is a rational fraction.",
            "finalAnswer": "Rational fraction",
            "steps": [
              "Apply the definition of a rational fraction."
            ],
            "method": "Select the correct circle"
          },
          {
            "num": "Q1(iii)",
            "question": "Classify (x²+2)/(x²+2x+2): proper fraction; improper fraction; irrational fraction; none of these.",
            "solution": "The numerator and denominator both have degree 2, so the rational fraction is improper.",
            "finalAnswer": "Improper rational fraction",
            "steps": [
              "Compare polynomial degrees: 2 and 2."
            ],
            "method": "Select the correct circle"
          },
          {
            "num": "Q1(iv)",
            "question": "Find the quotient when x³−8x²+16x−5 is divided by x−5.",
            "solution": "Synthetic division by 5 gives quotient coefficients 1, −3, 1 and remainder 0.",
            "finalAnswer": "x²−3x+1",
            "steps": [
              "Divide by x−5 using synthetic value 5.",
              "The quotient is x²−3x+1; the remainder is 0."
            ],
            "method": "Select the correct circle"
          },
          {
            "num": "Q2(i)",
            "question": "Resolve 2x²/[(x+1)(x−1)] into partial fractions.",
            "solution": "The fraction is improper. Divide to obtain 2+2/(x²−1), then resolve 2/(x²−1)=1/(x−1)−1/(x+1).",
            "finalAnswer": "2 + 1/(x−1) − 1/(x+1)",
            "steps": [
              "Divide first: 2x²/(x²−1)=2+2/(x²−1).",
              "Factor x²−1=(x−1)(x+1).",
              "Resolve the proper fraction into the two distinct linear factors."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(ii)",
            "question": "Resolve (2x³−3x²+9x+8)/(x²−3x+2) into partial fractions.",
            "solution": "Long division gives 2x+3+(14x+2)/(x²−3x+2). Factor the denominator as (x−1)(x−2); the remainder decomposes as −16/(x−1)+30/(x−2).",
            "finalAnswer": "2x+3 − 16/(x−1) + 30/(x−2)",
            "steps": [
              "Divide first: quotient 2x+3, remainder 14x+2.",
              "Factor the denominator: (x−1)(x−2).",
              "Resolve the remainder to get −16/(x−1)+30/(x−2)."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(iii)",
            "question": "Resolve (3x−1)/(x³−2x²+x) into partial fractions.",
            "solution": "Factor the denominator as x(x−1)². Let the terms be A/x+B/(x−1)+C/(x−1)²; A=−1, B=1 and C=2.",
            "finalAnswer": "−1/x + 1/(x−1) + 2/(x−1)²",
            "steps": [
              "Factor x³−2x²+x=x(x−1)².",
              "Include both powers of x−1.",
              "Substitution and coefficient comparison give A=−1, B=1, C=2."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(iv)",
            "question": "Resolve (x+1)/(x−1)² into partial fractions.",
            "solution": "Write A/(x−1)+B/(x−1)². Clearing denominators gives x+1=A(x−1)+B, so A=1 and B=2.",
            "finalAnswer": "1/(x−1) + 2/(x−1)²",
            "steps": [
              "Include both powers of the repeated factor.",
              "Clear denominators and compare coefficients."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(v)",
            "question": "Resolve 2x²/(x⁴−4) into partial fractions.",
            "solution": "Factor x⁴−4=(x²−2)(x²+2). Solving 2x²=A(x²+2)+B(x²−2) gives A=B=1.",
            "finalAnswer": "1/(x²−2) + 1/(x²+2)",
            "steps": [
              "Factor as a difference of squares.",
              "Set A/(x²−2)+B/(x²+2).",
              "Compare coefficients: A=B=1."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(vi)",
            "question": "Resolve (3x²+3x+2)/(x⁴−1) into partial fractions.",
            "solution": "Factor x⁴−1=(x−1)(x+1)(x²+1). Substitution at x=1 and x=−1 gives A=2 and B=−1/2; comparison gives the quadratic numerator (1−3x)/2.",
            "finalAnswer": "2/(x−1) − 1/[2(x+1)] + (1−3x)/[2(x²+1)]",
            "steps": [
              "Factor x⁴−1 into distinct factors.",
              "Use A/(x−1)+B/(x+1)+(Cx+D)/(x²+1).",
              "Solve A=2, B=−1/2, C=−3/2, D=1/2."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(vii)",
            "question": "Resolve (x³+3x²+1)/(x²+1)² into partial fractions.",
            "solution": "Let the fraction equal (Ax+B)/(x²+1)+(Cx+D)/(x²+1)². Comparing coefficients gives A=1, B=3, C=−1 and D=−2.",
            "finalAnswer": "(x+3)/(x²+1) − (x+2)/(x²+1)²",
            "steps": [
              "Use a term for each power of x²+1.",
              "Clear denominators and compare coefficients."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(viii)",
            "question": "Resolve (2x³−1)/(x³+x²) into partial fractions.",
            "solution": "Long division gives 2+(-2x²−1)/[x²(x+1)]. Set the proper fraction equal to A/x+B/x²+C/(x+1); A=1, B=−1, C=−3.",
            "finalAnswer": "2 + 1/x − 1/x² − 3/(x+1)",
            "steps": [
              "Divide first: quotient 2, remainder −2x²−1.",
              "Factor x³+x²=x²(x+1).",
              "Resolve the proper remainder to obtain A=1, B=−1, C=−3."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q2(ix)",
            "question": "Resolve (4x²+3x+14)/(x³−8) into partial fractions.",
            "solution": "Factor x³−8=(x−2)(x²+2x+4). Use A/(x−2)+(Bx+C)/(x²+2x+4); substitution x=2 gives A=3 and comparison gives B=1, C=−1.",
            "finalAnswer": "3/(x−2) + (x−1)/(x²+2x+4)",
            "steps": [
              "Factor the difference of cubes.",
              "Set A/(x−2)+(Bx+C)/(x²+2x+4).",
              "Substitute x=2 and compare coefficients."
            ],
            "method": "Partial fractions"
          },
          {
            "num": "Q3",
            "question": "Challenge: resolve (x⁴+3x²+x+1)/[(x+1)(x²+1)²] into partial fractions.",
            "solution": "Set the form A/(x+1)+(Bx+C)/(x²+1)+(Dx+E)/(x²+1)². Clearing denominators and comparing coefficients gives A=1, B=C=E=0 and D=1.",
            "finalAnswer": "1/(x+1) + x/(x²+1)²",
            "steps": [
              "Use the repeated irreducible quadratic form.",
              "Clear denominators and compare coefficients of x⁴, x³, x², x and the constant.",
              "The constants are A=1, B=C=E=0, D=1."
            ],
            "method": "Challenge"
          }
        ]
      }
    ],
    "slos": [
      "Identify a rational fraction and classify it as proper or improper.",
      "Convert an improper rational fraction by polynomial long division.",
      "Resolve fractions with distinct and repeated linear factors.",
      "Resolve fractions with distinct and repeated irreducible quadratic factors."
    ],
    "formulaSheet": [
      {
        "name": "Proper rational fraction",
        "formula": "deg(P) < deg(Q)",
        "note": "The numerator has lower degree than the denominator."
      },
      {
        "name": "Improper rational fraction",
        "formula": "deg(P) ≥ deg(Q)",
        "note": "Divide before resolving into partial fractions."
      },
      {
        "name": "Distinct linear factors",
        "formula": "A/(ax+b) + B/(cx+d)",
        "note": "Use one constant numerator per factor."
      },
      {
        "name": "Repeated linear factor",
        "formula": "A₁/L + A₂/L² + … + Aₙ/Lⁿ",
        "note": "Include every power of the repeated factor L."
      },
      {
        "name": "Irreducible quadratic factor",
        "formula": "(Ax+B)/(ax²+bx+c)",
        "note": "Use a linear numerator."
      },
      {
        "name": "Repeated irreducible quadratic",
        "formula": "(A₁x+B₁)/Q + (A₂x+B₂)/Q² + …",
        "note": "Use one linear numerator for each power of Q."
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 5,
    "id": "u5",
    "title": "Sets and Functions",
    "titleUrdu": "سیٹ اور تفاعل",
    "status": "ready",
    "badge": "Rebuilt from textbook page scans",
    "pageRange": "Pages 84–119",
    "description": "Lessons, worked examples, exercises and diagrams arranged in the printed order of Unit 5.",
    "sections": [
      {
        "id": "5.1.1",
        "title": "5.1.1 Operations on Sets",
        "page": "pp. 85–87",
        "theory": "For sets A and B, the union A ∪ B contains the elements in A or B (or both). The intersection A ∩ B contains the elements common to both sets. A and B are disjoint when A ∩ B = ∅. The difference A\\B contains the elements of A that are not in B. If A is a subset of the universal set U, its complement is A′ = U\\A.",
        "rules": [
          "A ∪ B = {x | x ∈ A or x ∈ B}.",
          "A ∩ B = {x | x ∈ A and x ∈ B}.",
          "A\\B = {x | x ∈ A and x ∉ B}.",
          "A′ = U\\A; a complement is always taken relative to U."
        ]
      },
      {
        "id": "5.1.2",
        "title": "5.1.2 Properties of Union and Intersection",
        "page": "pp. 87–90",
        "theory": "The book proves the commutative and associative properties of union and intersection, the two distributive properties, and De Morgan’s laws. Each proof begins with an arbitrary element x and uses the definitions of union, intersection, and complement to show that it belongs to the left side exactly when it belongs to the right side.",
        "rules": [
          "A ∪ B = B ∪ A; A ∩ B = B ∩ A.",
          "A ∪ (B ∪ C) = (A ∪ B) ∪ C; A ∩ (B ∩ C) = (A ∩ B) ∩ C.",
          "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C).",
          "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).",
          "(A ∪ B)′ = A′ ∩ B′; (A ∩ B)′ = A′ ∪ B′."
        ]
      },
      {
        "id": "5.1.3",
        "title": "5.1.3 Verification of Set Properties by Examples",
        "page": "pp. 91–95",
        "theory": "The printed examples substitute finite sets into the properties proved in 5.1.2. For each identity, find the set on each side and compare the results. Equality of the two resulting sets verifies the identity for the particular example.",
        "rules": [
          "Keep the same universal set when taking complements.",
          "For an identity with three sets, evaluate the inner operation first."
        ]
      },
      {
        "id": "5.1.4",
        "title": "5.1.4 Venn Diagrams",
        "page": "pp. 96–106",
        "theory": "A Venn diagram represents the universal set by a rectangle and sets by closed curves inside it. Place each element in the region determined by the sets to which it belongs. To verify an identity, shade each side; matching shaded regions represent equal sets.",
        "rules": [
          "Union: shade every region belonging to at least one named set.",
          "Intersection: shade the common region.",
          "Difference A\\B: shade the part of A outside B.",
          "Complement: shade the part of the universal rectangle outside the set."
        ]
      },
      {
        "id": "5.1.5",
        "title": "5.1.5 Ordered Pairs and Cartesian Product",
        "page": "p. 106",
        "theory": "An ordered pair (a,b) equals (c,d) exactly when a=c and b=d. The Cartesian product A×B is the set of all ordered pairs whose first member is from A and second member is from B. Its number of elements is n(A)n(B).",
        "rules": [
          "(a,b)=(c,d) ⇔ a=c and b=d.",
          "A×B = {(a,b) | a∈A and b∈B}.",
          "n(A×B)=n(A)·n(B)."
        ]
      },
      {
        "id": "5.2",
        "title": "5.2 Binary Relations",
        "page": "pp. 107–109",
        "theory": "A binary relation from A to B is any subset of A×B. A relation may be given as a set of ordered pairs or by a condition on its members. Its domain is the set of first coordinates appearing in the relation; its range is the set of second coordinates appearing.",
        "rules": [
          "R⊆A×B.",
          "Dom(R)={x | (x,y)∈R}; Ran(R)={y | (x,y)∈R}.",
          "If n(A×B)=mn, the number of binary relations from A to B is 2^(mn), since each relation is a subset of A×B."
        ]
      },
      {
        "id": "5.3",
        "title": "5.3 Functions",
        "page": "pp. 110–115",
        "theory": "A function f from A to B is a relation in which every element of A appears exactly once as a first coordinate. Each input has one image. The domain is A, the codomain is B, and the range is the set of images actually reached in B.",
        "rules": [
          "Every domain element must have an image.",
          "An input cannot have two different images.",
          "An output may be the image of more than one input."
        ]
      },
      {
        "id": "5.3.1",
        "title": "5.3.1 Domain, Codomain and Range",
        "page": "p. 111",
        "theory": "In a mapping diagram, the set on the left is the domain and the set on the right is the codomain. Arrows show the images. The range consists only of the codomain elements reached by arrows.",
        "rules": [
          "For f:A→B, Dom(f)=A and Ran(f)⊆B.",
          "The codomain is B even when some of its elements are not reached."
        ],
        "diagram": {
          "type": "mapping",
          "domain": [
            "1",
            "2",
            "3"
          ],
          "codomain": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
          "pairs": [
            [
              "1",
              "2"
            ],
            [
              "2",
              "4"
            ],
            [
              "3",
              "6"
            ]
          ],
          "title": "Domain, codomain and range"
        }
      },
      {
        "id": "5.3.2",
        "title": "5.3.2 Kinds of Functions",
        "page": "pp. 112–114",
        "theory": "The book distinguishes into mappings, one-one functions, one-one into functions, onto functions, bijections, one-one correspondence, and many-one mappings using arrow diagrams. An into mapping leaves an element of the codomain unused. A one-one mapping gives different images to different domain elements. A one-one correspondence is both one-one and onto.",
        "rules": [
          "Into: at least one codomain element is not in the range.",
          "One-one: different inputs have different images.",
          "Onto: range equals codomain.",
          "One-one correspondence (bijection): one-one and onto."
        ],
        "diagram": {
          "type": "mapping-gallery",
          "domain": [
            "1",
            "2",
            "3"
          ],
          "codomain": [
            "a",
            "b",
            "c",
            "d"
          ],
          "maps": [
            {
              "label": "many-one into",
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "a"
                ],
                [
                  "3",
                  "b"
                ]
              ]
            },
            {
              "label": "one-one into",
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "b"
                ],
                [
                  "3",
                  "c"
                ]
              ]
            },
            {
              "label": "one-one correspondence",
              "domain": [
                "3",
                "4",
                "5"
              ],
              "codomain": [
                "d",
                "e",
                "h"
              ],
              "pairs": [
                [
                  "3",
                  "d"
                ],
                [
                  "4",
                  "e"
                ],
                [
                  "5",
                  "h"
                ]
              ]
            },
            {
              "label": "onto (each codomain member reached)",
              "domain": [
                "1",
                "2",
                "3",
                "4"
              ],
              "codomain": [
                "a",
                "b",
                "c"
              ],
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "b"
                ],
                [
                  "3",
                  "c"
                ],
                [
                  "4",
                  "c"
                ]
              ]
            }
          ],
          "title": "Types of mapping shown in the textbook"
        }
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "title": "Example 1 (p. 86) — Union of two sets",
        "page": 86,
        "problem": "If A={1,2,3} and B={3,4,5,6}, find A∪B.",
        "steps": [
          "Write the elements in A and in B once each.",
          "A∪B={1,2,3}∪{3,4,5,6}."
        ],
        "answer": "A∪B={1,2,3,4,5,6}.",
        "method": "Union"
      },
      {
        "id": "eg2",
        "title": "Example 2 (p. 86) — Intersection and disjoint sets",
        "page": 86,
        "problem": "Let A={1,2,3,4,5}, B={3,4,5,6,7}, C={5,11,12}, and D={8,9,10}. Find A∩B, B∩C and A∩D; identify the disjoint pair.",
        "steps": [
          "The common elements of A and B are 3, 4 and 5.",
          "The common element of B and C is 5.",
          "A and D have no common element."
        ],
        "answer": "A∩B={3,4,5}; B∩C={5}; A∩D=∅. A and D are disjoint.",
        "method": "Intersection"
      },
      {
        "id": "eg3",
        "title": "Example 3 (p. 86) — Difference of two sets",
        "page": 86,
        "problem": "If A={5,6,7,8} and B={7,8,9,10}, find A\\B and B\\A.",
        "steps": [
          "Remove from A the elements that also belong to B.",
          "Remove from B the elements that also belong to A."
        ],
        "answer": "A\\B={5,6}; B\\A={9,10}.",
        "method": "Difference"
      },
      {
        "id": "eg4",
        "title": "Example 4 (p. 87) — Complement of a set",
        "page": 87,
        "problem": "If U={1,2,3,4,5,6}, A={3,4,5} and B=∅, find A′ and B′.",
        "steps": [
          "A′=U\\A={1,2,6}.",
          "B′=U\\∅=U."
        ],
        "answer": "A′={1,2,6}; B′={1,2,3,4,5,6}.",
        "method": "Complement"
      },
      {
        "id": "eg5",
        "title": "Example 5 (p. 91) — Commutative property of union",
        "page": 91,
        "problem": "Verify A∪B=B∪A for A={1,2,3} and B={4,5,6}.",
        "steps": [
          "A∪B={1,2,3,4,5,6}.",
          "B∪A={4,5,6,1,2,3}={1,2,3,4,5,6}."
        ],
        "answer": "A∪B=B∪A={1,2,3,4,5,6}.",
        "method": ""
      },
      {
        "id": "eg6",
        "title": "Example 6 (p. 91) — Commutative property of intersection",
        "page": 91,
        "problem": "Verify A∩B=B∩A for A={a,b,c} and B={b,c,d,e}.",
        "steps": [
          "The common elements are b and c in either order."
        ],
        "answer": "A∩B=B∩A={b,c}.",
        "method": ""
      },
      {
        "id": "eg7",
        "title": "Example 7 (p. 92) — Associative property of union",
        "page": 92,
        "problem": "Verify A∪(B∪C)=(A∪B)∪C for A={3,4,5}, B={5,6,7}, C={8,9,10}.",
        "steps": [
          "B∪C={5,6,7,8,9,10}; adjoining A gives {3,4,5,6,7,8,9,10}.",
          "A∪B={3,4,5,6,7}; adjoining C gives the same set."
        ],
        "answer": "Both sides equal {3,4,5,6,7,8,9,10}.",
        "method": ""
      },
      {
        "id": "eg8",
        "title": "Example 8 (p. 92) — Associative property of intersection",
        "page": 92,
        "problem": "Verify A∩(B∩C)=(A∩B)∩C for A={1,2,3}, B={2,3,4}, C={3,4,5}.",
        "steps": [
          "B∩C={3,4}, so A∩(B∩C)={3}.",
          "A∩B={2,3}, so (A∩B)∩C={3}."
        ],
        "answer": "Both sides equal {3}.",
        "method": ""
      },
      {
        "id": "eg9",
        "title": "Example 9 (p. 93) — Union distributes over intersection",
        "page": 93,
        "problem": "Verify A∪(B∩C)=(A∪B)∩(A∪C) for A={1,2,3,4}, B={5,6,7}, C={7,8,9}.",
        "steps": [
          "B∩C={7}; the left side is {1,2,3,4,7}.",
          "A∪B={1,2,3,4,5,6,7}; A∪C={1,2,3,4,7,8,9}.",
          "The intersection of those unions is {1,2,3,4,7}."
        ],
        "answer": "Both sides equal {1,2,3,4,7}.",
        "method": ""
      },
      {
        "id": "eg10",
        "title": "Example 10 (p. 93) — Intersection distributes over union",
        "page": 93,
        "problem": "Verify A∩(B∪C)=(A∩B)∪(A∩C) for A={a,b,c}, B={c,d,e}, C={e,f,g}.",
        "steps": [
          "B∪C={c,d,e,f,g}, so A∩(B∪C)={c}.",
          "A∩B={c} and A∩C=∅; their union is {c}."
        ],
        "answer": "Both sides equal {c}.",
        "method": ""
      },
      {
        "id": "eg11",
        "title": "Example 11 (p. 94) — De Morgan’s laws",
        "page": 94,
        "problem": "Let U={1,2,3,4,5,6}, A={2,3}, B={3,4,5}. Verify both De Morgan laws.",
        "steps": [
          "A∪B={2,3,4,5}, so (A∪B)′={1,6}. Also A′={1,4,5,6}, B′={1,2,6}, and A′∩B′={1,6}.",
          "A∩B={3}, so (A∩B)′={1,2,4,5,6}. A′∪B′={1,2,4,5,6}."
        ],
        "answer": "(A∪B)′=A′∩B′={1,6}; (A∩B)′=A′∪B′={1,2,4,5,6}.",
        "method": "Complements relative to U"
      },
      {
        "id": "eg12",
        "title": "Example 12 (p. 96) — Venn diagrams for two sets",
        "page": 96,
        "problem": "Draw A∪B, A∩B, A\\B and B\\A for overlapping sets, disjoint sets, and the case A⊆B.",
        "steps": [
          "Place the universal set in a rectangle and A, B in closed curves.",
          "Shade the union, common region, and each one-sided difference in turn.",
          "For disjoint sets the intersection is empty; for A⊆B, A\\B is empty."
        ],
        "answer": "The diagrams show the requested regions for all three arrangements.",
        "method": "Venn diagrams",
        "diagram": {
          "type": "venn-gallery",
          "items": [
            {
              "sets": {
                "A": [
                  "a",
                  "b"
                ],
                "B": [
                  "b",
                  "c"
                ]
              },
              "op": "union",
              "label": "overlap: A∪B"
            },
            {
              "sets": {
                "A": [
                  "a",
                  "b"
                ],
                "B": [
                  "b",
                  "c"
                ]
              },
              "op": "intersection",
              "label": "overlap: A∩B"
            },
            {
              "sets": {
                "A": [
                  "a"
                ],
                "B": [
                  "b"
                ]
              },
              "op": "intersection",
              "label": "disjoint: A∩B=∅"
            },
            {
              "sets": {
                "A": [
                  "a"
                ],
                "B": [
                  "a",
                  "b"
                ]
              },
              "op": "differenceA",
              "label": "A⊆B: A\\B=∅"
            }
          ],
          "title": "Two-set operations and special cases"
        }
      },
      {
        "id": "eg13",
        "title": "Example 13 (p. 98) — Three-set Venn diagrams",
        "page": 98,
        "problem": "Use Venn diagrams for A∪(B∪C), (A∩B)∩C, A∪(B∩C), and A∩(B∪C).",
        "steps": [
          "Draw three overlapping circles inside a rectangle.",
          "Shade the union of all three sets.",
          "Shade the triple intersection.",
          "Shade the regions for each distributive expression."
        ],
        "answer": "The four diagrams show the union, triple intersection, and both distributive regions.",
        "method": "Three-set Venn diagrams",
        "diagram": {
          "type": "venn-gallery",
          "items": [
            {
              "sets": {
                "A": [
                  "a",
                  "ab",
                  "ac",
                  "abc"
                ],
                "B": [
                  "b",
                  "ab",
                  "bc",
                  "abc"
                ],
                "C": [
                  "c",
                  "ac",
                  "bc",
                  "abc"
                ]
              },
              "op": "union",
              "label": "A∪(B∪C)"
            },
            {
              "sets": {
                "A": [
                  "a",
                  "ab",
                  "ac",
                  "abc"
                ],
                "B": [
                  "b",
                  "ab",
                  "bc",
                  "abc"
                ],
                "C": [
                  "c",
                  "ac",
                  "bc",
                  "abc"
                ]
              },
              "op": "intersection3",
              "label": "(A∩B)∩C"
            },
            {
              "sets": {
                "A": [
                  "a",
                  "ab",
                  "ac",
                  "abc"
                ],
                "B": [
                  "b",
                  "ab",
                  "bc",
                  "abc"
                ],
                "C": [
                  "c",
                  "ac",
                  "bc",
                  "abc"
                ]
              },
              "op": "AunionBC",
              "label": "A∪(B∩C)"
            },
            {
              "sets": {
                "A": [
                  "a",
                  "ab",
                  "ac",
                  "abc"
                ],
                "B": [
                  "b",
                  "ab",
                  "bc",
                  "abc"
                ],
                "C": [
                  "c",
                  "ac",
                  "bc",
                  "abc"
                ]
              },
              "op": "AinterBC",
              "label": "A∩(B∪C)"
            }
          ],
          "title": "Three-set operations"
        }
      },
      {
        "id": "eg14",
        "title": "Example 14 (p. 101) — Properties verified with Venn diagrams",
        "page": 101,
        "problem": "For A={1,2,3,4}, B={3,4,5,6}, C={3,4,7,8}, verify by Venn diagrams the commutative, associative and distributive properties.",
        "steps": [
          "Place 1,2 in A only; 3,4 in A∩B∩C; 5,6 in B only; 7,8 in C only.",
          "Shade the left and right sides of each printed identity. The corresponding shaded regions agree."
        ],
        "answer": "All six properties shown in the example are verified. The two distributive identities are A∪(B∩C)=(A∪B)∩(A∪C) and A∩(B∪C)=(A∩B)∪(A∩C).",
        "method": "Three-set Venn diagrams",
        "diagram": {
          "type": "venn-gallery",
          "items": [
            {
              "sets": {
                "A": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "B": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "C": [
                  "3",
                  "4",
                  "7",
                  "8"
                ]
              },
              "op": "union",
              "label": "A∪B = B∪A"
            },
            {
              "sets": {
                "A": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "B": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "C": [
                  "3",
                  "4",
                  "7",
                  "8"
                ]
              },
              "op": "intersection",
              "label": "A∩B = B∩A"
            },
            {
              "sets": {
                "A": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "B": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "C": [
                  "3",
                  "4",
                  "7",
                  "8"
                ]
              },
              "op": "union",
              "label": "A∪(B∪C)"
            },
            {
              "sets": {
                "A": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "B": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "C": [
                  "3",
                  "4",
                  "7",
                  "8"
                ]
              },
              "op": "intersection3",
              "label": "A∩(B∩C)"
            },
            {
              "sets": {
                "A": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "B": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "C": [
                  "3",
                  "4",
                  "7",
                  "8"
                ]
              },
              "op": "AunionBC",
              "label": "A∪(B∩C)"
            },
            {
              "sets": {
                "A": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "B": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "C": [
                  "3",
                  "4",
                  "7",
                  "8"
                ]
              },
              "op": "AinterBC",
              "label": "A∩(B∪C)"
            }
          ],
          "title": "Venn verification of set identities"
        }
      },
      {
        "id": "eg15",
        "title": "Example 15 (p. 104) — De Morgan’s laws by Venn diagrams",
        "page": 104,
        "problem": "For U={1,2,3,4,5,6,7}, A={2,5,6}, B={1,2,3}, draw A′, B′, A′∪B′, A′∩B′ and the complements needed to verify De Morgan’s laws.",
        "steps": [
          "A′={1,3,4,7}; B′={4,5,6,7}.",
          "(A∪B)′={4,7}=A′∩B′.",
          "(A∩B)′={1,3,4,5,6,7}=A′∪B′."
        ],
        "answer": "(A∪B)′=A′∩B′={4,7}; (A∩B)′=A′∪B′={1,3,4,5,6,7}.",
        "method": "Venn diagrams",
        "diagram": {
          "type": "venn-gallery",
          "items": [
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "complementA",
              "label": "A′"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "complementB",
              "label": "B′"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "demorganUnion",
              "label": "(A∪B)′ = A′∩B′"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "complementA",
              "label": "A′ (individual region)"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "complementB",
              "label": "B′ (individual region)"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "demorganIntersection",
              "label": "(A∩B)′ = A′∪B′"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "union",
              "label": "A∪B"
            },
            {
              "sets": {
                "A": [
                  "2",
                  "5",
                  "6"
                ],
                "B": [
                  "1",
                  "2",
                  "3"
                ]
              },
              "op": "intersection",
              "label": "A∩B"
            }
          ],
          "title": "Eight complement and De Morgan diagrams"
        }
      },
      {
        "id": "eg16",
        "title": "Example 16 (p. 106) — Equality of ordered pairs",
        "page": 106,
        "problem": "If (2x, x+y)=(6,2), find x and y.",
        "steps": [
          "Equal ordered pairs have equal corresponding coordinates.",
          "2x=6 gives x=3.",
          "x+y=2; substitute x=3 to obtain y=−1."
        ],
        "answer": "x=3, y=−1.",
        "method": "Coordinate equality"
      },
      {
        "id": "eg17",
        "title": "Example 17 (p. 107) — Cartesian product and number of relations",
        "page": 107,
        "problem": "Let A={a,b} and B={1,2}. Write A×B and determine the number of binary relations from A to B.",
        "steps": [
          "A×B={(a,1),(a,2),(b,1),(b,2)}.",
          "A relation is any subset of A×B, which has four elements.",
          "The number of subsets is 2⁴."
        ],
        "answer": "There are 16 binary relations from A to B.",
        "method": "Cartesian product",
        "diagram": {
          "type": "product",
          "A": [
            "a",
            "b"
          ],
          "B": [
            "1",
            "2"
          ],
          "title": "A×B"
        }
      },
      {
        "id": "eg18",
        "title": "Example 18 (p. 108) — Relations from one set to another",
        "page": 108,
        "problem": "Let A={1,2} and B={1,2,3}. Write five different binary relations from A to B.",
        "steps": [
          "Each relation is a subset of A×B.",
          "For example, select the following distinct subsets."
        ],
        "answer": "R₁=∅; R₂={(1,1)}; R₃={(1,2),(2,3)}; R₄={(1,1),(1,2),(2,1)}; R₅=A×B.",
        "method": "Subsets of A×B",
        "diagram": {
          "type": "product",
          "A": [
            "1",
            "2"
          ],
          "B": [
            "1",
            "2",
            "3"
          ],
          "title": "A×B; sample relations are subsets of these six pairs"
        }
      },
      {
        "id": "eg19",
        "title": "Example 19 (p. 108) — Relation, domain and range",
        "page": 108,
        "problem": "From A={1,2} to B={1,2,3}, let R be defined by aRb when a<b. Find R, its domain and range; decide whether 1R3 and 2R2.",
        "steps": [
          "Test the inequality for each pair in A×B.",
          "The pairs satisfying a<b are (1,2), (1,3), (2,3).",
          "Collect their first and second coordinates."
        ],
        "answer": "R={(1,2),(1,3),(2,3)}; Dom(R)={1,2}; Ran(R)={2,3}; 1R3 is true; 2R2 is false.",
        "method": "Relation by a condition",
        "diagram": {
          "type": "mapping",
          "domain": [
            "1",
            "2"
          ],
          "codomain": [
            "1",
            "2",
            "3"
          ],
          "pairs": [
            [
              "1",
              "2"
            ],
            [
              "1",
              "3"
            ],
            [
              "2",
              "3"
            ]
          ],
          "title": "Relation a<b"
        }
      },
      {
        "id": "eg20",
        "title": "Example 20 (p. 110) — Which relations are functions?",
        "page": 110,
        "problem": "Let A={1,2,3} and B={a,b,c,d}. Decide which relations are functions: f₁={(1,a),(2,b)}, f₂={(1,a),(2,b),(3,c),(3,d)}, f₃={(1,a),(2,b),(3,c)}, f₄={(1,a),(2,a),(3,d)}.",
        "steps": [
          "f₁ is missing the input 3.",
          "f₂ assigns two images to input 3.",
          "f₃ and f₄ assign exactly one image to every element of A."
        ],
        "answer": "f₁ and f₂ are not functions. f₃ and f₄ are functions from A to B.",
        "method": "Function definition",
        "diagram": {
          "type": "mapping-gallery",
          "domain": [
            "1",
            "2",
            "3"
          ],
          "codomain": [
            "a",
            "b",
            "c",
            "d"
          ],
          "maps": [
            {
              "label": "f₁: incomplete",
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "b"
                ]
              ]
            },
            {
              "label": "f₂: input 3 repeated",
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "b"
                ],
                [
                  "3",
                  "c"
                ],
                [
                  "3",
                  "d"
                ]
              ]
            },
            {
              "label": "f₃: function",
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "b"
                ],
                [
                  "3",
                  "c"
                ]
              ]
            },
            {
              "label": "f₄: function",
              "pairs": [
                [
                  "1",
                  "a"
                ],
                [
                  "2",
                  "a"
                ],
                [
                  "3",
                  "d"
                ]
              ]
            }
          ]
        }
      }
    ],
    "exercises": [
      {
        "exercise": "5.1",
        "title": "Exercise 5.1",
        "page": 87,
        "problems": [
          {
            "num": "Q1",
            "question": "If A={1,2,3}, B={0,1} and C={1,3,4}, find (i) A∪B, (ii) A∩B, (iii) A∪C, (iv) A∩C, (v) B∪C, (vi) A∩A.",
            "finalAnswer": "(i) {0,1,2,3}; (ii) {1}; (iii) {1,2,3,4}; (iv) {1,3}; (v) {0,1,3,4}; (vi) {1,2,3}.",
            "solution": "Apply union and intersection to each pair; the repeated members of A∩A remain a single set element."
          },
          {
            "num": "Q2",
            "question": "Find A\\B and B\\A for (i) A={1,3,5,7}, B={3,4,5,6,7,8}; (ii) A={0,±1,±2,±3}, B={−1,−2,−3}; (iii) A={1,2,3,…}, B={1,3,5,7,…}.",
            "finalAnswer": "(i) A\\B={1}; B\\A={4,6,8}. (ii) A\\B={0,1,2,3}; B\\A=∅. (iii) A\\B={2,4,6,8,…}; B\\A=∅.",
            "solution": "For A\\B keep the elements of A that do not occur in B; reverse the roles for B\\A."
          },
          {
            "num": "Q3",
            "question": "If U={1,2,…,20}, A={2,4,…,20}, B={1,3,…,19}, C=∅, find (i) A′, (ii) B′, (iii) C′, (iv) A′∪B′, (v) A′∩B′, (vi) A′∩B, (vii) A′∪C′, (viii) A∩C′, (ix) C′∩C, (x) B′∪C′.",
            "finalAnswer": "(i) B; (ii) A; (iii) U; (iv) U; (v) ∅; (vi) B; (vii) U; (viii) A; (ix) ∅; (x) U.",
            "solution": "A′=B, B′=A, and C′=U in this universal set."
          },
          {
            "num": "Q4",
            "question": "Let U be the natural numbers up to 15, A the even numbers up to 15, and B the odd numbers up to 15. Find (i) A′∪B′, (ii) A′∩B′, (iii) U′, (iv) ∅′, (v) B∩A′, (vi) B∪B′, (vii) A∩A′, (viii) A∪B′.",
            "finalAnswer": "(i) U; (ii) ∅; (iii) ∅; (iv) U; (v) B; (vi) U; (vii) ∅; (viii) A.",
            "solution": "Here A and B partition U, so A′=B and B′=A."
          }
        ]
      },
      {
        "exercise": "5.2",
        "title": "Exercise 5.2",
        "page": 95,
        "problems": [
          {
            "num": "Q1",
            "question": "Verify the commutative properties for (i) A={1,2,…,12}, B={2,4,5,8,10,12}; (ii) A=N, B=the even natural numbers; (iii) A=the first ten primes, B=the first ten composite numbers.",
            "finalAnswer": "In each case A∪B=B∪A and A∩B=B∩A. (i) Union={1,…,12}, intersection={2,4,5,8,10,12}. (ii) Union=N, intersection=B. (iii) Union={2,…,19,23,29}, intersection=∅.",
            "solution": "For each pair, find the union and intersection in either order. A union or intersection does not depend on the order of its sets."
          },
          {
            "num": "Q2",
            "question": "Verify associativity for (i) A={a,…,z}, B={a,e,i,o,u}, C={a,d,i,l,m,n,o}; (ii) A={1,…,100}, B={2,4,…,100}, C={1,3,…,99}.",
            "finalAnswer": "(i) A∪(B∪C)=(A∪B)∪C=A; A∩(B∩C)=(A∩B)∩C={a,i,o}. (ii) Both unions equal A; both intersections equal ∅.",
            "solution": "Evaluate the bracketed operation first on both sides."
          },
          {
            "num": "Q3",
            "question": "Verify both distributive properties for (i) A={0,1,2}, B={0}, C=∅; (ii) A={0,±1,±2,±3,±4,±5}, B={−1,−2,−3,−4,−5}, C={−1,−2,3,4}.",
            "finalAnswer": "(i) A∪(B∩C)=(A∪B)∩(A∪C)=A; A∩(B∪C)=(A∩B)∪(A∩C)={0}. (ii) For union over intersection both sides equal A; for intersection over union both sides equal {−1,−2,−3,−4,−5,3,4}.",
            "solution": "Evaluate each side with the displayed sets and compare."
          },
          {
            "num": "Q4",
            "question": "Verify De Morgan’s laws for (i) U={1,…,20}, A={2,3,5,7,11,12,13,17}, B={1,4,6,8,10,14,17,18}; (ii) U={1,…,10}, A={2,4,6,8,10}, B={1,3,5,7,9}.",
            "finalAnswer": "(i) (A∪B)′=A′∩B′={9,15,16,19,20}; (A∩B)′=A′∪B′=U\\{17}. (ii) (A∪B)′=A′∩B′=∅; (A∩B)′=A′∪B′=U.",
            "solution": "Find both complements relative to the stated U, then compare the sides."
          }
        ]
      },
      {
        "exercise": "5.3",
        "title": "Exercise 5.3",
        "page": 106,
        "problems": [
          {
            "num": "Q1",
            "question": "Let A={1,2,3,4,5}, B={2,3,6,7}. Draw Venn diagrams for A∪B and A∩B.",
            "finalAnswer": "A∪B={1,2,3,4,5,6,7}; A∩B={2,3}.",
            "solution": "A-only={1,4,5}; common={2,3}; B-only={6,7}.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "1",
                      "4",
                      "5",
                      "2",
                      "3"
                    ],
                    "B": [
                      "2",
                      "3",
                      "6",
                      "7"
                    ]
                  },
                  "op": "union",
                  "label": "A∪B"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "4",
                      "5",
                      "2",
                      "3"
                    ],
                    "B": [
                      "2",
                      "3",
                      "6",
                      "7"
                    ]
                  },
                  "op": "intersection",
                  "label": "A∩B"
                }
              ],
              "title": ""
            }
          },
          {
            "num": "Q2",
            "question": "For A={1,2,3,4,5,6}, B={3,4,5,6,7,8}, C={5,6,9,10}, verify with Venn diagrams (i) A∪(B∪C)=(A∪B)∪C; (ii) A∩(B∩C)=(A∩B)∩C; (iii) A∪(B∩C)=(A∪B)∩(A∪C); (iv) A∩(B∪C)=(A∩B)∪(A∩C).",
            "finalAnswer": "(i) both={1,2,3,4,5,6,7,8,9,10}; (ii) both={5,6}; (iii) both={1,2,3,4,5,6}; (iv) both={3,4,5,6}.",
            "solution": "Place each element in its Venn region and compare the shaded portions.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8"
                    ],
                    "C": [
                      "5",
                      "6",
                      "9",
                      "10"
                    ]
                  },
                  "op": "union",
                  "label": "(i) associative union"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8"
                    ],
                    "C": [
                      "5",
                      "6",
                      "9",
                      "10"
                    ]
                  },
                  "op": "intersection3",
                  "label": "(ii) associative intersection"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8"
                    ],
                    "C": [
                      "5",
                      "6",
                      "9",
                      "10"
                    ]
                  },
                  "op": "AunionBC",
                  "label": "(iii) union over intersection"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8"
                    ],
                    "C": [
                      "5",
                      "6",
                      "9",
                      "10"
                    ]
                  },
                  "op": "AinterBC",
                  "label": "(iv) intersection over union"
                }
              ],
              "title": ""
            }
          },
          {
            "num": "Q3",
            "question": "For U={1,…,7}, A={1,2,3,4}, B={3,4,5}, draw A′, B′, A′∪B′, A′∩B′ and verify both De Morgan laws.",
            "finalAnswer": "A′={5,6,7}; B′={1,2,6,7}; (A∪B)′=A′∩B′={6,7}; (A∩B)′=A′∪B′={1,2,5,6,7}.",
            "solution": "A-only={1,2}; common={3,4}; B-only={5}; outside={6,7}.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5"
                    ]
                  },
                  "op": "complementA",
                  "label": "A′"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5"
                    ]
                  },
                  "op": "complementB",
                  "label": "B′"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5"
                    ]
                  },
                  "op": "demorganUnion",
                  "label": "(A∪B)′=A′∩B′"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5"
                    ]
                  },
                  "op": "demorganIntersection",
                  "label": "(A∩B)′=A′∪B′"
                }
              ],
              "title": ""
            }
          },
          {
            "num": "Q4",
            "question": "For U={a,b,c,1,2,3,4}, A={c,3}, B={a,3,4}, draw A′, B′, A\\B and B\\A.",
            "finalAnswer": "A′={a,b,1,2,4}; B′={b,c,1,2}; A\\B={c}; B\\A={a,4}.",
            "solution": "The common region contains 3; outside both contains b,1,2.",
            "diagram": {
              "type": "venn-gallery",
              "title": "Complements and set differences",
              "items": [
                {
                  "universe": [
                    "a",
                    "b",
                    "c",
                    "1",
                    "2",
                    "3",
                    "4"
                  ],
                  "sets": {
                    "A": [
                      "c",
                      "3"
                    ],
                    "B": [
                      "a",
                      "3",
                      "4"
                    ]
                  },
                  "op": "complementA",
                  "label": "A′"
                },
                {
                  "universe": [
                    "a",
                    "b",
                    "c",
                    "1",
                    "2",
                    "3",
                    "4"
                  ],
                  "sets": {
                    "A": [
                      "c",
                      "3"
                    ],
                    "B": [
                      "a",
                      "3",
                      "4"
                    ]
                  },
                  "op": "complementB",
                  "label": "B′"
                },
                {
                  "universe": [
                    "a",
                    "b",
                    "c",
                    "1",
                    "2",
                    "3",
                    "4"
                  ],
                  "sets": {
                    "A": [
                      "c",
                      "3"
                    ],
                    "B": [
                      "a",
                      "3",
                      "4"
                    ]
                  },
                  "op": "differenceA",
                  "label": "A\\B"
                },
                {
                  "universe": [
                    "a",
                    "b",
                    "c",
                    "1",
                    "2",
                    "3",
                    "4"
                  ],
                  "sets": {
                    "A": [
                      "c",
                      "3"
                    ],
                    "B": [
                      "a",
                      "3",
                      "4"
                    ]
                  },
                  "op": "differenceB",
                  "label": "B\\A"
                }
              ]
            }
          },
          {
            "num": "Q5",
            "question": "For U={a,b,c,d,e,f,g}, A={a,b,c}, B={c,d,e}, verify both De Morgan laws using Venn diagrams.",
            "finalAnswer": "(A∪B)′=A′∩B′={f,g}; (A∩B)′=A′∪B′={a,b,d,e,f,g}.",
            "solution": "A′={d,e,f,g}; B′={a,b,f,g}; A∪B={a,b,c,d,e}; A∩B={c}.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "a",
                      "b",
                      "c"
                    ],
                    "B": [
                      "c",
                      "d",
                      "e"
                    ]
                  },
                  "op": "demorganUnion",
                  "label": "(A∪B)′=A′∩B′"
                },
                {
                  "sets": {
                    "A": [
                      "a",
                      "b",
                      "c"
                    ],
                    "B": [
                      "c",
                      "d",
                      "e"
                    ]
                  },
                  "op": "demorganIntersection",
                  "label": "(A∩B)′=A′∪B′"
                }
              ],
              "title": ""
            }
          }
        ]
      },
      {
        "exercise": "5.4",
        "title": "Exercise 5.4",
        "page": 109,
        "problems": [
          {
            "num": "Q1",
            "question": "If A={1,2,3} and B={4,5}, write (i) three relations from A to B, (ii) four relations from B to A, (iii) four relations on A, and (iv) two relations on B.",
            "finalAnswer": "Examples: (i) ∅, {(1,4)}, {(1,4),(2,5)}. (ii) ∅, {(4,1)}, {(4,1),(5,2)}, B×A. (iii) ∅, {(1,1)}, {(1,2),(2,1)}, {(1,1),(2,2),(3,3)}. (iv) ∅, {(4,5)}.",
            "solution": "A relation is any subset of the corresponding Cartesian product."
          },
          {
            "num": "Q2",
            "question": "Let A={1,2,3,4}, B={1,3,5}, R={(x,y)|y<x} from A to B. Find R.",
            "finalAnswer": "R={(2,1),(3,1),(4,1),(4,3)}.",
            "solution": "Test each ordered pair in A×B against y<x."
          },
          {
            "num": "Q3",
            "question": "Find the range of R={(x,y)|y=2x} when the domain is {0,4,8}.",
            "finalAnswer": "Range={0,8,16}.",
            "solution": "Substitute each domain value into y=2x."
          },
          {
            "num": "Q4",
            "question": "The relation R={(x,y)|y+1=2x²} has domain N. Find its range.",
            "finalAnswer": "{1,7,17,31,49,…}.",
            "solution": "Set y=2x²−1 for x=1,2,3,…; the book uses positive natural numbers."
          }
        ]
      },
      {
        "exercise": "5.5",
        "title": "Exercise 5.5",
        "page": 115,
        "problems": [
          {
            "num": "Q1",
            "question": "Let A={1,2,3,4}, B={6,7}. Classify R₁={(1,6),(2,7),(3,6)}, R₂={(1,6),(2,6),(3,7),(4,7)}, R₃={(1,6),(2,6),(3,6),(4,6)} as functions and state whether each is one-one or onto.",
            "finalAnswer": "R₁ is not a function (4 has no image). R₂ is an onto many-one function, not one-one. R₃ is many-one into, not onto.",
            "solution": "A function must assign exactly one image to each member of A; onto means its range is all of B."
          },
          {
            "num": "Q2",
            "question": "For the relations on {a,b,c,d}, state which are functions and classify them: (i) {(a,b),(c,d),(b,d),(d,b)}; (ii) {(b,a),(c,b),(a,b),(d,d)}; (iii) {(d,c),(c,b),(a,b),(d,d)}; (iv) {(a,b),(b,c),(c,b),(d,a)}.",
            "finalAnswer": "(i) function, many-one into; (ii) function, many-one into; (iii) not a function because d has two images; (iv) function, many-one onto.",
            "solution": "Check first coordinates for function status; then compare distinct outputs and range with the codomain."
          },
          {
            "num": "Q3",
            "question": "A={0,1,2,3}, B={x,y,z,p}. Decide whether each relation is a one-one correspondence: (i) {(0,x),(2,z),(3,y),(1,p)}; (ii) {(0,x),(1,z),(2,y),(3,z)}.",
            "finalAnswer": "(i) Yes. (ii) No: z is repeated and p is not reached.",
            "solution": "A one-one correspondence uses every domain element exactly once and reaches each codomain element exactly once."
          },
          {
            "num": "Q4",
            "question": "A={a,b,c}, B={2,3,4,5}. Classify (i) {(a,2),(b,3),(c,4)} and (ii) {(a,3),(b,4),(c,3)}.",
            "finalAnswer": "(i) one-one into; (ii) many-one into. Neither is a one-one correspondence because the codomain has four elements and the domain has three.",
            "solution": "Compare each range with B and check for repeated images."
          },
          {
            "num": "Q5",
            "question": "For X={1,2,3,4} and Y={5,6,7,8}, give examples of (i) a function X→Y, (ii) a one-one function X→Y, (iii) a one-one correspondence X→Y, (iv) an onto function Y→X, (v) a bijection Y→X, (vi) a function X→Y that is neither one-one nor onto.",
            "finalAnswer": "(i) {(1,5),(2,5),(3,5),(4,5)}. (ii),(iii) {(1,5),(2,6),(3,7),(4,8)}. (iv),(v) {(5,1),(6,2),(7,3),(8,4)}. (vi) {(1,5),(2,5),(3,6),(4,6)}.",
            "solution": "Each listed relation includes every domain element once; repeated or unused images give the requested types."
          },
          {
            "num": "Q6",
            "question": "For A={1,2,3,4,5}, classify each relation as a function, give its range, and decide whether it is onto: (i) {(1,5),(2,3),(3,3),(4,2),(5,1)}; (ii) {(1,1),(2,4),(3,2),(4,1),(5,3)}; (iii) {(1,2),(2,1),(3,1),(4,4),(5,5)}.",
            "finalAnswer": "All three are functions. (i) range={1,2,3,5}, not onto. (ii) range={1,2,3,4}, not onto. (iii) range={1,2,4,5}, not onto.",
            "solution": "Each first coordinate occurs exactly once; compare the distinct second coordinates with A. None reaches every member of A."
          }
        ]
      },
      {
        "exercise": "Review Exercise 5",
        "title": "Review Exercise 5",
        "page": 116,
        "problems": [
          {
            "num": "Q1(i)",
            "question": "A={1,2,3}, B={4,5}, R={(1,4),(2,5),(3,4)}. Choose the correct description.",
            "finalAnswer": "Onto function A→B; not one-one.",
            "solution": "Every member of A is used and both members of B are reached."
          },
          {
            "num": "Q1(ii)",
            "question": "If n(A)=2 and n(B)=3, how many binary relations are there from A to B?",
            "finalAnswer": "2⁶=64.",
            "solution": "A×B has 2·3=6 elements, and each relation is a subset."
          },
          {
            "num": "Q1(iii)",
            "question": "Which pair of sets is disjoint? (a) {0,1,2,3},{3,2,1,0}; (b) {0,3,6,9},{9,16,25,36}; (c) {0,2,4,6},{2,4,6,8}; (d) {0,4,8,12},{6,10,14,18}.",
            "finalAnswer": "(d).",
            "solution": "Only the sets in (d) have no common element."
          },
          {
            "num": "Q1(iv)",
            "question": "U is the positive odd integers less than 30, R={1,5,7}, S={1,3,7,11,13}. Find n((R∩S)′).",
            "finalAnswer": "13.",
            "solution": "U has 15 elements; R∩S={1,7}, so its complement in U has 15−2=13 elements."
          },
          {
            "num": "Q1(v)",
            "question": "For f:A→B, what condition makes f onto?",
            "finalAnswer": "Ran(f)=B.",
            "solution": "Every codomain element must be the image of at least one domain element."
          },
          {
            "num": "Q1(vi)",
            "question": "Find Dom(R) for R={(0,0),(8,2),(10,3),(14,12)}.",
            "finalAnswer": "{0,8,10,14}.",
            "solution": "The domain consists of first coordinates."
          },
          {
            "num": "Q2",
            "question": "Let U={1,…,100}, A={2,4,…,100}, B={1,3,…,99}. Find A′∪B′, A′∩B′, A∩B′ and A′∩B.",
            "finalAnswer": "U; ∅; A; B.",
            "solution": "Because A and B are complementary subsets of U, A′=B and B′=A."
          },
          {
            "num": "Q3",
            "question": "For A={1,2,3,5,7}, B={2,4,6}, C={2,5,9}, verify (i) associative union, (ii) associative intersection, (iii) union over intersection, and (iv) the item printed as “distributive property of union over union.”",
            "finalAnswer": "(i) both sides={1,2,3,4,5,6,7,9}; (ii) both sides={2}; (iii) both sides={1,2,3,5,7}; (iv) the printed wording is ambiguous; for the standard intersection-over-union law, both sides={2,5}.",
            "solution": "For (iv), the scan says “union over union.” This appears to be a printing error; the standard companion law is A∩(B∪C)=(A∩B)∪(A∩C)."
          },
          {
            "num": "Q4",
            "question": "Verify De Morgan’s laws for U={1,…,40}, A={1,6,11,16,21,26,31}, B={2,5,8,11,14,17,20,23,26,29,32}, using Venn diagrams.",
            "finalAnswer": "(A∪B)′=A′∩B′ and (A∩B)′=A′∪B′.",
            "solution": "Place each listed element in its region and compare the corresponding shaded areas.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "1",
                      "6",
                      "11",
                      "16",
                      "21",
                      "26",
                      "31"
                    ],
                    "B": [
                      "2",
                      "5",
                      "8",
                      "11",
                      "14",
                      "17",
                      "20",
                      "23",
                      "26",
                      "29",
                      "32"
                    ]
                  },
                  "universe": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40"
                  ],
                  "op": "demorganUnion",
                  "label": "(A∪B)′=A′∩B′"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "6",
                      "11",
                      "16",
                      "21",
                      "26",
                      "31"
                    ],
                    "B": [
                      "2",
                      "5",
                      "8",
                      "11",
                      "14",
                      "17",
                      "20",
                      "23",
                      "26",
                      "29",
                      "32"
                    ]
                  },
                  "universe": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40"
                  ],
                  "op": "demorganIntersection",
                  "label": "(A∩B)′=A′∪B′"
                }
              ],
              "title": ""
            }
          },
          {
            "num": "Q5",
            "question": "For U={1,2,3,5,6,7}, A={2,5,6}, B={1,2,3}, verify De Morgan’s laws with Venn diagrams.",
            "finalAnswer": "(A∪B)′={7}=A′∩B′; (A∩B)′={1,3,5,6,7}=A′∪B′.",
            "solution": "A′={1,3,7}; B′={5,6,7}; the complements on each side agree.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "2",
                      "5",
                      "6"
                    ],
                    "B": [
                      "1",
                      "2",
                      "3"
                    ]
                  },
                  "universe": [
                    "1",
                    "2",
                    "3",
                    "5",
                    "6",
                    "7"
                  ],
                  "op": "demorganUnion",
                  "label": "(A∪B)′=A′∩B′"
                },
                {
                  "sets": {
                    "A": [
                      "2",
                      "5",
                      "6"
                    ],
                    "B": [
                      "1",
                      "2",
                      "3"
                    ]
                  },
                  "universe": [
                    "1",
                    "2",
                    "3",
                    "5",
                    "6",
                    "7"
                  ],
                  "op": "demorganIntersection",
                  "label": "(A∩B)′=A′∪B′"
                }
              ],
              "title": ""
            }
          },
          {
            "num": "Q6",
            "question": "For U={1,…,10}, A={1,2,3,4}, B={3,4,5,6}, C={3,4,7,8}, verify both distributive laws with Venn diagrams.",
            "finalAnswer": "A∪(B∩C)=(A∪B)∩(A∪C)={1,2,3,4}; A∩(B∪C)=(A∩B)∪(A∩C)={3,4}.",
            "solution": "B∩C={3,4}; A∩B=A∩C={3,4}.",
            "diagram": {
              "type": "venn-gallery",
              "items": [
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5",
                      "6"
                    ],
                    "C": [
                      "3",
                      "4",
                      "7",
                      "8"
                    ]
                  },
                  "universe": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                  ],
                  "op": "AunionBC",
                  "label": "A∪(B∩C)"
                },
                {
                  "sets": {
                    "A": [
                      "1",
                      "2",
                      "3",
                      "4"
                    ],
                    "B": [
                      "3",
                      "4",
                      "5",
                      "6"
                    ],
                    "C": [
                      "3",
                      "4",
                      "7",
                      "8"
                    ]
                  },
                  "universe": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                  ],
                  "op": "AinterBC",
                  "label": "A∩(B∪C)"
                }
              ],
              "title": ""
            }
          },
          {
            "num": "Q7",
            "question": "For A={−2,−1,0,1,2}, B={a,b,c,d,e}, classify the relations: (i) {(-2,a),(-1,a),(0,b),(1,c),(2,d)}; (ii) {(-1,a),(1,e),(-2,d),(0,c),(2,b)}; (iii) {(2,d),(0,a),(-2,b),(-1,c),(1,e)}; (iv) {(-2,b),(-1,b),(0,a),(1,d),(-2,e)}.",
            "finalAnswer": "(i) function, many-one into; (ii) bijection; (iii) bijection; (iv) not a function (−2 has two images and 2 is missing).",
            "solution": "Check domain coverage, repeated images, and whether the range equals B."
          },
          {
            "num": "Q8",
            "question": "For A={1,2,3,4,5}, classify the relations: (i) {(1,5),(2,3),(3,3),(4,2),(5,1)}; (ii) {(1,1),(2,4),(3,2),(4,1),(5,3)}; (iii) {(1,2),(2,1),(3,1),(4,4),(5,5)}; (iv) {(1,2),(2,3),(1,4),(3,5)}. Give the range and state if any is onto.",
            "finalAnswer": "(i) function, range={1,2,3,5}, not onto; (ii) function, range={1,2,3,4}, not onto; (iii) function, range={1,2,4,5}, not onto; (iv) not a function because 1 has two images and the domain is incomplete.",
            "solution": "A function on A must use each member of A exactly once as a first coordinate."
          },
          {
            "num": "Q9",
            "question": "Let X={−6,−5,−4,−3}, Y={1,2,3,4}. Give examples of (i) a one-one function X→Y, (ii) an onto function X→Y, (iii) a bijection X→Y, (iv) a function X→Y that is neither one-one nor onto.",
            "finalAnswer": "(i) {(-6,1),(-5,2),(-4,3),(-3,4)}; (ii) {(-6,2),(-5,1),(-4,4),(-3,3)}; (iii) {(-6,4),(-5,3),(-4,2),(-3,1)}; (iv) {(-6,1),(-5,1),(-4,2),(-3,2)}.",
            "solution": "Since X and Y each have four elements, any onto function between them is also one-one."
          },
          {
            "num": "Project",
            "question": "The printed project asks whether switching the x- and y-values in a relation preserves function status. Give a function whose inverse relation is also a function.",
            "finalAnswer": "Any one-one correspondence works; for example {(-2,1),(-1,2),(0,3),(2,4)}.",
            "solution": "When the relation is reversed, distinct outputs become inputs. The reversed relation is a function exactly when the original relation is one-one."
          }
        ]
      }
    ],
    "slos": [
      "Define sets, subsets, universal set and the set operations used in the unit.",
      "Prove and verify the commutative, associative, distributive and De Morgan properties.",
      "Represent set operations and identities with Venn diagrams.",
      "Find Cartesian products and compare ordered pairs.",
      "Define binary relations and find their domains and ranges.",
      "Define functions and distinguish domain, codomain and range.",
      "Classify mappings as into, onto, one-one or one-one correspondence."
    ],
    "formulaSheet": [
      {
        "name": "Union and intersection",
        "formula": "A∪B={x | x∈A or x∈B}; A∩B={x | x∈A and x∈B}"
      },
      {
        "name": "Difference and complement",
        "formula": "A\\B={x∈A | x∉B}; A′=U\\A"
      },
      {
        "name": "Distributive laws",
        "formula": "A∪(B∩C)=(A∪B)∩(A∪C); A∩(B∪C)=(A∩B)∪(A∩C)"
      },
      {
        "name": "De Morgan’s laws",
        "formula": "(A∪B)′=A′∩B′; (A∩B)′=A′∪B′"
      },
      {
        "name": "Cartesian product",
        "formula": "A×B={(a,b) | a∈A,b∈B}; n(A×B)=n(A)n(B)"
      },
      {
        "name": "Number of relations",
        "formula": "2^(n(A)n(B))"
      },
      {
        "name": "Function types",
        "formula": "one-one: distinct inputs have distinct images; onto: Ran(f)=B; bijection: one-one and onto"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 6,
    "id": "u6",
    "title": "Basic Statistics",
    "titleUrdu": "بنیادی شماریات",
    "status": "ready",
    "badge": "Rebuilt from scanned textbook pages",
    "pageRange": "Pages 120–161",
    "description": "The printed Unit 6 sequence: frequency tables and graphs; cumulative frequency; arithmetic, geometric and harmonic means; median and mode; weighted mean and moving averages; graphical median, quartiles and mode; range, variance and standard deviation.",
    "sections": [
      {
        "id": "6.0",
        "title": "Unit 6 — Basic Statistics",
        "theory": "Statistics is the science of collecting, arranging, analysing and interpreting data. The unit begins with weather forecasting and a monthly-users graph, then develops tables, graphs, averages and measures of spread. Learning outcomes printed in the book include grouped tables, histograms, frequency polygons, ogives, mean, median, mode, geometric and harmonic mean, weighted mean, moving averages, quartiles, range, variance and standard deviation.",
        "page": "pp. 120–121",
        "rules": [
          "Organize raw data in a frequency table.",
          "Represent distributions graphically.",
          "Calculate central tendency and dispersion."
        ],
        "diagram": {
          "type": "category-bars",
          "labels": [
            "Facebook",
            "YouTube",
            "Instagram",
            "Twitter",
            "WhatsApp",
            "Snapchat",
            "Messenger",
            "WeChat"
          ],
          "values": [
            2000,
            1500,
            700,
            328,
            1200,
            255,
            1200,
            889
          ],
          "xLabel": "Platform",
          "yLabel": "Monthly users (millions)",
          "title": "Monthly users (figures printed in the textbook)"
        }
      },
      {
        "id": "6.1",
        "title": "6.1 Frequency Distribution",
        "theory": "A frequency distribution arranges raw data into values or class intervals and records the number of observations in each. Data may be discrete or continuous. A grouped table uses class limits, class boundaries, class marks, tallies and frequencies.",
        "page": "pp. 122–124",
        "rules": [
          "The sum of frequencies equals the number of observations.",
          "Class mark = (lower limit + upper limit)/2.",
          "For whole-number classes, boundaries are 0.5 below and above class limits."
        ]
      },
      {
        "id": "6.1.1",
        "title": "6.1.1 Construction of a Grouped Frequency Table",
        "theory": "For discrete data, list values and tally occurrences. For continuous data, choose a sensible class width, create non-overlapping intervals, tally and count. Add class boundaries and class marks when required. The opening scooter activity groups 35 prices into 1–25:4, 26–50:11, 51–75:7, 76–100:13.",
        "page": "pp. 122–124",
        "rules": [
          "Use intervals that cover every observation exactly once.",
          "Choose a suitable number of classes and a consistent width."
        ]
      },
      {
        "id": "6.1.2",
        "title": "6.1.2 Histogram",
        "theory": "A histogram is a vertical-bar display for grouped data. Adjacent bars touch. Put class boundaries on the horizontal axis and frequency on the vertical axis. When class widths differ, adjust bar heights so each bar’s area remains proportional to its frequency.",
        "page": "pp. 125–126",
        "rules": [
          "Equal widths: height is frequency.",
          "Unequal widths: height is frequency divided by class width."
        ]
      },
      {
        "id": "6.1.3",
        "title": "6.1.3 Frequency Polygon",
        "theory": "A frequency polygon joins the midpoints of the tops of consecutive histogram bars. It can also be drawn directly by plotting class marks against frequencies. Add zero-frequency endpoints to meet the horizontal axis.",
        "page": "pp. 126–127",
        "rules": [
          "Plot (class mark, frequency).",
          "Join consecutive points by straight segments."
        ]
      },
      {
        "id": "6.2",
        "title": "6.2 Cumulative Frequency Distribution",
        "theory": "Cumulative frequency is the running total of frequencies. Cumulative tables answer “less than” and “more than” questions; plotting them produces a cumulative frequency polygon called an ogive.",
        "page": "pp. 129–132",
        "rules": [
          "Less-than c.f. adds frequencies from the lowest class upward.",
          "The final cumulative frequency is the total number of observations."
        ]
      },
      {
        "id": "6.2.1",
        "title": "6.2.1 Construct a Cumulative Frequency Table",
        "theory": "Add each class frequency to the cumulative total of the preceding classes. Record class boundaries for graphing.",
        "page": "pp. 129–130",
        "rules": [
          "c.f. = previous c.f. + current frequency."
        ]
      },
      {
        "id": "6.2.2",
        "title": "6.2.2 Cumulative Frequency Polygon (Ogive)",
        "theory": "Plot less-than cumulative frequency against upper class boundaries. A more-than polygon uses lower boundaries and descending cumulative totals. Join plotted points in order.",
        "page": "pp. 130–131",
        "rules": [
          "A less-than ogive starts at the lowest boundary with c.f. 0."
        ]
      },
      {
        "id": "6.3",
        "title": "6.3 Measures of Central Tendency",
        "theory": "A measure of central tendency describes a value near the centre of a data set. The unit covers arithmetic mean, median, mode, geometric mean and harmonic mean for ungrouped and grouped data.",
        "page": "pp. 133–151",
        "rules": [
          "Choose the measure that fits the data and the question."
        ]
      },
      {
        "id": "6.3.1",
        "title": "6.3.1 Arithmetic Mean",
        "theory": "The arithmetic mean is the sum of values divided by their number. The short-cut method uses deviations from an assumed mean. For grouped data multiply each value or class midpoint by its frequency.",
        "page": "pp. 133–137",
        "rules": [
          "Ungrouped: x̄=Σx/n.",
          "Short-cut: x̄=a+Σd/n, d=x−a.",
          "Grouped: x̄=Σfx/Σf."
        ]
      },
      {
        "id": "6.3.1-median",
        "title": "Median",
        "theory": "Arrange observations in order. For odd n use the middle term; for even n average the two middle terms. With grouped continuous data use the median class and interpolate.",
        "page": "pp. 137–141",
        "rules": [
          "Grouped median = l+(h/f)(n/2−c)."
        ]
      },
      {
        "id": "6.3.1-mode",
        "title": "Mode",
        "theory": "The mode is the value occurring most often. For grouped data the modal class has the greatest frequency; estimate within it.",
        "page": "pp. 141–142",
        "rules": [
          "Grouped mode = l+[(fₘ−f₀)/(2fₘ−f₀−f₁)]h."
        ]
      },
      {
        "id": "6.3.1-geometric",
        "title": "Geometric Mean",
        "theory": "The geometric mean is the positive nth root of the product of n positive values. For grouped data use class midpoints and frequencies.",
        "page": "pp. 143–144",
        "rules": [
          "Ungrouped: G.M.=antilog(Σlog x/n).",
          "Grouped: G.M.=antilog(Σf log x/Σf)."
        ]
      },
      {
        "id": "6.3.1-harmonic",
        "title": "Harmonic Mean",
        "theory": "The harmonic mean is the reciprocal of the arithmetic mean of the reciprocals. For grouped data use class midpoints.",
        "page": "pp. 145–146",
        "rules": [
          "Ungrouped: H.M.=n/Σ(1/x).",
          "Grouped: H.M.=Σf/Σ(f/x)."
        ]
      },
      {
        "id": "6.3.2-properties",
        "title": "6.3.2 Properties of Arithmetic Mean",
        "theory": "The sum of deviations from the mean is zero; the sum of squared deviations is least at the mean; a linear transformation transforms the mean in the same way; and the combined mean is the weighted mean of group means.",
        "page": "p. 147",
        "rules": [
          "Σ(x−x̄)=0.",
          "If y=ax+b, then ȳ=ax̄+b."
        ]
      },
      {
        "id": "6.3.3a",
        "title": "6.3.3(a) Weighted Mean",
        "theory": "A weighted mean gives values different importance. Multiply each value by its weight, sum the products, and divide by the sum of weights.",
        "page": "p. 147",
        "rules": [
          "x̄w=Σwx/Σw."
        ]
      },
      {
        "id": "6.3.3b",
        "title": "6.3.3(b) Moving Averages",
        "theory": "A moving average averages each successive overlapping segment of a series. Each new segment drops the oldest value and adds the next value.",
        "page": "p. 148",
        "rules": [
          "Three-day moving average = mean of each consecutive group of three days."
        ]
      },
      {
        "id": "6.3.4-graphical",
        "title": "6.3.4 Estimation of Median, Mode and Quartiles Graphically",
        "theory": "Read median and quartiles from the ogive at their cumulative-frequency positions. Estimate grouped mode from the modal histogram bar and its neighbours.",
        "page": "pp. 149–151",
        "rules": [
          "Median at n/2; Q₁ at n/4; Q₃ at 3n/4.",
          "Interquartile range=Q₃−Q₁."
        ]
      },
      {
        "id": "6.4",
        "title": "6.4 Measures of Dispersion",
        "theory": "Dispersion describes the spread of data around its centre. The book presents range, standard deviation and variance.",
        "page": "pp. 153–157",
        "rules": [
          "Range=max−min.",
          "Variance is the mean squared deviation from the arithmetic mean.",
          "Standard deviation is the positive square root of variance."
        ]
      },
      {
        "id": "6.4.1",
        "title": "Range",
        "theory": "Range is the difference between the greatest and smallest observations. It does not describe values between the extremes.",
        "page": "pp. 153–154",
        "rules": [
          "R=max(x)−min(x)."
        ]
      },
      {
        "id": "6.4.2",
        "title": "Standard Deviation",
        "theory": "Standard deviation measures spread from the mean. The textbook uses the population denominator n or Σf.",
        "page": "pp. 154–156",
        "rules": [
          "S.D.=√[Σ(x−x̄)²/n].",
          "Frequency form: √[Σf(x−x̄)²/Σf]."
        ]
      },
      {
        "id": "6.4.3",
        "title": "Variance",
        "theory": "Variance is the average squared deviation from the mean; the book denotes it S².",
        "page": "pp. 154–156",
        "rules": [
          "S²=Σ(x−x̄)²/n; frequency form S²=Σf(x−x̄)²/Σf."
        ]
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "number": 1,
        "page": 122,
        "sectionId": "6.1.1",
        "title": "Example 1 (p. 122) — Discrete frequency table",
        "problem": "The shoe sizes of 40 customers are listed in the book. Make a frequency table.",
        "answer": "Sizes 6:9, 7:10, 8:8, 9:4, 10:8, 11:1; total=40.",
        "steps": [
          "Tally each size and check that the frequencies sum to 40."
        ],
        "method": "Discrete frequency table",
        "diagram": {
          "type": "category-bars",
          "labels": [
            "6",
            "7",
            "8",
            "9",
            "10",
            "11"
          ],
          "values": [
            9,
            10,
            8,
            4,
            8,
            1
          ],
          "xLabel": "Shoe size",
          "yLabel": "Frequency",
          "title": "Shoe sizes"
        }
      },
      {
        "id": "eg2",
        "number": 2,
        "page": 123,
        "sectionId": "6.1.1",
        "title": "Example 2 (p. 123) — Grouped frequency table",
        "problem": "The heights (cm) of 30 students are 162,165,170,170,162,159,162,163,175,166,171,174,155,160,173,140,145,140,146,150,172,158,155,163,165,171,153,158,149,153. Construct a grouped table.",
        "answer": "139–144:2; 145–150:4; 151–156:4; 157–162:7; 163–168:5; 169–174:7; 175–180:1.",
        "steps": [
          "Use the seven classes shown; the total is 30."
        ],
        "method": "Grouped frequency table",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "139–144",
              "138.5–144.5",
              2
            ],
            [
              "145–150",
              "144.5–150.5",
              4
            ],
            [
              "151–156",
              "150.5–156.5",
              4
            ],
            [
              "157–162",
              "156.5–162.5",
              7
            ],
            [
              "163–168",
              "162.5–168.5",
              5
            ],
            [
              "169–174",
              "168.5–174.5",
              7
            ],
            [
              "175–180",
              "174.5–180.5",
              1
            ]
          ],
          "title": "Heights and frequencies"
        }
      },
      {
        "id": "eg3",
        "number": 3,
        "page": 124,
        "sectionId": "6.1.1",
        "title": "Example 3 (p. 124) — Weights grouped into classes",
        "problem": "Weights (kg): 25,30,40,21,24,25,36,30,45,50,22,25,36,46,35,38,40,28,34,45,42,46,38,48,28,29,31,33,30,26. Use class interval 5; find frequencies, boundaries and class marks.",
        "answer": "Classes 21–25 to 46–50 have frequencies 6,7,4,6,3,4; boundaries 20.5–25.5 through 45.5–50.5; marks 23,28,33,38,43,48.",
        "steps": [
          "Tally each of the 30 weights in a five-unit class."
        ],
        "method": "Weights grouped into classes",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "21–25",
              "20.5–25.5",
              23,
              6
            ],
            [
              "26–30",
              "25.5–30.5",
              28,
              7
            ],
            [
              "31–35",
              "30.5–35.5",
              33,
              4
            ],
            [
              "36–40",
              "35.5–40.5",
              38,
              6
            ],
            [
              "41–45",
              "40.5–45.5",
              43,
              3
            ],
            [
              "46–50",
              "45.5–50.5",
              48,
              4
            ]
          ],
          "title": "Weights, boundaries and class marks"
        }
      },
      {
        "id": "eg4",
        "number": 4,
        "page": 125,
        "sectionId": "6.1.2",
        "title": "Example 4 (p. 125) — Histogram with equal widths",
        "problem": "Draw a histogram for classes 20–29,30–39,40–49,50–59,60–69 with frequencies 1,2,3,2,1.",
        "answer": "Five adjacent bars over boundaries 19.5–29.5 through 59.5–69.5; heights 1,2,3,2,1.",
        "steps": [
          "Use class boundaries on the horizontal axis."
        ],
        "method": "Histogram with equal widths",
        "diagram": {
          "type": "histogram",
          "bars": [
            {
              "lower": 19.5,
              "upper": 29.5,
              "frequency": 1
            },
            {
              "lower": 29.5,
              "upper": 39.5,
              "frequency": 2
            },
            {
              "lower": 39.5,
              "upper": 49.5,
              "frequency": 3
            },
            {
              "lower": 49.5,
              "upper": 59.5,
              "frequency": 2
            },
            {
              "lower": 59.5,
              "upper": 69.5,
              "frequency": 1
            }
          ],
          "title": "Histogram from equal intervals"
        }
      },
      {
        "id": "eg5",
        "number": 5,
        "page": 126,
        "sectionId": "6.1.2",
        "title": "Example 5 (p. 126) — Histogram with unequal widths",
        "problem": "Classes 30–39,40–43,44–54,55–69,70–79,80–89,90–99 have frequencies 10,12,44,75,40,30,10. Draw a histogram.",
        "answer": "Boundaries 29.5–39.5,39.5–43.5,43.5–54.5,54.5–69.5,69.5–79.5,79.5–89.5,89.5–99.5; adjusted heights 1,3,4,5,4,3,1.",
        "steps": [
          "Divide frequency by class width for bar height."
        ],
        "method": "Histogram with unequal widths",
        "diagram": {
          "type": "histogram",
          "bars": [
            {
              "lower": 29.5,
              "upper": 39.5,
              "frequency": 10,
              "height": 1
            },
            {
              "lower": 39.5,
              "upper": 43.5,
              "frequency": 12,
              "height": 3
            },
            {
              "lower": 43.5,
              "upper": 54.5,
              "frequency": 44,
              "height": 4
            },
            {
              "lower": 54.5,
              "upper": 69.5,
              "frequency": 75,
              "height": 5
            },
            {
              "lower": 69.5,
              "upper": 79.5,
              "frequency": 40,
              "height": 4
            },
            {
              "lower": 79.5,
              "upper": 89.5,
              "frequency": 30,
              "height": 3
            },
            {
              "lower": 89.5,
              "upper": 99.5,
              "frequency": 10,
              "height": 1
            }
          ],
          "title": "Unequal class widths",
          "yLabel": "Adjusted frequency f/h"
        }
      },
      {
        "id": "eg6",
        "number": 6,
        "page": 127,
        "sectionId": "6.1.3",
        "title": "Example 6 (p. 127) — Frequency polygon",
        "problem": "Classes 20–29 through 80–89 have frequencies 1,3,4,5,4,2,1. Construct the frequency polygon.",
        "answer": "Plot (14.5,0),(24.5,1),(34.5,3),(44.5,4),(54.5,5),(64.5,4),(74.5,2),(84.5,1),(94.5,0).",
        "steps": [
          "Use each class midpoint and join successive points."
        ],
        "method": "Frequency polygon",
        "diagram": {
          "type": "frequency-polygon",
          "points": [
            [
              14.5,
              0
            ],
            [
              24.5,
              1
            ],
            [
              34.5,
              3
            ],
            [
              44.5,
              4
            ],
            [
              54.5,
              5
            ],
            [
              64.5,
              4
            ],
            [
              74.5,
              2
            ],
            [
              84.5,
              1
            ],
            [
              94.5,
              0
            ]
          ],
          "title": "Frequency polygon"
        }
      },
      {
        "id": "eg7",
        "number": 7,
        "page": 129,
        "sectionId": "6.2.1",
        "title": "Example 7 (p. 129) — Discrete cumulative frequency",
        "problem": "For x=3,4,5,6,7,8,9,10,11,12 with frequencies 1,2,3,4,5,6,7,4,3,8, find the cumulative frequencies.",
        "answer": "1,3,6,10,15,21,28,32,35,43.",
        "steps": [
          "Add each frequency to the running total."
        ],
        "method": "Discrete cumulative frequency",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              3,
              1,
              1
            ],
            [
              4,
              2,
              3
            ],
            [
              5,
              3,
              6
            ],
            [
              6,
              4,
              10
            ],
            [
              7,
              5,
              15
            ],
            [
              8,
              6,
              21
            ],
            [
              9,
              7,
              28
            ],
            [
              10,
              4,
              32
            ],
            [
              11,
              3,
              35
            ],
            [
              12,
              8,
              43
            ]
          ],
          "title": "Cumulative frequencies"
        }
      },
      {
        "id": "eg8",
        "number": 8,
        "page": 130,
        "sectionId": "6.2.1",
        "title": "Example 8 (p. 130) — Grouped cumulative frequency",
        "problem": "Mileage classes 10–12,13–15,16–18,19–21,22–24 have frequencies 16,20,36,21,7. Construct the cumulative frequency table.",
        "answer": "Cumulative frequencies 16,36,72,93,100, at upper boundaries 12.5,15.5,18.5,21.5,24.5.",
        "steps": [
          "Add the frequencies successively."
        ],
        "method": "Grouped cumulative frequency",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "10–12",
              12.5,
              16,
              16
            ],
            [
              "13–15",
              15.5,
              20,
              36
            ],
            [
              "16–18",
              18.5,
              36,
              72
            ],
            [
              "19–21",
              21.5,
              21,
              93
            ],
            [
              "22–24",
              24.5,
              7,
              100
            ]
          ],
          "title": "Mileage cumulative frequency"
        }
      },
      {
        "id": "eg9",
        "number": 9,
        "page": 131,
        "sectionId": "6.2.2",
        "title": "Example 9 (p. 131) — Less-than ogive",
        "problem": "Marks of 30 students: 25,30,27,28,35,36,40,41,42,45,50,44,29,26,36,31,43,46,52,53,51,42,37,27,33,46,44,34,51,54. Use class width 5, prepare the frequency and less-than cumulative frequency distribution, then draw an ogive.",
        "answer": "Frequencies for 25–29 through 50–54: 6,4,4,7,3,6; c.f. 6,10,14,21,24,30.",
        "steps": [
          "Plot the c.f. against upper boundaries."
        ],
        "method": "Less-than ogive",
        "diagram": {
          "type": "ogive",
          "points": [
            [
              24.5,
              0
            ],
            [
              29.5,
              6
            ],
            [
              34.5,
              10
            ],
            [
              39.5,
              14
            ],
            [
              44.5,
              21
            ],
            [
              49.5,
              24
            ],
            [
              54.5,
              30
            ]
          ],
          "title": "Less-than ogive"
        }
      },
      {
        "id": "eg10",
        "number": 10,
        "page": 134,
        "sectionId": "6.3.1",
        "title": "Example 10 (p. 134) — Arithmetic mean, direct and short-cut",
        "problem": "Find the A.M. of 2,3,4,5,6,7,8,9,10 (i) directly and (ii) by short-cut.",
        "answer": "Both methods give 54/9=6.",
        "steps": [
          "Direct: Σx/n. Short-cut: choose a=6; deviations total 0."
        ],
        "method": "Arithmetic mean, direct and short-cut"
      },
      {
        "id": "eg11",
        "number": 11,
        "page": 135,
        "sectionId": "6.3.1",
        "title": "Example 11 (p. 135) — Mean from frequency table",
        "problem": "Marks of 13 students: 10,12,12,14,9,18,9,13,16,9,17,16,14. Make a frequency table and find the mean.",
        "answer": "Frequencies 9:3,10:1,12:2,13:1,14:2,16:2,17:1,18:1; Σf=13, Σfx=169; mean=13.",
        "steps": [
          "Use x̄=Σfx/Σf."
        ],
        "method": "Mean from frequency table",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              9,
              3,
              27
            ],
            [
              10,
              1,
              10
            ],
            [
              12,
              2,
              24
            ],
            [
              13,
              1,
              13
            ],
            [
              14,
              2,
              28
            ],
            [
              16,
              2,
              32
            ],
            [
              17,
              1,
              17
            ],
            [
              18,
              1,
              18
            ]
          ],
          "title": "Marks, frequencies and fx"
        }
      },
      {
        "id": "eg12",
        "number": 12,
        "page": 136,
        "sectionId": "6.3.1",
        "title": "Example 12 (p. 136) — Mean of grouped data",
        "problem": "2 kW generator prices (hundreds of Rs.): classes 90–94,95–99,100–104,105–109,110–114,115–119,120–124; frequencies 4,11,15,24,18,9,3. Find the mean by direct and short-cut methods.",
        "answer": "Using the question table as printed: midpoints 92,97,102,107,112,117,122; Σf=84, Σfx=8968; mean≈106.76 hundreds of rupees.",
        "steps": [
          "Multiply each midpoint by its frequency; divide Σfx by Σf."
        ],
        "method": "Mean of grouped data",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "90–94",
              92,
              4,
              368
            ],
            [
              "95–99",
              97,
              11,
              1067
            ],
            [
              "100–104",
              102,
              15,
              1530
            ],
            [
              "105–109",
              107,
              24,
              2568
            ],
            [
              "110–114",
              112,
              18,
              2016
            ],
            [
              "115–119",
              117,
              9,
              1053
            ],
            [
              "120–124",
              122,
              3,
              366
            ]
          ],
          "title": "Generator prices"
        },
        "sourceNote": "The printed question gives 18 for 110–114; the solution table changes it to 19 and reports 106.82. This answer uses the question table."
      },
      {
        "id": "eg13",
        "number": 13,
        "page": 138,
        "sectionId": "6.3.1-median",
        "title": "Example 13 (p. 138) — Median, odd number of values",
        "problem": "Find the median of 2,4,5,6,3.",
        "answer": "Order: 2,3,4,5,6; median=4.",
        "steps": [
          "The middle term is the third."
        ],
        "method": "Median, odd number of values"
      },
      {
        "id": "eg14",
        "number": 14,
        "page": 138,
        "sectionId": "6.3.1-median",
        "title": "Example 14 (p. 138) — Median, even number of values",
        "problem": "Pocket money is Rs.10,20,15,30. Find the median.",
        "answer": "Ordered values 10,15,20,30; median=(15+20)/2=17.5 rupees.",
        "steps": [
          "Average the two central observations."
        ],
        "method": "Median, even number of values"
      },
      {
        "id": "eg15",
        "number": 15,
        "page": 139,
        "sectionId": "6.3.1-median",
        "title": "Example 15 (p. 139) — Median from discrete frequency table",
        "problem": "Values x=10,12,15,20,25,30 have frequencies 1,10,5,13,2,4. Find the median.",
        "answer": "n=35; c.f. 1,11,16,29,31,35; 18th value is 20, so median=20.",
        "steps": [
          "Locate the (n+1)/2-th value."
        ],
        "method": "Median from discrete frequency table",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              10,
              1,
              1
            ],
            [
              12,
              10,
              11
            ],
            [
              15,
              5,
              16
            ],
            [
              20,
              13,
              29
            ],
            [
              25,
              2,
              31
            ],
            [
              30,
              4,
              35
            ]
          ],
          "title": "Discrete median"
        }
      },
      {
        "id": "eg16",
        "number": 16,
        "page": 139,
        "sectionId": "6.3.1-median",
        "title": "Example 16 (p. 139) — Median from a discrete table",
        "problem": "Values 10,20,22,25 have frequencies 0,2,4,6. Find the median.",
        "answer": "n=12; the 6th value is 22, so median=22.",
        "steps": [
          "Use the cumulative frequency."
        ],
        "method": "Median from a discrete table",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              10,
              0,
              0
            ],
            [
              20,
              2,
              2
            ],
            [
              22,
              4,
              6
            ],
            [
              25,
              6,
              12
            ]
          ],
          "title": "Even total frequency"
        }
      },
      {
        "id": "eg17",
        "number": 17,
        "page": 140,
        "sectionId": "6.3.1-median",
        "title": "Example 17 (p. 140) — Median of continuous grouped data",
        "problem": "Daily wages (Rs.) classes 60–69,70–79,80–89,90–99,100–109 have frequencies 4,6,8,10,5. Find the median.",
        "answer": "n=33; median class 80–89. l=79.5,h=10,f=8,c=10; Median=79.5+(10/8)(16.5−10)=87.625.",
        "steps": [
          "Apply the grouped median formula."
        ],
        "method": "Median of continuous grouped data",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "60–69",
              4,
              4
            ],
            [
              "70–79",
              6,
              10
            ],
            [
              "80–89",
              8,
              18
            ],
            [
              "90–99",
              10,
              28
            ],
            [
              "100–109",
              5,
              33
            ]
          ],
          "title": "Median class"
        }
      },
      {
        "id": "eg18",
        "number": 18,
        "page": 141,
        "sectionId": "6.3.1-mode",
        "title": "Example 18 (p. 141) — Mode of ungrouped data",
        "problem": "Trouser sizes are 25,30,31,25,35,35,25. Find the modal size.",
        "answer": "25 occurs most often; mode=25.",
        "steps": [
          "Count occurrences."
        ],
        "method": "Mode of ungrouped data"
      },
      {
        "id": "eg19",
        "number": 19,
        "page": 141,
        "sectionId": "6.3.1-mode",
        "title": "Example 19 (p. 141) — Mode from discrete frequency table",
        "problem": "Weights 40,42,50,51,55 kg have frequencies 10,8,3,2,1. Find the mode.",
        "answer": "Mode=40 kg.",
        "steps": [
          "The greatest frequency is 10."
        ],
        "method": "Mode from discrete frequency table",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              40,
              10
            ],
            [
              42,
              8
            ],
            [
              50,
              3
            ],
            [
              51,
              2
            ],
            [
              55,
              1
            ]
          ],
          "title": "Weights and frequency"
        }
      },
      {
        "id": "eg20",
        "number": 20,
        "page": 142,
        "sectionId": "6.3.1-mode",
        "title": "Example 20 (p. 142) — Mode of grouped data",
        "problem": "Marks classes 0–4,4–8,8–12,12–16,16–20 have frequencies 3,5,4,6,2. Find the mode.",
        "answer": "Modal class 12–16; Mode=12+[(6−4)/(12−4−2)]·4≈13.33.",
        "steps": [
          "Use the grouped mode formula."
        ],
        "method": "Mode of grouped data",
        "diagram": {
          "type": "mode-histogram",
          "bars": [
            {
              "lower": 0,
              "upper": 4,
              "frequency": 3
            },
            {
              "lower": 4,
              "upper": 8,
              "frequency": 5
            },
            {
              "lower": 8,
              "upper": 12,
              "frequency": 4
            },
            {
              "lower": 12,
              "upper": 16,
              "frequency": 6
            },
            {
              "lower": 16,
              "upper": 20,
              "frequency": 2
            }
          ],
          "mode": 13.33,
          "title": "Modal class"
        }
      },
      {
        "id": "eg21",
        "number": 21,
        "page": 143,
        "sectionId": "6.3.1-geometric",
        "title": "Example 21 (p. 143) — Geometric mean of ungrouped data",
        "problem": "Find the G.M. of 60,65,70,75,80,85,90.",
        "answer": "G.M.=antilog(13.0976/7)≈74.31.",
        "steps": [
          "Use the common logarithms."
        ],
        "method": "Geometric mean of ungrouped data"
      },
      {
        "id": "eg22",
        "number": 22,
        "page": 144,
        "sectionId": "6.3.1-geometric",
        "title": "Example 22 (p. 144) — Geometric mean of grouped data",
        "problem": "Marks classes 0–20,20–40,40–60,60–80 have frequencies 3,4,10,11. Find G.M.",
        "answer": "Midpoints 10,30,50,70; Σf=28, Σf log x≈46.1924; G.M.≈44.64.",
        "steps": [
          "Use antilog(Σf log x/Σf)."
        ],
        "method": "Geometric mean of grouped data",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "0–20",
              10,
              3
            ],
            [
              "20–40",
              30,
              4
            ],
            [
              "40–60",
              50,
              10
            ],
            [
              "60–80",
              70,
              11
            ]
          ],
          "title": "Grouped geometric mean"
        }
      },
      {
        "id": "eg23",
        "number": 23,
        "page": 145,
        "sectionId": "6.3.1-harmonic",
        "title": "Example 23 (p. 145) — Harmonic mean of values",
        "problem": "Find H.M. of 5,6,8,9,10.",
        "answer": "Σ(1/x)≈0.695; H.M.=5/0.695≈7.19.",
        "steps": [
          "Use n/Σ(1/x)."
        ],
        "method": "Harmonic mean of values"
      },
      {
        "id": "eg24",
        "number": 24,
        "page": 146,
        "sectionId": "6.3.1-harmonic",
        "title": "Example 24 (p. 146) — Harmonic mean of grouped data",
        "problem": "Classes 0–6,6–12,12–18,18–24,24–30 have frequencies 1,2,5,4,6. Find H.M.",
        "answer": "Midpoints 3,9,15,21,27; Σf=18, Σ(f/x)≈1.29; H.M.≈13.95.",
        "steps": [
          "Use Σf/Σ(f/x)."
        ],
        "method": "Harmonic mean of grouped data",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "0–6",
              3,
              1
            ],
            [
              "6–12",
              9,
              2
            ],
            [
              "12–18",
              15,
              5
            ],
            [
              "18–24",
              21,
              4
            ],
            [
              "24–30",
              27,
              6
            ]
          ],
          "title": "Grouped harmonic mean"
        }
      },
      {
        "id": "eg25",
        "number": 25,
        "page": 147,
        "sectionId": "6.3.3a",
        "title": "Example 25 (p. 147) — Weighted mean",
        "problem": "Marks in Maths, English, Urdu and Statistics are 70,60,80,65; weights 2,1,3,1. Find the weighted average.",
        "answer": "Σwx=505; Σw=7; weighted mean=505/7≈72.14.",
        "steps": [
          "Multiply each mark by its weight."
        ],
        "method": "Weighted mean",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "Maths",
              70,
              2,
              140
            ],
            [
              "English",
              60,
              1,
              60
            ],
            [
              "Urdu",
              80,
              3,
              240
            ],
            [
              "Statistics",
              65,
              1,
              65
            ]
          ],
          "title": "Weighted marks"
        }
      },
      {
        "id": "eg26",
        "number": 26,
        "page": 148,
        "sectionId": "6.3.3b",
        "title": "Example 26 (p. 148) — Three-day moving averages",
        "problem": "Daily temperatures during the first week of May are 40,37,36,38,37,41,39. Find three-day moving averages.",
        "answer": "37.67,37,37,38.67,39.",
        "steps": [
          "Average each consecutive triple."
        ],
        "method": "Three-day moving averages"
      },
      {
        "id": "eg27",
        "number": 27,
        "page": 149,
        "sectionId": "6.3.4-graphical",
        "title": "Example 27 (p. 149) — Median from ogive",
        "problem": "Classes 10–14,15–19,20–24,25–29,30–34,35–39 have frequencies 1,5,7,2,6,4. Estimate the median graphically.",
        "answer": "Total n=25; read at c.f.=12.5; median≈24.14.",
        "steps": [
          "Trace from n/2 to the ogive, then to the class-boundary axis."
        ],
        "method": "Median from ogive",
        "diagram": {
          "type": "ogive",
          "points": [
            [
              9.5,
              0
            ],
            [
              14.5,
              1
            ],
            [
              19.5,
              6
            ],
            [
              24.5,
              13
            ],
            [
              29.5,
              15
            ],
            [
              34.5,
              21
            ],
            [
              39.5,
              25
            ]
          ],
          "title": "Median on an ogive",
          "horizontalMark": 12.5,
          "verticalMark": 24.14,
          "markLabel": "Median ≈24.14"
        }
      },
      {
        "id": "eg28",
        "number": 28,
        "page": 150,
        "sectionId": "6.3.4-graphical",
        "title": "Example 28 (p. 150) — Mode from histogram",
        "problem": "Classes 20–24,25–29,30–34,35–39,40–44,45–49,50–54 have frequencies 1,4,8,11,15,9,2. Estimate the mode graphically.",
        "answer": "The modal class is 40–44; graphical mode≈41.5.",
        "steps": [
          "Use the diagonal intersection construction in the modal rectangle."
        ],
        "method": "Mode from histogram",
        "diagram": {
          "type": "mode-histogram",
          "bars": [
            {
              "lower": 19.5,
              "upper": 24.5,
              "frequency": 1
            },
            {
              "lower": 24.5,
              "upper": 29.5,
              "frequency": 4
            },
            {
              "lower": 29.5,
              "upper": 34.5,
              "frequency": 8
            },
            {
              "lower": 34.5,
              "upper": 39.5,
              "frequency": 11
            },
            {
              "lower": 39.5,
              "upper": 44.5,
              "frequency": 15
            },
            {
              "lower": 44.5,
              "upper": 49.5,
              "frequency": 9
            },
            {
              "lower": 49.5,
              "upper": 54.5,
              "frequency": 2
            }
          ],
          "mode": 41.5,
          "title": "Graphical mode"
        }
      },
      {
        "id": "eg29",
        "number": 29,
        "page": 151,
        "sectionId": "6.3.4-graphical",
        "title": "Example 29 (p. 151) — Quartiles from an ogive",
        "problem": "Classes 0–10,10–20,20–30,30–40,40–50 have frequencies 3,5,9,3,2. Find Q₁ and Q₃ graphically.",
        "answer": "n=22; Q₁ at 5.5th≈15.0; Q₃ at 16.5th≈29.4.",
        "steps": [
          "Plot c.f. against class boundaries."
        ],
        "method": "Quartiles from an ogive",
        "diagram": {
          "type": "ogive",
          "points": [
            [
              -0.5,
              0
            ],
            [
              9.5,
              3
            ],
            [
              19.5,
              8
            ],
            [
              29.5,
              17
            ],
            [
              39.5,
              20
            ],
            [
              49.5,
              22
            ]
          ],
          "title": "Quartiles on an ogive",
          "horizontalMarks": [
            5.5,
            16.5
          ],
          "verticalMarks": [
            15,
            29.4
          ],
          "markLabel": "Q₁ and Q₃"
        }
      },
      {
        "id": "eg30",
        "number": 30,
        "page": 153,
        "sectionId": "6.4.1",
        "title": "Example 30 (p. 153) — Range",
        "problem": "Find the range of 209,260,270,311.",
        "answer": "311−209=102.",
        "steps": [
          "Subtract the least value from the greatest."
        ],
        "method": "Range"
      },
      {
        "id": "eg31",
        "number": 31,
        "page": 153,
        "sectionId": "6.4.1",
        "title": "Example 31 (p. 153) — Range from mountain heights",
        "problem": "K–2 8611 m; Gasherbrum I 8068; Broad 8047; Gasherbrum II 8035; Gasherbrum III 7952; Gasherbrum IV 7925; Rakaposhi 7788. Find the range.",
        "answer": "8611−7788=823 m.",
        "steps": [
          "Subtract the minimum height from the maximum."
        ],
        "method": "Range from mountain heights"
      },
      {
        "id": "eg32",
        "number": 32,
        "page": 154,
        "sectionId": "6.4.1",
        "title": "Example 32 (p. 154) — Range of grouped data",
        "problem": "Classes 5–9,10–14,15–19,20–24,25–29 have frequencies 10,15,12,21,3. Find the range.",
        "answer": "Boundaries 4.5 to 29.5; range=25.",
        "steps": [
          "Subtract lowest boundary from highest."
        ],
        "method": "Range of grouped data"
      },
      {
        "id": "eg33",
        "number": 33,
        "page": 154,
        "sectionId": "6.4.1",
        "title": "Example 33 (p. 154) — Mean, median, mode and range",
        "problem": "Candy bar masses: 9,8,9,8,9,13,24 g. Find mean, median, mode, range, and choose a useful summary.",
        "answer": "Mean≈11.4 g; median=9 g; mode=9 g; range=16 g. The median is representative because 24 is an extreme value.",
        "steps": [
          "Order the values, then calculate each measure."
        ],
        "method": "Mean, median, mode and range"
      },
      {
        "id": "eg34",
        "number": 34,
        "page": 155,
        "sectionId": "6.4.2",
        "title": "Example 34 (p. 155) — Variance and standard deviation",
        "problem": "Find the variance and standard deviation of 6,8,10,12,14.",
        "answer": "Mean=10; Σ(x−x̄)²=40; variance=8; standard deviation=√8≈2.83.",
        "steps": [
          "Divide squared deviations by n, then take the square root."
        ],
        "method": "Variance and standard deviation",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              6,
              -4,
              16
            ],
            [
              8,
              -2,
              4
            ],
            [
              10,
              0,
              0
            ],
            [
              12,
              2,
              4
            ],
            [
              14,
              4,
              16
            ]
          ],
          "title": "Squared deviations"
        },
        "sourceNote": "The scan prints S.D.=8 after finding variance 8; the correct standard deviation is √8."
      },
      {
        "id": "eg35",
        "number": 35,
        "page": 156,
        "sectionId": "6.4.2",
        "title": "Example 35 (p. 156) — Grouped variance and standard deviation",
        "problem": "Rotten-egg classes 0–4,4–8,8–12,12–16,16–20,20–24 have frequencies 5,10,15,20,6,4. Find variance and S.D.",
        "answer": "Midpoints 2,6,10,14,18,22; Σf=60,Σfx=696,Σfx²=9680; variance≈26.77; S.D.≈5.18.",
        "steps": [
          "Use S²=Σfx²/Σf−(Σfx/Σf)²."
        ],
        "method": "Grouped variance and standard deviation",
        "diagram": {
          "type": "frequency-table",
          "rows": [
            [
              "0–4",
              2,
              5,
              10,
              4,
              20
            ],
            [
              "4–8",
              6,
              10,
              60,
              36,
              360
            ],
            [
              "8–12",
              10,
              15,
              150,
              100,
              1500
            ],
            [
              "12–16",
              14,
              20,
              280,
              196,
              3920
            ],
            [
              "16–20",
              18,
              6,
              108,
              324,
              1944
            ],
            [
              "20–24",
              22,
              4,
              88,
              484,
              1936
            ]
          ],
          "title": "Variance table"
        }
      }
    ],
    "exercises": [
      {
        "exercise": "6.1",
        "title": "Exercise 6.1",
        "page": 127,
        "problems": [
          {
            "num": "Q1",
            "question": "Marks of 30 students: 40,60,65,70,35,50,56,74,72,49,85,76,82,83,68,90,67,66,58,46,74,88,76,69,57,63,66,47,82,90. With class interval 10, make a frequency table with boundaries and marks.",
            "finalAnswer": "Classes 30–39…90–99: f=1,4,4,8,6,5,2; class marks 34.5…94.5; boundaries 29.5–39.5…89.5–99.5.",
            "solution": "The chosen classes cover all 30 marks.",
            "diagram": {
              "type": "frequency-table",
              "rows": [
                [
                  "30–39",
                  34.5,
                  1
                ],
                [
                  "40–49",
                  44.5,
                  4
                ],
                [
                  "50–59",
                  54.5,
                  4
                ],
                [
                  "60–69",
                  64.5,
                  8
                ],
                [
                  "70–79",
                  74.5,
                  6
                ],
                [
                  "80–89",
                  84.5,
                  5
                ],
                [
                  "90–99",
                  94.5,
                  2
                ]
              ],
              "title": "Quiz marks"
            }
          },
          {
            "num": "Q2",
            "question": "Essay mistakes: 4,7,12,9,21,16,3,19,17,24,14,15,8,13,11,16,15,6,5,8,11,20,18,22,6. Make a suitable frequency table and state the number of classes.",
            "finalAnswer": "For width 5, classes 0–4,5–9,10–14,15–19,20–24 have frequencies 2,7,5,7,4; there are 5 classes.",
            "solution": "Tally each value.",
            "diagram": {
              "type": "histogram",
              "bars": [
                {
                  "lower": -0.5,
                  "upper": 4.5,
                  "frequency": 2
                },
                {
                  "lower": 4.5,
                  "upper": 9.5,
                  "frequency": 7
                },
                {
                  "lower": 9.5,
                  "upper": 14.5,
                  "frequency": 5
                },
                {
                  "lower": 14.5,
                  "upper": 19.5,
                  "frequency": 7
                },
                {
                  "lower": 19.5,
                  "upper": 24.5,
                  "frequency": 4
                }
              ],
              "title": "Essay mistakes"
            }
          },
          {
            "num": "Q3",
            "question": "Draw a histogram: classes 20–24,25–29,30–34,35–39,40–44,45–49,50–54; frequencies 1,3,4,5,4,2,1.",
            "finalAnswer": "Draw adjacent bars at those boundaries with heights 1,3,4,5,4,2,1.",
            "solution": "Use class boundaries.",
            "diagram": {
              "type": "histogram",
              "bars": [
                {
                  "lower": 19.5,
                  "upper": 24.5,
                  "frequency": 1
                },
                {
                  "lower": 24.5,
                  "upper": 29.5,
                  "frequency": 3
                },
                {
                  "lower": 29.5,
                  "upper": 34.5,
                  "frequency": 4
                },
                {
                  "lower": 34.5,
                  "upper": 39.5,
                  "frequency": 5
                },
                {
                  "lower": 39.5,
                  "upper": 44.5,
                  "frequency": 4
                },
                {
                  "lower": 44.5,
                  "upper": 49.5,
                  "frequency": 2
                },
                {
                  "lower": 49.5,
                  "upper": 54.5,
                  "frequency": 1
                }
              ],
              "title": "Exercise 6.1 Q3"
            }
          },
          {
            "num": "Q4",
            "question": "Weights (kg): 25,30,32,29,24,40,36,37,28,27,41,42,35,39,31,32,34,42,40,43,36,26,22,23,42,39,35,41,39,29. Make a suitable frequency table, histogram and frequency polygon.",
            "finalAnswer": "Width-5 classes 20–24,25–29,30–34,35–39,40–44 have f=3,6,5,8,8; marks 22,27,32,37,42.",
            "solution": "The polygon joins class marks to frequencies.",
            "diagram": {
              "type": "histogram-polygon",
              "bars": [
                {
                  "lower": 19.5,
                  "upper": 24.5,
                  "frequency": 3
                },
                {
                  "lower": 24.5,
                  "upper": 29.5,
                  "frequency": 6
                },
                {
                  "lower": 29.5,
                  "upper": 34.5,
                  "frequency": 5
                },
                {
                  "lower": 34.5,
                  "upper": 39.5,
                  "frequency": 8
                },
                {
                  "lower": 39.5,
                  "upper": 44.5,
                  "frequency": 8
                }
              ],
              "points": [
                [
                  17,
                  0
                ],
                [
                  22,
                  3
                ],
                [
                  27,
                  6
                ],
                [
                  32,
                  5
                ],
                [
                  37,
                  8
                ],
                [
                  42,
                  8
                ],
                [
                  47,
                  0
                ]
              ],
              "title": "Weight histogram and frequency polygon"
            }
          },
          {
            "num": "Q5",
            "question": "Homework hours: 4,4,6,3,1,2,2,3,1,4,1,2,5,3,4,5,2,2,3,1,3,1,2,2,3,1,4,2,6,2. Make a frequency table and histogram.",
            "finalAnswer": "Frequencies for 1–6 hours: 6,9,6,5,2,2.",
            "solution": "The total frequency is 30.",
            "diagram": {
              "type": "category-bars",
              "labels": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
              ],
              "values": [
                6,
                9,
                6,
                5,
                2,
                2
              ],
              "xLabel": "Hours",
              "yLabel": "Frequency",
              "title": "Homework time"
            }
          },
          {
            "num": "Activity",
            "question": "Survey classmates on how many minutes they take to get ready for school; record about 20 responses and make a grouped frequency table.",
            "finalAnswer": "Answers depend on the survey.",
            "solution": "Choose class intervals and tally the responses."
          }
        ]
      },
      {
        "exercise": "6.2",
        "title": "Exercise 6.2",
        "page": 132,
        "problems": [
          {
            "num": "Q1",
            "question": "Wages (Rs.): 60,75,80,85,90,84,70,73,76,84,95,100,150,66,58,90,98,120,77,90. Use class interval 10; make a cumulative table and polygon.",
            "finalAnswer": "Classes 50–59…150–159 have f=1,2,5,4,5,1,0,1,0,0,1; c.f.=1,3,8,12,17,18,18,19,19,19,20.",
            "solution": {
              "type": "ogive",
              "points": [
                [
                  49.5,
                  0
                ],
                [
                  59.5,
                  1
                ],
                [
                  69.5,
                  3
                ],
                [
                  79.5,
                  8
                ],
                [
                  89.5,
                  12
                ],
                [
                  99.5,
                  17
                ],
                [
                  109.5,
                  18
                ],
                [
                  119.5,
                  18
                ],
                [
                  129.5,
                  19
                ],
                [
                  139.5,
                  19
                ],
                [
                  149.5,
                  19
                ],
                [
                  159.5,
                  20
                ]
              ],
              "title": "Wage ogive"
            }
          },
          {
            "num": "Q2",
            "question": "Age classes 20–24,25–29,30–39,40–44,45–49,50–54,55–59 have frequencies 1,2,26,22,20,15,14. Make a cumulative frequency table.",
            "finalAnswer": "Cumulative frequencies 1,3,29,51,71,86,100.",
            "solution": {
              "type": "frequency-table",
              "rows": [
                [
                  "20–24",
                  1,
                  1
                ],
                [
                  "25–29",
                  2,
                  3
                ],
                [
                  "30–39",
                  26,
                  29
                ],
                [
                  "40–44",
                  22,
                  51
                ],
                [
                  "45–49",
                  20,
                  71
                ],
                [
                  "50–54",
                  15,
                  86
                ],
                [
                  "55–59",
                  14,
                  100
                ]
              ],
              "title": "Age c.f."
            }
          },
          {
            "num": "Q3",
            "question": "Rainfall (mm): Sun 70, Mon 40, Tue 30, Wed 35, Thu 50, Fri 55, Sat 80. Draw a cumulative frequency graph.",
            "finalAnswer": "Running totals 70,110,140,175,225,280,360.",
            "solution": {
              "type": "ogive",
              "points": [
                [
                  1,
                  70
                ],
                [
                  2,
                  110
                ],
                [
                  3,
                  140
                ],
                [
                  4,
                  175
                ],
                [
                  5,
                  225
                ],
                [
                  6,
                  280
                ],
                [
                  7,
                  360
                ]
              ],
              "title": "Cumulative rainfall",
              "xLabel": "Day",
              "yLabel": "Rainfall (mm)"
            }
          },
          {
            "num": "Q4",
            "question": "For marks classes 40–49,50–59,60–69,70–79,80–89,90–99 with frequencies 1,2,3,4,5,6, draw less-than and more-than cumulative polygons.",
            "finalAnswer": "Less-than c.f. 1,3,6,10,15,21. More-than c.f. at lower boundaries 21,20,18,15,11,6,0.",
            "solution": {
              "type": "ogive-pair",
              "points": [],
              "title": "Less-than and more-than ogives",
              "series": [
                {
                  "name": "Less than",
                  "points": [
                    [
                      39.5,
                      0
                    ],
                    [
                      49.5,
                      1
                    ],
                    [
                      59.5,
                      3
                    ],
                    [
                      69.5,
                      6
                    ],
                    [
                      79.5,
                      10
                    ],
                    [
                      89.5,
                      15
                    ],
                    [
                      99.5,
                      21
                    ]
                  ]
                },
                {
                  "name": "More than",
                  "points": [
                    [
                      39.5,
                      21
                    ],
                    [
                      49.5,
                      20
                    ],
                    [
                      59.5,
                      18
                    ],
                    [
                      69.5,
                      15
                    ],
                    [
                      79.5,
                      11
                    ],
                    [
                      89.5,
                      6
                    ],
                    [
                      99.5,
                      0
                    ]
                  ]
                }
              ]
            }
          },
          {
            "num": "Q5",
            "question": "Using Q4, find students scoring more than 50, less than 70, between 50 and 70; class interval; lower boundary of class 5.",
            "finalAnswer": "Textbook grouped-class counts: 20, 6, 5; interval=10; fifth-class lower boundary=79.5.",
            "solution": "“More than 50” cuts through the 50–59 group, so the exact count is not available from grouped data; 20 counts the 50–99 classes as the book’s intended reading."
          },
          {
            "num": "Q6",
            "question": "Salary classes Rs.4000–5000,5001–6000,6001–7000,7001–8000,8001–9000,9001–10000,10001–11000 have frequencies 3,5,12,9,5,4,2. Construct an ogive.",
            "finalAnswer": "Cumulative frequencies 3,8,20,29,34,38,40.",
            "solution": {
              "type": "ogive",
              "points": [
                [
                  3999.5,
                  0
                ],
                [
                  5000.5,
                  3
                ],
                [
                  6000.5,
                  8
                ],
                [
                  7000.5,
                  20
                ],
                [
                  8000.5,
                  29
                ],
                [
                  9000.5,
                  34
                ],
                [
                  10000.5,
                  38
                ],
                [
                  11000.5,
                  40
                ]
              ],
              "title": "Salary ogive",
              "xLabel": "Salary (Rs.)"
            }
          }
        ]
      },
      {
        "exercise": "6.3",
        "title": "Exercise 6.3",
        "page": 152,
        "problems": [
          {
            "num": "Q1",
            "question": "Weights (kg) 45,30,25,36,42,27,31,43,49,50. Find the mean.",
            "finalAnswer": "378/10=37.8 kg.",
            "solution": "378/10=37.8 kg."
          },
          {
            "num": "Q2",
            "question": "Find the mean in Q1 by the short-cut method.",
            "finalAnswer": "Choose a=36; Σd=18; mean=36+18/10=37.8.",
            "solution": "Choose a=36; Σd=18; mean=36+18/10=37.8."
          },
          {
            "num": "Q3",
            "question": "Using an assumed mean, find the mean of 1242,1248,1252,1244,1249.",
            "finalAnswer": "Choose a=1248; Σd=−5; mean=1247.",
            "solution": "Choose a=1248; Σd=−5; mean=1247."
          },
          {
            "num": "Q4",
            "question": "Scores (out of 75): classes 0–15,16–31,32–47,48–63,64–75; f=0,10,40,70,45. Find the mean.",
            "finalAnswer": "Using marks 7.5,23.5,39.5,55.5,69.5: Σf=165, Σfx=8827.5; mean=53.5.",
            "solution": {
              "type": "frequency-table",
              "rows": [
                [
                  "0–15",
                  7.5,
                  0
                ],
                [
                  "16–31",
                  23.5,
                  10
                ],
                [
                  "32–47",
                  39.5,
                  40
                ],
                [
                  "48–63",
                  55.5,
                  70
                ],
                [
                  "64–75",
                  69.5,
                  45
                ]
              ],
              "title": "Grouped mean"
            }
          },
          {
            "num": "Q5(i)",
            "question": "Find the median of heights 64,65,65,66,66,67 inches.",
            "finalAnswer": "65.5 inches.",
            "solution": "65.5 inches."
          },
          {
            "num": "Q5(ii)",
            "question": "Find the median of salaries Rs.7000,6600,8000,4500,7500,11000,9000,7500.",
            "finalAnswer": "7500.",
            "solution": "The book says 9 workers but lists 8 values; the listed data give median 7500."
          },
          {
            "num": "Q6",
            "question": "For 58,59,60,62,64,64,65,67,67,68,70,71,71,71,73, find A.M., G.M., median and mode.",
            "finalAnswer": "A.M.=66; G.M.≈65.84; median=67; mode=71.",
            "solution": "A.M.=66; G.M.≈65.84; median=67; mode=71."
          },
          {
            "num": "Q7",
            "question": "For 148,145,160,157,156,160, show Mode>Median>Mean.",
            "finalAnswer": "Mean≈154.33; median=156.5; mode=160.",
            "solution": "Mean≈154.33; median=156.5; mode=160."
          },
          {
            "num": "Q8",
            "question": "Wage classes 112–116,117–121,122–126,127–131,132–136 have f=3,20,11,4,5. Construct a table, find class boundaries, median, mode, H.M. and G.M.",
            "finalAnswer": "Boundaries 111.5–116.5 to 131.5–136.5; midpoints 114,119,124,129,134; median≈121.13; mode≈119.77; H.M.≈122.36; G.M.≈122.48.",
            "solution": {
              "type": "frequency-table",
              "rows": [
                [
                  "112–116",
                  "111.5–116.5",
                  114,
                  3
                ],
                [
                  "117–121",
                  "116.5–121.5",
                  119,
                  20
                ],
                [
                  "122–126",
                  "121.5–126.5",
                  124,
                  11
                ],
                [
                  "127–131",
                  "126.5–131.5",
                  129,
                  4
                ],
                [
                  "132–136",
                  "131.5–136.5",
                  134,
                  5
                ]
              ],
              "title": "Wage distribution"
            }
          },
          {
            "num": "Q9",
            "question": "Classes 10–14,15–19,20–24,25–29,30–34 have frequencies 1,3,7,12,2. Estimate median, Q₁, Q₃ and mode graphically.",
            "finalAnswer": "Median≈25.13; Q₁≈21.11; Q₃≈27.73; mode≈26.17.",
            "solution": {
              "type": "graphical-summary",
              "bars": [
                {
                  "lower": 9.5,
                  "upper": 14.5,
                  "frequency": 1
                },
                {
                  "lower": 14.5,
                  "upper": 19.5,
                  "frequency": 3
                },
                {
                  "lower": 19.5,
                  "upper": 24.5,
                  "frequency": 7
                },
                {
                  "lower": 24.5,
                  "upper": 29.5,
                  "frequency": 12
                },
                {
                  "lower": 29.5,
                  "upper": 34.5,
                  "frequency": 2
                }
              ],
              "points": [
                [
                  9.5,
                  0
                ],
                [
                  14.5,
                  1
                ],
                [
                  19.5,
                  4
                ],
                [
                  24.5,
                  11
                ],
                [
                  29.5,
                  23
                ],
                [
                  34.5,
                  25
                ]
              ],
              "median": 25.13,
              "q1": 21.11,
              "q3": 27.73,
              "mode": 26.17,
              "title": "Median, quartiles and mode"
            }
          }
        ]
      },
      {
        "exercise": "6.4",
        "title": "Exercise 6.4",
        "page": 157,
        "problems": [
          {
            "num": "Q1",
            "question": "Find the range of 11,13,15,21,19,23.",
            "finalAnswer": "23−11=12.",
            "solution": "23−11=12."
          },
          {
            "num": "Q2",
            "question": "Waiting times: 5.90,9.66,5.79,8.02,8.73,8.01,10.49,8.35,6.68,5.64,5.47,9.91. Find mean, median and S.D.",
            "finalAnswer": "Mean≈7.7208; median=8.015; population S.D.≈1.7159.",
            "solution": "Mean≈7.7208; median=8.015; population S.D.≈1.7159."
          },
          {
            "num": "Q3",
            "question": "For x=5,10,11,13,15 and f=2,3,4,1,5, find range, variance and S.D.",
            "finalAnswer": "Range=10; mean≈11.4667; variance≈10.3822; S.D.≈3.2221.",
            "solution": "Range=10; mean≈11.4667; variance≈10.3822; S.D.≈3.2221."
          },
          {
            "num": "Q4",
            "question": "Section A marks 7,9,6,9,4,7,5,8,8,7; Section B 6,10,6,4,2,8,10,6,9,9. Find each mean and variance.",
            "finalAnswer": "A: mean=7, variance=2.4. B: mean=7, variance=6.4.",
            "solution": "The book uses population variance."
          },
          {
            "num": "Q5",
            "question": "Eight students’ Maths marks 54,63,59,45,52,35,61,68; Physics marks 52,55,57,51,56,58,50,59. Compare S.D. and consistency.",
            "finalAnswer": "Maths S.D.≈9.96; Physics S.D.≈3.15; Physics is more consistent.",
            "solution": "Maths S.D.≈9.96; Physics S.D.≈3.15; Physics is more consistent."
          },
          {
            "num": "Q6",
            "question": "Defective-bulb classes 0–2,2–4,4–6,6–8,8–10 have frequencies 1,3,15,10,2. Find variance and S.D.",
            "finalAnswer": "Using the table: Σf=31; mean≈5.58; variance≈2.89; S.D.≈1.70.",
            "solution": "The page says 30 packs, but its printed frequencies total 31; calculations follow the table."
          }
        ]
      },
      {
        "exercise": "Review Exercise 6",
        "title": "Exercise Review Exercise 6",
        "page": 158,
        "problems": [
          {
            "num": "Q1",
            "question": "Choose one for each: (i) difference between upper limits of consecutive classes: class limit/class interval/class mark/range; (ii) cumulative-frequency polygon: histogram/ogive/pie chart/frequency polygon; (iii) occurrences of a value: frequency/average/mode/median; (iv) mode of 3,2,1,1,1,5,3,1,2,1,2; (v) which set has mean, median, mode and range all equal: {1,2,3,3,2,1,2}, {1,3,3,3,2,3,1}, {1,2,3,1,2,3,1}, {2,2,1,2,3,2,3}; (vi) nth root of product: arithmetic/harmonic/geometric mean/standard deviation; (vii) median of 63,65,66,67,69; (viii) median of 41,43,47,51,57,52,59; (ix) mode of 5,7,7,5,3,7,2,8,2; (x) S.D. of seven 5s; (xi) total for 30 students averaging Rs.20; (xii) mean if 30 observations total 1500; (xiii) largest minus smallest: mean/mode/range/S.D.; (xiv) Σx/n gives which measure; (xv) mean(B)−median(A) for A={2,−1,7,−4,11,3}, B={12,5,−3,4,7,−7}; (xvi) Σf(x−x̄)²/Σf; (xvii) most frequent value.",
            "finalAnswer": "(i) class interval; (ii) ogive; (iii) frequency; (iv) 1; (v) first set; (vi) geometric mean; (vii) 66; (viii) 51; (ix) 7; (x) 0; (xi) Rs.600; (xii) 50; (xiii) range; (xiv) arithmetic mean; (xv) 0.5; (xvi) variance; (xvii) mode.",
            "solution": "(i) class interval; (ii) ogive; (iii) frequency; (iv) 1; (v) first set; (vi) geometric mean; (vii) 66; (viii) 51; (ix) 7; (x) 0; (xi) Rs.600; (xii) 50; (xiii) range; (xiv) arithmetic mean; (xv) 0.5; (xvi) variance; (xvii) mode."
          },
          {
            "num": "Q2",
            "question": "Ages of 27 students: 17,17,16,16,17,16,16,17,18,18,15,17,19,18,18,17,16,15,16,17,15,19,19,15,15,16,18. Make a suitable frequency table.",
            "finalAnswer": "Ages 15,16,17,18,19 have frequencies 5,7,7,5,3.",
            "solution": {
              "type": "category-bars",
              "labels": [
                "15",
                "16",
                "17",
                "18",
                "19"
              ],
              "values": [
                5,
                7,
                7,
                5,
                3
              ],
              "xLabel": "Age",
              "yLabel": "Frequency",
              "title": "Ages of 27 students"
            }
          },
          {
            "num": "Q3",
            "question": "Car brands A,B,C,D,E sold 100,120,110,72,169 in a month. Prepare the graph requested in the book.",
            "finalAnswer": "Bars A–E have heights 100,120,110,72,169.",
            "solution": "The book calls this a histogram; as the horizontal values are categories it is shown as a bar chart.",
            "diagram": {
              "type": "category-bars",
              "labels": [
                "A",
                "B",
                "C",
                "D",
                "E"
              ],
              "values": [
                100,
                120,
                110,
                72,
                169
              ],
              "xLabel": "Car brand",
              "yLabel": "Sales",
              "title": "Monthly car sales"
            }
          },
          {
            "num": "Q4",
            "question": "Draw a frequency polygon for score classes 0–10,11–21,22–32,33–43,44–50 with frequencies 2,7,25,11,5.",
            "finalAnswer": "Class marks 5,16,27,38,47; plot against 2,7,25,11,5 and close with zero endpoints.",
            "solution": {
              "type": "frequency-polygon",
              "points": [
                [
                  -6,
                  0
                ],
                [
                  5,
                  2
                ],
                [
                  16,
                  7
                ],
                [
                  27,
                  25
                ],
                [
                  38,
                  11
                ],
                [
                  47,
                  5
                ],
                [
                  54,
                  0
                ]
              ],
              "title": "Review frequency polygon"
            }
          },
          {
            "num": "Q5",
            "question": "For 250 boys, weights 44.0–47.9,48.0–51.9,52.0–55.9,56.0–59.9,60.0–63.9,64.0–67.9,68.0–71.9 kg have frequencies 13,17,50,81,57,23,9. Draw a cumulative frequency polygon.",
            "finalAnswer": "Cumulative frequencies 13,30,80,161,218,241,250.",
            "solution": "The scan’s first frequency is faint (“*3”); 13 makes the stated total 250.",
            "diagram": {
              "type": "ogive",
              "points": [
                [
                  43.95,
                  0
                ],
                [
                  47.95,
                  13
                ],
                [
                  51.95,
                  30
                ],
                [
                  55.95,
                  80
                ],
                [
                  59.95,
                  161
                ],
                [
                  63.95,
                  218
                ],
                [
                  67.95,
                  241
                ],
                [
                  71.95,
                  250
                ]
              ],
              "title": "Cumulative weights"
            }
          },
          {
            "num": "Project",
            "question": "For the 53 scores on a 60-item test, the book asks for width-2 intervals beginning with printed 24.5–25.5, a frequency table, histogram, frequency polygon, cumulative frequencies and ogive, range, mean, S.D. and variance.",
            "finalAnswer": "With intended width-2 classes 24.5–26.5 through 54.5–56.5, frequencies are 2,1,4,2,5,3,5,2,8,3,3,4,2,4,4,1; c.f. 2,3,7,9,14,17,22,24,32,35,38,42,44,48,52,53. Range=30; mean≈40.83; population S.D.≈8.14; variance≈66.29.",
            "solution": "The printed starting interval 24.5–25.5 is width 1 although the instruction says class interval 2; the displayed working uses successive width-2 classes.",
            "diagram": {
              "type": "histogram-polygon",
              "bars": [
                {
                  "lower": 24.5,
                  "upper": 26.5,
                  "frequency": 2
                },
                {
                  "lower": 26.5,
                  "upper": 28.5,
                  "frequency": 1
                },
                {
                  "lower": 28.5,
                  "upper": 30.5,
                  "frequency": 4
                },
                {
                  "lower": 30.5,
                  "upper": 32.5,
                  "frequency": 2
                },
                {
                  "lower": 32.5,
                  "upper": 34.5,
                  "frequency": 5
                },
                {
                  "lower": 34.5,
                  "upper": 36.5,
                  "frequency": 3
                },
                {
                  "lower": 36.5,
                  "upper": 38.5,
                  "frequency": 5
                },
                {
                  "lower": 38.5,
                  "upper": 40.5,
                  "frequency": 2
                },
                {
                  "lower": 40.5,
                  "upper": 42.5,
                  "frequency": 8
                },
                {
                  "lower": 42.5,
                  "upper": 44.5,
                  "frequency": 3
                },
                {
                  "lower": 44.5,
                  "upper": 46.5,
                  "frequency": 3
                },
                {
                  "lower": 46.5,
                  "upper": 48.5,
                  "frequency": 4
                },
                {
                  "lower": 48.5,
                  "upper": 50.5,
                  "frequency": 2
                },
                {
                  "lower": 50.5,
                  "upper": 52.5,
                  "frequency": 4
                },
                {
                  "lower": 52.5,
                  "upper": 54.5,
                  "frequency": 4
                },
                {
                  "lower": 54.5,
                  "upper": 56.5,
                  "frequency": 1
                }
              ],
              "points": [
                [
                  23.5,
                  0
                ],
                [
                  25.5,
                  2
                ],
                [
                  27.5,
                  1
                ],
                [
                  29.5,
                  4
                ],
                [
                  31.5,
                  2
                ],
                [
                  33.5,
                  5
                ],
                [
                  35.5,
                  3
                ],
                [
                  37.5,
                  5
                ],
                [
                  39.5,
                  2
                ],
                [
                  41.5,
                  8
                ],
                [
                  43.5,
                  3
                ],
                [
                  45.5,
                  3
                ],
                [
                  47.5,
                  4
                ],
                [
                  49.5,
                  2
                ],
                [
                  51.5,
                  4
                ],
                [
                  53.5,
                  4
                ],
                [
                  55.5,
                  1
                ],
                [
                  57.5,
                  0
                ]
              ],
              "title": "Project scores"
            }
          }
        ]
      }
    ],
    "slos": [
      "Organize raw data in discrete and grouped frequency tables.",
      "Draw histograms, frequency polygons and ogives.",
      "Calculate arithmetic mean, median, mode, geometric mean and harmonic mean.",
      "Use weighted means, moving averages and graphical estimates of median, quartiles and mode.",
      "Calculate range, variance and standard deviation."
    ],
    "formulaSheet": [
      {
        "name": "Arithmetic mean",
        "formula": "x̄=Σx/n; grouped x̄=Σfx/Σf"
      },
      {
        "name": "Grouped median",
        "formula": "l+(h/f)(n/2−c)"
      },
      {
        "name": "Grouped mode",
        "formula": "l+[(fₘ−f₀)/(2fₘ−f₀−f₁)]h"
      },
      {
        "name": "Geometric mean",
        "formula": "antilog(Σlog x/n); grouped: antilog(Σf log x/Σf)"
      },
      {
        "name": "Harmonic mean",
        "formula": "n/Σ(1/x); grouped: Σf/Σ(f/x)"
      },
      {
        "name": "Weighted mean",
        "formula": "Σwx/Σw"
      },
      {
        "name": "Range",
        "formula": "max−min"
      },
      {
        "name": "Variance and S.D.",
        "formula": "S²=Σ(x−x̄)²/n; S=√S²"
      },
      {
        "name": "Quartiles",
        "formula": "Q₁ at n/4; Q₃ at 3n/4; IQR=Q₃−Q₁"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 7,
    "id": "u7",
    "title": "Introduction to Trigonometry",
    "titleUrdu": "مثلثیات کا تعارف",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 162–192",
    "pageRange": "Pages 162–192",
    "description": "The lessons follow sections 7.1–7.5, Examples 1–22, Exercises 7.1–7.6 and Review Exercise 7 in the printed order. Angle, circle, unit-circle, triangle and elevation figures are included with the matching material.",
    "sections": [
      {
        "id": "7.1",
        "title": "7.1 Measurement of Angles",
        "page": 164,
        "theory": "The unit opens with angle measure and the sexagesimal system. A full turn is 360°, a straight angle is 180°, and a right angle is 90°. The initial side and terminal side show the direction and size of a rotation.",
        "rules": [
          "One complete rotation = 360° = 2π radians.",
          "An angle is positive when measured anticlockwise and negative when measured clockwise."
        ]
      },
      {
        "id": "7.1.1",
        "title": "7.1.1 Sexagesimal System (Degree, Minute and Second)",
        "page": 164,
        "theory": "The sexagesimal system uses base 60. A degree is divided into 60 minutes and each minute into 60 seconds. Angles are written in D°M′S″ form.",
        "rules": [
          "1° = 60′; 1′ = 60″; 1° = 3600″.",
          "To convert D°M′S″ to decimal degrees, use D + M/60 + S/3600."
        ],
        "diagram": {
          "type": "quadrants",
          "title": "Initial side and terminal side of an angle"
        }
      },
      {
        "id": "7.1.2",
        "title": "7.1.2 Conversion of D°M′S″ Form into Decimal Form and Vice Versa",
        "page": 165,
        "theory": "Convert minutes and seconds to fractions of a degree for decimal form. For the reverse conversion, take the whole degree part first, multiply the remaining decimal by 60 to get minutes, then multiply the remaining fraction by 60 to get seconds.",
        "rules": [
          "Decimal degrees = D + M/60 + S/3600.",
          "For decimal-to-DMS conversion, retain the whole degree, then convert the fractional parts successively by 60."
        ]
      },
      {
        "id": "7.1.3",
        "title": "7.1.3 Circular System (Radians)",
        "page": 165,
        "theory": "A radian is the angle subtended at the centre of a circle by an arc whose length equals the radius. If an arc has length ℓ in a circle of radius r, its radian measure is θ = ℓ/r.",
        "rules": [
          "θ = ℓ/r radians.",
          "One complete rotation measures 2π radians."
        ],
        "diagram": {
          "type": "sector",
          "title": "Radian measure is arc length divided by radius",
          "radius": "r",
          "angle": "1 rad"
        }
      },
      {
        "id": "7.1.4",
        "title": "7.1.4 Relation Between Radians and Degrees",
        "page": 166,
        "theory": "A complete circumference has length 2πr and subtends 360°. Therefore 2π radians = 360°, giving the conversion between degree and radian measure.",
        "rules": [
          "π radians = 180°.",
          "Degrees to radians: multiply by π/180. Radians to degrees: multiply by 180/π.",
          "1 radian ≈ 57.296°; 1° ≈ 0.01745 radian."
        ]
      },
      {
        "id": "7.2.1",
        "title": "7.2.1 Length of an Arc of a Circle",
        "page": 168,
        "theory": "For a circle of radius r and central angle θ measured in radians, the arc length is proportional to the radius and angle.",
        "rules": [
          "ℓ = rθ, with θ in radians.",
          "For n complete revolutions, distance travelled on the circle is 2πrn."
        ],
        "diagram": {
          "type": "sector",
          "title": "Arc length ℓ=rθ",
          "radius": "r",
          "angle": "θ"
        }
      },
      {
        "id": "7.2.2",
        "title": "7.2.2 Area of a Sector",
        "page": 170,
        "theory": "A sector is the region enclosed by two radii and the intercepted arc. Its area is the fraction θ/(2π) of the circle’s area when θ is measured in radians.",
        "rules": [
          "A = ½r²θ, with θ in radians.",
          "If θ is given in degrees, first convert it to radians."
        ],
        "diagram": {
          "type": "sector",
          "title": "Area of a sector A=½r²θ",
          "radius": "r",
          "angle": "θ"
        }
      },
      {
        "id": "7.3.1",
        "title": "7.3.1 General Angles (Coterminal Angles)",
        "page": 172,
        "theory": "Angles with the same initial and terminal sides are coterminal. Their measures differ by an integer multiple of one complete turn.",
        "rules": [
          "In degrees, coterminal angles differ by 360°k.",
          "In radians, coterminal angles differ by 2πk."
        ],
        "diagram": {
          "type": "quadrants",
          "title": "Coterminal angles share a terminal side"
        }
      },
      {
        "id": "7.3.2",
        "title": "7.3.2 Angles in Standard Position, Quadrants and Quadrantal Angles",
        "page": 173,
        "theory": "An angle is in standard position when its vertex is at the origin and its initial side lies on the positive x-axis. Its quadrant is determined by the terminal side. Quadrantal angles have terminal sides on an axis.",
        "rules": [
          "Quadrant I: x>0,y>0; II: x<0,y>0; III: x<0,y<0; IV: x>0,y<0.",
          "Quadrantal angles include 0°, 90°, 180°, 270° and 360°."
        ],
        "diagram": {
          "type": "quadrants",
          "title": "Quadrants and signs of coordinates"
        }
      },
      {
        "id": "7.3.3",
        "title": "7.3.3 Trigonometric Ratios",
        "page": 174,
        "theory": "For an acute angle in a right triangle, sine, cosine and tangent are ratios of side lengths. Their reciprocals are cosecant, secant and cotangent. The unit-circle definition extends these ratios to general angles.",
        "rules": [
          "sinθ = opposite/hypotenuse; cosθ = adjacent/hypotenuse; tanθ = opposite/adjacent.",
          "cosecθ = 1/sinθ; secθ = 1/cosθ; cotθ = 1/tanθ.",
          "On the unit circle, a point P(x,y) at angle θ gives cosθ=x and sinθ=y."
        ],
        "diagram": {
          "type": "unit-circle",
          "title": "Trigonometric ratios from a unit-circle point",
          "angle": 45
        }
      },
      {
        "id": "7.3.4",
        "title": "7.3.4 Values of Trigonometric Ratios for 30°, 45° and 60°",
        "page": 176,
        "theory": "The special-angle values are obtained from 30°–60°–90° and 45°–45°–90° triangles. The reciprocal ratios follow by taking reciprocals.",
        "rules": [
          "sin30°=½, sin45°=1/√2, sin60°=√3/2.",
          "cos30°=√3/2, cos45°=1/√2, cos60°=½.",
          "tan30°=1/√3, tan45°=1, tan60°=√3."
        ],
        "diagram": {
          "type": "right-triangle",
          "title": "Special-angle right triangles",
          "angle": "30°, 45°, 60°"
        }
      },
      {
        "id": "7.3.5",
        "title": "7.3.5 Signs of Trigonometric Ratios in the Quadrants",
        "page": 176,
        "theory": "The signs of the six trigonometric ratios depend on the signs of x and y on the terminal side. The book summarizes the pattern by quadrant.",
        "rules": [
          "Quadrant I: all six ratios are positive.",
          "Quadrant II: sine and cosecant are positive.",
          "Quadrant III: tangent and cotangent are positive.",
          "Quadrant IV: cosine and secant are positive."
        ]
      },
      {
        "id": "7.3.6",
        "title": "7.3.6 Finding the Remaining Trigonometric Ratios When One Is Given",
        "page": 178,
        "theory": "Represent a terminal point by coordinates (x,y), use the given ratio to determine a side relationship, and apply x²+y²=r². The quadrant fixes the signs of x and y.",
        "rules": [
          "Use r²=x²+y².",
          "Apply the sign of each coordinate from the stated quadrant before writing the six ratios."
        ]
      },
      {
        "id": "7.3.7",
        "title": "7.3.7 Trigonometric Ratios of 0°, 90°, 180°, 270° and 360°",
        "page": 180,
        "theory": "The unit circle gives the trigonometric ratios at quadrantal angles. Ratios with zero denominator are undefined.",
        "rules": [
          "Use sinθ=y and cosθ=x on the unit circle.",
          "tanθ is undefined when cosθ=0; cotθ is undefined when sinθ=0."
        ]
      },
      {
        "id": "7.4",
        "title": "7.4 Trigonometric Identities",
        "page": 184,
        "theory": "The fundamental identities follow by dividing the Pythagorean relation for a right triangle by its hypotenuse, base or perpendicular squared. The examples use these identities to transform one side of an equation into the other.",
        "rules": [
          "cos²θ + sin²θ = 1.",
          "1 + tan²θ = sec²θ.",
          "1 + cot²θ = cosec²θ."
        ],
        "diagram": {
          "type": "right-triangle",
          "title": "Pythagorean relation gives the fundamental identities"
        }
      },
      {
        "id": "7.5",
        "title": "7.5 Angle of Elevation and Depression",
        "page": 187,
        "theory": "The angle of elevation is measured upward from a horizontal line of sight; the angle of depression is measured downward from a horizontal line of sight. Parallel horizontal lines make these angles equal to the corresponding alternate interior angles in the right-triangle model.",
        "rules": [
          "Draw a horizontal reference and a right triangle before choosing a ratio.",
          "tanθ = opposite/adjacent; sinθ = opposite/hypotenuse; cosθ = adjacent/hypotenuse."
        ],
        "diagram": {
          "type": "elevation",
          "title": "Horizontal line of sight and elevation/depression angles",
          "height": "object",
          "distance": "ground"
        }
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "number": 1,
        "page": 165,
        "sectionId": "7.1.2",
        "title": "Example 1 (p. 165)",
        "problem": "Convert 15°30′25″ to decimal form.",
        "given": "15°30′25″",
        "method": "D + M/60 + S/3600",
        "steps": [
          "30′ = 30/60 = 0.5°; 25″ = 25/3600 ≈ 0.00694°.",
          "15°30′25″ = 15 + 0.5 + 0.00694 = 15.50694°."
        ],
        "answer": "15.50694°"
      },
      {
        "id": "eg2",
        "number": 2,
        "page": 165,
        "sectionId": "7.1.2",
        "title": "Example 2 (p. 165)",
        "problem": "Convert 38.39° to D°M′S″ form.",
        "given": "38.39°",
        "method": "Repeated multiplication of the fractional part by 60",
        "steps": [
          "The whole-degree part is 38°.",
          "0.39×60 = 23.4′, so the minutes are 23′.",
          "0.4×60 = 24″."
        ],
        "answer": "38°23′24″"
      },
      {
        "id": "eg3",
        "number": 3,
        "page": 167,
        "sectionId": "7.1.4",
        "title": "Example 3 (p. 167)",
        "problem": "Convert 4π/7 radians to degrees.",
        "given": "4π/7 radians",
        "method": "Multiply by 180°/π",
        "steps": [
          "(4π/7)×(180°/π) = 720°/7 = 102.85714°.",
          "Convert the decimal fraction to minutes and seconds."
        ],
        "answer": "102°51′26″"
      },
      {
        "id": "eg4",
        "number": 4,
        "page": 167,
        "sectionId": "7.1.4",
        "title": "Example 4 (p. 167)",
        "problem": "Convert 31°45′ to radians.",
        "given": "31°45′ = 31.75°",
        "method": "Multiply by π/180",
        "steps": [
          "31.75×π/180 ≈ 0.5541 radians."
        ],
        "answer": "0.5541 radians"
      },
      {
        "id": "eg5",
        "number": 5,
        "page": 168,
        "sectionId": "7.2.1",
        "title": "Example 5 (p. 168)",
        "problem": "Find the length of an arc of a circle of radius 5 cm which subtends an angle 3π/4 radians at the centre.",
        "given": "r=5 cm, θ=3π/4",
        "method": "Arc length ℓ=rθ",
        "steps": [
          "ℓ=5×3π/4=15π/4 cm.",
          "15π/4≈11.78 cm."
        ],
        "answer": "15π/4 cm ≈ 11.78 cm",
        "diagram": {
          "type": "sector",
          "title": "Arc with radius 5 cm and central angle 3π/4",
          "radius": "5 cm",
          "angle": "3π/4"
        }
      },
      {
        "id": "eg6",
        "number": 6,
        "page": 168,
        "sectionId": "7.2.1",
        "title": "Example 6 (p. 168)",
        "problem": "Find the distance travelled by a cyclist moving on a circle of radius 15 m, if he makes 3.5 revolutions.",
        "given": "r=15 m; n=3.5",
        "method": "One revolution is 2π radians; use ℓ=rθ",
        "steps": [
          "θ=3.5×2π=7π radians.",
          "Distance=15×7π=105π m."
        ],
        "answer": "105π m ≈ 329.87 m",
        "diagram": {
          "type": "sector",
          "title": "Distance for 3.5 revolutions",
          "radius": "15 m",
          "angle": "7π"
        }
      },
      {
        "id": "eg7",
        "number": 7,
        "page": 169,
        "sectionId": "7.2.1",
        "title": "Example 7 (p. 169)",
        "problem": "An arc of length 2.5 cm in a circle of diameter 6 cm subtends angle θ at the centre. Find θ.",
        "given": "ℓ=2.5 cm; r=3 cm",
        "method": "θ=ℓ/r",
        "steps": [
          "θ=2.5/3=5/6 radians."
        ],
        "answer": "5/6 radians ≈ 0.833 radians",
        "diagram": {
          "type": "sector",
          "title": "Arc length 2.5 cm in a circle of radius 3 cm",
          "radius": "3 cm",
          "angle": "5/6"
        }
      },
      {
        "id": "eg8",
        "number": 8,
        "page": 169,
        "sectionId": "7.2.1",
        "title": "Example 8 (p. 169)",
        "problem": "An arc of length 5 cm subtends an angle of 60° at the centre. Find the radius.",
        "given": "ℓ=5 cm; θ=60°",
        "method": "Convert to radians, then use r=ℓ/θ",
        "steps": [
          "θ=60×π/180=π/3≈1.047 radians.",
          "r=5/(π/3)=15/π≈4.78 cm."
        ],
        "answer": "15/π cm ≈ 4.78 cm"
      },
      {
        "id": "eg9",
        "number": 9,
        "page": 170,
        "sectionId": "7.2.2",
        "title": "Example 9 (p. 170)",
        "problem": "Find the area of a sector with central angle 60° in a circular region of radius 5 cm.",
        "given": "r=5 cm; θ=60°",
        "method": "A=½r²θ, with θ in radians",
        "steps": [
          "θ=60×π/180=π/3≈1.047.",
          "A=½×25×π/3=25π/6 cm²."
        ],
        "answer": "25π/6 cm² ≈ 13.09 cm²",
        "diagram": {
          "type": "sector",
          "title": "Sector of radius 5 cm and central angle 60°",
          "radius": "5 cm",
          "angle": "60°"
        }
      },
      {
        "id": "eg10",
        "number": 10,
        "page": 173,
        "sectionId": "7.3.1",
        "title": "Example 10 (p. 173)",
        "problem": "Find coterminal angles of 60° and −60°.",
        "given": "Angles 60° and −60°",
        "method": "Add and subtract 360°",
        "steps": [
          "60°+360°=420° and 60°−360°=−300°.",
          "−60°+360°=300° and −60°−360°=−420°."
        ],
        "answer": "420°, −300°; and 300°, −420°",
        "diagram": {
          "type": "quadrants",
          "title": "Coterminal angles on coordinate axes",
          "angle": 60
        }
      },
      {
        "id": "eg11",
        "number": 11,
        "page": 177,
        "sectionId": "7.3.5",
        "title": "Example 11 (p. 177)",
        "problem": "Find the signs of the following ratios and state their quadrants: (i) sin105°, (ii) tan(−5π/6), (iii) sec1030°, (iv) cot710°.",
        "given": "Four angles",
        "method": "Reduce each angle to its quadrant and apply the quadrant sign pattern",
        "steps": [
          "105° is in quadrant II: sin105° is positive.",
          "−5π/6 is coterminal with 7π/6 in quadrant III: tangent is positive.",
          "1030° is coterminal with 310° in quadrant IV: secant is positive.",
          "710° is coterminal with 350° in quadrant IV: cotangent is negative."
        ],
        "answer": "(i) +, II; (ii) +, III; (iii) +, IV; (iv) −, IV",
        "diagram": {
          "type": "quadrants",
          "title": "Terminal sides in quadrants II, III and IV"
        }
      },
      {
        "id": "eg12",
        "number": 12,
        "page": 177,
        "sectionId": "7.3.5",
        "title": "Example 12 (p. 177)",
        "problem": "If tanθ<0 and cosθ>0, name the quadrant containing θ.",
        "given": "tanθ<0; cosθ>0",
        "method": "Intersect the possible quadrants",
        "steps": [
          "tanθ<0 in quadrants II or IV.",
          "cosθ>0 in quadrants I or IV.",
          "The common quadrant is IV."
        ],
        "answer": "Quadrant IV",
        "diagram": {
          "type": "quadrants",
          "title": "Sign conditions select quadrant IV",
          "quadrant": 4
        }
      },
      {
        "id": "eg13",
        "number": 13,
        "page": 178,
        "sectionId": "7.3.6",
        "title": "Example 13 (p. 178)",
        "problem": "If tanθ=1 and θ is in quadrant I, find the other trigonometric ratios.",
        "given": "tanθ=y/x=1; x=y=1",
        "method": "Use r²=x²+y², then form each ratio",
        "steps": [
          "r=√(1²+1²)=√2.",
          "sinθ=1/√2; cosθ=1/√2; cotθ=1.",
          "cosecθ=√2; secθ=√2."
        ],
        "answer": "sinθ=cosθ=1/√2; cotθ=1; cosecθ=secθ=√2",
        "diagram": {
          "type": "unit-circle",
          "title": "Point (1,1) in quadrant I",
          "angle": 45
        }
      },
      {
        "id": "eg14",
        "number": 14,
        "page": 178,
        "sectionId": "7.3.6",
        "title": "Example 14 (p. 178)",
        "problem": "Given tanθ=−2/3 and θ in quadrant II, find the other trigonometric ratios.",
        "given": "tanθ=y/x=−2/3; x=−3,y=2",
        "method": "Use r²=x²+y² and the quadrant signs",
        "steps": [
          "r=√(9+4)=√13.",
          "sinθ=2/√13; cosθ=−3/√13; cotθ=−3/2.",
          "cosecθ=√13/2; secθ=−√13/3."
        ],
        "answer": "sinθ=2/√13; cosθ=−3/√13; tanθ=−2/3; cotθ=−3/2; secθ=−√13/3; cosecθ=√13/2",
        "diagram": {
          "type": "unit-circle",
          "title": "Point (−3,2) in quadrant II",
          "x": -3,
          "y": 2
        }
      },
      {
        "id": "eg15",
        "number": 15,
        "page": 179,
        "sectionId": "7.3.6",
        "title": "Example 15 (p. 179)",
        "problem": "If cosθ=4/5 and θ is in quadrant IV, find the other trigonometric ratios.",
        "given": "x/r=4/5; quadrant IV",
        "method": "Use r²=x²+y² and choose y<0",
        "steps": [
          "Let x=4 and r=5. Then y²=25−16=9, so y=−3.",
          "sinθ=−3/5; tanθ=−3/4; cotθ=−4/3.",
          "secθ=5/4; cosecθ=−5/3."
        ],
        "answer": "sinθ=−3/5; tanθ=−3/4; cotθ=−4/3; secθ=5/4; cosecθ=−5/3",
        "diagram": {
          "type": "unit-circle",
          "title": "Point (4,−3) in quadrant IV",
          "x": 4,
          "y": -3
        }
      },
      {
        "id": "eg16",
        "number": 16,
        "page": 185,
        "sectionId": "7.4",
        "title": "Example 16 (p. 185)",
        "problem": "Show that (sinθ+cosθ)² = 1+2sinθcosθ.",
        "given": "Identity to prove",
        "method": "Expand and use sin²θ+cos²θ=1",
        "steps": [
          "(sinθ+cosθ)²=sin²θ+2sinθcosθ+cos²θ.",
          "Replace sin²θ+cos²θ by 1."
        ],
        "answer": "(sinθ+cosθ)²=1+2sinθcosθ"
      },
      {
        "id": "eg17",
        "number": 17,
        "page": 185,
        "sectionId": "7.4",
        "title": "Example 17 (p. 185)",
        "problem": "Prove that sinθ=√(1−cos²θ).",
        "given": "Fundamental identity",
        "method": "Rearrange cos²θ+sin²θ=1",
        "steps": [
          "sin²θ=1−cos²θ.",
          "Taking the nonnegative square root for the acute angle gives sinθ=√(1−cos²θ)."
        ],
        "answer": "sinθ=√(1−cos²θ)"
      },
      {
        "id": "eg18",
        "number": 18,
        "page": 185,
        "sectionId": "7.4",
        "title": "Example 18 (p. 185)",
        "problem": "Prove that √(1−sin²θ)/sinθ = cotθ.",
        "given": "Fundamental identity",
        "method": "Replace 1−sin²θ by cos²θ",
        "steps": [
          "√(1−sin²θ)/sinθ=√(cos²θ)/sinθ.",
          "For the acute-angle setting, √(cos²θ)=cosθ, so the expression is cosθ/sinθ=cotθ."
        ],
        "answer": "√(1−sin²θ)/sinθ=cotθ"
      },
      {
        "id": "eg19",
        "number": 19,
        "page": 186,
        "sectionId": "7.4",
        "title": "Example 19 (p. 186)",
        "problem": "Prove that sec²θ+tan²θ=(1+sin²θ)/(1−sin²θ).",
        "given": "Fundamental identity",
        "method": "Write over cos²θ and use cos²θ=1−sin²θ",
        "steps": [
          "sec²θ+tan²θ=1/cos²θ+sin²θ/cos²θ=(1+sin²θ)/cos²θ.",
          "Since cos²θ=1−sin²θ, the required expression follows."
        ],
        "answer": "sec²θ+tan²θ=(1+sin²θ)/(1−sin²θ)"
      },
      {
        "id": "eg20",
        "number": 20,
        "page": 187,
        "sectionId": "7.5",
        "title": "Example 20 (p. 187)",
        "problem": "An aerial photographer is 475 ft above the ground and 850 ft from a farmhouse. Find the angle of depression from the plane to the house.",
        "given": "Opposite side=475 ft; hypotenuse=850 ft",
        "method": "sinθ=opposite/hypotenuse",
        "steps": [
          "sinθ=475/850≈0.5588.",
          "θ=sin⁻¹(0.5588)≈34°."
        ],
        "answer": "About 34°",
        "diagram": {
          "type": "elevation",
          "title": "Plane, farmhouse and angle of depression",
          "height": "475 ft",
          "distance": "850 ft",
          "angle": "34°"
        }
      },
      {
        "id": "eg21",
        "number": 21,
        "page": 187,
        "sectionId": "7.5",
        "title": "Example 21 (p. 187)",
        "problem": "A vertical beam of light reaches a cloud. From a point 135 ft from the light source, the angle of elevation to the spot is 67.35°. Find the cloud height.",
        "given": "Horizontal distance=135 ft; θ=67.35°",
        "method": "tanθ=opposite/adjacent",
        "steps": [
          "tan67.35°=h/135.",
          "h=135tan67.35°≈324 ft."
        ],
        "answer": "About 324 ft",
        "diagram": {
          "type": "elevation",
          "title": "Cloud height from a ground observation point",
          "height": "h",
          "distance": "135 ft",
          "angle": "67.35°"
        }
      },
      {
        "id": "eg22",
        "number": 22,
        "page": 188,
        "sectionId": "7.5",
        "title": "Example 22 (p. 188)",
        "problem": "A lighthouse is 300 m above sea level. The angles of depression of two boats on the same side are 30° and 45°. Find the distance between the boats.",
        "given": "Height=300 m; depression angles=30°,45°",
        "method": "Use tanθ=height/horizontal distance",
        "steps": [
          "The nearer boat is at distance 300/tan45°=300 m from the foot.",
          "The farther boat is at distance 300/tan30°=300√3 m.",
          "Their separation is 300(√3−1)≈219.6 m."
        ],
        "answer": "300(√3−1) m ≈ 219.6 m",
        "diagram": {
          "type": "elevation",
          "title": "Lighthouse and two boats on the same side",
          "height": "300 m",
          "angle": "30° and 45°"
        }
      }
    ],
    "exercises": [
      {
        "exercise": "7.1",
        "title": "Exercise 7.1",
        "page": 167,
        "problems": [
          {
            "qNo": "1",
            "question": "Convert to decimal degrees: (i) 8°15′35″; (ii) 39°48′55″; (iii) 84°19′10″; (iv) 18°6′21″.",
            "solution": "For each angle compute D+M/60+S/3600.",
            "answer": "(i) 8.2597°; (ii) 39.8152°; (iii) 84.3194°; (iv) 18.1058°"
          },
          {
            "qNo": "2",
            "question": "Convert to D°M′S″: (i) 42.25°; (ii) 57.325°; (iii) 12.9956°; (iv) 32.625°.",
            "solution": "Separate the whole degree part, multiply the decimal part by 60 for minutes, then multiply the remaining part by 60 for seconds.",
            "answer": "(i) 42°15′; (ii) 57°19′30″; (iii) 12°59′44″; (iv) 32°37′30″"
          },
          {
            "qNo": "3",
            "question": "Convert to degrees: (i) 2 radians; (ii) 5π/3 radians; (iii) π/6 radians; (iv) −3π/4 radians.",
            "solution": "Multiply each radian measure by 180°/π.",
            "answer": "(i) ≈114.6°; (ii) 300°; (iii) 30°; (iv) −135°"
          },
          {
            "qNo": "4",
            "question": "Convert to radians: (i) 45°; (ii) 120°; (iii) −210°; (iv) 60°35′48″.",
            "solution": "Multiply the degree measure by π/180; convert DMS to decimal degrees first when needed.",
            "answer": "(i) π/4; (ii) 2π/3; (iii) −7π/6; (iv) ≈1.0576 radians"
          }
        ]
      },
      {
        "exercise": "7.2",
        "title": "Exercise 7.2",
        "page": 171,
        "problems": [
          {
            "qNo": "1",
            "question": "Find arc length ℓ when: (i) θ=π/6 rad, r=2 cm; (ii) θ=30°, r=6 cm; (iii) θ=4π/6 rad, r=6 cm.",
            "solution": "Use ℓ=rθ, converting degrees to radians.",
            "answer": "(i) π/3 cm; (ii) π cm; (iii) 4π cm",
            "diagram": {
              "type": "sector",
              "title": "Arc length, ℓ=rθ"
            }
          },
          {
            "qNo": "2",
            "question": "Find θ when: (i) ℓ=5 cm,r=2 cm; (ii) ℓ=30 cm,r=6 cm; (iii) ℓ=6 cm,r=2.87 cm.",
            "solution": "Use θ=ℓ/r.",
            "answer": "(i) 2.5 rad; (ii) 5 rad; (iii) ≈2.09 rad"
          },
          {
            "qNo": "3",
            "question": "Find r when: (i) θ=π/6 rad,ℓ=2 cm; (ii) θ=3½ rad,ℓ=4/7 m; (iii) θ=3π/4 rad,ℓ=15 cm.",
            "solution": "Use r=ℓ/θ.",
            "answer": "(i) 12/π cm ≈3.82 cm; (ii) 8/49 m ≈0.1632 m; (iii) 20/π cm ≈6.366 cm"
          },
          {
            "qNo": "4",
            "question": "Find the area of a sector of radius 4 m with central angle 12 radians.",
            "solution": "A=½r²θ=½×16×12.",
            "answer": "96 m²",
            "diagram": {
              "type": "sector",
              "title": "Sector of radius 4 m and angle 12 rad",
              "radius": "4 m",
              "angle": "12 rad"
            }
          },
          {
            "qNo": "5",
            "question": "A circle has radius 5 cm and a central angle of 30°. Find (i) the arc length and (ii) the area of the sector.",
            "solution": "Convert 30° to π/6 radians; use ℓ=rθ and A=½r²θ.",
            "answer": "(i) 5π/6 cm ≈2.62 cm; (ii) 25π/12 cm² ≈6.54 cm²",
            "diagram": {
              "type": "sector",
              "title": "30° sector of a circle with radius 5 cm",
              "radius": "5 cm",
              "angle": "30°"
            }
          },
          {
            "qNo": "6",
            "question": "An arc subtends 2 radians at the centre. If the sector area is 64 cm², find the circle’s radius.",
            "solution": "64=½r²×2, so r²=64.",
            "answer": "8 cm"
          },
          {
            "qNo": "7",
            "question": "A point moves on a circle of radius 10 m through 3.5 revolutions. Find the distance travelled.",
            "solution": "3.5 revolutions=7π radians; ℓ=rθ.",
            "answer": "70π m"
          },
          {
            "qNo": "8",
            "question": "What is the circular measure of the angle between the hands of a watch at 3 o’clock?",
            "solution": "A quarter-turn is 90°; convert to radians.",
            "answer": "π/2 radians"
          },
          {
            "qNo": "9",
            "question": "In the diagram, radius OB=8 cm and ∠AOB=90°. Find the length of the minor arc APB.",
            "solution": "ℓ=rθ with θ=π/2.",
            "answer": "4π cm",
            "diagram": {
              "type": "sector",
              "title": "Quarter-circle arc APB, radius 8 cm",
              "radius": "8 cm",
              "angle": "90°"
            }
          },
          {
            "qNo": "10",
            "question": "Find the area of sector OPR when r=6 cm and ∠POR=60°.",
            "solution": "A=½r²θ, with θ=π/3.",
            "answer": "6π cm²",
            "diagram": {
              "type": "sector",
              "title": "Sector OPR, radius 6 cm and angle 60°",
              "radius": "6 cm",
              "angle": "60°"
            }
          }
        ]
      },
      {
        "exercise": "7.3",
        "title": "Exercise 7.3",
        "page": 176,
        "problems": [
          {
            "qNo": "1",
            "question": "Find one positive and one negative coterminal angle for: (i) 55°; (ii) −45°; (iii) π/6; (iv) −3π/4.",
            "solution": "Add and subtract one full turn: 360° or 2π.",
            "answer": "(i) 415°,−305°; (ii) 315°,−405°; (iii) 13π/6,−11π/6; (iv) 5π/4,−11π/4",
            "diagram": {
              "type": "quadrants",
              "title": "Coterminal angles share a terminal side"
            }
          },
          {
            "qNo": "2",
            "question": "State the quadrant for: (i) 8π/5; (ii) 75°; (iii) −818°; (iv) −5π/4; (v) 103°.",
            "solution": "Reduce each angle to an equivalent angle between 0° and 360° (or 0 and 2π).",
            "answer": "(i) IV; (ii) I; (iii) III; (iv) II; (v) II",
            "diagram": {
              "type": "quadrants",
              "title": "Terminal sides in the four quadrants"
            }
          }
        ]
      },
      {
        "exercise": "7.4",
        "title": "Exercise 7.4",
        "page": 183,
        "problems": [
          {
            "qNo": "1",
            "question": "Find the sign and quadrant: (i) sin98°; (ii) sin160°; (iii) tan200°; (iv) sec120°; (v) cosec198°; (vi) sin460°.",
            "solution": "Reduce each angle to its quadrant and use the sign table.",
            "answer": "(i) +,II; (ii) +,II; (iii) +,III; (iv) −,II; (v) −,III; (vi) +,I",
            "diagram": {
              "type": "quadrants",
              "title": "Signs by quadrant"
            }
          },
          {
            "qNo": "2",
            "question": "Find all six trigonometric ratios of: (i) −180°; (ii) −270°; (iii) 720°; (iv) 1470°.",
            "solution": "Use coterminal quadrantal angles and the unit-circle coordinates; mark zero-denominator ratios undefined.",
            "answer": "(i) sin=0, cos=−1, tan=0, cosec undefined, sec=−1, cot undefined; (ii) sin=1, cos=0, tan undefined, cosec=1, sec undefined, cot=0; (iii) sin=0, cos=1, tan=0, cosec undefined, sec=1, cot undefined; (iv) same as 30°."
          },
          {
            "qNo": "3",
            "question": "If secθ=2 and θ lies in quadrant IV, find the other trigonometric ratios.",
            "solution": "cosθ=1/2; use a 30° reference triangle and quadrant signs.",
            "answer": "sinθ=−√3/2; tanθ=−√3; cotθ=−1/√3; cosecθ=−2/√3; secθ=2"
          },
          {
            "qNo": "4",
            "question": "If sinθ=4/5 and π/2<θ<π, find the other trigonometric ratios.",
            "solution": "Use r=5,y=4 and x<0 in quadrant II; x²=25−16.",
            "answer": "cosθ=−3/5; tanθ=−4/3; cotθ=−3/4; secθ=−5/3; cosecθ=5/4"
          },
          {
            "qNo": "5",
            "question": "Evaluate: (i) 2sin45°cos45°; (ii) (tan60°−tan30°)/(1+tan60°tan30°); (iii) cos45°/(sin45°+tan45°); (iv) tan30°tan60°+tan45°; (v) cos(π/3)cos(π/6)−sin(π/3)sin(π/6).",
            "solution": "Substitute the special-angle values and simplify.",
            "answer": "(i) 1; (ii) 1/√3; (iii) 1/(1+√2); (iv) 2; (v) 0"
          },
          {
            "qNo": "6",
            "question": "In which quadrant does θ lie? (i) sinθ>0,tanθ>0; (ii) sinθ<0,cotθ>0; (iii) sinθ>0,cosθ<0; (iv) cosθ>0,cosecθ<0; (v) tanθ<0,secθ>0; (vi) cosθ<0,tanθ<0.",
            "solution": "Combine the sign conditions for each ratio.",
            "answer": "(i) I; (ii) III; (iii) II; (iv) IV; (v) IV; (vi) III",
            "diagram": {
              "type": "quadrants",
              "title": "Determine a quadrant from ratio signs"
            }
          },
          {
            "qNo": "7",
            "question": "For each right triangle, find the missing side lengths to two decimal places: (i) hypotenuse 32, angle 53°; (ii) hypotenuse 73, angle 21°; (iii) base 12, angle 33°.",
            "solution": "Use sine, cosine or tangent according to the labelled sides in the printed diagrams.",
            "answer": "(i) adjacent≈19.25, opposite≈25.57; (ii) opposite≈26.16, adjacent≈68.15; (iii) opposite≈7.79, hypotenuse≈14.31",
            "diagram": {
              "type": "right-triangle",
              "title": "Three right-triangle exercises",
              "angle": "53°"
            }
          },
          {
            "qNo": "8",
            "question": "A surveyor measures a 750 yd baseline and a 24° angle to a point across a lake, as shown. Find the distance a across the lake.",
            "solution": "The right triangle has baseline 750 yd adjacent to 24° and lake width a opposite; use tan24°=a/750.",
            "answer": "a=750tan24°≈334 yd",
            "diagram": {
              "type": "right-triangle",
              "title": "Surveying the width of a lake",
              "angle": "24°",
              "adjacent": "750 yd",
              "opposite": "a"
            }
          }
        ]
      },
      {
        "exercise": "7.5",
        "title": "Exercise 7.5",
        "page": 186,
        "problems": [
          {
            "qNo": "1",
            "question": "Prove (sec²θ−1)cos²θ=sin²θ.",
            "solution": "sec²θ−1=tan²θ; tan²θ cos²θ=sin²θ.",
            "answer": "Proved."
          },
          {
            "qNo": "2",
            "question": "Prove tanθ+secθ=(1+sinθ)/cosθ.",
            "solution": "Write tanθ=sinθ/cosθ and secθ=1/cosθ.",
            "answer": "Proved."
          },
          {
            "qNo": "3",
            "question": "Prove (cosθ−sinθ)²=1−2sinθcosθ.",
            "solution": "Expand the square and use cos²θ+sin²θ=1.",
            "answer": "Proved."
          },
          {
            "qNo": "4",
            "question": "Prove cos²θ−sin²θ=2cos²θ−1.",
            "solution": "Replace sin²θ by 1−cos²θ.",
            "answer": "Proved."
          },
          {
            "qNo": "5",
            "question": "Prove tanθ+cotθ=secθ cosecθ.",
            "solution": "Combine sinθ/cosθ+cosθ/sinθ over sinθcosθ.",
            "answer": "Proved."
          },
          {
            "qNo": "6",
            "question": "Prove (1−sinθ)/cosθ=cosθ/(1+sinθ).",
            "solution": "Rationalize the left side using 1−sin²θ=cos²θ.",
            "answer": "Proved."
          },
          {
            "qNo": "7",
            "question": "Prove sinθ√(1+tan²θ)=tanθ.",
            "solution": "Use 1+tan²θ=sec²θ and the acute-angle setting.",
            "answer": "Proved."
          },
          {
            "qNo": "8",
            "question": "Prove cosθ=√(1−sin²θ).",
            "solution": "Use cos²θ+sin²θ=1 and the acute-angle setting.",
            "answer": "Proved."
          },
          {
            "qNo": "9",
            "question": "Prove (1+cosθ)(1−cosθ)=1/cosec²θ.",
            "solution": "The left side is 1−cos²θ=sin²θ; the right side is sin²θ.",
            "answer": "Proved."
          },
          {
            "qNo": "10",
            "question": "Prove cosx−cosx sin²x=cos³x.",
            "solution": "Factor cosx and use 1−sin²x=cos²x.",
            "answer": "Proved."
          },
          {
            "qNo": "11",
            "question": "Prove sinx/(1+cosx)+(1+cosx)/sinx=2cosecx.",
            "solution": "Use the common denominator sinx(1+cosx) and simplify with sin²x=1−cos²x.",
            "answer": "Proved."
          },
          {
            "qNo": "12",
            "question": "Prove sinx/(1+cosx)=(1−cosx)/sinx.",
            "solution": "Cross-multiply; both sides reduce to sin²x=1−cos²x.",
            "answer": "Proved."
          },
          {
            "qNo": "13",
            "question": "Prove 1/(1+cosa)+1/(1−cosa)=2+2cot²a.",
            "solution": "Combine the fractions to get 2/sin²a=2cosec²a=2+2cot²a.",
            "answer": "Proved."
          },
          {
            "qNo": "14",
            "question": "Prove cos⁴b−sin⁴b=1−2sin²b.",
            "solution": "Factor as (cos²b−sin²b)(cos²b+sin²b)=cos²b−sin²b.",
            "answer": "Proved."
          },
          {
            "qNo": "15",
            "question": "Prove (siny+cosy)/siny+(cosy−siny)/cosy=secy cosecy.",
            "solution": "Combine the two fractions over siny cosy and use sin²y+cos²y=1.",
            "answer": "Proved."
          },
          {
            "qNo": "16",
            "question": "Prove (secx−tanx)²=(1−sinx)/(1+sinx).",
            "solution": "Write secx−tanx=(1−sinx)/cosx and square; use cos²x=(1−sinx)(1+sinx).",
            "answer": "Proved."
          },
          {
            "qNo": "17",
            "question": "Prove sinx tanx+cosx=secx.",
            "solution": "sinx tanx+cosx=sin²x/cosx+cosx=(sin²x+cos²x)/cosx.",
            "answer": "Proved."
          }
        ]
      },
      {
        "exercise": "7.6",
        "title": "Exercise 7.6",
        "page": 189,
        "problems": [
          {
            "qNo": "1",
            "question": "A building 21 m tall casts a shadow 25 m long. Find the sun’s angle of elevation to the nearest degree.",
            "solution": "tanθ=21/25.",
            "answer": "θ≈40°",
            "diagram": {
              "type": "elevation",
              "title": "Building and shadow",
              "height": "21 m",
              "distance": "25 m"
            }
          },
          {
            "qNo": "2",
            "question": "A lighthouse is 150 m above sea level. The angle of depression of a boat is 60°. Find the horizontal distance from the boat to the lighthouse.",
            "solution": "tan60°=150/d.",
            "answer": "d=150/√3=50√3 m≈86.6 m",
            "diagram": {
              "type": "elevation",
              "title": "Lighthouse and boat",
              "height": "150 m",
              "angle": "60°"
            }
          },
          {
            "qNo": "3",
            "question": "A 50 m tree is observed from a point on the ground 100 m from its foot. Find the angle of elevation of its top.",
            "solution": "tanθ=50/100.",
            "answer": "θ≈26.6°",
            "diagram": {
              "type": "elevation",
              "title": "Tree and observation point",
              "height": "50 m",
              "distance": "100 m"
            }
          },
          {
            "qNo": "4",
            "question": "From the top of a 240 m hill, the angles of depression of the top and bottom of a minaret are 30° and 60°. Find the minaret’s height.",
            "solution": "Horizontal distance to the minaret is 240/tan60°=80√3 m. The rise from the hilltop to the minaret top is 80√3tan30°=80 m.",
            "answer": "Height=240−80=160 m",
            "diagram": {
              "type": "elevation",
              "title": "Hill and minaret",
              "height": "240 m",
              "angle": "30° and 60°"
            }
          },
          {
            "qNo": "5",
            "question": "A police helicopter flies 800 ft above the ground. A car is sighted at an angle of depression of 72°. Find the horizontal distance from the car to the point directly below the helicopter, to the nearest foot.",
            "solution": "tan72°=800/d.",
            "answer": "d=800/tan72°≈260 ft",
            "diagram": {
              "type": "elevation",
              "title": "Helicopter and car",
              "height": "800 ft",
              "angle": "72°"
            }
          },
          {
            "qNo": "6",
            "question": "A lighthouse is 300 m above sea level. Two boats lie on opposite sides of its foot, with depression angles 30° and 45°. Find the distance between the boats.",
            "solution": "Their horizontal distances from the foot are 300/tan30°=300√3 m and 300/tan45°=300 m; opposite sides mean add.",
            "answer": "300(√3+1) m≈819.6 m",
            "diagram": {
              "type": "elevation",
              "title": "Two boats on opposite sides of a lighthouse",
              "height": "300 m",
              "angle": "30° and 45°"
            }
          },
          {
            "qNo": "7",
            "question": "The angle of elevation of the top of a cliff is 30°. After walking 210 m toward it, the angle is 45°. Find the cliff’s height.",
            "solution": "Let the nearer horizontal distance be x. Then h=x and h/(x+210)=tan30°=1/√3.",
            "answer": "x=h=105(√3+1) m≈286.9 m",
            "diagram": {
              "type": "elevation",
              "title": "Two observation points at a cliff",
              "distance": "210 m",
              "angle": "30° and 45°"
            }
          }
        ]
      },
      {
        "exercise": "Review Exercise 7",
        "title": "Review Exercise 7",
        "page": 190,
        "problems": [
          {
            "qNo": "(i)",
            "question": "If an object is above the observer, the angle formed by the horizontal and the observer’s line of sight is called _____.",
            "solution": "An upward line of sight makes an angle of elevation.",
            "answer": "Angle of elevation",
            "category": "MCQ",
            "options": [
              "Angle of depression",
              "Obtuse angle",
              "Angle of elevation",
              "None of the above"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "cotθ = _____.",
            "solution": "cotθ is adjacent/opposite=cosθ/sinθ.",
            "answer": "cosθ/sinθ",
            "category": "MCQ",
            "options": [
              "sinθ/cosθ",
              "1/cosθ",
              "cosθ/sinθ",
              "1/sinθ"
            ]
          },
          {
            "qNo": "(iii)",
            "question": "1+tan²θ = _____.",
            "solution": "Use the fundamental identity.",
            "answer": "sec²θ",
            "category": "MCQ",
            "options": [
              "sin²θ",
              "cos²θ",
              "cosec²θ",
              "sec²θ"
            ]
          },
          {
            "qNo": "(iv)",
            "question": "If tanθ=1 and θ is in quadrant III, then sinθ=_____.",
            "solution": "The reference angle is 45° and sine is negative in quadrant III.",
            "answer": "−1/√2",
            "category": "MCQ",
            "options": [
              "1/2",
              "−1/2",
              "−1/√2",
              "1/√2"
            ]
          },
          {
            "qNo": "(v)",
            "question": "sin(−350°) lies in which quadrant?",
            "solution": "−350° is coterminal with 10°.",
            "answer": "Quadrant I",
            "category": "MCQ",
            "options": [
              "1st quadrant",
              "2nd quadrant",
              "3rd quadrant",
              "4th quadrant"
            ]
          },
          {
            "qNo": "(vi)",
            "question": "45° equals how many radians?",
            "solution": "45×π/180=π/4.",
            "answer": "π/4",
            "category": "MCQ",
            "options": [
              "π/3",
              "π/4",
              "π/6",
              "π/2"
            ]
          },
          {
            "qNo": "(vii)",
            "question": "A right triangle has hypotenuse 5 ft and ∠B=58°. Find the leg adjacent to ∠B.",
            "solution": "Adjacent=5cos58°.",
            "answer": "≈2.6496 ft",
            "category": "MCQ",
            "options": [
              "4.2402 ft",
              "8.0017 ft",
              "0.10060 ft",
              "2.6496 ft"
            ]
          },
          {
            "qNo": "(viii)",
            "question": "In the printed right triangle, MN=8 cm, NP=21 cm and ∠P=20°. Find tanP to the nearest tenth.",
            "solution": "tanP=opposite/adjacent=MN/NP=8/21.",
            "answer": "0.4",
            "category": "MCQ",
            "options": [
              "2.6",
              "0.5",
              "0.4",
              "0.1"
            ]
          },
          {
            "qNo": "(ix)",
            "question": "In right triangle RQS, RT is perpendicular to QS, QT=2, RQ=4, and RT=TS. Find RS.",
            "solution": "RT²=RQ²−QT²=16−4=12, so RT=TS=2√3. Then RS=√(RT²+TS²).",
            "answer": "2√6",
            "category": "MCQ",
            "options": [
              "2√6",
              "2√3",
              "4√3",
              "2√2"
            ]
          },
          {
            "qNo": "(x)",
            "question": "In the same diagram, RT is perpendicular to QS and RT=TS. Find ∠S.",
            "solution": "Triangle RTS is an isosceles right triangle.",
            "answer": "45°",
            "category": "MCQ",
            "options": [
              "25°",
              "30°",
              "45°",
              "60°"
            ]
          },
          {
            "qNo": "2",
            "question": "Convert 45°35′30″ to decimal form.",
            "solution": "45+35/60+30/3600.",
            "answer": "45.5917°"
          },
          {
            "qNo": "3",
            "question": "Convert 216.67° to D°M′S″ form.",
            "solution": "Take the fractional degree, multiply by 60 for minutes, then by 60 for seconds.",
            "answer": "216°40′12″"
          },
          {
            "qNo": "4",
            "question": "Through how many radians does a minute hand turn in (i) 45 minutes; (ii) one hour?",
            "solution": "The minute hand turns 2π radians in 60 minutes.",
            "answer": "(i) 3π/2; (ii) 2π"
          },
          {
            "qNo": "5",
            "question": "Find coterminal angles for 190° and −250°.",
            "solution": "Add and subtract 360°.",
            "answer": "190°: 550°,−170°; −250°: 110°,−610°"
          },
          {
            "qNo": "6",
            "question": "Find the six trigonometric ratios of (i) 390°; (ii) −240°.",
            "solution": "Reduce to 30° and 120°, then use special-angle values and quadrant signs.",
            "answer": "(i) sin=1/2, cos=√3/2, tan=1/√3, cosec=2, sec=2/√3, cot=√3; (ii) sin=√3/2, cos=−1/2, tan=−√3, cosec=2/√3, sec=−2, cot=−1/√3"
          },
          {
            "qNo": "7",
            "question": "Prove: (i) √((1−sinθ)/(1+sinθ))=secθ−tanθ; (ii) 2cosθ secθ−tanθ cotθ=1.",
            "solution": "(i) Rationalize the radicand to obtain (1−sinθ)²/cos²θ. (ii) Use cosθsecθ=1 and tanθcotθ=1.",
            "answer": "Both identities hold."
          },
          {
            "qNo": "8",
            "question": "If secθ=2 and θ is not in quadrant I, find the remaining trigonometric ratios.",
            "solution": "cosθ=1/2; the possible quadrants with positive cosine are I and IV, so θ is in IV. Use a 30° reference triangle.",
            "answer": "sin=−√3/2; tan=−√3; cot=−1/√3; sec=2; cosec=−2/√3"
          },
          {
            "qNo": "9",
            "question": "From a point 85 m from a building, the angle of elevation to its top is 26.5°. The observer’s eye is 1.6 m above the ground. Find the building’s height.",
            "solution": "Height above eye level=85tan26.5°; add 1.6 m.",
            "answer": "≈44.0 m",
            "diagram": {
              "type": "elevation",
              "title": "Building height from a 26.5° sight line",
              "height": "h−1.6 m",
              "distance": "85 m",
              "angle": "26.5°"
            }
          },
          {
            "qNo": "10",
            "question": "From level ground 125 ft from a tower, the angle of elevation is 57.2°. Approximate the tower’s height to the nearest foot.",
            "solution": "tan57.2°=h/125.",
            "answer": "h≈194 ft",
            "diagram": {
              "type": "elevation",
              "title": "Tower height from a 57.2° angle",
              "height": "h",
              "distance": "125 ft",
              "angle": "57.2°"
            }
          }
        ]
      }
    ],
    "slos": [
      "Convert sexagesimal degree, minute, second values to decimal degrees and radians and vice versa",
      "Derive and apply the formulas for arc length (l = rθ) and area of a sector (A = 1/2 r²θ)",
      "Define the six trigonometric ratios for acute angles and generalize to standard position angles",
      "State quadrant signs using ASTC rule and determine trigonometric values of allied angles",
      "Prove and apply fundamental Pythagorean identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ",
      "Solve practical real-world problems involving angles of elevation and depression"
    ],
    "formulaSheet": [
      {
        "name": "DMS and decimal degrees",
        "formula": "D°M′S″ = D + M/60 + S/3600 degrees"
      },
      {
        "name": "Degree-radian conversion",
        "formula": "π radians = 180°; θ(rad)=θ(deg)×π/180"
      },
      {
        "name": "Arc length",
        "formula": "ℓ=rθ (θ in radians)"
      },
      {
        "name": "Sector area",
        "formula": "A=½r²θ (θ in radians)"
      },
      {
        "name": "Right-triangle ratios",
        "formula": "sinθ=opp/hyp; cosθ=adj/hyp; tanθ=opp/adj"
      },
      {
        "name": "Reciprocal ratios",
        "formula": "cosecθ=1/sinθ; secθ=1/cosθ; cotθ=1/tanθ"
      },
      {
        "name": "Fundamental identities",
        "formula": "sin²θ+cos²θ=1; 1+tan²θ=sec²θ; 1+cot²θ=cosec²θ"
      },
      {
        "name": "Elevation and depression",
        "formula": "Use the right-triangle ratios with a horizontal reference line"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 8,
    "id": "u8",
    "title": "Projection of a Side of a Triangle",
    "titleUrdu": "مثلث کے ضلع کا ظل (پروجیکشن)",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 193–201",
    "pageRange": "Pages 193–201",
    "description": "The projection definition, proofs of Theorems 8.1–8.3, Exercises 8.1–8.2 and Review Exercise 8 follow the scanned textbook sequence.",
    "sections": [
      {
        "id": "8.1",
        "title": "8.1 Projection of a Point and a Line Segment",
        "page": 194,
        "theory": "The projection of a point on a line is its foot of the perpendicular. The projection of a segment is the segment between the projections of its endpoints. The perpendicular distance is the shortest distance from a point to a line.",
        "rules": [
          "Draw a perpendicular from each endpoint to the line; the feet determine the projected segment."
        ],
        "diagram": {
          "type": "right-triangle",
          "title": "A segment and its perpendicular projection"
        }
      },
      {
        "id": "8.2",
        "title": "8.2 Theorem 8.1 — Obtuse-Angled Triangle",
        "page": 194,
        "theory": "In ΔABC with ∠C obtuse, drop AD perpendicular to BC produced. Let BC=a, AC=b, AB=c and CD=p. By applying Pythagoras to the two right triangles and using segment addition, c²=a²+b²+2ap. The scan gives the theorem together with a formal statements-and-reasons proof and a corollary.",
        "rules": [
          "For an obtuse angle, c²=a²+b²+2a·p, where p is the projection of the side onto the other side produced.",
          "The signed projection is represented by the positive exterior length in the printed diagram."
        ],
        "diagram": {
          "type": "right-triangle",
          "title": "Obtuse triangle with projection on the extended side"
        }
      },
      {
        "id": "8.3",
        "title": "8.3 Theorem 8.2 — Acute-Angled Triangle",
        "page": 196,
        "theory": "Drop AD perpendicular to BC (or BC produced if needed). The projection length p lies on the side containing the acute angle. Pythagoras and segment addition give c²=a²+b²−2ap. The book proves both the acute and obtuse configurations from the same construction.",
        "rules": [
          "For an acute angle, c²=a²+b²−2a·p.",
          "The sign of the projection term depends on which side contains the perpendicular foot."
        ],
        "diagram": {
          "type": "right-triangle",
          "title": "Acute triangle and projection onto a side"
        }
      },
      {
        "id": "8.4",
        "title": "8.4 Theorem 8.3 — Apollonius Theorem",
        "page": 198,
        "theory": "If AE is the median to BC, then the sum of the squares on AB and AC equals twice the square on half of BC plus twice the square on the median. The proof drops a perpendicular from A and compares the two right triangles.",
        "rules": [
          "AB²+AC²=2(BE²+AE²), where E is the midpoint of BC.",
          "Use the median formula to find a median or an unknown side."
        ],
        "diagram": {
          "type": "right-triangle",
          "title": "Median and perpendicular in Apollonius theorem"
        }
      }
    ],
    "workedExamples": [],
    "exercises": [
      {
        "exercise": "8.1",
        "page": 198,
        "title": "Exercise 8.1",
        "problems": [
          {
            "qNo": "1",
            "question": "In ΔABC, AB=6 cm, BC=10 cm and ∠B=120°. The projection of BC on AB is 5 cm. Find AC.",
            "solution": "By Theorem 8.1, AC²=6²+10²+2(6)(5)=196.",
            "answer": "AC=14 cm",
            "diagram": {
              "type": "right-triangle",
              "title": "Obtuse triangle and projected side"
            }
          },
          {
            "qNo": "2",
            "question": "In ΔABC, AB=3 cm, BC=5 cm and AC=7 cm. Find the projection of BC on AB.",
            "solution": "Place A and B on a horizontal line with AB=3. By the cosine rule, the coordinate of C along AB is (AC²+AB²−BC²)/(2AB)=5.5; subtract AB to get the projection of BC.",
            "answer": "2.5 cm"
          },
          {
            "qNo": "3",
            "question": "In ΔABC, a=7, b=11 and c=8. Calculate the projection of AC on AB.",
            "solution": "The textbook defines a=BC, b=AC and c=AB. Thus p=b cosA=(b²+c²−a²)/(2c)=(11²+8²−7²)/(2·8).",
            "answer": "8.5 units"
          },
          {
            "qNo": "4",
            "question": "In a parallelogram ABCD, AB=4 cm, AC=7 cm and AD=5 cm. Find which angles of the parallelogram are obtuse.",
            "solution": "In ΔABC, BC=AD=5. By the cosine rule, cos∠B=(AB²+BC²−AC²)/(2·AB·BC)=(16+25−49)/40=−1/5, so ∠B is obtuse. Opposite ∠D is equal to it.",
            "answer": "∠B and ∠D are obtuse."
          }
        ]
      },
      {
        "exercise": "8.2",
        "page": 200,
        "title": "Exercise 8.2",
        "problems": [
          {
            "qNo": "1",
            "question": "Using Apollonius theorem, find the lengths of the medians of a triangle having sides 10 cm, 12 cm and 16 cm respectively.",
            "solution": "For each median, use mₐ²=(2b²+2c²−a²)/4, taking the opposite side as a.",
            "answer": "5√7 cm, √142 cm and √58 cm."
          },
          {
            "qNo": "2",
            "question": "In ΔABC, D is the midpoint of BC. Find the length of the median if AB=4 cm, BC=5 cm and AC=6 cm.",
            "solution": "AD²=(2AB²+2AC²−BC²)/4=(32+72−25)/4=79/4.",
            "answer": "AD=√79/2 cm."
          },
          {
            "qNo": "3",
            "question": "ΔABC is given with BC=4 cm, AC=12 cm and ∠C=120°. Find CD, AD, AB and then verify Apollonius theorem.",
            "solution": "Drop AD perpendicular to BC produced. The projection CD=12cos60°=6; AD=12sin60°=6√3; BD=BC+CD=10. Pythagoras gives AB²=BD²+AD²=208. For the median from A to BC, E is the midpoint, BE=2 and AE²=172.",
            "answer": "CD=6 cm; AD=6√3 cm; AB=4√13 cm. Apollonius: AB²+AC²=208+144=352=2(2²+172).",
            "diagram": {
              "type": "right-triangle",
              "title": "Obtuse triangle with altitude AD"
            }
          },
          {
            "qNo": "4",
            "question": "ΔABC is a right triangle with ∠B=90° and BD⊥AC. If AB=6 cm and BC=5 cm, find AD and CD. Verify your answer with Pythagorean theorem.",
            "solution": "AC=√(6²+5²)=√61. By similarity, AD=AB²/AC and CD=BC²/AC.",
            "answer": "AD=36/√61 cm; CD=25/√61 cm; AD+CD=√61 cm."
          }
        ]
      },
      {
        "exercise": "Review Exercise 8",
        "page": 200,
        "title": "Review Exercise 8",
        "problems": [
          {
            "qNo": "(i)",
            "question": "Pythagoras was a/an _____.",
            "solution": "Pythagoras was a Greek mathematician.",
            "answer": "Greek",
            "options": [
              "Indian",
              "Greek",
              "Pakistani",
              "Chinese"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "Apollonius was born in _____.",
            "solution": "Apollonius of Perga is associated with Perga.",
            "answer": "Perga",
            "options": [
              "Perga",
              "Islamabad",
              "Kabul",
              "Peshawar"
            ]
          },
          {
            "qNo": "(iii)",
            "question": "Apollonius is the name of a _____.",
            "solution": "Apollonius was a mathematician.",
            "answer": "Mathematician",
            "options": [
              "City",
              "Town",
              "Country",
              "Mathematician"
            ]
          },
          {
            "qNo": "2",
            "question": "Find the projection of the side of length 10 units onto the side of length 17 units in a triangle with sides 10, 17 and 21 units.",
            "solution": "Use the cosine rule to find the projection onto the 17-unit side.",
            "answer": "26/17 units ≈1.53 units"
          },
          {
            "qNo": "3",
            "question": "ΔABC is right-angled at A. From A, AD is perpendicular to BC. If AB=5 cm and AC=8 cm, find BC, AD and BD.",
            "solution": "BC=√(5²+8²)=√89. By similarity, AD=AB·AC/BC and BD=AB²/BC.",
            "answer": "BC=√89 cm; AD=40/√89 cm; BD=25/√89 cm",
            "diagram": {
              "type": "right-triangle",
              "title": "Right triangle with altitude to the hypotenuse"
            }
          },
          {
            "qNo": "4",
            "question": "In the previous question, BE is a median. Find BE using (a) Pythagoras theorem and (b) Apollonius theorem.",
            "solution": "The median from B to AC has squared length (2AB²+2BC²−AC²)/4.",
            "answer": "BE=√41 cm"
          },
          {
            "qNo": "5",
            "question": "Find x and y in the printed triangle with sides 10, 17 and 19 and altitude h to the 19-unit base.",
            "solution": "Use the projection formula x=(10²+19²−17²)/(2·19), then y=19−x and h²=10²−x².",
            "answer": "x=86/19≈4.53; y=275/19≈14.47; h≈8.92"
          }
        ]
      }
    ],
    "slos": [
      "Define the orthogonal projection of a point and a line segment on a given straight line",
      "State, prove, and apply Theorem 8.1 for obtuse-angled triangles: c² = a² + b² + 2a·p",
      "State, prove, and apply Theorem 8.2 for acute-angled triangles: c² = a² + b² - 2a·p",
      "State, prove, and apply Apollonius Theorem relating sides of a triangle to its median: b² + c² = 2(a/2)² + 2m²"
    ],
    "formulaSheet": [
      {
        "name": "Obtuse triangle theorem",
        "formula": "c²=a²+b²+2ap"
      },
      {
        "name": "Acute triangle theorem",
        "formula": "c²=a²+b²−2ap"
      },
      {
        "name": "Apollonius theorem",
        "formula": "AB²+AC²=2(AD²+BD²), D midpoint of BC"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 9,
    "id": "u9",
    "title": "Chords of a Circle",
    "titleUrdu": "دائرے کے وتر",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 202–211",
    "pageRange": "Pages 202–211",
    "description": "The circle definitions and Theorems 9.1–9.5 precede Examples 1–5, Exercises 9.1–9.2 and Review Exercise 9. Figures use the chord, centre and perpendicular relationships shown in the scan.",
    "sections": [
      {
        "id": "9.1",
        "title": "9.1 One and Only One Circle Through Three Non-Collinear Points",
        "page": 203,
        "theory": "Given three non-collinear points A, B and C, the perpendicular bisectors of two chords meet at the unique centre O. The circle centred at O through any one of the points passes through all three.",
        "rules": [
          "Exactly one circle passes through three non-collinear points."
        ],
        "diagram": {
          "type": "construction-center",
          "title": "Circumcentre of three non-collinear points"
        }
      },
      {
        "id": "9.2",
        "title": "9.2 Bisector from the Centre to a Chord",
        "page": 204,
        "theory": "If a line from the centre bisects a chord that is not a diameter, it is perpendicular to that chord. The proof uses the congruent triangles formed by the radii, half-chords and shared centre-to-midpoint segment.",
        "rules": [
          "If N is the midpoint of chord AB, then ON⊥AB."
        ],
        "diagram": {
          "type": "circle-chord",
          "title": "9.2 Bisector from the Centre to a Chord"
        }
      },
      {
        "id": "9.3",
        "title": "9.3 Perpendicular from the Centre to a Chord Bisects It",
        "page": 205,
        "theory": "A perpendicular from the centre of a circle to a chord bisects the chord. Congruent right triangles prove the two chord segments are equal.",
        "rules": [
          "If ON⊥AB, then AN=NB."
        ],
        "diagram": {
          "type": "circle-chord",
          "title": "Perpendicular from the centre bisects chord AB"
        }
      },
      {
        "id": "9.4",
        "title": "9.4 Congruent Chords Are Equidistant from the Centre",
        "page": 207,
        "theory": "Congruent chords of one circle (or congruent circles) have equal perpendicular distances from their centres. Drop perpendiculars from the centres to both chords and compare the resulting right triangles.",
        "rules": [
          "Equal chords in the same or congruent circles are equidistant from the centre."
        ],
        "diagram": {
          "type": "circle-chord",
          "title": "Equal chords and equal centre distances"
        }
      },
      {
        "id": "9.5",
        "title": "9.5 Chords Equidistant from the Centre Are Congruent",
        "page": 208,
        "theory": "If two chords of one circle are at equal perpendicular distances from the centre, the chords are congruent. The proof uses the perpendicular-bisector theorem and equal radii.",
        "rules": [
          "Equal centre distances imply equal chords."
        ],
        "diagram": {
          "type": "circle-chord",
          "title": "9.5 Chords Equidistant from the Centre Are Congruent"
        }
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "number": 1,
        "page": 204,
        "sectionId": "9.3",
        "title": "Example 1 (p. 204)",
        "problem": "In ⊙P, PM⊥AT, PT=10 and PM=8. Find MT.",
        "given": "PT=10; PM=8; PM⊥MT",
        "method": "Pythagoras in right triangle PMT",
        "steps": [
          "MT²=PT²−PM²=100−64=36.",
          "MT=6."
        ],
        "answer": "6 units",
        "diagram": {
          "type": "circle-chord",
          "title": "Perpendicular from centre P to chord AT"
        }
      },
      {
        "id": "eg2",
        "number": 2,
        "page": 205,
        "sectionId": "9.2",
        "title": "Example 2 (p. 205)",
        "problem": "A circle has radius 5 cm. PX=3 cm and PR⊥AB at X. Find AB.",
        "given": "Radius=5 cm; distance PX=3 cm",
        "method": "The perpendicular from the centre bisects the chord",
        "steps": [
          "AX²=5²−3²=16, so AX=4 cm.",
          "AB=2AX=8 cm."
        ],
        "answer": "8 cm",
        "diagram": {
          "type": "circle-chord",
          "title": "Radius perpendicular to chord AB"
        }
      },
      {
        "id": "eg3",
        "number": 3,
        "page": 206,
        "sectionId": "9.2",
        "title": "Example 3 (p. 206)",
        "problem": "In circle R, XY=30, RX=17, and RZ⊥XY. Find the distance from R to XY.",
        "given": "XY=30; RX=17",
        "method": "The perpendicular from the centre bisects the chord",
        "steps": [
          "XZ=XY/2=15.",
          "RZ²=17²−15²=64, so RZ=8."
        ],
        "answer": "8 units",
        "diagram": {
          "type": "circle-chord",
          "title": "Centre-to-chord distance"
        }
      },
      {
        "id": "eg4",
        "number": 4,
        "page": 209,
        "sectionId": "9.3",
        "title": "Example 4 (p. 209)",
        "problem": "In a circle of radius 5 cm, chords ST and RP are each 3 cm from the centre O. Compare their lengths.",
        "given": "r=5 cm; each chord is 3 cm from O",
        "method": "Equal distances from the centre give equal chords",
        "steps": [
          "Half of either chord is √(5²−3²)=4 cm.",
          "Each chord has length 2·4=8 cm."
        ],
        "answer": "ST=RP=8 cm",
        "diagram": {
          "type": "circle-chord",
          "title": "Two equidistant chords"
        }
      },
      {
        "id": "eg5",
        "number": 5,
        "page": 209,
        "sectionId": "9.3",
        "title": "Example 5 (p. 209)",
        "problem": "Two parallel chords of a circle of radius 12 cm have lengths 8 cm and 14 cm. Find their separation.",
        "given": "r=12 cm; chord lengths 8 cm and 14 cm",
        "method": "Find each perpendicular distance from O using a half-chord right triangle",
        "steps": [
          "Distances are √(12²−4²)=√128≈11.31 cm and √(12²−7²)=√95≈9.75 cm.",
          "If on the same side, subtract; if on opposite sides, add."
        ],
        "answer": "Same side: ≈1.56 cm; opposite sides: ≈21.06 cm",
        "diagram": {
          "type": "circle-chord",
          "title": "Parallel chords and distances from centre"
        }
      }
    ],
    "exercises": [
      {
        "exercise": "9.1",
        "page": 206,
        "title": "Exercise 9.1",
        "problems": [
          {
            "qNo": "1",
            "question": "A circle has radius 30 cm. Find the length of a chord 10 cm from the centre.",
            "solution": "Chord=2√(r²−d²).",
            "answer": "40√2 cm"
          },
          {
            "qNo": "2",
            "question": "A chord is 48 cm long and 18 cm from the centre. Find the diameter.",
            "solution": "r²=24²+18².",
            "answer": "60 cm"
          },
          {
            "qNo": "3",
            "question": "The diameter of a circle is 5 units. How far from the centre is a chord 4 units long?",
            "solution": "r=2.5; d=√(r²−2²).",
            "answer": "1.5 units"
          },
          {
            "qNo": "4",
            "question": "A chord 8 cm long is 5 cm from the centre. Find the radius.",
            "solution": "r²=5²+4².",
            "answer": "√41 cm"
          },
          {
            "qNo": "5",
            "question": "Find the length of a chord 5 cm from the centre of a circle of radius 8 cm.",
            "solution": "Chord=2√(8²−5²).",
            "answer": "2√39 cm"
          },
          {
            "qNo": "6",
            "question": "In circle Q, QW⊥XY and QT⊥YZ. If QW=QT=5 and YT=12, find XY.",
            "solution": "Equal distances from the centre give equal chords. Since QT bisects YZ, the half-chord is 12; therefore the equal chord XY is 24.",
            "answer": "24 units",
            "diagram": {
              "type": "circle-chord",
              "title": "Equal chords at equal centre distances"
            }
          }
        ]
      },
      {
        "exercise": "9.2",
        "page": 210,
        "title": "Exercise 9.2",
        "problems": [
          {
            "qNo": "1",
            "question": "In a circle of radius 5 cm, two parallel chords have lengths 8 cm and 6 cm. Find the distance between them.",
            "solution": "Their distances from O are 3 cm and 4 cm. Depending on placement, subtract or add.",
            "answer": "1 cm (same side) or 7 cm (opposite sides)"
          },
          {
            "qNo": "2",
            "question": "Two parallel chords PQ and MN are 3 cm apart on the same side of a circle. PQ=7 cm and MN=14 cm. Find the radius.",
            "solution": "Let d be the perpendicular distance to the longer chord. The other is d+3. Use r²=d²+7²=(d+3)²+3.5².",
            "answer": "r≈8.39 cm"
          },
          {
            "qNo": "3",
            "question": "A circle with centre C has radius 10. Chord QT is 5 units from C and chord PR is 8 units from C. (a) Compare PR and QT. (b) Compare their distances from C.",
            "solution": "The closer chord is longer. Use half-chord lengths √(10²−5²) and √(10²−8²).",
            "answer": "(a) QT>PR. (b) PR is farther from C."
          }
        ]
      },
      {
        "exercise": "Review Exercise 9",
        "page": 210,
        "title": "Review Exercise 9",
        "problems": [
          {
            "qNo": "(i)",
            "question": "In a circle, two chords equally distant from the centre are _____.",
            "solution": "Chords equally distant from the centre are congruent.",
            "answer": "Congruent",
            "options": [
              "Congruent",
              "Not congruent",
              "Parallel",
              "Non-parallel"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "In the same circle AB<CD. Which chord is closer to O?",
            "solution": "The shorter chord is farther from the centre.",
            "answer": "CD is closer to O",
            "options": [
              "AB is closer to O",
              "CD is closer to O",
              "AB must be parallel to CD",
              "Cannot decide"
            ]
          },
          {
            "qNo": "(iii)",
            "question": "A chord is 5 cm from the centre of a circle of radius 13 cm. Find its length.",
            "solution": "2√(13²−5²)=24.",
            "answer": "24 cm",
            "options": [
              "6 cm",
              "12 cm",
              "24 cm",
              "30 cm"
            ]
          },
          {
            "qNo": "(iv)",
            "question": "A chord 40 units long lies in a circle of radius 25. Find its distance from the centre.",
            "solution": "d=√(25²−20²).",
            "answer": "15 units",
            "options": [
              "15",
              "31.2",
              "47.1",
              "50.1"
            ]
          },
          {
            "qNo": "(v)",
            "question": "A chord 8√3 units long is 4 units from the centre. Find the radius.",
            "solution": "Half-chord=4√3; r²=48+16.",
            "answer": "8 units",
            "options": [
              "14.4",
              "8",
              "8√2",
              "2√8"
            ]
          },
          {
            "qNo": "(vi)",
            "question": "A circle has radius 5 cm and a chord is 4 cm from O. Find the chord length.",
            "solution": "2√(25−16)=6.",
            "answer": "6 cm",
            "options": [
              "4 cm",
              "6 cm",
              "7 cm",
              "9 cm"
            ]
          },
          {
            "qNo": "(vii)",
            "question": "Radius 5, CE=2, and diameter AC is perpendicular to chord BD at E. Find BD.",
            "solution": "OE=OC−CE=3. Half-chord=√(5²−3²)=4.",
            "answer": "8",
            "options": [
              "12",
              "10",
              "8",
              "4"
            ]
          },
          {
            "qNo": "2",
            "question": "In circle O, OA is a radius and AB⊥OC. Find: (i) AC and AB if AO=13 m and OC=5 m; (ii) radius and diameter if AB=16 cm and its distance from O is 6 cm; (iii) the distance from O to a 30 cm chord when the diameter is 34 cm; (iv) AB if r=25 and its distance from O is 7; (v) OA if AB=10 m and its distance from O is 5 m.",
            "solution": "Use the perpendicular-bisector theorem and Pythagoras in each case.",
            "answer": "(i) AC=12 m, AB=24 m; (ii) r=10 cm,d=20 cm; (iii) 8 cm; (iv) 48 units; (v) 5√2 m"
          },
          {
            "qNo": "3",
            "question": "The perpendicular bisector of chord XY meets XY at N and the circle at P. If XY=16 cm and NP=2 cm, calculate the radius.",
            "solution": "XN=8. Let ON=d; the near radius is d+2 and (d+2)²=d²+8².",
            "answer": "17 cm"
          }
        ]
      }
    ],
    "slos": [
      "Prove that one and only one circle can pass through three non-collinear points",
      "Prove that a straight line drawn from center to bisect a chord is perpendicular to the chord",
      "Prove that the perpendicular from center on a chord bisects the chord",
      "Prove that congruent chords are equidistant from the center and converse",
      "Apply the Pythagorean theorem (r² = d² + (c/2)²) to calculate radii, chord lengths, and distances"
    ],
    "formulaSheet": [
      {
        "name": "Chord and centre distance",
        "formula": "r²=d²+(c/2)²"
      },
      {
        "name": "Chord length",
        "formula": "c=2√(r²−d²)"
      },
      {
        "name": "Equal chord theorem",
        "formula": "Equal chords ⇔ equal perpendicular distances from the centre"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 10,
    "id": "u10",
    "title": "Tangent to a Circle",
    "titleUrdu": "دائرے کا مماس",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 212–224",
    "pageRange": "Pages 212–224",
    "description": "Official KPK Board Textbook Unit 10 with tangent theorems, radius-tangent perpendicularity, external point tangents, touching circles, Exercises 10.1, 10.2, and Review Exercise 10.",
    "sections": [
      {
        "id": "10.1",
        "title": "10.1 A Perpendicular at the Outer End of a Radius Is Tangent",
        "page": 213,
        "theory": "If a line is perpendicular to a radius at its endpoint on the circle, the line is tangent at that point. The proof shows every other point on the line is farther from the centre.",
        "rules": [
          "At contact C, OC⊥tangent line."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Tangent perpendicular to radius OC"
        }
      },
      {
        "id": "10.2",
        "title": "10.2 The Radius to the Point of Contact Is Perpendicular to the Tangent",
        "page": 214,
        "theory": "The radius drawn to the point where a tangent touches a circle is perpendicular to that tangent. The perpendicular gives the shortest distance from the centre to the line.",
        "rules": [
          "If AB is tangent at C, then OC⊥AB."
        ],
        "diagram": {
          "type": "tangent",
          "title": "10.2 The Radius to the Point of Contact Is Perpendicular to the Tangent"
        }
      },
      {
        "id": "10.3",
        "title": "10.3 Tangents from the Same External Point Are Equal",
        "page": 215,
        "theory": "Two tangent segments drawn from the same external point to a circle have equal lengths. Compare the two right triangles formed by the radii and tangent segments.",
        "rules": [
          "If PA and PB are tangents from P, then PA=PB.",
          "The line joining P to the centre bisects the angle between the tangents."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Equal tangent segments from external point P"
        }
      },
      {
        "id": "10.4(a)",
        "title": "10.4(a) Externally Touching Circles",
        "page": 219,
        "theory": "When two circles touch externally, the centres and point of contact are collinear, and the distance between centres equals the sum of the radii.",
        "rules": [
          "OO′=R+r."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Externally touching circles"
        }
      },
      {
        "id": "10.4(b)",
        "title": "10.4(b) Internally Touching Circles",
        "page": 221,
        "theory": "When two circles touch internally, the centres and point of contact are collinear, and the distance between centres equals the difference of the radii.",
        "rules": [
          "OO′=R−r."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Internally touching circles"
        }
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "number": 1,
        "page": 215,
        "sectionId": "10.1",
        "title": "Example 1 (p. 215)",
        "problem": "CB is tangent to the circle in the figure. Find CD.",
        "given": "AB=5 cm, BC=8 cm; AC is a secant through the centre",
        "method": "Use Pythagoras for AC, then subtract the radius",
        "steps": [
          "AC²=5²+8²=89, so AC=√89≈9.43 cm.",
          "CD=AC−AD=√89−5≈4.43 cm."
        ],
        "answer": "√89−5 cm ≈4.43 cm",
        "diagram": {
          "type": "tangent",
          "title": "Tangent CB and radius at the point of contact"
        }
      },
      {
        "id": "eg2",
        "number": 2,
        "page": 216,
        "sectionId": "10.3",
        "title": "Example 2 (p. 216)",
        "problem": "Global positioning satellites use a tangent range. If AX=16,000 miles, find the range BX.",
        "given": "AX=16,000 miles; AX and BX are tangents from X",
        "method": "Tangents from the same external point are equal",
        "steps": [
          "AX=BX."
        ],
        "answer": "16,000 miles",
        "diagram": {
          "type": "tangent",
          "title": "Equal tangent lengths AX and BX"
        }
      },
      {
        "id": "eg3",
        "number": 3,
        "page": 216,
        "sectionId": "10.3",
        "title": "Example 3 (p. 216)",
        "problem": "QT and QS are tangent segments to circle R. If TR=5 and RQ=13, find QT and QS.",
        "given": "TR=5; RQ=13",
        "method": "Pythagoras in right triangle RQT, then equal tangent lengths",
        "steps": [
          "QT²=13²−5²=144, so QT=12.",
          "QT=QS."
        ],
        "answer": "QT=QS=12",
        "diagram": {
          "type": "tangent",
          "title": "Tangent lengths QT and QS"
        }
      },
      {
        "id": "eg4",
        "number": 4,
        "page": 216,
        "sectionId": "10.3",
        "title": "Example 4 (p. 216)",
        "problem": "In the figure, AB is tangent to the circle with centre O. Given AB=8 cm, BC=5 cm and OA=x cm, find x and ∠AOB.",
        "given": "AB=8; BC=5; OA=x; OB=x+5",
        "method": "Pythagoras in right triangle AOB",
        "steps": [
          "(x+5)²=x²+8², giving 10x=39 and x=3.9.",
          "tan∠AOB=8/3.9, so ∠AOB≈64.0°."
        ],
        "answer": "x=3.9 cm; ∠AOB≈64.0°",
        "diagram": {
          "type": "tangent",
          "title": "Tangent AB and radius OA"
        }
      },
      {
        "id": "eg5",
        "number": 5,
        "page": 217,
        "sectionId": "10.3",
        "title": "Example 5 (p. 217)",
        "problem": "In the adjacent figure, AB and BC are two tangents. Evaluate x.",
        "given": "AB=x²+5; BC=21",
        "method": "Set the two tangent lengths equal",
        "steps": [
          "x²+5=21.",
          "x²=16; take the positive value x=4."
        ],
        "answer": "x=4",
        "diagram": {
          "type": "tangent",
          "title": "Equal tangents AB and BC"
        }
      },
      {
        "id": "eg6",
        "number": 6,
        "page": 220,
        "sectionId": "10.4(a)",
        "title": "Example 6 (p. 220)",
        "problem": "Three circles touch in pairs externally. Prove that the perimeter of the triangle formed by joining their centres equals the sum of the diameters of the circles.",
        "given": "Three circles with radii r₁,r₂,r₃ touch externally in pairs",
        "method": "Express each side of the centre triangle as the sum of the two radii at its ends",
        "steps": [
          "The centre distances are r₁+r₂, r₂+r₃ and r₃+r₁.",
          "Their sum is 2r₁+2r₂+2r₃, the sum of the three diameters."
        ],
        "answer": "Perimeter = d₁+d₂+d₃",
        "diagram": {
          "type": "pair-circles",
          "title": "Three pairwise externally touching circles"
        }
      },
      {
        "id": "eg7",
        "number": 7,
        "page": 222,
        "sectionId": "10.4(b)",
        "title": "Example 7 (p. 222)",
        "problem": "Two circles have radii 9 and 4. Find the length of their line of centres when they are (a) tangent externally, (b) tangent internally, (c) concentric and (d) 5 units apart.",
        "given": "R=9; r=4",
        "method": "Apply the centre-distance rule for each arrangement",
        "steps": [
          "(a) 9+4=13. (b) 9−4=5. (c) 0. (d) 9+5+4=18."
        ],
        "answer": "(a) 13; (b) 5; (c) 0; (d) 18 units",
        "diagram": {
          "type": "pair-circles",
          "title": "Four possible positions of two circles"
        }
      }
    ],
    "exercises": [
      {
        "exercise": "10.1",
        "page": 217,
        "title": "Exercise 10.1",
        "problems": [
          {
            "qNo": "1",
            "question": "Find the tangent length from a point 10 cm from the centre of a circle of radius 6 cm.",
            "solution": "t=√(10²−6²).",
            "answer": "8 cm"
          },
          {
            "qNo": "2",
            "question": "A tangent from an external point is 8 cm long; the point is 9 cm from the centre. Find the radius.",
            "solution": "r²=9²−8².",
            "answer": "√17 cm"
          },
          {
            "qNo": "3",
            "question": "A chord AC is extended through C. From external point P, tangent PB is drawn. Prove ∠PBC=∠BAP.",
            "solution": "Use the tangent-chord angle theorem and the inscribed-angle theorem on the same intercepted arc.",
            "answer": "Proved."
          },
          {
            "qNo": "4",
            "question": "In each of the three printed figures, AB intersects the circle. Find the marked x using the tangent-radius perpendicular relation and Pythagoras.",
            "solution": "Apply OA⊥AB at the point of contact and use the side labels in each figure.",
            "answer": "(i) 2 cm; (ii) ≈15.65; (iii) 10",
            "diagram": {
              "type": "tangent-grid",
              "title": "Three tangent-length diagrams from Exercise 10.1",
              "items": [
                {},
                {
                  "external": true
                },
                {}
              ]
            }
          },
          {
            "qNo": "5",
            "question": "The radius is 8 cm. Two tangents from an external point P make an angle of 60° with each other. Find OP.",
            "solution": "The line OP bisects the angle between the tangents; use sin30°=8/OP.",
            "answer": "16 cm"
          },
          {
            "qNo": "6",
            "question": "PA and PB are tangents to a circle with centre O. Find x and y in each of the four printed figures.",
            "solution": "Use equal tangent segments, radii perpendicular to tangents, and the angle bisector OP.",
            "answer": "(i) x=49,y=14; (ii) x=58,y=15; (iii) x=34,y=14.8; (iv) x=35,y=55",
            "diagram": {
              "type": "tangent-grid",
              "title": "Four pairs of tangents from external points",
              "items": [
                {
                  "external": true
                },
                {
                  "external": true
                },
                {
                  "external": true
                },
                {
                  "external": true
                }
              ]
            }
          },
          {
            "qNo": "7",
            "question": "In the figure below, VA and VB are tangents to P, the radius of the circle is 3 cm and VA=6 cm. Find (i) VB, (ii) AP, (iii) PV and (iv) XY.",
            "solution": "Tangents from V are equal. Use the radius–tangent right triangle, then subtract the radius to obtain XY.",
            "answer": "(i) 6 cm; (ii) 3 cm; (iii) 3√5 cm; (iv) 3(√5−1) cm",
            "diagram": {
              "type": "tangent",
              "title": "Two tangents VA and VB from V"
            }
          },
          {
            "qNo": "8",
            "question": "In circle N, verify that line l is a tangent.",
            "solution": "Check the perpendicular radius at the point where l meets the circle.",
            "answer": "l is tangent to the circle.",
            "diagram": {
              "type": "tangent",
              "title": "Line l tangent to circle N"
            }
          },
          {
            "qNo": "9",
            "question": "Verify that AB is tangent to the circle at B.",
            "solution": "The centre-to-contact radius and AB form a right triangle; verify the Pythagorean relation.",
            "answer": "AB is tangent at B.",
            "diagram": {
              "type": "tangent",
              "title": "Verify tangent AB at B"
            }
          },
          {
            "qNo": "10",
            "question": "If AD, DE and BE are tangents to the circle as shown, prove AD+BE=DE.",
            "solution": "Tangent segments from each external point are equal. Split DE at the top contact point and substitute the equal pairs.",
            "answer": "AD+BE=DE",
            "diagram": {
              "type": "tangent",
              "title": "Three tangents enclosing a circle"
            }
          }
        ]
      },
      {
        "exercise": "10.2",
        "page": 222,
        "title": "Exercise 10.2",
        "problems": [
          {
            "qNo": "1",
            "question": "Two circles have radii 8 cm and 3 cm and touch externally. Find the distance between their centres.",
            "solution": "OO′=R+r.",
            "answer": "11 cm"
          },
          {
            "qNo": "2",
            "question": "The centres of two internally touching circles are 5 cm apart. If the larger radius is 17 cm, find the smaller radius.",
            "solution": "OO′=R−r.",
            "answer": "12 cm"
          },
          {
            "qNo": "3",
            "question": "In a circle, a 10 cm long chord is 12 cm from the centre. What is the length of a chord at a distance of 5 cm from the centre?",
            "solution": "The first chord gives r²=12²+5²=169, so r=13 cm. For the second chord, half-length=√(13²−5²)=12 cm.",
            "answer": "24 cm"
          },
          {
            "qNo": "4",
            "question": "A chord 18 cm long is in a circle of radius 15 cm. Find the distance from the centre to the chord midpoint.",
            "solution": "d=√(15²−9²).",
            "answer": "12 cm"
          },
          {
            "qNo": "5",
            "question": "Find the length of a chord 6 cm from the centre of a circle of radius 10 cm.",
            "solution": "c=2√(10²−6²).",
            "answer": "16 cm"
          },
          {
            "qNo": "6",
            "question": "A chord is 8 cm long and 3 cm from the centre. Find the circle’s diameter.",
            "solution": "r²=4²+3².",
            "answer": "10 cm"
          },
          {
            "qNo": "7",
            "question": "A circle has radius 8 cm and a chord 12 cm long. Find the chord’s distance from the centre.",
            "solution": "d=√(8²−6²).",
            "answer": "2√7 cm"
          },
          {
            "qNo": "8",
            "question": "A chord 9 cm long is in a circle of radius 7.5 cm. Find its distance from the centre.",
            "solution": "d=√(7.5²−4.5²).",
            "answer": "6 cm"
          }
        ]
      },
      {
        "exercise": "Review Exercise 10",
        "page": 223,
        "title": "Review Exercise 10",
        "problems": [
          {
            "qNo": "(i)",
            "question": "In the figure, ACB is called _____.",
            "solution": "ACB denotes the intercepted arc.",
            "answer": "An arc",
            "options": [
              "An arc",
              "A secant",
              "A chord",
              "A diameter"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "If OT is a radius to the point of contact and PQ is tangent, then _____.",
            "solution": "A radius to the point of contact is perpendicular to a tangent.",
            "answer": "OT⊥PQ",
            "options": [
              "OT⊥PQ",
              "OT∥PQ",
              "OT⊥ bisector of PQ",
              "OT is a tangent"
            ]
          },
          {
            "qNo": "(iii)",
            "question": "Two tangents drawn from the same external point are ____ in length.",
            "solution": "Tangent segments from a common external point are equal.",
            "answer": "Equal",
            "options": [
              "Half",
              "Equal",
              "Triple",
              "Different"
            ]
          },
          {
            "qNo": "(iv)",
            "question": "If two circles touch externally, the distance between their centres is _____.",
            "solution": "For external tangency, centre distance is the sum of radii.",
            "answer": "The sum of their radii",
            "options": [
              "The difference of radii",
              "The sum of radii",
              "Zero",
              "Twice the larger radius"
            ]
          },
          {
            "qNo": "2",
            "question": "In the diagram, B is a point of tangency. Find the radius r of circle C.",
            "solution": "Use the marked tangent and secant lengths with the tangent–secant theorem.",
            "answer": "39 ft",
            "diagram": {
              "type": "tangent-grid",
              "title": "Tangent and secant diagram in feet",
              "items": [
                {
                  "external": true,
                  "value": "feet"
                }
              ]
            }
          },
          {
            "qNo": "3",
            "question": "In the figure, BP is tangent to the circle with centre O. Given ∠APO=33°, find ∠PBA.",
            "solution": "Use the isosceles triangle formed by the radii, the tangent–radius right angle and the angle sum in triangle PBA.",
            "answer": "24°",
            "diagram": {
              "type": "tangent-grid",
              "title": "Tangent BP and chord PA",
              "items": [
                {
                  "external": true,
                  "value": "33°"
                }
              ]
            }
          },
          {
            "qNo": "4",
            "question": "O is the centre of the circle through A and B. TA is tangent at A and TB is a secant. Given ∠AOT=64°, find (i) ∠ATB and (ii) ∠TAB.",
            "solution": "OA⊥TA. In triangle AOT, the remaining angle is 180°−90°−64°=26°. Use the secant and triangle angle relations for ∠TAB.",
            "answer": "(i) 26°; (ii) 122°",
            "diagram": {
              "type": "tangent-grid",
              "title": "Tangent TA and secant TB",
              "items": [
                {
                  "external": true
                },
                {
                  "external": true
                }
              ]
            }
          },
          {
            "qNo": "5",
            "question": "Given PA and PB are tangents to the circles with centre O, find the values of the unknowns in (a) and (b).",
            "solution": "In (a), use the 5 m radius and 12 m tangent to find OP=13 m, then the external segment i=OP−5. In (b), (k+7)²=k²+15²; use the right triangle for angle r.",
            "answer": "(a) i=8 m, j≈67.4°; (b) k=88/7 cm≈12.6 cm, r≈50°",
            "diagram": {
              "type": "tangent-grid",
              "title": "The two tangent diagrams from Review Exercise 10",
              "items": [
                {
                  "external": true
                },
                {
                  "external": true
                }
              ]
            }
          }
        ]
      }
    ],
    "slos": [
      "Define secant, tangent, and point of contact of a circle",
      "Prove that the tangent at any point of a circle is perpendicular to the radial segment through the point of contact",
      "Prove that the lengths of two tangents drawn from an external point to a circle are equal",
      "Prove that when two circles touch each other, the point of contact lies on the line of centers",
      "Calculate tangent lengths using Pythagorean theorem in right-angled triangles formed by radial segments"
    ],
    "formulaSheet": [
      {
        "name": "Radius and tangent",
        "formula": "Radius ⟂ tangent at point of contact"
      },
      {
        "name": "Equal tangents",
        "formula": "PA=PB from the same external point P"
      },
      {
        "name": "External touching circles",
        "formula": "OO′=R+r"
      },
      {
        "name": "Internal touching circles",
        "formula": "OO′=R−r"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 11,
    "id": "u11",
    "title": "Chords and Arcs",
    "titleUrdu": "وتر اور قوسیں",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 225–237",
    "pageRange": "Pages 225–237",
    "description": "Official KPK Board Textbook Unit 11 covering relationships between chords, arcs, and central angles, Theorems 11.1 to 11.4, Exercise 11, and Review Exercise 11.",
    "sections": [
      {
        "id": "11.1",
        "title": "11.1 Congruent Arcs Have Equal Corresponding Chords",
        "page": 227,
        "theory": "In one circle or congruent circles, congruent arcs subtend equal chords. The proof joins the arc endpoints to the centres and uses equal radii and central angles.",
        "rules": [
          "Congruent arcs ⇒ congruent corresponding chords."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "Equal arcs and corresponding chords"
        }
      },
      {
        "id": "11.2",
        "title": "11.2 Equal Chords Have Congruent Corresponding Arcs",
        "page": 229,
        "theory": "In one circle or congruent circles, equal chords subtend congruent minor arcs, major arcs and semicircles. This is the converse of Theorem 11.1.",
        "rules": [
          "Equal chords ⇒ congruent corresponding arcs."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "11.2 Equal Chords Have Congruent Corresponding Arcs"
        }
      },
      {
        "id": "11.3",
        "title": "11.3 Equal Chords Subtend Equal Central Angles",
        "page": 232,
        "theory": "Equal chords in the same or congruent circles subtend equal angles at their corresponding centres. Compare the triangles made by the two radii and chord.",
        "rules": [
          "If AB=CD, then ∠AOB=∠COD."
        ],
        "diagram": {
          "type": "circle-chord",
          "title": "Equal chords and equal central angles"
        }
      },
      {
        "id": "11.4",
        "title": "11.4 Equal Central Angles Subtend Equal Chords",
        "page": 234,
        "theory": "If two chords in the same or congruent circles subtend equal central angles, the chords are congruent. The proof uses the two radii and included central angle.",
        "rules": [
          "If ∠AOB=∠COD, then AB=CD."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "11.4 Equal Central Angles Subtend Equal Chords"
        }
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "number": 1,
        "page": 231,
        "sectionId": "11.1",
        "title": "Example 1 (p. 231)",
        "problem": "A point P on the circumference is equidistant from radii OA and OB. Prove that minor arcs AP and BP are equal.",
        "given": "OP is the common side; the perpendicular distances from P to OA and OB are equal",
        "method": "Compare the right triangles formed by the radii and perpendiculars",
        "steps": [
          "The two right triangles have equal hypotenuse OP and equal perpendicular legs.",
          "They are congruent by RHS; the corresponding central angles and arcs are equal."
        ],
        "answer": "m⌢AP=m⌢BP",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Equal distances from P to the two radii"
        }
      },
      {
        "id": "eg2",
        "number": 2,
        "page": 235,
        "sectionId": "11.2",
        "title": "Example 2 (p. 235)",
        "problem": "The internal bisector of central angle AOB meets the circle at P. Prove that arc AP=arc BP.",
        "given": "OP bisects ∠AOB",
        "method": "Compare triangles OAP and OBP",
        "steps": [
          "OA=OB (radii), OP is common, and ∠AOP=∠POB.",
          "The triangles are congruent by SAS, so AP=BP.",
          "Equal chords subtend equal arcs."
        ],
        "answer": "⌢AP=⌢BP",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Angle bisector divides a circle arc"
        }
      },
      {
        "id": "eg3",
        "number": 3,
        "page": 235,
        "sectionId": "11.2",
        "title": "Example 3 (p. 235)",
        "problem": "Tell whether the red arcs in each printed diagram are congruent. Explain.",
        "given": "Three marked diagrams (a)–(c)",
        "method": "Compare their central angles and determine whether the circles are the same or congruent",
        "steps": [
          "(a) Equal central angles in the same circle give congruent arcs.",
          "(b) Equal central angles alone do not make arcs in different-sized, non-congruent circles congruent.",
          "(c) Equal central angles in congruent circles give congruent arcs."
        ],
        "answer": "(a) yes; (b) no; (c) yes",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Comparing arcs in three circle diagrams"
        }
      }
    ],
    "exercises": [
      {
        "exercise": "11",
        "page": 236,
        "title": "Exercise 11",
        "problems": [
          {
            "qNo": "1",
            "question": "Given that O is the centre of each of the six circles, find x and y in each printed diagram (i)–(vi).",
            "solution": "Use the perpendicular from the centre to a chord, equal chord relationships, Pythagoras and the central angle in each diagram.",
            "answer": "(i) x=12,y=90°; (ii) x=11,y=90°; (iii) x=12,y≈67.4°; (iv) x=11,y≈61.9°; (v) x=16,y≈53.1°; (vi) x=6,y≈50.2°",
            "diagram": {
              "type": "circle-chord-grid",
              "title": "Six chord and central-distance diagrams",
              "items": [
                {
                  "labels": [
                    "x",
                    "y"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "y"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "y"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "y"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "y"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "y"
                  ]
                }
              ]
            }
          },
          {
            "qNo": "2",
            "question": "In ⊙Q, KL=LM. If CK=2x+3 and CM=4x, find x.",
            "solution": "Equal chords are equidistant from the centre. Since QL passes through C, the two chord halves are equal: CK=CM.",
            "answer": "2x+3=4x, so x=1.5."
          }
        ]
      },
      {
        "exercise": "Review Exercise 11",
        "page": 236,
        "title": "Review Exercise 11",
        "problems": [
          {
            "qNo": "(i)",
            "question": "OP has radius 3 and chord AB subtends a 90° central angle. What is the length of AB?",
            "solution": "The isosceles triangle OAB has two radius sides of 3 and included angle 90°.",
            "answer": "3√2",
            "options": [
              "3√2",
              "6",
              "3√3",
              "9"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "In the accompanying diagram of circle O, AB=CD. Which statement is true?",
            "solution": "The printed equality is between the two chords.",
            "answer": "AB=CD",
            "options": [
              "AB=CD",
              "AB∥CD",
              "AC=BD",
              "∠ABC=∠BCD"
            ]
          },
          {
            "qNo": "2",
            "question": "In a circle, two perpendicular diameters are drawn. Show that joining their endpoints in order forms a square.",
            "solution": "The four chords are equal because they subtend equal 90° central angles. Each interior angle subtends a diameter and is 90°.",
            "answer": "The quadrilateral is a square.",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Square formed by endpoints of perpendicular diameters"
            }
          },
          {
            "qNo": "3",
            "question": "In a circle with centre O, AC is a diameter and ∠AOB=130°. Find ∠ADB, ∠BDC and m⌢BC.",
            "solution": "∠ADB subtends arc AB, so it is half 130°. Since AC is a diameter, ∠AOC=180° and ∠BOC=50°. Then ∠BDC is half arc BC.",
            "answer": "∠ADB=65°; ∠BDC=25°; m⌢BC=50°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Diameter AC and central angle 130°"
            }
          },
          {
            "qNo": "4",
            "question": "Chords AB and CD meet at E outside the circle. Prove (a) ∠A=∠C, (b) ∠1=∠2 and (c) ΔADE and ΔCBE are equiangular.",
            "solution": "Inscribed angles standing on the same arc are equal: ∠A=∠C. The marked angles 1 and 2 stand on the same chord AC. The exterior lines give equal corresponding angles at E, so the two triangles have three equal angle pairs.",
            "answer": "(a) ∠A=∠C; (b) ∠1=∠2; (c) ΔADE∼ΔCBE.",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Two secants meeting outside a circle"
            }
          }
        ]
      }
    ],
    "slos": [
      "Prove that if two arcs of a circle are congruent, the corresponding chords are equal and converse",
      "Prove that equal chords subtend equal angles at the center and converse",
      "Calculate central angles and arc measurements for regular inscribed polygons"
    ],
    "formulaSheet": [
      {
        "name": "Arc and chord",
        "formula": "Equal arcs ⇔ equal chords"
      },
      {
        "name": "Central angle",
        "formula": "Equal chords ⇔ equal central angles"
      },
      {
        "name": "Circle angle sum",
        "formula": "A complete central turn is 360°"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 12,
    "id": "u12",
    "title": "Angle in a Segment of a Circle",
    "titleUrdu": "دائرے کے قطعے میں زاویہ",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 238–249",
    "pageRange": "Pages 238–249",
    "description": "Official KPK Board Textbook Unit 12 covering central and inscribed angles, angles in the same segment, angles in semicircles, cyclic quadrilaterals, Exercise 12, and Review Exercise 12.",
    "sections": [
      {
        "id": "12.1",
        "title": "12.1 Central Angle and Inscribed Angle",
        "page": 239,
        "theory": "The measure of a central angle is twice the measure of an inscribed angle subtended by the same arc (Theorem 12.1).",
        "rules": [
          "Central angle = 2 × inscribed angle on the same arc.",
          "Inscribed angle = half the central angle."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "Central and inscribed angles on the same arc"
        }
      },
      {
        "id": "12.2",
        "title": "12.2 Angles in the Same Segment",
        "page": 241,
        "theory": "Angles subtended by the same chord at the circumference are equal. The proof draws radii to the chord endpoints and applies Theorem 12.1.",
        "rules": [
          "Inscribed angles standing on the same chord are equal."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "12.2 Angles in the Same Segment"
        }
      },
      {
        "id": "12.3(a)",
        "title": "12.3(a) Angle in a Semicircle",
        "page": 242,
        "theory": "An angle inscribed in a semicircle is a right angle (Theorem 12.3(a)).",
        "rules": [
          "The angle subtended by a diameter at the circumference is 90°."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "Right angle in a semicircle"
        }
      },
      {
        "id": "12.3(b)",
        "title": "12.3(b) Angle in a Segment Greater Than a Semicircle",
        "page": 243,
        "theory": "If the segment is greater than a semicircle, the inscribed angle is less than a right angle (Theorem 12.3(b)).",
        "rules": [
          "An angle in a segment greater than a semicircle is acute."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "12.3(b) Angle in a Segment Greater Than a Semicircle"
        }
      },
      {
        "id": "12.3(c)",
        "title": "12.3(c) Angle in a Segment Less Than a Semicircle",
        "page": 244,
        "theory": "If the segment is less than a semicircle, the inscribed angle is greater than a right angle (Theorem 12.3(c)).",
        "rules": [
          "An angle in a segment less than a semicircle is obtuse."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "12.3(c) Angle in a Segment Less Than a Semicircle"
        }
      },
      {
        "id": "12.4",
        "title": "12.4 Opposite Angles of a Cyclic Quadrilateral",
        "page": 245,
        "theory": "Opposite angles of any quadrilateral inscribed in a circle are supplementary (Theorem 12.4). The proof uses the central-angle relationships and the 360° angle sum around the centre.",
        "rules": [
          "Opposite angles of a cyclic quadrilateral sum to 180°.",
          "An exterior angle equals the opposite interior angle."
        ],
        "diagram": {
          "type": "inscribed-angle",
          "title": "Cyclic quadrilateral and supplementary opposite angles"
        }
      }
    ],
    "workedExamples": [
      {
        "id": "eg1",
        "number": 1,
        "page": 241,
        "sectionId": "12.1",
        "title": "Example 1 (p. 241)",
        "problem": "A circle has radius √2 cm and chord AB=2 cm. Prove that the angle in the larger segment is 45°.",
        "given": "OA=OB=√2; AB=2",
        "method": "Find the central angle, then halve it",
        "steps": [
          "OA²+OB²=2+2=4=AB²; triangle AOB is right-angled at O.",
          "The central angle ∠AOB=90°.",
          "The inscribed angle standing on AB is half of 90°."
        ],
        "answer": "45°",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Chord of length 2 in a circle of radius √2"
        }
      },
      {
        "id": "eg2",
        "number": 2,
        "page": 244,
        "sectionId": "12.2",
        "title": "Example 2 (p. 244)",
        "problem": "Find a in the printed circle diagram.",
        "given": "Angles ∠ACB and ∠ADB stand on chord AB",
        "method": "Angles in the same segment are equal",
        "steps": [
          "The marked angle in the same segment is 80°."
        ],
        "answer": "a=80°",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Angles subtended by the same chord"
        }
      },
      {
        "id": "eg3",
        "number": 3,
        "page": 245,
        "sectionId": "12.2",
        "title": "Example 3 (p. 245)",
        "problem": "Find each variable in the printed circle with central angle 104° and inscribed angles a° and 2x°.",
        "given": "Central angle=104°",
        "method": "Apply the central-angle theorem and the same-segment theorem",
        "steps": [
          "2a=104°, so a=52°.",
          "2x=52°, so x=26°."
        ],
        "answer": "a=52°; x=26°",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Central angle and inscribed angles"
        }
      },
      {
        "id": "eg4",
        "number": 4,
        "page": 246,
        "sectionId": "12.3",
        "title": "Example 4 (p. 246)",
        "problem": "O is the centre of the circle. Find the unknowns x and y in the cyclic quadrilateral.",
        "given": "Opposite pairs include x with 85° and y with 110°",
        "method": "Opposite angles of a cyclic quadrilateral are supplementary",
        "steps": [
          "x+85°=180°, so x=95°.",
          "y+110°=180°, so y=70°."
        ],
        "answer": "x=95°; y=70°",
        "diagram": {
          "type": "inscribed-angle",
          "title": "Opposite angles in a cyclic quadrilateral"
        }
      }
    ],
    "exercises": [
      {
        "exercise": "12",
        "page": 247,
        "title": "Exercise 12",
        "problems": [
          {
            "qNo": "1",
            "question": "O is the centre of the circle. Find the unknown angles x and y in the printed diagram, where the central angle is 70°.",
            "solution": "An inscribed angle standing on the same arc is half the central angle; use the straight-angle relation for the remaining angle.",
            "answer": "x=35°; y=145°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Inscribed angles from a 70° central angle",
              "centralAngle": 70,
              "inscribedAngle": 35
            }
          },
          {
            "qNo": "2",
            "question": "A regular hexagon is inscribed in a circle. Each side is 5√3 units from the centre. Find the radius.",
            "solution": "The perpendicular from the centre bisects a side; use a 30°–60°–90° triangle.",
            "answer": "10 units"
          },
          {
            "qNo": "3",
            "question": "Find the value of each variable in the two printed cyclic-quadrilateral diagrams (a) and (b).",
            "solution": "Opposite angles of a cyclic quadrilateral sum to 180°. In (a), c+(2c−6)=180 and 10x+8x=180. In (b), each opposite pair is supplementary.",
            "answer": "(a) c=62°, x=10°; (b) a=45°, b=30°",
            "diagram": {
              "type": "inscribed-angle-grid",
              "title": "Two cyclic quadrilaterals with marked angles",
              "items": [
                {
                  "labels": [
                    "c°",
                    "10x°",
                    "(2c−6)°",
                    "8x°"
                  ]
                },
                {
                  "labels": [
                    "2a°",
                    "2b°",
                    "2a°",
                    "4b°"
                  ]
                }
              ]
            }
          },
          {
            "qNo": "4",
            "question": "Show that a parallelogram inscribed in a circle is a rectangle.",
            "solution": "Opposite angles in a parallelogram are equal; opposite angles in a cyclic quadrilateral are supplementary. Equal supplementary angles are each 90°.",
            "answer": "Every angle is 90°, so the parallelogram is a rectangle."
          }
        ]
      },
      {
        "exercise": "Review Exercise 12",
        "page": 248,
        "title": "Review Exercise 12",
        "problems": [
          {
            "qNo": "(i)",
            "question": "In the figure, O is the centre of the circle, ∠TPR=80° and ∠QOR=x°. Find x.",
            "solution": "The angle adjacent to ∠TPR is 100°. Use the inscribed-angle theorem to obtain the corresponding central angle.",
            "answer": "160°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Central angle and exterior inscribed angle",
              "centralAngle": 160,
              "inscribedAngle": 80
            },
            "options": [
              "80°",
              "160°",
              "100°",
              "120°"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "In the diagram, ∠ADC is a central angle and m∠ADC=60°. What is m∠ABC?",
            "solution": "Use the central-angle and inscribed-angle relation for the intercepted arc.",
            "answer": "30°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Central angle 60° and inscribed angle",
              "centralAngle": 60,
              "inscribedAngle": 30
            },
            "options": [
              "15°",
              "60°",
              "120°",
              "30°"
            ]
          },
          {
            "qNo": "(iii)",
            "question": "In the figure, O is the centre and ∠PQR=70°. Calculate x, the reflex central angle marked in the figure.",
            "solution": "The minor central angle subtending the same arc PR is 2×70°=140°. The marked reflex angle is 360°−140°=220°.",
            "answer": "220°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Inscribed angle 70° and reflex central angle",
              "centralAngle": 220,
              "inscribedAngle": 70
            },
            "options": [
              "140°",
              "220°",
              "290°",
              "110°"
            ]
          },
          {
            "qNo": "(iv)",
            "question": "In the figure, ∠SPT=100°, ∠PQS=40° and ∠PRQ=x°. Calculate x.",
            "solution": "Use the cyclic-quadrilateral angle and same-segment relations.",
            "answer": "40°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Cyclic quadrilateral with angles 100° and 40°",
              "inscribedAngle": 40
            },
            "options": [
              "20°",
              "40°",
              "50°",
              "60°"
            ]
          },
          {
            "qNo": "(v)",
            "question": "If the marked central angle m∠3=75°, find m∠1 and m∠2.",
            "solution": "Each inscribed angle standing on the same arc is half the central angle: 75°÷2=37½°.",
            "answer": "37½°, 37½°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Two inscribed angles on the same arc",
              "centralAngle": 75,
              "inscribedAngle": 37.5
            },
            "options": [
              "37½°,37½°",
              "37½°,75°",
              "75°,37½°",
              "75°,75°"
            ]
          },
          {
            "qNo": "(vi)",
            "question": "Given O is the centre, find the marked x in the circle.",
            "solution": "The inscribed angle is half the central angle standing on the same arc.",
            "answer": "50°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Central and inscribed angles in Review Exercise 12 (vi)",
              "centralAngle": 100,
              "inscribedAngle": 50
            },
            "options": [
              "12½°",
              "25°",
              "50°",
              "75°"
            ]
          },
          {
            "qNo": "(vii)",
            "question": "Given O is the centre, find the marked y in the circle.",
            "solution": "Angles standing on the same chord are equal; apply the inscribed-angle theorem.",
            "answer": "25°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Angles in the same segment in Review Exercise 12 (vii)",
              "inscribedAngle": 25
            },
            "options": [
              "12½°",
              "25°",
              "50°",
              "75°"
            ]
          },
          {
            "qNo": "(viii)",
            "question": "In the figure, O is the centre. Find x.",
            "solution": "The central angles are 140° and 120°; subtract them from 360°.",
            "answer": "100°",
            "diagram": {
              "type": "inscribed-angle",
              "title": "Isosceles triangles in a circle with 20° and 30° base angles",
              "centralAngle": 100,
              "inscribedAngle": 20
            },
            "options": [
              "50°",
              "75°",
              "100°",
              "125°"
            ]
          },
          {
            "qNo": "2",
            "question": "O is the centre of the circle. Find the unknowns in both printed diagrams (i) and (ii).",
            "solution": "Use opposite angles of a cyclic quadrilateral and angles in the same segment.",
            "answer": "(i) x=98°, y=60°; (ii) x=38°, y=25°",
            "diagram": {
              "type": "inscribed-angle-grid",
              "title": "Two circle diagrams for Review Exercise 12 question 2",
              "items": [
                {
                  "labels": [
                    "x",
                    "y",
                    "given angles"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "y",
                    "given angles"
                  ]
                }
              ]
            }
          },
          {
            "qNo": "3",
            "question": "ABCD is a quadrilateral circumscribed about a circle. Show that m⌢AB+m⌢CD=m⌢BC+m⌢DA.",
            "solution": "Each arc is twice the angle between the corresponding tangents; combine the equal tangent lengths and angle sums.",
            "answer": "Proved."
          },
          {
            "qNo": "4",
            "question": "Find x in each of the six printed circle diagrams.",
            "solution": "Use central angles, inscribed angles, same-segment equality and cyclic-quadrilateral supplementary angles.",
            "answer": "(i) x=80°; (ii) x=125°; (iii) x=50°; (iv) x=45°; (v) y=12°; (vi) x=70°",
            "diagram": {
              "type": "inscribed-angle-grid",
              "title": "Six circle angle diagrams from Review Exercise 12 question 4",
              "items": [
                {
                  "labels": [
                    "x",
                    "given angles"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "given angles"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "given angles"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "given angles"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "given angles"
                  ]
                },
                {
                  "labels": [
                    "x",
                    "given angles"
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    "slos": [
      "Prove that the central angle of a minor arc is double the angle subtended by the corresponding major arc",
      "Prove that any two angles in the same segment of a circle are equal",
      "Prove that the angle in a semicircle is a right angle",
      "Prove that opposite angles of any cyclic quadrilateral are supplementary"
    ],
    "formulaSheet": [
      {
        "name": "Central and inscribed angles",
        "formula": "Central angle = 2 × inscribed angle on the same arc"
      },
      {
        "name": "Angle in a semicircle",
        "formula": "90°"
      },
      {
        "name": "Cyclic quadrilateral",
        "formula": "Opposite angles sum to 180°"
      }
    ],
    "classId": "cls10"
  },
  {
    "number": 13,
    "id": "u13",
    "title": "Practical Geometry - Circles",
    "titleUrdu": "عملی جیومیٹری - دائرے",
    "status": "ready",
    "badge": "Rebuilt in textbook order from pages 250–269",
    "pageRange": "Pages 250–269",
    "description": "Construction procedures follow subsections 13.1.1–13.3.7, followed by Exercises 13.1–13.3 and Review Exercise 13. The scanned book presents constructions rather than numbered worked examples.",
    "sections": [
      {
        "id": "13.1.1",
        "title": "13.1.1 Locate the Centre of a Given Circle",
        "page": 251,
        "theory": "Choose three points A, B and C on the circumference. Join them; the perpendicular bisectors of two chords meet at O, the centre.",
        "rules": [
          "The perpendicular bisectors of chords pass through the centre."
        ],
        "diagram": {
          "type": "construction-center",
          "title": "Centre found from two chord bisectors"
        },
        "construction": {
          "given": "A circle without mentioning its centre.",
          "required": "To locate the centre of the given circle.",
          "steps": [
            "Choose any three points A, B and C on its circumference.",
            "Join A to B and A to C.",
            "Draw the perpendicular bisectors of AB and AC; they intersect at O.",
            "O is the required centre."
          ]
        }
      },
      {
        "id": "13.1.2",
        "title": "13.1.2 Draw a Circle Through Three Non-Collinear Points",
        "page": 252,
        "theory": "Join A, B and C in pairs. Construct the perpendicular bisectors of AB and AC; their intersection is O. With centre O and radius OA, draw the unique circle through all three points.",
        "rules": [
          "Three non-collinear points determine exactly one circle."
        ],
        "diagram": {
          "type": "construction-center",
          "title": "Circle through three non-collinear points"
        },
        "construction": {
          "given": "Three non-collinear points A, B and C in a plane.",
          "required": "To draw the circle passing through A, B and C.",
          "steps": [
            "Join A to B and A to C.",
            "Draw the perpendicular bisectors of AB and AC; their intersection is O.",
            "With centre O and radius OA (or OB or OC), draw the circle."
          ]
        }
      },
      {
        "id": "13.1.3(a)",
        "title": "13.1.3(a) Complete an Arc by Finding Its Centre",
        "page": 252,
        "theory": "Choose a third point C on the given arc AB. Construct the perpendicular bisectors of AC and BC; their intersection is O. With radius OA, draw the complete circle.",
        "rules": [
          "Find the centre from two chord bisectors, then set the compass to the centre-to-arc radius."
        ],
        "diagram": {
          "type": "construction-center",
          "title": "Complete an arc after locating its centre"
        },
        "construction": {
          "given": "A part AB of the circumference of a circle.",
          "required": "To complete the circle by finding its centre.",
          "steps": [
            "Choose a point C on the given arc AB so that AC and BC can be drawn.",
            "Find the midpoints of AC and BC and construct their perpendicular bisectors ℓ₁ and ℓ₂.",
            "Their intersection O is the centre of the required circle.",
            "With centre O and radius OA (or OB or OC), draw the circle."
          ]
        }
      },
      {
        "id": "13.1.3(b)",
        "title": "13.1.3(b) Complete an Arc Without Finding Its Centre",
        "page": 253,
        "theory": "Choose successive points on the given arc and use the compass to step off equal chords, constructing a sequence of points around the rest of the circumference. Continue the curve smoothly through those points to complete the circle.",
        "rules": [
          "Equal chords of one circle subtend equal arcs."
        ],
        "diagram": {
          "type": "construction-circle",
          "title": "Continue an arc by stepping off equal chords"
        },
        "construction": {
          "given": "A part AC of the circumference of a circle.",
          "required": "To complete the circle without finding its centre.",
          "steps": [
            "Take any point B on the arc AC.",
            "Join AB, BC and AC.",
            "With C as centre and radius AB draw an arc; with B as centre and radius AC draw an arc meeting it at D.",
            "Join BD and CD. With D as centre and radius BC draw an arc; with C as centre and radius BD draw an arc meeting it at E.",
            "Join CD and DE. With E as centre and radius CD draw an arc; with D as centre and radius CE draw an arc meeting it at F.",
            "Continue the same process to obtain points G, H, … approaching A on the required circumference.",
            "Join the sequence of points by freehand arcs to complete the circle."
          ]
        }
      },
      {
        "id": "13.2.1",
        "title": "13.2.1 Circumscribe a Circle About a Given Triangle",
        "page": 253,
        "theory": "Construct perpendicular bisectors of two sides of triangle ABC. Their intersection O is the circumcentre. With centre O and radius OA, draw the circle through A, B and C.",
        "rules": [
          "The circumcentre is equidistant from all three vertices."
        ],
        "diagram": {
          "type": "triangle-circle",
          "title": "Circumcircle about triangle ABC"
        },
        "construction": {
          "given": "A triangle ABC.",
          "required": "To circumscribe a circle about the given triangle.",
          "steps": [
            "Draw triangle ABC.",
            "Construct perpendicular bisectors of AB and BC; they meet at O.",
            "With centre O and radius OA (or OB or OC), draw the circle."
          ]
        }
      },
      {
        "id": "13.2.2",
        "title": "13.2.2 Inscribe a Circle in a Given Triangle",
        "page": 254,
        "theory": "Bisect two interior angles. Their intersection O is the incentre. Drop OD perpendicular to a side; with centre O and radius OD, draw the incircle.",
        "rules": [
          "The incentre is equidistant from all three sides."
        ],
        "diagram": {
          "type": "triangle-circle",
          "title": "Incircle in triangle ABC"
        },
        "construction": {
          "given": "A triangle ABC.",
          "required": "To inscribe a circle in the given triangle.",
          "steps": [
            "Draw the bisectors of two angles of the triangle; they meet at O.",
            "From O draw OD perpendicular to AB.",
            "With centre O and radius OD, draw the circle."
          ]
        }
      },
      {
        "id": "13.2.3",
        "title": "13.2.3 Escribe a Circle Opposite a Given Vertex",
        "page": 254,
        "theory": "Extend the sides through A to form exterior angles. Bisect the angles at A, B and C as shown; their intersection O is the excentre opposite A. Drop OF perpendicular to AB and draw the circle with radius OF.",
        "rules": [
          "The escribed circle opposite A touches BC and the extensions of AB and AC."
        ],
        "diagram": {
          "type": "triangle-circle",
          "title": "Escribed circle opposite vertex A"
        },
        "construction": {
          "given": "A triangle ABC.",
          "required": "To draw an escribed circle opposite vertex A.",
          "steps": [
            "Produce AB and AC to form exterior angles CBD and BCE.",
            "Draw the bisectors of ∠BAC, ∠CBD and ∠BCE; they meet at O.",
            "Draw OF perpendicular to AB.",
            "With centre O and radius OF, draw the circle touching BC and the produced sides."
          ]
        }
      },
      {
        "id": "13.2.4",
        "title": "13.2.4 Circumscribe an Equilateral Triangle About a Circle",
        "page": 255,
        "theory": "Mark three points A, T and U that divide the circumference into equal arcs (central angles 120°). Draw perpendiculars to OA, OT and OU at the three points; the tangent lines meet to form the circumscribed equilateral triangle.",
        "rules": [
          "The three contact points divide the circle into equal arcs."
        ],
        "diagram": {
          "type": "triangle-circle",
          "title": "Equilateral triangle circumscribed about a circle"
        },
        "construction": {
          "given": "A circle with centre O.",
          "required": "To circumscribe an equilateral triangle about the circle.",
          "steps": [
            "Take A on the circumference and join OA.",
            "At O construct ∠AOT=120° and ∠TOU=120°.",
            "A, T and U divide the circumference into three equal arcs.",
            "Draw perpendiculars to OA, OT and OU at A, T and U.",
            "Their pairwise intersections form the required equilateral triangle."
          ]
        }
      },
      {
        "id": "13.2.5",
        "title": "13.2.5 Inscribe an Equilateral Triangle in a Given Circle",
        "page": 256,
        "theory": "Draw a diameter AD. With centre D and radius OD, mark points B and C where the arcs meet the circle. Join A to B and C.",
        "rules": [
          "The three vertices cut the circumference into equal arcs."
        ],
        "diagram": {
          "type": "triangle-circle",
          "title": "Equilateral triangle inscribed in a circle"
        },
        "construction": {
          "given": "A circle with centre O.",
          "required": "To inscribe an equilateral triangle in the circle.",
          "steps": [
            "Draw a diameter AD.",
            "With D as centre and radius DO, draw arcs meeting the circle at B and C.",
            "Join AB and AC. Triangle ABC is the required equilateral triangle."
          ]
        }
      },
      {
        "id": "13.2.6",
        "title": "13.2.6 Circumscribe a Square About a Given Circle",
        "page": 256,
        "theory": "Draw perpendicular diameters AB and CD. Draw perpendicular tangent lines at their four endpoints; the four intersections form the circumscribed square EFGH.",
        "rules": [
          "A tangent is perpendicular to the radius at its point of contact."
        ],
        "diagram": {
          "type": "construction-square",
          "title": "Square circumscribed about a circle"
        },
        "construction": {
          "given": "A circle with centre O.",
          "required": "To circumscribe a square about the circle.",
          "steps": [
            "Draw a diameter AB.",
            "Draw another diameter CD perpendicular to AB.",
            "At A, B, C and D draw perpendiculars to the diameters.",
            "The four tangent lines meet at E, F, G and H; EFGH is the required square."
          ]
        }
      },
      {
        "id": "13.2.7",
        "title": "13.2.7 Inscribe a Square in a Given Circle",
        "page": 257,
        "theory": "Draw perpendicular diameters AB and CD. Join their endpoints consecutively to form the inscribed square ACBD.",
        "rules": [
          "The diagonals of the inscribed square are perpendicular diameters."
        ],
        "diagram": {
          "type": "construction-square",
          "title": "Square inscribed in a circle"
        },
        "construction": {
          "given": "A circle with centre O.",
          "required": "To inscribe a square in the circle.",
          "steps": [
            "Draw a diameter AB.",
            "Draw another diameter CD perpendicular to AB.",
            "Join AC, CB, BD and DA. ACBD is the required inscribed square."
          ]
        }
      },
      {
        "id": "13.2.8",
        "title": "13.2.8 Circumscribe a Regular Hexagon About a Given Circle",
        "page": 258,
        "theory": "Step off six equally spaced points A–F on the circle using the radius as compass width. Draw the three diameters through opposite points, then construct a tangent at each of the six points. Their consecutive intersections form the circumscribed regular hexagon.",
        "rules": [
          "The six contact points are equally spaced."
        ],
        "diagram": {
          "type": "construction-hexagon",
          "title": "Regular hexagon circumscribed about a circle"
        },
        "construction": {
          "given": "A circle with centre O.",
          "required": "To circumscribe a regular hexagon about the circle.",
          "steps": [
            "Take A on the circumference. With A as centre and radius OA, draw arcs meeting the circle at B and F.",
            "Repeat from B and F to mark C and E, then mark D.",
            "Draw diameters AD, BE and CF.",
            "At A, B, C, D, E and F draw perpendiculars to the respective diameters.",
            "The six tangent lines meet consecutively to form the required regular hexagon."
          ]
        }
      },
      {
        "id": "13.2.9",
        "title": "13.2.9 Inscribe a Regular Hexagon in a Given Circle",
        "page": 258,
        "theory": "Choose A on the circle. With compass width equal to the radius, step off six consecutive points around the circumference. Join consecutive points to form ABCDEF.",
        "rules": [
          "Each side of an inscribed regular hexagon equals the circle radius."
        ],
        "diagram": {
          "type": "construction-hexagon",
          "title": "Regular hexagon inscribed in a circle"
        },
        "construction": {
          "given": "A circle with centre O.",
          "required": "To inscribe a regular hexagon in the circle.",
          "steps": [
            "Take A on the circumference.",
            "With A as centre and radius OA, draw arcs meeting the circle at B and F.",
            "Repeat around the circumference to mark C, D and E.",
            "Join AB, BC, CD, DE, EF and FA. ABCDEF is the required hexagon."
          ]
        }
      },
      {
        "id": "13.3.1(i)",
        "title": "13.3.1(i) Draw a Tangent at the Midpoint of an Arc Without Its Centre",
        "page": 259,
        "theory": "Draw a chord AB through the given midpoint P. At P, construct a perpendicular to AB; that perpendicular is the tangent.",
        "rules": [
          "The tangent at the midpoint of an arc is perpendicular to the chord through that midpoint."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Tangent at the midpoint of an arc"
        },
        "construction": {
          "given": "An arc whose midpoint is P.",
          "required": "To draw the tangent at P without using the centre.",
          "steps": [
            "Draw chord AB with P the midpoint of the arc AB.",
            "Draw the perpendicular from the midpoint P to AB to locate the centre line.",
            "At P draw the perpendicular to that centre line; this is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.1(ii)",
        "title": "13.3.1(ii) Draw a Tangent at an Arc Endpoint Without Its Centre",
        "page": 260,
        "theory": "Choose Q on arc AP and draw chords AP and PQ. Join A to Q. At P, copy ∠PAQ to form ∠QPT; PT is the required tangent.",
        "rules": [
          "Copy the angle in the alternate segment."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Tangent at endpoint P using an angle copy"
        },
        "construction": {
          "given": "An arc AP with endpoint P.",
          "required": "To draw a tangent to the arc at P without using the centre.",
          "steps": [
            "Take Q on arc AP and draw chords AP and PQ.",
            "Join A to Q.",
            "At P construct ∠QPT equal to ∠PAQ.",
            "PT is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.1(iii)",
        "title": "13.3.1(iii) Draw a Tangent Through a Point Outside an Arc Without Its Centre",
        "page": 260,
        "theory": "Join A to the external point P; let the line meet the arc at B. Bisect AP at D and draw a semicircle on AP as diameter. Construct BC perpendicular to AP to meet it at C. With centre P and radius PC, mark E on the given arc and draw PE.",
        "rules": [
          "The auxiliary semicircle provides the right angle needed for the tangent construction."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Tangent from an external point to a given arc"
        },
        "construction": {
          "given": "An arc and a point P outside the arc.",
          "required": "To draw a tangent through P without using the centre.",
          "steps": [
            "Join A to P; the line meets the arc at B. Bisect AP at D.",
            "With D as centre and DP as radius, draw a semicircle on AP.",
            "Draw BC perpendicular to AP to meet the semicircle at C.",
            "With P as centre and PC as radius, draw an arc meeting the given arc at E.",
            "Join PE; PE is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.2(i)",
        "title": "13.3.2(i) Draw a Tangent at a Point on the Circle",
        "page": 260,
        "theory": "Join centre O to point P. At P, draw a perpendicular to OP; this line is the tangent.",
        "rules": [
          "The tangent at P is perpendicular to radius OP."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Tangent at point P on the circle"
        },
        "construction": {
          "given": "A circle with centre O and a point P on its circumference.",
          "required": "To draw a tangent to the circle at P.",
          "steps": [
            "Draw OP.",
            "At P draw a perpendicular to OP.",
            "This perpendicular is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.2(ii)",
        "title": "13.3.2(ii) Draw Tangents from an External Point",
        "page": 261,
        "theory": "With P as centre and radius PO, draw an arc. With O as centre and the circle diameter as radius, draw another arc meeting it at E. Join OE to meet the circle at F, then draw PF.",
        "rules": [
          "The tangent from P touches the circle at F."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Tangent from an external point P"
        },
        "construction": {
          "given": "A circle with centre O and an external point P.",
          "required": "To draw a tangent to the circle from P.",
          "steps": [
            "With P as centre and radius PO draw an arc.",
            "With O as centre and the circle diameter as radius, draw an arc meeting the first arc at E.",
            "Join OE; it meets the circle at F.",
            "Draw PF. PF is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.3",
        "title": "13.3.3 Draw Two Tangents Meeting at a Given Angle",
        "page": 261,
        "theory": "Draw a diameter AB. At O construct ∠BOD equal to the given angle θ. At D draw DE perpendicular to OD and at A draw AG perpendicular to OA. Their intersection H gives the two tangents DH and AH, which meet at angle θ.",
        "rules": [
          "The angle between two tangents and the corresponding central angle are supplementary."
        ],
        "diagram": {
          "type": "tangent",
          "title": "Two tangents meeting at a prescribed angle"
        },
        "construction": {
          "given": "A circle with centre O and a given angle θ.",
          "required": "To draw two tangents meeting at angle θ.",
          "steps": [
            "Draw a diameter AB.",
            "At O construct ∠BOD=θ.",
            "At D draw DE perpendicular to OD; at A draw AG perpendicular to OA.",
            "The perpendiculars meet at H.",
            "DH and AH are the required tangents."
          ]
        }
      },
      {
        "id": "13.3.4(i)",
        "title": "13.3.4(i) Draw Direct Common Tangents to Two Equal Circles",
        "page": 262,
        "theory": "Join the centres O and P. Draw equal perpendicular offsets at the centres to locate the contact points A and B. Join A to B and extend the line.",
        "rules": [
          "The direct common tangent is parallel to the line joining centres."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Direct common tangent to equal circles"
        },
        "construction": {
          "given": "Two equal circles with centres O and P.",
          "required": "To draw a direct (external) common tangent.",
          "steps": [
            "Join OP.",
            "At O and P draw perpendiculars to OP, meeting the circles at A and B.",
            "Join AB and extend it in both directions. AB is the required direct common tangent."
          ]
        }
      },
      {
        "id": "13.3.4(ii)",
        "title": "13.3.4(ii) Draw Transverse Common Tangents to Two Equal Circles",
        "page": 262,
        "theory": "Join OP and bisect it at C. Bisect CP at D; draw a semicircle on CP as diameter and mark E on the circle. Join EP, draw OF parallel to EP, then join EF and extend it as the transverse common tangent.",
        "rules": [
          "The auxiliary right triangle locates the equal tangent direction."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Transverse common tangent to equal circles"
        },
        "construction": {
          "given": "Two equal circles with centres O and P.",
          "required": "To draw a transverse (internal) common tangent.",
          "steps": [
            "Join OP and bisect it at C. Bisect CP at D.",
            "Draw a semicircle on CP as diameter and mark E on it.",
            "Join EP. Through O draw OF parallel to EP.",
            "Join EF and extend the line; it is the required transverse common tangent."
          ]
        }
      },
      {
        "id": "13.3.5(i)",
        "title": "13.3.5(i) Draw a Direct Common Tangent to Two Unequal Circles",
        "page": 263,
        "theory": "Join centres O and P. Construct the auxiliary semicircle and the reduced-radius arc described in the scan to locate the tangent direction. Transfer that direction by a parallel through P; joining the contact points gives the direct common tangent.",
        "rules": [
          "Use the difference of the radii in the auxiliary construction."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Direct common tangent to unequal circles"
        },
        "construction": {
          "given": "Two unequal circles with centres O and P.",
          "required": "To draw a direct (external) common tangent.",
          "steps": [
            "Join OP; it meets the circles at R and S. Bisect OP at Q.",
            "With Q as centre and QP as radius, draw a semicircle.",
            "On the larger circle choose T so that arc RT equals the radius of the smaller circle.",
            "With O as centre and OT as radius draw an arc meeting the semicircle at L.",
            "Join OL to meet the larger circle at M. Through P draw PN parallel to OM.",
            "Join MN and extend it; MN is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.5(ii)",
        "title": "13.3.5(ii) Draw a Transverse Common Tangent to Two Unequal Circles",
        "page": 264,
        "theory": "Join and extend the line of centres. Use the sum of the radii to construct the auxiliary semicircle, locate the tangent direction with the bisector arc, then transfer the parallel through the smaller-circle centre. Join the two contact points.",
        "rules": [
          "Use the sum of the radii in the auxiliary construction."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Transverse common tangent to unequal circles"
        },
        "construction": {
          "given": "Two unequal circles with centres O and P, with r₁>r₂.",
          "required": "To draw a transverse (internal) common tangent.",
          "steps": [
            "Join OP and produce it in both directions. Draw a segment AB whose length is r₁+r₂.",
            "With O as centre and radius AB, draw a semicircle.",
            "Bisect OP at C. With C as centre and radius OC, draw an arc meeting the semicircle at Q.",
            "Draw OQ to meet the larger circle at T. Through P draw PS parallel to OQ in the opposite direction; it meets the smaller circle at S.",
            "Join TS and extend it in both directions. TS is the required transverse common tangent."
          ]
        }
      },
      {
        "id": "13.3.6(a)",
        "title": "13.3.6(a) Draw a Tangent to Two Unequal Touching Circles",
        "page": 265,
        "theory": "Join the centres O and P; the line passes through contact point T. At T draw a perpendicular to OP. This is the common tangent.",
        "rules": [
          "The common tangent at the touching point is perpendicular to the line of centres."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Common tangent at the contact point"
        },
        "construction": {
          "given": "Two unequal circles touching at T, with centres O and P.",
          "required": "To draw their common tangent.",
          "steps": [
            "Join O and P; OP passes through T.",
            "At T draw a perpendicular to OP. This is the common tangent."
          ]
        }
      },
      {
        "id": "13.3.6(b)",
        "title": "13.3.6(b) Draw a Tangent to Two Unequal Intersecting Circles",
        "page": 265,
        "theory": "Join the centres and construct the auxiliary semicircle and radii shown in the figure. The construction locates the tangent contact points on both circles; join and extend them to obtain the common tangent.",
        "rules": [
          "The auxiliary semicircle produces a right angle at the constructed contact point."
        ],
        "diagram": {
          "type": "pair-circles",
          "title": "Common tangent to intersecting circles"
        },
        "construction": {
          "given": "Two unequal intersecting circles with centres O and P.",
          "required": "To draw a common tangent to the given circles.",
          "steps": [
            "Join OP and produce it to the right. Draw PQ as a radius of the smaller circle so that PQ is not along OP. Draw OR, a radius of the larger circle, parallel to PQ.",
            "Join RQ and produce it to meet OP produced at S. Bisect OS at T and draw a semicircle on OS as diameter; it cuts the larger circle at L.",
            "Join S and L and produce the line to M. SM is the required tangent."
          ]
        }
      },
      {
        "id": "13.3.7(i)",
        "title": "13.3.7(i) Draw a Circle Which Touches Both the Arms of a Given Angle",
        "page": 266,
        "theory": "Bisect ∠ABC. Choose O on the bisector and drop OF perpendicular to BC. With centre O and radius OF, draw the circle; it touches both arms.",
        "rules": [
          "The centre lies on the angle bisector and is equally distant from both arms."
        ],
        "diagram": {
          "type": "angle-circle",
          "title": "Circle tangent to both arms of an angle"
        },
        "construction": {
          "given": "An angle ∠ABC with vertex B and arms AB and BC.",
          "required": "To draw a circle touching both arms of the angle.",
          "steps": [
            "Draw BD, the bisector of ∠ABC.",
            "Take any point O on BD and draw OF perpendicular to BC.",
            "With O as centre and OF as radius, draw the circle. It touches both arms."
          ]
        }
      },
      {
        "id": "13.3.7(ii)",
        "title": "13.3.7(ii) Draw a Circle Which Touches Two Converging Lines and Passes Through a Given Point Between Them",
        "page": 267,
        "theory": "Bisect the angle between the lines. Draw an auxiliary circle centred on the bisector, then use the given point and the auxiliary circle to locate the centre of the required circle.",
        "rules": [
          "The centre of the required circle lies on the angle bisector."
        ],
        "diagram": {
          "type": "angle-circle",
          "title": "Circle tangent to two lines and passing through a given point"
        },
        "construction": {
          "given": "Two converging lines LA and KC meeting at B, and a point D between them.",
          "required": "To draw a circle touching both lines and passing through D.",
          "steps": [
            "Draw BE, the bisector of ∠ABC.",
            "Take F on BE and draw FG perpendicular to BC. With F as centre and FG as radius, draw an auxiliary circle.",
            "Join D to B; DB cuts the auxiliary circle at H. Join FH and draw DO parallel to FH.",
            "With O as centre and OD as radius, draw the required circle."
          ]
        }
      }
    ],
    "workedExamples": [],
    "exercises": [
      {
        "exercise": "13.1",
        "page": 256,
        "title": "Exercise 13.1",
        "problems": [
          {
            "qNo": "1",
            "question": "Construct a triangle with sides 2 cm, 2.5 cm and 3 cm. Also draw its circumcircle.",
            "solution": "Construct the triangle by SSS; bisect two sides perpendicularly to locate the circumcentre; draw the circle.",
            "answer": "Construction."
          },
          {
            "qNo": "2",
            "question": "Construct ΔABC with AB=3 cm, AC=4 cm and ∠A=60°. Draw its circumcircle.",
            "solution": "Construct the two sides and included angle; locate the circumcentre using perpendicular bisectors.",
            "answer": "Construction."
          },
          {
            "qNo": "3",
            "question": "Construct a triangle with side lengths 3 cm, 4 cm and 6 cm. Draw its inscribed circle.",
            "solution": "Construct by SSS; intersect two angle bisectors and use the perpendicular distance to a side as radius.",
            "answer": "Construction."
          },
          {
            "qNo": "4",
            "question": "Construct ΔABC with AB=5 cm, BC=6 cm and CA=8 cm. Draw perpendicular bisectors of its sides and then its circumcircle.",
            "solution": "Construct the triangle, find the circumcentre, and draw the circumcircle.",
            "answer": "Construction."
          },
          {
            "qNo": "5",
            "question": "Construct a triangle ABC with ∠A=60° and ∠B=45°. Draw the three angle bisectors and then its incircle.",
            "solution": "Construct the triangle from the two angles and a chosen side as shown; locate the incentre and radius.",
            "answer": "Construction."
          },
          {
            "qNo": "6",
            "question": "An equilateral triangle is inscribed in a circle. Find the altitude if the radius is (i) 3, (ii) 4, (iii) 6 and (iv) 12 units. Deduce a result.",
            "solution": "For an equilateral triangle, its circumradius R=2h/3, so h=3R/2.",
            "answer": "Altitudes: 4.5, 6, 9 and 18 units; h=3r/2."
          },
          {
            "qNo": "7",
            "question": "An equilateral triangle is circumscribed about a circle. Find its altitude if the radius is (i) 2, (ii) 5 and (iii) 10 units. Deduce a result.",
            "solution": "The circle radius is the triangle inradius r=h/3.",
            "answer": "Altitudes: 6, 15 and 30 units; h=3r."
          },
          {
            "qNo": "8",
            "question": "Circumscribe an equilateral triangle about circles of radii 2, 3 and 1 inches.",
            "solution": "Draw three tangents with equal 120° central spacing.",
            "answer": "Construction."
          },
          {
            "qNo": "9",
            "question": "Construct a triangle with sides 2.5 cm, 3.5 cm and 4.5 cm. Draw an escribed circle touching the longest side.",
            "solution": "Construct by SSS, find the excentre opposite the required side and the perpendicular radius.",
            "answer": "Construction."
          },
          {
            "qNo": "10",
            "question": "For the triangle in Q9, draw an escribed circle touching the smallest side.",
            "solution": "Locate the corresponding excentre and use the perpendicular distance to the side.",
            "answer": "Construction."
          }
        ]
      },
      {
        "exercise": "13.2",
        "page": 261,
        "title": "Exercise 13.2",
        "problems": [
          {
            "qNo": "1",
            "question": "Circumscribe a square about a circle of radius 5 cm.",
            "solution": "Draw perpendicular diameters and tangent lines at their endpoints.",
            "answer": "Construction."
          },
          {
            "qNo": "2",
            "question": "Inscribe a square in a circle of radius 6 cm.",
            "solution": "Draw perpendicular diameters and join the four endpoints.",
            "answer": "Construction."
          },
          {
            "qNo": "3",
            "question": "Draw a square of side 6 cm. Circumscribe a circle about it and inscribe a circle in the same square. Measure the radii of these two circles.",
            "solution": "The circumradius is half the diagonal; the inradius is half the side.",
            "answer": "Circumradius=3√2 cm; inradius=3 cm."
          },
          {
            "qNo": "4",
            "question": "Draw a circle of suitable radius so that a square circumscribed about it has side length 8 units.",
            "solution": "The circle is the incircle of the square, so its diameter equals the square side.",
            "answer": "Radius=4 units."
          },
          {
            "qNo": "5",
            "question": "Inscribe a square of side 10 cm in a circle. What is the radius?",
            "solution": "The square diagonal is the circle diameter: d=10√2.",
            "answer": "r=5√2 cm."
          },
          {
            "qNo": "6",
            "question": "Inscribe a regular hexagon in a circle of radius 4 cm.",
            "solution": "Step the radius around the circumference six times and join adjacent points.",
            "answer": "Each side is 4 cm."
          },
          {
            "qNo": "7",
            "question": "Construct a circle of radius 4 cm and draw a regular hexagon about the circle.",
            "solution": "Mark six equally spaced tangent points and draw tangent lines at them.",
            "answer": "Construction."
          },
          {
            "qNo": "8",
            "question": "Draw a circle of radius 8 cm. Circumscribe and inscribe regular hexagons; find their areas and compare.",
            "solution": "For the inscribed hexagon each side is r. For the circumscribed hexagon, the circle radius is the apothem and each side is 2r/√3.",
            "answer": "Inscribed area=96√3 cm²; circumscribed area=128√3 cm²."
          },
          {
            "qNo": "9",
            "question": "Draw two regular hexagons with perimeters 6 cm and 30 cm. Find their centres and draw a perpendicular from each centre to one side. What is the relation between the perpendiculars?",
            "solution": "For a regular hexagon the apothem is (√3/2) times its side. The side lengths are 1 cm and 5 cm.",
            "answer": "The perpendiculars are in the ratio 1:5."
          },
          {
            "qNo": "10",
            "question": "Can you construct a square whose area equals the area of a given circle? Discuss in detail.",
            "solution": "A square with the same area would need side r√π. Exact straightedge-and-compass construction would require constructing √π, which is impossible because π is transcendental.",
            "answer": "No exact straightedge-and-compass construction; only an approximation."
          }
        ]
      },
      {
        "exercise": "13.3",
        "page": 267,
        "title": "Exercise 13.3",
        "problems": [
          {
            "qNo": "1",
            "question": "Draw an arc of length 7 cm. Without using its centre, construct a tangent through P when P is (i) the middle of the arc, (ii) an endpoint, and (iii) outside the arc.",
            "solution": "Follow the three chord-and-angle constructions shown in subsection 13.3.1.",
            "answer": "Construction."
          },
          {
            "qNo": "2",
            "question": "Draw a circle through point D and tangent to line BC at D.",
            "solution": "Construct a perpendicular to BC at D; choose the centre on that perpendicular and draw the circle through D.",
            "answer": "Construction."
          },
          {
            "qNo": "3",
            "question": "Describe a circle of radius 4 cm through point C and tangent to straight line AB.",
            "solution": "The centre lies on the line parallel to AB at distance 4 cm and on the circle of radius 4 cm centred at C.",
            "answer": "Construct the intersection centre(s) and draw the circle(s)."
          },
          {
            "qNo": "4",
            "question": "A circle has radius 2.5 cm. Point Q is 5 cm from its centre. Draw a tangent from Q to the circle.",
            "solution": "Construct the midpoint of OQ, draw the auxiliary circle on diameter OQ, and join Q to an intersection point.",
            "answer": "Two tangent segments."
          },
          {
            "qNo": "5",
            "question": "Two circles have radii 2 cm and 3 cm and their centres are 8 cm apart. Draw direct common tangents.",
            "solution": "Use the auxiliary circle with radius difference 1 cm to determine the tangent direction, then draw parallel tangents.",
            "answer": "Construction."
          },
          {
            "qNo": "6",
            "question": "Two congruent circles of radius 4 cm have centres 10 cm apart. Draw transverse common tangents.",
            "solution": "Use the midpoint/auxiliary circle construction for equal radii and transfer the tangent lines.",
            "answer": "Construction."
          },
          {
            "qNo": "7",
            "question": "Two circles have radii 2 cm and 2.5 cm; their centres are 5.5 cm apart. Draw transverse common tangents.",
            "solution": "Use the auxiliary circle with radius sum 4.5 cm to locate the common tangent direction.",
            "answer": "Construction."
          },
          {
            "qNo": "8",
            "question": "Draw ΔABC with ∠B=60°. Construct a circle of radius 2.5 cm tangent to both arms of the angle.",
            "solution": "Locate the centre on the angle bisector at perpendicular distance 2.5 cm from each arm.",
            "answer": "Construction."
          }
        ]
      },
      {
        "exercise": "Review Exercise 13",
        "page": 268,
        "title": "Review Exercise 13",
        "problems": [
          {
            "qNo": "(i)",
            "question": "The measure of an exterior angle of a regular hexagon is _____.",
            "solution": "360°/6=60°=π/3.",
            "answer": "π/3",
            "options": [
              "π/3",
              "π/4",
              "π/6",
              "None"
            ]
          },
          {
            "qNo": "(ii)",
            "question": "Tangents drawn at the endpoints of a diameter are _____.",
            "solution": "Both tangent lines are perpendicular to the same diameter, so they are parallel.",
            "answer": "Parallel",
            "options": [
              "Parallel",
              "Perpendicular",
              "Intersecting",
              "None"
            ]
          },
          {
            "qNo": "(iii)",
            "question": "How many tangents can be drawn from a point outside a circle?",
            "solution": "There are two points of contact.",
            "answer": "2",
            "options": [
              "1",
              "2",
              "3",
              "4"
            ]
          },
          {
            "qNo": "(iv)",
            "question": "If the distance between the centres of two circles equals the sum of their radii, the circles _____.",
            "solution": "This is the condition for external tangency.",
            "answer": "Touch externally",
            "options": [
              "Intersect",
              "Do not intersect",
              "Touch externally",
              "Touch internally"
            ]
          },
          {
            "qNo": "2",
            "question": "Practically find the centre of arc ABC.",
            "solution": "Use perpendicular bisectors of two chords of the arc.",
            "answer": "Construction."
          },
          {
            "qNo": "3",
            "question": "Escribe a circle opposite vertex A of ΔABC with AB=5 cm, BC=4 cm and CA=3 cm. Find its radius also.",
            "solution": "The triangle is right-angled at C. Its exradius opposite A is area/(s−a), with a=BC=4 and area=6.",
            "answer": "Radius=6/(6−4)=3 cm."
          },
          {
            "qNo": "4",
            "question": "Circumscribe a circle about an equilateral triangle ABC with side 5 cm.",
            "solution": "Construct perpendicular bisectors; the circumradius is a/√3.",
            "answer": "R=5/√3 cm."
          },
          {
            "qNo": "5",
            "question": "Circumscribe a regular hexagon about a circle of radius 4 cm.",
            "solution": "Construct six equally spaced tangents.",
            "answer": "Construction."
          },
          {
            "qNo": "6",
            "question": "Construct a circle of radius 3 cm and draw two tangents making an angle of 60° with each other.",
            "solution": "The line joining the centre to the external vertex bisects the 60° angle; set the perpendicular distance to a tangent equal to 3 cm.",
            "answer": "Construction."
          },
          {
            "qNo": "7",
            "question": "Draw two equal circles of radius 3.5 cm whose centres are 7 cm apart. Draw their transverse common tangents.",
            "solution": "The circles touch externally; use the common point and the tangent perpendicular to the line of centres.",
            "answer": "Construction."
          },
          {
            "qNo": "8",
            "question": "Draw two common tangents to two intersecting circles of radii 2.5 cm and 3.5 cm.",
            "solution": "Use the external common tangent construction from subsection 13.3.5.",
            "answer": "Construction."
          },
          {
            "qNo": "9",
            "question": "Draw two common tangents to two externally touching circles of radii 3 cm and 4 cm.",
            "solution": "Use the common point of contact and the direct common-tangent construction.",
            "answer": "Construction."
          }
        ]
      }
    ],
    "slos": [
      "Construct a circle passing through three non-collinear points and complete an incomplete circle arc",
      "Circumscribe a circle about a given triangle",
      "Inscribe a circle in a given triangle",
      "Escribe a circle opposite to a given vertex of a triangle",
      "Construct tangents to a circle from a point on the circumference and from an external point",
      "Construct direct (external) and transverse (internal) common tangents to two circles"
    ],
    "formulaSheet": [
      {
        "name": "Circumcentre",
        "formula": "Intersection of perpendicular bisectors of triangle sides"
      },
      {
        "name": "Incentre",
        "formula": "Intersection of interior angle bisectors"
      },
      {
        "name": "Circle tangent to both arms",
        "formula": "Centre lies on the angle bisector"
      },
      {
        "name": "Regular polygon exterior angle",
        "formula": "360°/n"
      }
    ],
    "classId": "cls10"
  }
];

// Class 12 Mathematics follows the printed KPTBB unit order.
// Lesson, example and exercise content is shown from the source scans, not
// reconstructed from the irregular Word transcription.
const MATH_12_BOOK_DATA = [
  { number: 1, id: "math12-unit-1", title: "Introduction to Symbolic Package, Maple", pageRange: "Pages 1–24", pageStart: 1, pageEnd: 24, examplePageStart: 3, exercisePageStart: 1, sections: [
    { id: "1.1", title: "Introduction" },
    { id: "1.2", title: "Polynomials" },
    { id: "1.3", title: "Graphics" },
    { id: "1.4", title: "Matrices" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 2, id: "math12-unit-2", title: "Functions and Limits", pageRange: "Pages 25–62", pageStart: 25, pageEnd: 62, examplePageStart: 26, exercisePageStart: 31, sections: [
    { id: "2.1", title: "Functions" },
    { id: "2.2", title: "Composition of Functions" },
    { id: "2.3", title: "Inverse of the Composition of Functions" },
    { id: "2.4", title: "Transcendental Functions" },
    { id: "2.5", title: "Real Representations" },
    { id: "2.6", title: "Limit of a Function" },
    { id: "2.7", title: "Important Limits" },
    { id: "2.8", title: "Continuous and Discontinuous Functions" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 3, id: "math12-unit-3", title: "Differentiation", pageRange: "Pages 63–100", pageStart: 63, pageEnd: 100, examplePageStart: 65, exercisePageStart: 70, sections: [
    { id: "3.1", title: "Derivative of a Function" },
    { id: "3.2", title: "Theorems on Differentiation" },
    { id: "3.3", title: "Application of Theorems on Differentiation" },
    { id: "3.4", title: "Chain Rule" },
    { id: "3.5", title: "Differentiation of Trigonometric and Inverse Trigonometric Functions" },
    { id: "3.6", title: "Differentiation of Exponential and Logarithmic Functions" },
    { id: "3.7", title: "Differentiation of Hyperbolic and Inverse Hyperbolic Functions" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 4, id: "math12-unit-4", title: "Higher Order Derivatives and Applications", pageRange: "Pages 101–129", pageStart: 101, pageEnd: 129, examplePageStart: 101, exercisePageStart: 118, sections: [
    { id: "4.1", title: "Higher Order Derivatives" },
    { id: "4.2", title: "Maclaurin's and Taylor's Expansions" },
    { id: "4.3", title: "Applications of Derivatives" },
    { id: "4.4", title: "Maxima and Minima" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 5, id: "math12-unit-5", title: "Differentiation of Vector Functions", pageRange: "Pages 130–141", pageStart: 130, pageEnd: 141, examplePageStart: 131, exercisePageStart: 139, sections: [
    { id: "5.1", title: "Scalar and Vector Functions" },
    { id: "5.2", title: "Limit and Continuity" },
    { id: "5.3", title: "Derivative of Vector Functions" },
    { id: "5.4", title: "Vector Differentiation" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 6, id: "math12-unit-6", title: "Integration", pageRange: "Pages 142–177", pageStart: 142, pageEnd: 177, examplePageStart: 158, exercisePageStart: 158, sections: [
    { id: "6.1", title: "Introduction" },
    { id: "6.2", title: "Rules of Integration" },
    { id: "6.3", title: "Integration by Substitution" },
    { id: "6.4", title: "Integration by Parts" },
    { id: "6.5", title: "Integration by Partial Fractions" },
    { id: "6.6", title: "Definite Integral" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 7, id: "math12-unit-7", title: "Plane Analytic Geometry: Straight Line", pageRange: "Pages 178–212", pageStart: 178, pageEnd: 212, examplePageStart: 181, exercisePageStart: 183, sections: [
    { id: "7.1", title: "Division of a Line Segment" },
    { id: "7.2", title: "Slope of a Straight Line" },
    { id: "7.3", title: "Equation of a Straight Line Parallel to Coordinate Axes" },
    { id: "7.4", title: "Standard Form of the Equation of a Straight Line" },
    { id: "7.5", title: "Distance of a Point to a Line" },
    { id: "7.6", title: "Angle Between Lines" },
    { id: "7.7", title: "Concurrency of Straight Lines" },
    { id: "7.8", title: "Area of a Triangular Region" },
    { id: "7.9", title: "Homogeneous Equation" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 8, id: "math12-unit-8", title: "Conics I", pageRange: "Pages 213–240", pageStart: 213, pageEnd: 240, examplePageStart: 214, exercisePageStart: 222, sections: [
    { id: "8.1", title: "Conics and Members of Its Family" },
    { id: "8.2", title: "Circle" },
    { id: "8.3", title: "Tangents and Normal" },
    { id: "8.4", title: "Properties of Circle" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 9, id: "math12-unit-9", title: "Conics II", pageRange: "Pages 241–285", pageStart: 241, pageEnd: 285, examplePageStart: 244, exercisePageStart: 250, sections: [
    { id: "9.1", title: "Parabola" },
    { id: "9.2", title: "Ellipse" },
    { id: "9.3", title: "Hyperbola" },
    { id: "9.4", title: "Translation and Rotation of Axes" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 10, id: "math12-unit-10", title: "Differential Equations", pageRange: "Pages 286–299", pageStart: 286, pageEnd: 299, examplePageStart: 287, exercisePageStart: 290, sections: [
    { id: "10.1", title: "Ordinary Differential Equations" },
    { id: "10.2", title: "Formation of Differential Equations" },
    { id: "10.3", title: "Solution of Differential Equations" },
    { id: "10.4", title: "Orthogonal Trajectories" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 11, id: "math12-unit-11", title: "Partial Differentiation", pageRange: "Pages 300–308", pageStart: 300, pageEnd: 308, examplePageStart: 302, exercisePageStart: 303, sections: [
    { id: "11.1", title: "Differentiation of the Function of Two Variables" },
    { id: "11.2", title: "Euler's Theorem" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] },
  { number: 12, id: "math12-unit-12", title: "Introduction to Numerical Methods", pageRange: "Pages 309–325", pageStart: 309, pageEnd: 325, examplePageStart: 311, exercisePageStart: 316, sections: [
    { id: "12.1", title: "Numerical Solution of Non-Linear Equations" },
    { id: "12.2", title: "Numerical Quadrature" }
  ], workedExamples: [], exercises: [], slos: { mcqs: [], shortQuestions: [], longQuestions: [] }, formulaSheet: [] }
];

const MATH_12_BOOK_PARTS = [
  { number: 1, label: "Part 1", url: "file:///D:/SpaceBook/Books/12th/12th%20Maths/PDF/001_page_1_and_356_more_part_01_of_05.pdf" },
  { number: 2, label: "Part 2", url: "file:///D:/SpaceBook/Books/12th/12th%20Maths/PDF/001_page_1_and_356_more_part_02_of_05.pdf" },
  { number: 3, label: "Part 3", url: "file:///D:/SpaceBook/Books/12th/12th%20Maths/PDF/001_page_1_and_356_more_part_03_of_05.pdf" },
  { number: 4, label: "Part 4", url: "file:///D:/SpaceBook/Books/12th/12th%20Maths/PDF/001_page_1_and_356_more_part_04_of_05.pdf" },
  { number: 5, label: "Part 5", url: "file:///D:/SpaceBook/Books/12th/12th%20Maths/PDF/001_page_1_and_356_more_part_05_of_05.pdf" }
];

// These ranges were checked against the printed page numbers in the scans.
// Pages 142–157 do not occur in the supplied PDF parts or JPG set.
const MATH_12_PRINTED_PAGE_SOURCES = [
  { start: 1, end: 72, part: 1, pdfPageStart: 6 },
  { start: 73, end: 141, part: 2, pdfPageStart: 2 },
  { start: 158, end: 173, part: 3, pdfPageStart: 2 },
  { start: 174, end: 189, part: 2, pdfPageStart: 71 },
  { start: 190, end: 240, part: 3, pdfPageStart: 34 },
  { start: 241, end: 323, part: 4, pdfPageStart: 2 },
  { start: 324, end: 349, part: 5, pdfPageStart: 2 }
];

const MATH_12_BOOK_META = {
  printedPageEnd: 349,
  missingPrintedPages: [{ start: 142, end: 157 }],
  answerStart: 326
};

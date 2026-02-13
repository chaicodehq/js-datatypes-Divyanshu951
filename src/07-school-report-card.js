/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here

  // Edge cases
  if (typeof student !== "object" || student == null) return null;
  if (typeof student.name !== "string" || !student.name) return null;
  if (
    typeof student.marks !== "object" ||
    Object.entries(student.marks).length === 0
  )
    return null;

  // Logic
  const subjectObj = Object.values(student)[1];
  const marksArray = Object.values(subjectObj);

  // Edge case check for invalid marks
  for (let index = 0; index < marksArray.length; index++) {
    if (
      typeof marksArray[index] !== "number" ||
      marksArray[index] < 0 ||
      marksArray[index] > 100
    )
      return null;
  }

  const subjectArr = Object.entries(subjectObj);
  const totalMarks = marksArray.reduce((total, mark) => (total += mark), 0);
  const percentage = parseFloat(
    ((totalMarks / (marksArray.length * 100)) * 100).toFixed(2),
  );
  let grade;
  switch (true) {
    case +percentage >= 90:
      grade = "A+";
      break;
    case +percentage >= 80:
      grade = "A";
      break;
    case +percentage >= 70:
      grade = "B";
      break;
    case +percentage >= 60:
      grade = "C";
      break;
    case +percentage >= 40:
      grade = "D";
      break;
    default:
      grade = "F";
  }

  // highestSubject and lowestSubject
  const highestSubject = subjectArr.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max,
  )[0];

  const lowestSubject = subjectArr.reduce((min, curr) =>
    curr[1] < min[1] ? curr : min,
  )[0];

  // passedSubjects and failedSubjects
  const passedAndFailedSubjects = subjectArr.reduce(
    (acc, curr) => {
      if (curr[1] >= 40)
        acc[0].push(curr[0]); // Pass
      else if (curr[1] < 40) acc[1].push(curr[0]); // Fail
      return acc;
    },
    [[], []],
  );

  const [passedSubjects, failedSubjects] = passedAndFailedSubjects;
  const subjectCount = subjectArr.length;

  return {
    name: student.name,
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount,
  };
}

// console.log(
//   generateReportCard({
//     name: "Rahul",
//     marks: {},
//   }),
// );

// const ans = { name: string,
//    totalMarks: number,
//     percentage: number,
//      grade: string,
//       highestSubject: string,
//        lowestSubject: string,
//         passedSubjects: string[], failedSubjects: string[], subjectCount: number }

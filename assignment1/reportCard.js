class Student {
  constructor(name, scores) {
    this.name = name;
    this.scores = scores;
  }

  get average() {
    if (this.scores.length === 0) return 0;
    
    let total = 0;
    for (let i = 0; i < this.scores.length; i++) {
      total += this.scores[i];
    }
    return total / this.scores.length;
  }

  get letterGrade() {
    const avg = this.average;
    
    if (avg >= 95) return 'A';
    if (avg >= 90) return 'B';
    if (avg >= 85) return 'C';
    if (avg >= 80) return 'D';
    return 'F';
  }

  summary() {
    if (this.scores.length === 0) {
      return { highest: 0, lowest: 0 };
    }

    let highest = this.scores[0];
    let lowest = this.scores[0];

    for (let i = 1; i < this.scores.length; i++) {
      if (this.scores[i] > highest) {
        highest = this.scores[i];
      }
      if (this.scores[i] < lowest) {
        lowest = this.scores[i];
      }
    }

    return { highest, lowest };
  }
}

function getRemark(grade) {
  switch (grade) {
    case 'A': return "Outstanding performance! You're an absolute prodigy, *sugoi*!";
    case 'B': return "Good job, keep it up! *Ganbatte*!";
    case 'C': return "Decent effort, room for improvement. Don't get careless, *baka*!";
    case 'D': return "Passed, but needs a lot of focus. *Chotto matte*... you can do way better than this!";
    case 'F': return "Failed. Please seek academic support. This is a total disaster, *yamete*!";
    default: return 'No grade recorded.';
  }
}

const studentName = process.argv[2];
const rawScores = process.argv.slice(3);
const parsedScores = [];

for (let i = 0; i < rawScores.length; i++) {
  parsedScores.push(Number(rawScores[i]));
}

if (!studentName) {
  console.error("Error: Please provide a student name.");
  console.error("Usage: node reportCard.js [Name] [Score1] [Score2] [Score3] ...");
  process.exit(1);
}

if (parsedScores.length < 3) {
  console.error("Error: You must provide at least 3 exam scores.");
  process.exit(1);
}

const student = new Student(studentName, parsedScores);
const [score1, score2, ...remainingScores] = student.scores;

let remainingExamsText = "";
for (let i = 0; i < remainingScores.length; i++) {
  const examNumber = i + 3;
  let suffix = "th";
  if (examNumber === 3) suffix = "rd";

  remainingExamsText += `\n  - ${examNumber}${suffix} Exam    : ${remainingScores[i]}`;
}

if (remainingScores.length === 0) {
  remainingExamsText = "\n  - Remaining   : None";
}

const avgFormatted = student.average.toFixed(1);
const grade = student.letterGrade;
const { highest, lowest } = student.summary();
const status = student.average >= 60 ? 'PASS' : 'FAIL';
const remark = getRemark(grade);

console.log(`
============================================
             ACADEMIC REPORT CARD           
============================================
Student Name : ${student.name}
Status       : ${status}
--------------------------------------------
SCORE BREAKDOWN:
  - First Exam  : ${score1}
  - Second Exam : ${score2}${remainingExamsText}
--------------------------------------------
PERFORMANCE METRICS:
  - Average Score : ${avgFormatted}
  - Final Grade   : ${grade}
  - Highest Score : ${highest}
  - Lowest Score  : ${lowest}
--------------------------------------------
REMARK:
  "${remark}"
============================================
`);
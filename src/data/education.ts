export type Education = {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  period: string;
  status: "current" | "completed";
  detail: string;
  score?: { label: string; value: string };
};

export const education: Education[] = [
  {
    id: "bit",
    qualification: "Bachelor of Information Technology",
    institution: "Mahendra Morang Adarsh Multiple Campus",
    location: "Biratnagar, Nepal",
    period: "2024 — Present",
    status: "current",
    detail:
      "Currently pursuing. Coursework covers programming, data structures, databases, web technologies and software engineering, with hands-on work in Python, JavaScript, REST and GraphQL APIs, Firebase and containerised deployment.",
  },
  {
    id: "grade-12",
    qualification: "Higher Secondary (Grade 12)",
    institution: "Shikshadeep Secondary Boarding School",
    location: "Biratnagar, Nepal",
    period: "Completed",
    status: "completed",
    detail:
      "Completed secondary education with a GPA of 2.95, which is where the first programming assignments and exposure to web fundamentals began.",
    score: { label: "GPA", value: "2.95" },
  },
  {
    id: "grade-10",
    qualification: "Secondary (Grade 10)",
    institution: "Shikshadeep Secondary Boarding School",
    location: "Biratnagar, Nepal",
    period: "Completed",
    status: "completed",
    detail:
      "Completed lower secondary with a GPA of 3.90.",
    score: { label: "GPA", value: "3.90" },
  },
];

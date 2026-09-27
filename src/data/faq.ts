/**
 * Question-and-answer pairs rendered visibly on the page and emitted as
 * FAQPage JSON-LD. Written to be directly extractable by answer engines, so
 * each answer is a self-contained paragraph that works outside the page.
 */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Who is Mithlesh Kumar Das?",
    answer:
      "Mithlesh Kumar Das is an entry-level backend and full-stack developer based in Biratnagar, Nepal. He builds web applications with Python, JavaScript, React, Next.js, REST and GraphQL APIs and Firebase, and is currently pursuing a Bachelor of Information Technology at Mahendra Morang Adarsh Multiple Campus.",
  },
  {
    question: "What technologies does Mithlesh Kumar Das work with?",
    answer:
      "His core stack is Python, JavaScript, HTML5 and CSS3 for programming; React.js and Next.js on the frontend; and REST APIs, GraphQL and Firebase (Firestore, Authentication, FCM and Cloud Storage) on the backend, with some Node.js. For delivery he uses Git and GitHub alongside GitHub Actions, GitLab CI, Fastlane, Bitrise and basic Docker.",
  },
  {
    question: "Where is Mithlesh Kumar Das located and how can he be contacted?",
    answer:
      "He is based in Biratnagar, Nepal. He can be reached by email at mithleshkumardas527@gmail.com, by phone on +977 9703817024, on GitHub at github.com/livelyfun and on LinkedIn at linkedin.com/in/mithlesh-das-876973343.",
  },
  {
    question: "What is Kira Calculator?",
    answer:
      "Kira Calculator is a cross-platform scientific desktop calculator built with Python and PySide6. The core of the project is a hand-written expression engine that handles operator precedence, nested parentheses, powers, square roots, trigonometric functions, logarithms and the constants pi and e, with a pytest suite guarding calculation accuracy.",
  },
  {
    question: "What is StockMatrix?",
    answer:
      "StockMatrix is a full-stack real-time stock tracking terminal in the Track-the-stock-market repository. It has a FastAPI backend with OAuth2 and JWT authentication, SQLAlchemy and Alembic for data, and WebSocket broadcasting for live prices, paired with a React and TypeScript frontend that draws SVG candlestick charts and evaluates custom price alerts.",
  },
  {
    question: "How does Mithlesh Kumar Das handle deployment and CI/CD?",
    answer:
      "He uses GitHub Actions and GitLab CI for pipelines, Fastlane and Bitrise for mobile release automation, and Docker for containerisation. His Smart File Organizer project ships cross-platform installers that verify a downloaded binary against its published SHA-256 before executing it.",
  },
];

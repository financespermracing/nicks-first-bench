// Edit this file to change the quiz.
// `answer` is the index of the correct option (0 = A, 1 = B, 2 = C, 3 = D).
// `prompt` and option text may contain simple HTML like <em>.

const QUIZ = {
  title: "nicks first bench",
  breadcrumb: { bold: "nicks first", rest: "platform trial" },

  // true  = show right/wrong + explanation after Submit
  // false = test mode: Submit just records the answer and moves on
  showFeedback: true,

  questions: [
    {
      prompt:
        "Which <em>best</em> describes the ways in which the African American migration northward into Kansas differed from the immigrant migration westward from eastern cities?",
      options: [
        "African Americans hoped to settle on fertile land as they moved northward, whereas other immigrants moved westward to develop new industrial centers.",
        "African Americans moved northward to establish cattle and buffalo ranches, while other immigrants eagerly moved westward to escape racial persecution.",
        "African Americans migrated northward, hoping to leave the racial injustice and persecution of the South, while other immigrants moved westward hoping for fertile land.",
        "African Americans migrated northward to escape the industrial work of the South, while other immigrants moved west for high-paying railroad jobs."
      ],
      answer: 2,
      explanation:
        "After Reconstruction ended, many Black Southerners left to escape violence and discrimination, while many settlers heading west were drawn mainly by cheap or free farmland."
    },
    {
      prompt: "The African Americans who migrated from the South to Kansas around 1879 were known as",
      options: ["Sooners", "Exodusters", "Boomers", "Forty-Niners"],
      answer: 1,
      explanation:
        "They were called Exodusters, a name drawn from the biblical Exodus story of escaping bondage."
    },
    {
      prompt: "Which law offered 160 acres of public land to settlers who would live on and farm it for five years?",
      options: ["The Dawes Act", "The Pacific Railway Act", "The Homestead Act", "The Morrill Act"],
      answer: 2,
      explanation: "The Homestead Act of 1862 gave settlers 160 acres if they lived on and improved the land for five years."
    },
    {
      prompt: "Which event in 1877 left many African Americans in the South with fewer protections and pushed some to move west?",
      options: [
        "The end of Reconstruction",
        "The completion of the transcontinental railroad",
        "The start of the Civil War",
        "The passage of the Homestead Act"
      ],
      answer: 0,
      explanation:
        "When federal troops withdrew from the South in 1877, Reconstruction ended and Black Southerners lost much of their legal and physical protection."
    },
    {
      prompt: "Nicodemus, Kansas, is historically important because it was",
      options: [
        "the first state capital of Kansas",
        "a major cattle-drive railhead",
        "a town founded by African American settlers after the Civil War",
        "the site of a large Civil War battle"
      ],
      answer: 2,
      explanation:
        "Nicodemus was founded in 1877 by African American settlers and is now a National Historic Site."
    }
  ]
};

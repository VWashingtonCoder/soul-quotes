import { writeFileSync } from "fs";

const data = {
  users: [
    {
      id: 1,
      userId: "admin",
      username: "admin",
      email: "admin1@localhost.com",
      password: "admin",
    },
    {
      id: 2,
      userId: "testUser",
      username: "testUser",
      email: "tu@sq.com",
      password: "Password0",
    },
  ],
  quoteList: [
    {
      id: 1,
      quoteId: "inspirational-1",
      quote:
        "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
      author: "Barack Obama",
      category: "inspirational",
      creatorId: "admin",
    },
    {
      id: 2,
      quoteId: "inspirational-2",
      quote: "The cost of liberty is less than the price of repression.",
      author: "W.E.B. Du Bois",
      category: "inspirational",
      creatorId: "admin",
    },
    {
      id: 3,
      quoteId: "inspirational-3",
      quote:
        "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.",
      author: "Langston Hughes",
      category: "inspirational",
      creatorId: "admin",
    },
    {
      id: 4,
      quoteId: "inspirational-4",
      quote:
        "Don't give up, there's no shame in falling down! True shame is to not stand up again!",
      author: "Naruto (Shippuden)",
      category: "inspirational",
      creatorId: "admin",
    },
    {
      id: 5,
      quoteId: "inspirational-5",
      quote:
        "Believe in yourself. Not in the you who believes in me. Not the me who believes in you. Believe in the you who believes in yourself.",
      author: "Kamina (Gurren Lagann)",
      category: "inspirational",
      creatorId: "admin",
    },
    {
      id: 6,
      quoteId: "inspirational-6",
      quote:
        "It's not always rainbows and butterflies, but compromise that moves us along.",
      author: "Koro-sensei (Assassination Classroom)",
      category: "inspirational",
      creatorId: "admin",
    },
    {
      id: 7,
      quoteId: "love-1",
      quote:
        "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
      author: "Maya Angelou",
      category: "love",
      creatorId: "admin",
    },
    {
      id: 8,
      quoteId: "love-2",
      quote:
        "Love is an endless act of forgiveness. Forgiveness is an endless act of love.",
      author: "Coretta Scott King",
      category: "love",
      creatorId: "admin",
    },
    {
      id: 9,
      quoteId: "love-3",
      quote:
        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day",
      author: "Steve Harvey",
      category: "love",
      creatorId: "admin",
    },
    {
      id: 10,
      quoteId: "love-4",
      quote:
        "Love is friendship that has caught fire. It is quiet understanding, mutual confidence, sharing, and forgiving. It is loyalty through good and bad times.",
      author: "Ann Landers",
      category: "love",
      creatorId: "admin",
    },
    {
      id: 11,
      quoteId: "love-5",
      quote:
        "I love you not because of who you are, but because of who I am when I am with you.",
      author: "Roy Mustang (Fullmetal Alchemist)",
      category: "love",
      creatorId: "admin",
    },
    {
      id: 12,
      quoteId: "love-6",
      quote:
        "Love doesn't need a reason. Pure love will come from the heart without reason and it'll stay every season.",
      author: "Mamoru Chiba (Sailor Moon)",
      category: "love",
      creatorId: "admin",
    },
    {
      id: 13,
      quoteId: "philosophy-1",
      quote: "If you want to lift yourself up, lift up someone else.",
      author: "Booker T. Washington",
      category: "philosophy",
      creatorId: "admin",
    },
    {
      id: 14,
      quoteId: "philosophy-2",
      quote:
        "I am not what I ought to be, I am not what I want to be, I am not what I hope to be, but still, I am not what I used to be, and by the grace of God, I am what I am.",
      author: "Frederick Douglass",
      category: "philosophy",
      creatorId: "admin",
    },
    {
      id: 15,
      quoteId: "philosophy-3",
      quote:
        "We must learn to live together as brothers or perish together as fools.",
      author: "Martin Luther King Jr.",
      category: "philosophy",
      creatorId: "admin",
    },
    {
      id: 16,
      quoteId: "philosophy-4",
      quote:
        "We must use time creatively, in the knowledge that the time is always ripe to do right.",
      author: "Nelson Mandela",
      category: "philosophy",
      creatorId: "admin",
    },
    {
      id: 17,
      quoteId: "philosophy-5",
      quote: "The world is full of empty words. What matters is how you act.",
      author: "Makishima Shogo (Psycho-Pass)",
      category: "philosophy",
      creatorId: "admin",
    },
    {
      id: 18,
      quoteId: "philosophy-6",
      quote:
        "In this world, there are things you can only do alone, and things you can only do with somebody else. It's important to combine the two in just the right amount.",
      author: " Yui Hirasawa (K-On!)",
      category: "philosophy",
      creatorId: "admin",
    },
    {
      id: 19,
      quoteId: "success-1",
      quote: "Life is not a game of luck. If you want to win, work hard.",
      author: "Sora (No Game No Life)",
      category: "success",
      creatorId: "admin",
    },
    {
      id: 20,
      quoteId: "success-2",
      quote:
        "Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.",
      author: "Booker T. Washington",
      category: "success",
      creatorId: "admin",
    },
    {
      id: 21,
      quoteId: "success-3",
      quote:
        "Success is not the absence of failure; it's the persistence through failure.",
      author: "Aliko Dangote",
      category: "success",
      creatorId: "admin",
    },
    {
      id: 22,
      quoteId: "success-4",
      quote:
        "Success is not about how much money you make; it's about the difference you make in people's lives.",
      author: "Michelle Obama",
      category: "success",
      creatorId: "admin",
    },
    {
      id: 23,
      quoteId: "success-5",
      quote: "If you don't take risks, you can't create a future.",
      author: "Monkey D. Luffy (One Piece)",
      category: "success",
      creatorId: "admin",
    },
    {
      id: 24,
      quoteId: "success-6",
      quote:
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      author: "Albert Schweitzer",
      category: "success",
      creatorId: "admin",
    },
    {
      id: 25,
      quoteId: "funny-1",
      quote: "I'm not addicted to games; I'm committed to them.",
      author: "Hasegawa Taizou (Gintama)",
      category: "funny",
      creatorId: "admin",
    },
    {
      id: 26,
      quoteId: "funny-2",
      quote: "I'm not crazy. My reality is just different from yours.",
      author: "Alice (Pandora Hearts)",
      category: "funny",
      creatorId: "admin",
    },
    {
      id: 27,
      quoteId: "funny-3",
      quote: "I don't suffer from insanity. I enjoy every minute of it!",
      author: "Izaya Orihara (Durarara!!)",
      category: "funny",
      creatorId: "admin",
    },
    {
      id: 28,
      quoteId: "funny-4",
      quote: "I'm not late; I just arrive precisely when I mean to.",
      author: "Gandalf (Lord Of The Rings)",
      category: "funny",
      creatorId: "admin",
    },
    {
      id: 29,
      quoteId: "funny-5",
      quote:
        "My advice to you is get married: If you find a good wife you will be happy; if not, you will become a philosopher.",
      author: "Socrates",
      category: "funny",
      creatorId: "admin",
    },
    {
      id: 30,
      quoteId: "funny-6",
      quote:
        "People say money is not the key to happiness, but I have always figured if you have enough money, you can have a key made.",
      author: "Joan Rivers",
      category: "funny",
      creatorId: "admin",
    },
    {
      id: 31,
      quoteId: "funny-7",
      quote:
        "Do not take life too seriously. You will never get out of it alive.",
      author: "Elbert Hubbard",
      category: "funny",
      creatorId: "testUser",
    },
  ],
  userFavoriteQuotes: [
    {
      id: 1,
      uId: "testUser",
      qId: "inspirational-1",
    },
    {
      id: 2,
      uId: "testUser",
      qId: "love-3",
    },
    {
      id: 3,
      uId: "testUser",
      qId: "philosophy-4",
    },
    {
      id: 4,
      uId: "testUser",
      qId: "success-2",
    },
    {
      id: 5,
      uId: "testUser",
      qId: "success-5",
    },
    {
      id: 6,
      uId: "testUser",
      qId: "funny-3",
    },
    {
      id: 7,
      uId: "testUser",
      qId: "funny-6",
    },
    {
      id: 8,
      uId: "testUser",
      qId: "funny-7",
    },
  ],
};

writeFileSync("./db.json", JSON.stringify(data), { encoding: "utf8" });

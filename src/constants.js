export const APP_NAME = 'ElectSmart';
export const MIN_VOTER_AGE = 18;
export const MIN_PROFILE_AGE = 1;
export const MAX_PROFILE_AGE = 120;
export const DEFAULT_STATE_ID = 'andhra-pradesh';
export const DEFAULT_LANGUAGE = 'en';
export const PROFILE_STORAGE_KEY = 'electsmart-profile-v2';
export const LANGUAGE_STORAGE_KEY = 'electsmart-lang';
export const BUILD_OUTPUT_DIR = 'dist';
export const VVPAT_PRINT_DELAY_MS = 1500;
export const VVPAT_VISIBLE_MS = 7000;
export const ASSISTANT_TYPING_DELAY_MS = 300;
export const SHARE_CARD_SCALE = 2;
export const READINESS_MAX = 100;
export const FULL_CIRCLE_DEGREES = 360;
export const SHARE_ROTATION_OFFSET = 45;
export const GOOGLE_MAPS_EMBED_BASE_URL = 'https://www.google.com/maps';
export const GOOGLE_MAPS_SEARCH_BASE_URL = 'https://www.google.com/maps/search';
export const YOUTUBE_WATCH_BASE_URL = 'https://www.youtube.com/watch';
export const YOUTUBE_THUMBNAIL_BASE_URL = 'https://img.youtube.com/vi';
export const ONBOARDING_BACKGROUND_URL = 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202412/jharkhand-assembly-election-1st-phase-voting-13th-november-125945963-16x9.png?VersionId=b_gEd06hG6jod7XCJabjLyhqZBeSeqi_&size=690:388';

export const UI_STRINGS = {
  START: 'START',
  ECI_NAME: 'Election Commission of India',
  SATYAMEV_JAYATE: 'सत्यमेव जयते',
  STATE_EMBLEM_ALT: 'State Emblem of India',
  BETA_TAG: 'BETA',
  OFFICIAL_SITE: 'https://voters.eci.gov.in',
  SKIP_TO_CONTENT: 'Skip to main content',
  SCREEN_READER_ACCESS: 'Screen Reader Access',
  LOGOUT: 'Logout',
  SIGN_IN_GOOGLE: 'Sign In with Google',
  START_OVER: 'START OVER',
};

export const ERRORS = {
  STATE_REQUIRED: 'Choose a valid state or union territory.',
  INVALID_AGE: (min, max) => `Enter an age between ${min} and ${max}.`,
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  FIRESTORE_ERROR: 'Unable to save your data. Please check your connection.',
};

export const REGISTRATION_STATUS = {
  REGISTERED: 'registered',
  NOT_REGISTERED: 'not_registered',
};

export const APP_TABS = [
  { id: 'dashboard', translationKey: 'app_title' },
  { id: 'timeline', translationKey: 'timeline_tab' },
  { id: 'learn', translationKey: 'learn_tab' },
  { id: 'quiz', translationKey: 'quiz_tab' },
];

export const ASSISTANT_QUICK_REPLIES = [
  'Am I eligible?',
  'How do I register?',
  'Find my booth',
  'What to bring on polling day',
];

export const ASSISTANT_FALLBACK_MESSAGE =
  "I'm not sure about that. You can ask me about registration, eligibility, polling booths, candidates, or documents!";

export const QUIZ_QUESTIONS = [
  {
    question: 'What is the minimum voting age for Indian citizens?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    answer: '18 years',
  },
  {
    question: 'What does EVM stand for?',
    options: ['Electronic Voting Machine', 'Election Verification Method', 'Electronic Voter Management', 'Efficient Voting Machine'],
    answer: 'Electronic Voting Machine',
  },
  {
    question: 'In which year was the Election Commission of India founded?',
    options: ['1947', '1948', '1950', '1952'],
    answer: '1950',
  },
  {
    question: 'What is the purpose of VVPAT?',
    options: ['To speed up counting', 'To allow remote voting', 'To provide a paper audit trail', 'To identify bogus voters'],
    answer: 'To provide a paper audit trail',
  },
  {
    question: 'When does the Model Code of Conduct (MCC) trigger?',
    options: ['One month before poll', 'On the first day of nomination', 'Immediately after election schedule announcement', 'On the day of result'],
    answer: 'Immediately after election schedule announcement',
  },
];

export const EVM_CANDIDATES = [
  { id: 1, name: 'Aditya Sharma', symbol: 'Sun', party: 'Lok Dal' },
  { id: 2, name: 'Priya Verma', symbol: 'Lotus', party: 'Swatantra Party' },
  { id: 3, name: 'Rajesh Kumar', symbol: 'Elephant', party: 'Bahujan Sangam' },
  { id: 4, name: 'Meera Singh', symbol: 'Bicycle', party: 'Rashtriya Vikas' },
  { id: 5, name: 'NOTA', nameAlt: 'None of the Above', symbol: 'X', party: 'Independent' },
];

export const EDUCATION_CARDS = [
  {
    id: 'evm',
    title: 'How EVMs Work',
    explanation: 'Electronic Voting Machines record votes electronically without paper ballots. Each machine consists of a Control Unit and a Balloting Unit connected by a cable.',
    fact: 'EVMs were first used in Kerala in 1982.',
  },
  {
    id: 'mcc',
    title: 'Model Code of Conduct',
    explanation: 'The Model Code of Conduct is a set of guidelines issued by the Election Commission to regulate political parties and candidates during elections.',
    fact: 'MCC kicks in immediately after the election schedule is announced.',
  },
  {
    id: 'counting',
    title: 'How Votes are Counted',
    explanation: 'Counting is done in secure halls under strict supervision of the Returning Officer and candidate agents. Votes are tallied round by round.',
    fact: 'VVPAT slips from 5 random booths per assembly segment are verified.',
  },
  {
    id: 'nota',
    title: 'What NOTA is',
    explanation: 'None of the Above allows voters to officially register a vote of rejection for all candidates in the fray.',
    fact: 'NOTA does not affect the election result even if it gets the most votes.',
  },
  {
    id: 'eci',
    title: 'Role of ECI',
    explanation: 'The Election Commission of India is an autonomous constitutional authority responsible for administering election processes in India.',
    fact: 'ECI was established on January 25, 1950.',
  },
  {
    id: 'phases',
    title: 'Phases of Elections',
    explanation: "Due to India's massive size, general elections are held in multiple phases over several weeks.",
    fact: 'The 2024 general election was held in 7 phases.',
  },
];

export const VIDEO_DATA = [
  { id: 'OM_SHBkQv5o', title: 'How to vote using EVM' },
  { id: 'BJCjsgEiQwg', title: 'Voter Registration Process' },
  { id: 'mKrn9RBmwFw', title: 'VVPAT Explained' },
  { id: '_th8zOh29xc', title: 'Election Process Overview' },
];


'use strict';
/* ==========================================================================
 * SpaceBook — Class 1 English PAGE-BY-PAGE model.
 *
 * One entry per PRINTED textbook page, in book order. `pdfPage` is the
 * physical PDF page (printed ≈ pdf − 6 for this book). Each page carries:
 *   - blocks : the page's own text, transcribed in reading order
 *               (heading / instruction / bullets). Text is VERBATIM.
 *   - figures: every illustration on that page, drawn as INLINE SVG vector
 *               art (see js/primary_page_art.js). Keyed by object id; each
 *               carries the word + its initial letter for learning logic.
 *   - activities: derived learning activities for the page contents.
 *
 * The interactive renderer (js/primary_page_learning.js) turns this model
 * into tap-to-name cards, initial-sound quizzes and "name five objects"
 * practice — all generated from the page data, never hard-coded in app.js.
 * ========================================================================== */
var ENGLISH_1_PAGES = [
  {
    page: 2,
    pdfPage: 7,
    unit: 0,
    unitTitle: 'Getting Started',
    blocks: [
      { kind: 'heading', text: 'Getting Started' },
      { kind: 'instruction', text: 'Look and say the names.' },
      { kind: 'heading', text: "Let's Talk" },
      {
        kind: 'bullets',
        items: [
          'Say the initial sounds of the given words.',
          'Name any five objects in your surroundings.'
        ]
      }
    ],
    figures: [
      { art: 'cat', word: 'cat', initial: 'C' },
      { art: 'hen', word: 'hen', initial: 'H' },
      { art: 'flowerpot', word: 'flower pot', initial: 'F' },
      { art: 'hat', word: 'hat', initial: 'H' },
      { art: 'net', word: 'butterfly net', initial: 'N' },
      { art: 'sun', word: 'sun', initial: 'S' },
      { art: 'top', word: 'spinning top', initial: 'T' },
      { art: 'bed', word: 'bed', initial: 'B' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Look and say the names of all eight pictures.' },
      { type: 'initialsound', prompt: 'Say the initial sound of each word.' },
      { type: 'namefive', prompt: 'Name any five objects in your surroundings.', count: 5 }
    ]
  },

  {
    page: 8,
    pdfPage: 14,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: 'Unit 1: My Family and I' },
      { kind: 'heading', text: 'Learning Outcomes' },
      {
        kind: 'bullets',
        items: [
          'Interact with the text and use reading strategies (while-reading) to use pictures or rebus in texts to increase their understanding.',
          'Pronounce and match the initial sounds of common words depicted in pictures with corresponding letters.',
          'Respond to text (post-reading) to express understanding of the story through pantomime.',
          'Demonstrate the use of common conventions and dynamics of group oral interactions in a group to introduce themselves.',
          'Point out and name some common objects in a picture or illustration and describe them in a word or two or a sentence.',
          'Spell simple one/two-syllable words.',
          'Recognise the different categories of some naming words, numbers in words, etc.',
          'Trace and copy familiar words learnt in class.',
          'Provide the missing letter in simple one/two-syllable words.',
          'Recall and match common naming words with pictures from the immediate environment.',
          'Copy and write simple one-syllable words with correct spelling. Leave a regular space between words.'
        ]
      }
    ],
    figures: [
      { art: 'book_open', word: 'book', initial: 'B' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Read the learning outcomes for this unit.' }
    ]
  },

  {
    page: 9,
    pdfPage: 15,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: 'Getting Started' },
      { kind: 'instruction', text: 'Look at the picture and answer the questions orally.' },
      { kind: 'heading', text: "Let's Talk" },
      {
        kind: 'bullets',
        items: [
          'What is written on the banner?',
          'How are they feeling?',
          'Do you share your birthday gifts with your siblings?',
          'What is the shape of the cake?',
          'How many bottles are there on the table?'
        ]
      }
    ],
    figures: [
      { art: 'birthday_banner', word: 'banner', initial: 'B' },
      { art: 'birthday_cake', word: 'cake', initial: 'C' },
      { art: 'bottles_on_table', word: 'bottles', initial: 'B' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Look at the birthday picture and name the objects.' },
      { type: 'initialsound', prompt: 'Say the initial sound of each object.' },
      { type: 'namefive', prompt: 'Name five things you see in the picture.', count: 5 }
    ]
  },

  {
    page: 10,
    pdfPage: 16,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: 'My Family and I' },
      { kind: 'heading', text: 'Pre-reading' },
      { kind: 'instruction', text: 'Look at the pictures and the title of the lesson to guess what you will study in this lesson.' },
      { kind: 'heading', text: 'While-reading' },
      { kind: 'para', text: 'My name is Saad. Mother calls me Sadi. I am six years old. I like watering plants. I want to be a teacher like my father.' },
      { kind: 'para', text: 'My family lives in a small village. I have two brothers and a sister. They are nice and kind to me.' },
      { kind: 'para', text: 'My mother cooks yummy dishes for us. My father helps us with our homework. I take dinner with my family. My granny tells us bedtime stories. I love my family very much.' },
      { kind: 'heading', text: 'Post-reading' },
      {
        kind: 'bullets',
        items: [
          'Make a list of Saad\'s family members.',
          'What kind of stories do you like?'
        ]
      }
    ],
    figures: [
      { art: 'saad', word: 'Saad', initial: 'S' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Read the story and point to Saad.' },
      { type: 'initialsound', prompt: 'Find words starting with S in the story.' }
    ]
  },

  {
    page: 11,
    pdfPage: 17,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: 'Oral Communication' },
      { kind: 'heading', text: '1. Learning the Sounds' },
      { kind: 'instruction', text: 'Match the pictures with the letter sounds.' },
      { kind: 'heading', text: 'Read the given words and notice how the different letters have different sounds in a word' },
      { kind: 'heading', text: '2. Learning to Speak' },
      { kind: 'instruction', text: 'Read and practise the given dialogue.' },
      { kind: 'para', text: 'Assalaamu Alaikum! Wa Alaikum Assalaam! I am Mariam. I am Sara. How are you? I am fine. Thank you!' }
    ],
    figures: [
      { art: 'fan', word: 'fan', initial: 'F' },
      { art: 'box', word: 'box', initial: 'B' },
      { art: 'cup', word: 'cup', initial: 'C' },
      { art: 'net', word: 'net', initial: 'N' },
      { art: 'pin', word: 'pin', initial: 'P' },
      { art: 'cat', word: 'cat', initial: 'C' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Match each picture to its initial sound.' },
      { type: 'initialsound', prompt: 'Say the initial sound of fan, box, cup, net, pin, cat.' },
      { type: 'namefive', prompt: 'Name five objects from the pictures.', count: 5 }
    ]
  },

  {
    page: 12,
    pdfPage: 18,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: 'Reading and Critical Thinking' },
      { kind: 'heading', text: 'Reading Comprehension' },
      { kind: 'instruction', text: 'Answer these questions.' },
      {
        kind: 'bullets',
        items: [
          'Where does Saad live?',
          'Who tells Saad bedtime stories?',
          'What does Saad like to play?'
        ]
      },
      { kind: 'heading', text: 'Fill in the blanks using the given word bank.' },
      { kind: 'instruction', text: 'green orange like' },
      { kind: 'para', text: 'This is an ______. Its leaves are ______. I ______ it.' },
      { kind: 'heading', text: 'Read the lesson again and fill in the blanks with the correct options.' },
      {
        kind: 'bullets',
        items: [
          'Saad is ______ years old. (a) four (b) five (c) six (d) seven',
          'Saad has ______ family members. (a) six (b) seven (c) eight (d) nine',
          '______ helps Saad in his homework. (a) Father (b) Mother (c) Brother (d) Sister',
          'Saad\'s ______ tells him a bedtime story. (a) Sister (b) Father (c) Mother (d) Granny'
        ]
      }
    ],
    figures: [
      { art: 'orange_fruit', word: 'orange', initial: 'O' },
      { art: 'tree_green', word: 'green', initial: 'G' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Answer the comprehension questions.' },
      { type: 'initialsound', prompt: 'Match orange and green to their initial sounds.' }
    ]
  },

  {
    page: 13,
    pdfPage: 19,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: 'Language Focus' },
      { kind: 'heading', text: '1. Vocabulary Building' },
      { kind: 'instruction', text: 'Read the given words with their meanings.' },
      { kind: 'para', text: 'study — to learn by reading or attending school. complete — to finish a task. yummy — pleasing to taste. siblings — brothers and sisters.' },
      { kind: 'heading', text: 'Number Words' },
      { kind: 'instruction', text: 'Read the given numbers in words.' },
      { kind: 'para', text: 'one two three four five six seven eight nine ten' },
      { kind: 'instruction', text: 'Read the unit again. Circle the numbers you find in the text.' },
      { kind: 'para', text: 'one two four six eight ten' }
    ],
    figures: [
      { art: 'number_1', word: 'one', initial: 'O' },
      { art: 'number_2', word: 'two', initial: 'T' },
      { art: 'number_3', word: 'three', initial: 'T' },
      { art: 'number_4', word: 'four', initial: 'F' },
      { art: 'number_5', word: 'five', initial: 'F' },
      { art: 'number_6', word: 'six', initial: 'S' },
      { art: 'number_7', word: 'seven', initial: 'S' },
      { art: 'number_8', word: 'eight', initial: 'E' },
      { art: 'number_9', word: 'nine', initial: 'N' },
      { art: 'number_10', word: 'ten', initial: 'T' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Read and say the number words one to ten.' },
      { type: 'initialsound', prompt: 'Match each number word to its initial sound.' },
      { type: 'namefive', prompt: 'Name five number words from the list.', count: 5 }
    ]
  },

  {
    page: 14,
    pdfPage: 20,
    unit: 1,
    unitTitle: 'My Family and I',
    blocks: [
      { kind: 'heading', text: '2. Learning to Spell' },
      { kind: 'instruction', text: 'Read the words below and learn their spelling. Also trace and copy them.' },
      { kind: 'para', text: 'study lunch play school mother' },
      { kind: 'heading', text: 'Read Me' },
      { kind: 'para', text: 'One-syllable words cannot be divided into parts and are pronounced in one go, for example cat, book, etc. Two-syllable words are pronounced in two parts together, for example broth.er, eve.ning, etc.' },
      { kind: 'heading', text: 'Sight Words' },
      { kind: 'instruction', text: 'Read the given sight words.' },
      { kind: 'para', text: 'to and he you the' },
      { kind: 'instruction', text: 'Write each sight word in the shape box that fits.' }
    ],
    figures: [
      { art: 'shape_box', word: 'shape box', initial: 'S' }
    ],
    activities: [
      { type: 'saynames', prompt: 'Practice spelling the words: study, lunch, play, school, mother.' },
      { type: 'initialsound', prompt: 'Identify the initial sound of each sight word.' },
      { type: 'namefive', prompt: 'Write five sight words in the shape boxes.', count: 5 }
    ]
  }
];

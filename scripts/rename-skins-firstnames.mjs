import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve('assets', 'skins');

const MALE_BASE = [
  'Aaron', 'Adam', 'Adrian', 'Aiden', 'Alan', 'Albert', 'Alec', 'Alexander', 'Alfred', 'Amir',
  'Andre', 'Andrew', 'Anthony', 'Arthur', 'Asher', 'Austin', 'Axel', 'Benjamin', 'Blake', 'Brandon',
  'Brian', 'Caleb', 'Cameron', 'Carlos', 'Carter', 'Charles', 'Chase', 'Christian', 'Christopher', 'Cole',
  'Colin', 'Connor', 'Cooper', 'Damian', 'Daniel', 'David', 'Declan', 'Diego', 'Dominic', 'Dylan',
  'Eden', 'Edward', 'Elias', 'Elijah', 'Elliot', 'Emmett', 'Eric', 'Ethan', 'Evan', 'Felix',
  'Finn', 'Francis', 'Gabriel', 'Gavin', 'George', 'Grant', 'Grayson', 'Gregory', 'Harrison', 'Harvey',
  'Henry', 'Hudson', 'Hunter', 'Ian', 'Isaac', 'Ivan', 'Jack', 'Jackson', 'Jacob', 'Jasper',
  'Jason', 'Jayden', 'Jeremy', 'Joel', 'John', 'Jonah', 'Jonathan', 'Jordan', 'Joseph', 'Joshua',
  'Julian', 'Justin', 'Kai', 'Kevin', 'Kingston', 'Kyle', 'Landon', 'Leo', 'Leon', 'Leonardo',
  'Levi', 'Liam', 'Logan', 'Louis', 'Lucas', 'Luke', 'Malcolm', 'Marcus', 'Mark', 'Mason',
  'Mateo', 'Matthew', 'Max', 'Micah', 'Michael', 'Miles', 'Nathan', 'Nathaniel', 'Nicholas', 'Noah',
  'Nolan', 'Oliver', 'Oscar', 'Owen', 'Parker', 'Paul', 'Peter', 'Preston', 'Rafael', 'Raymond',
  'Reid', 'Richard', 'Robert', 'Roman', 'Rowan', 'Ryan', 'Samuel', 'Scott', 'Sean', 'Sebastian',
  'Shane', 'Silas', 'Simon', 'Spencer', 'Steven', 'Theo', 'Theodore', 'Thomas', 'Timothy', 'Travis',
  'Trevor', 'Tyler', 'Victor', 'Vincent', 'Walter', 'Wesley', 'William', 'Wyatt', 'Xavier', 'Zachary',
  'Zane',
];

const FEMALE_BASE = [
  'Abigail', 'Ada', 'Addison', 'Adeline', 'Aisha', 'Alexa', 'Alexandra', 'Alice', 'Alicia', 'Alina',
  'Alison', 'Amelia', 'Amy', 'Ana', 'Anastasia', 'Andrea', 'Angela', 'Anna', 'Annabelle', 'Annie',
  'Aria', 'Ariana', 'Ashley', 'Athena', 'Aubrey', 'Audrey', 'Aurora', 'Ava', 'Bella', 'Bethany',
  'Bianca', 'Brooklyn', 'Camila', 'Carla', 'Carmen', 'Carolina', 'Caroline', 'Cassandra', 'Catherine', 'Charlotte',
  'Chloe', 'Clara', 'Claire', 'Daisy', 'Daniela', 'Delilah', 'Diana', 'Eden', 'Eleanor', 'Elena',
  'Eliana', 'Elisa', 'Elise', 'Elizabeth', 'Ella', 'Elle', 'Emily', 'Emma', 'Erin', 'Eva',
  'Evelyn', 'Faith', 'Fiona', 'Florence', 'Freya', 'Gabriella', 'Gemma', 'Georgia', 'Gianna', 'Grace',
  'Hailey', 'Hannah', 'Harper', 'Hazel', 'Helena', 'Holly', 'Hope', 'Iris', 'Isabella', 'Isabelle',
  'Jade', 'Jane', 'Jasmine', 'Jenna', 'Jessica', 'Josephine', 'Julia', 'Juliana', 'Juliet', 'Kayla',
  'Keira', 'Kennedy', 'Kimberly', 'Kylie', 'Lana', 'Laura', 'Layla', 'Leah', 'Lena', 'Lila',
  'Lillian', 'Lily', 'Lina', 'Lola', 'Lucy', 'Luna', 'Lydia', 'Madeline', 'Madison', 'Maya',
  'Megan', 'Melanie', 'Mia', 'Mila', 'Molly', 'Naomi', 'Natalia', 'Natalie', 'Nina', 'Nora',
  'Nova', 'Olivia', 'Paige', 'Penelope', 'Phoebe', 'Piper', 'Rachel', 'Rebecca', 'Rosalie', 'Ruby',
  'Sabrina', 'Sadie', 'Samantha', 'Sarah', 'Savannah', 'Scarlett', 'Selena', 'Serena', 'Sienna', 'Sofia',
  'Sophia', 'Sophie', 'Stella', 'Summer', 'Sydney', 'Taylor', 'Valerie', 'Vanessa', 'Victoria', 'Violet',
  'Willow', 'Yasmin', 'Zara', 'Zoey',
];

const UNISEX_BASE = [
  'Alex', 'Avery', 'Bailey', 'Blair', 'Cameron', 'Casey', 'Charlie', 'Dakota', 'Drew', 'Elliot',
  'Emerson', 'Finley', 'Hayden', 'Jamie', 'Jordan', 'Kai', 'Logan', 'Morgan', 'Parker', 'Quinn',
  'Reese', 'Riley', 'Robin', 'Rowan', 'Sage', 'Skyler', 'Taylor',
];

const normalizeName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .trim();

const unique = (list) => {
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const normalized = normalizeName(item);
    if (normalized.length < 3 || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
};

const randomInt = (max) => crypto.randomInt(max);

const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

const malePool = unique(MALE_BASE);
const femalePool = unique(FEMALE_BASE);
const neutralPool = unique([...UNISEX_BASE, ...MALE_BASE, ...FEMALE_BASE]);

const pickPool = (folderName) => {
  if (folderName.toLowerCase().startsWith('boys ')) {
    return malePool;
  }
  if (folderName.toLowerCase().startsWith('girls ')) {
    return femalePool;
  }
  return neutralPool;
};

const assignNames = (fileCount, pool) => {
  const randomized = shuffle(pool);
  const names = [];
  const used = new Set();
  let index = 0;
  while (names.length < fileCount) {
    const base = randomized[index % randomized.length];
    index += 1;
    let candidate = base;
    let suffix = 2;
    while (used.has(candidate)) {
      candidate = `${base}${suffix}`;
      suffix += 1;
    }
    used.add(candidate);
    names.push(candidate);
  }
  return names;
};

const renameFolder = async (folderPath, folderName) => {
  const allEntries = await fs.readdir(folderPath, { withFileTypes: true });
  const files = allEntries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    return { folderName, renamed: 0 };
  }

  const pool = pickPool(folderName);
  const assigned = assignNames(files.length, pool);

  const operations = files.map((fromName, index) => {
    const toName = `${assigned[index]}.png`;
    const fromPath = path.join(folderPath, fromName);
    const tmpName = `.__tmp_${Date.now()}_${index}_${crypto.randomBytes(4).toString('hex')}.png`;
    const tmpPath = path.join(folderPath, tmpName);
    const toPath = path.join(folderPath, toName);
    return { fromPath, tmpPath, toPath, fromName, toName };
  });

  for (const op of operations) {
    await fs.rename(op.fromPath, op.tmpPath);
  }
  for (const op of operations) {
    await fs.rename(op.tmpPath, op.toPath);
  }

  return { folderName, renamed: operations.length };
};

const main = async () => {
  const categoryEntries = await fs.readdir(ROOT, { withFileTypes: true });
  const folders = categoryEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

  const stats = [];
  for (const folderName of folders) {
    const folderPath = path.join(ROOT, folderName);
    const result = await renameFolder(folderPath, folderName);
    stats.push(result);
  }

  const total = stats.reduce((sum, item) => sum + item.renamed, 0);
  console.log(`Renamed ${total} skin files.`);
  for (const stat of stats) {
    if (stat.renamed > 0) {
      console.log(`${stat.folderName}: ${stat.renamed}`);
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const fs = require("fs");
const src = fs.readFileSync("js/i18n.js", "utf8");
const cStart = src.indexOf("  const CURRENCIES =");
const dStart = src.indexOf("  const DICT =");
const eStart = src.indexOf("  const CATEGORY_AR");
const currencies = src
  .slice(cStart, dStart)
  .replace("  const CURRENCIES =", "export const CURRENCIES =");
const dict = src.slice(dStart, eStart).replace("  const DICT =", "export const DICT =");
const enums = `
export const CATEGORY_AR = { Sedan: "سيدان", SUV: "دفع رباعي", Truck: "شاحنة", Coupe: "كوبيه", Electric: "كهربائية" };
export const CONDITION_AR = { "Certified Pre-Owned": "مستعملة معتمدة", "Like New": "كالجديدة" };
export const FUEL_AR = { Gasoline: "بنزين", Electric: "كهربائي", Petrol: "بنزين", Diesel: "ديزل" };
export const TRANSMISSION_AR = { Automatic: "أوتوماتيك", Manual: "يدوي" };
export const ENUM_MAPS = { category: CATEGORY_AR, condition: CONDITION_AR, fuel: FUEL_AR, transmission: TRANSMISSION_AR };
`;
fs.writeFileSync("nextjs-tmp/lib/i18n/dictionary.ts", currencies + dict + enums);
console.log("wrote", fs.statSync("nextjs-tmp/lib/i18n/dictionary.ts").size);

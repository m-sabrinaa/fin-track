// CHANGE: offline eval for the keyword fast path. Imports the real matcher
// (no DB, no LLM) and checks 100 trilingual samples:
// 85 expected-keyword (must all match exactly) + 15 unclear/ambiguous
// (must all return null → LLM-needed).
import { matchKeywordCategory } from "../middlewares/categorizeTransaction.middleware.js";

const KEYWORD_SAMPLES = [
    // food-dining (7)
    { note: "Lunch at restaurant", ref: "", expected: "food-dining" },
    { note: "বিরিয়ানি কিনলাম", ref: "", expected: "food-dining" },
    { note: "pizza order dilam", ref: "", expected: "food-dining" },
    { note: "morning cha and bakery", ref: "", expected: "food-dining" },
    { note: "foodpanda delivery", ref: "", expected: "food-dining" },
    { note: "murgi ar mishti kinlam", ref: "", expected: "food-dining" },
    { note: "KFC burger", ref: "", expected: "food-dining" },
    // bills-utilities (7)
    { note: "DESCO bill payment", ref: "", expected: "bills-utilities" },
    { note: "বিদ্যুৎ বিল দিলাম", ref: "", expected: "bills-utilities" },
    { note: "pani bill WASA", ref: "", expected: "bills-utilities" },
    { note: "wifi bill dilam", ref: "", expected: "bills-utilities" },
    { note: "gas bill er taka", ref: "", expected: "bills-utilities" },
    { note: "ইন্টারনেট বিল দিলাম", ref: "", expected: "bills-utilities" },
    { note: "current bill bkash", ref: "", expected: "bills-utilities" },
    // housing (7)
    { note: "basa vara dilam", ref: "", expected: "housing" },
    { note: "বাসাভাড়া পরিশোধ", ref: "", expected: "housing" },
    { note: "flat vara advance", ref: "", expected: "housing" },
    { note: "hostel fee submitted", ref: "", expected: "housing" },
    { note: "landlord ke rent dilam", ref: "", expected: "housing" },
    { note: "মেস খরচ দিলাম", ref: "", expected: "housing" },
    { note: "bari vara dilam", ref: "", expected: "housing" },
    // transportation (7)
    { note: "rickshaw vara dilam", ref: "", expected: "transportation" },
    { note: "bus fare", ref: "", expected: "transportation" },
    { note: "uber trip", ref: "", expected: "transportation" },
    { note: "tren e kore gelam", ref: "", expected: "transportation" },
    { note: "cng vara", ref: "", expected: "transportation" },
    { note: "petrol nilam", ref: "", expected: "transportation" },
    { note: "metro ticket", ref: "", expected: "transportation" },
    // shopping (7)
    { note: "notun shirt kinlam", ref: "", expected: "shopping" },
    { note: "daraz order", ref: "", expected: "shopping" },
    { note: "বাজার করলাম", ref: "", expected: "shopping" },
    { note: "juta kinlam", ref: "", expected: "shopping" },
    { note: "gift wrap kinlam", ref: "", expected: "shopping" },
    { note: "kapor kinlam eid er", ref: "", expected: "shopping" },
    { note: "supermarket bazar", ref: "", expected: "shopping" },
    // healthcare (7)
    { note: "oshudh kinlam", ref: "", expected: "healthcare" },
    { note: "ডাক্তার দেখালাম", ref: "", expected: "healthcare" },
    { note: "hospital bill dilam", ref: "", expected: "healthcare" },
    { note: "dentist appointment", ref: "", expected: "healthcare" },
    { note: "চিকিৎসা খরচ", ref: "", expected: "healthcare" },
    { note: "pharmacy theke medicine", ref: "", expected: "healthcare" },
    { note: "blood test korlam", ref: "", expected: "healthcare" },
    // education (7)
    { note: "course er fee dilam", ref: "", expected: "education" },
    { note: "বই কিনলাম", ref: "", expected: "education" },
    { note: "tuition payment salim", ref: "", expected: "education" },
    { note: "exam registration", ref: "", expected: "education" },
    { note: "varsity vorti", ref: "", expected: "education" },
    { note: "semester admission", ref: "", expected: "education" },
    { note: "workshop join korlam", ref: "", expected: "education" },
    // entertainment (6)
    { note: "movie dekhte gelam", ref: "", expected: "entertainment" },
    { note: "গান শুনলাম spotify te", ref: "", expected: "entertainment" },
    { note: "concert ticket", ref: "", expected: "entertainment" },
    { note: "khela dekhte gelam", ref: "", expected: "entertainment" },
    { note: "netflix subscription", ref: "", expected: "entertainment" },
    { note: "park e ghurte gelam", ref: "", expected: "entertainment" },
    // communication (7)
    { note: "mobile recharge korlam", ref: "", expected: "communication" },
    { note: "রিচার্জ করলাম", ref: "", expected: "communication" },
    { note: "data pack kinlam", ref: "", expected: "communication" },
    { note: "Grameenphone sim", ref: "", expected: "communication" },
    { note: "internet package nilam", ref: "", expected: "communication" },
    { note: "Airtel balance", ref: "", expected: "communication" },
    { note: "call rate kom", ref: "", expected: "communication" },
    // personal-care (6)
    { note: "salon e chul kata", ref: "", expected: "personal-care" },
    { note: "facial korlam", ref: "", expected: "personal-care" },
    { note: "shampoo kinlam", ref: "", expected: "personal-care" },
    { note: "মেকআপ কিনলাম", ref: "", expected: "personal-care" },
    { note: "perfume gift", ref: "", expected: "personal-care" },
    { note: "napit er dokan", ref: "", expected: "personal-care" },
    // financial (6)
    { note: "bank deposit korlam", ref: "", expected: "financial" },
    { note: "loan er sud dilam", ref: "", expected: "financial" },
    { note: "DPS khullam", ref: "", expected: "financial" },
    { note: "বীমা প্রিমিয়াম দিলাম", ref: "", expected: "financial" },
    { note: "insurance claim", ref: "", expected: "financial" },
    { note: "savings account", ref: "", expected: "financial" },
    // family-social (6)
    { note: "ma ke taka pathalam", ref: "", expected: "family-social" },
    { note: "biye te gelam", ref: "", expected: "family-social" },
    { note: "birthday party", ref: "", expected: "family-social" },
    { note: "বন্ধুর জন্মদিন", ref: "", expected: "family-social" },
    { note: "bhai er sathe", ref: "", expected: "family-social" },
    { note: "wedding gift", ref: "", expected: "family-social" },
    // donation (4)
    { note: "zakat dilam", ref: "", expected: "donation" },
    { note: "মসজিদে দান করলাম", ref: "", expected: "donation" },
    { note: "mosjid e sadaka", ref: "", expected: "donation" },
    { note: "etimkhana te sahajjo", ref: "", expected: "donation" },
    // other (1)
    { note: "onnanno khoroch", ref: "", expected: "other" }
];

const UNCLEAR_SAMPLES = [
    { note: "payment done", ref: "" },
    { note: "transfer received", ref: "" },
    { note: "ok", ref: "" },
    { note: "thanks", ref: "" },
    { note: "hello", ref: "" },
    { note: "12345", ref: "" },
    { note: "vara dilam", ref: "" },
    { note: "fee paid", ref: "" },
    { note: "ঠিক আছে", ref: "" },
    { note: "ধন্যবাদ", ref: "" },
    { note: "sent successfully", ref: "" },
    { note: "noted", ref: "" },
    { note: "amar transaction", ref: "" },
    { note: "random xyz abc", ref: "" },
    { note: "check status", ref: "" }
];

let keywordHits = 0;
let wrong = 0;

for (const { note, ref, expected } of KEYWORD_SAMPLES) {
    const got = matchKeywordCategory(note, ref);
    if (got === expected) {
        keywordHits++;
    } else {
        wrong++;
        console.log(`WRONG: ${JSON.stringify(note)} expected=${expected} got=${got}`);
    }
}

let unclearAsLlm = 0;
for (const { note, ref } of UNCLEAR_SAMPLES) {
    const got = matchKeywordCategory(note, ref);
    if (got === null) {
        unclearAsLlm++;
    } else {
        wrong++;
        console.log(`WRONG-UNCLEAR: ${JSON.stringify(note)} expected=null got=${got}`);
    }
}

const total = KEYWORD_SAMPLES.length + UNCLEAR_SAMPLES.length;
const keywordPct = ((keywordHits / total) * 100).toFixed(1);
const llmPct = (((total - keywordHits) / total) * 100).toFixed(1);

console.log(`samples: ${total} (keyword-expected: ${KEYWORD_SAMPLES.length}, unclear: ${UNCLEAR_SAMPLES.length})`);
console.log(`keyword: ${keywordHits}/${total} (${keywordPct}%) vs LLM-needed: ${total - keywordHits}/${total} (${llmPct}%)`);
console.log(`wrong-category: ${wrong}`);
console.log(`unclear→LLM: ${unclearAsLlm}/${UNCLEAR_SAMPLES.length}`);

if (keywordHits / total < 0.8 || wrong > 0) {
    console.log("EVAL FAILED: require >=80% keyword with 0 wrong-category");
    process.exit(1);
}
console.log("EVAL PASSED");

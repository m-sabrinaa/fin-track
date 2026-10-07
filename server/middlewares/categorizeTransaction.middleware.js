import Transaction from "../models/transaction.model.js";

const VALID_CATEGORIES =
    Transaction.schema.path("category").enumValues;

// CHANGE: keyword fast-path data, populated ONLY from the supplied
// EN/Bangla/Banglish lists (14 categories, no invented terms).
export const CATEGORY_KEYWORDS = {
    "food-dining": [
        "food", "restaurant", "meal", "lunch", "dinner", "breakfast",
        "snacks", "cafe", "coffee", "tea", "fast food", "food delivery",
        "takeaway", "biryani", "pizza", "burger", "chicken", "KFC",
        "McDonald's", "foodpanda", "hungerstation", "bakery", "sweets",
        "grocery food",
        "খাবার", "রেস্টুরেন্ট", "খাবার দোকান", "দুপুরের খাবার",
        "রাতের খাবার", "সকালের নাস্তা", "নাস্তা", "চা", "কফি",
        "ফাস্ট ফুড", "বিরিয়ানি", "পিজ্জা", "বার্গার", "মুরগি",
        "বেকারি", "মিষ্টি",
        "khabar", "khawa", "restaurant", "resturent", "hotel", "lunch",
        "dinner", "breakfast", "nasta", "nashta", "cha", "coffee",
        "fast food", "biriyani", "biryani", "pizza", "burger", "murgi",
        "bakery", "mishti", "khabar delivery"
    ],
    "bills-utilities": [
        "electricity", "electric bill", "gas bill", "water bill",
        "internet bill", "wifi", "broadband", "utility", "bill",
        "DESCO", "DPDC", "WASA",
        "বিদ্যুৎ", "বিদ্যুৎ বিল", "গ্যাস", "গ্যাস বিল", "পানি",
        "পানির বিল", "ইন্টারনেট বিল", "বিল", "ইউটিলিটি",
        "biddut", "current", "biddut bill", "gas bill", "pani bill",
        "internet bill", "wifi bill", "bill", "current bill"
    ],
    housing: [
        "rent", "house rent", "apartment", "flat", "landlord",
        "housing", "accommodation", "hostel", "mess",
        "ভাড়া", "বাসা", "বাড়ি", "বাসাভাড়া", "বাড়িভাড়া",
        "ফ্ল্যাট", "হোস্টেল", "মেস",
        "vara", "bhara", "basa vara", "bari vara", "flat vara",
        "hostel", "mess", "basar vara"
    ],
    transportation: [
        "bus", "train", "taxi", "uber", "pathao", "rickshaw", "CNG",
        "metro", "fuel", "petrol", "diesel", "parking", "fare",
        "বাস", "ট্রেন", "ট্যাক্সি", "রিকশা", "সিএনজি", "মেট্রো",
        "জ্বালানি", "পার্কিং", "ভাড়া",
        "bus", "tren", "taxi", "uber", "pathao", "riksha",
        "rickshaw", "ricksa", "cng", "metro", "tel", "petrol",
        "diesel", "parking", "vara"
    ],
    shopping: [
        "shopping", "clothes", "clothing", "shirt", "pants", "shoes",
        "bag", "accessories", "grocery", "supermarket", "daraz",
        "amazon", "gift",
        "শপিং", "কাপড়", "জামা", "শার্ট", "প্যান্ট", "জুতা",
        "ব্যাগ", "বাজার", "মুদিখানা", "উপহার",
        "shopping", "kapor", "jama", "shirt", "pant", "juta", "bag",
        "bazar", "mudir dokan", "upohar"
    ],
    healthcare: [
        "doctor", "hospital", "clinic", "medicine", "pharmacy",
        "medical", "treatment", "surgery", "dentist", "dental",
        "test", "diagnosis", "health",
        "ডাক্তার", "হাসপাতাল", "ক্লিনিক", "ওষুধ", "ফার্মেসি",
        "চিকিৎসা", "অপারেশন", "দাঁতের ডাক্তার", "পরীক্ষা",
        "daktar", "doctor", "hospital", "clinic", "oshudh", "osudh",
        "medicine", "pharmacy", "chikitsa", "operation",
        "dat er daktar"
    ],
    education: [
        "university", "college", "school", "tuition", "coaching",
        "course", "book", "textbook", "exam", "admission",
        "semester", "registration", "fee", "workshop",
        "বিশ্ববিদ্যালয়", "ইউনিভার্সিটি", "কলেজ", "স্কুল",
        "টিউশন", "কোচিং", "কোর্স", "বই", "পরীক্ষা", "ভর্তি",
        "সেমিস্টার", "ফি",
        "university", "varsity", "versity", "college", "school",
        "tuition", "tution", "coaching", "course", "boi", "exam",
        "vorti", "semester", "fee"
    ],
    entertainment: [
        "movie", "cinema", "Netflix", "YouTube", "Spotify", "game",
        "gaming", "concert", "music", "amusement park", "theatre",
        "streaming",
        "সিনেমা", "মুভি", "গান", "খেলা", "গেম", "কনসার্ট",
        "থিয়েটার", "বিনোদন", "পার্ক",
        "cinema", "movie", "gaan", "khela", "game", "gaming",
        "concert", "theatre", "binodon", "park"
    ],
    communication: [
        "mobile recharge", "recharge", "airtime", "mobile data",
        "internet package", "SMS", "call", "phone", "SIM", "Robi",
        "Grameenphone", "Banglalink", "Airtel", "Teletalk",
        "রিচার্জ", "মোবাইল রিচার্জ", "ইন্টারনেট প্যাক", "ডাটা",
        "কল", "ফোন", "সিম",
        "recharge", "mobile recharge", "richarge", "data pack",
        "net pack", "call", "phone", "sim", "balance",
        "mobile balance"
    ],
    "personal-care": [
        "salon", "haircut", "barber", "beauty", "makeup",
        "cosmetics", "skincare", "shampoo", "facial", "spa",
        "perfume",
        "সেলুন", "চুল কাটা", "নাপিত", "বিউটি", "মেকআপ",
        "প্রসাধনী", "ত্বক", "শ্যাম্পু", "ফেসিয়াল",
        "salon", "chul kata", "napit", "beauty", "makeup",
        "prosadhoni", "cosmetics", "shampoo", "facial", "spa"
    ],
    financial: [
        "bank", "banking", "loan", "credit", "debit", "interest",
        "insurance", "investment", "savings", "deposit", "DPS",
        "fee", "charge",
        "ব্যাংক", "ঋণ", "লোন", "সুদ", "বীমা", "বিনিয়োগ",
        "সঞ্চয়", "আমানত", "চার্জ",
        "bank", "banking", "rin", "loan", "sud", "bima", "binyog",
        "sonchoy", "deposit", "dps", "charge"
    ],
    "family-social": [
        "family", "parents", "mother", "father", "brother",
        "sister", "relative", "friend", "wedding", "birthday",
        "marriage", "party", "social",
        "পরিবার", "মা", "বাবা", "ভাই", "বোন", "আত্মীয়",
        "বন্ধু", "বিয়ে", "জন্মদিন", "অনুষ্ঠান", "পার্টি",
        "family", "ma", "maa", "baba", "bhai", "bon", "attoyo",
        "bondhu", "biya", "biye", "birthday", "onushthan", "party"
    ],
    donation: [
        "donation", "charity", "zakat", "sadaqah", "mosque",
        "orphanage", "humanitarian", "relief", "fund",
        "দান", "সাহায্য", "যাকাত", "সদকা", "মসজিদ",
        "এতিমখানা", "ত্রাণ", "মানবিক সাহায্য", "ফান্ড",
        "dan", "donation", "sahajjo", "zakat", "jakat", "sadaka",
        "mosjid", "etimkhana", "tran", "fund"
    ],
    other: [
        "অন্যান্য",
        "onnanno", "other"
    ]
};

// CHANGE: shared normalize (lower + trim) for matcher and cache keys.
const normalizeText = (value) => (value || "").toLowerCase().trim();

// CHANGE: escape regex metacharacters in keywords before building patterns.
const escapeRegExp = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// CHANGE: flat longest-first list with precompiled whole-word boundary
// patterns. Keywords claimed by more than one category (bare vara, fee)
// are ambiguous and excluded, so they fall through to the LLM instead of
// guessing. Compounds (basa vara, rickshaw vara) still win when present.
const FLAT_KEYWORDS = (() => {
    const owners = new Map();
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        for (const keyword of keywords) {
            const key = keyword.toLowerCase();
            if (!owners.has(key)) owners.set(key, new Set());
            owners.get(key).add(category);
        }
    }

    const flat = [];
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        for (const keyword of keywords) {
            if (owners.get(keyword.toLowerCase()).size > 1) continue;
            flat.push({
                keyword,
                category,
                pattern: new RegExp(
                    `(^|[^a-z\u0980-\u09FF0-9])${escapeRegExp(keyword.toLowerCase())}([^a-z\u0980-\u09FF0-9]|$)`
                )
            });
        }
    }
    flat.sort((a, b) => b.keyword.length - a.keyword.length);
    return flat;
})();

// CHANGE: exported pure matcher (no DB, no LLM) for the middleware and tests.
export const matchKeywordCategory = (note, ref) => {
    const text = `${normalizeText(note)} ${normalizeText(ref)}`.trim();
    if (!text) return null;
    for (const { pattern, category } of FLAT_KEYWORDS) {
        if (pattern.test(text)) return category;
    }
    return null;
};

// CHANGE: repeat-note LRU cache (Map, max 1000) for free repeat hits.
const noteCache = new Map();
const NOTE_CACHE_MAX = 1000;
const noteCacheKey = (note, ref) =>
    `${normalizeText(note)}\n${normalizeText(ref)}`;
const getNoteCache = (key) => {
    const value = noteCache.get(key);
    if (value === undefined) return null;
    noteCache.delete(key);
    noteCache.set(key, value);
    return value;
};
const setNoteCache = (key, value) => {
    if (noteCache.size >= NOTE_CACHE_MAX) {
        noteCache.delete(noteCache.keys().next().value);
    }
    noteCache.set(key, value);
};

export const categorizeTransaction = async (req, res, next) => {
    try {
        const {
            category,
            user_note,
            reference
        } = req.body;

        // Category is provided → validate and use it
        // No LLM call
        if (category) {
            if (!VALID_CATEGORIES.includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`
                });
            }

            // CHANGE: mark explicitly supplied categories.
            req.body.categorySource = "explicit";
            return next();
        }

        // No category, note, or reference
        // Automatically categorize as "other"
        if (!user_note && !reference) {
            req.body.category = "other";
            // CHANGE: mark default path.
            req.body.categorySource = "none";
            return next();
        }

        // CHANGE: keyword fast path (free, no LLM). Longest compound wins,
        // so "basa vara" → housing while bare "vara" stays ambiguous → LLM.
        const keywordCategory = matchKeywordCategory(user_note, reference);
        if (keywordCategory) {
            req.body.category = keywordCategory;
            req.body.categorySource = "keyword";
            return next();
        }

        // CHANGE: repeat-note cache (free, no LLM).
        const cacheKey = noteCacheKey(user_note, reference);
        const cachedCategory = getNoteCache(cacheKey);
        if (cachedCategory) {
            req.body.category = cachedCategory;
            req.body.categorySource = "cache";
            return next();
        }

        // No category, but note/reference exists
        // Call LLM
        const prompt = `
You are a transaction categorization assistant.

Classify the transaction into exactly ONE of the allowed categories based on the user's note and reference.

Allowed categories:
${VALID_CATEGORIES.join(", ")}

User note:
"${user_note || "Not provided"}"

Reference:
"${reference || "Not provided"}"

Rules:
1. Use both the user note and reference when both are provided.
2. If one is missing, use the available information.
3. Understand English, Bangla, and Banglish.
4. Classify based on the meaning and purpose of the transaction.
5. If the transaction clearly does not fit any category, return "other".
6. Return ONLY the exact category name.
7. Do not return explanations or additional text.
8. The categories are: food-dining",
                "bills-utilities",
                "housing",
                "transportation",
                "shopping",
                "healthcare",
                "education",
                "entertainment",
                "communication",
                "personal-care",
                "financial",
                "family-social",
                "donation",
                "other"

Examples:
- "khabar kinlam" → food-dining
- "basha vara" -> housing
- "restaurant e lunch korlam" → food-dining
- "বিদ্যুৎ বিল দিলাম" → bills-utilities
- "rickshaw vara" → transportation
- "oshudh kinlam" → healthcare
- "notun shirt kinlam" → shopping
- "movie dekhte gelam" → entertainment
- "course er fee dilam" → education
- "ammu ke taka pathalam" → family-social
- unclear transaction → other
`;

        const response = await fetch(
            process.env.LLM_BASE_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        `Bearer ${process.env.LLM_API_KEY}`
                },
                body: JSON.stringify({
                    model: process.env.LLM_MODEL,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0
                })
            }
        );

        if (!response.ok) {
            console.error(
                "LLM categorization failed:",
                await response.text()
            );

            return res.status(503).json({
                success: false,
                message:
                    "Transaction categorization service unavailable"
            });
        }

        const result = await response.json();

        const llmCategory =
            result.choices?.[0]?.message?.content?.trim();

        if (!llmCategory) {
            req.body.category = "other";
            // CHANGE: cache LLM-resolved outcomes for free repeats.
            req.body.categorySource = "llm";
            setNoteCache(cacheKey, "other");
            return next();
        }

        console.log(result);

        // If LLM returns something outside the allowed categories,
        // safely categorize it as "other"
        if (!VALID_CATEGORIES.includes(llmCategory)) {
            console.log(
                "LLM returned unknown category:",
                llmCategory
            );

            req.body.category = "other";
            // CHANGE: cache LLM-resolved outcomes for free repeats.
            req.body.categorySource = "llm";
            setNoteCache(cacheKey, "other");
            return next();
        }

        // Pass category to transaction controller
        req.body.category = llmCategory;
        // CHANGE: mark LLM-resolved categories and cache them.
        req.body.categorySource = "llm";
        setNoteCache(cacheKey, llmCategory);

        next();

    } catch (error) {
        console.error(
            "Transaction categorization error:",
            error.message
        );

        // Categorization failure should not stop the transaction.
        // Fall back to "other".
        req.body.category = "other";

        next();
    }
};

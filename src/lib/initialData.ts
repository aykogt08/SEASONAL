import { getSvgDataUrl } from "./presetIcons";

export type SeasonType = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
export type CategoryType = "FRUIT" | "VEGETABLE" | "SEAFOOD" | "OTHER";

export interface InitialFoodItem {
  id: string;
  nameEn: string;
  nameJa: string;
  category: CategoryType;
  season: SeasonType;
  iconKey: string;
  sortOrder: number;
}

export const INITIAL_FOODS: InitialFoodItem[] = [
  // ==========================================
  // 🌸 SPRING (3〜5月)
  // ==========================================
  // --- Fruits ---
  { id: "sp-f-1", nameEn: "STRAWBERRY", nameJa: "いちご", category: "FRUIT", season: "SPRING", iconKey: "strawberry", sortOrder: 1 },
  { id: "sp-f-2", nameEn: "AMANATSU", nameJa: "甘夏", category: "FRUIT", season: "SPRING", iconKey: "citrus_yellow", sortOrder: 2 },
  { id: "sp-f-3", nameEn: "KIYOMI ORANGE", nameJa: "清見オレンジ", category: "FRUIT", season: "SPRING", iconKey: "citrus_orange", sortOrder: 3 },
  { id: "sp-f-4", nameEn: "DEKOPON", nameJa: "デコポン（不知火）", category: "FRUIT", season: "SPRING", iconKey: "citrus_orange", sortOrder: 4 },
  { id: "sp-f-5", nameEn: "KAWACHI LATE", nameJa: "河内晩柑", category: "FRUIT", season: "SPRING", iconKey: "citrus_yellow", sortOrder: 5 },
  { id: "sp-f-6", nameEn: "HYUGANATSU", nameJa: "日向夏", category: "FRUIT", season: "SPRING", iconKey: "citrus_yellow", sortOrder: 6 },
  { id: "sp-f-7", nameEn: "BIWA", nameJa: "びわ", category: "FRUIT", season: "SPRING", iconKey: "biwa", sortOrder: 7 },

  // --- Vegetables & Wild Greens ---
  { id: "sp-v-1", nameEn: "ASPARAGUS", nameJa: "アスパラガス", category: "VEGETABLE", season: "SPRING", iconKey: "asparagus", sortOrder: 10 },
  { id: "sp-v-2", nameEn: "NEW ONION", nameJa: "新玉ねぎ", category: "VEGETABLE", season: "SPRING", iconKey: "onion", sortOrder: 11 },
  { id: "sp-v-3", nameEn: "SPRING CABBAGE", nameJa: "春キャベツ", category: "VEGETABLE", season: "SPRING", iconKey: "cabbage", sortOrder: 12 },
  { id: "sp-v-4", nameEn: "NEW POTATO", nameJa: "新じゃが", category: "VEGETABLE", season: "SPRING", iconKey: "root_vegetable", sortOrder: 13 },
  { id: "sp-v-5", nameEn: "SNAP PEA", nameJa: "スナップえんどう", category: "VEGETABLE", season: "SPRING", iconKey: "pea", sortOrder: 14 },
  { id: "sp-v-6", nameEn: "BROAD BEAN", nameJa: "そら豆", category: "VEGETABLE", season: "SPRING", iconKey: "pea", sortOrder: 15 },
  { id: "sp-v-7", nameEn: "GREEN PEAS", nameJa: "グリーンピース", category: "VEGETABLE", season: "SPRING", iconKey: "pea", sortOrder: 16 },
  { id: "sp-v-8", nameEn: "USUI PEA", nameJa: "うすいえんどう", category: "VEGETABLE", season: "SPRING", iconKey: "pea", sortOrder: 17 },
  { id: "sp-v-9", nameEn: "RAPE BLOSSOMS", nameJa: "菜の花", category: "VEGETABLE", season: "SPRING", iconKey: "leafy_green", sortOrder: 18 },
  { id: "sp-v-10", nameEn: "BAMBOO SHOOT", nameJa: "筍（たけのこ）", category: "VEGETABLE", season: "SPRING", iconKey: "bamboo_shoot", sortOrder: 19 },
  { id: "sp-v-11", nameEn: "BUTTERBUR", nameJa: "ふき", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 20 },
  { id: "sp-v-12", nameEn: "FUKI SPROUT", nameJa: "ふきのとう", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 21 },
  { id: "sp-v-13", nameEn: "TARA SPROUT", nameJa: "たらの芽", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 22 },
  { id: "sp-v-14", nameEn: "KOGOMI", nameJa: "こごみ", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 23 },
  { id: "sp-v-15", nameEn: "URUI", nameJa: "うるい", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 24 },
  { id: "sp-v-16", nameEn: "KOSHIABURA", nameJa: "こしあぶら", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 25 },
  { id: "sp-v-17", nameEn: "WARABI", nameJa: "わらび", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 26 },
  { id: "sp-v-18", nameEn: "ZENMAI", nameJa: "ぜんまい", category: "VEGETABLE", season: "SPRING", iconKey: "wild_greens", sortOrder: 27 },
  { id: "sp-v-19", nameEn: "NEW BURDOCK", nameJa: "新ごぼう", category: "VEGETABLE", season: "SPRING", iconKey: "root_vegetable", sortOrder: 28 },
  { id: "sp-v-20", nameEn: "MITSUBA", nameJa: "三つ葉", category: "VEGETABLE", season: "SPRING", iconKey: "leafy_green", sortOrder: 29 },
  { id: "sp-v-21", nameEn: "KINOME", nameJa: "木の芽", category: "OTHER", season: "SPRING", iconKey: "leafy_green", sortOrder: 30 },
  { id: "sp-v-22", nameEn: "LEAF WASABI", nameJa: "葉わさび", category: "VEGETABLE", season: "SPRING", iconKey: "leafy_green", sortOrder: 31 },
  { id: "sp-v-23", nameEn: "GYOJA GARLIC", nameJa: "行者にんにく", category: "VEGETABLE", season: "SPRING", iconKey: "leafy_green", sortOrder: 32 },

  // --- Seafood ---
  { id: "sp-s-1", nameEn: "FIRST BONITO", nameJa: "初鰹", category: "SEAFOOD", season: "SPRING", iconKey: "fish_blue", sortOrder: 40 },
  { id: "sp-s-2", nameEn: "CHERRY SEABREAM", nameJa: "桜鯛", category: "SEAFOOD", season: "SPRING", iconKey: "fish_red", sortOrder: 41 },
  { id: "sp-s-3", nameEn: "RAW SHIRASU", nameJa: "生しらす", category: "SEAFOOD", season: "SPRING", iconKey: "fish_silver", sortOrder: 42 },
  { id: "sp-s-4", nameEn: "FIREFLY SQUID", nameJa: "ホタルイカ", category: "SEAFOOD", season: "SPRING", iconKey: "squid", sortOrder: 43 },
  { id: "sp-s-5", nameEn: "ASARI CLAM", nameJa: "あさり", category: "SEAFOOD", season: "SPRING", iconKey: "shellfish", sortOrder: 44 },
  { id: "sp-s-6", nameEn: "HAMAGURI CLAM", nameJa: "はまぐり", category: "SEAFOOD", season: "SPRING", iconKey: "shellfish", sortOrder: 45 },
  { id: "sp-s-7", nameEn: "AOYAGI CLAM", nameJa: "あおやぎ", category: "SEAFOOD", season: "SPRING", iconKey: "shellfish", sortOrder: 46 },
  { id: "sp-s-8", nameEn: "HALFBEAK", nameJa: "さより", category: "SEAFOOD", season: "SPRING", iconKey: "fish_silver", sortOrder: 47 },
  { id: "sp-s-9", nameEn: "ROCKFISH", nameJa: "メバル", category: "SEAFOOD", season: "SPRING", iconKey: "fish_red", sortOrder: 48 },
  { id: "sp-s-10", nameEn: "SPANISH MACKEREL", nameJa: "さわら", category: "SEAFOOD", season: "SPRING", iconKey: "fish_silver", sortOrder: 49 },
  { id: "sp-s-11", nameEn: "HORSEHAIR CRAB", nameJa: "毛ガニ", category: "SEAFOOD", season: "SPRING", iconKey: "crab", sortOrder: 50 },

  // ==========================================
  // ☀️ SUMMER (6〜8月)
  // ==========================================
  // --- Fruits ---
  { id: "su-f-1", nameEn: "WHITE PEACH", nameJa: "白桃", category: "FRUIT", season: "SUMMER", iconKey: "peach", sortOrder: 1 },
  { id: "su-f-2", nameEn: "SWEET CHERRY", nameJa: "さくらんぼ", category: "FRUIT", season: "SUMMER", iconKey: "cherry", sortOrder: 2 },
  { id: "su-f-3", nameEn: "UME PLUM", nameJa: "梅", category: "FRUIT", season: "SUMMER", iconKey: "citrus_yellow", sortOrder: 3 },
  { id: "su-f-4", nameEn: "WATERMELON", nameJa: "すいか", category: "FRUIT", season: "SUMMER", iconKey: "watermelon", sortOrder: 4 },
  { id: "su-f-5", nameEn: "MELON", nameJa: "メロン", category: "FRUIT", season: "SUMMER", iconKey: "melon", sortOrder: 5 },
  { id: "su-f-6", nameEn: "MANGO", nameJa: "マンゴー", category: "FRUIT", season: "SUMMER", iconKey: "mango", sortOrder: 6 },
  { id: "su-f-7", nameEn: "BLUEBERRY", nameJa: "ブルーベリー", category: "FRUIT", season: "SUMMER", iconKey: "blueberry", sortOrder: 7 },
  { id: "su-f-8", nameEn: "JAPANESE PLUM", nameJa: "すもも・プラム", category: "FRUIT", season: "SUMMER", iconKey: "peach", sortOrder: 8 },
  { id: "su-f-9", nameEn: "APRICOT", nameJa: "あんず", category: "FRUIT", season: "SUMMER", iconKey: "citrus_orange", sortOrder: 9 },
  { id: "su-f-10", nameEn: "PASSION FRUIT", nameJa: "パッションフルーツ", category: "FRUIT", season: "SUMMER", iconKey: "tropical", sortOrder: 10 },
  { id: "su-f-11", nameEn: "DRAGON FRUIT", nameJa: "ドラゴンフルーツ", category: "FRUIT", season: "SUMMER", iconKey: "tropical", sortOrder: 11 },
  { id: "su-f-12", nameEn: "OKINAWA PINEAPPLE", nameJa: "沖縄パイン", category: "FRUIT", season: "SUMMER", iconKey: "citrus_yellow", sortOrder: 12 },
  { id: "su-f-13", nameEn: "HASKAP", nameJa: "ハスカップ", category: "FRUIT", season: "SUMMER", iconKey: "blueberry", sortOrder: 13 },
  { id: "su-f-14", nameEn: "PRUNE", nameJa: "プルーン", category: "FRUIT", season: "SUMMER", iconKey: "grape_purple", sortOrder: 14 },
  { id: "su-f-15", nameEn: "SUMMER GRAPE", nameJa: "ぶどう（デラウェア）", category: "FRUIT", season: "SUMMER", iconKey: "grape_purple", sortOrder: 15 },

  // --- Vegetables ---
  { id: "su-v-1", nameEn: "TOMATO", nameJa: "トマト", category: "VEGETABLE", season: "SUMMER", iconKey: "tomato", sortOrder: 20 },
  { id: "su-v-2", nameEn: "CHERRY TOMATO", nameJa: "ミニトマト", category: "VEGETABLE", season: "SUMMER", iconKey: "tomato", sortOrder: 21 },
  { id: "su-v-3", nameEn: "CUCUMBER", nameJa: "きゅうり", category: "VEGETABLE", season: "SUMMER", iconKey: "cucumber", sortOrder: 22 },
  { id: "su-v-4", nameEn: "EGGPLANT", nameJa: "なす", category: "VEGETABLE", season: "SUMMER", iconKey: "eggplant", sortOrder: 23 },
  { id: "su-v-5", nameEn: "BELL PEPPER", nameJa: "ピーマン", category: "VEGETABLE", season: "SUMMER", iconKey: "pepper", sortOrder: 24 },
  { id: "su-v-6", nameEn: "PAPRIKA", nameJa: "パプリカ", category: "VEGETABLE", season: "SUMMER", iconKey: "pepper", sortOrder: 25 },
  { id: "su-v-7", nameEn: "SWEET CORN", nameJa: "とうもろこし", category: "VEGETABLE", season: "SUMMER", iconKey: "corn", sortOrder: 26 },
  { id: "su-v-8", nameEn: "EDAMAME", nameJa: "枝豆", category: "VEGETABLE", season: "SUMMER", iconKey: "pea", sortOrder: 27 },
  { id: "su-v-9", nameEn: "OKRA", nameJa: "オクラ", category: "VEGETABLE", season: "SUMMER", iconKey: "pepper", sortOrder: 28 },
  { id: "su-v-10", nameEn: "ZUCCHINI", nameJa: "ズッキーニ", category: "VEGETABLE", season: "SUMMER", iconKey: "cucumber", sortOrder: 29 },
  { id: "su-v-11", nameEn: "BITTER GOURD", nameJa: "ゴーヤ", category: "VEGETABLE", season: "SUMMER", iconKey: "cucumber", sortOrder: 30 },
  { id: "su-v-12", nameEn: "MOROHEIYA", nameJa: "モロヘイヤ", category: "VEGETABLE", season: "SUMMER", iconKey: "leafy_green", sortOrder: 31 },
  { id: "su-v-13", nameEn: "MYOGA", nameJa: "みょうが", category: "VEGETABLE", season: "SUMMER", iconKey: "wild_greens", sortOrder: 32 },
  { id: "su-v-14", nameEn: "FRESH GINGER", nameJa: "新生姜", category: "VEGETABLE", season: "SUMMER", iconKey: "root_vegetable", sortOrder: 33 },
  { id: "su-v-15", nameEn: "SHISHITO", nameJa: "ししとう", category: "VEGETABLE", season: "SUMMER", iconKey: "pepper", sortOrder: 34 },
  { id: "su-v-16", nameEn: "WATER SPINACH", nameJa: "空芯菜", category: "VEGETABLE", season: "SUMMER", iconKey: "leafy_green", sortOrder: 35 },
  { id: "su-v-17", nameEn: "TSURUMURASAKI", nameJa: "つるむらさき", category: "VEGETABLE", season: "SUMMER", iconKey: "leafy_green", sortOrder: 36 },
  { id: "su-v-18", nameEn: "MANGANJI PEPPER", nameJa: "万願寺とうがらし", category: "VEGETABLE", season: "SUMMER", iconKey: "pepper", sortOrder: 37 },
  { id: "su-v-19", nameEn: "KAGA CUCUMBER", nameJa: "加賀太きゅうり", category: "VEGETABLE", season: "SUMMER", iconKey: "cucumber", sortOrder: 38 },
  { id: "su-v-20", nameEn: "WATER EGGPLANT", nameJa: "水なす", category: "VEGETABLE", season: "SUMMER", iconKey: "eggplant", sortOrder: 39 },
  { id: "su-v-21", nameEn: "WHITE EGGPLANT", nameJa: "白なす", category: "VEGETABLE", season: "SUMMER", iconKey: "eggplant", sortOrder: 40 },
  { id: "su-v-22", nameEn: "BUTTERNUT SQUASH", nameJa: "バターナッツかぼちゃ", category: "VEGETABLE", season: "SUMMER", iconKey: "pumpkin", sortOrder: 41 },

  // --- Seafood ---
  { id: "su-s-1", nameEn: "PIKE CONGER", nameJa: "鱧（はも）", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_silver", sortOrder: 50 },
  { id: "su-s-2", nameEn: "SWEETFISH", nameJa: "鮎", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_blue", sortOrder: 51 },
  { id: "su-s-3", nameEn: "ROCK OYSTER", nameJa: "岩牡蠣", category: "SEAFOOD", season: "SUMMER", iconKey: "oyster", sortOrder: 52 },
  { id: "su-s-4", nameEn: "THREELINE GRUNT", nameJa: "イサキ", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_silver", sortOrder: 53 },
  { id: "su-s-5", nameEn: "SEA BASS", nameJa: "スズキ", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_silver", sortOrder: 54 },
  { id: "su-s-6", nameEn: "CUTLASSFISH", nameJa: "太刀魚", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_silver", sortOrder: 55 },
  { id: "su-s-7", nameEn: "JAPANESE WHITING", nameJa: "鱚（きす）", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_silver", sortOrder: 56 },
  { id: "su-s-8", nameEn: "GREATER AMBERJACK", nameJa: "カンパチ", category: "SEAFOOD", season: "SUMMER", iconKey: "fish_yellow", sortOrder: 57 },
  { id: "su-s-9", nameEn: "KURUMA PRAWN", nameJa: "車海老", category: "SEAFOOD", season: "SUMMER", iconKey: "shrimp", sortOrder: 58 },
  { id: "su-s-10", nameEn: "ABALONE", nameJa: "アワビ", category: "SEAFOOD", season: "SUMMER", iconKey: "shellfish", sortOrder: 59 },
  { id: "su-s-11", nameEn: "TURBAN SHELL", nameJa: "サザエ", category: "SEAFOOD", season: "SUMMER", iconKey: "shellfish", sortOrder: 60 },

  // ==========================================
  // 🍂 AUTUMN (9〜11月)
  // ==========================================
  // --- Fruits ---
  { id: "au-f-1", nameEn: "GRAPES", nameJa: "ぶどう", category: "FRUIT", season: "AUTUMN", iconKey: "grape_purple", sortOrder: 1 },
  { id: "au-f-2", nameEn: "SHINE MUSCAT", nameJa: "シャインマスカット", category: "FRUIT", season: "AUTUMN", iconKey: "grape_green", sortOrder: 2 },
  { id: "au-f-3", nameEn: "KYOHO GRAPE", nameJa: "巨峰", category: "FRUIT", season: "AUTUMN", iconKey: "grape_purple", sortOrder: 3 },
  { id: "au-f-4", nameEn: "JAPANESE PEAR", nameJa: "梨", category: "FRUIT", season: "AUTUMN", iconKey: "pear", sortOrder: 4 },
  { id: "au-f-5", nameEn: "LA FRANCE PEAR", nameJa: "洋梨", category: "FRUIT", season: "AUTUMN", iconKey: "pear", sortOrder: 5 },
  { id: "au-f-6", nameEn: "APPLE", nameJa: "りんご", category: "FRUIT", season: "AUTUMN", iconKey: "apple_red", sortOrder: 6 },
  { id: "au-f-7", nameEn: "PERSIMMON", nameJa: "柿", category: "FRUIT", season: "AUTUMN", iconKey: "persimmon", sortOrder: 7 },
  { id: "au-f-8", nameEn: "FIG", nameJa: "いちじく", category: "FRUIT", season: "AUTUMN", iconKey: "fig", sortOrder: 8 },
  { id: "au-f-9", nameEn: "JAPANESE CHESTNUT", nameJa: "和栗", category: "FRUIT", season: "AUTUMN", iconKey: "chestnut", sortOrder: 9 },
  { id: "au-f-10", nameEn: "POMEGRANATE", nameJa: "ザクロ", category: "FRUIT", season: "AUTUMN", iconKey: "apple_red", sortOrder: 10 },
  { id: "au-f-11", nameEn: "AKEBI FRUIT", nameJa: "アケビ", category: "FRUIT", season: "AUTUMN", iconKey: "grape_purple", sortOrder: 11 },
  { id: "au-f-12", nameEn: "JUJUBE", nameJa: "なつめ", category: "FRUIT", season: "AUTUMN", iconKey: "citrus_orange", sortOrder: 12 },
  { id: "au-f-13", nameEn: "MARMELO", nameJa: "マルメロ", category: "FRUIT", season: "AUTUMN", iconKey: "pear", sortOrder: 13 },
  { id: "au-f-14", nameEn: "CHINESE QUINCE", nameJa: "かりん", category: "FRUIT", season: "AUTUMN", iconKey: "pear", sortOrder: 14 },

  // --- Vegetables & Mushrooms ---
  { id: "au-v-1", nameEn: "SWEET POTATO", nameJa: "さつまいも", category: "VEGETABLE", season: "AUTUMN", iconKey: "sweet_potato", sortOrder: 20 },
  { id: "au-v-2", nameEn: "TARO", nameJa: "里芋", category: "VEGETABLE", season: "AUTUMN", iconKey: "root_vegetable", sortOrder: 21 },
  { id: "au-v-3", nameEn: "CHINESE YAM", nameJa: "長芋", category: "VEGETABLE", season: "AUTUMN", iconKey: "root_vegetable", sortOrder: 22 },
  { id: "au-v-4", nameEn: "LOTUS ROOT", nameJa: "れんこん", category: "VEGETABLE", season: "AUTUMN", iconKey: "lotus_root", sortOrder: 23 },
  { id: "au-v-5", nameEn: "BURDOCK ROOT", nameJa: "ごぼう", category: "VEGETABLE", season: "AUTUMN", iconKey: "root_vegetable", sortOrder: 24 },
  { id: "au-v-6", nameEn: "PUMPKIN", nameJa: "かぼちゃ", category: "VEGETABLE", season: "AUTUMN", iconKey: "pumpkin", sortOrder: 25 },
  { id: "au-v-7", nameEn: "CARROT", nameJa: "にんじん", category: "VEGETABLE", season: "AUTUMN", iconKey: "root_vegetable", sortOrder: 26 },
  { id: "au-v-8", nameEn: "GINKGO NUT", nameJa: "銀杏", category: "OTHER", season: "AUTUMN", iconKey: "gingko", sortOrder: 27 },
  { id: "au-v-9", nameEn: "CHESTNUT", nameJa: "栗", category: "OTHER", season: "AUTUMN", iconKey: "chestnut", sortOrder: 28 },
  { id: "au-v-10", nameEn: "MATSUTAKE", nameJa: "松茸", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 29 },
  { id: "au-v-11", nameEn: "SHIITAKE", nameJa: "しいたけ", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 30 },
  { id: "au-v-12", nameEn: "SHIMEJI", nameJa: "しめじ", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 31 },
  { id: "au-v-13", nameEn: "MAITAKE", nameJa: "舞茸", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 32 },
  { id: "au-v-14", nameEn: "NAMEKO", nameJa: "なめこ", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 33 },
  { id: "au-v-15", nameEn: "KING OYSTER MUSHROOM", nameJa: "エリンギ", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 34 },
  { id: "au-v-16", nameEn: "ENOKI", nameJa: "えのき", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 35 },
  { id: "au-v-17", nameEn: "LOG-GROWN NAMEKO", nameJa: "原木なめこ", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 36 },
  { id: "au-v-18", nameEn: "WILD MAITAKE", nameJa: "天然舞茸", category: "OTHER", season: "AUTUMN", iconKey: "mushroom", sortOrder: 37 },
  { id: "au-v-19", nameEn: "AKEBI VEGETABLE", nameJa: "あけび", category: "VEGETABLE", season: "AUTUMN", iconKey: "wild_greens", sortOrder: 38 },
  { id: "au-v-20", nameEn: "EDIBLE CHRYSANTHEMUM", nameJa: "食用菊", category: "OTHER", season: "AUTUMN", iconKey: "leafy_green", sortOrder: 39 },

  // --- Seafood ---
  { id: "au-s-1", nameEn: "PACIFIC SAURY", nameJa: "秋刀魚", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_silver", sortOrder: 45 },
  { id: "au-s-2", nameEn: "AUTUMN SALMON", nameJa: "秋鮭", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_red", sortOrder: 46 },
  { id: "au-s-3", nameEn: "RETURNING BONITO", nameJa: "戻り鰹", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_blue", sortOrder: 47 },
  { id: "au-s-4", nameEn: "MACKEREL", nameJa: "鯖", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_blue", sortOrder: 48 },
  { id: "au-s-5", nameEn: "SARDINE", nameJa: "鰯", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_silver", sortOrder: 49 },
  { id: "au-s-6", nameEn: "BONITO", nameJa: "鰹", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_blue", sortOrder: 50 },
  { id: "au-s-7", nameEn: "SPLENDID ALFONSINO", nameJa: "金目鯛", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_red", sortOrder: 51 },
  { id: "au-s-8", nameEn: "SALMON ROE", nameJa: "イクラ", category: "SEAFOOD", season: "AUTUMN", iconKey: "salmon_roe", sortOrder: 52 },
  { id: "au-s-9", nameEn: "SUJIKO", nameJa: "筋子", category: "SEAFOOD", season: "AUTUMN", iconKey: "salmon_roe", sortOrder: 53 },
  { id: "au-s-10", nameEn: "SPAWNING AYU", nameJa: "落ち鮎", category: "SEAFOOD", season: "AUTUMN", iconKey: "fish_blue", sortOrder: 54 },
  { id: "au-s-11", nameEn: "BOTAN SHRIMP", nameJa: "ボタンエビ", category: "SEAFOOD", season: "AUTUMN", iconKey: "shrimp", sortOrder: 55 },
  { id: "au-s-12", nameEn: "SWEET SHRIMP", nameJa: "甘エビ", category: "SEAFOOD", season: "AUTUMN", iconKey: "shrimp", sortOrder: 56 },
  { id: "au-s-13", nameEn: "SNOW CRAB", nameJa: "ズワイガニ", category: "SEAFOOD", season: "AUTUMN", iconKey: "crab", sortOrder: 57 },

  // ==========================================
  // ❄️ WINTER (12〜2月)
  // ==========================================
  // --- Fruits ---
  { id: "wi-f-1", nameEn: "SATSUMA MANDARIN", nameJa: "みかん", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 1 },
  { id: "wi-f-2", nameEn: "PONKAN ORANGE", nameJa: "ぽんかん", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 2 },
  { id: "wi-f-3", nameEn: "IYOKAN CITRUS", nameJa: "いよかん", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 3 },
  { id: "wi-f-4", nameEn: "HASSAKU CITRUS", nameJa: "はっさく", category: "FRUIT", season: "WINTER", iconKey: "citrus_yellow", sortOrder: 4 },
  { id: "wi-f-5", nameEn: "KUMQUAT", nameJa: "金柑", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 5 },
  { id: "wi-f-6", nameEn: "WINTER APPLE", nameJa: "りんご", category: "FRUIT", season: "WINTER", iconKey: "apple_red", sortOrder: 6 },
  { id: "wi-f-7", nameEn: "WINTER PEAR", nameJa: "洋梨", category: "FRUIT", season: "WINTER", iconKey: "pear", sortOrder: 7 },
  { id: "wi-f-8", nameEn: "KIWIFRUIT", nameJa: "キウイ", category: "FRUIT", season: "WINTER", iconKey: "kiwi", sortOrder: 8 },
  { id: "wi-f-9", nameEn: "WINTER STRAWBERRY", nameJa: "いちご", category: "FRUIT", season: "WINTER", iconKey: "strawberry", sortOrder: 9 },
  { id: "wi-f-10", nameEn: "BUNTAN CITRUS", nameJa: "文旦", category: "FRUIT", season: "WINTER", iconKey: "citrus_yellow", sortOrder: 10 },
  { id: "wi-f-11", nameEn: "SETOKA CITRUS", nameJa: "せとか", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 11 },
  { id: "wi-f-12", nameEn: "HARUMI CITRUS", nameJa: "はるみ", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 12 },
  { id: "wi-f-13", nameEn: "KANPEI CITRUS", nameJa: "甘平", category: "FRUIT", season: "WINTER", iconKey: "citrus_orange", sortOrder: 13 },
  { id: "wi-f-14", nameEn: "BANPEIYU POMELO", nameJa: "晩白柚", category: "FRUIT", season: "WINTER", iconKey: "citrus_yellow", sortOrder: 14 },
  { id: "wi-f-15", nameEn: "SWEET SPRING CITRUS", nameJa: "スイートスプリング", category: "FRUIT", season: "WINTER", iconKey: "citrus_yellow", sortOrder: 15 },

  // --- Vegetables ---
  { id: "wi-v-1", nameEn: "DAIKON RADISH", nameJa: "大根", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 20 },
  { id: "wi-v-2", nameEn: "NAPA CABBAGE", nameJa: "白菜", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 21 },
  { id: "wi-v-3", nameEn: "JAPANESE LEEK", nameJa: "長ねぎ", category: "VEGETABLE", season: "WINTER", iconKey: "onion", sortOrder: 22 },
  { id: "wi-v-4", nameEn: "SPINACH", nameJa: "ほうれん草", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 23 },
  { id: "wi-v-5", nameEn: "KOMATSUNA", nameJa: "小松菜", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 24 },
  { id: "wi-v-6", nameEn: "EDIBLE CHRYSANTHEMUM GREENS", nameJa: "春菊", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 25 },
  { id: "wi-v-7", nameEn: "MIZUNA", nameJa: "水菜", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 26 },
  { id: "wi-v-8", nameEn: "TURNIP", nameJa: "かぶ", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 27 },
  { id: "wi-v-9", nameEn: "WINTER LOTUS ROOT", nameJa: "れんこん", category: "VEGETABLE", season: "WINTER", iconKey: "lotus_root", sortOrder: 28 },
  { id: "wi-v-10", nameEn: "WINTER BURDOCK", nameJa: "ごぼう", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 29 },
  { id: "wi-v-11", nameEn: "LILY BULB", nameJa: "百合根", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 30 },
  { id: "wi-v-12", nameEn: "BRUSSELS SPROUTS", nameJa: "芽キャベツ", category: "VEGETABLE", season: "WINTER", iconKey: "cabbage", sortOrder: 31 },
  { id: "wi-v-13", nameEn: "SHOGOIN DAIKON", nameJa: "聖護院大根", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 32 },
  { id: "wi-v-14", nameEn: "SHOGOIN TURNIP", nameJa: "聖護院かぶ", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 33 },
  { id: "wi-v-15", nameEn: "KINTONINJIN CARROT", nameJa: "金時人参", category: "VEGETABLE", season: "WINTER", iconKey: "root_vegetable", sortOrder: 34 },
  { id: "wi-v-16", nameEn: "CHIDJIMI SPINACH", nameJa: "ちぢみほうれん草", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 35 },
  { id: "wi-v-17", nameEn: "SHIMONITA LEEK", nameJa: "下仁田ねぎ", category: "VEGETABLE", season: "WINTER", iconKey: "onion", sortOrder: 36 },
  { id: "wi-v-18", nameEn: "KUJO SCALLION", nameJa: "九条ねぎ", category: "VEGETABLE", season: "WINTER", iconKey: "onion", sortOrder: 37 },
  { id: "wi-v-19", nameEn: "WINTER-SWEETENED GREENS", nameJa: "寒締め野菜", category: "VEGETABLE", season: "WINTER", iconKey: "leafy_green", sortOrder: 38 },

  // --- Seafood ---
  { id: "wi-s-1", nameEn: "WINTER YELLOWTAIL", nameJa: "寒ブリ", category: "SEAFOOD", season: "WINTER", iconKey: "fish_yellow", sortOrder: 45 },
  { id: "wi-s-2", nameEn: "WINTER MACKEREL", nameJa: "寒鯖", category: "SEAFOOD", season: "WINTER", iconKey: "fish_blue", sortOrder: 46 },
  { id: "wi-s-3", nameEn: "FLOUNDER", nameJa: "ヒラメ", category: "SEAFOOD", season: "WINTER", iconKey: "fish_silver", sortOrder: 47 },
  { id: "wi-s-4", nameEn: "FUGU PUFFERFISH", nameJa: "河豚（ふぐ）", category: "SEAFOOD", season: "WINTER", iconKey: "pufferfish", sortOrder: 48 },
  { id: "wi-s-5", nameEn: "MONKFISH", nameJa: "あんこう", category: "SEAFOOD", season: "WINTER", iconKey: "fish_blue", sortOrder: 49 },
  { id: "wi-s-6", nameEn: "MOSHIRAKO COD ROE", nameJa: "白子", category: "SEAFOOD", season: "WINTER", iconKey: "shellfish", sortOrder: 50 },
  { id: "wi-s-7", nameEn: "WINTER OYSTER", nameJa: "牡蠣", category: "SEAFOOD", season: "WINTER", iconKey: "oyster", sortOrder: 51 },
  { id: "wi-s-8", nameEn: "COD", nameJa: "たら", category: "SEAFOOD", season: "WINTER", iconKey: "fish_silver", sortOrder: 52 },
  { id: "wi-s-9", nameEn: "POLLOCK ROE", nameJa: "たらこ", category: "SEAFOOD", season: "WINTER", iconKey: "salmon_roe", sortOrder: 53 },
  { id: "wi-s-10", nameEn: "SEA CUCUMBER", nameJa: "なまこ", category: "SEAFOOD", season: "WINTER", iconKey: "shellfish", sortOrder: 54 },
  { id: "wi-s-11", nameEn: "LONGTOOTH GROUPER", nameJa: "くえ", category: "SEAFOOD", season: "WINTER", iconKey: "fish_silver", sortOrder: 55 },
  { id: "wi-s-12", nameEn: "WINTER FLOUNDER", nameJa: "寒平目", category: "SEAFOOD", season: "WINTER", iconKey: "fish_silver", sortOrder: 56 },
  { id: "wi-s-13", nameEn: "WINTER SNOW CRAB", nameJa: "ズワイガニ", category: "SEAFOOD", season: "WINTER", iconKey: "crab", sortOrder: 57 },
  { id: "wi-s-14", nameEn: "RED KING CRAB", nameJa: "タラバガニ", category: "SEAFOOD", season: "WINTER", iconKey: "crab", sortOrder: 58 },
  { id: "wi-s-15", nameEn: "HORSEHAIR CRAB", nameJa: "毛ガニ", category: "SEAFOOD", season: "WINTER", iconKey: "crab", sortOrder: 59 },
];

export function getInitialFoodItemsWithIcons() {
  return INITIAL_FOODS.map((item) => ({
    ...item,
    iconUrl: getSvgDataUrl(item.iconKey),
  }));
}

// Beautiful, elegant SVG vector icons for seasonal foods & fruits
// Styled to harmonize with Tiffany Blue, Cream Beige, and Warm Brown aesthetics

export const SVG_PRESETS: Record<string, string> = {
  // === FRUITS ===
  strawberry: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 14C32 14 20 22 20 38C20 48 26 54 32 56C38 54 44 48 44 38C44 22 32 14 32 14Z" fill="#E86A7A" stroke="#C24C5C" stroke-width="2"/>
    <path d="M32 8V16M24 12C28 14 32 16 32 16C32 16 36 14 40 12M22 17C26 18 32 17 32 17C32 17 38 18 42 17" stroke="#5DBBB0" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="28" cy="28" r="1.5" fill="#FAF8F5"/>
    <circle cx="36" cy="28" r="1.5" fill="#FAF8F5"/>
    <circle cx="32" cy="36" r="1.5" fill="#FAF8F5"/>
    <circle cx="26" cy="42" r="1.5" fill="#FAF8F5"/>
    <circle cx="38" cy="42" r="1.5" fill="#FAF8F5"/>
    <circle cx="32" cy="48" r="1.5" fill="#FAF8F5"/>
  </svg>`,

  cherry: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="44" r="10" fill="#D94B62" stroke="#A82D42" stroke-width="2"/>
    <circle cx="42" cy="40" r="10" fill="#E85D75" stroke="#A82D42" stroke-width="2"/>
    <path d="M22 34C22 22 28 14 36 10M42 30C40 22 37 14 36 10" stroke="#75A66B" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M36 10C36 10 40 8 46 10C44 14 40 13 36 10Z" fill="#75A66B"/>
  </svg>`,

  peach: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 18C22 18 16 26 16 38C16 48 24 54 32 54C40 54 48 48 48 38C48 26 42 18 32 18Z" fill="#FCAEBA" stroke="#D96E82" stroke-width="2"/>
    <path d="M32 18C32 28 32 46 32 54" stroke="#D96E82" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M32 18C32 12 36 8 40 8M40 8C40 8 46 8 48 12C44 14 40 12 40 8Z" fill="#75A66B" stroke="#527D48" stroke-width="1.5"/>
  </svg>`,

  watermelon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 26C14 44 26 54 48 54V26H14Z" fill="#E85D6F" stroke="#3D322C" stroke-width="2"/>
    <path d="M14 26C14 44 26 54 48 54" stroke="#5DBBB0" stroke-width="6" stroke-linecap="round"/>
    <circle cx="28" cy="34" r="1.5" fill="#3D322C"/>
    <circle cx="36" cy="40" r="1.5" fill="#3D322C"/>
    <circle cx="26" cy="42" r="1.5" fill="#3D322C"/>
    <circle cx="38" cy="32" r="1.5" fill="#3D322C"/>
  </svg>`,

  citrus_orange: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="17" fill="#F97316" stroke="#C2410C" stroke-width="2"/>
    <circle cx="32" cy="20" r="2.5" fill="#5DBBB0"/>
    <path d="M32 20C34 16 38 14 42 12" stroke="#5DBBB0" stroke-width="2" stroke-linecap="round"/>
    <circle cx="25" cy="32" r="0.8" fill="#C2410C"/>
    <circle cx="38" cy="34" r="0.8" fill="#C2410C"/>
    <circle cx="32" cy="44" r="0.8" fill="#C2410C"/>
  </svg>`,

  citrus_yellow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="17" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
    <circle cx="32" cy="20" r="2.5" fill="#75A66B"/>
    <path d="M32 20C34 16 38 14 42 12" stroke="#75A66B" stroke-width="2" stroke-linecap="round"/>
    <circle cx="25" cy="32" r="0.8" fill="#CA8A04"/>
    <circle cx="38" cy="34" r="0.8" fill="#CA8A04"/>
  </svg>`,

  grape_green: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="26" r="6" fill="#A3E635" stroke="#65A30D" stroke-width="1.5"/>
    <circle cx="24" cy="32" r="6" fill="#BEF264" stroke="#65A30D" stroke-width="1.5"/>
    <circle cx="40" cy="32" r="6" fill="#BEF264" stroke="#65A30D" stroke-width="1.5"/>
    <circle cx="28" cy="42" r="6" fill="#A3E635" stroke="#65A30D" stroke-width="1.5"/>
    <circle cx="36" cy="42" r="6" fill="#A3E635" stroke="#65A30D" stroke-width="1.5"/>
    <circle cx="32" cy="50" r="5" fill="#84CC16" stroke="#65A30D" stroke-width="1.5"/>
    <path d="M32 20V10M32 12C36 10 42 12 44 14" stroke="#5DBBB0" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  grape_purple: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="26" r="6" fill="#8B5CF6" stroke="#5B21B6" stroke-width="1.5"/>
    <circle cx="24" cy="32" r="6" fill="#A78BFA" stroke="#5B21B6" stroke-width="1.5"/>
    <circle cx="40" cy="32" r="6" fill="#A78BFA" stroke="#5B21B6" stroke-width="1.5"/>
    <circle cx="28" cy="42" r="6" fill="#8B5CF6" stroke="#5B21B6" stroke-width="1.5"/>
    <circle cx="36" cy="42" r="6" fill="#8B5CF6" stroke="#5B21B6" stroke-width="1.5"/>
    <circle cx="32" cy="50" r="5" fill="#7C3AED" stroke="#5B21B6" stroke-width="1.5"/>
    <path d="M32 20V10M32 12C36 10 42 12 44 14" stroke="#527D48" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  fig: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 14C24 24 16 32 18 44C20 52 28 56 36 54C44 52 48 42 44 32L32 14Z" fill="#9E4770" stroke="#6E2348" stroke-width="2"/>
    <path d="M32 14V8" stroke="#75A66B" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="48" r="2.5" fill="#E882A7"/>
  </svg>`,

  apple_red: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 22C22 18 16 28 16 40C16 50 24 54 32 54C40 54 48 50 48 40C48 28 42 18 32 22Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
    <path d="M32 22V12M32 14C36 12 42 14 44 16" stroke="#527D48" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  pear: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="38" r="17" fill="#E0C379" stroke="#9E7E31" stroke-width="2"/>
    <path d="M32 21V12" stroke="#527D48" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="26" cy="34" r="1" fill="#9E7E31"/>
    <circle cx="38" cy="36" r="1" fill="#9E7E31"/>
  </svg>`,

  persimmon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="38" r="16" fill="#F97316" stroke="#C2410C" stroke-width="2"/>
    <path d="M32 22V14M24 22C28 20 36 20 40 22M26 18C30 22 34 22 38 18" stroke="#527D48" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  mango: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 16C22 18 16 28 18 40C20 48 28 54 36 54C46 54 50 44 48 34C46 22 40 14 32 16Z" fill="#FFAE33" stroke="#D47E11" stroke-width="2"/>
    <path d="M32 16C32 10 34 8 36 6" stroke="#75A66B" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  melon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="18" fill="#B4E3A3" stroke="#5E9948" stroke-width="2"/>
    <path d="M32 18V8M26 8H38" stroke="#5E9948" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 28C28 34 36 34 44 28M18 38C26 44 38 44 46 38" stroke="#5E9948" stroke-width="1.5" stroke-dasharray="3 3"/>
  </svg>`,

  blueberry: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="38" r="12" fill="#566C9E" stroke="#374870" stroke-width="2"/>
    <circle cx="42" cy="32" r="10" fill="#6B84BD" stroke="#374870" stroke-width="2"/>
    <path d="M26 26L23 28M26 26L29 28" stroke="#374870" stroke-width="1.5"/>
  </svg>`,

  tropical: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="16" fill="#EC4899" stroke="#BE185D" stroke-width="2"/>
    <path d="M32 20V12M28 14L32 10L36 14" stroke="#5DBBB0" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="26" cy="34" r="1.5" fill="#FAF8F5"/>
    <circle cx="38" cy="36" r="1.5" fill="#FAF8F5"/>
    <circle cx="32" cy="44" r="1.5" fill="#FAF8F5"/>
  </svg>`,

  biwa: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 20C24 24 20 34 22 44C24 50 32 54 36 50C42 44 44 32 38 22L32 20Z" fill="#F7A742" stroke="#C97B1A" stroke-width="2"/>
    <path d="M32 20C32 14 36 8 36 8" stroke="#75A66B" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  kiwi: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="36" r="16" fill="#84CC16" stroke="#4D7C0F" stroke-width="2"/>
    <circle cx="32" cy="36" r="6" fill="#FEF08A"/>
    <circle cx="28" cy="32" r="1" fill="#3D322C"/>
    <circle cx="36" cy="32" r="1" fill="#3D322C"/>
    <circle cx="36" cy="40" r="1" fill="#3D322C"/>
    <circle cx="28" cy="40" r="1" fill="#3D322C"/>
  </svg>`,

  // === VEGETABLES & WILD GREENS ===
  bamboo_shoot: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 10C26 24 18 40 16 54H48C46 40 38 24 32 10Z" fill="#D9BA8F" stroke="#8C704B" stroke-width="2"/>
    <path d="M22 46C28 42 36 42 42 46" stroke="#8C704B" stroke-width="2" stroke-linecap="round"/>
    <path d="M26 36C30 33 34 33 38 36" stroke="#8C704B" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 10L35 6C35 6 31 7 30 9L32 10Z" fill="#75A66B"/>
  </svg>`,

  onion: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="38" r="16" fill="#F4EFE6" stroke="#8C7E75" stroke-width="2"/>
    <path d="M32 22V8M29 23L24 12M35 23L40 12" stroke="#5DBBB0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  cabbage: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="34" r="18" fill="#A4D89A" stroke="#68A55E" stroke-width="2"/>
    <path d="M20 28C24 38 40 38 44 28M24 44C32 46 36 44 40 42" stroke="#68A55E" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  asparagus: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="18" width="6" height="38" rx="3" fill="#84B86A" stroke="#568A3C" stroke-width="1.5"/>
    <rect x="30" y="12" width="6" height="44" rx="3" fill="#98CC7E" stroke="#568A3C" stroke-width="1.5"/>
    <rect x="38" y="22" width="6" height="34" rx="3" fill="#84B86A" stroke="#568A3C" stroke-width="1.5"/>
  </svg>`,

  pea: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 46C20 48 38 50 48 34C52 26 50 18 48 16C46 18 40 20 32 26C22 34 18 40 16 46Z" fill="#84B86A" stroke="#527D48" stroke-width="2"/>
    <circle cx="26" cy="38" r="4" fill="#A7D68F"/>
    <circle cx="36" cy="30" r="4" fill="#A7D68F"/>
    <circle cx="44" cy="22" r="3" fill="#A7D68F"/>
  </svg>`,

  wild_greens: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 54V30C26 22 34 16 40 22C44 26 40 32 34 30C30 28 32 24 35 25" stroke="#688A58" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="35" cy="25" r="2.5" fill="#4B663D"/>
  </svg>`,

  tomato: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="38" r="17" fill="#E84A4A" stroke="#B82828" stroke-width="2"/>
    <path d="M32 21V12M32 21L26 17M32 21L38 17M32 21L28 23M32 21L36 23" stroke="#5DBBB0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  corn: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="26" y="16" width="14" height="36" rx="7" fill="#FCD34D" stroke="#D99B26" stroke-width="2"/>
    <path d="M22 36C22 48 26 54 32 56C38 54 42 48 42 36" fill="#84B86A" stroke="#527D48" stroke-width="2"/>
  </svg>`,

  eggplant: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 22C24 24 18 34 20 44C22 52 30 56 38 54C46 50 46 38 42 28L32 22Z" fill="#5B3A6B" stroke="#3A1F47" stroke-width="2"/>
    <path d="M32 22L36 12M32 22L26 24M32 22L34 26" stroke="#75A66B" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  cucumber: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 48C14 42 24 18 42 14C48 18 44 44 24 50C20 52 18 50 18 48Z" fill="#65A30D" stroke="#3F6212" stroke-width="2"/>
    <circle cx="28" cy="36" r="1" fill="#FEF08A"/>
    <circle cx="36" cy="28" r="1" fill="#FEF08A"/>
  </svg>`,

  pepper: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 24C20 28 20 44 26 50C30 54 34 54 38 50C44 44 44 28 40 24C36 22 28 22 24 24Z" fill="#5DBBB0" stroke="#3A8A80" stroke-width="2"/>
    <path d="M32 22V12" stroke="#3A8A80" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  root_vegetable: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 22C26 22 24 46 32 54C40 46 38 22 38 22H26Z" fill="#FFFFFF" stroke="#A8A29E" stroke-width="2"/>
    <path d="M32 22V10M28 22L24 14M36 22L40 14" stroke="#5DBBB0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  sweet_potato: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 40C16 26 44 18 52 28C56 36 42 50 24 50C16 50 10 46 12 40Z" fill="#9333EA" stroke="#6B21A8" stroke-width="2"/>
    <circle cx="44" cy="30" r="4" fill="#FDE047"/>
  </svg>`,

  pumpkin: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="38" rx="18" ry="15" fill="#E5983B" stroke="#9A5810" stroke-width="2"/>
    <ellipse cx="32" cy="38" rx="10" ry="15" fill="#F59E0B" stroke="#9A5810" stroke-width="1.5"/>
    <path d="M32 23V12" stroke="#527D48" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  mushroom: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 32V52C26 54 38 54 38 52V32" fill="#E8DEC8" stroke="#7A6242" stroke-width="2"/>
    <path d="M18 32C18 20 46 20 46 32H18Z" fill="#8C6843" stroke="#5C4223" stroke-width="2"/>
  </svg>`,

  leafy_green: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 18C24 18 20 42 22 52H42C44 42 40 18 40 18C36 16 28 16 24 18Z" fill="#86EFAC" stroke="#22C55E" stroke-width="2"/>
    <path d="M28 32C28 44 30 52 32 52C34 52 36 44 36 32" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  lotus_root: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="34" rx="16" ry="14" fill="#F5EBE1" stroke="#A89481" stroke-width="2"/>
    <circle cx="32" cy="34" r="3" fill="#A89481"/>
    <circle cx="24" cy="30" r="2.5" fill="#A89481"/>
    <circle cx="40" cy="30" r="2.5" fill="#A89481"/>
  </svg>`,

  chestnut: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 12C20 22 16 36 18 46C20 52 28 54 32 54C36 54 44 52 46 46C48 36 44 22 32 12Z" fill="#7A4426" stroke="#4A2510" stroke-width="2"/>
    <path d="M18 44C22 50 42 50 46 44C44 52 20 52 18 44Z" fill="#D9AA77"/>
  </svg>`,

  gingko: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 50C32 40 20 38 14 26C18 16 46 16 50 26C44 38 32 40 32 50Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
  </svg>`,

  // === SEAFOOD & OTHERS ===
  fish_blue: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 32C12 24 24 18 42 22C48 24 54 28 54 32C54 36 48 40 42 42C24 46 12 40 12 32Z" fill="#7FA9C9" stroke="#4A7599" stroke-width="2"/>
    <path d="M52 32L60 24V40L52 32Z" fill="#5A87AD"/>
    <circle cx="18" cy="29" r="2" fill="#3D322C"/>
  </svg>`,

  fish_red: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 32C12 24 24 18 42 22C48 24 54 28 54 32C54 36 48 40 42 42C24 46 12 40 12 32Z" fill="#FB7185" stroke="#E11D48" stroke-width="2"/>
    <path d="M52 32L60 24V40L52 32Z" fill="#E11D48"/>
    <circle cx="18" cy="29" r="2" fill="#3D322C"/>
  </svg>`,

  fish_silver: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32C12 28 28 26 48 28C56 29 58 32 58 32C58 32 56 35 48 36C28 38 12 36 8 32Z" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
    <circle cx="16" cy="31" r="1.5" fill="#3D322C"/>
  </svg>`,

  fish_yellow: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 32C10 24 26 20 44 24C52 26 56 30 56 32C56 34 52 38 44 40C26 44 10 40 10 32Z" fill="#64748B" stroke="#334155" stroke-width="2"/>
    <path d="M10 32C22 30 38 30 50 32" stroke="#EAB308" stroke-width="2"/>
    <circle cx="16" cy="29" r="1.8" fill="#3D322C"/>
  </svg>`,

  pufferfish: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="34" r="16" fill="#FDE047" stroke="#CA8A04" stroke-width="2"/>
    <circle cx="24" cy="30" r="2" fill="#3D322C"/>
    <path d="M48 34L54 28V40L48 34Z" fill="#CA8A04"/>
  </svg>`,

  shellfish: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 40C14 26 22 18 32 18C42 18 50 26 50 40C50 46 42 50 32 50C22 50 14 46 14 40Z" fill="#E6DAC8" stroke="#8C7A65" stroke-width="2"/>
    <path d="M32 18V50M22 22C26 30 28 42 26 48M42 22C38 30 36 42 38 48" stroke="#8C7A65" stroke-width="1.5"/>
  </svg>`,

  oyster: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 18C14 26 14 42 22 52C32 56 46 50 48 38C50 26 38 14 22 18Z" fill="#D6D3D1" stroke="#78716C" stroke-width="2"/>
    <ellipse cx="32" cy="36" rx="8" ry="11" fill="#F5F5F4" stroke="#A8A29E" stroke-width="1.5"/>
  </svg>`,

  crab: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="36" rx="14" ry="10" fill="#EA580C" stroke="#9A3412" stroke-width="2"/>
    <circle cx="28" cy="26" r="2" fill="#3D322C"/>
    <circle cx="36" cy="26" r="2" fill="#3D322C"/>
    <path d="M18 36L8 30M18 39L8 38M46 36L56 30M46 39L56 38" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  shrimp: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 44C20 48 40 48 48 36C52 28 48 18 42 16C36 14 28 18 24 26C20 34 18 40 18 44Z" fill="#FB923C" stroke="#EA580C" stroke-width="2"/>
    <circle cx="44" cy="22" r="2" fill="#3D322C"/>
  </svg>`,

  squid: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 12L46 30H18L32 12Z" fill="#C084FC" stroke="#9333EA" stroke-width="2"/>
    <rect x="22" y="30" width="20" height="12" rx="4" fill="#C084FC" stroke="#9333EA" stroke-width="2"/>
    <circle cx="26" cy="36" r="2" fill="#FAF8F5"/>
    <circle cx="38" cy="36" r="2" fill="#FAF8F5"/>
    <path d="M24 44V54M32 44V56M40 44V54" stroke="#9333EA" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  salmon_roe: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="38" r="8" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>
    <circle cx="38" cy="38" r="8" fill="#FB923C" stroke="#C2410C" stroke-width="1.5"/>
    <circle cx="32" cy="26" r="8" fill="#F97316" stroke="#C2410C" stroke-width="1.5"/>
    <circle cx="24" cy="36" r="2" fill="#FFF"/>
    <circle cx="36" cy="36" r="2" fill="#FFF"/>
    <circle cx="30" cy="24" r="2" fill="#FFF"/>
  </svg>`,

  default_sparkle: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="16" fill="#5DBBB0" opacity="0.15"/>
    <path d="M32 16L35 28L47 32L35 36L32 48L29 36L17 32L29 28L32 16Z" fill="#5DBBB0"/>
  </svg>`,
};

export function getPresetSvg(key: string): string {
  const svg = SVG_PRESETS[key] || SVG_PRESETS.default_sparkle;
  return svg;
}

export function getSvgDataUrl(key: string): string {
  const svg = getPresetSvg(key);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

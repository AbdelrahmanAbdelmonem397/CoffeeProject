import cascaraDawn from "@/assets/coffees/cascara-dawn.jpg";
import slowSmoke from "@/assets/coffees/slow-smoke.jpg";
import midnightOak from "@/assets/coffees/midnight-oak.jpg";
import quietGarden from "@/assets/coffees/quiet-garden.jpg";
import hearthstone from "@/assets/coffees/hearthstone.jpg";
import oldLinden from "@/assets/coffees/old-linden.jpg";
import fieldNotes from "@/assets/coffees/field-notes.jpg";
import workshopBlend from "@/assets/coffees/workshop-blend.jpg";
import solstice from "@/assets/coffees/solstice.jpg";

export type Coffee = {
  id: string;
  name: string;
  origin: string;
  notes: string;
  roast: string;
  price: string;
  image: string;
};

export const coffees: Coffee[] = [
  { id: "cascara-dawn", name: "Cascara Dawn", origin: "Ethiopia · Yirgacheffe", notes: "Jasmine · Stone fruit · Honey", roast: "Light", price: "$22", image: cascaraDawn },
  { id: "slow-smoke", name: "Slow Smoke", origin: "Colombia · Huila", notes: "Cocoa · Brown sugar · Walnut", roast: "Medium", price: "$20", image: slowSmoke },
  { id: "midnight-oak", name: "Midnight Oak", origin: "Sumatra · Mandheling", notes: "Dark chocolate · Cedar · Fig", roast: "Dark", price: "$24", image: midnightOak },
  { id: "quiet-garden", name: "Quiet Garden", origin: "Kenya · Nyeri", notes: "Blackcurrant · Bergamot · Cane", roast: "Light", price: "$26", image: quietGarden },
  { id: "hearthstone", name: "Hearthstone", origin: "Guatemala · Huehue.", notes: "Toffee · Orange · Almond", roast: "Medium", price: "$21", image: hearthstone },
  { id: "old-linden", name: "Old Linden", origin: "Brazil · Cerrado", notes: "Hazelnut · Milk chocolate", roast: "Medium-Dark", price: "$19", image: oldLinden },
  { id: "field-notes", name: "Field Notes", origin: "Rwanda · Nyamasheke", notes: "Red apple · Black tea", roast: "Light", price: "$23", image: fieldNotes },
  { id: "workshop-blend", name: "Workshop Blend", origin: "House blend", notes: "Caramel · Walnut · Cocoa", roast: "Medium", price: "$18", image: workshopBlend },
  { id: "solstice", name: "Solstice", origin: "Peru · Cajamarca", notes: "Pear · Brown sugar · Vanilla", roast: "Light-Medium", price: "$22", image: solstice },
];

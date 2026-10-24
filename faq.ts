export interface FAQItem {
  id: string;
  category: 'subscription' | 'delivery' | 'food' | 'packaging';
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'subscription', label: 'Subscription & Billing' },
  { id: 'food', label: 'Food, Nutrition & Prep' },
  { id: 'delivery', label: 'Delivery & Timing' },
  { id: 'packaging', label: 'Eco Packaging & Returns' },
] as const;

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'subscription',
    question: 'How do FreshLoop meal subscriptions work?',
    answer: 'You choose a meal plan (or tailor one with our meal finder), select your meals per day (1, 2, or 3) and delivery days (5, 6, or 7). Our culinary team cooks each dish fresh from scratch using organic ingredients and delivers them chilled to your doorstep during your chosen morning or evening window.'
  },
  {
    id: 'faq-2',
    category: 'subscription',
    question: 'Can I pause, skip a day, or cancel my subscription?',
    answer: 'Yes, completely flexible. You can pause deliveries or skip specific days directly from your Customer Dashboard up until 8:00 PM the evening prior to the scheduled delivery date. There are zero penalty fees or lock-ins.'
  },
  {
    id: 'faq-3',
    category: 'subscription',
    question: 'What payment methods do you support?',
    answer: 'In our upcoming production release, we integrate seamlessly with Razorpay to support UPI (Google Pay, PhonePe, Paytm), credit cards, debit cards, and net banking with auto-renewal management.'
  },
  {
    id: 'faq-4',
    category: 'food',
    question: 'How do I reheat the meals, and how long do they last?',
    answer: 'All meals are cooked fresh daily and blast-chilled to lock in nutrients without preservatives. They keep fresh in your refrigerator for up to 48 hours. Most warm dishes take just 90 to 120 seconds in a microwave or 3 minutes on a medium stovetop skillet. Salads and elixirs are ready to enjoy chilled.'
  },
  {
    id: 'faq-5',
    category: 'food',
    question: 'Are nutrition facts certified or illustrative?',
    answer: 'The macro numbers, calories, and micronutrient estimates displayed across our menu and plans are illustrative calculations based on standardized ingredient weigh-ins and USDA nutrition databases. While we portion strictly with digital scales, slight natural agricultural variations occur.'
  },
  {
    id: 'faq-6',
    category: 'food',
    question: 'What if I have food allergies or dietary restrictions?',
    answer: 'Every dish card specifies common allergens (Nuts, Dairy, Gluten, Soy, Eggs, Celery). During checkout and in your dashboard profile, you can add an allergies note. However, please note that while we observe cross-contamination protocols, our central kitchens handle a variety of ingredients.'
  },
  {
    id: 'faq-7',
    category: 'delivery',
    question: 'What time are meals delivered?',
    answer: 'We offer three daily delivery slots: Early Morning (6:30 AM – 8:30 AM) for breakfast & lunch, Midday (11:00 AM – 1:00 PM) for hot office delivery, and Evening (5:30 PM – 7:30 PM) for dinner. You can set different addresses for morning vs evening deliveries.'
  },
  {
    id: 'faq-8',
    category: 'delivery',
    question: 'What if I am not home during delivery?',
    answer: 'Our drivers can leave your insulated thermal cooler bag with your society security gate, at your apartment door, or with a designated neighbor according to the delivery instructions you enter in your address profile.'
  },
  {
    id: 'faq-9',
    category: 'packaging',
    question: 'What is the "FreshLoop" sustainable packaging return system?',
    answer: 'We minimize single-use plastics. Meals arrive in compostable sugarcane fiber trays encased in an insulated returnable thermal tote with reusable cooling ice-gel packs. Simply leave the tote and ice packs outside your door for our courier to collect during your next delivery.'
  },
  {
    id: 'faq-10',
    category: 'packaging',
    question: 'Are your food containers microwave and oven safe?',
    answer: 'Yes. Our unbleached sugarcane fiber containers are 100% biodegradable and heat-safe up to 140°C in microwaves and conventional ovens. Just remove the recyclable clear PET seal before heating.'
  }
];

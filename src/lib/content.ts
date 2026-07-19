// All site copy lives here (sourced from the Insta Baraati brand PDF).
// In Phase 3 the editable parts (packages, portfolio, testimonials, offer)
// move to Supabase and this file becomes the fallback/seed data.

export const site = {
  name: "Insta Baraati",
  instagramUrl: "https://www.instagram.com/instabaraati",
  instagramHandle: "@instabaraati",
  whatsappNumber: "918448715437",
  tagline: "Aap mahol banao, memory hum capture kar lenge",
  subTagline: "We capture moments you never noticed",
  roles: ["Wedding content creators", "Your personal wedding storyteller"],
};

export const offer = {
  active: true,
  text: "Limited-time wedding season discount",
  note: "For limited slots only",
};

export const problems = {
  heading: "Most couples regret missing out on memorable moments on their big day",
  punchline: "You don’t want to be that couple… do you?",
  solvedHeading: "This is how we solve your biggest problems",
  items: [
    {
      problem: "Not every beautiful moment gets captured.",
      solution: "We ensure nothing important is missed.",
    },
    {
      problem: "Your friends & cousins have the best energy, but it’s never documented.",
      solution: "We turn those moments into fun, real reels.",
    },
    {
      problem: "Parents and loved ones often get lost in the chaos.",
      solution: "We make sure they are part of every meaningful frame.",
    },
    {
      problem: "Wedding memories usually stay locked in albums or drives.",
      solution: "We create a digital space you can relive anytime, anywhere.",
    },
    {
      problem: "Most wedding content just stays personal and unseen.",
      solution: "We turn your moments into content worth sharing.",
    },
  ],
  standsFor: {
    heading: "This is what Insta Baraati stands for",
    intro:
      "Insta Baraati captures the real essence of your wedding — not just the couple, but everyone who brings it to life.",
    points: [
      "From spontaneous laughs to unnoticed moments, we focus on what truly matters.",
      "We make sure every loved one is part of the story, and every memory is preserved — all of it.",
      "We focus on trendy, aesthetic, fun, and storytelling content that is Instagram-worthy and reflects your vibe, your story, and your celebration.",
    ],
  },
};

export const services = {
  heading: "What we offer",
  items: [
    { icon: "plan", title: "Content planning", detail: "Based on your story" },
    { icon: "instagram", title: "Dedicated Instagram page setup", detail: "A page just for your wedding" },
    { icon: "camera", title: "Wedding content coverage", detail: "Planned reels + BTS" },
    { icon: "clapper", title: "Reels creation", detail: "Shoot + edit" },
    { icon: "live", title: "Live Insta stories", detail: "Posted in real time" },
    { icon: "calendar", title: "Content posting & management", detail: "We handle the page for you" },
    { icon: "star", title: "Instagram highlights creation", detail: "Event based" },
    { icon: "bolt", title: "Same day edits", detail: "Quick turnaround reels" },
    { icon: "people", title: "Couple coordination for shoots", detail: "We plan it with you" },
  ],
};

export const process = {
  heading: "Our process",
  subheading: "From Story to Screen",
  steps: [
    { title: "Understand your story", detail: "We dive into your journey" },
    { title: "Plan & finalize content", detail: "Everything aligned in advance" },
    { title: "Capture every moment + BTS", detail: "Planned + candid, we will cover everything" },
    { title: "Craft impactful reels", detail: "From raw emotions to scroll-worthy content" },
    { title: "Post live during events", detail: "Stories & reels in real time" },
    { title: "Curate highlights", detail: "Organized and aesthetic memories" },
    { title: "Post within 24 hours", detail: "So your moments live instantly" },
  ],
};

export const different = {
  heading: "What makes us different from photographers",
  subheading: "We don’t come as a vendor, we join you as a baraati",
  usTitle: "As your Insta Baraati",
  us: [
    "We laugh with your friends, not stand behind the camera",
    "We feel the moment, not interrupt it",
    "We capture how it felt, not just how it looked",
    "We catch the hugs, tears, and inside jokes",
    "We celebrate with you, not just shoot you",
    "We notice the small moments others miss",
    "We capture your people, not just your portraits",
    "We capture the vibe your guests actually felt",
    "We don’t make moments happen; we let them happen",
    "We stay close enough to feel it, far enough to never disturb it",
  ],
  youTitle: "We bring you peace of mind",
  you: [
    "You don’t have to pose, just be yourself",
    "You can enjoy your wedding, we’ll handle the content",
    "Your real emotions get captured, not forced ones",
    "Your friends & family feel comfortable around us",
    "Your best and candid moments won’t go unnoticed",
    "Your wedding won’t feel like a photoshoot",
    "You get content you’ll actually want to post",
    "You don’t have to think, “Are we getting this shot?”",
    "You get to relive moments you didn’t even notice",
    "Your story is captured the way it actually happened",
  ],
};

export const packages = {
  heading: "Our Packages",
  subheading:
    "Thoughtfully designed packages to capture your wedding exactly the way you imagine it.",
  note: "Please note: travel and accommodation charges are not included in the package price. If required, they will be arranged by the client or charged separately based on the wedding location.",
  tiers: [
    {
      name: "Standard",
      highlighted: false,
      features: [
        "1 content creator",
        "4 events (Haldi, Mehendi, Sangeet, Wedding)",
        "30 Reels",
        "Live stories",
        "Delivery time: 24–48 hours",
        "Dedicated Instagram account",
        "All raw data",
        "Planning call",
        "Add-ons available",
      ],
    },
    {
      name: "Premium",
      highlighted: true,
      features: [
        "2–3 content creators",
        "4 events (Haldi, Mehendi, Sangeet, Wedding)",
        "1 extra day shoot (Home / Date / Pre-Wed)",
        "50 Reels",
        "Event-wise highlighted reels",
        "Simultaneous coverage",
        "Live stories",
        "Delivery time: within 24 hours",
        "Dedicated Instagram account + management",
        "All raw data",
        "Planning call",
        "Add-ons available",
      ],
    },
    {
      name: "Customized",
      highlighted: false,
      features: [
        "Add more events",
        "Additional creators",
        "Completely tailored deliverables",
        "Special content requests",
        "Customised everything as per your needs",
      ],
    },
  ],
};

export const heroVideo = "/videos/hero.mp4";

export const portfolio = {
  heading: "Our best work",
  subheading:
    "Reels from real weddings — message reels, BTS and fun concepts, including 1.5M+ view hits.",
  categories: [
    {
      id: "bts",
      label: "BTS Reels",
      items: [
        { title: "Baraat energy", video: "/videos/bts-1.mp4", poster: "/posters/bts-1.jpg" },
        { title: "Behind the scenes", video: "/videos/bts-2.mp4", poster: "/posters/bts-2.jpg" },
        { title: "Candid moments", video: "/videos/bts-3.mp4", poster: "/posters/bts-3.jpg" },
        { title: "Wedding vibes", video: "/videos/bts-4.mp4", poster: "/posters/bts-4.jpg" },
      ],
    },
    {
      id: "fun",
      label: "Fun Concepts",
      items: [
        { title: "Concept reel", video: "/videos/fun-1.mp4", poster: "/posters/fun-1.jpg" },
        { title: "Comedy bit", video: "/videos/fun-2.mp4", poster: "/posters/fun-2.jpg" },
        { title: "Trending audio", video: "/videos/fun-3.mp4", poster: "/posters/fun-3.jpg" },
        { title: "Squad goals", video: "/videos/fun-4.mp4", poster: "/posters/fun-4.jpg" },
      ],
    },
    {
      id: "talking",
      label: "Message Reels",
      items: [
        { title: "Bride’s sister", video: "/videos/talking-1.mp4", poster: "/posters/talking-1.jpg" },
        { title: "Bride’s brother", video: "/videos/talking-2.mp4", poster: "/posters/talking-2.jpg" },
        { title: "Groom’s bhanja", video: "/videos/talking-3.mp4", poster: "/posters/talking-3.jpg" },
        { title: "Groom’s bhabhi", video: "/videos/talking-4.mp4", poster: "/posters/talking-4.jpg" },
      ],
    },
    {
      id: "vendor",
      label: "Vendor Reels",
      items: [
        { title: "Vendor spotlight", video: "/videos/vendor-1.mp4", poster: "/posters/vendor-1.jpg" },
        { title: "Vendor story", video: "/videos/vendor-2.mp4", poster: "/posters/vendor-2.jpg" },
      ],
    },
  ],
};

export const testimonials = {
  heading: "Testimonials",
  videos: [
    {
      names: "Rishita",
      relation: "Bride’s Sister",
      video: "/videos/testimonial-rishita.mp4",
      poster: "/posters/testimonial-rishita.jpg",
    },
    {
      names: "Krish",
      relation: "Bride’s Brother",
      video: "/videos/testimonial-krish.mp4",
      poster: "/posters/testimonial-krish.jpg",
    },
  ],
  items: [
    {
      names: "Shradha & Tushar",
      relation: "Bride and Groom",
      quote:
        "We were worried about missing moments with our parents, but Insta Baraati made sure every family member was part of the story. Our Instagram page from the wedding is something we cherish every day.",
    },
    {
      names: "Rishita & Krish",
      relation: "Bride’s Sister and Brother",
      quote:
        "Insta Baraati didn’t feel like vendors at all. They danced with us, laughed with us, and somehow still caught every single special moment. Also, the reels were ready before the wedding was even over.",
    },
    {
      names: "Shivam & Shivangi",
      relation: "Bride and Groom",
      quote:
        "The reels were so good, our guests couldn’t stop watching. They captured inside jokes and candid moments we didn’t even know were happening. Absolutely loved the experience.",
    },
  ],
};

export const booking = {
  heading: "Book your Insta Baraati today",
  subheading: "So you can enjoy your wedding, while we capture everything around you.",
};

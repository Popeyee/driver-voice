export type Category = 'Unfair Pay' | 'Deactivation' | 'Safety Issues' | 'Customer Abuse' | 'Other';

export interface Comment {
  id: string;
  author: string;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string; // ISO
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  createdAt: string; // ISO
  likes: number;
  comments: Comment[];
}

export const categories: Category[] = [
  'Unfair Pay',
  'Deactivation',
  'Safety Issues',
  'Customer Abuse',
  'Other',
];

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Pay cut after policy change',
    excerpt:
      'After a recent update, my per-mile rate dropped significantly. Covering fuel and maintenance is getting harder.',
    content:
      'I have been driving for three years and always managed to make ends meet. Last month the platform changed its pay structure and my per-mile rate dropped by almost 20%. With fuel prices rising and regular maintenance costs, it became incredibly difficult to keep up. I reached out to support and only received a generic response. This feels unfair to drivers who keep the platform running.',
    category: 'Unfair Pay',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes: 12,
    comments: [
      {
        id: 'c1',
        author: 'Anon Driver',
        text: 'Same here. I had to work longer hours to make the same amount.',
        status: 'approved',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
    ],
  },
  {
    id: '2',
    title: 'Account deactivated without clear reason',
    excerpt:
      'I woke up to a deactivation email with no specific explanation. Appeals have gone nowhere so far.',
    content:
      'Yesterday I received an email saying my account was deactivated due to "policy violations". There was no detail or evidence provided. I have a 4.9 rating and never had serious complaints. I submitted an appeal but only got automated responses. I depend on this income and feel helpless without a human review process.',
    category: 'Deactivation',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    likes: 28,
    comments: [
      {
        id: 'c2',
        author: 'Long-time Driver',
        text: 'Appeal took me two weeks but I finally got reactivated. Keep pushing!',
        status: 'approved',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      },
      {
        id: 'c3',
        author: 'Supporter',
        text: 'There needs to be transparency. Sorry you are going through this.',
        status: 'approved',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
      },
    ],
  },
  {
    id: '3',
    title: 'Customer threatened me over a short wait',
    excerpt:
      'A rider became aggressive because I waited at the wrong entrance for two minutes. Felt unsafe the whole time.',
    content:
      'I messaged the rider that the main entrance was blocked and I was just around the corner. When I arrived they were already angry and started shouting, threatening to report me. I felt unsafe and requested to end the trip early. Safety support should be more responsive in these situations and protect drivers from hostile riders.',
    category: 'Safety Issues',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    likes: 7,
    comments: [],
  },
  {
    id: '4',
    title: 'Passenger verbally abusive after surge ended',
    excerpt:
      'When surge pricing ended mid-ride, the passenger started insulting me and demanded a discount I could not give.',
    content:
      'Halfway through the ride the surge pricing window ended and the fare adjusted. The passenger accused me of scamming them and became verbally abusive the rest of the trip. I reported this but never heard back. Drivers need tools to handle abuse and clear policies that back us up.',
    category: 'Customer Abuse',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    likes: 15,
    comments: [
      {
        id: 'c4',
        author: 'Another Driver',
        text: 'This happens too often. There should be zero tolerance.',
        status: 'approved',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
      },
    ],
  },
  {
    id: '5',
    title: 'Platform fee increased quietly',
    excerpt:
      'Noticed the platform fee went up a few percent. Over time that takes a big bite out of our earnings.',
    content:
      'I keep close track of my earnings and noticed the platform fee creeping up. There was no announcement. Over many rides this really adds up and drivers deserve transparency. A clear breakdown and advance notice would help us plan our finances better.',
    category: 'Unfair Pay',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    likes: 21,
    comments: [],
  },
  {
    id: '6',
    title: 'Community tip: documenting issues helps',
    excerpt:
      'Keeping a simple log of incidents and support tickets helped me resolve a dispute faster.',
    content:
      'Not all stories are negative. I started keeping a small log with dates, ticket numbers, and screenshots when something happened. When I had a fare dispute, that record helped me get a faster resolution. Sharing in case it helps others.',
    category: 'Other',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 5,
    comments: [],
  },
];

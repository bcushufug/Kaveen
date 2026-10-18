export interface ProgramItem {
  id: string;
  title: string;
  timeRange: string;
  startHour: number;
  durationMinutes: number;
  thumbnail: string;
  category?: string;
  isUpcoming?: boolean;
}

// Channel-specific realistic EPG Catch-up & Schedule database
export const CHANNEL_PROGRAMS: Record<string, { today: ProgramItem[]; yesterday: ProgramItem[]; twoDaysAgo: ProgramItem[]; upcoming: ProgramItem[] }> = {
  // Channel One (ID 1)
  "1": {
    today: [
      {
        id: "ch1-t1",
        title: "Me Wasantha Kalayai",
        timeRange: "10:00 PM - 12:00 AM",
        startHour: 22,
        durationMinutes: 120,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-t2",
        title: "Channel One Highway",
        timeRange: "12:00 AM - 01:00 AM",
        startHour: 0,
        durationMinutes: 60,
        thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-t3",
        title: "Radio One Live",
        timeRange: "01:00 AM - 02:00 AM",
        startHour: 1,
        durationMinutes: 60,
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-t4",
        title: "Hitha Langa Doc 990",
        timeRange: "02:00 AM - 02:30 AM",
        startHour: 2,
        durationMinutes: 30,
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-t5",
        title: "Suwa Arana Health Show",
        timeRange: "02:30 AM - 03:00 AM",
        startHour: 2.5,
        durationMinutes: 30,
        thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-t6",
        title: "Morning Melody Special",
        timeRange: "06:00 AM - 08:00 AM",
        startHour: 6,
        durationMinutes: 120,
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60"
      }
    ],
    yesterday: [
      {
        id: "ch1-y1",
        title: "Prime Golden Cinema",
        timeRange: "08:30 PM - 11:00 PM",
        startHour: 20.5,
        durationMinutes: 150,
        thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-y2",
        title: "One News 7PM Edition",
        timeRange: "07:00 PM - 08:00 PM",
        startHour: 19,
        durationMinutes: 60,
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-y3",
        title: "Highway Express Non-Stop",
        timeRange: "03:00 PM - 05:00 PM",
        startHour: 15,
        durationMinutes: 120,
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60"
      }
    ],
    twoDaysAgo: [
      {
        id: "ch1-2d1",
        title: "Saturday Night Gala",
        timeRange: "09:00 PM - 11:30 PM",
        startHour: 21,
        durationMinutes: 150,
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: "ch1-2d2",
        title: "Special Musical Symphony",
        timeRange: "06:00 PM - 08:00 PM",
        startHour: 18,
        durationMinutes: 120,
        thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=60"
      }
    ],
    upcoming: [
      {
        id: "ch1-u1",
        title: "Evening News Bulletin",
        timeRange: "07:00 PM - 08:00 PM",
        startHour: 19,
        durationMinutes: 60,
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60",
        isUpcoming: true
      },
      {
        id: "ch1-u2",
        title: "Prime Time Teledrama Showcase",
        timeRange: "08:30 PM - 10:00 PM",
        startHour: 20.5,
        durationMinutes: 90,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60",
        isUpcoming: true
      }
    ]
  }
};

// Generic generator for any channel by category
export function getChannelPrograms(channelId: string | number, channelName: string, category: string) {
  if (CHANNEL_PROGRAMS[String(channelId)]) {
    return CHANNEL_PROGRAMS[String(channelId)];
  }

  // Cartoon / Kids template
  if (category.toLowerCase().includes("kid") || channelName.toLowerCase().includes("cartoon") || channelName.toLowerCase().includes("pogo")) {
    return {
      today: [
        {
          id: `k-${channelId}-1`,
          title: "Steven Universe",
          timeRange: "11:00 PM - 12:00 AM",
          startHour: 23,
          durationMinutes: 60,
          thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `k-${channelId}-2`,
          title: "Ben 10 Alien Force",
          timeRange: "12:00 AM - 01:00 AM",
          startHour: 0,
          durationMinutes: 60,
          thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `k-${channelId}-3`,
          title: "Ben 10 Classic Omniverse",
          timeRange: "01:00 AM - 02:00 AM",
          startHour: 1,
          durationMinutes: 60,
          thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `k-${channelId}-4`,
          title: "Teen Titans Go!",
          timeRange: "02:00 AM - 03:00 AM",
          startHour: 2,
          durationMinutes: 60,
          thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `k-${channelId}-5`,
          title: "Tom & Jerry Adventures",
          timeRange: "03:00 AM - 04:00 AM",
          startHour: 3,
          durationMinutes: 60,
          thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=60"
        }
      ],
      yesterday: [
        {
          id: `k-${channelId}-y1`,
          title: "The Powerpuff Girls",
          timeRange: "04:00 PM - 05:30 PM",
          startHour: 16,
          durationMinutes: 90,
          thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `k-${channelId}-y2`,
          title: "Adventure Time Mystery",
          timeRange: "02:00 PM - 03:30 PM",
          startHour: 14,
          durationMinutes: 90,
          thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=60"
        }
      ],
      twoDaysAgo: [
        {
          id: `k-${channelId}-2d1`,
          title: "We Bare Bears Movie",
          timeRange: "07:00 PM - 09:00 PM",
          startHour: 19,
          durationMinutes: 120,
          thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=60"
        }
      ],
      upcoming: [
        {
          id: `k-${channelId}-u1`,
          title: "Scooby Doo Mystery Hour",
          timeRange: "06:00 PM - 07:00 PM",
          startHour: 18,
          durationMinutes: 60,
          thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=60",
          isUpcoming: true
        }
      ]
    };
  }

  // Sports template
  if (category.toLowerCase().includes("sport")) {
    return {
      today: [
        {
          id: `s-${channelId}-1`,
          title: "Live Match Replay: T20 Championship",
          timeRange: "09:00 PM - 12:00 AM",
          startHour: 21,
          durationMinutes: 180,
          thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `s-${channelId}-2`,
          title: "Premier Football Action & Highlights",
          timeRange: "06:00 PM - 08:30 PM",
          startHour: 18,
          durationMinutes: 150,
          thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=60"
        },
        {
          id: `s-${channelId}-3`,
          title: "Sports Arena World News & Preview",
          timeRange: "04:00 PM - 05:30 PM",
          startHour: 16,
          durationMinutes: 90,
          thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&auto=format&fit=crop&q=60"
        }
      ],
      yesterday: [
        {
          id: `s-${channelId}-y1`,
          title: "Grand Slam Tournament Round 4",
          timeRange: "02:00 PM - 05:00 PM",
          startHour: 14,
          durationMinutes: 180,
          thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&auto=format&fit=crop&q=60"
        }
      ],
      twoDaysAgo: [
        {
          id: `s-${channelId}-2d1`,
          title: "Motorsport Grand Prix Qualifiers",
          timeRange: "07:00 PM - 09:30 PM",
          startHour: 19,
          durationMinutes: 150,
          thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&auto=format&fit=crop&q=60"
        }
      ],
      upcoming: [
        {
          id: `s-${channelId}-u1`,
          title: "Live Finals: Super League Clash",
          timeRange: "07:30 PM - 11:00 PM",
          startHour: 19.5,
          durationMinutes: 210,
          thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=60",
          isUpcoming: true
        }
      ]
    };
  }

  // Default TV station template (News, Movies, Local, General)
  return {
    today: [
      {
        id: `g-${channelId}-1`,
        title: `${channelName} Prime Night Show`,
        timeRange: "10:00 PM - 12:00 AM",
        startHour: 22,
        durationMinutes: 120,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: `g-${channelId}-2`,
        title: `${channelName} News Bulletin & Analysis`,
        timeRange: "07:00 PM - 08:30 PM",
        startHour: 19,
        durationMinutes: 90,
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: `g-${channelId}-3`,
        title: "Afternoon Cinema & Drama",
        timeRange: "03:00 PM - 05:30 PM",
        startHour: 15,
        durationMinutes: 150,
        thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: `g-${channelId}-4`,
        title: "Morning Live Special",
        timeRange: "07:00 AM - 09:30 AM",
        startHour: 7,
        durationMinutes: 150,
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60"
      }
    ],
    yesterday: [
      {
        id: `g-${channelId}-y1`,
        title: `${channelName} Special Feature Documentary`,
        timeRange: "08:00 PM - 10:00 PM",
        startHour: 20,
        durationMinutes: 120,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60"
      },
      {
        id: `g-${channelId}-y2`,
        title: "Midday Special Report",
        timeRange: "12:00 PM - 01:30 PM",
        startHour: 12,
        durationMinutes: 90,
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60"
      }
    ],
    twoDaysAgo: [
      {
        id: `g-${channelId}-2d1`,
        title: "Musical Gala & Cultural Showcase",
        timeRange: "08:30 PM - 11:00 PM",
        startHour: 20.5,
        durationMinutes: 150,
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60"
      }
    ],
    upcoming: [
      {
        id: `g-${channelId}-u1`,
        title: `${channelName} Live Tonight Special`,
        timeRange: "08:00 PM - 10:30 PM",
        startHour: 20,
        durationMinutes: 150,
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&auto=format&fit=crop&q=60",
        isUpcoming: true
      }
    ]
  };
}

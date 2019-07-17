export default [
  {
    name: '2 200 m',
    from: 135.7,
    to: 137.8,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 135.7, to: 137.8, bw: 200, mode: 'yellow', startText: 1, endText: -1 }
        ]
      }
    ]
  },
  {
    name: '630 m',
    from: 472,
    to: 479,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 472, to: 479, bw: 200, mode: 'yellow', startText: 1 },
          { from: 475, to: 479, bw: 0, mode: 'yellow', endText: -1 }
        ]
      }
    ]
  },
  {
    name: '160 m',
    from: 1810,
    to: 2000,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 1810, to: 1838, bw: 200, mode: 'yellow', startText: 2 },
          { from: 1838, to: 1840, bw: 500, mode: 'orange', startText: -1 },
          { from: 1840, to: 1843, bw: 2700, mode: 'blue', startText: 1 },
          { from: 1843, to: 2000, bw: 2700, mode: 'blue', endText: -2 }
        ]
      }
    ]
  },
  {
    name: '80 m',
    from: 3500,
    to: 3800,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 3500, to: 3510, bw: 200, mode: 'yellow', startText: 1 },
          { from: 3510, to: 3560, bw: 200, mode: 'yellow' },
          { from: 3560, to: 3570, bw: 200, mode: 'yellow' },
          { from: 3570, to: 3580, bw: 200, mode: 'yellow', endText: -1 },
          { from: 3580, to: 3590, bw: 500, mode: 'orange' },
          { from: 3590, to: 3600, bw: 500, mode: 'orange' },
          { from: 3600, to: 3620, bw: 2700, mode: 'blue', startText: 1 },
          { from: 3600, to: 3620, bw: 2700, mode: 'blue' },
          { from: 3620, to: 3650, bw: 2700, mode: 'blue' },
          { from: 3650, to: 3700, bw: 2700, mode: 'blue' },
          { from: 3700, to: 3775, bw: 2700, mode: 'blue' },
          { from: 3775, to: 3800, bw: 2700, mode: 'blue', endText: -1 }
        ]
      },
      {
        name: 'B',
        classes: ['B'],
        slices: [
          { from: 3510, to: 3560, bw: 200, mode: 'yellow', startText: 1 },
          { from: 3560, to: 3570, bw: 200, mode: 'yellow' },
          { from: 3570, to: 3580, bw: 200, mode: 'yellow', endText: -1 },
          { from: 3580, to: 3590, bw: 500, mode: 'orange' },
          { from: 3590, to: 3600, bw: 500, mode: 'orange' },
          { from: 3600, to: 3620, bw: 2700, mode: 'blue', startText: 1 },
          { from: 3600, to: 3620, bw: 2700, mode: 'blue' },
          { from: 3620, to: 3650, bw: 2700, mode: 'blue' },
          { from: 3650, to: 3700, bw: 2700, mode: 'blue' },
          { from: 3700, to: 3750, bw: 2700, mode: 'blue', endText: -1 }
        ]
      }
    ],
    bookmarks: [
      { pos: 3555, name: 'QRS centre of activity' },
      { pos: 3560, name: 'QRP centre of activity' },
      { pos: 3573, name: 'FT8' },
      { pos: 3690, name: 'SSB centre of activity' },
      { pos: 3735, name: 'Image centre of activity' },
      { pos: 3760, name: 'Region 1 emergency centre of activity' }
    ]
  },
  {
    name: '60 m',
    from: 5351.5,
    to: 5366.5,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 5351.5, to: 5354, bw: 200, mode: 'yellow', startText: 2 },
          { from: 5354, to: 5366, bw: 2700, mode: 'blue', startText: 1, endText: -1 },
          { from: 5366, to: 5366.5, bw: 20, mode: 'yellow', endText: -2 }
        ]
      }
    ]
  },
  {
    name: '40 m',
    from: 7000,
    to: 7200,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 7000, to: 7040, bw: 200, mode: 'yellow', startText: 1 },
          { from: 7040, to: 7047, bw: 500, mode: 'orange', startText: 1 },
          { from: 7047, to: 7050, bw: 500, mode: 'orange' },
          { from: 7050, to: 7053, bw: 2700, mode: 'orange' },
          { from: 7053, to: 7060, bw: 2700, mode: 'orange' },
          { from: 7060, to: 7100, bw: 2700, mode: 'orange' },
          { from: 7100, to: 7130, bw: 2700, mode: 'orange' },
          { from: 7130, to: 7175, bw: 2700, mode: 'orange' },
          { from: 7175, to: 7200, bw: 2700, mode: 'orange', endText: -1 }
        ]
      },
      {
        name: 'B',
        classes: ['B'],
        slices: [
          { from: 7010, to: 7040, bw: 200, mode: 'yellow', startText: 1, endText: 1 }
        ]
      }
    ],
    bookmarks: [
      { pos: 7030, name: 'QRP centre of activity' },
      { pos: 7070, name: 'Digital voice centre of activity' },
      { pos: 7074, name: 'FT8' },
      { pos: 7090, name: 'SSB QRP centre of activity' },
      { pos: 7110, name: 'Region 1 Emergency centre of activity' },
      { pos: 7165, name: 'Image centre of activity' }
    ]
  },
  {
    name: '30 m',
    from: 10100,
    to: 10150,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 10100, to: 10130, bw: 200, mode: 'yellow', startText: 1, endText: -1 },
          { from: 10130, to: 10150, bw: 500, mode: 'orange', endText: -1 }
        ]
      }
    ]
  },
  {
    name: '20 m',
    from: 14000,
    to: 14350,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 14000, to: 14060, bw: 200, mode: 'yellow', startText: 2 },
          { from: 14060, to: 14070, bw: 200, mode: 'yellow' },
          { from: 14070, to: 14089, bw: 500, mode: 'orange', startText: -1 },
          { from: 14089, to: 14099, bw: 500, mode: 'orange' },
          { from: 14099, to: 14101, bw: 0, mode: 'red', startText: 2, endText: 1 },
          { from: 14101, to: 14112, bw: 2700, mode: 'blue' },
          { from: 14112, to: 14125, bw: 2700, mode: 'blue' },
          { from: 14125, to: 14300, bw: 2700, mode: 'blue' },
          { from: 14300, to: 14350, bw: 2700, mode: 'blue', endText: -2 }
        ]
      }
    ]
  },
  {
    name: '17 m',
    from: 18068,
    to: 18168,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 18068, to: 18095, bw: 200, mode: 'yellow', startText: 2 },
          { from: 18095, to: 18105, bw: 500, mode: 'orange', startText: -1 },
          { from: 18105, to: 18109, bw: 500, mode: 'orange' },
          { from: 18109, to: 18111, bw: 0, mode: 'red', startText: 2, endText: 1 },
          { from: 18111, to: 18120, bw: 2700, mode: 'blue' },
          { from: 18120, to: 18168, bw: 2700, mode: 'blue', endText: -2 }
        ]
      }
    ]
  },
  {
    name: '15 m',
    from: 21000,
    to: 21450,
    units: 'KHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 21000, to: 21070, bw: 200, mode: 'yellow', startText: 2 },
          { from: 21070, to: 21090, bw: 500, mode: 'orange', startText: -1 },
          { from: 21090, to: 21110, bw: 500, mode: 'orange' },
          { from: 21110, to: 21120, bw: 2700, mode: 'blue', startText: -3 },
          { from: 21120, to: 21149, bw: 500, mode: 'orange', startText: 3 },
          { from: 21149, to: 21151, bw: 0, mode: 'red', startText: 2, endText: 1 },
          { from: 21151, to: 21450, bw: 2700, mode: 'blue', startText: 1, endText: -1 }
        ]
      }
    ]
  },
  {
    name: '12 m',
    from: 24890,
    to: 24990,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 24890, to: 24915, bw: 200, mode: 'yellow', startText: 2 },
          { from: 24915, to: 24925, bw: 500, mode: 'orange', startText: -1 },
          { from: 24925, to: 24929, bw: 500, mode: 'orange' },
          { from: 24929, to: 24931, bw: 0, mode: 'red', startText: 2, endText: 1 },
          { from: 24931, to: 24940, bw: 2700, mode: 'blue' },
          { from: 24940, to: 24990, bw: 2700, mode: 'blue', endText: -2 }
        ]
      }
    ]
  },
  {
    name: '10 m',
    from: 28000,
    to: 29700,
    units: 'KHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 28000, to: 28070, bw: 200, mode: 'yellow', startText: 3 },
          { from: 28070, to: 28120, bw: 500, mode: 'orange', startText: 2 },
          { from: 28120, to: 28150, bw: 500, mode: 'orange' },
          { from: 28150, to: 28190, bw: 500, mode: 'orange' },
          { from: 28190, to: 29199, bw: 0, mode: 'red', startText: 0 },
          { from: 28199, to: 28201, bw: 0, mode: 'red' },
          { from: 28201, to: 28225, bw: 0, mode: 'red', endText: 1 },
          { from: 28225, to: 28300, bw: 2700, mode: 'blue' },
          { from: 28300, to: 28320, bw: 2700, mode: 'blue' },
          { from: 28320, to: 29000, bw: 2700, mode: 'blue' },
          { from: 29000, to: 29100, bw: 6000, mode: 'green', startText: 2 },
          { from: 29100, to: 29200, bw: 6000, mode: 'green' },
          { from: 29200, to: 29300, bw: 6000, mode: 'green' },
          { from: 29300, to: 29510, bw: 6000, mode: 'green' },
          { from: 29510, to: 29520, bw: 0, mode: 'red', startText: -1, endText: -2 },
          { from: 29520, to: 29590, bw: 6000, mode: 'green' },
          { from: 29590, to: 29610, bw: 6000, mode: 'green' },
          { from: 29610, to: 29620, bw: 6000, mode: 'green' },
          { from: 29620, to: 29700, bw: 6000, mode: 'green', endText: -3 }
        ]
      }
    ]
  }
]

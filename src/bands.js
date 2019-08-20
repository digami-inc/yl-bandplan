export default [
  {
    route: '2200m',
    name: '2 200 m',
    from: 135.7,
    to: 137.8,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 135.7, to: 137.8, mode: 'cw' }
        ]
      }
    ],
    iaru: [
      { from: 135.7, to: 137.8, bw: 200, mode: 'yellow', desc: 'CW, QRSS and narrow band digital modes' }
    ]
  },
  {
    route: '630m',
    name: '630 m',
    from: 472,
    to: 479,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 472, to: 479, mode: 'cw' },
          { from: 475, to: 479, mode: 'digi', show: 'bottom', startText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 472, to: 475, bw: 200, mode: 'yellow', desc: 'CW, See NOTES (**)' },
      { from: 475, to: 479, bw: 0, mode: 'yellow', desc: 'CW, digimodes, See NOTES' }
    ],
    iaruNotes: '(**) If a frequency is to be selected, particular attention must be paid to still existing Non Directional Beacons (NDB) of the radio navigation service! (#) maximum bandwidth not specified, 500 Hz suggested.'
  },
  {
    route: '160m',
    name: '160 m',
    from: 1810,
    to: 2000,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 1810, to: 1838, mode: 'cw', endText: -1 },
          { from: 1838, to: 1840, mode: 'digi' },
          { from: 1840, to: 2000, mode: 'lsb', startText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 1810, to: 1838, bw: 200, mode: 'yellow', desc: '' },
      { from: 1838, to: 1840, bw: 500, mode: 'orange', desc: '' },
      { from: 1840, to: 1843, bw: 2700, mode: 'blue', desc: '' },
      { from: 1843, to: 2000, bw: 2700, mode: 'blue', desc: '' }
    ]
  },
  {
    route: '80m',
    name: '80 m',
    from: 3500,
    to: 3800,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 3500, to: 3570, mode: 'cw', endText: -1 },
          { from: 3570, to: 3600, mode: 'digi' },
          { from: 3600, to: 3800, mode: 'lsb', startText: 1 }
        ]
      },
      {
        name: 'B',
        classes: ['B'],
        slices: [
          { from: 3510, to: 3570, mode: 'cw', startText: 1, endText: -2 },
          { from: 3570, to: 3600, mode: 'digi' },
          { from: 3600, to: 3750, mode: 'lsb', startText: 1, endText: -1 }
        ]
      }
    ],
    iaru: [
      { from: 3500, to: 3510, bw: 200, mode: 'yellow', desc: 'CW, priority for intercontinental operation' },
      { from: 3510, to: 3560, bw: 200, mode: 'yellow', desc: 'CW, contest preferred' },
      { from: 3560, to: 3570, bw: 200, mode: 'yellow', desc: 'CW' },
      { from: 3570, to: 3580, bw: 200, mode: 'yellow', desc: 'Narrow band modes – digimodes' },
      { from: 3580, to: 3590, bw: 500, mode: 'orange', desc: 'Narrow band modes – digimodes' },
      { from: 3590, to: 3600, bw: 500, mode: 'orange', desc: 'Narrow band modes – digimodes, automatically controlled data stations (unattended)' },
      { from: 3600, to: 3620, bw: 2700, mode: 'blue', desc: 'All modes - digimodes, automatically controlled data station (unattended), (*)', note: '(*) Lowest dial setting for LSB Voice mode: 3603' },
      { from: 3600, to: 3650, bw: 2700, mode: 'blue', desc: 'All modes, SSB contest preferred, (*)', note: '(*) Lowest dial setting for LSB Voice mode: 3603' },
      { from: 3650, to: 3700, bw: 2700, mode: 'blue', desc: 'All modes' },
      { from: 3700, to: 3775, bw: 2700, mode: 'blue', desc: 'All modes, SSB contest preferred' },
      { from: 3775, to: 3800, bw: 2700, mode: 'blue', desc: 'All modes, SSB contest preferred, priority for intercontinental operation' }
    ],
    bookmarks: [
      { pos: 3555, name: 'QRS centre of activity' },
      { pos: 3560, name: 'QRP centre of activity' },
      { pos: 3573, name: 'FT8' },
      { pos: 3630, name: 'Digital Voice Centre of Activity' },
      { pos: 3690, name: 'SSB QRP centre of activity' },
      { pos: 3735, name: 'Image centre of activity' },
      { pos: 3760, name: 'Region 1 emergency centre of activity' }
    ]
  },
  {
    route: '60m',
    name: '60 m',
    from: 5351.5,
    to: 5366.5,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 5351.5, to: 5354, mode: 'cw', startText: 2 },
          { from: 5354, to: 5366, mode: 'usb', startText: 1 },
          { from: 5366, to: 5366.5, mode: 'digi', startText: -1 }
        ]
      }
    ],
    iaru: [
      { from: 5351.5, to: 5354, bw: 200, mode: 'yellow', desc: '' },
      { from: 5354, to: 5366, bw: 2700, mode: 'blue', desc: '' },
      { from: 5366, to: 5366.5, bw: 20, mode: 'yellow', desc: '' }
    ]
  },
  {
    route: '40m',
    name: '40 m',
    from: 7000,
    to: 7200,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 7000, to: 7040, mode: 'cw', endText: -1 },
          { from: 7040, to: 7060, mode: 'digi' },
          { from: 7060, to: 7200, mode: 'lsb', startText: 1, endText: -1 }
        ]
      },
      {
        name: 'B',
        classes: ['B'],
        slices: [
          { from: 7010, to: 7040, bw: 200, mode: 'cw', startText: 1, endText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 7000, to: 7040, bw: 200, mode: 'yellow', desc: '' },
      { from: 7040, to: 7047, bw: 500, mode: 'orange', desc: '' },
      { from: 7047, to: 7050, bw: 500, mode: 'orange', desc: '' },
      { from: 7050, to: 7053, bw: 2700, mode: 'orange', desc: '' },
      { from: 7053, to: 7060, bw: 2700, mode: 'orange', desc: '' },
      { from: 7060, to: 7100, bw: 2700, mode: 'orange', desc: '' },
      { from: 7100, to: 7130, bw: 2700, mode: 'orange', desc: '' },
      { from: 7130, to: 7175, bw: 2700, mode: 'orange', desc: '' },
      { from: 7175, to: 7200, bw: 2700, mode: 'orange', desc: '' }
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
    route: '30m',
    name: '30 m',
    from: 10100,
    to: 10150,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 10100, to: 10130, mode: 'cw', endText: -1 },
          { from: 10130, to: 10150, mode: 'digi' }
        ]
      }
    ],
    iaru: [
      { from: 10100, to: 10130, bw: 200, mode: 'yellow', desc: '' },
      { from: 10130, to: 10150, bw: 500, mode: 'orange', desc: '' }
    ]
  },
  {
    route: '20m',
    name: '20 m',
    from: 14000,
    to: 14350,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 14000, to: 14070, mode: 'cw', endText: -1 },
          { from: 14070, to: 14112, mode: 'digi' },
          { from: 14099, to: 14101, mode: 'block' },
          { from: 14112, to: 14350, bw: 2700, mode: 'usb', startText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 14000, to: 14060, bw: 200, mode: 'yellow', desc: '' },
      { from: 14060, to: 14070, bw: 200, mode: 'yellow', desc: '' },
      { from: 14070, to: 14089, bw: 500, mode: 'orange', desc: '' },
      { from: 14089, to: 14099, bw: 500, mode: 'orange', desc: '' },
      { from: 14099, to: 14101, bw: 0, mode: 'red', desc: '' },
      { from: 14101, to: 14112, bw: 2700, mode: 'blue', desc: '' },
      { from: 14112, to: 14125, bw: 2700, mode: 'blue', desc: '' },
      { from: 14125, to: 14300, bw: 2700, mode: 'blue', desc: '' },
      { from: 14300, to: 14350, bw: 2700, mode: 'blue', desc: '' }
    ]
  },
  {
    route: '17m',
    name: '17 m',
    from: 18068,
    to: 18168,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 18068, to: 18095, mode: 'cw', endText: -1 },
          { from: 18095, to: 18120, mode: 'digi' },
          { from: 18109, to: 18111, mode: 'block' },
          { from: 18120, to: 18168, bw: 2700, mode: 'usb', startText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 18068, to: 18095, bw: 200, mode: 'yellow', desc: '' },
      { from: 18095, to: 18105, bw: 500, mode: 'orange', desc: '' },
      { from: 18105, to: 18109, bw: 500, mode: 'orange', desc: '' },
      { from: 18109, to: 18111, bw: 0, mode: 'red', desc: '' },
      { from: 18111, to: 18120, bw: 2700, mode: 'blue', desc: '' },
      { from: 18120, to: 18168, bw: 2700, mode: 'blue', desc: '' }
    ]
  },
  {
    route: '15m',
    name: '15 m',
    from: 21000,
    to: 21450,
    units: 'KHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 21000, to: 21070, mode: 'cw', endText: -1 },
          { from: 21070, to: 21151, mode: 'digi' },
          { from: 21149, to: 21151, mode: 'block' },
          { from: 21151, to: 21450, mode: 'usb', startText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 21000, to: 21070, bw: 200, mode: 'yellow', desc: '' },
      { from: 21070, to: 21090, bw: 500, mode: 'orange', desc: '' },
      { from: 21090, to: 21110, bw: 500, mode: 'orange', desc: '' },
      { from: 21110, to: 21120, bw: 2700, mode: 'blue', desc: '' },
      { from: 21120, to: 21149, bw: 500, mode: 'orange', desc: '' },
      { from: 21149, to: 21151, bw: 0, mode: 'red', desc: '' },
      { from: 21151, to: 21450, bw: 2700, mode: 'blue', desc: '' }
    ]
  },
  {
    route: '12m',
    name: '12 m',
    from: 24890,
    to: 24990,
    units: 'KHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 24890, to: 24915, mode: 'cw', endText: -1 },
          { from: 24915, to: 24940, mode: 'digi' },
          { from: 24929, to: 24931, mode: 'block' },
          { from: 24940, to: 24990, mode: 'usb', startText: -1 }
        ]
      }
    ],
    iaru: [
      { from: 24890, to: 24915, bw: 200, mode: 'yellow', desc: '' },
      { from: 24915, to: 24925, bw: 500, mode: 'orange', desc: '' },
      { from: 24925, to: 24929, bw: 500, mode: 'orange', desc: '' },
      { from: 24929, to: 24931, bw: 0, mode: 'red', desc: '' },
      { from: 24931, to: 24940, bw: 2700, mode: 'blue', desc: '' },
      { from: 24940, to: 24990, bw: 2700, mode: 'blue', desc: '' }
    ]
  },
  {
    route: '10m',
    name: '10 m',
    from: 28,
    to: 29.7,
    units: 'MHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 28.000, to: 28.070, mode: 'cw', endText: 2 },
          { from: 28.070, to: 28.320, mode: 'digi' },
          { from: 28.190, to: 28.225, mode: 'block' },
          { from: 28.225, to: 29.100, mode: 'usb', startText: 1, endText: -1 },
          { from: 29.100, to: 29.700, mode: 'fm' },
          { from: 29.510, to: 29.520, mode: 'block' },
        ]
      }
    ],
    iaru: [
      { from: 28.000, to: 28.070, bw: 200, mode: 'yellow', desc: '' },
      { from: 28.070, to: 28.120, bw: 500, mode: 'orange', desc: '' },
      { from: 28.120, to: 28.150, bw: 500, mode: 'orange', desc: '' },
      { from: 28.150, to: 28.190, bw: 500, mode: 'orange', desc: '' },
      { from: 28.190, to: 29.199, bw: 0, mode: 'red', desc: '' },
      { from: 28.199, to: 28.201, bw: 0, mode: 'red', desc: '' },
      { from: 28.201, to: 28.225, bw: 0, mode: 'red', desc: '' },
      { from: 28.225, to: 28.300, bw: 2700, mode: 'blue', desc: '' },
      { from: 28.300, to: 28.320, bw: 2700, mode: 'blue', desc: '' },
      { from: 28.320, to: 29.000, bw: 2700, mode: 'blue', desc: '' },
      { from: 29.000, to: 29.100, bw: 6000, mode: 'green', desc: '' },
      { from: 29.100, to: 29.200, bw: 6000, mode: 'green', desc: '' },
      { from: 29.200, to: 29.300, bw: 6000, mode: 'green', desc: '' },
      { from: 29.300, to: 29.510, bw: 6000, mode: 'green', desc: '' },
      { from: 29.510, to: 29.520, bw: 0, mode: 'red', desc: '' },
      { from: 29.520, to: 29.590, bw: 6000, mode: 'green', desc: '' },
      { from: 29.590, to: 29.610, bw: 6000, mode: 'green', desc: '' },
      { from: 29.610, to: 29.620, bw: 6000, mode: 'green', desc: '' },
      { from: 29.620, to: 29.700, bw: 6000, mode: 'green', desc: '' }
    ]
  },
  {
    route: '6m',
    name: '6 m',
    from: 50,
    to: 52,
    units: 'MHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 50, to: 50.4, mode: 'cw', endText: 1 },
          { from: 50.1, to: 50.3, show: 'bottom', mode: 'usb', startText: 1, endText: 2 },
          { from: 51.210, to: 51.590, mode: 'fm', startText: -1, endText: -1 }
        ]
      }
    ],
    iaru: [
      { from: 50, to: 50.1, bw: 500, mode: 'yellow', desc: '' },
      { from: 50.1, to: 50.2, bw: 2700, mode: 'blue', desc: '' },
      { from: 50.2, to: 50.3, bw: 2700, mode: 'blue', desc: '' },
      { from: 50.3, to: 50.4, bw: 2700, mode: 'blue', desc: '' },
      { from: 50.4, to: 50.5, bw: 1000, mode: 'orange', desc: '' },
      { from: 50.5, to: 52.0, bw: 12000, mode: 'green', desc: '' }
    ]
  },
  {
    route: '4m',
    name: '4 m',
    from: 70,
    to: 70.5,
    units: 'MHz',
    privileges: [
      {
        name: 'A',
        classes: ['A'],
        slices: [
          { from: 70.000, to: 70.090, mode: 'cw', endText: -1 },
          { from: 70.100, to: 70.250, mode: 'cw', startText: 1, endText: -1 },
          { from: 70.100, to: 70.250, show: 'bottom', mode: 'usb', startText: 1, endText: -1 },
          { from: 70.294, to: 70.500, mode: 'fm', startText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 70.000, to: 70.090, bw: 500, mode: 'yellow', desc: '' },
      { from: 70.090, to: 70.100, bw: 500, mode: 'yellow', desc: '' },
      { from: 70.100, to: 70.250, bw: 2700, mode: 'blue', desc: '' },
      { from: 70.250, to: 70.249, bw: 12000, mode: 'green', desc: '' },
      { from: 70.249, to: 70.500, bw: 12000, mode: 'green', desc: '' }
    ]
  },
  {
    route: '2m',
    name: '2 m',
    from: 144,
    to: 146,
    units: 'MHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 144.025, to: 144.400, mode: 'cw', startText: 2, endText: 2 },
          { from: 144.150, to: 144.400, show: 'bottom', mode: 'usb', endText: 0, startText: 1 },
          { from: 145.206, to: 145.562, mode: 'fm', startText: 2, endText: 1 }
        ]
      },
      {
        name: 'C',
        classes: ['C'],
        slices: [
          { from: 145.206, to: 145.562, mode: 'fm', startText: 2, endText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 144, to: 144.025, bw: 2700, mode: 'blue', desc: '' },
      { from: 144.025, to: 144.100, bw: 500, mode: 'orange', desc: '' },
      { from: 144.100, to: 144.150, bw: 500, mode: 'orange', desc: '' },
      { from: 144.150, to: 144.400, bw: 2700, mode: 'blue', desc: '' },
      { from: 144.400, to: 144.490, bw: 500, mode: 'orange', desc: '' },
      { from: 144.491, to: 144.493, bw: 500, mode: 'orange', desc: '' },
      { from: 144.500, to: 144.794, bw: 20000, mode: 'purple', desc: '' },
      { from: 144.794, to: 144.9625, bw: 12000, mode: 'green', desc: '' },
      { from: 144.975, to: 145.194, bw: 12000, mode: 'green', desc: '' },
      { from: 145.194, to: 145.206, bw: 12000, mode: 'green', desc: '' },
      { from: 145.206, to: 145.5625, bw: 12000, mode: 'green', desc: '' },
      { from: 145.575, to: 145.7935, bw: 12000, mode: 'green', desc: '' },
      { from: 145.794, to: 145.806, bw: 12000, mode: 'green', desc: '' },
      { from: 145.806, to: 146, bw: 12000, mode: 'green', desc: '' }
    ]
  },
  {
    route: '70cm',
    name: '70 cm',
    from: 430,
    to: 440,
    units: 'MHz',
    privileges: [
      {
        name: 'A, B',
        classes: ['A', 'B'],
        slices: [
          { from: 432.000, to: 432.400, mode: 'cw', startText: -1, endText: 0 },
          { from: 432.100, to: 432.400, mode: 'usb', show: 'bottom', startText: -2, endText: 1 },
          { from: 434.594, to: 434.981, mode: 'fm', startText: 2, endText: 1 }
        ]
      },
      {
        name: 'C',
        classes: ['C'],
        slices: [
          { from: 434.594, to: 434.981, mode: 'fm', startText: -1, endText: 1 }
        ]
      }
    ],
    iaru: [
      { from: 430, to: 431.975, bw: 20000, mode: 'purple', desc: '' },
      { from: 431.975, to: 432.100, bw: 500, mode: 'orange', desc: '' },
      { from: 432.100, to: 432.400, bw: 2700, mode: 'blue', desc: '' },
      { from: 432.400, to: 432.490, bw: 500, mode: 'orange', desc: '' },
      { from: 432.491, to: 432.493, bw: 500, mode: 'orange', desc: '' },
      { from: 432.500, to: 432.975, bw: 12000, mode: 'green', desc: '' },
      { from: 433.000, to: 433.375, bw: 12000, mode: 'green', desc: '' },
      { from: 433.400, to: 433.575, bw: 12000, mode: 'green', desc: '' },
      { from: 433.600, to: 434.000, bw: 20000, mode: 'purple', desc: '' },
      { from: 434.000, to: 434.594, bw: 12000, mode: 'green', desc: '' },
      { from: 434.594, to: 434.981, bw: 12000, mode: 'green', desc: '' },
      { from: 435.000, to: 438.000, bw: 20000, mode: 'purple', desc: '' },
      { from: 438.000, to: 440.000, bw: 20000, mode: 'purple', desc: '' }
    ]
  }
]

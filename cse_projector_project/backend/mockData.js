// Mock data for demo without MongoDB
export const mockUsers = [
  {
    _id: '1',
    name: 'Dr. Satya Nikhil',
    email: 'nikhil@cse.edu',
    password: 'password123', // In real app, this would be hashed
    role: 'admin',
    designation: 'Professor & Developer',
    department: 'Computer Science and Engineering'
  },
  {
    _id: '2',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@cse.edu',
    password: 'password123',
    role: 'faculty',
    designation: 'Associate Professor',
    department: 'Computer Science and Engineering'
  },
  {
    _id: '3',
    name: 'Dr. Priya Sharma',
    email: 'priya@cse.edu',
    password: 'password123',
    role: 'faculty',
    designation: 'Assistant Professor',
    department: 'Computer Science and Engineering'
  }
];

export const mockProjectors = [
  {
    _id: 'p1',
    name: 'Epson EB-X05',
    brand: 'Epson',
    model: 'EB-X05',
    serialNumber: 'EPS-001-2024',
    status: 'available',
    location: 'CSE Department Store',
    specifications: {
      resolution: '1024 x 768 (XGA)',
      brightness: '3300 lumens',
      connectivity: ['HDMI', 'VGA', 'USB']
    },
    isActive: true,
    lastUsedBy: null,
    currentUser: null
  },
  {
    _id: 'p2',
    name: 'BenQ MH535A',
    brand: 'BenQ',
    model: 'MH535A',
    serialNumber: 'BNQ-002-2024',
    status: 'available',
    location: 'CSE Department Store',
    specifications: {
      resolution: '1920 x 1080 (Full HD)',
      brightness: '3600 lumens',
      connectivity: ['HDMI', 'VGA', 'USB', 'Wireless']
    },
    isActive: true,
    lastUsedBy: {
      _id: '3',
      name: 'Dr. Priya Sharma',
      email: 'priya@cse.edu',
      designation: 'Assistant Professor'
    },
    lastUsedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    currentUser: null
  },
  {
    _id: 'p3',
    name: 'Sony VPL-DX221',
    brand: 'Sony',
    model: 'VPL-DX221',
    serialNumber: 'SNY-003-2024',
    status: 'checked-out',
    location: 'Room 301',
    specifications: {
      resolution: '1024 x 768 (XGA)',
      brightness: '2800 lumens',
      connectivity: ['HDMI', 'VGA']
    },
    isActive: true,
    currentUser: {
      _id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@cse.edu',
      designation: 'Associate Professor'
    },
    checkedOutAt: new Date(),
    lastUsedBy: null
  },
  {
    _id: 'p4',
    name: 'ViewSonic PA503S',
    brand: 'ViewSonic',
    model: 'PA503S',
    serialNumber: 'VWS-004-2024',
    status: 'booked',
    location: 'CSE Department Store',
    specifications: {
      resolution: '800 x 600 (SVGA)',
      brightness: '3600 lumens',
      connectivity: ['HDMI', 'VGA', 'USB']
    },
    isActive: true,
    lastUsedBy: null,
    currentUser: null
  }
];

export const mockActivities = [
  {
    _id: 'a1',
    user: {
      _id: '1',
      name: 'Dr. Satya Nikhil',
      email: 'nikhil@cse.edu',
      designation: 'Professor & Developer'
    },
    projector: {
      _id: 'p1',
      name: 'Epson EB-X05',
      brand: 'Epson'
    },
    action: 'created',
    notes: 'Added Epson EB-X05 to inventory',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    _id: 'a2',
    user: {
      _id: '3',
      name: 'Dr. Priya Sharma',
      email: 'priya@cse.edu',
      designation: 'Assistant Professor'
    },
    projector: {
      _id: 'p2',
      name: 'BenQ MH535A',
      brand: 'BenQ'
    },
    action: 'check-out',
    notes: 'Checked out for Data Structures lecture',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    _id: 'a3',
    user: {
      _id: '3',
      name: 'Dr. Priya Sharma',
      email: 'priya@cse.edu',
      designation: 'Assistant Professor'
    },
    projector: {
      _id: 'p2',
      name: 'BenQ MH535A',
      brand: 'BenQ'
    },
    action: 'check-in',
    notes: 'Returned after lecture',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    _id: 'a4',
    user: {
      _id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@cse.edu',
      designation: 'Associate Professor'
    },
    projector: {
      _id: 'p3',
      name: 'Sony VPL-DX221',
      brand: 'Sony'
    },
    action: 'check-out',
    notes: 'Checked out for Database Management Systems lab',
    createdAt: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    _id: 'a5',
    user: {
      _id: '1',
      name: 'Dr. Satya Nikhil',
      email: 'nikhil@cse.edu',
      designation: 'Professor & Developer'
    },
    projector: {
      _id: 'p4',
      name: 'ViewSonic PA503S',
      brand: 'ViewSonic'
    },
    action: 'booked',
    notes: 'Booked for tomorrow morning lecture',
    createdAt: new Date(Date.now() - 15 * 60 * 1000)
  }
];

export const mockBookings = [];

export const mockStats = {
  total: 5,
  byAction: [
    { _id: 'check-out', count: 2 },
    { _id: 'check-in', count: 1 },
    { _id: 'booked', count: 1 },
    { _id: 'created', count: 1 }
  ],
  last7Days: []
};

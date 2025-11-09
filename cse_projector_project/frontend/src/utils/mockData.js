// Mock data for demo mode
// College: SRINIVASA INSTITUTE OF ENGINEERING AND TECHNOLOGY

export const mockUsers = [
  {
    id: '1',
    _id: '1',
    name: 'Dr. Satya Nikhil',
    email: 'nikhil@cse.edu',
    role: 'admin',
    designation: 'Professor & Developer',
    department: 'Computer Science and Engineering'
  },
  {
    id: '2',
    _id: '2',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@cse.edu',
    role: 'faculty',
    designation: 'Associate Professor',
    department: 'Computer Science and Engineering'
  }
];

// Projectors for CSE Department
export const mockProjectors = [
  {
    _id: '1',
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
    currentUser: null,
    lastUsedBy: null,
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-11-07T08:00:00.000Z',
    history: [
      {
        action: 'created',
        user: 'nikhil@cse.edu',
        timestamp: '2024-01-15T10:00:00.000Z',
        notes: 'Projector added to inventory',
        status: 'available'
      }
    ]
  },
  {
    _id: '2',
    name: 'WZATCO Projector',
    brand: 'WZATCO',
    model: 'CT58',
    serialNumber: 'WZA-002-2024',
    status: 'available',
    location: 'CSE Department Store',
    specifications: {
      resolution: '1920 x 1080 (Full HD)',
      brightness: '9000 lumens',
      connectivity: ['HDMI', 'USB', 'WiFi', 'Bluetooth']
    },
    currentUser: null,
    lastUsedBy: null,
    isActive: true,
    createdAt: '2024-02-20T10:00:00.000Z',
    updatedAt: '2024-11-07T08:00:00.000Z',
    history: [
      {
        action: 'created',
        user: 'nikhil@cse.edu',
        timestamp: '2024-02-20T10:00:00.000Z',
        notes: 'Projector added to inventory',
        status: 'available'
      }
    ]
  }
];

export const mockActivities = [
  {
    _id: '1',
    user: {
      _id: '1',
      name: 'Dr. Satya Nikhil',
      email: 'nikhil@cse.edu',
      designation: 'Professor & Developer'
    },
    projector: {
      _id: '1',
      name: 'Epson EB-X05',
      brand: 'Epson'
    },
    action: 'check-out',
    status: 'in-use',
    notes: 'In use for Advanced Java Programming lecture',
    createdAt: '2024-11-07T07:30:00.000Z'
  },
  {
    _id: '2',
    user: {
      _id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@cse.edu',
      designation: 'Associate Professor'
    },
    projector: {
      _id: '2',
      name: 'WZATCO Projector',
      brand: 'WZATCO'
    },
    action: 'check-in',
    status: 'available',
    notes: 'Returned after Data Structures lab session',
    createdAt: '2024-11-07T06:00:00.000Z'
  },
  {
    _id: '5',
    user: {
      _id: '1',
      name: 'Dr. Satya Nikhil',
      email: 'nikhil@cse.edu',
      designation: 'Professor & Developer'
    },
    projector: {
      _id: '1',
      name: 'Epson EB-X05',
      brand: 'Epson'
    },
    action: 'created',
    status: 'available',
    notes: 'Added Epson EB-X05 to CSE Department inventory',
    createdAt: '2024-11-05T10:00:00.000Z'
  },
  {
    _id: '6',
    user: {
      _id: '1',
      name: 'Dr. Satya Nikhil',
      email: 'nikhil@cse.edu',
      designation: 'Professor & Developer'
    },
    projector: {
      _id: '2',
      name: 'WZATCO Projector',
      brand: 'WZATCO'
    },
    action: 'created',
    status: 'available',
    notes: 'Added WZATCO Projector to CSE Department inventory',
    createdAt: '2024-11-06T10:00:00.000Z'
  }
];

export const mockBookings = [
  {
    _id: '1',
    projector: {
      _id: '1',
      name: 'Epson EB-X05',
      brand: 'Epson',
      model: 'EB-X05'
    },
    user: {
      _id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@cse.edu',
      designation: 'Associate Professor'
    },
    startTime: '2024-11-08T09:00:00.000Z',
    endTime: '2024-11-08T11:00:00.000Z',
    purpose: 'Machine Learning Lecture',
    notes: 'Need for presentation',
    status: 'pending',
    createdAt: '2024-11-07T08:00:00.000Z'
  }
];

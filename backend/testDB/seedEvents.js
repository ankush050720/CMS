const dotenv = require('dotenv');
const connectDB = require('../config/dbConfig');
const Event = require('../models/Event');

dotenv.config();

connectDB();

const sampleEvents = [
  {
    name: 'Coding Hackathon',
    description: 'A 48-hour coding challenge for developers.',
    date: new Date('2024-09-30'),
    time: '10:00 AM',
    venue: 'Main Auditorium',
    fee: 100,
    logo: 'https://via.placeholder.com/150',
    members: '1-2', // Range of participants
    club: 'Coding Club',
  },
  {
    name: 'Coding Hackathon',
    description: 'A 48-hour coding challenge for developers.',
    date: new Date('2024-09-30'),
    time: '10:00 AM',
    venue: 'Main Auditorium',
    fee: 100,
    logo: 'https://via.placeholder.com/150',
    members: '1-2', // Range of participants
    club: 'Coding Club',
  },
  {
    name: 'Coding Hackathon',
    description: 'A 48-hour coding challenge for developers.',
    date: new Date('2024-09-30'),
    time: '10:00 AM',
    venue: 'Main Auditorium',
    fee: 100,
    logo: 'https://via.placeholder.com/150',
    members: '1-2', // Range of participants
    club: 'Coding Club',
  },
  {
    name: 'Coding Hackathon',
    description: 'A 48-hour coding challenge for developers.',
    date: new Date('2024-09-30'),
    time: '10:00 AM',
    venue: 'Main Auditorium',
    fee: 100,
    logo: 'https://via.placeholder.com/150',
    members: '1-2', // Range of participants
    club: 'Coding Club',
  },
  {
    name: 'Coding Hackathon',
    description: 'A 48-hour coding challenge for developers.',
    date: new Date('2024-09-30'),
    time: '10:00 AM',
    venue: 'Main Auditorium',
    fee: 100,
    logo: 'https://via.placeholder.com/150',
    members: '1-2', // Range of participants
    club: 'Coding Club',
  },
  {
    name: 'Robotics Workshop',
    description: 'Learn how to build robots from scratch.',
    date: new Date('2024-10-05'),
    time: '2:00 PM',
    venue: 'Engineering Lab',
    fee: 50,
    logo: 'https://via.placeholder.com/150',
    members: '3', // Fixed number of participants
    club: 'Robotics Club',
  }
];

const seedEvents = async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(sampleEvents);
    console.log('Sample events inserted successfully');
    
    process.exit();
  } catch (error) {
    console.error('Error inserting sample events:', error);
    process.exit(1);
  }
};

seedEvents();

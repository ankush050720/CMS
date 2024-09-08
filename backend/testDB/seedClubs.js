const dotenv = require('dotenv');
const Club = require('../models/Club');
const connectDB = require('../config/dbConfig');

dotenv.config();

connectDB();

// Sample club data
const clubs = [
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
  {
    name: 'Coding Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Coding Club is all about learning programming and building software projects.',
    description: 'The Coding Club focuses on enhancing coding skills, organizing hackathons, and creating a community of developers.',
    executiveCommittee: {
      chairperson: 'John Doe',
      viceChair: 'Jane Smith',
      secretary: 'Alice Johnson',
      treasurer: 'Robert Brown',
      marketingPrSecretary: 'David Wilson',
    },
    operationalCommittee: {
      webMaster: 'Eliza Taylor',
      membershipChair: 'Michael Davis',
      managementHead: 'Chris Martin',
      contentCreativeHead: 'Anna Green',
      digitalSocialMediaHead: 'Emma White',
    },
  },
  {
    name: 'Sankhya Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Sankhya Club promotes the study of mathematics and problem-solving.',
    description: 'Sankhya Club focuses on mathematical concepts, competitions, and hosting seminars on advanced mathematics.',
    executiveCommittee: {
      chairperson: 'Sarah Lewis',
      viceChair: 'Tom Anderson',
      secretary: 'Sophia Clark',
      treasurer: 'James Young',
      marketingPrSecretary: 'Olivia Hall',
    },
    operationalCommittee: {
      webMaster: 'Ella King',
      membershipChair: 'Daniel Scott',
    },
  },
  {
    name: 'Cybersecurity Club',
    logo: 'https://via.placeholder.com/150',
    about: 'The Cybersecurity Club is dedicated to learning and practicing ethical hacking.',
    description: 'This club trains students in network security, cryptography, and teaches how to prevent cyber threats.',
    executiveCommittee: {
      chairperson: 'Charlie Adams',
      viceChair: 'Lucy Parker',
      secretary: 'Henry Torres',
      treasurer: 'Amelia Foster',
      marketingPrSecretary: 'Liam Evans',
    },
    operationalCommittee: {
      webMaster: 'Noah Hughes',
      managementHead: 'Benjamin Green',
    },
  },
];

// Function to insert sample clubs
const seedClubs = async () => {
  try {
    await Club.deleteMany(); // Clear any existing data
    await Club.insertMany(clubs);
    console.log('Sample clubs inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error inserting sample clubs:', error);
    process.exit(1);
  }
};

seedClubs();
// Seed script: populate Inventory, CustomerDemand, Alerts, and a demo RakePlan
require('dotenv').config();
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');
const CustomerDemand = require('../models/CustomerDemand');
const Alert = require('../models/Alert');
const RakePlan = require('../models/RakePlan');

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/steel';
  console.log('Connecting to', uri);
  await mongoose.connect(uri);
  console.log('Connected. Seeding data...');

  const invSeed = [
    { plant: 'Bokaro', steelStock: 5200 },
    { plant: 'Durgapur', steelStock: 3400 },
    { plant: 'Rourkela', steelStock: 6100 },
  ];
  const demSeed = [
    { customer: 'SAIL - Jamshedpur', date: new Date(), tonnage: 900, destination: 'Jamshedpur' },
    { customer: 'JSW - Bellary', date: new Date(Date.now() + 86400000), tonnage: 700, destination: 'Bellary' },
    { customer: 'Tata - Mumbai', date: new Date(Date.now() + 2*86400000), tonnage: 650, destination: 'Mumbai' },
  ];
  const alertSeed = [
    { type: 'Congestion', message: 'Congested route: Bokaro → Bellary', coords: { lat: 18.0, lng: 80.0 } },
    { type: 'Repair', message: 'Track repairs near Durgapur', coords: { lat: 23.52, lng: 87.321 } },
    { type: 'Delay', message: 'Delay warning for Rake 2', coords: { lat: 22.8, lng: 85.8 } },
  ];

  const invCount = await Inventory.countDocuments();
  if (invCount === 0) {
    await Inventory.insertMany(invSeed);
    console.log('Seeded Inventory:', invSeed.length);
  } else {
    console.log('Inventory already has data, skipping');
  }

  const demCount = await CustomerDemand.countDocuments();
  if (demCount === 0) {
    await CustomerDemand.insertMany(demSeed);
    console.log('Seeded CustomerDemand:', demSeed.length);
  } else {
    console.log('CustomerDemand already has data, skipping');
  }

  const alertCount = await Alert.countDocuments();
  if (alertCount === 0) {
    await Alert.insertMany(alertSeed);
    console.log('Seeded Alerts:', alertSeed.length);
  } else {
    console.log('Alerts already have data, skipping');
  }

  const planCount = await RakePlan.countDocuments();
  if (planCount === 0) {
    await RakePlan.create({
      wagons: ['Open-1', 'Open-2', 'Flat-3'],
      cargo: 'Steel Coils',
      destination: 'Jamshedpur',
      destinationCoords: { lat: 22.8046, lng: 86.2029 },
      origin: { name: 'Bokaro Plant', lat: 23.669, lng: 86.148 },
    });
    console.log('Seeded a demo RakePlan');
  } else {
    console.log('RakePlans already present, skipping');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

// Demand controller with Mongo-backed storage
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');
const CustomerDemand = require('../models/CustomerDemand');

const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

exports.getInventory = async (req, res) => {
  try {
    if (!isDbConnected()) return res.json([]);
    const inventory = await Inventory.find({}).sort({ updatedAt: -1 }).lean();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.getCustomerDemand = async (req, res) => {
  try {
    if (!isDbConnected()) return res.json([]);
    const demand = await CustomerDemand.find({}).sort({ date: -1 }).lean();
    res.json(demand);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer demand' });
  }
};

exports.createInventory = async (req, res) => {
  try {
    if (!isDbConnected()) return res.status(503).json({ error: 'DB not connected' });
    const { plant, steelStock } = req.body || {};
    if (!plant || typeof steelStock !== 'number') return res.status(400).json({ error: 'plant and steelStock required' });
    const doc = await Inventory.create({ plant, steelStock });
    res.status(201).json({ id: doc._id.toString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create inventory' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    if (!isDbConnected()) return res.status(503).json({ error: 'DB not connected' });
    const { id } = req.params;
    const { plant, steelStock } = req.body || {};
    const doc = await Inventory.findByIdAndUpdate(id, { plant, steelStock, updatedAt: new Date() }, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};

exports.createCustomerDemand = async (req, res) => {
  try {
    if (!isDbConnected()) return res.status(503).json({ error: 'DB not connected' });
    const { customer, date, tonnage, destination } = req.body || {};
    if (!customer || !date || typeof tonnage !== 'number' || !destination) return res.status(400).json({ error: 'customer, date, tonnage, destination required' });
    const doc = await CustomerDemand.create({ customer, date, tonnage, destination });
    res.status(201).json({ id: doc._id.toString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create customer demand' });
  }
};

exports.updateCustomerDemand = async (req, res) => {
  try {
    if (!isDbConnected()) return res.status(503).json({ error: 'DB not connected' });
    const { id } = req.params;
    const { customer, date, tonnage, destination } = req.body || {};
    const doc = await CustomerDemand.findByIdAndUpdate(id, { customer, date, tonnage, destination }, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update customer demand' });
  }
};

const mongoose = require('mongoose');
const { User, Product, Campaign, Order, Payout, Analytics } = require('./models');

mongoose.connect('mongodb://localhost:27017/glasscart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  try {
    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Campaign.deleteMany({}),
      Order.deleteMany({}),
      Payout.deleteMany({}),
      Analytics.deleteMany({})
    ]);

    // Create users
    const distributor = new User({
      name: 'Kathmandu',
      email: 'distributor@kathmandu.co.nz',
      role: 'distributor'
    });

    const advertiser = new User({
      name: 'Go Media',
      email: 'ads@gomedia.nz',
      role: 'advertiser'
    });

    const customer = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'customer'
    });

    await distributor.save();
    await advertiser.save();
    await customer.save();

    // Create products
    const products = await Product.insertMany([
      {
        distributor_id: distributor._id,
        name: 'GlassCart QR T-Shirt',
        price: 39.99,
        description: 'Premium cotton t-shirt with GlassCart QR code.',
        image_url: 'https://via.placeholder.com/120x120?text=QR+Tee',
        stock_quantity: 50
      },
      {
        distributor_id: distributor._id,
        name: 'GlassCart Water Bottle',
        price: 24.99,
        description: 'Stainless steel bottle with GlassCart branding.',
        image_url: 'https://via.placeholder.com/120x120?text=Bottle',
        stock_quantity: 100
      },
      {
        distributor_id: distributor._id,
        name: 'GlassCart Tote Bag',
        price: 14.99,
        description: 'Eco-friendly tote bag for everyday use.',
        image_url: 'https://via.placeholder.com/120x120?text=Tote+Bag',
        stock_quantity: 75
      }
    ]);

    // Create campaign
    const campaign = new Campaign({
      advertiser_id: advertiser._id,
      product_id: products[0]._id,
      campaign_name: 'Winter QR Campaign',
      start_date: new Date(),
      end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      qr_code_identifier: 'winter_qr_2025',
      commission_percent: 10,
      location: 'Wellington Bus Stop'
    });

    await campaign.save();

    // Create order
    const order = new Order({
      customer_id: customer._id,
      product_id: products[0]._id,
      campaign_id: campaign._id,
      quantity: 2,
      total_amount: 79.98,
      commission_amount: 7.99,
      shipping_address: '123 Queen Street, Auckland'
    });

    await order.save();

    // Create payouts
    await Payout.insertMany([
      {
        recipient_id: advertiser._id,
        order_id: order._id,
        amount: 7.99,
        type: 'advertiser_commission'
      },
      {
        recipient_id: distributor._id,
        order_id: order._id,
        amount: 71.99,
        type: 'distributor_revenue'
      }
    ]);

    // Create analytics logs
    await Analytics.insertMany([
      {
        adLocation: 'Wellington Bus Stop',
        format: 'Static QR',
        clicks: 120,
        conversions: 5
      },
      {
        adLocation: 'Auckland CBD Window',
        format: 'Static QR',
        clicks: 89,
        conversions: 2
      }
    ]);

    console.log('✅ Seed data inserted successfully!');
  } catch (err) {
    console.error('❌ Error inserting seed data:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();

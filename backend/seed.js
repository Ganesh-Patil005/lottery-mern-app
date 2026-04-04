import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import Charity from './models/Charity.js'

dotenv.config()

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    await User.deleteMany({})
    await Charity.deleteMany({})
    console.log('🗑️  Cleared existing data')

    const charities = await Charity.insertMany([
      { name: 'Red Cross', description: 'Providing emergency assistance and disaster relief worldwide.' },
      { name: 'WWF', description: 'Working to protect wildlife and the natural environment.' },
      { name: 'UNICEF', description: 'Helping children survive and thrive around the world.' },
      { name: 'Doctors Without Borders', description: 'Delivering medical care in crisis zones globally.' },
    ])
    console.log('✅ Charities created')

    // Use .save() so the pre('save') hook runs and hashes password
    const admin = new User({
      name: 'Admin',
      email: 'admin@golfcharity.com',
      password: 'admin123',
      role: 'admin',
      charity: charities[0]._id,
      subscription: {
        plan: 'yearly',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        amount: 99,
      },
    })
    await admin.save()
    console.log('✅ Admin user created')
    console.log('📧 Email: admin@golfcharity.com')
    console.log('🔑 Password: admin123')

    const testUser = new User({
      name: 'John Doe',
      email: 'user@golfcharity.com',
      password: 'user123',
      role: 'user',
      charity: charities[1]._id,
      subscription: {
        plan: 'monthly',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        amount: 9.99,
      },
      charityContribution: 0.999,
    })
    await testUser.save()
    console.log('✅ Test user created')
    console.log('📧 Email: user@golfcharity.com')
    console.log('🔑 Password: user123')

    console.log('\n🎉 Seed complete! You can now run the server.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error.message)
    process.exit(1)
  }
}

seed()
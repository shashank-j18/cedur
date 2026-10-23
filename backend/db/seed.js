import dotenv from 'dotenv';
dotenv.config();

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';
import { sampleCompany, sampleAdminUser, sampleEmployees, sampleBlogPosts } from './seedData.js';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Error: DATABASE_URL not found in .env');
    process.exit(1);
  }

  console.log('Connecting to Neon PostgreSQL at:', databaseUrl.replace(/:[^:@]*@/, ':****@'));
  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  try {
    console.log('1. Seeding company...');
    const [company] = await db.insert(schema.companies).values({
      name: sampleCompany.name,
      employeeCountRange: sampleCompany.employeeCountRange,
      phone: sampleCompany.phone,
      gstin: sampleCompany.gstin,
      pan: sampleCompany.pan,
    }).returning();
    console.log('Company created with ID:', company.id);

    console.log('2. Seeding admin user (email: admin@cedur.com, pass: Password123!)...');
    const [admin] = await db.insert(schema.users).values({
      companyId: company.id,
      email: sampleAdminUser.email,
      passwordHash: sampleAdminUser.passwordHash,
      fullName: sampleAdminUser.fullName,
      role: 'admin',
      isVerified: true,
    }).returning();
    console.log('Admin user created with ID:', admin.id);

    console.log('3. Seeding 5 sample employees...');
    for (const emp of sampleEmployees) {
      await db.insert(schema.employees).values({
        companyId: company.id,
        userId: emp.id === 1 ? admin.id : null,
        employeeCode: emp.employeeCode,
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        phone: emp.phone,
        department: emp.department,
        designation: emp.designation,
        dateOfJoining: emp.dateOfJoining,
        monthlySalary: emp.monthlySalary,
        status: emp.status,
        todayAttendance: emp.todayAttendance,
      });
    }
    console.log('Sample employees inserted.');

    console.log('4. Seeding 3 Indian HR/Payroll compliance blog posts...');
    for (const post of sampleBlogPosts) {
      await db.insert(schema.blogPosts).values({
        title: post.title,
        slug: post.slug,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        summary: post.summary,
        content: post.content,
      });
    }
    console.log('Sample blog posts inserted.');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();

import { pgTable, serial, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  employeeCountRange: varchar('employee_count_range', { length: 50 }).default('1-25'),
  phone: varchar('phone', { length: 50 }),
  gstin: varchar('gstin', { length: 20 }),
  pan: varchar('pan', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id').references(() => companies.id),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('admin').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id').references(() => companies.id),
  userId: integer('user_id').references(() => users.id),
  employeeCode: varchar('employee_code', { length: 50 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  department: varchar('department', { length: 100 }).default('Engineering'),
  designation: varchar('designation', { length: 100 }).default('Software Engineer'),
  dateOfJoining: varchar('date_of_joining', { length: 50 }),
  monthlySalary: integer('monthly_salary').default(50000), // in INR
  status: varchar('status', { length: 50 }).default('active'),
  todayAttendance: varchar('today_attendance', { length: 50 }).default('present'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  employeeCount: varchar('employee_count', { length: 50 }).notNull(),
  message: text('message'),
  source: varchar('source', { length: 100 }).default('website_contact'),
  status: varchar('status', { length: 50 }).default('new'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).default('Payroll Compliance'),
  author: varchar('author', { length: 100 }).default('YourBrand Editorial Team'),
  readTime: varchar('read_time', { length: 50 }).default('5 min read'),
  publishedAt: timestamp('published_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  used: boolean('used').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

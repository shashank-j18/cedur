import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc } from 'drizzle-orm';
import * as schema from './schema.js';
import { sampleCompany, sampleAdminUser, sampleEmployees, sampleBlogPosts } from './seedData.js';

let db = null;
let isNeonConnected = false;

// Initialize in-memory fallback store
const inMemoryStore = {
  companies: [ { ...sampleCompany } ],
  users: [ { ...sampleAdminUser } ],
  employees: [ ...sampleEmployees.map(e => ({ ...e })) ],
  sessions: [],
  leads: [],
  newsletterSubscribers: [],
  blogPosts: [ ...sampleBlogPosts.map(b => ({ ...b })) ],
  passwordResetTokens: [],
  nextId: {
    companies: 2,
    users: 2,
    employees: 6,
    sessions: 1,
    leads: 1,
    newsletterSubscribers: 1,
    blogPosts: 4,
    passwordResetTokens: 1,
  }
};

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl && databaseUrl.startsWith('postgres')) {
  try {
    const sql = neon(databaseUrl);
    db = drizzle(sql, { schema });
    isNeonConnected = true;
    console.log('[Database] Neon Serverless Postgres client initialized successfully.');
  } catch (err) {
    console.warn('[Database] Neon initialization notice:', err.message);
    console.warn('[Database] Falling back to in-memory store for seamless offline/preview operation.');
  }
} else {
  console.log('[Database] Notice: DATABASE_URL not set or not a postgres connection string in backend/.env.');
  console.log('[Database] Running with resilient local in-memory store. Set your Neon DATABASE_URL to persist to Neon PostgreSQL.');
}

export const getDbStatus = () => ({
  type: isNeonConnected ? 'neon-serverless-postgres' : 'in-memory-fallback',
  connected: isNeonConnected,
});

// Resilient Repository Helpers that work with both Neon PostgreSQL and in-memory store

export const repo = {
  async getUserByEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();
    if (isNeonConnected && db) {
      try {
        const rows = await db.select().from(schema.users).where(eq(schema.users.email, normalizedEmail)).limit(1);
        return rows[0] || null;
      } catch (err) {
        console.error('[DB Error] getUserByEmail:', err.message);
      }
    }
    return inMemoryStore.users.find(u => u.email.toLowerCase() === normalizedEmail) || null;
  },

  async getUserById(id) {
    if (isNeonConnected && db) {
      try {
        const rows = await db.select().from(schema.users).where(eq(schema.users.id, Number(id))).limit(1);
        return rows[0] || null;
      } catch (err) {
        console.error('[DB Error] getUserById:', err.message);
      }
    }
    return inMemoryStore.users.find(u => u.id === Number(id)) || null;
  },

  async createCompany({ name, employeeCountRange, phone }) {
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.companies).values({
          name,
          employeeCountRange: employeeCountRange || '1-25',
          phone: phone || '',
        }).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createCompany:', err.message);
      }
    }
    const newCompany = {
      id: inMemoryStore.nextId.companies++,
      name,
      employeeCountRange: employeeCountRange || '1-25',
      phone: phone || '',
      gstin: '',
      pan: '',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.companies.push(newCompany);
    return newCompany;
  },

  async createUser({ companyId, email, passwordHash, fullName, role = 'admin' }) {
    const normalizedEmail = email.trim().toLowerCase();
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.users).values({
          companyId,
          email: normalizedEmail,
          passwordHash,
          fullName,
          role,
          isVerified: true,
        }).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createUser:', err.message);
      }
    }
    const newUser = {
      id: inMemoryStore.nextId.users++,
      companyId,
      email: normalizedEmail,
      passwordHash,
      fullName,
      role,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryStore.users.push(newUser);
    return newUser;
  },

  async createSession({ userId, token, expiresAt }) {
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.sessions).values({
          userId,
          token,
          expiresAt,
        }).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createSession:', err.message);
      }
    }
    const newSession = {
      id: inMemoryStore.nextId.sessions++,
      userId,
      token,
      expiresAt: new Date(expiresAt).toISOString(),
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.sessions.push(newSession);
    return newSession;
  },

  async getSession(token) {
    if (isNeonConnected && db) {
      try {
        const rows = await db.select().from(schema.sessions).where(eq(schema.sessions.token, token)).limit(1);
        if (rows[0]) {
          const session = rows[0];
          if (new Date(session.expiresAt) > new Date()) {
            return session;
          }
        }
        return null;
      } catch (err) {
        console.error('[DB Error] getSession:', err.message);
      }
    }
    const session = inMemoryStore.sessions.find(s => s.token === token);
    if (session && new Date(session.expiresAt) > new Date()) {
      return session;
    }
    return null;
  },

  async deleteSession(token) {
    if (isNeonConnected && db) {
      try {
        await db.delete(schema.sessions).where(eq(schema.sessions.token, token));
        return true;
      } catch (err) {
        console.error('[DB Error] deleteSession:', err.message);
      }
    }
    const index = inMemoryStore.sessions.findIndex(s => s.token === token);
    if (index !== -1) {
      inMemoryStore.sessions.splice(index, 1);
    }
    return true;
  },

  async createPasswordResetToken({ userId, token, expiresAt }) {
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.passwordResetTokens).values({
          userId,
          token,
          expiresAt,
          used: false,
        }).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createPasswordResetToken:', err.message);
      }
    }
    const record = {
      id: inMemoryStore.nextId.passwordResetTokens++,
      userId,
      token,
      expiresAt: new Date(expiresAt).toISOString(),
      used: false,
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.passwordResetTokens.push(record);
    return record;
  },

  async getValidPasswordResetToken(token) {
    if (isNeonConnected && db) {
      try {
        const rows = await db.select().from(schema.passwordResetTokens).where(eq(schema.passwordResetTokens.token, token)).limit(1);
        const record = rows[0];
        if (record && !record.used && new Date(record.expiresAt) > new Date()) {
          return record;
        }
        return null;
      } catch (err) {
        console.error('[DB Error] getValidPasswordResetToken:', err.message);
      }
    }
    const record = inMemoryStore.passwordResetTokens.find(r => r.token === token && !r.used);
    if (record && new Date(record.expiresAt) > new Date()) {
      return record;
    }
    return null;
  },

  async markPasswordResetTokenUsed(token) {
    if (isNeonConnected && db) {
      try {
        await db.update(schema.passwordResetTokens).set({ used: true }).where(eq(schema.passwordResetTokens.token, token));
        return true;
      } catch (err) {
        console.error('[DB Error] markPasswordResetTokenUsed:', err.message);
      }
    }
    const record = inMemoryStore.passwordResetTokens.find(r => r.token === token);
    if (record) record.used = true;
    return true;
  },

  async updateUserPassword(userId, passwordHash) {
    if (isNeonConnected && db) {
      try {
        await db.update(schema.users).set({ passwordHash, updatedAt: new Date() }).where(eq(schema.users.id, Number(userId)));
        return true;
      } catch (err) {
        console.error('[DB Error] updateUserPassword:', err.message);
      }
    }
    const user = inMemoryStore.users.find(u => u.id === Number(userId));
    if (user) {
      user.passwordHash = passwordHash;
      user.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  },

  async createLead({ name, email, phone, companyName, employeeCount, message, source = 'website_contact' }) {
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.leads).values({
          name,
          email,
          phone,
          companyName,
          employeeCount,
          message: message || '',
          source,
          status: 'new',
        }).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createLead:', err.message);
      }
    }
    const newLead = {
      id: inMemoryStore.nextId.leads++,
      name,
      email,
      phone,
      companyName,
      employeeCount,
      message: message || '',
      source,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.leads.push(newLead);
    return newLead;
  },

  async createNewsletterSubscriber(email) {
    const normalizedEmail = email.trim().toLowerCase();
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.newsletterSubscribers).values({
          email: normalizedEmail,
          status: 'active',
        }).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createNewsletterSubscriber:', err.message);
      }
    }
    const existing = inMemoryStore.newsletterSubscribers.find(s => s.email.toLowerCase() === normalizedEmail);
    if (existing) return existing;
    const newSub = {
      id: inMemoryStore.nextId.newsletterSubscribers++,
      email: normalizedEmail,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.newsletterSubscribers.push(newSub);
    return newSub;
  },

  async listBlogPosts() {
    if (isNeonConnected && db) {
      try {
        const posts = await db.select().from(schema.blogPosts).orderBy(desc(schema.blogPosts.publishedAt));
        if (posts && posts.length > 0) return posts;
      } catch (err) {
        console.error('[DB Error] listBlogPosts:', err.message);
      }
    }
    return inMemoryStore.blogPosts;
  },

  async getBlogPostBySlug(slug) {
    if (isNeonConnected && db) {
      try {
        const rows = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.slug, slug)).limit(1);
        if (rows[0]) return rows[0];
      } catch (err) {
        console.error('[DB Error] getBlogPostBySlug:', err.message);
      }
    }
    return inMemoryStore.blogPosts.find(b => b.slug === slug) || null;
  },

  async listEmployees(companyId = 1) {
    if (isNeonConnected && db) {
      try {
        const rows = await db.select().from(schema.employees).where(eq(schema.employees.companyId, Number(companyId)));
        if (rows && rows.length > 0) return rows;
      } catch (err) {
        console.error('[DB Error] listEmployees:', err.message);
      }
    }
    return inMemoryStore.employees.filter(e => e.companyId === Number(companyId));
  },

  async createEmployee(data) {
    if (isNeonConnected && db) {
      try {
        const [inserted] = await db.insert(schema.employees).values(data).returning();
        return inserted;
      } catch (err) {
        console.error('[DB Error] createEmployee:', err.message);
      }
    }
    const newEmp = {
      id: inMemoryStore.nextId.employees++,
      ...data,
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.employees.push(newEmp);
    return newEmp;
  },

  async getDashboardStats(companyId = 1) {
    const emps = await this.listEmployees(companyId);
    const totalEmployees = emps.length;
    const presentToday = emps.filter(e => e.todayAttendance === 'present').length;
    const onLeaveToday = emps.filter(e => e.todayAttendance === 'on_leave').length;
    const wfhToday = emps.filter(e => e.todayAttendance === 'wfh').length;
    
    // Sum monthly payroll
    const totalMonthlyPayroll = emps.reduce((acc, curr) => acc + (curr.monthlySalary || 0), 0);
    // Estimated PF contribution (12% of basic, basic roughly 50% of monthly salary)
    const estimatedPfLiability = Math.round(totalMonthlyPayroll * 0.5 * 0.12);
    // Estimated ESIC liability (3.25% of eligible gross < 21000)
    const estimatedEsicLiability = Math.round(emps.filter(e => e.monthlySalary <= 21000).reduce((acc, curr) => acc + curr.monthlySalary * 0.0325, 0));

    return {
      totalEmployees,
      attendance: {
        present: presentToday,
        absent: totalEmployees - (presentToday + onLeaveToday + wfhToday),
        onLeave: onLeaveToday,
        wfh: wfhToday,
        ratePercent: totalEmployees ? Math.round(((presentToday + wfhToday) / totalEmployees) * 100) : 0,
      },
      payroll: {
        totalMonthlyPayoutINR: totalMonthlyPayroll,
        nextDisbursementDate: "2026-11-01",
        cycleStatus: "Processing - Attendance Locked",
        estimatedPfLiability,
        estimatedEsicLiability,
      },
      employees: emps,
    };
  }
};

export { db, schema };
export default repo;

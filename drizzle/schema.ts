import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

// Users table for authentication
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified'),
  image: text('image'),
  password: text('password'), // Hashed password
});

// Type definition
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  expires: integer('expires').notNull(),
  sessionToken: text('session_token').notNull().unique(),
});

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const verificationTokens = sqliteTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: integer('expires').notNull(),
});

// Products table
export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description').notNull(),
  image: text('image').notNull(),
  caffeine: text('caffeine').notNull(),
  calories: text('calories').notNull(),
  benefits: text('benefits').notNull(), // JSON string
  ingredientsList: text('ingredients_list').notNull(),
  nutritionFacts: text('nutrition_facts').notNull(), // JSON string
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

// Blog posts table
export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  image: text('image').notNull(),
  category: text('category').notNull(),
  author: text('author').notNull(),
  authorTitle: text('author_title'),
  authorImage: text('author_image'),
  date: text('date').notNull(),
  tags: text('tags').notNull(), // JSON string
  relatedPosts: text('related_posts').notNull(), // JSON string
});

// Store locations table
export const storeLocations = sqliteTable('store_locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  address: text('address').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  phone: text('phone').notNull(),
  hours: text('hours').notNull(),
  type: text('type').notNull(),
  products: text('products').notNull(), // JSON string
});

// Contact form submissions
export const contactSubmissions = sqliteTable('contact_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: integer('created_at').notNull(),
});

// Newsletter subscribers
export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  source: text('source').notNull(), // e.g., 'homepage', 'blog', 'contact'
  createdAt: integer('created_at').notNull(),
}); 
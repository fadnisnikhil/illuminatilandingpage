import { drizzle } from 'drizzle-orm/d1';
import { eq, like, or, and } from 'drizzle-orm';
import * as schema from '../drizzle/schema';

// Get all products
export async function getAllProducts(env: any) {
  const db = drizzle(env.DATABASE, { schema });
  const products = await db.select().from(schema.products);
  
  return products.map(product => ({
    ...product,
    benefits: JSON.parse(product.benefits),
    nutritionFacts: JSON.parse(product.nutritionFacts),
  }));
}

// Get product by ID
export async function getProductById(env: any, id: string) {
  const db = drizzle(env.DATABASE, { schema });
  const [product] = await db.select().from(schema.products).where(eq(schema.products.id, id));
  
  if (!product) return null;
  
  return {
    ...product,
    benefits: JSON.parse(product.benefits),
    nutritionFacts: JSON.parse(product.nutritionFacts),
  };
}

// Get all blog posts
export async function getAllBlogPosts(env: any) {
  const db = drizzle(env.DATABASE, { schema });
  const posts = await db.select().from(schema.blogPosts).orderBy(schema.blogPosts.date);
  
  return posts.map(post => ({
    ...post,
    tags: JSON.parse(post.tags),
    relatedPosts: JSON.parse(post.relatedPosts),
  }));
}

// Get blog post by slug
export async function getBlogPostBySlug(env: any, slug: string) {
  const db = drizzle(env.DATABASE, { schema });
  const [post] = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.slug, slug));
  
  if (!post) return null;
  
  return {
    ...post,
    tags: JSON.parse(post.tags),
    relatedPosts: JSON.parse(post.relatedPosts),
  };
}

// Search store locations
export async function searchStoreLocations(env: any, query?: string, type?: string, product?: string) {
  const db = drizzle(env.DATABASE, { schema });
  
  // Build conditions array
  const conditions = [];
  
  if (query) {
    conditions.push(or(
      like(schema.storeLocations.name, `%${query}%`),
      like(schema.storeLocations.address, `%${query}%`)
    ));
  }
  
  if (type) {
    conditions.push(eq(schema.storeLocations.type, type));
  }
  
  // Execute query with all conditions
  const stores = conditions.length > 0
    ? await db.select().from(schema.storeLocations).where(and(...conditions))
    : await db.select().from(schema.storeLocations);
  
  // Filter by product if specified
  const filteredStores = product 
    ? stores.filter(store => {
        const products = JSON.parse(store.products);
        return products.includes(product);
      })
    : stores;
  
  return filteredStores.map(store => ({
    ...store,
    products: JSON.parse(store.products),
    location: { lat: parseFloat(store.latitude), lng: parseFloat(store.longitude) },
  }));
}

// Submit contact form
export async function submitContactForm(env: any, formData: any) {
  const db = drizzle(env.DATABASE, { schema });
  
  const result = await db.insert(schema.contactSubmissions).values({
    name: formData.name,
    email: formData.email,
    phone: formData.phone || null,
    subject: formData.subject,
    message: formData.message,
    status: 'new',
    createdAt: Date.now(),
  });
  
  return result;
}

// Subscribe to newsletter
export async function subscribeToNewsletter(env: any, email: string, source: string) {
  const db = drizzle(env.DATABASE, { schema });
  
  try {
    await db.insert(schema.newsletterSubscribers).values({
      email,
      source,
      createdAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return { success: true, alreadySubscribed: true };
    }
    throw error;
  }
} 
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  Tag,
  ArrowRight
} from 'lucide-react';
import { BlogNewsletterForm } from './BlogNewsletterForm';

// Mock blog posts data (would come from database in real app)
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'benefits-of-natural-caffeine',
    title: 'The Benefits of Natural Caffeine vs. Synthetic Alternatives',
    excerpt: 'Discover why natural caffeine sources like green tea and guarana provide more balanced energy without the crash associated with synthetic caffeine.',
    image: '/blogs/caffeine.jpg',
    category: 'Science',
    author: 'Dr. Alexandra Chen',
    date: '2023-10-15',
  },
  {
    id: 2,
    slug: 'pre-workout-strategy',
    title: 'Optimal Pre-Workout Strategy: When to Consume Energy Drinks',
    excerpt: 'Learn the science-backed timing for consuming energy drinks before exercise to maximize performance and minimize side effects.',
    image: '/blogs/workout.jpg',
    category: 'Fitness',
    author: 'Marcus Hayes',
    date: '2023-09-28',
  },
  {
    id: 3,
    slug: 'cognitive-enhancement',
    title: 'Cognitive Enhancement: How Nootropics in Energy Drinks Affect Brain Function',
    excerpt: 'An in-depth look at how the nootropic elements in premium energy drinks can improve focus, memory, and mental clarity.',
    image: '/blogs/brain.jpg',
    category: 'Health',
    author: 'Dr. Sarah Williams',
    date: '2023-09-12',
  },
  {
    id: 4,
    slug: 'zero-sugar-revolution',
    title: 'The Zero Sugar Revolution in Energy Drinks',
    excerpt: 'How modern zero-sugar energy drinks maintain great taste while eliminating calories and blood sugar spikes.',
    image: '/blogs/zero-sugar.jpg',
    category: 'Nutrition',
    author: 'Jamie Rodriguez',
    date: '2023-08-30',
  },
  {
    id: 5,
    slug: 'music-festival-survival',
    title: 'Music Festival Survival Guide: Staying Energized All Weekend',
    excerpt: 'Tips and tricks for maintaining your energy levels throughout multi-day music festivals without crashing or burning out.',
    image: '/blogs/festival.jpg',
    category: 'Lifestyle',
    author: 'Zoe Parker',
    date: '2023-08-15',
  },
  {
    id: 6,
    slug: 'athletic-performance',
    title: 'Boosting Athletic Performance: The Science Behind Energy Drinks',
    excerpt: 'Research-backed insights into how properly formulated energy drinks can enhance endurance, strength, and recovery in athletes.',
    image: '/blogs/athlete.jpg',
    category: 'Fitness',
    author: 'Marcus Hayes',
    date: '2023-07-22',
  },
];

// Featured post is the most recent one
const featuredPost = BLOG_POSTS[0];
const regularPosts = BLOG_POSTS.slice(1);

export default function BlogsPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Illuminati <span className="text-emerald-500">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Explore our collection of articles covering energy, performance, nutrition, and lifestyle topics to help you optimize your potential.
          </p>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">{featuredPost.category}</span>
                  <span className="text-gray-400 text-sm ml-4 flex items-center">
                    <Calendar size={14} className="mr-1" /> 
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h3>
                <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 mr-3"></div>
                    <span className="text-gray-300 text-sm">{featuredPost.author}</span>
                  </div>
                  
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href={`/blogs/${featuredPost.slug}`}>
                      Read Article <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Regular Posts */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="bg-black rounded-lg overflow-hidden group hover:shadow-emerald-500/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar size={14} className="mr-1" /> 
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    <span className="mx-2">•</span>
                    <User size={14} className="mr-1" /> {post.author}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <span className="text-emerald-500 font-medium inline-flex items-center">
                    Read More <ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <BlogNewsletterForm />
        </div>
      </section>
    </div>
  );
} 
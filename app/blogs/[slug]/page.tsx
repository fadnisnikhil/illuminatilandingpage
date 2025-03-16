import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ShareButtons } from '../ShareButtons';
import { BlogNewsletterForm } from '../BlogNewsletterForm';

export const runtime = 'edge';

// Mock blog posts data (would come from database in real app)
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'benefits-of-natural-caffeine',
    title: 'The Benefits of Natural Caffeine vs. Synthetic Alternatives',
    excerpt: 'Discover why natural caffeine sources like green tea and guarana provide more balanced energy without the crash associated with synthetic caffeine.',
    content: `
      <p class="text-lg mb-4">When it comes to energy drinks, one of the most important ingredients is caffeine. However, not all caffeine is created equal. At Illuminati Energy, we exclusively use natural caffeine sources in our products, and there's good science behind this decision.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">What is Natural Caffeine?</h2>
      
      <p class="mb-4">Natural caffeine is found in various plants, most notably in coffee beans, tea leaves, guarana berries, and yerba mate. These plants produce caffeine as a natural pesticide to protect themselves from insects. When we consume these natural sources, we're getting not just caffeine but also a complex array of other beneficial compounds that work synergistically with caffeine.</p>
      
      <p class="mb-4">In contrast, synthetic caffeine is manufactured in laboratories, typically derived from urea and chloroacetic acid. While chemically identical to natural caffeine at the molecular level (C₈H₁₀N₄O₂), synthetic caffeine lacks the complementary compounds found in plant sources.</p>
      
      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold text-white mb-4">Key Natural Caffeine Sources in Illuminati Energy:</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Green Tea Extract:</strong> Contains L-theanine, which works synergistically with caffeine to provide smooth energy without jitters</li>
          <li><strong>Guarana:</strong> A South American berry with natural caffeine that releases more slowly than coffee</li>
          <li><strong>Coffee Fruit Extract:</strong> Delivers caffeine along with antioxidants and other beneficial compounds</li>
        </ul>
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">The Benefits of Natural Caffeine</h2>
      
      <p class="mb-4">Research has shown several advantages of natural caffeine sources over their synthetic counterparts:</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">1. Slower Absorption Rate</h3>
      <p class="mb-4">Natural caffeine sources typically contain other compounds like tannins that slow the absorption of caffeine into the bloodstream. This results in a more gradual increase in energy levels and a longer-lasting effect, without the sudden spike and crash often associated with synthetic caffeine.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">2. Additional Health Benefits</h3>
      <p class="mb-4">Natural caffeine sources come packaged with antioxidants, flavonoids, and other beneficial plant compounds. For example, green tea contains catechins that have been linked to improved metabolism and various health benefits. These compounds work together with caffeine in what scientists call an "entourage effect."</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">3. Better Tolerance</h3>
      <p class="mb-4">Many people report fewer side effects like jitters, anxiety, and sleep disturbances with natural caffeine sources compared to synthetic ones. This may be due to the presence of compounds like L-theanine in tea, which has calming properties that balance caffeine's stimulating effects.</p>
      
      <div class="relative h-80 my-8 rounded-lg overflow-hidden">
        <Image
          src="/blogs/caffeine-comparison.jpg"
          alt="Natural vs. Synthetic Caffeine Comparison"
          fill
          className="object-cover"
        />
      </div>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">The Science Behind the Effects</h2>
      
      <p class="mb-4">Research published in the Journal of Alternative and Complementary Medicine found that natural caffeine sources produce a more sustained energy boost compared to isolated caffeine. Subjects experienced improved cognitive function for longer periods with fewer side effects.</p>
      
      <p class="mb-4">Additionally, a study in the American Journal of Clinical Nutrition found that the bioactive compounds in natural caffeine sources may help mitigate some of the potential negative effects of caffeine, such as increased blood pressure and heart rate.</p>
      
      <blockquote class="border-l-4 border-emerald-500 pl-4 my-8 text-xl text-gray-300 italic">
        "The difference between natural and synthetic caffeine is not just about the caffeine itself, but about everything that comes with it in its natural form. It's the difference between eating an orange and taking a vitamin C pill." <span class="block mt-2 text-sm font-normal">- Dr. Sarah Williams, Nutritional Biochemist</span>
      </blockquote>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Our Commitment to Natural Ingredients</h2>
      
      <p class="mb-4">At Illuminati Energy, we've committed to using only natural caffeine sources in our products. This decision isn't just about marketing—it's about providing a superior energy experience with balanced stimulation that supports your body's natural energy systems rather than overriding them.</p>
      
      <p class="mb-4">This approach aligns with our broader philosophy of creating energy drinks that enhance performance without compromising long-term health and wellbeing. We believe that energy shouldn't come at the cost of your health, which is why we focus on ingredients that work with your body's natural processes.</p>
      
      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Conclusion</h2>
      
      <p class="mb-4">While synthetic caffeine might be cheaper to produce and easier to add to products in precise amounts, natural caffeine sources provide a superior energy experience with additional health benefits. The next time you reach for an energy drink, consider where the caffeine comes from—it makes a real difference in how you'll feel both during and after the energy boost.</p>
      
      <p class="mb-4">Experience the Illuminati difference with our natural caffeine formulations, designed to elevate your energy and your performance without the crash.</p>
    `,
    image: '/blogs/caffeine.jpg',
    category: 'Science',
    author: 'Dr. Alexandra Chen',
    authorTitle: 'Ph.D. in Nutritional Biochemistry',
    authorImage: '/team/alexandra-chen.jpg',
    date: '2023-10-15',
    tags: ['Caffeine', 'Natural Ingredients', 'Energy', 'Science'],
    relatedPosts: [2, 3, 4],
  },
  // Other blog posts data would be here...
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the blog post by slug
  const post = BLOG_POSTS.find(post => post.slug === params.slug);
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  // Get related posts
  const relatedPosts = BLOG_POSTS.filter(p => post.relatedPosts.includes(p.id));
  
  return (
    <div className="pt-24 bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent/50 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <Link 
              href="/blogs"
              className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-4"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to All Articles
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-300 gap-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Tag size={16} className="mr-2" />
                {post.category}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-black p-8 rounded-lg">
                <div 
                  className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-500 prose-a:text-emerald-400 hover:prose-a:text-emerald-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Share Section */}
                <div className="bg-gray-900 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Share This Article</h3>
                  <ShareButtons title={post.title} variant="icons" />
                </div>
                
                {/* Tags */}
                <div className="mt-8 mb-12">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white font-bold">Tags:</span>
                    {post.tags.map((tag, index) => (
                      <Link 
                        key={index}
                        href={`/blogs/tag/${tag.toLowerCase()}`}
                        className="bg-emerald-900 text-emerald-400 hover:bg-emerald-800 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Author Bio */}
                <div className="bg-gray-900 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">About the Author</h3>
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={post.authorImage || '/team/default-avatar.jpg'}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{post.author}</h4>
                      <p className="text-gray-400 text-sm">{post.authorTitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Expert in nutritional biochemistry with a focus on how natural compounds affect human performance and cognitive function.
                  </p>
                </div>
                
                {/* Share Footer */}
                <div className="border-t border-gray-800 pt-8 mb-12">
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="text-white font-bold mb-4 sm:mb-0">Share this article:</span>
                    <ShareButtons title={post.title} variant="text" />
                  </div>
                </div>
                
                {/* Related Posts */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        href={`/blogs/${relatedPost.slug}`}
                        className="bg-black rounded-lg overflow-hidden group hover:shadow-emerald-500/20 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative h-40">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-bold text-white group-hover:text-emerald-500 transition-colors line-clamp-2 mb-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-gray-400 text-sm">{relatedPost.author} • {new Date(relatedPost.date).toLocaleDateString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Share */}
              <div className="bg-gray-900 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Share This Article</h3>
                <ShareButtons title={post.title} variant="icons" />
              </div>
              
              {/* Tags */}
              <div className="bg-gray-900 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/blogs/tag/${tag.toLowerCase()}`}
                      className="bg-black text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-emerald-900">
        <div className="container mx-auto px-4">
          <BlogNewsletterForm 
            title="Enjoyed this article?" 
            description="Subscribe to our newsletter for more insights on energy, performance, and nutrition."
          />
        </div>
      </section>
    </div>
  );
} 
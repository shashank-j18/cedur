import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config.js';
import { BRAND_NAME } from '../config/brand.js';
import { Calendar, Clock, User, ArrowRight, Search, BookOpen } from 'lucide-react';

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(API_ENDPOINTS.blog);
        const data = await res.json();
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, []);

  const categories = ['All', 'Statutory Compliance', 'Payroll & Taxation', 'Attendance & Operations'];

  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-brand mb-3">Knowledge & Compliance Hub</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Indian HR, Payroll & Labour Law Insights
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            Practical guides, tax calculations, and regulatory updates written by compliance specialists to help your business stay 100% penalty-free.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${selectedCategory === cat ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
            />
          </div>

        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            Loading compliance articles...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No articles found</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map(post => (
              <article 
                key={post.id}
                className="card-premium flex flex-col justify-between group hover:border-brand-500/50"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="badge-brand text-[10px]">{post.category}</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-3 leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-600 group-hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

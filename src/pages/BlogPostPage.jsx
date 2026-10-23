import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config.js';
import { BRAND_NAME } from '../config/brand.js';
import { Calendar, Clock, User, ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API_ENDPOINTS.blog}/${slug}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        if (data.post) {
          setPost(data.post);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 text-center text-sm text-slate-500">
        Loading article content...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">The compliance article you requested does not exist or has been relocated.</p>
        <Link to="/blog" className="btn-primary text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Blog Hub</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-slate-50 min-h-screen py-16">
      <div className="section-container max-w-4xl">
        
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Compliance Articles</span>
        </Link>

        {/* Article Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-card">
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="badge-brand">{post.category}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Box */}
          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{post.author}</p>
              <p className="text-[11px] text-slate-500">{BRAND_NAME} Compliance Desk</p>
            </div>
          </div>

          {/* Article Summary Box */}
          <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-100 text-slate-700 text-sm font-medium mb-8 leading-relaxed">
            <span className="font-bold text-brand-800">Executive Summary: </span>
            {post.summary}
          </div>

          {/* Formatted Article Body */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            {post.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-xl font-bold text-slate-900 pt-4 mt-6 border-t border-slate-100">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const bulletLines = paragraph.split('\n');
                return (
                  <ul key={pIdx} className="space-y-1.5 list-disc pl-5 my-3 text-slate-600 text-sm">
                    {bulletLines.map((line, bIdx) => (
                      <li key={bIdx}>{line.replace(/^-\s+/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Bottom CTA within Article */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 bg-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Need help automating this in your company?</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Our team can configure your exact EPF ceilings, state PT slabs, and tax regimes inside YourBrand in minutes.
              </p>
            </div>
            <Link to="/contact" className="btn-primary py-2.5 px-6 text-xs whitespace-nowrap">
              Talk to Compliance Specialist
            </Link>
          </div>

        </div>

      </div>
    </article>
  );
}

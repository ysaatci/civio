"use client"

import { useListings } from "@/features/listings/hooks"
import Link from "next/link"

export default function Home() {
  const { data: listings, isLoading } = useListings()
  const featuredListings = listings?.slice(0, 6) || []

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Civio</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Buy
              </Link>
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Rent
              </Link>
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sell
              </Link>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find your next home
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the perfect property in your ideal location
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 border border-gray-200">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or address"
                  className="w-full px-6 py-4 text-lg border-none outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-4 text-lg border-none outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <option>Buy</option>
                  <option>Rent</option>
                </select>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">
                Explore our handpicked selection of premium listings
              </p>
            </div>
            <Link
              href="/listings"
              className="text-blue-600 hover:text-blue-700 font-semibold hidden md:block"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : featuredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${listing.is_for_sale
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                        }`}>
                        {listing.is_for_sale ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {formatPrice(listing.price, listing.currency)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {listing.district}, {listing.city}
                      </p>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {listing.title}
                    </h3>

                    {listing.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {listing.description}
                      </p>
                    )}

                    {/* Property Details */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      {listing.rooms && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="text-sm font-medium">{listing.rooms}</span>
                        </div>
                      )}
                      {listing.bathrooms && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                          <span className="text-sm font-medium">{listing.bathrooms}</span>
                        </div>
                      )}
                      {listing.area && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          <span className="text-sm font-medium">{listing.area} m²</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No listings available at the moment</p>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/listings"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {listings?.length || 0}+
              </p>
              <p className="text-gray-600">Active Listings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">100%</p>
              <p className="text-gray-600">Verified Properties</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="text-xl font-bold">Civio</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in finding the perfect property.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Buy</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/listings" className="hover:text-white transition-colors">Browse Homes</Link></li>
                <li><Link href="/listings" className="hover:text-white transition-colors">New Construction</Link></li>
                <li><Link href="/listings" className="hover:text-white transition-colors">Foreclosures</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rent</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/listings" className="hover:text-white transition-colors">Rental Homes</Link></li>
                <li><Link href="/listings" className="hover:text-white transition-colors">Apartments</Link></li>
                <li><Link href="/listings" className="hover:text-white transition-colors">Short Term</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/listings" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/listings" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/listings" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Civio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
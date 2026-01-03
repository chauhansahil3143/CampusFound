import React, { useState } from 'react';
import { Search, MapPin, Calendar, Tag, Package, Filter } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemTypeFilter, setItemTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const items = [
    {
      id: 1,
      type: 'lost',
      title: 'phone',
      category: 'Phone',
      location: 'classroom',
      dateLost: '02/01/2026',
      reportedOn: '02/01/2026',
      description: 'blue colour',
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
      resolved: true
    },
    {
      id: 2,
      type: 'lost',
      title: 'phone',
      category: 'Wallet',
      location: 'sjdfngsod',
      dateLost: '02/01/2026',
      reportedOn: '02/01/2026',
      description: 'sjnfgjsdfng',
      image: 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?w=400&h=300&fit=crop',
      resolved: false
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesType = itemTypeFilter === 'all' || item.type === itemTypeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesType && matchesCategory;
  });

  const stats = {
    lostItems: items.filter(i => i.type === 'lost').length,
    foundItems: items.filter(i => i.type === 'found').length,
    totalReports: items.length
  };

  const HomePage = () => (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(200,220,255,0.3) 0%, rgba(230,200,255,0.3) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className="text-purple-600 text-lg mb-4">Reuniting Items with Their Owners</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-blue-600">Lost Something? </span>
            <span className="text-purple-600">Found Something?</span>
          </h1>
          <p className="text-gray-600 text-xl mb-12">
            Help reunite lost items with their owners in your community
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setActiveTab('browse')}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Report Lost Item
            </button>
            <button 
              onClick={() => setActiveTab('browse')}
              className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Report Found Item
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-md">
              <div className="text-5xl font-bold text-red-500 mb-2">{stats.lostItems}</div>
              <div className="text-gray-600 text-lg">Lost Items</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-md">
              <div className="text-5xl font-bold text-green-500 mb-2">{stats.foundItems}</div>
              <div className="text-gray-600 text-lg">Found Items</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-md">
              <div className="text-5xl font-bold text-purple-600 mb-2">{stats.totalReports}</div>
              <div className="text-gray-600 text-lg">Total Reports</div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h2 className="text-3xl font-bold text-purple-600 mb-8">Recent Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setActiveTab('detail');
                }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {item.type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">
                      {item.category}
                    </span>
                    {item.resolved && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800 flex items-center gap-1">
                        ✓ Resolved
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                    {item.location}
                  </div>
                  <div className="text-gray-600 text-sm">{item.dateLost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BrowseItemsPage = () => (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(200,220,255,0.3) 0%, rgba(230,200,255,0.3) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-8">Browse Items</h1>

        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-purple-600">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Item Type */}
            <div>
              <h3 className="text-gray-700 font-semibold mb-3">Item Type</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setItemTypeFilter('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    itemTypeFilter === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setItemTypeFilter('lost')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    itemTypeFilter === 'lost'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Lost
                </button>
                <button
                  onClick={() => setItemTypeFilter('found')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    itemTypeFilter === 'found'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Found
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-gray-700 font-semibold mb-3">Category</h3>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All</option>
                <option value="phone">Phone</option>
                <option value="wallet">Wallet</option>
                <option value="keys">Keys</option>
                <option value="bag">Bag</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">Showing <span className="font-bold text-purple-600">{filteredItems.length}</span> items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setActiveTab('detail');
              }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.type === 'lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {item.type === 'lost' ? 'Lost' : 'Found'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">
                    {item.category}
                  </span>
                  {item.resolved && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800 flex items-center gap-1">
                      ✓ Resolved
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                  {item.location}
                </div>
                <div className="text-gray-600 text-sm">{item.dateLost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ItemDetailPage = () => (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(200,220,255,0.3) 0%, rgba(230,200,255,0.3) 100%)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div className="mb-6">
          <img 
            src={selectedItem?.image} 
            alt={selectedItem?.title}
            className="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Item Details Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          {/* Status Badges */}
          <div className="flex gap-3 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              selectedItem?.type === 'lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}>
              {selectedItem?.type === 'lost' ? 'Lost Item' : 'Found Item'}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-500 text-white">
              {selectedItem?.category}
            </span>
            {selectedItem?.resolved && (
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-200 text-green-800 flex items-center gap-1">
                ✓ Resolved
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-purple-600 mb-8">{selectedItem?.title}</h1>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Location</p>
                <p className="text-gray-800 font-semibold text-lg">{selectedItem?.location}</p>
              </div>
            </div>

            {/* Date Lost */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Date Lost</p>
                <p className="text-gray-800 font-semibold text-lg">{selectedItem?.dateLost}</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Category</p>
                <p className="text-gray-800 font-semibold text-lg">{selectedItem?.category}</p>
              </div>
            </div>

            {/* Reported On */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Reported On</p>
                <p className="text-gray-800 font-semibold text-lg">{selectedItem?.reportedOn}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Description</h2>
            <p className="text-gray-700 text-lg">{selectedItem?.description}</p>
          </div>

          {/* Action Button */}
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all">
            Manage in Dashboard
          </button>

          {/* Resolved Message */}
          {selectedItem?.resolved && (
            <div className="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-green-800 font-medium">This item has been marked as found/resolved!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Search className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-purple-600">Lost & Found</span>
            </div>

            {/* Menu */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`text-lg font-medium transition-colors ${
                  activeTab === 'home' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('browse')}
                className={`text-lg font-medium transition-colors ${
                  activeTab === 'browse' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Browse Items
              </button>
              <button
                className="text-lg font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Dashboard
              </button>
              <span className="text-purple-600 font-medium">abc@gmail.com</span>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {activeTab === 'home' && <HomePage />}
      {activeTab === 'browse' && <BrowseItemsPage />}
      {activeTab === 'detail' && selectedItem && <ItemDetailPage />}
    </div>
  );
};

export default App;
import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { LostItemForm } from './components/LostItemForm';
import { FoundItemForm } from './components/FoundItemForm';
import { Listings } from './components/Listings';
import { ItemDetails } from './components/ItemDetails';
import { Dashboard } from './components/Dashboard';
import { AuthForm } from './components/AuthForm';

export type Item = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  imageURL: string;
  createdAt: string;
  type: 'lost' | 'found';
  userEmail?: string;
  userPhone?: string;
  status?: 'active' | 'resolved';
};

export type User = {
  id: string;
  email: string;
};

type View = 'home' | 'report-lost' | 'report-found' | 'listings' | 'item-details' | 'dashboard' | 'auth';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    const newUser = { id: `user-${Date.now()}`, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setView('home');
  };

  const handleSignup = (email: string, password: string) => {
    // Mock signup
    const newUser = { id: `user-${Date.now()}`, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setView('home');
  };

  const handleAddItem = (item: Omit<Item, 'id' | 'userId' | 'createdAt' | 'userEmail'>) => {
    if (!user) return;

    const newItem: Item = {
      ...item,
      id: `item-${Date.now()}`,
      userId: user.id,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setView('listings');
  };

  const handleUpdateItem = (id: string, updates: Partial<Item>) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setView('dashboard');
  };

  const handleViewItem = (item: Item) => {
    setSelectedItem(item);
    setView('item-details');
  };

  const handleMarkAsFound = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, status: 'resolved' as const } : item
    );
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    
    // Update selected item if it's the one being marked
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, status: 'resolved' as const });
    }
  };

  const requireAuth = (targetView: View) => {
    if (!user) {
      setView('auth');
    } else {
      setView(targetView);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Lost & Found</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('home')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setView('listings')}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Browse Items
              </button>
              {user && (
                <button 
                  onClick={() => setView('dashboard')}
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Dashboard
                </button>
              )}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                    <span className="text-sm text-purple-900">{user.email}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setView('auth')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {view === 'home' && (
          <Home 
            items={items}
            onReportLost={() => requireAuth('report-lost')}
            onReportFound={() => requireAuth('report-found')}
            onViewItem={handleViewItem}
          />
        )}
        
        {view === 'report-lost' && user && (
          <LostItemForm 
            onSubmit={(item) => handleAddItem({ ...item, type: 'lost' })}
            onCancel={() => setView('home')}
          />
        )}
        
        {view === 'report-found' && user && (
          <FoundItemForm 
            onSubmit={(item) => handleAddItem({ ...item, type: 'found' })}
            onCancel={() => setView('home')}
          />
        )}
        
        {view === 'listings' && (
          <Listings 
            items={items}
            onViewItem={handleViewItem}
          />
        )}
        
        {view === 'item-details' && selectedItem && (
          <ItemDetails 
            item={selectedItem}
            currentUser={user}
            onBack={() => setView('listings')}
            onEdit={() => setView('dashboard')}
            onMarkAsFound={handleMarkAsFound}
          />
        )}
        
        {view === 'dashboard' && user && (
          <Dashboard 
            items={items.filter(item => item.userId === user.id)}
            onViewItem={handleViewItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        )}
        
        {view === 'auth' && (
          <AuthForm 
            onLogin={handleLogin}
            onSignup={handleSignup}
            onCancel={() => setView('home')}
          />
        )}
      </main>
    </div>
  );
}
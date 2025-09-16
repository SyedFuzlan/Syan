import React, { useState } from 'react';
import { Calculator, BarChart3, Activity, Shield } from 'lucide-react';
import MetabolicCalculator from './components/MetabolicCalculator';
import CreatorDashboard from './components/CreatorDashboard';
import PrivacyNotice from './components/PrivacyNotice';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'dashboard'>('calculator');
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SYAN</h1>
                <p className="text-xs text-gray-500">Stay Young and Natural</p>
              </div>
            </div>
            
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'calculator'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Calculator</span>
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
            </nav>
            
            <button
              onClick={() => setShowPrivacy(true)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">Privacy</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && <MetabolicCalculator />}
        {activeTab === 'dashboard' && <CreatorDashboard />}
      </main>

      {/* Privacy Modal */}
      {showPrivacy && (
        <PrivacyNotice onClose={() => setShowPrivacy(false)} />
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Natural metabolic calculations to help you stay young and healthy.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              All data is processed locally and anonymized for analytics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
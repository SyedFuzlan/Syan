import React from 'react';
import { X, Shield, Eye, Database, Download } from 'lucide-react';

interface PrivacyNoticeProps {
  onClose: () => void;
}

const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Privacy & Data Policy</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-700">
            {/* Data Collection */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Database className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">What Data We Collect</h3>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Anonymized Data Only:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• Age range (not exact age)</li>
                  <li>• Gender selection</li>
                  <li>• Activity level category</li>
                  <li>• Body fat percentage range</li>
                  <li>• Calculated metabolic results</li>
                  <li>• Timestamp of calculation</li>
                </ul>
              </div>
            </div>

            {/* What We Don't Collect */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">What We Never Collect</h3>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <ul className="space-y-1 text-sm">
                  <li>• Personal identifying information</li>
                  <li>• IP addresses or device identifiers</li>
                  <li>• Exact personal measurements</li>
                  <li>• Contact information</li>
                  <li>• Location data</li>
                  <li>• Browser fingerprints</li>
                </ul>
              </div>
            </div>

            {/* How We Use Data */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Data</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li><strong>Analytics:</strong> Understanding usage patterns and demographics</li>
                  <li><strong>Improvements:</strong> Enhancing calculator accuracy and features</li>
                  <li><strong>Research:</strong> Aggregate health and fitness insights (anonymous)</li>
                  <li><strong>Quality Assurance:</strong> Ensuring calculation accuracy</li>
                </ul>
              </div>
            </div>

            {/* Data Storage */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Storage & Security</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Local Storage:</strong> Your personal data stays in your browser and is never transmitted to our servers.
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Analytics Storage:</strong> Only anonymized, aggregated data is stored for analytical purposes.
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <strong>Security:</strong> All data is processed with industry-standard security measures.
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Download className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Your Rights (GDPR Compliant)</h3>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Transparency:</strong> Full visibility into data collection</li>
                  <li>• <strong>Control:</strong> No personal data collection means no data to delete</li>
                  <li>• <strong>Anonymity:</strong> All analytics data cannot be traced back to you</li>
                  <li>• <strong>Local Control:</strong> Clear your browser storage to remove any local data</li>
                </ul>
              </div>
            </div>

            {/* Consent */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Consent Notice</h4>
              <p className="text-sm text-yellow-800">
                By using this calculator, you consent to the anonymous collection of calculation results 
                for analytical purposes. This helps us improve the tool for everyone while protecting your privacy.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                Questions about our privacy practices? This is a demo application for educational purposes.
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
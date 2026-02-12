
import React, { useState } from 'react';
// Import Coffee icon from lucide-react
import { Sparkles, Sun, RefreshCw, Coffee } from 'lucide-react';
import { getDrinkRecommendation } from '../services/geminiService';
import { Page } from '../App';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isRecommending, setIsRecommending] = useState(false);

  const handleRecommend = async () => {
    if (!mood.trim()) return;
    setIsRecommending(true);
    const result = await getDrinkRecommendation(mood);
    setRecommendation(result);
    setIsRecommending(false);
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover brightness-[0.8] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-yellow-400/90 backdrop-blur-sm px-6 py-2 rounded-full text-white font-bold text-sm mb-8">
            <Sparkles size={18} />
            Open Daily: 8AM - 8PM
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
            Sip the <span className="text-yellow-400 italic">Sunshine</span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium mb-12 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
            Every cup is brewed with passion and served with a smile. Join us for your morning ritual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('menu')}
              className="px-10 py-5 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-yellow-900/20 active:scale-95 text-lg"
            >
              Order Online
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="px-10 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/50 font-bold rounded-2xl transition-all active:scale-95 text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* AI Intelligence Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-amber-50 rounded-[3rem] p-8 md:p-16 border border-amber-100 shadow-sm text-center">
            <div className="inline-flex p-4 bg-yellow-400 rounded-2xl text-white mb-6 shadow-lg shadow-yellow-100">
              <Sparkles size={32} />
            </div>
            <h2 className="text-4xl font-serif font-bold text-amber-900 mb-4">The Sunny AI Concierge</h2>
            <p className="text-amber-700 mb-10 text-lg">Not sure what you're in the mood for? Let our AI suggest the perfect pairing.</p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto mb-8">
              <input 
                type="text" 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="How are you feeling right now?"
                className="flex-1 bg-white border-2 border-amber-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 outline-none transition-all font-medium text-amber-900"
              />
              <button 
                onClick={handleRecommend}
                disabled={isRecommending || !mood.trim()}
                className="bg-amber-900 hover:bg-amber-800 disabled:bg-amber-300 text-white font-bold px-8 py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isRecommending ? <RefreshCw className="animate-spin" size={20} /> : 'Suggest'}
              </button>
            </div>

            {recommendation && (
              <div className="bg-white rounded-2xl p-8 shadow-md border-l-8 border-yellow-400 animate-in slide-in-from-left duration-500 max-w-2xl mx-auto">
                <p className="text-xl text-amber-900 font-medium leading-relaxed italic">
                  "{recommendation}"
                </p>
                <button 
                   onClick={() => onNavigate('menu')}
                   className="mt-6 text-yellow-600 font-bold text-sm uppercase tracking-widest hover:text-yellow-700 transition-colors"
                >
                  Go To Menu →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Highlight Categories */}
      <section className="py-24 bg-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-amber-900 mb-12">Our Specials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-yellow-500 mx-auto mb-6">
                <Coffee size={32} />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">Artisan Coffee</h3>
              <p className="text-amber-700 text-sm">Locally roasted beans, ground fresh for every cup to ensure maximum flavor.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-yellow-500 mx-auto mb-6">
                <Sun size={32} />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">Fresh Smoothies</h3>
              <p className="text-amber-700 text-sm">Real fruit blends without any added sugars. A true healthy refresh.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-yellow-500 mx-auto mb-6">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">Daily Pastries</h3>
              <p className="text-amber-700 text-sm">Baked in-house every morning. Flaky, buttery, and absolutely divine.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;

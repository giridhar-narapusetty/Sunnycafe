
import React from 'react';
import { Heart, Star, Coffee } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="py-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1521017432531-fbd92d744264?auto=format&fit=crop&q=80&w=800" 
                alt="Cafe Vibe" 
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-yellow-400 rounded-full -z-0"></div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="text-5xl font-serif font-bold text-amber-900 mb-8 leading-tight">
              Crafting Joy, <br />Since 2018.
            </h2>
            <div className="space-y-6 text-amber-800 text-lg leading-relaxed">
              <p>
                At Sunny Cafe, we believe a great day starts with a great drink. What began as a small coffee cart has bloomed into a cozy neighborhood sanctuary where every visitor is treated like family.
              </p>
              <p>
                We prioritize quality over everything. From sourcing high-mountain tea leaves to hand-picking Arabica beans, our ingredients are as fresh as a summer morning.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <Heart className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-amber-900 mb-4">Ethically Sourced</h3>
            <p className="text-amber-700">We work directly with small farmers to ensure fair pay and sustainable practices.</p>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-amber-900 mb-4">Quality First</h3>
            <p className="text-amber-700">Every drink is tested for perfection before it ever touches your table.</p>
          </div>
          <div className="text-center">
            <Coffee className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-amber-900 mb-4">Expert Baristas</h3>
            <p className="text-amber-700">Our team undergoes rigorous training to master the art of the perfect brew.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;

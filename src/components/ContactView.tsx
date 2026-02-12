
import React from 'react';
import { MapPin, Phone, Mail, Send, Instagram, Twitter, Facebook } from 'lucide-react';

const ContactView: React.FC = () => {
  return (
    <div className="py-24 bg-amber-50/30 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-amber-900 mb-4">Get In Touch</h2>
          <p className="text-amber-700 max-w-2xl mx-auto text-lg">
            We'd love to hear from you. Whether it's feedback, catering inquiries, or just a hello!
          </p>
        </div>

        <div className="bg-amber-900 rounded-[3rem] p-8 md:p-16 text-white flex flex-col lg:flex-row gap-16 shadow-2xl shadow-amber-900/20">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-serif font-bold mb-8">Contact Information</h3>
            <p className="text-amber-200 text-lg mb-12">
              Our team is here to assist you during business hours. We typically respond within 24 hours.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-amber-800/50 p-3 rounded-xl">
                  <MapPin className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Our Location</h4>
                  <p className="text-amber-300">123 Sunshine Avenue, Gold City, SC 45678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-800/50 p-3 rounded-xl">
                  <Phone className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Call Us</h4>
                  <p className="text-amber-300">+1 (555) SUNNY-CO</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-800/50 p-3 rounded-xl">
                  <Mail className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email Us</h4>
                  <p className="text-amber-300">hello@sunnycafe.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="#" className="w-12 h-12 bg-amber-800/50 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 bg-amber-800/50 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="w-12 h-12 bg-amber-800/50 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-amber-900 font-bold mb-2 text-sm uppercase tracking-wide">Your Name</label>
                <input type="text" className="w-full bg-amber-50 rounded-xl px-5 py-4 text-amber-900 focus:ring-4 focus:ring-yellow-100 border-2 border-transparent focus:border-yellow-400 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-amber-900 font-bold mb-2 text-sm uppercase tracking-wide">Email Address</label>
                <input type="email" className="w-full bg-amber-50 rounded-xl px-5 py-4 text-amber-900 focus:ring-4 focus:ring-yellow-100 border-2 border-transparent focus:border-yellow-400 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-amber-900 font-bold mb-2 text-sm uppercase tracking-wide">How can we help?</label>
                <textarea rows={4} className="w-full bg-amber-50 rounded-xl px-5 py-4 text-amber-900 focus:ring-4 focus:ring-yellow-100 border-2 border-transparent focus:border-yellow-400 outline-none transition-all resize-none" placeholder="Write your message here..."></textarea>
              </div>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-yellow-100">
                <Send size={22} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;

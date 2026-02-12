
import React from 'react';
import { Coffee, Leaf, Milk, Zap, GlassWater, Utensils } from 'lucide-react';
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'coffee-01',
    name: 'Artisan Espresso',
    price: 3.25,
    description: 'A concentrated, bold shot of our signature dark roast with a rich crema.',
    category: 'Hot',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'coffee-02',
    name: 'Golden Latte',
    price: 4.75,
    description: 'Silky steamed milk poured over rich espresso with a hint of Madagascar vanilla.',
    category: 'Hot',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'tea-01',
    name: 'Morning Mist Green Tea',
    price: 3.50,
    description: 'Premium Japanese sencha leaves providing a delicate, grassy finish.',
    category: 'Hot',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'cold-01',
    name: 'Iced Caramel Cloud',
    price: 5.50,
    description: 'Cold-pressed espresso over ice, swirled with caramel and topped with cold foam.',
    category: 'Cold',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'cold-02',
    name: 'Tropical Sun Smoothie',
    price: 6.50,
    description: 'A refreshing blend of mango, pineapple, and coconut water.',
    category: 'Cold',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'cold-03',
    name: 'Berry Bliss Smoothie',
    price: 6.75,
    description: 'Antioxidant-packed blueberries, strawberries, and Greek yogurt.',
    category: 'Cold',
    image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hot-03',
    name: 'Midnight Mocha',
    price: 5.25,
    description: 'Rich dark chocolate melted into espresso and topped with whipped cream.',
    category: 'Hot',
    image: 'https://images.unsplash.com/photo-1544787210-2213d2427507?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'spec-01',
    name: 'Butter Croissant',
    price: 3.75,
    description: 'Flaky, golden-brown pastry made with 100% French butter.',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'spec-02',
    name: 'Avocado Smash Toast',
    price: 9.00,
    description: 'Fresh sourdough topped with crushed avocado, chili flakes, and a poached egg.',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'spec-03',
    name: 'Blueberry Lemon Muffin',
    price: 4.00,
    description: 'Bursting with fresh berries and a zesty lemon sugar topping.',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'spec-04',
    name: 'Double Choc Brownie',
    price: 4.50,
    description: 'Fudgy, dense chocolate brownie with chunks of dark Belgian chocolate.',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'cold-04',
    name: 'Sunny Cold Brew',
    price: 5.00,
    description: 'Slow-steeped for 18 hours for a super smooth, low-acid caffeine kick.',
    category: 'Cold',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
  }
];

export const CATEGORY_ICONS = {
  Hot: <Coffee className="w-4 h-4" />,
  Cold: <GlassWater className="w-4 h-4" />,
  Specialty: <Utensils className="w-4 h-4" />,
};

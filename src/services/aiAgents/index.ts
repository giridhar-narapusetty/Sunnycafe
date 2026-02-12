import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { geminiConfig } from '../config/app.config';
import { MenuItem, Order, DailyAnalytics } from '../types/database.types';

const ai = new GoogleGenAI({ apiKey: geminiConfig.apiKey });

// ==================== Sales Agent ====================

export const salesAgent = {
    // Suggest best-selling combos
    async suggestCombos(menuItems: MenuItem[], salesData: DailyAnalytics[]): Promise<string> {
        try {
            const topItems = salesData
                .flatMap(day => day.topItems)
                .slice(0, 10)
                .map(item => item.itemName)
                .join(', ');

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Based on these top-selling items: ${topItems}
        
        Suggest 3 profitable combo deals that would appeal to customers. 
        For each combo, provide:
        1. Combo name
        2. Items included
        3. Suggested price
        4. Why it would sell well
        
        Keep it concise and actionable.`,
            });

            return response.text || 'Unable to generate combo suggestions at this time.';
        } catch (error) {
            console.error('Sales agent error:', error);
            return 'Error generating combo suggestions.';
        }
    },

    // Recommend dynamic pricing
    async recommendPricing(item: MenuItem, salesData: DailyAnalytics[]): Promise<string> {
        try {
            const itemSales = salesData
                .flatMap(day => day.topItems)
                .filter(i => i.itemId === item.id);

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Item: ${item.name}
        Current Price: $${item.price}
        Category: ${item.category}
        Recent sales: ${itemSales.length} units
        
        Analyze if the pricing is optimal. Consider:
        1. Market positioning
        2. Sales velocity
        3. Category standards
        
        Provide a brief recommendation (2-3 sentences).`,
            });

            return response.text || 'Unable to analyze pricing at this time.';
        } catch (error) {
            console.error('Pricing analysis error:', error);
            return 'Error analyzing pricing.';
        }
    },

    // Identify low-performing items
    async identifyLowPerformers(menuItems: MenuItem[], salesData: DailyAnalytics[]): Promise<string> {
        try {
            const allSoldItems = new Set(salesData.flatMap(day => day.topItems.map(i => i.itemId)));
            const lowPerformers = menuItems.filter(item => !allSoldItems.has(item.id));

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `These menu items have low or no sales: ${lowPerformers.map(i => i.name).join(', ')}
        
        Provide actionable recommendations:
        1. Should any be removed from the menu?
        2. How can we boost their sales?
        3. Are there better alternatives?
        
        Keep it brief and specific.`,
            });

            return response.text || 'Unable to analyze low performers at this time.';
        } catch (error) {
            console.error('Low performer analysis error:', error);
            return 'Error analyzing low performers.';
        }
    },
};

// ==================== Analytics Agent ====================

export const analyticsAgent = {
    // Predict peak hours
    async predictPeakHours(salesData: DailyAnalytics[]): Promise<string> {
        try {
            const peakHoursData = salesData
                .flatMap(day => day.peakHours)
                .reduce((acc, { hour, orders }) => {
                    acc[hour] = (acc[hour] || 0) + orders;
                    return acc;
                }, {} as Record<number, number>);

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Peak hours data: ${JSON.stringify(peakHoursData)}
        
        Analyze the data and provide:
        1. Predicted busiest hours
        2. Staffing recommendations
        3. Inventory preparation tips
        
        Keep it actionable and concise.`,
            });

            return response.text || 'Unable to predict peak hours at this time.';
        } catch (error) {
            console.error('Peak hours prediction error:', error);
            return 'Error predicting peak hours.';
        }
    },

    // Customer retention insights
    async analyzeRetention(orders: Order[]): Promise<string> {
        try {
            const customerOrders = orders.reduce((acc, order) => {
                acc[order.userId] = (acc[order.userId] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const repeatCustomers = Object.values(customerOrders).filter(count => count > 1).length;
            const totalCustomers = Object.keys(customerOrders).length;

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Customer data:
        Total customers: ${totalCustomers}
        Repeat customers: ${repeatCustomers}
        Retention rate: ${((repeatCustomers / totalCustomers) * 100).toFixed(1)}%
        
        Provide:
        1. Assessment of retention rate
        2. Strategies to improve it
        3. Loyalty program ideas
        
        Be specific and actionable.`,
            });

            return response.text || 'Unable to analyze retention at this time.';
        } catch (error) {
            console.error('Retention analysis error:', error);
            return 'Error analyzing retention.';
        }
    },

    // Repeat purchase analysis
    async analyzeRepeatPurchases(orders: Order[]): Promise<string> {
        try {
            const itemFrequency = orders
                .flatMap(order => order.items)
                .reduce((acc, item) => {
                    acc[item.name] = (acc[item.name] || 0) + item.quantity;
                    return acc;
                }, {} as Record<string, number>);

            const topRepeats = Object.entries(itemFrequency)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([name, count]) => `${name}: ${count}`)
                .join(', ');

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Most frequently ordered items: ${topRepeats}
        
        Analyze and suggest:
        1. Why these items are popular
        2. How to leverage this data
        3. Cross-sell opportunities
        
        Keep it brief and actionable.`,
            });

            return response.text || 'Unable to analyze repeat purchases at this time.';
        } catch (error) {
            console.error('Repeat purchase analysis error:', error);
            return 'Error analyzing repeat purchases.';
        }
    },
};

// ==================== Inventory Agent ====================

export const inventoryAgent = {
    // Forecast stock needs
    async forecastStockNeeds(salesData: DailyAnalytics[], currentDate: Date): Promise<string> {
        try {
            const avgDailyRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0) / salesData.length;
            const avgDailyOrders = salesData.reduce((sum, day) => sum + day.orders, 0) / salesData.length;

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Sales data for the past ${salesData.length} days:
        Average daily revenue: $${avgDailyRevenue.toFixed(2)}
        Average daily orders: ${avgDailyOrders.toFixed(0)}
        Current date: ${currentDate.toLocaleDateString()}
        
        Forecast stock needs for the next 7 days. Consider:
        1. Seasonal trends
        2. Day of week patterns
        3. Growth trajectory
        
        Provide specific recommendations.`,
            });

            return response.text || 'Unable to forecast stock needs at this time.';
        } catch (error) {
            console.error('Stock forecast error:', error);
            return 'Error forecasting stock needs.';
        }
    },

    // Suggest supplier reorder timing
    async suggestReorderTiming(itemName: string, currentStock: number, avgDailyUsage: number): Promise<string> {
        try {
            const daysRemaining = currentStock / avgDailyUsage;

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Item: ${itemName}
        Current stock: ${currentStock} units
        Average daily usage: ${avgDailyUsage.toFixed(1)} units
        Days remaining: ${daysRemaining.toFixed(1)}
        
        Recommend:
        1. When to reorder
        2. How much to order
        3. Any risk factors
        
        Be specific and consider lead times.`,
            });

            return response.text || 'Unable to suggest reorder timing at this time.';
        } catch (error) {
            console.error('Reorder timing error:', error);
            return 'Error suggesting reorder timing.';
        }
    },
};

// ==================== Marketing Agent ====================

export const marketingAgent = {
    // Auto-generate offers
    async generateOffers(menuItems: MenuItem[], salesData: DailyAnalytics[]): Promise<string> {
        try {
            const lowSellers = menuItems.filter(item =>
                !salesData.some(day => day.topItems.some(top => top.itemId === item.id))
            );

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Create 3 promotional offers to boost sales. Consider:
        - Low-selling items: ${lowSellers.map(i => i.name).join(', ')}
        - Current menu: ${menuItems.map(i => i.name).slice(0, 10).join(', ')}
        
        For each offer provide:
        1. Offer name
        2. Discount/deal details
        3. Target audience
        4. Expected impact
        
        Make them creative and appealing.`,
            });

            return response.text || 'Unable to generate offers at this time.';
        } catch (error) {
            console.error('Offer generation error:', error);
            return 'Error generating offers.';
        }
    },

    // Suggest loyalty programs
    async suggestLoyaltyPrograms(customerData: { totalCustomers: number; repeatRate: number }): Promise<string> {
        try {
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Customer metrics:
        Total customers: ${customerData.totalCustomers}
        Repeat customer rate: ${(customerData.repeatRate * 100).toFixed(1)}%
        
        Suggest 2-3 loyalty program ideas that would:
        1. Increase repeat purchases
        2. Be easy to implement
        3. Provide clear value
        
        Include specific mechanics and rewards.`,
            });

            return response.text || 'Unable to suggest loyalty programs at this time.';
        } catch (error) {
            console.error('Loyalty program suggestion error:', error);
            return 'Error suggesting loyalty programs.';
        }
    },

    // Push targeted promotions
    async createTargetedPromotion(segment: string, preferences: string[]): Promise<string> {
        try {
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: `Customer segment: ${segment}
        Preferences: ${preferences.join(', ')}
        
        Create a targeted promotion that:
        1. Appeals to this segment
        2. Leverages their preferences
        3. Has a clear call-to-action
        
        Include messaging and offer details.`,
            });

            return response.text || 'Unable to create targeted promotion at this time.';
        } catch (error) {
            console.error('Targeted promotion error:', error);
            return 'Error creating targeted promotion.';
        }
    },
};

// ==================== Original Recommendation Service ====================

export const getDrinkRecommendation = async (mood: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: `User says they are feeling: "${mood}". 
      Based on the following Sunny Cafe menu categories:
      HOT DRINKS: Artisan Espresso, Golden Latte, Midnight Mocha, Morning Mist Green Tea.
      COLD DRINKS: Iced Caramel Cloud, Tropical Sun Smoothie, Berry Bliss Smoothie, Sunny Cold Brew.
      PASTRIES & SNACKS: Butter Croissant, Avocado Smash Toast, Blueberry Lemon Muffin, Double Choc Brownie.

      Suggest the best combination (e.g., a drink and a snack, or just a drink) for their mood in a friendly, "sunny" tone. Keep it short (max 2 sentences).`,
        });

        return response.text || 'I recommend our classic Artisan Espresso to brighten your day!';
    } catch (error) {
        console.error('Gemini Error:', error);
        return 'I recommend a warm Green Tea and a Muffin to keep you refreshed!';
    }
};

import { MenuItem, DeliveryAddress } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Value Combos & Meals (Swiggy / Zomato Signature Super Saver Combos)
  {
    id: 'combo-1',
    name: 'South Indian Heritage Brekkie Combo',
    category: 'combos-meals',
    price: 210,
    originalPrice: 280,
    savingsAmount: 70,
    description: 'Traditional Mysore Royal Filter Kaapi frothed in brass dabarah, served with warm Mumbai Bun Maska with Amul butter and crispy golden potato bites.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 840,
    prepTime: '15-20 mins',
    comboIncludes: [
      'Mysore Royal Filter Kaapi (180ml)',
      'Warm Bun Maska with Fresh Amul Butter',
      'Crispy Golden Herb Bites with Coconut Chutney'
    ],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
    customization: {
      sweetness: ['Traditional Sweet', 'Mild Sweet', 'No Sugar'],
      milks: [
        { name: 'Full Cream Milk', priceDelta: 0 },
        { name: 'Oat Milk', priceDelta: 45 }
      ]
    }
  },
  {
    id: 'combo-2',
    name: 'Artisan Morning Fuel Combo',
    category: 'combos-meals',
    price: 380,
    originalPrice: 495,
    savingsAmount: 115,
    description: 'Chikmagalur Balur Estate Single-Origin Hario V60 Pour-over paired with 24-hr fermented wild Truffle Mushroom sourdough toast.',
    dietary: 'veg',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 620,
    prepTime: '20 mins',
    comboIncludes: [
      'Balur Single-Origin Pour-Over (250ml)',
      'Truffle Butter Sautéed Mushroom Sourdough Toast'
    ],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    customization: {
      sizes: [
        { name: 'Regular (250ml)', priceDelta: 0 },
        { name: 'Large Mug (360ml)', priceDelta: 50 }
      ]
    }
  },
  {
    id: 'combo-3',
    name: 'Work From Café Mega Meal',
    category: 'combos-meals',
    price: 420,
    originalPrice: 545,
    savingsAmount: 125,
    description: 'The ultimate Bangalore workstation fuel: chilled cardamom jaggery shakerato, spicy grilled cottage cheese brioche, and warm dark chocolate brownie.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.8,
    ratingCount: 490,
    prepTime: '20-25 mins',
    comboIncludes: [
      'Double Shot Iced Jaggery Shakerato',
      'Peri-Peri Paneer Brioche Roll',
      'Warm 70% Callebaut Dark Chocolate Brownie'
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    customization: {
      milks: [
        { name: 'Full Cream Milk', priceDelta: 0 },
        { name: 'Oat Milk Cream', priceDelta: 40 }
      ]
    }
  },
  {
    id: 'combo-4',
    name: 'Chai & Chomp High-Tea Combo',
    category: 'combos-meals',
    price: 295,
    originalPrice: 385,
    savingsAmount: 90,
    description: 'Ginger lemongrass Irani kadak chai served with buttery flaky pistachio cardamom cruffin and warm toasted bun maska with mixed fruit jam.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 910,
    prepTime: '15 mins',
    comboIncludes: [
      'Mumbai Kadak Masala Chai Pot (250ml)',
      'Pistachio Cardamom Flaky Cruffin',
      'Classic Bun Maska Jam'
    ],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
    customization: {
      sweetness: ['Sweet (Kadak style)', 'Less Sweet', 'Sugar Free']
    }
  },
  {
    id: 'combo-5',
    name: 'Couple Roastery Date Combo',
    category: 'combos-meals',
    price: 480,
    originalPrice: 620,
    savingsAmount: 140,
    description: 'Perfect for two coffee lovers: Two handcrafted artisan coffees (Spanish Latte or Filter Kaapi) paired with two gourmet bakery selections.',
    dietary: 'veg',
    isChefSpecial: true,
    rating: 5.0,
    ratingCount: 350,
    prepTime: '20 mins',
    comboIncludes: [
      '2x Signature Hot / Iced Lattes (300ml each)',
      'Choice of Sourdough Toast or Fresh Cruffin Duo'
    ],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    customization: {
      sweetness: ['Standard Sweetness', 'Unsweetened', 'Add Jaggery']
    }
  },
  {
    id: 'combo-6',
    name: 'Guilt-Free Healthy Brunch Combo',
    category: 'combos-meals',
    price: 460,
    originalPrice: 590,
    savingsAmount: 130,
    description: 'Refreshing 18-hr steeped citrus cold brew tonic, creamy Hass avocado sourdough toast, and slow-baked granola wild honey Greek yogurt bowl.',
    dietary: 'veg',
    isChefSpecial: true,
    rating: 4.8,
    ratingCount: 280,
    prepTime: '15-20 mins',
    comboIncludes: [
      'Citrus Cold Brew Tonic (300ml)',
      'Hass Avocado & Whipped Ricotta Toast',
      'Almond Berry Granola Chia Bowl'
    ],
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'combo-7',
    name: 'Smoked Chicken Roast & Brew Box',
    category: 'combos-meals',
    price: 395,
    originalPrice: 510,
    savingsAmount: 115,
    description: 'Tender pulled chicken tikka in toasted brioche with mint mayo, paired with a bold single-origin cold brew and freshly baked sea salt cookie.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.8,
    ratingCount: 410,
    prepTime: '20 mins',
    comboIncludes: [
      'Smoked Tikka Chicken Brioche Roll',
      'Single-Origin Iced Cold Brew (300ml)',
      'Belgian Dark Chocolate Sea Salt Cookie'
    ],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'combo-8',
    name: 'Chettinad Pepper Chicken Roastery Feast Combo',
    category: 'combos-meals',
    price: 445,
    originalPrice: 580,
    savingsAmount: 135,
    description: 'Tender shredded Chettinad pepper chicken on sourdough melt with garlic aioli, paired with single-origin iced cold brew and a warm dark chocolate sea salt brownie.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 420,
    prepTime: '20 mins',
    comboIncludes: [
      'Chettinad Pepper Chicken Sourdough Melt',
      'Single-Origin 18-hr Cold Brew (300ml)',
      'Warm 70% Callebaut Dark Chocolate Brownie'
    ],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'combo-9',
    name: 'British Roastery Brekkie & Brew Box',
    category: 'combos-meals',
    price: 425,
    originalPrice: 550,
    savingsAmount: 125,
    description: 'Classic farm eggs benedict with smoked chicken ham, warm buttered sourdough soldiers, and a creamy double-shot Spanish latte or filter kaapi.',
    dietary: 'non-veg',
    rating: 4.9,
    ratingCount: 310,
    prepTime: '20 mins',
    comboIncludes: [
      'Eggs Benedict with Smoked Chicken Ham',
      'Spanish Iced Latte or Mysore Filter Kaapi',
      'Crispy Butter Sourdough Soldiers'
    ],
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop'
  },

  // Signature Coffees
  {
    id: 'c1',
    name: 'Mysore Royal Filter Kaapi',
    category: 'signature-coffee',
    price: 120,
    description: 'Traditional Chikmagalur dark roast blend with 15% roasted chicory, brewed in brass dabarah and frothed with hot rich milk.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1680,
    prepTime: '5-8 mins',
    roastLevel: 'Dark',
    brewMethod: 'Brass Dabarah Filter',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    customization: {
      sweetness: ['Traditional Sweet', 'Mild Sweet', 'No Sugar'],
      milks: [
        { name: 'Full Cream Milk', priceDelta: 0 },
        { name: 'Oat Milk', priceDelta: 45 },
        { name: 'Almond Milk', priceDelta: 45 }
      ]
    }
  },
  {
    id: 'c2',
    name: 'Chikmagalur Estate Pour-Over',
    category: 'signature-coffee',
    price: 210,
    description: 'Single-origin washed Arabica from Balur Estate. Tasting notes of dried figs, mandarin orange zest, and toasted hazelnut finish.',
    dietary: 'vegan',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 740,
    prepTime: '8-10 mins',
    roastLevel: 'Medium',
    brewMethod: 'Hario V60',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    customization: {
      sizes: [
        { name: 'Regular (250ml)', priceDelta: 0 },
        { name: 'Large Mug (360ml)', priceDelta: 50 }
      ],
      sweetness: ['Unsweetened (Recommended)', 'Add Demerara Sugar', 'Add Honey +₹20']
    }
  },
  {
    id: 'c3',
    name: 'Iced Jaggery Shakerato',
    category: 'signature-coffee',
    price: 195,
    description: 'Double shot espresso shaken vigorously over ice with organic crushed palm jaggery, cardamom extract, and a float of cold cream.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.8,
    ratingCount: 920,
    prepTime: '6-8 mins',
    roastLevel: 'Medium',
    brewMethod: 'Espresso Bar',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    customization: {
      milks: [
        { name: 'Dairy Cream', priceDelta: 0 },
        { name: 'Oat Milk Cream', priceDelta: 40 }
      ],
      extras: [
        { name: 'Extra Espresso Shot', priceDelta: 50 },
        { name: 'Extra Cardamom Foam', priceDelta: 25 }
      ]
    }
  },
  {
    id: 'c4',
    name: 'Spiced Cold Brew Tonic',
    category: 'signature-coffee',
    price: 230,
    description: '20-hour steep single origin cold brew poured over sparkling artisanal tonic, fresh Valencia orange slice, and roasted star anise.',
    dietary: 'vegan',
    rating: 4.8,
    ratingCount: 460,
    prepTime: '5 mins',
    roastLevel: 'Light',
    brewMethod: 'Slow Cold Drip',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c5',
    name: 'Sea Salt Caramel Latte',
    category: 'signature-coffee',
    price: 225,
    description: 'Double espresso blended with house-made slow-cooked caramel syrup, micro-textured steamed milk, and a dusting of pink rock salt.',
    dietary: 'veg',
    rating: 4.9,
    ratingCount: 810,
    prepTime: '8-10 mins',
    roastLevel: 'Medium',
    brewMethod: 'Espresso Bar',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
    customization: {
      sizes: [
        { name: 'Regular (8oz)', priceDelta: 0 },
        { name: 'Grande (12oz)', priceDelta: 45 }
      ],
      milks: [
        { name: 'Whole Cow Milk', priceDelta: 0 },
        { name: 'Oat Milk', priceDelta: 45 },
        { name: 'Almond Milk', priceDelta: 45 }
      ],
      extras: [
        { name: 'Extra Shot Espresso', priceDelta: 50 },
        { name: 'Whipped Cream', priceDelta: 30 }
      ]
    }
  },
  {
    id: 'c6',
    name: 'Spanish Cortado',
    category: 'signature-coffee',
    price: 160,
    description: 'Equal parts dense double espresso and warm silky milk foam served in a fluted Gibraltar glass. Bold and balanced.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 530,
    prepTime: '6-8 mins',
    roastLevel: 'Dark',
    brewMethod: 'La Marzocco Espresso',
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe9d2b?q=80&w=800&auto=format&fit=crop',
    customization: {
      milks: [
        { name: 'Standard Whole Milk', priceDelta: 0 },
        { name: 'Oat Milk', priceDelta: 35 }
      ]
    }
  },

  // Artisan Chais & Teas
  {
    id: 't1',
    name: 'Mumbai Irani Kadak Chai',
    category: 'artisan-chai',
    price: 85,
    description: 'Slow-simmered Assam CTC tea brewed with freshly pounded green cardamom, ginger root, and lemongrass. Strong, aromatic, and soul-warming.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1420,
    prepTime: '5-8 mins',
    brewMethod: 'Copper Pot Boil',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
    customization: {
      sweetness: ['Full Sweet', 'Medium Sweet', 'No Sugar']
    }
  },
  {
    id: 't2',
    name: 'Royal Kashmiri Saffron Kahwa',
    category: 'artisan-chai',
    price: 150,
    description: 'Kashmir Valley green tea leaves gently simmered with pure saffron threads, crushed whole cinnamon, cloves, and slivered Kashmiri almonds.',
    dietary: 'vegan',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 390,
    prepTime: '8-10 mins',
    brewMethod: 'Brass Samovar Infusion',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Nilgiri Wild Lemongrass & Hibiscus',
    category: 'artisan-chai',
    price: 165,
    description: 'Ruby red iced herbal infusion with organic Nilgiri mountain lemongrass, dried Egyptian hibiscus blossoms, and a hint of mint.',
    dietary: 'vegan',
    rating: 4.8,
    ratingCount: 310,
    prepTime: '5 mins',
    brewMethod: 'Cold Infusion',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop'
  },

  // Sourdough & Sandwiches
  {
    id: 's1',
    name: 'Truffle Mushroom Sourdough Toast',
    category: 'sourdough-bites',
    price: 285,
    description: 'Toasted wild-ferment sourdough topped with pan-seared cremini mushrooms, slow roasted garlic confit, thyme, and truffle mascarpone drizzle.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 940,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Add Organic Poached Egg', priceDelta: 45 },
        { name: 'Extra Truffle Glaze', priceDelta: 50 }
      ]
    }
  },
  {
    id: 's2',
    name: 'Avocado & Gunpowder Rye Toast',
    category: 'sourdough-bites',
    price: 310,
    description: 'Chunky smashed Hass avocado on dark rye sourdough, seasoned with cold-pressed coconut oil, fiery South Indian Podi masala, and toasted sesame.',
    dietary: 'vegan',
    isChefSpecial: true,
    rating: 4.8,
    ratingCount: 680,
    prepTime: '10-12 mins',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Add Feta Crumbles', priceDelta: 50 },
        { name: 'Extra Avocado Mash', priceDelta: 70 }
      ]
    }
  },
  {
    id: 's3',
    name: 'Spiced Butter Chicken Croissant',
    category: 'sourdough-bites',
    price: 295,
    description: 'Golden flaky French butter croissant generously filled with shredded tandoori chicken simmered in rich makhani gravy, pickled onions, and micro-greens.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1150,
    prepTime: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's4',
    name: 'Pesto Bocconcini Sourdough Panini',
    category: 'sourdough-bites',
    price: 270,
    description: 'Fresh buffalo mozzarella bocconcini, slow-roasted sun-dried tomatoes, house basil walnut pesto, and aged balsamic glaze pressed in sourdough.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 520,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's5',
    name: 'Madras Chettinad Pepper Chicken Sourdough Melt',
    category: 'sourdough-bites',
    price: 295,
    description: 'Slow-cooked pulled chicken tossed with roasted Tellicherry black peppercorns, fennel seeds, and crisp curry leaves, topped with molten sharp cheddar on toasted country sourdough.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1290,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Extra Melted Cheddar', priceDelta: 45 },
        { name: 'Caramelized Onions', priceDelta: 30 }
      ]
    }
  },
  {
    id: 's6',
    name: 'Smoked Chicken & Avocado Club Sourdough',
    category: 'sourdough-bites',
    price: 340,
    description: 'Artisan whole-wheat sourdough triple-layered with herb-smoked chicken breast, crispy chicken bacon strips, Haas avocado slices, sun-ripened tomatoes, and Dijon aioli.',
    dietary: 'non-veg',
    isChefSpecial: true,
    rating: 4.8,
    ratingCount: 640,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=800&auto=format&fit=crop'
  },

  // Rolls & Buns
  {
    id: 'b1',
    name: 'Classic Irani Bun Maska with Jam',
    category: 'rolls-buns',
    price: 110,
    description: 'Warm, cloud-soft cardamom milk bun generously slathered with salted churned Amul butter and sweet berry jam. Best paired with Kadak Chai.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1890,
    prepTime: '5 mins',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Extra Maska (Butter)', priceDelta: 25 },
        { name: 'Cheese Slice Grill', priceDelta: 35 }
      ]
    }
  },
  {
    id: 'b2',
    name: 'Peri-Peri Paneer Brioche Roll',
    category: 'rolls-buns',
    price: 240,
    description: 'Charred Malai Paneer cubes tossed in house peri-peri dust, crunchy purple cabbage slaw, smoked paprika mayo inside a butter-toasted brioche sub.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 670,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'b3',
    name: 'Smoked Chicken & Cheddar Brioche Roll',
    category: 'rolls-buns',
    price: 275,
    description: 'Hickory-wood smoked chicken strips, melted mature English cheddar, pickled jalapeño relish, and whole grain honey mustard.',
    dietary: 'non-veg',
    rating: 4.9,
    ratingCount: 780,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'b4',
    name: 'Butter Chicken Keema Bun Maska',
    category: 'rolls-buns',
    price: 260,
    description: 'Aromatic minced chicken keema slow-cooked with fresh ginger, green peas, Kasuri methi, and rich butter masala, served stuffed inside a warm, butter-toasted Irani bun.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 980,
    prepTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Extra Keema Portion', priceDelta: 65 },
        { name: 'Double Amul Butter Grill', priceDelta: 30 }
      ]
    }
  },
  {
    id: 'b5',
    name: 'Crispy Guntur Chilli Chicken Brioche Burger',
    category: 'rolls-buns',
    price: 285,
    description: 'Crunchy spiced buttermilk fried chicken breast dipped in sweet & fiery Guntur chilli hot honey, pickled purple slaw, and roasted garlic aioli inside a toasted brioche bun.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1120,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'b6',
    name: 'Mangalorean Chicken Ghee Roast Malabar Roll',
    category: 'rolls-buns',
    price: 295,
    description: 'Tender chicken morsels roasted in pure desi ghee with Byadagi chillies and roasted spices, rolled inside a flaky Kerala layered parotta with mint curd and pickled shallots.',
    dietary: 'non-veg',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 740,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop'
  },

  // Desserts & Bakes
  {
    id: 'd1',
    name: 'Pistachio & Cardamom Cruffin',
    category: 'desserts-bakes',
    price: 190,
    description: 'Hybrid croissant-muffin rolled in fine raw sugar, injected with silky green cardamom pastry cream, capped with roasted slivered pistachios.',
    dietary: 'veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 1240,
    prepTime: '5 mins',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd2',
    name: 'Chikmagalur Espresso Tiramisu Tub',
    category: 'desserts-bakes',
    price: 260,
    description: 'Italian Savoiardi ladyfingers soaked in fresh single-origin espresso and dark rum aroma, layered with whipped mascarpone cream and Valrhona cocoa.',
    dietary: 'veg',
    isChefSpecial: true,
    rating: 5.0,
    ratingCount: 860,
    prepTime: '5 mins',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd3',
    name: 'Warm 70% Dark Chocolate Brownie',
    category: 'desserts-bakes',
    price: 180,
    description: 'Fudgy Callebaut Belgian dark chocolate brownie with walnuts, sprinkled with Maldon flaky sea salt and served with Madagascar vanilla cream.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 720,
    prepTime: '8 mins',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Add Vanilla Gelato Scoop', priceDelta: 60 }
      ]
    }
  },

  // All-Day Brekkie
  {
    id: 'a1',
    name: 'Turkish Poached Eggs with Herb Labneh',
    category: 'all-day-brekkie',
    price: 280,
    description: 'Two soft farm eggs poached to perfection on garlic-infused strained yogurt, drenched in warm smoky Aleppo chilli butter with toasted sourdough.',
    dietary: 'non-veg',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 540,
    prepTime: '15-18 mins',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'a2',
    name: 'Parsi Akuri Scramble with Butter Pav',
    category: 'all-day-brekkie',
    price: 220,
    description: 'Traditional Parsi-style creamy scrambled eggs tossed with browned onions, fresh ginger, slit green chillies, and cilantro, served with 2 buttery pavs.',
    dietary: 'non-veg',
    rating: 4.8,
    ratingCount: 610,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'a3',
    name: 'Almond Berry Granola & Chia Bowl',
    category: 'all-day-brekkie',
    price: 260,
    description: 'Slow-baked rolled oats with roasted almonds and pumpkin seeds over creamy wild honey Greek yogurt, topped with fresh strawberries and chia.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 430,
    prepTime: '8-10 mins',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'a4',
    name: 'Classic Eggs Benedict with Smoked Chicken Ham',
    category: 'all-day-brekkie',
    price: 320,
    description: 'Two perfectly poached farm eggs over premium smoked chicken ham and wilted baby spinach on butter-toasted English brioche, drenched in golden house Hollandaise.',
    dietary: 'non-veg',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 670,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'a5',
    name: 'Mediterranean Shakshuka with Spiced Chicken Chorizo',
    category: 'all-day-brekkie',
    price: 310,
    description: 'Two farm eggs baked in a cumin-scented tomato, bell pepper, and onion ragout with minced spiced chicken chorizo, topped with Greek feta and toasted sourdough.',
    dietary: 'non-veg',
    rating: 4.8,
    ratingCount: 510,
    prepTime: '15-18 mins',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=800&auto=format&fit=crop'
  },

  // 10 New Healthy & Clean Wellness Items
  {
    id: 'h1',
    name: 'Heritage Sprouted Moong & Sundal Salad',
    category: 'healthy-wellness',
    price: 210,
    description: 'Tender sprouted green moong, boiled black chickpeas, fresh coconut shavings, pomegranate arils, crispy curry leaves, and cold-pressed lemon ginger dressing.',
    dietary: 'vegan',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 580,
    prepTime: '8-10 mins',
    calories: 240,
    healthTag: '12g Protein • High Fiber',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Add Crumbled Feta', priceDelta: 40 },
        { name: 'Extra Sprouted Moong', priceDelta: 30 }
      ]
    }
  },
  {
    id: 'h2',
    name: 'Steamed Foxtail Millet & Podi Idli Bowl',
    category: 'healthy-wellness',
    price: 195,
    description: 'Hand-ground foxtail millet mini idlis gently tossed with cold-pressed gingelly oil, organic roasted flaxseed gunpowder (podi), served with fresh mint coconut chutney.',
    dietary: 'vegan',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 840,
    prepTime: '10 mins',
    calories: 280,
    healthTag: 'Millet Superfood • Low GI',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h3',
    name: 'Spiced Ragi Malt & Jaggery Elixir',
    category: 'healthy-wellness',
    price: 150,
    description: 'Traditional finger millet (Ragi) slow-simmered with creamy almond milk, crushed green cardamom, and organic palm jaggery. Rich in natural calcium and iron.',
    dietary: 'vegan',
    rating: 4.8,
    ratingCount: 690,
    prepTime: '5-8 mins',
    calories: 160,
    healthTag: '100% Whole Grain • Iron & Calcium',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    customization: {
      sweetness: ['Mild Palm Jaggery', 'Unsweetened', 'Add Crushed Almonds +₹25']
    }
  },
  {
    id: 'h4',
    name: 'Tender Coconut Cold Brew Fizz',
    category: 'healthy-wellness',
    price: 220,
    description: 'Fresh Pollachi tender coconut water poured over 18-hour single-origin Balur cold brew, floating with tender coconut malai ribbons and fresh garden mint.',
    dietary: 'vegan',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 920,
    prepTime: '5 mins',
    calories: 85,
    healthTag: 'Natural Electrolytes • Zero Added Sugar',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h5',
    name: 'Madras Quinoa & Vegetable Upma Bowl',
    category: 'healthy-wellness',
    price: 235,
    description: 'Fluffy organic white quinoa tempered with crackling mustard seeds, roasted cashews, ginger, fresh curry leaves, and tender garden carrots & peas. Served with charred tomato relish.',
    dietary: 'vegan',
    rating: 4.8,
    ratingCount: 490,
    prepTime: '12-15 mins',
    calories: 310,
    healthTag: 'Complete Protein • Gluten-Free',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h6',
    name: 'Charred Tofu & Smashed Avocado Sourdough',
    category: 'healthy-wellness',
    price: 320,
    description: 'Marinated organic soy tofu grilled with black pepper & turmeric, chunky Hass avocado mash, microgreens, and pumpkin seeds on seeded 24-hr wild sourdough.',
    dietary: 'vegan',
    isChefSpecial: true,
    rating: 4.9,
    ratingCount: 670,
    prepTime: '12-15 mins',
    calories: 380,
    healthTag: '18g Plant Protein • Heart Healthy',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Extra Avocado Mash', priceDelta: 60 },
        { name: 'Grilled Herb Mushrooms', priceDelta: 50 }
      ]
    }
  },
  {
    id: 'h7',
    name: 'Wild Moringa & Matcha Immunity Latte',
    category: 'healthy-wellness',
    price: 190,
    description: 'Organic Tamil Nadu shade-dried moringa leaf blended with ceremonial Japanese matcha, steamed oat milk, and a gentle hint of wild ginger blossom honey.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 380,
    prepTime: '5-8 mins',
    calories: 120,
    healthTag: 'Detox & Immunity • High Antioxidants',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    customization: {
      milks: [
        { name: 'Oat Milk', priceDelta: 0 },
        { name: 'Almond Milk', priceDelta: 20 },
        { name: 'Soy Milk', priceDelta: 20 }
      ]
    }
  },
  {
    id: 'h8',
    name: 'Beetroot Berry & Chia Superfood Smoothie Bowl',
    category: 'healthy-wellness',
    price: 275,
    description: 'Velvety chilled beetroot, wild dark blueberries, and frozen banana puree topped with chia seeds, golden flax, raw cacao nibs, and toasted coconut flakes.',
    dietary: 'vegan',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 710,
    prepTime: '8-10 mins',
    calories: 260,
    healthTag: 'Gut Health • Antioxidant Rich',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h9',
    name: 'Cold-Pressed Green Prana Elixir (300ml)',
    category: 'healthy-wellness',
    price: 175,
    description: 'Raw unpasteurized slow-pressed celery, organic baby spinach, crisp cucumber, green apple, Indian gooseberry (Amla), and crushed fresh ginger. 100% natural.',
    dietary: 'vegan',
    rating: 4.9,
    ratingCount: 530,
    prepTime: '5 mins',
    calories: 65,
    healthTag: 'No Added Sugar • 100% Raw Juice',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h10',
    name: 'Paneer & Sprouted Methi Protein Wrap',
    category: 'healthy-wellness',
    price: 265,
    description: 'Low-carb multigrain flatbread loaded with high-protein grilled cottage cheese, sprouted fenugreek greens, pickled beetroot, and roasted sesame hung curd dip.',
    dietary: 'veg',
    rating: 4.8,
    ratingCount: 640,
    prepTime: '12-15 mins',
    calories: 340,
    healthTag: '21g Protein • Low Carb',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'h11',
    name: 'Tandoori Grilled Chicken & Avocado Salad Bowl',
    category: 'healthy-wellness',
    price: 290,
    description: 'Warm clay-oven spiced grilled chicken breast strips, sliced Hass avocado, English cucumber, cherry tomatoes, crisp greens, and cold-pressed citrus lemon vinaigrette.',
    dietary: 'non-veg',
    isBestseller: true,
    rating: 4.9,
    ratingCount: 630,
    prepTime: '12 mins',
    calories: 380,
    healthTag: '32g Protein • Low Carb',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    customization: {
      extras: [
        { name: 'Extra Grilled Chicken Breast', priceDelta: 75 },
        { name: 'Extra Avocado Slices', priceDelta: 60 }
      ]
    }
  },
  {
    id: 'h12',
    name: 'Herb Roasted Chicken & Quinoa Superfood Bowl',
    category: 'healthy-wellness',
    price: 280,
    description: 'Rosemary-thyme roasted chicken, fluffy tri-color Andean quinoa, steamed edamame beans, roasted pumpkin, and creamy toasted sesame tahini dressing.',
    dietary: 'non-veg',
    rating: 4.8,
    ratingCount: 490,
    prepTime: '12-15 mins',
    calories: 360,
    healthTag: '28g Protein • High Fiber',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop'
  }
];

export const CATEGORIES: { id: MenuItem['category']; label: string; icon: string }[] = [
  { id: 'all', label: 'All Items', icon: 'Sparkles' },
  { id: 'healthy-wellness', label: '🥗 Healthy & Clean (New)', icon: 'Heart' },
  { id: 'combos-meals', label: '⚡ Value Combos & Meals', icon: 'Flame' },
  { id: 'signature-coffee', label: 'Signature Coffee', icon: 'Coffee' },
  { id: 'artisan-chai', label: 'Artisan Chai & Tea', icon: 'Flame' },
  { id: 'sourdough-bites', label: 'Sourdough & Bites', icon: 'Sandwich' },
  { id: 'rolls-buns', label: 'Buns & Rolls', icon: 'Croissant' },
  { id: 'desserts-bakes', label: 'Desserts & Bakes', icon: 'Cake' },
  { id: 'all-day-brekkie', label: 'All-Day Breakfast', icon: 'Sun' }
];

export const DEFAULT_ADDRESSES: DeliveryAddress[] = [
  {
    id: 'addr-1',
    type: 'home',
    label: 'Home',
    address: 'Flat 402, Raintree Residences, Poes Garden, Alwarpet, Chennai',
    landmark: 'Opposite Kasturi Ranga Road Park',
    distanceKm: 1.2,
    etaMins: 22
  },
  {
    id: 'addr-2',
    type: 'work',
    label: 'Office / Tech Park',
    address: 'Tower B, 6th Floor, Olympia Tech Park, Guindy, Chennai',
    landmark: 'Near Guindy Metro Station',
    distanceKm: 4.5,
    etaMins: 32
  },
  {
    id: 'addr-3',
    type: 'other',
    label: 'Studio',
    address: 'Villa 18, 4th Main Road, Besant Nagar, Chennai',
    landmark: 'Behind Coakers Cafe & Elliot\'s Beach',
    distanceKm: 2.8,
    etaMins: 25
  }
];

export const POPULAR_COUPONS = [
  {
    code: 'MURALI50',
    title: 'Flat ₹50 OFF',
    description: 'Special MURALI50 offer on orders above ₹199 across whole menu',
    minOrder: 199,
    discountAmount: 50,
    tag: 'SPECIAL OFFER'
  },
  {
    code: 'FIRSTSIP',
    title: '15% OFF up to ₹150',
    description: 'Special welcome offer for first-time orders',
    minOrder: 150,
    percentage: 15,
    tag: 'WELCOME BONUS'
  },
  {
    code: 'COMBOSAVER',
    title: 'Extra ₹75 OFF on Combos',
    description: 'Valid on any 2 or more Combo Meals',
    minOrder: 350,
    discountAmount: 75,
    tag: 'COMBO SPECIAL'
  }
];

export const MOCK_DELIVERY_PARTNER = {
  name: 'Ramesh Kumar',
  phone: '+91 98451 90234',
  vehicle: 'Ather 450X Electric (TN-01-EK-8921)',
  rating: 4.9,
  deliveriesCount: 1420,
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
};

export const CAFE_INFO = {
  name: 'The Madras',
  tagline: 'Artisanal Roasts • Heritage Brews • Healthy Eats',
  address: 'No. 14, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600006',
  phone: '+91 98450 23891',
  email: 'hello@themadras.in',
  hours: 'Mon – Sun: 7:30 AM – 11:00 PM',
  wifiSpeed: '150 Mbps High-Speed Fiber (Work Friendly)',
  seatingCapacity: '75 Seats across Indoor Lounge & Sun Veranda'
};

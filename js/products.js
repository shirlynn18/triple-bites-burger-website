const products = [
    // Burgers
    {
        id: "burger1",
        name: "Sunny Stack Burger",
        price: 14.99,
        category: "Burgers",
        image: "images/burger1.png",
        ingredients: "toasted bun, sunny-side-up egg, beef patty, cheddar cheese, lettuce, tomato, and sauce",
        addons: [
            { label: "Extra Egg", price: 1.50 },
            { label: "Extra Cheese", price: 1.00 }
        ],
        removals: ["No Lettuce", "No Tomato", "No Sauce"]
    },

    {
        id: "burger2",
        name: "Blazing Triple Bites",
        price: 16.99,
        category: "Burgers",
        image: "images/burger2.png",
        ingredients: "spicy sauce, triple beef patties, jalapeños, cheese, lettuce, and toasted bun",
        addons: [
            { label: "Extra Patty", price: 3.00 },
            { label: "Extra Jalapeños", price: 1.00 }
        ],
        removals: ["No Jalapeños", "No Lettuce", "No Spicy Sauce"]
    },

    {
        id: "burger3",
        name: "Vegan Delight Burger",
        price: 15.99,
        category: "Burgers",
        image: "images/burger3.png",
        ingredients: "vegan patty, lettuce, tomato, pickles, onion, vegan mayo, whole wheat bun",
        addons: [
            { label: "Extra Vegan Patty", price: 3.50 },
            { label: "Add Avocado", price: 2.00 }
        ],
        removals: ["No Mayo", "No Pickles", "No Onions"]
    },

    {
        id: "burger4",
        name: "Chicken Burger",
        price: 6.90,
        category: "Burgers",
        image: "images/burger4.png",
        ingredients: "fried chicken patty, lettuce, mayo, sesame bun",
        addons: [
            { label: "Extra Mayo", price: 0.50 },
            { label: "Add Cheese", price: 1.00 }
        ],
        removals: ["No Lettuce", "No Mayo"]
    },

    {
        id: "burger5",
        name: "Grilled Chicken Burger",
        price: 13.30,
        category: "Burgers",
        image: "images/burger5.png",
        ingredients: "grilled chicken breast, lettuce, tomato, garlic mayo, toasted bun",
        addons: [
            { label: "Extra Garlic Mayo", price: 0.80 },
            { label: "Add Cheese", price: 1.00 }
        ],
        removals: ["No Garlic Mayo", "No Lettuce", "No Tomato"]
    },

    {
        id: "burger6",
        name: "Filet-O-Fish",
        price: 9.30,
        category: "Burgers",
        image: "images/burger6.png",
        ingredients: "steamed bun, fish fillet, tartar sauce, cheddar cheese",
        addons: [
            { label: "Extra Cheese", price: 1.00 },
            { label: "Add Lettuce", price: 0.80 }
        ],
        removals: ["No Tartar Sauce", "No Cheese"]
    },

    {
        id: "burger7",
        name: "Beef Burger",
        price: 6.90,
        category: "Burgers",
        image: "images/burger7.png",
        ingredients: "beef patty, pickles, onion, ketchup, mustard, bun",
        addons: [
            { label: "Extra Patty", price: 3.00 },
            { label: "Add Cheese", price: 1.00 }
        ],
        removals: ["No Pickles", "No Onions", "No Mustard"]
    },

    {
        id: "burger8",
        name: "Cheeseburger",
        price: 7.80,
        category: "Burgers",
        image: "images/burger8.png",
        ingredients: "beef patty, cheddar cheese, pickles, onions, ketchup, mustard, sesame bun",
        addons: [
            { label: "Extra Cheese", price: 1.00 }
        ],
        removals: ["No Pickles", "No Onions", "No Ketchup", "No Mustard"]
    },

    {
        id: "burger9",
        name: "Double Cheeseburger",
        price: 11.20,
        category: "Burgers",
        image: "images/burger9.png",
        ingredients: "regular bun, 2 beef patties, 2 slices of cheddar cheese, pickles, onions, ketchup, and mustard",
        addons: [
            { label: "Extra Cheddar Cheese", price: 1.00 },
            { label: "Extra Beef Patty", price: 3.00 }
        ],
        removals: ["No Pickles", "No Onions", "No Ketchup", "No Mustard"]
    },

    // Fried Chicken
    {
        id: "chicken1",
        name: "3 Pieces Chicken",
        price: 20.99,
        category: "Fried Chicken",
        image: "images/chicken1.png",
        ingredients: "crispy fried chicken with secret herbs & spices",
    },

    {
        id: "chicken2",
        name: "5 Pieces Chicken",
        price: 31.99,
        category: "Fried Chicken",
        image: "images/chicken2.png",
        ingredients: "5 pieces of crispy fried chicken, golden and juicy",
    },

    {
        id: "chicken3",
        name: "8 Pieces Chicken",
        price: 51.99,
        category: "Fried Chicken",
        image: "images/chicken3.png",
        ingredients: "8 pieces of our signature crispy fried chicken",
    },

    // Beverages
    {
        id: "beverage1",
        name: "Iced Milo",
        price: 5.30,
        category: "Beverages",
        image: "images/beverage1.png",
        ingredients: "iced chocolate malt drink, served chilled",
    },

    {
        id: "beverage2",
        name: "Coca-Cola (Large)",
        price: 4.80,
        category: "Beverages",
        image: "images/beverage2.png",
        ingredients: "classic Coca-Cola with ice",

    },

    {
        id: "beverage3",
        name: "Sprite (Large)",
        price: 4.80,
        category: "Beverages",
        image: "images/beverage3.png",
        ingredients: "lemon-lime soda, served with ice",
    },

    {
        id: "beverage4",
        name: "Hot Nescafe",
        price: 4.99,
        category: "Beverages",
        image: "images/beverage4.png",
        ingredients: "hot brewed Nescafe coffee",
    },

    {
        id: "beverage5",
        name: "Hot Teh Tarik",
        price: 5.60,
        category: "Beverages",
        image: "images/beverage5.png",
        ingredients: "Malaysian pulled milk tea, served hot",
    },

    {
        id: "beverage6",
        name: "Hot Neslo",
        price: 5.60,
        category: "Beverages",
        image: "images/beverage6.png",
        ingredients: "blend of Nescafe and Milo, served hot",

    },

    // Desserts
    {
        id: "dessert1",
        name: "Chocolate Sundae",
        price: 4.90,
        category: "Desserts",
        image: "images/dessert1.png",
        ingredients: "vanilla ice cream with chocolate syrup",
    },

    {
        id: "dessert2",
        name: "Strawberry Sundae",
        price: 4.90,
        category: "Desserts",
        image: "images/dessert2.png",
        ingredients: "vanilla ice cream with strawberry syrup",
    },

    {
        id: "dessert3",
        name: "Sundae Cone",
        price: 1.50,
        category: "Desserts",
        image: "images/dessert3.png",
        ingredients: "soft serve vanilla cone",
    },

    {
        id: "dessert4",
        name: "Apple Pie",
        price: 5.90,
        category: "Desserts",
        image: "images/dessert4.png",
        ingredients: "warm apple filling in a crispy pastry shell",
    },

    // Sides
    {
        id: "side1",
        name: "Fries",
        price: 6.10,
        category: "Sides",
        image: "images/side1.png",
        ingredients: "crispy golden fries, lightly salted",
    },

    {
        id: "side2",
        name: "Mashed Potato",
        price: 3.99,
        category: "Sides",
        image: "images/side2.png",
        ingredients: "mashed potatoes with brown gravy",
    },

    {
        id: "side3",
        name: "Coleslaw",
        price: 3.99,
        category: "Sides",
        image: "images/side3.png",
        ingredients: "fresh cabbage slaw with creamy dressing",
    },

    {
        id: "side4",
        name: "8 Pieces Nuggets",
        price: 12.20,
        category: "Sides",
        image: "images/side4.png",
        ingredients: "8 crispy chicken nuggets",
    },

    {
        id: "side5",
        name: "12 Pieces Nuggets",
        price: 16.90,
        category: "Sides",
        image: "images/side5.png",
        ingredients: "12 crispy chicken nuggets",
    }
];


export interface Car {
    id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    image: string;
    hint: string;
    leasePrice: string;
    specs: {
        mileage: string;
        year: string;
        transmission: string;
        engine: string;
        color: string;
    };
    features: string[];
}

export const cars: Car[] = [
    {
        id: 'bmw-x3-30',
        name: 'BMW X3 3.0',
        shortDescription: 'Experience the perfect blend of luxury, performance, and versatility.',
        longDescription: 'The BMW X3 3.0 offers a dynamic driving experience with its powerful 3.0-liter engine and xDrive all-wheel-drive system. The interior is crafted with premium materials, offering advanced technology and comfort for both driver and passengers. Perfect for city driving and weekend getaways.',
        image: 'https://placehold.co/800x600.png',
        hint: 'blue suv',
        leasePrice: 'DKK 6,500 / month',
        specs: {
            mileage: '15,000 km',
            year: '2023',
            transmission: 'Automatic',
            engine: '3.0L 6-Cylinder',
            color: 'Phytonic Blue',
        },
        features: ['Sunroof', 'Heated Seats', '360° Camera', 'Harman Kardon Sound', 'Adaptive Cruise Control', 'Leather Upholstery'],
    },
    {
        id: 'mercedes-s63-amg',
        name: 'Mercedes S63 AMG',
        shortDescription: 'The pinnacle of luxury sedans, combining breathtaking performance with ultimate comfort.',
        longDescription: 'The Mercedes-Benz S63 AMG is more than just a car; it\'s a statement. With a handcrafted 4.0L V8 biturbo engine, it delivers exhilarating power. The exquisite interior features the finest leather, wood trim, and state-of-the-art technology, including dual 12.3-inch displays and ambient lighting with 64 colors.',
        image: 'https://placehold.co/800x600.png',
        hint: 'black sedan',
        leasePrice: 'DKK 12,500 / month',
        specs: {
            mileage: '8,000 km',
            year: '2023',
            transmission: '9-Speed Automatic',
            engine: '4.0L V8 Biturbo',
            color: 'Obsidian Black',
        },
        features: ['Magic Body Control', 'Burmester High-End 3D Surround Sound', 'Executive Rear Seat Package', 'Night View Assist', 'Panoramic Roof'],
    },
    {
        id: 'audi-rs6-avant',
        name: 'Audi RS6 Avant',
        shortDescription: 'A high-performance wagon that perfectly combines family-friendly utility with supercar speed.',
        longDescription: 'The Audi RS6 Avant is the ultimate wolf in sheep\'s clothing. Its aggressive styling hints at the twin-turbo V8 engine that lies beneath, capable of launching it from 0-100 km/h in just 3.6 seconds. With its spacious interior, advanced MMI touch response system, and legendary quattro all-wheel drive, it\'s the only car you\'ll ever need.',
        image: 'https://placehold.co/800x600.png',
        hint: 'grey wagon',
        leasePrice: 'DKK 11,800 / month',
        specs: {
            mileage: '12,000 km',
            year: '2023',
            transmission: '8-Speed Tiptronic',
            engine: '4.0L TFSI V8',
            color: 'Nardo Gray',
        },
        features: ['RS Sport Suspension', 'HD Matrix LED Headlights', 'Bang & Olufsen 3D Sound', 'Virtual Cockpit Plus', 'Carbon Fiber Trim'],
    }
];

const tours = [
    {
        slug: 'bollywood-city-tour',
        name: 'Bollywood & City Tour',
        tagline: 'Behind the scenes of India\'s film capital',
        duration: 'Full Day · 8 hrs',
        groupSize: '2–15 people',
        category: 'Bollywood',
        coverImage: '/images/tours/tour-01.jpg',
        description: 'The tour that started it all. Since 2003, we\'ve been taking visitors inside the real Bollywood — working sets, studio floors, and the city that built the industry.',
        highlights: ['Film City studio access', 'Live set visits', 'Mumbai city landmarks', 'Local lunch included'],
        itinerary: [
            { time: '9:00 AM', activity: 'Hotel pickup' },
            { time: '10:00 AM', activity: 'Film City entrance & studio walk' },
            { time: '1:00 PM', activity: 'Lunch at local restaurant' },
            { time: '2:30 PM', activity: 'City tour – Gateway, Marine Drive' },
            { time: '5:30 PM', activity: 'Drop-off at hotel' }
        ]
    },
    {
        slug: 'dharavi-slum-tour',
        name: 'Dharavi Slum Tour',
        tagline: 'The Mumbai mainstream tourism ignores',
        duration: 'Half Day · 4 hrs',
        groupSize: '2–10 people',
        category: 'Mumbai',
        coverImage: '/images/tours/tour-02.jpg',
        description: 'Asia\'s largest urban settlement is also one of its most productive. This educational tour shows the industries, crafts, and community spirit that make Dharavi remarkable.',
        highlights: ['Recycling & manufacturing zones', 'Local craft workshops', 'Community interaction', 'Expert local guide'],
        itinerary: [
            { time: '9:00 AM', activity: 'Dharavi entry meetup' },
            { time: '9:30 AM', activity: 'Industrial zone walk' },
            { time: '11:00 AM', activity: 'Residential lanes & community' },
            { time: '12:30 PM', activity: 'Debrief & Q&A' }
        ]
    },
    {
        slug: 'heritage-walk',
        name: 'Heritage Walk',
        tagline: 'Mumbai\'s history on foot',
        duration: 'Half Day · 3 hrs',
        groupSize: '2–20 people',
        category: 'Mumbai',
        coverImage: '/images/tours/tour-03.jpg',
        description: 'Walk through Mumbai\'s colonial-era streets, Gothic architecture, and hidden cultural gems that most tourists walk past without knowing.',
        highlights: ['CST railway station', 'Colonial architecture', 'Local markets', 'Hidden temples'],
        itinerary: [
            { time: '7:00 AM', activity: 'Meeting point: CST' },
            { time: '7:30 AM', activity: 'Fort area walk' },
            { time: '9:00 AM', activity: 'Kala Ghoda art district' },
            { time: '10:00 AM', activity: 'Breakfast at Irani café' }
        ]
    },
    {
        slug: 'dabbawala-tour',
        name: 'Dabbawala Tour',
        tagline: 'The logistics miracle with zero technology',
        duration: 'Half Day · 3 hrs',
        groupSize: '2–15 people',
        category: 'Mumbai',
        coverImage: '/images/tours/tour-04.jpg',
        description: 'Watch Mumbai\'s legendary lunch delivery network in action — 5,000 workers, 200,000 deliveries daily, Six Sigma accuracy. No app. No GPS.',
        highlights: ['Live dabbawala sorting', 'Meet the workers', 'Railway station operations', 'Photo opportunities'],
        itinerary: [
            { time: '10:00 AM', activity: 'Churchgate station meetup' },
            { time: '10:30 AM', activity: 'Sorting hub visit' },
            { time: '11:30 AM', activity: 'Distribution trail walk' },
            { time: '12:30 PM', activity: 'Q&A with dabbawala supervisor' }
        ]
    },
    {
        slug: 'film-city-tour',
        name: 'Film City Tour',
        tagline: 'Where Bollywood actually gets made',
        duration: 'Half Day · 4 hrs',
        groupSize: '2–20 people',
        category: 'Bollywood',
        coverImage: '/images/tours/tour-05.jpg',
        description: 'Step inside Film City — Bollywood\'s main production hub. See active sets, costume departments, and if you\'re lucky, catch a live shoot.',
        highlights: ['Active set access', 'Costume & props department', 'Studio backlot tour', 'Possible live shoot'],
        itinerary: [
            { time: '9:00 AM', activity: 'Film City gate entry' },
            { time: '9:30 AM', activity: 'Studio floor walk' },
            { time: '11:00 AM', activity: 'Costume & props' },
            { time: '12:30 PM', activity: 'Backlot & outdoor sets' }
        ]
    },
    {
        slug: 'street-food-tour',
        name: 'Street Food Tour',
        tagline: 'Eat Mumbai like a local',
        duration: 'Half Day · 3 hrs',
        groupSize: '2–12 people',
        category: 'Food',
        coverImage: '/images/tours/tour-06.jpg',
        description: 'Vada pav, pav bhaji, bhel puri — 8 to 10 street food stops across Mumbai\'s best eating neighbourhoods.',
        highlights: ['8–10 food stops', 'Local neighbourhoods', 'Vegetarian & non-veg options', 'Food history explained'],
        itinerary: [
            { time: '6:00 PM', activity: 'Meetup at Churchgate' },
            { time: '6:30 PM', activity: 'Marine Lines food strip' },
            { time: '7:30 PM', activity: 'Chowpatty beach stalls' },
            { time: '9:00 PM', activity: 'Final stop: kulfi & paan' }
        ]
    },
    {
        slug: 'elephanta-tour',
        name: 'Elephanta Caves Tour',
        tagline: 'UNESCO heritage, one ferry ride away',
        duration: 'Full Day · 6 hrs',
        groupSize: '2–20 people',
        category: 'Heritage',
        coverImage: '/images/tours/tour-07.jpg',
        description: 'Ancient rock-cut temples dedicated to Lord Shiva on an island in Mumbai Harbour. A UNESCO World Heritage Site.',
        highlights: ['Ferry from Gateway of India', 'UNESCO cave temples', 'Trimurti sculpture', 'Arabian Sea views'],
        itinerary: [
            { time: '9:00 AM', activity: 'Gateway of India ferry departure' },
            { time: '10:00 AM', activity: 'Elephanta Island arrival' },
            { time: '10:30 AM', activity: 'Cave temple guided tour' },
            { time: '1:00 PM', activity: 'Lunch on island' },
            { time: '2:30 PM', activity: 'Return ferry' }
        ]
    },
    {
        slug: 'ajanta-ellora-tour',
        name: 'Ajanta & Ellora Caves',
        tagline: 'Two UNESCO sites in one trip',
        duration: '2 Days',
        groupSize: '2–20 people',
        category: 'Heritage',
        coverImage: '/images/tours/tour-08.jpg',
        description: 'The rock-cut cave temples of Ajanta and Ellora are among the greatest archaeological sites on earth. We handle transport, stays, and guided access.',
        highlights: ['Ajanta Buddhist caves', 'Ellora Hindu & Jain caves', 'Overnight in Aurangabad', 'Expert archaeologist guide'],
        itinerary: [
            { time: 'Day 1 AM', activity: 'Mumbai departure' },
            { time: 'Day 1 PM', activity: 'Ajanta caves visit' },
            { time: 'Day 1 Eve', activity: 'Aurangabad hotel check-in' },
            { time: 'Day 2 AM', activity: 'Ellora caves visit' },
            { time: 'Day 2 PM', activity: 'Return to Mumbai' }
        ]
    },
    {
        slug: 'mahabaleshwar-tour',
        name: 'Mahabaleshwar Tour',
        tagline: 'Maharashtra\'s hill station escape',
        duration: '2 Days',
        groupSize: '2–20 people',
        category: 'Gateway',
        coverImage: '/images/tours/tour-09.jpg',
        description: 'Strawberry farms, valley viewpoints, cool air — 2 hours from Mumbai.',
        highlights: ['Scenic valley viewpoints', 'Strawberry farm visit', 'Venna Lake boating', 'Local cuisine'],
        itinerary: [
            { time: 'Day 1 AM', activity: 'Mumbai departure' },
            { time: 'Day 1 Noon', activity: 'Mahabaleshwar arrival, lunch' },
            { time: 'Day 1 PM', activity: 'Viewpoints & strawberry farms' },
            { time: 'Day 2 AM', activity: 'Venna Lake & local market' },
            { time: 'Day 2 PM', activity: 'Return to Mumbai' }
        ]
    },
    {
        slug: 'sula-vineyards-tour',
        name: 'Sula Vineyards Tour',
        tagline: 'India\'s wine country, near Nashik',
        duration: '2 Days',
        groupSize: '2–15 people',
        category: 'Gateway',
        coverImage: '/images/tours/tour-10.jpg',
        description: 'India\'s most celebrated vineyard is 3 hours from Mumbai. Wine tasting, vineyard walks, and a resort stay in the Sahyadri hills.',
        highlights: ['Sula vineyard tour', 'Wine tasting session', 'Resort stay', 'Nashik city sightseeing'],
        itinerary: [
            { time: 'Day 1 AM', activity: 'Mumbai departure' },
            { time: 'Day 1 PM', activity: 'Vineyard tour & tasting' },
            { time: 'Day 1 Eve', activity: 'Resort check-in & dinner' },
            { time: 'Day 2 AM', activity: 'Nashik temples & market' },
            { time: 'Day 2 PM', activity: 'Return to Mumbai' }
        ]
    },
    {
        slug: 'jewish-tour',
        name: 'Jewish Heritage Tour',
        tagline: 'Mumbai\'s oldest and least known community',
        duration: 'Half Day · 4 hrs',
        groupSize: '2–15 people',
        category: 'Heritage',
        coverImage: '/images/tours/tour-11.jpg',
        description: 'Mumbai has one of India\'s oldest Jewish communities, dating back 2,000 years. Synagogues, cemeteries, and neighbourhoods most people do not know exist.',
        highlights: ['Keneseth Eliyahoo Synagogue', 'Magen David Synagogue', 'Jewish cemetery', 'Community history'],
        itinerary: [
            { time: '9:00 AM', activity: 'Fort area meetup' },
            { time: '9:30 AM', activity: 'Keneseth Eliyahoo Synagogue' },
            { time: '11:00 AM', activity: 'Byculla Jewish quarter' },
            { time: '12:30 PM', activity: 'Magen David & cemetery' }
        ]
    },
    {
        slug: 'matheran-tour',
        name: 'Matheran Tour',
        tagline: 'India\'s only car-free hill station',
        duration: 'Full Day · 8 hrs',
        groupSize: '2–20 people',
        category: 'Gateway',
        coverImage: '/images/tours/tour-12.jpg',
        description: 'No cars, no pollution. 90 minutes from Mumbai, accessible only by toy train or on foot.',
        highlights: ['Heritage toy train ride', 'Car-free environment', 'Valley viewpoints', 'Nature trails'],
        itinerary: [
            { time: '7:00 AM', activity: 'Mumbai departure' },
            { time: '8:30 AM', activity: 'Neral station – toy train boarding' },
            { time: '10:00 AM', activity: 'Matheran arrival & walk' },
            { time: '12:00 PM', activity: 'Viewpoints & lunch' },
            { time: '4:00 PM', activity: 'Return journey' }
        ]
    },
    {
        slug: 'parsi-food-tour',
        name: 'Parsi Food Tour',
        tagline: 'The cuisine almost nobody talks about',
        duration: 'Half Day · 3 hrs',
        groupSize: '2–12 people',
        category: 'Food',
        coverImage: '/images/tours/tour-13.jpg',
        description: 'Dhansak, patra ni machhi, berry pulav — Parsi cuisine kept alive in Mumbai\'s old Irani cafés and community dining halls.',
        highlights: ['Irani café breakfast', 'Parsi colony visit', 'Community kitchen access', 'Full Parsi meal'],
        itinerary: [
            { time: '8:00 AM', activity: 'Irani café breakfast, Fort' },
            { time: '9:30 AM', activity: 'Parsi colony walk, Dadar' },
            { time: '11:00 AM', activity: 'Community kitchen visit' },
            { time: '12:30 PM', activity: 'Full Parsi lunch' }
        ]
    },
    {
        slug: 'tv-show-tour',
        name: 'TV Show Tour',
        tagline: 'Inside India\'s biggest TV serials',
        duration: 'Half Day · 4 hrs',
        groupSize: '2–15 people',
        category: 'Bollywood',
        coverImage: '/images/tours/tour-14.jpg',
        description: 'India\'s TV industry is as big as its film industry — and far less visited. Behind the scenes of active serial productions.',
        highlights: ['Active TV serial sets', 'Meet cast & crew', 'Costume & makeup dept', 'Production behind-the-scenes'],
        itinerary: [
            { time: '10:00 AM', activity: 'Studio complex entry' },
            { time: '10:30 AM', activity: 'Active set observation' },
            { time: '12:00 PM', activity: 'Costume & makeup departments' },
            { time: '1:30 PM', activity: 'Crew interaction & photos' }
        ]
    },
    {
        slug: 'shopping-tour',
        name: 'Shopping Tour',
        tagline: 'Mumbai\'s markets – no tourist traps',
        duration: 'Half Day · 4 hrs',
        groupSize: '2–15 people',
        category: 'Mumbai',
        coverImage: '/images/tours/tour-15.jpg',
        description: 'Crawford Market, Chor Bazaar, Dharavi leather district — Mumbai\'s real shopping is in its chaotic, extraordinary street markets.',
        highlights: ['Crawford Market', 'Chor Bazaar antiques', 'Dharavi leather goods', 'Bargaining guidance'],
        itinerary: [
            { time: '10:00 AM', activity: 'Crawford Market' },
            { time: '11:30 AM', activity: 'Chor Bazaar antique lanes' },
            { time: '1:00 PM', activity: 'Dharavi leather district' },
            { time: '2:30 PM', activity: 'Zaveri Bazaar jewellery' }
        ]
    }
];

export default tours;
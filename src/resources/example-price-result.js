const data = [
    {
        id: 1593,
        name: 'Suttons Chrysler Jeep Dodge - Rosebery',
        state: 'NSW',
        region: 'Rosebery',
        division_id: 1,
        delivery_charge_min: '2995.0',
        delivery_charge_max: '2995.0',
        cta: [
            {
                name: 'Book a test drive',
                url: 'http://amazonaws.com/batd.html'
            },
            {
                name: 'Explore vehicle',
                url: 'http://amazonaws.com/ev.html'
            },
            {
                name: 'Request a brochure',
                url: 'http://amazonaws.com/rab.html'
            }
        ],
        drive_away_price: {
            model_configuration_id: 1619,
            model_configuration_name: 'Guilietta Super MT',
            postcode: '2000',
            business_usage: false,
            premium_paint: false,
            paint_cost: 977,
            image_url:
				'http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39c.png',
            model_highlights: [
                '1.4 MultiAir Turbo 110kW/250Nm Engine',
                '6-Speed Manual Transmission',
                '16-Inch Alloy Wheels',
                'Dual Zone Climate Control',
                'Rear Parking Sensors',
                '5-Inch Touchscreen Infotainment System',
                'Rain Sensing Wipers',
                'Alfa DNA™ System',
                'New Honeycomb Front Grille',
                'New Black Front Bumper Insert',
                'Chrome Fog Light Surround',
                'Darkened Headlamp Clusters',
                'Halogen Headlights',
                'LED DRLs',
                'Leather Wrapped Steering Wheel with New Alfa Romeo Logo',
                'Black and Grey Fabric Seats with Cannelloni Pattern'
            ],
            drive_away_price: 30961,
            price_type: 'normal',
            dealer_delivery: 2995,
            vehicle_price: 25790,
            government_charges: {
                stamp_duty: 864,
                luxury_car_tax: 0,
                registration: 403,
                compulsory_insurance: 908.81
            }
        },
        locations: [
            {
                id: 554,
                department: 'sales',
                city: 'Rosebery',
                state: 'NSW',
                email: null,
                web_site: 'http://www.http://www.suttonscityjeep.com.au/?sd_referrer=www.jeep.com.au',
                monday_hours: '8:30 AM - 6:00 PM',
                tuesday_hours: '8:30 AM - 6:00 PM',
                wednesday_hours: '8:30 AM - 6:00 PM',
                thursday_hours: '8:30 AM - 6:00 PM',
                friday_hours: '8:30 AM - 6:00 PM',
                saturday_hours: '8:30 AM - 5:30 PM',
                sunday_hours: '9:00 AM - 5:00 PM',
                latitude: '-33.911301',
                longitude: '151.211694',
                postal_code: 2017,
                phone: '(02) 9931 3000',
                fax: null,
                manager_name: null,
                address1: '1 Link Road'
            }
        ]
    }
];

const loadData = () => {
    return Promise.resolve(data[0]);
};

export default loadData;

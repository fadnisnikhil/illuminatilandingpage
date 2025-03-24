'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { Search, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StoreRequestForm } from './StoreRequestForm';
import { DirectionsButton } from './DirectionsButton';

// Mock store data (would come from database in real app)
const STORE_DATA = [
  {
    id: 1,
    name: 'Central Market Grocery',
    address: '123 Main Street, New York, NY 10001',
    location: { lat: 40.7128, lng: -74.0060 },
    phone: '(212) 555-1234',
    hours: 'Mon-Sat: 8am-10pm, Sun: 9am-9pm',
    type: 'Grocery',
    products: ['Original', 'Zero Sugar', 'Berry Blast']
  },
  {
    id: 2,
    name: 'Downtown Convenience',
    address: '456 Broadway, New York, NY 10013',
    location: { lat: 40.7200, lng: -74.0010 },
    phone: '(212) 555-5678',
    hours: 'Open 24/7',
    type: 'Convenience',
    products: ['Original', 'Zero Sugar']
  },
  {
    id: 3,
    name: 'Fitness Center Pro Shop',
    address: '789 Fitness Ave, New York, NY 10014',
    location: { lat: 40.7250, lng: -74.0080 },
    phone: '(212) 555-9012',
    hours: 'Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm',
    type: 'Fitness',
    products: ['Original', 'Zero Sugar', 'Berry Blast', 'Tropical Surge']
  },
  {
    id: 4,
    name: 'The Vitamin Shop',
    address: '101 Health Blvd, New York, NY 10011',
    location: { lat: 40.7180, lng: -74.0120 },
    phone: '(212) 555-3456',
    hours: 'Mon-Sat: 9am-9pm, Sun: 10am-7pm',
    type: 'Health',
    products: ['Original', 'Zero Sugar']
  },
  {
    id: 5,
    name: 'Campus Corner Store',
    address: '202 University Pl, New York, NY 10003',
    location: { lat: 40.7300, lng: -73.9950 },
    phone: '(212) 555-7890',
    hours: 'Mon-Fri: 7am-11pm, Sat-Sun: 9am-9pm',
    type: 'Convenience',
    products: ['Original', 'Berry Blast']
  }
];

export default function StoresPage() {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 13
  });
  
  const [selectedStore, setSelectedStore] = useState<null | typeof STORE_DATA[0]>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeType, setStoreType] = useState('all');
  const [product, setProduct] = useState('all');
  const [filteredStores, setFilteredStores] = useState(STORE_DATA);
  
  // Filter stores based on search query and filters
  useEffect(() => {
    let results = STORE_DATA;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(store => 
        store.name.toLowerCase().includes(query) || 
        store.address.toLowerCase().includes(query)
      );
    }
    
    if (storeType && storeType !== 'all') {
      results = results.filter(store => store.type === storeType);
    }
    
    if (product && product !== 'all') {
      results = results.filter(store => store.products.includes(product));
    }
    
    setFilteredStores(results);
  }, [searchQuery, storeType, product]);
  
  // Get user's current location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 13
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please try searching for your area.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);
  
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Find Illuminati Energy Near You</h1>
            <p className="text-gray-300 mb-8">
              Locate retailers carrying our energy drinks in your area. Enter your location or use your current position to discover where to purchase Illuminati Energy.
            </p>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Enter city, address, or zip"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button onClick={getUserLocation} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <MapPin size={16} className="mr-2" /> Use My Location
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={storeType} onValueChange={setStoreType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Store Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All Store Types</SelectItem>
                    <SelectItem value="Grocery">Grocery</SelectItem>
                    <SelectItem value="Convenience">Convenience</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Health">Health Store</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Product" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="Original">Original</SelectItem>
                    <SelectItem value="Zero Sugar">Zero Sugar</SelectItem>
                    <SelectItem value="Berry Blast">Berry Blast</SelectItem>
                    <SelectItem value="Tropical Surge">Tropical Surge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map and Store Listings */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Store List */}
            <div className="lg:col-span-4 space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {filteredStores.length === 0 ? (
                <div className="bg-black p-6 rounded-lg text-center">
                  <p className="text-gray-300">No stores found matching your criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                filteredStores.map((store) => (
                  <div 
                    key={store.id} 
                    className={`bg-black p-6 rounded-lg cursor-pointer transition-colors ${
                      selectedStore?.id === store.id ? 'border-2 border-emerald-500' : ''
                    }`}
                    onClick={() => {
                      setSelectedStore(store);
                      setViewport({
                        latitude: store.location.lat,
                        longitude: store.location.lng,
                        zoom: 15
                      });
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{store.name}</h3>
                    <p className="text-gray-400 mb-3">{store.address}</p>
                    
                    <div className="flex items-center text-gray-400 mb-2">
                      <Phone size={16} className="mr-2 text-emerald-500" />
                      <a href={`tel:${store.phone.replace(/\D/g, '')}`} className="hover:text-emerald-500">
                        {store.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <Clock size={16} className="mr-2 text-emerald-500" />
                      <span>{store.hours}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {store.products.map((prod) => (
                        <span key={prod} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          {prod}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <DirectionsButton 
                        lat={store.location.lat} 
                        lng={store.location.lng}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-gray-500 text-sm">{store.type}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Map */}
            <div className="lg:col-span-8 h-[600px] rounded-lg overflow-hidden">
              <Map
                {...viewport}
                mapboxAccessToken="pk.your_mapbox_token_here"
                mapStyle="mapbox://styles/mapbox/dark-v10"
                onMove={evt => setViewport(evt.viewState)}
              >
                {filteredStores.map((store) => (
                  <Marker
                    key={store.id}
                    latitude={store.location.lat}
                    longitude={store.location.lng}
                    onClick={e => {
                      e.originalEvent.stopPropagation();
                      setSelectedStore(store);
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-2 ${
                      selectedStore?.id === store.id ? 'border-white' : 'border-black'
                    }`}>
                      <MapPin size={14} className="text-black" />
                    </div>
                  </Marker>
                ))}
                
                {selectedStore && (
                  <Popup
                    latitude={selectedStore.location.lat}
                    longitude={selectedStore.location.lng}
                    closeOnClick={false}
                    onClose={() => setSelectedStore(null)}
                    closeButton={true}
                    anchor="bottom"
                    offset={25}
                  >
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-sm">{selectedStore.name}</h3>
                      <p className="text-xs text-gray-700 mt-1">{selectedStore.address}</p>
                      <DirectionsButton 
                        lat={selectedStore.location.lat} 
                        lng={selectedStore.location.lng}
                        variant="link"
                        size="sm"
                      />
                    </div>
                  </Popup>
                )}
              </Map>
            </div>
          </div>
          
          {/* Request Form */}
          <StoreRequestForm />
        </div>
      </section>
    </div>
  );
} 
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet"
import L from "leaflet"
import { Search, MapPin, Home, Building2, Factory, Wheat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Define property data interface
interface PropertyMapData {
  id: string
  ownerName: string
  registrationNumber: string
  propertyType: string
  address: string
  location: string
  position: [number, number] // [latitude, longitude]
  verified: boolean
  yearOfRegistration: number
}

// Sample property data with coordinates
const sampleProperties: PropertyMapData[] = [
  {
    id: "1",
    ownerName: "Rajesh Kumar",
    registrationNumber: "GJ-GNR-12345-2018",
    propertyType: "Residential",
    address: "Plot No. 45, Sector 7",
    location: "Gandhinagar, Gujarat",
    position: [23.2156, 72.6369], // Gandhinagar coordinates
    verified: true,
    yearOfRegistration: 2018,
  },
  {
    id: "2",
    ownerName: "Priya Sharma",
    registrationNumber: "KA-BLR-67890-2019",
    propertyType: "Residential",
    address: "House No. 123, MG Road",
    location: "Bengaluru, Karnataka",
    position: [12.9716, 77.5946], // Bengaluru coordinates
    verified: true,
    yearOfRegistration: 2019,
  },
  {
    id: "3",
    ownerName: "Suresh Patel",
    registrationNumber: "MH-MUM-23456-2020",
    propertyType: "Residential",
    address: "Flat 303, Sunshine Apartments, Park Street",
    location: "Mumbai, Maharashtra",
    position: [19.076, 72.8777], // Mumbai coordinates
    verified: true,
    yearOfRegistration: 2020,
  },
  {
    id: "4",
    ownerName: "Vikram Reddy",
    registrationNumber: "TG-HYD-34567-2021",
    propertyType: "Commercial",
    address: "Plot 56, IT Park",
    location: "Hyderabad, Telangana",
    position: [17.385, 78.4867], // Hyderabad coordinates
    verified: true,
    yearOfRegistration: 2021,
  },
  {
    id: "5",
    ownerName: "Kavita Gupta",
    registrationNumber: "PB-CHD-90123-2020",
    propertyType: "Industrial",
    address: "Plot 78, Industrial Area",
    location: "Chandigarh, Punjab",
    position: [30.7333, 76.7794], // Chandigarh coordinates
    verified: false,
    yearOfRegistration: 2020,
  },
  {
    id: "6",
    ownerName: "Ritu Agarwal",
    registrationNumber: "JH-JSR-56789-2020",
    propertyType: "Industrial",
    address: "Plot 89, Industrial Estate",
    location: "Jamshedpur, Jharkhand",
    position: [22.8046, 86.2029], // Jamshedpur coordinates
    verified: true,
    yearOfRegistration: 2020,
  },
  {
    id: "7",
    ownerName: "Prakash Jain",
    registrationNumber: "MP-IND-34567-2020",
    propertyType: "Residential",
    address: "Flat 505, City Heights, MG Road",
    location: "Indore, Madhya Pradesh",
    position: [22.7196, 75.8577], // Indore coordinates
    verified: true,
    yearOfRegistration: 2020,
  },
  {
    id: "8",
    ownerName: "Vijay Menon",
    registrationNumber: "TN-CHN-45678-2021",
    propertyType: "Commercial",
    address: "Plot 78, IT Corridor",
    location: "Chennai, Tamil Nadu",
    position: [13.0827, 80.2707], // Chennai coordinates
    verified: true,
    yearOfRegistration: 2021,
  },
  {
    id: "9",
    ownerName: "Lakshmi Iyer",
    registrationNumber: "TN-CBE-01234-2020",
    propertyType: "Agricultural",
    address: "Plot 90, Industrial Zone",
    location: "Coimbatore, Tamil Nadu",
    position: [11.0168, 76.9558], // Coimbatore coordinates
    verified: false,
    yearOfRegistration: 2020,
  },
  {
    id: "10",
    ownerName: "Arun Banerjee",
    registrationNumber: "WB-KOL-56789-2019",
    propertyType: "Residential",
    address: "Flat 707, River Side Apartments",
    location: "Kolkata, West Bengal",
    position: [22.5726, 88.3639], // Kolkata coordinates
    verified: true,
    yearOfRegistration: 2019,
  },
]

// Create custom marker icons for different property types
const createCustomIcon = (propertyType: string, selected = false) => {
  // Define colors based on property type
  const getIconHtml = (propertyType: string) => {
    switch (propertyType) {
      case "Residential":
        return `<div class="icon-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#138808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>`
      case "Commercial":
        return `<div class="icon-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg></div>`
      case "Industrial":
        return `<div class="icon-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0000FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1"></path><path d="M12 18h1"></path><path d="M7 18h1"></path></svg></div>`
      case "Agricultural":
        return `<div class="icon-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#800080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 6 6 0 0 1-10-6"></path><path d="M5 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0"></path><path d="M5 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0"></path><path d="M5 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0"></path><path d="M5 18a1 1 0 1 0 2 0 1 1 0 0 0-2 0"></path></svg></div>`
      default:
        return `<div class="icon-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`
    }
  }

  return L.divIcon({
    html: getIconHtml(propertyType),
    className: `custom-marker-icon ${propertyType.toLowerCase()} ${selected ? "selected" : ""}`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })
}

// Map center component to handle map movements
function MapCenter({ position }: { position: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(position, 13)
  }, [map, position])

  return null
}

// Search control component
function SearchControl({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-48 h-8 text-sm"
      />
      <Button type="submit" size="sm" className="h-8 px-2 bg-saffron hover:bg-saffron-dark">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}

interface InteractiveMapProps {
  onSelectProperty: (property: PropertyMapData) => void
}

export default function InteractiveMap({ onSelectProperty }: InteractiveMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyMapData | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]) // Center of India
  const [zoom, setZoom] = useState(5)
  const [properties, setProperties] = useState<PropertyMapData[]>(sampleProperties)
  const [filteredProperties, setFilteredProperties] = useState<PropertyMapData[]>(sampleProperties)
  const [filterType, setFilterType] = useState<string | null>(null)

  // Handle property selection
  const handlePropertySelect = (property: PropertyMapData) => {
    setSelectedProperty(property)
    setMapCenter(property.position)
    setZoom(15)
    onSelectProperty(property)
  }

  // Handle search
  const handleSearch = (query: string) => {
    // In a real application, this would call an API to search for locations
    // For now, we'll just search our sample data
    const results = properties.filter(
      (property) =>
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase()) ||
        property.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        property.registrationNumber.toLowerCase().includes(query.toLowerCase()),
    )

    setFilteredProperties(results)

    if (results.length > 0) {
      // Center map on first result
      setMapCenter(results[0].position)
      setZoom(10)
    }
  }

  // Filter properties by type
  const filterByType = (type: string | null) => {
    setFilterType(type)
    if (type === null) {
      setFilteredProperties(properties)
    } else {
      const filtered = properties.filter((property) => property.propertyType === type)
      setFilteredProperties(filtered)
    }
  }

  // Get icon for property type button
  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "Residential":
        return <Home className="h-4 w-4" />
      case "Commercial":
        return <Building2 className="h-4 w-4" />
      case "Industrial":
        return <Factory className="h-4 w-4" />
      case "Agricultural":
        return <Wheat className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="relative">
      <div className="map-search-controls flex gap-2">
        <SearchControl onSearch={handleSearch} />
      </div>

      <div className="absolute top-10 left-10 z-1000 flex flex-col gap-2">
        <Button
          size="sm"
          variant={filterType === null ? "default" : "outline"}
          className={`h-8 px-3 ${filterType === null ? "bg-saffron hover:bg-saffron-dark" : ""}`}
          onClick={() => filterByType(null)}
        >
          <MapPin className="h-4 w-4 mr-1" />
          All
        </Button>
        <Button
          size="sm"
          variant={filterType === "Residential" ? "default" : "outline"}
          className={`h-8 px-3 ${filterType === "Residential" ? "bg-[#138808] hover:bg-[#0e6606]" : "border-[#138808] text-[#138808]"}`}
          onClick={() => filterByType("Residential")}
        >
          <Home className="h-4 w-4 mr-1" />
          Residential
        </Button>
        <Button
          size="sm"
          variant={filterType === "Commercial" ? "default" : "outline"}
          className={`h-8 px-3 ${filterType === "Commercial" ? "bg-saffron hover:bg-saffron-dark" : "border-saffron text-saffron"}`}
          onClick={() => filterByType("Commercial")}
        >
          <Building2 className="h-4 w-4 mr-1" />
          Commercial
        </Button>
        <Button
          size="sm"
          variant={filterType === "Industrial" ? "default" : "outline"}
          className={`h-8 px-3 ${filterType === "Industrial" ? "bg-[#0000FF] hover:bg-[#0000cc]" : "border-[#0000FF] text-[#0000FF]"}`}
          onClick={() => filterByType("Industrial")}
        >
          <Factory className="h-4 w-4 mr-1" />
          Industrial
        </Button>
        <Button
          size="sm"
          variant={filterType === "Agricultural" ? "default" : "outline"}
          className={`h-8 px-3 ${filterType === "Agricultural" ? "bg-[#800080] hover:bg-[#660066]" : "border-[#800080] text-[#800080]"}`}
          onClick={() => filterByType("Agricultural")}
        >
          <Wheat className="h-4 w-4 mr-1" />
          Agricultural
        </Button>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={zoom}
        zoomControl={false}
        style={{ height: "400px", width: "100%", borderRadius: "0.5rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        <MapCenter position={mapCenter} />

        {filteredProperties.map((property) => (
          <Marker
            key={property.id}
            position={property.position}
            icon={createCustomIcon(property.propertyType, selectedProperty?.id === property.id)}
            eventHandlers={{
              click: () => handlePropertySelect(property),
            }}
          >
            <Popup className="property-popup">
              <h3>{property.ownerName}</h3>
              <p>
                <strong>Registration:</strong> {property.registrationNumber}
              </p>
              <p>
                <strong>Address:</strong> {property.address}
              </p>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Year:</strong> {property.yearOfRegistration}
              </p>
              <div className={`property-type ${property.propertyType.toLowerCase()}`}>{property.propertyType}</div>
              <Button
                size="sm"
                className="mt-2 w-full bg-green hover:bg-green-dark text-white"
                onClick={() => handlePropertySelect(property)}
              >
                View Details
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-legend">
        <div className="text-xs font-medium mb-2">Property Types</div>
        <div className="map-legend-item">
          <div className="map-legend-color" style={{ backgroundColor: "#138808" }}></div>
          <span>Residential</span>
        </div>
        <div className="map-legend-item">
          <div className="map-legend-color" style={{ backgroundColor: "#FF9933" }}></div>
          <span>Commercial</span>
        </div>
        <div className="map-legend-item">
          <div className="map-legend-color" style={{ backgroundColor: "#0000FF" }}></div>
          <span>Industrial</span>
        </div>
        <div className="map-legend-item">
          <div className="map-legend-color" style={{ backgroundColor: "#800080" }}></div>
          <span>Agricultural</span>
        </div>
      </div>
    </div>
  )
}

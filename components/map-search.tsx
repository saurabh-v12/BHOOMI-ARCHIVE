"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Info, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Script from "next/script"

interface MapSearchProps {
  onSelectLocation: (location: { x: number; y: number }) => void
}

export default function MapSearch({ onSelectLocation }: MapSearchProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ x: number; y: number } | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Sample property data with coordinates
  const sampleProperties = [
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
      id: "4",
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
      id: "5",
      ownerName: "Lakshmi Iyer",
      registrationNumber: "TN-CBE-01234-2020",
      propertyType: "Agricultural",
      address: "Plot 90, Industrial Zone",
      location: "Coimbatore, Tamil Nadu",
      position: [11.0168, 76.9558], // Coimbatore coordinates
      verified: false,
      yearOfRegistration: 2020,
    },
  ]

  // Initialize map after scripts are loaded
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || typeof window === "undefined" || !window.L) return

    // Create map instance
    const map = window.L.map(mapRef.current).setView([20.5937, 78.9629], 5)
    mapInstanceRef.current = map

    // Add tile layer
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add markers for each property
    sampleProperties.forEach((property) => {
      const markerColor = getMarkerColor(property.propertyType)

      // Create custom icon
      const icon = window.L.divIcon({
        className: `custom-marker ${property.propertyType.toLowerCase()}`,
        html: `<div style="background-color: white; border: 3px solid ${markerColor}; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                <div style="width: 12px; height: 12px; background-color: ${markerColor}; border-radius: 50%;"></div>
              </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      // Create marker
      const marker = window.L.marker(property.position, { icon }).addTo(map)

      // Add popup
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="font-weight: 600; margin-bottom: 5px;">${property.ownerName}</h3>
          <p><strong>Registration:</strong> ${property.registrationNumber}</p>
          <p><strong>Address:</strong> ${property.address}</p>
          <p><strong>Location:</strong> ${property.location}</p>
          <p><strong>Type:</strong> ${property.propertyType}</p>
          <button 
            id="select-property-${property.id}" 
            style="background-color: #138808; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 5px; width: 100%;"
          >
            View Details
          </button>
        </div>
      `)

      // Store marker reference
      markersRef.current.push({ marker, property })

      // Add click event to marker
      marker.on("click", () => {
        const location = {
          x: property.position[0] / 100,
          y: property.position[1] / 100,
        }
        setSelectedLocation(location)
      })
    })

    // Add click events to popup buttons
    map.on("popupopen", (e) => {
      sampleProperties.forEach((property) => {
        const button = document.getElementById(`select-property-${property.id}`)
        if (button) {
          button.addEventListener("click", () => {
            const location = {
              x: property.position[0] / 100,
              y: property.position[1] / 100,
            }
            setSelectedLocation(location)
            onSelectLocation(location)
            map.closePopup()
          })
        }
      })
    })

    // Add legend
    const legend = window.L.control({ position: "bottomright" })
    legend.onAdd = () => {
      const div = window.L.DomUtil.create("div", "map-legend")
      div.innerHTML = `
        <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0 1px 5px rgba(0,0,0,0.2);">
          <div style="font-weight: 600; margin-bottom: 5px; font-size: 12px;">Property Types</div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; background-color: #138808; border-radius: 50%; margin-right: 6px;"></div>
            <span style="font-size: 12px;">Residential</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; background-color: #FF9933; border-radius: 50%; margin-right: 6px;"></div>
            <span style="font-size: 12px;">Commercial</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; background-color: #0000FF; border-radius: 50%; margin-right: 6px;"></div>
            <span style="font-size: 12px;">Industrial</span>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; background-color: #800080; border-radius: 50%; margin-right: 6px;"></div>
            <span style="font-size: 12px;">Agricultural</span>
          </div>
        </div>
      `
      return div
    }
    legend.addTo(map)

    // Clean up on unmount
    return () => {
      map.remove()
      mapInstanceRef.current = null
      markersRef.current = []
    }
  }, [isMapLoaded, onSelectLocation])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim() || !mapInstanceRef.current) return

    // Find property that matches search query
    const property = sampleProperties.find(
      (p) =>
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (property) {
      // Center map on property
      mapInstanceRef.current.setView(property.position, 13)

      // Find and open the marker popup
      const markerObj = markersRef.current.find((m) => m.property.id === property.id)
      if (markerObj) {
        markerObj.marker.openPopup()
      }

      // Set selected location
      const location = {
        x: property.position[0] / 100,
        y: property.position[1] / 100,
      }
      setSelectedLocation(location)
    }
  }

  // Helper function to get marker color based on property type
  const getMarkerColor = (propertyType: string) => {
    switch (propertyType) {
      case "Residential":
        return "#138808" // Green
      case "Commercial":
        return "#FF9933" // Saffron
      case "Industrial":
        return "#0000FF" // Blue
      case "Agricultural":
        return "#800080" // Purple
      default:
        return "#000000" // Black
    }
  }

  return (
    <div className="space-y-2">
      {/* Load Leaflet scripts */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        onLoad={() => setIsMapLoaded(true)}
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Info className="h-4 w-4 mr-1" />
        <span>
          Use the interactive map to find and select properties. Search for specific locations or click on markers.
        </span>
      </div>

      <div className="govt-card p-2 bg-white">
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-saffron mr-1" />
            <span className="text-sm font-medium">Land Parcel Map</span>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 h-8 text-sm"
            />
            <Button type="submit" size="sm" className="h-8 px-2 bg-saffron hover:bg-saffron/80">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Map container */}
        <div
          ref={mapRef}
          className="w-full h-[400px] rounded-md"
          style={{
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isMapLoaded && (
            <div className="text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Loading interactive map...</p>
            </div>
          )}
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h4 className="font-medium text-gray-900 mb-2">Selected Location</h4>
          <p className="text-sm text-gray-600">
            Coordinates: {Math.round(selectedLocation.x * 100)}°N, {Math.round(selectedLocation.y * 100)}°E
          </p>
          <Button
            onClick={() => onSelectLocation(selectedLocation)}
            className="mt-3 bg-green hover:bg-green-dark text-white"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Search This Location
          </Button>
        </div>
      )}
    </div>
  )
}

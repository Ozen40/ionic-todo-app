import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() { }

  private NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  }

  async getCityNameFromCoordinates(latitude: number, longitude: number): Promise<string> {
    const url = `${this.NOMINATIM_URL}&lat=${latitude}&lon=${longitude}`;
    const response = await fetch(url);
    const data = await response.json();

    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      'Ville non trouvée'
    );
  }

  async getCurrentCity(): Promise<string> {
    try {
      const { latitude, longitude } = await this.getCurrentLocation();
      return await this.getCityNameFromCoordinates(latitude, longitude);
    } catch (error) {
      console.error('Erreur lors de la récupération de la ville :', error);
      return 'Erreur lors de la récupération de la ville';
    }
  }
}

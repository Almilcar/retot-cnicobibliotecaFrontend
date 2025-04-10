import { Injectable } from "@angular/core";

interface UbigeoData {
    departamentos: string[];
    provincias: Record<string, string[]>;
    distritos: Record<string, string[]>;
  }
  
  @Injectable({ providedIn: 'root' })
  export class UbigeoService {
    private ubigeoData: UbigeoData = {
      departamentos: ['Lima', 'Arequipa', 'Cusco', 'Piura', 'La Libertad'],
      provincias: {
        'Lima': ['Lima', 'Huaura', 'Cañete'],
        'Arequipa': ['Arequipa', 'Caylloma', 'Islay'],
        'Cusco': ['Cusco', 'Quispicanchi', 'Canchis'],
        'Piura': ['Piura', 'Sullana', 'Paita'],
        'La Libertad': ['Trujillo', 'Chepen', 'Ascope']
      },
      distritos: {
        'Lima-Lima': ['Miraflores', 'San Isidro', 'Barranco'],
        'Lima-Huaura': ['Huacho', 'Hualmay', 'Caleta de Carquin'],
        'Arequipa-Arequipa': ['Arequipa', 'Yanahuara', 'Cayma']
      }
    };
  
    getDepartamentos(): string[] {
      return this.ubigeoData.departamentos;
    }
  
    getProvincias(departamento: string): string[] {
      return this.ubigeoData.provincias[departamento] || [];
    }
  
    getDistritos(departamento: string, provincia: string): string[] {
      const key = `${departamento}-${provincia}`;
      return this.ubigeoData.distritos[key] || [];
    }
  }
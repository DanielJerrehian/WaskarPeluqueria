import { Scissors, Crown, Gem, AlignLeft, Pen, Crop } from 'lucide-react'
import { GiRazor } from 'react-icons/gi'


export const services = [
  {
    icon: Scissors,
    name: 'Corte de Cabello',
    nameEn: 'Haircut',
    price: '20€',
    description: 'Corte adaptado a tu estilo.',
  },
  {
    icon: Crown,
    name: 'Corte y Barba',
    nameEn: 'Haircut & Beard',
    price: '25€',
    popular: true,        // 👈 add this
    description: 'Corte completo más perfilado y arreglo de barba.',
  },
  {
    icon: AlignLeft,
    name: 'Cerquillo / Líneas',
    nameEn: 'Line-up',
    price: '10€',
    description: 'Perfilado de entradas y diseño de líneas, con barba por 15€.',
    badge: '+Barba 5€',
  },
  {
    icon: GiRazor,
    name: 'Barba',
    nameEn: 'Beard',
    price: '10€',
    description: 'Perfilado, arreglo y afeitado de barba con toalla caliente.',
    priceLabel: 'Consultar',
  },
  {
    icon: Crop,
    name: 'Cejas',
    nameEn: 'Brows',
    price: '3€',
    description: 'Perfilado y definición de cejas.',
  },
  {
    icon: Gem,
    name: 'Extras',
    nameEn: 'Extras',
    price: null,
    description: 'Servicios adicionales: tinte en barba o cabello, facial con toallas calientes.',
    priceLabel: 'Consultar',
  },
  {
    icon: Pen,
    name: 'Diseños',
    nameEn: 'Designs',
    price: null,
    description: 'Diseños artísticos a navaja o máquina integrados en el corte. Desde líneas y patrones hasta figuras personalizadas.',
    priceLabel: 'Consultar',
  },
]
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Cdmx from '../assets/img/cdmx.jpg';
import PozaRica from '../assets/img/PozaRica.jpg'
import Coyutla from '../assets/img/coyutla.jpg'
import Polotitlan from '../assets/img/polotitlan.jpg'

const places = [
   {
      name: "CDMX",
      image: Cdmx,
      url: "/location/ciudad-de-méxico-3527646"
   },
   {
      name: "Poza Rica",
      image: PozaRica,
      url: "/location/poza-rica-de-hidalgo-3521168"
   },
   {
      name: "Coyutla",
      image: Coyutla,
      url: "/location/coyutla-3530110"
   },
   {
      name: "Polotitlán",
      image: Polotitlan,
      url: "/location/polotitlán-de-la-ilustración-3521297"
   }
]

const FavoritePlaces = () => {
   return (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 cursor-pointer'>
         {
            places.length > 0 && places.map((place, index) => (
               <div key={index} className="flex items-center justify-center">
                  <Link href={place.url}>
                     <div className='text-center'>
                        <div className='h-48 w-40 object-cover relative rounded-lg mb-3 border-2 border-blue-600'>
                           <Image
                              src={place.image}
                              layout='fill'
                              className='rounded-md object-cover'
                              objectFit='cover'
                           />
                        </div>
                        <span className='font-bold'>{place.name}</span>
                     </div>
                  </Link>
                  
               </div>
            ))
         }
      </div>
   )
}

export default FavoritePlaces;
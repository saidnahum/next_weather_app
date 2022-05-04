import React, { useState, useEffect } from 'react'
import cities from '../lib/city.list.json';
import Link from 'next/link';
import Router from 'next/router';
import OpenWeatherMaps from '../assets/img/openweather.jpg';
import Image from 'next/image'

const SearchBox = ({ placeholder }) => {

   const [query, setQuery] = useState("");
   const [results, setResults] = useState([]);

   useEffect(() => {
      const clearQuery = () => setQuery("");

      Router.events.on("routeChangeComplete", clearQuery);

      return () => {
         Router.events.off("routeChangeComplete", clearQuery);
      }

   }, [])


   const onChange = (e) => {
      e.preventDefault()

      const { value } = e.target;
      setQuery(value);

      let matchingCities = [];

      if (value.length > 3) {
         for (let city of cities) {
            if (matchingCities.length >= 5) {
               break
            }

            const match = city.name.toLowerCase().startsWith(value.toLowerCase());

            if (match) {
               const cityData = {
                  ...city,
                  slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
               }
               matchingCities.push(cityData);
            }
         }
      }

      //console.log(matchingCities);
      return setResults(matchingCities);
   }

   // bg-white mt-5 w-1/2 flex flex-col space-y-3 border border-gray-200 p-3 rounded-lg
   return (

      <div className="relative mb-5">
         <div className='flex flex-col justify-center items-center space-y-3 text-center mb-6'>
            <h1 className='text-2xl font-bold'>Said's Weather App</h1>
            <span>Fuente de información:</span>
            <div className='w-20'>
               <Image
                  src={OpenWeatherMaps}
               />
            </div>
         </div>
         <input
            className="w-full p-4 border-2 rounded-lg border-blue-700 focus:outline-none shadow-lg"
            placeholder={placeholder}
            value={query}
            onChange={onChange}
         />
         {
            query.length > 3 && (
               <ul className='absolute bg-white mt-5 w-full flex flex-col space-y-3 border-2 border-blue-700 p-3 rounded-lg top-15 z-50'>
                  {
                     results.length > 0 ? (
                        results.map((city) => (
                           <li key={city.id} className="border-b last:border-none mt-2 pb-2 hover:text-blue-600">
                              <Link href={`/location/${city.slug}`}>
                                 <a>
                                    {city.name}
                                    {city.state ? `, ${city.state}` : ""}
                                    <span className='ml-1'>({city.country})</span>
                                 </a>
                              </Link>
                           </li>
                        ))
                     ) : (
                        <li>No se encontraron resultados</li>
                     )
                  }
               </ul>
            )
         }
      </div>
   )
}

export default SearchBox
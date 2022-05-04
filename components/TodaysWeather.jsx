import React from 'react'
import moment from 'moment-timezone';
import Image from 'next/image';

const TodaysWeather = ({ city, weather, currentWeather, timezone }) => {

   //console.log(currentWeather);

   return (
      <div className='bg-blue-600 p-5 rounded-lg text-white lg:mx-0'>
         <div className='flex justify-between items-center'>
            <div className='flex flex-col space-y-3'>
               <h1 className='text-xl md:text-4xl font-bold'>
                  {city.name} ({city.country})
               </h1>

               <h2 className='text-3xl font-bold'>
                  {currentWeather.temp.toFixed(0)}&deg;C
               </h2>

               <h2 className='flex space-x-2 items-center mt-2 font-semibold'>
                  <span className='text-lg md:text-xl '>{weather.temp.max.toFixed(0)}&deg;C</span>
                  <span className='text-sm md:text-lg  text-gray-300'>{weather.temp.min.toFixed(0)}&deg;C</span>
               </h2>

               <div className='flex  md:space-y-0 space-x-5'>
                  <div className='flex flex-col items-center'>
                     <span className='font-bold'>Amanecer</span>
                     <span>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
                  </div>

                  <div className='flex flex-col items-center'>
                     <span className='font-bold'>Atardecer</span>
                     <span>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
                  </div>
               </div>
            </div>

            <div>
               <div className='flex flex-col items-center'>
                  <div className='w-24 sm:w-36 h-24 sm:h-36 relative'>
                     <Image 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                        alt="weather Icon"
                        layout="fill"
                     />
                  </div>

                  <h3 className='capitalize font-bold'>
                     {weather.weather[0].description}
                  </h3>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TodaysWeather
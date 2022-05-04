import React from 'react'
import moment from 'moment-timezone';
import 'moment/locale/es'
import Image from 'next/image'


const WeeklyWeather = ({ weeklyWeather, timezone }) => {

   //console.log(weeklyWeather);

   return (
      <div className='mt-10'>
         <h3 className='text-xl md:text-4xl mb-10'> <span className='font-bold'>Pronóstico</span> a 8 días</h3>

         {weeklyWeather.length > 0 && weeklyWeather.map((weather, index) => {
            if (index == 0) {
               return
            }

            return (
               <div key={weather.dt}>
                  <div className='flex justify-between items-center capitalize bg-cyan-500 text-white p-3 px-5 md:px-10 mb-3 rounded-lg'>
                     <div className='flex flex-col md:flex-row items-center md:space-x-10'>
                        {/* left */}
                        <div className='flex space-x-5 md:space-x-0 md:flex-col'>
                           <h3 className='text-2xl font-bold'>
                              {moment.unix(weather.dt).tz(timezone).format("dddd")}
                           </h3>

                           <h4 className='flex space-x-3 items-center'>
                              <span className='text-lg md:text-xl'>{weather.temp.max.toFixed(0)}&deg;C</span>
                              <span className='text-sm md:text-lg  text-gray-300 font-bold'>{weather.temp.min.toFixed(0)}&deg;C</span>
                           </h4>
                        </div>

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

                     <div className='flex flex-col items-center'>
                        <div className='w-20 h-16'>
                           <Image
                              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                              alt="weather Icon"
                              width='100'
                              height='100'
                           />
                        </div>

                        <h3 className='capitalize font-bold text-center text-sm md:text-md'>
                           {weather.weather[0].description}
                        </h3>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   )
}

export default WeeklyWeather
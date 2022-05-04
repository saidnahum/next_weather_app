import React from 'react'
import moment from 'moment-timezone';
import Image from 'next/image'

const HourlyWeather = ({ hourlyWeather, timezone }) => {
   // console.log(hourlyWeather);
   // console.log(timezone);
   return (
      <div className='mt-5 pb-3 overflow-auto text-white'>
         <div className='flex'>
            {hourlyWeather.length > 0 && hourlyWeather.map((weather, index) => (
               <div key={weather.dt} className="flex-grow flex-shrink min-w-[130px] px-3">
                  <div className='text-center rounded-md bg-indigo-500 py-3'>
                     <span className={`${index == 0 ? "font-bold" : ""}`}>
                        {index == 0
                           ? "Ahora"
                           : moment.unix(weather.dt).tz(timezone).format("LT")
                        }
                     </span>

                     <div className='flex flex-col items-center'>
                        <div className='w-20 h-20 relative'>
                           <Image
                              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                              alt="weather Icon"
                              layout="fill"
                           />
                        </div>

                        <h3 className='capitalize'>
                           {weather.temp.toFixed(0)}&deg;C
                        </h3>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default HourlyWeather
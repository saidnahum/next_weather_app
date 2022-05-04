import React from 'react'
import cities from '../../lib/city.list.json';
import { bootstrap as bootstrapGlobalAgent } from 'global-agent';
import Head from 'next/head';
import TodaysWeather from '../../components/TodaysWeather';
import moment from 'moment-timezone';
import HourlyWeather from '../../components/HourlyWeather';
import WeeklyWeather from '../../components/WeeklyWeather';
import SearchBox from '../../components/SearchBox';
import Link from 'next/link'

export const getServerSideProps = async ({ params }) => {

   bootstrapGlobalAgent();

   const city = getCity(params.slug)

   if (!city) {
      return {
         notFound: true
      }
   }

   const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}&units=metric&exclude=minutely&lang=sp`)
   const data = await res.json();

   if (!data) {
      return {
         notFound: trye
      }
   }

   const hourlyWeather = getHourlyWeather(data.hourly, data.timezone)

   //console.log(hourlyWeather);

   const slug = params.slug;

   return {
      props: {
         city: city,
         timezone: data.timezone,
         currentWeather: data.current,
         dailyWeather: data.daily,
         hourlyWeather: hourlyWeather

      }
   }
};

const getCity = (param) => {
   const cityParam = param.trim();

   const splitCity = cityParam.split("-");
   const id = splitCity[splitCity.length - 1];
   //console.log(id);

   if (!id) {
      return null;
   }

   const city = cities.find(city => city.id.toString() == id);

   if (city) {
      return city
   } else {
      return null;
   }
}

const getHourlyWeather = (hourlyData, timezone) => {

   // const current = new Date();
   // current.setHours(current.getHours(), 0, 0, 0);

   // const tomorrow = new Date(current);
   // tomorrow.setDate(tomorrow.getDate() + 1);
   // tomorrow.setHours(0, 0, 0, 0);

   // // divide by 1000 to get timestamps in seconds
   // const currentTimeStamp = Math.floor(current.getTime() / 1000);
   // const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);

   const endOfDay = moment().tz(timezone).endOf("day").valueOf();
   const eodTimeStapm = Math.floor(endOfDay / 1000);

   const todayData = hourlyData.filter(data => data.dt < eodTimeStapm);

   return todayData;
}

const CityPage = ({ city, currentWeather, dailyWeather, hourlyWeather, timezone }) => {

   //console.log(hourlyWeather);

   return (
      <div className='max-w-4xl mx-auto'>
         <Head>
            <title>{city.name} - Said's Weather App</title>
         </Head>

         <div className='my-10'>
            <div className='mx-5'>

               <div className='p-3'>
                  <Link href='/'>
                     <a className='text-blue-600 font-bold text-lg'>&larr; Inicio</a>
                  </Link>
               </div>

               <SearchBox placeholder='Buscar otra Ciudad ...'/>
               <TodaysWeather city={city} weather={dailyWeather[0]} currentWeather={currentWeather} timezone={timezone} />
               <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
               <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
            </div>
         </div>
      </div>
   )
}

export default CityPage;


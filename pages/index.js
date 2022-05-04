import Head from 'next/head'
import FavouritePlaces from '../components/FavouritesPlaces'
import SearchBox from '../components/SearchBox'
import OpenWeatherMaps from '../assets/img/openweather.jpg'
import Image from 'next/image'

export default function Home() {
	return (
		<div className='w-screen h-screen border-4 p-5'>
			<Head>
				<title>Said's Weather App</title>
				<meta name="description" content="Said's Weather App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className='flex h-full items-center justify-center'>
				<div className='relative max-w-3xl mx-auto w-full'>
					
					<SearchBox placeholder='Buscar ciudad ...'/>
					<FavouritePlaces />
				</div>
			</div>
		</div>
	)
}

import bg from '@/assets/nursery1_2.mp4'
import styles from '../styles/hero.module.css'
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <section className={styles.box}>
            <div className={styles.overlay}></div>

            <video src={bg} autoPlay muted loop></video>
            <div className='z-10 flex flex-col items-center lg:absolute left-56'>
                <h1 className='text-6xl text-white font-bold pb-3'>Outdoor Plants</h1>
                <h1 className='text-6xl text-white font-bold mb-10'>Have Arrived!</h1>
                <h3 className='text-xl text-white max-w-md mb-10'>Introducing our first collection of outdoor plants for your porch, patio, and yard</h3>
                <div className='flex items-center gap-10'>
                    <Link to='/allProducts'>
                        <button className='btn-green-square'>Outdoor Collections</button>
                    </Link>
                    <a href="#products">
                        <button className='btn-white-square'>New Arrivals</button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero
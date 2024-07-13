import { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";

import { useNavigate } from "react-router-dom";
import ProductRating from "@/components/ProductRating";



const AllProduct = ({ item }) => {


    return (
        <div>
            <TiltCard item={item} />
        </div>
    )
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;


const TiltCard = ({ item }) => {
    const navigate = useNavigate()

    const goToProductDetailsPage = () => {
        navigate(`/${item?._id}`)
    }

    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}

            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-96 w-72 rounded-xl bg-paste cursor-pointer"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                    // eslint-disable-next-line react/prop-types
                    backgroundImage: `url(${item?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onClick={goToProductDetailsPage}
                className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
            >

                {/* <FiMousePointer
          style={{
            transform: "translateZ(75px)",
          }}
          className="mx-auto text-4xl absolute bottom-5 left-3"
        /> */}

                <p
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="text-center text-2xl font-bold absolute bottom-20 left-3 text-white"
                >
                    {item?.title}
                </p>
                <p
                    style={{
                        transform: "translateZ(75px)",
                    }}
                    className="mx-auto text-4xl absolute bottom-10 left-3 text-lightGreen font-bold"
                >
                    {item?.price}
                </p>

                <p
                    style={{
                        transform: "translateZ(35px)",
                    }}
                    className="mx-auto text-xl absolute bottom-1 -left-1 text-lightGreen font-bold"
                >
                    <ProductRating item={item} />
                </p>

                <button style={{
                    transform: "translateZ(15px)",
                }}
                    className="mx-auto text-sm absolute bottom-6 right-5 text-black font-bold btn-green-square z-20">
                    Add To Cart
                </button>
            </div>
        </motion.div>
    );
};

export default AllProduct
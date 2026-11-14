import { useEffect, useState } from "react"

const backgroundImages = [
    {image: "public/images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg"},
    {image: "public/images/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg"},
    {image: "public/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg"}
]
function Home() {
    const [slideIndex,setslideIndex] = useState<number>(0)
    const nextSlide = () => {
        if (slideIndex < backgroundImages.length - 1) {
            setslideIndex((prev) => prev + 1)
        } else {
            setslideIndex(0)
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        },5000)
        return () => clearInterval(interval)
    },[nextSlide])
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImages[slideIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    className="h-[100vh] w-full transition-all duration-300">
        <div className="w-full h-full bg-black opacity-60"></div>
    </div>
  )
}

export default Home

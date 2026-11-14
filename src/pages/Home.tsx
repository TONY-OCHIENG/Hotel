import { useState } from "react"

const backgroundImages = [
    {image: "public/images/christian-lambert-vmIWr0NnpCQ-unsplash.jpg"},
    {image: "public/images/point3d-commercial-imaging-ltd-oxeCZrodz78-unsplash.jpg"},
    {image: "public/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg"}
]
function Home() {
    const [slideIndex,setslideIndex] = useState<number>(0)
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImages[slideIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    className="h-[100vh] w-full bg-black transition-all duration-300">
    </div>
  )
}

export default Home

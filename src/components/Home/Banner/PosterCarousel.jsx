import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
  
  const PosterCarousel = ({images, interval}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)


    useEffect(() =>{
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)
        }, interval)

        return () => {
            clearInterval(intervalId);
        }
    }, [images, interval])

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)
    }

    return (
      <div className="root">
        <Paper>
            <img
                src={images[currentImageIndex]}
                alt="image"
                className="image"
            />
            <div className="controls">
                <Button className="arrow" onClick={prevImage}>
                    <AiOutlineLeft/>
                </Button>
                <Button className="arrow" onClick={nextImage}>
                    <AiOutlineRight/>
                </Button>
            </div>
        </Paper>
      </div>
    )
  }
  
  export default PosterCarousel;
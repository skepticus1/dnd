import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCharacter } from '../context/CharContext';
import { useParams } from 'react-router-dom';



function CharSheetImage() {
    const { charData, setCharData } = useCharacter()
    const [imageSrc, setImageSrc] = useState('');
    const URL = "http://localhost:8000/api/chars/generate_image/";

    const savedCharImg = `data:image/png;base64,${charData.image_data}`
    //console.log(savedCharImg) //long string, only log if t/sing

    
    // auth details
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'Authorization': `Token ${token}`
        }
    }

    const generateImage = () => {
        console.log("making a character with this values\n",
                        `sex : ${charData.sex}`,
                        `race : ${charData.race}`,
                        `class : ${charData.charClass}`,
                        `hair : ${charData.hair}`,
                        `eyes : ${charData.eyes}`,
                        `skin : ${charData.skin}`)
        // set the prompt
        const prompt = {
            "prompt": `attractive upper portrait of a ${charData.sex} ${charData.race}, ${charData.charClass}, ${charData.hair} hair, ${charData.eyes} eyes, ${charData.skin} skin, HDR`,
            "negative_prompt": "nude, naked, (worst quality:0.8), verybadimagenegative_v1.3 easynegative, (surreal:0.8), (modernism:0.8), (art deco:0.8), (art nouveau:0.8)",
            "steps": 20,
            "cfg_scale": 7,
            "width": 512,
            "height": 512,
            "sampler_index": "DPM++ 2M Karras",
        }

        // api request to stable diffusion api
        axios.post(URL, prompt)
            .then(response => {
                const imageData = response.data.images && response.data.images[0]
                if(imageData){
                    const base64Image = imageData.split(",", 1)[0]
                    setCharData(prevData => ({...prevData, image_data: base64Image}))
                    setImageSrc(`data:image/png;base64,${base64Image}`)

                }
            })
            .catch(error => {
                console.log("Error fetching image: ", error)
            })
    }


    const fetchModels = async () => {
        try {
            const response = await fetch('http://172.24.160.1:7860/sdapi/v1/sd-models')

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.error('error fetching models: ', error)
        }
    }

    const getModels = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/chars/sd_models')
            console.log(response.data)

        } catch (error ) {
            console.error("Error fetching models: ", error)
            if(error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }
    }

    return (
        <>
            <div>
            </div>
            <div>
                <div className='text-center'>
                    <button className='btn btn-dark' onClick={generateImage}>Generate Image</button>
                </div>
                {charData.image_data ?
                    <img src={savedCharImg} alt="Saved Char Image" className='img-fluid border p-1' /> :
                    <p> No character image available.</p>
                }
               
            </div>
        </>
    )



}

export default CharSheetImage;

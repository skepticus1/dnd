import { useState, useEffect } from 'react';
import axios from 'axios';



function CharSheetImage() {
    const [imageSrc, setImageSrc] = useState('');
    const URL = "http://localhost:8000/api/chars/generate_image/";

    const generateImage = () => {
        // set the prompt
        const prompt = {
            "prompt": "(best-quality:0.8), (best-quality:0.8), perfect anime illustration of a landscape of a Elusive Exhausted [Train station:Angkor Wat:2] and Moving Bangladeshi Convenience store, Sunny, Anime screencap, Flustered, Street Art, Gel lighting, Fish-eye Lens, Fujicolor, caustics, surreal design, ultra high res, HDR",
            "negative_prompt": "(worst quality:0.8), verybadimagenegative_v1.3 easynegative, (surreal:0.8), (modernism:0.8), (art deco:0.8), (art nouveau:0.8)",
            "steps": 40,
            "cfg_scale": 7,
            "width": 512,
            "height": 512,
            "sampler_index": "DPM++ 2M Karras",
        }

        // api request
        axios.post(URL, prompt)
            .then(response => {
                const imageData = response.data.images && response.data.images[0]
                if(imageData){
                    const base64Image = imageData.split(",", 1)[0]
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
                <button onClick={generateImage}>Generate Image</button>
                {imageSrc ? <img src={imageSrc} alt="CharacterSheet" />: <p>Image will appear here...</p>}
            </div>
            <div>
                <button onClick={getModels}>Get Models</button>
                <button onClick={fetchModels}>Fetch Models</button>
                
            </div>
        </>
    )



}

export default CharSheetImage;

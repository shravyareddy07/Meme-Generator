import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function downloadMeme() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
      
        // Set canvas dimensions to match the meme image
        canvas.width = meme.randomImage.width;
        canvas.height = meme.randomImage.height;
      
        // Draw the meme image on the canvas
        const img = new Image();
        img.src = meme.randomImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
      
          // Add meme text to the canvas
          ctx.font = '30px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText(meme.topText, canvas.width / 2, 40);
          ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);
      
          // Convert the canvas to a data URL
          const dataURL = canvas.toDataURL('image/jpeg');
      
          // Create an anchor element to trigger the download
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = 'meme.jpeg'; // Set the desired filename for the downloaded image
          a.style.display = 'none';
      
          // Append the anchor element to the DOM
          document.body.appendChild(a);
      
          // Trigger a click event to start the download
          a.click();
      
          // Remove the anchor element from the DOM
          document.body.removeChild(a);
        };
      }
      
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div className="download">
            <button  className="download--button" onClick={downloadMeme}>
                Download Meme 📥
            </button>

            </div>
        </main>
    )
}
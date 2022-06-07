import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

function App() {

  const [project, setProjects] = useState([])
  const [data, setData] = useState([])
  const [imageWidth, setImageWidth] = useState("")
  const [imageHeigth, setImageHeigth] = useState("")
  // const [layer_set, setLayerSet] = useState("")
  const [nameLayer, setNameLayer] = useState({
    // slug: "",
    name: "",
    // images_set: []
  })

  const readProjects = async () => {
      try {
      const response = await fetch("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/")
      const projects = await response.json()
      console.log(projects)
      setProjects(projects)
      setData(projects.layer_set)
      } catch (error) {
      console.log(error)
      }
  }

  useEffect(() => {
      readProjects()
  }, [])

  const saveMeasures = e => {
    e.preventDefault();
    axios.post(`http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/`, {
      // slug: "7f0afe1efd2544bd8ff1a82ea1088df8",
      image_width: imageWidth,
      image_heigth: imageHeigth,
      layer_set: []
    })
    .then(function(response) {
      console.log('Post exitoso', response)
      setImageWidth("")
      setImageHeigth("")
      readProjects()
    })
    .catch(error => console.log(error))
  }

  // const handleChange=e=>{
  //   const newNameLayer = {...nameLayer}
  //   newNameLayer[e.target.id] = e.target.value
  //   setNameLayer(newNameLayer)
  //   console.log(newNameLayer)
  // }

  const handleChange = e =>{
    const newNameLayer = {...nameLayer}
    newNameLayer[e.target.id] = e.target.value
    setNameLayer(newNameLayer)
    console.log(newNameLayer)
  }

  const saveNameLayer = async (e) =>{
    e.preventDefault()
    await axios.post("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/", {
      layer_set: [
          nameLayer
      ]
    })
    .then( response => {
      console.log(response.data.layer_set)
      console.log(data.concat(response.data.layer_set))
      setData(data.concat(response.data.layer_set))
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <div className="layout_container">
        <section>
          <div className="card_container_grid">
            <div>
                <article>
                  <div className='card_content'>
                    <figure>
                      <img src="https://www.elargonauta.com/static/img/no-preview.jpg" alt="NFT Proyecto" />
                    </figure>
                  </div>
                </article>
            </div>
            <div>
              <article>
                <div className="card_content">
                  <div className="tag">
                    <span>Size</span>
                    <div>{project.image_width}</div>
                    <span>x</span>
                    <div>{project.image_heigth}</div>
                  </div>
                  <div>
                    <h2>NFT Collection Settings</h2>
                    <form>
                        <div>
                          <div>
                            <label htmlFor='width'>Width</label>
                            <input 
                              type='text' 
                              id='width' 
                              value={imageWidth} 
                              placeholder={project.image_width} 
                              onChange={(e) => setImageWidth(e.target.value)} 
                            />
                          </div>
                          <div>
                            <label htmlFor='heigth'>Height</label>
                            <input 
                              type='text' 
                              id='heigth' 
                              value={imageHeigth} 
                              placeholder={project.image_heigth} 
                              onChange={(e) => setImageHeigth(e.target.value)} 
                            />
                          </div>
                        </div>
                        <button className="button_ui" onClick={saveMeasures}>
                            Guardar
                        </button>
                    </form>
                </div>
                </div>
              </article>
              <article>
                <div className="card_content">
                  <h2>No Layers added yet</h2>
                  <p>Start by adding a layer, for example background layer</p>
                  <button className="button_ui">
                    <i>
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                    Agregar layer
                  </button>
                  <h2>Agregar layer</h2>
                  {/* {
                    project.layer_set.map(item => (
                      <h2 key={item.slug}>{item.slug} </h2>
                    ))
                  } */}
                  <form>
                    <div>
                      <label htmlFor='name'>Nombre</label>
                      <input 
                        type='text' 
                        id='name' 
                        name="name"
                        onChange={handleChange} 
                      />
                    </div>
                    <button className="button_ui" onClick={(e)=>saveNameLayer(e)}>
                            Guardar
                        </button>
                  </form>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
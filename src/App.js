import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faRedo } from '@fortawesome/free-solid-svg-icons';
import AddNameLayer from "./AddNameLayer";
import NamesLayer from "./NamesLayer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


function App() {

  const [project, setProjects] = useState([])
  const [imageWidth, setImageWidth] = useState("")
  const [imageHeigth, setImageHeigth] = useState("")
  const [layers, setLayers] = useState([])

  const readProjects = async () => {
      try {
        const response = await fetch("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/")
        const projects = await response.json()
        console.log(projects.layer_set)
        setLayers(projects.layer_set)
        setProjects(projects)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
      readProjects()
  }, [])

  const saveMeasures = () => {
    axios.post(`http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/`, {
      image_width: imageWidth,
      image_heigth: imageHeigth,
      layer_set: [
        ...layers
      ]
    })
    .then(function(response) {
      console.log('Post exitoso', response)
      setImageWidth("")
      setImageHeigth("")
      readProjects()
    })
    .catch(error => console.log(error))
  }

  const addNameLayer = (layer) => {
      axios.post("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/", {
      layer_set: [
          ...layers,
          layer
      ]
    })
    .then( response => {
      console.log(response.data.layer_set)
      readProjects()
      // setLayers([
      //   ...layers,
      //   layer
      // ]
      // )
    })
    .catch(error => console.log(error))
  }

  let buttonsShowModal = document.querySelectorAll(".button_show_modal")
  let buttonsCloseModal = document.querySelectorAll(".button_close_modal")
  let modalsUI = document.querySelectorAll(".modal_ui")

  buttonsShowModal.forEach((buttonShowModal, index) => {
    buttonShowModal.onclick = function () {
      modalsUI[index].classList.add("show_modal")
    }
  })

  buttonsCloseModal.forEach((buttonCloseModal, index) => {
    buttonCloseModal.onclick = function () {
      modalsUI[index].classList.remove("show_modal")
    }
  })

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
                  <div className="project_head">
                    <div className="button_show_modal tag">
                      <span>Size</span>
                      <div>{project.image_width}</div>
                      <span>x</span>
                      <div>{project.image_heigth}</div>
                    </div>
                    <div>
                      {
                        layers.length === 0 ?
                          <button className="button_ui" disabled>
                            <i>
                              <FontAwesomeIcon icon={faRedo} />
                            </i>
                            Generate Collection
                          </button>
                        :
                          <a href={`https://www.google.com.gt/search?q=[${project.slug}]`} className="button_ui">
                            <i>
                              <FontAwesomeIcon icon={faRedo} />
                            </i>
                            Generate Collection
                          </a>
                      }
                    </div>
                  </div>
                  <div className="modal_ui modal_container">
                      <button className="button_close_modal button_square_icon button_square_icon_bg button_square_icon_tr15">
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                      <div className="modal_content card_content">
                        <h2 className="title_head">NFT Collection Settings</h2>
                        <form className="mt-4" onSubmit={saveMeasures}>
                          <div className="form_textfield">
                            <label htmlFor='width'>Width</label>
                            <input 
                              type='text' 
                              id='width' 
                              value={imageWidth} 
                              placeholder={project.image_width} 
                              onChange={(e) => setImageWidth(e.target.value)} 
                            />
                          </div>
                          <div className="form_textfield">
                            <label htmlFor='heigth'>Heigth</label>
                            <input 
                              type='text' 
                              id='heigth' 
                              value={imageHeigth} 
                              placeholder={project.image_heigth} 
                              onChange={(e) => setImageHeigth(e.target.value)} 
                            />
                          </div>
                          <div className="mt-3">
                            <button className="button_ui button_ui_w100">
                                Guardar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
              </article>
              <article className="mt-4">
                
                  {
                    layers.length === 0 ?
                    <React.Fragment>
                      <div className="card_content card_content_pt_large">
                        <h2 className="title_head text-center">No Layers added yet</h2>
                        <p className="text-center">Start by adding a layer, for example background layer</p>
                        <div className="d-flex justify-content-center">
                          <button className="button_show_modal button_ui">
                            <i>
                              <FontAwesomeIcon icon={faPlus} />
                            </i>
                            Agregar layer
                          </button>
                        </div>
                        <div className="modal_ui modal_container">
                          <button className="button_close_modal button_square_icon button_square_icon_bg button_square_icon_tr15">
                            <FontAwesomeIcon icon={faClose} />
                          </button>
                          <div className="modal_content card_content">
                            <h2 className="title_head">Agregar layer</h2>
                            <AddNameLayer addNameLayer={addNameLayer} />
                          </div>
                        </div>
                      </div>
                    </React.Fragment> 
                    :
                    <NamesLayer layers={layers} />
                  }
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
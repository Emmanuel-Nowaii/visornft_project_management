import React from "react";
import { useForm } from "react-hook-form";

export default function AddNameLayer (props) {

  

    const {register, handleSubmit, formState: { errors }} = useForm()

    const onSubmit = (data, e) => {
      // console.log(data)
      props.addNameLayer(data)
      e.target.reset()
    }

    return (
      <React.Fragment>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_textfield">
            <label htmlFor='name'>Nombre</label>
            <input 
              type='text' 
              id='name' 
              {...register('name', {
                  required: "Campo requerido",
              })}
            />
            {errors.name && errors.name.message}
          </div>
          <div className="mt-3">
            <button className="button_ui button_ui_w100">
                Guardar
            </button>
          </div>
        </form>
      </React.Fragment>
    )
}
import React from "react";
import { Form, Field } from "react-final-form";




const onSubmit = async (values) => {
  values.no_of_slices && (values.no_of_slices=parseInt(values.no_of_slices))
  values.slices_of_bread && (values.slices_of_bread=parseInt(values.slices_of_bread))
  values.spiciness_scale && (values.spiciness_scale=parseInt(values.spiciness_scale))
  values.diameter && (values.diameter=parseInt(values.diameter))
  const url = "https://frosty-wood-6558.getsandbox.com:443/dishes";

const xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      alert(xhr.responseText);
   }};


xhr.send(JSON.stringify(values, 0, 2));
};

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const required = (value) => (value ? undefined : "Required");

const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be at least ${min}`;
const maxValue = (max) => (value) =>
  isNaN(value) || value > max ? `Can't exceed ${max}` : undefined;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

function App() {
  return (
    <main className="main">
      <h1>Dishes</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label htmlFor='name' className='label'>Dish name:</label>
                  <input
                  {...input}
                    type="text"
                    id='name'
                    className={meta.error && meta.touched ? " input input-alert" : 'input'}
                    placeholder="dish name"
                  />
                  {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="preparation_time" validate={required}>
              {({ input, meta }) => (
                <div>
                 <label htmlFor="preperation_time">Preperation time:</label>
                 
                 <input {...input} id="preperation_time" type="time" className={meta.error && meta.touched ? " input input-alert" : 'input'} name="preperation_time" step="2" />
                  {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div>
              <label htmlFor='type' className='label'>Dish type:</label>
              <Field className={'input'} validate={required} id='type' name="type" component="select" initialValue='pizza'>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
              </Field>
            </div>
            <Condition when="type" is="pizza">
              <Field
                name="no_of_slices"
                validate={composeValidators(
                  required,
                  mustBeNumber,
                  minValue(1)
                )}
              >
                {({ input, meta }) => (
                  <div>
                    {delete values.spiciness_scale}
                    {delete values.slices_of_bread}
                    <label htmlFor='no_of_slices' className='label'>Number of slices:</label>
                    <input
                      {...input}
                      type="number"
                      id='no_of_slices'
                      placeholder="Number of slices"
                      
                      className={meta.error && meta.touched ? " input input-alert" : 'input'}
                    />
                    {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div>
              <label htmlFor='diameter' className='label'>Diameter:  {values.diameter}</label>
              <Field
                name="diameter"
                id='diameter'
                component="input"
                className="input inpur-range"
                type="range"
                min={20}
                max={40}
                initialValue={30}
              />
              </div>
            </Condition>
            <Condition when="type" is="soup">
              <div>
              <label htmlFor='spiciness_scale' className='label'>Spiciness level:  {values.spiciness_scale}</label>
              <Field
                name="spiciness_scale"
                id='spiciness_scale'
                component="input"
                className='input input-range'
                type="range"
                min={1}
                max={10}
                initialValue={5}
              />
              </div>
              {values.spiciness_scale &&
                delete values.no_of_slices &&
                delete values.diameter &&
                delete values.slices_of_bread}

            </Condition>
            <Condition when="type" is="sandwich">
              <Field
                name="slices_of_bread"
                validate={composeValidators(
                  required,
                  maxValue(6),
                  mustBeNumber,
                  minValue(1)
                )}
              >
                {({ input, meta }) => (
                  <div>
                    {delete values.diameter}
                    {delete values.no_of_slices}
                    {delete values.spiciness_scale}
                    <label htmlFor='slices_of_bread' className='label'>Number of slices</label>
                    <input
                      {...input}
                      type="number"
                      id='slices_of_bread'
                      placeholder="number of slices"
                      initialValue={1}
                      className={meta.error && meta.touched ? " input input-alert" : 'input'}
                    />
                    {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </Condition>

            <div className="buttons">
              <button className='button button-submit' type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
                className='button button-reset'
              >
                Reset
              </button>
            </div>
            <pre>
            <h2>Your dish:</h2>
            {JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
      <div>
        
        

          
      </div>
    </main>
  );
}

export default App;

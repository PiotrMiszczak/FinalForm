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
      console.log(xhr.responseText);
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
      <h1>Dishes form</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Dish name</label>
                  <input
                  {...input}
                    type="text"
                    className={meta.error && meta.touched && "input-alert"}
                    placeholder="dish name"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="preparation_time" validate={required}>
              {({ input, meta }) => (
                <div>
                 <label for="appt">Preperation time:</label>
                 
                 <input {...input} id="appt-time" type="time" name="appt-time" step="2" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div>
              <label>Dish type:</label>
              <Field validate={required} name="type" component="select">
                <option />
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
                    <label>Number of slices:</label>
                    <input
                      {...input}
                      type="number"
                      placeholder="Number of slices"
                      initialValue={1}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <label>Diameter:</label>
              <Field
                name="diameter"
                component="input"
                type="range"
                min={20}
                max={40}
                initialValue={30}
              />
              {values.diameter}
            </Condition>
            <Condition when="type" is="soup">
              <label>spiciness_scale:</label>
              <Field
                name="spiciness_scale"
                component="input"
                type="range"
                min={1}
                max={10}
                initialValue={5}
              />
              {values.spiciness_scale &&
                delete values.no_of_slices &&
                delete values.diameter &&
                delete values.slices_of_bread}
              {values.spiciness_scale}
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
                    <label>Number of slices</label>
                    <input
                      {...input}
                      type="number"
                      placeholder="number of slices"
                      initialValue={1}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </Condition>

            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </main>
  );
}

export default App;

import React , {useState} from 'react'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}



const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>)

const required = value => (value ? undefined : 'Required')
//validate={composeValidators(required, mustBeNumber, minValue(18))}
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be at least ${min}`
const maxValue = max => value =>
  isNaN(value) || value > max ? `Can't exceed ${max}` : undefined
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

function App(){

  const [diameter, setDiameter] = useState(30)
  const [spiciness, setSpiciness] = useState(5)
  
  return(
    
  <main className='main'>
    <h1>Dishes form</h1>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className='form' onSubmit={handleSubmit}>
          <Field name="dishName" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Dish name</label>
                <input {...input} type="text" className={meta.error && meta.touched && 'input-alert'} placeholder="dish name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          
          <Field name="prepTime" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Preperation Time</label>
                <input {...input} type="text" placeholder="Preperation time" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div>
            <label>Dish type:</label>
          <Field validate={required} name='dishType' component='select'>
          <option />
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
              </Field>
          </div>
          <Condition when="dishType" is="pizza">
          <Field name="numberOfSlices" validate={composeValidators(required, mustBeNumber, minValue(1))}>
            {({ input, meta }) => (
              <div>
                {delete values.spiciness}
          {delete values.numberOfSlicesBread}
                <label>
               Number of slices:</label>
                <input {...input} type="number" placeholder="Number of slices" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
               
              </div>
            )}
          </Field>
          <label>Diameter:</label>
          <Field name="diameter" component="input" type="range" min='20' max='40' initialValue='30'  />
          {values.diameter}
          
          </Condition>
          <Condition when="dishType" is="soup">
              
          <label>
        
          Spiciness:</label>
          <Field name="spiciness" component="input" type="range" min='1' max='10' initialValue='5'  />
          {values.spiciness && delete values.numberOfSlices && delete values.diameter && delete values.numberOfSlicesBread}
          {values.spiciness}
          
          
         
          </Condition>
          <Condition when="dishType" is="sandwich">
          
          <Field name="numberOfSlicesBread" validate={composeValidators(required, maxValue(6), mustBeNumber, minValue(1))}>
            {({ input, meta }) => (
              
              <div>
                {delete values.diameter}
          {delete values.numberOfSlices}
          {delete values.spiciness}
                <label>Number of slices</label>
                <input {...input} type="number"  placeholder="number of slices" />
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
)}

export default App;

import React, { useState } from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import _ from 'lodash';
import DatePicker from "react-datepicker";
import {Modal,Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function App() {
  const [startDate, setDate] = useState(new Date());
  const [dateValidation, setdateValidation] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [selectedDDValue, updateDD] = useState('technical');
  const [selectValue, updateselectValue] = useState('');

  const { register, watch, setValue, handleSubmit, errors, getValues } = useForm({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  });

  const dropDownData = [
    {'technical': ['Short Reports', 'Annual Reports', 'Presentations'] },
    {'english': ['Poetry', 'Short Stories', 'Drama']},
    {'computer': ['Web Development', 'Desktop Software Development', 'Research and Analysis']}
  ]

  // on form submit
  const onSubmit = data => {
    var formatedDate = moment(startDate).format('YYYY-MM-DD')
    if (!_.includes(['2019-12-20', '2020-01-15', '2020-02-01'], formatedDate)) {
      setdateValidation(true);
      return 
    } else {
      setdateValidation(false);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      setModal(true)
    }, 3000);
  };

  // on drop down option change
  const onOptionChange = (event) => {
    updateselectValue(event.target.value)
  }

  // on radio button select
  const onRadioChange = (event) => {
    updateDD(event.target.value)
    updateselectValue('');
  }

  // build select drop down options
  const buildOptions = () => {
    var arr = [];
    arr.push(<option value="">Select any subject</option>)
    const { course } = getValues();
    dropDownData.map(value => {
        _.forEach(value[selectedDDValue], function (test) {
            arr.push(<option value={test}>{test}</option>)
        })
    })
    return arr;
  }

  // on Date select
  const onDateChange = (date) => {
    setDate(date)
    var formatedDate = moment(date).format('YYYY-MM-DD');
    if (!_.includes(['2019-12-20', '2020-01-15', '2020-02-01'], formatedDate)) {
      setdateValidation(true)
    } else {
      setdateValidation(false)
    }
  }

   // on Modal close
  const handleClose = () => setModal(false);

  return (
    <div className="App">
      <header class="App-header py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group row mx-0">
            <label for="staticEmail" class="col-sm-3 col-form-label px-0 text-left">Course</label>
            <div class="col-sm-9 pr-0">
              <div class="form-check fullWidth">
                <input name="course" class="form-radio-input float-left d-inline w-auto mt-1 mr-2"
                  checked={selectedDDValue === 'technical'} 
                  type="radio" id="technical" value="technical" ref={register({ required: true })} onChange={onRadioChange} />
                  <label class="form-check-label mt-0 float-left" for="exampleRadios1">Technical Report Writing</label>
              </div>
              <div class="form-check fullWidth">
                <input name="course" class="form-radio-input float-left d-inline w-auto mt-1 mr-2"
                  checked={selectedDDValue === 'english'} 
                  type="radio" id="english" value="english" ref={register({ required: true })} onChange={onRadioChange} />
                  <label class="form-check-label mt-0 float-left" for="exampleRadios2">English Literature</label>
              </div>
              <div class="form-check fullWidth">
                <input name="course" class="form-radio-input float-left d-inline w-auto mt-1 mr-2"
                  checked={selectedDDValue === 'computer'} 
                  type="radio" id="computer" value="computer" ref={register({ required: true })} onChange={onRadioChange} />
                  <label class="form-check-label mt-0 float-left" for="exampleRadios2">Computer Sciences</label>
              </div>
              {errors.course &&  <div class="alert float-left text-left small p-2 ml-3 mt-2 alert-danger">
                Please select any course
              </div>}
            </div>
          </div>
          <div class="form-group row mx-0 mt-3 fullWidth">
            <label for="staticEmail" class="col-sm-3 col-form-label mt-0 px-0 text-left">Subject</label>
            <div class="col-sm-9 pr-0">
              <div class="form-check fullWidth">
                <select name="subject" class="form-control" value={selectValue} ref={register({ required: true })} onChange={onOptionChange}>
                {buildOptions()}
                </select>
                {errors.subject &&  <div class="alert float-left text-left small p-2  mt-2 alert-danger">
                  Please select any Subject
                </div>}
              </div>
            </div>
          </div>
          <div class="form-group row mx-0 mt-3 fullWidth form-datepicker">
            <label for="staticEmail" class="col-sm-3 col-form-label mt-0 px-0 text-left">Start Date</label>
            <div class="col-sm-9 pr-0">
              <div class="form-check fullWidth">
                <DatePicker class="form-control fullWidth" selected={startDate} onChange={onDateChange} />
              </div>
              {dateValidation && <div class="alert float-left text-left small p-2 ml-3 mt-2 alert-danger">
                Your selected course and subject is not offered beginning from your selected date
              </div>}
            </div>
          </div>
          <div class="form-group row mx-0 mt-3 fullWidth form-datepicker">
            <label for="staticEmail" class="col-sm-3 col-form-label mt-0 px-0 text-left">Additional Notes</label>
            <div class="col-sm-9 pr-0">
              <div class="form-check fullWidth">
                <textarea name="notes" placeholder="Enter Additional notes" class="form-control" rows="4" ref={register({maxLength: 500,minLength: 20})} />
              </div>
              {errors.notes && errors.notes.type === 'minLength' && <div class="alert float-left text-left small p-2 ml-3 mt-2 alert-danger">
                Note is not less than 20 characters and not more than 500 characters
              </div>}
              {errors.notes && errors.notes.type === 'maxLength' && <div class="alert float-left text-left small p-2 ml-3 mt-2 alert-danger">
                Max length exceeded
              </div>}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-default fullWidth py-3" type="submit">
              {isLoading ? <div class="spinner-border small"></div> : 'Submit'}
            </button>
          </div>
        </form>
      </header>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your course has been successfully registered.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

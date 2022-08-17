import React from "react";

function StepOne(props) {
    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49717" className="slide-2 w-slide" id='stepOne'>
            <div className="slider-content-wrap">
                <div className="form-2">
                    <div className="form-title-wrap">
                        <div className="form-section-title">Let's get started</div>
                        <p className="form-paragraph">Please fill in the details below so that we can generate an<br />awesome post for you.<br /></p>
                    </div>
                    <div className="form-wrap-2 extra-space">
                        <label htmlFor="Name" className="field-label-11">Enter Tagline</label>
                        <input type="text" onChange={props.tagLineHandler} className="text-field-3 w-input" maxLength={256} name="Name" data-name="Name" placeholder="eg. Nike - Just Do It" id="Name" required />
                        <label htmlFor="day" className="field-label-11">Category</label>
                        <select id="day" onChange={props.categoryHandler} name="day" data-name="day" required className="form-field select-field wide w-select" >
                            <option value>Select a Category</option>
                            <option value="Anxiety">Anxiety</option>
                            <option value="Change">Change</option>
                            <option value="Choice">Choice</option>
                            <option value="Confidence">Confidence</option>
                            <option value="Courage">Courage</option>
                            <option value="Death">Death</option>
                            <option value="Dreams">Dreams</option>
                            <option value="Excellence">Excellence</option>
                            <option value="Failure">Failure</option>
                            <option value="Fairness">Fairness</option>
                            <option value="Fear">Fear</option>
                            <option value="Forgiveness">Forgiveness</option>
                            <option value="Freedom">Freedom</option>
                            <option value="Future">Future</option>
                            <option value="Happiness">Happiness</option>
                            <option value="Inspiration">Inspiration</option>
                            <option value="Kindness">Kindness</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Life">Life</option>
                            <option value="Living">Living</option>
                            <option value="Love">Love</option>
                            <option value="Pain">Pain</option>
                            <option value="Past">Past</option>
                            <option value="Success">Success</option>
                            <option value="Time">Time</option>
                            <option value="Today">Today</option>
                            <option value="Truth">Truth</option>
                            <option value="Work">Work</option>
                            <option value="Technology">Technology</option>
                            <option value="Naval Ravikant">Naval Ravikant</option>
                        </select>
                        <label htmlFor="day-2" className="field-label-11">Post</label>
                        <select id="day-2" onChange={props.postHandler} name="day-2" data-name="Day 2" required className="form-field select-field wide w-select">
                            <option value>Select Post Medium</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Story">Story</option>
                        </select>
                        <label htmlFor="day-2" className="field-label-11">Media Type</label>
                        <select id="day-3" onChange={props.mediaTypeHandler} name="day-2" data-name="Day 2" required className="form-field select-field wide w-select">
                            <option value>Select Media Type</option>
                            <option value="Image">Image</option>
                            <option value="Video">Video</option>
                        </select>
                    </div>
                </div>
                <div className="details-right">
                    <img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e89cc8ffdfdb_1.svg"
                        alt="CounterImage"
                        className="counter-image" />
                    <div className="text-counter">1 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepOne;
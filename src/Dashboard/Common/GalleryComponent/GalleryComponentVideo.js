import React from 'react'

function GalleryComponent(props) {
    return (
        <div className="card mb-3">
            <video src={props.project.post_url} controls type="video/mp4"></video>
            <div className="card-body">
                <h4 className="heading-19">{props.project.p_name}</h4>
                <h4 className="heading-21"><strong className="bold-text-5">{props.project.quote}</strong></h4>
                <h4 className="heading-21">{props.project.hashtags}</h4>
                <div className="project-message"><strong className="bold-text-6">{props.project.quote_author}</strong></div>
            </div>
            <div className="card-footer">
                <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => props.downloadVideo(e)} data-uid={props.project.post_url} className="bi bi-download"></i></button>
                <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={props.project.post_url} data-bs-id={props.project.post_uid}><i className="bi bi-share"></i></button>
                <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => props.getDeleteProjectUrl(e)} data-uid={props.project.post_uid} className="bi bi-trash"></i></button>
            </div>
        </div>
    )
}

export default GalleryComponent
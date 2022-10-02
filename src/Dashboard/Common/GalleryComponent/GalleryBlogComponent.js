import React from 'react'

function GalleryBlogComponent(props) {
    return (

        <div className="card mb-3">
            <img
                src={props.project.blogUrl}
                alt="project 1" />
            <div className="card-body">
                <h4 className="heading-19">{props.project.blogTitle}</h4>
                {/* <h4 className="heading-21"><strong className="bold-text-5">{window.location.origin}/Blogs/{project.blogTitle}{project.post_uid}</strong></h4> */}
            </div>
            <div className="card-footer">
                <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={window.location.origin + "/blogs/" + props.project.blogTitleUrl + "/" + props.project.post_uid} data-bs-id={props.project.post_uid}><i className="bi bi-share"></i></button>
                <button className="btn btn-dark " data-bs-target="#deleteBlogModal" data-bs-toggle="modal" ><i onClick={(e) => props.getDeleteProjectUrl(e)} data-uid={props.project.post_uid} className="bi bi-trash"></i></button>
            </div>
        </div>
    )
}

export default GalleryBlogComponent
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import { photos } from "./FinalPhoto";

function PhotoGallery() {
    const [selectAll, setSelectAll] = useState(false);
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
            />
        ),
        [selectAll]
    );

    return (
        <div>
            <p>
                <button onClick={toggleSelectAll}>toggle select all</button>
            </p>
            <Gallery
                photos={photos}
                renderImage={imageRenderer} />
        </div>
    );
}
export default PhotoGallery;
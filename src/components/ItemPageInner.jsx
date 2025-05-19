'use client'

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState, useEffect, useMemo } from "react";

/*
 * Prevents infinite‑render loops by ensuring the preload effects run only once
 * per item. Each thumbnail swaps to its high‑res counterpart as soon as that
 * file has downloaded.
 */
function ItemPageInner({ item }) {
  const [index, setIndex] = useState(-1); // -1 = closed

  /* ---------------------- helpers & derived data ---------------------- */
  const imageUrls = useMemo(() =>
    Object.entries(item)
      .filter(([k, v]) => /^image_\d+_url$/.test(k) && v)
      .map(([, v]) => v),
  [item]);

  const images = useMemo(() =>
    imageUrls.map((url, i) => ({
      src: url,
      title: item[`image_${i + 1}_caption`],
    })),
  [imageUrls, item]);

  /* ------------------ primary image preload ------------------ */
  const primarySrc = item["image_1_url"];
  const primaryThumb = item["image_1_url_thumbnail"];
  const [primaryReady, setPrimaryReady] = useState(false);

  useEffect(() => {
    if (!primarySrc) return;
    setPrimaryReady(false);
    const img = new Image();
    img.src = primarySrc;
    img.onload = () => setPrimaryReady(true);
    return () => (img.onload = null);
  }, [primarySrc]);

  /* ------------------ gallery images preload ------------------ */
  const [galleryReady, setGalleryReady] = useState({});

  useEffect(() => {
    // reset when item changes
    setGalleryReady({});
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () =>
        setGalleryReady((s) => ({ ...s, [url]: true }));
    });
  }, [item]); // run once per item, not on every render

  return (
    <>
      <div className="ItemPage__info-container">
        <div className="ItemPage__info">
          <figure className="ItemPage__primary-mobile-image-figure">
            <img
              className="ItemPage__primary-image-mobile"
              src={primaryReady ? primarySrc : primaryThumb}
              alt={item["image_1_caption"]}
              onClick={() => setIndex(0)}
            />
            <figcaption className="ItemPage__primary-mobile-image-caption">
              {item["image_1_caption"]}
            </figcaption>
          </figure>

          <h1 className="ItemPage__title">{item.Title}</h1>
          <h4 className="ItemPage__year">{item.Year}</h4>

          {item.description_paragraph_1 && (
            <div className="ItemPage__description-container">
              {item.description_paragraph_1 && (
                <p className="ItemPage__description">{item.description_paragraph_1}</p>
              )}
              {item.description_paragraph_1 && item.description_paragraph_2 && <br />}
              {item.description_paragraph_2 && (
                <p className="ItemPage__description">{item.description_paragraph_2}</p>
              )}
              {item.description_paragraph_2 && item.description_paragraph_3 && <br />}
              {item.description_paragraph_3 && (
                <p className="ItemPage__description">{item.description_paragraph_3}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ------------------ Gallery images ------------------ */}
      <div className="ItemPage__gallery">
        {imageUrls.map((url, i) => {
          const thumb = item[`image_${i + 1}_url_thumbnail`];
          const ready = galleryReady[url];
          return (
            <figure key={url} data-index={i} className="ItemPage__gallery-figure">
              <img
                src={ready ? url : thumb}
                alt={item[`image_${i + 1}_caption`]}
                onClick={() => setIndex(i)}
                className="ItemPage__gallery-image"
              />
              <figcaption className="ItemPage__gallery-caption">
                {item[`image_${i + 1}_caption`]}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images}
        index={index}
        plugins={[Zoom, Captions]}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </>
  );
}

export default ItemPageInner;

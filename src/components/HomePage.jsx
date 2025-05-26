import Link from 'next/link';
// import { useItems } from './../ItemContext';
import './../style/HomePage.css'; 
import HomePageLink from './HomePageLink'; 


function HomePage({ items }) {

  return (
    <div className="page-container homepage">
    <div className="homepage__container">
      {items.map((item, index) => {
        const imageSrc = item['image_1_url']; // Main image URL
        const thumbnailSrc = item['image_1_url_thumbnail'];
        const altText = item['Title'] || 'Image';
        let slug = `/item/${item['Title'].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;        

        console.log('slug', slug)
        return (
         <div key={index} className="homepage__tile-link-outer" data-index={parseInt(index + 1) % 6}>
          <div className="homepage__tile-link-spacer">
          </div>
          <HomePageLink index={index} totalItems={items.length} slug={slug} imageSrc={imageSrc} altText={altText} />
        </div>
      )})}
    </div>
  </div>
  );
}

export default HomePage;

import './../../../style/ItemPage.css'; 
import ItemPageInner from './../../../components/ItemPageInner';
import { Metadata } from 'next';
import { getImageDimensionsFromUrl } from './../../../utils/imageDimensions';

async function fetchItemData(slug) {
    const SHEET_ID = '1mqsNB3uBkdSgiM-yXvVNxont0-swRhBsDpAsibeQpnA';
    const API_KEY = 'AIzaSyCHRasM4agErGNMa64zlVjFLB1HlLra2Nc';
    const RANGE = 'Sheet1!A1:Z100';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  
    const res = await fetch(url, {
      cache: 'no-store' 
    });
    const data = await res.json();
    const [keys, ...rows] = data.values;
  
    const items = rows.map(row => {
      const entry = Object.fromEntries(keys.map((key, i) => [key, row[i]]));
      entry.slug = entry.Title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return entry;
    });
  
    return items.find(i => i.slug === slug);
  }

  
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = await fetchItemData(slug);

    let imageDimensions = await getImageDimensionsFromUrl(item.image_1_url_thumbnail )
    console.log('imageDimensions', imageDimensions)

    if (!item) {
      return {
        title: "Not Found | Matthijs Holland",
        description: "The requested artwork could not be found.",
      };
    }
  
    return {
      title: `${item.Title} | Matthijs Holland`,
      description: `View ${item.Title} by Berlin-based artist Matthijs Holland.`,
      openGraph: {
        title: `${item.Title} | Matthijs Holland`,
        description: `View ${item.Title} by Berlin-based artist Matthijs Holland.`,
        images: [
          {
            url: item.image_1_url_thumbnail || "",
            width: imageDimensions.width,
            height: imageDimensions.height,
            format: imageDimensions.format,
            alt: item.Title
          },
        ],
      }
    };
  }
 

 


async function ItemPage({ params }) {
    const { slug } = await params;
    const item = await fetchItemData(slug);

    return (
        <>
            <div className="ItemPage page-container">
                <ItemPageInner item={item}/>
            </div>
      </>
    );
  }

export default ItemPage;

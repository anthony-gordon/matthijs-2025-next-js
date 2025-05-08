import ContactForm from './../../components/ContactForm';

export async function generateMetadata() {
   
    return {
      title: `Contact | Matthijs Holland`,
      description: `Contact form for getting in touch with Berlin-based artist Matthijs Holland.`,
      openGraph: {
        title: `Contact | Matthijs Holland`,
        description: `Contact form for getting in touch with Berlin-based artist Matthijs Holland.`
      }
    };
  }
 

 

function ContactPage() {

    return (
        <>
            <div className="ContactPage page-container">
            <h1 className="ContactPage__title" >Get in contact.</h1>
                <ContactForm/>
            </div>
      </>
    );
  }

export default ContactPage;

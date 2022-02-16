import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';

const NewsletterSubscribe = () => {

  const MAILCHIMP_URL = 'https://gmail.us14.list-manage.com/subscribe/post?u=4f774b09ee4350d25f7a91a0b&amp;id=51ff48b5fa';

  return (
    <MailchimpSubscribe 
      url={ MAILCHIMP_URL }
      render={ ( props ) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm 
            status={ status }
            message={ message }
            onValidated={ formData => subscribe( formData ) }
          />
        );
      } }
    />
  );
};

export default NewsletterSubscribe;
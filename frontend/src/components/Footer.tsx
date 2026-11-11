import { FacebookIcon, InstagramIcon } from "@/components/SocialMediaIcons";
import scoutsLogo from "@/assets/scoutslogodetortels_wit.png";

const FACEBOOK_URL = 'https://www.facebook.com/tortels';
const INSTAGRAM_URL = 'https://www.instagram.com/204e_detortels/';

const FooterComponent = () => {
  return (
    <footer className="w-full bg-gray-200 p-4 ">
      <div className="mx-auto max-w">
        {/*Top*/}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <a href={FACEBOOK_URL}>
                <FacebookIcon/>
              </a>
              <a href={INSTAGRAM_URL}>
                <InstagramIcon/>
              </a>
            </div>
            <div className="text-m pt-2">
              <p>204° FOS De Tortels</p>
              <p>Botestraat 98B001,</p>
              <p>9032 Wondelgem</p>
            </div>
          </div>
          <div className="flex justify-start md:justify-end">
            <img
              src={scoutsLogo}
              alt="tortels Logo"
              className="h-30 w-aut"
            />
          </div>
        </div>
        {/*Bottom*/}
        <div className="mt-10 flex flex-col gap-4 border-b-3 border-white pb-1 md:flex-row md:items-center md:justify-between">
          <p>
            Elke zaterdag van 14.00 u. tot 18.00 u.
          </p>
          <p>
            Copyright © All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

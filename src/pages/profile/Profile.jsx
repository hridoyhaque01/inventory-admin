import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { avatar } from "../../assets/getAssets";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className="text-whiteHigh text-lg sm:text-xl md:text-2xl font-bold">
            {t("editProfile")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.name")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("forms.name")}
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm bg-whiteMid"
                    defaultValue={user?.firstName + " " + user?.lastName}
                  />
                </div>
                {/* profile pic */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.profile_img")} :
                  </span>
                  <div>
                    <img
                      src={user?.fileUrl || avatar}
                      alt=""
                      className="w-40 h-40 rounded-full bg-cover bg-center object-cover"
                    />
                  </div>
                </div>
                {/* Email: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.email")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("forms.email")}
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm bg-whiteMid"
                    defaultValue={user?.email}
                  />
                </div>
                {/* phone no */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.phone")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("forms.phone")}
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm bg-whiteMid"
                    defaultValue={user?.phoneNumber}
                  />
                </div>
                {/* edit button */}
                <div className="flex items-center justify-end gap-3 sm:gap-6">
                  <Link
                    to="/"
                    className="w-full max-w-[120px] lg:max-w-[160px] p-4 rounded-full font-medium border border-errorLightColor text-errorLightColor text-center text-[10px] sm:text-base"
                  >
                    {t("buttons.cancel")}
                  </Link>
                  <Link
                    to="/edit-profile"
                    className="w-full max-w-max p-4 px-4 sm:px-6 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center text-[10px] sm:text-base"
                  >
                    {t("buttons.editProfile")}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
